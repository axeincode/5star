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

export interface VipInfo {
    level: number,
    deposit_exp: number,
    bet_exp: number,
    free_spin_times: number,
    week_gift: number,
    month_gift: number,
    upgrade_gift: number,
}

export interface VipLevel {
    level: number,
    protection_conditions: number,
    deposit_exp: number,
    bet_exp: number,
    free_spins_times: number,
    upgrade_award: number,
    week_award: number,
    month_award: number,
    free_withdrawals: number,
    free_withdrawals_times: number,
    withdrawal_fee: number,
    bet_award_rate: any,
    signin_award: Array<any>,
    tasks_max: number,
    deposit_rate: number,
    bet_rate: number,
    availabe_daily_bonus_time: string,
    collectable_week_bonus_day: string | number,
    collectable_month_bonus_day: string | number,
}

export interface VipTaskItem {
    index: number
    task_id: number
    task_type: number
    task_terms : {
        terms_id: number
        deposit: number
        bet: number
        game_type: string
        game_tag: string
        times: number
        multiplier: number
        game_win: number
    }
    state: number
    award: number
}

export type GetVipInfoResponse = {    
    code: number
    data: VipInfo
    message: string
}

export type GetVipLevelResponse = {
    code: number
    data: Array<VipLevel>
    message: string
}

export type GetVipTaskResponse = {
    code: number
    data: Array<VipTaskItem>
    message: string
}

export type GetVipLevelAwardResponse = {
    code: number
    data: any
    message: string
}