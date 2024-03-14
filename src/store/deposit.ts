import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Deposit from "@/interface/deposit";
import { handleException } from './exception';

export const depositStore = defineStore({
  id: 'deposit',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    depositConfig: {
      bonus: [{
        type: 0
      }]
    } as any,
    depositSubmit: {} as any,
    pixInfo: {} as Deposit.GetPixInfo,
    pixInfoToggle: false as boolean,
    depositHistoryItem: {
      total_pages: 0,
      record: []
    } as Deposit.DepositHistoryResponse,
    depositConfirmDialogToggle: false as boolean,
    channelName: "spei" as string,
    depositAmount: 0 as number,
    depositOrderDialog: false as boolean,
    timerValue: 0 as number,
    depositOrderTimeRefresh: false as boolean,
    depositCurrency: "MXN" as string,
    moreDepositHistoryFlag: true as boolean
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getDepositCfg: (state) => state.depositConfig,
    getDepositSubmit: (state) => state.depositSubmit,
    getPixInfo: (state) => state.pixInfo,
    getPixInfoToggle: (state) => state.pixInfoToggle,
    getDepositHistoryItem: (state) => state.depositHistoryItem,
    getDepositConfirmDialogToggle: (state) => state.depositConfirmDialogToggle,
    getChannelName: (state) => state.channelName,
    getDepositAmount: (state) => state.depositAmount,
    getDepositOrderDialog: (state) => state.depositOrderDialog,
    getTimerValue: (state) => state.timerValue,
    getDepositOrderTimeRefresh: (state) => state.depositOrderTimeRefresh,
    getDepositCurrency: (state) => state.depositCurrency,
    getMoreDepositHistoryFlag: (state) => state.moreDepositHistoryFlag,
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setDepositCfg(depositConfig: any) {
      this.depositConfig = depositConfig;
    },
    setDepositSubmit(depositSubmit: any) {
      this.depositSubmit = depositSubmit;
    },
    setPixInfo(pixInfo: Deposit.GetPixInfo) {
      this.pixInfo = pixInfo;
    },
    setPixInfoToggle(pixInfoToggle: boolean) {
      this.pixInfoToggle = pixInfoToggle
    },
    setDepositHistoryItem(depositHistoryItem: Deposit.DepositHistoryResponse) {
      if (depositHistoryItem.record.length < 9) {
        this.moreDepositHistoryFlag = false;
      } else {
        this.moreDepositHistoryFlag = true;
      }

      const baseArr = [0,1,2,3,4,5,6,7]
      let record = depositHistoryItem.record.slice(0, 8)
      baseArr.map((item) => {
        if(record[item]) {
          this.depositHistoryItem.record.push(record[item])
        } else {
          this.depositHistoryItem.record.push({
            amount: '',
            created_at: 0,
            id: '' as unknown as number,
            note: "",
            type: '',
            status: NaN,
            currency: ''
          })
          return {}
        }
      })
      
      // this.depositHistoryItem.record = [...this.depositHistoryItem.record, ...recordList]
      this.depositHistoryItem.total_pages = depositHistoryItem.total_pages;
    },
    setDepositConfirmDialogToggle(depositConfirmDialogToggle: boolean) {
      this.depositConfirmDialogToggle = depositConfirmDialogToggle
    },
    setChannelName(channelName: string) {
      this.channelName = channelName;
    },
    setDepositAmount(depositAmount: number) {
      this.depositAmount = depositAmount
    },
    setDepositOrderDialog(depositOrderDialog: boolean){
      this.depositOrderDialog = depositOrderDialog
    },
    setTimerValue(timerValue: number) {
      this.timerValue = timerValue
    },
    setDepositOrderTimeRefresh(depositOrderTimeRefresh: boolean){
      this.depositOrderTimeRefresh = depositOrderTimeRefresh
    },
    setDepositCurrency(depositCurrency: string) {
      this.depositCurrency = depositCurrency;
    },
    // user deposit configuration
    async dispatchUserDepositCfg() {
      this.setSuccess(false);
      const route: string = NETWORK.DEPOSIT_PAGE.DEPOSIT_CONFIG;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Deposit.GetDepositResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setDepositCfg(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // user deposit configuration
    async dispatchUserDepositSubmit(data: Deposit.DepositItem) {
      this.setSuccess(false);
      const route: string = NETWORK.DEPOSIT_PAGE.DEPOSIT_SUBMIT;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Deposit.SubmitDepositResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setDepositSubmit(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // user deposit configuration
    async dispatchUserDepositHistory(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.DEPOSIT_PAGE.DEPOSIT_HISTORY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Deposit.GetDepositHistoryResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setDepositHistoryItem(response.data);
        } else {
          // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
  }
})
