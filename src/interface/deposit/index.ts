export interface GetCurrencyItem {
    icon: string
    name: string
    value: number
}

export interface GetPaymentItem {
    id: string
    icon: string
    name: string
    description: string
    min: string | number
    max: string | number
}

export interface GetPixInfo {
    id: string
    first_name: string
    last_name: string
}

export interface GetDepositResponse {
    code: number
    data: any
    message: string
}

export interface DepositItem {
    id_number: string
    first_name: string
    last_name: string
    channels_id: string
    amount: string | number
}

export interface DepositHistoryItem {
    id: number
    created_at: number
    type: string
    amount: string
    status: number
    note: string
}

export interface DepositHistoryResponse {
    total_pages: number
    record: Array<DepositHistoryItem>
}

export interface SubmitDepositResponse {
    code: number
    data: any
    message: string
}

export type GetDepositHistoryResponse = {
    code: number
    data: DepositHistoryResponse
    message: string
}