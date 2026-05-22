"use client";

import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import ImportExcelModal from "./ImportExcelModal";

interface ImportExcelButtonProps {
  userCode: string;
  onImportSuccess: () => void;
  categoryName?: string;
}

export default function ImportExcelButton({
  userCode,
  onImportSuccess,
  categoryName,
}: ImportExcelButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsModalOpen(true);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
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
        className="inline-flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-green-200 whitespace-nowrap"
      >
        <Upload size={16} />
        Nhập Excel
      </button>

      {isModalOpen && (
        <ImportExcelModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userCode={userCode}
          categoryName={categoryName}
          file={selectedFile}
          onSuccess={() => {
            onImportSuccess();
          }}
        />
      )}
    </>
  );
}
