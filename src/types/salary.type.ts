import { faUnderline } from '@fortawesome/free-solid-svg-icons'

interface Salary {
  course_type: string
  course_type_id: number
  work_days: number
  price_each: number
  amount: number
}

export interface PersonSalary {
  userId: string
  user_name: string
  full_name: string
  gender: string
  job_position: string
  salary: Salary[]
}

export interface salaryList {
  salaryList: PersonSalary[]
}

export interface salaryListConfig {
  name?: string | undefined
  month?: string | undefined
  year?: string | undefined
}
