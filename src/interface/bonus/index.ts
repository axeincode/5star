export interface GetBonusData {
    type: string
    rate: number
    currentCash: string
    totalCash: string
    restCash: string
    bonusCash: string
    expireDate: string
}

export interface BonusItem {
    type: number
    status: number
    now: string
    max: string
    ended_at: number
    created_at: number
    gain_amount: string
    currency: string
    receive: number
    wager: number
    rate: number
    deposit: string
    id: string | number
    children: any
}

export interface GetBonusList {
    list:  Array<BonusItem>
}

export type GetUserBonusResponse = {
    code: number
    data: GetBonusList
    message: string
}