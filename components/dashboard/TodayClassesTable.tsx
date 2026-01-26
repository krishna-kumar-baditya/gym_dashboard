import dayjs from "dayjs"

export default function TodayClassesTable({ classes }: any) {
  return (
    <div className="rounded-xl bg-gradient-to-b from-[#1B2434] to-[#131C2A] p-5 border border-white/5">
      <h3 className="text-white font-medium mb-4">
        Today’s Classes
      </h3>

      <table className="w-full text-sm">
        <thead className="text-slate-400 border-b border-white/10">
          <tr>
            <th className="py-2 text-left">Class</th>
            <th className="py-2 text-left">Time</th>
            <th className="py-2 text-left">Trainer</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((c: any) => (
            <tr key={c.id} className="border-b border-white/5">
              <td className="py-2 text-white">{c.class_name}</td>
              <td className="py-2 text-slate-300">
                {dayjs(c.time, "HH:mm:ss").format("hh:mm A")}
              </td>
              <td className="py-2 text-slate-300">
                {c.trainer?.name || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
