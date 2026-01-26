import { supabase } from "@/lib/supabase/client"

export const deleteTestimonialImage = async (url: string) => {
  const path = url.split("/testimonials/")[1]
  if (!path) return

  await supabase.storage.from("testimonials").remove([path])
}
