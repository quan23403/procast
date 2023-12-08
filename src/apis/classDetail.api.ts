import { Dictionary } from 'lodash'
import { englishClass } from '~/types/englishClass.type'
import { SuccessReponse } from '~/types/utils.type'
import http from '~/utils/http'

const classDeltailApi = {
  getClassDetail(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<englishClass>>('e/v1/class-info', { params })
  }
}
export default classDeltailApi
