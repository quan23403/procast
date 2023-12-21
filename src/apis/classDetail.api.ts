import { Dictionary } from 'lodash'
import { classesList, sessionsUpdate } from '~/types/classLists.type'
import { englishClass } from '~/types/englishClass.type'
import { CheckinParam, StudentCheckin, StudentParam, StudentsInfo} from '~/types/student.type'
import { SuccessReponse } from '~/types/utils.type'
import http, {Http} from '~/utils/http'

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
  addNewStudent(params: StudentParam) {
    return http.post('i/v1/add-student', params)
  },
  importStudentExcel(data: FormData, course_id: string|undefined) {
    const fileHttp = new Http('multipart/form-data').instance
    return fileHttp.post(`i/v1/insert-students?course_id=${course_id}`, data)
  },
  updateSession(params: sessionsUpdate) {
    return http.post('i/v1/note', params)
  },
}
export default classDeltailApi
