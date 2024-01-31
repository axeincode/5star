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
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getSelectedItem: (state) => state.selectedItem,
    getSemiCircleShow: (state) => state.semiCircleShow,
    getRewardNavShow: (state) => state.rewardNavShow
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
    }
  }
})
