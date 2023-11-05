import { User } from './user.type'
import { SuccessReponse } from './utils.type'

export type AuthResponse = SuccessReponse<{
  access_token: string
  expires: string
  user: User
}>
