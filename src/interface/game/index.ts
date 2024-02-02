export interface Category {
    image: string
    pictures: string
    game_count: string | number
    name: string
    slug: string
    games: Array<Search>
    page_no: number
}

export interface Search {
    id: number
    name: string
    image: string
    provider: string
    is_demo: boolean
}

export interface GameItem {
    id: number
    name: string
    image: string
    provider: string
    is_demo: boolean
}

export interface GameEnterBody {
    id: string | Array<string>
    demo: boolean
}

export interface GameUserBody {
    game_categories_slug: string
    page: number
    limit: number
}

export interface GameEnterResponse {
    method: string
    parames: string
    provider: string
    reserve: string
    weburl: string
}

export interface GameHistoryItem {
    name : string,
    created_at : number,
    amount : string | number,
    multiplier : string | number,
    bet_id : string | number,
    status : string | number,
    profit : number,
}

export interface GameBigWinItem {
    game_id: string
    game_name: string
    game_icon: string
    user_name: string
    user_vip_group: number
    user_vip_level: number
    bet_amount: string
    multiplier: string
    win_amount: string
    time: number
}

export interface GameBigWinData {
    high_rollers: Array<GameBigWinItem>
    lucky_bets: Array<GameBigWinItem>
}

export interface GameHistoryResponse {
    total_pages: number
    record: Array<GameHistoryItem>
}

export interface GameSearchResponse {
    list: Array<Search>
    total: number
}

export type GetGameFavoriteListResponse = {
    code: number
    data: Array<number | string>
    message: string
}

export type GetGameBigWinResponse = {
    code: number
    data: GameBigWinData
    message: string
}

export type GetGameCategoriesResponse = {
    code: number
    data: Array<Category>
    messsage: string
}

export type GetGameSearchResponse = {
    code: number
    data: GameSearchResponse
    message: string
}

export type GetGameEnterResponse = {
    code: number
    data: GameEnterResponse
    message: string
}

export type GetGameHistoryResponse = {
    code: number
    data: GameHistoryResponse
    message: string
}