import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import * as Bonus from "@/interface/bonus";
import { handleException } from './exception';

export const bonusStore = defineStore({
  id: 'bonus',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    bonusList: {
      list: []
    } as Bonus.GetBonusList,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getBonusList: (state) => state.bonusList,
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setBonusList(bonusList: Bonus.GetBonusList) {
        this.bonusList = bonusList;
    },
    // user bonus
    async dispatchUserBonus() {
      this.setSuccess(false);
      const route: string = NETWORK.BONUS_PAGE.USER_BONUS;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Bonus.GetUserBonusResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setBonusList(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    // bonus cancel
    async dispatchBonusCancel(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.BONUS_PAGE.BONUS_CANCEL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: any) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
  }
})
