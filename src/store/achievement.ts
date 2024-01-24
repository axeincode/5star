import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import * as Achievement from "@/interface/achievement";
import { handleException } from './exception';

export const achievementStore = defineStore({
  id: 'achievement',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    achievementItem: {
      achievement_progress: 0,
      achievement_explain: [],
      award_progress: 0,
      award_explain: [],
      rate: 0,
    } as Achievement.GetAchievementItem,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getAchievementItem: (state) => state.achievementItem,
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setAchievementItem(achievementItem: Achievement.GetAchievementItem) {
      this.achievementItem = achievementItem;
    },
    // get achievement item
    async dispatchAchievementList() {
      this.setSuccess(false);
      const route: string = NETWORK.ACHIEVEMENT_PAGE.ACHIEVEMENT_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Achievement.GetAchievementResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setAchievementItem(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    // get achievement config
    async dispatchAchievementConfig() {
      this.setSuccess(false);
      const route: string = NETWORK.ACHIEVEMENT_PAGE.ACHIEVEMENT_CONFIG;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Achievement.GetAchievementResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setAchievementItem(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // get achievement item
    async dispatchStageAward(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.ACHIEVEMENT_PAGE.STAGE_AWARD;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Achievement.GetAchievementResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // get achievement item
    async dispatchAchievementAward(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.ACHIEVEMENT_PAGE.ACHIEVEMENT_AWARD;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Achievement.GetAchievementResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
  }
})
