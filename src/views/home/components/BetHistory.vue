<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
// import Swiper core and required modules
import { Pagination, Virtual, Autoplay, Navigation } from "swiper/modules";

const { t } = useI18n();
const { width } = useDisplay();
const selectedBtnText = ref<string>(t("home.bet_history.text_2"));
const betHistoryInterval = ref<any>(null);

const modules = [Pagination, Virtual, Autoplay, Navigation];

const betHistoryTabList = ref<Array<string>>([
  t("home.bet_history.text_2"),
  t("home.bet_history.text_3"),
  t("home.bet_history.text_4"),
]);

const allBetHistoryList = ref<Array<any>>([
  {
    game: {
      image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
      name: "Minesssssss",
    },
    multi: "0.50",
    payout: 20,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
      name: "Mines",
    },
    multi: "1.50",
    payout: 12,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
      name: "Mines",
    },
    multi: "0.50",
    payout: 7,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
      name: "Mines",
    },
    multi: "10.50",
    payout: 12.17,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
      name: "Double",
    },
    multi: "0.50",
    payout: 32,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_27.png", import.meta.url).href,
      name: "Crash",
    },
    multi: "0.50",
    payout: 5,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_27.png", import.meta.url).href,
      name: "Crash",
    },
    multi: "0.50",
    payout: 13,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
      name: "Double",
    },
    multi: "3.50",
    payout: 6.2,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
      name: "Double",
    },
    multi: "0.50",
    payout: 22.1,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "0.50",
    payout: 34.7,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "0.50",
    payout: 25,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "0.50",
    payout: 4.5,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
      name: "Double",
    },
    multi: "0.50",
    payout: 22.1,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "0.50",
    payout: 133,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "0.50",
    payout: 25,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "0.50",
    payout: 7.6,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
      name: "Double",
    },
    multi: "0.50",
    payout: 22.1,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "0.50",
    payout: 133,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "0.50",
    payout: 5,
  },
  {
    game: {
      image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
      name: "Dice",
    },
    multi: "234.50",
    payout: 1.33,
  },
]);

const handleBetHistoryTab = (item: string) => {
  selectedBtnText.value = item;
};

const mobileWidth = computed(() => {
  return width.value;
});

// get Token
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
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

onMounted(() => {
  if (token.value != undefined) {
    betHistoryTabList.value = [
      t("home.bet_history.text_2"),
      t("home.bet_history.text_3"),
      t("home.bet_history.text_4"),
      t("home.bet_history.text_5"),
    ];
  }
  betHistoryInterval.value = setInterval(() => {
    allBetHistoryList.value.push(allBetHistoryList.value[Math.floor(Math.random() * 10)]);
  });
});
</script>

<template>
  <v-row v-if="mobileWidth > 600"></v-row>
  <div v-else class="mt-4">
    <div class="d-flex align-center mx-6">
      <img src="@/assets/public/svg/icon_public_99.svg" />
      <p class="text-800-16 white ml-1">{{ t("home.bet_history.text_1") }}</p>
    </div>
    <div class="m-bet-history-tabs mt-1">
      <template v-for="(item, index) in betHistoryTabList">
        <v-btn
          class="text-none"
          :class="item == selectedBtnText ? 'button-bright' : 'button-transparent'"
          :width="item == t('home.bet_history.text_3') ? '90px' : '80px'"
          height="28px"
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
      height="440"
      class="mt-2 mx-2 m-all-bet-history-height"
    >
      <v-card
        color="#29253C"
        theme="dark"
        height="32"
        class="mx-1 mt-1"
        style="border-radius: 16px"
      >
        <v-row class="mx-3 align-center" style="margin-top: 6px">
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
        <swiper-slide v-for="(item, index) in allBetHistoryList" :key="index">
          <v-row class="mx-4 mt-1 align-center">
            <v-col cols="4" class="py-1 d-flex align-center">
              <img :src="item.game.image" width="16" />
              <p class="text-500-12 gray text-center ml-2 game-text-overflow">
                {{ item.game.name }}
              </p>
            </v-col>
            <v-col cols="3" class="py-1 text-center">
              <p
                class="text-500-12"
                :class="Number(item.multi) > 1 ? 'color-01983A' : 'gray'"
              >
                {{ item.multi }}X
              </p>
            </v-col>
            <v-col
              cols="5"
              class="py-1 text-500-12 text-right"
              :class="item.payout > 10 ? 'color-01983A' : 'gray'"
            >
              $ {{ item.payout }}
            </v-col>
          </v-row>
        </swiper-slide>
      </swiper>
    </v-card>
  </div>
</template>

<style lang="scss">
.m-bet-history-tabs {
  display: flex;
  align-items: center;
  margin: 0px 10px;
  width: 332px;
  height: 32px;
  border-radius: 8px;
  background: #211f32;
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
}
.game-text-overflow {
  text-overflow: ellipsis;
  width: 45px;
  overflow: hidden;
  white-space: nowrap;
}

.m-all-bet-history-height {
  border-radius: 16px;
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
}
.all-bet-history-height {
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
