type Props = {
  label: string
  value: number
  icon: React.ReactNode
}

export default function StatCard({ label, value, icon }: Props) {
  return (
    <div className="rounded-xl bg-gradient-to-b from-[#1B2434] to-[#131C2A] p-5 border border-white/5">
      <div className="flex items-center gap-3 text-slate-400">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-white">
        {value}
      </p>
    </div>
  )
}
