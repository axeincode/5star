import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Banner from "@/interface/banner";
import { handleException } from './exception';

export const bannerStore = defineStore({
  id: 'banner',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    bannerList: [] as Array<Banner.GetBannerList>,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getBannerList: (state) => state.bannerList,
  },
  actions: {
    setSuccess(success: boolean) {
        this.success = success
    },
    setErrorMessage(message: string) {
        this.errMessage = message
    },

    setBannerList(bannerList: Array<Banner.GetBannerList>) {
        this.bannerList = bannerList;
    },

    async dispatchBannerList() {
        this.setSuccess(false);
        const route: string = NETWORK.Banner.BANNER_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Banner.GetBannerListResponse) => {
            if (response.code == 200) {
                this.setSuccess(true);
                this.setBannerList(response.data);
            } else {
                this.setErrorMessage(handleException(response.code));
            }
        }
        await network.sendMsg(route, {}, next, 1, 4);
    },
  }
})
