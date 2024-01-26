import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Reward from "@/interface/reward";
import { handleException } from './exception';

export const rewardStore = defineStore({
  id: 'reward',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    
    rewardList: {} as Reward.GetRewardCenterList,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getRewardList: (state) => state.rewardList,
  },
  actions: {
    setSuccess(success: boolean) {
        this.success = success
    },
    setErrorMessage(message: string) {
        this.errMessage = message
    },
    setRewardList(rewardList: Reward.GetRewardCenterList) {
        this.rewardList = rewardList;
    },

    async dispatchRewardList() {
        this.setSuccess(false);
        const route: string = NETWORK.Reward.REWARD_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Reward.GetRewardCenterListResponse) => {
            if (response.code == 200) {
                this.setSuccess(true);
                this.setRewardList(response.data);
                console.log(response.data);
            } else {
                this.setErrorMessage(handleException(response.code));
            }
        }
        await network.sendMsg(route, {}, next, 1, 4);
    },
  }
})
