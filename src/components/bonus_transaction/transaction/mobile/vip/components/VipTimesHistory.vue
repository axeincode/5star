<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRefs } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";
import { type VipTimesHistoryItem } from "@/interface/vip";

const { t } = useI18n();
const { width } = useDisplay();

const props = defineProps<{
    currentList: Array<VipTimesHistoryItem>,
    selectedHistoryIndex: number
}>();

const { currentList, selectedHistoryIndex } = toRefs(props);

const loading = ref<boolean>(false);
const loadingIndex = ref<number>(0)
const startIndex = ref<number>(0);
const endIndex = ref<number>(8);

const tempHistoryList = [{},{},{},{},{},{}];

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
            {{ moment(item.created_at * 1000).format("YYYY-MM-DD HH:mm:ss") }}
          </td>
          <td
            class="text-400-12 color-01983A"
            style="
              padding-top: 21px !important;
              padding-bottom: 21px !important;
              min-width: 60px;
            "
          >
            R$ {{ Number(item.amount).toFixed(2) }}
          </td>
          <td
            class="text-400-12"
            style="
              padding-top: 21px !important;
              padding-bottom: 21px !important;
              min-width: 130px;
            "
          >
            VIP {{ item.vip_level }}
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
              {{ selectedHistoryIndex == 1 ? "Weekly Bonus" : "Monthly Bonus" }}
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>
<style lang="scss"></style>
