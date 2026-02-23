"use client";

import { useEffect, useState } from "react";
import { updateMembershipPlan } from "./membership.service";
import { X, Plus } from "lucide-react";

export default function EditMembershipForm({
    open,
    onClose,
    onSubmit,
    initialData,
}: any) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState("");
    const [highlight, setHighlight] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!initialData) return;
        setName(initialData.name);
        setPrice(initialData.price.replace("$", ""));
        setFeatures(initialData.features);
        setHighlight(initialData.highlight);
        setIsActive(initialData.active);
    }, [initialData]);

    if (!open) return null;

    const addFeature = () => {
        if (!newFeature.trim()) return;
        setFeatures((p) => [...p, newFeature]);
        setNewFeature("");
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await updateMembershipPlan(initialData.id, {
                name,
                price: Number(price),
                features,
                highlight,
                is_active: isActive,
            });

            onSubmit();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#1e1e2f] w-full max-w-xl rounded-xl text-white">
                <div className="flex justify-between px-6 py-4 border-b border-white/10">
                    <h2>Edit Membership</h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-4 px-6 py-5">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
                    />

                    <div>
                        <div className="flex gap-2">
                            <input
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                className="flex-1 bg-[#2a2a3d] px-3 py-2 rounded"
                                placeholder="Add feature"
                            />
                            <button
                                onClick={addFeature}
                                className="bg-emerald-600 px-3 rounded"
                            >
                                <Plus size={14} />
                            </button>
                        </div>

                        {/* Feature List */}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="flex items-center gap-2 bg-[#343454] px-3 py-1 text-xs rounded-full"
                                >
                                    {feature}
                                    <button
                                        onClick={() =>
                                            setFeatures((prev) =>
                                                prev.filter(
                                                    (_, i) => i !== index,
                                                ),
                                            )
                                        }
                                        className="text-red-400"
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <label className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={highlight}
                            onChange={(e) => setHighlight(e.target.checked)}
                        />
                        Highlight
                    </label>

                    <label className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        Active
                    </label>
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
                    <button onClick={onClose}>Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-emerald-600 px-4 py-2 rounded"
                    >
                        {loading ? "Saving..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}
