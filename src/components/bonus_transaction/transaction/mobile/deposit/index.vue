<script lang="ts" setup>
import { ref, computed, watch, toRefs,onMounted } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { type DepositHistoryResponse, type DepositHistoryItem } from "@/interface/deposit";
import { depositStore } from "@/store/deposit";
import * as clipboard from "clipboard-polyfill";
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { toFormatNum } from '@/utils/numFormat'
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchUserDepositHistory } = depositStore();
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
    amount: platformCurrency.value + " 150.00",
    status: "Cancelled",
    note: "",
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: platformCurrency.value + " 150.00",
    status: "Cancelled",
    note: "",
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: platformCurrency.value + " 150.00",
    status: "Cancelled",
    note: "",
  },
  {
    date: "2023/1/29 17:50:36",
    id: "re54er35sgf",
    type: "pix",
    amount: platformCurrency.value + " 150.00",
    status: "Cancelled",
    note: "",
  },
  {},
  {},
  {},
  {}
]);

const paginationLength = ref<number>(1);
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);
const currentList = ref<Array<DepositHistoryItem>>([]);

const notificationText = ref<string>('Successful replication');
const isScrollRight=ref(false)

const mobileWidth = computed(() => {
  return width.value;
});
// 用于页码计算 一页八个 pageSize.value=9
const realPageSize = computed(() => {
  return pageSize.value - 1
})

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});
// 是否显示下一页
const moreDepositHistoryFlag = computed(() => {
  const { getMoreDepositHistoryFlag } = storeToRefs(depositStore());
  return getMoreDepositHistoryFlag.value
})

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

const handleNext = async (page_no: number) => {
  startIndex.value = (page_no - 1) * realPageSize.value;
  endIndex.value = startIndex.value + realPageSize.value;
  currentList.value = depositHistoryItem.value.record.slice(startIndex.value, endIndex.value);
  if (currentList.value.length == 0) {
    await dispatchUserDepositHistory({
      page_size: pageSize.value,
      start_time: depositHistoryItem.value.record[depositHistoryItem.value.record.length - 1].created_at,
      lid: depositHistoryItem.value.record[depositHistoryItem.value.record.length - 1].id.toString(),
    });
  }
}

const handlePrev = async (page_no: number) => {
  startIndex.value = (page_no - 1) * realPageSize.value;
  endIndex.value = startIndex.value + realPageSize.value;
  currentList.value = depositHistoryItem.value.record.slice(startIndex.value, endIndex.value);
  if (currentList.value.length == 0) {
    await dispatchUserDepositHistory({
      page_size: pageSize.value,
      end_time: depositHistoryItem.value.record[0].created_at,
      lid: depositHistoryItem.value.record[0].id.toString(),
    });
  }
}

watch(depositHistoryItem, (value) => {
  console.log(value, 'depositHistoryItem-watch');
  
  paginationLength.value = moreDepositHistoryFlag.value ? paginationLength.value + 1 : paginationLength.value
}, { deep: true, immediate: true })

const formatCurrency = (currency: number, currencyUnit: string) => {
  if(!currency && !currencyUnit) {
    return ''
  }

  let locale = 'pt-BR';
  switch (currencyUnit) {
    case "BRL":
      locale = 'pt-BR';
      break;
    case "PHP":
      locale = 'en-PH';
      break;
    case "PEN":
      locale = 'en-PE';
      break;
    case "MXN":
      locale = 'es-MX';
      break;
    case "CLP":
      locale = 'es-CL';
      break;
    case "USD":
      locale = 'en-US';
    case "COP":
      locale = 'es-CO';
      break;
  }
  const fomarttedAmount = currency.toLocaleString(locale, {
    style: "currency",
    currency: currencyUnit,
  })

  return fomarttedAmount
}

// 有值则转化，没值显示空
const getFormatAmount = (amount) => {
  return amount ? `${platformCurrency.value}${toFormatNum(Number(amount))}` : ''
}

const handleScroll=()=>{
  const scrollContainer = document.getElementsByClassName('v-table__wrapper')[0];
  scrollContainer.addEventListener('scroll', ()=> {
  // 当前滚动位置
  const scrollPosition = scrollContainer.scrollLeft;
  // 容器总宽度
  const totalWidth = scrollContainer.scrollWidth;
  // 容器可视区域宽度
  const containerWidth = scrollContainer.clientWidth;
 
  // 检查是否滚动到最右边
  if (scrollPosition + containerWidth >= totalWidth) {
    isScrollRight.value=true
    // 执行到达最右边时的操作
  }else{
     isScrollRight.value=false
  }
});
}
onMounted(async () => {
  handleScroll()
});
// 存款状态
// -2:订单已关闭
// -1:支付失败
// 0-订单生成
// 1-支付中
// 2-支付成功,
// 3-业务处理完成
// 4-已退款
// 5-金额过低（订单失败）
</script>
<template>
  <v-row class="mx-2 mt-1 m-forms-bonus-table1">
    <v-table
      class="m-forms-bonus-table-bg relative"
      :class="fixPositionShow ? 'table-position-overflow' : ''"
      theme="dark"
      fixed-header
      style="padding: 16px"
      height="570px"
    >
      <thead class="forms-table-header">
        <tr>
          <th class="text-700-12 black text-center" style="border-radius: 8px 0px 0px 8px">
            <div class="forms-table-border0">
              <div
                style="width: 50px; margin-left: 16px; margin-right: 20px"
              >{{ t("transaction.transactions.date") }}</div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div
                style="width: 80px; margin-left: 16px; margin-right: 16px"
              >{{ t("transaction.transactions.amount") }}</div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div
                style="width: 50px; margin-left: 16px; margin-right: 16px"
              >{{ t("transaction.game_history.status") }}</div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div
                style="width: 50px; margin-left: 16px; margin-right: 16px"
              >{{ t("transaction.transactions.type") }}</div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div
                style="width: 120px; margin-left: 16px; margin-right: 16px"
              >{{ t("transaction.transactions.id") }}</div>
            </div>
          </th>
          <th class="text-700-12 black text-center" style="border-radius: 0px 8px 8px 0px">
            <div class="forms-table-border2">
              <div
                style="width: 90px; margin-left: 16px; margin-right: 16px"
              >{{ t("transaction.transactions.note") }}</div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="forms-table-body">
        <template v-if="depositHistoryItem.record.length == 0">
          <tr v-for="(item, index) in formsList" :key="index">
            <td class="text-400-12 text-center" style></td>
            <td
              class="text-400-12 text-center"
              style="
                min-width: 60px;
              "
            ></td>
            <td class="text-400-12 text-center" style></td>
            <td
              class="text-400-12 text-center color-01983A"
              style="
                min-width: 130px;
              "
            ></td>
            <td class="text-400-12 text-center" style></td>
            <td class="text-400-12 text-center" style></td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(item, index) in depositHistoryItem.record.slice(startIndex, endIndex)"
            :key="index"
          >
            <td class="text-400-12 text-center" style>
              {{
              item.created_at
              ? moment(item.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")
              : ""
              }}
            </td>
            <td
              class="text-400-12 text-center color-01983A"
              style="
                min-width: 130px;
              "
            >{{ getFormatAmount(item.amount) }}</td>
            <td class="text-400-12 text-center" style>
              <div v-if="item.status == -2" class="white">Closed</div>
              <div v-if="item.status == -1" class="red">Failed</div>
              <div v-if="item.status == 0" class="red">Generated</div>
              <div v-if="item.status == 1" class="white">In progress</div>
              <div v-if="item.status == 2" class="color-01983A">Success</div>
              <div v-if="item.status == 3" class="color-01983A">Completion</div>
              <div v-if="item.status == 4" class="white">Refunded</div>
              <div v-if="item.status == 5" class="white">Low Amount(Failed)</div>
            </td>
            <td
              class="text-400-12 text-center"
              style="
                min-width: 40px;
              "
            >{{ item.type }}</td>
            <td
              class="text-400-12 text-center"
              style="
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
                  v-show="item.id"
                  src="@/assets/public/svg/icon_public_71.svg"
                  width="16"
                  class="ml-1"
                  @click="handleCopyID(item.id)"
                />
              </div>
            </td>
            <td class="text-400-12 text-center" style>{{ item.note }}</td>
          </tr>
        </template>
        <div class="arrow" v-if="!isScrollRight">
          <img class="arrow-img" src="@/assets/public/svg/arrow-right.svg" />
        </div>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="m-bonus-transaction-table2">
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
  border-radius: 8px !important;
  width: 100% !important;
}

.m-forms-bonus-table1 {
  .v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
    background: #23262f;
    height: 46px !important;
  }

  // .v-table > .v-table__wrapper > table > tbody > tr > td,
  // .v-table > .v-table__wrapper > table > tbody > tr > th,
  // .v-table > .v-table__wrapper > table > thead > tr > td,
  // .v-table > .v-table__wrapper > table > thead > tr > th,
  // .v-table > .v-table__wrapper > table > tfoot > tr > td,
  // .v-table > .v-table__wrapper > table > tfoot > tr > th {
  //   padding: 0px !important;
  // }

  // .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  // .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  //   border-bottom: 1px solid #23262f;
  // }

  // .forms-table-header {
  //   border-radius: 8px !important;
  // }

  // .forms-table-body {
  //   font-weight: 500;
  //   font-size: 16px;
  //   line-height: 19px;
  //   color: #ffffff;
  //   text-align: center;
  // }

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

.arrow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateX(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 32px;
  background: #000;
  .arrow-img {
    width: 14px;
    height: 14px;
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
