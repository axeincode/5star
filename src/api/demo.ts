
import { Network } from '@/net/Network'
import { NETWORK } from '@/net/NetworkCfg'

const network: Network = Network.getInstance()


interface AchievementSearchParams {
    page: number
    pagesize: number

}

export function getAchievementList (params: Partial<AchievementSearchParams>){
    return  network.commonGet( NETWORK.LOGIN.CLOUDFLARE_VERIFY, params)
}
export function login (data: Partial<AchievementSearchParams>){
    return  network.commonPost( NETWORK.LOGIN.CLOUDFLARE_VERIFY, data)
}