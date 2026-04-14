"use client";

import React, { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";

interface ImportExcelButtonProps {
  userCode: string;
  onImportSuccess: () => void;
  categoryName?: string; // Tùy chọn: nạp vào category cụ thể nếu có
}

// Cấu hình linh hoạt: Map headers tiếng Việt/Anh sang các trường dữ liệu cố định
const COLUMN_MAPPING: Record<string, string[]> = {
  word: ["từ vựng", "word", "từ", "vocabulary"],
  ipa: ["phiên âm", "ipa", "phát âm", "pronunciation"],
  meanings: ["nghĩa tiếng việt", "nghĩa", "meanings", "meaning"],
  notes: ["ghi chú", "notes", "note"],
};

const findColumnKey = (header: string, type: string) => {
  const normHeader = header.toLowerCase().trim();
  return COLUMN_MAPPING[type].some((alias) => normHeader.includes(alias));
};

export default function ImportExcelButton({
  userCode,
  onImportSuccess,
  categoryName,
}: ImportExcelButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const toastId = toast.loading("Đang xử lý file Excel...");

    try {
      const dataBuffer = await file.arrayBuffer();
      const wb = XLSX.read(dataBuffer, { type: "array" });

      if (wb.SheetNames.length === 0) {
        throw new Error("File Excel không có màn tính (sheet) nào!");
      }

      let totalImported = 0;

      // Lặp qua từng Sheet (mỗi Sheet là 1 chủ đề/topic)
      for (const sheetName of wb.SheetNames) {
        const ws = wb.Sheets[sheetName];
        
        // Đọc dữ liệu thô dạng mảng 2 chiều để lấy ra chính xác header từ dòng đầu tiên
        const rawData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });
        if (rawData.length <= 1) continue; // Sheet rỗng hoặc chỉ có mỗi header

        const headers = rawData[0];
        if (!Array.isArray(headers)) continue;

        // Xác định vị trí các cột dựa trên mapping
        let wordIdx = -1, ipaIdx = -1, meaningsIdx = -1, notesIdx = -1;

        headers.forEach((h, idx) => {
          if (!h) return;
          const text = String(h);
          if (findColumnKey(text, "word")) wordIdx = idx;
          else if (findColumnKey(text, "ipa")) ipaIdx = idx;
          else if (findColumnKey(text, "meanings")) meaningsIdx = idx;
          else if (findColumnKey(text, "notes")) notesIdx = idx;
        });

        if (wordIdx === -1 || meaningsIdx === -1) {
          console.warn(`Bỏ qua sheet "${sheetName}": Không tìm thấy cột Từ vựng hoặc Nghĩa.`);
          continue;
        }

        // TÌM HOẶC TẠO CHỦ ĐỀ (TOPIC)
        // Tìm xem topic này đã có chưa (theo tên topic = tên sheet và user_code hiện tại)
        let topicId = null;
        const { data: existingTopic, error: fetchErr } = await supabase
          .from("topics")
          .select("id")
          .eq("name", sheetName)
          .eq("user_code", userCode)
          .maybeSingle();

        if (fetchErr && fetchErr.code !== "PGRST116") {
            throw fetchErr;
        }

        if (existingTopic) {
          topicId = existingTopic.id;
        } else {
          // Tạo mới
          const { data: newTopic, error: errInsertTop } = await supabase
            .from("topics")
            .insert({
              name: sheetName,
              user_code: userCode,
              category_name: categoryName || null,
            })
            .select("id")
            .single();

          if (errInsertTop) throw errInsertTop;
          topicId = newTopic?.id;
        }

        if (!topicId) continue;

        // IMPORT TỪ VỰNG DƯỚI DẠNG BULK
        const batchVocabs = [];
        for (let i = 1; i < rawData.length; i++) {
          const row = rawData[i];
          if (!row || !Array.isArray(row)) continue;

          const word = row[wordIdx] ? String(row[wordIdx]).trim() : "";
          if (!word) continue; // Bỏ ráp các hàng không có từ vựng

          const rawMeanings = row[meaningsIdx] ? String(row[meaningsIdx]) : "";
          let meaningsArr: string[] = [];
          if (rawMeanings) {
             meaningsArr = rawMeanings.split(/[,;\n]/).map(m => m.trim()).filter(Boolean);
          }

          if (meaningsArr.length === 0) {
              meaningsArr = [""];
          }

          batchVocabs.push({
            topic_id: topicId,
            word: word,
            ipa: ipaIdx !== -1 && row[ipaIdx] ? String(row[ipaIdx]).trim() : "",
            meanings: meaningsArr,
            notes: notesIdx !== -1 && row[notesIdx] ? String(row[notesIdx]).trim() : "",
          });
        }

        if (batchVocabs.length > 0) {
          const { error: insertVocabErr } = await supabase
            .from("vocabularies")
            .insert(batchVocabs);

          if (insertVocabErr) throw insertVocabErr;
          totalImported += batchVocabs.length;
        }
      }

      if (totalImported > 0) {
          toast.success(`Nhập thành công tổng cộng ${totalImported} từ vựng mới!`, { id: toastId });
          onImportSuccess();
      } else {
          toast.info("Không có dữ liệu hợp lệ nào được thêm vào.", { id: toastId });
      }
      
    } catch (err) {
      const error = err as Error;
      toast.error(`Lỗi nhập file Excel: ${error.message}`, { id: toastId });
      console.error(err);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".xlsx, .xls"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="inline-flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-green-200 disabled:opacity-50 whitespace-nowrap"
      >
        {isImporting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Upload size={16} />
        )}
        Nhập Excel
      </button>
    </>
  );
}
