<script lang="ts" setup>
import { ref, defineAsyncComponent, watch, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { vipStore } from "@/store/vip";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
import AdjustClass from "@/utils/adjust";
import EventToken from "@/constants/EventToken";

const vipTab = ref("Progress");
const route = useRoute();
const vipNavigation = ref<any>(null);
const {
  dispatchVipInfo,
  dispatchVipCycleawardList,
  dispatchVipBetawardList,
  dispatchVipLevelAward,
} = vipStore();
const vipItems = ["Progress", "Benefits", "VIP Bonus"];
const vipDrawer = ref<boolean>(true);
const Benefits = defineAsyncComponent(
  () => import("@/components/vip/components/benefits/index.vue")
);
const VipBonus = defineAsyncComponent(
  () => import("@/components/vip/components/vip_bonus/index.vue")
);
const Progress = defineAsyncComponent(
  () => import("@/components/vip/components/progress/index.vue")
);
const { setVipNavBarToggle } = vipStore();

const { t } = useI18n();

const vipNavBarToggle = computed(() => {
  const { getVipNavBarToggle } = storeToRefs(vipStore());
  return getVipNavBarToggle.value;
});

// VIP related request initialization  vip相关请求初始化
const initVip = async () => {
  await dispatchVipInfo();
  await dispatchVipLevelAward();
  await dispatchVipCycleawardList();
  await dispatchVipBetawardList();
};

watch(vipNavBarToggle, (value: string) => {
  if (value === "1") {
    initVip();
    // vipDrawer.value = true;
    // 重置了body的高度为视口高度，就没有滚动了 影响首页游戏分类的监听时间监听
    // document.body.style.height =
    //   vipNavigation.value.getBoundingClientRect().height + "px";
  } else if(value === "2") { 
    initVip();
    // vipDrawer.value = true;
  } else {
    // vipDrawer.value = false;
    document.body.style.height = "auto";
  }
});

onMounted(async () => {
  console.log('vipDrawer ========= mount')
  if (localStorage.getItem("vipBar") === "1") {
    // vipDrawer.value = true;
    // 重置了body的高度为视口高度，就没有滚动了 影响首页游戏分类的监听时间监听
    // document.body.style.height =
    //   vipNavigation.value.getBoundingClientRect().height + "px";
  } else if(localStorage.getItem("vipBar") === "2") {
    // vipDrawer.value = true;
  }else {
    // vipDrawer.value = false;
  }
  await dispatchVipCycleawardList();
  await dispatchVipBetawardList();
  let isMobile: boolean = false
      if (route.query.mobile && route.query.mobile == "android"){
        isMobile = true
      }
  AdjustClass.getInstance(isMobile).adjustTrackEvent({
    key: "PAGE_VIEW",
    value: "vip",
    params: "",
  });
});
</script>

<template>
  <v-navigation-drawer
    temporary
    location="right"
    v-model="vipDrawer"
    :touchless="true"
    class="m-vip-drawer"
  >
    <div class="vip-main" ref="vipNavigation">
      <div class="vip-main-header">
        <!--  -->
        <span>{{ t('transaction.tab.vip') }}</span>
        <img :src="icon_public_10" @click="setVipNavBarToggle('0')" width="18" class="m-vip-drawer-close-button" />
      </div>
      <v-tabs center-active v-model="vipTab" class="vip-tabs">
        <v-tab v-for="item in vipItems" :tag="'div'" :key="item" :value="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <div class="vip-main-content">
        <Progress v-if="vipTab === 'Progress'"></Progress>
        <Benefits v-if="vipTab === 'Benefits'"></Benefits>
        <VipBonus v-if="vipTab === 'VIP Bonus'"></VipBonus>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss">
.m-vip-drawer {
  background: $agent_card_bg !important;
  height: 100% !important;
  width: 100% !important;
  top: 0px !important;
  z-index: 10000 !important;
  overflow: hidden;

  .vip-main-content {
    padding-top: 4px;
    padding-bottom: 32px;
  }
}
</style>

<style lang="scss" scoped>
.vip-main {
  height: 100%;
  &-header {
    height: 40px;
    width: 100vw;
    // position: fixed;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    line-height: 40px;
    text-align: center;
    color: #fff;
    position: relative;

    .m-vip-drawer-close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute !important;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      z-index: 99;
    }
  }
  .vip-tabs {
    padding: 4px 16px;
    ::v-deep(.v-tab) {
      background: #15161c !important;
      border-radius: 4px !important;
      height: 35px;
      position: relative;
      border: none;
      &::after {
        border: none;
      }
    }
    ::v-deep(.v-tab--selected) {
      background: #1D2027 !important;
      box-shadow: 0px 4px 6px 1px #0000004D;
      height: 35px;

      &::after {
        content: '';
        width: 24px;
        height: 2px;
        background: #009B3A;
        position: absolute;
        top: auto;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%);
        border-radius: 4px 0px 0px 0px;
        opacity: 1;
        border: none;
      }
    }
  }
  &-content {
    height: calc(100% - 100px);
    overflow-y: auto;
    overscroll-behavior-y: contain;
  }
  ::v-deep(.v-navigation-drawer) {
    width: 100% !important;
  }
  ::v-deep(.v-tab) {
    width: 33.3%;
    color: #7782aa;
    text-transform: none;
  }
  ::v-deep(.v-tab--selected) {
    color: #fff;
  }
  ::v-deep(.v-btn__content) {
    font-size: 12px;
    font-weight: 700;
  }
  ::v-deep(.v-slide-group__content) {
    justify-content: center;
  }
  ::v-deep(.v-tab__slider) {
    display: none;
  }
}
</style>
