import { defineStore } from 'pinia'

export const refferalStore = defineStore({
  id: 'refferal',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    refferalAppBarShow: true as boolean,
    refferalDialogVisible: false as boolean,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getRefferalAppBarShow: (state) => state.refferalAppBarShow,
    getRefferalDialogVisible: (state) => state.refferalDialogVisible,
  },
  actions: {
    setRefferalAppBarShow(refferalAppBarShow: boolean) {
      this.refferalAppBarShow = refferalAppBarShow;
    },
    setRefferalDialogShow(refferalDialogVisible: boolean) {
      this.refferalDialogVisible = refferalDialogVisible;
    }
  }
})
