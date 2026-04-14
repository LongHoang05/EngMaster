"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, Trophy } from "lucide-react";
import { playSuccessSound } from "@/lib/utils";

interface StreakCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  streakCount: number;
}

const SLOGANS = [
  "Godlike! Chuỗi học từ vựng không thể cản phá! ⚔️",
  "Mega Kill! Quét sạch kho từ vựng hôm nay! 🏆",
  "Out trình rồi! Đánh bại sự lười biếng thành công! 💯",
  "There's No One At All có thể cản bước bạn lúc này! 👑",
  "Cứ Making My Way, đỉnh cao từ vựng không còn xa! 🌟",
  "Đừng ngập ngừng, cứ bước đi! Chuỗi lửa đang cháy rất to! 🔥",
  "Đỉnh của chóp! 10 điểm không có nhưng! ✨",
  "Học cháy thế này thì TOEIC chỉ là chuyện nhỏ! 😎",
  "Kỷ luật tạo nên sự tự do! Cháy tiếp nào Học giả! 🌋",
];

export default function StreakCelebration({
  isOpen,
  onClose,
  streakCount,
}: StreakCelebrationProps) {
  const [randomSlogan, setRandomSlogan] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRandomSlogan(SLOGANS[Math.floor(Math.random() * SLOGANS.length)]);
      playSuccessSound();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/90 backdrop-blur-xl p-4 overflow-hidden"
      >
        {/* Animated Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: "110%", 
                opacity: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: "-10%", 
                opacity: [0, 1, 0.5, 0],
                rotate: 360
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-2 h-2 bg-orange-400 rounded-full blur-[1px]"
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1.1, opacity: 0, y: -50 }}
          transition={{ 
            type: "spring", 
            damping: 15, 
            stiffness: 100 
          }}
          className="relative w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3rem] p-8 md:p-10 border border-white/10 shadow-[0_0_100px_rgba(249,115,22,0.2)] text-center"
        >
          {/* Flame Icon with Glow */}
          <motion.div 
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative mx-auto w-32 h-32 mb-8"
          >
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-[40px] opacity-40 animate-pulse" />
            <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-orange-400 to-rose-600 rounded-full shadow-2xl">
              <Flame size={64} className="text-white fill-white animate-bounce-subtle" />
            </div>
          </motion.div>

          {/* Streak Number */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 tracking-tighter mb-2">
              {streakCount}
            </h2>
            <p className="text-xl font-black text-orange-200/80 uppercase tracking-[0.2em] mb-6">
              Ngày liên tiếp
            </p>
          </motion.div>

          {/* Slogan */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-10 px-4"
          >
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-lg font-bold text-white leading-relaxed">
                {randomSlogan}
              </p>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-full py-5 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-orange-900/40 border-t border-white/20 transition-all flex items-center justify-center gap-3"
          >
            <span>Tiếp tục học cháy</span>
            <Sparkles size={24} className="animate-pulse" />
          </motion.button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <Trophy size={14} />
            Kỷ lục mới của bạn!
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
