import { supabase } from "@/lib/supabase/client"

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export async function getDashboardStatsChart() {
  const [{ data: members }, { data: messages }] = await Promise.all([
    supabase.from("membership_plans").select("created_at"),
    supabase.from("contact_messages").select("created_at"),
  ])

  const map = MONTHS.map((m, i) => ({
    month: m,
    members: 0,
    messages: 0,
  }))

  members?.forEach(m => {
    const month = new Date(m.created_at).getMonth()
    map[month].members++
  })

  messages?.forEach(m => {
    const month = new Date(m.created_at).getMonth()
    map[month].messages++
  })

  return map
}
