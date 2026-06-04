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

      // Perform inference
      const output = await transcriber(audio, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: true,
        chunk_callback: (chunk) => {
          if (chunk && chunk.timestamp && chunk.timestamp[1]) {
            const pct = Math.min(100, Math.round((chunk.timestamp[1] / audioDuration) * 100));
            self.postMessage({ status: "transcribe_progress", progress: pct });
          }
        }
      });

      self.postMessage({ status: "complete", output });
    } catch (err) {
      self.postMessage({ status: "error", error: err.message });
    }
  }
});
