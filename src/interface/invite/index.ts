export interface InviteData {
    invite_code: string
    web_invite_url: string
    invited_users: string | number
    deposit_users: string | number
    bonus_today: string | number
    bonus_yesterdays: string | number
    goals_monthly: string | number
    achievement_progress: string | number
    achievement_explain: Array<any>
    bonus_total: string | number
    bonus_users_total: string | number
}

export interface InviteHistoryFormData {
    index: number
    page: number
    first_time: string
    last_time: string
}

export interface InviteHistoryData {
    total_pages: number
    list: Array<InviteHistoryItem>
}

export interface InviteHistoryItem {
    time: number | string
    user: string
    bonus: number | string
}

export interface StatisticsData {
    today_profit: StatisticsItem
    week_profit: StatisticsItem
    month_profit: StatisticsItem
    receive_profit: number | string
}

export interface StatisticsItem {
    register_user: Array<number | string>
    drposit_user: Array<number | string>
    deposit_bonus: number | string
    deposit_amount: Array<number | string>
    bet_amount: Array<number | string>
    bet_bonus: Array<number | string>
    achievement_award: number | string
}

export interface PersonalInvitationInformation {
    total_profit: string | number
    invitation_bonus: string | number
    bettion_commission: string | number
    achievement_bonus: string | number
    deposited_users: string | number
    profit_today: {
        profit: string | number
        bettion_commission: string | number
        invite_bonus: string | number
    }
    profit_week: {
        profit: string | number
        bettion_commission: string | number
        invite_bonus: string | number
    }
    profit_month: {
        profit: string | number
        bettion_commission: string | number
        invite_bonus: string | number
    }
}

export interface InviteHistoryConfig {
    list: Array<any>
}

export type GetStatisticsResponse = {
    code: number
    data: StatisticsData
    message: string
}

export type InviteHistoryResponse = {
    code: number
    data: InviteHistoryData
    message: string
}

export interface GetInviteResponse {
    code: number
    data: InviteData
    message: string
}

export interface GetInviteSelfResponse {
    code: number
    data: PersonalInvitationInformation
    message: string
}

export interface GetInviteHistoryResponse {
    code: number
    data: InviteHistoryConfig
    message: string
}