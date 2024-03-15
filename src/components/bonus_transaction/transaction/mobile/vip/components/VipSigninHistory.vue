<script lang="ts" setup>
import { ref, computed, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { type VipSigninHistoryItem } from "@/interface/vip";
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const { t } = useI18n();
const { width } = useDisplay();

const props = defineProps<{
    currentList: Array<VipSigninHistoryItem>
}>();

const { currentList } = toRefs(props);

const tempHistoryList = [{},{},{},{},{},{}];

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});
</script>
<template>
  <v-table
    class="m-forms-bonus-table-bg"
    :class="fixPositionShow ? 'table-position-overflow' : ''"
    theme="dark"
    fixed-header
    style="padding: 16px"
  >
    <thead class="forms-table-header">
      <tr>
        <th class="text-700-12 black text-center" style="border-radius: 8px 0px 0px 8px">
          <div class="forms-table-border0">
            <div style="width: 50px; margin-left: 16px; margin-right: 16px">
              {{ t("transaction.vip.text_5") }}
            </div>
          </div>
        </th>
        <th class="text-700-12 black text-center">
          <div class="forms-table-border1">
            <div style="width: 100px; margin-left: 16px; margin-right: 16px">
              {{ t("transaction.vip.text_10") }}
            </div>
          </div>
        </th>
        <th class="text-700-12 black text-center">
          <div class="forms-table-border1">
            <div style="width: 90px; margin-left: 20px; margin-right: 20px">
              {{ t("transaction.vip.text_11") }}
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
      <template v-if="currentList.length == 0">
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
        <tr v-for="(item, index) in currentList" :key="index">
          <td
            class="text-400-12"
            style="padding-top: 21px !important; padding-bottom: 21px !important"
          >
            {{
              item.created_at == ""
                ? ""
                : moment(Number(item.created_at) * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </td>
          <td
            class="text-400-12 color-01983A"
            style="
              padding-top: 21px !important;
              padding-bottom: 21px !important;
              min-width: 60px;
            "
          >
            {{
              item.amount == ""
                ? ""
                : `${platformCurrency}${Number(item.amount).toFixed(2)}`
            }}
          </td>
          <td
            class="text-400-12"
            style="
              padding-top: 21px !important;
              padding-bottom: 21px !important;
              min-width: 130px;
            "
          >
            {{ item.vip_level == "" ? "" : `VIP ${item.vip_level}` }}
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
              {{ item.vip_level == "" ? "" : t("transaction.vip.text_13") }}
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>
<style lang="scss"></style>
