import { defineStore } from 'pinia';

interface State {
  platformCurrency: string;
  isShowSkeleton: boolean;
}

export const appCurrencyStore = defineStore({
  id: 'platformCurrency',
  state: (): State => {
    return {
      platformCurrency: '$',
      isShowSkeleton: true, // 控制是否显示首次加载页
    };
  },
  getters: {
    getPlatformCurrency: (state): string => state.platformCurrency,
    getIsShowSkeleton: (state): boolean => state.isShowSkeleton,
  },
  actions: {
    setPlatformCurrency(currency: string) {
      this.platformCurrency = currency;
    },
    setIsShowSkeleton(type: boolean) {
      this.isShowSkeleton = type;
    },
  },
});