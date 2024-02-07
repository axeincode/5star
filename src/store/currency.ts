import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Currency from "@/interface/currency";
import { handleException } from './exception';

export const currencyStore = defineStore({
  id: 'currency',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    currencyList: [] as Array<Currency.GetCurrencyBalanceList>,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getCurrencyList: (state) => state.currencyList,
  },
  actions: {
    setSuccess(success: boolean) {
        this.success = success
    },
    setErrorMessage(message: string) {
        this.errMessage = message
    },

    setCurrencyList(currencyList: Array<Currency.GetCurrencyBalanceList>) {
        this.currencyList = currencyList;
    },

    async dispatchCurrencyList() {
        this.setSuccess(false);
        const route: string = NETWORK.Currency.CURRENCY_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Currency.GetCurrencyBalanceListResponse) => {
            if (response.code == 200) {
                this.setSuccess(true);
                this.setCurrencyList(response.data);
            } else {
                this.setErrorMessage(handleException(response.code));
            }
        }
        await network.sendMsg(route, {}, next, 1, 4);
    },

  }
})
