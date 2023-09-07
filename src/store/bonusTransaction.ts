import { defineStore } from 'pinia'
import { handleException } from './exception';

export const bonusTransactionStore = defineStore({
  id: 'bonusTransaction',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    bonusTabIndex: 0 as number,
    transactionTab: '' as string,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getBonusTabIndex: (state) => state.bonusTabIndex,
    getTransactionTab: (state) => state.transactionTab,
  },
  actions: {
    setBonusTabIndex(bonusTabIndex: number) {
      this.bonusTabIndex = bonusTabIndex;
    },
    setTransactionTab(transactionTab: string) {
      console.log(transactionTab);
      this.transactionTab = transactionTab;
    }
  }
})
