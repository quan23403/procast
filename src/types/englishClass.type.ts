export interface englishClass {
  course_id: number
  course_name: string
  main_teacher: string
  room: number
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  study_days: string
  course_status: string
  total_sessions: number
  note?: string
}
// export interface englishCLassList {
//   englishClassList: englishClass[]
// }

export interface deleteClassId {
  course_id: string
}
