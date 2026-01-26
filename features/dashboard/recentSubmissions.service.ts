import dayjs from "@/lib/dayjs"
import { supabase } from "@/lib/supabase/client"

export async function getRecentSubmissions() {
  const [contacts, memberships, testimonials] = await Promise.all([
    supabase
      .from("contact_messages")
      .select("id,name,created_at,is_read")
      .order("created_at", { ascending: false })
      .limit(5),

    supabase
      .from("membership_plans")
      .select("id,name,created_at,is_active")
      .order("created_at", { ascending: false })
      .limit(5),

    supabase
      .from("testimonials")
      .select("id,client_name,created_at,is_active")
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  const rows = [
    ...(contacts.data ?? []).map(c => ({
      id: c.id,
      name: c.name,
      type: "Contact Form",
      submitted_at: dayjs(c.created_at).fromNow(),
      status: c.is_read ? "Reviewed" : "New",
    })),

    ...(memberships.data ?? []).map(m => ({
      id: m.id,
      name: m.name,
      type: "Membership",
      submitted_at: dayjs(m.created_at).fromNow(),
      status: m.status ?? "Pending",
    })),

    ...(testimonials.data ?? []).map(t => ({
      id: t.id,
      name: t.client_name,
      type: "Testimonial",
      submitted_at: dayjs(t.created_at).fromNow(),
      status: t.is_active ? "Approved" : "Pending",
    })),
  ]

  return rows
    .sort(
      (a, b) =>
        dayjs(b.submitted_at).valueOf() -
        dayjs(a.submitted_at).valueOf(),
    )
    .slice(0, 6)
}
