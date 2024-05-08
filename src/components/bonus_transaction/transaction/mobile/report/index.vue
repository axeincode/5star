<template>
  <div class="report">
    <v-row class="mx-2 mt-1 m-forms-bonus-table1">
      <!-- <BettingCommission
        :currentList="currentList"
        v-if="selectedMenuItem == Report.bettingCommission"
      /> -->
      <!-- v-if="selectedMenuItem == Report.invitationbonus" -->
      <Invitationbonus :currentList="state.currentList" />
    </v-row>
    <v-row class="m-bonus-transaction-table-5">
      <v-col class="d-flex" style="margin-left: -12px; margin-top: 4px">
        <v-menu
          offset="20"
          class="m-transaction-vip-menu"
          v-model="menuShow"
          location="top"
        >
          <template v-slot:activator="{ props }">
            <v-card
              color="#15161C"
              theme="dark"
              class="m-transaction-vip-menu-card"
            >
              <v-list-item
                class="bonus-item text-700-12 px-2"
                v-bind="props"
                :title="t(vipMenuTitle)"
                :append-icon="
                  menuShow ? 'mdi-chevron-down' : 'mdi-chevron-up'
                "
                style="min-height: 32px !important"
              >
              </v-list-item>
            </v-card>
          </template>
          <v-list
            theme="dark"
            bg-color="#1D2027"
            width="167"
            style="border-radius: 8px"
          >
            <v-list-item
              v-for="(item, i) in reportMenuList"
              :key="i"
              :value="item"
              class="bonus-item mx-2"
              @click="handleTransactionMenuDropdown(item.value)"
              :class="
                selectedMenuItem == item.value
                  ? 'm-transaction-vip-menu-selected-item white'
                  : 'gray'
              "
              style="min-height: 36px !important"
            >
              <v-list-item-title class="text-400-12">{{
                t(item.label)
              }}</v-list-item-title>
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
      <v-col class="d-flex justify-end" style="padding-right: 10px">
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
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  toRefs,
  watchEffect,
  reactive,
} from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { useToast } from "vue-toastification";
import { appCurrencyStore } from "@/store/app";
import { mainStore } from "@/store/main";
import BettingCommission from "./components/bettingCommission.vue";
import Invitationbonus from "./components/invitationbonus.vue";
import { Network } from "@/net/Network";
import { NETWORK } from "@/net/NetworkCfg";

enum Report {
  invitationbonus = "invitation bonus", // 邀请奖金
  bettingCommission = "betting Commission",
}

const api1: string = NETWORK.INVITE_PAGE.INVITE_HISTORY_CONFIG;
const queryListApi: string = NETWORK.INVITE_PAGE.INVITE_HISTORY;

const network: Network = Network.getInstance();

const emit = defineEmits(["inited"]);

const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});
const timeunix = computed(() => {
  const { getTimeunixDvalue } = storeToRefs(mainStore());
  return getTimeunixDvalue.value;
});
const bettingCommission = ref([]);
const invitationbonus = ref([]);
const { t } = useI18n();
const { width } = useDisplay();

const props = defineProps<{
  pageSize: number;
}>();

const { pageSize } = toRefs(props);
const paginationLength = ref<number>(1);
const currentDate = moment();
// 获取今天之前的90天的日期 也就是三个月
const dateBefore90Days = currentDate.clone().subtract(90, 'days');
const startTime = ref(
  Math.ceil(currentDate.valueOf() / 1000)
);
const endTime = ref(Math.ceil(dateBefore90Days.valueOf() / 1000))
const loading = ref<boolean>(false);
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);
const pageRef = ref(null);
const selectedMenuItem = ref<string>(Report.invitationbonus);endIndex
const menuShow = ref<boolean>(false);
const reportMenuList = ref<any[]>([
  {
    index: 1,
    value: Report.invitationbonus,
    label: "transaction.report.invitationbonus", // transaction.report.invitationbonus
  },
  {
    index: 2,
    value: Report.bettingCommission,
    label: "transaction.report.bettingCommission", // transaction.report.bettingCommission
  },
]);
const state = reactive({
  currentList: [],
  moreHistoryFlag: false,
  selectedList: []
});
const tempHistoryList = [{}, {}, {}, {}, {}, {}];
// 用于页码计算 一页八个 pageSize.value = 9
const realPageSize = computed(() => {
  return pageSize.value - 1;
});
const mobileWidth = computed(() => {
  return width.value;
});
const readPageSize = computed(() => {
  return pageSize.value - 1;
});

watchEffect(() => {
  let resultArr = [];

  if (selectedMenuItem.value == Report.bettingCommission) {
    resultArr = bettingCommission.value;
  } else if (selectedMenuItem.value == Report.invitationbonus) {
    resultArr = invitationbonus.value;
  }

  state.selectedList = resultArr;
  state.currentList = resultArr.slice(startIndex.value, endIndex.value);
  paginationLength.value = state.moreHistoryFlag
    ? paginationLength.value + 1
    : paginationLength.value;
});
let count = 1;
// 菜单标题
const vipMenuTitle = computed(() => {
  const item = reportMenuList.value.find(
    (item) => item.value === selectedMenuItem.value
  );
  return item?.label;
});
let query = (init: boolean = false) => {
  const temparams = {
    index: 1,
    size: 100,
    first_time: endTime.value,
    last_time: startTime.value,
  };
  switch (selectedMenuItem.value) {
    case Report.invitationbonus:
      temparams.index = 1;
      break;
    case Report.bettingCommission:
      temparams.index = 2;
      break;
  }

  network
    .request({
      url: queryListApi,
      method: "POST",
      data: {
        ...temparams,
      },
    })
    .then((res) => {
      const baseArr = [0, 1, 2, 3, 4, 5, 6, 7];
      const tempResData = res.data;
      //  是否显示下一页
      if (tempResData.list.length < 9) {
        state.moreHistoryFlag = false;
      } else {
        state.moreHistoryFlag = true;
      }
      let record = tempResData.list.slice(0, 8);
      let currentArr = [];
      baseArr.map((index) => {
        if (record[index]) {
          currentArr.push({
            ...record[index],
            count: count++,
          });
        } else {
          currentArr.push({
            time: "",
            user: "",
            bouns: "",
            count: count++,
          });
        }
      });

      if (selectedMenuItem.value === Report.invitationbonus) {
        invitationbonus.value.push(...currentArr);
      } else if (selectedMenuItem.value === Report.bettingCommission) {
        bettingCommission.value.push(...currentArr);
      }

      // 初始化完成
      if(init) {
        emit("inited");
      }
    })
};

const handleNext = (page_no: number) => {
  startIndex.value = (page_no - 1) * realPageSize.value;
  endIndex.value = startIndex.value + realPageSize.value;
  const tempArr = state.selectedList.slice(startIndex.value, endIndex.value);
  
  //   如果下一页得到的数据是空的，就查询
  if (tempArr.length == 0) {
    query();
  }
};

const handlePrev = (page_no: number) => {
  startIndex.value = (page_no - 1) * realPageSize.value;
  endIndex.value = startIndex.value + realPageSize.value;
  const tempArr = state.selectedList.slice(startIndex.value, endIndex.value);

  //   如果下一页得到的数据是空的，就查询
  if (tempArr.length == 0) {
    query();
  }
};

const handleTransactionMenuDropdown = (item: string) => {
  //  重置
  state.selectedList = []
  bettingCommission.value = [];
  invitationbonus.value = [];
  state.moreHistoryFlag = false;
  startIndex.value = 0;
  endIndex.value = 8;
  selectedMenuItem.value = item;
  pageRef.value!.resetPageNo();

  query();
};
onMounted(() => {
      console.log(222);
  query(true);
});
</script>

<style lang="scss" scoped>
.report {
  width: 100%;
}
</style>
