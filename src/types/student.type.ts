export interface StudentCheckin {
  id: number
  name: string
  dob: string
  note?: string
  checkin: {
    classId: number 
    status: string
    date?: string
  }[]
}
