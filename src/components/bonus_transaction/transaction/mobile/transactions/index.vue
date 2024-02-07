<script lang="ts" setup>
import { ref, computed, watch, toRefs, onMounted } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { type TransactionHistoryResponse, type TransactionHistoryItem } from "@/interface/transaction";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import * as clipboard from "clipboard-polyfill";
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchTransactionHistory } = bonusTransactionStore();
const props = defineProps<{ pageSize: number, transactionHistoryItem: TransactionHistoryResponse }>()

const { pageSize, transactionHistoryItem } = toRefs(props);

const formsList = ref<Array<any>>([
  {
    date: "2023/1/29 17:50:36",
    amount: "R$3000000000.00",
    type: "Game Win",
    id: "re54er35sgf",
    note: "",
    balance: "R$ 300000000.00",
  },
]);

const paginationLength = ref<number>(1);
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);
const currentList = ref<Array<TransactionHistoryItem>>([]);

const notificationText = ref<string>('Successful replication');

const tempHistoryList = [{},{},{},{},{},{},{},{}];

const mobileWidth = computed(() => {
  return width.value;
});

const success = computed(() => {
  const { getSuccess } = storeToRefs(bonusTransactionStore());
  return getSuccess.value
})

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

const moreTransactionHistoryFlag = computed(() => {
  const { getMoreTransactionHistoryFlag } = storeToRefs(bonusTransactionStore());
  return getMoreTransactionHistoryFlag.value
})

const handleNext = async (page_no: number) => {
  startIndex.value = (page_no - 1) * pageSize.value;
  endIndex.value = startIndex.value + pageSize.value;
  currentList.value = transactionHistoryItem.value.record.slice(startIndex.value, endIndex.value);
  if (currentList.value.length == 0) {
    await dispatchTransactionHistory({
      page_size: pageSize.value,
      start_time: transactionHistoryItem.value.record[transactionHistoryItem.value.record.length - 1].created_at,
      lid: transactionHistoryItem.value.record[transactionHistoryItem.value.record.length - 1].id,
    });
  }
}

const handlePrev = async (page_no: number) => {
  startIndex.value = (page_no - 1) * pageSize.value;
  endIndex.value = startIndex.value + pageSize.value;
  currentList.value = transactionHistoryItem.value.record.slice(startIndex.value, endIndex.value);
  if (currentList.value.length == 0) {
    await dispatchTransactionHistory({
      page_size: pageSize.value,
      end_time: transactionHistoryItem.value.record[0].created_at,
      lid: transactionHistoryItem.value.record[0].id,
    });
  }
}

const handleCopyID = async (id: string) => {
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
watch(transactionHistoryItem, (value) => {
  console.log(value);
  paginationLength.value = moreTransactionHistoryFlag.value && transactionHistoryItem.value.record.length % 8 == 0 ? paginationLength.value + 1 : paginationLength.value
}, { deep: true });

onMounted(async () => {
  paginationLength.value = moreTransactionHistoryFlag.value && transactionHistoryItem.value.record.length % 8 == 0 ? paginationLength.value + 1 : paginationLength.value
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
              <div style="width: 50px; margin-left: 16px; margin-right: 20px">
                {{ t("transaction.transactions.date") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center" style="width: 130px">
            <div class="forms-table-border1">
              <div style="width: 120px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.transactions.amount") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 50px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.transactions.type") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 60px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.transactions.id") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 40px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.transactions.note") }}
              </div>
            </div>
          </th>
          <th
            class="text-700-12 black text-center"
            style="border-radius: 0px 8px 8px 0px"
          >
            <div class="forms-table-border2">
              <div style="width: 120px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.transactions.balance") }}
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="forms-table-body">
        <template v-if="transactionHistoryItem.record.length == 0">
          <tr v-for="(item, index) in tempHistoryList" :key="index">
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12"
              style="
                min-width: 160px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
            ></td>
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12"
              style="
                min-width: 60px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
            ></td>
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12"
              style="
                min-width: 130px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
            ></td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(item, index) in transactionHistoryItem.record.slice(
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
                min-width: 160px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
              :class="
                Number(item.type) != -102 && item.type != -202
                  ? 'color-01983A'
                  : 'color-D42763'
              "
            >
              {{ item.amount }}
            </td>
            <td
              class="text-400-12"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              <template v-if="Number(item.type) == 101">
                {{ t("transaction_history.type.text_1") }}
              </template>
              <template v-if="Number(item.type) == -102">
                {{ t("transaction_history.type.text_2") }}
              </template>
              <template v-if="Number(item.type) == 103">
                {{ t("transaction_history.type.text_3") }}
              </template>
              <template v-if="Number(item.type) == 104">
                {{ t("transaction_history.type.text_4") }}
              </template>
              <template v-if="Number(item.type) == 201">
                {{ t("transaction_history.type.text_5") }}
              </template>
              <template v-if="Number(item.type) == -202">
                {{ t("transaction_history.type.text_6") }}
              </template>
              <template v-if="Number(item.type) == -203">
                {{ t("transaction_history.type.text_7") }}
              </template>
              <template v-if="Number(item.type) == 204">
                {{ t("transaction_history.type.text_8") }}
              </template>
              <template v-if="Number(item.type) == 301">
                {{ t("transaction_history.type.text_9") }}
              </template>
              <template v-if="Number(item.type) == 401">
                {{ t("transaction_history.type.text_10") }}
              </template>
              <template v-if="Number(item.type) == 901">
                {{ t("transaction_history.type.text_11") }}
              </template>
              <template v-if="Number(item.type) == -902">
                {{ t("transaction_history.type.text_12") }}
              </template>
              <template v-if="Number(item.type) == 801">
                {{ t("transaction_history.type.text_13") }}
              </template>
              <template v-if="Number(item.type) == -802">
                {{ t("transaction_history.type.text_14") }}
              </template>
            </td>
            <td
              class="text-400-12"
              style="
                min-width: 60px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
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
              {{ item.note }}
            </td>
            <td
              class="text-400-12"
              style="
                min-width: 130px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
            >
              R$ {{ item.balance }}
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="m-bonus-transaction-table1">
    <Pagination
      style="margin-top: 4px"
      :length="paginationLength"
      @handlePrev="handlePrev"
      @handleNext="handleNext"
    />
  </v-row>
</template>
<style lang="scss">
.m-forms-bonus-table-bg {
  background: #15161c !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  // border-radius: 8px !important;
  width: 100% !important;
}

.m-forms-bonus-table1 {
  .v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
    box-shadow: none !important;
  }
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
}

.m-bonus-transaction-table1 {
  float: right;
  margin-right: 4px;
  margin-top: 20px !important;
  margin-bottom: 20px;
}

.table-position-overflow {
  .v-table__wrapper {
    overflow: hidden !important;
  }
}
</style>
