<script lang="ts" setup>
import { ref, computed, watch, toRefs } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { type DepositHistoryResponse } from "@/interface/deposit";
import * as clipboard from "clipboard-polyfill";
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';

const { t } = useI18n();
const { width } = useDisplay();

const props = defineProps<{
  pageSize: number;
  depositHistoryItem: DepositHistoryResponse;
}>();

const { pageSize, depositHistoryItem } = toRefs(props);

const formsList = ref<Array<any>>([
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Cancelled",
    note: "",
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Cancelled",
    note: "",
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Cancelled",
    note: "",
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: "R$ 150.00",
    status: "Cancelled",
    note: "",
  },
  {},
  {}
]);

const paginationLength = ref<number>(0);

const notificationText = ref<string>('Successful replication');

const mobileWidth = computed(() => {
  return width.value;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

const handleCopyID = async (id: number) => {
  clipboard.writeText(id.toString()).then(
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

watch(depositHistoryItem, (value) => {
  paginationLength.value = Math.ceil(value.total_pages / pageSize.value)
})
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
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 80px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.transactions.amount") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 50px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.game_history.status") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 50px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.transactions.type") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 120px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.transactions.id") }}
              </div>
            </div>
          </th>
          <th
            class="text-700-12 black text-center"
            style="border-radius: 0px 8px 8px 0px"
          >
            <div class="forms-table-border2">
              <div style="width: 90px; margin-left: 16px; margin-right: 16px">
                {{ t("transaction.transactions.note") }}
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="forms-table-body">
        <template v-if="depositHistoryItem.record.length == 0">
          <tr v-for="(item, index) in formsList" :key="index">
            <td
              class="text-400-12 text-center"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12 text-center"
              style="
                min-width: 60px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
            ></td>
            <td
              class="text-400-12 text-center"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12 text-center color-01983A"
              style="
                min-width: 130px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
            ></td>
            <td
              class="text-400-12 text-center"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
            <td
              class="text-400-12 text-center"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            ></td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in depositHistoryItem.record" :key="index">
            <td
              class="text-400-12 text-center"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              {{ moment(item.created_at * 1000).format("YYYY-MM-DD HH:mm:ss") }}
            </td>
            <td
              class="text-400-12 text-center color-01983A"
              style="
                min-width: 130px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
            >
              R$ {{ item.amount }}
            </td>
            <td
              class="text-400-12 text-center"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              <div v-if="item.status == -2" class="white">Closed</div>
              <div v-if="item.status == -1" class="red">Failed</div>
              <div v-if="item.status == 0" class="red">Generated</div>
              <div v-if="item.status == 1" class="white">In progress</div>
              <div v-if="item.status == 2" class="color-01983A">Success</div>
              <div v-if="item.status == 3" class="color-01983A">Completion</div>
              <div v-if="item.status == 4" class="white">Refunded</div>
            </td>
            <td
              class="text-400-12 text-center"
              style="
                min-width: 40px;
                padding-top: 21px !important;
                padding-bottom: 21px !important;
              "
            >
              {{ item.type }}
            </td>
            <td
              class="text-400-12 text-center"
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
              class="text-400-12 text-center"
              style="padding-top: 21px !important; padding-bottom: 21px !important"
            >
              {{ item.note }}
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="m-bonus-transaction-table2">
    <Pagination style="margin-top: 4px" :length="paginationLength" />
  </v-row>
</template>
<style lang="scss">
.m-forms-bonus-table-bg {
  background: #15161c !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
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
}

.m-bonus-transaction-table2 {
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
