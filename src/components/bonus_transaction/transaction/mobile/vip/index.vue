<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRefs, nextTick } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { vipStore } from "@/store/vip";
import { mainStore } from "@/store/main";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { type VipRebateHistoryItem, type VipRebateHistoryData, type VipLevelRewardHistoryData, type VipTimesHistoryData } from "@/interface/vip";
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import VipRebateHistory from './components/VipRebateHistory.vue';
import VipLevelRewardHistory from './components/VipLevelRewardHistory.vue';
import VipTimesHistory from './components/VipTimesHistory.vue';
import VipSigninHistory from './components/VipSigninHistory.vue';
// 获取平台货币
import { appCurrencyStore } from "@/store/app";

enum History {
  rateBack = 'vipRebateHistory',
  rank = 'vipLevelRewardHistory',
  weekIy = 'vipWeekIyHistory',
  monthly = 'vipMonthlyHistory',
  login = 'vipSigninHistory',
}

const emit = defineEmits(['inited'])

const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});
const timeunix = computed(() => {
  const { getTimeunixDvalue } = storeToRefs(mainStore());
  return getTimeunixDvalue.value;
});

const { t } = useI18n();
const { width } = useDisplay();
const { setKeyOfVipHistoryEmpty } = vipStore();
const { dispatchVipRebateHistory } = vipStore();
const { dispatchVipTimesHistory } = vipStore();
const { dispatchVipLevelRewardHistory } = vipStore();
const { dispatchVipSigninHistory } = vipStore();

const props = defineProps<{
  pageSize: number
}>();

const { pageSize } = toRefs(props);
const pageRef = ref(null)
const paginationLength = ref<number>(1);

const loading = ref<boolean>(false);
const loadingIndex = ref<number>(0)
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);
const currentList = ref<Array<VipRebateHistoryItem>>([]);
const selectedHistoryIndex = ref<number>(1);
const startTime = ref(Math.ceil(moment().valueOf() / 1000)  + timeunix.value)
const transactionVIPMenuShow = ref<boolean>(false);
const selectedVipMenuItem = ref<string>(History.rateBack);
const transactionVipMenuList = ref<any[]>([
  {
    value: History.rateBack,
    label: 'transaction.vip.text_1'
  },
  {
    value: History.rank,
    label: 'transaction.vip.text_2'
  },
  {
    value: History.weekIy,
    label: 'transaction.vip.text_3'
  },
  {
    value: History.monthly,
    label: 'transaction.vip.text_4'
  },
  {
    value: History.login,
    label: 'transaction.vip.text_13'
  },
]);
  //     'vipRebateHistory',
  // t('transaction.vip.text_2'),
  // t('transaction.vip.text_3'),
  // t('transaction.vip.text_4'),
  // t('transaction.vip.text_13')
const tempHistoryList = [{},{},{},{},{},{}];

const mobileWidth = computed(() => {
  return width.value;
});
const readPageSize = computed(() => {
  return pageSize.value - 1;
});
const vipRebateHistory = computed(() => {
  const { getVipRebateHistory } = storeToRefs(vipStore());
  return getVipRebateHistory.value;
});

const vipLevelRewardHistory = computed(() => {
  const { getVipLevelRewardHistory } = storeToRefs(vipStore());
  return getVipLevelRewardHistory.value;
})

const vipSigninHistory = computed(() => {
  const { getVipSigninHistoryList } = storeToRefs(vipStore());
  return getVipSigninHistoryList.value;
})

const vipTimesHistory = computed(() => {
  const { getVipTimesHistory } = storeToRefs(vipStore());
  // getVipTimesHistory.value.list.map((item) => {
  //   item.type = "Weekly Bonus";
  // });
  return getVipTimesHistory.value;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});
// 菜单标题
const vipMenuTitle = computed(() => {
  const item = transactionVipMenuList.value.find(item => item.value === selectedVipMenuItem.value)
  return item?.label;
});

const pageNo = async (page_no: number) => {
  let total = 1
  switch(selectedVipMenuItem.value) {
    case History.rateBack:
      await dispatchVipRebateHistory({
        page_num: page_no,
        page_size: readPageSize.value,
        start_time: startTime.value,
      });
      total = vipRebateHistory.value.total;
      break;
    case History.rank:
      await dispatchVipLevelRewardHistory({
        page_num: page_no,
        page_size: readPageSize.value,
        start_time: startTime.value,
      });
      total = vipLevelRewardHistory.value.total;
      break;
    case History.weekIy:
      selectedHistoryIndex.value = 1;
      await dispatchVipTimesHistory({
        index: 1,
        page_num: page_no,
        page_size: readPageSize.value,
        start_time: startTime.value,
      });
      total = vipTimesHistory.value.total;
      break;
    case History.monthly:
        selectedHistoryIndex.value = 2;
        await dispatchVipTimesHistory({
          index: 2,
          page_num: page_no,
          page_size: readPageSize.value ,
          start_time: startTime.value,
        });
      total = vipTimesHistory.value.total;
      break;
    case History.login:
      await dispatchVipSigninHistory({
        page_num: page_no,
        page_size: readPageSize.value,
        start_time: startTime.value,
      })
      total = vipSigninHistory.value.total;
      break;
  }
  paginationLength.value = total
}

const handleNext = (page_no: number) => {
  pageNo(page_no);
}

const handlePrev = (page_no: number) => {
  pageNo(page_no);
}

const handleTransactionMenuDropdown = (item: string) => {
  selectedVipMenuItem.value = item;
}

// watch(vipRebateHistory, (value) => {
//   paginationLength.value = vipRebateHistory.value.total
// })

watch(selectedVipMenuItem, async (value) => {
  pageRef.value!.resetPageNo()
  
  paginationLength.value = 1;
  setKeyOfVipHistoryEmpty(History.rateBack);
  setKeyOfVipHistoryEmpty(History.rank);
  setKeyOfVipHistoryEmpty(History.weekIy);
  setKeyOfVipHistoryEmpty(History.monthly);
  setKeyOfVipHistoryEmpty(History.login);
  pageNo(1)
  // if (value == 'vipRebateHistory') {
  //   await dispatchVipRebateHistory({
  //     page_num: 1,
  //     page_size: pageSize.value,
  //     start_time: Math.ceil(moment().valueOf() / 1000),
  //   });
  //   paginationLength.value = vipRebateHistory.value.total;
  // }
  // if (value == t('transaction.vip.text_2')) {
  //   await dispatchVipLevelRewardHistory({
  //     page_num: 1,
  //     page_size: pageSize.value,
  //     start_time: Math.ceil(moment().valueOf() / 1000),
  //   });
  //   paginationLength.value = vipLevelRewardHistory.value.total;
  // }
  // if (value == t('transaction.vip.text_4')) {
  //   selectedHistoryIndex.value = 2;
  //   await dispatchVipTimesHistory({
  //     index: 2,
  //     page_num: 1,
  //     page_size: pageSize.value,
  //     start_time: Math.ceil(moment().valueOf() / 1000),
  //   });
  //   paginationLength.value = vipTimesHistory.value.total;
  // }
  // if (value == t('transaction.vip.text_3')) {
  //   selectedHistoryIndex.value = 1;
  //   await dispatchVipTimesHistory({
  //     index: 1,
  //     page_num: 1,
  //     page_size: pageSize.value,
  //     start_time: Math.ceil(moment().valueOf() / 1000),
  //   });
  //   paginationLength.value = vipTimesHistory.value.total;
  // }
  // if (value == t('transaction.vip.text_13')) {
  //   await dispatchVipSigninHistory({
  //     page_num: 1,
  //     page_size: pageSize.value,
  //     start_time: Math.ceil(moment().valueOf() / 1000),
  //   })
  //   paginationLength.value = vipSigninHistory.value.total;
  // }
})

onMounted(async () => {
  await dispatchVipRebateHistory({
    page_num: 1,
    page_size: readPageSize.value,
    start_time: startTime.value,
  });
  paginationLength.value = vipRebateHistory.value.total

  // 初始化完成
  emit('inited', false)
});
// 计算页数
// function getTotalPages(total:number, pageSize: number) {
//   if(total === 0) {
//     return 1
//   }
//   return Math.ceil(total / pageSize);
// }
</script>
<template>
  <v-row class="mx-2 mt-1 m-forms-bonus-table1">
    <VipRebateHistory
      :currentList="vipRebateHistory.list"
      v-if="selectedVipMenuItem == History.rateBack"
    />
    <VipLevelRewardHistory
      :currentList="vipLevelRewardHistory.list"
      v-if="selectedVipMenuItem == History.rank"
    />
    <VipTimesHistory
      :currentList="vipTimesHistory.list"
      :selectedHistoryIndex="selectedHistoryIndex"
      v-if="
        selectedVipMenuItem == History.weekIy ||
        selectedVipMenuItem == History.monthly
      "
    />
    <VipSigninHistory
      :currentList="vipSigninHistory.list"
      v-if="selectedVipMenuItem == History.login"
    />
  </v-row>
  <v-row class="m-bonus-transaction-table-5">
    <v-col class="d-flex" style="margin-left: -12px; margin-top: 4px">
      <v-menu
        offset="20"
        class="m-transaction-vip-menu"
        v-model="transactionVIPMenuShow"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <v-card color="#15161C" theme="dark" class="m-transaction-vip-menu-card">
            <v-list-item
              class="bonus-item text-700-12 px-2"
              v-bind="props"
              :title="t(vipMenuTitle)"
              :append-icon="
                transactionVIPMenuShow ? 'mdi-chevron-down' : 'mdi-chevron-up'
              "
              style="min-height: 32px !important"
            >
            </v-list-item>
          </v-card>
        </template>
        <v-list theme="dark" bg-color="#1D2027" width="167" style="border-radius: 8px">
          <v-list-item
            v-for="(item, i) in transactionVipMenuList"
            :key="i"
            :value="item"
            class="bonus-item mx-2"
            @click="handleTransactionMenuDropdown(item.value)"
            :class="
              selectedVipMenuItem == item.value
                ? 'm-transaction-vip-menu-selected-item white'
                : 'gray'
            "
            style="min-height: 36px !important"
          >
            <v-list-item-title class="text-400-12">{{ t(item.label) }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            class="mx-2 m-transaction-vip-menu-last py-0"
            style="min-height: 25px !important"
          >
            <img src="@/assets/public/svg/icon_public_50.svg" />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
    <v-col class="d-flex justify-end" style="padding-right: 10px;">
      <!-- <div style="width: 100%"> -->
        <Pagination
          ref="pageRef"
          :length="paginationLength"
          @handlePrev="handlePrev"
          @handleNext="handleNext"
        />
      <!-- </div> -->
    </v-col>
  </v-row>
</template>
<style lang="scss">
.m-transaction-vip-menu .v-overlay__content::after {
  content: "";
  position: absolute;
  align-self: center;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  border: 13px solid #1d2027;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-right-width: 8px;
  border-left-width: 8px;
}
.m-transaction-vip-menu-last {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #15161c;
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  .v-list-item__content {
    height: 24px;
  }
}
.m-transaction-vip-menu-selected-item {
  border-radius: 8px;
  border: 1px solid #00b25c;
}
.m-transaction-vip-menu-card {
  width: 167px;
  height: 32px;
  border-radius: 8px;
  background: var(--BG-5-1C1929, #15161c) !important;
  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  .v-list-item__content {
    width: 130px;
  }
  .v-list-item-title {
    width: 130px;
    color: #fff;
    font-family: Inter !important;
    font-size: 12px !important;
    font-style: normal !important;
    font-weight: 700 !important;
    line-height: normal;
  }
  .v-list-item__append > .v-icon {
    margin-inline-start: 0px !important;
  }
}
.m-forms-bonus-table-bg {
  background: #15161c !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.v-table__wrapper {
  padding-bottom: 20px;
}

.m-forms-bonus-table1 {
  .v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
    background: #23262f;
    height: 46px !important;
  }

  .v-table > .v-table__wrapper > table > tbody > tr > td,
  .v-table > .v-table__wrapper > table > tbody > tr > th,
  .v-table > .v-table__wrapper > table > thead > tr > td,
  .v-table > .v-table__wrapper > table > thead > tr > th,
  .v-table > .v-table__wrapper > table > tfoot > tr > td,
  .v-table > .v-table__wrapper > table > tfoot > tr > th {
    padding: 0px !important;
  }

  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border-bottom: 1px solid #23262f;
  }

  .forms-table-header {
    border-radius: 8px !important;
  }

  .forms-table-body {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    text-align: center;
  }

  .forms-table-border0 {
    border-right: 1px solid #7782aa !important;
  }

  .forms-table-border1 {
    border-left: 1px solid #7782aa !important;
    border-right: 1px solid #7782aa !important;
  }

  .forms-table-border2 {
    border-left: 1px solid #7782aa !important;
  }

  .forms-table-border-right {
    padding-right: 20px;
    border-right: 1px solid #7782aa !important;
  }

  .withdraw-refund-btn {
    width: 68px;
    height: 24px;
    flex-shrink: 0;

    .v-btn__content {
      font-weight: 400;
      font-size: 10px !important;
    }
  }
}

.m-bonus-transaction-table-5 {
  margin-left: 12px;
  margin-top: 16px !important;
  margin-bottom: 8px;
}

.m-withdraw-info-icon {
  background: transparent !important;
  box-shadow: none !important;
}

.table-position-overflow {
  .v-table__wrapper {
    overflow: hidden !important;
  }
}
</style>

<style lang="scss" scoped>
</style>
