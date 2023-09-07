import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Vip from "@/interface/vip";
import { handleException } from './exception';

export const vipStore = defineStore({
    id: 'vip',
    state: () => ({
        success: false as boolean,
        errMessage: '' as string,
        vipInfo: {} as Vip.VipInfo,
        vipLevels: [] as Array<Vip.VipLevel>
    }),
    getters: {
        getSuccess: (state) => state.success,
        getErrMessage: (state) => state.errMessage,
        getVipInfo: (state) => state.vipInfo,
        getVipLevels: (state) => state.vipLevels
    },
    actions: {
        // set functions
        setSuccess(success: boolean) {
            this.success = success
        },
        setErrorMessage(message: string) {
            this.errMessage = message
        },
        setVipInfo(vipInfo: Vip.VipInfo) {
            this.vipInfo = vipInfo;
        },
        setVipLevels(vipLevels: Array<Vip.VipLevel>) {
            this.vipLevels = vipLevels;
        },
        // user vip information api
        async dispatchVipInfo() {
            this.setSuccess(false);
            const route: string = NETWORK.VIP_INFO.USER_VIP_INFO;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Vip.GetVipInfoResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setVipInfo(response.data);
                } else {
                    this.setErrorMessage(handleException(response.code));
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        },
        // user vip level api
        async dispatchVipLevels() {
            this.setSuccess(false);
            const route: string = NETWORK.VIP_INFO.USER_VIP_LEVEL;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Vip.GetVipLevelResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setVipLevels(response.data);
                } else {
                    this.setErrorMessage(handleException(response.code));
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        },
    }
})