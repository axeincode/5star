import { defineStore } from 'pinia'
import { handleException } from './exception';

export const agentStore = defineStore({
  id: 'agent',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    agentNavBarToggle: false as boolean,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getAgentNavBarToggle: (state) => state.agentNavBarToggle,
  },
  actions: {
    setAgentNavBarToggle(agentNavBarToggle: boolean) {
      this.agentNavBarToggle = agentNavBarToggle;
    }
  }
})
