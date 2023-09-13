export interface TransactionHistoryItem {
    id: string
    created_at: number
    status: string
    type: number
    note: string
    amount: number
    balance: number
}

export interface TransactionHistoryResponse {
    total_pages: number
    record: Array<TransactionHistoryItem>
}

export type GetTransactionHistoryResponse = {
    code: number
    data: TransactionHistoryResponse
    message: string
}