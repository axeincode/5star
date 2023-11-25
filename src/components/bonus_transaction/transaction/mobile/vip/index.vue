<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRefs } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { withdrawStore } from "@/store/withdraw";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { WithdrawalHistoryItem, type WithdrawalHistoryResponse } from "@/interface/withdraw";
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchWithdrawalHistory } = withdrawStore();
const { dispatchWithdrawalRefund } = withdrawStore();

const props = defineProps<{
  pageSize: number;
  withdrawHistoryItem: WithdrawalHistoryResponse;
}>();

const { pageSize, withdrawHistoryItem } = toRefs(props);

const paginationLength = ref<number>(0);

const loading = ref<boolean>(false);
const loadingIndex = ref<number>(0)
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);
const currentList = ref<Array<WithdrawalHistoryItem>>([]);

const transactionVIPMenuShow = ref<boolean>(false);
const selectedVipMenuItem = ref<string>(t('transaction.vip.text_1'));
const transactionVipMenuList = ref<Array<string>>([
  t('transaction.vip.text_1'),
  t('transaction.vip.text_2'),
  t('transaction.vip.text_3'),
  t('transaction.vip.text_4')
]);

const tempHistoryList = [{},{},{},{},{},{}];

const success = computed(() => {
  const { getSuccess } = storeToRefs(withdrawStore());
  return getSuccess.value
})

const mobileWidth = computed(() => {
  return width.value;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

const handleNext = async (page_no: number) => {
  startIndex.value = (page_no - 1) * pageSize.value;
  endIndex.value = startIndex.value + pageSize.value;
  currentList.value = withdrawHistoryItem.value.record.slice(startIndex.value, endIndex.value);
  if (currentList.value.length == 0) {
    await dispatchWithdrawalHistory({
      page_size: pageSize.value,
      start_time: withdrawHistoryItem.value.record[withdrawHistoryItem.value.record.length - 1].created_at,
    });
  }
}

const handlePrev = async (page_no: number) => {
  startIndex.value = (page_no - 1) * pageSize.value;
  endIndex.value = startIndex.value + pageSize.value;
  currentList.value = withdrawHistoryItem.value.record.slice(startIndex.value, endIndex.value);
  if (currentList.value.length == 0) {
    await dispatchWithdrawalHistory({
      page_size: pageSize.value,
      end_time: withdrawHistoryItem.value.record[0].created_at,
    });
  }
}

const handleTransactionMenuDropdown = (item: string) => {
  selectedVipMenuItem.value = item;
}

watch(withdrawHistoryItem, (value) => {
  paginationLength.value = withdrawHistoryItem.value.total_pages
})

onMounted(async () => {
  paginationLength.value = withdrawHistoryItem.value.total_pages
});
</script>
<template>
  <v-row class="mx-2 mt-1 m-forms-bonus-table1">
    <v-table
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
        <template v-if="withdrawHistoryItem.record.length == 0">
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
            v-for="(item, index) in withdrawHistoryItem.record.slice(
              startIndex,
              endIndex
            )"
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
              {{ item.id }}
            </td>
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              {{ item.type }}
            </td>
            <td
              class="text-400-12 color-D42763"
              style="
                padding-top: 21px !important;
                padding-bottom: 21px !important;
                min-width: 130px;
              "
            >
              {{ item.amount }}
            </td>
            <td
              class="text-400-12"
              :class="withdrawalStatus[Number(item.status)].color"
              style="
                padding-top: 21px !important;
                padding-bottom: 21px !important;
                min-width: 130px;
              "
            >
              <div>
                {{ withdrawalStatus[Number(item.status)].value }}
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="m-bonus-transaction-table-5">
    <v-col cols="6" class="d-flex" style="margin-left: -12px; margin-top: 4px">
      <v-menu
        offset="20"
        content-class="m-transaction-vip-menu"
        v-model="transactionVIPMenuShow"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <v-card color="#1C1929" theme="dark" class="m-transaction-vip-menu-card">
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
        <v-list theme="dark" bg-color="#211F31" width="167">
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
.m-transaction-vip-menu {
}
.m-transaction-vip-menu-last {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 27px;
  background: #1c1929;
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  .v-list-item__content {
    height: 24px;
  }
}
.m-transaction-vip-menu-selected-item {
  border-radius: 12px;
  border: 1px solid #00b25c;
}
.m-transaction-vip-menu-card {
  width: 167px;
  height: 32px;
  border-radius: 12px;
  background: var(--BG-5-1C1929, #1c1929) !important;
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
  background: #1c1929 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 12px !important;
  width: 100% !important;
}

.v-table__wrapper {
  padding-bottom: 20px;
}

.m-forms-bonus-table1 {
  .v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
    background: #414968;
    height: 46px !important;
  }

  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border-bottom: 1px solid #414968;
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
    border-right: 1px solid #000000 !important;
  }

  .forms-table-border1 {
    border-left: 1px solid #000000 !important;
    border-right: 1px solid #000000 !important;
  }

  .forms-table-border2 {
    border-left: 1px solid #000000 !important;
  }

  .forms-table-border-right {
    padding-right: 20px;
    border-right: 1px solid #000000 !important;
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
