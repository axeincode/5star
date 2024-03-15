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
    } as Withdraw.WithdrawalHistoryResponse,
    smsVerificationItem: { remaining_time: 0 } as Withdraw.SmsSendResponseItem,
    moreWithdrawHistoryFlag: true as boolean
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getWithdrawCfg: (state) => state.withdrawConfig,
    getWithdrawSubmit: (state) => state.withdrawSubmit,
    getWithdrawHistoryItem: (state) => state.withdrawHistoryItem,
    getSmsVerificationItem: (state) => state.smsVerificationItem,
    getMoreTransactionHistoryFlag: (state) => state.moreWithdrawHistoryFlag,
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
      // withdrawHistoryItem.record.map(item => {
      //   this.withdrawHistoryItem.record.push(item);
      // })
      console.log(withdrawHistoryItem, 'withdrawHistoryItem');

      if (withdrawHistoryItem.record.length < 9) {
        this.moreWithdrawHistoryFlag = false;
      } else {
        this.moreWithdrawHistoryFlag = true;
      }

      const baseArr = [0,1,2,3,4,5,6,7,8]
      let record = withdrawHistoryItem.record.slice(0, 9)
      baseArr.map((item) => {
        if(record[item]) {
          this.withdrawHistoryItem.record.push(record[item])
        } else {
          this.withdrawHistoryItem.record.push({
            amount: '',
            created_at: 0,
            id: '' as unknown as number,
            note: "",
            type: '',
            status: NaN,
            currency_type: '',
            currency: ''
          })
          return {}
        }
      })

      // this.withdrawHistoryItem.record = [...this.withdrawHistoryItem.record, ...recordList]
      this.withdrawHistoryItem.total_pages = withdrawHistoryItem.total_pages;
    },
    setSmsVerificationItem(smsVerificationItem: Withdraw.SmsSendResponseItem) {
      this.smsVerificationItem = smsVerificationItem
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
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
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
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
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
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
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
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // Send SMS verification code
    async dispatchSmsVerificationCode(data: Withdraw.SmsSendRequestForm) {
      this.setSuccess(false);
      const route: string = NETWORK.PHONE_BIDING.SMS_VERIFICATION_CODE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Withdraw.GetSmsSendResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setSmsVerificationItem(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // Submit SMS verification code for verification
    async dispatchSubmitSMS(data: Withdraw.SmsSubmitRequestForm) {
      this.setSuccess(false);
      const route: string = NETWORK.PHONE_BIDING.SUBMIT_SMS_CODE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Withdraw.GetSmsSubmitResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    }
  }
})
