import { supabase } from "@/lib/supabase/client";

export type GalleryCategory = "trainer" | "class" | "facility";

export interface GalleryPayload {
  image_url: string;
  category: GalleryCategory;
}

/**
 * CREATE gallery record
 * (Admin only – enforced by RLS)
 */
export const createGalleryImage = async (payload: GalleryPayload) => {
  const { data, error } = await supabase
    .from("media_gallery")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * GET all gallery images
 */
export const getGalleryImages = async () => {
  const { data, error } = await supabase
    .from("media_gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * DELETE gallery record
 * (Admin only – enforced by RLS)
 */
export const deleteGalleryRecord = async (id: string) => {
  const { error } = await supabase
    .from("media_gallery")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
};
