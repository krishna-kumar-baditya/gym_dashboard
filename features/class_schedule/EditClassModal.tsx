"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateClass } from "./classSchedule.service";
import { supabase } from "@/lib/supabase/client";

export default function EditClassModal({
  open,
  data,
  onClose,
  onSuccess,
}: any) {
  const [form, setForm] = useState<any>(null);
  const [trainers, setTrainers] = useState<any[]>([]);

  /* Load trainers */
  useEffect(() => {
    supabase
      .from("trainers")
      .select("id,name")
      .then(({ data }) => setTrainers(data || []));
  }, []);

  /* Load selected class */
  useEffect(() => {
    if (data) {
      setForm({
        id: data.id,
        class_name: data.class_name,
        day: data.day,
        time: data.time,
        trainer_id: data.trainer_id || "",
        description: data.description || "",
        is_active: data.is_active,
      });
    }
  }, [data]);

  if (!open || !form) return null;

  const submit = async () => {
    await updateClass(form.id, {
      class_name: form.class_name,
      day: form.day,
      time: form.time,
      trainer_id: form.trainer_id || null,
      description: form.description,
      is_active: form.is_active,
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-xl bg-[#1e1e2f] text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold">Edit Class</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          {/* Class Name */}
          <input
            value={form.class_name}
            onChange={(e) =>
              setForm({ ...form, class_name: e.target.value })
            }
            className="w-full rounded bg-[#2a2a3d] px-3 py-2"
            placeholder="Class Name"
          />

          {/* Day */}
          <select
            value={form.day}
            onChange={(e) =>
              setForm({ ...form, day: e.target.value })
            }
            className="w-full rounded bg-[#2a2a3d] px-3 py-2"
          >
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Time */}
          <input
            type="time"
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
            className="w-full rounded bg-[#2a2a3d] px-3 py-2"
          />

          {/* Trainer */}
          <select
            value={form.trainer_id}
            onChange={(e) =>
              setForm({ ...form, trainer_id: e.target.value })
            }
            className="w-full rounded bg-[#2a2a3d] px-3 py-2"
          >
            <option value="">Select Trainer</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Description */}
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full rounded bg-[#2a2a3d] px-3 py-2"
            placeholder="Description"
          />

          {/* Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_active: e.target.checked,
                })
              }
            />
            <span className="text-sm">Active</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-white/10 px-6 py-4">
          <button
            onClick={submit}
            className="rounded bg-emerald-600 px-5 py-2 font-medium hover:bg-emerald-500"
          >
            Update Class
          </button>
        </div>
      </div>
    </div>
  );
}
