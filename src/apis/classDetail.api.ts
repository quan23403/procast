import { Dictionary } from 'lodash'
import { classesList, sessionsUpdate, subsessionsParam } from '~/types/classLists.type'
import { englishClass } from '~/types/englishClass.type'
import { CheckinParam, StudentCheckin, StudentParam, StudentsInfo } from '~/types/student.type'
import { SuccessReponse } from '~/types/utils.type'
import http, { Http } from '~/utils/http'
export interface subsessionsResponse {
  class_id: string;
  start_time: string;
  end_time: string;
  date: string;
  room: string;
  ta_id: string;
  name?: string;
  ta?: { value: string, label: string }[];
}

const fakeData = {
  "data": [
    {
      "courseManagerId": 6,
      "studentId": 1,
      "remain": 99,
      "paymentStatus": "NOT DONE"
    },
    {
      "courseManagerId": 3,
      "studentId": 2,
      "remain": 2,
      "paymentStatus": "NOT DONE"
    },
    {
      "courseManagerId": 5,
      "studentId": 3,
      "remain": 0,
      "paymentStatus": "DONE"
    }
  ],
  "message": "Successful getting student payment status by course Id"
}

const classDeltailApi = {
  getClassDetail(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<englishClass>>('e/v1/class-info', { params })
  },
  getStudentCheckinList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<StudentCheckin[]>>('e/v1/student-check-in', { params })
  },
  getSessionList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<classesList[]>>('e/v1/course-sessions', { params })
  },
  postStudentCheckin(params: CheckinParam) {
    return http.post<SuccessReponse<StudentCheckin[]>>('e/v1/check-attendance-student', params)
  },

  updateStudentCheckin(params: CheckinParam) {
    return http.put<SuccessReponse<StudentCheckin[]>>('e/v1/fix-attendance-status', params)
  },
  getStudentList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<StudentsInfo[]>>('e/v1/students', { params })
  },
  addNewStudent(params: StudentParam) {
    return http.post('i/v1/add-student', params)
  },
  importStudentExcel(data: FormData, course_id: string | undefined) {
    const fileHttp = new Http('multipart/form-data').instance
    return fileHttp.post(`i/v1/insert-students?course_id=${course_id}`, data)
  },
  updateSession(params: sessionsUpdate) {
    return http.post('i/v1/note', params)
  },
  deleteStudent(params: { student_id: string, course_id: string }) {
    return http.delete('i/v1/delete-student', { data: params })
  },
  getSubsessionList(params: Dictionary<string | undefined>) {
    return http.get<SuccessReponse<subsessionsResponse[]>>('e/v1/get-sub-class', { params })
  },
  addNewSubsession(params: subsessionsParam) {
    return http.post('i/v1/add-sub-class', params)
  },
  deleteSubsession(params: { class_id: string }) {
    return http.delete('i/v1/delete-sub-class', { data: params })
  },
  getTuitionPayment() {
    return fakeData;
  }
}
export default classDeltailApi
