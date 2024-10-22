<script lang="ts" setup>
import { ref, computed, onMounted,watch, onUnmounted } from "vue";
import { defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

import AppBarLayout from "./AppBar.vue";
import MainLayout from "./Main.vue";
import MobileMenuLayout from "./MobileMenu.vue";

// import NavBarLayout from "./NavBar.vue";
// import MNavBarLayout from "./MobileNavBar.vue";
// import UserNavBarLayout from "./UserNavBar.vue";
// import RightBarLayout from "./RightBar.vue";
// import AgentBarLayout from "./AgentBar.vue";
// import RewardBarLayout from "./RewardBar.vue";
// import RefferalLayout from "./RefferalBar.vue";
// import MBonusDashboardDialog from "@/components/vip/mobile/MBonusDashboard.vue";

import { useDisplay } from "vuetify";
import { refferalStore } from "@/store/refferal";
import { gameStore } from "@/store/game";
import { storeToRefs } from "pinia";
import { appBarStore } from "@/store/appBar";
import { agentStore } from "@/store/agent";
import { menuStore } from "@/store/menu";
import { useDialog } from "@/hooks/dialog";

// const AppBarLayout = defineAsyncComponent(() => import("./AppBar.vue"));
// const MainLayout = defineAsyncComponent(() => import("./Main.vue"));
// const MobileMenuLayout = defineAsyncComponent(() => import("./MobileMenu.vue"));
const NavBarLayout = defineAsyncComponent(() => import("./NavBar.vue"));
const MNavBarLayout = defineAsyncComponent(() => import("./MobileNavBar.vue"));
const UserNavBarLayout = defineAsyncComponent(() => import("./UserNavBar.vue"));
const RightBarLayout = defineAsyncComponent(() => import("./RightBar.vue"));
const RewardBarLayout = defineAsyncComponent(() => import("./RewardBar.vue"));
const AgentBarLayout = defineAsyncComponent(() => import("./AgentBar.vue"));
const RefferalLayout = defineAsyncComponent(() => import("./RefferalBar.vue"));
const VipBar = defineAsyncComponent(() => import("./VipBar.vue"));
const screen = defineAsyncComponent(() => import("./screen.vue"));
const MBonusDashboardDialog = defineAsyncComponent(
  () => import("@/components/vip/mobile/MBonusDashboard.vue")
);
const LiveChat = defineAsyncComponent(() => import("./live_chat/index.vue"));

const agentNavBarToggle = computed(() => {
  const { getAgentNavBarToggle } = storeToRefs(agentStore());
  return getAgentNavBarToggle.value;
});

const { agentNavBarDrawer, vipDrawer } = useDialog();

const route = useRoute();
const { width } = useDisplay();

const rewardNavigationShow = computed(() => {
  const { getRewardNavShow } = storeToRefs(menuStore());
  return getRewardNavShow.value;
});

const rewardNavShow = ref<boolean>(false);
watch(rewardNavigationShow, (value) => {
  rewardNavShow.value = value;
});

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});

// 横屏遮罩层监听操作
const isGameScroll = computed(() => {
  const { getIsScroll } = storeToRefs(gameStore());
  return getIsScroll.value;
});

const isScroll = ref(false)



const mobileWidth = computed(() => {
  return width.value||300;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

const bonusDashboardDialogShow = computed(() => {
  const { getBonusDashboardDialogVisible } = storeToRefs(appBarStore());
  return getBonusDashboardDialogVisible.value;
});

const updateOrientation = () => {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  isScroll.value = isLandscape;
};

onMounted(() => {
  updateOrientation(); // 初始化时检查一次屏幕方向
  window.addEventListener("resize", updateOrientation); // 监听屏幕方向变化
});

onUnmounted(() => {
  window.removeEventListener("resize", updateOrientation); // 组件销毁时移除事件监听器
});

const handleScroll = () => {
  console.log("scroll");
};

</script>

<template>
  <screen v-if="(isScroll || mobileWidth > 1024) && isGameScroll" />
  <v-app v-else :class="fixPositionShow ? 'appbar-position-fix' : ''">
    <RefferalLayout v-if="refferalAppBarShow" />
    <AppBarLayout />
    <template v-if="mobileWidth > 600">
      <NavBarLayout />
      <RightBarLayout />
    </template>
    <template v-else>
      <MNavBarLayout />
      <RewardBarLayout v-show="route.name !== 'Sports'&&rewardNavShow" v-model="rewardNavShow" />
      <AgentBarLayout v-show="agentNavBarToggle" v-model="agentNavBarToggle" />
      <VipBar />
    </template>
    <UserNavBarLayout />
    <MBonusDashboardDialog />
    <MainLayout />
    <MobileMenuLayout v-if="mobileWidth < 1024" />
    <LiveChat />
  </v-app>
</template>

<style lang="scss">
.v-navigation-drawer__scrim {
  z-index: 10 !important;
}

.v-navigation-drawer {
  background: #1d2027 !important;
}

.v-application {
  background: black !important;
}

.appbar-position-fix {
  overflow: hidden !important;
  // position: fixed !important;
}

.Vue-Toastification__container {
  right: 0 !important;
  left: unset !important;
  width: 290px !important;
  margin-right: 37px;
  height: 60px !important;
  //flex-direction: unset!important;
}

.Vue-Toastification__toast {
  align-items: center !important;
  z-index: 1000000000 !important;
  top: 70px;
  right: -20px !important;
  width: 320px !important;
  height: 60px;
  border: none;
  border-radius: 16px 0px 0px 16px;
  background: var(--bg-2, #15161c);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.Vue-Toastification__toast-body {
  color: var(--sec-text, #7782aa);
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
    DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
    WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
}

.Vue-Toastification__close-button {
  top: 22px !important;
  background-image: url("@/assets/public/svg/icon_public_52.svg");
  background-repeat: no-repeat;
  background-size: 18px;
  color: transparent;
  opacity: 1;
}
</style>
