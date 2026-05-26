import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Topic } from "@/lib/types";
import { toast } from "sonner";

export function useTopics(userCode: string | null) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isTopicLoading, setIsTopicLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fetchTopics = useCallback(async () => {
    if (!userCode) return;
    setIsTopicLoading(true);
    try {
      const { data, error } = await supabase
        .from("topics")
        .select("*, vocabularies(count)")
        .or(`user_code.eq.${userCode},user_code.is.null`);

      if (error) throw error;
      const formatted = (data || []).map(
        (t: Topic & { vocabularies?: { count: number }[] }) => ({
          ...t,
          vocab_count: t.vocabularies?.[0]?.count || 0,
        }),
      );
      setTopics(formatted);
    } finally {
      setIsTopicLoading(false);
    }
  }, [userCode]);

  useEffect(() => {
    if (userCode) {
      fetchTopics();
    } else {
      setTopics([]);
      setSelectedTopic(null);
    }
  }, [userCode, fetchTopics]);

  const handleDeleteTopic = async (topicId: string, topicName: string) => {
    if (!confirm(`Xóa chủ đề "${topicName}" và TẤT CẢ từ vựng bên trong?`)) return;

    try {
      const { error } = await supabase.from("topics").delete().eq("id", topicId);
      if (error) throw error;
      toast.success("Đã xóa chủ đề.");
      setSelectedTopic(null);
      fetchTopics();
    } catch (err: any) {
      toast.error("Lỗi xóa: " + err.message);
    }
  };

  const handleBulkDeleteTopics = async (topicIds: string[]) => {
    if (topicIds.length === 0) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa ${topicIds.length} chủ đề và TẤT CẢ từ vựng bên trong?`)) return;

    try {
      const { error } = await supabase.from("topics").delete().in("id", topicIds);
      if (error) throw error;
      toast.success(`Đã xóa ${topicIds.length} chủ đề.`);
      fetchTopics();
    } catch (err: any) {
      toast.error("Không thể xóa chủ đề: " + err.message);
    }
  };

  const handleExportExcel = async (topicsToExport: Topic[], filename: string, onComplete?: () => void) => {
    if (topicsToExport.length === 0) {
      toast.error("Không có chủ đề nào để xuất.");
      return;
    }

    setIsExporting(true);
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.utils.book_new();
      let totalWords = 0;

      for (const topic of topicsToExport) {
        const { data: vocabs, error } = await supabase
          .from("vocabularies")
          .select("word, ipa, meanings, notes")
          .eq("topic_id", topic.id);

        if (error) throw error;
        if (!vocabs || vocabs.length === 0) continue;

        const sheetData = vocabs.map((v) => {
          const meaningsStr = Array.isArray(v.meanings) ? v.meanings.join(", ") : v.meanings || "";
          return {
            "Từ vựng": v.word || "",
            "Phiên âm": v.ipa || "",
            "Nghĩa tiếng Việt": meaningsStr,
          };
        });

        const ws = XLSX.utils.json_to_sheet(sheetData);
        ws["!cols"] = [{ wch: 25 }, { wch: 20 }, { wch: 45 }];

        const safeName = topic.name.replace(/[:\\/?*\[\]]/g, "").slice(0, 31) || "Sheet";
        XLSX.utils.book_append_sheet(wb, ws, safeName);
        totalWords += sheetData.length;
      }

      if (totalWords === 0) {
        toast.error("Không có từ vựng nào trong các chủ đề đã chọn.");
        setIsExporting(false);
        return;
      }

      XLSX.writeFile(wb, `${filename}.xlsx`);
      toast.success(`Xuất thành công ${totalWords} từ vựng (${wb.SheetNames.length} sheet)!`);
      if (onComplete) onComplete();
    } catch (err: any) {
      toast.error("Lỗi xuất Excel: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    topics,
    setTopics,
    selectedTopic,
    setSelectedTopic,
    isTopicLoading,
    isExporting,
    fetchTopics,
    handleDeleteTopic,
    handleBulkDeleteTopics,
    handleExportExcel,
  };
}
