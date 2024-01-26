export interface GetRewardCenterList {
    achievement: string	
    achievement_status: string
    cash_back: string
    cash_back_status: number
    week: string
    week_status: number
    vip_url: string
    level_up_url: string
    level_up_num: number
    invite_url: string
}

export interface GetRewardCenterListResponse{
    code: number
    data: GetRewardCenterList
    message: string
}