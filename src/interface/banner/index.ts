export interface GetBannerList {
    id:string
    image_path:string
    icon_path:string
    click_feedback:number
    content:string
}

export interface GetBannerListResponse{
    code: number
    data: Array<GetBannerList>
    message: string
}