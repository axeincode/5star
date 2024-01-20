export interface GetAchievementItem {
    achievement_progress: number
    achievement_explain: Array<ExplainItem>
    award_progress: number
    award_explain: Array<ExplainItem>
    rate: number
}

export interface ExplainItem {
    index: number
    num: number
    award: number
    status: number
    rate: number
}

export type GetAchievementResponse = {
    code: number
    data: GetAchievementItem
    message: string
}