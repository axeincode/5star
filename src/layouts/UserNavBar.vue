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
import * as clipboard from "clipboard-polyfill";
import img_vipemblem_2 from "@/assets/vip/image/img_vipemblem_2.png";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";
import { menuStore } from "@/store/menu";

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
const { setVipNavBarToggle } = vipStore();
const { setNavBarToggle } = appBarStore();
const { dispatchVipLevelAward } = vipStore();
const { setRewardNavShow } = menuStore();

// mobile version name
const { name, width } = useDisplay()
const { t } = useI18n();
const router = useRouter();

const drawer = ref<boolean>(false);

const depositRate = ref<number>(0);

const wagerRate = ref<number>(0);

const accountPageShow = ref<boolean>(false);

const referPageShow = ref<boolean>(false);
const navScroll = ref<HTMLElement | undefined>(undefined);

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
  wallet: 0,
  currency: "R$",
});

const selectedVipLevel = ref<any>({
  level: 0,
  protection_conditions: 0,
  deposit_exp: 0,
  bet_exp: 0,
  free_spins_times: 0,
  uprank_award: 0,
  week_award: 0,
  month_award: 0,
  free_withdrawals: 0,
  free_withdrawals_times: 0,
  withdrawal_fee: 0,
  bet_award_rate: {
    casino: 0,
  },
  signin_award: [],
  tasks_max: 0,
  deposit_rate: 0,
  bet_rate: 0,
  availabe_daily_bonus_time: "",
  collectable_week_bonus_day: "",
  collectable_month_bonus_day: "",
  value: {
    level: 0,
    rank_id: 0,
    protection_conditions: 0,
    deposit_exp: 0,
    bet_exp: 0,
    free_spins_times: 0,
    uprank_award: 0,
    week_award: 0,
    withdrawals_amonut: 0,
    withdrawal_times: 0,
    month_withdrawals_amount: 0,
    month_withdrawals_times: 0,
    month_award: 0,
    free_withdrawals: 0,
    free_withdrawals_times: 0,
    withdrawal_fee: 0,
    bet_award_rate: undefined,
    signin_award: [],
    tasks_max: 0,
    deposit_rate: 0,
    bet_rate: 0,
    availabe_daily_bonus_time: "",
    collectable_week_bonus_day: "",
    collectable_month_bonus_day: ""
  },
  rank_id: 0,
  withdrawals_amonut: 0,
  withdrawal_times: 0,
  month_withdrawals_amount: 0,
  month_withdrawals_times: 0
});

const vipLevelImgs = ref<Array<any>>([
  {
    image: img_vipemblem_2,
    content: t('vip.vip_level_content.text_1')
  },
  {
    image: img_vipemblem_1_24,
    content: t('vip.vip_level_content.text_2')
  },
  {
    image: img_vipemblem_25_49,
    content: t('vip.vip_level_content.text_3')
  },
  {
    image: img_vipemblem_50_74,
    content: t('vip.vip_level_content.text_4')
  },
  {
    image: img_vipemblem_75_99,
    content: t('vip.vip_level_content.text_5')
  },
  {
    image: img_vipemblem_100_149,
    content: t('vip.vip_level_content.text_6')
  },
  {
    image: img_vipemblem_159_199,
    content: t('vip.vip_level_content.text_7')
  },
  {
    image: img_vipemblem_200,
    content: t('vip.vip_level_content.text_8')
  },
]);

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

const goReward = () => {
  setRewardNavShow(true);
  setMainBlurEffectShow(drawer.value);
  setOverlayScrimShow(drawer.value);
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
  // router.push({ name: "VIP" })
  setVipNavBarToggle('1');
  setNavBarToggle(false);
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
}

watch(userNavBarToggle, (newValue) => {
  drawer.value = newValue;
})

watch(drawer, (newValue: boolean) => {
  if (navScroll.value) {
    navScroll.value.scrollTop = 0;
  }
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

const handleNotifyShow = (id: number | string) => {
  clipboard.writeText(id.toString()).then(
    () => {
      console.log('Copied to clipboard!');
      const toast = useToast();
      toast.success(notificationText.value, {
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
    },
    (error) => {
      console.error('Could not copy text: ', error);
    }
  );
}

// Recharge progress bar  充值进度条
const depositRateVal = computed(() => {
  if ((vipInfo.value.deposit_exp / vipInfo.value.rank_deposit_exp * 100) >= 100) {
    return 100;
  } else {
    return vipInfo.value.deposit_exp / vipInfo.value.rank_deposit_exp * 100
  }
})

// Betting progress bar  投注进度条
const betRateVal = computed(() => {
  if ((vipInfo.value.bet_exp / vipInfo.value.rank_bet_exp * 100) >= 100) {
    return 100;
  } else {
    return vipInfo.value.bet_exp / vipInfo.value.rank_bet_exp * 100
  }
})

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

const handleScroll = () => {
  console.log("ok");
}

onMounted(async () => {
  await dispatchVipInfo();
  await dispatchVipLevels();
  await dispatchVipLevelAward();
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
    :on-scroll="handleScroll"
  >
    <template v-slot:prepend>
      <div :class="refferalAppBarShow ? 'user-navbar-position' : ''"></div>
    </template>
    <div ref="navScroll" class="v-navigation-drawer__content" @scroll="handleScroll">
      <v-list class="mobile-nav" density="compact" nav>
        <v-list-item class="m-user-item">
          <template v-slot:prepend>
            <img src="@/assets/public/svg/icon_public_58.svg" width="18" />
          </template>
          <v-list-item-title class="ml-2 text-600-10">
            {{ t("appBar.id") }}: {{ userInfo.id }}
          </v-list-item-title>
          <template v-slot:append>
            <div
              style="width: 22px; height: 22px; border-radius: 4px; background: #23262f"
              class="relative"
              @click="handleNotifyShow(userInfo.id)"
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
                <img
                  :src="vipLevelImgs[0].image"
                  width="20"
                  height="24"
                  v-if="vipInfo.level == 0"
                />
                <img
                  :src="vipLevelImgs[1].image"
                  width="20"
                  height="24"
                  v-if="vipInfo.level >= 1 && vipInfo.level < 25"
                />
                <img
                  :src="vipLevelImgs[2].image"
                  width="20"
                  height="24"
                  v-if="vipInfo.level >= 25 && vipInfo.level < 50"
                />
                <img
                  :src="vipLevelImgs[3].image"
                  width="20"
                  height="24"
                  v-if="vipInfo.level >= 50 && vipInfo.level < 75"
                />
                <img
                  :src="vipLevelImgs[4].image"
                  width="20"
                  height="24"
                  v-if="vipInfo.level >= 75 && vipInfo.level < 100"
                />
                <img
                  :src="vipLevelImgs[5].image"
                  width="20"
                  height="24"
                  v-if="vipInfo.level >= 100 && vipInfo.level < 149"
                />
                <img
                  :src="vipLevelImgs[6].image"
                  width="20"
                  height="24"
                  v-if="vipInfo.level >= 150 && vipInfo.level < 200"
                />
                <img
                  :src="vipLevelImgs[7].image"
                  width="20"
                  height="24"
                  v-if="vipInfo.level >= 200"
                />
              </div>
              <div class="text-800-10 color-F9BC01 text-center" v-if="vipInfo.level == 0">
                {{ vipLevelImgs[0].content }}
              </div>
              <div
                class="text-800-10 color-F9BC01 text-center"
                v-if="vipInfo.level >= 1 && vipInfo.level < 25"
              >
                {{ vipLevelImgs[1].content }}
              </div>
              <div
                class="text-800-10 color-F9BC01 text-center"
                v-if="vipInfo.level >= 25 && vipInfo.level < 50"
              >
                {{ vipLevelImgs[2].content }}
              </div>
              <div
                class="text-800-10 color-F9BC01 text-center"
                v-if="vipInfo.level >= 50 && vipInfo.level < 75"
              >
                {{ vipLevelImgs[3].content }}
              </div>
              <div
                class="text-800-10 color-F9BC01 text-center"
                v-if="vipInfo.level >= 75 && vipInfo.level < 100"
              >
                {{ vipLevelImgs[4].content }}
              </div>
              <div
                class="text-800-10 color-F9BC01 text-center"
                v-if="vipInfo.level >= 100 && vipInfo.level < 150"
              >
                {{ vipLevelImgs[5].content }}
              </div>
              <div
                class="text-800-10 color-F9BC01 text-center"
                v-if="vipInfo.level >= 150 && vipInfo.level < 200"
              >
                {{ vipLevelImgs[6].content }}
              </div>
              <div
                class="text-800-10 color-F9BC01 text-center"
                v-if="vipInfo.level >= 200"
              >
                {{ vipLevelImgs[7].content }}
              </div>
              <div class="text-400-8 white text-center">Level {{ vipInfo.level }}</div>
            </div>
          </template>
          <v-list-item-title class="ml-2">
            <div class="deposit-progress-bg mb-1">
              <div class="d-flex mx-1">
                <div class="white text-500-8">{{ t("appBar.deposit") }}</div>
                <div class="ml-auto text-800-8">
                  <font>R$ {{ vipInfo.deposit_exp }}</font> /
                  <font color="#F9BC01">R$ {{ vipInfo.deposit_exp }}</font>
                </div>
              </div>
              <div style="margin-top: 2px">
                <v-progress-linear
                  v-model="depositRateVal"
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
                  <font>R$ {{ vipInfo.bet_exp }}</font> /
                  <font color="#623AEC">R$ {{ vipInfo.bet_exp }}</font>
                </div>
              </div>
              <div style="margin-top: 2px">
                <v-progress-linear v-model="betRateVal" height="8" class="wager-progress">
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
          <v-list-item-title class="ml-2">{{
            t("appBar.game_history")
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="m-user-item" value="transactions" @click="goTransactionPage">
          <template v-slot:prepend>
            <img src="@/assets/public/svg/icon_public_63.svg" width="18" />
          </template>
          <v-list-item-title class="ml-2">{{
            t("appBar.transactions")
          }}</v-list-item-title>
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
          <v-list-item-title class="ml-2">
            {{ t("appBar.refer_friend") }}
          </v-list-item-title>
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
        <v-list-item class="m-user-item" value="rewards" @click="goReward">
          <template v-slot:prepend>
            <img src="@/assets/public/svg/icon_public_67.svg" width="18" />
          </template>
          <v-list-item-title class="ml-2">{{ t("appBar.rewards") }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="m-user-item" value="preferences">
          <template v-slot:prepend>
            <img src="@/assets/public/svg/icon_public_68.svg" width="18" />
          </template>
          <v-list-item-title class="ml-2">{{
            t("appBar.preferences")
          }}</v-list-item-title>
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
    </div>
  </v-navigation-drawer>
  <Notification
    :notificationShow="notificationShow"
    :notificationText="notificationText"
    :checkIcon="checkIcon"
  />
</template>

<style lang="scss">
.nav-background {
  background: #1d2027 !important;
  color: #7782aa !important;
  border: 2px !important;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25) !important;
  top: 0px !important;
  height: 100% !important;
  will-change: auto !important;
}

.user-nav-background {
  background: #1d2027 !important;
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
  border-radius: 8px;
  background: var(--secondary-button-353652, #23262f);

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
  height: 100vh;
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
  border-radius: 8px !important;

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
  background: #1d2027;
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
  background: #1d2027;
  border-radius: 20px;
  padding: 2px 17px;
  font-weight: 500;
  font-size: 10px;
  color: #ffffff !important;
}

.deposit-progress-bg {
  .v-progress-linear {
    background: #15161c !important;
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
  border-radius: 8px !important;

  .v-list-item-title {
    font-weight: 600;
    font-size: 12px !important;
  }
}
</style>
