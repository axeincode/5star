export interface GetInvitaionBonusData {
    id: string
    content: string
    cash: string
}

export interface GetBettingCommissionData {
    id: string
    content: string
    cash: string
}

export interface StatisticsItem {
    today_deposited_user: number
    yesterday_deposited_user: number
    today_revenue: number
    yesterday_revenue: number
    this_month_deposited_user: number
    this_month_revenue: number
    total_registered_user: number
    total_depositing_user: number
    total_revenue: number
}