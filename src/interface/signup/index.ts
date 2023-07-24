export interface SignupRequestData {
    uid: string
    password: string
    referral_code: string
    browser: string
    device: string
    model: string
    brand: string
    imei: string
}

export type GetSignupResponseData = {
    code: number
    token: string
    message: string
}