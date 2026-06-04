"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Loader2,
  Volume2,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Topic, Vocabulary } from "@/lib/types";
import { playAudio, playSuccessSound, playFailSound, normalizeText } from "@/lib/utils";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface QuizContainerProps {
  topics: Topic[];
  userCode: string;
  onQuizCompleted: () => void;
  onUnsavedChange?: (isUnsaved: boolean) => void;
}

export default function QuizContainer({
  topics,
  userCode,
  onQuizCompleted,
  onUnsavedChange,
}: QuizContainerProps) {
  const [quizState, setQuizState] = useState<
    "topic_selection" | "config" | "playing" | "result"
  >("topic_selection");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  useEffect(() => {
    if (onUnsavedChange) {
      onUnsavedChange(quizState === "playing");
    }
  }, [quizState, onUnsavedChange]);

  // Quiz Configs
  const [quizType, setQuizType] = useState("multiple_choice");
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(0); // seconds, 0 = infinite
  const [playMode, setPlayMode] = useState<"practice" | "survival" | "time_attack">("practice");

  // Game Stats
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wrongQuestions, setWrongQuestions] = useState<any[]>([]);

  // Quiz Data
  const [allWords, setAllWords] = useState<Vocabulary[]>([]);
  const [questions, setQuestions] = useState<{
    wordObject: Vocabulary;
    promptText: string;
    promptSub: string;
    correctAnswerText: string;
    options: string[];
    type: string;
    fails: number;
  }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoadingWords, setIsLoadingWords] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [testedWordIds, setTestedWordIds] = useState<Set<string>>(new Set());
  const [currentSourceWords, setCurrentSourceWords] = useState<Vocabulary[]>([]);

  // Trạng thái câu hỏi hiện tại
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  const toggleCat = (catName: string) => {
    setExpandedCats((prev) => ({
      ...prev,
      [catName]: prev[catName] === false ? true : false,
    }));
  };

  // Bắt phím tắt A,B,C,D / 1,2,3,4
  useEffect(() => {
    if (quizState !== "playing" || isAnswered || quizType !== "multiple_choice") return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      
      const key = e.key.toLowerCase();
      const options = questions[currentIndex]?.options;
      if (!options || options.length === 0) return;

      if (key === '1' || key === 'a') handleOptionClick(options[0]);
      if (key === '2' || key === 'b') handleOptionClick(options[1]);
      if (key === '3' || key === 'c') handleOptionClick(options[2]);
      if (key === '4' || key === 'd') handleOptionClick(options[3]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quizState, isAnswered, currentIndex, questions, quizType]);

  // Confetti effect on high score
  useEffect(() => {
    if (quizState === "result" && currentIndex > 0 && (score / currentIndex) >= 0.8) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899']
      });
    }
  }, [quizState, score, currentIndex]);

  useEffect(() => {
    if (quizState === "playing" && !isAnswered && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isAnswered, quizState]);

  // Timer effect
  useEffect(() => {
    let ctx: AudioContext | null = null;

    if (quizState === "playing" && timeLimit > 0) {
      if (playMode === "time_attack") {
        try {
          ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {}
      }

      setTimeLeft(timeLimit);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setEndTime(Date.now());
            setQuizState("result");
            onQuizCompleted();
            toast.info("Hết thời gian!");
            return 0;
          }

          // Phát âm thanh nhịp tim / tiếng đồng hồ điện ảnh
          if (playMode === "time_attack" && ctx) {
            try {
              if (ctx.state === "suspended") ctx.resume();
              
              const isUrgent = prev <= 11;
              
              const playBeat = (urgent: boolean) => {
                if (!ctx) return;
                const t = ctx.currentTime;
                
                // 1. Tiếng Bass dồn (Thump/Heartbeat - Căng thẳng)
                const bass = ctx.createOscillator();
                const bassGain = ctx.createGain();
                bass.type = "sine";
                bass.frequency.setValueAtTime(urgent ? 100 : 50, t);
                bass.frequency.exponentialRampToValueAtTime(10, t + (urgent ? 0.2 : 0.4));
                bassGain.gain.setValueAtTime(urgent ? 0.9 : 0.5, t);
                bassGain.gain.exponentialRampToValueAtTime(0.01, t + (urgent ? 0.2 : 0.4));
                bass.connect(bassGain);
                bassGain.connect(ctx.destination);
                bass.start(t);
                bass.stop(t + (urgent ? 0.2 : 0.4));

                // 2. Tiếng Kim đồng hồ sắc lạnh (High Click)
                const click = ctx.createOscillator();
                const clickGain = ctx.createGain();
                click.type = "square";
                click.frequency.setValueAtTime(urgent ? 2000 : 1000, t);
                clickGain.gain.setValueAtTime(urgent ? 0.15 : 0.05, t);
                clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
                click.connect(clickGain);
                clickGain.connect(ctx.destination);
                click.start(t);
                click.stop(t + 0.05);
              };

              // Nhịp đầu tiên của mỗi giây
              playBeat(isUrgent);
              
              // 10 giây cuối: Nhịp tim đập nhanh gấp đôi (thêm 1 nhịp ở giữa giây)
              if (isUrgent) {
                setTimeout(() => playBeat(true), 400); 
              }

            } catch (e) {}
          }

          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (ctx) ctx.close().catch(() => {});
    };
  }, [quizState, timeLimit, playMode]);

  const fetchWordsAndStartQuiz = async () => {
    setIsLoadingWords(true);
    try {
      const { data, error } = await supabase
        .from("vocabularies")
        .select("*")
        .in("topic_id", selectedTopics);
      if (error) throw error;
      const words = data || [];
      if (words.length === 0) {
        toast.error("Các chủ đề đã chọn chưa có từ vựng nào!");
        setIsLoadingWords(false);
        return;
      }
      setAllWords(words);
      setTestedWordIds(new Set());
      generateQuiz(words, false, new Set());
    } catch (err) {
      const error = err as Error;
      console.error("Fetch quiz words error:", error);
      toast.error("Không thể lấy từ vựng. Vui lòng thử lại.");
    } finally {
      setIsLoadingWords(false);
    }
  };

  const generateQuiz = (wordsOverride?: Vocabulary[], isRetry: boolean = false, overrideTestedIds?: Set<string>) => {
    const words = wordsOverride || allWords;
    let sourceWords: Vocabulary[] = [];
    let currentTestedIds = overrideTestedIds || testedWordIds;

    if (isRetry) {
      sourceWords = currentSourceWords;
    } else {
      let remaining = words.filter(w => !currentTestedIds.has(w.id));
      if (remaining.length === 0) {
        remaining = words;
        currentTestedIds = new Set();
      }
      if (questionCount >= 9999) {
        sourceWords = [...remaining].sort(() => 0.5 - Math.random());
      } else {
        // Pick the next sequential words but shuffle them internally
        sourceWords = [...remaining].slice(0, questionCount).sort(() => 0.5 - Math.random());
      }
      
      sourceWords.forEach(w => currentTestedIds.add(w.id));
    }

    setCurrentSourceWords(sourceWords);
    setTestedWordIds(new Set(currentTestedIds));

    const newQuestions = sourceWords.map((wordObj) => {
      let promptText = wordObj.word;
      let promptSub = wordObj.ipa;
      let correctAnswerText = Array.isArray(wordObj.meanings) ? wordObj.meanings[0] : wordObj.meanings;
      let options: string[] = [];

      if (quizType === "typing_vi_to_en") {
        promptText = Array.isArray(wordObj.meanings) ? wordObj.meanings[0] : wordObj.meanings;
        promptSub = "";
        correctAnswerText = wordObj.word;
      } else if (quizType === "multiple_choice") {
        const wrongAnswers = words
          .filter((w) => w.id !== wordObj.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((w) => (Array.isArray(w.meanings) ? w.meanings[0] : w.meanings));
        options = [
          ...wrongAnswers,
          Array.isArray(wordObj.meanings) ? wordObj.meanings[0] : wordObj.meanings,
        ].sort(() => 0.5 - Math.random());
      } else if (quizType === "listening_en_to_vi") {
        promptSub = "";
      } else if (quizType === "listening_en_to_en") {
        promptSub = "";
        correctAnswerText = wordObj.word;
      }

      return {
        wordObject: wordObj,
        promptText,
        promptSub,
        correctAnswerText,
        options,
        type: quizType,
        fails: 0,
      };
    });

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setIsAnswerCorrect(null);
    setSelectedAnswer(null);
    setInputText("");
    
    // Reset Game Stats
    setLives(3);
    setStreak(0);
    setHighestStreak(0);
    setStartTime(Date.now());
    setEndTime(null);
    setWrongQuestions([]);

    // For time attack, force 60 seconds
    if (playMode === "time_attack") setTimeLimit(60);

    setQuizState("playing");
  };

  const handleNextQuestion = (isCorrect: boolean) => {
    const currentQ = questions[currentIndex];
    const newQuestions = [...questions];

    if (!isCorrect) {
      const clonedQ = { ...currentQ, fails: currentQ.fails + 1 };
      newQuestions.push(clonedQ);
      newQuestions[currentIndex] = { ...currentQ, fails: currentQ.fails + 1 };
      setQuestions(newQuestions);
    }

    const isLast = currentIndex === newQuestions.length - 1;

    if (isLast) {
      setEndTime(Date.now());
      setQuizState("result");
      onQuizCompleted();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setIsAnswerCorrect(null);
      setSelectedAnswer(null);
      setInputText("");
    }
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);

    const isCorrect = option === questions[currentIndex].correctAnswerText;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      playSuccessSound();
      if (questions[currentIndex].fails === 0) setScore((prev) => prev + 1);
      setStreak((prev) => {
        const n = prev + 1;
        if (n > highestStreak) setHighestStreak(n);
        return n;
      });
    } else {
      playFailSound();
      setStreak(0);
      setWrongQuestions(prev => [...prev, { ...questions[currentIndex], userSelected: option }]);
      if (playMode === "survival") {
        setLives((prev) => prev - 1);
      }
    }

    const delay = isCorrect ? 800 : 1500;
    setTimeout(() => {
      if (playMode === "survival" && lives <= 1 && !isCorrect) {
        setEndTime(Date.now());
        setQuizState("result");
        onQuizCompleted();
        return;
      }
      handleNextQuestion(isCorrect);
    }, delay);
  };

  const handleTypingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered || !inputText.trim()) return;
    setIsAnswered(true);

    const userAnswer = normalizeText(inputText);
    const currentQ = questions[currentIndex];
    const wordObj = currentQ.wordObject;

    let acceptableAnswers: string[] = [];

    if (
      currentQ.type === "typing_vi_to_en" ||
      currentQ.type === "listening_en_to_en"
    ) {
      acceptableAnswers = [normalizeText(currentQ.correctAnswerText)];
    } else {
      const meanings = Array.isArray(wordObj.meanings)
        ? wordObj.meanings
        : [wordObj.meanings || ""];
      acceptableAnswers = meanings.map((m: string | string[]) => normalizeText(String(m)));
    }

    const isCorrect = acceptableAnswers.some(
      (ans) =>
        ans === userAnswer ||
        (userAnswer.length >= 2 && ans.includes(userAnswer)) ||
        (ans.length >= 2 && userAnswer.includes(ans)),
    );

    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      playSuccessSound();
      if (currentQ.fails === 0) setScore((prev) => prev + 1);
      setStreak((prev) => {
        const n = prev + 1;
        if (n > highestStreak) setHighestStreak(n);
        return n;
      });
    } else {
      playFailSound();
      setStreak(0);
      setWrongQuestions(prev => [...prev, { ...currentQ, userSelected: userAnswer }]);
      if (playMode === "survival") {
        setLives((prev) => prev - 1);
      }
    }

    const delay = isCorrect ? 800 : 2000;
    setTimeout(() => {
      if (playMode === "survival" && lives <= 1 && !isCorrect) {
        setEndTime(Date.now());
        setQuizState("result");
        onQuizCompleted();
        return;
      }
      handleNextQuestion(isCorrect);
    }, delay);
  };

  if (quizState === "topic_selection") {
    return (
      <div className="max-w-xl mx-auto text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-fade-in">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <BookOpen size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Kiểm tra kiến thức
        </h2>
        <p className="text-slate-600 mb-6">
          Chọn các buổi học để tạo đề kiểm tra ngẫu nhiên.
        </p>

        {topics.length === 0 ? (
          <p className="text-slate-400 py-8 italic">
            Bạn chưa có chủ đề nào. Hãy tạo và thêm từ vựng trước.
          </p>
        ) : (
          <>
        {(() => {
          const groupedTopics = topics.reduce(
            (acc, topic) => {
              const cat =
                topic.category_name ||
                (topic.user_code === userCode
                  ? "Từ vựng cá nhân"
                  : "Chủ đề hệ thống");
              if (!acc[cat]) acc[cat] = [];
              acc[cat].push(topic);
              return acc;
            },
            {} as Record<string, Topic[]>,
          );

          if (!groupedTopics["Từ vựng cá nhân"]) {
            groupedTopics["Từ vựng cá nhân"] = [];
          }

          const sortedCats = Object.entries(groupedTopics).sort(([a], [b]) => {
            if (a === "Từ vựng cá nhân") return -1;
            if (b === "Từ vựng cá nhân") return 1;
            if (a.toUpperCase() === "ATHENA ENGLISH") return -1;
            if (b.toUpperCase() === "ATHENA ENGLISH") return 1;
            return a.localeCompare(b);
          });

          return (
            <div className="max-h-[40vh] overflow-y-auto overflow-x-hidden w-full mb-6 bg-slate-50 border border-slate-100 rounded-xl text-left hide-scroll shadow-inner">
              {sortedCats.map(([catName, topicsInCategory]) => {
                const expanded = expandedCats[catName] !== false;
                return (
                  <div key={catName} className="pb-2">
                    <div
                      onClick={() => toggleCat(catName)}
                      className="px-5 py-3 text-sm font-bold text-slate-700 bg-white sticky top-0 z-10 border-b border-slate-200 flex items-center justify-between cursor-pointer select-none transition-colors hover:bg-slate-50 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-indigo-600">
                        <BookOpen size={18} /> <span className="text-slate-700">{catName}</span>
                      </div>
                      {expanded ? (
                        <ChevronDown size={18} className="text-slate-400" />
                      ) : (
                        <ChevronRight size={18} className="text-slate-400" />
                      )}
                    </div>

                    {expanded && (
                      <div className="px-5 py-4 flex flex-wrap gap-2">
                        {topicsInCategory.length === 0 ? (
                          <div className="text-sm italic text-slate-400">Chưa có chủ đề nào</div>
                        ) : (
                          topicsInCategory.map((topic) => {
                            const isSel = selectedTopics.includes(topic.id);
                            return (
                              <button
                                key={topic.id}
                                onClick={() =>
                                  setSelectedTopics((prev) =>
                                    isSel
                                      ? prev.filter((id) => id !== topic.id)
                                      : [...prev, topic.id],
                                  )
                                }
                                className={`tour-quiz-topic-item flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-all ${isSel ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 shadow-sm"}`}
                              >
                                <div
                                  className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${isSel ? "bg-indigo-600 border-indigo-600 text-white" : "bg-slate-100 border-slate-300"}`}
                                >
                                  {isSel && <CheckCircle2 size={10} />}
                                </div>
                                {topic.name}
                              </button>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
            <button
              onClick={() => setQuizState("config")}
              disabled={selectedTopics.length === 0}
              className="tour-quiz-continue-btn w-full px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 disabled:opacity-50 transition-all active:scale-95"
            >
              Tiếp tục
            </button>
          </>
        )}
      </div>
    );
  }

  if (quizState === "config") {
    return (
      <div className="max-w-xl mx-auto text-center bg-white p-10 rounded-2xl shadow-sm border border-slate-100 animate-fade-in">
        <h2 className="text-2xl font-black text-slate-800 mb-8 tracking-tight">
          Cấu hình thử thách
        </h2>
        <div className="space-y-6 text-left max-w-sm mx-auto mb-10">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Hình thức kiểm tra
            </label>
            <select
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
              className="tour-quiz-method-select w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white font-bold text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="multiple_choice">Trắc nghiệm 4 đáp án</option>
              <option value="typing_en_to_vi">Gõ từ: Anh ➔ Việt</option>
              <option value="typing_vi_to_en">Gõ từ: Việt ➔ Anh</option>
              <option value="listening_en_to_vi">Nghe ➔ Gõ Việt</option>
              <option value="listening_en_to_en">Nghe ➔ Gõ Anh</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Chế độ chơi
            </label>
            <select
              value={playMode}
              onChange={(e) => setPlayMode(e.target.value as any)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white font-bold text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="practice">🌱 Luyện tập (Cơ bản)</option>
              <option value="survival">❤️ Sinh tồn (3 mạng)</option>
              <option value="time_attack">⏱️ Tốc độ (60 giây)</option>
            </select>
          </div>
          {playMode !== "time_attack" && (
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Số lượng câu hỏi
              </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white font-bold text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value={10}>🎯 10 câu (Nhanh)</option>
              <option value={20}>🔥 20 câu (Vừa)</option>
              <option value={30}>🚀 30 câu (Nhiều)</option>
              <option value={50}>👑 50 câu (Thử thách)</option>
              <option value={9999}>♾️ Tất cả</option>
            </select>
          </div>
          )}
          {playMode === "practice" && (
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Giới hạn thời gian
              </label>
              <select
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white font-bold text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value={0}>♾️ Không giới hạn</option>
                <option value={30}>⏱️ 30 giây</option>
                <option value={60}>⏱️ 1 phút</option>
                <option value={120}>⏱️ 2 phút</option>
                <option value={300}>⏱️ 5 phút</option>
              </select>
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setQuizState("topic_selection")}
            className="tour-quiz-back-btn px-6 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Quay lại
          </button>
          <button
            onClick={() => fetchWordsAndStartQuiz()}
            disabled={isLoadingWords}
            className="px-10 py-3.5 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-60 flex items-center gap-2 transition-all active:scale-95"
          >
            {isLoadingWords ? (
              <Loader2 size={20} className="animate-spin" />
            ) : null}
            Bắt đầu bài thi
          </button>
        </div>
      </div>
    );
  }

  if (quizState === "playing") {
    const currentQ = questions[currentIndex];
    const isListening = quizType.startsWith("listening");

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
          }
        `}} />
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full mb-8 overflow-hidden flex shadow-inner">
          <div
            className="bg-indigo-500 h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex gap-2">
            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full flex items-center gap-2 border border-indigo-100 shadow-sm uppercase tracking-wider">
              Câu {currentIndex + 1} / {questions.length}
            </span>
            {timeLimit > 0 && (
              <span className={`text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-2 border shadow-sm uppercase tracking-wider ${timeLeft < 10 ? "bg-rose-50 text-rose-600 border-rose-100 animate-pulse" : "bg-slate-50 text-slate-600 border-slate-100"}`}>
                ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            )}
            {playMode === "survival" && (
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full flex items-center gap-1 border border-rose-100 shadow-sm uppercase tracking-wider">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={i < lives ? "opacity-100" : "opacity-30 grayscale"}>❤️</span>
                ))}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {streak >= 3 && (
              <span className="text-xs text-orange-600 font-black bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100 shadow-sm flex items-center gap-1 uppercase tracking-wider animate-bounce">
                🔥 X{streak}
              </span>
            )}
            <span className="text-xs text-amber-600 font-black bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 shadow-sm flex items-center gap-2 uppercase tracking-wider">
              Điểm: {score}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 md:p-14 text-center mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          {isListening ? (
            <button
              onClick={() => playAudio(currentQ.wordObject.word)}
              className="p-8 text-white bg-indigo-500 hover:bg-indigo-600 rounded-full transition-all hover:scale-110 shadow-2xl shadow-indigo-200 mx-auto mb-6 animate-pulse"
            >
              <Volume2 size={56} />
            </button>
          ) : (
            <>
              <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                {currentQ.promptText}
              </h3>
              {quizType !== "typing_vi_to_en" && (
                <button
                  onClick={() => playAudio(currentQ.wordObject.word)}
                  className="p-3 text-indigo-500 hover:bg-indigo-50 rounded-full transition-all mb-4"
                >
                  <Volume2 size={28} />
                </button>
              )}
            </>
          )}
          {currentQ.promptSub && (
            <p className="text-lg text-indigo-400 font-mono italic bg-indigo-50/50 inline-block px-4 py-1 rounded-full">
              {currentQ.promptSub}
            </p>
          )}
        </div>

        {quizType === "multiple_choice" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((opt: string, idx: number) => {
              let btnClass =
                "bg-white border-2 border-slate-100 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md";
              if (isAnswered) {
                if (opt === currentQ.correctAnswerText)
                  btnClass =
                    "bg-green-100 border-green-500 text-green-800 font-bold shadow-green-100 shadow-lg scale-[1.02] z-10";
                else if (opt === selectedAnswer)
                  btnClass = "bg-red-50 border-red-500 text-red-800 shadow-red-100 animate-shake";
                else
                  btnClass =
                    "bg-white border-slate-100 text-slate-300 opacity-40";
              }
              
              // Keyboard shortcut hints
              const shortcutKey = ["1", "2", "3", "4"][idx];
              
              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(opt)}
                  className={`p-5 rounded-2xl text-lg w-full transition-all duration-300 font-bold relative flex items-center justify-between group ${btnClass}`}
                >
                  <span className="text-left w-full">{opt}</span>
                  {!isAnswered && (
                    <kbd className="hidden md:inline-block px-2 py-1 bg-slate-100 text-slate-400 rounded text-xs font-mono group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-colors">
                      {shortcutKey}
                    </kbd>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleTypingSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              autoFocus
              ref={inputRef}
              disabled={isAnswered}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={`w-full p-5 rounded-2xl border-2 text-center text-2xl font-black outline-none transition-all shadow-inner ${isAnswered ? (isAnswerCorrect ? "border-green-500 bg-green-50 text-green-800 scale-[1.02]" : "border-rose-500 bg-rose-50 text-rose-800 animate-shake") : "border-slate-200 focus:border-indigo-500 focus:shadow-indigo-100"}`}
              placeholder="Nhập câu trả lời..."
            />
            {isAnswered && !isAnswerCorrect && (
                <div className="p-5 rounded-2xl border text-center transition-all animate-fade-in bg-amber-50 border-amber-200 text-amber-800">
                  <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Đáp án chính xác</p>
                  <p className="font-black text-3xl tracking-tight">
                    {currentQ.correctAnswerText}
                  </p>
                </div>
              )}
            <button
              type="submit"
              disabled={isAnswered || !inputText.trim()}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-50 transition-all"
            >
              Xác nhận đáp án
            </button>
          </form>
        )}
      </div>
    );
  }

  if (quizState === "result") {
    const baseCount = Math.min(questionCount, allWords.length);
    const perfectRun = score === baseCount;
    
    const totalAttempted = Math.max(1, score + wrongQuestions.length);
    const avgTime = startTime && endTime ? ((endTime - startTime) / 1000 / totalAttempted).toFixed(1) : 0;

    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in pb-10">
        <div className="bg-white p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ${perfectRun ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-indigo-600"}`}>
            <Sparkles size={56} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
            {perfectRun ? "Kỷ lục hoàn hảo!" : playMode === "survival" && lives <= 0 ? "Thử thách Sinh tồn Thất bại!" : "Đã hoàn thành thử thách!"}
          </h2>
          <div className="text-7xl font-black text-indigo-600 mt-8 mb-4 flex items-baseline justify-center gap-2">
            {score} <span className="text-3xl text-slate-300 font-bold">/ {baseCount}</span>
          </div>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
            {perfectRun
              ? "Đỉnh cao! Bạn đã trả lời đúng tất cả các câu hỏi."
              : playMode === "survival" && lives <= 0
              ? `Bạn đã hết sạch mạng. Lần sau cẩn thận hơn nhé!`
              : `Bạn đã ghi được điểm số ấn tượng.`}
          </p>

          {/* Gamified Analytics */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Tốc độ TB</p>
              <p className="text-2xl font-black text-slate-700">{avgTime}s <span className="text-sm font-medium text-slate-400">/câu</span></p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Chuỗi cao nhất</p>
              <p className="text-2xl font-black text-orange-500">{highestStreak} 🔥</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={() => generateQuiz(undefined, true)}
                className="flex-1 py-4 bg-slate-100 text-slate-700 font-black rounded-2xl hover:bg-slate-200 transition-all text-[15px] shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                Làm lại
              </button>
              <button
                onClick={() => generateQuiz(undefined, false)}
                className="flex-1 py-4 bg-indigo-100 text-indigo-700 font-black rounded-2xl hover:bg-indigo-200 transition-all text-[15px] shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                {playMode === 'time_attack' ? "Chơi ván mới" : `Làm tiếp ${Math.min(questionCount, allWords.length)} câu`}
              </button>
            </div>
            <button
              onClick={() => {
                setQuizState("topic_selection");
              }}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 text-[15px] mt-2"
            >
              Trở về màn hình chọn chủ đề
            </button>
          </div>
        </div>

        {wrongQuestions.length > 0 && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-left">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="bg-rose-100 text-rose-600 p-2 rounded-lg">🚨</span> 
              Cần khắc phục ({wrongQuestions.length} câu)
            </h3>
            <div className="space-y-4">
              {wrongQuestions.map((wq, idx) => (
                <div key={idx} className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <p className="font-bold text-slate-800 text-lg mb-1">{wq.promptText}</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-rose-100 text-rose-600 px-2 py-0.5 rounded">Bạn chọn</span>
                      <span className="text-rose-700 font-medium line-through">{wq.userSelected || "Trống"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-green-100 text-green-700 px-2 py-0.5 rounded">Đáp án đúng</span>
                      <span className="text-green-700 font-bold">{wq.correctAnswerText}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
