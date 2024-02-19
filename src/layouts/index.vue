<script lang="ts" setup>
import { ref, computed } from "vue";
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
import { storeToRefs } from "pinia";
import { appBarStore } from "@/store/appBar";

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
const MBonusDashboardDialog = defineAsyncComponent(
  () => import("@/components/vip/mobile/MBonusDashboard.vue")
);

const route = useRoute();
const { width } = useDisplay();

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});

const agentNavBarToggle = computed(() => {})

const mobileWidth = computed(() => {
  return width.value;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

const bonusDashboardDialogShow = computed(() => {
  const { getBonusDashboardDialogVisible } = storeToRefs(appBarStore());
  return getBonusDashboardDialogVisible.value;
});

const handleScroll = () => {
  console.log("scroll");
};

</script>

<template>
  <v-app :class="fixPositionShow ? 'appbar-position-fix' : ''">
    <RefferalLayout v-if="refferalAppBarShow" />
    <AppBarLayout />
    <template v-if="mobileWidth > 600">
      <NavBarLayout />
      <RightBarLayout />
    </template>
    <template v-else>
      <MNavBarLayout />
      <RewardBarLayout v-if="route.name !== 'Sports'" />
      <AgentBarLayout/>
      <VipBar />
    </template>
    <UserNavBarLayout />
    <MBonusDashboardDialog />
    <MainLayout />
    <MobileMenuLayout v-if="mobileWidth < 1024" />
  </v-app>
</template>

<style lang="scss">
.v-navigation-drawer__scrim {
  z-index: 10 !important;
}

.v-navigation-drawer {
  background: #1D2027 !important;
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
  background: var(--bg-2, #181522);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.Vue-Toastification__toast-body {
  color: var(--sec-text, #7782aa);
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
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
