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

export interface GameEnterResponse {
    method: string
    parames: string
    provider: string
    reserve: string
    weburl: string
}

export interface GetGameCategoriesResponse {
    code: number
    data: Array<Category>
    messsage: string
}

export interface GetGameSearchResponse {
    code: number
    data: Array<Search>
    message: string
}

export interface GetGameEnterResponse {
    code: number
    data: GameEnterResponse
    message: string
}