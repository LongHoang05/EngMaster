"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, PlayCircle, Loader2 } from "lucide-react";

interface AudioUploaderProps {
  onTranscribe: (audio: Float32Array) => void;
  disabled: boolean;
  isTranscribing: boolean;
  transcribeProgress?: number;
  file: File | null;
  setFile: (f: File | null) => void;
  audioUrl: string | null;
  setAudioUrl: (url: string | null) => void;
}

export default function AudioUploader({ 
  onTranscribe, disabled, isTranscribing, transcribeProgress = 0, 
  file, setFile, audioUrl, setAudioUrl 
}: AudioUploaderProps) {
  const [isDecoding, setIsDecoding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      setFile(droppedFile);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(URL.createObjectURL(droppedFile));
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setIsDecoding(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Use AudioContext to decode audio to PCM float32 array
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      // Safely mix all channels to mono to avoid missing audio
      const channels = audioBuffer.numberOfChannels;
      const audioData = new Float32Array(audioBuffer.length);
      for (let i = 0; i < channels; i++) {
        const channelData = audioBuffer.getChannelData(i);
        for (let j = 0; j < audioBuffer.length; j++) {
          audioData[j] += channelData[j] / channels;
        }
      }
      onTranscribe(audioData);
    } catch (e) {
      console.error("Audio decode error:", e);
      alert("Đã xảy ra lỗi khi giải mã file âm thanh.");
    } finally {
      setIsDecoding(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-6 w-full">
      <div 
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-12 h-12 text-blue-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Kéo thả file âm thanh vào đây
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Hỗ trợ MP3, WAV, M4A...
        </p>
        <input 
          type="file" 
          accept="audio/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
      </div>

      {file && audioUrl && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center gap-3 overflow-hidden">
              <PlayCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {file.name}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={disabled || isDecoding || isTranscribing}
            className="relative w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold shadow-sm disabled:opacity-80 disabled:cursor-not-allowed transition-all overflow-hidden flex justify-center items-center gap-2"
          >
            {/* Progress Bar Background */}
            {(isDecoding || isTranscribing) && (
              <div 
                className="absolute left-0 top-0 h-full bg-blue-500/20 dark:bg-blue-500/30 transition-all duration-300 ease-out"
                style={{ width: `${isTranscribing ? transcribeProgress : isDecoding ? 5 : 0}%` }}
              ></div>
            )}
            
            <div className="relative z-10 flex items-center gap-2">
              {(isDecoding || isTranscribing) && <Loader2 className="w-5 h-5 animate-spin text-blue-600 dark:text-blue-400" />}
              <span>
                {isDecoding ? "Đang xử lý âm thanh..." : isTranscribing ? `Đang bóc băng... ${Math.floor(transcribeProgress)}%` : "Bóc băng (Tạo Transcript)"}
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
