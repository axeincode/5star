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
const depositRate = ref<number>(56);
const spinCardItem = ref<any | null>(null)
const missionCardItem = ref<any | null>(null)
const descriptionTab = ref<string>("VIP2")

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

const spinCardHeight1 = ref<number | undefined>(400)

// spin card height when spin card item show totally
const spinCardHeight2 = ref<string | undefined>(undefined);

const vipMissionHeight1 = ref<number>(346)

// mission card height when mission card item show totally
const vipMissionHeight2 = ref<string | undefined>(undefined);

const spinCardShow = ref<boolean>(false);

const missionCardShow = ref<boolean>(false);

const selectedIndex = ref<number>(1);

const vipSlidePosition = ref<boolean>(false);
const vipSlideClass = ref<string>("");

const refferalAppBarShow = computed(() => {
    const { getRefferalAppBarShow } = storeToRefs(refferalStore());
    return getRefferalAppBarShow.value;
})

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
    if (newValue > 1280) {
        if (rightBarToggle.value) {
            vipWidth.value = "vip-container";
        } else {
            vipWidth.value = "vip-container-1";
        }
    } else {
        vipWidth.value = "m-vip-container";
    }
    spinCardHeight2.value = spinCardItem.value?.$el?.clientHeight + 80;
    vipMissionHeight2.value = missionCardItem.value?.$el?.clientHeight + 20;
})

watch(selectedVIPTab, (newValue: string) => {
    // console.log(newValue)
}, { deep: true })

const cashbackElement = ref<any | null>(null);

const slideElement = ref<any | null>(null);

const rewardElement = ref<any | null>(null);

const spinElement = ref<any | null>(null);

const vipElement = ref<any | null>(null);

const benefitElement = ref<any | null>(null);

const handleWindowScroll = (even: Event) => {

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

        // if (benefitPosition < 170) {
        //     selectedVIPTab.value = t('vip.all_bonus_text');
        // }

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
    const offset = 180;
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

watch(vipSlidePosition, (newValue: boolean) => {
    if (newValue && refferalAppBarShow.value) {
        vipSlideClass.value = "vip-slide-position"
    } else if (newValue && !refferalAppBarShow.value) {
        vipSlideClass.value = "vip-slide-position-1"
    } else {
        vipSlideClass.value = "";
    }
})

watch(refferalAppBarShow, (newValue: boolean) => {
    if (vipSlidePosition.value && newValue) {
        vipSlideClass.value = "vip-slide-position"
    } else if (vipSlidePosition.value && !newValue) {
        vipSlideClass.value = "vip-slide-position-1"
    } else {
        vipSlideClass.value = "";
    }
})

// const handleClick = () => {
//     isMouseClick.value = true;
// }

window.addEventListener('scroll', handleWindowScroll);

// window.addEventListener('click', handleClick);

onMounted(() => {
    if (mobileWidth.value > 1280) {
        if (rightBarToggle.value) {
            vipWidth.value = "vip-container";
        } else {
            vipWidth.value = "vip-container-1";
        }
    } else {
        vipWidth.value = "m-vip-container";
    }
    spinCardHeight2.value = spinCardItem.value?.$el?.clientHeight + 80;
    vipMissionHeight2.value = missionCardItem.value?.$el?.clientHeight + 20;
})
</script>

<template>
  <div :class="vipWidth">
    <div class="vip-body">
      <Carousel
        :itemsToShow="1.4"
        :wrapAround="true"
        :transition="500"
        v-if="!vipSlidePosition"
      >
        <Slide v-for="(item, index) in vipItems" :key="index">
          <div class="vip-carousel-body">
            <div class="text-800-20 white text-center mt-4">
              {{ t("vip.slider.title_text") }}
            </div>
            <v-row class="full-height mx-2">
              <v-col cols="3" class="text-center">
                <img src="@/assets/vip/image/img_vip_02.png" width="70" />
                <p class="text-800-20 yellow">{{ item.vipGrade }}</p>
              </v-col>
              <v-col cols="9">
                <div class="deposit-progress-bg">
                  <div class="d-flex mx-4">
                    <div class="white">{{ t("appBar.deposit") }}</div>
                    <div class="ml-auto">
                      <Font class="text-gray">R$ {{ item.currentDepositAmount }} / </Font>
                      <Font color="#F9BC01">R$ {{ item.totalDepositAmount }}</Font>
                    </div>
                  </div>
                  <div>
                    <v-progress-linear
                      v-model="item.vipRate"
                      height="20"
                      class="deposit-progress"
                    >
                    </v-progress-linear>
                  </div>
                </div>
                <div class="deposit-progress-bg mt-4">
                  <div class="d-flex mx-4">
                    <div class="white">{{ t("appBar.wager") }}</div>
                    <div class="ml-auto">
                      <Font class="text-gray">R$ {{ item.currentWagerAmount }} / </Font>
                      <Font color="#623AEC">R$ {{ item.totalWagerAmount }}</Font>
                    </div>
                  </div>
                  <div>
                    <v-progress-linear
                      v-model="depositRate"
                      height="20"
                      class="wager-progress"
                    >
                    </v-progress-linear>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>

      <div class="mt-8" :class="vipSlideClass" ref="slideElement" @click="handleVIPTab">
        <v-slide-group
          v-model="selectedVIPTab"
          show-arrows
          :style="{ height: vipSlidePosition ? '100px' : 'unset' }"
          :class="vipSlidePosition ? 'pt-10' : ''"
        >
          <v-slide-group-item
            v-for="(item, index) in vipTabs"
            :key="index"
            v-slot="{ isSelected, toggle }"
            :value="item"
          >
            <v-btn
              class="ma-2 text-none transaction-tab-btn"
              :class="isSelected ? 'white' : 'text-gray'"
              rounded
              :color="isSelected ? '#009B3A' : 'transparent'"
              @click="toggle"
              :width="mobileWidth < 600 ? 120 : 150"
            >
              {{ item }}
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>
      </div>

      <!------------------------- vip reward ----------------------------->

      <div
        class="reward-body mx-2"
        ref="rewardElement"
        :class="tabSelect ? 'mt-16' : 'mt-2'"
      >
        <div class="text-800-16 white pt-8 mx-10">
          {{ t("vip.reward_text") }} {{ vipItems[selectedIndex].vipGrade }}
        </div>
        <v-row
          class="mt-6 justify-center pb-6"
          :class="mobileWidth < 1200 ? 'mx-2' : 'mx-12'"
        >
          <v-col cols="6" md="3" class="d-flex justify-center">
            <div class="reward-card text-center">
              <div class="text-800-16 yellow pt-4">
                {{ t("vip.reward_card_1.daily_free_bonus_text") }}
              </div>
              <div class="mt-6">
                <img src="@/assets/public/image/img_public_02.png" />
              </div>
              <div class="mt-10 text-600-16 white">
                {{ t("vip.reward_card_1.text_1") }}
              </div>
              <div class="mt-4 mx-6">
                <v-btn
                  class="text-none button-dark"
                  width="-webkit-fill-available"
                  height="60px"
                >
                  {{ t("vip.receive_btn_text") }}
                </v-btn>
              </div>
              <div class="mt-4 text-500-16 white">
                {{ t("vip.reward_card_1.text_2") }}<Font class="yellow">21:23:22</Font>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3" class="d-flex justify-center">
            <div class="reward-card text-center">
              <div class="text-800-16 yellow pt-4">
                {{ t("vip.reward_card_2.vip_week_gift_text") }}
              </div>
              <div class="mt-6 d-flex justify-center align-center">
                <img src="@/assets/public/image/img_public_02.png" />
                <img
                  src="@/assets/public/image/img_public_09.png"
                  class="ml-4"
                  width="83"
                  height="58"
                />
              </div>
              <div class="mt-6 text-600-16 white">
                {{ t("vip.reward_card_2.text_1") }}
              </div>
              <div class="text-600-16 white">
                {{ t("vip.reward_card_2.text_2") }}
              </div>
              <div class="mt-4 mx-6">
                <v-btn
                  class="text-none button-dark"
                  width="-webkit-fill-available"
                  height="60px"
                >
                  {{ t("vip.receive_btn_text") }}
                </v-btn>
              </div>
              <div class="mt-4 text-500-16 white">
                {{ t("vip.reward_card_2.text_3") }}<Font class="yellow">3</Font
                >{{ t("vip.reward_card_2.text_4") }}
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3" class="d-flex justify-center">
            <div class="reward-card text-center">
              <div class="text-800-16 yellow pt-4">
                {{ t("vip.reward_card_3.vip_month_gift_text") }}
              </div>
              <div class="mt-6 d-flex justify-center align-center">
                <img src="@/assets/public/image/img_public_02.png" />
                <img
                  src="@/assets/public/image/img_public_09.png"
                  class="ml-4"
                  width="83"
                  height="58"
                />
              </div>
              <div class="mt-6 text-600-16 white">
                {{ t("vip.reward_card_3.text_1") }}
              </div>
              <div class="text-600-16 white">
                {{ t("vip.reward_card_3.text_2") }}
              </div>
              <div class="mt-4 mx-6">
                <v-btn
                  class="text-none button-dark"
                  width="-webkit-fill-available"
                  height="60px"
                >
                  {{ t("vip.receive_btn_text") }}
                </v-btn>
              </div>
              <div class="mt-4 text-500-16 white">
                {{ t("vip.reward_card_3.text_3") }}<Font class="yellow">3</Font
                >{{ t("vip.reward_card_3.text_4") }}
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3" class="d-flex justify-center">
            <div class="reward-card text-center">
              <div class="text-800-16 yellow pt-4">
                {{ t("vip.reward_card_4.vip_upgrage_gift_text") }}
              </div>
              <div class="mt-6 d-flex justify-center align-center">
                <img src="@/assets/public/image/img_public_02.png" />
                <img
                  src="@/assets/public/image/img_public_09.png"
                  class="ml-4"
                  width="83"
                  height="58"
                />
              </div>
              <div class="mt-6 text-600-16 white">
                {{ t("vip.reward_card_4.text_1") }}
              </div>
              <div class="text-600-16 white">
                {{ t("vip.reward_card_4.text_2") }}
              </div>
              <div class="mt-4 mx-6">
                <v-btn
                  class="text-none button-dark"
                  width="-webkit-fill-available"
                  height="60px"
                >
                  {{ t("vip.receive_btn_text") }}
                </v-btn>
              </div>
              <div class="mt-4 text-500-16 white">
                {{ t("vip.reward_card_4.text_3") }}
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!---------------------------- cashback bonus --------------------------------->

      <div
        class="cashback-bonus-body mx-2 pb-2"
        ref="cashbackElement"
        :class="tabSelect ? 'mt-16' : 'mt-6'"
      >
        <div class="text-800-16 white pt-8 mx-10 d-flex">
          {{ t("vip.cashback_body.text_1") }}
          <v-btn
            class="text-none button-yellow ml-auto relative"
            height="60px"
            width="262px"
          >
            <img
              src="@/assets/public/image/img_public_10.png"
              widh="100"
              class="cashback-btn-img"
            />
            {{ t("vip.cashback_body.text_2") }}
          </v-btn>
        </div>
        <v-card theme="dark" color="#15161C" class="mt-6 mx-4">
          <div class="pa-6">
            <v-row class="ma-0 pa-0 align-center">
              <p class="text-500-16 white">
                {{ t("vip.cashback_body.text_3") }} {{ vipItems[selectedIndex].vipGrade }}
              </p>
              <p class="text-600-16 text-gray ml-auto">
                {{ t("vip.cashback_body.text_4") }}
              </p>
              <img src="@/assets/public/svg/icon_public_22.svg" class="ml-2" />
            </v-row>
            <v-row class="pa-3">
              <v-col cols="6" md="3">
                <v-card theme="dark" color="#1D2027" class="text-center pa-2 relative">
                  <img
                    src="@/assets/vip/image/img_vip_11.png"
                    class="cashback-card-img"
                  />
                  <p class="text-600-16 white">{{ t("vip.cashback_body.text_11") }}</p>
                  <p class="text-800-32 color-04D981 mt-4">0.4%</p>
                  <p class="text-700-16 text-gray mt-4">
                    {{ t("vip.cashback_body.text_5") }} 0.5%
                  </p>
                </v-card>
              </v-col>
              <v-col cols="6" md="3">
                <v-card theme="dark" color="#1D2027" class="text-center pa-2 relative">
                  <img
                    src="@/assets/vip/image/img_vip_11.png"
                    class="cashback-card-img"
                  />
                  <p class="text-600-16 white">{{ t("vip.cashback_body.text_11") }}</p>
                  <p class="text-800-32 color-04D981 mt-4">0.5%</p>
                  <p class="text-700-16 text-gray mt-4">
                    {{ t("vip.cashback_body.text_5") }} 0.6%
                  </p>
                </v-card>
              </v-col>
              <v-col cols="6" md="3">
                <v-card theme="dark" color="#1D2027" class="text-center pa-2 relative">
                  <img
                    src="@/assets/vip/image/img_vip_11.png"
                    class="cashback-card-img"
                  />
                  <p class="text-600-16 white">{{ t("vip.cashback_body.text_11") }}</p>
                  <p class="text-800-32 color-04D981 mt-4">0.5%</p>
                  <p class="text-700-16 text-gray mt-4">
                    {{ t("vip.cashback_body.text_5") }} 0.6%
                  </p>
                </v-card>
              </v-col>
              <v-col cols="6" md="3">
                <v-card theme="dark" color="#1D2027" class="text-center pa-2 relative">
                  <img
                    src="@/assets/vip/image/img_vip_11.png"
                    class="cashback-card-img"
                  />
                  <p class="text-600-16 white">{{ t("vip.cashback_body.text_11") }}</p>
                  <p class="text-800-32 color-04D981 mt-4">0.4%</p>
                  <p class="text-700-16 text-gray mt-4">
                    {{ t("vip.cashback_body.text_5") }} 0.5%
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <v-card theme="dark" color="#15161C" class="mt-6 mx-4">
          <div class="pa-6">
            <v-row class="pa-3 align-center">
              <v-col cols="6" md="3">
                <p class="text-700-16 white">{{ t("vip.cashback_body.text_7") }}</p>
                <p class="text-700-20 yellow mt-6">R$ 12345678910</p>
              </v-col>
              <v-col cols="6" md="5">
                <p class="text-700-16 white">{{ t("vip.cashback_body.text_8") }}</p>
                <p class="text-700-20 yellow mt-6">R$ 12345678910</p>
              </v-col>
              <v-col cols="12" md="4" class="text-right">
                <v-btn
                  class="text-none button-yellow ml-auto relative"
                  height="60px"
                  width="262px"
                >
                  <div class="cashback-bonus-help-img">
                    <img src="@/assets/public/svg/icon_public_76.svg" />
                  </div>
                  <div style="width: 150px; white-space: normal" class="text-800-14 ml-4">
                    {{ t("vip.cashback_body.text_9") }}
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>

      <!-------------------------- My Super Spin ---------------------------------->

      <div
        class="super-spin-body relative mx-2 pb-2"
        ref="spinElement"
        :class="tabSelect ? 'mt-16' : 'mt-6'"
      >
        <div class="text-800-16 white pt-8 mx-10 d-flex">
          {{ t("vip.super_spin_body.text_1") }}
          <v-card
            theme="dark"
            color="#15161C"
            class="ml-auto d-flex align-center"
            height="60"
            width="470"
          >
            <p class="text-600-16 white ml-4">
              {{ t("vip.super_spin_body.text_2") }} <Font class="text-800-20">3 </Font>
            </p>
            <v-btn
              class="text-none button-yellow ml-auto relative"
              height="60px"
              width="180px"
            >
              {{ t("vip.super_spin_body.text_3") }}
            </v-btn>
          </v-card>
        </div>
        <div
          color="#15161C"
          class="ma-4 pa-6 spin-game-card box"
          :style="{
            height: spinCardShow ? spinCardHeight2 + 'px' : spinCardHeight1 + 'px',
          }"
        >
          <p class="text-500-16 white">{{ t("vip.super_spin_body.text_4") }}</p>
          <v-row class="mt-4 justify-center align-center" ref="spinCardItem">
            <v-col
              cols="4"
              md="3"
              xl="2"
              v-for="(item, index) in spinItems"
              :key="index"
              class="text-center d-flex justify-center"
            >
              <v-card theme="dark" color="#1D2027" class="py-10" width="210" height="256">
                <img :src="item.image" />
                <p class="text-600-16 white mt-4">{{ item.title }}</p>
                <p class="text-500-12 text-gray mt-4">{{ item.content }}</p>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <v-btn
          class="text-none button-1C1929 spin-more-btn-position"
          width="215px"
          height="45px"
          style="transform: translateX(-50%) !important"
          @click="spinCardShow = !spinCardShow"
        >
          {{ t("vip.super_spin_body.text_5") }}
          <v-icon class="mdi-down-position">mdi-chevron-down</v-icon>
        </v-btn>
      </div>

      <!------------------------   My VIP Mission -------------------------------->

      <div
        class="vip-mission-body relative mx-2 pb-2"
        ref="vipElement"
        :class="tabSelect ? 'mt-16' : 'mt-6'"
      >
        <div class="text-800-16 white pt-8 mx-10 d-flex">
          {{ t("vip.vip_mission_body.text_1") }}
          <p class="ml-auto">
            {{ t("vip.vip_mission_body.text_2") }} <Font class="text-800-20">0</Font>
            {{ t("vip.vip_mission_body.text_3") }}
          </p>
        </div>
        <div
          color="#15161C"
          class="ma-4 pa-6 spin-game-card box"
          :style="{
            height: missionCardShow ? vipMissionHeight2 + 'px' : vipMissionHeight1 + 'px',
          }"
        >
          <v-row class="justify-center align-center" ref="missionCardItem">
            <v-col
              cols="4"
              md="3"
              xl="2"
              v-for="(item, index) in vipMissionItems"
              :key="index"
              class="text-center d-flex justify-center"
            >
              <v-card
                theme="dark"
                color="#1D2027"
                class="py-5"
                width="210"
                height="256"
                v-if="item.type == 1"
              >
                <img src="@/assets/public/image/img_public_11.png" />
                <p class="text-500-12 text-gray mt-2">
                  {{ t("vip.vip_mission_body.text_4") }}
                </p>
                <p class="text-600-12 white mt-1">
                  {{ t("vip.vip_mission_body.text_5") }}
                </p>
                <v-btn
                  class="text-none button-bright mission-btn-1 mt-12"
                  height="34px"
                  width="180px"
                >
                  {{ t("vip.vip_mission_body.text_6") }}
                </v-btn>
              </v-card>
              <v-card
                theme="dark"
                color="#1D2027"
                class="py-5"
                width="210"
                height="256"
                v-if="item.type == 2"
              >
                <div class="mission-ongoing-position text-500-12 white">
                  {{ t("vip.vip_mission_body.text_7") }}
                </div>
                <div class="mission-time-position text-500-12 white">
                  {{ item.time }}
                </div>
                <img src="@/assets/public/image/img_public_11.png" />
                <p class="text-500-12 text-gray mt-2">
                  {{ t("vip.vip_mission_body.text_4") }}
                </p>
                <p class="text-600-12 white mt-1">
                  {{ t("vip.vip_mission_body.text_8") }}
                </p>
                <div class="mission-progress-bg mx-4 mt-6">
                  <v-progress-linear
                    v-model="item.missionRate"
                    height="17"
                    class="mission-progress"
                  >
                    <div class="text-500-12 white">
                      {{ item.currentRate }} / {{ item.totalRate }}
                    </div>
                  </v-progress-linear>
                </div>
                <v-btn
                  class="text-none button-purple mission-btn-2 mt-2"
                  height="34px"
                  width="180px"
                >
                  {{ t("vip.vip_mission_body.text_11") }}
                </v-btn>
              </v-card>
              <v-card
                theme="dark"
                class="py-5 mission-card-bg-3"
                width="210"
                height="256"
                v-if="item.type == 3"
              >
                <div class="mission-ongoing-position text-500-12 white">
                  {{ t("vip.vip_mission_body.text_7") }}
                </div>
                <div class="mission-time-position text-500-12 white">
                  {{ item.time }}
                </div>
                <img src="@/assets/public/image/img_public_11.png" />
                <p class="text-500-12 text-gray mt-2">
                  {{ t("vip.vip_mission_body.text_4") }}
                </p>
                <p class="text-600-12 white mt-1">
                  {{ t("vip.vip_mission_body.text_8") }}
                </p>
                <p class="text-600-12 white mt-1">
                  {{ t("vip.vip_mission_body.text_10") }}
                </p>
                <div class="mission-progress-bg mx-4 mt-1">
                  <v-progress-linear
                    v-model="item.missionRate"
                    height="17"
                    class="mission-progress"
                  >
                    <div class="text-500-12 white">
                      {{ item.currentRate }} / {{ item.totalRate }}
                    </div>
                  </v-progress-linear>
                </div>
                <v-btn
                  class="text-none button-bright mission-btn-1 mt-2"
                  height="34px"
                  width="180px"
                >
                  <img
                    src="@/assets/public/image/img_public_14.png"
                    class="mission-gift-img-position"
                  />
                  {{ t("vip.vip_mission_body.text_12") }}
                </v-btn>
              </v-card>
              <v-card
                theme="dark"
                color="#1D2027"
                class="py-5"
                width="210"
                height="256"
                v-if="item.type == 4"
              >
                <div class="mission-completed-position text-500-12 white">
                  {{ t("vip.vip_mission_body.text_2") }}
                </div>
                <img src="@/assets/public/image/img_public_11.png" />
                <p class="text-500-12 text-gray mt-2">
                  {{ t("vip.vip_mission_body.text_4") }}
                </p>
                <p class="text-600-12 white mt-1">
                  {{ t("vip.vip_mission_body.text_5") }}
                </p>
                <p class="text-500-12 text-gray mt-6">
                  {{ t("vip.vip_mission_body.text_13") }}
                </p>
                <v-btn
                  class="text-none button-dark mission-btn-3 mt-2"
                  height="34px"
                  width="180px"
                >
                  {{ t("vip.vip_mission_body.text_2") }}
                </v-btn>
              </v-card>
              <v-card
                theme="dark"
                color="#1D2027"
                class="py-5"
                width="210"
                height="256"
                v-if="item.type == 5"
              >
                <img src="@/assets/public/image/img_public_13.png" />
                <p class="text-500-12 text-gray mt-2">
                  {{ t("vip.vip_mission_body.text_4") }}
                </p>
                <p class="text-600-12 white mt-1">
                  {{ t("vip.vip_mission_body.text_5") }}
                </p>
                <p class="text-600-12 white mt-1">
                  {{ t("vip.vip_mission_body.text_10") }}
                </p>
                <v-btn
                  class="text-none button-dark mission-btn-3 mt-6"
                  height="34px"
                  width="180px"
                >
                  <img
                    src="@/assets/public/svg/icon_public_77.svg"
                    class="mission-warning-img-position"
                  />
                  {{ t("vip.vip_mission_body.text_15") }}
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <v-btn
          class="text-none button-1C1929 spin-more-btn-position"
          width="215px"
          height="45px"
          style="transform: translateX(-50%) !important"
          @click="missionCardShow = !missionCardShow"
        >
          {{ t("vip.super_spin_body.text_5") }}
          <v-icon class="mdi-down-position">mdi-chevron-down</v-icon>
        </v-btn>
      </div>

      <!--------------------------    VIP Benifit Description ---------------------->
      <div class="benifit-description-body mt-6 mx-2 pb-2 relative" ref="benefitElement">
        <div class="benifit-description-header pa-8 text-800-16 white">
          {{ t("vip.benifit_description_body.text_1") }}
        </div>
        <v-window v-model="descriptionTab">
          <v-window-item
            v-for="(item, index) in vipDescriptionItems"
            :key="index"
            :value="item"
          >
            <v-row class="mt-6 mx-8">
              <v-col cols="6">
                <p class="text-700-16 white ml-6">
                  {{ t("vip.benifit_description_body.text_2") }}
                </p>
                <v-card
                  theme="dark"
                  color="#15161C"
                  class="mt-2"
                  :height="mobileWidth > 960 ? 75 : undefined"
                >
                  <v-row class="mx-4 my-0 pa-0 align-center justify-center">
                    <v-col cols="6">
                      <div class="benifit-description-border">
                        <p class="text-500-16 text-gray">
                          {{ t("vip.benifit_description_body.text_4") }}
                        </p>
                        <p class="text-700-20 yellow">R$ 100</p>
                      </div>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-center">
                      <div>
                        <p class="text-500-16 text-gray">
                          {{ t("vip.benifit_description_body.text_5") }}
                        </p>
                        <p class="text-700-20 yellow">R$ 800</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="6">
                <p class="text-700-16 white ml-6">
                  {{ t("vip.benifit_description_body.text_3") }}
                </p>
                <v-card theme="dark" color="#15161C" class="mt-2">
                  <v-row class="mx-4 my-0 pa-0 align-center">
                    <v-col cols="12">
                      <p class="text-500-16 text-gray">
                        {{ t("vip.benifit_description_body.text_5") }}
                      </p>
                      <p class="text-700-20 yellow">R$ 800</p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-4 mx-8">
              <v-col cols="12">
                <p class="text-700-16 white ml-6">
                  {{ t("vip.benifit_description_body.text_6") }}
                </p>
                <v-card
                  theme="dark"
                  color="#15161C"
                  class="mt-2"
                  :height="mobileWidth > 960 ? 75 : undefined"
                >
                  <v-row class="mx-4 my-0 pa-0 align-center justify-center">
                    <v-col cols="4">
                      <div class="benifit-description-border">
                        <p class="text-500-16 text-gray">
                          {{ t("vip.benifit_description_body.text_7") }}
                        </p>
                        <p class="text-700-20 yellow">R$ 10</p>
                      </div>
                    </v-col>
                    <v-col cols="4">
                      <div class="benifit-description-border d-flex justify-center">
                        <div>
                          <p class="text-500-16 text-gray">
                            {{ t("vip.benifit_description_body.text_8") }}
                          </p>
                          <p class="text-700-20 yellow">R$ 10 + 1 free spin</p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-center">
                      <div>
                        <p class="text-500-16 text-gray">
                          {{ t("vip.benifit_description_body.text_9") }}
                        </p>
                        <p class="text-700-20 yellow">R$ 30 + 5 free spin</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-4 mx-8">
              <v-col cols="12">
                <p class="text-700-16 white ml-6">
                  {{ t("vip.benifit_description_body.text_10") }}
                </p>
                <v-card
                  theme="dark"
                  color="#15161C"
                  class="mt-2"
                  :height="mobileWidth > 960 ? 75 : undefined"
                >
                  <v-row class="mx-4 my-0 pa-0 align-center justify-center">
                    <v-col cols="3">
                      <div class="benifit-description-border">
                        <p class="text-500-16 text-gray">
                          {{ t("vip.benifit_description_body.text_11") }}
                        </p>
                        <p class="text-700-20 yellow">0.4%</p>
                      </div>
                    </v-col>
                    <v-col cols="3">
                      <div class="benifit-description-border d-flex justify-center">
                        <div>
                          <p class="text-500-16 text-gray">
                            {{ t("vip.benifit_description_body.text_12") }}
                          </p>
                          <p class="text-700-20 yellow">0.5%</p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="3">
                      <div class="benifit-description-border d-flex justify-center">
                        <div>
                          <p class="text-500-16 text-gray">
                            {{ t("vip.benifit_description_body.text_13") }}
                          </p>
                          <p class="text-700-20 yellow">0.5%</p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="3" class="d-flex justify-center">
                      <div>
                        <p class="text-500-16 text-gray">
                          {{ t("vip.benifit_description_body.text_14") }}
                        </p>
                        <p class="text-700-20 yellow">0.4%</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-4 mx-8">
              <v-col cols="12" md="8" lg="6">
                <p class="text-700-16 white ml-6">
                  {{ t("vip.benifit_description_body.text_17") }}
                </p>
                <v-card
                  theme="dark"
                  color="#15161C"
                  class="mt-2"
                  :height="mobileWidth > 960 ? 75 : undefined"
                >
                  <v-row class="mx-4 my-0 pa-0 align-center justify-center">
                    <v-col cols="6">
                      <div class="benifit-description-border">
                        <p class="text-500-16 text-gray">
                          {{ t("vip.benifit_description_body.text_15") }}
                        </p>
                        <p class="text-700-20 yellow">100BRL/ Monthly</p>
                      </div>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-center">
                      <div>
                        <p class="text-500-16 text-gray">
                          {{ t("vip.benifit_description_body.text_16") }}
                        </p>
                        <p class="text-700-20 yellow">2.5%</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
        <div
          class="d-flex align-center"
          :class="
            mobileWidth < 960 ? 'mt-2 mr-4 justify-end' : 'benifit-description-pagination'
          "
        >
          <v-btn
            class="button-black description-prev-btn"
            theme="dark"
            icon
            @click="prevDescription"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <p class="text-700-16 white mx-4">{{ descriptionTab }}</p>
          <v-btn
            class="button-black description-prev-btn"
            theme="dark"
            icon
            @click="nextDescription"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>

      <!----------------------------   footer-body    ------------------------------------>
      <div class="vip-footer-body relative mt-6 mx-2">
        <v-row class="ma-0 pa-0 align-center justify-center">
          <v-col cols="12" md="3">
            <p class="vip-footer-title text-center">{{ t("vip.footer_body.text_1") }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p class="vip-footer-content text-center">
              {{ t("vip.footer_body.text_2") }}
            </p>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn
              class="text-none button-yellow vip-footer-btn"
              width="-webkit-fill-available"
              height="60px"
            >
              <div class="vip-telegram-img mr-4">
                <img src="@/assets/public/svg/icon_public_78.svg" class="mr-1" />
              </div>
              {{ t("vip.footer_body.text_3") }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.vip-container {
  margin: -20px 40px;
  background: #1D2027;
  padding-bottom: 20px;
  border-radius: 8px;
}

.vip-container-1 {
  margin: -20px 40px;
  background: #1D2027;
  padding-bottom: 20px;
  border-radius: 8px;
}

.m-vip-container {
  margin: -20px 0px;
  background: #1D2027;
  padding-bottom: 20px;
  border-radius: 8px;
}

.vip-body {
  padding-top: 30px;

  .v-slide-group {
    background: #15161C !important;
    margin: 0px !important;
    border-radius: 0px !important;
  }

  .v-slide-group__content {
    justify-content: center !important;
  }

  .v-btn__content {
    font-size: 16px;
  }

  .v-slide-group__prev,
  .v-slide-group__next {
    color: white !important;
  }
}

.vip-carousel-body {
  width: 100%;
  height: 200px;
  margin: 0 10px;
  border-radius: 8px;
  background: linear-gradient(179deg, #4a32aa 0%, #29263f 100%);
}

.reward-body {
  border-radius: 8px;
  background: #1D2027;
}

.reward-card {
  width: 247px;
  height: 347px;
  flex-shrink: 0;
  border-radius: 32px;
  background: linear-gradient(0deg, #275798 0%, #9419f0 100%);
  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}

.cashback-bonus-body {
  border-radius: 8px;
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%);

  .v-btn__content {
    color: #000;
    font-size: 16px;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-weight: 800;
  }
}

.cashback-btn-img {
  position: absolute;
  top: -33px;
  left: -49px;
}

.cashback-card-img {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}

.cashback-card-border {
  border-right: 1px solid #7782aa;
}

.cashback-bonus-help-img {
  padding: 8px;
  border-radius: 50%;
  background: #000;
  width: 40px;
  height: 40px;
}

.super-spin-body {
  border-radius: 8px;
  background: linear-gradient(90deg, #29263f 0%, #67a22c 100%);

  .v-btn__content {
    color: #000;
    font-size: 20px;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-weight: 800;
  }
}

.button-1C1929 {
  .v-btn__content {
    color: var(--white-bg, #fff);
    text-align: center;
    font-size: 18px;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-weight: 600;
  }
}

.spin-more-btn-position {
  position: absolute !important;
  bottom: -8px;
  left: 50%;
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
  background: #15161C;
  overflow: hidden;
}

.vip-mission-body {
  border-radius: 8px;
  background: linear-gradient(90deg, #29263f 0%, #d84693 100%);
}

.mission-btn-1 {
  .v-btn__content {
    color: #000;
    font-size: 12px;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-weight: 700;
  }
}

.mission-btn-2 {
  .v-btn__content {
    color: #6842ec;
    text-align: center;
    font-size: 12px;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-weight: 700;
  }
}

.mission-btn-3 {
  .v-btn__content {
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-weight: 700;
  }
}

.mission-ongoing-position {
  position: absolute;
  top: 12px;
  left: 0;
  width: 80px;
  height: 20px;
  border-radius: 0px 6px 6px 0px;
  background: #4932a9;
}

.mission-completed-position {
  position: absolute;
  top: 12px;
  left: 0;
  width: 80px;
  height: 20px;
  border-radius: 0px 6px 6px 0px;
  background: #67a12c;
}

.mission-time-position {
  position: absolute;
  top: 12px;
  right: 15px;
}

.mission-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(180deg, #f9bc01 0%, #f99301 100%);
    border-radius: 20px;
  }
}

.mission-progress-bg {
  .v-progress-linear {
    border-radius: 8px;
    background: #15161C !important;
    /* Text Box */
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }

  .v-progress-linear__background {
    border-radius: 8px;
    background: #15161C !important;
    /* Text Box */
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }
}

.mission-card-bg-3 {
  background: linear-gradient(0deg, #275798 0%, #9419f0 100%) !important;
}

.mission-gift-img-position {
  position: absolute;
  top: -7px;
  left: -13px;
}

.benifit-description-body {
  border-radius: 8px;
  background: #1D2027;

  .benifit-description-header {
    border-radius: 8px;
    background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%);
    height: 80px;
  }
}

.benifit-description-border {
  border-right: 1px solid #7782aa;
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

.vip-footer-body {
  border-radius: 8px;
  background: linear-gradient(90deg, #1f87e8 0%, #66a12d 100%);
}

.vip-footer-title {
  color: #fff;
  text-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 40px;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: italic;
  font-weight: 700;
}

.vip-footer-content {
  color: #fff;
  font-size: 24px;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: italic;
  font-weight: 700;
}

.vip-footer-btn {
  .v-btn__content {
    color: #000;
    font-size: 20px;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-weight: 800;
  }
}

.vip-telegram-img {
  border-radius: 40px;
  background: #000;
  padding: 6px;
}

.mission-warning-img-position {
  position: absolute;
  left: 10px;
}

.carousel {
  margin: 10px !important;
}

.carousel__slide--prev {
  opacity: 0.8;
  transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--next {
  opacity: 0.8;
  transform: rotateY(10deg) scale(0.9);
}

.carousel__prev {
  border-radius: 8px;
  background: #000;
  color: #fff;
  position: absolute;
  left: 10%;
}

.carousel__prev:hover {
  color: #fff !important;
}

.carousel__next {
  border-radius: 8px;
  background: #000;
  color: #fff;
  position: absolute;
  right: 10%;
}

.carousel__next:hover {
  color: #fff !important;
}

.vip-slide-position {
  position: fixed;
  top: 56px;
  width: -webkit-fill-available;
  z-index: 1009;
  margin-right: 40px;
}

.vip-slide-position-1 {
  position: fixed;
  top: 3px;
  width: -webkit-fill-available;
  z-index: 1009;
  margin-right: 40px;
}
</style>
