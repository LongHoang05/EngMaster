import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, AlertCircle, PlayCircle, Wand2, Loader2, Clapperboard } from "lucide-react";

interface AdminEpisodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AdminEpisodeModal({ isOpen, onClose, onSubmit }: AdminEpisodeModalProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeProgress, setScrapeProgress] = useState(0);
  const [scrapeMessage, setScrapeMessage] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleScrape = async () => {
    if (!youtubeUrl.trim()) return;
    
    try {
      setIsScraping(true);
      setError(null);
      setParsedData(null);
      setScrapeProgress(0);
      setScrapeMessage("Đang khởi tạo kết nối...");
      
      const res = await fetch("/api/scrape-youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl }),
      });
      
      if (!res.ok) {
        let errorMsg = "Lỗi không xác định từ máy chủ.";
        try {
          const errData = await res.json();
          errorMsg = errData.error || errorMsg;
        } catch(e) {}
        throw new Error(errorMsg);
      }
      
      const reader = res.body?.getReader();
      if (!reader) throw new Error("Luồng dữ liệu không hỗ trợ");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ""; // Giữ lại phần chưa hoàn chỉnh

        for (const line of lines) {
          if (!line.trim()) continue;
          
          try {
            const msg = JSON.parse(line);
            
            if (msg.error) {
              throw new Error(msg.error);
            }
            if (msg.type === 'progress') {
              setScrapeProgress(msg.percent);
              setScrapeMessage(msg.message);
            } else if (msg.type === 'complete') {
              setParsedData(msg.data);
              setScrapeProgress(100);
              setScrapeMessage("Hoàn tất trích xuất!");
            }
          } catch(e: any) {
            if (e.message !== "Unexpected end of JSON input") {
              throw e;
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsScraping(false);
    }
  };

  const handleSubmit = () => {
    if (parsedData) {
      onSubmit(parsedData);
      setYoutubeUrl("");
      setParsedData(null);
      setError(null);
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.5)] w-full max-w-2xl overflow-hidden border border-white/50 flex flex-col max-h-[90vh] relative">
        {/* Glowing Orbs */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-4 md:p-5 border-b border-slate-200/50 flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Clapperboard size={20} fill="currentColor" className="opacity-80" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Thêm Tập Phim Mới
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100/80 rounded-full transition-colors text-slate-400 hover:text-slate-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 md:p-5 overflow-y-auto flex-1 space-y-4 relative z-10 custom-scrollbar">
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 text-slate-700 p-4 rounded-xl text-sm font-medium border border-rose-100/50 leading-relaxed shadow-inner">
            <p className="flex gap-2 items-start">
              <span className="bg-rose-100 text-rose-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold mt-0.5">1</span>
              <span>Sao chép <strong className="text-rose-600">đường dẫn (link)</strong> của một video trên Youtube. (Video phải có hỗ trợ Phụ đề - CC).</span>
            </p>
            <p className="flex gap-2 items-start mt-3">
              <span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold mt-0.5">2</span>
              <span>Dán vào ô bên dưới, AI sẽ tự động lấy phụ đề, dịch sang tiếng Việt và tạo phiên âm IPA cho bạn!</span>
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 w-12 bg-slate-100 rounded-l-2xl border-r border-slate-200 flex items-center justify-center transition-colors group-focus-within:bg-rose-50 group-focus-within:text-rose-600 group-focus-within:border-rose-200">
              <PlayCircle size={20} className="opacity-70" />
            </div>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full pl-14 p-4 bg-white text-slate-700 font-medium text-sm rounded-2xl outline-none focus:ring-4 focus:ring-rose-500/10 shadow-sm border border-slate-200 transition-all placeholder:text-slate-400"
              placeholder="Ví dụ: https://www.youtube.com/watch?v=..."
              spellCheck={false}
              disabled={isScraping}
            />
          </div>

          {isScraping && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl animate-fade-in space-y-3">
              <div className="flex justify-between items-end mb-1">
                <p className="text-sm font-bold text-slate-700">{scrapeMessage}</p>
                <p className="text-xs font-black text-rose-500">{scrapeProgress}%</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-orange-500 h-2.5 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${scrapeProgress}%` }}
                >
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleScrape}
            disabled={!youtubeUrl.trim() || isScraping}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 border border-transparent text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(244,63,94,0.5)] active:scale-[0.98]"
          >
            {isScraping ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Đang xử lý Dữ liệu...
              </>
            ) : (
              <>
                <Wand2 size={20} />
                Tự Động Trích Xuất Dữ Liệu
              </>
            )}
          </button>

          {error && (
            <div className="flex items-start gap-3 text-rose-600 bg-rose-50/80 p-4 rounded-xl border border-rose-100 shadow-sm animate-fade-in">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm mb-1">Lỗi Phân Tích</p>
                <p className="text-xs font-medium opacity-90">{error}</p>
              </div>
            </div>
          )}

          {parsedData && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-4 rounded-xl space-y-3 shadow-sm animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-base mb-2">
                <CheckCircle2 size={20} /> Trích xuất Thành công!
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/60 p-2.5 rounded-lg border border-white">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tên tập phim</p>
                  <p className="text-sm text-slate-800 font-bold truncate">{parsedData.title}</p>
                </div>
                <div className="bg-white/60 p-2.5 rounded-lg border border-white">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">YouTube ID</p>
                  <p className="text-sm text-slate-800 font-bold font-mono">{parsedData.youtubeId}</p>
                </div>
              </div>
              <div className="bg-white/60 p-2.5 rounded-lg border border-white">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Số lượng phụ đề (Subtitles)</p>
                <p className="text-sm text-emerald-600 font-black">{parsedData.subtitles?.length || 0} câu thoại</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-5 border-t border-slate-200/50 flex gap-3 shrink-0 relative z-10 bg-slate-50/50 rounded-b-[2rem]">
          <button onClick={onClose} className="flex-1 py-3 bg-slate-200/50 text-slate-700 font-bold rounded-xl hover:bg-slate-300/50 transition-colors border border-transparent hover:border-slate-300 text-sm">
            Hủy bỏ
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!parsedData}
            className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-black rounded-xl hover:opacity-90 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:shadow-none text-sm"
          >
            Bơm Dữ Liệu Lên Cloud
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
