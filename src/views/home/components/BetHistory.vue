<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
// import Swiper core and required modules
import { Pagination, Virtual, Autoplay, Navigation } from "swiper/modules";
import { gameStore } from "@/store/game";
import img_public_35 from "@/assets/public/image/img_public_35.png";
import img_public_26 from "@/assets/public/image/img_public_26.png";
import img_public_27 from "@/assets/public/image/img_public_27.png";
import img_public_28 from "@/assets/public/image/img_public_28.png";
import { type GameBigWinItem } from "@/interface/game";
import vipLevelGroups from "@/utils/VipLevelGroup";

const { t } = useI18n();
const { width } = useDisplay();
const selectedBtnText = ref<string>(t("home.bet_history.text_2"));
const betHistoryInterval = ref<any>(null);
const { dispatchGameBigWin } = gameStore();

const modules = [Pagination, Virtual, Autoplay, Navigation];

const betHistoryTabList = ref<Array<string>>([
  t("home.bet_history.text_2"),
  t("home.bet_history.text_3"),
  t("home.bet_history.text_4"),
]);

const imgList = ref<Array<any>>([
  img_public_35,
  img_public_26,
  img_public_27,
  img_public_28,
]);

// const allBetHistoryList = ref<Array<any>>([
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
//       name: "Minesssssss",
//     },
//     player: {
//       image: img_vipemblem_1_24,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 20,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
//       name: "Mines",
//     },
//     player: {
//       image: img_vipemblem_1_24,
//       name: "Ar***ra",
//     },
//     multi: "1.50",
//     payout: 12,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
//       name: "Mines",
//     },
//     player: {
//       image: img_vipemblem_1_24,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 7,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
//       name: "Mines",
//     },
//     player: {
//       image: img_vipemblem_25_49,
//       name: "Ar***ra",
//     },
//     multi: "10.50",
//     payout: 12.17,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
//       name: "Double",
//     },
//     player: {
//       image: img_vipemblem_25_49,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 32,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_27.png", import.meta.url).href,
//       name: "Crash",
//     },
//     player: {
//       image: img_vipemblem_25_49,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 5,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_27.png", import.meta.url).href,
//       name: "Crash",
//     },
//     player: {
//       image: img_vipemblem_25_49,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 13,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
//       name: "Double",
//     },
//     player: {
//       image: img_vipemblem_50_74,
//       name: "Ar***ra",
//     },
//     multi: "3.50",
//     payout: 6.2,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
//       name: "Double",
//     },
//     player: {
//       image: img_vipemblem_50_74,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 22.1,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_50_74,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 34.7,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_75_99,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 25,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_75_99,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 4.5,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
//       name: "Double",
//     },
//     player: {
//       image: img_vipemblem_75_99,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 22.1,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_75_99,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 133,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_100_149,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 25,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_100_149,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 7.6,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
//       name: "Double",
//     },
//     player: {
//       image: img_vipemblem_100_149,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 22.1,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_159_199,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 133,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_159_199,
//       name: "Ar***ra",
//     },
//     multi: "0.50",
//     payout: 5,
//   },
//   {
//     game: {
//       image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
//       name: "Dice",
//     },
//     player: {
//       image: img_vipemblem_200,
//       name: "Ar***ra",
//     },
//     multi: "234.50",
//     payout: 1.33,
//   },
// ]);

const selectedBetHistoryList = ref<Array<GameBigWinItem>>([]);

const handleBetHistoryTab = (item: string) => {
  selectedBtnText.value = item;
  if (item == t("home.bet_history.text_4")) {
    selectedBetHistoryList.value = gameBigWinItem.value.lucky_bets;
  } else {
    selectedBetHistoryList.value = gameBigWinItem.value.high_rollers;
  }
};

const mobileWidth = computed(() => {
  return width.value;
});

// get Token
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const gameBigWinItem = computed(() => {
  const { getGameBigWinItem } = storeToRefs(gameStore());
  return getGameBigWinItem.value;
});

watch(token, (value) => {
  if (value != undefined) {
    betHistoryTabList.value = [
      t("home.bet_history.text_2"),
      t("home.bet_history.text_3"),
      t("home.bet_history.text_4"),
      t("home.bet_history.text_5"),
    ];
  } else {
    betHistoryTabList.value = [
      t("home.bet_history.text_2"),
      t("home.bet_history.text_3"),
      t("home.bet_history.text_4"),
    ];
  }
});

onMounted(async () => {
  if (token.value != undefined) {
    betHistoryTabList.value = [
      t("home.bet_history.text_2"),
      t("home.bet_history.text_3"),
      t("home.bet_history.text_4"),
      t("home.bet_history.text_5"),
    ];
  }
  await dispatchGameBigWin();
  selectedBetHistoryList.value = gameBigWinItem.value.high_rollers;
  // betHistoryInterval.value = setInterval(() => {
  //   allBetHistoryList.value.push(allBetHistoryList.value[Math.floor(Math.random() * 10)]);
  // }, 100);
});
</script>

<template>
  <div v-if="mobileWidth > 600" class="mt-4 mx-2">
    <div class="d-flex align-center mx-2">
      <!-- <img src="@/assets/public/svg/icon_public_99.svg" width="32" /> -->
      <p class="text-700-20 white ml-1">{{ t("home.bet_history.text_1") }}</p>
    </div>
    <div
      class="bet-history-tabs mt-4"
      style="padding: 0px 2px"
      :style="{ minWidth: token != undefined ? '516px' : '388px' }"
    >
      <template v-for="(item, index) in betHistoryTabList" :key="index">
        <!-- width="128px" -->
        <v-btn
          class="text-none btn-width"
          :class="item == selectedBtnText ? 'button-bright' : 'button-transparent'"
          height="36px"
          style="border-radius: 8px !important"
          @click="handleBetHistoryTab(item)"
        >
          {{ item }}
        </v-btn>
      </template>
    </div>
    <v-card
      color="#211F32"
      theme="dark"
      height="640"
      class="mt-2 mx-2 all-bet-history-height"
    >
      <v-card
        color="#1D2027"
        theme="dark"
        height="48"
        class="mx-1 mt-1"
        style="border-radius: 16px; box-shadow: unset"
      >
        <v-row class="mx-3 my-0 align-center" style="height: 100%">
          <v-col cols="2" class="text-700-16 gray py-0">
            {{ t("home.bet_history.text_6") }}
          </v-col>
          <v-col cols="2" class="text-700-16 text-center gray py-0">
            {{ t("home.bet_history.text_9") }}
          </v-col>
          <v-col cols="2" class="text-700-16 text-center gray py-0">
            {{ t("home.bet_history.text_10") }}
          </v-col>
          <v-col cols="2" class="text-700-16 text-center gray py-0">
            {{ t("home.bet_history.text_11") }}
          </v-col>
          <v-col cols="2" class="text-700-16 text-right gray py-0">
            {{ t("home.bet_history.text_12") }}
          </v-col>
          <v-col cols="2" class="text-700-16 text-right gray py-0">
            {{ t("home.bet_history.text_8") }}
          </v-col>
        </v-row>
      </v-card>
      <swiper
        :direction="'vertical'"
        :modules="modules"
        :slidesPerView="15"
        :spaceBetween="10"
        :autoplay="{
          delay: 600,
          disableOnInteraction: false,
        }"
        :virtual="true"
        class="mt-1"
      >
        <swiper-slide v-for="(item, index) in selectedBetHistoryList" :key="index">
          <v-row class="mx-4 my-0 align-center">
            <v-col
              cols="2"
              class="py-1 d-flex align-center"
              style="flex-basis: 0; flex-grow: 1"
            >
              <img :src="imgList[Math.floor(Math.random() * 4)]" width="22" />
              <p class="text-500-16 gray text-center ml-2 game-text-overflow">
                {{ item.game_name }}
              </p>
            </v-col>
            <v-col
              cols="2"
              class="py-1 d-flex align-center justify-center"
              style="flex-basis: 0; flex-grow: 1"
            >
              <img :src="vipLevelGroups[item.user_vip_group]" width="22" />
              <p class="text-500-16 gray text-center ml-2">
                {{ item.user_name }}
              </p>
            </v-col>
            <v-col cols="2" class="py-1 text-center" style="flex-basis: 0; flex-grow: 1">
              <p class="text-500-16 gray">{{ item.time }}s</p>
            </v-col>
            <v-col cols="2" class="py-1 text-center" style="flex-basis: 0; flex-grow: 1">
              <p class="text-500-16 gray">${{ item.bet_amount }}</p>
            </v-col>
            <v-col cols="2" class="py-1 text-right" style="flex-basis: 0; flex-grow: 1">
              <p
                class="text-500-16"
                :class="Number(item.multiplier) > 1 ? 'color-01983A' : 'gray'"
              >
                {{ item.multiplier }}X
              </p>
            </v-col>
            <v-col
              cols="2"
              class="py-1 text-500-16 text-right"
              :class="Number(item.win_amount) > 10 ? 'color-01983A' : 'gray'"
              style="flex-basis: 0; flex-grow: 1"
            >
              $ {{ item.win_amount }}
            </v-col>
          </v-row>
        </swiper-slide>
      </swiper>
    </v-card>
  </div>
  <div v-else class="mt-4">
    <div class="d-flex align-center mx-4">
      <!-- <img src="@/assets/public/svg/icon_public_99.svg" /> -->
      <p class="text-800-16 white ml-1">{{ t("home.bet_history.text_1") }}</p>
    </div>
    <div
      class="m-bet-history-tabs mt-1"
      :style="{ width: token != undefined ? 'unset' : '252px' }"
    >
      <template v-for="(item, index) in betHistoryTabList">
        <v-btn
          class="text-none"
          :class="[item == selectedBtnText ? 'button-bright' : 'button-transparent']"
          height="28px"
          style="border-radius: 8px !important"
          @click="handleBetHistoryTab(item)"
        >
          {{ item }}
        </v-btn>
      </template>
    </div>
    <v-card
      color="#1D2027"
      theme="dark"
      height="440"
      class="mt-2 mx-2 m-all-bet-history-height"
    >
      <v-card
        color="#23262F"
        theme="dark"
        height="32"
        class="mx-1 mt-1"
        style="border-radius: 8px"
      >
        <v-row class="mx-3 my-0 align-center" style="height: 100%">
          <v-col cols="4" class="text-700-12 gray py-0">
            {{ t("home.bet_history.text_6") }}
          </v-col>
          <v-col cols="3" class="text-700-12 gray py-0 text-right">
            <p class="ml-2">{{ t("home.bet_history.text_7") }}</p>
          </v-col>
          <v-col cols="5" class="text-700-12 gray text-right py-0">
            {{ t("home.bet_history.text_8") }}
          </v-col>
        </v-row>
      </v-card>
      <swiper
        :direction="'vertical'"
        :modules="modules"
        :slidesPerView="14"
        :spaceBetween="0"
        :autoplay="{
          delay: 600,
          disableOnInteraction: false,
        }"
        :virtual="true"
      >
        <swiper-slide v-for="(item, index) in selectedBetHistoryList" :key="index">
          <v-row class="mx-4 mt-1 align-center">
            <v-col cols="4" class="py-1 d-flex align-center">
              <img :src="imgList[Math.floor(Math.random() * 4)]" width="16" />
              <p class="text-400-12 gray text-left ml-2 game-text-overflow">
                {{ item.game_name }}
              </p>
            </v-col>
            <v-col cols="3" class="py-1 text-center">
              <p
                class="text-400-12"
                :class="Number(item.multiplier) > 1 ? 'color-01983A' : 'gray'"
              >
                {{ item.multiplier }}X
              </p>
            </v-col>
            <v-col
              cols="5"
              class="py-1 text-700-12 text-right"
              :class="Number(item.win_amount) > 10 ? 'color-01983A' : 'gray'"
            >
              $ {{ item.win_amount }}
            </v-col>
          </v-row>
        </swiper-slide>
      </swiper>
    </v-card>
  </div>
</template>

<style lang="scss">
.bet-history-tabs {
  display: flex;
  align-items: center;
  margin: 0px 10px;
  height: 40px;
  border-radius: 8px;
  background: #211f32;
  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  .button-transparent {
    background: transparent !important;
    box-shadow: none !important;
    .v-btn__content {
      font-size: 14px;
      color: #7782aa;
      font-weight: 700;
    }
  }
  .button-bright {
    .v-btn__content {
      font-size: 14px;
      // color: #000000;
      color: #fff;
      font-weight: 700;
    }
  }
  .btn-width {
    min-width: 128px;
  }
}
.m-bet-history-tabs {
  display: flex;
  align-items: center;
  margin: 0px 10px;
  height: 32px;
  border-radius: 8px;
  background: #23262F;
  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  .button-transparent {
    background: transparent !important;
    box-shadow: none !important;
    .v-btn__content {
      font-size: 12px;
      color: #7782aa;
      font-weight: 700;
    }
  }
  .button-bright {
    .v-btn__content {
      font-size: 12px;
      // color: #000000;
      color: #fff;
      font-weight: 700;
    }
  }

  button {
    flex: 1;
  }
}

.game-text-overflow {
  text-overflow: ellipsis;
  width: 45px;
  overflow: hidden;
  white-space: nowrap;
}

@media (min-width: 600px) {
  .game-text-overflow {
    width: 100px;
  }
}

.m-all-bet-history-height {
  border-radius: 8px;
  .swiper-wrapper {
    height: 406px;

    .swiper-slide {
      .v-col-4 {
        flex-basis: 0;
        flex-grow: 1;
      }
      .v-col-3 {
        flex-basis: 0;
        flex-grow: 1;
      }
      .v-col-5 {
        flex-basis: 0;
        flex-grow: 1;
      }
    }
  }
  .swiper-vertical {
    touch-action: auto;
  }
}
.all-bet-history-height {
  height: 640px;
  border-radius: 16px;
  .swiper-wrapper {
    height: 568px;

    .swiper-slide {
      .v-col-4 {
        flex-basis: 0;
        flex-grow: 1;
      }
    }
  }
}
</style>
