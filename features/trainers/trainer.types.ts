export type Trainer = {
  id: string
  name: string
  specialty: string | null
  experience_years: number | null
  image_url: string | null
  is_active?: boolean
  created_at?: string
}
