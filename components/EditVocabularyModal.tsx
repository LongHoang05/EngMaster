"use client";

import React, { useState, useEffect } from "react";
import { X, Edit3, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Vocabulary } from "@/lib/types";

interface EditVocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  wordData: Vocabulary | null;
  onSuccess: () => void;
}

export default function EditVocabularyModal({
  isOpen,
  onClose,
  wordData,
  onSuccess,
}: EditVocabularyModalProps) {
  const [word, setWord] = useState("");
  const [ipa, setIpa] = useState("");
  const [meanings, setMeanings] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (wordData) {
      setWord(wordData.word);
      setIpa(wordData.ipa || "");
      setMeanings(
        Array.isArray(wordData.meanings)
          ? wordData.meanings.join(", ")
          : wordData.meanings || ""
      );
      setNotes(wordData.notes || "");
    }
  }, [wordData]);

  if (!isOpen || !wordData) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !meanings.trim()) {
      toast.error("Vui lòng nhập đầy đủ từ và ý nghĩa.");
      return;
    }

    setIsSaving(true);
    try {
      // Chuẩn hóa nghĩa thành mảng
      const meaningsArray = meanings
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      const { error } = await supabase
        .from("vocabularies")
        .update({
          word: word.trim(),
          ipa: ipa.trim(),
          meanings: meaningsArray,
          notes: notes.trim(),
        })
        .eq("id", wordData.id);

      if (error) throw error;

      toast.success(`Đã cập nhật từ "${word}"`);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating word:", err);
      toast.error("Không thể cập nhật từ vựng.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Edit3 size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Chỉnh sửa từ vựng</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleUpdate} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="col-span-1">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Từ tiếng Anh
              </label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Phát âm (IPA)
              </label>
              <input
                type="text"
                value={ipa}
                onChange={(e) => setIpa(e.target.value)}
                placeholder="/pʰəʊˈniːm/"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-mono text-indigo-600 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Nghĩa tiếng Việt (cách nhau bằng dấu phẩy)
              </label>
              <textarea
                rows={2}
                value={meanings}
                onChange={(e) => setMeanings(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner resize-none"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Ghi chú / Ví dụ
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-600 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner resize-none font-medium text-sm"
                placeholder="Thêm ngữ cảnh hoặc ví dụ..."
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-95 text-lg"
            >
              {isSaving ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Lưu thay đổi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
