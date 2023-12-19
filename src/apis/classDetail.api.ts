import { Dictionary } from 'lodash'
import { classesList } from '~/types/classLists.type'
import { englishClass } from '~/types/englishClass.type'
import { CheckinParam, StudentCheckin} from '~/types/student.type'
import { SuccessReponse } from '~/types/utils.type'
import http from '~/utils/http'

const classDeltailApi = {
  getClassDetail(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<englishClass>>('e/v1/class-info', { params })
  },
  getStudentCheckinList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<StudentCheckin[]>>('e/v1/course-sessions', {params})
  },
  getSessionList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<classesList[]>>('e/v1/', {params})
  },
  postStudentCheckin(params: CheckinParam) {
    return http.post<SuccessReponse<StudentCheckin[]>>('v1/check-attendance-student', {params})
  },

  updateStudentCheckin(params: CheckinParam) {
    return http.put<SuccessReponse<StudentCheckin[]>>('fix-attendance-status', {params})
  }
}
export default classDeltailApi
