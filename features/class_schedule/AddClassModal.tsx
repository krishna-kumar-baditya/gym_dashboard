"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { createClass } from "./classSchedule.service"
import { supabase } from "@/lib/supabase/client"

export default function AddClassModal({ open, onClose, onSuccess }: any) {
  const [className, setClassName] = useState("")
  const [day, setDay] = useState("")
  const [time, setTime] = useState("09:00")
  const [trainerId, setTrainerId] = useState("")
  const [description, setDescription] = useState("")
  const [trainers, setTrainers] = useState<any[]>([])

  useEffect(() => {
    supabase.from("trainers").select("id,name").then(({ data }) => {
      setTrainers(data || [])
    })
  }, [])

  if (!open) return null

  const submit = async () => {
    await createClass({
      class_name: className,
      day,
      time,
      trainer_id: trainerId || null,
      description,
      is_active: true,
    })

    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#1e1e2f] w-full max-w-xl rounded-xl text-white">
        <div className="flex justify-between px-6 py-4 border-b border-white/10">
          <h2>Add Class</h2>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <input placeholder="Class Name" onChange={e => setClassName(e.target.value)} className="w-full bg-[#2a2a3d] px-3 py-2 rounded" />

          <select onChange={e => setDay(e.target.value)} className="w-full bg-[#2a2a3d] px-3 py-2 rounded">
            <option value="">Select Day</option>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-[#2a2a3d] px-3 py-2 rounded" />

          <select onChange={e => setTrainerId(e.target.value)} className="w-full bg-[#2a2a3d] px-3 py-2 rounded">
            <option value="">Select Trainer</option>
            {trainers.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} className="w-full bg-[#2a2a3d] px-3 py-2 rounded" />
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-white/10">
          <button onClick={submit} className="bg-emerald-600 px-4 py-2 rounded">
            Add Class
          </button>
        </div>
      </div>
    </div>
  )
}
