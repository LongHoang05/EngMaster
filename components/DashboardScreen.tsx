"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  BookOpen,
  Flame,
  Sprout,
  Leaf,
  Trees,
  Trophy,
  Crown,
  Medal,
  Sparkles,
  Loader2,
  Edit2,
  Bell,
  BellRing,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Topic, LeaderboardUser } from "@/lib/types";
import { maskUserCode } from "@/lib/utils";

interface DashboardScreenProps {
  userCode: string;
  topics: Topic[];
  currentStreak: number;
  hasStudiedToday: boolean;
  displayName: string;
  onUpdateDisplayName: (newName: string) => Promise<void>;
}

export default function DashboardScreen({
  userCode,
  topics,
  currentStreak,
  hasStudiedToday,
  displayName,
  onUpdateDisplayName,
}: DashboardScreenProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);
  const [isSavingName, setIsSavingName] = useState(false);
  const [notifStatus, setNotifStatus] = useState<
    "idle" | "loading" | "subscribed" | "denied"
  >("idle");

  useEffect(() => {
    setTempName(displayName);
  }, [displayName]);

  // Check notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        setNotifStatus("subscribed");
      } else if (Notification.permission === "denied") {
        setNotifStatus("denied");
      }
    }
  }, []);

  const handleEnableNotifications = async () => {
    setNotifStatus("loading");
    try {
      // Try OneSignal first
      const OneSignalDeferred = (window as any).OneSignalDeferred;
      if (OneSignalDeferred && typeof OneSignalDeferred.push === "function") {
        OneSignalDeferred.push(async function (oneSignal: any) {
          try {
            await oneSignal.Notifications.requestPermission();
            const permission = oneSignal.Notifications.permission;
            setNotifStatus(permission ? "subscribed" : "idle");
          } catch (err) {
            console.warn("[OneSignal] requestPermission failed:", err);
            // Fallback to native browser API
            const result = await Notification.requestPermission();
            setNotifStatus(
              result === "granted"
                ? "subscribed"
                : result === "denied"
                  ? "denied"
                  : "idle",
            );
          }
        });
      } else {
        // Fallback: use native browser notification API
        const result = await Notification.requestPermission();
        setNotifStatus(
          result === "granted"
            ? "subscribed"
            : result === "denied"
              ? "denied"
              : "idle",
        );
      }
    } catch (e) {
      console.error("Notification subscription error:", e);
      setNotifStatus("idle");
    }
  };

  const handleSaveName = async () => {
    if (!tempName.trim()) {
      setIsEditingName(false);
      setTempName(displayName);
      return;
    }
    if (tempName !== displayName) {
      setIsSavingName(true);
      await onUpdateDisplayName(tempName);
      setIsSavingName(false);
    }
    setIsEditingName(false);
  };
  const [stats, setStats] = useState({
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    total: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const [lbTab, setLbTab] = useState<"streak" | "vocab" | "mastery">("streak");
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);

  // Phân hạng danh hiệu
  const getRankTitle = (count: number) => {
    if (count < 50) return { label: "🪵 Gỗ mục", color: "text-slate-400" };
    if (count < 200)
      return { label: "🌱 Mầm non", color: "text-emerald-500 font-semibold" };
    if (count < 500)
      return { label: "⚔️ Chiến binh", color: "text-indigo-500 font-bold" };
    return {
      label: "👑 Huyền thoại",
      color: "text-amber-500 font-black animate-pulse",
    };
  };

  // Fetch individual stats (Optimized)
  useEffect(() => {
    const fetchVocabStats = async () => {
      try {
        const topicIds = topics.map((t) => t.id);
        if (topicIds.length === 0) {
          setIsLoadingStats(false);
          return;
        }

        const { data, error } = await supabase
          .from("vocabularies")
          .select("review_interval")
          .in("topic_id", topicIds);

        if (error) throw error;

        let l1 = 0,
          l2 = 0,
          l3 = 0,
          l4 = 0;
        data?.forEach((v) => {
          const iv = v.review_interval || 0;
          if (iv === 0) l1++;
          else if (iv <= 3) l2++;
          else if (iv < 30) l3++;
          else l4++;
        });

        setStats({
          level1: l1,
          level2: l2,
          level3: l3,
          level4: l4,
          total: data?.length || 0,
        });
      } catch (e) {
        console.error("Lỗi fetch stats", e);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchVocabStats();
  }, [topics]);

  // Fetch leaderboard dynamic based on tab (Optimized via RPC)
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoadingLeaderboard(true);
      try {
        if (lbTab === "streak") {
          // Streak remains a direct user table query (small set)
          const { data, error } = await supabase
            .from("users")
            .select("user_code, display_name, current_streak")
            .not("current_streak", "is", null)
            .order("current_streak", { ascending: false })
            .limit(10);

          if (error) throw error;
          setLeaderboard(
            data.map((u) => ({
              user_code: u.user_code,
              name: u.display_name,
              count: u.current_streak || 0,
            })),
          );
        } else if (lbTab === "mastery") {
          // USE RPC for Mastery (Server-side aggregation)
          const { data, error } = await supabase.rpc("get_user_mastery_stats");
          if (error) {
            console.warn(
              "RPC 'get_user_mastery_stats' not found. Leaderboard for mastery will be unavailable until configured.",
            );
            setLeaderboard([]);
          } else {
            setLeaderboard(
              data.map((item: { name: string; val: number }) => ({
                user_code: "", // Not used when we have name
                name: item.name,
                count: Number(item.val),
              })),
            );
          }
        } else {
          // USE RPC for Total Vocab (Server-side aggregation)
          const { data, error } = await supabase.rpc("get_user_vocab_stats");
          if (error) {
            console.warn(
              "RPC 'get_user_vocab_stats' not found. Leaderboard for vocab will be unavailable until configured.",
            );
            setLeaderboard([]);
          } else {
            setLeaderboard(
              data.map((item: { name: string; val: number }) => ({
                user_code: "", // Not used when we have name
                name: item.name,
                count: Number(item.val),
              })),
            );
          }
        }
      } catch (err: unknown) {
        const error = err as {
          message?: string;
          details?: string;
          hint?: string;
        };
        console.error("Lỗi fetch leaderboard details:", {
          message: error?.message || "Unknown error",
          details: error?.details || "",
          hint: error?.hint || "",
        });
        setLeaderboard([]);
      } finally {
        setIsLoadingLeaderboard(false);
      }
    };

    fetchLeaderboard();
  }, [lbTab]);

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-8 mt-2">
      {/* 1. Chỉ số cá nhân */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 z-0 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-slate-800">
                Xin chào,
              </span>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value.slice(0, 25))}
                    onBlur={handleSaveName}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                    className="text-xl md:text-2xl font-black text-indigo-600 bg-white border-b-2 border-indigo-500 outline-none w-32 md:w-48"
                  />
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="group flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-xl md:text-2xl font-black text-indigo-600 border-b-2 border-transparent group-hover:border-indigo-200 transition-colors uppercase tracking-tight truncate max-w-[150px] sm:max-w-xs">
                    {isSavingName ? "Đang lưu..." : displayName}
                  </span>
                  <Edit2
                    size={18}
                    className="text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0"
                  />
                </div>
              )}
            </div>

            {currentStreak > 0 && (
              <div
                className={`flex items-center self-start sm:self-auto gap-2 px-4 py-2 rounded-2xl border shadow-sm ${
                  hasStudiedToday
                    ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                    : "bg-slate-100 border-slate-200"
                }`}
                title={`Chuỗi học ${currentStreak} ngày`}
              >
                <Flame
                  className={`w-5 h-5 ${hasStudiedToday ? "text-orange-500 fill-orange-500 animate-pulse" : "text-slate-400 fill-slate-300"}`}
                />
                <span
                  className={`font-black text-sm ${hasStudiedToday ? "text-orange-600" : "text-slate-500"}`}
                >
                  Chuỗi {currentStreak} ngày
                </span>
              </div>
            )}
          </div>

          <div className="h-px w-full bg-slate-100 mb-6"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="text-indigo-500" size={24} /> Tiến độ ghi
                nhớ cá nhân
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Trạng thái ôn tập của bạn
              </p>
            </div>
            <span className="text-sm self-start sm:self-auto font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
              <BookOpen size={16} className="text-indigo-500 shrink-0" />
              Tổng: {stats.total} từ
            </span>
          </div>

          {isLoadingStats ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>
          ) : stats.total === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-slate-50/50 rounded-2xl border border-slate-100 border-dashed">
              Chưa có dữ liệu từ vựng. Hãy thêm từ vựng để theo dõi tiến độ!
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* Vừa gieo */}
              <div className="bg-white rounded-[2rem] p-6 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Sprout size={72} className="text-slate-800" />
                </div>
                <div className="flex items-center gap-2 text-slate-500 mb-3 relative z-10">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Sprout size={18} className="text-slate-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Vừa gieo
                  </span>
                </div>
                <div className="text-4xl font-black text-slate-700 relative z-10">
                  {stats.level1}
                </div>
                <p className="text-xs text-slate-400 mt-2 uppercase font-medium relative z-10 bg-slate-50 inline-block px-2 py-1 rounded-md">
                  &lt; 1 ngày
                </p>
              </div>

              {/* Lên chồi */}
              <div className="bg-gradient-to-br from-emerald-50/50 to-white rounded-[2rem] p-6 border-2 border-emerald-100/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Leaf size={72} className="text-emerald-500" />
                </div>
                <div className="flex items-center gap-2 text-emerald-600 mb-3 relative z-10">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Leaf size={18} className="text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Lên chồi
                  </span>
                </div>
                <div className="text-4xl font-black text-emerald-700 relative z-10">
                  {stats.level2}
                </div>
                <p className="text-xs text-emerald-600/80 mt-2 uppercase font-medium relative z-10 bg-emerald-100/50 inline-block px-2 py-1 rounded-md">
                  1 - 3 ngày
                </p>
              </div>

              {/* Bám rễ */}
              <div className="bg-gradient-to-br from-green-50/50 to-white rounded-[2rem] p-6 border-2 border-green-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Trees size={72} className="text-green-500" />
                </div>
                <div className="flex items-center gap-2 text-green-600 mb-3 relative z-10">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Trees size={18} className="text-green-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Bám rễ
                  </span>
                </div>
                <div className="text-4xl font-black text-green-700 relative z-10">
                  {stats.level3}
                </div>
                <p className="text-xs text-green-600/80 mt-2 uppercase font-medium relative z-10 bg-green-100/50 inline-block px-2 py-1 rounded-md">
                  7 - 15 ngày
                </p>
              </div>

              {/* Thuộc làu */}
              <div className="bg-gradient-to-br from-orange-50/50 to-amber-50 rounded-[2rem] p-6 border-2 border-orange-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Flame size={72} className="text-orange-500" />
                </div>
                <div className="flex items-center gap-2 text-orange-600 mb-3 relative z-10">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Flame size={18} className="text-orange-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Thuộc làu
                  </span>
                </div>
                <div className="text-4xl font-black text-orange-600 relative z-10">
                  {stats.level4}
                </div>
                <p className="text-xs text-orange-600/80 mt-2 uppercase font-medium relative z-10 bg-orange-100/50 inline-block px-2 py-1 rounded-md">
                  &gt; 30 ngày
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 1.5. Notification Banner */}
      <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 rounded-3xl shadow-xl shadow-indigo-200/50 border border-indigo-500/20 p-6 md:p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -ml-8 -mb-8 pointer-events-none"></div>
        <div className="absolute top-4 right-8 opacity-10 pointer-events-none">
          <BellRing size={120} className="text-white" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-2xl shadow-lg ${
                notifStatus === "subscribed"
                  ? "bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/30"
                  : "bg-white/10 backdrop-blur-sm border border-white/20"
              }`}
            >
              {notifStatus === "subscribed" ? (
                <BellRing size={28} className="text-emerald-300" />
              ) : (
                <Bell size={28} className="text-white" />
              )}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-black text-white">
                {notifStatus === "subscribed"
                  ? "🎉 Thông báo đã được bật!"
                  : notifStatus === "denied"
                    ? "🔕 Thông báo bị chặn"
                    : "🔔 Nhận thử thách từ vựng"}
              </h3>
              <p className="text-sm text-indigo-100/80 mt-1 max-w-md">
                {notifStatus === "subscribed"
                  ? "Bạn sẽ nhận câu hỏi từ vựng mỗi 1 tiếng. Học mọi lúc mọi nơi!"
                  : notifStatus === "denied"
                    ? "Hãy vào cài đặt trình duyệt để bật lại quyền thông báo."
                    : "Nhận thông báo đẩy với câu hỏi từ vựng mỗi 1 tiếng. Ôn tập mọi lúc mọi nơi!"}
              </p>
            </div>
          </div>

          {notifStatus === "subscribed" ? (
            <div className="flex sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 px-5 py-3 bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/30 rounded-2xl">
                <CheckCircle2 size={20} className="text-emerald-300" />
                <span className="text-sm font-bold text-emerald-200">
                  Đã bật
                </span>
              </div>
              <button
                onClick={async () => {
                  try {
                    // Try to get the specific Subscription ID to bypass segment delay
                    let targetParam = "";
                    const OneSignalDeferred = (window as any).OneSignalDeferred;
                    if (OneSignalDeferred) {
                      await new Promise((resolve) => {
                        OneSignalDeferred.push(async function (oneSignal: any) {
                          const subId = oneSignal.User.PushSubscription.id;
                          if (subId) targetParam = `&target_id=${subId}`;
                          resolve(true);
                        });
                      });
                    }

                    const res = await fetch(
                      `/api/notifications/daily?secret=engmaster_secret_lhg_push${targetParam}`,
                      { method: "POST" },
                    );
                    const data = await res.json();
                    if (!data.success) {
                      alert(
                        "⚠️ Lỗi: " + (data.error || "Không rõ nguyên nhân"),
                      );
                    }
                  } catch (e) {
                    alert("⚠️ Lỗi kết nối khi gửi test!");
                  }
                }}
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl text-white text-sm font-bold transition-all active:scale-95"
              >
                <Sparkles size={16} />
                Gửi thông báo thử
              </button>
            </div>
          ) : notifStatus === "denied" ? (
            <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
              <span className="text-sm font-bold text-white/60">
                Bị chặn bởi trình duyệt
              </span>
            </div>
          ) : (
            <button
              onClick={handleEnableNotifications}
              disabled={notifStatus === "loading"}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-indigo-700 font-black rounded-2xl shadow-lg shadow-indigo-900/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait whitespace-nowrap"
            >
              {notifStatus === "loading" ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Bell size={18} />
              )}
              {notifStatus === "loading" ? "Đang bật..." : "Bật thông báo"}
            </button>
          )}
        </div>
      </div>

      {/* 2. Leaderboard Section */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
        {/* Header with Tabs */}
        <div
          className={`p-6 md:p-8 border-b border-slate-100 transition-colors duration-500 ${
            lbTab === "streak"
              ? "bg-gradient-to-r from-orange-50 to-amber-50"
              : lbTab === "mastery"
                ? "bg-gradient-to-r from-emerald-50 to-teal-50"
                : "bg-gradient-to-r from-indigo-50 to-purple-50"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                {lbTab === "streak" ? (
                  <Flame
                    className="text-orange-500 fill-orange-500"
                    size={32}
                  />
                ) : lbTab === "mastery" ? (
                  <Crown
                    className="text-emerald-500 fill-emerald-500"
                    size={32}
                  />
                ) : (
                  <Trophy className="text-amber-500 fill-amber-500" size={32} />
                )}
                Bảng vàng thi đua
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-2">
                {lbTab === "streak"
                  ? "Những người học bền bỉ nhất hệ thống"
                  : lbTab === "mastery"
                    ? "Những thủ khoa sở hữu nhiều từ thuộc làu nhất"
                    : "Top 10 quái vật có số lượng từ vựng cá nhân nhiều nhất"}
              </p>
            </div>

            {/* TAB BUTTONS */}
            <div className="flex flex-wrap gap-1 bg-white/60 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-100 shadow-sm self-start overflow-x-auto hide-scroll w-full sm:w-auto">
              {[
                { id: "streak", label: "Chuỗi lửa", icon: Flame },
                { id: "vocab", label: "Tổng từ", icon: BookOpen },
                { id: "mastery", label: "Bậc thầy", icon: Sparkles },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setLbTab(tab.id as "vocab" | "streak" | "mastery")
                  }
                  className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap grow sm:grow-0 ${
                    lbTab === tab.id
                      ? tab.id === "streak"
                        ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                        : tab.id === "mastery"
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                          : "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white"
                  }`}
                >
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoadingLeaderboard ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <Loader2
              className={`w-12 h-12 animate-spin ${
                lbTab === "streak"
                  ? "text-orange-400"
                  : lbTab === "mastery"
                    ? "text-emerald-400"
                    : "text-indigo-400"
              }`}
            />
            <p className="text-slate-400 font-bold animate-pulse tracking-wide uppercase text-xs">
              Đang nạp bảng xếp hạng...
            </p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="py-24 text-center text-slate-400 bg-slate-50/20 italic">
            Chưa có chiến binh nào lọt vào danh sách này.
          </div>
        ) : (
          <div className="divide-y divide-slate-50 bg-slate-50/30 p-4 md:p-8">
            <div className="max-w-4xl mx-auto flex flex-col gap-3">
              {leaderboard.map((user, index) => {
                const isCurrentUser = user.user_code === userCode;
                const isTop3 = index < 3;
                const rankTitle = getRankTitle(user.count);

                return (
                  <div
                    key={`${lbTab}-${user.user_code || user.name}-${index}`}
                    className={`flex items-center px-4 py-4 md:px-7 md:py-6 rounded-3xl transition-all duration-300 border bg-white ${
                      isCurrentUser
                        ? "border-indigo-200 shadow-[0_8px_30px_-4px_rgba(99,102,241,0.2)] scale-[1.03] z-10"
                        : isTop3
                          ? "border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1"
                          : "border-transparent hover:bg-white hover:border-slate-100 hover:shadow-sm"
                    }`}
                  >
                    {/* Hạng */}
                    <div className="w-16 flex-shrink-0 flex justify-center">
                      {index === 0 ? (
                        <div className="relative">
                          <Crown
                            className="text-yellow-400 drop-shadow-md relative z-10"
                            size={42}
                          />
                        </div>
                      ) : index === 1 ? (
                        <Medal
                          className="text-slate-300 drop-shadow-sm flex-shrink-0"
                          size={36}
                        />
                      ) : index === 2 ? (
                        <Medal
                          className="text-amber-600/80 drop-shadow-sm flex-shrink-0"
                          size={36}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-lg">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    {/* Thông tin User */}
                    <div className="ml-4 md:ml-8 flex-1 min-w-0">
                      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                        <div
                          className={`text-lg md:text-2xl font-black tracking-tight truncate max-w-full ${
                            isCurrentUser
                              ? "text-indigo-700"
                              : index === 0
                                ? "text-amber-600"
                                : "text-slate-800"
                          }`}
                        >
                          {isCurrentUser
                            ? user.name || user.user_code
                            : user.name || maskUserCode(user.user_code)}
                        </div>
                        {isCurrentUser && (
                          <span className="text-[10px] md:text-xs font-black bg-indigo-600 text-white px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg shadow-indigo-200">
                            Bạn
                          </span>
                        )}
                      </div>

                      {/* DANH HIỆU */}
                      <div
                        className={`text-xs md:text-sm mt-1 mb-0.5 ${rankTitle.color}`}
                      >
                        {rankTitle.label}
                      </div>
                    </div>

                    {/* Chỉ số (Số lượng) */}
                    <div
                      className={`flex flex-col items-center justify-center min-w-[80px] md:min-w-[120px] px-4 py-3 md:px-6 md:py-4 rounded-2xl border ${
                        isCurrentUser
                          ? "bg-indigo-50/50 border-indigo-100"
                          : index === 0
                            ? "bg-amber-50/50 border-amber-100"
                            : "bg-slate-50 border-slate-100 shadow-inner"
                      }`}
                    >
                      <span className="text-[10px] md:text-xs uppercase font-black text-slate-400 tracking-widest mb-1">
                        {lbTab === "streak" ? "Ngày" : "Từ vựng"}
                      </span>
                      <div
                        className={`font-black text-2xl md:text-4xl ${
                          isCurrentUser
                            ? "text-indigo-600"
                            : index === 0
                              ? "text-amber-600"
                              : "text-slate-700"
                        }`}
                      >
                        {user.count.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
