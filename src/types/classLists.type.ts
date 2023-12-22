
export interface classesList {
  class_id: number
  type_class: string
  date: string | Date
  start_time: string
  end_time: string
  room?: number
  note?: string
  name?: string
  assistant?: string[]
  ta? : {
    label: string,
    value: string
  }[]
}

export interface sessionsUpdate {
  class_id: number
  date?: string | Date
  startTime?: string
  endTime?: string
  room?:  number
  note?: string
  assistant?: string[]
  check?: boolean
}