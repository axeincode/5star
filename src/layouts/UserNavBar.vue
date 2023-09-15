<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { type GetUserData } from "@/interface/appBar";
import { refferalStore } from '@/store/refferal';
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { appBarStore } from "@/store/appBar";
import { authStore } from "@/store/auth";
import { mailStore } from "@/store/mail";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";
import { useDisplay } from 'vuetify';
import { useRouter } from "vue-router";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { VipLevel } from "@/interface/vip";
import { useToast } from "vue-toastification";

const { setAuthModalType } = authStore();
const { setUserNavBarToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setAccountDialogShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setBonusTabIndex } = bonusTransactionStore();
const { setTransactionTab } = bonusTransactionStore();
const { setRefferalDialogShow } = refferalStore();
const { setMailMenuShow } = mailStore();
const { dispatchVipInfo } = vipStore();
const { dispatchVipLevels } = vipStore();
const { setDepositWithdrawToggle } = appBarStore();

// mobile version name
const { name, width } = useDisplay()
const { t } = useI18n();
const router = useRouter();

const drawer = ref<boolean>(false);

const depositRate = ref<number>(0);

const wagerRate = ref<number>(0);

const accountPageShow = ref<boolean>(false);

const referPageShow = ref<boolean>(false);

const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);
const notificationText = ref<string>('Successful replication');

// logged in user info
const user = ref<GetUserData>({
  id: "User6696608024",
  avatar: new URL("@/assets/public/image/ua_public_10.png", import.meta.url).href,
  name: "Little Planes",
  grade_level: "Bronze",
  grade: "VIP 4",
  wallet: 515.25,
  currency: "R$",
});

const selectedVipLevel = ref<VipLevel>({
  level: 0,
  protection_conditions: 0,
  deposit_exp: 0,
  bet_exp: 0,
  free_spins_times: 0,
  upgrade_award: 0,
  week_award: 0,
  month_award: 0,
  free_withdrawals: 0,
  free_withdrawals_times: 0,
  withdrawal_fee: 0,
  bet_award_rate: {
    casino: 0,
  },
  SigninAward: [],
  tasks_max: 0,
  deposit_rate: 0,
  bet_rate: 0
});

const userInfo = computed(() => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value
})

const vipInfo = computed(() => {
  const { getVipInfo } = storeToRefs(vipStore());
  return getVipInfo.value
})

const vipLevels = computed(() => {
  const { getVipLevels } = storeToRefs(vipStore());
  return getVipLevels.value
})

const userNavBarToggle = computed(() => {
  const { getUserNavBarToggle } = storeToRefs(appBarStore());
  return getUserNavBarToggle.value;
});

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
})

const mobileVersion = computed(() => {
  return name.value
});

const mobileWidth: any = computed(() => {
  return width.value;
})

const depositDialogShow = () => {
  setDepositWithdrawToggle(true);
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
  setUserNavBarToggle(false);
}

const withdrawDialogShow = () => {
  setWithdrawDialogToggle(true);
  setCashDialogToggle(true);
  setUserNavBarToggle(false);
}

const showSignoutDialog = () => {
  setAuthModalType("signout");
  setUserNavBarToggle(false);
  setOverlayScrimShow(false);
}

const goBonusPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(0);
  setUserNavBarToggle(false);
}

const goTransactionPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(1);
  setTransactionTab(t('transaction.tab.transactions'));
  setUserNavBarToggle(false);
}

const goDepositPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(1);
  setTransactionTab(t('transaction.tab.transactions'));
  setUserNavBarToggle(false);
}

const goWithdrawPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(1);
  setTransactionTab(t('transaction.tab.withdrawal'));
  setUserNavBarToggle(false);
}

const goGameHistoryPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(1);
  setTransactionTab(t('transaction.tab.game_history'));
  setUserNavBarToggle(false);
}

const handleRefferalDialogShow = () => {
  referPageShow.value = true;
  setRefferalDialogShow(true);
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(drawer.value);
  setUserNavBarToggle(false);
}

const goAccountPage = () => {
  accountPageShow.value = true;
  setAccountDialogShow(true);
  // router.push({ name: 'Account' })
  setMainBlurEffectShow(drawer.value);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(drawer.value);
  setUserNavBarToggle(false);
}

const goVIPPage = () => {
  router.push({ name: "VIP" })
}

watch(userNavBarToggle, (newValue) => {
  drawer.value = newValue;
})

watch(drawer, (newValue: boolean) => {
  setUserNavBarToggle(newValue);
  setMailMenuShow(newValue);
  if (!newValue && !accountPageShow.value && !referPageShow.value) {
    setMainBlurEffectShow(false);
  }
  accountPageShow.value = false;
  referPageShow.value = false;
  if (newValue) {
    setMainBlurEffectShow(true);
    setOverlayScrimShow(true);
  }
})

watch(mobileWidth, (newValue: number) => {
  if (newValue > 600) {
    setUserNavBarToggle(false);
  }
})

const handleNotifyShow = () => {
  const toast = useToast();
  toast.success( notificationText.value, {
      timeout: 3000,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: SuccessIcon,
      rtl: false,
  });
}
watch(vipLevels, (value) => {
  value.map(item => {
    if (item.level == vipInfo.value.level) {
      selectedVipLevel.value = item;
      if (item.deposit_exp != 0) {
        depositRate.value = vipInfo.value.deposit_exp / item.deposit_exp;
      }
      if (item.bet_exp != 0) {
        wagerRate.value = vipInfo.value.bet_exp / item.bet_exp;
      }
    }
  })
})


onMounted(async () => {
  await dispatchVipInfo();
  await dispatchVipLevels();
})
</script>

<template>
  <v-navigation-drawer
    temporary
    class="user-nav-background pt-14"
    location="right"
    width="269"
    style="padding-bottom: 58px !important"
    v-model="drawer"
    :touchless="true"
  >
    <template v-slot:prepend>
      <div :class="refferalAppBarShow ? 'user-navbar-position' : ''"></div>
    </template>
    <v-list class="mobile-nav" density="compact" nav>
      <v-list-item class="m-user-item">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_58.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2 text-600-10"
          >{{ t("appBar.id") }}: {{ userInfo.uid }}</v-list-item-title
        >
        <template v-slot:append>
          <div
            style="width: 22px; height: 22px; border-radius: 4px; background: #353652"
            class="relative"
            @click="handleNotifyShow"
          >
            <img
              src="@/assets/public/svg/icon_public_71.svg"
              width="16"
              style="
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              "
            />
          </div>
        </template>
      </v-list-item>
      <v-list-item class="m-user-item" @click="goVIPPage">
        <template v-slot:prepend>
          <div>
            <div style="height: 30px; justify-content: center; display: flex">
              <img src="@/assets/app_bar/image/img_vip_02.png" width="26" />
            </div>
            <div class="text-800-12 color-F9BC01 text-center">
              VIP {{ vipInfo.level }}
            </div>
          </div>
        </template>
        <v-list-item-title class="ml-2">
          <div class="deposit-progress-bg mb-1">
            <div class="d-flex">
              <div class="white text-500-8">{{ t("appBar.deposit") }}</div>
              <div class="ml-auto text-800-8">
                <Font>R$ {{ vipInfo.deposit_exp }}</Font> /
                <Font color="#F9BC01">R$ {{ selectedVipLevel.deposit_exp }}</Font>
              </div>
            </div>
            <div style="margin-top: 2px">
              <v-progress-linear
                v-model="depositRate"
                height="8"
                class="deposit-progress"
              >
              </v-progress-linear>
            </div>
          </div>
          <div class="deposit-progress-bg">
            <div class="d-flex mx-1">
              <div class="white text-500-8">{{ t("appBar.wager") }}</div>
              <div class="ml-auto text-800-8">
                <Font>R$ {{ vipInfo.bet_exp }}</Font> /
                <Font color="#623AEC">R$ {{ selectedVipLevel.bet_exp }}</Font>
              </div>
            </div>
            <div style="margin-top: 2px">
              <v-progress-linear v-model="depositRate" height="8" class="wager-progress">
              </v-progress-linear>
            </div>
          </div>
        </v-list-item-title>
        <!-- <template v-slot:prepend>
                    <img src="@/assets/app_bar/images/img_vip_02.png" style="margin-left: -6px;" />
                </template>
                <v-list-item-title class="ml-2">
                    <div class="grade-color d-flex">
                        <div>{{ user.grade_level }}</div>
                        <div class="grade-text-position">{{ user.grade }}</div>
                    </div>
                    <div>
                        <v-progress-linear v-model="depositRate" height="18" class="deposit-progress">
                        </v-progress-linear>
                    </div>
                </v-list-item-title>
                <template v-slot:append>
                    <img src="@/assets/public/image/img_public_05.svg" v-ripple.center class="ml-6" />
                    <img src="@/assets/public/image/img_public_05.svg" v-ripple.center class="ml-1" />
                    <img src="@/assets/public/image/img_public_05.svg" v-ripple.center class="ml-1" />
                </template> -->
      </v-list-item>
      <v-list-item class="m-user-item" value="account" @click="goAccountPage">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_59.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.account") }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="m-user-item" value="deposit" @click="depositDialogShow">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_60.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.deposit") }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="m-user-item" value="bonuses" @click="goBonusPage">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_61.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.bonuses") }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="m-user-item" value="game_history" @click="goGameHistoryPage">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_62.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.game_history") }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="m-user-item" value="transactions" @click="goTransactionPage">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_63.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.transactions") }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        class="m-user-item refer-friend-background"
        height="36"
        value="refer_friend"
        @click="handleRefferalDialogShow"
      >
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_64.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.refer_friend") }}</v-list-item-title>
        <template v-slot:append>
          <img
            src="@/assets/public/image/img_public_09.png"
            v-ripple.center
            class="ml-6 m-refer-friend-img-position"
            width="43"
          />
          <p class="m-refer-friend-text-position">{{ t("appBar.earn_money") }}</p>
        </template>
      </v-list-item>
      <v-list-item class="m-user-item" value="withdraw" @click="withdrawDialogShow">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_65.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.withdraw") }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="m-user-item app-background" value="app" height="36">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_66.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.app") }}</v-list-item-title>
        <template v-slot:append>
          <img
            src="@/assets/public/image/img_public_04.png"
            v-ripple.center
            class="ml-6 m-app-img-position"
            width="73"
          />
          <p class="m-app-text-position">{{ t("appBar.install") }}</p>
        </template>
      </v-list-item>
      <v-list-item class="m-user-item" value="fairness">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_72.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.fairness") }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="m-user-item" value="rewards">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_67.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.rewards") }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="m-user-item" value="preferences">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_68.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.preferences") }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="m-user-item" value="statistics">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_69.svg" width="18" />
        </template>
        <v-list-item-title class="ml-2">{{ t("appBar.statistics") }}</v-list-item-title>
      </v-list-item>
      <div
        class="d-flex justify-center align-center m-sign-out-btn text-400-12 white"
        v-ripple.center
        @click="showSignoutDialog"
      >
        <img src="@/assets/public/svg/icon_public_70.svg" class="mr-4" width="20" />
        {{ t("appBar.sign_out") }}
      </div>
    </v-list>
  </v-navigation-drawer>
  <Notification
    :notificationShow="notificationShow"
    :notificationText="notificationText"
    :checkIcon="checkIcon"
  />
</template>

<style lang="scss">
.nav-background {
  background-color: #29253c !important;
  color: #7782aa !important;
  border: 2px !important;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25) !important;
  top: 0px !important;
  height: 100% !important;
  will-change: auto !important;
}

.user-nav-background {
  background-color: #211f31 !important;
  color: #7782aa !important;
  border: 2px !important;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25) !important;
  top: 0px !important;
  height: 100% !important;
  will-change: auto !important;
}

@media (max-width: 600px) {
  .v-list-item--density-compact.v-list-item--one-line {
    min-height: 36px;
  }
}

.m-sign-out-btn {
  width: 157px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--secondary-button-353652, #353652);

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  margin: auto;
}

.m-refer-friend-img-position {
  position: absolute;
  right: 26px;
  top: -15px;
}

.m-app-img-position {
  position: absolute;
  right: 9px;
  top: -15px;
}

.user-navbar-position {
  margin-top: 35px;
}

.m-nav-drawer-content {
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
  }
}

.v-navigation-drawer__content {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden !important;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
  }
}

.right-bar-card-border {
  border-radius: 0px 0px 32px 32px !important;
  height: 68px !important;
}

.m-user-item {
  padding: 10px 10px !important;
  border-radius: 12px !important;

  .v-list-item-title {
    font-weight: 600;
    font-size: 12px !important;
    color: #7782aa;
  }
}

.m-refer-friend-text-position {
  position: absolute;
  right: 17px;
  top: 16px;
  background: #211f31;
  border-radius: 20px;
  padding: 2px 6px;
  font-weight: 500;
  font-size: 10px;
  color: #ffffff !important;
}

.m-app-text-position {
  position: absolute;
  right: 13px;
  top: 17px;
  background: #211f31;
  border-radius: 20px;
  padding: 2px 17px;
  font-weight: 500;
  font-size: 10px;
  color: #ffffff !important;
}

.deposit-progress-bg {
  .v-progress-linear {
    background: #1c1929 !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 20px !important;
  }
}

.mobile-nav {
  overflow-y: auto !important;
  .v-list-item__overlay {
    opacity: 0 !important;
  }
}

.m-user-item1 {
  padding-top: 9px !important;
  padding-bottom: 9px !important;
  border-radius: 12px !important;

  .v-list-item-title {
    font-weight: 600;
    font-size: 12px !important;
  }
}
</style>
