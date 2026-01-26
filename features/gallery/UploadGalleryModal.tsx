"use client";

import { useState } from "react";
import { uploadGalleryImage } from "./uploadGalleryImage";
import { createGalleryImage } from "./gallery.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function UploadGalleryModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<
    "trainer" | "class" | "facility" | ""
  >("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleUpload = async () => {
    if (!file || !category) return;

    try {
      setLoading(true);

      // 1️⃣ Upload image
      const imageUrl = await uploadGalleryImage(file);

      // 2️⃣ Save metadata
      await createGalleryImage({
        image_url: imageUrl,
        category,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-slate-900 text-slate-200 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
            <h2 className="text-lg font-semibold">Upload Image</h2>
            <button onClick={onClose}>✕</button>
          </div>

          {/* Body */}
          <div className="space-y-4 px-5 py-5">
            {/* Image Picker */}
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-600 p-6 text-slate-400">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }}
              />

              {preview ? (
                <img
                  src={preview}
                  className="h-40 w-full rounded-md object-cover"
                />
              ) : (
                <span>Click to select image</span>
              )}
            </label>

            {/* Category */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as any)
              }
              className="w-full rounded-md bg-slate-800 px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="trainer">Trainer</option>
              <option value="class">Class</option>
              <option value="facility">Facility</option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-700 px-5 py-4">
            <button
              onClick={onClose}
              className="rounded-md bg-slate-700 px-4 py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleUpload}
              disabled={loading || !file || !category}
              className="rounded-md bg-teal-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
