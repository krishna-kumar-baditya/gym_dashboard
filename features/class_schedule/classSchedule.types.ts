export type ClassSchedule = {
  id: string
  class_name: string
  day: string
  time: string // "09:00:00"
  trainer_id: string | null
  trainer?: {
    name: string
  }
  description: string | null
  is_active: boolean
  created_at: string
}
