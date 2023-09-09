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
import MNickName from "@/components/Signup/mobile/NickName.vue";
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
import { mailStore } from "@/store/mail";
import router from '@/router';

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
const { setAuthModalType } = authStore();
const { setNickNameDialogVisible } = authStore();
const { setRefferalDialogShow } = refferalStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();
const { setUserNavBarToggle } = appBarStore();
const { setMailMenuShow } = mailStore();
const { setNavBarToggle } = appBarStore();

type dialogType = "login" | "signup" | "signout";

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
const signupDialog = ref<boolean>(false);
const signoutDialog = ref<boolean>(false);
const loginDialog = ref<boolean>(false);
const mobileDialog = ref<boolean>(false);
const mobileDialogCheck = ref<boolean>(false);
const accountDialog = ref<boolean>(false);
const nickNameDialog = ref<boolean>(false);
const overlayScrimBackground = ref<string>('rgb(var(--v-theme-on-surface))')

const authDialogVisible = computed(() => {
  const { getAuthDialogVisible } = storeToRefs(authStore());
  return getAuthDialogVisible.value;
});

const nickNameDialogVisible = computed(() => {
  const { getNickNameDialogVisible } = storeToRefs(authStore());
  return getNickNameDialogVisible.value
})

watch(nickNameDialogVisible, (newValue) => {
  nickNameDialog.value = newValue;
})

// methods
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
  if(refferalDialog.value && mobileWidth.value <600) {
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

const closeLoginBonusDialog = () => {

  setLoginBonusDialogVisible(false);
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
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
  setAccountDialogShow(false);
}

const selectActiveIndex = (index: number) => {
  activeMenuIndex.value = index;
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

const closeReferDialog = () => {
  setRefferalDialogShow(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
}

const depositBlurEffectShow = computed(() => {
  const { getDepositBlurEffectShow } = storeToRefs(appBarStore());
  return getDepositBlurEffectShow.value
})



// mounted

onMounted(() => {
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
      height: mobileWidth < 600 && mailMenuShow ? '100vh' : 'unset',
      overflow: mobileWidth < 600 && mailMenuShow ? 'hidden' : 'unset',
    }"
  >
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
      :transition="'dialog-bottom-transition'"
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
      :transition="'dialog-bottom-transition'"
      style="top: 60px"
      persistent
      v-if="mobileVersion == 'sm'"
    >
      <template v-if="depositDialog">
        <Deposit v-if="mobileWidth > 600" />
        <MDeposit v-else />
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

    <!-------------------------------      LOGIN     ------------------------------------>
    <v-dialog
      v-model="mobileDialog"
      :fullscreen="mobileVersion == 'sm'"
      transition="dialog-top-transition"
      class="mobile-dialog-toggle-height"
      v-if="mobileVersion == 'sm'"
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
    >
      <Signup
        v-if="mobileVersion != 'sm'"
        @close="closeDialog('signup')"
        @switch="switchDialog('signup')"
      />
      <MSignup v-else @close="closeDialog('signup')" @switch="switchDialog('signup')" />
    </v-dialog>

    <!-------------------------------      SIGNUP     ------------------------------------>

    <v-dialog
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
    >
      <Login
        v-if="mobileVersion != 'sm'"
        @close="closeDialog('login')"
        @switch="switchDialog('login')"
      />
      <MLogin v-else @close="closeDialog('login')" @switch="switchDialog('login')" />
    </v-dialog>

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
      :scrim="false"
      @click:outside="closeDialog('signout')"
    >
      <Signout v-if="mobileVersion != 'sm'" @close="closeDialog('signout')" />
      <MSignout v-else @close="closeDialog('signout')" />
    </v-dialog>

    <!----------------------------------- refferal dialog --------------------------------->

    <v-dialog
      v-model="refferalDialog"
      :width="mobileWidth < 600 ? '360' : '471'"
      :scrim="mobileVersion == 'sm' ? false : true"
      @click:outside="closeReferDialog"
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
    >
      <LoginBonusDialog
        v-if="mobileWidth > 600"
        @closeLoginBonusDialog="closeLoginBonusDialog"
      />
      <MLoginBonusDialog v-else @closeLoginBonusDialog="closeLoginBonusDialog" />
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

    <!------------------------------ Main Page ------------------------------------------->

    <router-view />

    <el-backtop :right="16" :bottom="70">
      <div class="m-back-top relative">
        <img src="@/assets/public/svg/icon_public_94.svg" class="m-back-icon-position" />
      </div>
    </el-backtop>

    <!-------------------------------- Footer Tab ----------------------------------------->
    <Footer />
  </v-main>
</template>
<style lang="scss">
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
    // -webkit-backdrop-filter: saturate(180%) blur(4px);
    // backdrop-filter: saturate(180%) blur(4px);
  }
}

.main-background {
  background: #31275c;
}

.main-bg-blur {
  // filter: blur(4px);
  // -webkit-filter: blur(4px);
  filter: saturate(180%) blur(4px);
  -webkit-filter: saturate(180%) blur(4px);
}

.mobile-dialog-toggle-height {
  height: 40px !important;
  margin: 0 !important;
  bottom: unset !important;
  top: 0 !important;
}

.mobile-login-dialog-position {
  position: sticky !important;
  margin: 0 !important;
  height: 0px !important;
  bottom: 0 !important;
  top: unset !important;
}

.v-navigation-drawer__scrim {
  opacity: 0.72 !important;
}

@media (max-width: 600px) {
  .v-overlay__scrim {
    background: var(--background-color);
  }

  .v-navigation-drawer__scrim {
    opacity: 0 !important;
    background: transparent !important;
  }
}

@media (max-width: 388px) {
  .v-dialog > .v-overlay__content {
    max-width: unset !important;
  }
}

.m-deposit-dialog{
  .v-overlay__content {
    transform: none!important;
  } 
}

// .m-withdraw-dialog{
//   .v-overlay__content {
//     transform: none!important;
//   } 
// }

</style>
