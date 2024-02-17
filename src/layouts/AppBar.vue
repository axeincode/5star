<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { setLang } from "@/locale/index";
import { authStore } from "@/store/auth";
import { userStore } from "@/store/user";
import { appBarStore } from "@/store/appBar";
import { vipStore } from "@/store/vip";
import { socketStore } from "@/store/socket";
import { refferalStore } from '@/store/refferal';
import { gameStore } from "@/store/game";
import { loginBonusStore } from "@/store/loginBonus";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { mailStore } from "@/store/mail";
import { storeToRefs } from "pinia";
import { type GetUserData } from "@/interface/appBar";
import { type GetMailData } from '@/interface/mail';
import { type GetCurrencyBalanceList } from '@/interface/currency';
import { useToast } from "vue-toastification";
import * as clipboard from "clipboard-polyfill";
import { useDisplay } from 'vuetify'
import { useRouter, useRoute } from "vue-router";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import img_vipemblem_2 from "@/assets/vip/image/img_vipemblem_2.png";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";

import { currencyStore } from "@/store/currency";
import { bonusStore } from "@/store/bonus";
import { bannerStore } from "@/store/banner";

const { setAuthModalType } = authStore();
const { setAuthDialogVisible } = authStore();
const { dispatchUserProfile } = authStore();
const { dispatchSignout } = authStore();
const { setRightBarToggle } = appBarStore();
const { setNavBarToggle } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setFixPositionEnable } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setUserNavBarToggle } = appBarStore();
const { setBonusTabIndex } = bonusTransactionStore();
const { setTransactionTab } = bonusTransactionStore();
const { setRefferalDialogShow } = refferalStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setMailMenuShow } = mailStore();
const { dispatchUserBalance, dispatchSetUserCurrency } = userStore();
const { dispatchSocketConnect } = socketStore();
const { setDepositWithdrawToggle } = appBarStore();
const { setBonusDashboardDialogVisible } = appBarStore();
const { dispatchCurrencyList } = currencyStore();
const { dispatchUserBonus } = bonusStore();

const { dispatchBannerList } = bannerStore();
const { dispatchGameEnter, getGameBetbyInit, closeKill } = gameStore();

const { name, width } = useDisplay()
const router = useRouter();
const route = useRoute();

type dialogType = "login" | "signup";
const color = ref<string>("#1D2027");
// translation
const { t } = useI18n();
const currentLanguage = ref<string>("en");
const appBarWidth = ref<string>("app-bar-pc");
const notificationText = ref<string>("");

// logged in user info
const user = ref<GetUserData>({
  id: "User6696608024",
  avatar: new URL("@/assets/public/image/ua_public_10.png", import.meta.url).href,
  name: "Little Planes",
  grade_level: "Bronze",
  grade: "VIP 4",
  wallet: "R$0",
  currency: "R$",
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

// mail count
const mailCount = ref<number>(10);
// message count
const messageCount = ref<number>(299);

const depositRate = ref<number>(56);

const wagerRate = ref<number>(56);

const currencyMenuShow = ref<boolean>(false);

const currencyMenuWidth = ref<string>("340px");

// get Token
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const userInfo = computed(() => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value
})

const vipInfo = computed(() => {
  const { getVipInfo } = storeToRefs(vipStore());
  return getVipInfo.value
})

const userBalance = computed(() => {
  const { getUserBalance } = storeToRefs(userStore());
  return getUserBalance.value
})

const socketBalance = computed(() => {
  const { getSocketBalance } = storeToRefs(socketStore());
  return getSocketBalance.value
})

const rightBarToggle = computed(() => {
  const { getRightBarToggle } = storeToRefs(appBarStore());
  return getRightBarToggle.value;
})

const navBarToggle = computed(() => {
  const { getNavBarToggle } = storeToRefs(appBarStore());
  return getNavBarToggle.value
})

const userNavToggle = computed(() => {
  const { getUserNavBarToggle } = storeToRefs(appBarStore());
  return getUserNavBarToggle.value
})

// pc or mobile screen switch

const mobileVersion = computed(() => {
  return name.value
});

const mobileWidth: any = computed(() => {
  return width.value;
})


const errMessage = computed(() => {
  const { getErrMessage } = storeToRefs(authStore());
  return getErrMessage.value
})

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
})

// get mail data
const mailList = computed((): GetMailData[] => {
  const { getMailList } = storeToRefs(mailStore())
  return getMailList.value
})

watch(rightBarToggle, (newValue) => {
  if (mobileWidth.value > 1280) {
    if (newValue) {
      appBarWidth.value = "app-bar-pc";
    } else {
      appBarWidth.value = "app-bar-pc-1";
    }
  } else {
    appBarWidth.value = "app-bar-mobile";
  }
})

watch(refferalAppBarShow, (newValue) => {
  if (mobileWidth.value > 1280) {
    if (rightBarToggle.value) {
      appBarWidth.value = refferalAppBarShow.value ? "app-bar-pc-1 app-bar-position" : "app-bar-pc-1";
    } else {
      appBarWidth.value = refferalAppBarShow.value ? "app-bar-pc app-bar-position" : "app-bar-pc";
    }
  } else {
    appBarWidth.value = refferalAppBarShow.value ? "app-bar-mobile app-bar-position" : "app-bar-mobile";
  }

}, { deep: true });

watch(mobileWidth, (newValue: number) => {
  if (newValue > 1280) {
    if (rightBarToggle.value) {
      appBarWidth.value = refferalAppBarShow.value ? "app-bar-pc-1 app-bar-position" : "app-bar-pc-1";
    } else {
      appBarWidth.value = refferalAppBarShow.value ? "app-bar-pc app-bar-position" : "app-bar-pc";
    }
  } else {
    appBarWidth.value = refferalAppBarShow.value ? "app-bar-mobile app-bar-position" : "app-bar-mobile";
  }

  if (newValue < 600) {
    currencyMenuWidth.value = (window.innerWidth - 20) + "px";
  }
})

watch(currencyMenuShow, async (value: boolean) => {
  console.log(value);
  if (mobileWidth.value < 600) {
    if (value) {
      await dispatchCurrencyList();
      setUserNavBarToggle(false);
      setMainBlurEffectShow(false);
      setNavBarToggle(false);
      setMailMenuShow(false);
      setBonusDashboardDialogVisible(false);
      setTimeout(() => {
        setFixPositionEnable(true);
        setMainBlurEffectShow(true);
      }, 10)
    } else {
      setFixPositionEnable(false);
    }
    setOverlayScrimShow(value);
    setMainBlurEffectShow(value);
    setMailMenuShow(value);
  }
})

const formatCurrency = (currency: number, locale: string, currencyUnit: string) => {
  const fomarttedAmount = currency.toLocaleString(locale, {
    style: "currency",
    currency: currencyUnit,
  })
  return fomarttedAmount
}

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === "en" ? "zh" : "en";
};

const openDialog = (type: dialogType) => {
  setAuthModalType(type);
  setAuthDialogVisible(true);
  setOverlayScrimShow(false);
};

const showSignoutDialog = () => {
  setAuthModalType("signout");
}

const depositDialogShow = async () => {
  // await dispatchUserProfile();
  // if (errMessage.value == "Credentials have expired. Please log in again") {
  //   dispatchSignout();
  //   return;
  // }
  setDepositWithdrawToggle(true);
  setNavBarToggle(false);
  setUserNavBarToggle(false);
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
}

const withdrawDialogShow = () => {
  setWithdrawDialogToggle(true);
  setCashDialogToggle(true);
}

const userNavBarToggle = ref(false);

const selectedCurrencyItem = ref<GetCurrencyBalanceList>({
  //icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
  currency: "BRL",
  amount: "0",
  availabe_balance: "",
  real: "",
  bonus: "",
})

const currencyImages: Array<any> = ([
  {
    icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
    name: "BRL",
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_85.svg", import.meta.url).href,
    name: "PHP",
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_86.svg", import.meta.url).href,
    name: "PEN",
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_87.svg", import.meta.url).href,
    name: "MXN",
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_88.svg", import.meta.url).href,
    name: "CLP",
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_89.svg", import.meta.url).href,
    name: "USD",
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_90.svg", import.meta.url).href,
    name: "COP",
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_91.svg", import.meta.url).href,
    name: "EUR",
  },
])
const imageIndex = ref<Array<number>>([]);
const currencyList = computed(() => {
  const { getCurrencyList } = storeToRefs(currencyStore());
  return getCurrencyList.value
})

watch(currencyList, (() => {
  imageIndex.value.length = 0;
  currencyList.value.forEach(currency => {
    imageIndex.value.push(currencyImages.findIndex(item => item.name == currency.currency) != -1 ? currencyImages.findIndex(item => item.name == currency.currency) : 0);
  });
}))

const handleSelectCurrency = async (item: GetCurrencyBalanceList) => {
  selectedCurrencyItem.value = item;

  await dispatchSetUserCurrency(item.currency);
  if (route.name == 'Sports') {
    await closeKill();
    await getGameBetbyInit();
  }
  setTimeout(() => {
    setOverlayScrimShow(false);
    setMainBlurEffectShow(false);
    setMailMenuShow(false);
  }, 300)
}

const handleCurrencyMenuShow = async () => {
  currencyMenuShow.value = !currencyMenuShow.value;
  await dispatchUserBalance();
  await dispatchUserBonus();
}

const showUserNavBar = async () => {
  // await dispatchUserProfile();
  // console.log(errMessage.value);
  // if (errMessage.value == "Credentials have expired. Please log in again") {
  //   dispatchSignout();
  //   return;
  // }
  userNavBarToggle.value = !userNavBarToggle.value
  setNavBarToggle(false)
  setBonusDashboardDialogVisible(false);
  setMainBlurEffectShow(false);
  setTimeout(() => {
    setUserNavBarToggle(userNavBarToggle.value);
    setMainBlurEffectShow(userNavBarToggle.value);
  }, 10)
}

watch(userBalance, (value) => {
  console.log("userbalance================");
  let locale = 'pt-BR';
  const currencyUnit = value.currency
  switch (currencyUnit) {
    case "BRL":
      locale = 'pt-BR';
      break;
    case "PHP":
      locale = 'en-PH';
      break;
    case "PEN":
      locale = 'en-PE';
      break;
    case "MXN":
      locale = 'es-MX';
      break;
    case "CLP":
      locale = 'es-CL';
      break;
    case "USD":
      locale = 'en-US';
    case "COP":
      locale = 'es-CO';
      break;
  }
  user.value.wallet = formatCurrency(Number(value.amount), locale, currencyUnit);
  user.value.currency = value.currency
  selectedCurrencyItem.value.currency = value.currency
  /*currencyList.value.map(item => {
    if (item.name == "BRL") {
      item.value = Number(value.amount)
    }
  })*/
})

watch(socketBalance, (value) => {
  console.log("socketBalance================", value);
  let locale = 'pt-BR';
  switch (value.cur) {
    case "BRL":
      locale = 'pt-BR';
      break;
    case "PHP":
      locale = 'en-PH';
      break;
    case "PEN":
      locale = 'en-PE';
      break;
    case "MXN":
      locale = 'es-MX';
      break;
    case "CLP":
      locale = 'es-CL';
      break;
    case "USD":
      locale = 'en-US';
    case "COP":
      locale = 'es-CO';
      break;
  }
  if (user.value.currency == value.cur) {
    user.value.wallet = formatCurrency(Number(value.bal), locale, value.cur);
  }
  currencyList.value.map(item => {
    if (item.currency == value.cur) {
      item.amount = value.bal.toString()
    }
  })
})

watch(userNavToggle, (newValue) => {
  console.log(navBarToggle.value);
  userNavBarToggle.value = newValue;
}, { deep: true });

const goHomePage = () => {
  router.push({ name: "Dashboard" });
}

const goBonusPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(0);
}

const goTransactionPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(1);
  setTransactionTab(t('transaction.tab.transactions'));
}

const goDepositPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(1);
  setTransactionTab(t('transaction.tab.transactions'));
}

const goWithdrawPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(1);
  setTransactionTab(t('transaction.tab.withdrawal'));
}

const goGameHistoryPage = () => {
  router.push({ name: 'Bonuses And Transactions' });
  setBonusTabIndex(1);
  setTransactionTab(t('transaction.tab.game_history'));
}

const inviteUrlCopy = (content: string) => {
  clipboard.writeText(content).then(
    () => {
      console.log("Copied to clipboard!");
      notificationText.value = "Successful replication";
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 5000,
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
      console.error("Could not copy text: ", error);
    }
  );
};

// watches
watch(currentLanguage, (newLang, oldLang) => {
  setLang(newLang);
});

watch(mailList, (newValue) => {
  console.log(newValue);
  mailCount.value = newValue.length;
}, { deep: true })

const refferalDialogShow = () => {
  setRefferalDialogShow(true);
  setUserNavBarToggle(false);
}

// header blur effect
const headerBlurEffectShow = computed(() => {
  const { getHeaderBlurEffectShow } = storeToRefs(appBarStore());
  return getHeaderBlurEffectShow.value
})

onMounted(async () => {
  if (mobileWidth.value < 600) {
    currencyMenuWidth.value = (window.innerWidth - 20) + "px";
  }
  setAuthModalType("");
  mailCount.value = mailList.value.length
  if (mobileWidth.value > 1280) {
    if (rightBarToggle.value) {
      appBarWidth.value = refferalAppBarShow.value ? "app-bar-pc-1 app-bar-position" : "app-bar-pc-1";
    } else {
      appBarWidth.value = refferalAppBarShow.value ? "app-bar-pc app-bar-position" : "app-bar-pc";
    }
  } else {
    appBarWidth.value = refferalAppBarShow.value ? "app-bar-mobile app-bar-position" : "app-bar-mobile";
  }
  if (token.value != undefined) {
    await dispatchUserProfile();
    await dispatchUserBalance();
    await dispatchCurrencyList();
    // await dispatchSocketConnect();
  }
});
</script>

<template>
  <v-app-bar
    app
    dark
    :color="color"
    :class="[
      appBarWidth,
      headerBlurEffectShow ? 'header-bg-blur' : mobileWidth > 1200 ? 'pc-header-l' : '',
    ]"
    class="app-bar-height"
  >
    <v-app-bar-nav-icon
      @click.stop="setNavBarToggle(true)"
      v-if="!navBarToggle && mobileWidth > 600"
    >
    </v-app-bar-nav-icon>

    <v-toolbar-title v-if="mobileWidth > 800">
      <img
        src="@/assets/public/image/logo_public_01.png"
        @click="goHomePage"
        style="margin-top: 12px"
      />
      <!-- <v-btn height="60" @click="goHomePage" class="align-center mt-1">
        <img src="@/assets/public/image/logo_public_01.png" />
      </v-btn> -->
    </v-toolbar-title>

    <v-toolbar-title v-else>
      <img
        src="@/assets/public/image/logo_public_03.png"
        @click="goHomePage"
        class="mt-1"
        width="52"
      />
      <!-- <v-btn height="46" width="100" @click="goHomePage" class="align-center">
        <img src="@/assets/public/image/logo_public_03.png" />
      </v-btn> -->
    </v-toolbar-title>
    <div v-if="token != undefined">
      <div class="d-flex align-center">
        <v-menu offset="10" class="deposit-menu">
          <template v-slot:activator="{ props }">
            <v-card
              color="#1D2027"
              theme="dark"
              class="mr-4 mt-1 user-card-height"
              v-if="mobileWidth > 600"
            >
              <v-list-item class="deposit-item user-card-height pr-1" v-bind="props">
                <div class="d-flex align-center">
                  <v-menu
                    offset="20"
                    v-model:model-value="currencyMenuShow"
                    class="currency-menu"
                    transition="slide-y-transition"
                  >
                    <template v-slot:activator="{ props }">
                      <div
                        class="d-flex align-center text-700-16"
                        v-bind="props"
                        style="height: 40px"
                      >
                        <!-- <p class="mr-1">{{ user.currency }}</p> -->
                        <p class="mr-2">{{ user.wallet }}</p>
                        <img src="@/assets/public/svg/icon_public_50.svg" class="mr-2" />
                      </div>
                    </template>
                    <v-list theme="dark" bg-color="#1D2027" class="px-2" width="427px">
                      <v-list-item
                        class="currency-item pl-6"
                        :value="currencyItem.currency"
                        v-for="(currencyItem, currencyIndex) in currencyList"
                        :key="currencyIndex"
                        :class="
                          selectedCurrencyItem.currency == currencyItem.currency
                            ? 'currency-selected-item'
                            : ''
                        "
                        @click="handleSelectCurrency(currencyItem)"
                      >
                        <template v-slot:prepend>
                          <img width="24" />
                        </template>
                        <v-list-item-title class="ml-2 text-700-14">
                          {{ currencyItem.currency }}
                        </v-list-item-title>
                        <template v-slot:append>
                          <p class="text-700-14 white">
                            $ {{ parseFloat(currencyItem.amount).toFixed(2) }}
                          </p>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <div
                    class="deposit-icon-bg cursor-pointer relative"
                    @click="depositDialogShow"
                  >
                    <img
                      src="@/assets/public/svg/icon_public_54.svg"
                      class="deposit-icon-position cursor-pointer"
                    />
                    <div class="text-700-12 white deposit-text-position">
                      {{ t("appBar.deposit") }}
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-card>
            <v-card
              color="#15161C"
              theme="dark"
              class="m-user-card-height"
              style="border-radius: 8px"
              v-else
            >
              <div class="deposit-item m-user-card-height px-2" v-bind="props">
                <div class="d-flex align-center">
                  <v-menu
                    offset="20"
                    v-model:model-value="currencyMenuShow"
                    :scrim="true"
                    class="m-currency-menu"
                    transition="slide-y-transition"
                    @click.stop="handleCurrencyMenuShow"
                  >
                    <template v-slot:activator="{ props }">
                      <div
                        class="d-flex align-center"
                        v-bind="props"
                        style="height: 40px"
                      >
                        <!-- <p class="mr-1 text-700-12">{{ user.currency }}</p> -->
                        <p class="text-700-12">{{ user.wallet }}</p>
                        <img
                          src="@/assets/public/svg/icon_public_50.svg"
                          class="mr-3"
                          width="16"
                        />
                      </div>
                    </template>
                    <v-list
                      theme="dark"
                      bg-color="#23262F"
                      class="px-2"
                      :width="currencyMenuWidth"
                    >
                      <v-list-item
                        class="currency-item pl-6"
                        :value="currencyItem.currency"
                        :class="
                          selectedCurrencyItem.currency == currencyItem.currency
                            ? 'currency-selected-item'
                            : ''
                        "
                        v-for="(currencyItem, currencyIndex) in currencyList"
                        :key="currencyIndex"
                        @click="handleSelectCurrency(currencyItem)"
                      >
                        <template v-slot:prepend>
                          <img
                            width="20"
                            :src="currencyImages[imageIndex[currencyIndex]].icon"
                          />
                        </template>
                        <v-list-item-title class="ml-2 text-700-10">{{
                          currencyItem.currency
                        }}</v-list-item-title>
                        <template v-slot:append>
                          <p class="text-700-10 white">
                            $ {{ parseFloat(currencyItem.amount).toFixed(2) }}
                          </p>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <div
                    class="m-deposit-icon-bg cursor-pointer relative"
                    @click="depositDialogShow"
                  >
                    <img
                      src="@/assets/public/svg/icon_public_54.svg"
                      class="deposit-icon-position cursor-pointer"
                      width="20"
                    />
                    <div class="text-700-8 white m-deposit-text-position">
                      {{ t("appBar.deposit") }}
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </template>
        </v-menu>
        <v-menu offset="20" class="user-menu" :scrim="true">
          <template v-slot:activator="{ props }">
            <v-card
              color="#1D2027"
              theme="dark"
              class="mr-4 mt-1 user-card-height"
              style="min-width: 166px !important"
              v-if="mobileWidth > 600"
            >
              <v-list-item
                class="user-item user-card-height"
                v-bind="props"
                value="user dropdown"
              >
                <div class="d-flex align-center">
                  <img :src="user.avatar" class="user-avatar-width" />
                  <div class="ml-4">
                    <div class="text-500-14">{{ userInfo.name }}</div>
                    <div class="d-flex align-center">
                      <div class="user-grade-text">{{ user.grade }}</div>
                      <img
                        src="@/assets/public/svg/icon_public_50.svg"
                        class="user-drop-arrow-position"
                      />
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-card>
            <div class="d-flex align-center" v-else>
              <div class="user-item" value="user dropdown" @click="showUserNavBar">
                <img
                  :src="userInfo.avatar"
                  width="40"
                  class="mr-0 original-game-img-avatar"
                  style="margin-top: 8px"
                />
              </div>
            </div>
          </template>
          <v-list theme="dark" bg-color="#1D2027" class="px-2" width="320">
            <v-list-item class="user-item" value="id">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_58.svg" />
              </template>
              <v-list-item-title class="ml-2"
                >{{ t("appBar.id") }}: {{ userInfo.uid }}</v-list-item-title
              >
              <template v-slot:append>
                <img
                  @click="inviteUrlCopy(userInfo.uid)"
                  src="@/assets/public/svg/icon_public_71.svg"
                  v-ripple.center
                  class="ml-6"
                />
              </template>
            </v-list-item>
            <v-list-item class="user-item" value="vip">
              <template v-slot:prepend>
                <div class="text-center">
                  <img
                    :src="vipLevelImgs[0].image"
                    width="27"
                    height="33"
                    v-if="vipInfo.level == 0"
                  />
                  <img
                    :src="vipLevelImgs[1].image"
                    width="27"
                    height="33"
                    v-if="vipInfo.level >= 1 && vipInfo.level < 25"
                  />
                  <img
                    :src="vipLevelImgs[2].image"
                    width="27"
                    height="33"
                    v-if="vipInfo.level >= 25 && vipInfo.level < 50"
                  />
                  <img
                    :src="vipLevelImgs[3].image"
                    width="27"
                    height="33"
                    v-if="vipInfo.level >= 50 && vipInfo.level < 75"
                  />
                  <img
                    :src="vipLevelImgs[4].image"
                    width="27"
                    height="33"
                    v-if="vipInfo.level >= 75 && vipInfo.level < 100"
                  />
                  <img
                    :src="vipLevelImgs[5].image"
                    width="27"
                    height="33"
                    v-if="vipInfo.level >= 100 && vipInfo.level < 149"
                  />
                  <img
                    :src="vipLevelImgs[6].image"
                    width="27"
                    height="33"
                    v-if="vipInfo.level >= 150 && vipInfo.level < 200"
                  />
                  <img
                    :src="vipLevelImgs[7].image"
                    width="27"
                    height="33"
                    v-if="vipInfo.level >= 200"
                  />
                  <div class="text-800-14 color-F9BC01" v-if="vipInfo.level == 0">
                    {{ vipLevelImgs[0].content }}
                  </div>
                  <div
                    class="text-800-14 color-F9BC01"
                    v-if="vipInfo.level >= 1 && vipInfo.level < 25"
                  >
                    {{ vipLevelImgs[1].content }}
                  </div>
                  <div
                    class="text-800-14 color-F9BC01"
                    v-if="vipInfo.level >= 25 && vipInfo.level < 50"
                  >
                    {{ vipLevelImgs[2].content }}
                  </div>
                  <div
                    class="text-800-14 color-F9BC01"
                    v-if="vipInfo.level >= 50 && vipInfo.level < 75"
                  >
                    {{ vipLevelImgs[3].content }}
                  </div>
                  <div
                    class="text-800-14 color-F9BC01"
                    v-if="vipInfo.level >= 75 && vipInfo.level < 100"
                  >
                    {{ vipLevelImgs[4].content }}
                  </div>
                  <div
                    class="text-800-14 color-F9BC01"
                    v-if="vipInfo.level >= 100 && vipInfo.level < 150"
                  >
                    {{ vipLevelImgs[5].content }}
                  </div>
                  <div
                    class="text-800-14 color-F9BC01"
                    v-if="vipInfo.level >= 150 && vipInfo.level < 200"
                  >
                    {{ vipLevelImgs[6].content }}
                  </div>
                  <div class="text-800-14 color-F9BC01" v-if="vipInfo.level >= 200">
                    {{ vipLevelImgs[7].content }}
                  </div>
                </div>
              </template>
              <v-list-item-title class="ml-2">
                <div class="deposit-progress-bg">
                  <div class="d-flex">
                    <div class="white">{{ t("appBar.deposit") }}</div>
                    <div class="ml-auto">
                      <font>R$ 5642</font> / <font color="#F9BC01">R$ 10000</font>
                    </div>
                  </div>
                  <div>
                    <v-progress-linear
                      v-model="depositRate"
                      height="18"
                      class="deposit-progress"
                    >
                    </v-progress-linear>
                  </div>
                </div>
                <div class="deposit-progress-bg">
                  <div class="d-flex">
                    <div class="white">{{ t("appBar.wager") }}</div>
                    <div class="ml-auto">
                      <font>R$ 5642</font> / <font color="#623AEC">R$ 10000</font>
                    </div>
                  </div>
                  <div>
                    <v-progress-linear
                      v-model="depositRate"
                      height="18"
                      class="wager-progress"
                    >
                    </v-progress-linear>
                  </div>
                </div>
              </v-list-item-title>
              <!-- <template v-slot:prepend>
                        <img src="@/assets/app_bar/image/img_vip_02.png" style="margin-left: -6px;" />
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
                        <img src="@/assets/public/svg/img_public_05.svg" v-ripple.center class="ml-6" />
                        <img src="@/assets/public/svg/img_public_05.svg" v-ripple.center class="ml-1" />
                        <img src="@/assets/public/svg/img_public_05.svg" v-ripple.center class="ml-1" />
                      </template> -->
            </v-list-item>
            <v-list-item
              class="user-item"
              value="account"
              router
              :to="{ name: 'Account' }"
            >
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_59.svg" />
              </template>
              <v-list-item-title class="ml-2">
                {{ t("appBar.account") }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="deposit" @click="depositDialogShow">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_60.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.deposit")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="bonuses" @click="goBonusPage">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_61.svg" />
              </template>
              <v-list-item-title class="ml-2">
                {{ t("appBar.bonuses") }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              class="user-item"
              value="game_history"
              @click="goGameHistoryPage"
            >
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_62.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.game_history")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              class="user-item"
              value="transactions"
              @click="goTransactionPage"
            >
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_63.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.transactions")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              class="user-item refer-friend-background"
              value="refer_friend"
              @click="refferalDialogShow"
            >
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_64.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.refer_friend")
              }}</v-list-item-title>
              <template v-slot:append>
                <img
                  src="@/assets/public/image/img_public_09.png"
                  v-ripple.center
                  class="ml-6 refer-friend-img-position"
                  width="62"
                />
                <p class="refer-friend-text-position">{{ t("appBar.earn_money") }}</p>
              </template>
            </v-list-item>
            <v-list-item class="user-item" value="withdraw" @click="withdrawDialogShow">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_65.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.withdraw")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item app-background" value="app">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_66.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t("appBar.app") }}</v-list-item-title>
              <template v-slot:append>
                <img
                  src="@/assets/public/image/img_public_04.png"
                  v-ripple.center
                  class="ml-6 app-img-position"
                />
                <p class="app-text-position">{{ t("appBar.install") }}</p>
              </template>
            </v-list-item>
            <v-list-item class="user-item" value="fairness">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_72.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.fairness")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="rewards">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_67.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.rewards")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="preferences">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_68.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.preferences")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="statistics">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_69.svg" />
              </template>
              <v-list-item-title class="ml-2">{{
                t("appBar.statistics")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item">
              <v-list-item-title>
                <div
                  class="d-flex justify-center sign-out-btn"
                  v-ripple.center
                  @click="showSignoutDialog"
                >
                  <img src="@/assets/public/svg/icon_public_70.svg" class="mr-4" />
                  {{ t("appBar.sign_out") }}
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu class="mail-menu" :scrim="true">
          <template v-slot:activator="{ props }">
            <div
              class="mr-4 mt-4 relative mail-height"
              v-bind="props"
              v-ripple.center
              v-if="mobileWidth > 600"
            >
              <img src="@/assets/public/svg/icon_public_55.svg" />
              <p class="chat-box-text">{{ mailCount }}</p>
            </div>
          </template>
          <v-list theme="dark" bg-color="#1D2027" class="px-2" width="400">
            <v-list-item
              class="mail-item"
              :value="mailItem.mail_content_1.content"
              v-for="(mailItem, mailIndex) in mailList"
              :key="mailIndex"
            >
              <template v-slot:prepend>
                <img :src="mailItem.icon" />
              </template>
              <v-list-item-title class="ml-2">
                <div :class="mailItem.mail_content_1.color">
                  {{ mailItem.mail_content_1.content }}
                </div>
                <div :class="mailItem.mail_content_2.color">
                  {{ mailItem.mail_content_2.content }}
                </div>
              </v-list-item-title>
              <template v-slot:append>
                <div :class="mailItem.mail_rail_1.color">
                  {{ mailItem.mail_rail_1.content }}
                </div>
                <div class="completion-area" :class="mailItem.mail_rail_2.color">
                  {{ mailItem.mail_rail_2.content }}
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>

        <!----------------------------       chatting menu toggle       ----------------------------->

        <!-- <div class="mr-8 mt-5 relative mail-height" v-ripple @click="setRightBarToggle(true)" v-if="mobileWidth > 600">
          <img src="@/assets/public/svg/icon_public_56.svg" />
          <p class="chat-box-text">{{ messageCount }}</p>
        </div> -->
      </div>
    </div>
    <div v-else>
      <v-switch
        :label="currentLanguage === 'en' ? 'English' : '中文'"
        color="success"
        value="success"
        @change="toggleLanguage"
        hide-details
        class="toggle-language-switch"
      />
      <v-btn
        @click="openDialog('login')"
        class="text-none"
        :class="[
          mobileVersion == 'sm' ? 'app-bar-login-btn-mobile' : 'app-bar-login-btn',
        ]"
      >
        {{ t("main.loginButton") }}
      </v-btn>
      <v-btn
        @click="openDialog('signup')"
        class="text-none mr-2"
        :class="[
          mobileVersion == 'sm' ? 'app-bar-signup-btn-mobile' : 'app-bar-signup-btn',
        ]"
      >
        {{ t("main.signupButton") }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style lang="scss">
.currency-selected-item {
  border: 1px solid #00b25c !important;
  border-radius: 14px !important;
}

.m-currency-menu {
  .v-overlay__content {
    left: 10px !important;
    border-radius: 8px !important;
  }

  .v-overlay__scrim {
    opacity: 0 !important;
  }

  .v-overlay__content::after {
    content: "";
    position: absolute;
    align-self: center;
    top: -25px;
    right: 150px;
    border: 13px solid #1d2027;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-width: 8px;
    border-left-width: 8px;
  }
}

.currency-menu {
  .v-overlay__content::after {
    content: "";
    position: absolute;
    align-self: center;
    top: -25px;
    left: 60px;
    border: 13px solid #1d2027;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-width: 8px;
    border-left-width: 8px;
  }

  .v-overlay__content {
    left: unset !important;
    right: 17px !important;
  }
}

.logo-title-1 {
  color: #637bf9;
  font-size: 28px !important;
  font-weight: 900 !important;
  font-family: "Bauhaus 93";
}

.logo-title-2 {
  color: #f9bc01;
  font-size: 28px !important;
  font-weight: 900 !important;
  font-family: "Bauhaus 93";
}

.user-menu .v-menu__content {
  max-height: 100% !important;
}

.m-logo-title-1 {
  position: absolute;
  top: -28px;
  left: 12px;
  color: #637bf9;
  font-size: 20px !important;
  font-weight: 900 !important;
  font-family: "Bauhaus 93";
}

.m-logo-title-2 {
  position: absolute;
  top: -5px;
  left: 4px;
  color: #f9bc01;
  font-size: 20px !important;
  font-weight: 900 !important;
  font-family: "Bauhaus 93";
}

.app-bar-pc-1 {
  width: calc(100% - 660px) !important;
  margin-left: 300px;
}

.app-bar-pc {
  width: calc(100% - 360px) !important;
  margin-left: 320px;
}

.app-bar-mobile {
  width: 100%;
}

.app-bar-none {
  display: none !important;
}

.app-bar-height {
  border-radius: 0px 0px 8px 8px !important;
  height: 68px !important;
  color: #ffffff !important;
}

.pc-header-l {
  left: 0 !important;
}

@media (max-width: 600px) {
  .app-bar-position {
    top: 32px !important;
  }

  .app-bar-height {
    height: 60px !important;

    .v-toolbar__content {
      height: 60px !important;
    }
  }
}

.toggle-language-switch {
  position: absolute;
  top: 1%;
  left: 56%;
  display: none !important;
}

.v-selection-control.v-selection-control--density-default {
  div.v-switch__track {
    background-color: #e9e9e9;
  }

  .v-label {
    font-size: larger;
    color: white;
    font-weight: 400;
  }
}

.v-selection-control.v-selection-control--dirty.v-selection-control--density-default {
  div.v-switch__track {
    background-color: rgb(76, 175, 80);
  }
}

// login btn pc version
.app-bar-login-btn {
  width: 120px;
  height: 46px !important;
  margin-right: 6px;
}

// login btn mobile version
.app-bar-login-btn-mobile {
  width: 80px;
  height: 40px !important;
  background-color: transparent;
  margin-right: 6px;
  font-size: 6px !important;
  font-weight: 400;

  .v-btn__content {
    font-weight: 700;
    font-size: 14px;
  }
}

.app-bar-signup-btn {
  width: 120px;
  height: 48px !important;
  border-radius: 8px !important;
  background-color: #009b3a !important;
}

.app-bar-signup-btn-mobile {
  width: 91px;
  height: 40px !important;
  border-radius: 8px !important;
  background: #009b3a !important;
  //border: 1px solid #8664f7;
  //background: linear-gradient(0deg, #5524fd 0%, #6d44f7 100%);

  .v-btn__content {
    font-weight: 700;
    font-size: 14px;
  }
}

.chat-box-text {
  top: -6px;
  right: -9px;
  position: absolute;
  font-weight: 800;
  font-size: 12px;
  color: #000000;
  background: #12ff76;
  border-radius: 15px;
  padding: 0px 5px;
}

.user-avatar-width {
  width: 42px;
}

.user-grade-text {
  font-weight: 800;
  font-size: 14px;
  color: #e5b991;
}

.user-card-height {
  height: 49px !important;
}

.m-user-card-height {
  height: 40px !important;
}

.user-drop-arrow-position {
  margin-left: auto;
}

.deposit-icon-position {
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
}

.mail-height {
  border-radius: 10px;
  height: 36px;
  cursor: pointer;
}

.user-item {
  padding: 4px 8px !important;
  border-radius: 8px !important;

  .v-list-item-title {
    font-weight: 700;
    font-size: 14px;
    color: #7782aa;
  }
}

.user-menu {
  margin-left: auto !important;

  .v-overlay__content {
    // top: 74px !important;
  }

  .v-overlay__content::after {
    content: "";
    position: absolute;
    align-self: center;
    top: -25px;
    right: 68px;
    border: 13px solid #1d2027;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-width: 10px;
    border-left-width: 10px;
  }
}

.mail-menu {
  margin-left: auto !important;

  .v-overlay__content {
    // top: 80px !important;
    left: unset !important;
    right: 0px !important;
  }

  .v-overlay__content::after {
    content: "";
    position: absolute;
    align-self: center;
    right: 66px;
    top: -18px;
    border: 9px solid #1d2027;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-width: 7px;
    border-left-width: 7px;
  }

  .v-list-item-title {
    font-weight: 500;
    font-size: 12px;
    color: #7782aa;
  }

  .v-list-item__append {
    display: block !important;
    text-align: center;
  }

  .completion-area {
    background-color: #000000;
    border-radius: 20px;
    margin-top: 4px;
  }

  .text-color-gray {
    font-weight: 500;
    font-size: 12px;
    color: #7782aa;
  }

  .text-color-white {
    font-weight: 500;
    font-size: 12px;
    color: #ffffff;
  }

  .money-color-white {
    font-weight: 900;
    font-size: 16px;
    color: #ffffff;
  }

  .text-color-yellow {
    font-weight: 500;
    font-size: 12px;
    color: #f9bc01;
  }

  .text-color-green {
    font-weight: 500;
    font-size: 12px;
    color: #01983a;
  }

  .mail-item {
    margin-top: 4px !important;
    background-color: #15161c !important;
    padding: 4px 8px !important;
    border-radius: 8px !important;
  }
}

.vip-background-img {
  background-image: url("@/assets/public/image/bg_public_27.png");
}

.grade-color {
  color: #e6ba93;
}

.grade-text-position {
  margin-left: 34px;
}

.refer-friend-background {
  background-image: url("@/assets/public/image/bg_public_28.png") !important;
}

.refer-friend-img-position {
  position: absolute;
  right: 14px;
  top: -20px;
}

.refer-friend-text-position {
  position: absolute;
  right: 9px;
  top: 23px;
  background: #1d2027;
  border-radius: 20px;
  padding: 2px 12px;
  font-weight: 500;
  font-size: 12px;
}

.app-background {
  background-image: url("@/assets/public/image/bg_public_29.png") !important;
}

.app-img-position {
  position: absolute;
  right: 9px;
  top: -20px;
}

.app-text-position {
  position: absolute;
  right: 13px;
  top: 22px;
  background: #1d2027;
  border-radius: 20px;
  padding: 2px 21px;
  font-weight: 500;
  font-size: 12px;
}

.sign-out-btn {
  cursor: pointer;
  background: #23262f;
  border-radius: 8px;
  padding: 13px;
  margin: 0px 20px;
}

.deposit-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(180deg, #f9bc01 0%, #f99301 100%);
    border-radius: 20px;
  }
}

.wager-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(180deg, #6d44f8 0%, #5726fc 100%);
    border-radius: 20px;
  }
}

.deposit-progress-bg {
  .v-progress-linear {
    background: #15161c !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 20px !important;
  }
}

.deposit-icon-bg {
  margin-left: auto;
  width: 60px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 9px;
  border: 1px solid #8664f7;
  background: linear-gradient(0deg, #5524fd 0%, #6d44f7 100%);
}

.m-deposit-icon-bg {
  margin-left: auto;
  width: 53px;
  height: 33px;
  flex-shrink: 0;
  border-radius: 8px;
  //border: 1px solid #8664f7;
  //background: linear-gradient(0deg, #5524fd 0%, #6d44f7 100%);
  background: #009b3a;
}

.deposit-text-position {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
}

.m-deposit-text-position {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 9px;
}

.original-game-img-avatar:active {
  transform: scale(0.9);
  filter: brightness(80%);
  transition-duration: 0.28s;
}

.header-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  // filter: saturate(180%) blur(3px);
  // -webkit-filter: saturate(180%) blur(3px);
}
</style>
