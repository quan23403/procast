
export interface classesList {
  class_id: number
  type_class: number
  date: string | Date
  start_time: string
  end_time: string
  room?: string
  note?: string
  name?: string
  assistant?: string[]
}

export interface sessionsUpdate {
  class_id: number
  date?: string | Date
  start_time?: string
  end_time?: string
  room?: string
  note?: string
  assistant?: string[]
}