import { supabase } from "@/lib/supabase/client";
import { ServicePayload } from "./services.types";

/**
 * GET all services
 * (public or admin – depends on RLS)
 */
export const getServices = async () => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * CREATE service
 * (admin only – enforced by RLS)
 */
export const createService = async (data: ServicePayload) => {
  const { data: created, error } = await supabase
    .from("services")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return created;
};

/**
 * UPDATE service
 * (admin only – enforced by RLS)
 */
export const updateService = async (id: string, data: ServicePayload) => {
  const { data: updated, error } = await supabase
    .from("services")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return updated;
};

/**
 * DELETE service
 * (admin only – enforced by RLS)
 */
export const deleteService = async (id: string) => {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
};
