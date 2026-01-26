"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Props = {
  data: {
    month: string
    members: number
    messages: number
  }[]
}

export default function StatisticsChart({ data }: Props) {
  return (
    <div className="rounded-xl bg-gradient-to-b from-[#1B2434] to-[#131C2A] p-5 border border-white/5">
      <h3 className="text-white font-medium mb-4">
        Statistics Overview
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="members" fill="#34d399" radius={[4,4,0,0]} />
          <Bar dataKey="messages" fill="#60a5fa" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
