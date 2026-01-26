export interface Service {
  id: string
  title: string
  description: string
  image_url?: string
  category?: string
  is_active: boolean
  created_at?: string
}

export interface ServicePayload {
  title: string
  description: string
  image_url?: string
  category?: string
  is_active: boolean
}
