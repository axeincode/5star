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

export interface GetInviteResponse {
    code: number
    data: InviteData
    message: string
}