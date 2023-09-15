import http from 'src/utils/http'
import { AuthResponse } from '~/types/auth.type'
export const resgisterAccount = (body: { email: string; username: string; password: string }) =>
  http.post<AuthResponse>('/register', body)
