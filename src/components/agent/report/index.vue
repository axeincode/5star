<script lang="ts" setup>
import { ref, computed, h, shallowRef, watch, onMounted } from "vue";
import { Options } from "@popperjs/core";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import moment from "moment-timezone";
import { refferalStore } from "@/store/refferal";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";
import { appBarStore } from "@/store/appBar";

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchInviteHistoryCfg } = inviteStore();
const { dispatchUserInviteHistory } = inviteStore();

const customPrefix = shallowRef({
  render() {
    return h("p", "");
  },
});

const customClear = shallowRef({
  render() {
    return h("p", "");
  },
});

const popperOptions = ref<Options>({
  modifiers: [
    {
      name: "preventOverflow",
      options: {
        boundary: "viewport",
      },
    },
  ],
  placement: "top",
  strategy: "fixed",
});

const dateFormat = ref("YYYY/MM/DD");

const selectedBonusItem = ref("Invitation Bonus");

const datePickerShow = ref<boolean>(false);

const bonusItems = ref<Array<string>>(["Invitation Bonus", "Betting Commission"]);

const bonusMenuShow = ref<boolean>(false);
const cashMenuShow = ref<boolean>(false);

const selectedPageSize = ref<number>(10);

const cashItems = ref<Array<number>>([10, 11, 12]);

const formsList = ref<Array<any>>([
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    event: "lnvitation Bonus",
    bonus: "R$ 12",
  },
]);

const selectedHistoryConfig = ref<any>({});

const handleHistoryConfigDropdown = async (item: any) => {
  selectedBonusItem.value = item.name;
  selectedHistoryConfig.value = item;
  await dispatchUserInviteHistory({
    index: selectedHistoryConfig.value.index,
    size: selectedPageSize.value,
    first_time: moment(selectedDate.value[0]).valueOf() / 1000,
    last_time: moment(selectedDate.value[1]).valueOf() / 1000,
  });
};

const handlePageDropdown = async (item: number) => {
  selectedPageSize.value = item;
  await dispatchUserInviteHistory({
    index: selectedHistoryConfig.value.index,
    size: selectedPageSize.value,
    first_time: moment(selectedDate.value[0]).valueOf() / 1000,
    last_time: moment(selectedDate.value[1]).valueOf() / 1000,
  });
};

const selectedDate = ref([
  moment().tz("Asia/Hong_Kong").format("YYYY/MM/DD"),
  moment().tz("Asia/Hong_Kong").format("YYYY/MM/DD"),
]);

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});

window.addEventListener("scroll", function () {
  datePickerShow.value = false;
  bonusMenuShow.value = false;
  cashMenuShow.value = false;
});

const mobileWidth = computed(() => {
  return width.value;
});

const inviteHistoryConfig = computed(() => {
  const { getInviteHistoryConfig } = storeToRefs(inviteStore());
  selectedHistoryConfig.value = getInviteHistoryConfig.value.list[0];
  // getInviteHistoryConfig.value.list.push({
  //   index: 3,
  //   name: "Achievement Bonus",
  // });
  return getInviteHistoryConfig.value;
});

const inviteHistoryItem = computed(() => {
  const { getInviteHistoryItem } = storeToRefs(inviteStore());
  return getInviteHistoryItem.value;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

watch(
  selectedDate,
  async (value) => {
    await dispatchUserInviteHistory({
      index: selectedHistoryConfig.value.index,
      size: selectedPageSize.value,
      first_time: moment(value[0]).valueOf() / 1000,
      last_time: moment(value[1]).valueOf() / 1000,
    });
  },
  { deep: true }
);

const handlePrev = () => {};

const handleNext = () => {};

onMounted(async () => {
  await dispatchInviteHistoryCfg();
  await dispatchUserInviteHistory({
    index: inviteHistoryConfig.value.list[0].index,
    size: selectedPageSize.value,
    first_time: moment(selectedDate.value[0]).valueOf() / 1000,
    last_time: moment(selectedDate.value[1]).valueOf() / 1000,
  });
});
</script>
<template>
  <v-row class="mx-2 mt-0">
    <div class="m-agent-report-date-picker" @click="datePickerShow = true">
      <el-date-picker
        v-model="selectedDate"
        popper-class="m-agent-report-date-picker-background"
        type="daterange"
        value-format="YYYY/MM/DD"
        :format="dateFormat"
        :prefix-icon="customPrefix"
        :visible="datePickerShow"
        :clear-icon="customClear"
        start-placeholder="Start date"
        end-placeholder="End date"
        :popper-options="popperOptions"
        day-name-format="short"
        :start-day-of-week="1"
        @change="datePickerShow = false"
        @blur="datePickerShow = false"
        size="small"
      >
        <template #range-separator>
          <img src="@/assets/public/svg/icon_public_83.svg" width="18" />
        </template>
      </el-date-picker>
      <img
        src="@/assets/public/svg/icon_public_23.svg"
        class="date-icon-position"
        width="20"
      />
    </div>
  </v-row>
  <v-row class="mt-6 mx-3">
    <v-menu
      offset="10"
      content-class="m-agent-report-bonus-menu"
      v-model="bonusMenuShow"
      style="z-index: 1000000000000000"
    >
      <template v-slot:activator="{ props }">
        <v-card theme="dark" class="m-agent-report-bonus-menu-card" style="width: 180px">
          <v-list-item
            class="bonus-item"
            v-bind="props"
            :title="selectedBonusItem"
            append-icon="mdi-chevron-down"
            value=""
          >
          </v-list-item>
        </v-card>
      </template>
      <v-list theme="dark" class="m-agent-report-bonus-menu-list">
        <v-list-item
          v-for="(item, i) in inviteHistoryConfig.list"
          :key="i"
          :value="item.name"
          class="bonus-item mx-2"
          @click="handleHistoryConfigDropdown(item)"
          :class="
            selectedBonusItem == item.name
              ? 'm-agent-report-bonus-menu-selected-item'
              : ''
          "
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu
      offset="10"
      content-class="m-agent-report-bonus-menu"
      v-model="cashMenuShow"
      style="z-index: 1000000000000000"
    >
      <template v-slot:activator="{ props }">
        <v-card
          theme="dark"
          class="ml-auto m-agent-report-bonus-menu-card"
          style="width: 100px"
        >
          <v-list-item
            class="bonus-item"
            v-bind="props"
            :title="selectedPageSize"
            append-icon="mdi-chevron-down"
            value=""
          >
          </v-list-item>
        </v-card>
      </template>
      <v-list theme="dark" class="m-agent-report-bonus-menu-list">
        <v-list-item
          v-for="(item, i) in cashItems"
          :key="i"
          :value="item"
          class="bonus-item mx-1"
          :class="
            selectedPageSize == item ? 'm-agent-report-bonus-menu-selected-item' : ''
          "
          @click="handlePageDropdown(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
  <v-row class="mx-2 mt-6 m-agent-forms-bonus-table">
    <v-table
      class="m-agent-forms-bonus-table-bg"
      :class="fixPositionShow ? 'table-position-overflow' : ''"
      theme="dark"
      fixed-header
    >
      <thead class="forms-table-header">
        <tr>
          <th
            class="m-forms-table-header-text px-0"
            style="border-radius: 8px 0px 0px 8px"
          >
            {{ t("affiliate.forms.table.time") }}
          </th>
          <th class="m-forms-table-header-text px-0">
            <div class="forms-table-border">{{ t("affiliate.forms.table.user") }}</div>
          </th>
          <th class="m-forms-table-header-text px-0">
            <div class="forms-table-border-1">
              {{ t("affiliate.forms.table.event") }}
            </div>
          </th>
          <th
            class="m-forms-table-header-text px-0"
            style="border-radius: 0px 8px 8px 0px"
          >
            {{ t("affiliate.forms.table.bonus") }}
          </th>
        </tr>
      </thead>
      <tbody class="m-forms-table-body">
        <tr
          v-for="(item, index) in inviteHistoryItem.list"
          :key="index"
          v-if="inviteHistoryItem.list.length > 0"
        >
          <td class="text-500-12">
            {{ moment(Number(item.time) * 1000).format("MM/DD HH:mm:ss") }}
          </td>
          <td class="text-500-12">{{ item.user }}</td>
          <td class="text-500-12">{{ selectedHistoryConfig.name }}</td>
          <td class="text-500-12">{{ item.bonus }}</td>
        </tr>
        <tr v-for="(item, formIndex) in formsList" :key="formIndex" v-else>
          <td class="text-500-12"></td>
          <td class="text-500-12"></td>
          <td class="text-500-12"></td>
          <td class="text-500-12"></td>
        </tr>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="mt-4 justify-center mx-4 pb-2">
    <Pagination
      :length="inviteHistoryItem.total_pages"
      @handlePrev="handlePrev"
      @handleNext="handleNext"
    />
  </v-row>
</template>
<style lang="scss">
.m-agent-report-bonus-menu {
  // left: 8px !important;
  border-radius: 8px !important;
}

.m-agent-report-bonus-menu-card {
  .v-list-item__append {
    width: 18px;
  }

  .v-list-item__append > .v-icon {
    margin-inline-start: unset !important;
  }

  .v-list-item-title {
    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-agent-report-bonus-menu-list {
  background: $agent_card_notmet_bg !important;

  .bonus-item {
    height: 36px !important;
    padding: 4px 14px !important;
    text-align: center !important;

    .v-list-item-title {
      font-weight: 500;
      font-size: 14px;
      color: #7782aa;
    }
  }
}

.m-agent-report-bonus-menu::after {
  content: "";
  position: absolute;
  align-self: center;
  float: right;
  top: -16px;
  border: 9px solid $agent_card_notmet_bg;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-width: 7px;
  border-left-width: 7px;
}

.m-agent-report-bonus-menu-selected-item {
  border-radius: 8px;
  border: 1px solid $agent_select_border;
}

.m-agent-report-bonus-menu-card {
  border-radius: 8px;
  background: $agent_card_notmet_bg;
  box-shadow: none !important;
}

.date-icon-position {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 13px;
}

.m-agent-forms-bonus-table-bg {
  padding: 8px;
  background: $agent_card_notmet_bg !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.table-position-overflow {
  .v-table__wrapper {
    overflow: hidden !important;
  }
}

.m-agent-forms-bonus-table {
  .v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
    background: $agent_card_bg;
    height: 36px !important;
    box-shadow: none !important;
  }

  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    // border-bottom: 1px solid $agent_card_bg;
    border-bottom: none !important;
  }

  .forms-table-header {
    border-radius: 8px !important;
  }

  .m-forms-table-body {
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    color: #ffffff;
    text-align: center;
  }

  .m-forms-table-header-text {
    font-weight: 700 !important;
    font-size: 12px !important;
    text-align: center !important;
    color: #7782aa !important;
  }

  .forms-table-border {
    border-left: 2px solid $agent_card_notmet_bg !important;
    border-right: 2px solid $agent_card_notmet_bg !important;
  }

  .forms-table-border-1 {
    border-right: 2px solid $agent_card_notmet_bg !important;
  }
}

.m-agent-report-date-picker {
  width: 100%;

  .el-date-editor.el-input__wrapper {
    width: 100%;
    height: 40px !important;
    background: $agent_card_notmet_bg !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 8px !important;
    justify-content: start;
  }

  .el-date-editor .el-range-input {
    font-weight: 500 !important;
    font-size: 12px !important;
    color: #7782aa !important;
  }

  .el-range__icon {
    display: none;
  }

  .el-popper.is-light {
    background-color: $agent_card_notmet_bg !important;
    border: none !important;
    border-radius: 10px !important;
  }
}

.m-agent-report-date-picker-background {
  z-index: 100000000000000000000 !important;
  position: absolute !important;
  inset: 128px auto auto 0px !important;
  background-color: $agent_card_notmet_bg !important;
  border: none !important;
  border-radius: 10px !important;

  .el-popper__arrow::before {
    border: 1px solid $agent_card_notmet_bg !important;
    background: $agent_card_notmet_bg !important;
    right: 0;
  }

  .el-picker-panel {
    background-color: $agent_card_notmet_bg;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 19px;
    color: #ffffff;
    border-color: $agent_card_notmet_bg;
    border: none;
    box-shadow: none;
    border-radius: 10px !important;
    box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  }

  .el-date-range-picker__content.is-left {
    border-right: none;
  }

  .el-date-table td.in-range .el-date-table-cell {
    background-color: transparent;
  }

  .el-picker-panel__icon-btn .el-icon {
    cursor: pointer;
    font-weight: 900;
    font-size: 18px;
    color: #7782aa;
  }

  .el-date-table th {
    padding: 5px;
    font-weight: 600;
    font-size: 10px;
    color: #ffffff;
    border-bottom: none;
  }

  .el-date-range-picker {
    width: 100% !important;
  }

  .el-date-range-picker .el-picker-panel__body {
    min-width: unset !important;
  }

  .el-date-range-picker__content {
    padding: 16px 8px !important;
  }

  .el-date-table td {
    padding: 0 !important;
    font-weight: 600;
    font-size: 10px;
    color: #ffffff;
  }

  .el-picker-panel__icon-btn {
    margin-top: 0px !important;
  }

  .el-date-range-picker__content .el-date-range-picker__header div {
    font-weight: 600;
    font-size: 12px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .el-date-table th {
    padding: 0px !important;
  }

  .el-popper__arrow {
    left: 50% !important;
  }

  .el-date-table td.end-date .el-date-table-cell__text,
  .el-date-table td.start-date .el-date-table-cell__text {
    background-color: unset;
    display: flex;
    width: 24px;
    padding: 2px 5px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #009b3a;
  }
}
</style>
