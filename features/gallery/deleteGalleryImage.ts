import { supabase } from "@/lib/supabase/client";

export async function deleteGalleryImage(imageUrl: string) {
  // Extract file name from public URL
  const match = imageUrl.match(/media\/(.+)$/);
  if (!match) return;

  const filePath = match[1];

  const { error } = await supabase.storage
    .from("media")
    .remove([filePath]);

  if (error) {
    console.error("Storage delete failed:", error);
    throw error;
  }
}
