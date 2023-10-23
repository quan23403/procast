import { salaryList, salaryListConfig, PersonSalary } from '~/types/salary.type'
import { ResponseApi } from '~/types/utils.type'
import http from '~/utils/http'
const URL = 'salary'
const salaryApi = {
  getSalary(params: salaryListConfig) {
    return http.get<ResponseApi<salaryList>>(URL, { params })
  },
  updateSalary(body: PersonSalary | null) {
    return http.put<ResponseApi<PersonSalary>>('salary/update', body)
  }
}
export default salaryApi
