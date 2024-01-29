export interface GetRewardCenterList {
    achievement: string	
    achievement_status: number
    cash_back: string
    week: string
    level_up_num: number
}

export interface GetRewardCenterListResponse{
    code: number
    data: GetRewardCenterList
    message: string
}

export interface GetBonusResponse{
    code:number
    data:any
    message:string
}