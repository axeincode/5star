import { defineStore } from 'pinia'
import { handleException } from './exception';
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import moment from "moment-timezone";

export const mainStore = defineStore({
  id: 'main',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    searchDialogShow: false as boolean,
    casinoGameShow: false as boolean,
    timeunixDvalue: 0 as number,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getSearchDialogShow: (state) => state.searchDialogShow,
    getCasinoGameShow: (state) => state.casinoGameShow,
    getTimeunixDvalue: (state) => state.timeunixDvalue,
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setSearchDialogShow(searchDialogShow: boolean) {
      this.searchDialogShow = searchDialogShow;
    },
    setCasinoGameShow(casinoGameShow: boolean) {
      this.casinoGameShow = casinoGameShow;
    },
    setTimeunix(data: any) {
      const { now_time } = data;
      // 当前时间
      const nowData = Math.ceil(moment().valueOf() / 1000)
      if(now_time) {
        this.timeunixDvalue = nowData - now_time
      }
    },
    // 获取服务器时间戳
    async dispatchTimeunix() {
      const route: string = NETWORK.COMMON.SERVER_TIMESTAMP;
      const network: Network = Network.getInstance();

      const next = (response: any) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setTimeunix(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    }
  }
})
