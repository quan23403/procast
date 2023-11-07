import { englishCLassList, englishClass } from '~/types/englishClass.type'
import { SuccessReponse } from '~/types/utils.type'
import http from '~/utils/http'
const URL = 'classList'
const englishClassApi = {
  getClass() {
    return http.get<SuccessReponse<englishCLassList>>(URL)
  },
  createClass(body: englishClass | null) {
    return http.post<SuccessReponse<englishClass>>('classList/add', body)
  }
}
export default englishClassApi
