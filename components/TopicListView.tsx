"use client";

import React from "react";
import {
  Plus,
  FileSpreadsheet,
  BookOpen,
  ChevronRight,
  Loader2,
  Table,
  Settings,
  Globe,
  Lock,
  CheckSquare,
  Square,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Topic } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { ADMIN_CODE } from "@/lib/utils";
import ImportExcelButton from "@/components/ImportExcelButton";

interface TopicListViewProps {
  topics: Topic[];
  userCode: string;
  isExporting: boolean;
  isLoading?: boolean;
  onImportSuccess: () => void;
  setIsAddTopicModalOpen: (open: boolean) => void;
  setIsExportExcelModalOpen: (open: boolean) => void;
  onSelectTopic: (topic: Topic) => void;
  onBulkDelete?: (topicIds: string[]) => void;
}

export default function TopicListView({
  topics,
  userCode,
  isExporting,
  isLoading,
  onImportSuccess,
  setIsAddTopicModalOpen,
  setIsExportExcelModalOpen,
  onSelectTopic,
  onBulkDelete,
}: TopicListViewProps) {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [isSelectMode, setIsSelectMode] = React.useState(false);
  const [selectedTopicIds, setSelectedTopicIds] = React.useState<string[]>([]);

  const toggleSelectTopic = (topicId: string) => {
    setSelectedTopicIds(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleExecuteBulkDelete = () => {
    if (onBulkDelete && selectedTopicIds.length > 0) {
      onBulkDelete(selectedTopicIds);
      setIsSelectMode(false);
      setSelectedTopicIds([]);
    }
  };

  const handleToggleCategoryVisibility = async (categoryName: string, makePublic: boolean) => {
    setActiveDropdown(null);
    try {
      const targetUserCode = makePublic ? null : userCode;
      
      const { error } = await supabase
        .from("topics")
        .update({ user_code: targetUserCode })
        .eq("category_name", categoryName);

      if (error) throw error;
      
      toast.success(`Đã chuyển danh mục thành Chủ đề ${makePublic ? "hệ thống" : "cá nhân"}`);
      onImportSuccess(); // Tận dụng prop này để trigger tải lại danh sách
    } catch (err: any) {
      toast.error("Lỗi cập nhật: " + err.message);
    }
  };
  const groupedTopics = topics.reduce(
    (acc, topic) => {
      const cat =
        topic.category_name ||
        (topic.user_code === userCode ? "Từ vựng cá nhân" : "Chủ đề hệ thống");
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(topic);
      return acc;
    },
    {} as Record<string, Topic[]>,
  );

  if (!groupedTopics["Từ vựng cá nhân"]) {
    groupedTopics["Từ vựng cá nhân"] = [];
  }

  // Sắp xếp danh sách category
  const sortedCategories = Object.keys(groupedTopics).sort((a, b) => {
    if (a === "Từ vựng cá nhân") return -1;
    if (b === "Từ vựng cá nhân") return 1;
    if (a.toUpperCase() === "ATHENA ENGLISH") return -1;
    if (b.toUpperCase() === "ATHENA ENGLISH") return 1;
    return a.localeCompare(b);
  });

  // Tìm category đầu tiên có ít nhất 1 topic để gán class tour-topic-item
  const firstNonEmptyCat = sortedCategories.find(
    (cat) => groupedTopics[cat] && groupedTopics[cat].length > 0,
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-indigo-500" size={24} /> Danh sách chủ đề
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {topics.length} bảng từ vựng đã lưu
          </p>
        </div>
        <div className="tour-action-buttons w-full sm:w-auto flex flex-wrap gap-2">
          {onBulkDelete && topics.length > 0 && (
            <button
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                if (isSelectMode) setSelectedTopicIds([]);
              }}
              className={`inline-flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${isSelectMode ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"}`}
            >
              {isSelectMode ? <Square size={16} /> : <CheckSquare size={16} />}
              {isSelectMode ? "Hủy chọn" : "Chọn nhiều"}
            </button>
          )}
          <ImportExcelButton
            userCode={userCode}
            onImportSuccess={onImportSuccess}
          />
          <button
            onClick={() => setIsExportExcelModalOpen(true)}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-emerald-200 disabled:opacity-50 whitespace-nowrap"
          >
            {isExporting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <FileSpreadsheet size={16} />
            )}
            Xuất Excel
          </button>
          <button
            onClick={() => setIsAddTopicModalOpen(true)}
            className="tour-step-add-topic inline-flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-indigo-200 whitespace-nowrap"
          >
            <Plus size={16} /> Thêm chủ đề
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 bg-slate-50/30">
        <div className="space-y-8">
          {sortedCategories.map((catName) => (
            <div key={catName} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  {catName}
                </span>
                
                {userCode === ADMIN_CODE && catName !== "Từ vựng cá nhân" && catName !== "Chủ đề hệ thống" && (
                  <div className="relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === catName ? null : catName)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                      title="Cài đặt danh mục"
                    >
                      <Settings size={14} />
                    </button>
                    
                    {activeDropdown === catName && (
                      <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl shadow-slate-200 border border-slate-100 py-1.5 z-10 animate-fade-in origin-top-left">
                        <button 
                          onClick={() => handleToggleCategoryVisibility(catName, true)}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2 transition-colors"
                        >
                          <Globe size={14} />
                          Chuyển thành Hệ thống (Dùng chung)
                        </button>
                        <button 
                          onClick={() => handleToggleCategoryVisibility(catName, false)}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-2 transition-colors"
                        >
                          <Lock size={14} />
                          Chuyển thành Cá nhân (Riêng tư)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="h-px flex-1 bg-slate-200/60"></div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                      <div className="w-12 h-12 rounded-xl skeleton flex-shrink-0"></div>
                      <div className="ml-4 flex-1">
                        <div className="h-5 w-32 skeleton rounded mb-2"></div>
                        <div className="h-4 w-24 skeleton rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : groupedTopics[catName].length === 0 ? (
                <div className="py-6 text-center text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200 italic font-medium">
                  Chưa có chủ đề nào.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedTopics[catName].map((topic, index) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        if (isSelectMode) {
                          toggleSelectTopic(topic.id);
                        } else {
                          onSelectTopic(topic);
                        }
                      }}
                      className={`group relative flex items-center p-5 bg-white rounded-2xl border ${selectedTopicIds.includes(topic.id) ? "border-rose-400 ring-2 ring-rose-400/20 shadow-md" : "border-slate-100 shadow-sm"} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden ${index === 0 && catName === firstNonEmptyCat ? "tour-topic-item" : ""}`}
                    >
                      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity ${selectedTopicIds.includes(topic.id) ? "bg-rose-50" : "bg-indigo-50"}`}></div>

                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner transition-colors ${selectedTopicIds.includes(topic.id) ? "bg-rose-100 text-rose-600" : "bg-slate-50 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"}`}>
                        {isSelectMode ? (
                          selectedTopicIds.includes(topic.id) ? <CheckSquare size={24} /> : <Square size={24} />
                        ) : (
                          <Table size={24} />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {topic.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                          <span className="flex items-center gap-1 font-medium text-slate-500">
                            <BookOpen size={12} /> {topic.vocab_count || 0} từ
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                          <span>
                            {new Date(topic.created_at).toLocaleDateString(
                              "vi-VN",
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                        <ChevronRight size={18} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isSelectMode && selectedTopicIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-white rounded-2xl shadow-2xl shadow-rose-500/20 border border-rose-100 px-6 py-4 flex items-center gap-6 animate-fade-in">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đã chọn</span>
            <span className="text-lg font-black text-rose-600">{selectedTopicIds.length} chủ đề</span>
          </div>
          <div className="w-px h-10 bg-slate-100"></div>
          <button
            onClick={handleExecuteBulkDelete}
            className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-rose-200"
          >
            <Trash2 size={20} />
            Xóa tất cả
          </button>
        </div>
      )}
    </div>
  );
}
