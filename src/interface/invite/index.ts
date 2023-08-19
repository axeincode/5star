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