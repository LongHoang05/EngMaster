"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  X,
  User,
  Bell,
  Moon,
  Sun,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  Download,
  Volume2,
  Trash2,
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  displayName: string;
  onUpdateDisplayName: (name: string) => Promise<void>;
  onLogout: () => void;
  onRestartTour: () => void;
  onExportData: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  displayName,
  onUpdateDisplayName,
  onLogout,
  onRestartTour,
  onExportData,
}: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState<
    "profile" | "sound" | "notifications" | "appearance" | "data"
  >("profile");
  const [tempName, setTempName] = useState(displayName);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTempName(displayName);
    }
  }, [isOpen, displayName]);

  const handleSaveName = async () => {
    if (tempName === displayName) return;
    setIsSaving(true);
    await onUpdateDisplayName(tempName);
    setIsSaving(false);
  };

  const [soundEffects, setSoundEffects] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.7);
  const [voice, setVoice] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(1.0);

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      setSoundEffects(localStorage.getItem("setting_sound_effects") !== "off");
      const sVol = localStorage.getItem("setting_sound_volume");
      if (sVol) setSoundVolume(parseFloat(sVol));

      setVoice(localStorage.getItem("setting_voice") !== "off");
      const vVol = localStorage.getItem("setting_voice_volume");
      if (vVol) setVoiceVolume(parseFloat(vVol));
    }
  }, [isOpen]);

  const toggleSoundEffects = (checked: boolean) => {
    setSoundEffects(checked);
    localStorage.setItem("setting_sound_effects", checked ? "on" : "off");
  };

  const changeSoundVolume = (vol: number) => {
    setSoundVolume(vol);
    localStorage.setItem("setting_sound_volume", vol.toString());
  };

  const toggleVoice = (checked: boolean) => {
    setVoice(checked);
    localStorage.setItem("setting_voice", checked ? "on" : "off");
  };

  const changeVoiceVolume = (vol: number) => {
    setVoiceVolume(vol);
    localStorage.setItem("setting_voice_volume", vol.toString());
  };

  const sections = [
    { id: "profile", label: "Cá nhân", icon: User },
    { id: "sound", label: "Âm thanh", icon: Volume2 },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "appearance", label: "Giao diện", icon: Moon },
    { id: "data", label: "Dữ liệu & Hệ thống", icon: ShieldCheck },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[600px]"
          >
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 p-4 md:p-6 flex flex-col shrink-0">
              <div className="flex items-center justify-between md:justify-start mb-4 md:mb-8 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <Settings size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">
                    Cài đặt
                  </h2>
                </div>

                {/* Mobile Close Button */}
                <button
                  onClick={onClose}
                  className="md:hidden p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex md:flex-1 md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-1 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-2xl font-bold text-sm transition-all ${
                      activeSection === section.id
                        ? "bg-white text-indigo-600 shadow-sm border border-slate-100"
                        : "text-slate-500 hover:bg-white/50"
                    }`}
                  >
                    <section.icon size={18} />
                    {section.label}
                  </button>
                ))}

                {/* Mobile Logout Button */}
                <button
                  onClick={onLogout}
                  className="md:hidden shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm text-rose-500 bg-rose-50/50 hover:bg-rose-100 transition-all border border-rose-100/50"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </nav>

              {/* Desktop Logout Button */}
              <button
                onClick={onLogout}
                className="hidden md:flex mt-auto items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-rose-500 hover:bg-rose-50 transition-all"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white">
              <div className="hidden md:flex absolute top-6 right-6 z-10">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 md:pt-10">
                <AnimatePresence mode="wait">
                  {activeSection === "profile" && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className="text-lg font-black text-slate-800 mb-6">
                          Hồ sơ cá nhân
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">
                              Tên hiển thị
                            </label>
                            <div className="flex gap-3">
                              <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="flex-1 min-w-0 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                              />
                              <button
                                onClick={handleSaveName}
                                disabled={isSaving || tempName === displayName}
                                className="shrink-0 px-6 py-3.5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                              >
                                {isSaving ? "Lưu..." : "Lưu"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-50">
                        <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                              <Smartphone size={20} />
                            </div>
                            <h4 className="font-bold text-slate-800">
                              Thông tin thiết bị
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Dữ liệu của bạn được đồng bộ qua mã định danh cá
                            nhân. Hãy lưu giữ mã này để truy cập trên các thiết
                            bị khác.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === ("sound" as any) && (
                    <motion.div
                      key="sound"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-black text-slate-800">
                        Cài đặt âm thanh
                      </h3>

                      <div className="space-y-6">
                        {/* Hiệu ứng âm thanh */}
                        <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-white rounded-xl text-indigo-500 shadow-sm">
                                <Volume2 size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">
                                  Hiệu ứng (Đúng/Sai)
                                </p>
                                <p className="text-xs text-slate-400 font-medium">
                                  Âm thanh khi trả lời flashcard
                                </p>
                              </div>
                            </div>
                            {/* Toggle switch */}
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={soundEffects}
                                onChange={(e) =>
                                  toggleSoundEffects(e.target.checked)
                                }
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>

                          {soundEffects && (
                            <div className="px-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-500">
                                  Âm lượng
                                </span>
                                <span className="text-xs font-bold text-indigo-600">
                                  {Math.round(soundVolume * 100)}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={soundVolume}
                                onChange={(e) =>
                                  changeSoundVolume(parseFloat(e.target.value))
                                }
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                              />
                            </div>
                          )}
                        </div>

                        {/* Đọc từ vựng */}
                        <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-white rounded-xl text-emerald-500 shadow-sm">
                                <Volume2 size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">
                                  Đọc từ vựng (Phát âm)
                                </p>
                                <p className="text-xs text-slate-400 font-medium">
                                  Tự động đọc tiếng Anh
                                </p>
                              </div>
                            </div>
                            {/* Toggle switch */}
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={voice}
                                onChange={(e) => toggleVoice(e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                          </div>

                          {voice && (
                            <div className="px-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-500">
                                  Âm lượng phát âm
                                </span>
                                <span className="text-xs font-bold text-emerald-600">
                                  {Math.round(voiceVolume * 100)}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={voiceVolume}
                                onChange={(e) =>
                                  changeVoiceVolume(parseFloat(e.target.value))
                                }
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "notifications" && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-black text-slate-800">
                        Cài đặt thông báo
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-white rounded-xl text-indigo-500 shadow-sm">
                              <Bell size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">
                                Thông báo đẩy
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                Học tập hàng ngày
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>

                        <div className="p-5 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
                          <HelpCircle
                            className="text-amber-500 shrink-0"
                            size={20}
                          />
                          <p className="text-xs text-amber-700 font-medium leading-relaxed">
                            Hiện tại hệ thống mặc định gửi thông báo mỗi 1 tiếng
                            để tối ưu khả năng ghi nhớ. Tính năng tùy chỉnh tần
                            suất sẽ sớm ra mắt.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "appearance" && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-black text-slate-800">
                        Giao diện ứng dụng
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-6 bg-white border-2 border-indigo-600 rounded-3xl flex flex-col items-center gap-3 shadow-xl shadow-indigo-100">
                          <Sun className="text-indigo-600" size={32} />
                          <span className="font-bold text-slate-800">
                            Giao diện sáng
                          </span>
                        </button>
                        <button className="p-6 bg-slate-50 border-2 border-transparent rounded-3xl flex flex-col items-center gap-3 grayscale opacity-60">
                          <Moon className="text-slate-400" size={32} />
                          <span className="font-bold text-slate-400">
                            Giao diện tối
                          </span>
                          <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">
                            Sắp có
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "data" && (
                    <motion.div
                      key="data"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-black text-slate-800 mb-2">
                        Hệ thống
                      </h3>

                      <button
                        onClick={onRestartTour}
                        className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:rotate-180 transition-transform duration-500">
                            <RefreshCw size={20} />
                          </div>
                          <span className="font-bold text-slate-700 text-sm">
                            Chạy lại hướng dẫn sử dụng
                          </span>
                        </div>
                        <ChevronRight size={18} className="text-slate-300" />
                      </button>

                      <button
                        onClick={onExportData}
                        className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                            <Download size={20} />
                          </div>
                          <span className="font-bold text-slate-700 text-sm">
                            Sao lưu tất cả dữ liệu (Excel)
                          </span>
                        </div>
                        <ChevronRight size={18} className="text-slate-300" />
                      </button>

                      <div className="pt-4">
                        <button className="w-full flex items-center gap-4 p-5 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-3xl transition-all">
                          <div className="p-2.5 bg-rose-100/50 rounded-xl">
                            <Trash2 size={20} />
                          </div>
                          Xóa toàn bộ dữ liệu ứng dụng
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
