import http from '~/utils/http'
// i/v1/sort-role?job_position=Teacher
export interface employeeConfig {
  job_position?: string | undefined
}
const employeeApi = {
  getSalary(params: employeeConfig) {
    return http.get('i/v1/sort-role', { params })
  }
}
export default employeeApi
