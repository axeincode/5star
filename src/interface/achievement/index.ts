export interface GetAchievementItem {
    achievement_progress: number
    achievement_explain: Array<explainItem>
    award_progress: number
    award_explain: Array<explainItem>
}

export interface explainItem {
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