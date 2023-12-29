
export interface classesList {
  class_id: number
  type_class?: string
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
  class_id: number | string
  date?: string | Date
  startTime?: string
  endTime?: string
  room?:  number
  note?: string
  assistant?: string[]
  check?: boolean
}

export interface subsessionsParam {
  course_id: number,
  start_time: string,
  end_time: string,
  date: string | Date,
  room: number,
  ta_id: string
}
