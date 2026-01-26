import { supabase } from "@/lib/supabase/client"

export async function getGeneralSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single()

  if (error) throw error
  return data
}

export async function updateGeneralSettings(payload: {
  site_name: string
  site_description: string
}) {
  const { error } = await supabase
    .from("settings")
    .update(payload)
    .eq("id", (await getGeneralSettings()).id)

  if (error) throw error
}
