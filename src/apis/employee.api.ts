import { AxiosResponse } from 'axios'
import { Dictionary } from 'lodash'
import http from '~/utils/http'
// i/v1/sort-role?job_position=Teacher
export interface employeeConfig {
  job_position?: string | undefined
}
export interface checkinParam {
  course_id: string,
    class_id: number,
    course_type_id: string
}
export interface checkinData {
  classId: string,
  userId: string,
  checkInTime: string,
  status: string
}
const employeeApi = {
  getSalary(params: employeeConfig) {
    return http.get('i/v1/sort-role', { params })
  },
  getCheckin(params: Dictionary<string |undefined>){
    return http.get<AxiosResponse<checkinData[]>>('i/v1/check-in-history', {params})
  },
  updateCheckin(params: checkinParam) {
    return http.post('i/v1/check-in-class', params)
  }
}
export default employeeApi