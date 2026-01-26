"use client"

import { useState } from "react"
import { createMembershipPlan } from "./membership.service"
import { X, Plus } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

export default function AddMembershipForm({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [planName, setPlanName] = useState("")
  const [price, setPrice] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [highlight, setHighlight] = useState(false)
  const [status, setStatus] = useState("active")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const addFeature = () => {
    if (!newFeature.trim()) return
    setFeatures((prev) => [...prev, newFeature])
    setNewFeature("")
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await createMembershipPlan({
        name: planName,
        price: Number(price),
        features,
        highlight,
        is_active: status === "active",
      })

      onSubmit()
      onClose()

      // Reset
      setPlanName("")
      setPrice("")
      setFeatures([])
      setHighlight(false)
      setStatus("active")
    } catch (err) {
      console.error("Failed to add membership", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl bg-[#1e1e2f] text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold">Add Membership</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          <input
            placeholder="Plan Name"
            className="w-full rounded bg-[#2a2a3d] px-3 py-2"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Monthly Price"
            className="w-full rounded bg-[#2a2a3d] px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Features */}
          <div>
            <div className="flex gap-2">
              <input
                placeholder="Add feature"
                className="flex-1 rounded bg-[#2a2a3d] px-3 py-2"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
              />
              <button
                onClick={addFeature}
                className="bg-emerald-600 px-3 rounded"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {features.map((f, i) => (
                <span
                  key={i}
                  className="rounded-full bg-[#343454] px-3 py-1 text-xs"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Highlight */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
            />
            Highlight
          </label>

          {/* Status */}
          <select
            className="w-full rounded bg-[#2a2a3d] px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4">
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-emerald-600 px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Add Membership"}
          </button>
        </div>
      </div>
    </div>
  )
}
