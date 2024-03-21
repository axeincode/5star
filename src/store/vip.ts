import { defineStore } from 'pinia'
import { i18n } from "@/locale/index";
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Vip from "@/interface/vip";
import { handleException } from './exception';
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from "@/components/global/notification/WarningIcon.vue";

export const vipStore = defineStore({
  id: 'vip',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    levelUpDialogVisible: false as boolean,
    vipInfo: {} as Vip.VipInfo,
    vipLevels: [] as Array<Vip.VipLevel>,
    vipTasks: [] as Array<Vip.VipTaskItem>,
    vipRebateHistory: {
      total: 0,
      list: []
    } as Vip.VipRebateHistoryData,
    vipLevelRewardHistory: {
      total: 0,
      list: []
    } as Vip.VipLevelRewardHistoryData,
    vipTimesHistory: {
      total: 0,
      list: []
    } as Vip.VipTimesHistoryData,
    vipSignIn: {
      award: [],
      signin_day: 0,
      is_signin: 0,
      limited_bet: 0,
      limited_deposit: 0,
      vip_level: 0,
    } as Vip.VipSignInData,
    vipLevelUpList: {} as Vip.VipLevelUpListData,
    vipLevelUpReceive: {} as Vip.VipLevelUpReceiveData,
    vipNavBarToggle: '' as string,
    vipCycleawardList: {} as Vip.VipCycleawardListData,
    vipLevelAward: {} as Vip.VipLevelAwardData,
    vipBetawardList: {} as Vip.vipBetawardListData,
    vipSigninHistoryList: {
      total: 0,
      list: []
    } as Vip.VipSigninHistoryData
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getVipInfo: (state) => state.vipInfo,
    getVipLevels: (state) => state.vipLevels,
    getVipTasks: (state) => state.vipTasks,
    getVipRebateHistory: (state) => state.vipRebateHistory,
    getVipLevelRewardHistory: (state) => state.vipLevelRewardHistory,
    getVipTimesHistory: (state) => state.vipTimesHistory,
    getVipSignIn: (state) => state.vipSignIn,
    getLevelUpDialogVisible: (state) => state.levelUpDialogVisible,
    getVipLevelUpList: (state) => state.vipLevelUpList,
    getVipLevelUpReceive: (state) => state.vipLevelUpReceive,
    getVipNavBarToggle: (state) => state.vipNavBarToggle,
    getVipCycleawardList: (state) => state.vipCycleawardList,
    getVipLevelAward: (state) => state.vipLevelAward,
    getVipBetawardList: (state) => state.vipBetawardList,
    getVipSigninHistoryList: (state) => state.vipSigninHistoryList
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setVipInfo(vipInfo: Vip.VipInfo) {
      this.vipInfo = vipInfo;
    },
    setVipLevels(vipLevels: Array<Vip.VipLevel>) {
      this.vipLevels = vipLevels;
    },
    setVipTasks(vipTasks: Array<Vip.VipTaskItem>) {
      this.vipTasks = vipTasks;
    },
    setVipRebateHistory(vipRebateHistory: Vip.VipRebateHistoryData) {
      let tempResData = vipRebateHistory
      const baseArr = [0, 1, 2, 3, 4, 5, 6, 7]
      let record = tempResData.list.slice(0, 8)
      baseArr.forEach((item) => {
        if (record[item]) {
          this.vipRebateHistory.list.push(record[item])
        } else {
          this.vipRebateHistory.list.push({
            notes_id: "",
            created_at: "",
            amount: "",
            cash_back: "",
            vip_level: "",
            vip_rate: "",
            game_type: ""
          })
          return {}
        }
      })
      // this.vipRebateHistory = vipRebateHistory;
      this.vipRebateHistory.total = tempResData.total;
    },
    setVipLevelRewardHistory(vipLevelRewardHistory: Vip.VipLevelRewardHistoryData) {
      let tempResData = vipLevelRewardHistory
      const baseArr = [0, 1, 2, 3, 4, 5, 6, 7]
      let record = tempResData.list.slice(0, 8)
      baseArr.forEach((item) => {
        if (record[item]) {
          this.vipLevelRewardHistory.list.push(record[item])
        } else {
          this.vipLevelRewardHistory.list.push({
            notes_id: "",
            created_at: "",
            amount: "",
            vip_level: "",
            type: ""
          })
          return {}
        }
      })
      this.vipLevelRewardHistory.total = tempResData.total;
      // this.vipLevelRewardHistory = vipLevelRewardHistory;
    },
    setVipTimesHistory(vipTimesHistory: Vip.VipTimesHistoryData) {
      let tempResData = vipTimesHistory
      const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      let record = tempResData.list.slice(0, 9)
      baseArr.forEach((item) => {
        if (record[item]) {
          this.vipTimesHistory.list.push(record[item])
        } else {
          this.vipTimesHistory.list.push({
            notes_id: "",
            created_at: "",
            amount: "",
            vip_level: "",
            type: ""
          })
          return {}
        }
      })
      this.vipTimesHistory.total = tempResData.total;
      // this.vipTimesHistory = vipTimesHistory
    },
    setVipSignIn(vipSignIn: Vip.VipSignInData) {
      this.vipSignIn = vipSignIn;
    },
    setLevelUpDialogVisible(levelUpDialogVisible: boolean) {
      this.levelUpDialogVisible = levelUpDialogVisible;
    },
    setVipLevelUpList(vipLevelUpList: Vip.VipLevelUpListData) {
      this.vipLevelUpList = vipLevelUpList
    },
    setVipLevelUpReceive(vipLevelUpReceive: Vip.VipLevelUpReceiveData) {
      this.vipLevelUpReceive = vipLevelUpReceive
    },
    setVipNavBarToggle(vipNavBarToggle: string) {
      this.vipNavBarToggle = vipNavBarToggle;
      localStorage.setItem('vipBar', vipNavBarToggle);
    },
    // Storing periodic rewards  存储周期性奖励
    setVipCycleawardList(vipCycleawardList: Vip.VipCycleawardListData) {
      this.vipCycleawardList = vipCycleawardList;
    },
    // Storage level related rewards  存储等级相关奖励
    setVipLevelAward(vipLevelAward: Vip.VipLevelAwardData) {
      this.vipLevelAward = vipLevelAward;
    },
    // Storage coding rebate  存储打码返利
    setVipBetawardList(vipBetawardList: Vip.vipBetawardListData) {
      this.vipBetawardList = vipBetawardList;
    },
    setVipSigninHistory(vipSigninHistoryList: Vip.VipSigninHistoryData, reset: boolean = false) {
      let tempResData = vipSigninHistoryList
      const baseArr = [0, 1, 2, 3, 4, 5, 6, 7]
      let record = tempResData.list.slice(0, 8)
      baseArr.forEach((item) => {
        if (record[item]) {
          this.vipSigninHistoryList.list.push(record[item])
        } else {
          this.vipSigninHistoryList.list.push({
            notes_id: "",
            created_at: "",
            amount: "",
            vip_level: "",
            sign_day: 0
          })
        }
      })
      this.vipSigninHistoryList.total = tempResData.total;
    },
    // 根据key清空缓存的list
    setKeyOfVipHistoryEmpty(key:string) {
      switch(key) {
        case 'vipRebateHistory':
          this.vipRebateHistory.list = [];
          this.vipRebateHistory.total = 0;
          break
        case 'vipLevelRewardHistory':
          this.vipLevelRewardHistory.list = [];
          this.vipLevelRewardHistory.total = 0;
          break
        case 'vipWeekIyHistory':
          this.vipTimesHistory.list = [];
          this.vipTimesHistory.total = 0;
          break
        case 'vipMonthlyHistory':
          this.vipTimesHistory.list = [];
          this.vipTimesHistory.total = 0;
          break
        case 'vipSigninHistory':
          this.vipSigninHistoryList.list = [];
          this.vipSigninHistoryList.total = 0;
          break
      }
    },
    // Reward collection prompt information  奖励领取提示信息
    alertMessage(successMessage: Vip.SuccessMessageParams) {
      const toast = useToast();
      toast.success(successMessage.message, {
        timeout: 3000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: successMessage.type == 1 ? SuccessIcon : WarningIcon,
        rtl: false,
      });
    },
    // Get VIP check-in content
    async dispatchVipSignIn() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_SIGNIN;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipSignInResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipSignIn(response.data)
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    async dispatchVipSigninawardReceive() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_SIGNINAWARD_RECEIVE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: any) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.dispatchVipSignIn();
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    // Receive VIP sign-in rewards
    async dispatchVipSignInReward() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_SIGNIN_REWARDS;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: any) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    // user vip information api
    async dispatchVipInfo() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.USER_VIP_INFO;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipInfoResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipInfo(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // user vip level api
    async dispatchVipLevels() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.USER_VIP_LEVEL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipLevels(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // user vip task api
    async dispatchVipTasks() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_TASKS;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipTaskResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipTasks(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // // user vip level award api
    // async dispatchVipLevelAward(data: any) {
    //     this.setSuccess(false);
    //     const route: string = NETWORK.VIP_INFO.VIP_LEVEL_AWARD;
    //     const network: Network = Network.getInstance();
    //     // response call back function
    //     const next = (response: Vip.GetVipLevelAwardResponse) => {
    //         if (response.code == 200) {
    //             this.setSuccess(true);
    //         } else {
    //             this.setErrorMessage(handleException(response.code));
    //         }
    //     }
    //     await network.sendMsg(route, data, next, 1);
    // },
    // receive VIP code rebate rewards
    async dispatchVipRebateAward(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_REBATE_AWARD;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipRebateAwardResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // get vip coding record
    async dispatchVipRebateHistory(data: Vip.VipRebateHistoryRequest) {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_REBATE_HISTORY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipRebateHistoryResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipRebateHistory(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // Obtain VIP level reward record
    async dispatchVipLevelRewardHistory(data: Vip.VipLevelRewardHistoryRequest) {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_LEVEL_AWARD_HISTORY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelRewardHistoryResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipLevelRewardHistory(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // Get VIP weekly and monthly reward records
    async dispatchVipTimesHistory(data: Vip.VipTimesHistoryRequest) {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_TIMES_HISTORY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipTimesHistoryResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipTimesHistory(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // Get VIP upgrade reward information
    async dispatchVipLevelUpList() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_LEVELUP_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelUpListResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipLevelUpList(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // Receive VIP upgrade rewards
    async dispatchVipLevelUpReceive() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_LEVELUP_RECEIVE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelUpReceiveResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipLevelUpReceive(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    /**
     * Get periodic rewards  获取周期性奖励
     */
    async dispatchVipCycleawardList() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.USER_VIP_CYCLEAWARD_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelUpReceiveResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipCycleawardList(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    /**
     * Receive periodic rewards  领取周期性奖励
     * @param data Reward type 1: Member day 2: Daily reward 3: Weekly reward 4: Monthly reward
     * @param data 领取奖励类型 1: 会员日 2: 日奖励 3:周奖励 4: 月奖励
     */
    async dispatchVipCycleawardReceive(data: Vip.VipCycleawardReceiveRequest) {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.USER_VIP_CYCLEAWARD_RECEIVE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelUpReceiveResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.alertMessage({ message: (i18n as any).global.t('reward.success_text'), type: 1 });
          this.dispatchVipCycleawardList();
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
          this.alertMessage({ message: response.message, type: 0 });
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    /**
     * Get level-related rewards  获取等级相关奖励
     */
    async dispatchVipLevelAward() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.USER_VIP_LEVELAWARD_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelAwardResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipLevelAward(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    /**
     * Receive level-related rewards  领取等级相关奖励
     * @param data Reward type 5: Upgrade reward 6: Upgrade reward
     * @param data 领取奖励类型 5: 升级奖励 6: 升段奖励
     */
    async dispatchVipLevelAwardReceive(data: Vip.VipLevelAwardReceiveRequest) {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.USER_VIP_LEVELAWARD_RECEIVE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelUpReceiveResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.alertMessage({ message: (i18n as any).global.t('reward.success_text'), type: 1 });
          this.dispatchVipLevelAward();
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
          this.alertMessage({ message: response.message, type: 0 });
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    /**
     * Get coding rebates  获取打码返利
     */
    async dispatchVipBetawardList() {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.USER_VIP_BETAWARD_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelAwardResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipBetawardList(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    /**
     * Get coding rebates  领取打码返利
     * @param data Reward type 7: Coding rewards
     * @param data 领取奖励类型 7: 打码奖励
     */
    async dispatchVipBetawardReceive(data: Vip.VipBetawardReceiveRequest) {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.USER_VIP_BETAWARD_RECEIVE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipLevelUpReceiveResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.alertMessage({ message: (i18n as any).global.t('reward.success_text'), type: 1 });
          this.dispatchVipBetawardList();
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
          this.alertMessage({ message: response.message, type: 0 });
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    /**
     * Get sign-in reward collection records  获取签到奖励领取记录
     * @param
     */
    async dispatchVipSigninHistory(data: Vip.VipSigninHistoryRequest) {
      this.setSuccess(false);
      const route: string = NETWORK.VIP_INFO.VIP_SIGNIN_HISTORY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Vip.GetVipSigninHistoryRequest) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVipSigninHistory(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    }
  }
})
