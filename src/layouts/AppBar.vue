<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { setLang } from "@/locale/index";
import { authStore } from "@/store/auth";
import { appBarStore } from "@/store/appBar";
import { refferalStore } from '@/store/refferal';
import { loginBonusStore } from "@/store/loginBonus";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { mailStore } from "@/store/mail";
import { storeToRefs } from "pinia";
import { type GetUserData } from "@/interface/appBar";
import { type GetMailData } from '@/interface/mail';
import { type GetCurrencyItem } from '@/interface/deposit';
import { useDisplay } from 'vuetify'
import { useRouter } from "vue-router";

const { setAuthModalType } = authStore();
const { dispatchUserProfile } = authStore();
const { setRightBarToggle } = appBarStore();
const { setNavBarToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setUserNavBarToggle } = appBarStore();
const { setBonusTabIndex } = bonusTransactionStore();
const { setTransactionTab } = bonusTransactionStore();
const { setRefferalDialogShow } = refferalStore();
const { setLoginBonusDialogVisible } = loginBonusStore();

const { name, width } = useDisplay()
const router = useRouter();

type dialogType = "login" | "signup";
const color = ref<string>("#29263C");
// translation
const { t } = useI18n();
const currentLanguage = ref<string>("en");
const appBarWidth = ref<string>("app-bar-pc");

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

// mail count
const mailCount = ref<number>(10);
// message count
const messageCount = ref<number>(299);

const depositRate = ref<number>(56);

const wagerRate = ref<number>(56);

// get Token
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const userInfo = computed(() => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value
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

watch(mobileWidth, (newValue: number) => {
  if (newValue > 1280) {
    if (rightBarToggle.value) {
      appBarWidth.value = "app-bar-pc";
    } else {
      appBarWidth.value = "app-bar-pc-1";
    }
  } else {
    appBarWidth.value = "app-bar-mobile";
  }
})

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === "en" ? "zh" : "en";
};
const openDialog = (type: dialogType) => {
  setAuthModalType(type);
};

const showSignoutDialog = () => {
  setAuthModalType("signout");
}

const depositDialogShow = () => {
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
}

const withdrawDialogShow = () => {
  setWithdrawDialogToggle(true);
  setCashDialogToggle(true);
}

const userNavBarToggle = ref(false);

const selectedCurrencyItem = ref<GetCurrencyItem>({
  icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
  name: "BRL"
})

const currencyList = ref<Array<GetCurrencyItem>>([
  {
    icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
    name: "BRL"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_85.svg", import.meta.url).href,
    name: "PHP"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_86.svg", import.meta.url).href,
    name: "PEN"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_87.svg", import.meta.url).href,
    name: "MXN"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_88.svg", import.meta.url).href,
    name: "CLP"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_89.svg", import.meta.url).href,
    name: "USD"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_90.svg", import.meta.url).href,
    name: "COP"
  },
])

const handleSelectCurrency = (item: GetCurrencyItem) => {
  selectedCurrencyItem.value = item;
  user.value.currency = item.name
}

const showUserNavBar = (): void => {
  userNavBarToggle.value = !userNavBarToggle.value
  setUserNavBarToggle(userNavBarToggle.value);
}

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

const openLoginBonusDialog = () => {
  setLoginBonusDialogVisible(true);
}

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

onMounted(async () => {
  setAuthModalType("");
  mailCount.value = mailList.value.length
  if (mobileWidth.value > 1280) {
    if (rightBarToggle.value) {
      appBarWidth.value = "app-bar-pc";
    } else {
      appBarWidth.value = "app-bar-pc-1";
    }
  } else {
    appBarWidth.value = "app-bar-mobile";
  }
  if (token.value != undefined) {
    await dispatchUserProfile();
  }
});
</script>

<template>
  <v-app-bar app dark :color="color" :class="appBarWidth" class="app-bar-height">
    <v-app-bar-nav-icon @click.stop="setNavBarToggle(true)"
      v-if="!navBarToggle && mobileWidth > 600"></v-app-bar-nav-icon>
    <v-toolbar-title v-if="mobileWidth > 800">
      <v-btn height="60" @click="goHomePage" class="align-center mt-2">
        <img src="@/assets/public/image/logo_public_01.png" />
        <!-- <p class="logo-title-1 ml-1">{{ t('main.logo_text_1') }}</p>
        <p class="logo-title-2 ml-1">{{ t('main.logo_text_2') }}</p> -->
      </v-btn>
    </v-toolbar-title>
    <v-toolbar-title v-else>
      <v-btn height="46" width="100" @click="goHomePage" class="align-center mt-1">
        <img src="@/assets/public/image/logo_public_03.png" />
        <!-- <p class="m-logo-title-1 mt-1">{{ t('main.logo_text_1') }}</p>
          <p class="m-logo-title-2 mt-1">{{ t('main.logo_text_2') }}</p> -->
      </v-btn>
    </v-toolbar-title>
    <div v-if="token != undefined">
      <div class="d-flex">
        <v-menu offset="10" class="deposit-menu">
          <template v-slot:activator="{ props }">
            <v-card color="#29263C" theme="dark" class="mr-4 mt-2 user-card-height" v-if="mobileWidth > 600">
              <v-list-item class="deposit-item user-card-height" v-bind="props">
                <div class="d-flex align-center">
                  <v-menu offset="20">
                    <template v-slot:activator="{ props }">
                      <div class="d-flex align-center" v-bind="props" style="height: 40px;">
                        <p class="mr-1">{{ user.currency }}</p>
                        <p class="mr-2">{{ user.wallet }}</p>
                        <img src="@/assets/public/svg/icon_public_50.svg" class="mr-2" />
                      </div>
                    </template>
                    <v-list theme="dark" bg-color="#211F31" class="px-2" width="200px">
                      <v-list-item class="currency-item pl-6" :value="currencyItem.name"
                        v-for="(currencyItem, currencyIndex) in currencyList" :key="currencyIndex"
                        @click="handleSelectCurrency(currencyItem)">
                        <template v-slot:prepend>
                          <img :src="currencyItem.icon" width="26" />
                        </template>
                        <v-list-item-title class="ml-2">{{ currencyItem.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <div class="deposit-icon-bg cursor-pointer relative" @click="depositDialogShow">
                    <img src="@/assets/public/svg/icon_public_54.svg" class="deposit-icon-position cursor-pointer" />
                    <div class="text-700-12 white deposit-text-position">{{ t('appBar.deposit') }}</div>
                  </div>
                </div>
              </v-list-item>
            </v-card>
            <v-card color="#29263C" theme="dark" class="mt-3 m-user-card-height" v-else>
              <v-list-item class="deposit-item m-user-card-height" v-bind="props">
                <div class="d-flex align-center">
                  <v-menu offset="20">
                    <template v-slot:activator="{ props }">
                      <div class="d-flex align-center" v-bind="props" style="height: 40px;">
                        <p class="mr-1">{{ user.currency }}</p>
                        <p class="mr-2">{{ user.wallet }}</p>
                        <img src="@/assets/public/svg/icon_public_50.svg" class="mr-2" />
                      </div>
                    </template>
                    <v-list theme="dark" bg-color="#211F31" class="px-2" width="200px">
                      <v-list-item class="currency-item pl-6" :value="currencyItem.name"
                        v-for="(currencyItem, currencyIndex) in currencyList" :key="currencyIndex"
                        @click="handleSelectCurrency(currencyItem)">
                        <template v-slot:prepend>
                          <img :src="currencyItem.icon" width="26" />
                        </template>
                        <v-list-item-title class="ml-2">{{ currencyItem.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <div class="m-deposit-icon-bg cursor-pointer relative" @click="depositDialogShow">
                    <img src="@/assets/public/svg/icon_public_54.svg" class="deposit-icon-position cursor-pointer" />
                    <div class="text-700-12 white deposit-text-position">{{ t('appBar.deposit') }}</div>
                  </div>
                </div>
              </v-list-item>->
            </v-card>
          </template>
        </v-menu>
        <v-menu offset="20" class="user-menu" :scrim="true">
          <template v-slot:activator="{ props }">
            <v-card color="#29263C" theme="dark" class="mr-4 mt-2 user-card-height" v-if="mobileWidth > 600">
              <v-list-item class="user-item" v-bind="props" value="user dropdown">
                <div class="d-flex align-center">
                  <img :src="user.avatar" class="user-avatar-width" />
                  <div class="ml-1">
                    <div>{{ userInfo.name }}</div>
                    <div class="d-flex align-center">
                      <div class="user-grade-text">{{ user.grade }}</div>
                      <img src="@/assets/public/svg/icon_public_50.svg" class="user-drop-arrow-position" />
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-card>
            <div class="d-flex align-center" v-else>
              <v-list-item class="user-item" value="user dropdown" @click="showUserNavBar">
                <img :src="user.avatar" width="40" height="40" class="mt-3" />
              </v-list-item>
            </div>
          </template>
          <v-list theme="dark" bg-color="#211F31" class="px-2" width="320">
            <v-list-item class="user-item" value="id">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_58.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.id') }}: {{ user.id }}</v-list-item-title>
              <template v-slot:append>
                <img src="@/assets/public/svg/icon_public_71.svg" v-ripple.center class="ml-6" />
              </template>
            </v-list-item>
            <v-list-item class="user-item" value="vip">
              <template v-slot:prepend>
                <div>
                  <div style="height: 40px;">
                    <img src="@/assets/app_bar/image/img_vip_02.png" />
                  </div>
                  <div class="text-800-14 color-F9BC01">{{ user.grade }}</div>
                </div>
              </template>
              <v-list-item-title class="ml-2">
                <div class="deposit-progress-bg">
                  <div class="d-flex">
                    <div class="white">{{ t('appBar.deposit') }}</div>
                    <div class="ml-auto">
                      <Font>R$ 5642</Font> / <Font color="#F9BC01">R$ 10000</Font>
                    </div>
                  </div>
                  <div>
                    <v-progress-linear v-model="depositRate" height="18" class="deposit-progress">
                    </v-progress-linear>
                  </div>
                </div>
                <div class="deposit-progress-bg">
                  <div class="d-flex">
                    <div class="white">{{ t('appBar.wager') }}</div>
                    <div class="ml-auto">
                      <Font>R$ 5642</Font> / <Font color="#623AEC">R$ 10000</Font>
                    </div>
                  </div>
                  <div>
                    <v-progress-linear v-model="depositRate" height="18" class="wager-progress">
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
            <v-list-item class="user-item" value="account" router :to="{ name: 'Account' }">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_59.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.account') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="deposit" @click="depositDialogShow">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_60.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.deposit') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="bonuses" @click="goBonusPage">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_61.svg" />
              </template>
              <v-list-item-title class="ml-2">
                {{ t('appBar.bonuses') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="game_history" @click="goGameHistoryPage">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_62.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.game_history') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="transactions" @click="goTransactionPage">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_63.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.transactions') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item refer-friend-background" value="refer_friend" @click="refferalDialogShow">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_64.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.refer_friend') }}</v-list-item-title>
              <template v-slot:append>
                <img src="@/assets/public/image/img_public_09.png" v-ripple.center class="ml-6 refer-friend-img-position"
                  width="62" />
                <p class="refer-friend-text-position">{{ t('appBar.earn_money') }}</p>
              </template>
            </v-list-item>
            <v-list-item class="user-item" value="withdraw" @click="withdrawDialogShow">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_65.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.withdraw') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item app-background" value="app">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_66.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.app') }}</v-list-item-title>
              <template v-slot:append>
                <img src="@/assets/public/image/img_public_04.png" v-ripple.center class="ml-6 app-img-position" />
                <p class="app-text-position">{{ t('appBar.install') }}</p>
              </template>
            </v-list-item>
            <v-list-item class="user-item" value="fairness">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_72.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.fairness') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="rewards">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_67.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.rewards') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="preferences">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_68.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.preferences') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item" value="statistics">
              <template v-slot:prepend>
                <img src="@/assets/public/svg/icon_public_69.svg" />
              </template>
              <v-list-item-title class="ml-2">{{ t('appBar.statistics') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item">
              <v-list-item-title>
                <div class="d-flex justify-center sign-out-btn" v-ripple.center @click="showSignoutDialog">
                  <img src="@/assets/public/svg/icon_public_70.svg" class="mr-4" />
                  {{ t('appBar.sign_out') }}
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu class="mail-menu" :scrim="true">
          <template v-slot:activator="{ props }">
            <div class="mr-4 mt-5 relative mail-height" v-bind="props" v-ripple.center v-if="mobileWidth > 600">
              <img src="@/assets/public/svg/icon_public_55.svg" />
              <p class="chat-box-text">{{ mailCount }}</p>
            </div>
          </template>
          <v-list theme="dark" bg-color="#211F31" class="px-2" width="400">
            <v-list-item class="mail-item" :value="mailItem.mail_content_1.content"
              v-for="(mailItem, mailIndex) in mailList" :key="mailIndex">
              <template v-slot:prepend>
                <img :src="mailItem.icon" />
              </template>
              <v-list-item-title class="ml-2">
                <div :class="mailItem.mail_content_1.color">{{ mailItem.mail_content_1.content }}</div>
                <div :class="mailItem.mail_content_2.color">{{ mailItem.mail_content_2.content }}</div>
              </v-list-item-title>
              <template v-slot:append>
                <div :class="mailItem.mail_rail_1.color">{{ mailItem.mail_rail_1.content }}</div>
                <div class="completion-area" :class="mailItem.mail_rail_2.color">{{ mailItem.mail_rail_2.content }}</div>
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
      <v-btn @click="openLoginBonusDialog" class="text-none">
        Login Bonus
      </v-btn>
      <v-switch :label="currentLanguage === 'en' ? 'English' : '中文'" color="success" value="success"
        @change="toggleLanguage" hide-details class="toggle-language-switch" />
      <v-btn @click="openDialog('login')" class="text-none"
        :class="[mobileVersion == 'sm' ? 'app-bar-login-btn-mobile' : 'app-bar-login-btn']">
        {{ t("main.loginButton") }}
      </v-btn>
      <v-btn @click="openDialog('signup')" class=" text-none mr-2"
        :class="[mobileVersion == 'sm' ? 'app-bar-signup-btn-mobile' : 'app-bar-signup-btn']">
        {{ t("main.signupButton") }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style lang="scss">
.logo-title-1 {
  color: #637BF9;
  font-size: 28px !important;
  font-weight: 900 !important;
  font-family: "Bauhaus 93";
}

.logo-title-2 {
  color: #F9BC01;
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
  color: #637BF9;
  font-size: 20px !important;
  font-weight: 900 !important;
  font-family: "Bauhaus 93";
}

.m-logo-title-2 {
  position: absolute;
  top: -5px;
  left: 4px;
  color: #F9BC01;
  font-size: 20px !important;
  font-weight: 900 !important;
  font-family: "Bauhaus 93";
}

.app-bar-pc {
  width: calc((100% - 620px) - 0px) !important;
  margin-left: 260px;
}

.app-bar-pc-1 {
  width: calc((100% - 260px) - 0px) !important;
  margin-left: 250px;
}

.app-bar-mobile {
  width: 100%;
}

.app-bar-none {
  display: none !important;
}

.app-bar-height {
  border-radius: 0px 0px 32px 32px !important;
  height: 68px !important;
  color: #ffffff !important;
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
  background-color: #29263c;
  margin-right: 6px;
}

// login btn mobile version
.app-bar-login-btn-mobile {
  width: 80px;
  height: 40px !important;
  background-color: #29263c;
  margin-right: 6px;
  font-size: 6px !important;
  font-weight: 400;

  .v-btn__content {
    font-weight: 600;
    font-size: 16px;
  }
}

.app-bar-signup-btn {
  width: 120px;
  height: 46px !important;
  background-color: #5524fd !important;
}

.app-bar-signup-btn-mobile {
  width: 96px;
  height: 40px !important;
  background-color: #5524fd !important;

  .v-btn__content {
    font-weight: 600;
    font-size: 16px;
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
  width: 50px;
}

.user-grade-text {
  font-weight: 800;
  font-size: 14px;
  color: #e5b991;
}

.user-card-height {
  height: 56px !important;
}

.m-user-card-height {
  height: 48px !important;
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
  border-radius: 12px !important;

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
    float: right;
    top: -16px;
    border: 9px solid #211f31;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-width: 7px;
    border-left-width: 7px;
  }
}

.mail-menu {
  margin-left: auto !important;

  .v-overlay__content {
    top: 80px !important;
    left: unset !important;
    right: 0px !important;
  }

  .v-overlay__content::after {
    content: "";
    position: absolute;
    align-self: center;
    right: 100px;
    top: -18px;
    border: 9px solid #211f31;
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
    color: #F9BC01;
  }

  .text-color-green {
    font-weight: 500;
    font-size: 12px;
    color: #01983A;
  }

  .mail-item {
    margin-top: 4px !important;
    background-color: #1C1929 !important;
    padding: 4px 8px !important;
    border-radius: 12px !important;
  }
}

.vip-background-img {
  background-image: url('@/assets/public/image/bg_public_27.png');
}

.grade-color {
  color: #E6BA93
}

.grade-text-position {
  margin-left: 34px;
}

.refer-friend-background {
  background-image: url('@/assets/public/image/bg_public_28.png');
}

.refer-friend-img-position {
  position: absolute;
  right: 14px;
  top: -20px;
}

.refer-friend-text-position {
  position: absolute;
  right: 9px;
  top: 20px;
  background: #211F31;
  border-radius: 20px;
  padding: 4px 6px;
  font-weight: 500;
  font-size: 12px;
}

.app-background {
  background-image: url('@/assets/public/image/bg_public_29.png');
}

.app-img-position {
  position: absolute;
  right: 9px;
  top: -20px;
}

.app-text-position {
  position: absolute;
  right: 20px;
  top: 20px;
  background: #211F31;
  border-radius: 20px;
  padding: 4px 13px;
  font-weight: 500;
  font-size: 12px;
}

.sign-out-btn {
  cursor: pointer;
  background: #353652;
  border-radius: 12px;
  padding: 13px;
  margin: 0px 20px;
}

.deposit-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(180deg, #F9BC01 0%, #F99301 100%);
    border-radius: 20px;
  }
}

.wager-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(180deg, #6D44F8 0%, #5726FC 100%);
    border-radius: 20px;
  }
}

.deposit-progress-bg {
  .v-progress-linear {
    background: #1C1929 !important;
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
  border: 1px solid #8664F7;
  background: linear-gradient(0deg, #5524FD 0%, #6D44F7 100%);
}

.m-deposit-icon-bg {
  margin-left: auto;
  width: 56px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 9px;
  border: 1px solid #8664F7;
  background: linear-gradient(0deg, #5524FD 0%, #6D44F7 100%);
}

.deposit-text-position {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
