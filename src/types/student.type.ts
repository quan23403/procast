export interface Student {
  id: number
  name: string
  dob: string
  note?: string
  checkin: {
    classId: number 
    status: string
  }[]
}
export interface studentList {
  studentList: Student[]
}
