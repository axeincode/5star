import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Withdraw from "@/interface/withdraw";

export const withdrawStore = defineStore({
  id: 'withdraw',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    withdrawConfig: {} as any,
    withdrawSubmit: {} as any,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getWithdrawCfg: (state) => state.withdrawConfig,
    getWithdrawSubmit: (state) => state.withdrawSubmit,
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
          this.handleErr(response.code);
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
          this.handleErr(response.code);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // error handle function
    handleErr(code: number) {
      switch (code) {
        case 0:
          // code === 0 means failed
          this.setErrorMessage('failed');
          break;
        case 100000:
          // code === 100000 means Passed data exception
          this.setErrorMessage('Passed data exception');
          break;
        case 100001:
          // code === 100001 means The password does not meet the requirements
          this.setErrorMessage('The password does not meet the requirements');
          break;
        case 100002:
          // code === 100002 User account is locked
          this.setErrorMessage('User account is locked');
          break;
        case 101001:
          // code === 200 means Login data exception
          this.setErrorMessage('Login data exception');
          break;
        case 101002:
          // code === 200 means The login account or password is wrong
          this.setErrorMessage('The login account or password is wrong');
          break;
        case 101003:
          // code === 101003 means Login account does not exist
          this.setErrorMessage('Login account does not exist');
          break;
        case 102001:
          // code === 102001 means Failed to register data
          this.setErrorMessage('Failed to register data');
          break;
        case 102002:
          // code === 102002 means Registration data exception
          this.setErrorMessage('Registration data exception');
          break;
        case 102003:
          // code === 102003 means Registering an existing account is abnormal
          this.setErrorMessage('Registering an existing account is abnormal');
          break;
        case 103001:
          // code === 103001 means Abnormal nickname format (abnormal length or illegal identifier)
          this.setErrorMessage('Abnormal nickname format (abnormal length or illegal identifier)');
          break;
        case 103002:
          // code === 103002 means Nickname is the same as email
          this.setErrorMessage('Nickname is the same as email');
          break;
        case 103003:
          // code === 103003 means Email format exception (abnormal length or illegal identifier)
          this.setErrorMessage('Email format exception (abnormal length or illegal identifier)');
          break;
        case 103004:
          // code === 103004 means Phone format exception (abnormal length or illegal identifier)
          this.setErrorMessage('Phone format exception (abnormal length or illegal identifier)');
          break;
        case 103005:
          // code === 103005 means The same password needs to be changed
          this.setErrorMessage('The same password needs to be changed');
          break;
        case 103006:
          // code === 103006 means The current password is wrong
          this.setErrorMessage('The current password is wrong');
          break;
        case 103007:
          // code === 103007 means The emails that need to be modified are the same
          this.setErrorMessage('The emails that need to be modified are the same');
          break;
        case 103008:
          // code === 103008 means The message that needs to be modified is already taken
          this.setErrorMessage('The message that needs to be modified is already taken');
          break;
        case 103009:
          // code === 103009 means The avatar index that needs to be modified is wrong
          this.setErrorMessage('The avatar index that needs to be modified is wrong');
          break;
        case 103010:
          // code === 103010 means wrong birthday format
          this.setErrorMessage('wrong birthday format');
          break;
      }
    },
  }
})
