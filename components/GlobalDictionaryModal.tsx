"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Volume2, BookmarkPlus, CheckCircle2, Loader2, BookOpen } from "lucide-react";
import { Topic } from "@/lib/types";
import { supabase } from "@/lib/supabase";

interface GlobalDictionaryModalProps {
  userCode: string;
  topics: Topic[];
}

export default function GlobalDictionaryModal({ userCode, topics }: GlobalDictionaryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dictData, setDictData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [existingTopicNames, setExistingTopicNames] = useState<string[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (topics && topics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(topics[0].id);
    }
  }, [topics]);

  useEffect(() => {
    const handleOpen = (e: CustomEvent<string>) => {
      setQuery(e.detail);
      setIsOpen(true);
      if (e.detail.trim()) {
        fetchDictionaryData(e.detail.trim());
      }
    };
    window.addEventListener("open-dictionary", handleOpen as EventListener);
    return () => window.removeEventListener("open-dictionary", handleOpen as EventListener);
  }, []);

  const fetchDictionaryData = async (word: string) => {
    setIsLoading(true);
    setError(null);
    setDictData(null);
    setSaveSuccess(false);
    setExistingTopicNames([]);

    if (topics && topics.length > 0) {
      try {
        const topicIds = topics.map(t => t.id);
        const { data: existingWords } = await supabase
          .from('vocabularies')
          .select('topic_id')
          .ilike('word', word.trim())
          .in('topic_id', topicIds);
          
        if (existingWords && existingWords.length > 0) {
          const foundTopicIds = existingWords.map(w => w.topic_id);
          const names = Array.from(new Set(topics.filter(t => foundTopicIds.includes(t.id)).map(t => t.name)));
          setExistingTopicNames(names);
        }
      } catch (e) {
        console.error("Failed to check existing words", e);
      }
    }

    try {
      // 1. Fetch Vietnamese Meaning via Google Translate
      const viUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(word)}`;
      const viRes = await fetch(viUrl);
      let viMeaning = "";
      if (viRes.ok) {
        const viData = await viRes.json();
        viMeaning = viData[0].map((t: any) => t[0]).join('');
      }

      // 2. Fetch English details via Free Dictionary API
      const enUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
      const enRes = await fetch(enUrl);
      
      if (!enRes.ok) {
        // Word not found in English dict, but we have Vietnamese translation
        setDictData({
          word,
          viMeaning: viMeaning || "Không tìm thấy nghĩa tiếng Việt",
          ipa: "",
          audio: null,
          meanings: []
        });
        setIsLoading(false);
        return;
      }

      const enData = await enRes.json();
      const firstEntry = enData[0];
      
      // Find valid audio
      let audioUrl = null;
      let ipaText = firstEntry.phonetic || "";
      if (firstEntry.phonetics && firstEntry.phonetics.length > 0) {
        const validPhonetic = firstEntry.phonetics.find((p: any) => p.audio && p.audio.length > 0);
        if (validPhonetic) {
          audioUrl = validPhonetic.audio;
          if (!ipaText && validPhonetic.text) ipaText = validPhonetic.text;
        }
      }
      
      setDictData({
        word: firstEntry.word,
        viMeaning,
        ipa: ipaText,
        audio: audioUrl,
        meanings: firstEntry.meanings || []
      });

    } catch (e: any) {
      setError("Đã xảy ra lỗi khi tải dữ liệu từ điển.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchDictionaryData(query.trim());
    }
  };

  const playAudio = () => {
    if (dictData?.audio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const newAudio = new Audio(dictData.audio);
      audioRef.current = newAudio;
      newAudio.play().catch(e => console.log("Audio play blocked", e));
    }
  };

  const handleSaveWord = async () => {
    if (!dictData || !selectedTopicId || !userCode) return;
    setIsSaving(true);
    
    try {
      const now = new Date().toISOString();
      const { error } = await supabase.from('vocabularies').insert({
        topic_id: selectedTopicId,
        word: dictData.word,
        ipa: dictData.ipa || '',
        meanings: [dictData.viMeaning],
        notes: '',
        review_interval: 0,
        next_review_date: now
      });
      
      if (error) throw error;
      setSaveSuccess(true);
      
      // Auto close after success?
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
    } catch (e: any) {
      console.error("Save error", e);
      alert("Không thể lưu từ vựng: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header & Search Bar */}
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <Search className="absolute left-4 text-slate-400" size={20} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tra từ tiếng Anh..."
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-12 text-slate-800 font-bold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </form>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 hide-scroll">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
                  <p className="font-medium">Đang tra cứu từ điển...</p>
                </div>
              ) : error ? (
                <div className="py-20 text-center text-rose-500 font-medium">
                  {error}
                </div>
              ) : dictData ? (
                <div className="space-y-8 animate-fade-in">
                  {/* Word Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-2">
                        {dictData.word}
                      </h2>
                      <div className="flex items-center gap-3">
                        {dictData.ipa && (
                          <span className="text-lg text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-lg">
                            {dictData.ipa}
                          </span>
                        )}
                        {dictData.audio && (
                          <button
                            onClick={playAudio}
                            className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 hover:scale-105 active:scale-95 transition-all shadow-sm"
                            title="Nghe phát âm"
                          >
                            <Volume2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Quick Save Box or Existing Label */}
                    {existingTopicNames.length > 0 ? (
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl w-56 shrink-0 flex flex-col gap-2 shadow-sm">
                        <label className="text-[10px] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Đã có trong danh sách
                        </label>
                        <div className="text-sm font-medium text-emerald-800 bg-emerald-100/50 py-2 px-3 rounded-xl border border-emerald-100 max-h-24 overflow-y-auto custom-scrollbar">
                          {existingTopicNames.map((name, i) => (
                            <div key={i} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
                              <BookOpen size={12} className="opacity-70 shrink-0 text-emerald-600" />
                              <span className="truncate leading-tight" title={name}>{name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : topics.length > 0 && (
                      <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-2xl w-56 shrink-0 flex flex-col gap-2 shadow-sm">
                        <label className="text-[10px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                          <BookOpen size={12} /> Lưu vào chủ đề
                        </label>
                        <select
                          value={selectedTopicId}
                          onChange={(e) => setSelectedTopicId(e.target.value)}
                          className="text-sm bg-white border border-indigo-100 rounded-xl py-1.5 px-2 font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-200"
                        >
                          {topics.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={handleSaveWord}
                          disabled={isSaving || saveSuccess}
                          className={`mt-1 py-2 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            saveSuccess 
                              ? "bg-emerald-500 text-white shadow-emerald-200" 
                              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl active:scale-95"
                          }`}
                        >
                          {isSaving ? <Loader2 size={16} className="animate-spin" /> : 
                           saveSuccess ? <><CheckCircle2 size={16} /> Đã lưu</> : 
                           <><BookmarkPlus size={16} /> Lưu từ vựng</>}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Vietnamese Meaning */}
                  {dictData.viMeaning && (
                    <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
                      <p className="text-sm font-black text-amber-500 uppercase tracking-wider mb-1">Nghĩa Tiếng Việt</p>
                      <p className="text-xl font-bold text-slate-800">{dictData.viMeaning}</p>
                    </div>
                  )}

                  {/* English Meanings */}
                  {dictData.meanings && dictData.meanings.length > 0 && (
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <p className="text-sm font-black text-slate-400 uppercase tracking-wider">Từ điển Anh - Anh</p>
                      {dictData.meanings.map((meaning: any, idx: number) => (
                        <div key={idx} className="space-y-3">
                          <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold text-sm rounded-lg capitalize">
                            {meaning.partOfSpeech}
                          </div>
                          <ul className="space-y-3">
                            {meaning.definitions.slice(0, 3).map((def: any, dIdx: number) => (
                              <li key={dIdx} className="pl-4 border-l-2 border-indigo-200">
                                <p className="text-slate-700 font-medium">{def.definition}</p>
                                {def.example && (
                                  <p className="text-slate-500 italic mt-1 text-sm">"{def.example}"</p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ) : (
                <div className="py-20 text-center text-slate-400 flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Search size={24} className="text-slate-300" />
                  </div>
                  <p className="font-medium text-lg">Nhập từ tiếng Anh để bắt đầu tra cứu</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
