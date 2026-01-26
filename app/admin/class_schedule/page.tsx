"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash,
} from "lucide-react";

import AddClassModal from "@/features/class_schedule/AddClassModal";
import EditClassModal from "@/features/class_schedule/EditClassModal";
import {
  getClassSchedules,
  deleteClass,
  PAGE_SIZE,
} from "@/features/class_schedule/classSchedule.service";
import { ClassSchedule } from "@/features/class_schedule/classSchedule.types";

const DAYS = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type DayFilter = (typeof DAYS)[number];

export default function ClassSchedulePage() {
  /* ===================== STATE ===================== */
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [activeDay, setActiveDay] = useState<DayFilter>("All");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedClass, setSelectedClass] =
    useState<ClassSchedule | null>(null);

  /* ===================== DERIVED ===================== */
  const totalPages = useMemo(
    () => Math.ceil(total / PAGE_SIZE),
    [total],
  );

  /* ===================== FETCH ===================== */
  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const { data, count } = await getClassSchedules(page, activeDay);
      setClasses(data);
      setTotal(count ?? 0);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setLoading(false);
    }
  }, [page, activeDay]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  /* ===================== DELETE ===================== */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = window.confirm("Delete this class?");
      if (!confirmed) return;

      // Optimistic update
      setClasses((prev) => prev.filter((c) => c.id !== id));
      setTotal((t) => Math.max(0, t - 1));

      try {
        await deleteClass(id);
      } catch (error) {
        console.error("Failed to delete class:", error);
        alert("Delete failed. Reloading data.");
        fetchClasses();
      }
    },
    [fetchClasses],
  );

  /* ===================== UI ===================== */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">
          Class Schedule
        </h1>
        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-500 text-slate-900 font-medium"
        >
          <Plus size={16} />
          Add Class
        </button>
      </div>

      {/* Card */}
      <div className="rounded-xl bg-gradient-to-b from-[#0B1220] to-[#0E1627] border border-white/5 overflow-hidden">
        {/* Day Tabs */}
        <div className="flex gap-2 px-6 py-3 border-b border-white/5 overflow-x-auto">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => {
                setActiveDay(day);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeDay === day
                  ? "bg-[#0F172A] text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="lg:hidden divide-y divide-white/5">
          {loading ? (
            <div className="px-6 py-6 text-slate-400 text-center">
              Loading...
            </div>
          ) : classes.length === 0 ? (
            <div className="px-6 py-6 text-slate-400 text-center">
              No classes found
            </div>
          ) : (
            classes.map((c) => (
              <div key={c.id} className="px-4 py-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold">
                      {c.class_name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {c.day} • {c.time}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      c.is_active
                        ? "bg-emerald-600/30 text-emerald-300"
                        : "bg-slate-600/30 text-slate-300"
                    }`}
                  >
                    {c.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-slate-400">Trainer:</span>{" "}
                  <span className="text-white">
                    {c.trainer?.name || "—"}
                  </span>
                </div>

                {c.description && (
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {c.description}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSelectedClass(c);
                      setOpenEdit(true);
                    }}
                    className="flex-1 rounded-md bg-blue-900/80 px-3 py-2 text-sm text-white"
                  >
                    <Pencil size={14} className="inline mr-1" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="flex-1 rounded-md bg-red-900/80 px-3 py-2 text-sm text-red-200"
                  >
                    <Trash size={14} className="inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_2fr_140px_160px] px-6 py-3 bg-[#0F172A] text-sm font-semibold text-slate-300">
            <div>Class</div>
            <div>Day</div>
            <div>Time</div>
            <div>Trainer</div>
            <div>Description</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {loading ? (
            <div className="px-6 py-6 text-slate-400">Loading...</div>
          ) : classes.length === 0 ? (
            <div className="px-6 py-6 text-slate-400">
              No classes found
            </div>
          ) : (
            classes.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-[1.3fr_1fr_1fr_1fr_2fr_140px_160px] px-6 py-4 text-sm border-b border-white/5"
              >
                <div className="text-white font-medium">
                  {c.class_name}
                </div>
                <div className="text-slate-400">{c.day}</div>
                <div className="text-slate-400">{c.time}</div>
                <div className="text-white">
                  {c.trainer?.name || "—"}
                </div>
                <div className="text-slate-400">
                  {c.description || "—"}
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-md text-xs ${
                      c.is_active
                        ? "bg-emerald-600/30 text-emerald-300"
                        : "bg-slate-600/30 text-slate-300"
                    }`}
                  >
                    {c.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedClass(c);
                      setOpenEdit(true);
                    }}
                    className="px-3 py-1.5 rounded-md bg-blue-900/80 text-white"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1.5 rounded-md bg-red-900/80 text-red-200"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= PAGINATION (Services Style) ================= */}
        <div className="flex items-center justify-between px-6 py-4 text-sm text-slate-400 border-t border-white/5">
          <span>
            {total === 0
              ? "0"
              : `${(page - 1) * PAGE_SIZE + 1}-${Math.min(
                  page * PAGE_SIZE,
                  total,
                )}`}{" "}
            of {total}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md bg-slate-800 px-2 py-1 hover:bg-slate-700 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-xs text-slate-300">
              Page {page} of {totalPages || 1}
            </span>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md bg-slate-800 px-2 py-1 hover:bg-slate-700 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddClassModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={fetchClasses}
      />

      <EditClassModal
        open={openEdit}
        data={selectedClass}
        onClose={() => setOpenEdit(false)}
        onSuccess={fetchClasses}
      />
    </div>
  );
}
