import { englishClass } from '~/types/englishClass.type'
import { SuccessReponse } from '~/types/utils.type'
import http from '~/utils/http'
const URL = 'e/v1/all-courses'
const englishClassApi = {
  getClass() {
    return http.get<SuccessReponse<englishClass[]>>(URL)
  },
  createClass(body: Omit<englishClass, 'course_id'>) {
    return http.post<SuccessReponse<englishClass>>('classList/add', body)
  }
}
export default englishClassApi
