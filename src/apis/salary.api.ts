import { salaryListConfig } from '~/types/salary.type'
import http from '~/utils/http'
const URL = 'salary'
const salaryApi = {
  getSalary(params: salaryListConfig) {
    return http.get(URL, { params })
  }
}
export default salaryApi
