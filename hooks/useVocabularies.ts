import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Vocabulary, Topic } from "@/lib/types";
import { toast } from "sonner";

export function useVocabularies(selectedTopic: Topic | null, onTopicChanged?: () => void) {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [flashcardQueue, setFlashcardQueue] = useState<Vocabulary[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "flashcards">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingWord, setEditingWord] = useState<Vocabulary | null>(null);
  const [isEditWordModalOpen, setIsEditWordModalOpen] = useState(false);

  const fetchVocabularies = useCallback(async (topicId: string) => {
    try {
      const { data, error } = await supabase
        .from("vocabularies")
        .select("*")
        .eq("topic_id", topicId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setVocabularies(data || []);
    } catch (err) {
      console.error("Fetch vocab error:", err);
    }
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      fetchVocabularies(selectedTopic.id);
    } else {
      setVocabularies([]);
    }
  }, [selectedTopic, fetchVocabularies]);

  const handleDeleteWord = async (wordId: string, wordText: string) => {
    if (!confirm(`Xóa từ "${wordText}"?`)) return;
    try {
      const { error } = await supabase.from("vocabularies").delete().eq("id", wordId);
      if (error) throw error;
      toast.success("Đã xóa từ.");
      if (selectedTopic) {
         fetchVocabularies(selectedTopic.id);
      }
      if (onTopicChanged) onTopicChanged();
    } catch (err: any) {
      toast.error("Lỗi xóa: " + err.message);
    }
  };

  const handleEditWord = (word: Vocabulary) => {
    setEditingWord(word);
    setIsEditWordModalOpen(true);
  };

  const startFlashcards = () => {
    if (vocabularies.length === 0) return;
    const queue = [...vocabularies].sort(() => 0.5 - Math.random());
    setFlashcardQueue(queue);
    setViewMode("flashcards");
  };

  const handleFlashcardAnswer = async (wordId: string, known: boolean, onQueueEmpty?: () => void) => {
    if (known) {
      try {
        const word = vocabularies.find((v) => v.id === wordId);
        const currentInterval = word?.review_interval || 0;
        const nextInt = currentInterval === 0 ? 1 : Math.ceil(currentInterval * 2.5);
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + (nextInt > 365 ? 365 : nextInt));

        await supabase
          .from("vocabularies")
          .update({
            review_interval: nextInt > 365 ? 365 : nextInt,
            next_review_date: nextDate.toISOString(),
          })
          .eq("id", wordId);
      } catch (e) {
        console.error("Update mastery error", e);
      }
    }

    setFlashcardQueue((prev) => {
      const newQueue = prev.slice(1);
      if (newQueue.length === 0 && onQueueEmpty) {
         onQueueEmpty();
      }
      return newQueue;
    });
  };

  return {
    vocabularies,
    flashcardQueue,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    editingWord,
    setEditingWord,
    isEditWordModalOpen,
    setIsEditWordModalOpen,
    fetchVocabularies,
    handleDeleteWord,
    handleEditWord,
    startFlashcards,
    handleFlashcardAnswer,
  };
}
