<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { type GetUserData } from "@/interface/appBar";
import { refferalStore } from '@/store/refferal';
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { appBarStore } from "@/store/appBar";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useDisplay } from 'vuetify';
import { useRouter } from "vue-router";

const { setAuthModalType } = authStore();
const { setUserNavBarToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setBonusTabIndex } = bonusTransactionStore();
const { setTransactionTab } = bonusTransactionStore();
const { setRefferalDialogShow } = refferalStore();

// mobile version name
const { name, width } = useDisplay()
const { t } = useI18n();
const router = useRouter();

const drawer = ref<boolean>(false);

const depositRate = ref<number>(56);

const wagerRate = ref<number>(56);

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

const refferalDialogShow = () => {
    setRefferalDialogShow(true);
    setUserNavBarToggle(false);
}

watch(userNavBarToggle, (newValue) => {
    drawer.value = newValue;
})

watch(drawer, (newValue: boolean) => {
    setUserNavBarToggle(newValue);
    if (!newValue) {
        setMainBlurEffectShow(false);
    }
})

watch(mobileWidth, (newValue: number) => {
    if (newValue > 600) {
        setUserNavBarToggle(false);
    }
})
</script>

<template>
    <v-navigation-drawer temporary class="nav-background py-14" location="right" width="320" v-model="drawer">
        <template v-slot:prepend>
            <div :class="refferalAppBarShow ? 'user-navbar-position' : ''"></div>
        </template>
        <v-list density="compact" nav>
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
                            <div class="white text-700-12">{{ t('appBar.deposit') }}</div>
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
                            <div class="white text-700-12">{{ t('appBar.wager') }}</div>
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
                <v-list-item-title class="ml-2">{{ t('appBar.bonuses') }}</v-list-item-title>
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
            <v-list-item class="user-item refer-friend-background" height="48" value="refer_friend"
                @click="refferalDialogShow">
                <template v-slot:prepend>
                    <img src="@/assets/public/svg/icon_public_64.svg" />
                </template>
                <v-list-item-title class="ml-2">{{ t('appBar.refer_friend') }}</v-list-item-title>
                <template v-slot:append>
                    <img src="@/assets/public/image/img_public_09.png" v-ripple.center
                        class="ml-6 refer-friend-img-position" width="64" />
                    <p class="refer-friend-text-position">{{ t('appBar.earn_money') }}</p>
                </template>
            </v-list-item>
            <v-list-item class="user-item" value="withdraw" @click="withdrawDialogShow">
                <template v-slot:prepend>
                    <img src="@/assets/public/svg/icon_public_65.svg" />
                </template>
                <v-list-item-title class="ml-2">{{ t('appBar.withdraw') }}</v-list-item-title>
            </v-list-item>
            <v-list-item class="user-item app-background" value="app" height="48">
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
                    <div class="d-flex justify-center align-center sign-out-btn" v-ripple.center @click="showSignoutDialog">
                        <img src="@/assets/public/svg/icon_public_70.svg" class="mr-4" />
                        {{ t('appBar.sign_out') }}
                    </div>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style lang="scss">
.nav-background {
    background-color: #29253C !important;
    color: #7782AA !important;
    border: 2px !important;
    box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25) !important;
    top: 0px !important;
    height: 100% !important;
    will-change: auto !important;
}

.pb-20 {
    padding-bottom: 80px !important;
}

.user-navbar-position {
    margin-top: 35px;
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

.user-item {
    padding: 4px 8px !important;
    border-radius: 12px !important;

    .v-list-item-title {
        font-weight: 700;
        font-size: 14px;
        color: #7782aa;
    }
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
    color: #FFFFFF !important;
}

.app-text-position {
    color: #FFFFFF !important;
}

.deposit-progress-bg {
    .v-progress-linear {
        background: #1C1929 !important;
        box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
        border-radius: 20px !important;
    }
}
</style>
