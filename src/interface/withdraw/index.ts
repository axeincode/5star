export interface GetWithdrawResponse {
    code: number
    data: any
    message: string
}

export interface WithdrawItem {
    id_number: string
    first_name: string
    last_name: string
    channels_id: string
    amount: string | number
}

export interface SubmitWithdrawResponse {
    code: number
    data: any
    message: string
}