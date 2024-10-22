<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { vipStore } from "@/store/vip";
import { userStore } from "@/store/user";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { loginBonusStore } from "@/store/loginBonus";
import { appBarStore } from "@/store/appBar";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import { Pagination } from "swiper/modules";
import MConfirm from "@/components/global/confirm/mobile/index.vue";
import GiftIcon from "@/components/global/notification/GiftIcon.vue";
import ReceiveValidationBox from "@/components/cash/mxn/deposit/ReceiveValidationBox.vue";
import ruleDialog from './ruleDialog.vue'
import AdjustClass from "@/utils/adjust";
import EventToken from "@/constants/EventToken";
import { useToast } from "vue-toastification";
import { toFormatNum } from "@/utils/numFormat";
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const props = defineProps({
  modelValue: {
    type: Boolean
  }
});
const emit = defineEmits(["update:modelValue", "closeLoginBonusDialog"]);

const { t } = useI18n();
const { name, width } = useDisplay();
const { setAuthModalType } = authStore();
const { setAuthDialogVisible } = authStore();
const { setOverlayScrimShow } = appBarStore();
const { setGetBonusDialogVisible } = loginBonusStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setNavBarToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { dispatchVipSignInReward } = vipStore();
const { dispatchVipSignIn } = vipStore();
const { dispatchVipSigninawardReceive } = vipStore();
const { dispatchUserBalance } = userStore();
const { setDepositWithdrawToggle } = appBarStore();
const { setUserNavBarToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();

const vipGrade = ref("VIP1");
const isShowReceiveValidation = ref(false);
const loginBonusItem = ref({
  award: [8, 10, 12, 14, 16, 18, 20, 22], // reward list
  signin_day: 0, // The number of days that have been signed in
  is_signin: true // You can sign in today
});
const swiper = ref<any>(null);
const confirmDialog = ref<boolean>(false);
const selectedDay = ref<number>(0);
const selectedAward = ref<number>(0);
const ruleDialogVisible=ref(false)

// 保存定时器
const isShowReceiveTimeout = ref<null | ReturnType<typeof setTimeout>>(null);

const modules = [Pagination];

const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});

const mobileWidth = computed(() => {
  return width.value;
});

const vipLevels = computed(() => {
  const { getVipLevels } = storeToRefs(vipStore());
  return getVipLevels.value;
});

const getBonusDialogVisible = computed(() => {
  const { getDepositAndBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getDepositAndBonusDialogVisible.value;
});

const userBalance = computed(() => {
  const { getUserBalance } = storeToRefs(userStore());
  return getUserBalance.value;
});

// get Token
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const vipSignIn = computed(() => {
  const { getVipSignIn } = storeToRefs(vipStore());
  return getVipSignIn.value;
});

const success = computed(() => {
  const { getSuccess } = storeToRefs(vipStore());
  return getSuccess.value;
});

const userInfo = computed(() => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
});

const goToPrev = () => {
  swiper.value.slidePrev();
};

const goToNext = () => {
  swiper.value.slideNext();
};

const getSwiperRef = (swiperInstance: any) => {
  swiper.value = swiperInstance;
};

// Match VIP level name  匹配vip等级名称
const vipLevelText = (value: number) => {
  for (let i in vipLevels.value) {
    if (vipLevels.value[i].level === value) {
      // 英文西班牙
      if (localStorage.getItem("lang") === "en") {
        return vipLevels.value[i].rank_name;
      } else {
        let levelText = "Hierro negro";
        switch (vipLevels.value[i].rank_name) {
          case "Iron":
            levelText = " Hierro negro";
            break;
          case "Bronze":
            levelText = "Bronce";
            break;
          case "Silver":
            levelText = "Plata";
            break;
          case "Gold":
            levelText = "Oro";
            break;
          case "Platinum":
            levelText = "Platino";
            break;
          case "Diamond":
            levelText = "Diamante";
            break;
          case "Yellow Diamond":
            levelText = "Diamante amarillo";
            break;
          case "Blue Diamond":
            levelText = "Diamante azul";
            break;
          default:
            break;
        }
        return levelText;
      }
    }
  }
};

const signLoading = ref(false)
const handleLoginBonus = async (day: number, moeny: any) => {
  console.log(vipSignIn.value, "vipSignIn.value");

  if (token.value == undefined) {
    setAuthModalType("login");
    setAuthDialogVisible(true);
    setOverlayScrimShow(false);
    emit("closeLoginBonusDialog");
    return;
  }
  if (Number(userBalance.value.amount) <= 0) {
    setLoginBonusDialogVisible(false);
    setGetBonusDialogVisible(true);
    setOverlayScrimShow(true);
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    return;
  }
  if (vipSignIn.value.signin_day === day && vipSignIn.value.is_signin === 1) {

    // 防止二次点击
    if(signLoading.value) return;

    signLoading.value = true;
    await dispatchVipSigninawardReceive();
    const toast = useToast();
    toast.success(
      `Congratulations on your prize:${platformCurrency.value}${Number(moeny)}`,
      {
        timeout: 3000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: GiftIcon,
        rtl: false
      }
    );
    // 给已经领取的账号打上标识
    showGuide.value = "1";
    signLoading.value = false;
  } else if (
    vipSignIn.value.signin_day !== day ||
    vipSignIn.value.is_signin === 2
  ) {
    //点击的不是当天可领取的弹窗警告
    isShowReceiveValidation.value = true;
    // 摧毁定时器，防止多次创建
    if (isShowReceiveTimeout.value) {
      clearTimeout(isShowReceiveTimeout.value);
    }
    isShowReceiveTimeout.value = setTimeout(() => {
      isShowReceiveValidation.value = false;
    }, 5000);
  }
  // if (
  //   Number(vipSignIn.value.signin_day) == day &&
  //   Number(vipSignIn.value.vip_level) == Number(level)
  // ) {
  //   confirmDialog.value = true;
  //   selectedDay.value = day;
  //   selectedAward.value = award;
  // }
  // if (day == loginBonusItem.value.signin_day + 1) {
  //   loginBonusItem.value.signin_day = day;
  // }
};

// 打开规则弹窗
const showRuleDialog=()=>{
  ruleDialogVisible.value=true
}

const showGuide = computed({
  get: () => {
    if (userInfo.value) {
      return localStorage.getItem(userInfo.value.name);
    } else {
      return "1";
    }
  },
  set: val => val
});

const submitConfirm = async () => {
  await dispatchVipSignInReward();
  if (success.value) {
    localStorage.setItem("signin_day", (selectedDay.value + 1).toString());
  }
};

//打开充值页面
const handleOpenRecharge=()=>{
   emit('closeLoginBonusDialog')
   setDepositWithdrawToggle(true);
  setNavBarToggle(false);
  setUserNavBarToggle(false);
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
}

onMounted(async () => {
  AdjustClass.getInstance().adjustTrackEvent({
    key: "PAGE_VIEW",
    value: "login_bonus",
    params: ""
  });
  if (localStorage.getItem("signin_day") == undefined) {
    localStorage.setItem("signin_day", "0");
  } else {
    loginBonusItem.value.signin_day = Number(
      localStorage.getItem("signin_day")
    );
  }
  await dispatchVipSignIn();
  await dispatchUserBalance();
});
</script>

<template>
<!--    @click:outside="emit('closeLoginBonusDialog')" -->
  <v-dialog
    v-model="modelValueNew"
    :width="mobileWidth < 600 ? '340' : '471'"
    :class="mobileWidth < 600 ? 'm-login-bonus-dialog' : ''"
    :scrim="true"
    persistent
    style="z-index: 1000000;top: 60px"
  >
    <div class="m-login-bonus-dialog-container" :class="confirmDialog ? 'blur-effect' : ''">
      <img src="@/assets/public/image/bg_public_03_01.png" class="m-header-bar-img-position" />
      <v-btn
        class="m-close-login-bonus-button"
        icon="true"
        @click="emit('closeLoginBonusDialog')"
        height="32"
        width="32"
      >
        <img src="@/assets/public/svg/icon_public_52.svg" width="20" />
      </v-btn>
      <img src="@/assets/vip/image/img_agent_02.png" class="m-login-bonus-agent-img" />
      <div class="m-login-bonus-body">
        <ReceiveValidationBox v-if="isShowReceiveValidation" />
        <!-- <Swiper :modules="modules" :slidesPerView="1" :loop="true" @swiper="getSwiperRef">
        <SwiperSlide
          v-for="(item, index) in vipLevels"
          :key="index"
          :virtualIndex="index"
        >-->

        <div class="mt-2 text-center">
          <Font class="color-F9BC01 text-900-16">{{ 'VIP-'+vipLevelText(vipSignIn.vip_level)+" " }}</Font>
          <Font class="text-900-16 white">{{ t("vip.login_bonus.title_text") }}</Font>
        </div>
        <v-row class="mt-2 mx-2">
          <v-col cols="4" class="pa-0 d-flex relative justify-center">
            <div class="m-login-bonus-card-checkout-bg relative" v-if="vipSignIn.signin_day > 0">
              <p
                class="text-900-14 gray m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_1_text") }}</p>
              <img
                src="@/assets/public/svg/icon_public_18.svg"
                class="m-login-bonus-card-cash-position"
                width="32"
              />
              <p
                class="text-900-14 gray m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[0]==0?1:vipSignIn.award[0] }}</p>
            </div>
            <div
              class="m-login-bonus-card-bg-2 relative"
              :class="vipSignIn.signin_day === 0&&vipSignIn.is_signin!==2? 'select_bg' : ''"
              v-ripple.center
              v-else
              @click="handleLoginBonus(0, vipSignIn.award[0])"
            >
              <img
                src="@/assets/vip/image/img_vip_32.png"
                class="m-login-bonus-sunshine-img"
                v-if="vipSignIn.is_signin === 1 && vipSignIn.signin_day === 0"
              />
              <p
                class="text-900-12 white m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_1_text") }}</p>
              <img
                src="@/assets/vip/image/img_vip_21.png"
                class="m-login-bonus-card-cash-position"
                width="29"
              />
              <p
                class="text-900-12 white m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[0]==0?1:vipSignIn.award[0] }}</p>
            </div>
            <img
              class="absolute m-login-bonus-card-select"
              src="@/assets/vip/svg/img_vip_select.svg"
              v-if="
               vipSignIn.is_signin === 1 &&
               vipSignIn.signin_day === 0 &&
               showGuide === '0'
               "
              @click="handleLoginBonus(0, vipSignIn.award[0])"
            />
            <img
              class="absolute m-login-bonus-card-finger"
              src="@/assets/vip/svg/img_vip_finger.svg"
              v-if="
               vipSignIn.is_signin === 1 &&
               vipSignIn.signin_day === 0 &&
               showGuide === '0'
              "
              @click="handleLoginBonus(0, vipSignIn.award[0])"
            />
          </v-col>
          <v-col cols="4" class="pa-0 d-flex justify-center">
            <div class="m-login-bonus-card-checkout-bg relative" v-if="vipSignIn.signin_day > 1">
              <p
                class="text-900-14 gray m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_2_text") }}</p>
              <img
                src="@/assets/public/svg/icon_public_18.svg"
                class="m-login-bonus-card-cash-position"
                width="32"
              />
              <p
                class="text-900-14 gray m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[1]==0?2:vipSignIn.award[1] }}</p>
            </div>
            <div
              class="m-login-bonus-card-bg-2 relative"
              :class="vipSignIn.signin_day === 1&&vipSignIn.is_signin!==2 ? 'select_bg' : ''"
              v-ripple.center
              @click="handleLoginBonus(1, vipSignIn.award[1])"
              v-else
            >
              <img
                src="@/assets/vip/image/img_vip_32.png"
                class="m-login-bonus-sunshine-img"
                v-if="vipSignIn.is_signin === 1 && vipSignIn.signin_day === 1"
              />
              <p
                class="text-900-12 white m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_2_text") }}</p>
              <img
                src="@/assets/vip/image/img_vip_22.png"
                class="m-login-bonus-card-cash-position"
                width="40"
              />
              <p
                class="text-900-12 white m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[1]==0?2:vipSignIn.award[1] }}</p>
            </div>
          </v-col>
          <v-col cols="4" class="pa-0 d-flex justify-center">
            <div class="m-login-bonus-card-checkout-bg relative" v-if="vipSignIn.signin_day > 2">
              <p
                class="text-900-14 gray m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_3_text") }}</p>
              <img
                src="@/assets/public/svg/icon_public_18.svg"
                class="m-login-bonus-card-cash-position"
                width="32"
              />
              <p
                class="text-900-14 gray m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[2]==0?1:vipSignIn.award[2] }}</p>
            </div>
            <div
              class="m-login-bonus-card-bg-3 relative"
              :class="vipSignIn.signin_day === 2&&vipSignIn.is_signin!==2 ? 'select_bg' : ''"
              v-ripple.center
              @click="handleLoginBonus(2, vipSignIn.award[2])"
              v-else
            >
              <img
                src="@/assets/vip/image/img_vip_32.png"
                class="m-login-bonus-sunshine-img"
                v-if="vipSignIn.is_signin === 1 && vipSignIn.signin_day === 2"
              />
              <p
                class="text-900-12 white m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_3_text") }}</p>
              <img
                src="@/assets/vip/image/img_vip_23.png"
                class="m-login-bonus-card-cash-position"
                width="50"
              />
              <p
                class="text-900-12 white m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[2]==0?1:vipSignIn.award[2] }}</p>
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-5 mx-2">
          <v-col cols="4" class="pa-0 d-flex justify-center">
            <div class="m-login-bonus-card-checkout-bg relative" v-if="vipSignIn.signin_day > 3">
              <p
                class="text-900-14 gray m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_4_text") }}</p>
              <img
                src="@/assets/public/svg/icon_public_18.svg"
                class="m-login-bonus-card-cash-position"
                width="32"
              />
              <p
                class="text-900-14 gray login-bonus-card-money-position"
              >{{ platformCurrency }}{{  vipSignIn.award[3]==0?2:vipSignIn.award[3] }}</p>
            </div>
            <div
              class="m-login-bonus-card-bg-4 relative"
              :class="vipSignIn.signin_day === 3&&vipSignIn.is_signin!==2 ? 'select_bg' : ''"
              v-ripple.center
              @click="handleLoginBonus(3, vipSignIn.award[3])"
              v-else
            >
              <img
                src="@/assets/vip/image/img_vip_32.png"
                class="m-login-bonus-sunshine-img"
                v-if="vipSignIn.is_signin === 1 && vipSignIn.signin_day === 3"
              />
              <p
                class="text-900-12 white m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_4_text") }}</p>
              <img
                src="@/assets/vip/image/img_vip_24.png"
                class="m-login-bonus-card-cash-position"
                width="48"
              />
              <p
                class="text-900-12 white m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[3]==0?2:vipSignIn.award[3] }}</p>
            </div>
          </v-col>
          <v-col cols="4" class="pa-0 d-flex justify-center">
            <div class="m-login-bonus-card-checkout-bg relative" v-if="vipSignIn.signin_day > 4">
              <p
                class="text-900-14 gray m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_5_text") }}</p>
              <img
                src="@/assets/public/svg/icon_public_18.svg"
                class="login-bonus-card-cash-position"
                width="32"
              />
              <p
                class="text-900-14 gray m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[4]==0?1:vipSignIn.award[4] }}</p>
            </div>
            <div
              class="m-login-bonus-card-bg-4 relative"
              :class="vipSignIn.signin_day === 4&&vipSignIn.is_signin!==2 ? 'select_bg' : ''"
              v-ripple.center
              @click="handleLoginBonus(4, vipSignIn.award[4] )"
              v-else
            >
              <img
                src="@/assets/vip/image/img_vip_32.png"
                class="m-login-bonus-sunshine-img"
                v-if="vipSignIn.is_signin === 1 && vipSignIn.signin_day === 4"
              />
              <p
                class="text-900-12 white m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_5_text") }}</p>
              <img
                src="@/assets/vip/image/img_vip_25.png"
                class="m-login-bonus-card-cash-position"
                width="45"
              />
              <p
                class="text-900-12 white m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[4]==0?1:vipSignIn.award[4] }}</p>
            </div>
          </v-col>
          <v-col cols="4" class="pa-0 d-flex justify-center">
            <div class="m-login-bonus-card-checkout-bg relative" v-if="vipSignIn.signin_day > 5">
              <p
                class="text-900-14 gray m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_6_text") }}</p>
              <img
                src="@/assets/public/svg/icon_public_18.svg"
                class="m-login-bonus-card-cash-position"
                width="32"
              />
              <p
                class="text-900-14 gray m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[5]==0?2:vipSignIn.award[5] }}</p>
            </div>
            <div
              class="m-login-bonus-card-bg-4 relative"
              :class="vipSignIn.signin_day === 5&&vipSignIn.is_signin!==2 ? 'select_bg' : ''"
              v-ripple.center
              @click="handleLoginBonus(5, vipSignIn.award[5])"
              v-else
            >
              <img
                src="@/assets/vip/image/img_vip_32.png"
                class="m-login-bonus-sunshine-img"
                v-if="vipSignIn.is_signin === 1 && vipSignIn.signin_day === 5"
              />
              <p
                class="text-900-12 white m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_6_text") }}</p>
              <img
                src="@/assets/vip/image/img_vip_26.png"
                class="m-login-bonus-card-cash-position"
                width="50"
              />
              <p
                class="text-900-12 white m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[5]==0?2:vipSignIn.award[5] }}</p>
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-5 mx-2 mb-1">
          <v-col cols="4" class="pa-0 d-flex justify-center">
            <div class="m-login-bonus-card-checkout-bg relative" v-if="vipSignIn.signin_day > 6">
              <p
                class="text-900-14 gray m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_7_text") }}</p>
              <img
                src="@/assets/public/svg/icon_public_18.svg"
                class="m-login-bonus-card-cash-position"
                width="32"
              />
              <p
                class="text-900-14 gray m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[6]==0?1:vipSignIn.award[6] }}</p>
            </div>
            <div
              class="m-login-bonus-card-bg-4 relative"
              :class="vipSignIn.signin_day === 6&&vipSignIn.is_signin!==2 ? 'select_bg' : ''"
              v-ripple.center
              @click="handleLoginBonus(6, vipSignIn.award[6])"
              v-else
            >
              <img
                src="@/assets/vip/image/img_vip_32.png"
                class="m-login-bonus-sunshine-img"
                v-if="vipSignIn.is_signin === 1 && vipSignIn.signin_day === 6"
              />
              <p
                class="text-900-12 white m-login-bonus-text-position"
              >{{ t("vip.login_bonus.day_7_text") }}</p>
              <img
                src="@/assets/vip/image/img_vip_26.png"
                class="m-login-bonus-card-cash-position"
                width="50"
              />
              <p
                class="text-900-12 white m-login-bonus-card-money-position"
              >{{ platformCurrency }}{{ vipSignIn.award[6]==0?1:vipSignIn.award[6] }}</p>
            </div>
          </v-col>
          <v-col cols="8" class="pa-0 d-flex justify-center">
            <div
              class="m-login-bonus-card-checkout-bg-1 relative"
              v-if="vipSignIn.signin_day > 7 && vipSignIn.is_signin === 2"
            >
              <p
                class="text-900-14 gray m-login-bonus-text-position-1"
              >{{ t("vip.login_bonus.day_8_text") }}</p>
              <p
                class="text-900-14 gray mt-2 m-login-bonus-card-money-position-1"
              >{{ platformCurrency }}{{ vipSignIn.award[7]==0?2:vipSignIn.award[7] }}</p>
              <img
                src="@/assets/public/svg/icon_public_18.svg"
                class="m-login-bonus-card-cash-position"
                width="32"
              />
            </div>
            <div
              class="m-login-bonus-card-bg-5 relative"
              :class="vipSignIn.signin_day >= 7&&vipSignIn.is_signin!==2 ? 'select_bg' : ''"
              v-ripple.center
              @click="
              handleLoginBonus(
                vipSignIn.signin_day > 7 ? vipSignIn.signin_day : 7,
                vipSignIn.award[7]
              )
            "
              v-else
            >
              <img
                src="@/assets/vip/image/img_vip_32.png"
                class="m-login-bonus-sunshine-img"
                v-if="vipSignIn.is_signin === 1 && vipSignIn.signin_day >= 7"
              />
              <p
                class="text-900-12 white m-login-bonus-text-position-1"
              >{{ t("vip.login_bonus.day_8_text") }}</p>
              <p
                class="text-900-12 white mt-2 m-login-bonus-card-money-position-1"
              >{{ platformCurrency }}{{ vipSignIn.award[7]==0?2:vipSignIn.award[7] }}</p>
              <img
                src="@/assets/vip/image/img_vip_27.png"
                width="113"
                height="61"
                class="m-login-bonus-card-cash-position-1"
              />
            </div>
          </v-col>
        </v-row>
        <!-- </SwiperSlide>
        </Swiper>-->
      </div>
      <font
        v-if="
        Number(vipSignIn.limited_bet) == 0 &&
        Number(vipSignIn.limited_deposit) == 0
      "
        class="text-900-10 m-login-bonus-bottom-text"
        @click="handleOpenRecharge"
      >{{ t("vip.login_bonus.footer_text_8") }}</font>
      <v-row class="m-login-bonus-footer mx-0 align-center">
        <v-col cols="2" class="pa-0 ma-0">
          <!-- <v-btn
          class="m-left-login-bonus-button"
          icon="true"
          height="32"
          width="32"
          @click="goToPrev"
        >
          <v-icon color="#FFFFFF">mdi-chevron-left</v-icon>
          </v-btn>-->
        </v-col>
        <v-col cols="8" class="pa-0 ma-0">
          <template
            v-if="
            Number(vipSignIn.limited_bet) == 0 &&
            Number(vipSignIn.limited_deposit) != 0
          "
          >
            <p class="text-center" style="line-height: normal">
              <font class="text-900-10 white">
                If you recharge
                <font
                  class="text-900-10 purple"
                >{{ platformCurrency }} {{ toFormatNum(vipSignIn.limited_deposit) }}</font>
                today,
              </font>
            </p>
          </template>
          <template
            v-if="
            Number(vipSignIn.limited_bet) != 0 &&
            Number(vipSignIn.limited_deposit) == 0
          "
          >
            <p class="text-center" style="line-height: normal">
              <font class="text-900-10 white">
                If you bet
                <font
                  class="text-900-10 purple"
                >{{ platformCurrency }} {{ toFormatNum(vipSignIn.limited_bet) }}</font>
                today,
              </font>
            </p>
          </template>
          <template
            v-if="
            Number(vipSignIn.limited_bet) != 0 &&
            Number(vipSignIn.limited_deposit) != 0
          "
          >
            <p class="text-center" style="line-height: normal">
              <font class="text-900-10 white">
                If you recharge
                <font
                  class="text-900-10 purple"
                >{{ platformCurrency }} {{ toFormatNum(vipSignIn.limited_deposit) }}</font>
                &nbsp;and&nbsp;
              </font>
              <font class="text-900-10 white">
                bet
                <font
                  class="text-900-10 purple"
                >{{ platformCurrency }} {{ toFormatNum(vipSignIn.limited_bet) }}</font>
                today,
              </font>
            </p>
          </template>
          <!-- <p class="text-center" style="line-height: normal">
          <font class="text-900-10 white">{{ t("vip.login_bonus.footer_text_1") }}</font>
          <font class="text-900-10 purple">{{ platformCurrency }}20 </font>
          <font class="text-900-10 white">{{ t("vip.login_bonus.footer_text_2") }}</font>
          <font class="text-900-10 purple">{{ t("vip.login_bonus.footer_text_3") }}</font>
          </p>-->
          <p
            class="text-center"
            style="line-height: normal"
            v-if="
            Number(vipSignIn.limited_bet) != 0 ||
            Number(vipSignIn.limited_deposit) != 0
          "
          >
            <font class="text-900-10 white">
              {{
              t("vip.login_bonus.footer_text_4")
              }}
            </font>
          </p>
        </v-col>
        <div class="reward-btn-box">
          <v-btn class="mr-3 text-none button-bright reward-btn" height="36" @click="showRuleDialog">Reward Guide</v-btn>
        </div>
        
        <v-col cols="2" class="pa-0 ma-0 text-right">
          <!-- <v-btn
          class="m-left-login-bonus-button"
          icon="true"
          height="32"
          width="32"
          @click="goToNext"
        >
          <v-icon color="#FFFFFF">mdi-chevron-right</v-icon>
          </v-btn>-->
        </v-col>
      </v-row>
      <v-dialog v-model="confirmDialog" width="280">
        <MConfirm @submitConfirm="submitConfirm" :selectedAward="selectedAward" />
      </v-dialog>
      <ruleDialog v-if="ruleDialogVisible" v-model="ruleDialogVisible"></ruleDialog>
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
.blur-effect {
  filter: blur(3px);
  -webkit-filter: blur(3px);
}
.m-login-bonus-footer {
  position: absolute;
  bottom: 24px;
  width: 300px;
  left: 50%;
  transform: translateX(-50%);
}

.m-login-bonus-dialog-container {
  width: 340px;
  height: 495px;
  border-radius: 16px;
  background: #1d2027;
  position: relative;
}

.m-header-bar-img-position {
  position: absolute;
  top: -28px;
  right: 26px;
}

.m-close-login-bonus-button {
  position: absolute;
  top: -56px;
  right: 12px;
  background: #1d2027;
  z-index: 1000;
}

.m-login-bonus-agent-img {
  position: absolute;
  top: -95px;
  left: 15px;
  width: 281px;
  height: 186px;
}

.m-login-bonus-body {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  // height: 370px;
  padding: 10px 0;
  border-radius: 14px;
  background: #15161c;
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  z-index: 20;
}

.m-login-bonus-bottom-text {
  width: 250px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 57px;
  color: #7782aa;
}

.m-login-bonus-card-checkout-bg {
  width: 94px;
  height: 90px;
  border-radius: 6px;
  background: #29263c;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}

.m-login-bonus-card-checkout-bg-1 {
  width: 195px;
  height: 90px;
  border-radius: 6px;
  background: #29263c;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}

.m-login-bonus-card-bg-1 {
  width: 94px;
  height: 90px;
  border-radius: 6px;
  background: linear-gradient(180deg, #c6428b 0%, #f08734 100%);
  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  cursor: pointer;
  overflow: hidden;
}

.select_bg {
  background: #f9bc01 !important;
}

.m-login-bonus-card-bg-2 {
  width: 94px;
  height: 90px;
  border-radius: 6px;
  background: #1682f1;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  cursor: pointer;
  overflow: hidden;
}

.m-login-bonus-card-select {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left:50%;
  z-index: 9999;
  transform: translate(-50%,-50%);
}

.m-login-bonus-card-finger {
  width: 58px;
  height: 58px;
  position: absolute;
  top: 50%;
  left:50%;
  z-index: 9999;
  transform: translate(-50%,-50%);
  animation: moveRight 1s linear infinite;
  // animation-iteration-count: 1;
}

@keyframes moveRight {
  0% {
    transform: translateY(45px);
  }

  100% {
    transform: translateY(-10px);
  }
}

.m-login-bonus-card-bg-3 {
  width: 94px;
  height: 90px;
  border-radius: 6px;
  background: #1682f1;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  cursor: pointer;
  overflow: hidden;
}

.m-login-bonus-card-bg-4 {
  width: 94px;
  height: 90px;
  border-radius: 6px;
  background: #1682f1;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  cursor: pointer;
  overflow: hidden;
}

.m-login-bonus-sunshine-img {
  width: 350px;
  height: 350px;
  border-radius: 6px;
  animation: rotate 5s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(45deg);
  object-fit: cover;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.m-login-bonus-card-bg-5 {
  width: 195px;
  height: 90px;
  border-radius: 6px;
  background: #009b3a;
  cursor: pointer;
  overflow: hidden;
}

.m-login-bonus-text-position {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  text-align: center;
}

.m-login-bonus-text-position-1 {
  position: absolute;
  top: 26px;
  left: 20px;
}

.m-login-bonus-card-cash-position {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.m-login-bonus-card-cash-position-1 {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.m-login-bonus-card-money-position {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
}

.m-login-bonus-card-money-position-1 {
  position: absolute;
  top: 40px;
  left: 20px;
}

.m-left-login-bonus-button {
  background: #23262f;
  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12);

  .v-btn__content {
    font-size: 16px;
  }
}
:deep.Vue-Toastification__toast {
  z-index: 3147483647 !important;
}
.reward-btn-box {
  width: 100%;
  display: flex;
  justify-content: center;
 
}
:deep button .v-btn__content {
    font-size: 14px;
  }
</style>
