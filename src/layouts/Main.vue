<script lang="ts" setup>
import { ref, computed, watch, onMounted, defineAsyncComponent, watchEffect } from 'vue';
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

import Deposit from "@/components/cash/deposit/index.vue";
import MDeposit from "@/components/cash/deposit/mobile/index.vue";
import Withdraw from "@/components/cash/withdraw/index.vue";
import MWithdraw from "@/components/cash/withdraw/mobile/index.vue";
import MCashHeader from "@/components/cash/header/mobile/index.vue";
import CashHeader from "@/components/cash/header/index.vue";
// import MobileDialog from "@/components/Signout/mobile/Header.vue";
// import Signup from "@/components/Signup/index.vue";
// import MSignup from "@/components/Signup/mobile/index.vue";
// import Login from "@/components/Login/index.vue";
// import MLogin from "@/components/Login/mobile/index.vue";
import MNickName from "@/components/auth/components/mobile/sign_up/NickName.vue";
import Signout from "@/components/Signout/index.vue";
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

import { mailStore } from "@/store/mail";
import router from '@/router';

const GetBonusDialog = defineAsyncComponent(() => import("@/components/get_bonus/index.vue"));
const MGetBonusDialog = defineAsyncComponent(() => import("@/components/get_bonus/mobile/index.vue"));
const MenuSemiCircle = defineAsyncComponent(() => import("@/components/global/menu_semi_circle/index.vue"));
const LevelUpDialog = defineAsyncComponent(() => import("@/components/level_up/index.vue"));
const MLevelUpDialog = defineAsyncComponent(() => import("@/components/level_up/mobile/index.vue"));
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
const Search = defineAsyncComponent(() => import("@/components/global/search/index.vue"));
const MSearch = defineAsyncComponent(() => import("@/components/global/search/mobile/index.vue"));

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
// const { setBonusDashboardDialogVisible } = appBarStore();
const { setAuthModalType } = authStore();
const { setNickNameDialogVisible } = authStore();
const { setRefferalDialogShow } = refferalStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();
const { setGetBonusDialogVisible } = loginBonusStore();
const { setUserNavBarToggle } = appBarStore();
const { setMailMenuShow } = mailStore();
const { setNavBarToggle } = appBarStore();
const { setLevelUpDialogVisible } = vipStore();
const { setSearchDialogShow } = mainStore();

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

// authentication dialog
const authDialog = ref<boolean>(false);
const signupDialog = ref<boolean>(false);
const signoutDialog = ref<boolean>(false);
const loginDialog = ref<boolean>(false);
const mobileDialog = ref<boolean>(false);
const mobileDialogCheck = ref<boolean>(false);
const accountDialog = ref<boolean>(false);
const nickNameDialog = ref<boolean>(false);
const levelUpDialog = ref<boolean>(false);
const searchDialog = ref<boolean>(false);
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

const authDialogVisible = computed(() => {
  const { getAuthDialogVisible } = storeToRefs(authStore());
  return getAuthDialogVisible.value;
});

watch(authDialogVisible, (value) => {
  authDialog.value = value;
})

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
  router.push({ name: "Account", params: { index: activeMenuIndex.value }, query: { index: activeMenuIndex.value } });
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

watch(route, (to) => {
  // console.log(to.path);
}, { flush: 'pre', immediate: true, deep: true })

onMounted(() => {
  console.log(route.query.code);
  window.addEventListener("resize", handleResize);
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
</script>

<template>
  <v-main
    class="main-background"
    :class="mainBlurEffectShow ? 'main-bg-blur' : ''"
    :style="{
      height: mobileWidth < 600 && mailMenuShow ? mainHeight + 'px' : 'unset',
      overflow: mobileWidth < 600 && mailMenuShow ? 'hidden' : 'unset',
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
        height: '100%',
        top: '0px',
        zIndex: 300000,
        background: 'unset !important',
      }"
      v-if="mobileWidth < 600"
    >
      <MSearch
        :searchDialogShow="searchDialogShow"
        @searchCancel="setSearchDialogShow(false)"
      />
    </v-navigation-drawer>

    <!---------------------- Deposit Dialog ----------------------------------------------->

    <v-dialog
      v-model="cashDialog"
      class="cash-header-dialog"
      :width="''"
      :fullscreen="true"
      :scrim="false"
      :transition="'dialog-top-transition'"
      @click:outside="setCashDialogToggle(false)"
      v-if="mobileVersion == 'sm'"
    >
      <MCashHeader />
    </v-dialog>

    <v-dialog
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
      <template v-if="withdrawDialog">
        <Withdraw v-if="mobileWidth > 600" />
        <MWithdraw v-else />
      </template>
    </v-dialog>

    <v-dialog
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
        <Deposit v-if="mobileWidth > 600" />
        <MDeposit class="m-deposit-sub-dialog" v-else />
      </template>
    </v-dialog>

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

    <!-----------------------Authentication Dialog --------------------------------------->

    <v-dialog
      v-model="authDialog"
      :width="mobileVersion == 'sm' ? '' : 471"
      :fullscreen="mobileVersion == 'sm'"
      :scrim="true"
      :transition="
        mobileVersion == 'sm' ? 'dialog-bottom-transition' : 'scale-transition'
      "
      :class="[mobileVersion == 'sm' ? 'mobile-auth-dialog-position' : '']"
      @click:outside="authDialog = false"
      persistent
      style="z-index: 2147483646"
    >
      <template v-if="mobileVersion != 'sm'"> </template>
      <template v-else>
        <MAuth />
      </template>
    </v-dialog>

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
    </v-dialog> -->

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
    </v-dialog> -->

    <!-------------------------------      NICKNAME     ------------------------------------>

    <v-dialog
      v-model="nickNameDialog"
      width="320"
      :scrim="true"
      transition="scale-transition"
      @click:outside="closeNickNameDialog"
    >
      <MNickName @close="closeNickNameDialog" />
    </v-dialog>

    <!-------------------------------      SIGNOUT     ------------------------------------>

    <v-dialog
      v-model="signoutDialog"
      :width="mobileWidth < 600 ? 328 : 471"
      :scrim="true"
      @click:outside="closeDialog('signout')"
    >
      <Signout v-if="mobileVersion != 'sm'" @close="closeDialog('signout')" />
      <MSignout v-else @close="closeDialog('signout')" />
    </v-dialog>

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

    <!----------------------------------- refferal dialog --------------------------------->

    <v-dialog
      v-model="refferalDialog"
      persistent
      :width="mobileWidth < 600 ? '360' : '471'"
      :scrim="true"
      @click:outside="false"
      style="z-index: 2147483646"
    >
      <RefferalDialog v-if="mobileWidth > 600" />
      <MRefferalDialog v-else />
    </v-dialog>

    <!----------------------------------- login bonus dialog --------------------------------->

    <v-dialog
      v-model="loginBonusDialog"
      :width="mobileWidth < 600 ? '340' : '471'"
      @click:outside="closeLoginBonusDialog"
      :class="mobileWidth < 600 ? 'm-login-bonus-dialog' : ''"
      style="z-index: 10000000000000020"
    >
      <LoginBonusDialog
        v-if="mobileWidth > 600"
        @closeLoginBonusDialog="closeLoginBonusDialog"
      />
      <MLoginBonusDialog v-else @closeLoginBonusDialog="closeLoginBonusDialog" />
    </v-dialog>

    <!----------------------------------- deposit and get bonus dialog --------------------------------->

    <v-dialog
      v-model="getBonusDialog"
      :width="mobileWidth < 600 ? '340' : '471'"
      @click:outside="closeGetBonusDialog"
      :class="mobileWidth < 600 ? 'm-get-bonus-dialog' : ''"
    >
      <GetBonusDialog
        v-if="mobileWidth > 600"
        @closeGetBonusDialog="closeGetBonusDialog"
      />
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

    <v-dialog v-model="accountDialog" width="312" @click:outside="accountDialogClose">
      <MAccountDialog
        @mDialogHide="accountDialogClose"
        :avatar="userInfo.avatar"
        :nickName="userInfo.name"
        @selectActiveIndex="selectActiveIndex"
      />
    </v-dialog>

    <VipUpgradeDialog />

    <!------------------------------ Main Page ------------------------------------------->

    <router-view />

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
  background: var(--bg-2, #181522);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.el-backtop {
  width: 44px;
  height: 44px;
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
  z-index: 2430 !important;
  height: 80px;
  margin: 0px !important;
}

// .m-withdraw-dialog{
//   .v-overlay__content {
//     transform: none!important;
//   }
// }
</style>
