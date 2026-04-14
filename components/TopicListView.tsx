"use client";

import React from "react";
import {
  Plus,
  FileSpreadsheet,
  BookOpen,
  ChevronRight,
  Loader2,
  Table,
} from "lucide-react";
import { Topic } from "@/lib/types";
import ImportExcelButton from "@/components/ImportExcelButton";

interface TopicListViewProps {
  topics: Topic[];
  userCode: string;
  isExporting: boolean;
  onImportSuccess: () => void;
  handleExportExcel: (topics: Topic[], name: string) => void;
  setIsAddTopicModalOpen: (open: boolean) => void;
  setIsExportExcelModalOpen: (open: boolean) => void;
  onSelectTopic: (topic: Topic) => void;
}

export default function TopicListView({
  topics,
  userCode,
  isExporting,
  onImportSuccess,
  handleExportExcel,
  setIsAddTopicModalOpen,
  setIsExportExcelModalOpen,
  onSelectTopic,
}: TopicListViewProps) {
  const groupedTopics = topics.reduce(
    (acc, topic) => {
      const cat =
        topic.category_name ||
        (topic.user_code === userCode ? "Từ vựng cá nhân" : "Chủ đề hệ thống");
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(topic);
      return acc;
    },
    {} as Record<string, Topic[]>
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
        <div className="w-full sm:w-auto flex flex-wrap gap-2">
            <ImportExcelButton userCode={userCode} onImportSuccess={onImportSuccess} />
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
              className="inline-flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-indigo-200 whitespace-nowrap"
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
                <div className="h-px flex-1 bg-slate-200/60"></div>
              </div>

              {groupedTopics[catName].length === 0 ? (
                <div className="py-6 text-center text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200 italic font-medium">
                  Chưa có chủ đề nào.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedTopics[catName].map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => onSelectTopic(topic)}
                      className="group relative flex items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-2xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors flex items-center justify-center flex-shrink-0 shadow-inner">
                        <Table size={24} />
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
                          <span>{new Date(topic.created_at).toLocaleDateString("vi-VN")}</span>
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
    </div>
  );
}
