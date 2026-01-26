"use client";

import { useState } from "react";
import { createService } from "@/features/services/services.service";
import { ServicePayload } from "@/features/services/services.types";
import { uploadServiceImage } from "./uploadServiceImage";
// import { uploadServiceImage } from "@/lib/supabase/uploadServiceImage";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddServiceForm({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState<ServicePayload>({
    title: "",
    description: "",
    category: "",
    image_url: "",
    is_active: true,
  });

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let imageUrl = "";

      // 1️⃣ Upload image if selected
      if (imageFile) {
        imageUrl = await uploadServiceImage(imageFile);
        console.log("imageUrl ",imageUrl);
        
      }

      // 2️⃣ Create service
      await createService({
        ...form,
        image_url: imageUrl || undefined,
      });

      onClose();
    } catch (error) {
      console.error("Add service failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 text-slate-200 shadow-2xl">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
            <h2 className="text-lg font-semibold">Add Service</h2>
            <button
              onClick={onClose}
              className="rounded-md bg-slate-700 px-2 py-1"
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-3">
            {/* IMAGE UPLOAD */}
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-slate-700 bg-slate-900/60 p-6">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setImageFile(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />

                <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-dashed border-slate-600">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-3xl">📷</span>
                  )}
                </div>
              </label>

              <span className="text-sm text-emerald-400">
                Upload Image
              </span>
            </div>

            {/* FORM */}
            <div className="md:col-span-2 space-y-5">
              <input
                placeholder="Title *"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full rounded-md bg-slate-800 px-4 py-2"
              />

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full rounded-md bg-slate-800 px-4 py-2"
              >
                <option value="">Select Category</option>
                <option>Strength Training</option>
                <option>Cardio</option>
                <option>Yoga</option>
                <option>HIIT</option>
              </select>

              <select
                value={form.is_active ? "active" : "inactive"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    is_active: e.target.value === "active",
                  })
                }
                className="w-full rounded-md bg-slate-800 px-4 py-2 text-emerald-400"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <textarea
                rows={4}
                placeholder="Enter service description..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full rounded-md bg-slate-800 px-4 py-2"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 border-t border-slate-700 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-md bg-slate-700 px-5 py-2"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-md bg-emerald-600 px-6 py-2 text-white disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Add Service"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
