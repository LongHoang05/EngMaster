import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactPlayer from "react-player";
import {
  Play,
  Pause,
  ChevronLeft,
  Volume2,
  Type,
  MoveHorizontal,
  Mic,
  Square,
  RotateCcw,
  FastForward,
  Rewind,
  VolumeX,
  X,
  Eye,
  RefreshCw,
  Layers,
  Keyboard,
  Check,
  Plus,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { MOCK_SERIES, MOCK_DICT, Series, Episode, MovieSubtitle } from '../data/mockData';
import { useMovies } from "@/hooks/useMovies";
import AdminSeriesModal from "./AdminSeriesModal";
import AdminEpisodeModal from "./AdminEpisodeModal";

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "for",
  "nor",
  "on",
  "at",
  "to",
  "from",
  "by",
  "with",
  "about",
  "into",
  "through",
  "is",
  "am",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "her",
  "us",
  "them",
  "my",
  "your",
  "his",
  "our",
  "their",
  "this",
  "that",
  "these",
  "those",
  "of",
  "in",
  "if",
]);

const formatDuration = (seconds: number) => {
  if (!seconds) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
};

interface MovieContainerProps {
  userCode: string;
  onUnsavedChange?: (isUnsaved: boolean) => void;
}

export default function MovieContainer({
  userCode,
  onUnsavedChange,
}: MovieContainerProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // Navigation State (3 Tiers)
  const [viewState, setViewState] = useState<"series" | "episodes" | "playing">(
    "series",
  );
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
  const [episodeSearchQuery, setEpisodeSearchQuery] = useState("");
  const [episodeSortBy, setEpisodeSortBy] = useState("default");

  // Admin Features & Data
  const isAdmin = userCode === "lhg";
  const { seriesList, isLoading: isMoviesLoading, addSeries, updateSeries, deleteSeries, addEpisode, deleteEpisode } = useMovies();
  const displaySeries = seriesList.length > 0 ? seriesList : MOCK_SERIES;

  const selectedSeries = useMemo(() => {
    return displaySeries.find((s) => s.id === selectedSeriesId) || null;
  }, [displaySeries, selectedSeriesId]);

  const selectedEpisode = useMemo(() => {
    return selectedSeries?.episodes.find((e) => e.id === selectedEpisodeId) || null;
  }, [selectedSeries, selectedEpisodeId]);

  const processedEpisodes = useMemo(() => {
    if (!selectedSeries) return [];
    
    let result = selectedSeries.episodes.map((episode, index) => ({ episode, originalIndex: index }));
    
    if (episodeSearchQuery) {
      result = result.filter(({ episode }) =>
        episode.title.toLowerCase().includes(episodeSearchQuery.toLowerCase())
      );
    }
    
    switch (episodeSortBy) {
      case "newest":
        result.sort((a, b) => b.originalIndex - a.originalIndex);
        break;
      case "duration_asc":
        result.sort((a, b) => {
          const durA = a.episode.subtitles[a.episode.subtitles.length - 1]?.endTime || 0;
          const durB = b.episode.subtitles[b.episode.subtitles.length - 1]?.endTime || 0;
          return durA - durB;
        });
        break;
      case "duration_desc":
        result.sort((a, b) => {
          const durA = a.episode.subtitles[a.episode.subtitles.length - 1]?.endTime || 0;
          const durB = b.episode.subtitles[b.episode.subtitles.length - 1]?.endTime || 0;
          return durB - durA;
        });
        break;
      case "subs_asc":
        result.sort((a, b) => a.episode.subtitles.length - b.episode.subtitles.length);
        break;
      case "subs_desc":
        result.sort((a, b) => b.episode.subtitles.length - a.episode.subtitles.length);
        break;
      case "default":
      default:
        result.sort((a, b) => a.originalIndex - b.originalIndex);
        break;
    }
    
    return result;
  }, [selectedSeries, episodeSearchQuery, episodeSortBy]);

  const [isAddSeriesModalOpen, setIsAddSeriesModalOpen] = useState(false);
  const [isEditSeriesModalOpen, setIsEditSeriesModalOpen] = useState(false);
  const [seriesToEdit, setSeriesToEdit] = useState<any>(null);
  const [isAddEpisodeModalOpen, setIsAddEpisodeModalOpen] = useState(false);

  // App Mode
  const [studyMode, setStudyMode] = useState<"watch" | "dictation">("watch");

  // Player states
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showVideoSubtitles, setShowVideoSubtitles] = useState<boolean>(true);
  const playerRef = useRef<any>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      if (!isFs) {
        try {
          if (window.screen && window.screen.orientation && (window.screen.orientation as any).unlock) {
            (window.screen.orientation as any).unlock();
          }
        } catch (e) {
          console.error("Unlock orientation error", e);
        }
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenContainerRef.current?.requestFullscreen().then(() => {
        try {
          if (window.screen && window.screen.orientation && (window.screen.orientation as any).lock) {
            (window.screen.orientation as any).lock("landscape").catch((err: any) => {
              console.log("Could not lock orientation (may not be supported or allowed):", err);
            });
          }
        } catch (e) {
          console.error("Lock orientation error", e);
        }
      }).catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Common Practice states
  const [activeSubId, setActiveSubId] = useState<number>(1);
  const [completedSubIds, setCompletedSubIds] = useState<string[]>([]);

  // Dictation states
  const [typedText, setTypedText] = useState<string>("");
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [checkResult, setCheckResult] = useState<{ isCorrect: boolean, diffHtml: string } | null>(null);
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);

  // Gamification states
  const [currentWpm, setCurrentWpm] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // Dictionary state
  const [selectedWordToDict, setSelectedWordToDict] = useState<string | null>(null);

  const activeSub = selectedEpisode?.subtitles.find(
    (s) => s.id === activeSubId,
  );



  // Auto-scroll transcript
  useEffect(() => {
    if (!transcriptRef.current || !selectedEpisode) return;
    const el = document.getElementById(`sub-item-${activeSubId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeSubId, selectedEpisode]);

  // Keyboard events for Dictation & Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewState !== "playing") return;

      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      // Fullscreen shortcut
      if (e.key.toLowerCase() === "f" && studyMode !== "dictation") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // Video playback shortcuts
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (
          playerRef.current &&
          typeof playerRef.current.seekTo === "function" &&
          typeof playerRef.current.getCurrentTime === "function"
        ) {
          playerRef.current.seekTo(
            Math.max(0, playerRef.current.getCurrentTime() - 5),
            "seconds",
          );
        }
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (
          playerRef.current &&
          typeof playerRef.current.seekTo === "function" &&
          typeof playerRef.current.getCurrentTime === "function"
        ) {
          playerRef.current.seekTo(
            playerRef.current.getCurrentTime() + 5,
            "seconds",
          );
        }
        return;
      }

      // Navigation shortcuts
      if (e.key === "Tab") {
        e.preventDefault();
        handleReplay();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
        return;
      }

    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    viewState,
    activeSubId,
    selectedEpisode,
    studyMode,
    isRevealed,
    activeSub,
  ]);

  // Reset typing when switching sentences
  useEffect(() => {
    setTypedText("");
    setIsRevealed(false);
  }, [activeSubId, studyMode]);

  const handleReplay = () => {
    if (playerRef.current && activeSub) {
      if (playerRef.current && typeof playerRef.current.seekTo === "function")
        playerRef.current.seekTo(Math.max(0, activeSub.startTime), "seconds");
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!selectedEpisode) return;
    const nextId = activeSubId + 1;
    if (selectedEpisode.subtitles.find((s) => s.id === nextId)) {
      setActiveSubId(nextId);
      const nextSub = selectedEpisode.subtitles.find((s) => s.id === nextId);
      if (playerRef.current && nextSub) {
        if (playerRef.current && typeof playerRef.current.seekTo === "function")
          playerRef.current.seekTo(Math.max(0, nextSub.startTime), "seconds");
        setIsPlaying(true);
      }
    }
  };

  const handlePrev = () => {
    if (!selectedEpisode) return;
    const prevId = activeSubId - 1;
    if (selectedEpisode.subtitles.find((s) => s.id === prevId)) {
      setActiveSubId(prevId);
      const prevSub = selectedEpisode.subtitles.find((s) => s.id === prevId);
      if (playerRef.current && prevSub) {
        if (playerRef.current && typeof playerRef.current.seekTo === "function")
          playerRef.current.seekTo(Math.max(0, prevSub.startTime), "seconds");
        setIsPlaying(true);
      }
    }
  };

  const handleProgress = (progress: any) => {
    setCurrentTime(progress.playedSeconds);
    if (!selectedEpisode || !isPlaying) return;

    if (studyMode === "watch") {
      const currentSub = selectedEpisode.subtitles.find(
        (sub) =>
          progress.playedSeconds >= sub.startTime &&
          progress.playedSeconds <= sub.endTime + 0.5,
      );
      if (currentSub && currentSub.id !== activeSubId) {
        setActiveSubId(currentSub.id);
      }
    } else {
      const PADDING = 0.5;
      if (activeSub && progress.playedSeconds >= activeSub.endTime + PADDING) {
        // Smart Audio Padding + Auto Replay Loop
        if (
          playerRef.current &&
          typeof playerRef.current.seekTo === "function"
        ) {
          playerRef.current.seekTo(Math.max(0, activeSub.startTime), "seconds");
        }
      }
    }
  };



  const [hasLoadedState, setHasLoadedState] = useState(false);

  // Persist State to LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("engmaster_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.viewState) setViewState(parsed.viewState);
        if (parsed.studyMode) setStudyMode(parsed.studyMode);
        if (parsed.activeSubId) setActiveSubId(parsed.activeSubId);
        if (parsed.completedSubIds && Array.isArray(parsed.completedSubIds)) {
          // Verify it's an array of strings (new format), else wipe to avoid crash/bugs
          if (parsed.completedSubIds.length > 0 && typeof parsed.completedSubIds[0] === 'string') {
            setCompletedSubIds(parsed.completedSubIds);
          } else {
            setCompletedSubIds([]);
          }
        }
        if (parsed.seriesId) {
          setSelectedSeriesId(parsed.seriesId);
        }
        if (parsed.episodeId) {
          setSelectedEpisodeId(parsed.episodeId);
        }
      } catch (e) {}
    }
    setHasLoadedState(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedState) return;
    const stateToSave = {
      viewState,
      studyMode,
      activeSubId,
      completedSubIds,
      seriesId: selectedSeries?.id,
      episodeId: selectedEpisode?.id,
    };
    localStorage.setItem("engmaster_state", JSON.stringify(stateToSave));
  }, [viewState, studyMode, activeSubId, completedSubIds, selectedSeries, selectedEpisode, hasLoadedState]);

  const completedRef = useRef(false);

  useEffect(() => {
    if (completedRef.current && selectedSeries && selectedEpisode) {
      const globalId = `${selectedSeries.id}_${selectedEpisode.id}_${activeSubId}`;
      if (!completedSubIds.includes(globalId)) {
        setCompletedSubIds((prev) => [...prev, globalId]);
      }
    }
  }, [typedText, activeSubId, completedSubIds, selectedSeries, selectedEpisode]);

  if (!isMounted) return null;

  if (isMoviesLoading || !hasLoadedState) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="h-10 bg-slate-200 rounded-xl w-64 mb-3 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded-lg w-80 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col relative">
              <div className="aspect-[21/9] bg-slate-200 animate-pulse relative overflow-hidden">
                <div className="absolute bottom-4 left-4 w-14 h-14 rounded-full bg-slate-300 border-2 border-white shadow-xl"></div>
                <div className="absolute bottom-4 right-4 w-20 h-6 rounded-full bg-slate-300"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-3 mt-2">
                <div className="w-12 h-5 bg-slate-200 rounded animate-pulse"></div>
                <div className="w-2/3 h-8 bg-slate-200 rounded-lg animate-pulse mt-1"></div>
                <div className="w-full h-4 bg-slate-200 rounded-md animate-pulse mt-2"></div>
                <div className="w-4/5 h-4 bg-slate-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (viewState !== "series" && !selectedSeries) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <X size={32} className="text-slate-400" />
        </div>
        <p className="text-slate-600 font-bold mb-6 text-lg">Không tìm thấy bộ phim này!</p>
        <button
          onClick={() => {
            setViewState("series");
            setSelectedSeriesId(null);
            setSelectedEpisodeId(null);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <ChevronLeft size={20} /> Về trang chủ
        </button>
      </div>
    );
  }

  if (viewState === "playing" && !selectedEpisode) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <X size={32} className="text-slate-400" />
        </div>
        <p className="text-slate-600 font-bold mb-6 text-lg">Không tìm thấy tập phim này!</p>
        <button
          onClick={() => {
            setViewState("episodes");
            setSelectedEpisodeId(null);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <ChevronLeft size={20} /> Về danh sách tập phim
        </button>
      </div>
    );
  }

  // ==========================================
  // VIEW: TIER 1 - SERIES LIST
  // ==========================================
  if (viewState === "series") {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
              Thư viện Bộ Phim (Playlist)
            </h2>
            <p className="text-slate-500 font-medium">
              Chọn một bộ phim để xem danh sách các tập phim bên trong.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setIsAddSeriesModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95"
            >
              <Plus size={20} /> Thêm Bộ Phim
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displaySeries.map((series) => (
              <div
                key={series.id}
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.3)] transition-all duration-300 group flex flex-col relative"
              >
                {isAdmin && !series.id.startsWith("s_") && (
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSeriesToEdit(series); setIsEditSeriesModalOpen(true); }}
                      className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:bg-white shadow-lg transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteSeries(series.id); }}
                      className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-white shadow-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
                <div 
                  onClick={() => { setSelectedSeriesId(series.id); setViewState("episodes"); }}
                  className="aspect-[21/9] bg-slate-200 relative overflow-hidden shrink-0 cursor-pointer"
                >
                <img
                  src={series.thumbnailUrl}
                  alt={series.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="rounded-full overflow-hidden border-2 border-white shadow-xl shrink-0 w-14 h-14 bg-white group-hover:scale-110 transition-transform">
                    <img
                      src={series.avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-black text-white bg-indigo-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase tracking-widest border border-indigo-400 flex items-center gap-1.5">
                    <Layers size={14} /> {series.episodes.length} Tập
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="inline-block text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-widest w-max mb-3 border border-emerald-200">
                  {series.level}
                </span>
                <h3 className="text-2xl font-black text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {series.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                  {series.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {isAddSeriesModalOpen && (
          <AdminSeriesModal 
            isOpen={isAddSeriesModalOpen} 
            onClose={() => setIsAddSeriesModalOpen(false)} 
            onSubmit={addSeries} 
          />
        )}
        {isEditSeriesModalOpen && seriesToEdit && (
          <AdminSeriesModal 
            isOpen={isEditSeriesModalOpen} 
            onClose={() => { setIsEditSeriesModalOpen(false); setSeriesToEdit(null); }} 
            onSubmit={(data) => updateSeries(seriesToEdit.id, data)} 
            initialData={seriesToEdit}
          />
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: TIER 2 - EPISODES LIST
  // ==========================================
  if (viewState === "episodes" && selectedSeries) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
        <button
          onClick={() => {
            setViewState("series");
            setSelectedSeriesId(null);
          }}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-6 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 w-max hover:shadow-md"
        >
          <ChevronLeft size={20} />
          Quay lại danh sách bộ phim
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 shadow-md shrink-0 overflow-hidden">
              <img
                src={selectedSeries.avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800">
                {selectedSeries.title}
              </h2>
              <p className="text-slate-500 font-medium">
                {selectedSeries.episodes.length} tập phim khả dụng
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <select
              value={episodeSortBy}
              onChange={(e) => setEpisodeSortBy(e.target.value)}
              className="block w-full sm:w-56 px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-all font-medium appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.25em 1.25em",
                paddingRight: "2.5rem"
              }}
            >
              <option value="default">Mặc định (Cũ nhất)</option>
              <option value="newest">Mới nhất</option>
              <option value="duration_asc">Thời lượng: Ngắn ➔ Dài</option>
              <option value="duration_desc">Thời lượng: Dài ➔ Ngắn</option>
              <option value="subs_asc">Câu thoại: Ít ➔ Nhiều</option>
              <option value="subs_desc">Câu thoại: Nhiều ➔ Ít</option>
            </select>
            
            {isAdmin && !selectedSeries.id.startsWith("s_") && (
              <button
                onClick={() => setIsAddEpisodeModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95 shrink-0 w-full sm:w-auto"
              >
                <Plus size={20} /> Thêm Tập Phim
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {processedEpisodes.map(({ episode, originalIndex }) => (
            <div
              key={episode.id}
              onClick={() => {
                setSelectedEpisodeId(episode.id);
                setActiveSubId(episode.subtitles[0]?.id || 1);
                setStudyMode("watch");
                setViewState("playing");
              }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all cursor-pointer group flex flex-col relative"
            >
              {isAdmin && !episode.id.toString().startsWith("ep_") && (
                <button
                  onClick={(e) => { e.stopPropagation(); deleteEpisode(episode.id); }}
                  className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-rose-400 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <div 
                className="aspect-video bg-slate-200 relative overflow-hidden"
              >
                <img
                  src={`https://i.ytimg.com/vi/${episode.youtubeId}/mqdefault.jpg`}
                  alt={episode.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to maxresdefault if mqdefault fails
                    e.currentTarget.src = `https://i.ytimg.com/vi/${episode.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/50 shadow-xl scale-75 group-hover:scale-100 transition-transform">
                    <Play size={24} className="ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                  Tập {originalIndex + 1}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded shadow-sm tracking-wide">
                  {formatDuration(episode.subtitles[episode.subtitles.length - 1]?.endTime || 0)}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                  {episode.title}
                </h3>
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <Layers size={14} /> {episode.subtitles.length} câu thoại
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {isAddEpisodeModalOpen && selectedSeries && (
          <AdminEpisodeModal 
            isOpen={isAddEpisodeModalOpen} 
            onClose={() => setIsAddEpisodeModalOpen(false)} 
            onSubmit={(data) => addEpisode(selectedSeries.id, data)} 
          />
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: TIER 3 - PLAYER / WORKSPACE
  // ==========================================

  // Dictation Check Logic
  const handleCheckAnswer = () => {
    if (!activeSub || !typedText.trim()) return;
    
    const cleanOriginal = activeSub.en_text.replace(/[^\w\s']/g, "").toLowerCase().trim();
    const cleanInput = typedText.replace(/[^\w\s']/g, "").toLowerCase().trim();
    
    const origWords = cleanOriginal.split(/\s+/).filter(Boolean);
    const inputWords = cleanInput.split(/\s+/).filter(Boolean);
    
    let html = "";
    let correctWords = 0;
    
    const origDisplayWords = activeSub.en_text.trim().split(/\s+/);
    const inputDisplayWords = typedText.trim().split(/\s+/);
    
    for (let i = 0; i < origWords.length; i++) {
      if (inputWords[i] === origWords[i]) {
        html += `<span class="text-emerald-600 font-bold">${origDisplayWords[i]}</span> `;
        correctWords++;
      } else if (inputWords[i]) {
        html += `<span class="text-rose-500 font-bold line-through opacity-80">${inputDisplayWords[i] || inputWords[i]}</span> <span class="text-emerald-600 font-bold">${origDisplayWords[i]}</span> `;
      } else {
        html += `<span class="text-slate-400 font-medium underline decoration-dashed underline-offset-4 opacity-80">${origDisplayWords[i]}</span> `;
      }
    }
    
    const isCorrect = correctWords === origWords.length && inputWords.length === origWords.length;
    
    if (typingStartTime && isCorrect) {
      const minutes = (Date.now() - typingStartTime) / 60000;
      setCurrentWpm(Math.round((origWords.length) / Math.max(minutes, 0.01)));
    }
    
    setCheckResult({ isCorrect, diffHtml: html.trim() });
    setIsRevealed(true);
    
    if (isCorrect) {
      completedRef.current = true;
    }
  };

  const handleDictationKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isRevealed) {
        handleNext();
      } else {
        handleCheckAnswer();
      }
    }
  };

  const isCurrentCompleted = isRevealed && checkResult?.isCorrect;

  const renderSubtitles = () => {
    return selectedEpisode?.subtitles.map((sub) => {
      const isActive = activeSubId === sub.id;
      const globalId = `${selectedSeries?.id}_${selectedEpisode?.id}_${sub.id}`;
      const isDone = completedSubIds.includes(globalId);
      // Blind mode logic: hide English text in the list if dictation is active, UNLESS it's already completed
      const hideEnglish = studyMode === "dictation" && !isDone;

      return (
        <div
          key={sub.id}
          id={`sub-item-${sub.id}`}
          onClick={() => {
            setActiveSubId(sub.id);
            if (playerRef.current)
              if (
                playerRef.current &&
                typeof playerRef.current.seekTo === "function"
              )
                playerRef.current.seekTo(Math.max(0, sub.startTime), "seconds");
            setIsPlaying(true);
          }}
          className={`p-3 rounded-2xl cursor-pointer transition-all border ${isActive ? "bg-indigo-50 border-indigo-200 shadow-sm" : isDone ? "bg-emerald-50/50 border-emerald-100/50" : "bg-transparent border-transparent hover:bg-slate-50"}`}
        >
          {(isActive || isDone) && (
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest flex items-center gap-1 ${isDone ? "bg-emerald-500/20 text-emerald-600" : "bg-indigo-500/20 text-indigo-600"}`}
              >
                {isDone ? <Check size={12} strokeWidth={3} /> : null}
                #{sub.id} {isDone ? "ĐÃ HOÀN THÀNH" : "ĐANG HỌC"}
              </span>
            </div>
          )}

          {hideEnglish ? (
            <div className="h-4 bg-slate-800 rounded w-2/3 mb-2 animate-pulse"></div>
          ) : (
            <p
              className={`font-medium leading-relaxed ${isActive ? "text-slate-800 text-[15px] font-bold" : "text-slate-500 text-sm"}`}
            >
              {sub.en_text}
            </p>
          )}
          <p
            className={`text-[13px] mt-1 ${isActive ? "text-slate-500" : "text-slate-400"}`}
          >
            {sub.vi_text}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col font-sans overflow-hidden">
      {/* HEADER */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setViewState("episodes");
              setSelectedEpisodeId(null);
            }}
            className="text-slate-500 hover:text-indigo-600 transition-colors bg-slate-100 p-2 rounded-xl flex items-center gap-1 group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>
          <div className="hidden sm:flex items-center gap-3">
            <img
              src={selectedSeries?.avatarUrl}
              className="w-8 h-8 rounded-full border border-slate-300 bg-white"
              alt="Avatar"
            />
            <span className="text-slate-800 text-sm font-bold truncate max-w-[200px] md:max-w-[400px]">
              {selectedSeries?.title} -{" "}
              <span className="text-indigo-400">{selectedEpisode?.title}</span>
            </span>
          </div>
        </div>
      </div>

      {/* SPLIT LAYOUT */}
      <div
        className={`flex-1 flex overflow-hidden bg-slate-50 ${studyMode === "watch" ? "flex-col overflow-y-auto custom-scrollbar p-0 sm:p-4 md:p-8" : "flex-col lg:flex-row"}`}
      >
        {/* LEFT PANE / WATCH MODE WRAPPER */}
        <div
          className={`${studyMode === "watch" ? "w-full max-w-5xl mx-auto flex flex-col gap-4 sm:gap-8 bg-white sm:bg-transparent" : "w-full lg:w-[400px] xl:w-[480px] flex flex-col bg-white border-r border-slate-200 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 lg:h-full"}`}
        >
          {/* Video Section */}
          <div
            className={`${studyMode === "watch" ? "w-full" : "w-full p-4 pb-0"}`}
          >
            <div
              ref={fullscreenContainerRef}
              className={`relative bg-black overflow-hidden ${isFullscreen ? "fixed inset-0 z-[9999] w-screen h-screen rounded-none" : "pt-[56.25%] sm:rounded-xl shadow-sm sm:ring-1 ring-slate-200"}`}
            >
              {isMounted && (
                <ReactPlayer
                  ref={playerRef}
                  url={`https://www.youtube.com/watch?v=${selectedEpisode?.youtubeId}`}
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  controls={true}
                  playing={isPlaying}
                  playbackRate={playbackRate}
                  onProgress={handleProgress}
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        fs: 0,
                        disablekb: 1,
                        origin:
                          typeof window !== "undefined"
                            ? window.location.origin
                            : "http://localhost:3000",
                      } as any,
                    },
                  }}
                />
              )}

              {/* SUBTITLE OVERLAY */}
              {studyMode === "watch" && activeSub && (
                <div
                  className={`absolute left-0 right-0 z-10 pointer-events-none flex flex-col items-center justify-end px-2 md:px-4 ${isFullscreen ? "bottom-16" : "bottom-2 md:bottom-8"}`}
                >
                  <div
                    className={`bg-black/70 backdrop-blur-sm px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-center mx-auto shadow-2xl transition-all duration-300 pointer-events-auto ${isFullscreen ? "max-w-4xl px-10 py-6" : "max-w-xs sm:max-w-md md:max-w-2xl w-full"}`}
                  >
                    <AnimatedSubtitle 
                      text={activeSub.en_text} 
                      startTime={activeSub.startTime} 
                      endTime={activeSub.endTime} 
                      playerRef={playerRef} 
                      isFullscreen={isFullscreen}
                      onWordClick={(word: string) => {
                        setIsPlaying(false);
                        setSelectedWordToDict(word);
                      }}
                    />
                    <p className={`text-amber-400 mt-0.5 md:mt-1 font-semibold drop-shadow-md opacity-90 ${isFullscreen ? "text-xl md:text-2xl" : "text-[11px] sm:text-xs md:text-sm lg:text-base"}`}>
                      {activeSub.vi_text}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {studyMode === "watch" && (
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center pb-8 px-4 gap-3 sm:gap-4">
                <button
                  onClick={toggleFullscreen}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl shadow-sm transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <span className="md:hidden">Phóng to (Xoay ngang màn hình)</span>
                  <span className="hidden md:inline">Phóng to toàn màn hình (F)</span>
                </button>
                <button
                  onClick={() => setStudyMode("dictation")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 sm:py-4 px-8 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_40px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-1 flex items-center gap-3 text-base sm:text-lg w-full sm:w-auto justify-center"
                >
                  <Keyboard size={24} className="sm:w-7 sm:h-7" />
                  Bắt đầu Luyện tập Gõ
                </button>
              </div>
            )}
          </div>

          {studyMode === "dictation" && (
            <>
              <div className="p-3 sm:p-4 border-b border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-sm hidden sm:block">
                  Danh sách câu
                </h3>
                <button
                  onClick={() => setStudyMode("watch")}
                  className="text-sm text-indigo-600 font-bold hover:underline bg-indigo-50 px-3 py-2 rounded-md transition-colors hover:bg-indigo-100 flex items-center gap-1 w-full sm:w-auto justify-center"
                >
                  <ChevronLeft size={16} /> Quay lại chế độ Xem Video
                </button>
              </div>
              <div
                ref={transcriptRef}
                className="hidden lg:block flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar"
              >
                {renderSubtitles()}
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANE: Dictation Workspace (ONLY IN DICTATION MODE) */}
        {studyMode === "dictation" && (
          <div className="flex-1 flex flex-col relative h-full overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50/30">
            {activeSub ? (
              <div className="flex-1 flex flex-col w-full h-full relative px-2 sm:px-6 md:px-12 pb-4 md:pb-32 overflow-y-auto custom-scrollbar">
                {/* ACTIVE AREA */}
                <div className="w-full pt-2 sm:pt-4 md:pt-12 pb-4 md:pb-8 flex flex-col items-center">
                  {/* DICTATION MODE: MonkeyType Engine */}
                  <div className="animate-fade-in w-full max-w-4xl">
                    {/* Gamification Stats */}
                    {isCurrentCompleted && (
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 shadow-sm border border-emerald-100 mb-6 md:mb-8 animate-fade-in flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                          <p className="text-emerald-800 font-black text-lg md:text-xl mb-1">
                            🎉 Tuyệt vời! Bạn đã nghe chính xác.
                          </p>
                          <p className="text-emerald-600 font-medium text-xs md:text-sm">
                            Hệ thống đã tự động bỏ qua dấu câu và in hoa.
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto">
                          <div className="flex gap-2 w-full sm:w-auto justify-center">
                            {currentWpm > 0 && (
                              <div className="bg-white p-2 sm:p-3 rounded-xl shadow-sm text-center flex-1 sm:flex-none min-w-[70px] sm:min-w-[80px]">
                                <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase mb-0.5 sm:mb-1">Tốc độ</p>
                                <p className="text-lg sm:text-2xl font-black text-emerald-600">{currentWpm} <span className="text-[10px]">WPM</span></p>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={handleNext}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
                          >
                            Sang câu tiếp <FastForward size={18} />
                          </button>
                        </div>
                      </div>
                    )}


                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                        <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                          Luyện Gõ Chép Chính Tả
                        </p>
                      </div>
                    </div>

                    {/* Dictation Box */}
                    <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-6 md:mb-8 w-full transition-all focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">
                      {!isRevealed ? (
                        <div className="relative">
                          <textarea
                            autoFocus
                            value={typedText}
                            onChange={(e) => {
                              setTypedText(e.target.value);
                              if (!typingStartTime) setTypingStartTime(Date.now());
                            }}
                            onKeyDown={handleDictationKeyDown}
                            placeholder="Nghe và gõ lại câu thoại vào đây..."
                            className="w-full text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-slate-800 bg-transparent border-none outline-none resize-none placeholder-slate-300 custom-scrollbar"
                            rows={3}
                          />
                          <div className="absolute bottom-2 right-2 text-xs font-bold text-slate-400">
                            Nhấn Enter để nộp
                          </div>
                        </div>
                      ) : (
                        <div className="w-full text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed min-h-[100px]">
                          <p dangerouslySetInnerHTML={{ __html: checkResult?.diffHtml || "" }} />
                        </div>
                      )}
                    </div>

                    {/* Hint Box */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                      <div className="bg-amber-100 text-amber-600 p-3 rounded-xl shrink-0">
                        <RefreshCw size={20} className="opacity-80" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                          Gợi ý nghĩa Tiếng Việt
                        </p>
                        <p className="text-slate-700 font-medium text-lg">
                          {activeSub.vi_text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTION TOOLS */}
                <div className="flex flex-col gap-4 items-center w-full px-2 md:px-4 pb-8 md:pb-12 mt-4 md:mt-8">
                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {!isRevealed ? (
                      <button
                        onClick={handleCheckAnswer}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:scale-105 transition-all text-sm md:text-base"
                      >
                        <Check size={18} /> Kiểm tra đáp án
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:bg-emerald-700 hover:scale-105 transition-all text-sm md:text-base"
                      >
                        Tiếp tục <FastForward size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => setIsRevealed(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-600 font-bold shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all text-sm"
                    >
                      <Eye size={16} /> Bỏ qua & Xem đáp án
                    </button>
                    <button
                      onClick={() => {
                        setTypedText("");
                        setIsRevealed(false);
                        handleReplay();
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-600 font-bold shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 transition-all text-sm"
                    >
                      <RefreshCw size={16} /> Làm lại câu này
                    </button>
                  </div>
                </div>


              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 font-bold">
                Chọn một câu để bắt đầu
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dictionary Modal */}
      {selectedWordToDict && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedWordToDict(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
              <h3 className="text-2xl font-black text-indigo-900">
                {selectedWordToDict}
              </h3>
              <button
                onClick={() => setSelectedWordToDict(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center italic">
                API Từ điển thực tế sẽ được tích hợp vào đây sau.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedWordToDict(null)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const AnimatedSubtitle = ({ text, startTime, endTime, playerRef, isFullscreen, onWordClick }: any) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);
  
  // Calculate relative timings based on character lengths
  const wordTimings = useMemo(() => {
    const totalChars = words.join('').length;
    const duration = endTime - startTime;
    let accumulatedTime = startTime;
    
    return words.map((word: string) => {
      const charRatio = word.length / totalChars;
      const wordDuration = duration * charRatio;
      const wordStart = accumulatedTime;
      const wordEnd = accumulatedTime + wordDuration;
      accumulatedTime = wordEnd;
      return { word, start: wordStart, end: wordEnd };
    });
  }, [text, startTime, endTime]);

  useEffect(() => {
    let animationFrameId: number;
    
    const updateHighlight = () => {
      if (!playerRef.current || !containerRef.current) return;
      
      let currentTime = 0;
      if (typeof playerRef.current.getCurrentTime === 'function') {
        currentTime = playerRef.current.getCurrentTime();
      }
      
      const spans = containerRef.current.querySelectorAll('span');
      spans.forEach((span, index) => {
        const timing = wordTimings[index];
        if (!timing) return;
        
        if (currentTime >= timing.start && currentTime <= timing.end) {
          span.className = "inline-block text-amber-400 scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] transition-all duration-75 mx-1 cursor-pointer font-black";
        } else if (currentTime > timing.end) {
          span.className = "inline-block text-amber-200 scale-100 transition-all duration-200 mx-1 cursor-pointer opacity-90 font-bold";
        } else {
          span.className = "inline-block text-white scale-100 transition-all duration-200 mx-1 cursor-pointer opacity-70 font-bold hover:text-white/100 hover:scale-105";
        }
      });
      
      animationFrameId = requestAnimationFrame(updateHighlight);
    };
    
    animationFrameId = requestAnimationFrame(updateHighlight);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [wordTimings, playerRef]);

  return (
    <p
      ref={containerRef}
      className={`leading-snug drop-shadow-md flex flex-wrap justify-center items-center pointer-events-auto ${isFullscreen ? "text-3xl md:text-4xl" : "text-[13px] sm:text-base md:text-xl lg:text-2xl"}`}
    >
      {words.map((word: string, i: number) => (
        <span 
          key={i} 
          onClick={(e) => {
            e.stopPropagation();
            if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
              playerRef.current.seekTo(wordTimings[i].start, 'seconds');
            }
            if (onWordClick) {
              const cleanWord = word.replace(/[^a-zA-Z0-9'-]/g, '').toLowerCase();
              if (cleanWord) onWordClick(cleanWord);
            }
          }}
          title="Bấm để nghe lại hoặc tra từ điển"
          className="inline-block text-white mx-1 transition-all duration-200 cursor-pointer font-bold opacity-70"
        >
          {word}
        </span>
      ))}
    </p>
  );
};
