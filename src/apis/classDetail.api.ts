import { Dictionary } from 'lodash'
import { classesList } from '~/types/classLists.type'
import { englishClass } from '~/types/englishClass.type'
import { CheckinParam, StudentCheckin, StudentsInfo} from '~/types/student.type'
import { SuccessReponse } from '~/types/utils.type'
import http from '~/utils/http'

const classDeltailApi = {
  getClassDetail(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<englishClass>>('e/v1/class-info', { params })
  },
  getStudentCheckinList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<StudentCheckin[]>>('e/v1/student-check-in', {params})
  },
  getSessionList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<classesList[]>>('e/v1/course-sessions', {params})
  },
  postStudentCheckin(params: CheckinParam) {
    return http.post<SuccessReponse<StudentCheckin[]>>('e/v1/check-attendance-student', {params})
  },

  updateStudentCheckin(params: CheckinParam) {
    return http.put<SuccessReponse<StudentCheckin[]>>('e/v1/fix-attendance-status', {params})
  },
  getStudentList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<StudentsInfo[]>>('e/v1/students', {params})
  },
}
export default classDeltailApi
