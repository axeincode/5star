<script lang="ts" setup>
import { ref, computed, toRefs ,onMounted} from "vue";
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
const isScrollRight=ref(false)

const tempHistoryList = [{},{},{},{},{},{}];

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});
onMounted(async () => {
  handleScroll()
});

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
</script>
<template>
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
            item.amount == ""
            ? ""
            : `${platformCurrency}${Number(item.amount).toFixed(2)}`
            }}
          </td>
          <td
            class="text-400-12"
            style="
              min-width: 130px;
            "
          >{{ item.vip_level == "" ? "" : `VIP ${item.vip_level}` }}</td>
          <td class="text-400-12" style="
              min-width: 130px;
            ">
            <div>{{ item.vip_level == "" ? "" : t("transaction.vip.text_13") }}</div>
          </td>
        </tr>
      </template>
      <div class="arrow" v-if="!isScrollRight">
        <img class="arrow-img" src="@/assets/public/svg/arrow-right.svg" />
      </div>
    </tbody>
  </v-table>
</template>
<style lang="scss">
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
</style>
