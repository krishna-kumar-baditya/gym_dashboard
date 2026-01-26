"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

import UploadGalleryModal from "@/features/gallery/UploadGalleryModal";
import { getGalleryImages, deleteGalleryRecord } from "@/features/gallery/gallery.service";
import { deleteGalleryImage } from "@/features/gallery/deleteGalleryImage";
import { GalleryImage } from "@/features/gallery/gallery.types";

const TABS = ["All", "Trainer", "Class", "Facility"] as const;

export default function MediaGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");
    const [openUpload, setOpenUpload] = useState(false);

    /* ================= FETCH ================= */
    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getGalleryImages();
            setImages(data ?? []);
        } catch (error) {
            console.error("Failed to fetch gallery images:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    /* ================= FILTER ================= */
    const filteredImages = useMemo(() => {
        if (activeTab === "All") return images;

        const category = activeTab.toLowerCase();
        return images.filter((img) => img.category === category);
    }, [activeTab, images]);

    /* ================= DELETE ================= */
    const handleDelete = useCallback(
        async (img: GalleryImage) => {
            const confirmed = window.confirm("Delete this image?");
            if (!confirmed) return;

            try {
                // 1️⃣ Delete storage object
                await deleteGalleryImage(img.image_url);

                // 2️⃣ Delete DB record (RLS protected)
                await deleteGalleryRecord(img.id);

                // 3️⃣ Update UI optimistically
                setImages((prev) => prev.filter((i) => i.id !== img.id));
            } catch (error) {
                console.error("Failed to delete image:", error);
                alert("Failed to delete image. Please try again.");
            }
        },
        []
    );

    /* ================= UI ================= */
    return (
        <div className="p-6 text-slate-200">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Media Gallery</h1>

                <button
                    onClick={() => setOpenUpload(true)}
                    className="flex items-center gap-2 rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-teal-400"
                >
                    <Plus size={16} />
                    Upload Images
                </button>
            </div>

            {/* TABS */}
            <div className="mb-6 flex gap-2">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-md px-4 py-2 text-sm font-medium ${
                            activeTab === tab
                                ? "bg-slate-700 text-white"
                                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* GALLERY GRID */}
            {loading ? (
                <div className="text-center text-slate-400">
                    Loading images...
                </div>
            ) : filteredImages.length === 0 ? (
                <div className="text-center text-slate-400">
                    No images found
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {filteredImages.map((img) => (
                        <div
                            key={img.id}
                            className="group relative overflow-hidden rounded-lg bg-slate-800 shadow-md"
                        >
                            <Image
                                src={img.image_url}
                                alt="Gallery"
                                width={400}
                                height={300}
                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <button
                                onClick={() => handleDelete(img)}
                                className="absolute right-2 top-2 rounded-md bg-red-600/90 p-2 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                            >
                                🗑
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* UPLOAD MODAL */}
            <UploadGalleryModal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                onSuccess={fetchImages}
            />
        </div>
    );
}
