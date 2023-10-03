interface Salary {
  course_type: string
  work_dates: number
  price_each: number
  amount: number
}

export interface PersonSalary {
  userId: string
  userName: string
  fullName: string
  gender: string
  jobPosition: string
  salary: Salary[]
}

export interface salaryList {
  salaryList: PersonSalary[]
}

export interface salaryListConfig {
  user?: string
  name?: string
  date?: string
}
