import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function useAuth() {
  const [userCode, setUserCode] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [hasStudiedToday, setHasStudiedToday] = useState(false);
  const [displayName, setDisplayName] = useState("Học giả bí ẩn");
  const [isSavingName, setIsSavingName] = useState(false);
  const [celebrationStreakCount, setCelebrationStreakCount] = useState(0);
  const [isStreakCelebrationOpen, setIsStreakCelebrationOpen] = useState(false);

  const syncUserProfile = useCallback(async (code: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("current_streak, display_name, last_active_date")
        .eq("user_code", code)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        let streak = data.current_streak || 0;
        let lastActiveStr = data.last_active_date ? data.last_active_date.split('T')[0] : null;

        const todayStr = new Date().toLocaleDateString("en-CA");
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterdayStr = yesterdayDate.toLocaleDateString("en-CA");

        if (lastActiveStr && lastActiveStr !== todayStr && lastActiveStr !== yesterdayStr) {
           if (streak > 0) {
             streak = 0;
             await supabase.from("users").update({ current_streak: 0 }).eq("user_code", code);
           }
        }

        setCurrentStreak(streak);
        setDisplayName(data.display_name || "Học giả bí ẩn");
        setHasStudiedToday(lastActiveStr === todayStr);
      } else {
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
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("eng_master_user_code");
    if (saved) {
      setUserCode(saved);
      syncUserProfile(saved);
    }
    setIsAuthLoading(false);
  }, [syncUserProfile]);

  const handleLoginSuccess = (code: string) => {
    localStorage.setItem("eng_master_user_code", code);
    setUserCode(code);
    syncUserProfile(code);
    toast.success("Đã đăng nhập dưới mã: " + code);
  };

  const handleLogout = () => {
    localStorage.removeItem("eng_master_user_code");
    setUserCode(null);
    toast.info("Đã đăng xuất");
  };

  const handleUpdateDisplayName = async (newName: string) => {
    if (!userCode || !newName.trim()) return;

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
    } catch (e: any) {
      toast.error("Không thể lưu tên: " + e.message);
      syncUserProfile(userCode);
    } finally {
      setIsSavingName(false);
    }
  };

  const handleUpdateStreak = async () => {
    if (!userCode) return;
    try {
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
      const lastActive = user.last_active_date ? user.last_active_date.split('T')[0] : null;

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

  return {
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
  };
}
