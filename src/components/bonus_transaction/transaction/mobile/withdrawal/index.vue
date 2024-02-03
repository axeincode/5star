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
import * as clipboard from "clipboard-polyfill";
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchWithdrawalHistory } = withdrawStore();
const { dispatchWithdrawalRefund } = withdrawStore();

const withdrawalStatus = [
  {
    value: "Pending",
    color: "white",
  },
  {
    value: "Processing",
    color: "white",
  },
  {
    value: "Success",
    color: "color-01983A",
  },
  {
    value: "Failed",
    color: "red",
  },
  {
    value: "Waiting for manual processing.",
    color: "white",
  },
]

const props = defineProps<{
  pageSize: number;
  withdrawHistoryItem: WithdrawalHistoryResponse;
}>();

const { pageSize, withdrawHistoryItem } = toRefs(props);

const paginationLength = ref<number>(0);

const notificationText = ref<string>('Successful replication');

const loading = ref<boolean>(false);
const loadingIndex = ref<number>(0)
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);
const currentList = ref<Array<WithdrawalHistoryItem>>([]);

const tempHistoryList = [
  {
    id: "",
    created_at: "",
    type: "",
    note: "",
    status: "",
    amount: "",
    currency_type: "",
  },
  {
    id: "",
    created_at: "",
    type: "",
    note: "",
    status: "",
    amount: "",
    currency_type: "",
  },
  {
    id: "",
    created_at: "",
    type: "",
    note: "",
    status: "",
    amount: "",
    currency_type: "",
  },
  {
    id: "",
    created_at: "",
    type: "",
    note: "",
    status: "",
    amount: "",
    currency_type: "",
  },
  {
    id: "",
    created_at: "",
    type: "",
    note: "",
    status: "",
    amount: "",
    currency_type: "",
  },
  {
    id: "",
    created_at: "",
    type: "",
    note: "",
    status: "",
    amount: "",
    currency_type: "",
  },
]

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

const refundWithdrawalSubmit = async (id: number, index: number) => {
  loadingIndex.value = index;
  loading.value = true;
  await dispatchWithdrawalRefund({ id });
  loading.value = false
  if (success.value) {
    const toast = useToast();
    toast.success("Successfully Refunded", {
      timeout: 3000,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: SuccessIcon,
      rtl: false,
    });
  }
}

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

const handleCopyID = async (id: number) => {
  clipboard.writeText(id).then(
    () => {
      console.log('Copied to clipboard!');
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 3000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: SuccessIcon,
        rtl: false,
      });
    },
    (error) => {
      console.error('Could not copy text: ', error);
    }
  );
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
                {{ t("transaction.transactions.date") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 100px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.transactions.amount") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 90px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.game_history.status") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="margin-left: 16px; margin-right: 16px">
                {{ t("transaction.transactions.type") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 100px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.transactions.id") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 90px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.transactions.note") }}
              </div>
            </div>
          </th>
          <th
            class="text-700-12 black text-center"
            style="border-radius: 0px 8px 8px 0px"
          >
            <div class="forms-table-border2">
              <div style="width: 90px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.withdraw.action") }}
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
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
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
              <div class="d-flex justify-center">
                {{
                  item.id.toString().length > 11
                    ? item.id.toString().slice(0, 11) + "..."
                    : item.id
                }}
                <img
                  src="@/assets/public/svg/icon_public_71.svg"
                  width="16"
                  class="ml-1"
                  @click="handleCopyID(item.id)"
                />
              </div>
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
            <td
              class="text-400-12"
              :class="item.status == 1 ? 'color-F9BC01' : ''"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              {{ item.note }}
            </td>
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              <v-btn
                class="ma-2 button-bright text-none withdraw-refund-btn"
                rounded
                v-if="item.status == 0 || item.status == 1"
                :loading="index == loadingIndex ? loading : false"
                @click="refundWithdrawalSubmit(item.id, index)"
              >
                {{ t("transaction.withdraw.refund") }}
              </v-btn>
              <img src="@/assets/public/svg/icon_public_18.svg" v-if="item.status == 2" />
              <img
                src="@/assets/public/svg/icon_public_52.svg"
                v-if="item.status == 3"
                width="24"
              />
              <img
                src="@/assets/public/svg/icon_public_25.svg"
                v-if="item.status == 4"
                width="24"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="m-bonus-transaction-table3">
    <v-col cols="4" class="d-flex" style="margin-left: -12px; margin-top: 4px">
      <v-btn icon width="24" height="24" class="m-withdraw-info-icon">
        <v-icon>
          <img src="@/assets/public/svg/icon_public_53.svg" />
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="8" class="d-flex" style="padding-right: 6px">
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
.m-forms-bonus-table-bg {
  background: #15161C !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.v-table__wrapper {
  padding-bottom: 20px;
}

.m-forms-bonus-table1 {
  .v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
    background: #23262F;
    height: 46px !important;
  }

  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border-bottom: 1px solid #23262F;
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
    border-right: 1px solid #7782AA !important;
  }

  .forms-table-border1 {
    border-left: 1px solid #7782AA !important;
    border-right: 1px solid #7782AA !important;
  }

  .forms-table-border2 {
    border-left: 1px solid #7782AA !important;
  }

  .forms-table-border-right {
    padding-right: 20px;
    border-right: 1px solid #7782AA !important;
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

.m-bonus-transaction-table3 {
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
