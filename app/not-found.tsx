import { Clock } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A1020]">
      <div className="max-w-md w-full rounded-xl border border-white/5 bg-gradient-to-b from-[#0B1220] to-[#0E1627] p-8 text-center">
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-teal-500/10 text-teal-400 mb-6">
          <Clock size={28} />
        </div>

        <h1 className="text-2xl font-semibold text-white">
          Feature Coming Soon
        </h1>

        <p className="mt-3 text-slate-400">
          This page is not available yet or is currently under development.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#0F172A] border border-white/10 text-sm text-slate-300">
          🚧 Under Development
        </div>
      </div>
    </div>
  )
}
