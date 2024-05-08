<script lang="ts" setup>
import { ref, computed, watch, onMounted, defineAsyncComponent, watchEffect, nextTick } from 'vue';
import { useDisplay } from 'vuetify';
import { appBarStore } from '@/store/appBar';
import { refferalStore } from '@/store/refferal';
import { authStore } from "@/store/auth";
import { loginBonusStore } from "@/store/loginBonus";
import { vipStore } from "@/store/vip";
import { type GetUserInfo } from "@/interface/user";
import { storeToRefs } from 'pinia';
import { useI18n } from "vue-i18n";
import Footer from "./Footer.vue";
import { useRoute } from 'vue-router';
import { mainStore } from "@/store/main";
import { useScroll } from "@/hooks/scrollTo";

import Deposit from "@/components/cash/mxn/deposit/index.vue";
import MDeposit from "@/components/cash/mxn/deposit/mobile/index.vue";
import Withdraw from "@/components/cash/mxn/withdraw/index.vue";
import MWithdraw from "@/components/cash/mxn/withdraw/mobile/index.vue";
import MCashHeader from "@/components/cash/mxn/header/mobile/index.vue";
import CashHeader from "@/components/cash/mxn/header/index.vue";
// import MobileDialog from "@/components/Signout/mobile/Header.vue";
// import Signup from "@/components/Signup/index.vue";
// import MSignup from "@/components/Signup/mobile/index.vue";
// import Login from "@/components/Login/index.vue";
// import MLogin from "@/components/Login/mobile/index.vue";
import MNickName from "@/components/auth/components/mobile/sign_up/NickName.vue";
import Signout from "@/components/Signout/index.vue";
import StaticActivityPage from "@/components/static_activity_page/index.vue";
import MSignout from "@/components/Signout/mobile/index.vue";
import MAuth from "@/components/auth/mobile/index.vue";
import LoginBonusDialog from "@/components/login_bonus/index.vue";
import MLoginBonusDialog from "@/components/login_bonus/mobile/index.vue";
// import RefferalDialog from "@/components/refferal/index.vue";
// import MRefferalDialog from "@/components/refferal/mobile/index.vue";
// import GetBonusDialog from "@/components/get_bonus/index.vue";
// import MGetBonusDialog from "@/components/get_bonus/mobile/index.vue";
// import RouletteBonusDialog from "@/components/roulette_bonus/index.vue";
// import MRouletteBonusDialog from "@/components/roulette_bonus/mobile/index.vue";
// import MAccountDialog from "@/views/account/dialog/index.vue";
// import MenuSemiCircle from "@/components/global/menu_semi_circle/index.vue";
// import LevelUpDialog from "@/components/level_up/index.vue";
// import MLevelUpDialog from "@/components/level_up/mobile/index.vue";
import { CookieService } from "@/utils/cookieService";
import { mailStore } from "@/store/mail";
import router from '@/router';
import { depositStore } from '@/store/deposit';
import { activityAppStore } from '@/store/activityApp';
import { liveChatStore } from "@/store/liveChat";
import { useDialog } from "@/hooks/dialog";
const { setLiveChatMaximize, LiveChatWidget } = liveChatStore();
const { authDialog } = useDialog();

// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

import { toFormatNum } from '@/utils/numFormat';

const GetBonusDialog = defineAsyncComponent(() => import("@/components/get_bonus/index.vue"));
const MGetBonusDialog = defineAsyncComponent(() => import("@/components/get_bonus/mobile/index.vue"));
const MenuSemiCircle = defineAsyncComponent(() => import("@/components/global/menu_semi_circle/index.vue"));
const LevelUpDialog = defineAsyncComponent(() => import("@/components/level_up/index.vue"));
const MLevelUpDialog = defineAsyncComponent(() => import("@/components/level_up/mobile/index.vue"));
const ActivityApp = defineAsyncComponent(() => import("@/components/activity_app/index.vue"));
// const Deposit = defineAsyncComponent(() => import("@/components/cash/deposit/index.vue"));
// const MDeposit = defineAsyncComponent(() => import("@/components/cash/deposit/mobile/index.vue"));
// const Withdraw = defineAsyncComponent(() => import("@/components/cash/withdraw/index.vue"));
// const MWithdraw = defineAsyncComponent(() => import("@/components/cash/withdraw/mobile/index.vue"));
// const MCashHeader = defineAsyncComponent(() => import("@/components/cash/header/mobile/index.vue"));
// const CashHeader = defineAsyncComponent(() => import("@/components/cash/header/index.vue"));
// const Signup = defineAsyncComponent(() => import("@/components/Signup/index.vue"));
// const MSignup = defineAsyncComponent(() => import("@/components/Signup/mobile/index.vue"));
// const MNickName = defineAsyncComponent(() => import("@/components/Signup/mobile/NickName.vue"));
// const Login = defineAsyncComponent(() => import("@/components/Login/index.vue"));
// const MLogin = defineAsyncComponent(() => import("@/components/Login/mobile/index.vue"));
// const Signout = defineAsyncComponent(() => import("@/components/Signout/index.vue"));
// const MSignout = defineAsyncComponent(() => import("@/components/Signout/mobile/index.vue"));
// const MobileDialog = defineAsyncComponent(() => import("@/components/Signout/mobile/Header.vue"));
const RefferalDialog = defineAsyncComponent(() => import("@/components/refferal/index.vue"));
const MRefferalDialog = defineAsyncComponent(() => import("@/components/refferal/mobile/index.vue"));
// const LoginBonusDialog = defineAsyncComponent(() => import("@/components/login_bonus/index.vue"));
// const MLoginBonusDialog = defineAsyncComponent(() => import("@/components/login_bonus/mobile/index.vue"));
const RouletteBonusDialog = defineAsyncComponent(() => import("@/components/roulette_bonus/index.vue"));
const MRouletteBonusDialog = defineAsyncComponent(() => import("@/components/roulette_bonus/mobile/index.vue"));
const MAccountDialog = defineAsyncComponent(() => import("@/views/account/dialog/index.vue"));
const VipUpgradeDialog = defineAsyncComponent(() => import("@/components/vip/components/vip_upgrade_dialog/index.vue"));
const VipUpRankDialog = defineAsyncComponent(() => import("@/components/vip/components/vip_uprank_dialog/index.vue"));
const GroupDialog = defineAsyncComponent(() => import("@/components/vip/components/group_dialog/index.vue"));
const Search = defineAsyncComponent(() => import("@/components/global/search/index.vue"));
const MSearch = defineAsyncComponent(() => import("@/components/global/search/mobile/index.vue"));
const MDepositConfirm = defineAsyncComponent(() => import("@/components/cash/mxn/deposit/mobile/MDepositConfirm.vue"));

const { t } = useI18n();
const { name, width } = useDisplay();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setAccountDialogShow } = appBarStore();
const { setActiveAccountIndex } = appBarStore();
const { dispatchVipSignIn } = vipStore();
// const { setBonusDashboardDialogVisible } = appBarStore();
const { setAuthModalType } = authStore();
const { setNickNameDialogVisible,setAuthDialogVisible } = authStore();
const { setRefferalDialogShow } = refferalStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();
const { setGetBonusDialogVisible } = loginBonusStore();
const { setUserNavBarToggle } = appBarStore();
const { setMailMenuShow } = mailStore();
const { setNavBarToggle } = appBarStore();
const { setLevelUpDialogVisible } = vipStore();
const { setSearchDialogShow } = mainStore();
const { scrollTo } = useScroll()


type dialogType = "login" | "signup" | "signout";

const route = useRoute();

const referral_code = ref<string>("");

// mobile or pc screen
const mobileVersion = computed(() => {
  return name.value;
})
const mobileWidth = computed(() => {
  return width.value
})

const mailMenuShow = computed(() => {
  const { getMailMenuShow } = storeToRefs(mailStore());
  return getMailMenuShow.value;
});

const signUpForm = computed(() => {
  const { getSignUpForm } = storeToRefs(authStore());
  return getSignUpForm.value
})

const controlLevel = computed(() => {
  const { getControlLevel } = storeToRefs(appBarStore());
  return getControlLevel.value
})

const signupDialog = ref<boolean>(false);
const signoutDialog = ref<boolean>(false);
const loginDialog = ref<boolean>(false);
const mobileDialog = ref<boolean>(false);
const mobileDialogCheck = ref<boolean>(false);
const accountDialog = ref<boolean>(false);
const nickNameDialog = ref<boolean>(false);
const levelUpDialog = ref<boolean>(false);
const searchDialog = ref<boolean>(false);
const depositConfirmDialog = ref<boolean>(false);
const groupVisible = ref<boolean>(false);
// const bonusDashboardDialog = ref<boolean>(false);
const overlayScrimBackground = ref<string>('rgb(var(--v-theme-on-surface))')

const authDialogType = ref<dialogType>("login");

const searchDialogShow = computed(() => {
  const { getSearchDialogShow } = storeToRefs(mainStore());
  return getSearchDialogShow.value
})

watch(searchDialogShow, (value) => {
  searchDialog.value = value;
  setMailMenuShow(value);
})

// const authDialogVisible = computed(() => {
//   const { getAuthDialogVisible } = storeToRefs(authStore());
//   return getAuthDialogVisible.value;
// });

// watch(authDialogVisible, (value) => {
//   authDialog.value = value;
// })

const nickNameDialogVisible = computed(() => {
  const { getNickNameDialogVisible } = storeToRefs(authStore());
  return getNickNameDialogVisible.value
})

// const bonusDashboardDialogVisible = computed(() => {
//   const { getBonusDashboardDialogVisible } = storeToRefs(appBarStore());
//   return getBonusDashboardDialogVisible.value
// })

watch(nickNameDialogVisible, (newValue) => {
  nickNameDialog.value = newValue;
  if (newValue) {
    setMainBlurEffectShow(true);
    setOverlayScrimShow(true);
    setHeaderBlurEffectShow(true)
    setMenuBlurEffectShow(true);
  }
})

// watch(bonusDashboardDialogVisible, (newValue) => {
//   bonusDashboardDialog.value = newValue;
//   if (newValue) {
//     setMainBlurEffectShow(true);
//     setOverlayScrimShow(true);
//     setHeaderBlurEffectShow(true)
//     setMenuBlurEffectShow(true);
//   }
// })

// methods

// const closeBonusDashboardDialog = () => {
//   console.log('>>>>>>>>>>')
//   setMainBlurEffectShow(false);
//   setHeaderBlurEffectShow(false);
//   setMenuBlurEffectShow(false);
//   setOverlayScrimShow(false);
//   setBonusDashboardDialogVisible(false);
// }

const closeDialog = (type: dialogType) => {
  if (mobileWidth.value < 600 && type == "signup" && signUpForm.value) {
    return;
  }
  if (type === "login") {
    loginDialog.value = false;
  } else if (type == "signup") {
    signupDialog.value = false;
  } else {
    setMainBlurEffectShow(false);
    setHeaderBlurEffectShow(false);
    setMenuBlurEffectShow(false);
    signoutDialog.value = false;
  }
  mobileDialog.value = false;
  setAuthModalType("");
};

const staticActivityDialog = ref<boolean>(true); // 静态活动页面显示
// 关闭静态页面弹框
const closeStaticActivityDialog = () => {
  staticActivityDialog.value = false
  // 打开活动指引弹窗
}

// 判断是否已经勾选当天不显示静态活动弹框
if (CookieService.getCookie('Static_Activity')) {
  staticActivityDialog.value = false
}

const closeNickNameDialog = () => {
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
  setNickNameDialogVisible(false);
}

const switchDialog = (type: dialogType): void => {
  if (type === "login") {
    mobileDialog.value = true;
    mobileDialogCheck.value = true;
    loginDialog.value = false;
    signoutDialog.value = false;
    signupDialog.value = true;
  } else if (type == "signup") {
    mobileDialog.value = true;
    mobileDialogCheck.value = false;
    loginDialog.value = true;
    signupDialog.value = false;
    signoutDialog.value = false;
  }
};

const authModalType = computed(() => {
  const { getAuthModalType } = storeToRefs(authStore());
  return getAuthModalType.value;
});

watch(mobileVersion, (newValue) => {
  if (newValue == "sm") {
    loginDialog.value = false;
    signupDialog.value = false;
    mobileDialog.value = false;
  }
})

// trigger when authModalType changed

watch(authModalType, (newValue: string) => {
  if (newValue == "login") {
    mobileDialog.value = true;
    mobileDialogCheck.value = false;
    loginDialog.value = true;
  } else if (newValue == "signup") {
    mobileDialog.value = true;
    mobileDialogCheck.value = true;
    signupDialog.value = true;
  } else if (newValue == "signout") {
    signoutDialog.value = true;
    mobileDialog.value = false;
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
  } else {
    mobileDialog.value = false;
  }
});

// deposit dialog
const depositDialog = ref<boolean>(false);
const depositDialogToggle = computed(() => {
  const { getDepositDialogToggle } = storeToRefs(appBarStore());
  return getDepositDialogToggle.value;
})

const depositWithdrawToggle = computed(() => {
  const { getDepositWithdrawToggle } = storeToRefs(appBarStore());
  return getDepositWithdrawToggle.value;
})

watch(depositDialogToggle, (newValue) => {
  depositDialog.value = newValue;
})

// withdraw dialog
const withdrawDialog = ref<boolean>(false);
const withdrawDialogToggle = computed(() => {
  const { getWithdrawDialogToggle } = storeToRefs(appBarStore());
  return getWithdrawDialogToggle.value
})
watch(withdrawDialogToggle, (newValue) => {
  withdrawDialog.value = newValue;
})

// cash dialog
const cashDialog = ref<boolean>(false);
const cashDialogToggle = computed(() => {
  const { getCashDialogToggle } = storeToRefs(appBarStore());
  return getCashDialogToggle.value
})
watch(cashDialogToggle, (newValue) => {
  cashDialog.value = newValue;
})

watch(cashDialog, (newValue) => {
  console.log(cashDialog)
})

// deposit confirm dialog
const depositConfirmDialogToggle = computed(() => {
  const { getDepositConfirmDialogToggle } = storeToRefs(depositStore());
  return getDepositConfirmDialogToggle.value
})

watch(depositConfirmDialogToggle, (value) => {
  depositConfirmDialog.value = value
})

// refferal dialog
const refferalDialog = ref<boolean>(false);

const refferalDialogVisible = computed(() => {
  const { getRefferalDialogVisible } = storeToRefs(refferalStore());
  return getRefferalDialogVisible.value;
})

watch(refferalDialogVisible, (newValue) => {
  refferalDialog.value = newValue;
  if (refferalDialog.value && mobileWidth.value < 600) {
    setUserNavBarToggle(false);
    setNavBarToggle(false);
    setMailMenuShow(false);
    setTimeout(() => {
      setMainBlurEffectShow(true);
      setHeaderBlurEffectShow(true);
      setMenuBlurEffectShow(true);
    }, 10);
  }
}, { deep: true });

// login bonus dialog
const loginBonusDialog = ref<boolean>(false);
const loginBonusDialogVisible = computed(() => {
  const { getLoginBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getLoginBonusDialogVisible.value;
})

watch(loginBonusDialogVisible, (newValue) => {
  loginBonusDialog.value = newValue;
  setOverlayScrimShow(newValue)
  setMainBlurEffectShow(newValue);
}, { deep: true })

// deposit and get bonus dialog
const getBonusDialog = ref<boolean>(false);
const getBonusDialogVisible = computed(() => {
  const { getDepositAndBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getDepositAndBonusDialogVisible.value;
})

watch(getBonusDialogVisible, (newValue) => {
  getBonusDialog.value = newValue;
  setOverlayScrimShow(newValue)
  setMainBlurEffectShow(newValue);
}, { deep: true })

// 判断是否在首页
const isHomePage = ref(route.path === '/');
// 使用 watch 监听路由变化
watch(() => route.path, (newPath) => {
  isHomePage.value = newPath === '/';
});

const closeLoginBonusDialog = () => {
  setLoginBonusDialogVisible(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
}

const closeGetBonusDialog = () => {
  setGetBonusDialogVisible(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
}

// roulette bonus dialog
const rouletteBonusDialog = ref<boolean>(false);
const rouletteBonusDialogVisible = computed(() => {
  const { getRouletteBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getRouletteBonusDialogVisible.value;
})
watch(rouletteBonusDialogVisible, (newValue) => {
  rouletteBonusDialog.value = newValue;
})

const closeRouletteBonusDialog = () => {
  setRouletteBonusDialogVisible(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
}

// main blur effect
const mainBlurEffectShow = computed(() => {
  const { getMainBlurEffectShow } = storeToRefs(appBarStore());
  return getMainBlurEffectShow.value
})

// overlay scrim show
const overlayScrimShow = computed(() => {
  const { getOverlayScrimShow } = storeToRefs(appBarStore());
  return getOverlayScrimShow.value;
})

watch(overlayScrimShow, (newValue) => {
  if (newValue) {
    overlayScrimBackground.value = "transparent";
  } else {
    overlayScrimBackground.value = "rgb(var(--v-theme-on-surface))";
  }
  document.documentElement.style.setProperty('--background-color', overlayScrimBackground.value);
})

// account dialog
const activeMenuIndex = ref<number>(0);
const selectedMenuItem = ref<string>(t('account.menu.user_info_text'));
const menuList = ref<Array<string>>([
  t('account.menu.user_info_text'),
  t('account.menu.personal_info_text'),
  t('account.menu.document_text'),
  t('account.menu.preference_text'),
  t('account.menu.suspend_account_text'),
])
const mainHeight = ref<number>(0);

const userInfo = computed((): GetUserInfo => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
})
const accountDialogVisible = computed(() => {
  const { getAccountDialogShow } = storeToRefs(appBarStore());
  return getAccountDialogShow.value;
})
const levelUpDialogVisible = computed(() => {
  const { getLevelUpDialogVisible } = storeToRefs(vipStore());
  return getLevelUpDialogVisible.value
})

const accountDialogClose = () => {
  accountDialog.value = false;
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
  setAccountDialogShow(false);
}

const selectActiveIndex = (index: number) => {
  activeMenuIndex.value = index;
  setActiveAccountIndex(index);
  selectedMenuItem.value = menuList.value[index];
  accountDialog.value = false;
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
  setAccountDialogShow(false);
  //router.push({ name: "Account", params: { index: activeMenuIndex.value }, query: { index: activeMenuIndex.value } });
  router.push({ name: "Account"});
}

watch(accountDialogVisible, (value: boolean) => {
  accountDialog.value = value
}, { deep: true })

watch(mailMenuShow, (value) => {
  console.log(value);
})

watch(levelUpDialogVisible, (value: boolean) => {
  levelUpDialog.value = value;
})

const closeReferDialog = () => {
  setRefferalDialogShow(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
}

const closeLevelUpDialog = () => {
  setLevelUpDialogVisible(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
}

const depositBlurEffectShow = computed(() => {
  const { getDepositBlurEffectShow } = storeToRefs(appBarStore());
  return getDepositBlurEffectShow.value
})

const handleResize = () => {
  mainHeight.value = window.innerHeight;
}

const fixBtnContainer = ref(false)
watch(route, (to) => {
  // console.log(to.path);
  if(to.path === '/sports') {
    fixBtnContainer.value = false;
  } else {
    fixBtnContainer.value = true;
  }
}, { flush: 'pre', immediate: true, deep: true })

// 打开加入group弹窗
const openGroupDialog=()=>{
  groupVisible.value=true
}

// 打开客服
const openLiveChat=()=>{
  if(userInfo.value?.id) {
    LiveChatWidget?.call?.("set_customer_name", userInfo.value?.id || '');
    // 最大化
    setLiveChatMaximize()
  }
}

const { setAppConfirmDialogShow, automaticPopUpApp, setAppGuidance, setShowAppGuidance } = activityAppStore();
// 打开下载app弹框
const openActivityApp = () => {
  setAppConfirmDialogShow(true)
  // automaticPopUpApp(true)
}

const activityAppBonus = computed(() => {
  const { getActivityBonus } = storeToRefs(activityAppStore());
  return getActivityBonus.value;
});

const showAppGuidance = computed(() => {
  const { getShowAppGuidance } = storeToRefs(activityAppStore());
  return getShowAppGuidance.value;
});

// 点击引导框执行函数
const appGuidanceEvent = () => {
  setAppGuidance(true)
  setShowAppGuidance(false)
  setAppConfirmDialogShow(true)
  // 如果在首页，就打开监听
  // if (isHomePage.value) {
  //   automaticPopUpApp(false)
  // } else {
  //   automaticPopUpApp(true)
  // }
}

const appConfirmDialogShow = computed(() => {
  const { getAppConfirmDialogShow } = storeToRefs(activityAppStore());
  return getAppConfirmDialogShow.value
})

// 获取模式
const mobile = computed(() => {
  const { getMobile } = storeToRefs(activityAppStore());
  return getMobile.value;
});

// 定义状态
const isSwinging = ref(false);

// 摇摆按钮函数
const swingButton = () => {
  isSwinging.value = true;
  setTimeout(() => {
    isSwinging.value = false;
  }, 1600);
};

const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

onMounted(async() => {
  // 在组件挂载时启动摇摆按钮定时器
  setInterval(swingButton, 10000); // 每10秒执行一次

  // 初始化，默认打开弹框
  // setAppConfirmDialogShow(true)

  // 判断下载app是否需要自动弹出
  // 如果在首页，就打开监听
  // if (isHomePage.value) {
  //   automaticPopUpApp(false)
  // } else {
  //   automaticPopUpApp(true)
  // }

  // console.log(route.query.code);
  // 带有邀请注册码的，直接打开注册弹窗
  if (!token.value) {
    if(route.query.code){
      setAuthDialogVisible(true)
    }
  }
  
  window.addEventListener("resize", handleResize);
  // window.addEventListener('scroll', (e) => {
  //         // 获取滚动的值并打印出来
  //     const scrollTop = window.scrollY || window.pageYOffset;
  //   // 在滚动时执行的操作
  //   console.log('Scrolling...', scrollTop);
  // });
  mainHeight.value = window.innerHeight;
  if (overlayScrimShow.value) {
    overlayScrimBackground.value = "transparent";
  } else {
    overlayScrimBackground.value = "rgb(var(--v-theme-on-surface))";
  }
  document.documentElement.style.setProperty('--background-color', overlayScrimBackground.value);
  setCashDialogToggle(false);
  setDepositDialogToggle(false);
  setWithdrawDialogToggle(false);
})



// 监听路由页面 home 初始化时间
const routeInited = () => {
  // scrollTo()
}

const test=ref(true)
</script>

<template>
  <v-main
    id="mainContainer"
    class="main-background"
    :class="mainBlurEffectShow ? 'main-bg-blur' : ''"
    :style="{
      // height: mobileWidth < 600 && mailMenuShow ? mainHeight + 'px' : 'fit-content',
      overflow: mobileWidth < 600 && mailMenuShow ? 'hidden' : 'hidden',
    }"
  >
    <!-- game search dialog -->

    <v-navigation-drawer
      v-model="searchDialogShow"
      location="top"
      class="m-search-bar"
      temporary
      :touchless="true"
      :style="{
        height: '100dvh',
        top: '0px',
        zIndex: 300000,
        background: 'unset !important',
        width: '100dvw',
      }"
      v-if="mobileWidth < 600"
    >
      <MSearch :searchDialogShow="searchDialogShow" @searchCancel="setSearchDialogShow(false)" />
    </v-navigation-drawer>

    <!---------------------- Deposit Dialog ----------------------------------------------->
    <!-- 存款菜单弹窗 -->
    <!-- <v-dialog
      v-model="cashDialog"
      class="cash-header-dialog"
      :width="''"
      :fullscreen="true"
      :scrim="false"
      :transition="'dialog-top-transition'"
      @click:outside="setCashDialogToggle(false)"
      v-if="mobileVersion == 'sm'"
    >-->
    <MCashHeader v-if="cashDialog&&mobileVersion == 'sm'" v-model="cashDialog" />
    <!-- </v-dialog> -->
    <!-- 存款充值 -->
    <!-- <v-dialog
      v-model="withdrawDialog"
      :class="depositBlurEffectShow ? 'm-deposit-dialog' : ''"
      :width="''"
      :fullscreen="true"
      :scrim="false"
      :transition="depositWithdrawToggle ? 'dialog-bottom-transition' : ''"
      style="top: 60px"
      persistent
      v-if="mobileVersion == 'sm'"
    >
    <template v-if="withdrawDialog">-->
    <!-- <Withdraw v-if="mobileWidth > 600" /> -->
    <MWithdraw v-if="withdrawDialog&&mobileVersion == 'sm'" v-model="withdrawDialog" />
    <!-- </template>
    </v-dialog>-->
    <!-- 存款选择 -->
    <!-- <v-dialog
      v-model="depositDialog"
      :class="depositBlurEffectShow ? 'm-deposit-dialog' : ''"
      :width="''"
      :fullscreen="true"
      :scrim="false"
      :transition="depositWithdrawToggle ? 'dialog-bottom-transition' : ''"
      style="top: 60px"
      persistent
      v-if="mobileVersion == 'sm'"
    >
      <template v-if="depositDialog">
    <Deposit v-if="mobileWidth > 600" />-->
    <MDeposit
      class="m-deposit-sub-dialog"
      v-if="depositDialog&&mobileVersion == 'sm'"
      v-model="depositDialog"
    />
    <!-- </template>
    </v-dialog>-->

    <v-dialog
      v-model="cashDialog"
      :width="471"
      :fullscreen="false"
      :scrim="true"
      :transition="''"
      @click:outside="setCashDialogToggle(false)"
      v-if="mobileVersion != 'sm'"
    >
      <CashHeader v-if="mobileWidth > 600" />
      <MCashHeader v-else />
      <template v-if="withdrawDialog">
        <Withdraw v-if="mobileWidth > 600" />
        <MWithdraw v-else />
      </template>
      <template v-else>
        <Deposit v-if="mobileWidth > 600" />
        <MDeposit v-else />
      </template>
    </v-dialog>

    <!---------------------------------- Deposit Confirm ----------------------------------------->
    <!-- 充值确认 -->
    <!-- <v-dialog
      class="m-deposit-cofirm-dialog"
      v-model="depositConfirmDialog"
      :width="''"
      :fullscreen="true"
      :scrim="false"
      persistent
      v-if="mobileVersion == 'sm'"
      :transition="'dialog-top-transition'"
    >-->
    <MDepositConfirm
      v-if="depositConfirmDialog&&mobileVersion == 'sm'"
      v-model="depositConfirmDialog"
    />
    <!-- </v-dialog> -->

    <!-----------------------Authentication Dialog --------------------------------------->

    <!-- <v-dialog
      v-model="authDialog"
      :width="mobileVersion == 'sm' ? '' : 471"
      :fullscreen="mobileVersion == 'sm'"
      :scrim="true"
      :transition="
        mobileVersion == 'sm' ? 'dialog-bottom-transition' : 'scale-transition'
      "
      :class="[mobileVersion == 'sm' ? 'mobile-auth-dialog-position' : '']"
      persistent
      style="z-index: 2147483646"
    >-->
    <template v-if="mobileVersion != 'sm'"></template>
    <template v-else>
      <MAuth v-if="authDialog" v-model="authDialog" />
    </template>
    <!-- </v-dialog> -->

    <!-------------------------------      静态活动页面     ------------------------------------>
    <!-- <v-dialog
      v-model="staticActivityDialog"
      :width="mobileWidth < 600 ? 328 : 471"
      :scrim="true"
      persistent
      style="z-index: 1000001"
    >-->
    <StaticActivityPage
      v-model="staticActivityDialog"
      v-if="staticActivityDialog && mobileVersion == 'sm'"
      @close="closeStaticActivityDialog"
    />
    <!-- </v-dialog> -->

    <!-------------------------------      SIGNUP     ------------------------------------>

    <!-- <v-dialog
      v-model="mobileDialog"
      :fullscreen="mobileVersion == 'sm'"
      transition="dialog-top-transition"
      class="mobile-dialog-toggle-height"
      :scrim="false"
      v-if="mobileVersion == 'sm'"
      style="z-index: 2147483647"
    >
      <MobileDialog :mobileDialogCheck="mobileDialogCheck" @switch="switchDialog" />
    </v-dialog>
    <v-dialog
      v-model="signupDialog"
      :width="mobileVersion == 'sm' ? '' : 471"
      :fullscreen="mobileVersion == 'sm'"
      :scrim="mobileVersion == 'sm' ? false : true"
      :transition="
        mobileVersion == 'sm' ? 'dialog-bottom-transition' : 'scale-transition'
      "
      :class="[mobileVersion == 'sm' ? 'mobile-login-dialog-position' : '']"
      @click:outside="closeDialog('signup')"
      persistent
      style="z-index: 2147483646"
    >
      <Signup
        v-if="mobileVersion != 'sm'"
        @close="closeDialog('signup')"
        @switch="switchDialog('signup')"
      />
      <MSignup v-else @close="closeDialog('signup')" @switch="switchDialog('signup')" />
    </v-dialog>-->

    <!-------------------------------      LOGIN     ------------------------------------>

    <!-- <v-dialog
      v-model="loginDialog"
      :width="mobileVersion == 'sm' ? '' : 471"
      :fullscreen="mobileVersion == 'sm'"
      :scrim="mobileVersion == 'sm' ? false : true"
      :transition="
        mobileVersion == 'sm' ? 'dialog-bottom-transition' : 'scale-transition'
      "
      :class="[mobileVersion == 'sm' ? 'mobile-login-dialog-position' : '']"
      @click:outside="closeDialog('login')"
      persistent
      style="z-index: 2147483646"
    >
      <Login
        v-if="mobileVersion != 'sm'"
        @close="closeDialog('login')"
        @switch="switchDialog('login')"
      />
      <MLogin v-else @close="closeDialog('login')" @switch="switchDialog('login')" />
    </v-dialog>-->

    <!-------------------------------      NICKNAME     ------------------------------------>

    <!-- <v-dialog
      v-model="nickNameDialog"
      width="320"
      :scrim="true"
      transition="scale-transition"
      @click:outside="closeNickNameDialog"
    >-->
    <MNickName v-if="nickNameDialog" @close="closeNickNameDialog" v-model="nickNameDialog" />
    <!-- </v-dialog> -->

    <!-------------------------------      SIGNOUT     ------------------------------------>

    <!-- <v-dialog
      v-model="signoutDialog"
      :width="mobileWidth < 600 ? 328 : 471"
      :scrim="true"
      @click:outside="closeDialog('signout')"
    >-->
    <Signout
      v-if="signoutDialog && mobileWidth > 600"
      @close="closeDialog('signout')"
      v-model="signoutDialog"
    />
    <MSignout
      v-else-if="signoutDialog"
      @close="closeDialog('signout')"
      v-model="signoutDialog"
    />
    <!-- </v-dialog> -->

    <!----------------------------------- level up dialog --------------------------------->

    <v-dialog
      v-model="levelUpDialog"
      :width="mobileWidth < 600 ? '336' : '471'"
      :scrim="mobileVersion == 'sm' ? false : true"
      @click:outside="closeLevelUpDialog"
    >
      <LevelUpDialog v-if="mobileWidth > 600" />
      <MLevelUpDialog v-else />
    </v-dialog>

    <!----------------------------------- refferal dialog @click:outside="closeReferDialog"--------------------------------->

    <!-- <v-dialog
      v-model="refferalDialog"
      persistent
      :width="mobileWidth < 600 ? '360' : '471'"
      :scrim="true"
      style="z-index: 2147483646"
    >-->
    <RefferalDialog v-if="mobileWidth > 600&&refferalDialog" v-model="refferalDialog" />
    <MRefferalDialog v-if="mobileWidth <= 600&&refferalDialog" v-model="refferalDialog" />
    <!-- </v-dialog> -->

    <!----------------------------------- login bonus dialog --------------------------------->

    <!-- <v-dialog
      v-model="loginBonusDialog"
      :width="mobileWidth < 600 ? '340' : '471'"
      @click:outside="closeLoginBonusDialog"
      :class="mobileWidth < 600 ? 'm-login-bonus-dialog' : ''"
      style="z-index: 2147483646"
    >-->
    <LoginBonusDialog
      v-if="mobileWidth > 600&&loginBonusDialog"
      v-model="loginBonusDialog"
      @closeLoginBonusDialog="closeLoginBonusDialog"
    />
    <MLoginBonusDialog
      v-if="mobileWidth <= 600&&loginBonusDialog"
      v-model="loginBonusDialog"
      @closeLoginBonusDialog="closeLoginBonusDialog"
    />
    <!-- </v-dialog> -->

    <!----------------------------------- deposit and get bonus dialog --------------------------------->

    <v-dialog
      v-model="getBonusDialog"
      :width="mobileWidth < 600 ? '340' : '471'"
      @click:outside="closeGetBonusDialog"
      :class="mobileWidth < 600 ? 'm-get-bonus-dialog' : ''"
    >
      <GetBonusDialog v-if="mobileWidth > 600" @closeGetBonusDialog="closeGetBonusDialog" />
      <MGetBonusDialog v-else @closeGetBonusDialog="closeGetBonusDialog" />
    </v-dialog>

    <!----------------------------------- roulette bonus dialog --------------------------------->

    <v-dialog
      v-model="rouletteBonusDialog"
      :width="mobileWidth < 600 ? '340' : '471'"
      @click:outside="closeRouletteBonusDialog"
    >
      <RouletteBonusDialog
        v-if="mobileWidth > 600"
        @closeRouletteBonusDialog="closeRouletteBonusDialog"
      />
      <MRouletteBonusDialog v-else @closeRouletteBonusDialog="closeRouletteBonusDialog" />
    </v-dialog>

    <!----------------------------------- account dialog --------------------------------->

    <!-- <v-dialog v-model="accountDialog" width="312" @click:outside="accountDialogClose"> -->
    <MAccountDialog
      v-if="accountDialog"
      v-model="accountDialog"
      @mDialogHide="accountDialogClose"
      :avatar="userInfo.avatar"
      :nickName="userInfo.name"
      @selectActiveIndex="selectActiveIndex"
    />
    <!-- </v-dialog> -->

    <VipUpgradeDialog />
    <VipUpRankDialog />

    <!-- join group dialog -->
    <GroupDialog v-if="groupVisible" v-model="groupVisible"></GroupDialog>

    <!------------------------------ Main Page ------------------------------------------->

    <router-view v-slot="{ Component, route }">
      <!-- 缓存路由 -->
      <keep-alive>
        <component v-if="route.meta.keepAlive" :is="Component" :key="route.path" />
      </keep-alive>
      <!-- 正常路由 -->
      <component v-if="!route.meta.keepAlive" :is="Component" :key="route.path" />
    </router-view>

    <!-- fix钉 按钮集合 -->
    <div v-show="fixBtnContainer">
      <!-- message btn -->
      <div class="m-message-btn" @click="openGroupDialog" :style="{'z-index': controlLevel ? '9' : '1000'}">
        <img src="@/assets/public/svg/message.svg" class="m-back-icon-position" />
      </div>

      <!-- service btn -->
      <div class="m-service-btn" @click="openLiveChat" :style="{'z-index': controlLevel ? '9' : '1000'}">
        <img src="@/assets/public/svg/service-icon.svg" class="m-back-icon-position" />
      </div>

      <!-- 点击打开下载app页面 -->
      <div class="m-activity-app-btn" v-if="mobile" :style="{'z-index': controlLevel ? '9' : '1000'}">
          <transition
            enter-active-class="animated-lr hinge-lr fadeInRight"
            leave-active-class="animated-lr hinge-lr fadeOutRight"
          >
            <div v-show="isHomePage && showAppGuidance && !appConfirmDialogShow" class="app-content" @click="appGuidanceEvent">
              {{ t('activity_app.text_9') }} <span>{{ platformCurrency }}{{ toFormatNum(activityAppBonus) }}</span>
            </div>
          </transition>

          <div style="position: absolute;" :class="{ 'm-activity-app-swinging-button': isSwinging, 'm-activity-app-prompt': true }" @click="openActivityApp" >
            <img src="@/assets/activity_app/app-floating-button.svg" class="m-back-icon-position" />
          </div>
        </div>
    </div>

    <!-- back top -->

    <el-backtop :right="16" :bottom="70">
      <div class="m-back-top relative">
        <img src="@/assets/public/svg/icon_public_101.svg" class="m-back-icon-position" />
      </div>
    </el-backtop>

    <!-- mobile menu semicircle toggle -->

    <MenuSemiCircle v-if="mobileWidth < 600" />

    <!-------------------------------- Footer Tab ----------------------------------------->
    <Footer v-if="route.path != '/promo'" />

    <!-- 下载app -->
    <ActivityApp />
  </v-main>
</template>
<style lang="scss">
.Vue-Toastification__toast {
  align-items: center !important;
  z-index: 2147483647 !important;
  top: 70px;
  right: -20px !important;
  width: 320px !important;
  height: 60px;
  border: none;
  border-radius: 16px 0px 0px 16px;
  background: var(--bg-2, #15161c);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.el-backtop {
  width: 44px;
  height: 44px;
  z-index: 1000;
}

.m-message-btn {
  position: fixed;
  right: 16px;
  bottom: 190px;
  width: 44px;
  height: 44px;
  background: rgba(22, 130, 241, 1);
  border-radius: 44px;
  filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.4));
  z-index: 1000;
  .m-back-icon-position {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.m-service-btn {
  position: fixed;
  right: 16px;
  bottom: 130px;
  width: 44px;
  height: 44px;
  background: rgba(22, 130, 241, 1);
  border-radius: 44px;
  filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.4));
  z-index: 1000;
  .m-back-icon-position {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.m-activity-app-btn {
  position: fixed;
  right: 16px;
  bottom: 250px;
  width: 44px;
  height: 44px;
  background: #ffd632;
  border-radius: 44px;
  filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.4));
  z-index: 1000;
  & > .m-back-icon-position {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.m-activity-app-prompt::after {
  content: "";
  width: 10px;
  height: 10px;
  background: rgba(222, 61, 18, 1);
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
}

.app-content {
  position: absolute;
  top: 0;
  left: -279px;
  box-sizing: border-box;
  padding: 5px 62px;
  border-top-left-radius: 50px; /* 左上角圆角 */
  border-bottom-left-radius: 50px; /* 左下角圆角 */
  border-top-right-radius: 50px; /* 右上角圆角 */
  border-bottom-right-radius: 50px; /* 右下角圆角 */
  background-image: linear-gradient(
    to right,
    rgba(249, 188, 1, 1),
    rgba(228, 172, 0, 1)
  ); /* 左到右的渐变，从红色到蓝色 */
  width: 316px;
  height: 44px;
  font-size: 10px;
  color: rgba(0, 0, 0, 1);
  font-weight: 400;

  span {
    color: #fff;
  }

  &::after {
    content: "";
    width: 67.75px;
    height: 44px;
    background: url(@/assets/activity_app/img_ci_13.svg);
    position: absolute;
    top: -5px;
    left: -18px;
  }
}

@keyframes swing {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(-20deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

.m-activity-app-swinging-button {
  animation: swing 0.8s ease-in-out infinite;
}

.m-back-top {
  width: 44px;
  height: 44px;
  background: #d42763;
  border-radius: 44px;
  filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.4));

  .m-back-icon-position {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.m-login-bonus-dialog {
  .v-overlay__scrim {
    // opacity: 1 !important;
    // background: unset !important;
    // -webkit-backdrop-filter: saturate(180%) blur(3px);
    // backdrop-filter: saturate(180%) blur(3px);
  }
}

.main-background {
  width: 100dvw !important;
  background: #15161c;
}

.main-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  position: fixed;
}

.mobile-dialog-toggle-height {
  height: 50px !important;
  margin: 0 !important;
  bottom: unset !important;
  top: 0 !important;
}

.mobile-auth-dialog-position {
  position: fixed !important;
  margin: 0 !important;
  top: 0px !important;
}

.mobile-login-dialog-position {
  position: fixed !important;
  margin: 0 !important;
  top: 50px !important;
}

.v-navigation-drawer__scrim {
  opacity: 0.72 !important;
}

@media (max-width: 600px) {
  .v-overlay__scrim {
    background: var(--background-color);
  }

  .v-navigation-drawer__scrim {
    opacity: 0.8 !important;
  }
}

@media (max-width: 388px) {
  .v-dialog > .v-overlay__content {
    max-width: unset !important;
  }
}

.m-deposit-dialog {
  .v-overlay__content {
    transform: none !important;
  }

  // top: 53px!important;
}

.cash-header-dialog {
  z-index: 2431 !important;
  height: 80px;
  margin: 0px !important;
}

.m-deposit-cofirm-dialog {
  z-index: 2432 !important;
}

// .m-withdraw-dialog{
//   .v-overlay__content {
//     transform: none!important;
//   }
// }
</style>
