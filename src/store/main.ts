import { defineStore } from 'pinia'
import { handleException } from './exception';

export const mainStore = defineStore({
  id: 'main',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    searchDialogShow: false as boolean,
    casinoGameShow: false as boolean
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getSearchDialogShow: (state) => state.searchDialogShow,
    getCasinoGameShow: (state) => state.casinoGameShow,
  },
  actions: {
    setSearchDialogShow(searchDialogShow: boolean) {
      this.searchDialogShow = searchDialogShow;
    },
    setCasinoGameShow(casinoGameShow: boolean) {
      this.casinoGameShow = casinoGameShow;
    }
  }
})
