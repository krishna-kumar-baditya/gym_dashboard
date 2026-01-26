export type Trainer = {
  id: string
  name: string
  image_url: string | null
  specialty: string | null
  experience_years: number | null
  social_links: {
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
  } | null
  is_active: boolean
  created_at: string
}
