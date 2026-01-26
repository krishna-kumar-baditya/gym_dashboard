// features/gallery/gallery.types.ts
export interface GalleryImage {
  id: string;
  image_url: string;
  category: "trainer" | "class" | "facility";
  created_at?: string;
}
