"use client";

import React, { useState, useEffect } from "react";
import { Download, X, FileSpreadsheet, CheckSquare, Square, Folder, FileText } from "lucide-react";
import { Topic } from "@/lib/types";
import { maskUserCode } from "@/lib/utils";

interface ExportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  topics: Topic[];
  userCode: string;
  onExport: (selectedTopics: Topic[], filename: string) => void;
  isExporting: boolean;
}

export default function ExportExcelModal({
  isOpen,
  onClose,
  topics,
  userCode,
  onExport,
  isExporting,
}: ExportExcelModalProps) {
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set());

  // Group topics like in TopicListView
  const groupedTopics = topics.reduce(
    (acc, topic) => {
      const cat =
        topic.category_name ||
        (topic.user_code === userCode ? "Từ vựng cá nhân" : "Chủ điểm hệ thống");
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(topic);
      return acc;
    },
    {} as Record<string, Topic[]>
  );

  if (!groupedTopics["Từ vựng cá nhân"]) {
    groupedTopics["Từ vựng cá nhân"] = [];
  }

  const sortedCategories = Object.keys(groupedTopics).sort((a, b) => {
    if (a === "Từ vựng cá nhân") return -1;
    if (b === "Từ vựng cá nhân") return 1;
    if (a.toUpperCase() === "ATHENA ENGLISH") return -1;
    if (b.toUpperCase() === "ATHENA ENGLISH") return 1;
    return a.localeCompare(b);
  });

  useEffect(() => {
    if (isOpen) {
      // By default select all
      const allIds = new Set(topics.map((t) => t.id));
      setSelectedTopicIds(allIds);
    }
  }, [isOpen, topics]);

  if (!isOpen) return null;

  const handleToggleAll = () => {
    if (selectedTopicIds.size === topics.length) {
      // deselect all
      setSelectedTopicIds(new Set());
    } else {
      // select all
      setSelectedTopicIds(new Set(topics.map((t) => t.id)));
    }
  };

  const handleToggleCategory = (catName: string) => {
    const catTopics = groupedTopics[catName];
    const catTopicIds = catTopics.map((t) => t.id);
    const allSelected = catTopicIds.every((id) => selectedTopicIds.has(id));

    const newSet = new Set(selectedTopicIds);
    if (allSelected) {
      catTopicIds.forEach((id) => newSet.delete(id));
    } else {
      catTopicIds.forEach((id) => newSet.add(id));
    }
    setSelectedTopicIds(newSet);
  };

  const handleToggleTopic = (topicId: string) => {
    const newSet = new Set(selectedTopicIds);
    if (newSet.has(topicId)) {
      newSet.delete(topicId);
    } else {
      newSet.add(topicId);
    }
    setSelectedTopicIds(newSet);
  };

  const handleExport = () => {
    const selected = topics.filter((t) => selectedTopicIds.has(t.id));
    onExport(selected, "Tu_Vung_EngMaster");
  };

  const isAllSelected = selectedTopicIds.size === topics.length && topics.length > 0;
  const isIndeterminate = selectedTopicIds.size > 0 && selectedTopicIds.size < topics.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] border border-slate-100">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileSpreadsheet className="text-emerald-500" size={24} /> 
              Xuất Excel Từ Vựng
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Chọn danh mục hoặc chủ điểm bạn muốn xuất ra Excel
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scroll">
          {/* Toàn bộ */}
          <div 
            onClick={handleToggleAll}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors cursor-pointer ${
              isAllSelected ? "bg-emerald-50 border-emerald-500" : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
             {isAllSelected ? (
                <CheckSquare size={20} className="text-emerald-600 shrink-0" />
              ) : isIndeterminate ? (
                <div className="relative shrink-0">
                  <Square size={20} className="text-slate-300" />
                  <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-emerald-500 rounded-sm"></div>
                </div>
              ) : (
                <Square size={20} className="text-slate-300 shrink-0" />
              )}
            <div className="flex-1 font-bold text-slate-700">
              Toàn bộ từ vựng ({topics.length} chủ điểm)
            </div>
          </div>

          <div className="space-y-4">
            {sortedCategories.map((catName) => {
              const catTopics = groupedTopics[catName];
              if (catTopics.length === 0) return null;

              const isCatAllSelected = catTopics.every((t) => selectedTopicIds.has(t.id));
              const isCatSomeSelected = catTopics.some((t) => selectedTopicIds.has(t.id)) && !isCatAllSelected;

              return (
                <div key={catName} className="space-y-2 border rounded-xl overflow-hidden shadow-sm">
                  <div 
                    onClick={() => handleToggleCategory(catName)}
                    className="flex justify-between items-center p-3 bg-slate-50 border-b cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {isCatAllSelected ? (
                        <CheckSquare size={16} className="text-indigo-600 shrink-0" />
                      ) : isCatSomeSelected ? (
                        <div className="relative shrink-0">
                          <Square size={16} className="text-slate-300" />
                          <div className="absolute inset-0 m-auto w-2 h-2 bg-indigo-500 rounded-sm"></div>
                        </div>
                      ) : (
                        <Square size={16} className="text-slate-300 shrink-0" />
                      )}
                      <Folder size={16} className="text-indigo-400" />
                      <span className="font-bold text-sm text-slate-800">{catName}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-400 bg-white px-2 py-0.5 rounded-full border">
                      {catTopics.length}
                    </span>
                  </div>

                  <div className="p-2 space-y-1 bg-white max-h-[200px] overflow-y-auto hide-scroll">
                    {catTopics.map((topic) => {
                      const isTopicSelected = selectedTopicIds.has(topic.id);
                      return (
                        <div 
                          key={topic.id}
                          onClick={() => handleToggleTopic(topic.id)}
                          className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="ml-4">
                            {isTopicSelected ? (
                              <CheckSquare size={14} className="text-emerald-500 shrink-0" />
                            ) : (
                              <Square size={14} className="text-slate-200 shrink-0" />
                            )}
                          </div>
                          <FileText size={14} className="text-slate-400" />
                          <div className="flex flex-col">
                            <span className={`text-sm ${isTopicSelected ? "text-slate-700 font-medium" : "text-slate-500"}`}>
                              {topic.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {topic.vocab_count || 0} từ
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 gap-4 flex bg-slate-50/50 items-center justify-between">
          <div className="text-sm font-semibold text-slate-500">
            Đã chọn: <span className="text-emerald-600 font-black">{selectedTopicIds.size}</span> chủ điểm
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || selectedTopicIds.size === 0}
              className="px-6 py-2.5 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {isExporting ? (
                <>Đang tải...</>
              ) : (
                <>
                  <Download size={18} />
                  Xuất dữ liệu
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
