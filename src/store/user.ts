import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as User from "@/interface/user";
import { handleException } from './exception';

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    userCheck: false as boolean,
    verifyTime: 0 as number,
    userBalance: {} as User.GetUserBalance
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getUserCheck: (state) => state.userCheck,
    getVerifyTime: (state) => state.verifyTime,
    getUserBalance: (state) => state.userBalance
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setUserCheck(userCheck: boolean) {
      this.userCheck = userCheck;
    },
    setVerifyTime(verifyTime: number) {
      this.verifyTime = verifyTime;
    },
    setUserBalance(userBalance: User.GetUserBalance) {
      console.log('金额', userBalance)
      this.userBalance = userBalance;
    },
    // user check
    async dispatchUserCheck() {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_CHECK;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: User.GetUserInfoResponseData) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setUserCheck(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
    // user balance
    async dispatchUserBalance() {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_BALANCE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: User.GetUserBalanceResponseData) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setUserBalance(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // set user currency
    async dispatchSetUserCurrency(currency:string) {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.SET_USER_CURRENCY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: any) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {currency_type:currency}, next, 1);
    },
    // user email verify
    async dispatchUserEmailVerify() {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_EMAIL_VERIFY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: User.GetUserEmailVerifyResponseData) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setVerifyTime(response.time);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
  }
})
