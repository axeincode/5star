export interface PromoData {
    group_id: number
    group_name: string
    list_data: Array<PromoListData>
}

export interface PromoListData {
    id: number
    name: string
    image: string
    type: number
    jump: string
    content: string
    is_show: boolean
}

export interface PromoGroupData {
    group_data: Array<PromoData>
}

export type GetPromoListResponse = {
    code: number | string
    data: PromoGroupData
    message: string
}