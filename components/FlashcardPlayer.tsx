"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import { Volume2, ChevronLeft, Sparkles } from "lucide-react";
import { Vocabulary } from "@/lib/types";
import { playAudio } from "@/lib/utils";

interface FlashcardPlayerProps {
  queue: Vocabulary[];
  onFinish: () => void;
  onAnswer: (wordId: string, known: boolean) => void;
  onBack: () => void;
}

export default function FlashcardPlayer({
  queue,
  onFinish,
  onAnswer,
  onBack,
}: FlashcardPlayerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitDirection, setExitDirection] = useState(-1);
  const [totalCount] = useState(queue.length);
  const currentWord = queue[0];

  const progress = totalCount > 0 ? ((totalCount - queue.length) / totalCount) * 100 : 0;

  // Motion values for swipe
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const scale = useTransform(x, [-150, 0, 150], [0.9, 1, 0.9]);

  // Opacity for "Known" and "Learn Again" indicators
  const swipeIconOpacityRight = useTransform(x, [50, 150], [0, 1]); // Swipe right = "Thuộc"
  const swipeIconOpacityLeft = useTransform(x, [-50, -150], [0, 1]); // Swipe left = "Học lại"
  const swipeBackground = useTransform(
    x,
    [-150, 0, 150],
    ["rgba(244, 63, 94, 0.15)", "rgba(255, 255, 255, 0)", "rgba(34, 197, 94, 0.15)"]
  );

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe(true);
    } else if (info.offset.x < -100) {
      handleSwipe(false);
    }
  };

  const handleSwipe = (known: boolean) => {
    setExitDirection(known ? 1 : -1);
    setIsFlipped(false);
    onAnswer(currentWord.id, known);
  };

  if (!currentWord) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col items-center relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-inner animate-bounce">
          <Sparkles size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-3 tracking-tight">
          Tuyệt vời!
        </h2>
        <p className="text-slate-500 mb-10 max-w-sm text-lg font-medium leading-relaxed">
          Bạn đã hoàn thành việc ôn tập tất cả các thẻ trong danh sách này.
        </p>
        <button
          onClick={onFinish}
          className="w-full sm:w-auto px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 text-lg"
        >
          Quay lại danh sách
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-3 bg-white text-slate-500 hover:text-indigo-600 rounded-2xl hover:bg-indigo-50 border border-slate-100 transition-all shadow-sm active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm">
              Smart Flashcards
            </span>
          </div>
          <div className="w-12 text-right">
             <span className="text-sm font-black text-slate-400">
               {totalCount - queue.length + 1}/{totalCount}
             </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] shadow-[0_0_15px_rgba(99,102,241,0.4)]"
            initial={{ width: 0 }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: ["0% 0%", "100% 0%"]
            }}
            transition={{ 
              width: { type: "spring", stiffness: 50 },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
        </div>
      </div>

      <div className="relative h-[400px] w-full perspective-2000 mb-12">
        {/* Stack Effect Background Cards */}
        <div className="absolute inset-x-8 md:inset-x-12 top-6 bottom-0 bg-white rounded-[3rem] border border-slate-100 shadow-sm opacity-30 scale-90 translate-y-4 origin-bottom pointer-events-none z-0" />
        <div className="absolute inset-x-4 md:inset-x-6 top-3 bottom-0 bg-white rounded-[3rem] border border-slate-100 shadow-sm opacity-60 scale-95 translate-y-2 origin-bottom pointer-events-none z-[1]" />

        <AnimatePresence mode="wait" custom={exitDirection}>
          <motion.div
            key={currentWord.id}
            custom={exitDirection}
            style={{ x, rotate, scale }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing z-10 w-full h-full"
            whileTap={{ scale: 0.98 }}
            variants={{
              initial: { x: 0, y: 50, opacity: 0, scale: 0.9 },
              animate: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 },
              exit: (direction: number) => ({
                x: direction === 1 ? 300 : -300,
                opacity: 0,
                rotate: direction === 1 ? 10 : -10,
              }),
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <motion.div
              className="relative w-full h-full"
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              style={{
                transformStyle: "preserve-3d",
              }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* MẶT TRƯỚC */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-slate-100 text-center shadow-2xl shadow-indigo-100/30"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  zIndex: isFlipped ? 0 : 1,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-2.5 bg-indigo-500/10 rounded-t-[3rem]" />
                <div className="absolute inset-0 p-6 md:p-10 z-10 w-full flex flex-col items-center justify-center gap-6">
                  <div className="space-y-4 w-full px-2 max-w-[90%]">
                    <h2
                      className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-tight break-keep"
                      style={{ wordBreak: "keep-all", overflowWrap: "normal" }}
                    >
                      {currentWord.word}
                    </h2>
                    {currentWord.ipa && (
                      <p className="text-lg md:text-xl text-indigo-400 font-mono font-bold tracking-widest bg-indigo-50 px-6 py-2 rounded-2xl border border-indigo-100/50 inline-block shadow-sm">
                        {currentWord.ipa}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(currentWord.word);
                    }}
                    className="p-5 md:p-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all hover:scale-110 shadow-2xl shadow-indigo-200 active:scale-95 group mt-2"
                  >
                    <Volume2 size={32} className="group-hover:animate-pulse" />
                  </button>
                </div>
                <div className="absolute bottom-8 left-0 right-0 z-10 w-full flex flex-col gap-2 pointer-events-none opacity-40 items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        Chạm để lật thẻ
                     </p>
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* MẶT SAU */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-600 rounded-[3rem] p-8 md:p-12 text-center text-white overflow-y-auto hide-scroll shadow-inner border-2 border-indigo-400/30"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  zIndex: isFlipped ? 1 : 0,
                }}
              >
                 <div className="absolute top-0 left-0 right-0 h-2.5 bg-white/20 rounded-t-[3rem]" />
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full space-y-8 max-w-[95%]">
                  <div className="space-y-4 w-full">
                    <p className="text-[10px] sm:text-xs font-black text-indigo-200 uppercase tracking-[0.4em]">Định nghĩa</p>
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-relaxed tracking-wide w-full px-2"
                      style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
                    >
                      {Array.isArray(currentWord.meanings) ? currentWord.meanings[0] : currentWord.meanings}
                    </h2>
                  </div>

                  <div className="opacity-100 flex flex-row items-center justify-between gap-4 bg-white/10 backdrop-blur-2xl p-4 sm:p-6 rounded-[2rem] w-full max-w-xl border border-white/20 shadow-2xl">
                    <div className="space-y-1 text-left min-w-0 pr-4">
                       <p className="text-xl sm:text-2xl font-black tracking-tighter truncate">{currentWord.word}</p>
                       {currentWord.ipa && (
                        <p className="font-mono text-indigo-100 text-xs sm:text-sm font-bold opacity-80 truncate">
                          {currentWord.ipa}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(currentWord.word);
                      }}
                      className="shrink-0 p-3 sm:p-4 text-indigo-600 bg-white hover:bg-slate-50 hover:scale-110 active:scale-95 rounded-full transition-all shadow-2xl"
                    >
                      <Volume2 size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Top-level Overlay for Swipe Activity */}
            <motion.div
              className="absolute inset-0 z-50 pointer-events-none flex items-center justify-between px-8 md:px-12 rounded-[3rem] overflow-hidden"
              style={{ backgroundColor: swipeBackground }}
            >
              <motion.div
                style={{ opacity: swipeIconOpacityRight }}
                className="relative z-25 text-emerald-500 font-black border-4 border-emerald-500 rounded-[2.5rem] p-6 rotate-[-15deg] uppercase tracking-[0.3em] bg-white shadow-2xl text-xl sm:text-2xl"
              >
                Đã thuộc
              </motion.div>
              <motion.div
                style={{ opacity: swipeIconOpacityLeft }}
                className="relative z-25 text-rose-500 font-black border-4 border-rose-500 rounded-[2.5rem] p-6 rotate-[15deg] uppercase tracking-[0.3em] bg-white shadow-2xl text-xl sm:text-2xl"
              >
                Học lại
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-8 mt-12 w-full px-4 max-w-4xl mx-auto">
        <button
          onClick={() => handleSwipe(false)}
          className="flex-1 py-5 bg-white border-2 border-slate-100 text-rose-500 font-black rounded-[2rem] hover:bg-rose-50 hover:border-rose-100 transition-all shadow-md active:scale-95 uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2"
        >
          <span>Học lại</span>
        </button>
        <button
          onClick={() => handleSwipe(true)}
          className="flex-1 py-5 bg-indigo-600 text-white font-black rounded-[2rem] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-95 uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2"
        >
          <span>Đã thuộc</span>
        </button>
      </div>
    </div>
  );
}
