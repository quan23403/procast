import http from '~/utils/http'
import { AuthResponse } from '~/types/auth.type'

export const resgisterAccount = (body: {
  email: string
  user_name: string
  dob: string
  gender: string
  fullName: string
  password: string
}) => http.post<AuthResponse>('/e/v1/register', body)

export const login = (body: { email: string; password: string }) => http.post<AuthResponse>('/e/v1/login', body)

export const logout = () => http.post('/logout')

export const changePassword = (body: { old_password: string; new_password: string }) =>
  http.put('/i/v1/change-password', body)

export const validatePassword = (body: { email: string }) => http.post('e/v1/forgot-password', body)

export const validateEmailCode = (body: { email: string; digitCode: number }) => http.post('e/v1/send-digit', body)

export const setNewPassword = (body: { email: string; newPassword: string }) => http.post('e/v1/new-password', body)
