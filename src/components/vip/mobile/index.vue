<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { appBarStore } from "@/store/appBar";
import { refferalStore } from '@/store/refferal';
import { type GetVIPData } from "@/interface/vip";
import { type GetSpinData } from "@/interface/vip";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay()

const vipWidth = ref<string>('vip-container');
const selectedTabIndex = ref<number>(0)
const depositRate = ref<number>(56);
const spinCardItem = ref<any | null>(null)
const missionCardItem = ref<any | null>(null)
const descriptionTab = ref<string>("VIP2")
const vipSlideClass = ref<string>("");

const refferalAppBarShow = computed(() => {
    const { getRefferalAppBarShow } = storeToRefs(refferalStore());
    return getRefferalAppBarShow.value;
})



const vipItems = ref<Array<GetVIPData>>([
    {
        id: 1,
        totalDepositAmount: 10000,
        currentDepositAmount: 5642,
        totalWagerAmount: 10000,
        currentWagerAmount: 5642,
        vipGrade: "VIP 1",
        vipRate: 56,
    },
    {
        id: 2,
        totalDepositAmount: 10000,
        currentDepositAmount: 5642,
        totalWagerAmount: 10000,
        currentWagerAmount: 5642,
        vipGrade: "VIP 2",
        vipRate: 56,
    },
    {
        id: 3,
        totalDepositAmount: 10000,
        currentDepositAmount: 5642,
        totalWagerAmount: 10000,
        currentWagerAmount: 5642,
        vipGrade: "VIP 3",
        vipRate: 56,
    },
    {
        id: 4,
        totalDepositAmount: 10000,
        currentDepositAmount: 5642,
        totalWagerAmount: 10000,
        currentWagerAmount: 5642,
        vipGrade: "VIP 4",
        vipRate: 56,
    },
    {
        id: 5,
        totalDepositAmount: 10000,
        currentDepositAmount: 5642,
        totalWagerAmount: 10000,
        currentWagerAmount: 5642,
        vipGrade: "VIP 5",
        vipRate: 56,
    }
])

const vipTabs = ref<Array<string>>([
    t('vip.all_bonus_text'),
    t('vip.cash_back_text'),
    t('vip.super_carousel_text'),
    t('vip.welfare_task'),
])

const vipDescriptionItems = ref([
    "VIP1",
    "VIP2",
    "VIP3",
    "VIP4",
    "VIP5",
])

const selectedVIPDescriptionIndex = ref<number>(1);

const selectedVIPTab = ref<string>(t('vip.all_bonus_text'));

const spinItems = ref<Array<GetSpinData>>([
    {
        id: 1,
        image: new URL("@/assets/vip/image/game_1046_2.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 2,
        image: new URL("@/assets/vip/image/game_1046_2.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 3,
        image: new URL("@/assets/vip/image/game_1046_1.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 4,
        image: new URL("@/assets/vip/image/game_1046_1.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 5,
        image: new URL("@/assets/vip/image/game_1046_3.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 6,
        image: new URL("@/assets/vip/image/game_1046_3.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 7,
        image: new URL("@/assets/vip/image/game_1046_2.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 8,
        image: new URL("@/assets/vip/image/game_1046_2.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 9,
        image: new URL("@/assets/vip/image/game_1046_1.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 10,
        image: new URL("@/assets/vip/image/game_1046_1.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 11,
        image: new URL("@/assets/vip/image/game_1046_3.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 12,
        image: new URL("@/assets/vip/image/game_1046_3.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 13,
        image: new URL("@/assets/vip/image/game_1046_2.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 14,
        image: new URL("@/assets/vip/image/game_1046_1.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    },
    {
        id: 15,
        image: new URL("@/assets/vip/image/game_1046_3.png", import.meta.url).href,
        title: "Free Spins Hot Fiesta",
        content: "Free Spins on our Hot Fiesta game, Good luck!"
    }
])

const vipMissionItems = ref([
    {
        type: 1,
    },
    {
        type: 2,
        totalRate: 10,
        currentRate: 3,
        missionRate: 30,
        time: "23:23:45"
    },
    {
        type: 3,
        totalRate: 10,
        currentRate: 10,
        missionRate: 100,
        time: "23:23:45"
    },
    {
        type: 4,
    },
    {
        type: 5,
    },
    {
        type: 1,
    },
    {
        type: 2,
        totalRate: 10,
        currentRate: 3,
        missionRate: 30,
        time: "23:23:45"
    },
    {
        type: 3,
        totalRate: 10,
        currentRate: 10,
        missionRate: 100,
        time: "23:23:45"
    },
    {
        type: 4,
    },
    {
        type: 5,
    },
    {
        type: 1,
    },
    {
        type: 2,
        totalRate: 10,
        currentRate: 3,
        missionRate: 30,
        time: "23:23:45"
    },
    {
        type: 3,
        totalRate: 10,
        currentRate: 10,
        missionRate: 100,
        time: "23:23:45"
    },
    {
        type: 4,
    },
    {
        type: 5,
    },
])

const spinCardHeight1 = ref<number | undefined>(556)

// spin card height when spin card item show totally
const spinCardHeight2 = ref<string | undefined>(undefined);

const vipMissionHeight1 = ref<number>(469)

// mission card height when mission card item show totally
const vipMissionHeight2 = ref<string | undefined>(undefined);

const spinCardShow = ref<boolean>(false);

const missionCardShow = ref<boolean>(false);

const selectedIndex = ref<number>(0);

const vipSlidePosition = ref<boolean>(false);

const handleCarouselChange = (index: number): void => {
    selectedIndex.value = index;
}

const nextDescription = () => {
    selectedVIPDescriptionIndex.value = (selectedVIPDescriptionIndex.value + 1) % vipDescriptionItems.value.length;
    descriptionTab.value = vipDescriptionItems.value[selectedVIPDescriptionIndex.value];
}

const prevDescription = () => {
    selectedVIPDescriptionIndex.value = (vipDescriptionItems.value.length + selectedVIPDescriptionIndex.value - 1) % vipDescriptionItems.value.length;
    descriptionTab.value = vipDescriptionItems.value[selectedVIPDescriptionIndex.value];
}

const rightBarToggle = computed(() => {
    const { getRightBarToggle } = storeToRefs(appBarStore());
    return getRightBarToggle.value;
})

const mobileWidth: any = computed(() => {
    return width.value;
})

watch(rightBarToggle, (newValue) => {
    if (mobileWidth.value > 1280) {
        if (newValue) {
            vipWidth.value = "vip-container";
        } else {
            vipWidth.value = "vip-container-1";
        }
    } else {
        vipWidth.value = "m-vip-container";
    }
})

watch(mobileWidth, (newValue: number) => {
    spinCardHeight2.value = spinCardItem.value?.$el?.clientHeight + 60;
    vipMissionHeight2.value = missionCardItem.value?.$el?.clientHeight + 20;
})

watch(selectedVIPTab, (newValue: string) => {
    // console.log(newValue)
}, { deep: true })

watch(vipSlidePosition, (newValue: boolean) => {
    if (newValue && refferalAppBarShow.value) {
        vipSlideClass.value = "m-vip-slide-position"
    } else if (newValue && !refferalAppBarShow.value) {
        vipSlideClass.value = "m-vip-slide-position-1"
    } else {
        vipSlideClass.value = "";
    }
})

watch(refferalAppBarShow, (newValue: boolean) => {
    if (vipSlidePosition.value && newValue) {
        vipSlideClass.value = "m-vip-slide-position"
    } else if (vipSlidePosition.value && !newValue) {
        vipSlideClass.value = "m-vip-slide-position-1"
    } else {
        vipSlideClass.value = "";
    }
})

const cashbackElement = ref<any | null>(null);

const slideElement = ref<any | null>(null);

const rewardElement = ref<any | null>(null);

const spinElement = ref<any | null>(null);

const vipElement = ref<any | null>(null);

const benefitElement = ref<any | null>(null);

const handleWindowScroll = () => {

    const cashPosition = cashbackElement.value?.getBoundingClientRect().top;

    const slidePosition = slideElement.value?.getBoundingClientRect().top;

    const rewardPosition = rewardElement.value?.getBoundingClientRect().top;

    const spinPosition = spinElement.value?.getBoundingClientRect().top;

    const vipPosition = vipElement.value?.getBoundingClientRect().top;

    const benefitPosition = benefitElement.value?.getBoundingClientRect().top;

    if (slidePosition < 116) {
        vipSlidePosition.value = true;
    }

    if (!isMouseClick.value) {

        tabSelect.value = false;

        if (rewardPosition < 170) {
            selectedVIPTab.value = t('vip.all_bonus_text');
        }

        if (cashPosition < 170) {
            selectedVIPTab.value = t('vip.cash_back_text');
        }

        if (spinPosition < 170) {
            selectedVIPTab.value = t('vip.super_carousel_text');
        }

        if (vipPosition < 170) {
            selectedVIPTab.value = t('vip.welfare_task');
        }

        if (benefitPosition < 170) {
            selectedVIPTab.value = t('vip.all_bonus_text');
        }

        if (window.scrollY < 1) {
            vipSlidePosition.value = false;
        }

    }
}

const tabSelect = ref(false);

const isMouseClick = ref(false);

const handleVIPTab = () => {
    isMouseClick.value = true;
    vipSlidePosition.value = true;
    tabSelect.value = true;
    const offset = 174;
    const bodyRect = document.body.getBoundingClientRect().top;
    setTimeout(() => {
        switch (selectedVIPTab.value) {
            case t('vip.all_bonus_text'):
                // rewardElement.value.scrollIntoView({
                //     behavior: 'smooth',
                //     block: 'start',
                //     inline: 'nearest',
                // });
                const rewardRect = rewardElement.value.getBoundingClientRect().top;
                const rewardPosition = rewardRect - bodyRect - offset;
                window.scrollTo({
                    top: rewardPosition,
                    behavior: 'smooth'
                });
                break;
            case t('vip.cash_back_text'):
                // cashbackElement.value.scrollIntoView({
                //     behavior: 'smooth',
                //     block: 'start',
                //     inline: 'nearest',
                // });
                const cashRect = cashbackElement.value.getBoundingClientRect().top;
                const cashPosition = cashRect - bodyRect - offset;
                window.scrollTo({
                    top: cashPosition,
                    behavior: 'smooth'
                });
                break;
            case t('vip.super_carousel_text'):
                // spinElement.value.scrollIntoView({
                //     behavior: 'smooth',
                //     block: 'start',
                //     inline: 'nearest',
                // });
                const spinRect = spinElement.value.getBoundingClientRect().top;
                const spinPosition = spinRect - bodyRect - offset;
                window.scrollTo({
                    top: spinPosition,
                    behavior: 'smooth'
                });
                break;
            case t('vip.welfare_task'):
                // vipElement.value.scrollIntoView({
                //     behavior: 'smooth',
                //     block: 'start',
                //     inline: 'nearest',
                // });
                const vipRect = vipElement.value.getBoundingClientRect().top;
                const vipPosition = vipRect - bodyRect - offset;
                window.scrollTo({
                    top: vipPosition,
                    behavior: 'smooth'
                });
                break;
        }

    }, 10);

    setTimeout(() => {
        isMouseClick.value = false;
    }, 2000)
}

window.addEventListener('scroll', handleWindowScroll);

onMounted(() => {
    spinCardHeight2.value = spinCardItem.value?.$el?.clientHeight + 60;
    vipMissionHeight2.value = missionCardItem.value?.$el?.clientHeight + 20;
})
</script>

<template>
    <div class="m-vip-container">
        <div class="m-vip-body">

            <Carousel :itemsToShow="1.2" :wrapAround="true" :transition="500">
                <Slide v-for="(item, index) in vipItems" :key="index">
                    <div class="m-vip-carousel-body">
                        <div class="text-800-16 white text-center mt-2">{{ t('vip.slider.title_text') }}</div>
                        <v-row class="full-height mx-2">
                            <v-col cols="3" class="text-center">
                                <img src="@/assets/vip/image/img_vip_02.png" width="49" />
                                <p class="text-800-14 yellow">{{ item.vipGrade }}</p>
                            </v-col>
                            <v-col cols="9">
                                <div class="deposit-progress-bg">
                                    <div class="d-flex mx-4 align-center">
                                        <div class="text-500-9 white">{{ t('appBar.deposit') }}</div>
                                        <div class="ml-auto">
                                            <Font class="text-800-8 text-gray">R$ {{ item.currentDepositAmount }} / </Font>
                                            <Font color="#F9BC01" class="text-800-8">R$ {{ item.totalDepositAmount }}</Font>
                                        </div>
                                    </div>
                                    <div>
                                        <v-progress-linear v-model="item.vipRate" height="16" class="deposit-progress">
                                        </v-progress-linear>
                                    </div>
                                </div>
                                <div class="deposit-progress-bg mt-4">
                                    <div class="d-flex mx-4 align-center">
                                        <div class="text-500-9 white">{{ t('appBar.wager') }}</div>
                                        <div class="ml-auto">
                                            <Font class="text-800-8 text-gray">R$ {{ item.currentWagerAmount }} / </Font>
                                            <Font color="#623AEC" class="text-800-8">R$ {{ item.totalWagerAmount }}</Font>
                                        </div>
                                    </div>
                                    <div>
                                        <v-progress-linear v-model="depositRate" height="16" class="wager-progress">
                                        </v-progress-linear>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </Slide>
            </Carousel>

            <div class="mt-4" :class="vipSlideClass" ref="slideElement" @click="handleVIPTab">
                <v-slide-group v-model="selectedVIPTab" show-arrows>
                    <v-slide-group-item v-for="(item, index) in vipTabs" :key="index" v-slot="{ isSelected, toggle }"
                        :value="item">
                        <v-btn class="ma-2 text-none m-transaction-tab-btn" :class="isSelected ? 'black' : 'text-gray'"
                            :color="isSelected ? '#32CFEC' : 'transparent'" @click="toggle"
                            :width="mobileWidth < 600 ? 100 : 150">
                            {{ item }}
                        </v-btn>
                    </v-slide-group-item>
                </v-slide-group>
            </div>

            <!------------------------- vip reward ----------------------------->
            <div class="reward-body mx-2" ref="rewardElement" :class="tabSelect ? 'mt-15' : 'mt-2'">
                <div class="text-800-14 white pt-4 mx-4">{{ t('vip.reward_text') }} {{ vipItems[selectedIndex].vipGrade }}
                </div>
                <v-row class="mt-2 justify-center pb-2 mx-2">
                    <v-col cols="6" md="3" class="d-flex justify-center pa-1">
                        <div class="m-reward-card text-center">
                            <div class="text-800-10 yellow pt-4">{{ t('vip.reward_card_1.daily_free_bonus_text') }}</div>
                            <div class="mt-4">
                                <img src="@/assets/public/image/img_public_02.png" width="40" />
                            </div>
                            <div class="mt-4 text-600-9 white">
                                {{ t('vip.reward_card_1.text_1') }}
                            </div>
                            <div class="mt-2 mx-4">
                                <v-btn class="text-none button-dark m-button-dark" width="-webkit-fill-available"
                                    height="28px">
                                    {{ t('vip.receive_btn_text') }}
                                </v-btn>
                            </div>
                            <div class="mt-2 text-400-9 white">
                                {{ t('vip.reward_card_1.text_2') }}<Font class="yellow">21:23:22</Font>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="6" md="3" class="d-flex justify-center pa-1">
                        <div class="m-reward-card text-center">
                            <div class="text-800-10 yellow pt-4">{{ t('vip.reward_card_2.vip_week_gift_text') }}</div>
                            <div class="mt-4 d-flex justify-center align-center">
                                <img src="@/assets/public/image/img_public_02.png" width="40" />
                                <img src="@/assets/public/image/img_public_09.png" class="ml-4" width="39" height="27" />
                            </div>
                            <div class="mt-2 text-600-9 white">
                                {{ t('vip.reward_card_2.text_1') }}
                            </div>
                            <div class="text-600-9 white">
                                {{ t('vip.reward_card_2.text_2') }}
                            </div>
                            <div class="mt-2 mx-4">
                                <v-btn class="text-none button-dark m-button-dark" width="-webkit-fill-available"
                                    height="28px">
                                    {{ t('vip.receive_btn_text') }}
                                </v-btn>
                            </div>
                            <div class="mt-2 text-400-9 white">
                                {{ t('vip.reward_card_2.text_3') }}<Font class="yellow">3</Font>{{
                                    t('vip.reward_card_2.text_4') }}
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="6" md="3" class="d-flex justify-center pa-1">
                        <div class="m-reward-card text-center">
                            <div class="text-800-10 yellow pt-4">{{ t('vip.reward_card_3.vip_month_gift_text') }}</div>
                            <div class="mt-4 d-flex justify-center align-center">
                                <img src="@/assets/public/image/img_public_02.png" width="40" />
                                <img src="@/assets/public/image/img_public_09.png" class="ml-4" width="39" height="27" />
                            </div>
                            <div class="mt-2 text-600-9 white">
                                {{ t('vip.reward_card_3.text_1') }}
                            </div>
                            <div class="text-600-9 white">
                                {{ t('vip.reward_card_3.text_2') }}
                            </div>
                            <div class="mt-2 mx-4">
                                <v-btn class="text-none button-dark m-button-dark" width="-webkit-fill-available"
                                    height="28px">
                                    {{ t('vip.receive_btn_text') }}
                                </v-btn>
                            </div>
                            <div class="mt-2 text-400-9 white">
                                {{ t('vip.reward_card_3.text_3') }}<Font class="yellow">3</Font>{{
                                    t('vip.reward_card_3.text_4') }}
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="6" md="3" class="d-flex justify-center pa-1">
                        <div class="m-reward-card text-center">
                            <div class="text-800-10 yellow pt-4">{{ t('vip.reward_card_4.vip_upgrage_gift_text') }}</div>
                            <div class="mt-4 d-flex justify-center align-center">
                                <img src="@/assets/public/image/img_public_02.png" width="40" />
                                <img src="@/assets/public/image/img_public_09.png" class="ml-4" width="39" height="27" />
                            </div>
                            <div class="mt-2 text-600-9 white">
                                {{ t('vip.reward_card_4.text_1') }}
                            </div>
                            <div class="text-600-9 white">
                                {{ t('vip.reward_card_4.text_2') }}
                            </div>
                            <div class="mt-2 mx-4">
                                <v-btn class="text-none button-dark m-button-dark" width="-webkit-fill-available"
                                    height="28px">
                                    {{ t('vip.receive_btn_text') }}
                                </v-btn>
                            </div>
                            <div class="mt-2 text-400-9 white">
                                {{ t('vip.reward_card_4.text_3') }}
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>

            <!---------------------------- cashback bonus --------------------------------->
            <div class="m-cashback-bonus-body mx-2 pb-4" ref="cashbackElement" :class="tabSelect ? 'mt-15' : 'mt-6'">
                <div class="text-800-14 white pt-4 mx-3 d-flex">
                    <p style="width: 110px;">
                        {{ t('vip.cashback_body.text_1') }}
                    </p>
                    <v-btn class="text-none button-yellow ml-auto relative" height="49px" width="160px">
                        <img src="@/assets/public/image/img_public_10.png" class="m-cashback-btn-img" width="39"
                            height="48" />
                        {{ t('vip.cashback_body.text_2') }}
                    </v-btn>
                </div>
                <v-card theme="dark" color="#1C1929" class="mt-4 mx-3" style="border-radius: 8px">
                    <div class="pa-2">
                        <v-row class="ma-0 pa-0 align-center">
                            <v-col cols="4">
                                <p class="text-500-12 white">
                                    {{ t('vip.cashback_body.text_3') }} {{ vipItems[selectedIndex].vipGrade }}
                                </p>
                            </v-col>
                            <v-col cols="8" class="d-flex">
                                <p class="text-600-12 text-gray ml-auto" style="width: 115px;">{{
                                    t('vip.cashback_body.text_4') }}</p>
                                <img src="@/assets/public/svg/icon_public_22.svg" class="ml-2" width="16" />
                            </v-col>
                        </v-row>
                        <v-row class="pa-0 ma-0">
                            <v-col cols="6" md="3" class="pa-1">
                                <v-card theme="dark" color="#29253C" class="text-center pa-2 relative" height="90"
                                    style="border-radius: 4px;">
                                    <img src="@/assets/public/image/img_public_22.png" class="cashback-card-img" width="90"
                                        height="85" />
                                    <p class="text-600-10 white ">{{ t('vip.cashback_body.text_11') }}</p>
                                    <p class="text-800-20 color-04D981 mt-2">0.4%</p>
                                    <p class="text-700-10 text-gray mt-2">{{ t('vip.cashback_body.text_5') }} 0.5%</p>
                                </v-card>
                            </v-col>
                            <v-col cols="6" md="3" class="pa-1">
                                <v-card theme="dark" color="#29253C" class="text-center pa-2 relative" height="90"
                                    style="border-radius: 4px;">
                                    <img src="@/assets/public/image/img_public_22.png" class="cashback-card-img" width="90"
                                        height="85" />
                                    <p class="text-600-10 white ">{{ t('vip.cashback_body.text_11') }}</p>
                                    <p class="text-800-20 color-04D981 mt-2">0.5%</p>
                                    <p class="text-700-10 text-gray mt-2">{{ t('vip.cashback_body.text_5') }} 0.6%</p>
                                </v-card>
                            </v-col>
                            <v-col cols="6" md="3" class="pa-1">
                                <v-card theme="dark" color="#29253C" class="text-center pa-2 relative" height="90"
                                    style="border-radius: 4px;">
                                    <img src="@/assets/public/image/img_public_22.png" class="cashback-card-img" width="90"
                                        height="85" />
                                    <p class="text-600-10 white ">{{ t('vip.cashback_body.text_11') }}</p>
                                    <p class="text-800-20 color-04D981 mt-2">0.5%</p>
                                    <p class="text-700-10 text-gray mt-2">{{ t('vip.cashback_body.text_5') }} 0.6%</p>
                                </v-card>
                            </v-col>
                            <v-col cols="6" md="3" class="pa-1">
                                <v-card theme="dark" color="#29253C" class="text-center pa-2 relative" height="90"
                                    style="border-radius: 4px;">
                                    <img src="@/assets/public/image/img_public_22.png" class="cashback-card-img" width="90"
                                        height="85" />
                                    <p class="text-600-10 white ">{{ t('vip.cashback_body.text_11') }}</p>
                                    <p class="text-800-20 color-04D981 mt-2">0.4%</p>
                                    <p class="text-700-10 text-gray mt-2">{{ t('vip.cashback_body.text_5') }} 0.5%</p>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>
                <v-card theme="dark" color="#1C1929" class="mt-4 mx-3" style="border-radius: 8px;">
                    <div class="pa-4">
                        <v-row class="pa-0 mx-0 align-center">
                            <v-col cols="12">
                                <p class="text-700-12 white">{{ t('vip.cashback_body.text_7') }}</p>
                                <p class="text-700-16 yellow mt-2">R$ 12345678910</p>
                            </v-col>
                            <v-divider></v-divider>
                            <v-col cols="12">
                                <p class="text-700-12 white">{{ t('vip.cashback_body.text_8') }}</p>
                                <p class="text-700-16 yellow mt-2">R$ 12345678910</p>
                            </v-col>
                            <v-col cols="12" md="4" class="text-right">
                                <v-btn class="text-none button-yellow ml-auto relative" height="49px"
                                    width="-webkit-fill-available">
                                    <div class="cashback-bonus-help-img">
                                        <img src="@/assets/public/svg/icon_public_76.svg" />
                                    </div>
                                    <div style="width: 150px; white-space: normal; letter-spacing: normal;"
                                        class="text-800-14 ml-4">
                                        {{ t('vip.cashback_body.text_9') }}
                                        <span class="text-600-14">{{ t('vip.cashback_body.text_10') }}</span>
                                    </div>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>
            </div>
            <!-------------------------- My Super Spin ---------------------------------->

            <div class="m-super-spin-body relative mt-6 mx-2 pb-2" ref="spinElement" :class="tabSelect ? 'mt-15' : 'mt-6'">
                <v-row class="mx-2 d-flex">
                    <v-col cols="12" class="text-800-14 white">
                        {{ t('vip.super_spin_body.text_1') }}
                    </v-col>
                    <v-col cols="12" class="px-1">
                        <v-card theme="dark" color="#1C1929" class="ml-auto d-flex align-center" height="49">
                            <v-row class="align-center ma-0 pa-0">
                                <v-col cols="5" class="ma-0 pa-0">
                                    <p class="text-600-12 white text-center px-4">
                                        {{ t('vip.super_spin_body.text_2') }}
                                    </p>
                                </v-col>
                                <v-col cols="2" class="ma-0 pa-0">
                                    <p class="text-800-20 white">
                                        3
                                    </p>
                                </v-col>
                                <v-col cols="5" class="ma-0 pa-0">
                                    <v-btn class="text-none button-yellow m-spin-now-btn " height="49px" width="-webkit-fill-available">
                                        {{ t('vip.super_spin_body.text_3') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <div color="#1C1929" class="ma-2 pa-4 spin-game-card box"
                    :style="{ height: spinCardShow ? spinCardHeight2 + 'px' : spinCardHeight1 + 'px' }">
                    <p class="text-500-13 white">{{ t('vip.super_spin_body.text_4') }}</p>
                    <v-row class="mt-4 justify-center align-center" ref="spinCardItem">
                        <v-col cols="6" md="3" lg="2" v-for="(item, index) in spinItems" :key="index"
                            class="text-center d-flex justify-center pa-1">
                            <v-card theme="dark" color="#29253C" class="py-6" style="border-radius: 6px;">
                                <img :src="item.image" />
                                <p class="text-600-12 white mt-4">{{ item.title }}</p>
                                <p class="text-500-10 text-gray mt-2 mx-2">{{ item.content }}</p>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
                <v-btn class="text-none button-1C1929 m-spin-more-btn-position" width="140px" height="40px"
                    style="transform: translateX(-50%) !important;" @click="spinCardShow = !spinCardShow">
                    {{ t('vip.super_spin_body.text_5') }}
                    <v-icon class="mdi-down-position">mdi-chevron-down</v-icon>
                </v-btn>
            </div>

            <!------------------------   My VIP Mission -------------------------------->

            <div class="vip-mission-body relative mt-6 mx-2 pb-2" ref="vipElement" :class="tabSelect ? 'mt-15' : 'mt-6'">
                <div class="text-800-14 white pt-4 mx-4 d-flex">
                    {{ t('vip.vip_mission_body.text_1') }}
                    <p class="ml-auto">{{ t('vip.vip_mission_body.text_2') }} <Font class="text-800-20">0</Font> {{
                        t('vip.vip_mission_body.text_3') }}</p>
                </div>
                <div color="#1C1929" class="ma-2 pa-4 spin-game-card box"
                    :style="{ height: missionCardShow ? vipMissionHeight2 + 'px' : vipMissionHeight1 + 'px' }">
                    <v-row class="justify-center align-center" ref="missionCardItem">
                        <v-col cols="6" v-for="(item, index) in vipMissionItems" :key="index"
                            class="text-center d-flex justify-center pa-1">
                            <v-card theme="dark" color="#29253C" class="py-6" v-if="item.type == 1" height="220"
                                style="width: 100%; border-radius: 6px;">
                                <img src="@/assets/public/image/img_public_11.png" width="50" />
                                <p class="text-500-10 text-gray mt-2">{{ t('vip.vip_mission_body.text_4') }}</p>
                                <p class="text-600-10 white mt-1">{{ t('vip.vip_mission_body.text_5') }}</p>
                                <v-btn class="text-none button-bright m-mission-btn-1 mt-13 mx-2" height="28px"
                                    width="-webkit-fill-available">
                                    {{ t('vip.vip_mission_body.text_6') }}
                                </v-btn>
                            </v-card>
                            <v-card theme="dark" color="#29253C" class="py-6" height="220"
                                style="width: 100%; border-radius: 6px;" v-if="item.type == 2">
                                <div class="m-mission-ongoing-position text-600-8 white align-center d-flex justify-center">
                                    {{ t('vip.vip_mission_body.text_7') }}
                                </div>
                                <div class="m-mission-time-position text-600-8 white">
                                    {{ item.time }}
                                </div>
                                <img src="@/assets/public/image/img_public_11.png" width="50" />
                                <p class="text-500-10 text-gray mt-2">{{ t('vip.vip_mission_body.text_4') }}</p>
                                <p class="text-600-10 white mt-1">{{ t('vip.vip_mission_body.text_8') }}</p>
                                <div class="mission-progress-bg mx-4 mt-6">
                                    <v-progress-linear v-model="item.missionRate" height="10" class="mission-progress">
                                        <div class="text-500-10 white">{{ item.currentRate }} / {{ item.totalRate }}</div>
                                    </v-progress-linear>
                                </div>
                                <v-btn class="text-none button-purple m-mission-btn-2 mt-4 mx-2" height="28px"
                                    width="-webkit-fill-available">
                                    {{ t('vip.vip_mission_body.text_11') }}
                                </v-btn>
                            </v-card>
                            <v-card theme="dark" class="py-6 mission-card-bg-3" height="220"
                                style="width: 100%; border-radius: 6px;" v-if="item.type == 3">
                                <div class="m-mission-ongoing-position text-600-8 white align-center d-flex justify-center">
                                    {{ t('vip.vip_mission_body.text_7') }}
                                </div>
                                <div class="m-mission-time-position text-600-8 white">
                                    {{ item.time }}
                                </div>
                                <img src="@/assets/public/image/img_public_11.png" width="50" />
                                <p class="text-500-10 text-gray mt-2">{{ t('vip.vip_mission_body.text_4') }}</p>
                                <p class="text-600-10 white mt-1">{{ t('vip.vip_mission_body.text_8') }}</p>
                                <p class="text-600-10 white mt-1">{{ t('vip.vip_mission_body.text_10') }}</p>
                                <div class="mission-progress-bg mx-4 mt-3">
                                    <v-progress-linear v-model="item.missionRate" height="10" class="mission-progress">
                                        <div class="text-500-10 white">{{ item.currentRate }} / {{ item.totalRate }}</div>
                                    </v-progress-linear>
                                </div>
                                <v-btn class="text-none button-bright m-mission-btn-1 mt-3 mx-2" height="28px"
                                    width="-webkit-fill-available">
                                    <img src="@/assets/public/image/img_public_14.png" class="m-mission-gift-img-position"
                                        width="34" />
                                    {{ t('vip.vip_mission_body.text_12') }}
                                </v-btn>
                            </v-card>
                            <v-card theme="dark" color="#29253C" class="py-6" height="220"
                                style="width: 100%; border-radius: 6px;" v-if="item.type == 4">
                                <div
                                    class="m-mission-completed-position text-600-8 white align-center d-flex justify-center">
                                    {{ t('vip.vip_mission_body.text_2') }}
                                </div>
                                <img src="@/assets/public/image/img_public_11.png" width="50" />
                                <p class="text-500-10 text-gray mt-2">{{ t('vip.vip_mission_body.text_4') }}</p>
                                <p class="text-600-10 white mt-1">{{ t('vip.vip_mission_body.text_5') }}</p>
                                <p class="text-500-10 text-gray mt-7">{{ t('vip.vip_mission_body.text_13') }}</p>
                                <v-btn class="text-none button-dark m-mission-btn-3 mt-3 mx-2" height="28px"
                                    width="-webkit-fill-available">
                                    {{ t('vip.vip_mission_body.text_2') }}
                                </v-btn>
                            </v-card>
                            <v-card theme="dark" color="#29253C" class="py-6" height="220"
                                style="width: 100%; border-radius: 6px;" v-if="item.type == 5">
                                <img src="@/assets/public/image/img_public_13.png" width="50" />
                                <p class="text-500-10 text-gray mt-2">{{ t('vip.vip_mission_body.text_4') }}</p>
                                <p class="text-600-10 white mt-1">{{ t('vip.vip_mission_body.text_5') }}</p>
                                <p class="text-600-10 white mt-1">{{ t('vip.vip_mission_body.text_10') }}</p>
                                <v-btn class="text-none button-dark m-mission-btn-3 mt-8 mx-2" height="28px"
                                    width="-webkit-fill-available">
                                    <img src="@/assets/public/svg/icon_public_77.svg"
                                        class="m-mission-warning-img-position" />
                                    {{ t('vip.vip_mission_body.text_15') }}
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
                <v-btn class="text-none button-1C1929 m-spin-more-btn-position" width="140px" height="40px"
                    style="transform: translateX(-50%) !important; border: 1px solid #923D71;" @click="missionCardShow = !missionCardShow">
                    {{ t('vip.super_spin_body.text_5') }}
                    <v-icon class="mdi-down-position">mdi-chevron-down</v-icon>
                </v-btn>
            </div>

            <!--------------------------    VIP Benifit Description ---------------------->
            <div class="m-benifit-description-body mt-6 mx-2 pb-2 relative" ref="benefitElement">
                <div class="m-benifit-description-header pa-4 text-700-16 white">
                    {{ t('vip.benifit_description_body.text_1') }}
                </div>
                <v-window v-model="descriptionTab">
                    <v-window-item v-for="(item, index) in vipDescriptionItems" :key="index" :value="item">
                        <v-row class="mt-2 mx-1">
                            <v-col cols="6" class="ma-0 pa-1">
                                <p class="text-700-12 white ml-2">{{ t('vip.benifit_description_body.text_2') }}</p>
                                <v-card theme="dark" color="#1C1929" class="mt-2" height="140" style="border-radius: 8px;">
                                    <v-row class="mx-2 my-0 pa-0">
                                        <v-col cols="12">
                                            <p class="text-500-12 text-gray">
                                                {{ t('vip.benifit_description_body.text_4') }}
                                            </p>
                                            <p class="text-700-16 yellow mt-1">R$ 100</p>
                                        </v-col>
                                        <v-divider></v-divider>
                                        <v-col cols="12">
                                            <p class="text-500-12 text-gray">
                                                {{ t('vip.benifit_description_body.text_5') }}
                                            </p>
                                            <p class="text-700-16 yellow mt-1">R$ 800</p>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                            <v-col cols="6" class="ma-0 pa-1">
                                <p class="text-700-12 white ml-2">{{ t('vip.benifit_description_body.text_3') }}</p>
                                <v-card theme="dark" color="#1C1929" class="mt-2" height="140" style="border-radius: 8px;">
                                    <v-row class="mx-2 my-0 pa-0 align-center">
                                        <v-col cols="12">
                                            <p class="text-500-12 text-gray">
                                                {{ t('vip.benifit_description_body.text_5') }}
                                            </p>
                                            <p class="text-700-16 yellow mt-1">R$ 800</p>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="mt-3 mx-0">
                            <v-col cols="12" class="ma-0 pa-2">
                                <p class="text-700-12 white ml-2">{{ t('vip.benifit_description_body.text_6') }}</p>
                                <v-card theme="dark" color="#1C1929" class="mt-2">
                                    <v-row class="mx-2 my-0 pa-0 align-center justify-center">
                                        <v-col cols="6">
                                            <div class="benifit-description-border">
                                                <p class="text-500-12 text-gray">
                                                    {{ t('vip.benifit_description_body.text_7') }}
                                                </p>
                                                <p class="text-700-16 yellow mt-1">R$ 10</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6">
                                            <div class="d-flex justify-center">
                                                <div>
                                                    <p class="text-500-12 text-gray">
                                                        {{ t('vip.benifit_description_body.text_8') }}
                                                    </p>
                                                    <p class="text-700-16 yellow mt-1">R$ 10 <span class="text-500-12">+ 1 free spin</span></p>
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col cols="12">
                                            <p class="text-500-12 text-gray">
                                                {{ t('vip.benifit_description_body.text_9') }}
                                            </p>
                                            <p class="text-700-16 yellow mt-1">R$ 30 <span class="text-500-12">+ 5 free spin</span></p>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2 mx-0">
                            <v-col cols="12" class="ma-0 pa-2">
                                <p class="text-700-12 white ml-2">{{ t('vip.benifit_description_body.text_10') }}</p>
                                <v-card theme="dark" color="#1C1929" class="mt-2">
                                    <v-row class="mx-2 my-0 pa-0 align-center justify-center">
                                        <v-col cols="6">
                                            <div class="benifit-description-border">
                                                <p class="text-500-12 text-gray">
                                                    {{ t('vip.benifit_description_body.text_11') }}
                                                </p>
                                                <p class="text-700-16 yellow mt-1">0.4%</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6">
                                            <div class="d-flex justify-center">
                                                <div>
                                                    <p class="text-500-12 text-gray">
                                                        {{ t('vip.benifit_description_body.text_12') }}
                                                    </p>
                                                    <p class="text-700-16 yellow mt-1">0.5%</p>
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col cols="6">
                                            <div class="benifit-description-border">
                                                <div>
                                                    <p class="text-500-12 text-gray">
                                                        {{ t('vip.benifit_description_body.text_13') }}
                                                    </p>
                                                    <p class="text-700-16 yellow mt-1">0.5%</p>
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" class="d-flex justify-center">
                                            <div>
                                                <p class="text-500-12 text-gray">
                                                    {{ t('vip.benifit_description_body.text_14') }}
                                                </p>
                                                <p class="text-700-16 yellow mt-1">0.4%</p>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2 mx-0">
                            <v-col cols="12">
                                <p class="text-700-12 white ml-2">{{ t('vip.benifit_description_body.text_17') }}</p>
                                <v-card theme="dark" color="#1C1929" class="mt-2">
                                    <v-row class="mx-2 my-0 pa-0 align-center justify-center">
                                        <v-col cols="7">
                                            <div class="benifit-description-border">
                                                <p class="text-500-12 text-gray">
                                                    {{ t('vip.benifit_description_body.text_15') }}
                                                </p>
                                                <p class="text-700-16 yellow mt-1">100BRL<span class="text-500-12">/ Monthly</span></p>
                                            </div>
                                        </v-col>
                                        <v-col cols="5" class="d-flex justify-center">
                                            <div>
                                                <p class="text-500-12 text-gray">
                                                    {{ t('vip.benifit_description_body.text_16') }}
                                                </p>
                                                <p class="text-700-16 yellow mt-1">2.5%</p>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-window-item>
                </v-window>
                <div class="d-flex align-center justify-center"
                    :class="mobileWidth < 960 ? 'mt-2 mr-4 justify-end' : 'benifit-description-pagination'">
                    <v-btn class="button-black description-prev-btn" theme="dark" icon @click="prevDescription" width="28" height="28">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <p class="text-700-16 white mx-4">{{ descriptionTab }}</p>
                    <v-btn class="button-black description-prev-btn" theme="dark" icon @click="nextDescription" width="28" height="28">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </div>
            </div>

            <!----------------------------   footer-body    ------------------------------------>
            <div class="m-vip-footer-body relative mt-6 mx-2">
                <v-row class="ma-0 pa-0 align-center justify-center">
                    <v-col cols="12" md="3">
                        <p class="m-vip-footer-title text-center"> {{ t('vip.footer_body.text_1') }}</p>
                    </v-col>
                    <v-col cols="12" md="6">
                        <p class="m-vip-footer-content text-center"> {{ t('vip.footer_body.text_2') }}</p>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-btn class="text-none button-yellow m-vip-footer-btn" width="-webkit-fill-available"
                            height="49px">
                            <div class="m-vip-telegram-img mr-4">
                                <img src="@/assets/public/svg/icon_public_78.svg" class="mr-1" />
                            </div>
                            {{ t('vip.footer_body.text_3') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.m-vip-container {
    margin: -47px 0px;
    background: #211F31;
    padding-bottom: 20px;
    border-radius: 8px;
}

.m-vip-body {
    padding-top: 44px;

    .v-slide-group {
        background: #1C1929 !important;
    }

    .v-slide-group__content {
        justify-content: center !important;
    }

    .v-btn__content {
        // font-size: 12px;
    }

    .v-slide-group__prev,
    .v-slide-group__next {
        color: white !important;
        display: none;
    }
}


.m-vip-carousel-body {
    width: 100%;
    height: 163px;
    border-radius: 8px;
    background: linear-gradient(179deg, #4A32AA 0%, #29263F 100%);
}

.reward-body {
    border-radius: 8px;
    background: #29253C;
}

.m-reward-card {
    // width: 148px;
    // height: 202px;
    width: 100%;
    height: 202px;
    flex-shrink: 0;
    border-radius: 18px;
    background: linear-gradient(0deg, #275798 0%, #9419F0 100%);
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}

.m-cashback-bonus-body {
    border-radius: 8px;
    background: linear-gradient(90deg, #29263F 0%, #4A32AA 100%);

    .v-btn__content {
        margin-left: 10px;
        color: #000;
        font-size: 14px;
        font-family: Inter;
        font-weight: 700;
        letter-spacing: normal;
    }
}

.m-cashback-btn-img {
    position: absolute;
    top: -2px;
    left: -20px;
}

.cashback-card-img {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
}

.cashback-card-border {
    border-right: 1px solid #7782AA
}

.cashback-bonus-help-img {
    padding: 8px;
    border-radius: 50%;
    background: #000;
    width: 40px;
    height: 40px;
}

.m-super-spin-body {
    border-radius: 8px;
    background: linear-gradient(90deg, #29263F 0%, #67A22C 100%);

    .v-btn__content {
        color: #000;
        font-size: 16px;
        font-family: Inter;
        font-weight: 800;
        letter-spacing: normal;
    }
}

.m-spin-more-btn-position {
    position: absolute !important;
    bottom: -16px;
    left: 50%;

    .v-btn__content {
        color: var(--white-bg, #FFF);
        text-align: center;
        font-size: 14px;
        font-family: Inter;
        font-weight: 600;
        letter-spacing: normal;
    }
}

.mdi-down-position {
    position: absolute !important;
    top: 10px;
    right: 10px;
}

.spin-game-card {
    /* Set the transition properties */
    transition: height 0.3s ease-out;
    border-radius: 8px;
    background: #1C1929;
    overflow: hidden;
}

.vip-mission-body {
    border-radius: 8px;
    background: linear-gradient(90deg, #29263F 0%, #D84693 100%);
}

.m-mission-btn-1 {
    .v-btn__content {
        color: #000;
        font-size: 10px;
        font-family: Inter;
        font-weight: 700;
    }
}

.m-mission-btn-2 {
    .v-btn__content {
        color: #6842EC;
        text-align: center;
        font-size: 10px;
        font-family: Inter;
        font-weight: 700;
        letter-spacing: normal;
    }
}

.m-mission-btn-3 {
    .v-btn__content {
        color: #FFF;
        text-align: center;
        font-size: 10px;
        font-family: Inter;
        font-weight: 700;
        letter-spacing: normal;
    }
}

.m-mission-ongoing-position {
    position: absolute;
    top: 12px;
    left: 0;
    width: 70px;
    height: 20px;
    border-radius: 0px 6px 6px 0px;
    background: #4932A9;
}

.m-mission-completed-position {
    position: absolute;
    top: 12px;
    left: 0;
    width: 70px;
    height: 20px;
    border-radius: 0px 6px 6px 0px;
    background: #67A12C;
}

.m-mission-time-position {
    position: absolute;
    top: 12px;
    right: 7px;
}

.mission-progress {
    .v-progress-linear__determinate {
        background: linear-gradient(180deg, #F9BC01 0%, #F99301 100%);
        border-radius: 20px;
    }
}

.mission-progress-bg {
    .v-progress-linear {
        border-radius: 8px;
        background: #1C1929 !important;
        /* Text Box */
        box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
    }

    .v-progress-linear__background {
        border-radius: 8px;
        background: #1C1929 !important;
        /* Text Box */
        box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
    }
}

.mission-card-bg-3 {
    background: linear-gradient(0deg, #275798 0%, #9419F0 100%) !important;
}

.m-mission-gift-img-position {
    position: absolute;
    top: -5px;
    left: -9px;
}

.m-benifit-description-body {
    border-radius: 8px;
    background: #29253C;

    .m-benifit-description-header {
        border-radius: 8px;
        background: linear-gradient(90deg, #29263F 0%, #4A32AA 100%);
        height: 49px;
    }
}

.benifit-description-border {
    border-right: 1px solid #7782AA
}

.description-prev-btn {
    width: 35px !important;
    height: 35px !important;
    border-radius: 8px !important;
}

.benifit-description-pagination {
    position: absolute;
    bottom: 24px;
    right: 36px;
}

.m-vip-footer-body {
    height: 220px;
    border-radius: 8px;
    background: linear-gradient(90deg, #1F87E8 0%, #66A12D 100%);
}

.m-vip-footer-title {
    color: #FFF;
    text-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.25);
    font-size: 24px;
    font-family: Inter;
    font-style: italic;
    font-weight: 700;
}

.m-vip-footer-content {
    color: #FFF;
    font-size: 16px;
    font-family: Inter;
    font-style: italic;
    font-weight: 700;
}

.m-vip-footer-btn {
    .v-btn__content {
        color: #000;
        font-size: 16px;
        font-family: Inter;
        font-weight: 800;
        letter-spacing: normal;
    }
}

.m-vip-telegram-img {
    border-radius: 40px;
    background: #000;
    padding: 4px;
}

.m-transaction-tab-btn {
    .v-btn__content {
        text-align: center;
        font-size: 12px;
        font-family: Inter;
        font-weight: 700;
        letter-spacing: normal;
    }
}

.m-button-dark {
    .v-btn__content {
        text-align: center;
        font-size: 10px;
        font-family: Inter;
        font-weight: 700;
        letter-spacing: normal;
    }
}

.m-mission-warning-img-position {
    position: absolute;
    top: 5px;
    left: 5px
}


.m-vip-slide-position {
    position: fixed;
    top: 76px;
    width: -webkit-fill-available;
    z-index: 100000000;
}

.m-vip-slide-position-1 {
    position: fixed;
    top: 43px;
    width: -webkit-fill-available;
    z-index: 100000000;
}

.m-spin-now-btn:active:enabled {
    transform: scale(1.1);
    filter: brightness(80%);
}
</style>