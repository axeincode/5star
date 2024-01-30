import { defineStore } from 'pinia'
import { handleException } from './exception';
import type * as Promo from "@/interface/promo";
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";

export const promoStore = defineStore({
  id: 'promo',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    userActivityList: {
      group_data: [
        {
          group_id: 0,
          group_name: "",
          list_data: []
        }
      ]
    } as Promo.PromoGroupData,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getUserActivityList: (state) => state.userActivityList,
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setUserActivityList(activityList: any) {
      this.userActivityList = activityList
    },
    // user spin api
    async dispatchUserActivityList() {
      this.setSuccess(false);
      const route: string = NETWORK.ACTIVITY.USER_ACTIVITY_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: any) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setUserActivityList(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
  }
})
