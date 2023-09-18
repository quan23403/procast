import axios, { AxiosError } from 'axios'
import HttpStatusCode from '~/constants/httpStatusCode.enum'
//type predicate function
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntity(error: unknown) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
