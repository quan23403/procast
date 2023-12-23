interface Salary {
  payroll_id: number
  work_days: number
  amount: number
}
interface Config {
  payroll_id: number
  payroll_rate: number
  course_type: string
}

export interface ModifySalaryConfiguration {
  user_id: string
  salary: Config[]
}
export interface PersonSalary {
  user_id: string
  user_name: string
  full_name: string
  gender: string
  job_position: string
  salary_config: Config[]
  salary: Salary[]
}

export interface salaryList {
  salaryList: PersonSalary[]
}

export interface salaryListConfig {
  username?: string | undefined
  month?: string | undefined
  year?: string | undefined
}
