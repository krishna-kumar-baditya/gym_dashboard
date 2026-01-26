// features/testimonials/testimonial.service.ts
import { supabase } from "@/lib/supabase/client"
import { Testimonial } from "./testimonials.types"

export const PAGE_SIZE = 10

export const getTestimonials = async (page: number) => {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, count, error } = await supabase
    .from("testimonials")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) throw error
  return { data: data as Testimonial[], count }
}

export const createTestimonial = async (
  payload: Partial<Testimonial>,
) => {
  const { error } = await supabase.from("testimonials").insert(payload)
  if (error) throw error
}

export const updateTestimonial = async (
  id: string,
  payload: Partial<Testimonial>,
) => {
  const { error } = await supabase
    .from("testimonials")
    .update(payload)
    .eq("id", id)
  if (error) throw error
}

export const deleteTestimonial = async (id: string) => {
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id)
  if (error) throw error
}
