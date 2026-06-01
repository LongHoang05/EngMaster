"use client";

import React, { useState, useEffect, useRef } from "react";
import AudioUploader from "@/components/AudioUploader";
import LocalTranscriptViewer from "@/components/LocalTranscriptViewer";
import CustomAudioPlayer from "@/components/CustomAudioPlayer";
import { Loader2, BrainCircuit, Headphones } from "lucide-react";

export default function ListeningPage() {
  const [isModelReady, setIsModelReady] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelProgress, setModelProgress] = useState<{file: string, progress: number, loaded?: number, total?: number}[]>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribeProgress, setTranscribeProgress] = useState(0);
  const [transcript, setTranscript] = useState<{text: string} | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [seekToTime, setSeekToTime] = useState<number | null>(null);

  const worker = useRef<Worker | null>(null);

  // Tạo hiệu ứng thanh tiến trình chạy mượt mà từ 0 -> 99%
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTranscribing) {
      setTranscribeProgress(0);
      interval = setInterval(() => {
        setTranscribeProgress((prev) => {
          if (prev < 40) return prev + 1.5; // Chạy nhanh khúc đầu
          if (prev < 70) return prev + 0.8; // Chậm dần
          if (prev < 90) return prev + 0.4;
          if (prev < 99) return prev + 0.1; // Cực chậm ở những % cuối để chờ AI
          return 99;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTranscribing]);

  useEffect(() => {
    // Hide the worker URL from Webpack to prevent it from intercepting and breaking it
    const workerUrl = window.location.origin + '/worker.js';
    worker.current = new Worker(workerUrl, { type: 'module' });

    worker.current.onerror = (e) => {
      console.error("Worker error:", e.message);
      setIsModelLoading(false);
      setIsTranscribing(false);
      alert("Lỗi tải AI: Trình duyệt của bạn có thể đang chặn Web Worker hoặc mất kết nối.");
    };

    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case 'progress':
          setModelProgress(prev => {
            const newProgress = [...prev];
            const idx = newProgress.findIndex(p => p.file === e.data.progress.file);
            if (idx >= 0) {
              newProgress[idx] = e.data.progress;
            } else {
              newProgress.push(e.data.progress);
            }
            return newProgress;
          });
          break;
        case 'transcribe_progress':
          // We now use the simulated smooth progress bar in useEffect instead
          break;
        case 'ready':
          setIsModelReady(true);
          setIsModelLoading(false);
          break;
        case 'transcribing':
          setIsTranscribing(true);
          break;
        case 'complete':
          setIsTranscribing(false);
          let finalResult = e.data.output;
          if (Array.isArray(finalResult)) {
            finalResult = finalResult[0];
          }
          setTranscript(finalResult);
          break;
        case 'error':
          console.error(e.data.error);
          setIsTranscribing(false);
          setIsModelLoading(false);
          alert("Lỗi: " + e.data.error);
          break;
      }
    };

    worker.current.addEventListener('message', onMessageReceived);

    // Auto-start loading the model immediately instead of waiting for button click
    setIsModelLoading(true);
    worker.current.postMessage({ type: 'load' });

    return () => {
      worker.current?.removeEventListener('message', onMessageReceived);
      worker.current?.terminate();
    };
  }, []);

  const handleTranscribe = (audioData: Float32Array) => {
    if (!isModelReady) return;
    setTranscript(null);
    setTranscribeProgress(0);
    worker.current?.postMessage({ type: 'transcribe', audio: audioData });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center space-y-4 mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-full">
              <Headphones className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Học Nghe & Bóc Băng
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Tải lên file âm thanh tiếng Anh. Công cụ AI chạy trực tiếp trên trình duyệt của bạn sẽ chuyển đổi âm thanh thành văn bản hoàn toàn miễn phí và bảo mật.
          </p>
        </div>

        {/* Bố cục chia đôi cột khi ở màn hình lớn */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT TRÁI: Uploader & Audio Player */}
          <div className="lg:col-span-5 space-y-6">
            {!isModelReady && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center text-center w-full">
                <BrainCircuit className="w-12 h-12 text-indigo-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Chuẩn bị mô hình AI
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                  Lần đầu tiên sử dụng, trình duyệt cần tải một phần mềm AI nhỏ (~75MB) về máy. Việc này chỉ xảy ra một lần.
                </p>
                {isModelLoading ? (
                  <div className="w-full space-y-4">
                    <div className="flex justify-center items-center gap-2 text-blue-600 mb-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="font-medium">Đang tải mô hình...</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 font-medium">
                        <span>Đang nạp bộ xử lý AI...</span>
                        <span>
                          {(() => {
                            const totalLoaded = modelProgress.reduce((acc, p) => acc + (p.loaded || 0), 0);
                            const expectedTotal = 75000000; // ~75MB for whisper-base.en
                            return Math.min(100, Math.round((totalLoaded / expectedTotal) * 100));
                          })()}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-300 ease-out" 
                          style={{ 
                            width: `${(() => {
                              const totalLoaded = modelProgress.reduce((acc, p) => acc + (p.loaded || 0), 0);
                              const expectedTotal = 75000000;
                              return Math.min(100, Math.round((totalLoaded / expectedTotal) * 100));
                            })()}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 italic">Đang khởi tạo kết nối...</div>
                )}
              </div>
            )}

            {isModelReady && (
              <div className="space-y-6 fade-in">
                <AudioUploader 
                  onTranscribe={handleTranscribe} 
                  disabled={!isModelReady || isTranscribing}
                  isTranscribing={isTranscribing}
                  transcribeProgress={transcribeProgress}
                  file={file}
                  setFile={setFile}
                  audioUrl={audioUrl}
                  setAudioUrl={setAudioUrl}
                />
                
                {audioUrl && (
                  <div className="mt-4">
                    <CustomAudioPlayer 
                      audioUrl={audioUrl} 
                      seekToTime={seekToTime}
                      onTimeUpdate={setCurrentTime}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CỘT PHẢI: Transcript */}
          <div className="lg:col-span-7">
            {isModelReady && transcript && (
              <div className="h-full fade-in">
                <LocalTranscriptViewer 
                  transcript={transcript} 
                  currentTime={currentTime}
                  onSeek={(time) => setSeekToTime(time)}
                />
              </div>
            )}
            {isModelReady && !transcript && (
              <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <BrainCircuit className="w-12 h-12 mb-4 opacity-20" />
                <p>Tải file âm thanh và bấm Bóc băng để xem Transcript ở đây.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
