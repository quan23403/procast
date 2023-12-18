export interface StudentCheckin {
  student_id: number
  name: string
  dob: string
  note?: string
  checkin: {
    classId: number 
    status: string
    date?: string
  }[]
}

export interface CheckinParam {
  student_id: number
  class_id: number
  status: string
}