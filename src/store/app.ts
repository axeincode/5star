import { defineStore } from 'pinia';

interface State {
  platformCurrency: string;
}

export const appCurrencyStore = defineStore({
  id: 'platformCurrency',
  state: (): State => {
    return {
      platformCurrency: '$',
    };
  },
  getters: {
    getPlatformCurrency: (state): string => state.platformCurrency,
  },
  actions: {
    setPlatformCurrency(currency: string) {
      this.platformCurrency = currency;
    },
  },
});