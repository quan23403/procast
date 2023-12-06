import { CourseClass, ScheduleParam } from "~/types/schedule.type"
import { SuccessReponse } from "~/types/utils.type"
import http from "~/utils/http"

const scheduleApi = {
    getSessions(params: ScheduleParam) {
      return http.get<SuccessReponse<CourseClass[]>>('i/v1/user-schedule', { params })
    },
  }
export default scheduleApi