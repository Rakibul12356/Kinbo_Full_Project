"use client";

import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FileText, Loader2, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import type { UploadedFile } from "@/lib/auth/types";
import { formatFileSize, toUploadedFile } from "@/lib/file-utils";

const ASPECT_CLASSES = {
  square: "aspect-square",
  card: "aspect-[85/54]",
  wide: "aspect-[4/1]",
} as const;

interface FileUploadFieldProps {
  id: string;
  label: string;
  hint?: string;
  value?: UploadedFile;
  onChange: (file: UploadedFile | undefined) => void;
  accept?: string;
  maxBytes?: number;
  /** Shape of the drop zone; "card" matches an NID / ID card. */
  aspect?: keyof typeof ASPECT_CLASSES;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function FileUploadField({
  id,
  label,
  hint,
  value,
  onChange,
  accept = "image/*,.pdf",
  maxBytes = 5 * 1024 * 1024,
  aspect = "card",
  required,
  error,
  className = "",
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (file.size > maxBytes) {
      toast.error(`${file.name} is larger than ${formatFileSize(maxBytes)}.`);
      return;
    }
    setIsProcessing(true);
    try {
      onChange(await toUploadedFile(file));
    } catch {
      toast.error(`Couldn't read ${file.name}.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className={className}>
      <p className="mb-1.5 text-xs font-semibold text-[#1F2937]">
        {label}
        {required ? <span className="text-rose-500"> *</span> : <span className="font-normal text-zinc-400"> (optional)</span>}
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`group relative overflow-hidden rounded-xl border-2 border-dashed transition ${ASPECT_CLASSES[aspect]} ${
          error
            ? "border-rose-300 bg-rose-50/50"
            : isDragging
              ? "border-[#082F6B] bg-[#082F6B]/5"
              : value
                ? "border-[#E5E7EB] bg-white"
                : "border-[#E5E7EB] bg-[#F3F7FC] hover:border-[#082F6B]"
        }`}
      >
        {isProcessing ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#082F6B]" />
          </div>
        ) : value ? (
          <>
            {value.dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value.dataUrl} alt={label} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-3 text-center">
                <FileText className="h-8 w-8 text-[#082F6B]" />
                <span className="w-full truncate text-xs font-semibold text-[#1F2937]">{value.name}</span>
                <span className="text-[10px] text-zinc-400">{formatFileSize(value.size)}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1.5 bg-linear-to-t from-black/60 to-transparent p-2 opacity-100 sm:opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
              <button
                type="button"
                onClick={openPicker}
                className="inline-flex items-center gap-1 rounded-lg bg-white/95 px-2 py-1 text-[11px] font-semibold text-[#082F6B] hover:bg-white cursor-pointer"
                aria-label={`Replace ${label}`}
              >
                <RefreshCw className="h-3 w-3" /> Replace
              </button>
              <button
                type="button"
                onClick={() => onChange(undefined)}
                className="inline-flex items-center rounded-lg bg-white/95 p-1 text-rose-600 hover:bg-white cursor-pointer"
                aria-label={`Remove ${label}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            id={id}
            onClick={openPicker}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center cursor-pointer"
          >
            <UploadCloud className="h-6 w-6 text-zinc-400 group-hover:text-[#082F6B]" />
            <span className="text-xs font-semibold text-[#1F2937]">Click or drop file</span>
            {hint && <span className="text-[10px] text-zinc-400">{hint}</span>}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
