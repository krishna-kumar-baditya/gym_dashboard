"use client"

import AddMembershipForm from "@/features/membership_plans/AddMembershipForm"
import EditMembershipForm from "@/features/membership_plans/EditMembershipForm"
import {
  getMembershipPlans,
  deleteMembershipPlan,
  PAGE_SIZE,
} from "@/features/membership_plans/membership.service"
import {
  Plus,
  Pencil,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useEffect, useState } from "react"

type Plan = {
  id: string
  name: string
  price: string
  features: string[]
  highlight: boolean
  active: boolean
}

export default function MembershipsPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selected, setSelected] = useState<Plan | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchMemberships = async () => {
    setLoading(true)
    const { data, count } = await getMembershipPlans(page)

    setPlans(
      data.map((p) => ({
        id: p.id,
        name: p.name,
        price: `$${p.price}`,
        features: p.features,
        highlight: p.highlight,
        active: p.is_active,
      }))
    )

    setTotal(count ?? 0)
    setLoading(false)
  }

  useEffect(() => {
    fetchMemberships()
  }, [page])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this membership plan?")) return
    await deleteMembershipPlan(id)
    fetchMemberships()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">
          Memberships
        </h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium"
        >
          <Plus size={16} />
          Add Plan
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-[#0B1220] overflow-hidden">
        {/* Header Row */}
        <div className="hidden lg:grid grid-cols-[1.2fr_1fr_2.5fr_1fr_1fr_1.5fr] px-6 py-3 bg-[#0F172A] text-sm font-semibold text-slate-400 border-b border-white/10">
          <div>Plan</div>
          <div>Monthly Price</div>
          <div>List of Features</div>
          <div>Highlight?</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="px-6 py-6 text-slate-400">
            Loading memberships...
          </div>
        ) : (
          plans.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_2.5fr_1fr_1fr_1.5fr] gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.02]"
            >
              {/* Plan */}
              <div className="text-white font-medium">
                {p.name}
              </div>

              {/* Price */}
              <div className="text-white font-medium">
                {p.price}
              </div>

              {/* Features */}
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-sm">
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              {/* Highlight */}
              <div className="text-slate-300">
                {p.highlight ? "True" : "False"}
              </div>

              {/* Status */}
              <div>
                {p.active ? (
                  <span className="inline-flex px-3 py-1 rounded-md text-xs font-medium bg-emerald-600/30 text-emerald-300">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex px-3 py-1 rounded-md text-xs font-medium bg-slate-600/30 text-slate-300">
                    Inactive
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 h-10">
                <button
                  onClick={() => {
                    setSelected(p)
                    setOpenEdit(true)
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-900/80 hover:bg-blue-800 text-slate-200"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-900/80 hover:bg-red-800 text-red-200"
                >
                  <Trash size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-6 py-3 text-sm text-slate-400 bg-[#0B1220]">
          <div>
            Rows per page:{" "}
            <span className="text-slate-200">
              {PAGE_SIZE}
            </span>
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
      <AddMembershipForm
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={fetchMemberships}
      />

      <EditMembershipForm
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSubmit={fetchMemberships}
        initialData={selected}
      />
    </div>
  )
}
