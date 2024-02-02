<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { withdrawStore } from "@/store/withdraw";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchWithdrawalHistory } = withdrawStore();

const formsList = ref<Array<any>>([
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "150000000.00",
    status: "In Processing",
    note: "...",
    actionType: 1,
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Complete",
    note: "Payment Approved",
    actionType: 2,
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Refunded",
    note: "Refunded By User Request ",
    actionType: 3,
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Failed",
    note: "Payment Approved",
    actionType: 3,
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Payment in progress",
    note: "Payment Approved",
    actionType: 4,
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Refunded",
    note: "Rejected",
    actionType: 3,
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "No Refunded",
    note: "Rejected",
    actionType: 3,
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Complete",
    note: "Payment Approved",
    actionType: 3,
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Complete",
    note: "Payment Approved",
    actionType: 3,
  },
  {},
  {},
  {},
  {},
]);
const pageSize = ref<number>(1);

const mobileWidth = computed(() => {
  return width.value;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

onMounted(async () => {});
</script>
<template>
  <v-row class="mx-2 mt-4">
    <v-table class="forms-bonus-table-bg" theme="dark" fixed-header height="700px">
      <thead class="forms-table-header">
        <tr>
          <th class="forms-table-header-text" style="border-radius: 8px 0px 0px 8px">
            {{ t("transaction.transactions.date") }}
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">{{ t("transaction.transactions.id") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div>{{ t("transaction.transactions.type") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">
              {{ t("transaction.transactions.amount") }}
            </div>
          </th>
          <th class="forms-table-header-text">
            <div>{{ t("transaction.game_history.status") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">{{ t("transaction.transactions.note") }}</div>
          </th>
          <th class="forms-table-header-text" style="border-radius: 0px 8px 8px 0px">
            {{ t("transaction.withdraw.action") }}
          </th>
        </tr>
      </thead>
      <tbody class="forms-table-body">
        <tr v-for="(item, index) in formsList" :key="index">
          <td class="text-400-14">{{ item.date }}</td>
          <td class="text-400-14">{{ item.id }}</td>
          <td class="text-400-14">{{ item.type }}</td>
          <td class="text-400-14 color-D42763">{{ item.amount }}</td>
          <td
            class="text-400-14"
            :class="item.status == 'In Processing' ? 'color-F9BC01' : ''"
          >
            {{ item.status }}
          </td>
          <td
            class="text-400-14"
            :class="item.status == 'In Processing' ? 'color-F9BC01' : ''"
          >
            {{ item.note }}
          </td>
          <td class="text-400-16">
            <v-btn
              class="ma-2 button-bright text-none withdraw-refund-btn"
              rounded
              v-if="item.actionType == 1"
            >
              {{ t("transaction.withdraw.refund") }}
            </v-btn>
            <img
              src="@/assets/public/svg/icon_public_18.svg"
              v-if="item.actionType == 2"
            />
            <img
              src="@/assets/public/svg/icon_public_52.svg"
              v-if="item.actionType == 3"
              width="24"
            />
            <img
              src="@/assets/public/svg/icon_public_25.svg"
              v-if="item.actionType == 4"
              width="24"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="ma-4 mx-2">
    <v-col cols="4" class="d-flex" style="margin-left: -10px !important">
      <v-btn icon width="24" height="24" class="withdraw-info-icon">
        <v-icon>
          <img src="@/assets/public/svg/icon_public_53.svg" />
        </v-icon>
      </v-btn>
    </v-col>
    <v-col
      cols="8"
      class="d-flex"
      style="
        margin-left: 10px !important;
        padding-right: 0px !important;
        padding-left: 0px !important;
      "
    >
      <div style="float: right !important; width: 100%">
        <!-- <Pagination style="float: right" /> -->
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.forms-bonus-table-bg {
  height: 700px;
  background: #15161C !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.forms-bonus-table-bg::-webkit-scrollbar {
  width: 0px;
}

.v-table__wrapper::-webkit-scrollbar {
  width: 0px;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: 1px solid #23262F;
}

.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: #23262F;
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

.forms-table-header-text {
  font-weight: 700 !important;
  font-size: 16px !important;
  text-align: center !important;
  color: #000000 !important;
}

.forms-table-border {
  padding: 0px 20px;
  border-left: 1px solid #000000 !important;
  border-right: 1px solid #000000 !important;
}

.withdraw-refund-btn {
  .v-btn__content {
    font-weight: 600;
    font-size: 16px !important;
  }
}

.withdraw-info-icon {
  background: transparent !important;
  box-shadow: none !important;
}
</style>
