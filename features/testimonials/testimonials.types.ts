// features/testimonials/testimonial.types.ts
export type Testimonial = {
  id: string
  client_name: string
  image_url: string | null
  review: string
  rating: number
  is_active: boolean
  created_at: string
}
