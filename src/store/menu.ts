import { defineStore } from 'pinia'
import { handleException } from './exception';

export const menuStore = defineStore({
  id: 'mobile_menu',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    selectedItem: 'Promo' as string,
    semiCircleShow: false as boolean,
    rewardNavShow: false as boolean,
    homeMenuBtnClicked: false as boolean,
    circleMenuBtnClicked: false as boolean,
    selectedCircleItem: '' as string,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getSelectedItem: (state) => state.selectedItem,
    getSemiCircleShow: (state) => state.semiCircleShow,
    getRewardNavShow: (state) => state.rewardNavShow,
    getHomeMenuBtnClicked: (state) => state.homeMenuBtnClicked,
    getCircleMenuBtnClicked: (state) => state.circleMenuBtnClicked,
    getSelectedCircleItem: (state) => state.selectedCircleItem
  },
  actions: {
    setSelectedItem(selectedItem: string) {
      this.selectedItem = selectedItem;
    },
    setSemiCircleShow(semiCircleShow: boolean) {
      this.semiCircleShow = semiCircleShow;
    },
    setRewardNavShow(rewardNavShow: boolean) {
      this.rewardNavShow = rewardNavShow;
    },
    setHomeMenuBtnClicked(homeMenuBtnClicked: boolean) {
      this.homeMenuBtnClicked = homeMenuBtnClicked
    },
    setCircleMenuBtnClicked(circleMenuBtnClicked: boolean) {
      this.circleMenuBtnClicked = circleMenuBtnClicked;
    },
    setSelectedCircleItem(selectedCircleItem: string) {
      this.selectedCircleItem = selectedCircleItem
    }
  }
})
