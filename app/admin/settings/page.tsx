"use client"

import {
  ChevronDown,
  Settings as SettingsIcon,
  User,
  Lock,
  Sun,
  Moon,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="text-slate-400" size={24} />
        <h1 className="text-2xl font-semibold text-white">
          Settings
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= General Settings ================= */}
        <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0B1220] to-[#0E1627]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <SettingsIcon size={18} />
              General Settings
            </div>
            <ChevronDown className="text-slate-400" size={18} />
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Site Name
              </label>
              <input
                defaultValue="Gym Fitness"
                className="w-full rounded-md bg-[#0F172A] border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Site Description
              </label>
              <textarea
                defaultValue="An awesome fitness gym management system."
                rows={3}
                className="w-full rounded-md bg-[#0F172A] border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
              />
            </div>

            <button className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-500 text-slate-900 font-medium">
              Save Changes
            </button>
          </div>
        </div>

        {/* ================= Profile Settings ================= */}
        <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0B1220] to-[#0E1627]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <User size={18} />
              Profile Settings
            </div>
            <ChevronDown className="text-slate-400" size={18} />
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Name
              </label>
              <input
                defaultValue="John Doe"
                className="w-full rounded-md bg-[#0F172A] border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Email
              </label>
              <input
                defaultValue="admin@example.com"
                className="w-full rounded-md bg-[#0F172A] border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
              />
            </div>

            <button className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-500 text-slate-900 font-medium">
              Save Changes
            </button>
          </div>
        </div>

        {/* ================= Security Settings ================= */}
        <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0B1220] to-[#0E1627]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <Lock size={18} />
              Security Settings
            </div>
            <ChevronDown className="text-slate-400" size={18} />
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Password Change
              </label>
              <input
                type="password"
                value="********"
                readOnly
                className="w-full rounded-md bg-[#0F172A] border border-white/10 px-3 py-2 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value="********"
                readOnly
                className="w-full rounded-md bg-[#0F172A] border border-white/10 px-3 py-2 text-slate-200"
              />
            </div>

            <button className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-500 text-slate-900 font-medium">
              Save Changes
            </button>
          </div>
        </div>

        {/* ================= Theme Settings ================= */}
        <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0B1220] to-[#0E1627]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <Sun size={18} />
              Theme
            </div>
            <ChevronDown className="text-slate-400" size={18} />
          </div>

          <div className="p-5">
            <div className="inline-flex rounded-md bg-[#0F172A] border border-white/10 overflow-hidden">
              <button className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:bg-white/5">
                <Sun size={14} />
                Light
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] text-slate-200">
                <Moon size={14} />
                Dark
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:bg-white/5">
                Auto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
