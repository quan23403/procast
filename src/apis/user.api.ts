import { updateProfile } from '~/pages/User/pages/Profile/Profile'
import http from '~/utils/http'

const userApi = {
  updateProfile(body: updateProfile) {
    return http.put('i/v1/modify-user-info', body)
  }
}
export default userApi
