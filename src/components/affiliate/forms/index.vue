<script lang="ts" setup>
import { ref, computed, h, shallowRef, watch } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import moment from "moment-timezone";
import { storeToRefs } from "pinia";
import { appBarStore } from "@/store/appBar";

const { t } = useI18n();
const { width } = useDisplay();

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

const dateFormat = ref("YYYY/MM/DD");

const selectedBonusItem = ref("Invitation Bonus");

const datePickerShow = ref<boolean>(false);

const bonusItems = ref<Array<string>>([
  "Invitation Bonus",
  "Betting Commission",
  "Achievement Bonus",
]);

const bonusMenuShow = ref<boolean>(false);
const cashMenuShow = ref<boolean>(false);

const selectedCashItem = ref<number>(10);

const cashItems = ref<Array<number>>([10, 11, 12]);

const formsList = ref<Array<any>>([
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
  {
    time: "04/08 12:29:42",
    user: "User6910821714",
    bonus: "R$ 12",
  },
]);

const handleDropdown = (item: string) => {
  selectedBonusItem.value = item;
};

const handleCashDropdown = (item: number) => {
  selectedCashItem.value = item;
};

const selectedDate = ref([
  moment().tz("Asia/Hong_Kong").format("YYYY/MM/DD"),
  moment().tz("Asia/Hong_Kong").format("YYYY/MM/DD"),
]);

window.addEventListener("scroll", function () {
  datePickerShow.value = false;
  bonusMenuShow.value = false;
  cashMenuShow.value = false;
});

const mobileWidth = computed(() => {
  return width.value;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});
</script>
<template>
  <v-row class="mt-6 justify-end mx-6">
    <v-menu offset="10" class="bonus-menu" v-model="bonusMenuShow">
      <template v-slot:activator="{ props }">
        <v-card color="#15161C" theme="dark">
          <v-list-item
            class="bonus-item"
            v-bind="props"
            :title="selectedBonusItem"
            append-icon="mdi-chevron-down"
            value="sport"
          >
          </v-list-item>
        </v-card>
      </template>
      <v-list theme="dark" bg-color="#1D2027">
        <v-list-item
          v-for="(item, i) in bonusItems"
          :key="i"
          :value="item"
          class="bonus-item"
          @click="handleDropdown(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="relative ml-2" @click="datePickerShow = true">
      <el-date-picker
        v-model="selectedDate"
        popper-class="date-picker-background"
        type="daterange"
        value-format="YYYY/MM/DD"
        :format="dateFormat"
        :prefix-icon="customPrefix"
        :clear-icon="customClear"
        :visible="datePickerShow"
        start-placeholder="Start date"
        end-placeholder="End date"
        @change="datePickerShow = false"
        @blur="datePickerShow = false"
      >
        <template #range-separator>
          <img src="@/assets/public/svg/icon_public_83.svg" />
        </template>
      </el-date-picker>
      <img src="@/assets/public/svg/icon_public_23.svg" class="date-icon-position" />
    </div>
    <v-menu offset="10" class="bonus-menu" v-model="cashMenuShow">
      <template v-slot:activator="{ props }">
        <v-card color="#15161C" theme="dark" class="ml-2">
          <v-list-item
            class="bonus-item"
            v-bind="props"
            :title="selectedCashItem"
            append-icon="mdi-chevron-down"
            value="sport"
          >
          </v-list-item>
        </v-card>
      </template>
      <v-list theme="dark" bg-color="#1D2027">
        <v-list-item
          v-for="(item, i) in cashItems"
          :key="i"
          :value="item"
          class="bonus-item"
          @click="handleCashDropdown(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
  <v-row class="mx-4 mt-6">
    <v-table class="forms-bonus-table-bg" theme="dark" fixed-header>
      <thead class="forms-table-header">
        <tr>
          <th class="forms-table-header-text" style="border-radius: 8px 0px 0px 8px">
            {{ t("affiliate.forms.table.time") }}
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">{{ t("affiliate.forms.table.user") }}</div>
          </th>
          <th class="forms-table-header-text" style="border-radius: 0px 8px 8px 0px">
            {{ t("affiliate.forms.table.bonus") }}
          </th>
        </tr>
      </thead>
      <tbody class="forms-table-body">
        <tr v-for="(item, index) in formsList" :key="index">
          <td class="forms-td-border">{{ item.time }}</td>
          <td>{{ item.user }}</td>
          <td>{{ item.bonus }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="mt-6 justify-end mx-4">
    <Pagination :length="2" />
  </v-row>
</template>
<style lang="scss">
.bonus-menu {
  margin-left: auto !important;

  .v-overlay__content::after {
    content: "";
    position: absolute;
    align-self: center;
    float: right;
    top: -16px;
    border: 9px solid #1D2027;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-width: 7px;
    border-left-width: 7px;
  }
}

.bonus-item {
  height: 100% !important;
  padding: 4px 14px !important;
  text-align: center !important;

  .v-list-item-title {
    font-weight: 700;
    font-size: 14px;
    color: #7782aa;
  }
}

tbody {
  width: 400px !important;
}

.date-icon-position {
  position: absolute;
  top: 11px;
  right: 13px;
}

.forms-bonus-table-bg {
  background: #15161C !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;

  .v-table__wrapper {
    // margin: 8px 60px !important;
  }
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
  border-left: 1px solid #000000 !important;
  border-right: 1px solid #000000 !important;
}

.el-date-editor.el-input__wrapper {
  height: 48px !important;
  background: #15161C !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  justify-content: start;
}

.el-date-editor .el-range-input {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #7782aa;
}

.el-popper.is-light .el-popper__arrow::before {
  border: 1px solid #181522;
  background: #181522;
  right: 0;
}

.el-popper.is-light {
  background-color: #181522 !important;
  border: none !important;
  border-radius: 10px !important;
}

.date-picker-background {
  .el-picker-panel {
    background-color: #181522;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 19px;
    color: #ffffff;
    border-color: #181522;
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
    font-size: 12px;
    color: #ffffff;
    border-bottom: none;
  }
}
</style>
