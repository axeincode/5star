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
    accountDialogShow: false as boolean,
    depositBlurEffectShow: false as boolean,
    fixPositionEnable: false as boolean,
    headerBlurEffectShow: false as boolean,
    menuBlurEffectShow: false as boolean,
    depositHeaderBlurEffectShow: false as boolean,
    depositWithdrawToggle: false as boolean,
    bonusDashboardDialogVisible: false as boolean,
    activeAccountIndex: 0 as number,
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
    getOverlayScrimShow: (state) => state.overlayScrimShow,
    getAccountDialogShow: (state) => state.accountDialogShow,
    getDepositBlurEffectShow: (state) => state.depositBlurEffectShow,
    getFixPositionEnable: (state) => state.fixPositionEnable,
    getHeaderBlurEffectShow: (state) => state.headerBlurEffectShow,
    getMenuBlurEffectShow: (state) => state.menuBlurEffectShow,
    getDepositHeaderBlurEffectShow: (state) => state.depositHeaderBlurEffectShow,
    getDepositWithdrawToggle: (state) => state.depositWithdrawToggle,
    getBonusDashboardDialogVisible: (state) => state.bonusDashboardDialogVisible,
    getActiveAccountIndex: (state) => state.activeAccountIndex,
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
    },
    setAccountDialogShow(accountDialogShow: boolean) {
      this.accountDialogShow = accountDialogShow;
    },
    setDepositBlurEffectShow(depositBlurEffectShow: boolean) {
      this.depositBlurEffectShow = depositBlurEffectShow;
    },
    setFixPositionEnable(fixPositionEnable: boolean) {
      this.fixPositionEnable = fixPositionEnable;
    },
    setHeaderBlurEffectShow(headerBlurEffectShow: boolean) {
      this.headerBlurEffectShow = headerBlurEffectShow;
    },
    setMenuBlurEffectShow(menuBlurEffectShow: boolean) {
      this.menuBlurEffectShow = menuBlurEffectShow;
    },
    setDepositHeaderBlurEffectShow(depositHeaderBlurEffectShow: boolean) {
      this.depositHeaderBlurEffectShow = depositHeaderBlurEffectShow;
    },
    setDepositWithdrawToggle(depositWithdrawToggle: boolean) {
      this.depositWithdrawToggle = depositWithdrawToggle;
    },
    setBonusDashboardDialogVisible(bonusDashboardDialogVisible: boolean) {
      this.bonusDashboardDialogVisible = bonusDashboardDialogVisible;
    },
    setActiveAccountIndex(activeAccountIndex: number) {
      this.activeAccountIndex = activeAccountIndex;
    }
  }
})
