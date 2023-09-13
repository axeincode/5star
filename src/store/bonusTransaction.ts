import { defineStore } from 'pinia'
import { handleException } from './exception';
import { type TransactionHistoryResponse } from '@/interface/transaction';
import type * as Transaction from "@/interface/transaction";
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";

export const bonusTransactionStore = defineStore({
  id: 'bonusTransaction',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    bonusTabIndex: 0 as number,
    transactionTab: '' as string,
    transactionHistoryItem : {
      total_pages: 0,
      record: []
    } as TransactionHistoryResponse,
    moreTransactionHistoryFlag: true as boolean
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getBonusTabIndex: (state) => state.bonusTabIndex,
    getTransactionTab: (state) => state.transactionTab,
    getTransactionHistoryItem: (state) => state.transactionHistoryItem,
    getMoreTransactionHistoryFlag: (state) => state.moreTransactionHistoryFlag,
  },
  actions: {
    setBonusTabIndex(bonusTabIndex: number) {
      this.bonusTabIndex = bonusTabIndex;
    },
    setTransactionTab(transactionTab: string) {
      console.log(transactionTab);
      this.transactionTab = transactionTab;
    },
    setTransactionHistoryItem(transactionHistoryItem: TransactionHistoryResponse) {
      if (transactionHistoryItem.record.length == 0) {
        this.moreTransactionHistoryFlag = false;
      } else {
        this.transactionHistoryItem.record = [...this.transactionHistoryItem.record, ...transactionHistoryItem.record]
        this.transactionHistoryItem.total_pages = transactionHistoryItem.total_pages;
        this.moreTransactionHistoryFlag = true;
      }
    },
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    // transaction history api response
    async dispatchTransactionHistory(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.TRANSACTION_PAGE.TRANSACTION_HISTORY;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Transaction.GetTransactionHistoryResponse) => {
        if (response.code == 200) {
          this.setSuccess(true);
          this.setTransactionHistoryItem(response.data);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    }
  }
})
