"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Send, Brain, Sparkles, RotateCcw } from "lucide-react";

// Normalize Vietnamese string for comparison
function normalizeVN(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.,!?;:'"()[\]{}]/g, "");
}

// Check if answer is approximately correct
function isAnswerCorrect(userAnswer: string, correctAnswer: string): boolean {
  const normUser = normalizeVN(userAnswer);
  const normCorrect = normalizeVN(correctAnswer);

  // Exact match
  if (normUser === normCorrect) return true;

  // Check if any meaning in a comma-separated list matches
  const correctParts = normCorrect.split(/[,;\/]/).map((s) => s.trim());
  for (const part of correctParts) {
    if (normUser === part) return true;
    // Allow minor typos (Levenshtein distance <= 2 for short answers)
    if (part.length > 3 && levenshtein(normUser, part) <= 2) return true;
  }

  // Check if user answer is contained in correct answer or vice versa
  if (normCorrect.includes(normUser) && normUser.length >= 3) return true;

  return false;
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

type QuizMode = "meaning" | "word";

export default function QuizNotifyPage() {
  const [word, setWord] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [quizMode, setQuizMode] = useState<QuizMode>("meaning");
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const w = params.get("word");
    const m = params.get("meaning");
    const mode = params.get("mode") as QuizMode;

    if (w && m && mode) {
      setWord(w);
      setQuizMode(mode);

      if (mode === "meaning") {
        // Question: What's the meaning? Answer: the meaning
        setCorrectAnswer(m);
      } else {
        // Question: What's the English word? Answer: the word
        setCorrectAnswer(w);
      }
      setHasData(true);
    }
    setIsLoading(false);

    // Auto-focus input
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || result) return;

    const correct = isAnswerCorrect(userAnswer, correctAnswer);
    setResult(correct ? "correct" : "wrong");
  };

  const handleRetry = () => {
    setUserAnswer("");
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  if (isLoading) {
    return (
      <div className="quiz-notify-container">
        <div className="quiz-notify-loading">
          <div className="quiz-notify-spinner" />
          <p>Đang tải câu hỏi...</p>
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="quiz-notify-container">
        <div className="quiz-notify-card quiz-notify-error">
          <XCircle size={48} />
          <h2>Không tìm thấy câu hỏi</h2>
          <p>Link quiz không hợp lệ hoặc đã hết hạn.</p>
        </div>
      </div>
    );
  }

  const questionText =
    quizMode === "meaning"
      ? `Nghĩa của từ "${word}" là gì?`
      : `Từ tiếng Anh của "${word}" là gì?`;

  // For "word" mode, display the meaning as the prompt
  const displayPrompt = quizMode === "word" ? correctAnswer : word;
  const displayLabel = quizMode === "word" ? "Nghĩa tiếng Việt" : "Từ tiếng Anh";

  return (
    <div className="quiz-notify-container">
      <div className="quiz-notify-card">
        {/* Header */}
        <div className="quiz-notify-header">
          <div className="quiz-notify-icon-wrap">
            <Brain size={28} />
          </div>
          <h1>
            <Sparkles size={18} className="quiz-notify-sparkle" />
            Thử thách nhanh
          </h1>
          <p className="quiz-notify-subtitle">Trả lời để luyện trí nhớ!</p>
        </div>

        {/* Question */}
        <div className="quiz-notify-question-box">
          <span className="quiz-notify-label">{displayLabel}</span>
          <h2 className="quiz-notify-word">
            {quizMode === "meaning" ? `"${word}"` : `"${correctAnswer.split(",")[0].split(";")[0].trim()}"`}
          </h2>
          <p className="quiz-notify-question-text">
            {quizMode === "meaning"
              ? "Nghĩa tiếng Việt của từ này là gì?"
              : "Từ tiếng Anh tương ứng là gì?"}
          </p>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="quiz-notify-form">
          <div className="quiz-notify-input-row">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                quizMode === "meaning"
                  ? "Nhập nghĩa tiếng Việt..."
                  : "Nhập từ tiếng Anh..."
              }
              className={`quiz-notify-input ${
                result === "correct"
                  ? "quiz-notify-input-correct"
                  : result === "wrong"
                  ? "quiz-notify-input-wrong"
                  : ""
              }`}
              disabled={!!result}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {!result ? (
              <button
                type="submit"
                className="quiz-notify-submit-btn"
                disabled={!userAnswer.trim()}
              >
                <Send size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRetry}
                className="quiz-notify-retry-btn"
              >
                <RotateCcw size={20} />
              </button>
            )}
          </div>
        </form>

        {/* Result */}
        {result && (
          <div
            className={`quiz-notify-result ${
              result === "correct"
                ? "quiz-notify-result-correct"
                : "quiz-notify-result-wrong"
            }`}
          >
            <div className="quiz-notify-result-icon">
              {result === "correct" ? (
                <CheckCircle2 size={32} />
              ) : (
                <XCircle size={32} />
              )}
            </div>
            <div className="quiz-notify-result-text">
              <h3>
                {result === "correct" ? "🎉 Chính xác!" : "💪 Chưa đúng rồi!"}
              </h3>
              <p>
                {quizMode === "meaning"
                  ? `"${word}" có nghĩa là: ${correctAnswer}`
                  : `Đáp án đúng: ${word}`}
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .quiz-notify-container {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .quiz-notify-loading {
          text-align: center;
          color: #94a3b8;
        }

        .quiz-notify-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #818cf8;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .quiz-notify-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 32px 24px;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .quiz-notify-error {
          text-align: center;
          color: #f87171;
        }
        .quiz-notify-error h2 {
          margin: 16px 0 8px;
          font-size: 20px;
          font-weight: 800;
        }
        .quiz-notify-error p {
          color: #94a3b8;
          font-size: 14px;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .quiz-notify-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .quiz-notify-icon-wrap {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: white;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
        }

        .quiz-notify-header h1 {
          font-size: 22px;
          font-weight: 900;
          color: #f1f5f9;
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .quiz-notify-sparkle {
          color: #fbbf24;
          animation: sparkPulse 2s ease-in-out infinite;
        }

        @keyframes sparkPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .quiz-notify-subtitle {
          font-size: 14px;
          color: #94a3b8;
          margin: 0;
        }

        .quiz-notify-question-box {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          margin-bottom: 24px;
        }

        .quiz-notify-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #818cf8;
          display: block;
          margin-bottom: 8px;
        }

        .quiz-notify-word {
          font-size: 28px;
          font-weight: 900;
          color: #f1f5f9;
          margin: 0 0 8px;
          line-height: 1.2;
          word-break: break-word;
        }

        .quiz-notify-question-text {
          font-size: 14px;
          color: #a5b4fc;
          margin: 0;
          font-weight: 500;
        }

        .quiz-notify-form {
          margin-bottom: 20px;
        }

        .quiz-notify-input-row {
          display: flex;
          gap: 10px;
          align-items: stretch;
        }

        .quiz-notify-input {
          flex: 1;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          color: #f1f5f9;
          font-size: 16px;
          font-weight: 600;
          outline: none;
          transition: all 0.3s ease;
        }

        .quiz-notify-input::placeholder {
          color: #64748b;
          font-weight: 400;
        }

        .quiz-notify-input:focus {
          border-color: #6366f1;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        .quiz-notify-input:disabled {
          opacity: 0.7;
        }

        .quiz-notify-input-correct {
          border-color: #22c55e !important;
          background: rgba(34, 197, 94, 0.08) !important;
        }

        .quiz-notify-input-wrong {
          border-color: #ef4444 !important;
          background: rgba(239, 68, 68, 0.08) !important;
        }

        .quiz-notify-submit-btn {
          padding: 14px 20px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        }

        .quiz-notify-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        .quiz-notify-submit-btn:active:not(:disabled) {
          transform: scale(0.95);
        }

        .quiz-notify-submit-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .quiz-notify-retry-btn {
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.1);
          color: #a5b4fc;
          border: 2px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .quiz-notify-retry-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #6366f1;
          color: #c4b5fd;
        }

        .quiz-notify-result {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border-radius: 16px;
          animation: resultPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes resultPop {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .quiz-notify-result-correct {
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.25);
        }

        .quiz-notify-result-correct .quiz-notify-result-icon {
          color: #22c55e;
        }

        .quiz-notify-result-wrong {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.25);
        }

        .quiz-notify-result-wrong .quiz-notify-result-icon {
          color: #ef4444;
        }

        .quiz-notify-result-text h3 {
          font-size: 16px;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 4px;
        }

        .quiz-notify-result-text p {
          font-size: 14px;
          color: #cbd5e1;
          margin: 0;
          word-break: break-word;
        }

        @media (max-width: 480px) {
          .quiz-notify-card {
            padding: 24px 16px;
            border-radius: 20px;
          }
          .quiz-notify-word {
            font-size: 24px;
          }
          .quiz-notify-input {
            font-size: 16px;
            padding: 12px 14px;
          }
        }
      `}</style>
    </div>
  );
}
