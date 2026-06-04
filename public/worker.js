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
      const SAMPLE_RATE = 16000;
      
      self.postMessage({ status: "transcribe_progress", progress: 5 });

      // --- ZERO-LATENCY VAD (Voice Activity Detection) ---
      // Detect and strip out silent segments to speed up Whisper and reduce hallucination.
      function detectSpeechSegments(audioArray, sampleRate) {
        const windowSize = Math.floor(sampleRate * 0.1); // 100ms window
        const energyThreshold = 0.005; // Suitable for clear IELTS recordings
        const minSilenceMs = 500;
        const minSilenceFrames = Math.floor(minSilenceMs / 100);
        
        let segments = [];
        let isSpeech = false;
        let speechStart = 0;
        let silenceCount = 0;
        
        for (let i = 0; i < audioArray.length; i += windowSize) {
          const end = Math.min(i + windowSize, audioArray.length);
          let energy = 0;
          for (let j = i; j < end; j++) {
            energy += audioArray[j] * audioArray[j];
          }
          const rms = Math.sqrt(energy / (end - i));
          
          if (rms > energyThreshold) {
            silenceCount = 0;
            if (!isSpeech) {
              isSpeech = true;
              // Add a bit of padding (e.g. 200ms) before the speech starts
              speechStart = Math.max(0, i - Math.floor(sampleRate * 0.2)); 
            }
          } else {
            silenceCount++;
            if (isSpeech && silenceCount >= minSilenceFrames) {
              isSpeech = false;
              // Add a bit of padding (e.g. 200ms) after speech ends
              const speechEnd = Math.min(audioArray.length, i + Math.floor(sampleRate * 0.2));
              segments.push({ start: speechStart, end: speechEnd });
            }
          }
        }
        if (isSpeech) {
          segments.push({ start: speechStart, end: audioArray.length });
        }
        return segments.length > 0 ? segments : [{start: 0, end: audioArray.length}];
      }

      const speechSegments = detectSpeechSegments(audio, SAMPLE_RATE);
      // Create a mapping of new audio indices to original audio time
      let newLength = 0;
      speechSegments.forEach(s => newLength += (s.end - s.start));
      
      const cleanAudio = new Float32Array(newLength);
      let timeMap = []; // Maps cleanAudio time to original audio time
      let cleanOffset = 0;
      
      for (const seg of speechSegments) {
        const segLen = seg.end - seg.start;
        cleanAudio.set(audio.subarray(seg.start, seg.end), cleanOffset);
        
        const cleanStartTime = cleanOffset / SAMPLE_RATE;
        const cleanEndTime = (cleanOffset + segLen) / SAMPLE_RATE;
        const origStartTime = seg.start / SAMPLE_RATE;
        
        timeMap.push({
          cleanStart: cleanStartTime,
          cleanEnd: cleanEndTime,
          origStart: origStartTime
        });
        cleanOffset += segLen;
      }
      
      const mapTimeToOriginal = (time) => {
        if (time === null || time === undefined) return null;
        for (const map of timeMap) {
          if (time >= map.cleanStart && time <= map.cleanEnd) {
            return map.origStart + (time - map.cleanStart);
          }
        }
        // Fallback if slightly out of bounds
        if (timeMap.length > 0) {
          if (time < timeMap[0].cleanStart) return timeMap[0].origStart;
          const lastMap = timeMap[timeMap.length - 1];
          if (time > lastMap.cleanEnd) return lastMap.origStart + (time - lastMap.cleanStart);
        }
        return time;
      };

      // --- CHUNKING ---
      const MAX_CHUNK_S = 180; // Process 3 minutes of *clean* audio at a time
      const MAX_CHUNK_SAMPLES = MAX_CHUNK_S * SAMPLE_RATE;
      
      let finalOutput = { text: "", chunks: [] };

      for (let offset = 0; offset < cleanAudio.length; offset += MAX_CHUNK_SAMPLES) {
        const end = Math.min(offset + MAX_CHUNK_SAMPLES, cleanAudio.length);
        const slice = cleanAudio.slice(offset, end);
        const cleanTimeOffset = offset / SAMPLE_RATE;

        const output = await transcriber(slice, {
          chunk_length_s: 30, // Internal Whisper chunking
          stride_length_s: 5,
          return_timestamps: true,
          chunk_callback: (chunk) => {
            if (chunk && chunk.timestamp && chunk.timestamp[1]) {
              const currentCleanTime = cleanTimeOffset + chunk.timestamp[1];
              const currentOrigTime = mapTimeToOriginal(currentCleanTime);
              const pct = Math.min(100, Math.round((currentOrigTime / audioDuration) * 100));
              self.postMessage({ status: "transcribe_progress", progress: Math.max(5, pct) });
            }
          }
        });

        if (output) {
          const outData = Array.isArray(output) ? output[0] : output;
          if (outData.text) {
            finalOutput.text += (finalOutput.text ? " " : "") + outData.text.trim();
          }
          if (outData.chunks && Array.isArray(outData.chunks)) {
            // Shift timestamps to clean audio timeline, then map to original timeline
            const mappedChunks = outData.chunks.map(c => {
              let startClean = c.timestamp[0] !== null ? c.timestamp[0] + cleanTimeOffset : null;
              let endClean = c.timestamp[1] !== null ? c.timestamp[1] + cleanTimeOffset : null;
              
              return {
                ...c,
                timestamp: [
                  mapTimeToOriginal(startClean),
                  mapTimeToOriginal(endClean)
                ]
              };
            });
            finalOutput.chunks.push(...mappedChunks);
          }
        }
      }

      self.postMessage({ status: "complete", output: finalOutput });
    } catch (err) {
      self.postMessage({ status: "error", error: err.message });
    }
  }
});
