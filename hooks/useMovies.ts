import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Series, Episode, MovieSubtitle } from "@/data/mockData"; // Import types

export function useMovies() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: dbSeries, error: seriesError } = await supabase
        .from("movie_series")
        .select("*")
        .order("created_at", { ascending: true });

      if (seriesError) throw seriesError;

      const { data: dbEpisodes, error: episodesError } = await supabase
        .from("movie_episodes")
        .select("*")
        .order("created_at", { ascending: true });

      if (episodesError) throw episodesError;

      // Map to frontend structure
      const formattedSeries: Series[] = (dbSeries || []).map((s: any) => {
        const episodesForSeries = (dbEpisodes || [])
          .filter((e: any) => e.series_id === s.id)
          .map((e: any) => ({
            id: e.id,
            title: e.title,
            youtubeId: e.youtube_id,
            subtitles: typeof e.subtitles === 'string' ? JSON.parse(e.subtitles) : e.subtitles,
          }));

        return {
          id: s.id,
          title: s.title,
          description: s.description,
          thumbnailUrl: s.thumbnail_url,
          avatarUrl: s.avatar_url,
          level: s.level,
          episodes: episodesForSeries,
        };
      });

      setSeriesList(formattedSeries);
    } catch (err: any) {
      toast.error("Lỗi tải dữ liệu phim: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Series CRUD
  const addSeries = async (seriesData: any) => {
    try {
      const { error } = await supabase.from("movie_series").insert([{
        title: seriesData.title,
        description: seriesData.description,
        thumbnail_url: seriesData.thumbnailUrl,
        avatar_url: seriesData.avatarUrl,
        level: seriesData.level
      }]);
      if (error) throw error;
      toast.success("Tạo bộ phim mới thành công!");
      fetchMovies();
    } catch (err: any) {
      toast.error("Lỗi tạo bộ phim: " + err.message);
    }
  };

  const updateSeries = async (id: string, seriesData: any) => {
    if (id.startsWith("s_")) {
      toast.error("Không thể sửa dữ liệu mẫu (Mock Data).");
      return;
    }
    try {
      const { error } = await supabase.from("movie_series").update({
        title: seriesData.title,
        description: seriesData.description,
        thumbnail_url: seriesData.thumbnailUrl,
        avatar_url: seriesData.avatarUrl,
        level: seriesData.level
      }).eq("id", id);
      if (error) throw error;
      toast.success("Cập nhật bộ phim thành công!");
      fetchMovies();
    } catch (err: any) {
      toast.error("Lỗi cập nhật bộ phim: " + err.message);
    }
  };

  const deleteSeries = async (id: string) => {
    if (id.startsWith("s_")) {
      toast.error("Không thể xóa dữ liệu mẫu (Mock Data).");
      return;
    }
    if (!confirm("Bạn có chắc chắn muốn xóa BỘ PHIM này và TẤT CẢ các tập phim bên trong?")) return;
    try {
      const { error } = await supabase.from("movie_series").delete().eq("id", id);
      if (error) throw error;
      toast.success("Đã xóa bộ phim.");
      fetchMovies();
    } catch (err: any) {
      toast.error("Lỗi xóa bộ phim: " + err.message);
    }
  };

  // Episode CRUD
  const addEpisode = async (seriesId: string, episodeData: any) => {
    if (seriesId.startsWith("s_")) {
      toast.error("Không thể thêm tập phim vào dữ liệu mẫu. Vui lòng tạo Bộ Phim mới trước!");
      return;
    }
    try {
      const { error } = await supabase.from("movie_episodes").insert([{
        series_id: seriesId,
        title: episodeData.title,
        youtube_id: episodeData.youtubeId,
        subtitles: episodeData.subtitles
      }]);
      if (error) throw error;
      toast.success("Thêm tập phim thành công!");
      fetchMovies();
    } catch (err: any) {
      toast.error("Lỗi thêm tập phim: " + err.message);
    }
  };

  const deleteEpisode = async (id: string) => {
    if (id.startsWith("ep_")) {
      toast.error("Không thể xóa dữ liệu mẫu (Mock Data).");
      return;
    }
    if (!confirm("Bạn có chắc chắn muốn xóa TẬP PHIM này?")) return;
    try {
      const { error } = await supabase.from("movie_episodes").delete().eq("id", id);
      if (error) throw error;
      toast.success("Đã xóa tập phim.");
      fetchMovies();
    } catch (err: any) {
      toast.error("Lỗi xóa tập phim: " + err.message);
    }
  };

  return {
    seriesList,
    isLoading,
    fetchMovies,
    addSeries,
    updateSeries,
    deleteSeries,
    addEpisode,
    deleteEpisode
  };
}
