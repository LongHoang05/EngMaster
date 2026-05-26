"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  LogOut,
  GraduationCap,
  Settings,
} from "lucide-react";
import { Toaster, toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { useTopics } from "@/hooks/useTopics";
import { useVocabularies } from "@/hooks/useVocabularies";

// Components
import LoginScreen from "@/components/LoginScreen";
import DashboardScreen from "@/components/DashboardScreen";
import TopicListView from "@/components/TopicListView";
import VocabularyListView from "@/components/VocabularyListView";
import FlashcardPlayer from "@/components/FlashcardPlayer";
import QuizContainer from "@/components/QuizContainer";
import AddTopicModal from "@/components/AddTopicModal";
import EditTopicModal from "@/components/EditTopicModal";
import EditVocabularyModal from "@/components/EditVocabularyModal";
import AddVocabularyBar from "@/components/AddVocabularyBar";
import ExportExcelModal from "@/components/ExportExcelModal";
import StreakCelebration from "@/components/StreakCelebration";
import AppTour from "@/components/AppTour";
import CommandPalette from "@/components/CommandPalette";
import SettingsModal from "@/components/SettingsModal";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const AIChatWidget = dynamic(() => import("@/components/AIChatWidget"), { ssr: false });

export default function EngMaster() {
  const {
    userCode,
    isAuthLoading,
    currentStreak,
    hasStudiedToday,
    displayName,
    isSavingName,
    celebrationStreakCount,
    isStreakCelebrationOpen,
    setIsStreakCelebrationOpen,
    handleLoginSuccess,
    handleLogout,
    handleUpdateDisplayName,
    handleUpdateStreak,
  } = useAuth();

  const {
    topics,
    selectedTopic,
    setSelectedTopic,
    isTopicLoading,
    isExporting,
    fetchTopics,
    handleDeleteTopic,
    handleBulkDeleteTopics,
    handleExportExcel,
  } = useTopics(userCode);

  const {
    vocabularies,
    flashcardQueue,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    editingWord,
    setEditingWord,
    isEditWordModalOpen,
    setIsEditWordModalOpen,
    fetchVocabularies,
    handleDeleteWord,
    handleEditWord,
    startFlashcards,
    handleFlashcardAnswer,
  } = useVocabularies(selectedTopic, fetchTopics);

  const [activeTab, setActiveTab] = useState<"dashboard" | "topics" | "quiz">("dashboard");

  // UI State for Modals
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [isEditTopicModalOpen, setIsEditTopicModalOpen] = useState(false);
  const [isExportExcelModalOpen, setIsExportExcelModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [tourKey, setTourKey] = useState(0);

  const handleRestartTour = () => {
    localStorage.removeItem("eng_master_tour_completed");
    setTourKey((prev) => prev + 1);
    setIsSettingsModalOpen(false);
    toast.info("Đang bắt đầu lại hướng dẫn...");
  };

  const handleExportAll = () => {
    handleExportExcel(topics, `EngMaster_Backup_${new Date().toLocaleDateString("en-CA")}`, () => setIsExportExcelModalOpen(false));
  };

  const fullLogout = () => {
    handleLogout();
    setActiveTab("dashboard");
    setIsLogoutModalOpen(false);
  };

  // RENDERING
  if (isAuthLoading) return null;
  if (!userCode) return <LoginScreen onSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col font-sans">
      <Toaster position="top-center" richColors />
      <AppTour
        key={tourKey}
        setActiveTab={setActiveTab}
        onBackToList={() => setSelectedTopic(null)}
      />
      <CommandPalette
        topics={topics}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectTopic={setSelectedTopic}
      />

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
              className={`focus:outline-none flex items-center justify-center gap-1.5 md:gap-2 px-2.5 sm:px-3 md:px-6 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl text-[11px] sm:text-xs md:text-sm font-black transition-all duration-300 min-w-[3.5rem] ${tab.id === "topics" ? "tour-tab-topics" : ""} ${tab.id === "quiz" ? "tour-tab-quiz" : ""} ${tab.id === "dashboard" ? "tour-tab-progress" : ""} ${
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-[0_4px_12px_rgba(79,70,229,0.12)] border border-slate-100 scale-105"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              <tab.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              <span className={activeTab === tab.id ? "block" : "hidden sm:block"}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-2 md:p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl md:rounded-2xl transition-all border border-transparent hover:border-indigo-100"
            title="Cài đặt"
          >
            <Settings className="w-5 h-5 md:w-5.5 md:h-5.5" />
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardScreen
                userCode={userCode}
                topics={topics}
                currentStreak={currentStreak}
                hasStudiedToday={hasStudiedToday}
                displayName={displayName}
                onUpdateDisplayName={handleUpdateDisplayName}
              />
            </motion.div>
          )}

          {activeTab === "topics" && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {!selectedTopic ? (
                <TopicListView
                  topics={topics}
                  userCode={userCode}
                  isExporting={isExporting}
                  isLoading={isTopicLoading}
                  onImportSuccess={fetchTopics}
                  setIsAddTopicModalOpen={setIsAddTopicModalOpen}
                  setIsExportExcelModalOpen={setIsExportExcelModalOpen}
                  onSelectTopic={setSelectedTopic}
                  onBulkDelete={handleBulkDeleteTopics}
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
                        onEditTopic={() => setIsEditTopicModalOpen(true)}
                        isOwner={selectedTopic.user_code === userCode}
                      />
                    </>
                  ) : (
                    <FlashcardPlayer
                      queue={flashcardQueue}
                      onFinish={() => setViewMode("list")}
                      onAnswer={(wordId, known) => handleFlashcardAnswer(wordId, known, handleUpdateStreak)}
                      onBack={() => setViewMode("list")}
                    />
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <QuizContainer
                topics={topics}
                userCode={userCode}
                onQuizCompleted={handleUpdateStreak}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <ExportExcelModal
        isOpen={isExportExcelModalOpen}
        onClose={() => setIsExportExcelModalOpen(false)}
        topics={topics}
        userCode={userCode || ""}
        onExport={(topics, name) => handleExportExcel(topics, name, () => setIsExportExcelModalOpen(false))}
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
        }}
      />

      <EditTopicModal
        isOpen={isEditTopicModalOpen}
        onClose={() => setIsEditTopicModalOpen(false)}
        topic={selectedTopic}
        onSuccess={(updatedTopic) => {
          if (selectedTopic) {
            setSelectedTopic({ ...selectedTopic, ...updatedTopic });
            fetchTopics();
          }
        }}
      />

      <StreakCelebration
        isOpen={isStreakCelebrationOpen}
        onClose={() => setIsStreakCelebrationOpen(false)}
        streakCount={celebrationStreakCount}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        displayName={displayName}
        onUpdateDisplayName={handleUpdateDisplayName}
        onLogout={() => {
          setIsSettingsModalOpen(false);
          setIsLogoutModalOpen(true);
        }}
        onRestartTour={handleRestartTour}
        onExportData={handleExportAll}
      />

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-white/20 p-8 text-center">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <LogOut size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Đăng xuất?</h3>
            <p className="text-slate-500 font-medium mb-8">Bạn có chắc chắn muốn thoát khỏi phiên làm việc này không?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={fullLogout}
                className="flex-1 py-4 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 shadow-xl shadow-rose-100 transition-all active:scale-95"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}

      {userCode && (
        <AIChatWidget 
          selectedTopic={selectedTopic} 
          vocabularies={vocabularies} 
        />
      )}
    </div>
  );
}
