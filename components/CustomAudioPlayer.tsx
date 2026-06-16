"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, Pause, FastForward, Rewind, Settings, AppWindow, X } from "lucide-react";

interface CustomAudioPlayerProps {
  audioUrl: string;
  seekToTime?: number | null;
  onTimeUpdate?: (time: number) => void;
}

export default function CustomAudioPlayer({ audioUrl, seekToTime, onTimeUpdate }: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  const togglePiP = async () => {
    if (pipWindow) {
      pipWindow.close();
      return;
    }
    
    if (!('documentPictureInPicture' in window)) {
      alert("Trình duyệt của bạn không hỗ trợ Picture-in-Picture cho giao diện này. Vui lòng dùng Chrome hoặc Edge phiên bản mới nhất.");
      return;
    }

    try {
      const pip = await (window as any).documentPictureInPicture.requestWindow({
        width: 350,
        height: 180,
      });

      // Copy Tailwind styles
      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          if (sheet.href) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = sheet.href;
            pip.document.head.appendChild(link);
          } else {
            const cssRules = Array.from(sheet.cssRules).map(rule => rule.cssText).join('');
            const style = document.createElement('style');
            style.textContent = cssRules;
            pip.document.head.appendChild(style);
          }
        } catch (e) {
          // ignore CORS errors
        }
      });
      
      // Copy explicit style tags
      document.head.querySelectorAll('style').forEach((style) => {
        pip.document.head.appendChild(style.cloneNode(true));
      });

      pip.addEventListener('pagehide', () => {
        setPipWindow(null);
      });
      
      setPipWindow(pip);
    } catch (e) {
      console.error(e);
      alert("Lỗi khi mở Picture-in-Picture.");
    }
  };

  useEffect(() => {
    if (seekToTime !== null && seekToTime !== undefined && audioRef.current) {
      audioRef.current.currentTime = seekToTime;
      if (!isPlaying) {
        audioRef.current.play().catch(e => console.error("Play error:", e));
        setIsPlaying(true);
      }
    }
  }, [seekToTime]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Play error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(audioRef.current.currentTime);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      let newTime = audioRef.current.currentTime + seconds;
      newTime = Math.max(0, Math.min(newTime, duration));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5];

  // Bắt sự kiện bàn phím (Keyboard shortcuts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bỏ qua nếu người dùng đang gõ chữ vào các ô input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault(); // Ngăn trình duyệt cuộn trang
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipTime(-5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipTime(5);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, duration]); // Cập nhật lại event khi isPlaying thay đổi

  const playerUI = (
    <div className={`bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm p-4 w-full h-full flex flex-col justify-center ${pipWindow ? '' : 'rounded-xl border'}`}>
      <div className="text-xs text-gray-400 dark:text-gray-500 mb-2 flex justify-end gap-3">
        <span><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">Space</kbd> Play/Pause</span>
        <span><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">←</kbd> <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">→</kbd> Tua ±5s</span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-500 w-10">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
          />
          <span className="text-xs font-mono text-gray-500 w-10">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => skipTime(-5)}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors"
              title="Lùi 5 giây"
            >
              <Rewind className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-transform active:scale-95 shadow-md"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <button
              onClick={() => skipTime(5)}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors"
              title="Tới 5 giây"
            >
              <FastForward className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex items-center gap-2">
            <button
              onClick={togglePiP}
              className={`p-2 rounded-lg transition-colors ${pipWindow ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}
              title="Cửa sổ nổi (PiP)"
            >
              <AppWindow className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
              <Settings className="w-4 h-4" />
              {playbackRate}x
            </button>
            
            {showSpeedMenu && (
              <div className="absolute right-0 bottom-full mb-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden py-1 z-10 w-24">
                {speeds.map(speed => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackRate(speed);
                      setShowSpeedMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${playbackRate === speed ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      
      {pipWindow ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex flex-col items-center text-center gap-3 w-full shadow-inner animate-pulse">
          <AppWindow className="w-8 h-8 text-indigo-400" />
          <p className="text-sm font-medium text-indigo-800">
            Trình phát đang hiển thị ở <strong>Cửa sổ nổi (PiP)</strong>
          </p>
          <button 
            onClick={() => pipWindow.close()}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-indigo-600 font-bold text-sm rounded-lg border border-indigo-200 shadow-sm hover:bg-indigo-50 transition-colors"
          >
            <X size={16} /> Thu hồi
          </button>
        </div>
      ) : (
        playerUI
      )}

      {pipWindow && createPortal(playerUI, pipWindow.document.body)}
    </>
  );
}
