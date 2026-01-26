// features/testimonials/AddTestimonialModal.tsx
"use client"

import { useState } from "react"
import { X, Star } from "lucide-react"
import { createTestimonial } from "./testimonials.service"
import { uploadTestimonialImage } from "./uploadTestimonialImage"

export default function AddTestimonialModal({ open, onClose, onSuccess }: any) {
  const [clientName, setClientName] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(5)
  const [file, setFile] = useState<File | null>(null)

  if (!open) return null

  const submit = async () => {
    let imageUrl = null
    if (file) imageUrl = await uploadTestimonialImage(file)

    await createTestimonial({
      client_name: clientName,
      review,
      rating,
      image_url: imageUrl,
      is_active: true,
    })

    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#1e1e2f] w-full max-w-xl rounded-xl text-white">
        <div className="flex justify-between px-6 py-4 border-b border-white/10">
          <h2>Add Testimonial</h2>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <input
            placeholder="Client Name"
            onChange={e => setClientName(e.target.value)}
            className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
          />

          <div className="flex gap-2 text-amber-400">
            {[1,2,3,4,5].map(n => (
              <Star
                key={n}
                onClick={() => setRating(n)}
                fill={n <= rating ? "currentColor" : "none"}
                className="cursor-pointer"
              />
            ))}
          </div>

          <textarea
            placeholder="Testimonial"
            onChange={e => setReview(e.target.value)}
            className="w-full bg-[#2a2a3d] px-3 py-2 rounded"
          />

          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-white/10">
          <button onClick={submit} className="bg-emerald-600 px-4 py-2 rounded">
            Add Testimonial
          </button>
        </div>
      </div>
    </div>
  )
}
