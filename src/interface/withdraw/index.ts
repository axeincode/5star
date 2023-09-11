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
export interface WithdrawalHistoryItem {
    id: number
    created_at: number
    type: string
    note: string
    status: number
    amount: string
    currency_type: string
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