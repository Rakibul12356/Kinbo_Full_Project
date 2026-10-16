"use client";

import React, { useEffect, useState } from "react";
import { FileText, X } from "lucide-react";
import type { UploadedFile } from "@/lib/auth/types";
import { formatFileSize } from "@/lib/file-utils";

interface DocumentGalleryProps {
  documents: { label: string; file: UploadedFile }[];
}

export default function DocumentGallery({ documents }: DocumentGalleryProps) {
  const [preview, setPreview] = useState<{ label: string; src: string } | null>(null);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {documents.map(({ label, file }, i) => {
          const src = file.dataUrl;
          return (
            <li key={`${label}-${i}`}>
              <button
                type="button"
                disabled={!src}
                onClick={() => src && setPreview({ label, src })}
                className="group block w-full overflow-hidden rounded-xl border border-[#E5E7EB] text-left transition enabled:hover:border-[#082F6B] enabled:cursor-zoom-in"
              >
                <div className="flex aspect-[85/54] items-center justify-center bg-[#F3F7FC]">
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={label} className="h-full w-full object-cover" />
                  ) : (
                    <FileText className="h-8 w-8 text-[#082F6B]/60" />
                  )}
                </div>
                <div className="px-2.5 py-2">
                  <p className="truncate text-xs font-semibold text-[#1F2937]">{label}</p>
                  <p className="truncate text-[10px] text-zinc-400">
                    {file.name}
                    {file.size ? ` · ${formatFileSize(file.size)}` : ""}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {preview && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={preview.label}
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 cursor-pointer"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.src} alt={preview.label} className="max-h-[80vh] rounded-lg object-contain" />
            <figcaption className="mt-2 text-center text-sm text-white/80">{preview.label}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
