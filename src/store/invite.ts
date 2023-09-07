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
    inviteItem: {} as Invite.InviteData,
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
    inviteHistoryConfig: {} as Invite.InviteHistoryConfig
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getInviteItem: (state) => state.inviteItem,
    getPersonalInvitationInfo: (state) => state.personalInvitationInfo,
    getInviteHistoryConfig: (state) => state.inviteHistoryConfig
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
    // receive invitation achievement commission
    async dispatchInviterAward(data: any) {
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
