export interface Student {
  id: number
  name: string
  dob: string
  note?: string
  checkin: {
    class: string
    status: string
  }[]
  hw: {
    class: string
    status: string
  }[]
}
export interface studentList {
  studentList: Student[]
}
