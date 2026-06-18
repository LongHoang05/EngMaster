"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, Pause, FastForward, Rewind, Settings, AppWindow, X, Minimize2, Headphones } from "lucide-react";

interface CustomAudioPlayerProps {
  audioUrl: string;
  seekToTime?: number | null;
  onTimeUpdate?: (time: number) => void;
  isMini?: boolean;
  onExpand?: () => void;
  title?: string;
}

export default function CustomAudioPlayer({ audioUrl, seekToTime, onTimeUpdate, isMini, onExpand, title }: CustomAudioPlayerProps) {
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

  const premiumMiniPlayerUI = (
    <div className={`w-full h-full flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/60 dark:border-slate-700/60 ${pipWindow ? '' : 'rounded-3xl overflow-hidden'}`}>
      <style>{`
        @keyframes audio-bounce {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
      <div className="flex flex-col flex-1 p-5">
        {/* Header / Info */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex gap-4 items-center min-w-0">
             {/* Thumbnail / Visualizer */}
             <div className="relative w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
               {isPlaying ? (
                 <div className="flex items-end justify-center gap-1 h-5">
                   <span className="w-1.5 bg-white rounded-full animate-[audio-bounce_0.8s_infinite_ease-in-out_0.1s]" style={{ height: '100%' }}></span>
                   <span className="w-1.5 bg-white rounded-full animate-[audio-bounce_0.8s_infinite_ease-in-out_0.3s]" style={{ height: '100%' }}></span>
                   <span className="w-1.5 bg-white rounded-full animate-[audio-bounce_0.8s_infinite_ease-in-out_0.2s]" style={{ height: '100%' }}></span>
                 </div>
               ) : (
                 <Headphones className="w-7 h-7 text-white" />
               )}
             </div>
             
             {/* Title & Time */}
             <div className="flex flex-col min-w-0">
               <p className="text-base font-extrabold text-slate-800 dark:text-white truncate">
                 {title || "Audio Track"}
               </p>
               <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1">
                 <span className="text-indigo-600 dark:text-indigo-400">{formatTime(currentTime)}</span> 
                 <span className="mx-1.5">/</span> 
                 {formatTime(duration)}
               </p>
             </div>
          </div>
          
          {/* Actions top-right */}
          <div className="flex items-center gap-1 shrink-0">
            {onExpand && !pipWindow && (
              <button
                onClick={onExpand}
                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                title="Mở rộng"
              >
                <AppWindow className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Playback Controls & Progress */}
        <div className="mt-auto space-y-5">
          {/* Scrubber */}
          <div className="relative w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full group">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full pointer-events-none"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
            {/* Custom thumb */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none"
              style={{ left: `calc(${(currentTime / (duration || 1)) * 100}% - 8px)` }}
            />
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            {/* Speed Control */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                {playbackRate}x
              </button>
              
              {showSpeedMenu && (
                <div className="absolute left-0 bottom-full mb-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-xl overflow-hidden py-1 z-10 w-16">
                  {speeds.map(speed => (
                    <button
                      key={speed}
                      onClick={() => {
                        setPlaybackRate(speed);
                        setShowSpeedMenu(false);
                      }}
                      className={`w-full text-center px-2 py-2 text-xs font-bold transition-colors ${playbackRate === speed ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => skipTime(-5)}
                className="text-slate-400 hover:text-indigo-500 transition-colors"
                title="Lùi 5 giây"
              >
                <Rewind className="w-5 h-5" fill="currentColor" />
              </button>
              <button
                onClick={togglePlay}
                className="w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full transition-transform active:scale-95 shadow-xl shadow-indigo-500/30"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
              <button
                onClick={() => skipTime(5)}
                className="text-slate-400 hover:text-indigo-500 transition-colors"
                title="Tới 5 giây"
              >
                <FastForward className="w-5 h-5" fill="currentColor" />
              </button>
            </div>
            
            {/* Empty div for flex alignment balance */}
            <div className="w-[42px]"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const activeUI = (isMini || pipWindow) ? premiumMiniPlayerUI : playerUI;



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
        <div className="flex flex-col gap-2 w-full">
          {!isMini && (
            <div className="flex justify-end">
              <button 
                onClick={togglePiP} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors shadow-sm"
              >
                <Minimize2 size={16} /> Thu nhỏ (Mini Player)
              </button>
            </div>
          )}
          {activeUI}
        </div>
      )}

      {pipWindow && createPortal(activeUI, pipWindow.document.body)}
    </>
  );
}
