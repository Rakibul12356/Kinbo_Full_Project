import type { UploadedFile } from "@/lib/auth/types";

export const formatFileSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Images are downscaled to JPEG so several documents fit in localStorage
 * (mock backend); other files keep metadata only.
 */
export async function toUploadedFile(file: File, maxDimension = 1000): Promise<UploadedFile> {
  const meta = { name: file.name, size: file.size, type: file.type };
  if (!file.type.startsWith("image/")) return meta;

  const original = await readAsDataUrl(file);
  try {
    const img = await loadImage(original);
    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return { ...meta, dataUrl: original };
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return { ...meta, dataUrl: canvas.toDataURL("image/jpeg", 0.72) };
  } catch {
    return { ...meta, dataUrl: original };
  }
}
