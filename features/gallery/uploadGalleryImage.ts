import { supabase } from "@/lib/supabase/client";

export async function uploadGalleryImage(file: File) {
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, file, { upsert: false });

  if (error) {
    console.error("Upload failed:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("media")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
