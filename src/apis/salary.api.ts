import { salaryListConfig, PersonSalary } from '~/types/salary.type'
import { SuccessReponse } from '~/types/utils.type'
import http from '~/utils/http'

const salaryApi = {
  getSalary(params: salaryListConfig) {
    return http.get<SuccessReponse<PersonSalary[]>>('i/v1/salary-info', { params })
  },
  updateSalary(body: PersonSalary | null) {
    return http.put<SuccessReponse<PersonSalary>>('salary/update', body)
  }
}
export default salaryApi
