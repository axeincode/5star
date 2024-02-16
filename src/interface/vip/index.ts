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
    level: number
    deposit_exp: number
    bet_exp: number
    rank_bet_exp: number
    rank_deposit_exp: number
    free_spin_times: number
    week_gift: number
    month_gift: number
    upgrade_gift: number
    now_cash_back: number
    yesterday_cash_back: number
    history_cash_back: number
}

export interface VipLevel {
    level: number,
    rank_id: number,
    protection_conditions: number,
    deposit_exp: number,
    bet_exp: number,
    free_spins_times: number,
    uprank_award: number,
    week_award: number,
    withdrawals_amonut: number,
    withdrawal_times: number,
    month_withdrawals_amount: number,
    month_withdrawals_times: number,
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
    task_terms: {
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

export interface VipRebateHistoryItem {
    notes_id: string | number
    created_at: string | number
    amount: string | number
    cash_back: string | number
    vip_level: string | number
    vip_rate: string | number
    game_type: string
}

export interface VipRebateHistoryData {
    total: number
    list: Array<VipRebateHistoryItem>
}

export interface VipRebateHistoryRequest {
    page_num: number
    page_size: number
    start_time: number
}


export interface VipLevelRewardHistoryItem {
    notes_id: string | number
    created_at: string | number
    amount: string | number
    vip_level: string | number
    type: string
}

export interface VipLevelRewardHistoryData {
    total: number
    list: Array<VipLevelRewardHistoryItem>
}

export interface VipLevelRewardHistoryRequest {
    page_num: number
    page_size: number
    start_time: number
}


export interface VipTimesHistoryItem {
    notes_id: string | number
    created_at: string | number
    amount: string | number
    vip_level: string | number
    type: string
}

export interface VipTimesHistoryData {
    total: number
    list: Array<VipTimesHistoryItem>
}

export interface VipTimesHistoryRequest {
    index: number
    page_num: number
    page_size: number
    start_time: number
}

export interface VipSignInData {
    award: Array<string | number>
    signin_day: number
    is_signin: number
    limited_bet: number
    limited_deposit: number
    vip_level: number
}

export interface VipLevelUpListData {
    level: number
    upgreadegift : number
    upgrade_award : number
}

export interface VipLevelUpReceiveData {
    win_award: number
    lose_award : Array<number>
}

export type GetVipLevelUpListResponse = {
    code: number
    data: VipLevelUpListData
    message: string
}

export type GetVipLevelUpReceiveResponse = {
    code: number
    data: VipLevelUpReceiveData
    message: string
}

export type GetVipSignInResponse = {
    code: number
    data: VipSignInData
    message: string
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

export type GetVipRebateAwardResponse = {
    code: number
    data: any
    message: string
}

export type GetVipRebateHistoryResponse = {
    code: number
    data: VipRebateHistoryData
    message: string
}

export type GetVipLevelRewardHistoryResponse = {
    code: number
    data: VipLevelRewardHistoryData,
    message: string
}

export type GetVipTimesHistoryResponse = {
    code: number
    data: VipTimesHistoryData
    message: string
}

export type VipCycleawardListData = {
    membership_day_gift: number
    day_gift: number
    week_gift: number
    month_gift: number
}

export type VipCycleawardReceiveRequest = {
    type: number
}

export type VipLevelAwardData = {
    level_up_num: number
    level: number
    upgrade_gift: number
    rank_up_num: number
    rank: number
    uprank_gift: number
}

export type VipLevelAwardReceiveRequest = {
    type: number
}

export type vipBetawardListData = {
    now_cash_back: string
    yesterday_cash_back: string
    history_cash_back: string
}

export type VipBetawardReceiveRequest = {
    type: number
}

export type SuccessMessageParams = {
    message: string
    type: number
}