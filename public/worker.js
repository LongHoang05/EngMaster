import { pipeline, env } from './transformers.min.js';

env.allowLocalModels = false;

class PipelineSingleton {
  static task = "automatic-speech-recognition";
  static model = "Xenova/whisper-tiny.en";
  static instance = null;

  static async getInstance(progress_callback) {
    if (this.instance === null) {
      console.log("Calling pipeline() to load model...");
      try {
        this.instance = pipeline(this.task, this.model, { progress_callback });
        await this.instance;
        console.log("pipeline() loaded successfully");
      } catch (err) {
        console.error("pipeline() failed:", err);
        throw err;
      }
    }
    return this.instance;
  }
}

// Listen for messages from the main thread
console.log("Worker script loaded");
self.addEventListener("message", async (event) => {
  const { type, audio } = event.data;
  console.log("Worker received message:", type);

  if (type === "load") {
    // Start loading the model
    try {
      await PipelineSingleton.getInstance((progress) => {
        // Send progress back to main thread
        self.postMessage({ status: "progress", progress });
      });
      self.postMessage({ status: "ready" });
    } catch (err) {
      self.postMessage({ status: "error", error: err.message });
    }
  } else if (type === "transcribe") {
    try {
      self.postMessage({ status: "transcribing" });
      const transcriber = await PipelineSingleton.getInstance();
      
      // Calculate audio duration for progress tracking
      const audioDuration = audio.length / 16000;
      
      const MAX_CHUNK_S = 180; // Process 3 minutes at a time to prevent OOM
      const SAMPLE_RATE = 16000;
      const MAX_CHUNK_SAMPLES = MAX_CHUNK_S * SAMPLE_RATE;
      
      let finalOutput = { text: "", chunks: [] };

      for (let offset = 0; offset < audio.length; offset += MAX_CHUNK_SAMPLES) {
        const end = Math.min(offset + MAX_CHUNK_SAMPLES, audio.length);
        const slice = audio.slice(offset, end);
        const timeOffset = offset / SAMPLE_RATE;

        const output = await transcriber(slice, {
          chunk_length_s: 30, // Internal chunking
          stride_length_s: 5,
          return_timestamps: true,
          chunk_callback: (chunk) => {
            if (chunk && chunk.timestamp && chunk.timestamp[1]) {
              const currentGlobalTime = timeOffset + chunk.timestamp[1];
              const pct = Math.min(100, Math.round((currentGlobalTime / audioDuration) * 100));
              self.postMessage({ status: "transcribe_progress", progress: pct });
            }
          }
        });

        if (output) {
          const outData = Array.isArray(output) ? output[0] : output;
          if (outData.text) {
            finalOutput.text += (finalOutput.text ? " " : "") + outData.text.trim();
          }
          if (outData.chunks && Array.isArray(outData.chunks)) {
            // Shift timestamps by the offset
            const shiftedChunks = outData.chunks.map(c => ({
              ...c,
              timestamp: [
                c.timestamp[0] !== null ? c.timestamp[0] + timeOffset : null,
                c.timestamp[1] !== null ? c.timestamp[1] + timeOffset : null
              ]
            }));
            finalOutput.chunks.push(...shiftedChunks);
          }
        }
      }

      self.postMessage({ status: "complete", output: finalOutput });
    } catch (err) {
      self.postMessage({ status: "error", error: err.message });
    }
  }
});
