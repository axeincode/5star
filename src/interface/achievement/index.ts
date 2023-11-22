export interface GetAchievementItem {
    achievement_progress: number
    achievement_explain: Array<ExplainItem>
    award_progress: number
    award_explain: Array<ExplainItem>
}

export interface ExplainItem {
    index: number | string
    num: number | string
    award: number | string
    state: number | string
}

export type GetAchievementResponse = {
    code: number
    data: GetAchievementItem
    message: string
}