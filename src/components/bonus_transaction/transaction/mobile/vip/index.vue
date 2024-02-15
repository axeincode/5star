<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRefs } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { type VipRebateHistoryItem, type VipRebateHistoryData, type VipLevelRewardHistoryData, type VipTimesHistoryData } from "@/interface/vip";
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import VipRebateHistory from './components/VipRebateHistory.vue';
import VipLevelRewardHistory from './components/VipLevelRewardHistory.vue';
import VipTimesHistory from './components/VipTimesHistory.vue';

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchVipRebateHistory } = vipStore();
const { dispatchVipTimesHistory } = vipStore();
const { dispatchVipLevelRewardHistory } = vipStore();

const props = defineProps<{
  pageSize: number
}>();

const { pageSize } = toRefs(props);

const paginationLength = ref<number>(0);

const loading = ref<boolean>(false);
const loadingIndex = ref<number>(0)
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);
const currentList = ref<Array<VipRebateHistoryItem>>([]);
const selectedHistoryIndex = ref<number>(1);

const transactionVIPMenuShow = ref<boolean>(false);
const selectedVipMenuItem = ref<string>(t('transaction.vip.text_1'));
const transactionVipMenuList = ref<Array<string>>([
  t('transaction.vip.text_1'),
  t('transaction.vip.text_2'),
  t('transaction.vip.text_3'),
  t('transaction.vip.text_4')
]);

const tempHistoryList = [{},{},{},{},{},{}];

const mobileWidth = computed(() => {
  return width.value;
});

const vipRebateHistory = computed(() => {
  const { getVipRebateHistory } = storeToRefs(vipStore());
  return getVipRebateHistory.value;
});

const vipLevelRewardHistory = computed(() => {
  const { getVipLevelRewardHistory } = storeToRefs(vipStore());
  return getVipLevelRewardHistory.value;
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

const pageNo = async (page_no: number) => {
  if (selectedVipMenuItem.value == t('transaction.vip.text_1')) {
    await dispatchVipRebateHistory({
      page_num: page_no,
      page_size: pageSize.value,
      start_time: Math.ceil(moment().valueOf() / 1000),
    });
    paginationLength.value = vipRebateHistory.value.total;
  }
  if (selectedVipMenuItem.value == t('transaction.vip.text_2')) {
    await dispatchVipLevelRewardHistory({
      page_num: page_no,
      page_size: pageSize.value,
      start_time: Math.ceil(moment().valueOf() / 1000),
    });
    paginationLength.value = vipLevelRewardHistory.value.total;
  }
  if (selectedVipMenuItem.value == t('transaction.vip.text_3')) {
    selectedHistoryIndex.value = 1;
    await dispatchVipTimesHistory({
      index: 1,
      page_num: page_no,
      page_size: pageSize.value,
      start_time: Math.ceil(moment().valueOf() / 1000),
    });
    paginationLength.value = vipTimesHistory.value.total;
  }
  if (selectedVipMenuItem.value == t('transaction.vip.text_4')) {
    selectedHistoryIndex.value = 2;
    await dispatchVipTimesHistory({
      index: 2,
      page_num: page_no,
      page_size: pageSize.value,
      start_time: Math.ceil(moment().valueOf() / 1000),
    });
    paginationLength.value = vipTimesHistory.value.total;
  }
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
  if (value == t('transaction.vip.text_1')) {
    await dispatchVipRebateHistory({
      page_num: 1,
      page_size: pageSize.value,
      start_time: Math.ceil(moment().valueOf() / 1000),
    });
    paginationLength.value = vipRebateHistory.value.total;
  }
  if (value == t('transaction.vip.text_2')) {
    await dispatchVipLevelRewardHistory({
      page_num: 1,
      page_size: pageSize.value,
      start_time: Math.ceil(moment().valueOf() / 1000),
    });
    paginationLength.value = vipLevelRewardHistory.value.total;
  }
  if (value == t('transaction.vip.text_4')) {
    selectedHistoryIndex.value = 2;
    await dispatchVipTimesHistory({
      index: 2,
      page_num: 1,
      page_size: pageSize.value,
      start_time: Math.ceil(moment().valueOf() / 1000),
    });
    paginationLength.value = vipTimesHistory.value.total;
  }
  if (value == t('transaction.vip.text_3')) {
    selectedHistoryIndex.value = 1;
    await dispatchVipTimesHistory({
      index: 1,
      page_num: 1,
      page_size: pageSize.value,
      start_time: Math.ceil(moment().valueOf() / 1000),
    });
    paginationLength.value = vipTimesHistory.value.total;
  }
})

onMounted(async () => {
  await dispatchVipRebateHistory({
    page_num: 1,
    page_size: pageSize.value,
    start_time: Math.ceil(moment().valueOf() / 1000),
  });
  paginationLength.value = vipRebateHistory.value.total
});
</script>
<template>
  <v-row class="mx-2 mt-1 m-forms-bonus-table1">
    <!-- <v-table
      class="m-forms-bonus-table-bg"
      :class="fixPositionShow ? 'table-position-overflow' : ''"
      theme="dark"
      fixed-header
      style="padding: 16px"
    >
      <thead class="forms-table-header">
        <tr>
          <th
            class="text-700-12 black text-center"
            style="border-radius: 8px 0px 0px 8px"
          >
            <div class="forms-table-border0">
              <div style="width: 50px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.vip.text_5") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 100px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.vip.text_6") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 90px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.vip.text_7") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="margin-left: 16px; margin-right: 16px">
                {{ t("transaction.vip.text_8") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border2">
              <div style="width: 100px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.vip.text_9") }}
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="forms-table-body">
        <template v-if="vipRebateHistory.list.length == 0">
          <tr v-for="(item, index) in tempHistoryList" :key="index">
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12"
              style="
                padding-top: 21px !important;
                padding-bottom: 21px !important;
                min-width: 60px;
              "
            ></td>
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12 color-D42763"
              style="
                padding-top: 21px !important;
                padding-bottom: 21px !important;
                min-width: 130px;
              "
            ></td>
            <td
              class="text-400-12"
              style="
                padding-top: 21px !important;
                padding-bottom: 21px !important;
                min-width: 130px;
              "
            ></td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(item, index) in vipRebateHistory.list.slice(startIndex, endIndex)"
            :key="index"
          >
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              {{ moment(item.created_at * 1000).format("YYYY-MM-DD HH:mm:ss") }}
            </td>
            <td
              class="text-400-12"
              style="
                padding-top: 21px !important;
                padding-bottom: 21px !important;
                min-width: 60px;
              "
            >
              R$ {{ Number(item.amount).toFixed(2) }}
            </td>
            <td
              class="text-400-12 color-01983A"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              R$ {{ Number(item.cash_back).toFixed(2) }}
            </td>
            <td
              class="text-400-12"
              style="
                padding-top: 21px !important;
                padding-bottom: 21px !important;
                min-width: 130px;
              "
            >
              VIP {{ item.vip_level }} / {{ Number(item.vip_rate).toFixed(2) }}%
            </td>
            <td
              class="text-400-12"
              style="
                padding-top: 21px !important;
                padding-bottom: 21px !important;
                min-width: 130px;
              "
            >
              <div>
                {{ item.game_type }}
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </v-table> -->
    <VipRebateHistory
      :currentList="vipRebateHistory.list"
      v-if="selectedVipMenuItem == t('transaction.vip.text_1')"
    />
    <VipLevelRewardHistory
      :currentList="vipLevelRewardHistory.list"
      v-if="selectedVipMenuItem == t('transaction.vip.text_2')"
    />
    <VipTimesHistory
      :currentList="vipTimesHistory.list"
      :selectedHistoryIndex="selectedHistoryIndex"
      v-if="
        selectedVipMenuItem == t('transaction.vip.text_3') ||
        selectedVipMenuItem == t('transaction.vip.text_4')
      "
    />
  </v-row>
  <v-row class="m-bonus-transaction-table-5">
    <v-col cols="6" class="d-flex" style="margin-left: -12px; margin-top: 4px">
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
              :title="selectedVipMenuItem"
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
            @click="handleTransactionMenuDropdown(item)"
            :class="
              selectedVipMenuItem == item
                ? 'm-transaction-vip-menu-selected-item white'
                : 'gray'
            "
            style="min-height: 36px !important"
          >
            <v-list-item-title class="text-400-12">{{ item }}</v-list-item-title>
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
    <v-col cols="6" class="d-flex" style="padding-right: 6px">
      <div style="width: 100%">
        <Pagination
          :length="paginationLength"
          @handlePrev="handlePrev"
          @handleNext="handleNext"
        />
      </div>
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
