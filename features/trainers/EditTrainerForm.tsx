"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateTrainer, uploadTrainerImage } from "./trainers.service";
import { Trainer } from "./trainers.types";

export default function EditTrainerModal({
    open,
    trainer,
    onClose,
    onSuccess,
}: {
    open: boolean;
    trainer: Trainer | null;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [form, setForm] = useState<Partial<Trainer>>({});
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (trainer) setForm(trainer);
    }, [trainer]);

    if (!open || !trainer) return null;

    const submit = async () => {
        let image_url = form.image_url;
        if (image) image_url = await uploadTrainerImage(image);

        await updateTrainer(trainer.id, {
            ...form,
            image_url,
        });

        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-[#1e1e2f] w-full max-w-lg rounded-xl text-white">
                <div className="flex justify-between px-6 py-4 border-b border-white/10">
                    <h2>Edit Trainer</h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-4 px-6 py-5">
                    <input
                        value={form.name || ""}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
                    />
                    <input
                        value={form.specialty || ""}
                        onChange={(e) =>
                            setForm({ ...form, specialty: e.target.value })
                        }
                        className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        value={form.experience_years ?? ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                experience_years: Number(e.target.value),
                            })
                        }
                        className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
                    />
                    <input
                        value={form.social_links?.instagram || ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                social_links: { instagram: e.target.value },
                            })
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
                        className="bg-emerald-600 px-4 py-2 rounded"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
