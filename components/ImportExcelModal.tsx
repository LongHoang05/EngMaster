"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  FileSpreadsheet,
  Check,
  Loader2,
  ArrowRight,
  Database,
  UploadCloud,
  CheckSquare,
  Square,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";

interface ImportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCode: string;
  categoryName?: string;
  file: File | null;
  onSuccess: () => void;
}

type Step = "parsing" | "select_sheets" | "mapping" | "importing" | "result";

interface SheetInfo {
  name: string;
  rowCount: number;
  selected: boolean;
  headers: string[];
  rawData: string[][];
}

interface ColumnMapping {
  word: string;
  ipa: string;
  meanings: string;
  notes: string;
}

import { createPortal } from "react-dom";

export default function ImportExcelModal({
  isOpen,
  onClose,
  userCode,
  categoryName,
  file,
  onSuccess,
}: ImportExcelModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [step, setStep] = useState<Step>("parsing");
  const [sheets, setSheets] = useState<SheetInfo[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({
    word: "",
    ipa: "",
    meanings: "",
    notes: "",
  });
  
  // Progress state
  const [progress, setProgress] = useState({ current: 0, total: 0, currentSheet: "" });
  
  // Results
  const [results, setResults] = useState({ success: 0, errors: 0 });
  const [categoryNameInput, setCategoryNameInput] = useState(categoryName || "");
  const [topicNameInput, setTopicNameInput] = useState("");

  useEffect(() => {
    if (isOpen && file) {
      handleParseFile(file);
    } else {
      // Reset state when closed
      setStep("parsing");
      setSheets([]);
      setMapping({ word: "", ipa: "", meanings: "", notes: "" });
      setProgress({ current: 0, total: 0, currentSheet: "" });
      setResults({ success: 0, errors: 0 });
    }
  }, [isOpen, file]);

  const handleParseFile = async (selectedFile: File) => {
    setStep("parsing");
    try {
      const dataBuffer = await selectedFile.arrayBuffer();
      const wb = XLSX.read(dataBuffer, { type: "array" });

      if (wb.SheetNames.length === 0) {
        throw new Error("File Excel không có trang tính (sheet) nào!");
      }

      const parsedSheets: SheetInfo[] = [];

      for (const sheetName of wb.SheetNames) {
        const ws = wb.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
        
        let headerRowIdx = 0;
        for (let i = 0; i < rawData.length; i++) {
          const row = rawData[i];
          if (Array.isArray(row) && row.filter(cell => cell && String(cell).trim() !== "").length >= 2) {
            headerRowIdx = i;
            break;
          }
        }

        if (rawData.length > headerRowIdx + 1) {
          const headers = (rawData[headerRowIdx] || []).map(c => c ? String(c).trim() : "");
          const actualData = rawData.slice(headerRowIdx);
          
          parsedSheets.push({
            name: sheetName,
            rowCount: actualData.length - 1,
            selected: true,
            headers,
            rawData: actualData,
          });
        }
      }

      if (parsedSheets.length === 0) {
        throw new Error("Không tìm thấy dữ liệu hợp lệ trong file Excel.");
      }

      setSheets(parsedSheets);
      setStep("select_sheets");
    } catch (err: any) {
      toast.error(err.message || "Lỗi đọc file Excel");
      onClose();
    }
  };

  const toggleSheet = (index: number) => {
    const newSheets = [...sheets];
    newSheets[index].selected = !newSheets[index].selected;
    setSheets(newSheets);
  };

  const handleToggleAll = () => {
    const allSelected = sheets.every(s => s.selected);
    const newSheets = sheets.map(s => ({ ...s, selected: !allSelected }));
    setSheets(newSheets);
  };

  const handleContinueToMapping = () => {
    const selected = sheets.filter((s) => s.selected);
    if (selected.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 Sheet để nhập dữ liệu!");
      return;
    }

    // Auto-guess mapping based on the first selected sheet's headers
    const guessColumn = (keywords: string[]) => {
      const header = selected[0].headers.find(h => 
        h && keywords.some(k => h.toLowerCase().trim().includes(k))
      );
      return header || "";
    };

    setMapping({
      word: guessColumn(["từ vựng", "word", "từ", "vocabulary"]),
      ipa: guessColumn(["phiên âm", "ipa", "phát âm", "pronunciation"]),
      meanings: guessColumn(["nghĩa", "meanings", "meaning", "translation"]),
      notes: guessColumn(["ghi chú", "notes", "note"]),
    });

    setStep("mapping");
  };

  const startImport = async () => {
    if (!mapping.word || !mapping.meanings) {
      toast.error("Vui lòng chọn cột cho Từ vựng và Nghĩa!");
      return;
    }

    setStep("importing");
    const selectedSheets = sheets.filter((s) => s.selected);
    
    let totalToImport = 0;
    selectedSheets.forEach(s => totalToImport += s.rowCount);
    setProgress({ current: 0, total: totalToImport, currentSheet: "" });

    let successCount = 0;
    let errorCount = 0;

    try {
      for (const sheet of selectedSheets) {
        setProgress(p => ({ ...p, currentSheet: sheet.name }));
        
        // Find indices of mapped columns in this specific sheet
        const getIdx = (colName: string, keywords: string[]) => {
          if (!colName) return -1;
          const target = colName.toLowerCase().trim();
          let idx = sheet.headers.findIndex(h => h && h.toLowerCase().trim() === target);
          
          // Fallback: If the exact mapped column name is not found in this sheet, try guessing
          if (idx === -1) {
             idx = sheet.headers.findIndex(h => h && keywords.some(k => h.toLowerCase().trim().includes(k)));
          }
          return idx;
        };

        const wordIdx = getIdx(mapping.word, ["từ vựng", "word", "từ", "vocabulary"]);
        const ipaIdx = getIdx(mapping.ipa, ["phiên âm", "ipa", "phát âm", "pronunciation"]);
        const meaningsIdx = getIdx(mapping.meanings, ["nghĩa", "meanings", "meaning", "translation"]);
        const notesIdx = getIdx(mapping.notes, ["ghi chú", "notes", "note"]);

        if (wordIdx === -1 || meaningsIdx === -1) {
          toast.warning(`Bỏ qua Sheet "${sheet.name}" vì không tìm thấy cột ánh xạ.`);
          errorCount += sheet.rowCount;
          setProgress(p => ({ ...p, current: p.current + sheet.rowCount }));
          continue;
        }

        // TÌM HOẶC TẠO CHỦ ĐỀ
        let topicId = null;
        const targetTopicName = topicNameInput.trim() || sheet.name.trim();
        const targetCategoryName = categoryNameInput.trim() || null;

        let query = supabase
          .from("topics")
          .select("id")
          .eq("name", targetTopicName)
          .eq("user_code", userCode);
          
        if (targetCategoryName) {
          query = query.eq("category_name", targetCategoryName);
        } else {
          query = query.is("category_name", null);
        }

        const { data: existingTopic, error: fetchErr } = await query.maybeSingle();

        if (fetchErr) throw fetchErr;

        if (existingTopic) {
          topicId = existingTopic.id;
        } else {
          const { data: newTopic, error: errInsertTop } = await supabase
            .from("topics")
            .insert({
              name: targetTopicName,
              user_code: userCode,
              category_name: categoryNameInput.trim() || null,
            })
            .select("id")
            .single();

          if (errInsertTop) throw errInsertTop;
          topicId = newTopic?.id;
        }

        if (!topicId) continue;

        // CHUNKING: Import 500 rows at a time
        const CHUNK_SIZE = 500;
        const validRows = [];

        for (let i = 1; i < sheet.rawData.length; i++) {
          const row = sheet.rawData[i];
          if (!row || !Array.isArray(row)) continue;

          const word = row[wordIdx] ? String(row[wordIdx]).trim() : "";
          if (!word) continue;

          const rawMeanings = row[meaningsIdx] ? String(row[meaningsIdx]) : "";
          
          // Bỏ qua nếu đây chính là dòng tiêu đề bị lọt vào (do nhận diện sai dòng bắt đầu)
          if (
            mapping.word && mapping.meanings &&
            word.toLowerCase() === mapping.word.toLowerCase() &&
            rawMeanings.trim().toLowerCase() === mapping.meanings.toLowerCase()
          ) {
            continue;
          }

          // Lọc cực mạnh: Vì đây là app học tiếng Anh, nên cột Từ vựng (tiếng Anh) 
          // KHÔNG THỂ chứa các ký tự có dấu của tiếng Việt (ví dụ các tiêu đề phụ)
          const hasVietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(word);
          if (hasVietnameseChars) {
            continue;
          }

          let meaningsArr: string[] = [];
          if (rawMeanings) {
             meaningsArr = rawMeanings.split(/[,;\n]/).map(m => m.trim()).filter(Boolean);
          }
          if (meaningsArr.length === 0) continue;

          validRows.push({
            topic_id: topicId,
            word: word,
            ipa: ipaIdx !== -1 && row[ipaIdx] ? String(row[ipaIdx]).trim() : "",
            meanings: meaningsArr,
            notes: notesIdx !== -1 && row[notesIdx] ? String(row[notesIdx]).trim() : "",
          });
        }

        // Insert in chunks
        for (let i = 0; i < validRows.length; i += CHUNK_SIZE) {
          const chunk = validRows.slice(i, i + CHUNK_SIZE);
          const { error: insertErr } = await supabase
            .from("vocabularies")
            .insert(chunk);

          if (insertErr) {
            console.error("Lỗi insert chunk:", insertErr);
            errorCount += chunk.length;
          } else {
            successCount += chunk.length;
          }
          setProgress(p => ({ ...p, current: p.current + chunk.length }));
        }
      }

      setResults({ success: successCount, errors: errorCount });
      setStep("result");
      onSuccess();

    } catch (err: any) {
      toast.error(`Lỗi trong quá trình nạp: ${err.message}`);
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const isAllSelected = sheets.length > 0 && sheets.every((s) => s.selected);
  const isIndeterminate = sheets.some((s) => s.selected) && !isAllSelected;

  return createPortal(
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] border border-slate-100">
        
        {/* Header - Matching ExportExcelModal */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileSpreadsheet className="text-emerald-500" size={24} /> 
              Nạp dữ liệu từ Excel
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {file?.name || "Đang xử lý..."}
            </p>
          </div>
          {step !== "importing" && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scroll min-h-0">
          {step === "parsing" && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <Loader2 size={48} className="animate-spin text-emerald-500 mb-2" />
              <p className="font-bold text-slate-700">Đang đọc cấu trúc file Excel...</p>
            </div>
          )}

          {step === "select_sheets" && (
            <div className="animate-fade-in space-y-4">
              {/* Toàn bộ */}
              <div 
                onClick={handleToggleAll}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                  isAllSelected ? "bg-emerald-50 border-emerald-500" : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                 {isAllSelected ? (
                    <CheckSquare size={20} className="text-emerald-600 shrink-0" />
                  ) : isIndeterminate ? (
                    <div className="relative shrink-0">
                      <Square size={20} className="text-slate-300" />
                      <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-emerald-500 rounded-sm"></div>
                    </div>
                  ) : (
                    <Square size={20} className="text-slate-300 shrink-0" />
                  )}
                <div className="flex-1 font-bold text-slate-700">
                  Toàn bộ Sheet ({sheets.length})
                </div>
              </div>

              <div className="space-y-2 border rounded-xl overflow-hidden shadow-sm p-2 bg-white max-h-[300px] overflow-y-auto hide-scroll">
                {sheets.map((sheet, index) => (
                  <div 
                    key={index}
                    onClick={() => toggleSheet(index)}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="shrink-0">
                      {sheet.selected ? (
                        <CheckSquare size={16} className="text-emerald-500" />
                      ) : (
                        <Square size={16} className="text-slate-300" />
                      )}
                    </div>
                    <FileText size={16} className="text-slate-400 shrink-0" />
                    <div className="flex flex-col flex-1">
                      <span className={`text-sm ${sheet.selected ? "text-slate-800 font-bold" : "text-slate-600 font-medium"}`}>
                        {sheet.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {sheet.rowCount} dòng dữ liệu
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Đặt tên cho chủ đề (Buổi từ vựng) - Không bắt buộc
                  </label>
                  <input
                    type="text"
                    placeholder="Nếu để trống, hệ thống sẽ lấy tên Sheet làm tên chủ đề"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 transition-all placeholder:font-medium placeholder:text-slate-300"
                    value={topicNameInput}
                    onChange={(e) => setTopicNameInput(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Xếp vào danh mục (Không bắt buộc)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Từ vựng IELTS, Oxford 3000..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 transition-all placeholder:font-medium placeholder:text-slate-300"
                    value={categoryNameInput}
                    onChange={(e) => setCategoryNameInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === "mapping" && (
            <div className="animate-fade-in space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Vui lòng chọn cột trong Excel tương ứng với các trường từ vựng.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "word", label: "Từ vựng (Bắt buộc)", required: true },
                  { id: "ipa", label: "Phiên âm", required: false },
                  { id: "meanings", label: "Nghĩa (Bắt buộc)", required: true },
                  { id: "notes", label: "Ghi chú", required: false },
                ].map((field) => {
                  const firstSelectedSheet = sheets.find(s => s.selected);
                  const availableHeaders = firstSelectedSheet ? firstSelectedSheet.headers : [];
                  
                  return (
                    <div key={field.id} className="flex flex-col gap-1.5 border rounded-xl p-3 bg-white shadow-sm">
                      <label className="font-bold text-slate-700 text-xs">
                        {field.label}
                        {field.required && <span className="text-rose-500 ml-1">*</span>}
                      </label>
                      <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        value={mapping[field.id as keyof ColumnMapping]}
                        onChange={(e) => setMapping({ ...mapping, [field.id]: e.target.value })}
                      >
                        <option value="">-- Bỏ qua --</option>
                        {availableHeaders.map((header, idx) => (
                          <option key={idx} value={header}>{header}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === "importing" && (
            <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
                <div 
                  className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"
                  style={{ animationDuration: '2s' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
                  <Database size={28} />
                </div>
              </div>
              
              <div className="w-full space-y-2">
                <h4 className="text-lg font-bold text-slate-800">Đang nạp dữ liệu...</h4>
                <p className="text-xs font-medium text-slate-500">
                  {progress.currentSheet && `Đang xử lý: ${progress.currentSheet}`}
                </p>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${Math.max(5, (progress.current / progress.total) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 text-right mt-1.5">
                  {progress.current} / {progress.total}
                </p>
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-4 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-2">
                <Check size={40} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-1">Nhập thành công!</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Đã thêm <span className="font-black text-emerald-600">{results.success}</span> từ vựng mới vào dữ liệu.
                </p>
                {results.errors > 0 && (
                  <p className="text-rose-500 font-medium text-xs mt-2">
                    Có {results.errors} dòng dữ liệu không hợp lệ đã bị bỏ qua.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Matching ExportExcelModal */}
        {(step === "select_sheets" || step === "mapping" || step === "result") && (
          <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            {step === "select_sheets" && (
              <>
                <div className="text-sm font-semibold text-slate-500">
                  Đã chọn: <span className="text-emerald-600 font-black">{sheets.filter(s => s.selected).length}</span> Sheet
                </div>
                <div className="flex gap-3">
                  <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                    Hủy
                  </button>
                  <button onClick={handleContinueToMapping} className="px-6 py-2.5 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center gap-2">
                    Tiếp tục <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}

            {step === "mapping" && (
              <>
                <div className="flex-1"></div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("select_sheets")} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                    Quay lại
                  </button>
                  <button onClick={startImport} className="px-6 py-2.5 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center gap-2">
                    <UploadCloud size={18} /> Bắt đầu nạp
                  </button>
                </div>
              </>
            )}

            {step === "result" && (
              <div className="w-full">
                <button onClick={onClose} className="w-full py-3 bg-slate-800 text-white font-black rounded-xl hover:bg-slate-900 shadow-lg shadow-slate-200 transition-all active:scale-95">
                  Hoàn tất & Đóng
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
