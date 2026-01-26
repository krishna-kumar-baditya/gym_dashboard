// features/testimonials/EditTestimonialModal.tsx
"use client"

import { useEffect, useState } from "react"
import { X, Star } from "lucide-react"
import { updateTestimonial } from "./testimonials.service"

export default function EditTestimonialModal({ open, data, onClose, onSuccess }: any) {
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  if (!open || !form) return null

  const submit = async () => {
    await updateTestimonial(form.id, {
      client_name: form.client_name,
      review: form.review,
      rating: form.rating,
      is_active: form.is_active,
    })

    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#1e1e2f] w-full max-w-xl rounded-xl text-white">
        <div className="flex justify-between px-6 py-4 border-b border-white/10">
          <h2>Edit Testimonial</h2>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <input
            value={form.client_name}
            onChange={e => setForm({ ...form, client_name: e.target.value })}
            className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
          />

          <div className="flex gap-2 text-amber-400">
            {[1,2,3,4,5].map(n => (
              <Star
                key={n}
                onClick={() => setForm({ ...form, rating: n })}
                fill={n <= form.rating ? "currentColor" : "none"}
                className="cursor-pointer"
              />
            ))}
          </div>

          <textarea
            value={form.review}
            onChange={e => setForm({ ...form, review: e.target.value })}
            className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-white/10">
          <button onClick={submit} className="bg-emerald-600 px-4 py-2 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
