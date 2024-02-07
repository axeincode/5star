export interface GetCurrencyBalanceList {
    amount:string
    availabe_balance:string
    real:string
    bonus:string
    currency:string
}

export interface GetCurrencyBalanceListResponse{
    code: number
    data: Array<GetCurrencyBalanceList>
    message: string
}