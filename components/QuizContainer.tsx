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

interface QuizContainerProps {
  topics: Topic[];
  userCode: string;
  onQuizCompleted: () => void;
}

export default function QuizContainer({
  topics,
  userCode,
  onQuizCompleted,
}: QuizContainerProps) {
  const [quizState, setQuizState] = useState<
    "topic_selection" | "config" | "playing" | "result"
  >("topic_selection");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // Quiz Configs
  const [quizType, setQuizType] = useState("multiple_choice");
  const [questionCount, setQuestionCount] = useState(10);

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

  useEffect(() => {
    if (quizState === "playing" && !isAnswered && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isAnswered, quizState]);

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
        toast.error("Các chủ điểm đã chọn chưa có từ vựng nào!");
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
        sourceWords = [...remaining].slice(0, questionCount);
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
    } else {
      playFailSound();
    }

    const delay = isCorrect ? 800 : 1500;
    setTimeout(() => handleNextQuestion(isCorrect), delay);
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
    } else {
      playFailSound();
    }

    const delay = isCorrect ? 800 : 2000;
    setTimeout(() => handleNextQuestion(isCorrect), delay);
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
            Bạn chưa có chủ điểm nào. Hãy tạo và thêm từ vựng trước.
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
                  : "Chủ điểm hệ thống");
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
                          <div className="text-sm italic text-slate-400">Chưa có chủ điểm nào</div>
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
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-all ${isSel ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 shadow-sm"}`}
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
              className="w-full px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 disabled:opacity-50 transition-all active:scale-95"
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
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white font-bold text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
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
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setQuizState("topic_selection")}
            className="px-6 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
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
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full mb-8 overflow-hidden flex shadow-inner">
          <div
            className="bg-indigo-500 h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center mb-6 px-2">
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full flex items-center gap-2 border border-indigo-100 shadow-sm uppercase tracking-wider">
            Câu {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-xs text-amber-600 font-black bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 shadow-sm flex items-center gap-2 uppercase tracking-wider">
            Điểm: {score}
          </span>
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
                    "bg-green-100 border-green-500 text-green-800 font-bold shadow-green-100 shadow-lg";
                else if (opt === selectedAnswer)
                  btnClass = "bg-red-50 border-red-500 text-red-800 shadow-red-100";
                else
                  btnClass =
                    "bg-white border-slate-100 text-slate-300 opacity-40";
              }
              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(opt)}
                  className={`p-5 rounded-2xl text-lg w-full transition-all duration-200 font-bold ${btnClass}`}
                >
                  {opt}
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
              className={`w-full p-5 rounded-2xl border-2 text-center text-2xl font-black outline-none transition-all shadow-inner ${isAnswered ? (isAnswerCorrect ? "border-green-500 bg-green-50 text-green-800" : "border-rose-500 bg-rose-50 text-rose-800") : "border-slate-200 focus:border-indigo-500 focus:shadow-indigo-100"}`}
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

    return (
      <div className="max-w-xl mx-auto text-center bg-white p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ${perfectRun ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-indigo-600"}`}>
          <Sparkles size={56} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
          {perfectRun ? "Kỷ lục hoàn hảo!" : "Đã hoàn thành thử thách!"}
        </h2>
        <div className="text-7xl font-black text-indigo-600 my-8 flex items-baseline justify-center gap-2">
          {score} <span className="text-3xl text-slate-300 font-bold">/ {baseCount}</span>
        </div>
        <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
          {perfectRun
            ? "Đỉnh cao! Bạn đã trả lời đúng tất cả các câu hỏi ngay trong lượt đầu tiên."
            : `Hệ thống đã hỗ trợ bạn ghi nhớ toàn bộ ${baseCount} từ vựng. Bạn cần thêm ${questions.length - baseCount} lượt nhắc lại để hoàn thành.`}
        </p>
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
              Làm tiếp {Math.min(questionCount, allWords.length)} câu
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
    );
  }

  return null;
}
