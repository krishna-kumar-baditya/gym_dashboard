"use client"

import { useEffect, useState } from "react"
import {
  Plus,
  Pencil,
  Trash,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react"

import AddTestimonialModal from "@/features/testimonials/AddTestimonialModal"
import EditTestimonialModal from "@/features/testimonials/EditTestimonialModal"
import {
  deleteTestimonial,
  getTestimonials,
  PAGE_SIZE,
} from "@/features/testimonials/testimonials.service"
import { Testimonial } from "@/features/testimonials/testimonials.types"

export default function TestimonialsPage() {
  const [data, setData] = useState<Testimonial[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selected, setSelected] = useState<Testimonial | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getTestimonials(page)
      setData(res.data)
      setTotal(res.count)
    } catch (err) {
      console.error("Failed to fetch testimonials", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this testimonial?")
    if (!ok) return

    await deleteTestimonial(id)
    fetchData()
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Testimonials
        </h1>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-teal-600 px-4 py-2 rounded flex gap-2 text-slate-900"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-slate-400">Loading testimonials...</p>
      ) : data.length === 0 ? (
        <p className="text-slate-400">No testimonials found</p>
      ) : (
        data.map((t) => (
          <div
            key={t.id}
            className="bg-[#0F172A] p-4 rounded flex justify-between items-start"
          >
            <div className="space-y-1">
              <p className="text-white font-medium">
                {t.client_name}
              </p>
              <p className="text-slate-400 text-sm">
                {t.review}
              </p>
              <div className="flex text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelected(t)
                  setOpenEdit(true)
                }}
                className="text-blue-400"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-400"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-3 text-slate-300">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="disabled:opacity-40"
          >
            <ChevronLeft />
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="disabled:opacity-40"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Modals */}
      <AddTestimonialModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={fetchData}
      />

      <EditTestimonialModal
        open={openEdit}
        data={selected}
        onClose={() => {
          setOpenEdit(false)
          setSelected(null)
        }}
        onSuccess={fetchData}
      />
    </div>
  )
}
