"use client"

import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import {
  LayoutDashboard,
  Dumbbell,
  CalendarDays,
  Users,
  CreditCard,
  Star,
  Mail,
  FileText,
  Image,
  Settings,
  LogOut,
  X,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Services", icon: Dumbbell, path: "/admin/services" },
  { label: "Class Schedule", icon: CalendarDays, path: "/admin/class_schedule" },
  { label: "Trainers", icon: Users, path: "/admin/trainers" },
  { label: "Memberships", icon: CreditCard, path: "/admin/membership_plans" },
  { label: "Testimonials", icon: Star, path: "/admin/testimonials" },
  { label: "Messages", icon: Mail, path: "/admin/contact_messages" },
  { label: "Blog", icon: FileText, path: "/admin/blog" },
  { label: "Media Gallery", icon: Image, path: "/admin/gallery" },
  // { label: "Settings", icon: Settings, path: "/admin/settings" },
]

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed z-50 lg:static
          inset-y-0 left-0
          w-[260px]
          bg-gradient-to-b from-[#0B1220] to-[#0E1627]
          border-r border-white/5
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">Supabase</h1>
          <button onClick={onClose} className="lg:hidden text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="h-px bg-white/5 mx-4" />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map(({ label, icon: Icon, path }) => {
            const active = pathname === path

            return (
              <button
                key={path}
                onClick={() => {
                  router.push(path)
                  onClose()
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium
                  transition
                  ${
                    active
                      ? "bg-[#0EA5A5]/15 text-[#3DDCDC]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <Icon size={18} />
                {label}
              </button>
            )
          })}
        </nav>

        <div className="h-px bg-white/5 mx-4" />

        {/* Footer */}
        <div className="px-5 py-4 space-y-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
