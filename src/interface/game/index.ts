export interface Category {
    image: string
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
}

export interface GameEnterBody {
    id: any
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

export interface GameHistoryResponse {
    total_pages: number
    record: Array<GameHistoryItem>
}

export interface GameSearchResponse {
    list: Array<Search>
    total: number
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