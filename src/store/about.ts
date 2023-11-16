import { defineStore } from 'pinia'
import { handleException } from './exception';

export const aboutStore = defineStore({
  id: 'about_us',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    activeAboutIndex: 0 as number,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getActiveAboutIndex: (state) => state.activeAboutIndex,
  },
  actions: {
    setActiveAboutIndex(activeAboutIndex: number) {
      this.activeAboutIndex = activeAboutIndex;
    }
  }
})
