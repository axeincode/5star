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
import { withdrawStore } from "@/store/withdraw";
import { depositStore } from "@/store/deposit";
import { gameStore } from "@/store/game";
import { vipStore } from "@/store/vip";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import moment from "moment-timezone";

const { t } = useI18n();
const { width } = useDisplay();
const route = useRoute();
const { dispatchWithdrawalHistory } = withdrawStore();
const { dispatchUserDepositHistory } = depositStore();
const { dispatchGameHistory } = gameStore();
const { dispatchTransactionHistory } = bonusTransactionStore();
const { dispatchVipRebateHistory } = vipStore();
const { dispatchVipLevelRewardHistory } = vipStore();
const { dispatchVipTimesHistory } = vipStore();

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
  console.log(getVipLevelRewardHistory.value);
  getVipLevelRewardHistory.value.list.map((item) => {
    item.type = "Rank Bonus";
  });
  return getVipLevelRewardHistory.value;
});

const vipTimesHistory = computed(() => {
  const { getVipTimesHistory } = storeToRefs(vipStore());
  getVipTimesHistory.value.list.map((item) => {
    item.type = "Weekly Bonus";
  });
  return getVipTimesHistory.value;
});

const transactionTabs = ref<Array<string>>([
  t("transaction.tab.game_history"),
  t("transaction.tab.transactions"),
  t("transaction.tab.deposit"),
  t("transaction.tab.withdrawal"),
  t("transaction.tab.vip"),
  t("transaction.tab.referral"),
]);
const pageSize = ref<number>(8);
const pageNum = ref<number>(1);
const vipTimesHistoryIndex = ref<number>(1);
const selectedTab = ref<any>(t("transaction.tab.game_history"));

const transactionTab = computed(() => {
  const { getTransactionTab } = storeToRefs(bonusTransactionStore());
  return getTransactionTab.value;
});

watch(
  transactionTab,
  (newValue) => {
    selectedTab.value = newValue;
  },
  { deep: true }
);

const touchless = () => {
  return false;
};

const transactionTabToggle = (item: string) => {
  selectedTab.value = item;
};

watch(selectedTab, async (value) => {
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
  selectedTab.value = route.query.tab
    ? route.query.tab
    : t("transaction.tab.game_history");
  selectedTab.value =
    transactionTab.value == "" ? selectedTab.value : transactionTab.value;
  // await dispatchGameHistory({
  //   page_size: pageSize.value,
  //   start_time: Math.ceil(moment().valueOf() / 1000),
  // });
  await dispatchUserDepositHistory({
    page_size: pageSize.value,
    start_time: Math.ceil(moment().valueOf() / 1000),
  });
  await dispatchWithdrawalHistory({
    page_size: pageSize.value,
    start_time: Math.ceil(moment().valueOf() / 1000),
  });
  await dispatchTransactionHistory({
    page_size: pageSize.value,
    start_time: Math.ceil(moment().valueOf() / 1000),
    lid: 0,
  });
  await dispatchVipRebateHistory({
    page_num: pageNum.value,
    page_size: pageSize.value,
    start_time: Math.ceil(moment().valueOf() / 1000),
  });
  await dispatchVipLevelRewardHistory({
    page_num: pageNum.value,
    page_size: pageSize.value,
    start_time: Math.ceil(moment().valueOf() / 1000),
  });
  await dispatchVipTimesHistory({
    index: vipTimesHistoryIndex.value,
    page_num: pageNum.value,
    page_size: pageSize.value,
    start_time: Math.ceil(moment().valueOf() / 1000),
  });
});
</script>
<template>
  <v-slide-group
    class="mt-2 slide-tab-btns slide-tabs"
    v-model="selectedTab"
    show-arrows
    style="touch-action: none"
    :style="{
      marginLeft: mobileWidth < 600 ? '' : '16px !important',
      marginRight: mobileWidth < 600 ? '' : '16px !important',
    }"
  >
    <v-slide-group-item
      v-for="(item, index) in transactionTabs"
      :key="index"
      :value="item"
    >
      <v-btn
        class="ma-2 text-none transaction-tab-btn"
        :class="selectedTab == item ? 'white' : 'text-gray'"
        :color="selectedTab == item ? '#1D2027' : 'transparent'"
        @click="transactionTabToggle(item)"
        :width="mobileWidth < 600 ? 106 : 150"
      >
        {{ item }}
      </v-btn>
    </v-slide-group-item>
  </v-slide-group>
  <v-window v-model="selectedTab" :disable-swipe="true" :touch="touchless()">
    <v-window-item
      :value="t('transaction.tab.game_history')"
      style="margin-left: 10px; margin-right: 10px"
    >
      <GameHistory v-if="mobileWidth > 600" />
      <MGameHistory v-else />
    </v-window-item>
    <v-window-item
      :value="t('transaction.tab.transactions')"
      style="margin-left: 10px; margin-right: 10px"
    >
      <Transactions v-if="mobileWidth > 600" />
      <MTransactions
        :pageSize="pageSize"
        :transactionHistoryItem="transactionHistoryItem"
        v-else
      />
    </v-window-item>
    <v-window-item
      :value="t('transaction.tab.deposit')"
      style="margin-left: 10px; margin-right: 10px"
    >
      <Deposit v-if="mobileWidth > 600" />
      <MDeposit :pageSize="pageSize" :depositHistoryItem="depositHistoryItem" v-else />
    </v-window-item>
    <v-window-item
      :value="t('transaction.tab.withdrawal')"
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
    </v-window-item>
    <v-window-item
      :value="t('transaction.tab.vip')"
      style="margin-left: 10px; margin-right: 10px"
    >
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
        v-else
      />
    </v-window-item>
    <v-window-item
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
    </v-window-item>
  </v-window>
</template>
<style lang="scss">
.slide-tabs {
  background: #15161C !important;
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
    border-radius: 8px !important;
  }

  .transaction-tab-btn {
    box-shadow: none;

    .v-btn__content {
      font-size: 12px !important;
    }
  }

  .v-slide-group__next,
  .v-slide-group__prev {
    display: none !important;
  }
}
</style>
