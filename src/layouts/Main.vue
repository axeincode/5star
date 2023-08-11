<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import { appBarStore } from '@/store/appBar';
import { refferalStore } from '@/store/refferal';
import { authStore } from "@/store/auth";
import { loginBonusStore } from "@/store/loginBonus";
import { type GetUserInfo } from "@/interface/user";
import { storeToRefs } from 'pinia';
import { useI18n } from "vue-i18n";
import Footer from "./Footer.vue";
import Deposit from "@/components/cash/deposit/index.vue";
import MDeposit from "@/components/cash/deposit/mobile/index.vue";
import Withdraw from "@/components/cash/withdraw/index.vue";
import MWithdraw from "@/components/cash/withdraw/mobile/index.vue";
import MCashHeader from "@/components/cash/header/mobile/index.vue";
import CashHeader from "@/components/cash/header/index.vue";
import Signup from "@/components/Signup/index.vue";
import MSignup from "@/components/Signup/mobile/index.vue";
import Login from "@/components/Login/index.vue";
import MLogin from "@/components/Login/mobile/index.vue";
import Signout from "@/components/Signout/index.vue";
import MSignout from "@/components/Signout/mobile/index.vue";
import MobileDialog from "@/components/Signout/mobile/Header.vue";
import RefferalDialog from "@/components/refferal/index.vue";
import MRefferalDialog from "@/components/refferal/mobile/index.vue";
import LoginBonusDialog from "@/components/login_bonus/index.vue";
import MLoginBonusDialog from "@/components/login_bonus/mobile/index.vue";
import RouletteBonusDialog from "@/components/roulette_bonus/index.vue";
import MRouletteBonusDialog from "@/components/roulette_bonus/mobile/index.vue";
import MAccountDialog from "@/views/account/dialog/index.vue";
import router from '@/router';

const { t } = useI18n();
const { name, width } = useDisplay();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setAccountDialogShow } = appBarStore();
const { setAuthModalType } = authStore();
const { setRefferalDialogShow } = refferalStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();

type dialogType = "login" | "signup" | "signout";

// mobile or pc screen
const mobileVersion = computed(() => {
  return name.value;
})
const mobileWidth = computed(() => {
  return width.value
})

// authentication dialog
const signupDialog = ref<boolean>(false);
const signoutDialog = ref<boolean>(false);
const loginDialog = ref<boolean>(false);
const mobileDialog = ref<boolean>(false);
const mobileDialogCheck = ref<boolean>(false);
const accountDialog = ref<boolean>(false);
const overlayScrimBackground = ref<string>('rgb(var(--v-theme-on-surface))')

// methods
const closeDialog = (type: dialogType) => {
  if (type === "login") {
    loginDialog.value = false;
  } else if (type == "signup") {
    signupDialog.value = false;
  } else {
    signoutDialog.value = false;
  }
  mobileDialog.value = false;
  setAuthModalType("");
};

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
  } else {
    mobileDialog.value = false;
  }
});

// deposit dialog
const depositDialog = ref<boolean>(true);
const depositDialogToggle = computed(() => {
  const { getDepositDialogToggle } = storeToRefs(appBarStore());
  return getDepositDialogToggle.value;
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

// refferal dialog
const refferalDialog = ref<boolean>(false);
const refferalDialogVisible = computed(() => {
  const { getRefferalDialogVisible } = storeToRefs(refferalStore());
  return getRefferalDialogVisible.value;
})
watch(refferalDialogVisible, (newValue) => {
  refferalDialog.value = newValue;
}, { deep: true });

// login bonus dialog
const loginBonusDialog = ref<boolean>(false);
const loginBonusDialogVisible = computed(() => {
  const { getLoginBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getLoginBonusDialogVisible.value;
})
watch(loginBonusDialogVisible, (newValue) => {
  console.log(newValue);
  loginBonusDialog.value = newValue;
  // setOverlayScrimShow(newValue)
  // setMainBlurEffectShow(newValue);
}, { deep: true })
const closeLoginBonusDialog = () => {
  console.log("ok");
  setLoginBonusDialogVisible(false);
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
  console.log(newValue);
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

const userInfo = computed((): GetUserInfo => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
})
const accountDialogVisible = computed(() => {
  const { getAccountDialogShow } = storeToRefs(appBarStore());
  return getAccountDialogShow.value;
})

const accountDialogClose = () => {
  accountDialog.value = false;
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
  setAccountDialogShow(false);
}

const selectActiveIndex = (index: number) => {
  activeMenuIndex.value = index;
  selectedMenuItem.value = menuList.value[index];
  accountDialog.value = false;
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
  setAccountDialogShow(false);
  router.push({ name: "Account", params: { index: activeMenuIndex.value }, query: { index: activeMenuIndex.value } });
}

watch(accountDialogVisible, (value: boolean) => {
  accountDialog.value = value
}, { deep: true })

// mounted

onMounted(() => {
  if (overlayScrimShow.value) {
    overlayScrimBackground.value = "transparent";
  } else {
    overlayScrimBackground.value = "rgb(var(--v-theme-on-surface))";
  }
  document.documentElement.style.setProperty('--background-color', overlayScrimBackground.value);
})
</script>

<template>
  <v-main class="main-background" :class="mainBlurEffectShow ? 'main-bg-blur' : ''">

    <!---------------------- Deposit Dialog ----------------------------------------------->

    <v-dialog v-model="cashDialog" :width="mobileVersion == 'sm' ? '' : 471" :fullscreen="mobileVersion == 'sm'"
      :scrim="mobileVersion == 'sm' ? false : true" :transition="mobileVersion == 'sm' ? 'dialog-bottom-transition' : ''"
      @click:outside="setCashDialogToggle(false)">
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

    <v-dialog v-model="mobileDialog" :fullscreen="mobileVersion == 'sm'" transition="dialog-top-transition"
      class="mobile-dialog-toggle-height" v-if="mobileVersion == 'sm'">
      <MobileDialog :mobileDialogCheck="mobileDialogCheck" @switch="switchDialog" />
    </v-dialog>
    <v-dialog v-model="signupDialog" :width="mobileVersion == 'sm' ? '' : 471" :fullscreen="mobileVersion == 'sm'"
      :scrim="mobileVersion == 'sm' ? false : true"
      :transition="mobileVersion == 'sm' ? 'dialog-bottom-transition' : 'scale-transition'"
      :class="[mobileVersion == 'sm' ? 'mobile-login-dialog-position' : '']" @click:outside="closeDialog('signup')">
      <!------------  PC Version ------------>
      <Signup v-if="mobileVersion != 'sm'" @close="closeDialog('signup')" @switch="switchDialog('signup')" />
      <!------------  Mobile Version ------------>
      <MSignup v-else @close="closeDialog('signup')" @switch="switchDialog('signup')" />
    </v-dialog>
    <v-dialog v-model="loginDialog" :width="mobileVersion == 'sm' ? '' : 471" :fullscreen="mobileVersion == 'sm'"
      :scrim="mobileVersion == 'sm' ? false : true"
      :transition="mobileVersion == 'sm' ? 'dialog-bottom-transition' : 'scale-transition'"
      :class="[mobileVersion == 'sm' ? 'mobile-login-dialog-position' : '']" @click:outside="closeDialog('login')">
      <!------------  PC Version ------------>
      <Login v-if="mobileVersion != 'sm'" @close="closeDialog('login')" @switch="switchDialog('login')" />
      <!------------  Mobile Version ------------>
      <MLogin v-else @close="closeDialog('login')" @switch="switchDialog('login')" />
    </v-dialog>
    <v-dialog v-model="signoutDialog" :width="mobileWidth < 600 ? 328 : 471"
      @click:outside="closeDialog('signout')">
      <Signout v-if="mobileVersion != 'sm'" @close="closeDialog('signout')" />
      <MSignout v-else @close="closeDialog('signout')" />
    </v-dialog>

    <!----------------------------------- refferal dialog --------------------------------->

    <v-dialog v-model="refferalDialog" :width="mobileWidth < 600 ? '360' : '471'"
      @click:outside="setRefferalDialogShow(false)">
      <RefferalDialog v-if="mobileWidth > 600" />
      <MRefferalDialog v-else />
    </v-dialog>

    <!----------------------------------- login bonus dialog --------------------------------->

    <v-dialog v-model="loginBonusDialog" :width="mobileWidth < 600 ? '340' : '471'"
      @click:outside="setLoginBonusDialogVisible(false)">
      <LoginBonusDialog v-if="mobileWidth > 600" @closeLoginBonusDialog="closeLoginBonusDialog" />
      <MLoginBonusDialog v-else @closeLoginBonusDialog="closeLoginBonusDialog" />
    </v-dialog>

    <!----------------------------------- roulette bonus dialog --------------------------------->

    <v-dialog v-model="rouletteBonusDialog" :width="mobileWidth < 600 ? '340' : '471'"
      @click:outside="closeRouletteBonusDialog">
      <RouletteBonusDialog v-if="mobileWidth > 600" @closeRouletteBonusDialog="closeRouletteBonusDialog" />
      <MRouletteBonusDialog v-else @closeRouletteBonusDialog="closeRouletteBonusDialog" />
    </v-dialog>

    <!----------------------------------- account dialog --------------------------------->


    <v-dialog v-model="accountDialog" width="312" @click:outside="accountDialogClose">
      <MAccountDialog @mDialogHide="accountDialogClose" :avatar="userInfo.avatar" :nickName="userInfo.name"
        @selectActiveIndex="selectActiveIndex" />
    </v-dialog>

    <!------------------------------ Main Page ------------------------------------------->

    <router-view />

    <!-------------------------------- Footer Tab ----------------------------------------->
    <Footer />
  </v-main>
</template>
<style lang="scss">
.main-background {
  background: #31275C;
}

.main-bg-blur {
  filter: blur(4px);
  -webkit-filter: blur(4px);
}

.mobile-dialog-toggle-height {
  height: 40px !important;
  position: absolute !important;
  margin: 0 !important;
  bottom: unset !important;
  top: 0 !important;
}

.mobile-login-dialog-position {
  position: absolute !important;
  margin: 0 !important;
  height: 624px !important;
  bottom: 0 !important;
  top: unset !important;
}

.v-navigation-drawer__scrim {
  opacity: 0.72 !important;
}

@media (max-width: 600px) {
  .v-overlay__scrim {
    background: var(--background-color);
    ;
  }

  .v-navigation-drawer__scrim {
    opacity: 0 !important;
    background: transparent !important;
  }

}

@media(max-width: 388px) {
  .v-dialog>.v-overlay__content {
    max-width: unset !important;
  }
}
</style>
