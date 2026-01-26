import { supabase } from "@/lib/supabase/client"

export const PAGE_SIZE = 5

export const getMembershipPlans = async (
  page: number
) => {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await supabase
    .from("membership_plans")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: true })
    .range(from, to)

  if (error) throw error

  return { data, count }
}

export const createMembershipPlan = async (payload: {
  name: string
  price: number
  features: string[]
  highlight: boolean
  is_active: boolean
}) => {
  const { error } = await supabase
    .from("membership_plans")
    .insert(payload)

  if (error) throw error
}

export const updateMembershipPlan = async (
  id: string,
  payload: {
    name: string
    price: number
    features: string[]
    highlight: boolean
    is_active: boolean
  }
) => {
  const { error } = await supabase
    .from("membership_plans")
    .update(payload)
    .eq("id", id)

  if (error) throw error
}

export const deleteMembershipPlan = async (id: string) => {
  const { error } = await supabase
    .from("membership_plans")
    .delete()
    .eq("id", id)

  if (error) throw error
}
