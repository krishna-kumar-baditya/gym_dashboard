type Submission = {
  id: string
  name: string
  type: string
  submitted_at: string
  status: string
}

export default function RecentSubmissionsTable({ rows }: { rows: Submission[] }) {
  return (
    <div className="rounded-xl bg-gradient-to-b from-[#1B2434] to-[#131C2A] p-5 border border-white/5">
      <h3 className="text-white font-medium mb-4">
        Recent Submissions
      </h3>

      <table className="w-full text-sm">
        <thead className="text-slate-400 border-b border-white/10">
          <tr>
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Form Type</th>
            <th className="text-left py-2">Submitted</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b border-white/5">
              <td className="py-2 text-white">{r.name}</td>
              <td className="py-2 text-slate-300">{r.type}</td>
              <td className="py-2 text-slate-300">{r.submitted_at}</td>
              <td className="py-2">
                <span className="px-3 py-1 rounded-md text-xs bg-emerald-600/30 text-emerald-300">
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
