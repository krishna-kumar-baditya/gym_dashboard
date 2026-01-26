import { supabase } from "@/lib/supabase/client"

export async function uploadServiceImage(file: File) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  // ✅ DO NOT prefix bucket name again
  const filePath = fileName
  // or: const filePath = `images/${fileName}`

  const { error } = await supabase.storage
    .from("services")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    console.error("Upload error:", error)
    throw error
  }

  const { data } = supabase.storage
    .from("services")
    .getPublicUrl(filePath)

  return data.publicUrl
}
