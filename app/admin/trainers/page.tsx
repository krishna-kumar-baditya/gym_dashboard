"use client"

import Image from "next/image"
import {
  Plus,
  Pencil,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useEffect, useState } from "react"
import {
  getTrainers,
  deleteTrainer,
  PAGE_SIZE,
} from "@/features/trainers/trainers.service"
import AddTrainerModal from "@/features/trainers/AddTrainerForm"
import EditTrainerModal from "@/features/trainers/EditTrainerForm"
// import AddTrainerModal from "@/features/trainers/AddTrainerModal"
// import EditTrainerModal from "@/features/trainers/EditTrainerModal"

type Trainer = {
  id: string
  name: string
  specialty: string
  experience: string
  image_url: string
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selected, setSelected] = useState<Trainer | null>(null)

  const fetchTrainers = async () => {
    try {
      setLoading(true)
      const { data, count } = await getTrainers(page)
      setTrainers(data)
      setTotal(count ?? 0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrainers()
  }, [page])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this trainer?")) return
    await deleteTrainer(id)
    fetchTrainers()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white">
          Trainers
        </h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-500 text-slate-900 font-medium"
        >
          <Plus size={16} />
          Add Trainer
        </button>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0B1220] to-[#0E1627] overflow-hidden">
        {/* ===== DESKTOP TABLE ===== */}
        <div className="hidden lg:block">
          {/* Header */}
          <div className="grid grid-cols-[100px_1.5fr_2fr_1fr_220px] px-6 py-3 bg-[#0F172A] text-sm font-semibold text-slate-300 border-b border-white/5">
            <div>Image</div>
            <div>Name</div>
            <div>Speciality</div>
            <div>Experience</div>
            <div>Actions</div>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="px-6 py-6 text-slate-400">
              Loading trainers...
            </div>
          ) : (
            trainers.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-[100px_1.5fr_2fr_1fr_220px] px-6 py-4 items-center text-sm border-b border-white/5 bg-gradient-to-r from-white/[0.03] to-white/[0.01] hover:from-teal-500/[0.08] hover:to-white/[0.02] transition"
              >
                {/* Image */}
                <div>
                  <div className="w-12 h-12 rounded-md overflow-hidden border border-white/10">
                    <img
                      src={t.image_url}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="text-slate-200 font-medium">
                  {t.name}
                </div>

                {/* Specialty */}
                <div className="text-slate-400">
                  {t.specialty}
                </div>

                {/* Experience */}
                <div className="text-slate-300">
                  {t.experience}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelected(t)
                      setOpenEdit(true)
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-900/80 hover:bg-blue-800 text-slate-200"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-900/80 hover:bg-red-800 text-red-200"
                  >
                    <Trash size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ===== MOBILE / TABLET CARDS ===== */}
        <div className="lg:hidden divide-y divide-white/5">
          {trainers.map((t) => (
            <div
              key={t.id}
              className="p-4 space-y-4 bg-gradient-to-r from-white/[0.03] to-white/[0.01]"
            >
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-md overflow-hidden border border-white/10">
                  <img
                    src={t.image_url}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-slate-200 font-medium">
                    {t.name}
                  </p>
                  <p className="text-sm text-slate-400">
                    {t.specialty}
                  </p>
                  <p className="text-sm text-slate-300 mt-1">
                    Experience: {t.experience}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelected(t)
                    setOpenEdit(true)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-blue-900/80 hover:bg-blue-800 text-slate-200"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-red-900/80 hover:bg-red-800 text-red-200"
                >
                  <Trash size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 text-sm text-slate-400 bg-[#0B1220]">
          <div>
            Rows per page: {PAGE_SIZE}
          </div>

          <div className="flex items-center gap-3">
            <span>
              {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, total)} of {total}
            </span>

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-1 rounded hover:bg-white/5 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={page * PAGE_SIZE >= total}
              onClick={() => setPage((p) => p + 1)}
              className="p-1 rounded hover:bg-white/5 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddTrainerModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={fetchTrainers}
      />

      <EditTrainerModal
        open={openEdit}
        trainer={selected}
        onClose={() => setOpenEdit(false)}
        onSuccess={fetchTrainers}
      />
    </div>
  )
}
