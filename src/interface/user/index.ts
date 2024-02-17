export interface GetUserInfo {
    uid: string
    name: string
    avatar: string
    first_name: string
    last_name: string
    id: number | string
    id_number: string
    email: string
    email_confirmd: false,
    phone: string
    phone_confirmd: false,
    date_of_birth: string
    county: string
    state: string
    city: string
    address: string
    postal_code: string
    language: string
    locale: string
    initial_profile_complete: false,
    is_supended: 0,
    sys_communications: false,
    locked_personal_info_fields: Array<string>,
    create_at: number
}
export interface GetUserAmount {
    amount: number,
    currency: {
        fiat: true,
        name: string,
        symbol: string,
        type: string,
    },
    withdraw: 111111,
    rate: 1000
}
export interface UpdateEmail {
    email: string
    password: string
}
export interface UpdatePassword {
    now_password: string
    new_password: string
}
export interface GetUserBalance {
    amount: number,
    currency: string,
    availabe_balance: number,
    real: number | string,
    bonus: number | string
}
export interface UpdateSuspendUser {
    time: number
}
export type GetUserInfoResponseData = {
    code: number
    data: GetUserInfo
    message: string
}
export type GetUserBalanceResponseData = {
    code: number
    data: GetUserBalance
    message: string
}
export type GetUserEmailVerifyResponseData = {
    code: number
    time: number
    message: string
}
export type GetUserAmountResponseData = {
    code: number
    data: GetUserAmount
    message: string
}