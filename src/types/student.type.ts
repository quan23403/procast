export interface StudentCheckin {
  stuudent_id: number
  name: string
  dob: string
  note?: string
  checkIn: {
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

export interface StudentsInfo {
  student_id: number
  student_name: string
  dob: string
  email? : string
  phone? : string
  status?: string
}

export interface StudentParam {
  courseId: number,
  name: string,
  dob: string,
  email: string,
  phone: string
}