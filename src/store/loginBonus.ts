import { defineStore } from 'pinia'

export const loginBonusStore = defineStore({
  id: 'loginBonus',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    loginBonusDialogVisible: false as boolean,
    rouletteBonusDialogVisible: false as boolean,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getLoginBonusDialogVisible: (state) => state.loginBonusDialogVisible,
    getRouletteBonusDialogVisible: (state) => state.rouletteBonusDialogVisible,
  },
  actions: {
    setLoginBonusDialogVisible(loginBonusDialogVisible: boolean) {
      console.log(loginBonusDialogVisible)
      this.loginBonusDialogVisible = loginBonusDialogVisible;
    },
    setRouletteBonusDialogVisible(rouletteBonusDialogVisible: boolean) {
      this.rouletteBonusDialogVisible = rouletteBonusDialogVisible;
    }
  }
})
