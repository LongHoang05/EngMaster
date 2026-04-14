"use client";

import React, { useState } from "react";
import { X, Layout, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface AddTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCode: string;
  onSuccess: () => void;
}

export default function AddTopicModal({
  isOpen,
  onClose,
  userCode,
  onSuccess,
}: AddTopicModalProps) {
  const [newTopicName, setNewTopicName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isAddingTopic, setIsAddingTopic] = useState(false);

  if (!isOpen) return null;

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    setIsAddingTopic(true);
    try {
      const { error } = await supabase.from("topics").insert({
        name: newTopicName,
        category_name: categoryName.trim() || undefined,
        user_code: userCode,
      });

      if (error) throw error;

      toast.success("Đã tạo chủ đề mới!");
      setNewTopicName("");
      setCategoryName("");
      onSuccess();
      onClose();
    } catch {
      toast.error("Lỗi thêm: Vui lòng thử lại.");
    } finally {
      setIsAddingTopic(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Layout size={20} />
             </div>
             <h3 className="text-lg font-black text-slate-800 tracking-tight">Thêm chủ đề mới</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleCreateTopic} className="p-8">
          <div className="mb-8">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Tên chủ đề từ vựng
            </label>
            <input
              autoFocus
              type="text"
              placeholder="Ví dụ: IELTS Listening Part 1, Oxford 3000..."
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all placeholder:font-medium placeholder:text-slate-300"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Phân loại danh mục (Không bắt buộc)
            </label>
            <input
              type="text"
              placeholder="VD: Từ vựng IELTS, Oxford 3000..."
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all placeholder:font-medium placeholder:text-slate-300"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isAddingTopic || !newTopicName.trim()}
              className="flex-[2] py-3.5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isAddingTopic ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Plus size={20} /> Tạo chủ đề
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
