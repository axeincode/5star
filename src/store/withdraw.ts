import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Withdraw from "@/interface/withdraw";
import { handleException } from './exception';

export const withdrawStore = defineStore({
  id: 'withdraw',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    withdrawConfig: {} as any,
    withdrawSubmit: {} as any,
    withdrawHistoryItem: {
      total_pages: 0,
      record: []
    } as Withdraw.WithdrawalHistoryResponse
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getWithdrawCfg: (state) => state.withdrawConfig,
    getWithdrawSubmit: (state) => state.withdrawSubmit,
    getWithdrawHistoryItem: (state) => state.withdrawHistoryItem
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setWithdrawCfg(withdrawConfig: any) {
      this.withdrawConfig = withdrawConfig;
    },
    setWithdrawSubmit(withdrawSubmit: any) {
      this.withdrawSubmit = withdrawSubmit;
    },
    setWithdrawHistoryItem(withdrawHistoryItem: Withdraw.WithdrawalHistoryResponse) {
      this.withdrawHistoryItem.record = [...this.withdrawHistoryItem.record, ...withdrawHistoryItem.record]
      this.withdrawHistoryItem.total_pages = withdrawHistoryItem.total_pages;
      // withdrawHistoryItem.record.map(item => {
      //   this.withdrawHistoryItem.record.push(item);
      // })
    },
    // user withdraw configuration
    async dispatchUserWithdrawCfg() {
      this.setSuccess(false);
      const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_CONFIG;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Withdraw.GetWithdrawResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setWithdrawCfg(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // user withdraw configuration
    async dispatchUserWithdrawSubmit(data: Withdraw.WithdrawItem) {
      this.setSuccess(false);
      const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_SUBMIT;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Withdraw.SubmitWithdrawResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setWithdrawSubmit(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // user withdrawal history api response
    async dispatchWithdrawalHistory(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_HISTORY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Withdraw.GetWithdrawalHistoryResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setWithdrawHistoryItem(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // user withdrawal history api response
    async dispatchWithdrawalRefund(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_REFUND;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Withdraw.GetWithdrawalHistoryResponse) => {
        if (response.code == 200) {
          this.withdrawHistoryItem.record.map((item: Withdraw.WithdrawalHistoryItem) => {
            if (item.id == data.id) {
              item.status = 3;
            }
          })
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    }
  }
})
