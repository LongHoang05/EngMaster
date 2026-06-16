"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  Command,
  X,
  ChevronRight,
  TrendingUp,
  FolderOpen,
} from "lucide-react";
import { Topic } from "@/lib/types";

interface CommandPaletteProps {
  topics: Topic[];
  activeTab: string;
  setActiveTab: (tab: "dashboard" | "topics" | "quiz") => void;
  onSelectTopic: (topic: Topic) => void;
}

interface CommandItem {
  id: string | number;
  label: string;
  icon: React.ElementType;
  type: "nav" | "topic" | "dictionary";
  data?: Topic;
}

export default function CommandPalette({
  topics,
  activeTab,
  setActiveTab,
  onSelectTopic,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpen = () => setIsOpen(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Tiến độ học tập",
      icon: TrendingUp,
      type: "nav",
    },
    { id: "topics", label: "Kho tài liệu vựng", icon: FolderOpen, type: "nav" },
    { id: "quiz", label: "Thử thách ôn tập", icon: Gamepad2, type: "nav" },
  ];

  const filteredTopics = topics
    .filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  const results: CommandItem[] = [
    ...navigationItems
      .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
      .map((item) => ({ ...item, type: "nav" as const })),
    ...filteredTopics.map((t) => ({
      id: t.id,
      label: t.name,
      icon: BookOpen,
      type: "topic" as const,
      data: t,
    })),
  ];

  if (query.trim().length > 0) {
    results.push({
      id: "dict-search",
      label: `Tra từ điển: "${query.trim()}"`,
      icon: Search,
      type: "dictionary" as const,
    });
  }

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: CommandItem) => {
    if (item.type === "nav") {
      setActiveTab(item.id as "dashboard" | "topics" | "quiz");
    } else if (item.type === "topic" && item.data) {
      setActiveTab("topics");
      onSelectTopic(item.data);
    } else if (item.type === "dictionary") {
      window.dispatchEvent(
        new CustomEvent("open-dictionary", { detail: query.trim() }),
      );
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + results.length) % (results.length || 1),
      );
    } else if (e.key === "Enter") {
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="flex items-center px-6 py-4 border-b border-slate-100">
                <Search className="text-slate-400 mr-4" size={20} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Bạn muốn đi đâu? (Tìm chủ đề, tính năng...)"
                  className="flex-1 bg-transparent border-none outline-none text-slate-800 font-medium placeholder:text-slate-400 py-2"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                ref={listRef}
                className="max-h-[60vh] overflow-y-auto p-2 hide-scroll"
              >
                {results.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search size={20} />
                    </div>
                    <p className="text-sm font-medium">
                      Không tìm thấy kết quả nào cho "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {results.map((item, index) => (
                      <button
                        key={`${item.type}-${item.id}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all text-left ${
                          selectedIndex === index
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`p-2.5 rounded-xl ${
                            selectedIndex === index
                              ? "bg-white/20"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          <item.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm leading-none">
                            {item.label}
                          </p>
                          <p
                            className={`text-[10px] mt-1 uppercase font-black tracking-widest opacity-60 ${
                              selectedIndex === index
                                ? "text-indigo-100"
                                : "text-slate-400"
                            }`}
                          >
                            {item.type === "nav" ? "Tính năng" : "Chủ đề"}
                          </p>
                        </div>
                        {selectedIndex === index && <ChevronRight size={16} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 shadow-sm">
                      ↑↓
                    </span>
                    <span>Di chuyển</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 shadow-sm">
                      Enter
                    </span>
                    <span>Chọn</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 shadow-sm">
                    Esc
                  </span>
                  <span>Đóng</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
