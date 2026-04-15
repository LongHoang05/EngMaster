"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  Plus,
  LogOut,
  Search,
  Sparkles,
  Volume2,
  GraduationCap,
  X,
  Edit2,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import * as XLSX from "xlsx";

import { supabase } from "@/lib/supabase";
import {
  Topic,
  Vocabulary,
  AutocompleteWord,
  DictSuggestion,
} from "@/lib/types";
import { playAudio, playSuccessSound } from "@/lib/utils";

// Components
import LoginScreen from "@/components/LoginScreen";
import DashboardScreen from "@/components/DashboardScreen";
import TopicListView from "@/components/TopicListView";
import VocabularyListView from "@/components/VocabularyListView";
import FlashcardPlayer from "@/components/FlashcardPlayer";
import QuizContainer from "@/components/QuizContainer";
import AddTopicModal from "@/components/AddTopicModal";
import EditVocabularyModal from "@/components/EditVocabularyModal";
import AddVocabularyBar from "@/components/AddVocabularyBar";
import ExportExcelModal from "@/components/ExportExcelModal";
import StreakCelebration from "@/components/StreakCelebration";

export default function EngMaster() {
  const [userCode, setUserCode] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "topics" | "quiz">(
    "dashboard",
  );

  // Data
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [flashcardQueue, setFlashcardQueue] = useState<Vocabulary[]>([]);

  // UI State
  // const [isTopicLoading, setIsTopicLoading] = useState(false);
  // const [isVocabLoading, setIsVocabLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [hasStudiedToday, setHasStudiedToday] = useState(false);
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [isExportExcelModalOpen, setIsExportExcelModalOpen] = useState(false);
  const [isEditWordModalOpen, setIsEditWordModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<Vocabulary | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "flashcards">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Streak Celebration State
  const [isStreakCelebrationOpen, setIsStreakCelebrationOpen] = useState(false);
  const [celebrationStreakCount, setCelebrationStreakCount] = useState(0);

  // User Profile
  const [displayName, setDisplayName] = useState("Học giả bí ẩn");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isSavingName, setIsSavingName] = useState(false);
  const [tempName, setTempName] = useState("");

  // 1. AUTH
  useEffect(() => {
    const saved = localStorage.getItem("eng_master_user_code");
    if (saved) {
      setUserCode(saved);
      syncUserProfile(saved);
    }
    setIsAuthLoading(false);
  }, []);


  const handleLoginSuccess = (code: string) => {
    localStorage.setItem("eng_master_user_code", code);
    setUserCode(code);
    syncUserProfile(code);
    toast.success("Đã đăng nhập dưới mã: " + code);
  };

  const handleLogout = () => {
    localStorage.removeItem("eng_master_user_code");
    setUserCode(null);
    setTopics([]);
    setActiveTab("dashboard");
    setIsLogoutModalOpen(false);
    toast.info("Đã đăng xuất");
  };

  const syncUserProfile = async (code: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("current_streak, display_name, last_active_date")
        .eq("user_code", code)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setCurrentStreak(data.current_streak || 0);
        setDisplayName(data.display_name || "Học giả bí ẩn");

        if (data.last_active_date) {
          setHasStudiedToday(
            new Date(data.last_active_date).toLocaleDateString("en-CA") ===
              new Date().toLocaleDateString("en-CA"),
          );
        } else {
          setHasStudiedToday(false);
        }
      } else {
        // Create user record if not exists
        await supabase.from("users").insert({
          user_code: code,
          display_name: "Học giả bí ẩn",
          current_streak: 0,
        });
        setDisplayName("Học giả bí ẩn");
      }
    } catch (e) {
      console.error("User profile sync error", e);
    }
  };

  const handleUpdateDisplayName = async (newName: string) => {
    if (!userCode || !newName.trim()) {
      return;
    }

    const finalName = newName.slice(0, 25);
    setDisplayName(finalName);
    setIsSavingName(true);

    try {
      const { error } = await supabase
        .from("users")
        .update({ display_name: finalName })
        .eq("user_code", userCode);

      if (error) throw error;
      toast.success("Đã cập nhật tên hiển thị!");
    } catch (e: unknown) {
      const error = e as Error;
      toast.error("Không thể lưu tên: " + error.message);
      // Rollback if needed
      if (userCode) syncUserProfile(userCode);
    } finally {
      setIsSavingName(false);
    }
  };

  // 2. FETCH TOPICS
  const fetchTopics = useCallback(async () => {
    if (!userCode) return;
    // setIsTopicLoading(true);
    try {
      const { data, error } = await supabase
        .from("topics")
        .select("*, vocabularies(count)")
        .or(`user_code.eq.${userCode},user_code.is.null`);

      if (error) throw error;
      const formatted = (data || []).map(
        (t: Topic & { vocabularies?: { count: number }[] }) => ({
          ...t,
          vocab_count: t.vocabularies?.[0]?.count || 0,
        }),
      );
      setTopics(formatted);
    } finally {
      // setIsTopicLoading(false);
    }
  }, [userCode]);

  useEffect(() => {
    if (userCode) {
      fetchTopics();
    }
  }, [userCode, fetchTopics]);

  // 3. FETCH VOCABULARIES
  const fetchVocabularies = useCallback(async (topicId: string) => {
    // setIsVocabLoading(true);
    try {
      const { data, error } = await supabase
        .from("vocabularies")
        .select("*")
        .eq("topic_id", topicId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVocabularies(data || []);
    } catch (err) {
      console.error("Fetch vocab error:", err);
    } finally {
      // setIsVocabLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      fetchVocabularies(selectedTopic.id);
    } else {
      setVocabularies([]);
    }
  }, [selectedTopic, fetchVocabularies]);

  // 4. ACTION HANDLERS
  const handleDeleteTopic = async (topicId: string, topicName: string) => {
    if (!confirm(`Xóa chủ đề "${topicName}" và TẤT CẢ từ vựng bên trong?`))
      return;

    try {
      const { error } = await supabase
        .from("topics")
        .delete()
        .eq("id", topicId);
      if (error) throw error;
      toast.success("Đã xóa chủ đề.");
      setSelectedTopic(null);
      fetchTopics();
    } catch (err) {
      const error = err as Error;
      toast.error("Lỗi xóa: " + error.message);
    }
  };

  const handleDeleteWord = async (wordId: string, wordText: string) => {
    if (!confirm(`Xóa từ "${wordText}"?`)) return;
    try {
      const { error } = await supabase
        .from("vocabularies")
        .delete()
        .eq("id", wordId);
      if (error) throw error;
      toast.success("Đã xóa từ.");
      if (selectedTopic) fetchVocabularies(selectedTopic.id);
      fetchTopics();
    } catch (err) {
      const error = err as Error;
      toast.error("Lỗi xóa: " + error.message);
    }
  };

  const handleEditWord = (word: Vocabulary) => {
    setEditingWord(word);
    setIsEditWordModalOpen(true);
  };

  const handleUpdateStreak = async () => {
    if (!userCode) return;
    try {
      // Manual streak calculation instead of RPC
      const { data: user, error: fetchErr } = await supabase
        .from("users")
        .select("current_streak, last_active_date")
        .eq("user_code", userCode)
        .single();

      if (fetchErr) throw fetchErr;

      const todayStr = new Date().toLocaleDateString("en-CA");
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayStr = yesterdayDate.toLocaleDateString("en-CA");

      let newStreak = user.current_streak || 0;
      const lastActive = user.last_active_date;

      let needsUpdate = false;

      if (!lastActive || lastActive === yesterdayStr) {
        newStreak += 1;
        needsUpdate = true;
      } else if (lastActive !== todayStr) {
        newStreak = 1;
        needsUpdate = true;
      }

      if (needsUpdate || lastActive !== todayStr) {
        const { error: updateErr } = await supabase
          .from("users")
          .update({
            current_streak: newStreak,
            last_active_date: todayStr,
          })
          .eq("user_code", userCode);

        if (updateErr) throw updateErr;
      }

      if (lastActive !== todayStr) {
        setCelebrationStreakCount(newStreak);
        setIsStreakCelebrationOpen(true);
      }

      setCurrentStreak(newStreak);
      setHasStudiedToday(true);
    } catch (e) {
      console.error("Streak sync error", e);
    }
  };

  const startFlashcards = () => {
    if (vocabularies.length === 0) return;
    const queue = [...vocabularies].sort(() => 0.5 - Math.random());
    setFlashcardQueue(queue);
    setViewMode("flashcards");
  };

  const handleFlashcardAnswer = async (wordId: string, known: boolean) => {
    if (known) {
      try {
        const word = vocabularies.find((v) => v.id === wordId);
        const currentInterval = word?.review_interval || 0;
        const nextInt =
          currentInterval === 0 ? 1 : Math.ceil(currentInterval * 2.5);
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + (nextInt > 365 ? 365 : nextInt));

        await supabase
          .from("vocabularies")
          .update({
            review_interval: nextInt > 365 ? 365 : nextInt,
            next_review_date: nextDate.toISOString(),
          })
          .eq("id", wordId);
      } catch (e) {
        console.error("Update mastery error", e);
      }
    }

    setFlashcardQueue((prev) => prev.slice(1));
    if (flashcardQueue.length === 1) {
      handleUpdateStreak();
    }
  };

  // 5. EXCEL LOGIC
  const handleExportExcel = async (
    topicsToExport: Topic[],
    filename: string,
  ) => {
    if (topicsToExport.length === 0) {
      toast.error("Không có chủ đề nào để xuất.");
      return;
    }

    setIsExporting(true);
    try {
      const wb = XLSX.utils.book_new();
      let totalWords = 0;

      // Mỗi topic = 1 sheet, giống format import
      for (const topic of topicsToExport) {
        const { data: vocabs, error } = await supabase
          .from("vocabularies")
          .select("word, ipa, meanings, notes")
          .eq("topic_id", topic.id);

        if (error) throw error;
        if (!vocabs || vocabs.length === 0) continue;

        const sheetData = vocabs.map((v) => {
          const meaningsStr = Array.isArray(v.meanings)
            ? v.meanings.join(", ")
            : v.meanings || "";
          return {
            "Từ vựng": v.word || "",
            "Phiên âm": v.ipa || "",
            "Nghĩa tiếng Việt": meaningsStr,
          };
        });

        const ws = XLSX.utils.json_to_sheet(sheetData);
        ws["!cols"] = [
          { wch: 25 }, // Từ vựng
          { wch: 20 }, // Phiên âm
          { wch: 45 }, // Nghĩa tiếng Việt
        ];

        // Sheet name max 31 chars (Excel limit), remove invalid chars
        const safeName =
          topic.name.replace(/[:\\/?*\[\]]/g, "").slice(0, 31) || "Sheet";
        XLSX.utils.book_append_sheet(wb, ws, safeName);
        totalWords += sheetData.length;
      }

      if (totalWords === 0) {
        toast.error("Không có từ vựng nào trong các chủ đề đã chọn.");
        setIsExporting(false);
        return;
      }

      XLSX.writeFile(wb, `${filename}.xlsx`);
      toast.success(
        `Xuất thành công ${totalWords} từ vựng (${wb.SheetNames.length} sheet)!`,
      );
      setIsExportExcelModalOpen(false);
    } catch (err) {
      const error = err as Error;
      toast.error("Lỗi xuất Excel: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  // RENDERING
  if (isAuthLoading) return null;
  if (!userCode) return <LoginScreen onSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col font-sans">
      <Toaster position="top-center" richColors />

      {/* Sidebar / Topnav */}
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-2 sm:px-4 md:px-8 py-2.5 md:py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-12 md:h-12 shrink-0 bg-indigo-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <GraduationCap className="w-5 h-5 md:w-7 md:h-7" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-black tracking-tight text-slate-800 leading-tight">
              EngMaster
            </h1>
          </div>
        </div>

        <div className="flex bg-slate-100/80 p-1 md:p-1.5 rounded-2xl md:rounded-3xl border border-slate-200/50 shadow-inner">
          {[
            { id: "dashboard", label: "Tiến độ", icon: LayoutDashboard },
            { id: "topics", label: "Tài liệu", icon: BookOpen },
            { id: "quiz", label: "Kiểm tra", icon: Gamepad2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as "dashboard" | "topics" | "quiz");
                setSelectedTopic(null);
                setViewMode("list");
              }}
              className={`focus:outline-none flex items-center justify-center gap-1.5 md:gap-2 px-2.5 sm:px-3 md:px-6 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl text-[11px] sm:text-xs md:text-sm font-black transition-all duration-300 min-w-[3.5rem] ${
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-[0_4px_12px_rgba(79,70,229,0.12)] border border-slate-100 scale-105"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              <tab.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              <span
                className={activeTab === tab.id ? "block" : "hidden sm:block"}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="p-2 md:p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl md:rounded-2xl transition-all border border-transparent hover:border-rose-100"
          >
            <LogOut className="w-5 h-5 md:w-5.5 md:h-5.5" />
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeTab === "dashboard" && (
          <DashboardScreen
            userCode={userCode}
            topics={topics}
            currentStreak={currentStreak}
            hasStudiedToday={hasStudiedToday}
            displayName={displayName}
            onUpdateDisplayName={handleUpdateDisplayName}
          />
        )}

        {activeTab === "topics" && (
          <>
            {!selectedTopic ? (
              <TopicListView
                topics={topics}
                userCode={userCode}
                isExporting={isExporting}
                onImportSuccess={fetchTopics}
                handleExportExcel={handleExportExcel}
                setIsAddTopicModalOpen={setIsAddTopicModalOpen}
                setIsExportExcelModalOpen={setIsExportExcelModalOpen}
                onSelectTopic={setSelectedTopic}
              />
            ) : (
              <div className="flex flex-col gap-6">
                {viewMode === "list" ? (
                  <>
                    <AddVocabularyBar
                      selectedTopic={selectedTopic}
                      userCode={userCode}
                      onSuccess={() => {
                        fetchVocabularies(selectedTopic.id);
                        fetchTopics();
                      }}
                      onStartFlashcards={startFlashcards}
                      hasVocab={vocabularies.length > 0}
                    />

                    <VocabularyListView
                      topic={selectedTopic}
                      vocabularies={vocabularies}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onBack={() => setSelectedTopic(null)}
                      onDeleteTopic={handleDeleteTopic}
                      onDeleteWord={handleDeleteWord}
                      onEditWord={handleEditWord}
                      isOwner={selectedTopic.user_code === userCode}
                    />
                  </>
                ) : (
                  <FlashcardPlayer
                    queue={flashcardQueue}
                    onFinish={() => setViewMode("list")}
                    onAnswer={handleFlashcardAnswer}
                    onBack={() => setViewMode("list")}
                  />
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "quiz" && (
          <QuizContainer
            topics={topics}
            userCode={userCode}
            onQuizCompleted={handleUpdateStreak}
          />
        )}
      </main>

      {/* Modals */}
      <ExportExcelModal
        isOpen={isExportExcelModalOpen}
        onClose={() => setIsExportExcelModalOpen(false)}
        topics={topics}
        userCode={userCode || ""}
        onExport={handleExportExcel}
        isExporting={isExporting}
      />

      <AddTopicModal
        isOpen={isAddTopicModalOpen}
        onClose={() => setIsAddTopicModalOpen(false)}
        userCode={userCode}
        onSuccess={fetchTopics}
      />

      <EditVocabularyModal
        isOpen={isEditWordModalOpen}
        onClose={() => {
          setIsEditWordModalOpen(false);
          setEditingWord(null);
        }}
        wordData={editingWord}
        onSuccess={() => {
          if (selectedTopic) fetchVocabularies(selectedTopic.id);
          fetchTopics();
        }}
      />

      <StreakCelebration
        isOpen={isStreakCelebrationOpen}
        onClose={() => setIsStreakCelebrationOpen(false)}
        streakCount={celebrationStreakCount}
      />

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-white/20 p-8 text-center">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <LogOut size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">
              Đăng xuất?
            </h3>
            <p className="text-slate-500 font-medium mb-8">
              Bạn có chắc chắn muốn thoát khỏi phiên làm việc này không?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-4 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 shadow-xl shadow-rose-100 transition-all active:scale-95"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
