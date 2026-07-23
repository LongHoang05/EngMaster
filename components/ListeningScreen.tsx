"use client";

import React, { useState, useEffect, useRef } from "react";
import AudioUploader from "@/components/AudioUploader";
import LocalTranscriptViewer from "@/components/LocalTranscriptViewer";
import CustomAudioPlayer from "@/components/CustomAudioPlayer";
import { Loader2, BrainCircuit, Headphones, Languages, Minimize2 } from "lucide-react";
import { toast } from "sonner";

interface ListeningScreenProps {
  userCode?: string | null;
  onUnsavedChange?: (isUnsaved: boolean) => void;
  isMiniPlayer?: boolean;
  onReturnToListening?: () => void;
  onMinimize?: () => void;
}

export default function ListeningPage({ userCode, onUnsavedChange, isMiniPlayer, onReturnToListening, onMinimize }: ListeningScreenProps = {}) {
  const [isModelReady, setIsModelReady] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelProgress, setModelProgress] = useState<{file: string, progress: number, loaded?: number, total?: number}[]>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribeProgress, setTranscribeProgress] = useState(0);
  const [transcript, setTranscript] = useState<{text: string} | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslatingAPI, setIsTranslatingAPI] = useState(false);

  const [exerciseFormat, setExerciseFormat] = useState("");
  const [solvedExercise, setSolvedExercise] = useState("");
  const [isSolving, setIsSolving] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [seekToTime, setSeekToTime] = useState<number | null>(null);

  useEffect(() => {
    // Reset transcript và bản dịch khi người dùng chọn file âm thanh mới
    setTranscript(null);
    setTranslatedText(null);
    if (onUnsavedChange) {
      onUnsavedChange(file !== null);
    }
  }, [file, onUnsavedChange]);

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
          console.log("Transcription raw output:", finalResult);
          
          if (!finalResult || (Array.isArray(finalResult) && finalResult.length === 0)) {
            toast.error("Bóc băng thất bại: Không có dữ liệu trả về (File có thể quá dài hoặc không có tiếng).");
            setTranscript(null);
            break;
          }

          if (Array.isArray(finalResult)) {
            finalResult = finalResult[0];
          }
          
          // Fallback if it returns just a string
          if (typeof finalResult === 'string') {
            finalResult = { text: finalResult, chunks: [] };
          }

          if (!finalResult || (!finalResult.text && !finalResult.chunks)) {
            toast.error("Bóc băng thất bại: Không nhận diện được giọng nói.");
            setTranscript(null);
            break;
          }

          setTranscript(finalResult);
          toast.success("Bóc băng thành công!");
          break;
        case 'error':
          console.error(e.data.error);
          setIsTranscribing(false);
          setIsModelLoading(false);
          toast.error("Lỗi: " + (e.data.error || "Không thể bóc băng"));
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
    setTranslatedText(null);
    setTranscribeProgress(0);
    // Use Transferable Objects to prevent cloning the audio array in memory
    worker.current?.postMessage({ type: 'transcribe', audio: audioData }, [audioData.buffer]);
  };

  const handleTranslate = async () => {
    if (!transcript?.text) return;
    setIsTranslatingAPI(true);
    setTranslatedText(null);
    try {
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transcript.text })
      });
      const data = await response.json();
      if (response.ok) {
        setTranslatedText(data.translation);
      } else {
        alert("Lỗi dịch: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi gọi API dịch.");
    } finally {
      setIsTranslatingAPI(false);
    }
  };

  const handleSolveExercise = async () => {
    if (!transcript?.text) {
      toast.error("Vui lòng bóc băng âm thanh trước khi giải bài.");
      return;
    }
    if (!exerciseFormat.trim()) {
      toast.error("Vui lòng nhập định dạng bài tập.");
      return;
    }
    
    setIsSolving(true);
    setSolvedExercise("");
    
    try {
      const response = await fetch('/api/ai/solve-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcript.text, exerciseFormat })
      });
      
      const rawText = await response.text();
      let data: any = {};
      try {
        if (rawText) data = JSON.parse(rawText);
      } catch(e) {
        data = { rawText };
      }

      if (response.ok) {
        setSolvedExercise(data.solvedExercise);
        toast.success("Giải bài thành công!");
      } else {
        const errorMsg = data.details || data.error || data.rawText || `HTTP ${response.status} ${response.statusText}`;
        toast.error("Lỗi giải bài: " + errorMsg);
        console.error("API Error Details:", { status: response.status, rawText, data });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Đã xảy ra lỗi mạng khi gọi API giải bài.");
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <div className={isMiniPlayer ? "fixed inset-0 pointer-events-none z-[100]" : "min-h-screen bg-gray-50  py-12 px-4 sm:px-6 lg:px-8"}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className={`text-center space-y-4 mb-10 ${isMiniPlayer ? 'hidden' : ''}`}>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100  rounded-full">
              <Headphones className="w-10 h-10 text-blue-600 " />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 ">
            Học Nghe & Bóc Băng
          </h1>
          <p className="text-gray-500  max-w-2xl mx-auto">
            Tải lên file âm thanh tiếng Anh. Công cụ AI chạy trực tiếp trên trình duyệt của bạn sẽ chuyển đổi âm thanh thành văn bản hoàn toàn miễn phí và bảo mật.
          </p>
        </div>

        {/* Bố cục chia 3 cột khi ở màn hình lớn */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CỘT TRÁI: Uploader & Audio Player */}
          <div className={`lg:col-span-4 space-y-6 ${isMiniPlayer && !audioUrl ? 'hidden' : ''}`}>
            <div className={isMiniPlayer ? 'hidden' : ''}>
              {!isModelReady && (
              <div className="bg-white  rounded-xl shadow-sm border border-gray-100  p-8 flex flex-col items-center text-center w-full">
                <BrainCircuit className="w-12 h-12 text-indigo-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-800  mb-2">
                  Chuẩn bị mô hình AI
                </h2>
                <p className="text-gray-600  mb-6 text-sm">
                  Lần đầu tiên sử dụng, trình duyệt cần tải một phần mềm AI nhỏ (~75MB) về máy. Việc này chỉ xảy ra một lần.
                </p>
                {isModelLoading ? (
                  <div className="w-full space-y-4">
                    <div className="flex justify-center items-center gap-2 text-blue-600 mb-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="font-medium">Đang tải mô hình...</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-gray-600  font-medium">
                        <span>Đang nạp bộ xử lý AI...</span>
                        <span>
                          {(() => {
                            const totalLoaded = modelProgress.reduce((acc, p) => acc + (p.loaded || 0), 0);
                            const expectedTotal = 75000000; // ~75MB for whisper-base.en
                            return Math.min(100, Math.round((totalLoaded / expectedTotal) * 100));
                          })()}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200  rounded-full overflow-hidden">
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
            </div>

            {isModelReady && (
              <div className={`space-y-6 fade-in ${isMiniPlayer ? 'hidden' : ''}`}>
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
              </div>
            )}
            
            {audioUrl && (
              <div className={isMiniPlayer ? "pointer-events-auto fixed bottom-6 right-6 w-[350px] animate-fade-in-up z-[200]" : "mt-4"}>
                <CustomAudioPlayer 
                  audioUrl={audioUrl} 
                  seekToTime={seekToTime}
                  onTimeUpdate={setCurrentTime}
                  isMini={isMiniPlayer}
                  onExpand={onReturnToListening}
                  title={file?.name || "Audio Track"}
                />
              </div>
            )}
          </div>

          {/* CỘT GIỮA: Transcript */}
          <div className={`lg:col-span-4 ${isMiniPlayer ? 'hidden' : ''}`}>
            {isModelReady && transcript && (
              <div className="h-full fade-in">
                <LocalTranscriptViewer 
                  transcript={transcript} 
                  currentTime={currentTime}
                  onSeek={(time) => setSeekToTime(time)}
                  onTranslate={handleTranslate}
                  isTranslating={isTranslatingAPI}
                />
              </div>
            )}
            {isModelReady && !transcript && (
              <div className="bg-gray-50/50  rounded-xl border border-dashed border-gray-200  h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <BrainCircuit className="w-12 h-12 mb-4 opacity-20" />
                <p>Tải file âm thanh và bấm Bóc băng để xem Transcript ở đây.</p>
              </div>
            )}
          </div>

          {/* CỘT PHẢI: Translation */}
          <div className={`lg:col-span-4 ${isMiniPlayer ? 'hidden' : ''}`}>
            {isModelReady && transcript && (
              <div className="h-full fade-in">
                <div className="bg-white  rounded-xl shadow-lg border border-gray-100  p-6 flex flex-col gap-4 w-full h-full max-h-[800px]">
                  <div className="flex items-center justify-between border-b border-gray-100  pb-3 shrink-0">
                    <h3 className="text-lg font-semibold text-gray-800 ">
                      Bản dịch
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar p-2 bg-gray-50  rounded-lg text-gray-700  leading-relaxed font-medium">
                    {isTranslatingAPI ? (
                      <div className="flex flex-col items-center justify-center h-full text-blue-500 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-sm">Đang dịch qua AI...</span>
                      </div>
                    ) : translatedText ? (
                      <div className="whitespace-pre-wrap">{translatedText}</div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 italic text-center gap-3">
                        <Languages className="w-8 h-8 opacity-50" />
                        <span>Bấm nút "Dịch" ở cột Transcript để xem bản dịch Tiếng Việt.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {isModelReady && !transcript && (
              <div className="bg-gray-50/50  rounded-xl border border-dashed border-gray-200  h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <Languages className="w-12 h-12 mb-4 opacity-20" />
                <p>Bản dịch sẽ hiển thị ở đây.</p>
              </div>
            )}
          </div>

        </div>

        {userCode === "lhg" && (
          <div className={`mt-8 bg-white rounded-xl shadow-lg border border-indigo-100 p-6 ${isMiniPlayer ? 'hidden' : ''} fade-in`}>
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-800">Công cụ giải bài tập (Đặc quyền riêng)</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Nhập đề bài (có chỗ trống):</label>
                <textarea 
                  className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none transition-all custom-scrollbar"
                  placeholder="Ví dụ: 1. ____12____ did you _____13______ ____14_____to the______15_______?&#10;(A) My car ______16____   on the ___17_____..."
                  value={exerciseFormat}
                  onChange={(e) => setExerciseFormat(e.target.value)}
                />
                <button
                  onClick={handleSolveExercise}
                  disabled={isSolving || !transcript}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSolving ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Đang giải...</>
                  ) : (
                    "Tự động giải bài (Auto-fill)"
                  )}
                </button>
                {!transcript && <p className="text-xs text-amber-600 text-center">Yêu cầu phải bóc băng Audio trước khi giải.</p>}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">Kết quả từ AI:</label>
                  {solvedExercise && (
                    <button
                      onClick={() => {
                        const rawAnswerMap: Record<string, string> = {};
                        const lines = solvedExercise.split('\n');
                        for (const line of lines) {
                          // Bắt định dạng nghiêm ngặt "BLANK_106: word" để tránh nhầm với câu hỏi "7. "
                          const match = line.match(/^BLANK_(\d+)[\.\:]\s+(.+)$/i);
                          if (match) {
                            rawAnswerMap[match[1]] = match[2].replace(/\*\*/g, '').trim();
                          }
                        }

                        // Trích xuất tất cả các ID ô trống từ đề bài (VD: ___106___, -----10-----, (11))
                        const blankRegex = /([-_]{2,}|\(|\[)\s*(\d+)\s*([-_]{2,}|\)|\])/g;
                        const blankIds: string[] = [];
                        let m;
                        while ((m = blankRegex.exec(exerciseFormat)) !== null) {
                          blankIds.push(m[2]);
                        }

                        const answerMap: Record<string, string> = {};
                        const rawKeys = Object.keys(rawAnswerMap).sort((a,b) => parseInt(a) - parseInt(b));
                        
                        if (rawKeys.length > 0) {
                          // Nếu AI đánh số lại từ 1, 2, 3... nhưng đề bài không bắt đầu từ 1
                          if (rawKeys[0] === "1" && blankIds.length > 0 && !blankIds.includes("1")) {
                            for (let i = 0; i < rawKeys.length; i++) {
                              if (blankIds[i]) {
                                // Xóa các trường hợp AI sinh lặp số (vd: "1. 106. Have")
                                let text = rawAnswerMap[rawKeys[i]];
                                const doubleMatch = text.match(new RegExp('^' + blankIds[i] + '[\\.\\)\\-\\]\\:]\\s*(.+)'));
                                if (doubleMatch) text = doubleMatch[1];
                                
                                answerMap[blankIds[i]] = text;
                              }
                            }
                          } else {
                            // AI đã đánh đúng số, hoặc không thể map tuần tự
                            Object.assign(answerMap, rawAnswerMap);
                          }
                        }
                        
                        if (Object.keys(answerMap).length === 0) {
                          toast.error("Không tìm thấy danh sách đáp án hợp lệ để tạo mã Auto-fill.");
                          return;
                        }

                        const scriptCode = `(function() {
  const answers = ${JSON.stringify(answerMap)};
  
  alert("🤖 Chế độ Auto-Bot đã kích hoạt! Hãy lướt / bấm chuyển câu trên trang web, bot sẽ liên tục tự động điền các ô xuất hiện trên màn hình.");

  const filledNumbers = new Set();
  
  function triggerFill() {
    const allInputs = Array.from(document.querySelectorAll('input, textarea, [contenteditable="true"]')).filter(i => {
      if (i.tagName.toLowerCase() === 'input') {
        if (['hidden', 'radio', 'checkbox', 'submit', 'button', 'image', 'file'].includes(i.type.toLowerCase())) return false;
      }
      const style = window.getComputedStyle(i);
      return style.display !== 'none' && style.visibility !== 'hidden' && i.offsetWidth > 0;
    });

    // 1. Cố gắng điền theo logic ánh xạ số
    Object.entries(answers).forEach(([num, text]) => {
      if (filledNumbers.has(num)) return; // Đã điền rồi thì bỏ qua
      
      let targetInput = allInputs.find(i => {
        const id = (i.id || '').toLowerCase();
        const name = (i.getAttribute('name') || '').toLowerCase();
        return id.endsWith(num) || name.endsWith(num) || name.includes('['+num+']') || id.includes('_'+num);
      });
      
      if (targetInput && (targetInput.isContentEditable ? targetInput.innerText.trim() === '' : targetInput.value.trim() === '')) {
        fillInput(targetInput, text);
        filledNumbers.add(num);
      }
    });

    // 2. Chế độ cứu hộ (Viewport)
    const unfilledEntries = Object.entries(answers).filter(([num]) => !filledNumbers.has(num));
    if (unfilledEntries.length > 0) {
      const visibleEmptyInputs = allInputs.filter(i => {
        const rect = i.getBoundingClientRect();
        // Kiểm tra xem nó có THỰC SỰ đang nằm trên màn hình không (xử lý cả vụ carousel cuộn ngang)
        const isVisibleVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
        const isVisibleHorizontally = rect.left >= 0 && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        
        if (!(isVisibleVertically && isVisibleHorizontally)) return false;
        
        if (i.isContentEditable) return !i.innerText.trim();
        return !i.value.trim();
      });

      visibleEmptyInputs.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

      for (let i = 0; i < Math.min(unfilledEntries.length, visibleEmptyInputs.length); i++) {
        const [num, text] = unfilledEntries[i];
        const input = visibleEmptyInputs[i];
        fillInput(input, text);
        filledNumbers.add(num);
        input.style.backgroundColor = '#fef08a'; // Màu vàng
        input.style.border = '2px solid #eab308';
      }
    }
  }

  function fillInput(targetInput, text) {
    if (targetInput.isContentEditable) {
      targetInput.innerText = text;
    } else {
      let nativeSetter = targetInput.tagName.toLowerCase() === 'textarea' 
        ? Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set 
        : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
      
      if (nativeSetter) {
        nativeSetter.call(targetInput, text);
      } else {
        targetInput.value = text;
      }
    }
    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    targetInput.dispatchEvent(new Event('change', { bubbles: true }));
    targetInput.dispatchEvent(new Event('blur', { bubbles: true }));
    targetInput.style.backgroundColor = '#dcfce7'; 
    targetInput.style.border = '2px solid #22c55e';
  }

  // Chạy lặp mỗi 1 giây để bắt mọi ô input mới hiện ra
  setInterval(triggerFill, 1000);
  triggerFill();
})();`;

                        navigator.clipboard.writeText(scriptCode);
                        toast.success("Đã copy mã Auto-fill! Sang tab bài thi, bấm F12 -> Console -> Dán mã -> Enter.");
                      }}
                      className="px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      Copy Script (F12)
                    </button>
                  )}
                </div>
                <div className="w-full h-[calc(16rem+3rem)] p-4 rounded-xl border border-gray-200 bg-gray-50 overflow-y-auto custom-scrollbar whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {solvedExercise ? (
                    <div dangerouslySetInnerHTML={{ __html: solvedExercise.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-indigo-700 bg-indigo-100 px-1 rounded">$1</span>').replace(/\n/g, '<br />') }} />
                  ) : (
                    <span className="text-gray-400 italic flex items-center justify-center h-full text-center">Kết quả giải bài sẽ hiển thị ở đây...<br />(Các từ điền vào chỗ trống sẽ được tô đậm)</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
