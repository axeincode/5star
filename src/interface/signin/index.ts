export interface SigninRequestData {
  uid: string
  password: string
}
export interface authRequestData {
}
export type GetSigninResponseData = {
  code: number
  token: string
  message: string
}