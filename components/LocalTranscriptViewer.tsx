import React from "react";
import { Copy, CheckCircle2, Languages, Loader2 } from "lucide-react";

interface TranscriptViewerProps {
  transcript: { text: string } | null;
  currentTime?: number;
  onSeek?: (time: number) => void;
  onTranslate?: () => void;
  isTranslating?: boolean;
}

export default function LocalTranscriptViewer({ transcript, currentTime = 0, onSeek, onTranslate, isTranslating }: TranscriptViewerProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (transcript?.text) {
      navigator.clipboard.writeText(transcript.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!transcript) return null;

  const formatTime = (timeInSeconds: number | null) => {
    if (timeInSeconds === null || timeInSeconds === undefined) return "--:--";
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const hasChunks = (transcript as any).chunks && Array.isArray((transcript as any).chunks) && (transcript as any).chunks.length > 0;

  // Hàm format chuyên biệt cho các bài nghe TOEIC/IELTS
  const formatText = (text: string) => {
    if (!text) return text;
    let formatted = text;
    
    // 1. Tách dòng cho các lựa chọn A, B, C, D (ví dụ: " A. ", " B. ")
    formatted = formatted.replace(/(^|\s)([A-D]\.)\s/g, '$1\n$2 ');

    // 2. Tách dòng cho từ khóa câu hỏi TOEIC quen thuộc (Number X, Question X)
    // Dấu ? ở cuối \.? giúp bắt được cả trường hợp có hoặc không có dấu chấm (VD: "Number 11" hoặc "Number 11.")
    formatted = formatted.replace(/(^|\s)(Number\s\d+\.?|Question\s\d+\.?)/gi, '$1\n$2');

    // 3. Tách dòng cho lời dẫn TOEIC (Questions 71 through 73 refer to...)
    formatted = formatted.replace(/(^|\s)(Questions\s\d+\sthrough\s\d+\srefer\sto)/gi, '$1\n$2');

    // 4. Tách dòng cho các con số đếm độc lập (VD: "1. ", "20. ") 
    // Chỉ tách nếu nó nằm đầu câu hoặc sau dấu chấm kết thúc câu để tránh cắt nhầm số đếm bình thường.
    formatted = formatted.replace(/(^|[.?!]\s+)(\d+\.)\s/g, '$1\n$2 ');

    // Xóa các dấu xuống dòng kép (nếu có do regex chồng chéo)
    return formatted.replace(/\n\s*\n/g, '\n').trim();
  };

  // Hàm render text để hỗ trợ click-to-play nhưng không bôi đen tra từ nữa
  const renderInteractiveText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => (
      <span key={lineIdx} className={lineIdx > 0 ? "block mt-2" : ""}>
        {line.split(" ").map((word, idx) => (
          <span key={idx}>{word} </span>
        ))}
      </span>
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-4 w-full h-full max-h-[800px]">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 shrink-0">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Transcript
        </h3>
        <div className="flex items-center gap-2">
          {onTranslate && (
            <button
              onClick={onTranslate}
              disabled={isTranslating}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-sm"
            >
              {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
              {isTranslating ? "Đang dịch..." : "Dịch"}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Đã chép" : "Copy"}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium relative">
        {hasChunks ? (
          <div className="space-y-3">
            {(transcript as any).chunks.map((chunk: any, i: number) => {
              const start = chunk.timestamp?.[0] || 0;
              const end = chunk.timestamp?.[1] || 9999;
              const isActive = currentTime >= start && currentTime <= end;

              return (
                <div 
                  key={i} 
                  onClick={() => onSeek && chunk.timestamp && onSeek(chunk.timestamp[0])}
                  className={`flex flex-col sm:flex-row sm:gap-4 p-3 -mx-2 rounded-lg transition-all cursor-pointer border-l-4 ${
                    isActive 
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500" 
                      : "border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {chunk.timestamp && (
                    <span className={`font-mono text-sm shrink-0 mt-1 sm:mt-0 ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-400 dark:text-gray-500"}`}>
                      [{formatTime(chunk.timestamp[0])}]
                    </span>
                  )}
                  <span className={`flex-1 ${isActive ? "text-gray-900 dark:text-white" : ""}`}>
                    {renderInteractiveText(formatText(chunk.text))}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="whitespace-pre-wrap">
            {formatText(transcript.text) 
              ? renderInteractiveText(formatText(transcript.text)) 
              : <span className="text-gray-400 italic">Không tìm thấy giọng nói nào trong đoạn âm thanh này...</span>}
          </div>
        )}
      </div>
    </div>
  );
}
