<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
// import Swiper core and required modules
import { Pagination, Virtual, Autoplay, Navigation } from "swiper/modules";
import { useRoute } from "vue-router";

const { t } = useI18n();
const { width } = useDisplay();
const { setMailMenuShow } = mailStore();
const { dispatchGameEnter } = gameStore();
const { setMobileMenuShow } = gameStore();
const route = useRoute();
const mobileHeight = ref<number | undefined>(0);

const luckyJackpotList = ref<Array<any>>([
  {
    rank: new URL("@/assets/public/image/img_public_29.png", import.meta.url).href,
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 13322.17,
  },
  {
    rank: new URL("@/assets/public/image/img_public_30.png", import.meta.url).href,
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 12323.29,
  },
  {
    rank: new URL("@/assets/public/image/img_public_31.png", import.meta.url).href,
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 10578.15,
  },
  {
    rank: "4",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 9394.15,
  },
  {
    rank: "5",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 9035.9,
  },
  {
    rank: "6",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 8313.59,
  },
  {
    rank: "7",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 6570,
  },
  {
    rank: "8",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 6210.23,
  },
  {
    rank: "9",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 5921.45,
  },
  {
    rank: "10",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 5020,
  },
  {
    rank: "11",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 4962.35,
  },
  {
    rank: "12",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 5020,
  },
  {
    rank: "13",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 4962.35,
  },
  {
    rank: "14",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 5020,
  },
  {
    rank: "15",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 4962.35,
  },
  {
    rank: "16",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 5020,
  },
  {
    rank: "17",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 4962.35,
  },
  {
    rank: "18",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 5020,
  },
  {
    rank: "19",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 4962.35,
  },
  {
    rank: "20",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 5020,
  },
  {
    rank: "21",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 4962.35,
  },
  {
    rank: "22",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 5020,
  },
  {
    rank: "23",
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    profit: 4962.35,
  },
]);
const recordList = ref<Array<any>>([
  {
    game: {
      image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
      name: "Mines",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 20,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
      name: "Mines",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 12,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
      name: "Mines",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 7,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
      name: "Mines",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 12.17,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
      name: "Double",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 32,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_27.png", import.meta.url).href,
      name: "Crash",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 5,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_27.png", import.meta.url).href,
      name: "Crash",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 13,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
      name: "Double",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 19,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
      name: "Double",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 22.1,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 133,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    player: {
      image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
      name: "Ar***ra",
    },
    amount: 25,
  },
]);
const recordScrollInterval = ref<any>(null);
const frameShow = ref<boolean>(false);

const modules = [Pagination, Virtual, Autoplay, Navigation];

const mobileWidth = computed(() => {
  return width.value;
});

const enterGameItem = computed(() => {
  const { getEnterGameItem } = storeToRefs(gameStore());
  if (getEnterGameItem.value.method == "HTML") {
    getEnterGameItem.value.weburl = atob(getEnterGameItem.value.weburl);
  }
  return getEnterGameItem.value;
});

const isNumeric = (value: any) => {
  return /^-?\d+$/.test(value);
};

const handleIframeLoad = () => {
  if (enterGameItem.value.weburl != "") {
    frameShow.value = true;
  }
};

const handleResize = () => {
  mobileHeight.value = window.innerHeight;
};

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  mobileHeight.value = window.innerHeight;
  setMobileMenuShow(false);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  setTimeout(() => {
    if (mobileWidth.value < 600) {
      setMailMenuShow(true);
    }
  }, 300);
  recordScrollInterval.value = setInterval(() => {
    recordList.value.push(recordList.value[Math.floor(Math.random() * 10)]);
  }, 600);
  await dispatchGameEnter({
    id: route.params.id,
    demo: route.params.demo == "true" ? true : false,
  });
});

onUnmounted(() => {
  setMobileMenuShow(true);
  setMailMenuShow(false);
});
</script>
<template>
  <div class="game-body" v-if="mobileWidth < 600">
    <div class="m-game-frame-body">
      <div class="m-loading-container relative" v-if="!frameShow">
        <div class="loading-body">
          <div class="dot-0"></div>
          <div class="dot-1"></div>
          <div class="dot-0"></div>
        </div>
      </div>
      <iframe
        v-if="enterGameItem.method == 'HTML'"
        ref="frame"
        :srcdoc="enterGameItem.weburl"
        :style="{ height: frameShow ? mobileHeight + 'px' : '0px', position: 'fixed' }"
        class="home-game-frame-area"
        @load="handleIframeLoad"
      ></iframe>
      <iframe
        v-else
        ref="frame"
        :src="enterGameItem.weburl"
        :style="{ height: frameShow ? mobileHeight + 'px' : '0px', position: 'fixed' }"
        class="home-game-frame-area"
        @load="handleIframeLoad"
      ></iframe>
    </div>
  </div>
  <div class="game-body" v-else>
    <div class="game-frame-body">
      <div class="loading-container relative" v-if="!frameShow">
        <div class="loading-body">
          <div class="dot-0"></div>
          <div class="dot-1"></div>
          <div class="dot-0"></div>
        </div>
      </div>
      <iframe
        v-if="enterGameItem.method == 'HTML'"
        :srcdoc="enterGameItem.weburl"
        class="home-game-frame-area"
        :style="{ height: frameShow ? 'calc(100vh - 130px)' : '0px' }"
        @load="handleIframeLoad"
      ></iframe>
      <iframe
        :src="enterGameItem.weburl"
        class="home-game-frame-area"
        :style="{ height: frameShow ? 'calc(100vh - 130px)' : '0px' }"
        @load="handleIframeLoad"
        v-else
      ></iframe>
    </div>
    <!--------------------- Game History ---------------------->
    <v-row class="mx-6 mt-6">
      <v-col cols="12" md="6">
        <div class="d-flex align-center">
          <img src="@/assets/public/svg/icon_public_92.svg" />
          <p class="text-700-20 white ml-3">{{ t("home.lucky_jackpot_text") }}</p>
        </div>
        <v-card color="#211F32" theme="dark" class="home-lucky-jackpot-height mt-4">
          <v-card
            color="#1D2027"
            theme="dark"
            height="64"
            class="mx-2 mt-2"
            style="border-radius: 16px; background: #1d2027; box-shadow: unset"
          >
            <v-row class="mx-3 my-2 align-center">
              <v-col cols="4" class="text-700-16 gray">{{ t("home.rank_text") }}</v-col>
              <v-col cols="4" class="text-700-16 gray">
                <p class="ml-2">{{ t("home.player_text") }}</p>
              </v-col>
              <v-col cols="4" class="text-700-16 gray text-center">{{
                t("home.profit_text")
              }}</v-col>
            </v-row>
          </v-card>

          <div class="home-overflow-auto" ref="luckyContainer" style="overflow-y: auto">
            <v-row
              v-for="(item, index) in luckyJackpotList"
              :key="index"
              class="mx-4 mt-2 align-center"
            >
              <v-col cols="4" class="py-1">
                <img :src="item.rank" v-if="!isNumeric(item.rank)" />
                <p class="text-500-16 gray text-center" style="width: 27px" v-else>
                  {{ item.rank }}
                </p>
              </v-col>
              <v-col cols="4" class="d-flex align-center py-1">
                <img :src="item.player.image" width="46" />
                <p class="text-500-16 gray">{{ item.player.name }}</p>
              </v-col>
              <v-col cols="4" class="py-1 text-500-16 color-01983A text-center">{{
                item.profit
              }}</v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex align-center">
          <img src="@/assets/public/svg/icon_public_91.svg" />
          <p class="text-700-20 white ml-3">{{ t("home.latest_record_text") }}</p>
        </div>
        <v-card color="#211F32" theme="dark" class="home-lucky-jackpot-height mt-4">
          <v-card
            color="#1D2027"
            theme="dark"
            height="64"
            class="mx-2 mt-2"
            style="border-radius: 16px; background: #1d2027; box-shadow: unset"
          >
            <v-row class="mx-3 my-2 align-center">
              <v-col cols="4" class="text-700-16 gray">{{ t("home.game_text") }}</v-col>
              <v-col cols="4" class="text-700-16 gray">
                <p class="ml-2">{{ t("home.player_text") }}</p>
              </v-col>
              <v-col cols="4" class="text-700-16 gray text-center">
                {{ t("home.amount_text") }}
              </v-col>
            </v-row>
          </v-card>
          <Swiper
            :direction="'vertical'"
            :modules="modules"
            :autoplay="{
              delay: 600,
              disableOnInteraction: false,
            }"
            :slidesPerView="10"
            :spaceBetween="0"
            :virtual="true"
          >
            <SwiperSlide v-for="(item, index) in recordList" :key="index">
              <v-row class="mx-4 mt-2 align-center">
                <v-col
                  cols="4"
                  class="py-1 d-flex align-center"
                  style="flex: -1 0 33.3333333333%"
                >
                  <img :src="item.game.image" />
                  <p class="text-500-16 gray text-center ml-2">{{ item.game.name }}</p>
                </v-col>
                <v-col
                  cols="4"
                  class="d-flex align-center py-1"
                  style="flex: -1 0 33.3333333333%"
                >
                  <img :src="item.player.image" width="46" />
                  <p class="text-500-16 gray">{{ item.player.name }}</p>
                </v-col>
                <v-col
                  cols="4"
                  class="py-1 text-500-16 color-01983A text-center"
                  style="flex: -1 0 33.3333333333%"
                  >{{ item.amount }}</v-col
                >
              </v-row>
            </SwiperSlide>
          </Swiper>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss">
@keyframes expandAnimation {
  0% {
    scale: 1.3;
  }

  50% {
    scale: 1;
  }

  100% {
    scale: 1.3;
  }
}

@keyframes expandReverseAnimation {
  0% {
    scale: 0.8;
  }

  50% {
    scale: 1.2;
  }

  100% {
    scale: 0.8;
  }
}

.game-body {
  width: 100%;

  .game-frame-body {
    width: 95%;
    margin: auto;

    .home-game-frame-area {
      background: #15161C;
      border: none;
      margin-top: 20px;
      width: 100%;
      height: 100vh;
      border-radius: 16px;
      box-shadow: 0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
        0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
        0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
    }

    .loading-container {
      border: none;
      margin-top: 20px;
      width: 100%;
      height: 100vh;

      .loading-body {
        display: flex;
        align-items: center;
        position: absolute;
        top: 43%;
        left: 50%;
        transform: translateX(-50%);

        .dot-0 {
          width: 16px;
          height: 16px;
          background: #12ff76;
          border-radius: 10px;
          margin: 0px 4px;
          animation: expandAnimation 0.6s 0.1s ease-in infinite;
        }

        .dot-1 {
          width: 24px;
          height: 24px;
          background: #12ff76;
          border-radius: 16px;
          margin: 0px 4px;
          animation: expandReverseAnimation 0.6s 0.1s ease-in infinite;
        }
      }
    }
  }

  .m-game-frame-body {
    .home-game-frame-area {
      background: #15161C;
      position: absolute;
      top: 0px;
      border: none;
      width: 100%;
      opacity: 1;
      z-index: 20000000;
      overflow: unset;
    }

    .m-loading-container {
      position: fixed;
      top: 0px;
      border: none;
      width: 100%;
      height: 100vh;
      opacity: 1;
      z-index: 20000000;
      background: #15161C;

      .loading-body {
        display: flex;
        align-items: center;
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translateX(-50%);

        .dot-0 {
          width: 10px;
          height: 10px;
          background: #12ff76;
          border-radius: 10px;
          margin: 0px 4px;
          animation: expandAnimation 0.6s 0.1s ease-in infinite;
        }

        .dot-1 {
          width: 16px;
          height: 16px;
          background: #12ff76;
          border-radius: 16px;
          margin: 0px 4px;
          animation: expandReverseAnimation 0.6s 0.1s ease-in infinite;
        }
      }
    }
  }
}

.home-swiper {
  // height: 247px;

  .swiper-pagination-bullet-active {
    width: 18px !important;
    height: 6px !important;
    border-radius: 24px !important;
    background: var(--white-bg, #fff) !important;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #7782aa;
    border-radius: 6px;
    opacity: 1;
  }

  .swiper-pagination {
    bottom: -8px !important;
  }

  .swiper-button-next {
    position: absolute;
    width: 32px;
    height: 32px;
    background: black;
    border-radius: 4px;
    right: 3px;
    opacity: 0.7;
    z-index: 2;
  }

  .swiper-button-prev {
    width: 32px;
    height: 32px;
    background: black;
    border-radius: 4px;
    left: -0px;
    opacity: 0.7;
    z-index: 2;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-family: swiper-icons;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
    font-size: 14px;
    font-weight: 900;
    color: white;
  }
}

.m-home-swiper {
  height: 208px;

  .swiper-pagination-bullet-active {
    width: 18px !important;
    height: 6px !important;
    border-radius: 24px !important;
    background: var(--white-bg, #fff) !important;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #7782aa;
    border-radius: 6px;
    opacity: 1;
    margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 2px) !important;
  }

  .swiper-pagination {
    bottom: -12px !important;
  }
}

.m-home-lucky-jackpot-height {
  .swiper-wrapper {
    height: 450px;

    .swiper-slide {
      .v-col-4 {
        flex-basis: 0;
        flex-grow: 1;
      }
    }
  }
}

.home-lucky-jackpot-height {
  height: 640px;

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
