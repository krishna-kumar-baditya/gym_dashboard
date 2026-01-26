import { supabase } from "@/lib/supabase/client"
import { Trainer } from "./trainer.types"

export const PAGE_SIZE = 10

export const getTrainers = async (page: number) => {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, count, error } = await supabase
    .from("trainers")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) throw error
  return { data: data as Trainer[], count }
}

export const createTrainer = async (payload: Partial<Trainer>) => {
  const { error } = await supabase.from("trainers").insert(payload)
  if (error) throw error
}

export const updateTrainer = async (
  id: string,
  payload: Partial<Trainer>
) => {
  const { error } = await supabase
    .from("trainers")
    .update(payload)
    .eq("id", id)

  if (error) throw error
}

export const deleteTrainer = async (id: string) => {
  const { error } = await supabase
    .from("trainers")
    .delete()
    .eq("id", id)

  if (error) throw error
}

export const uploadTrainerImage = async (file: File) => {
  const filePath = `${crypto.randomUUID()}-${file.name}`

  const { error } = await supabase.storage
    .from("trainers")
    .upload(filePath, file)

  if (error) throw error

  return supabase.storage
    .from("trainers")
    .getPublicUrl(filePath).data.publicUrl
}
