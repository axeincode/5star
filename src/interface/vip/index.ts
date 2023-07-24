export interface GetVIPData {
    id: number
    totalDepositAmount: number
    currentDepositAmount: number
    totalWagerAmount: number
    currentWagerAmount: number
    vipGrade: string
    vipRate: number
}

export interface GetSpinData {
    id: number
    image: any
    title: string
    content: string
}

export interface GetRouletteHistory {
    id: number
    rouletteTime: string
    user: string
    rouletteResult: string
}