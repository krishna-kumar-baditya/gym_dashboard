// features/testimonials/uploadTestimonialImage.ts
import { supabase } from "@/lib/supabase/client"

export async function uploadTestimonialImage(file: File) {
  const ext = file.name.split(".").pop()
  const fileName = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from("testimonials")
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from("testimonials")
    .getPublicUrl(fileName)

  return data.publicUrl
}
