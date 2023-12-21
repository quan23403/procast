import { Dictionary } from 'lodash'
import http from '~/utils/http'
// i/v1/sort-role?job_position=Teacher
export interface employeeConfig {
  job_position?: string | undefined
}
export interface checkinParam {
  class_id: string,
  user_id: string
}
const employeeApi = {
  getSalary(params: employeeConfig) {
    return http.get('i/v1/sort-role', { params })
  },
  getCheckin(params: Dictionary<number |undefined>){
    return http.get('', params)
  },
  updateCheckin(params: checkinParam) {
    return http.post('', params)
  }
}
export default employeeApi
