import { defineStore } from 'pinia'
import { handleException } from './exception';

export const loginBonusStore = defineStore({
  id: 'loginBonus',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    loginBonusDialogVisible: false as boolean,
    rouletteBonusDialogVisible: false as boolean,
    getBonusDialogVisible: false as boolean,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getLoginBonusDialogVisible: (state) => state.loginBonusDialogVisible,
    getRouletteBonusDialogVisible: (state) => state.rouletteBonusDialogVisible,
    getDepositAndBonusDialogVisible: (state) => state.getBonusDialogVisible,
  },
  actions: {
    setLoginBonusDialogVisible(loginBonusDialogVisible: boolean) {
      console.log(loginBonusDialogVisible)
      this.loginBonusDialogVisible = loginBonusDialogVisible;
    },
    setRouletteBonusDialogVisible(rouletteBonusDialogVisible: boolean) {
      this.rouletteBonusDialogVisible = rouletteBonusDialogVisible;
    },
    setGetBonusDialogVisible(getBonusDialogVisible: boolean) {
      this.getBonusDialogVisible = getBonusDialogVisible;
    }
  }
})
