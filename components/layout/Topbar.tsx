"use client"

import { Menu, Search, Bell, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Topbar({
  onMenuClick,
}: {
  onMenuClick: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-gradient-to-b from-[#0B1220] to-[#0E1627] border-b border-white/5">
      {/* Left */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-400"
        >
          <Menu size={22} />
        </button>

        {/* <div className="relative w-full hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-[#0F172A] border border-white/10 rounded-md text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
          />
        </div> */}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        <button className="relative text-slate-400 hover:text-white">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 hover:bg-white/5 px-2 py-1.5 rounded-md"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm text-white font-medium">Admin</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>
    </header>
  )
}
