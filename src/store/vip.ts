import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Vip from "@/interface/vip";
import { handleException } from './exception';

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
        vipLevelUpReceive: {} as Vip.VipLevelUpReceiveData
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
        getVipLevelUpReceive: (state) => state.vipLevelUpReceive
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
            this.vipRebateHistory = vipRebateHistory;
        },
        setVipLevelRewardHistory(vipLevelRewardHistory: Vip.VipLevelRewardHistoryData) {
            this.vipLevelRewardHistory = vipLevelRewardHistory;
        },
        setVipTimesHistory(vipTimesHistory: Vip.VipTimesHistoryData) {
            this.vipTimesHistory = vipTimesHistory
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        },
        // user vip level award api
        async dispatchVipLevelAward(data: any) {
            this.setSuccess(false);
            const route: string = NETWORK.VIP_INFO.VIP_LEVEL_AWARD;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Vip.GetVipLevelAwardResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                } else {
                    this.setErrorMessage(handleException(response.code));
                }
            }
            await network.sendMsg(route, data, next, 1);
        },
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
                }
            }
            await network.sendMsg(route, {}, next, 1);
        },
    }
})