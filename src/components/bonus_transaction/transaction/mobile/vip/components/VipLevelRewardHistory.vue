<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRefs } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { type VipLevelRewardHistoryItem } from "@/interface/vip";
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const { t } = useI18n();
const { width } = useDisplay();

const props = defineProps<{
    currentList: Array<VipLevelRewardHistoryItem>
}>();

const { currentList } = toRefs(props);

const loading = ref<boolean>(false);
const loadingIndex = ref<number>(0)
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);

const tempHistoryList = [{},{},{},{},{},{}];

// vip level  vip等级
const vipLevels = computed(() => {
  const { getVipLevels } = storeToRefs(vipStore());
  return getVipLevels.value;
});

// Match VIP level name  匹配vip等级名称
const vipLevelText = (value: number) => {
    for (let i in vipLevels.value) {
        if (vipLevels.value[i].level === value) {
             // 英文西班牙判断
      if (localStorage.getItem("lang") === "en") {
        return vipLevels.value[i].rank_name;
      } else {
        let levelText = "Hierro negro";
        switch (vipLevels.value[i].rank_name) {
          case "Iron":
            levelText = "Hierro negro";
            break;
          case "Bronze":
            levelText = "Bronce";
            break;
          case "Silver":
            levelText = "Plata";
            break;
          case "Gold":
            levelText = "Oro";
            break;
          case "Platinum":
            levelText = "Platino";
            break;
          case "Diamond":
            levelText = "Diamante";
            break;
          case "Yellow Diamond":
            levelText = "Diamante amarillo";
            break;
          case "Blue Diamond":
            levelText = "Diamante azul";
            break;
          default:
            break;
        }
        return levelText;
      }
        }
    }
}

const mobileWidth = computed(() => {
  return width.value;
});

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
    height="570px"
  >
    <thead class="forms-table-header">
      <tr>
        <th class="text-700-12 black text-center" style="border-radius: 8px 0px 0px 8px">
          <div class="forms-table-border0">
            <div
              style="width: 50px; margin-left: 16px; margin-right: 16px"
            >{{ t("transaction.vip.text_5") }}</div>
          </div>
        </th>
        <th class="text-700-12 black text-center">
          <div class="forms-table-border1">
            <div
              style="width: 100px; margin-left: 16px; margin-right: 16px"
            >{{ t("transaction.vip.text_10") }}</div>
          </div>
        </th>
        <th class="text-700-12 black text-center">
          <div class="forms-table-border1">
            <div
              style="width: 90px; margin-left: 20px; margin-right: 20px"
            >{{ t("transaction.vip.text_11") }}</div>
          </div>
        </th>
        <th class="text-700-12 black text-center">
          <div class="forms-table-border2">
            <div
              style="width: 100px; margin-left: 16px; margin-right: 16px"
            >{{ t("transaction.vip.text_9") }}</div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="forms-table-body">
      <template v-if="currentList.length == 0">
        <tr v-for="(item, index) in tempHistoryList" :key="index">
          <td class="text-400-12" style></td>
          <td class="text-400-12" style="
              min-width: 60px;
            "></td>
          <td class="text-400-12" style></td>
          <td class="text-400-12" style="
              min-width: 130px;
            "></td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="(item, index) in currentList" :key="index">
          <td class="text-400-12" style>
            {{
            item.created_at == ""
            ? ""
            : moment(Number(item.created_at) * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </td>
          <td class="text-400-12 color-01983A" style="
              min-width: 60px;
            ">
            {{
            item.amount == "" ? "" : platformCurrency + Number(item.amount).toFixed(2)
            }}
          </td>
          <td class="text-400-12" style="
              min-width: 130px;
            ">
            {{
            item.type == ""
            ? ""
            : Number(item.type) == 2
            ? `${vipLevelText(Number(item.vip_level))}`
            : `VIP ${item.vip_level}`
            }}
          </td>
          <td class="text-400-12" style="
              min-width: 130px;
            ">
            <div>
              {{
              item.type == ""
              ? ""
              : Number(item.type) == 2
              ? "Rank Bonus"
              : "Level Bonus"
              }}
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>
<style lang="scss"></style>
