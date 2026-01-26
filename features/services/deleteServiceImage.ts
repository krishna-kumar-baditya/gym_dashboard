import { supabase } from "@/lib/supabase/client";

export async function deleteServiceImage(imageUrl: string) {
  if (!imageUrl) return;

  // Extract after `/services/`
  const match = imageUrl.match(/services\/(.+)$/);
  if (!match || !match[1]) return;

  const filePath = match[1];

  const { error } = await supabase.storage
    .from("services")
    .remove([filePath]);

  if (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
}
