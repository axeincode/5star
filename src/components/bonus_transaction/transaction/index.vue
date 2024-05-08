<script lang="ts" setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import GameHistory from "./game_history/index.vue";
import MGameHistory from "./mobile/game_history/index.vue";
import Transactions from "./transactions/index.vue";
import MTransactions from "./mobile/transactions/index.vue";
import Deposit from "./deposit/index.vue";
import MDeposit from "./mobile/deposit/index.vue";
import Withdrawal from "./withdrawal/index.vue";
import MWithdrawal from "./mobile/withdrawal/index.vue";
import Vip from "./vip/index.vue";
import MVip from "./mobile/vip/index.vue";
import MReport from "./mobile/report/index.vue";
import { withdrawStore } from "@/store/withdraw";
import { depositStore } from "@/store/deposit";
import { gameStore } from "@/store/game";
import { vipStore } from "@/store/vip";
import { mainStore } from "@/store/main";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import moment from "moment-timezone";
import { BtTabEnum } from "@/enums/bonusTransactionEnum";

const { t } = useI18n();
const { width } = useDisplay();
const route = useRoute();
const {
  dispatchWithdrawalHistory,
  setWithdrawHistoryItemEmpty
} = withdrawStore();
const {
  dispatchUserDepositHistory,
  setDepositHistoryIteEmpty
} = depositStore();
const {
  dispatchTransactionHistory,
  setTransactionHistoryItemEmpty
} = bonusTransactionStore();
const { dispatchGameHistory } = gameStore();
const { dispatchVipRebateHistory } = vipStore();
const { dispatchVipLevelRewardHistory } = vipStore();
const { dispatchVipTimesHistory } = vipStore();
const { dispatchTimeunix } = mainStore();

const mobileWidth = computed(() => {
  return width.value;
});

const withdrawHistoryItem = computed(() => {
  const { getWithdrawHistoryItem } = storeToRefs(withdrawStore());
  return getWithdrawHistoryItem.value;
});

const depositHistoryItem = computed(() => {
  const { getDepositHistoryItem } = storeToRefs(depositStore());
  return getDepositHistoryItem.value;
});

const transactionHistoryItem = computed(() => {
  const { getTransactionHistoryItem } = storeToRefs(bonusTransactionStore());
  return getTransactionHistoryItem.value;
});

const vipRebateHistory = computed(() => {
  const { getVipRebateHistory } = storeToRefs(vipStore());
  return getVipRebateHistory.value;
});

const vipLevelRewardHistory = computed(() => {
  const { getVipLevelRewardHistory } = storeToRefs(vipStore());
  // getVipLevelRewardHistory.value.list.map((item) => {
  //   item.type = "Rank Bonus";
  // });
  return getVipLevelRewardHistory.value;
});

const vipTimesHistory = computed(() => {
  const { getVipTimesHistory } = storeToRefs(vipStore());
  getVipTimesHistory.value.list.map(item => {
    item.type = "Weekly Bonus";
  });
  return getVipTimesHistory.value;
});

const transactionTabs = ref<any[]>([
  {
    value: BtTabEnum.transactions,
    label: "transaction.tab.transactions"
  },
  {
    value: BtTabEnum.deposit,
    label: "transaction.tab.deposit"
  },
  {
    value: BtTabEnum.withdrawal,
    label: "transaction.tab.withdrawal"
  },
  {
    value: BtTabEnum.vip,
    label: "transaction.tab.vip"
  },
  {
    value: BtTabEnum.report,
    label: "transaction.tab.report"
  }
  // t("transaction.tab.game_history"),
  // t("transaction.tab.transactions"),
  // t("transaction.tab.deposit"),
  // t("transaction.tab.withdrawal"),
  // t("transaction.tab.vip"),
  // t("transaction.tab.referral"),
]);
const pageSize = ref<number>(9);
const pageNum = ref<number>(1);
const vipTimesHistoryIndex = ref<number>(1);
const selectedTab = ref<any>(BtTabEnum.transactions);
const loading = ref(false);

const transactionTab = computed(() => {
  const { getTransactionTab } = storeToRefs(bonusTransactionStore());
  return getTransactionTab.value;
});

const timeunix = computed(() => {
  const { getTimeunixDvalue } = storeToRefs(mainStore());
  return getTimeunixDvalue.value;
});

watch(
  transactionTab,
  newValue => {
    selectedTab.value = newValue;
  },
  { deep: true }
);

const touchless = () => {
  return false;
};

// 交易记录tab栏切换
const transactionTabToggle = async (item: string) => {
  console.log('transactionTabToggle');
  
  selectedTab.value = item;
  loading.value = true;
  switch (selectedTab.value) {
    case BtTabEnum.transactions:
      setTransactionHistoryItemEmpty();
      await dispatchTransactionHistory({
        page_size: pageSize.value,
        start_time: Math.ceil(moment().valueOf() / 1000 + timeunix.value)
      });
      setLoading();
      break;
    case BtTabEnum.deposit:
      setDepositHistoryIteEmpty();
      await dispatchUserDepositHistory({
        page_size: pageSize.value,
        start_time: Math.ceil(moment().valueOf() / 1000 + timeunix.value)
      });
      setLoading();
      break;
    case BtTabEnum.withdrawal:
      setWithdrawHistoryItemEmpty();
      await dispatchWithdrawalHistory({
        page_size: pageSize.value,
        start_time: Math.ceil(moment().valueOf() / 1000 + timeunix.value)
      });
      setLoading();
      break;
  }
};

const setLoading = (value = false) => {
  loading.value = value;
};


watch(selectedTab, async value => {
  // if (value == t("transaction.tab.withdrawal")) {
  //   await dispatchWithdrawalHistory({
  //     page_size: pageSize.value,
  //     start_time: Math.ceil(moment().valueOf() / 1000),
  //   });
  // } else if ((value = t("transaction.tab.deposit"))) {
  //   await dispatchUserDepositHistory({
  //     page_size: pageSize.value,
  //     start_time: Math.ceil(moment().valueOf() / 1000),
  //   });
  // }
});

onMounted(async () => {
  // console.log(selectedTab.value);
  // console.log(transactionTab.value);
  setLoading(true)
  selectedTab.value = route.query.tab
    ? route.query.tab
    : BtTabEnum.transactions;
  selectedTab.value =
    transactionTab.value == "" ? selectedTab.value : transactionTab.value;
  await dispatchTimeunix();
  console.log(timeunix.value, "timeunixDValue");

  await dispatchTransactionHistory({
    page_size: pageSize.value,
    start_time: Math.ceil(moment().valueOf() / 1000 + timeunix.value),
    lid: Number(0).toString()
  });
  setLoading(false)
});
</script>
<template>
<div>
  <v-slide-group
    class="mt-2 slide-tab-btns slide-tabs"
    v-model="selectedTab"
    center-active
    show-arrows
    style="touch-action: none"
    :style="{
      marginLeft: mobileWidth < 600 ? '' : '16px !important',
      marginRight: mobileWidth < 600 ? '' : '16px !important',
    }"
  >
    <v-slide-group-item v-for="(item, index) in transactionTabs" :key="index" :value="item.value">
      <v-btn
        class="ma-2 text-none transaction-tab-btn"
        :class="selectedTab == item.value ? 'white' : 'text-gray'"
        :color="selectedTab == item.value ? '#1D2027' : 'transparent'"
        @click="transactionTabToggle(item.value)"
        :width="mobileWidth < 600 ? 106 : 150"
      >{{ t(item.label) }}</v-btn>
    </v-slide-group-item>
  </v-slide-group>

  <!-- 用于tab栏切换时显示loading, 不能用v-if，因为VIP是在里面请求的 -->
  <div class="m-home-loading" v-show="loading">
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div>
  <v-window v-show="!loading" v-model="selectedTab" :disable-swipe="true" :touch="touchless()">
    <!-- <v-window-item
      :value="t('transaction.tab.game_history')"
      style="margin-left: 10px; margin-right: 10px"
    >
      <GameHistory v-if="mobileWidth > 600" />
      <MGameHistory v-else />
    </v-window-item>-->
    <!--  -->
    <v-window-item :value="BtTabEnum.transactions" style="margin-left: 10px; margin-right: 10px">
      <div v-if="selectedTab == BtTabEnum.transactions">
        <!-- <Transactions v-show="mobileWidth > 600" /> -->
        <MTransactions
          :pageSize="pageSize"
          :transactionHistoryItem="transactionHistoryItem"
          v-show="mobileWidth <= 600"
        />
      </div>
    </v-window-item>

    <!-- 存款 -->
    <v-window-item :value="BtTabEnum.deposit" style="margin-left: 10px; margin-right: 10px">
      <div v-if="selectedTab == BtTabEnum.deposit">
        <Deposit v-if="mobileWidth > 600" />
        <MDeposit :pageSize="pageSize" :depositHistoryItem="depositHistoryItem" v-else />
      </div>
    </v-window-item>

    <!-- 取款 -->
    <v-window-item :value="BtTabEnum.withdrawal" style="margin-left: 10px; margin-right: 10px">
      <div v-if="selectedTab == BtTabEnum.withdrawal">
        <Withdrawal
          :pageSize="pageSize"
          :withdrawHistoryItem="withdrawHistoryItem"
          v-if="mobileWidth > 600"
        />
        <MWithdrawal :pageSize="pageSize" :withdrawHistoryItem="withdrawHistoryItem" v-else />
      </div>
    </v-window-item>

    <!-- VIP -->
    <v-window-item :value="BtTabEnum.vip" style="margin-left: 10px; margin-right: 10px">
      <div v-if="selectedTab == BtTabEnum.vip">
        <Vip
          :pageSize="pageSize"
          :withdrawHistoryItem="withdrawHistoryItem"
          v-if="mobileWidth > 600"
        />
        <MVip
          :pageSize="pageSize"
          :vipRebateHistory="vipRebateHistory"
          :vipLevelRewardHistory="vipLevelRewardHistory"
          :vipTimesHistory="vipTimesHistory"
          @inited="setLoading"
          v-else
        />
      </div>
    </v-window-item>

    <!-- 记录 report -->
    <v-window-item :value="BtTabEnum.report" style="margin-left: 10px; margin-right: 10px">
      <div v-if="selectedTab == BtTabEnum.report">
        <MReport v-if="mobileWidth < 600" :pageSize="pageSize" @inited="setLoading"></MReport>
      </div>
    </v-window-item>

    <!-- <v-window-item
      :value="t('transaction.tab.referral')"
      style="margin-left: 10px; margin-right: 10px"
    >
      <Withdrawal
        :pageSize="pageSize"
        :withdrawHistoryItem="withdrawHistoryItem"
        v-if="mobileWidth > 600"
      />
      <MWithdrawal
        :pageSize="pageSize"
        :withdrawHistoryItem="withdrawHistoryItem"
        v-else
      />
    </v-window-item>-->
  </v-window>
</div>
</template>
<style lang="scss">
.slide-tabs {
  background: #15161c !important;
  margin: 8px !important;
  border-radius: 8px !important;
}

.v-slide-group__prev,
.v-slide-group__next {
  color: white !important;
}

.transaction-tab-btn {
  box-shadow: 0px 4px 6px 1p rgba(0, 0, 0, 0.21) !important;
  .v-btn__content {
    font-weight: 700;
    font-size: 16px !important;
  }
}

@media (max-width: 600px) {
  .slide-tabs {
    border-radius: 0px !important;
  }
  .v-slide-group {
    margin: 10px 20px !important;
    // border-radius: 8px !important;
  }

  .transaction-tab-btn {
    box-shadow: none;

    .v-btn__content {
      font-size: 12px !important;
    }
  }

  .v-slide-group__next,
  .v-slide-group__prev {
    display: flex !important;
    align-items: center;
    justify-content: center;
    min-width: 14px !important;
    color: #7782AA !important;
    margin: 4px 3px;
    background: #1d2027;
    flex: 0;
  }

  .v-slide-group__prev--disabled,
  .v-slide-group__next--disabled {
    color: #15161c!important;
    background: #15161c;
    // min-width: 0px !important;
  }
}
</style>
