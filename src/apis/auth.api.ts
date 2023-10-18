import http from '~/utils/http'
import { AuthResponse } from '~/types/auth.type'
export const resgisterAccount = (body: { email: string; username: string; dateOfBirth: string; password: string }) =>
  http.post<AuthResponse>('/register', body)

export const login = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)

export const logout = () => http.post('/logout')
