export interface PromoData {
    group_id: number
    group_name: string
    list_data: Array<PromoListData>
}

export interface PromoListData {
    id: number
    name: string
    image_path: string
    text: string
    desc: string
    countdown: boolean
    content: string
    click_feedback: number
    button_path: string
}

export interface PromoGroupData {
    group_data: Array<PromoData>
}

export type GetPromoListResponse = {
    code: number | string
    data: PromoGroupData
    message: string
}