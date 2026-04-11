"use client";

import React, { useState } from "react";
import { GraduationCap, KeyRound, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface LoginScreenProps {
  onSuccess: (code: string) => void;
}

export default function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = passcode.trim();
    if (!code) {
      setError("Vui lòng nhập mã bí mật.");
      return;
    }
    if (code.length < 3) {
      setError("Mã bí mật phải có ít nhất 3 ký tự.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // 1. Kiểm tra mã đã tồn tại chưa
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("user_code")
        .eq("user_code", code)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      // 2. Nếu chưa có → Tạo mới
      if (!existingUser) {
        const { error: insertError } = await supabase
          .from("users")
          .insert({ user_code: code, display_name: "Học giả bí ẩn" });

        if (insertError) throw insertError;
        toast.success("Chào mừng bạn mới!");
      } else {
        toast.success("Đăng nhập thành công!");
      }

      // 3. Đăng nhập thành công
      onSuccess(code);
    } catch (err) {
      const error = err as Error;
      console.error("Login error:", error);
      setError(`Lỗi: ${error.message || "Không thể kết nối với máy chủ."}`);
      toast.error("Đăng nhập thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <GraduationCap size={44} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            EngMaster
          </h1>
          <p className="text-slate-500 mt-1">
            Học từ vựng tiếng Anh thông minh
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="passcode"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Mã bí mật của bạn
            </label>
            <div className="relative">
              <KeyRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="passcode"
                type="text"
                autoFocus
                autoComplete="off"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError("");
                }}
                placeholder="Nhập mã bí mật..."
                className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-xl text-lg font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Đang kiểm tra...
              </>
            ) : (
              "Truy cập"
            )}
          </button>

          <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
            Nhập mã bất kỳ để bắt đầu. Nếu mã chưa tồn tại,
            <br />
            hệ thống sẽ tự động tạo tài khoản mới cho bạn.
          </p>
        </form>
      </div>
    </div>
  );
}
