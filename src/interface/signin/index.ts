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

export interface QuickRegisterRequestData {
  id_token: string
  type: number
  browser?: string
  device?: string
  model?: string
  brand?: string
  imei?: string
}

export interface QuickLoginRequestData {
  id_token: string
  type: number
}