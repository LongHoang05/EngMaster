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

  // Tiền xử lý (Pre-process) các chunks để gộp các ký hiệu (A., 7., Number 9.) bị rớt xuống dòng
  // Whisper thỉnh thoảng sẽ tách "7." ra một chunk riêng, và "Where can I find..." ra một chunk riêng
  // Ta cần gộp chúng lại để hiển thị trên cùng 1 dòng cho đẹp mắt.
  const processedChunks = React.useMemo(() => {
    if (!hasChunks) return [];
    const chunks = [...(transcript as any).chunks];
    const merged = [];
    
    const isDangling = (text: string) => {
      const t = text.trim();
      return /^[A-D][.,:]?$/i.test(t) || 
             /^\(?[A-D]\)?$/i.test(t) ||
             /^\d{1,3}[.,:]?$/.test(t) ||
             /^(Number|Question)\s+[a-zA-Z0-9]+[.,:]?$/i.test(t);
    };

    // Nhận diện nếu một chunk bắt đầu bằng chữ thường (lowercase)
    // Chứng tỏ nó là đoạn giữa của một câu bị cắt làm đôi do người đọc ngừng thở (pause)
    const startsWithLowercase = (text: string) => {
      return /^["'\s]*[a-z]/.test(text.trim());
    };

    for (let i = 0; i < chunks.length; i++) {
      let current = { ...chunks[i] };
      
      // Gộp chunk nếu chunk hiện tại là dangling marker, 
      // HOẶC chunk tiếp theo là một đoạn bị cắt dở (bắt đầu bằng chữ thường)
      while (i < chunks.length - 1 && (isDangling(current.text) || startsWithLowercase((transcript as any).chunks[i + 1].text))) {
        const next = chunks[i + 1];
        current.text = current.text + " " + next.text.trim();
        if (current.timestamp && next.timestamp) {
          current.timestamp = [current.timestamp[0], next.timestamp[1] || next.timestamp[0]];
        }
        i++;
      }

      // Xử lý trường hợp "Marker" bị dính vào cuối chunk hiện tại thay vì đầu chunk tiếp theo
      // Ví dụ: Chunk 1: "Yes we will do it tomorrow. B." | Chunk 2: "Yes we should offer..."
      // Ta sẽ bứng "B." từ Chunk 1 quăng sang đầu Chunk 2.
      const endsWithMarkerMatch = current.text.match(/(^|\s+)(\(?[A-D]\)?[.,:]?)$/);
      if (endsWithMarkerMatch && i < chunks.length - 1) {
        const marker = endsWithMarkerMatch[2]; // VD: "B."
        current.text = current.text.slice(0, -endsWithMarkerMatch[0].length).trim();
        
        // Gắn vào đầu chunk tiếp theo
        const next = chunks[i + 1];
        chunks[i + 1] = { ...next, text: marker + " " + next.text.trim() };
      }

      merged.push(current);
    }
    return merged;
  }, [transcript, hasChunks]);

  // Tiện ích chuyển đổi chữ số tiếng Anh sang số
  const wordToDigit = (word: string) => {
    const map: Record<string, string> = {
      one: "1", two: "2", three: "3", four: "4", five: "5",
      six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
      eleven: "11", twelve: "12", thirteen: "13", fourteen: "14", fifteen: "15",
      sixteen: "16", seventeen: "17", eighteen: "18", nineteen: "19", twenty: "20"
    };
    return map[word.toLowerCase()] || word;
  };

  // Hàm format chuyên biệt cho các bài nghe TOEIC/IELTS
  const formatText = (text: string) => {
    if (!text) return text;
    let formatted = text.trim();
    
    // 1. Tách dòng cho các lựa chọn A, B, C, D (Bắt dạng A., A,, (A), v.v.)
    // Không dùng /i để tránh bắt nhầm chữ "a" trong câu.
    formatted = formatted.replace(/(^|\s+)(\(?[A-D]\)?)([.,:]?)(\s+|$)/g, '\n$2. ');

    // 2. Tách dòng cho từ khóa câu hỏi (Biến đổi "Number nine." thành "9.")
    formatted = formatted.replace(/(^|\s+)(Number|Question)\s+([a-zA-Z0-9]+)[.,:]?\s+/gi, (match, p1, p2, p3) => {
      return `${p1}\n\n${wordToDigit(p3)}. `;
    });

    // 3. Tách dòng cho các con số đếm độc lập (VD: "7. ", "104. ")
    // Chỉ bắt khi nó đứng đầu câu hoặc sau một dấu kết thúc câu
    formatted = formatted.replace(/(^|[.?!]\s+)(\d{1,3})([.,:])\s+/g, '\n\n$2. ');

    // Xóa các dấu xuống dòng kép (nếu có do regex chồng chéo)
    return formatted.replace(/\n\s*\n/g, '\n').trim();
  };

  // Hàm render text để hỗ trợ click-to-play và in đậm các từ khóa
  const renderInteractiveText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      const words = line.trim().split(" ");
      if (words.length === 0 || (words.length === 1 && words[0] === "")) return null;

      // Nhận diện xem dòng này có bắt đầu bằng Marker (A., B., 7., Number 9.) không
      let markerWordCount = 0;
      if (/^(\(?[A-D]\)?\.)/.test(words[0])) {
        markerWordCount = 1; // In đậm 1 từ (A.)
      } else if (/^(\d{1,3}\.)/.test(words[0])) {
        markerWordCount = 1; // In đậm 1 từ (7.)
      } else if (/^(Number|Question)/i.test(words[0]) && words[1] && /^[a-zA-Z0-9]+\./.test(words[1])) {
        markerWordCount = 2; // In đậm 2 từ (Number 9.)
      }

      return (
        <span key={lineIdx} className={lineIdx > 0 ? "block mt-2" : "block"}>
          {words.map((word, idx) => {
            const isBold = idx < markerWordCount;
            return (
              <span 
                key={idx} 
                className={`transition-colors rounded px-[1px] ${isBold ? "font-bold text-gray-900 " : ""}`}
              >
                {word}{" "}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <div className="bg-white  rounded-xl shadow-lg border border-gray-100  p-6 flex flex-col gap-4 w-full h-full max-h-[800px]">
      <div className="flex items-center justify-between border-b border-gray-100  pb-3 shrink-0">
        <h3 className="text-lg font-semibold text-gray-800 ">
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600  hover:bg-gray-100 :bg-gray-700 rounded-md transition-colors"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Đã chép" : "Copy"}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar p-2 bg-gray-50  rounded-lg text-gray-700  leading-relaxed font-medium relative">
        {hasChunks ? (
          <div className="space-y-3">
            {processedChunks.map((chunk: any, i: number) => {
              const start = chunk.timestamp?.[0] || 0;
              const end = chunk.timestamp?.[1] || 9999;
              const isActive = currentTime >= start && currentTime <= end;

              return (
                <div 
                  key={i} 
                  onClick={() => onSeek && chunk.timestamp && onSeek(chunk.timestamp[0])}
                  className={`flex flex-col sm:flex-row sm:gap-4 p-3 -mx-2 rounded-lg transition-all cursor-pointer border-l-4 ${
                    isActive 
                      ? "bg-blue-50  border-blue-500" 
                      : "border-transparent hover:bg-gray-100 :bg-gray-800"
                  }`}
                >
                  {chunk.timestamp && (
                    <span className={`font-mono text-sm shrink-0 mt-1 sm:mt-0 ${isActive ? "text-blue-600  font-semibold" : "text-gray-400 "}`}>
                      [{formatTime(chunk.timestamp[0])}]
                    </span>
                  )}
                  <span className={`flex-1 ${isActive ? "text-gray-900 " : ""}`}>
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
