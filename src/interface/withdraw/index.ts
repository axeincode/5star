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
    email: string
    phone: string
    bank_name: string
    rfc: string
}

export interface WithdrawalHistoryItem {
    id: number
    created_at: number
    type: string
    note: string
    status: number
    amount: string
    currency_type: string
    currency: string
}

export interface SmsSendRequestForm {
    phone: string
}

export interface SmsSubmitRequestForm {
    phone: string
    code: string
}

export interface SmsSendResponseItem {
    remaining_time: string | number
}

export type GetSmsSendResponse = {
    code: number
    data: SmsSendResponseItem
    message: string
}

export type GetSmsSubmitResponse = {
    code: number
    message: string
}

export interface WithdrawalHistoryResponse {
    total_pages: number
    record: Array<WithdrawalHistoryItem>
}

export interface SubmitWithdrawResponse {
    code: number
    data: any
    message: string
}

export type GetWithdrawalHistoryResponse = {
    code: number
    data: WithdrawalHistoryResponse
    message: string
}