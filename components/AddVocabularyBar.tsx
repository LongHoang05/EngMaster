"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Sparkles, X, Volume2, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AutocompleteWord, DictSuggestion, Topic } from "@/lib/types";
import { playAudio, playSuccessSound } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface AddVocabularyBarProps {
  selectedTopic: Topic;
  userCode: string | null;
  onSuccess: () => void;
  onStartFlashcards: () => void;
  hasVocab: boolean;
}

export default function AddVocabularyBar({
  selectedTopic,
  userCode,
  onSuccess,
  onStartFlashcards,
  hasVocab,
}: AddVocabularyBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteWord[]>([]);
  const [dictInfo, setDictInfo] = useState<DictSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const isOwner = selectedTopic.user_code === userCode;

  // Autocomplete logic
  useEffect(() => {
    if (!showSuggestions) return;
    
    const timer = setTimeout(async () => {
      if (inputValue.length >= 1 && isOwner) {
        try {
          const res = await fetch(`https://api.datamuse.com/sug?s=${inputValue}`);
          const data = await res.json();
          setSuggestions(data.slice(0, 5));
        } catch (e) {
          console.error(e);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, isOwner, showSuggestions]);

  // Helper for translation
  const translateText = async (text: string) => {
    try {
      const tRes = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`
      );
      const tData = await tRes.json();
      return tData?.[0]?.[0]?.[0] || text;
    } catch (e) {
      return text;
    }
  };

  const fetchDictionary = async (word: string) => {
    if (!word.trim()) return;
    setIsLoading(true);
    setDictInfo(null);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const item = data[0];
        const originalDef = item.meanings[0].definitions[0].definition;
        const originalExample = item.meanings[0].definitions[0].example;
        
        // Parallel translation for speed
        const [translatedDef, translatedExample] = await Promise.all([
          translateText(originalDef),
          originalExample ? translateText(originalExample) : Promise.resolve(undefined)
        ]);

        setDictInfo({
          word: item.word,
          ipa:
            item.phonetic ||
            item.phonetics?.find((p: { text: string }) => p.text)?.text ||
            "",
          partOfSpeech: item.meanings[0].partOfSpeech,
          definition: translatedDef,
          example: translatedExample,
          audioUrl: item.phonetics?.find(
            (p: { audio: string }) => p.audio && p.audio.length > 0
          )?.audio,
        });
      } else {
        toast.error("Không tìm thấy từ này trong từ điển.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Lỗi khi tra từ điển.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAdd = async () => {
    if (!selectedTopic || !dictInfo) return;
    setIsAdding(true);
    try {
      const { error } = await supabase.from("vocabularies").insert({
        topic_id: selectedTopic.id,
        word: dictInfo.word,
        ipa: dictInfo.ipa,
        meanings: [dictInfo.definition],
        notes: dictInfo.example || "",
      });

      if (error) throw error;
      toast.success(`Đã thêm "${dictInfo.word}"`);
      playSuccessSound();
      onSuccess();
      setDictInfo(null);
      setInputValue("");
      setIsInputExpanded(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div ref={containerRef} className="w-full space-y-4 relative z-[50]">
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-4 md:p-6 shadow-2xl shadow-indigo-100/50 border border-white relative animate-fade-in group overflow-visible">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div
            className={`relative flex-1 group w-full transition-all duration-500 ${
              isInputExpanded ? "md:flex-[2]" : ""
            }`}
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <Search size={22} className={isLoading ? "animate-pulse" : ""} />
            </div>
            <input
              type="text"
              value={inputValue}
              onFocus={() => isOwner && setIsInputExpanded(true)}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  fetchDictionary(inputValue.trim());
                  setSuggestions([]);
                }
              }}
              placeholder={
                isOwner
                  ? "Nhập từ tiếng Anh (nhấn Enter để tra)..."
                  : "Chủ điểm được chia sẻ"
              }
              readOnly={!isOwner}
              className="w-full pl-14 pr-6 py-4 md:py-5 bg-slate-50/50 border-2 border-slate-100 rounded-3xl text-lg font-bold text-slate-800 outline-none focus:border-indigo-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] transition-all placeholder:font-medium placeholder:text-slate-300"
            />

            {/* Autocomplete Suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[200] overflow-hidden divide-y divide-slate-50"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s.word}
                      onClick={() => {
                        setShowSuggestions(false);
                        setInputValue(s.word);
                        setSuggestions([]);
                        fetchDictionary(s.word);
                      }}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors group/item"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen size={16} className="text-slate-400 group-hover/item:text-indigo-500" />
                        <span className="font-bold text-slate-700 group-hover/item:text-indigo-600">
                          {s.word}
                        </span>
                      </div>
                      <Plus
                        size={16}
                        className="text-slate-300 group-hover/item:text-indigo-500 group-hover/item:scale-125 transition-transform"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`flex gap-3 w-full md:w-auto shrink-0 transition-all duration-300 ${isInputExpanded ? "max-md:opacity-0 max-md:pointer-events-none max-md:absolute" : ""}`}>
            <button
              disabled={!hasVocab}
              onClick={onStartFlashcards}
              className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 md:py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 disabled:opacity-50 disabled:grayscale transition-all active:scale-95 group/btn"
            >
              <Sparkles size={20} className="group-hover/btn:animate-spin" />
              <span>Học Flashcards</span>
            </button>
          </div>
        </div>

        {/* Dictionary Card Result */}
        <AnimatePresence>
          {dictInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-8 p-5 md:p-8 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 rounded-3xl border-2 border-indigo-100/50 shadow-xl relative group/card">
                <button
                  onClick={() => setDictInfo(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-4xl font-black text-slate-800 tracking-tight">
                          {dictInfo.word}
                        </h3>
                        <span className="text-xs font-black text-indigo-500 bg-indigo-100/50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-[0.1em]">
                          {dictInfo.partOfSpeech}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-mono text-indigo-400/80 font-bold">
                          {dictInfo.ipa}
                        </span>
                        <button
                          onClick={() => playAudio(dictInfo.word)}
                          className="p-3 text-indigo-600 bg-white shadow-sm border border-indigo-100 rounded-full hover:scale-110 active:scale-95 transition-all"
                        >
                          <Volume2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">
                        <BookOpen size={12} /> Nghĩa tiếng Việt
                      </label>
                      <textarea
                        className="w-full text-xl font-bold text-slate-700 leading-relaxed bg-white/80 border-2 border-indigo-50 hover:border-indigo-200 focus:border-indigo-400 outline-none p-4 rounded-2xl resize-none transition-all shadow-inner"
                        value={dictInfo.definition}
                        onChange={(e) =>
                          setDictInfo({ ...dictInfo, definition: e.target.value })
                        }
                        placeholder="Nhập nghĩa tiếng Việt..."
                        rows={2}
                      />
                    </div>

                    {dictInfo.example && (
                      <div className="bg-white/50 p-4 rounded-2xl border border-indigo-50/50 text-slate-500 italic text-sm relative">
                        <div className="absolute -left-1 top-4 w-1 h-6 bg-indigo-300 rounded-full" />
                        {`"${dictInfo.example}"`}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleConfirmAdd}
                    disabled={isAdding}
                    className="w-full md:w-auto px-12 py-6 bg-emerald-500 text-white font-black rounded-3xl shadow-2xl shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg disabled:opacity-50"
                  >
                    {isAdding ? (
                      <Loader2 size={24} className="animate-spin" />
                    ) : (
                      <>
                        <Plus size={24} /> <span>Thêm vào bảng</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isOwner && (
         <div className="flex items-center gap-2 px-6 py-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 text-xs font-bold shadow-sm animate-fade-in">
            <AlertCircle size={16} />
            Chế độ xem: Bạn không thể thêm từ vào chủ điểm của người khác.
         </div>
      )}
    </div>
  );
}
