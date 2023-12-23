import { salaryListConfig, PersonSalary, ModifySalaryConfiguration } from '~/types/salary.type'
import { SuccessReponse } from '~/types/utils.type'
import http from '~/utils/http'

const salaryApi = {
  getSalary(params: salaryListConfig) {
    return http.get<SuccessReponse<PersonSalary[]>>('i/v1/salary-info', { params })
  },
  updateSalary(body: ModifySalaryConfiguration) {
    return http.put<SuccessReponse<PersonSalary>>('i/v1/modify-salary-configuration', body)
  }
}
export default salaryApi
