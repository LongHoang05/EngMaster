import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Film, Image as ImageIcon, AlignLeft, BarChart2 } from "lucide-react";

interface AdminSeriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function AdminSeriesModal({ isOpen, onClose, onSubmit, initialData }: AdminSeriesModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [level, setLevel] = useState("Dễ");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || "");
        setDescription(initialData.description || "");
        setThumbnailUrl(initialData.thumbnailUrl || "");
        setAvatarUrl(initialData.avatarUrl || "");
        setLevel(initialData.level || "Dễ");
      } else {
        setTitle("");
        setDescription("");
        setThumbnailUrl("");
        setAvatarUrl("");
        setLevel("Dễ");
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, thumbnailUrl, avatarUrl, level });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.5)] w-full max-w-xl overflow-hidden border border-white/50 relative flex flex-col max-h-[90vh]">
        {/* Glowing Orbs */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-4 md:p-5 border-b border-slate-200/50 flex items-center justify-between relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Film size={20} fill="currentColor" className="opacity-80" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {initialData ? "Chỉnh Sửa Bộ Phim" : "Thêm Bộ Phim Mới"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100/80 rounded-full transition-colors text-slate-400 hover:text-slate-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden relative z-10">
          <div className="p-4 md:p-5 space-y-3 overflow-y-auto custom-scrollbar flex-1">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
              <Film size={16} className="text-indigo-500" /> Tên bộ phim
            </label>
            <input 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-800 placeholder:text-slate-400 text-sm" 
              placeholder="Ví dụ: Peppa Pig Mùa 1" 
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
              <AlignLeft size={16} className="text-indigo-500" /> Mô tả ngắn
            </label>
            <textarea 
              required 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows={2} 
              className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none text-sm" 
              placeholder="Giới thiệu nội dung bộ phim..." 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
                <ImageIcon size={16} className="text-indigo-500" /> Ảnh bìa ngang
              </label>
              <input 
                required 
                value={thumbnailUrl} 
                onChange={e => setThumbnailUrl(e.target.value)} 
                className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-800 text-sm" 
                placeholder="https://..."
              />
            </div>
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
                <ImageIcon size={16} className="text-indigo-500" /> Ảnh đại diện (Vuông)
              </label>
              <input 
                required 
                value={avatarUrl} 
                onChange={e => setAvatarUrl(e.target.value)} 
                className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-800 text-sm" 
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
              <BarChart2 size={16} className="text-indigo-500" /> Độ khó
            </label>
            <div className="relative">
              <select 
                value={level} 
                onChange={e => setLevel(e.target.value)} 
                className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-700 appearance-none cursor-pointer text-sm"
              >
                <option value="Dễ">🟢 Mức độ Dễ</option>
                <option value="Trung bình">🟡 Mức độ Trung bình</option>
                <option value="Khó">🔴 Mức độ Khó</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          </div>

          <div className="p-4 md:p-5 border-t border-slate-200/50 flex gap-3 shrink-0 bg-slate-50/50 rounded-b-[2rem]">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 bg-slate-200/50 text-slate-600 font-bold rounded-xl hover:bg-slate-300/50 transition-colors border border-transparent hover:border-slate-300 text-sm"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-black rounded-xl hover:opacity-90 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] transition-all active:scale-95 text-sm"
            >
              {initialData ? "Cập nhật Phim" : "Tạo Phim Mới"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
