/** The response data of all api interfaces should comply with this format */
interface ApiResponseData<T> {
  code: number
  data: T
  message: string
}