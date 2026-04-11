"use client";

import React from "react";
import {
  ChevronLeft,
  Search,
  Volume2,
  Trash2,
  MessageSquare,
  ExternalLink,
  Edit2,
} from "lucide-react";
import { Vocabulary, Topic } from "@/lib/types";
import { playAudio } from "@/lib/utils";

interface VocabularyListViewProps {
  topic: Topic;
  vocabularies: Vocabulary[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onBack: () => void;
  onDeleteTopic: (id: string, name: string) => void;
  onDeleteWord: (id: string, word: string) => void;
  onEditWord: (word: Vocabulary) => void;
  isOwner: boolean;
}

export default function VocabularyListView({
  topic,
  vocabularies,
  searchTerm,
  setSearchTerm,
  onBack,
  onDeleteTopic,
  onDeleteWord,
  onEditWord,
  isOwner,
}: VocabularyListViewProps) {
  const filteredVocab = vocabularies.filter((v) =>
    v.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in mb-10">
      {/* Header */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2.5 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl border border-indigo-100 transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 shadow-sm">
                  Chủ điểm
                </span>
                {vocabularies.length > 0 && (
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 shadow-sm animate-pulse-subtle">
                    {vocabularies.length} từ vựng
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                {topic.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group flex-1 md:flex-none">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Tìm từ vựng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 shadow-sm transition-all"
              />
            </div>
            {isOwner && (
              <button
                onClick={() => onDeleteTopic(topic.id, topic.name)}
                className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-100 shrink-0"
                title="Xóa chủ đề"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Body Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                Từ vựng
              </th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">
                Phát âm & Nghĩa
              </th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">
                Ghi chú
              </th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredVocab.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-medium">
                  {vocabularies.length === 0 ? "Chưa có từ vựng nào trong chủ điểm này." : "Không tìm thấy từ vựng phù hợp."}
                </td>
              </tr>
            ) : (
              filteredVocab.map((v) => (
                <tr key={v.id} className="group hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                        {v.word}
                      </span>
                      <div className="flex items-center gap-2 mt-2 md:hidden">
                        <span className="text-[10px] font-mono text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/50">
                          {v.ipa}
                        </span>
                      </div>
                      <div className="mt-2 md:hidden">
                         <p className="text-sm font-bold text-slate-600 leading-relaxed bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                          {Array.isArray(v.meanings) ? v.meanings.join(", ") : v.meanings}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-mono text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md self-start border border-indigo-100/50">
                        {v.ipa}
                      </span>
                      <p className="font-bold text-slate-700">
                        {Array.isArray(v.meanings) ? v.meanings.join(", ") : v.meanings}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <div className="max-w-xs">
                      {v.notes ? (
                        <div className="flex items-start gap-2 text-sm text-slate-500 italic leading-relaxed">
                          <MessageSquare size={14} className="mt-1 shrink-0 text-slate-400" />
                          <p className="line-clamp-2">{v.notes}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => playAudio(v.word)}
                        className="p-2 text-indigo-500 hover:bg-white hover:shadow-md rounded-lg transition-all active:scale-90"
                        title="Nghe"
                      >
                        <Volume2 size={18} />
                      </button>
                      <button
                        onClick={() => window.open(`https://dictionary.cambridge.org/dictionary/english/${v.word}`, '_blank')}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-lg transition-all"
                        title="Dịch chi tiết"
                      >
                        <ExternalLink size={18} />
                      </button>
                      {isOwner && (
                        <>
                          <button
                            onClick={() => onEditWord(v)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-lg transition-all"
                            title="Sửa từ"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => onDeleteWord(v.id, v.word)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:shadow-md rounded-lg transition-all ml-1"
                            title="Xóa từ"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
