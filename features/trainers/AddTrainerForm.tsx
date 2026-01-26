"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createTrainer, uploadTrainerImage } from "./trainers.service";

export default function AddTrainerModal({ open, onClose, onSuccess }: any) {
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [experienceYears, setExperienceYears] = useState<number | "">("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const submit = async () => {
        try {
            setLoading(true);

            let image_url = null;
            if (image) image_url = await uploadTrainerImage(image);

            await createTrainer({
                name,
                specialty,
                experience_years:
                    experienceYears === "" ? null : Number(experienceYears),
                image_url,
                is_active: true,
            });

            onSuccess();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-[#1e1e2f] w-full max-w-lg rounded-xl text-white">
                <div className="flex justify-between px-6 py-4 border-b border-white/10">
                    <h2>Add Trainer</h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-4 px-6 py-5">
                    <input
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
                    />
                    <input
                        placeholder="Specialty"
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Experience (years)"
                        onChange={(e) =>
                            setExperienceYears(
                                e.target.value === ""
                                    ? ""
                                    : Number(e.target.value),
                            )
                        }
                        className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
                    />
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </div>

                <div className="flex justify-end px-6 py-4 border-t border-white/10">
                    <button
                        onClick={submit}
                        disabled={loading}
                        className="bg-emerald-600 px-4 py-2 rounded"
                    >
                        {loading ? "Saving..." : "Add Trainer"}
                    </button>
                </div>
            </div>
        </div>
    );
}
