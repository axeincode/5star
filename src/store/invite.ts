import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Invite from "@/interface/invite";
import { handleException } from './exception';

export const inviteStore = defineStore({
  id: 'invite',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    inviteItem: {
      bonus_month: 0,
      bonus_today: 0,
      bonus_total: 0,
      bonus_yesterdays: 0,
      deposit_users: 0,
      deposit_users_month: 0,
      deposit_users_today: 0,
      deposit_users_yesterdays: 0,
      invite_code: "",
      invited_users: 0,
      web_invite_url: import.meta.env.VITE_BASE_URL,
      available_bonus: 0,
    } as Invite.InviteData,
    personalInvitationInfo: {
      total_profit: "19,34",
      invitation_bonus: 25.916,
      bettion_commission: "40.533,73",
      achievement_bonus: 3.225,
      deposited_users: 3972,
      profit_today: {
        profit: "19,34",
        bettion_commission: "19,34",
        invite_bonus: 0
      },
      profit_week: {
        profit: "19,34",
        bettion_commission: "19,34",
        invite_bonus: 0
      },
      profit_month: {
        profit: "19,34",
        bettion_commission: "19,34",
        invite_bonus: 0
      }
    } as Invite.PersonalInvitationInformation,
    inviteHistoryConfig: {} as Invite.InviteHistoryConfig,
    statisticsItem: {
      today_profit: {
        register_user: [],
        deposit_user: [],
        deposit_bonus: 0,
        deposit_amount: [],
        bet_amount: [],
        bet_bonus: [],
        achievement_award: 0,
      },
      week_profit: {
        register_user: [],
        deposit_user: [],
        deposit_bonus: 0,
        deposit_amount: [],
        bet_amount: [],
        bet_bonus: [],
        achievement_award: 0,
      },
      month_profit: {
        register_user: [],
        deposit_user: [],
        deposit_bonus: 0,
        deposit_amount: [],
        bet_amount: [],
        bet_bonus: [],
        achievement_award: 0,
      },
      receive_profit: 0,
    } as Invite.StatisticsData,
    inviteHistoryItem: {
      total_pages: 0,
      list: []
    } as Invite.InviteHistoryData,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getInviteItem: (state) => state.inviteItem,
    getPersonalInvitationInfo: (state) => state.personalInvitationInfo,
    getInviteHistoryConfig: (state) => state.inviteHistoryConfig,
    getStatisticsItem: (state) => state.statisticsItem,
    getInviteHistoryItem: (state) => state.inviteHistoryItem
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setInviteItem(inviteItem: Invite.InviteData) {
      this.inviteItem = inviteItem;
    },
    setPersonalInvitationInfo(personalInvitationInfo: Invite.PersonalInvitationInformation) {
      this.personalInvitationInfo = personalInvitationInfo;
    },
    setInviteHistoryConfig(inviteHistoryConfig: Invite.InviteHistoryConfig) {
      this.inviteHistoryConfig = inviteHistoryConfig;
    },
    setStatisticsItem(statisticsItem: Invite.StatisticsData) {
      this.statisticsItem = statisticsItem;
    },
    setInviteHistoryItem(inviteHistoryItem: Invite.InviteHistoryData) {
      this.inviteHistoryItem = inviteHistoryItem;
    },
    // user invitation information
    async dispatchUserInvite() {
      this.setSuccess(false);
      const route: string = NETWORK.INVITE_PAGE.INVITE_INFO;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Invite.GetInviteResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setInviteItem(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    // get invitation activity commission record
    async dispatchUserInviteHistory(formData: Invite.InviteHistoryFormData) {
      this.setSuccess(false);
      const route: string = NETWORK.INVITE_PAGE.INVITE_HISTORY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Invite.InviteHistoryResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setInviteHistoryItem(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    // get agent achievement information
    async dispatchStatisticsList() {
      this.setSuccess(false);
      const route: string = NETWORK.INVITE_PAGE.STATISTICS_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Invite.GetStatisticsResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setStatisticsItem(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    // receive invitation achievement commissions
    async dispatchInviteAward(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.INVITE_PAGE.INVITER_AWARD;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Invite.GetInviteResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // personal invitation information
    async dispatchInviteSelf() {
      this.setSuccess(false);
      const route: string = NETWORK.INVITE_PAGE.INVITE_SELF;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Invite.GetInviteSelfResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setPersonalInvitationInfo(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    // invitation event commission record configuration
    async dispatchInviteHistoryCfg() {
      this.setSuccess(false);
      const route: string = NETWORK.INVITE_PAGE.INVITE_HISTORY_CONFIG;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Invite.GetInviteHistoryResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setInviteHistoryConfig(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
  }
})
