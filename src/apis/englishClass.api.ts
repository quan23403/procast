import { createClassType } from '~/components/CreateClassModal/CreateClassModal'
import { ModifyType } from '~/components/MofidyCourse/ModifyCourse'
import { englishClass } from '~/types/englishClass.type'
import { SuccessReponse } from '~/types/utils.type'
import http from '~/utils/http'
const englishClassApi = {
  getClass() {
    return http.get<SuccessReponse<englishClass[]>>('e/v1/all-courses')
  },
  createClass(body: createClassType) {
    return http.post('i/v1/new-course', body)
  },
  modifyClass(body: ModifyType) {
    return http.put('i/v1/fix-course-information', body)
  }
}
export default englishClassApi

export const deleteCourse = (id: string | number) => http.delete(`i/v1/delete-course?course_id=${id}`)

export const getMyCourse = () => http.get('i/v1/my-schedule')
