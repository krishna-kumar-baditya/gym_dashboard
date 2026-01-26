export type ServiceStatus = "active" | "inactive"

export interface Service {
  id: string
  title: string
  category: string | null
  description: string | null
  image_url: string | null
  status: ServiceStatus
  created_at: string
}
