import { supabase } from "@/lib/supabase/client"

export async function getProfile() {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) throw error
  return data
}

export async function updateProfile(payload: {
  full_name: string
  email: string
}) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error("Not authenticated")

  await supabase.from("profiles").update({
    full_name: payload.full_name,
    email: payload.email,
  }).eq("id", user.id)

  await supabase.auth.updateUser({ email: payload.email })
}
