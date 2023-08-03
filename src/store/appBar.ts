import { over } from 'lodash-es';
import { defineStore } from 'pinia'

export const appBarStore = defineStore({
  id: 'appBar',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    rightBarToggle: false as boolean,
    navBarToggle: true as boolean,
    cashDialogToggle: false as boolean,
    depositDialogToggle: false as boolean,
    withdrawDialogToggle: false as boolean,
    userNavBarToggle: false as boolean,
    mainBlurEffectShow: false as boolean,
    overlayScrimShow: false as boolean,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getRightBarToggle: (state) => state.rightBarToggle,
    getNavBarToggle: (state) => state.navBarToggle,
    getDepositDialogToggle: (state) => state.depositDialogToggle,
    getWithdrawDialogToggle: (state) => state.withdrawDialogToggle,
    getCashDialogToggle: (state) => state.cashDialogToggle,
    getUserNavBarToggle: (state) => state.userNavBarToggle,
    getMainBlurEffectShow: (state) => state.mainBlurEffectShow,
    getOverlayScrimShow: (state) => state.overlayScrimShow
  },
  actions: {
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setRightBarToggle(rightBarToggle: boolean) {
      this.rightBarToggle = rightBarToggle;
    },
    setNavBarToggle(navBarToggle: boolean) {
      this.navBarToggle = navBarToggle;
    },
    setDepositDialogToggle(depositDialogToggle: boolean) {
      this.depositDialogToggle = depositDialogToggle;
    },
    setWithdrawDialogToggle(withdrawDialogToggle: boolean) {
      this.withdrawDialogToggle = withdrawDialogToggle;
    },
    setCashDialogToggle(cashDialogToggle: boolean) {
      this.cashDialogToggle = cashDialogToggle;
    },
    setUserNavBarToggle(userNavBarToggle: boolean) {
      this.userNavBarToggle = userNavBarToggle
    },
    setMainBlurEffectShow(mainBlurEffectShow: boolean) {
      this.mainBlurEffectShow = mainBlurEffectShow;
    },
    setOverlayScrimShow(overlayScrimShow: boolean) {
      this.overlayScrimShow = overlayScrimShow;
    }
  }
})
