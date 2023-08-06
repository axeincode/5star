<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  watch,
  ref,
  computed,
  onMounted,
  onUnmounted
} from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from 'vuetify';
import GameProviders from "@/components/global/game_provider/index.vue";
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const Dashboard = defineComponent({
  components: {
    GameProviders,
    Carousel,
    Slide,
    Navigation
  },
  setup() {
    const { t } = useI18n();
    const { name, width } = useDisplay()

    // initiate component state
    const state = reactive({
      signupDialog: false,
      loginDialog: false,
      signoutDialog: false,
      mobileDialog: false,
      mobileDialogCheck: false,
      historyToggleSwitch: false,
      slides: [
        [
          new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        ],
        [
          new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        ],
        [
          new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
        ],
        [
          new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        ],
        [
          new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        ],
        [
          new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
        ],
        [
          new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
          new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        ],
      ],
      originalGames: [
        new URL("@/assets/home/image/img_og_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_07.png", import.meta.url).href,
      ],
      principalGames: [
        new URL("@/assets/home/image/img_pg_08.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_09.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_10.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_12.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_13.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_14.png", import.meta.url).href,
      ],
      gameProviders: [
        new URL("@/assets/home/image/img_gp_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_gp_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_gp_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_gp_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_gp_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_gp_07.png", import.meta.url).href,
      ],
      slots: [
        new URL("@/assets/home/image/img_slots_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_07.png", import.meta.url).href,
      ],
      liveCasinos: [
        new URL("@/assets/home/image/img_lc_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_07.png", import.meta.url).href,
      ],
      luckyJackpotList: [
        {
          rank: new URL("@/assets/public/image/img_public_29.png", import.meta.url).href,
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 13322.17
        },
        {
          rank: new URL("@/assets/public/image/img_public_30.png", import.meta.url).href,
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 12323.29
        },
        {
          rank: new URL("@/assets/public/image/img_public_31.png", import.meta.url).href,
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 10578.15
        },
        {
          rank: "4",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 9394.15
        },
        {
          rank: "5",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 9035.9
        },
        {
          rank: "6",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 8313.59
        },
        {
          rank: "7",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 6570
        },
        {
          rank: "8",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 6210.23
        },
        {
          rank: "9",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 5921.45
        },
        {
          rank: "10",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 5020
        },
        {
          rank: "11",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 4962.35
        },
        {
          rank: "12",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 5020
        },
        {
          rank: "13",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 4962.35
        },
        {
          rank: "14",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 5020
        },
        {
          rank: "15",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 4962.35
        },
        {
          rank: "16",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 5020
        },
        {
          rank: "17",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 4962.35
        },
        {
          rank: "18",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 5020
        },
        {
          rank: "19",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 4962.35
        },
        {
          rank: "20",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 5020
        },
        {
          rank: "21",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 4962.35
        },
        {
          rank: "22",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 5020
        },
        {
          rank: "23",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          profit: 4962.35
        },
      ],
      recordList: [
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
            name: "Mines"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 20
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
            name: "Mines"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 12
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
            name: "Mines"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 7
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url).href,
            name: "Mines"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 12.17
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
            name: "Double"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 32
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_27.png", import.meta.url).href,
            name: "Crash"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 5
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_27.png", import.meta.url).href,
            name: "Crash"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 13
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
            name: "Double"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 19
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url).href,
            name: "Double"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 22.10
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
            name: "Dice"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 133
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_28.png", import.meta.url).href,
            name: "Dice"
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
            name: "Ar***ra"
          },
          amount: 25
        },
      ]
    });

    const luckyContainer = ref<HTMLElement | null>(null);
    const luckyScrollInterval = ref<any>(null)

    const recordContainer = ref<HTMLElement | null>(null);
    const recordScrollInterval = ref<any>(null)

    const mobileVersion = computed(() => {
      return name.value
    });

    const mobileWidth = computed(() => {
      return width.value;
    })

    const isNumeric = (value: any) => {
      return /^-?\d+$/.test(value);
    }

    const startLuckyScrollingInterval = () => {
      luckyScrollInterval.value = setInterval(() => {
        if (luckyContainer.value) {
          if (mobileWidth.value > 600) {
            luckyContainer.value.scrollTop += 56;
          } else {
            luckyContainer.value.scrollTop += 51;
          }
          // console.log(luckyContainer.value.scrollTop + luckyContainer.value.clientHeight, luckyContainer.value.scrollHeight);
          if (luckyContainer.value.scrollTop + luckyContainer.value.clientHeight >= luckyContainer.value.scrollHeight) {
            state.luckyJackpotList = [...state.luckyJackpotList, ...state.luckyJackpotList];
          }
        }
      }, 600);
    }

    const startRecordScrollingInterval = () => {
      recordScrollInterval.value = setInterval(() => {
        if (recordContainer.value) {
          if (mobileWidth.value > 600) {
            recordContainer.value.scrollTop += 56;
          } else {
            recordContainer.value.scrollTop += 51;
          }
          // console.log(recordContainer.value.scrollTop + recordContainer.value.clientHeight, recordContainer.value.scrollHeight);
          if (recordContainer.value.scrollTop + recordContainer.value.clientHeight >= recordContainer.value.scrollHeight) {
            state.recordList = [...state.recordList, ...state.recordList];
          }
        }
      }, 600);
    }

    watch(mobileVersion, (newValue) => {
      if (newValue == "sm") {
        state.loginDialog = false;
        state.signupDialog = false;
        state.mobileDialog = false;
      }
    })

    onMounted(() => {
      // startLuckyScrollingInterval();
      startRecordScrollingInterval();
    })

    onUnmounted(() => {
      clearInterval(luckyScrollInterval.value);
      clearInterval(recordScrollInterval.value);
    })

    return {
      t,
      ...toRefs(state),
      mobileVersion,
      mobileWidth,
      luckyContainer,
      recordContainer,
      isNumeric
    };
  },
});

export default Dashboard;
</script>

<template>
  <div class="mx-2 home-body" :class="mobileWidth > 600 ? 'my-4' : 'my-2'">
    <!-- image carousel -->

    <v-carousel cycle interval="6000" height="225" hide-delimiter-background :hide-delimiters="slides.length <= 1"
      show-arrows="hover">

      <!-- prev, next button hide when slides array length is less than 2 -->

      <template v-slot:prev="{ props }">
        <v-btn class="button-carousel text-none prev-btn-position" variant="elevated" icon="mdi-chevron-left"
          @click="props.onClick" v-if="slides.length > 1 && mobileWidth > 600">
        </v-btn>
      </template>
      <template v-slot:next="{ props }">
        <v-btn class="button-carousel text-none next-btn-position" variant="elevated" icon="mdi-chevron-right"
          @click="props.onClick" v-if="slides.length > 1 && mobileWidth > 600">
        </v-btn>
      </template>
      <v-carousel-item v-for="(slide, slideIndex) in slides" :key="slideIndex">
        <v-sheet color="#31275C" height="100%" tile>
          <v-row align="center" justify="center" class="mx-2 relative">
            <v-col v-for="(i, index) in 3" :key="index" cols="12" sm="6" md="4" lg="4" xl="4"
              :class="mobileWidth < 600 ? 'px-0' : ''">
              <img :src="slide[index]" class="slider-img-width"
                :class="mobileWidth < 600 ? 'm-carousel-img-border' : ''" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!-- input for search -->
    <v-row class="mt-2" :class="mobileWidth < 600 ? 'px-1' : 'px-4'">
      <v-text-field :placeholder="t('home.search')" class="form-textfield dark-textfield" variant="solo" hide-details
        filled clearable density="compact" prepend-inner-icon="mdi-magnify" color="#7782AA"
        :class="mobileWidth < 600 ? 'home-search-text-height' : ''" />
    </v-row>

    <!-- buttons for filter -->
    <v-row :class="[mobileVersion == 'sm' ? 'mx-0' : 'mx-4']">
      <template v-if="mobileVersion != 'sm'">
        <v-btn class="mr-2 my-2 text-none lobby-btn-color">
          {{ t("home.button.lobby") }}
        </v-btn>
        <v-btn class="mr-2 my-2 text-none popular-btn-color">
          {{ t("home.button.popular") }}
        </v-btn>
        <v-btn class="mr-2 my-2 text-none popular-btn-color">
          {{ t("home.button.slots") }}
        </v-btn>
        <v-btn class="mr-2 my-2 text-none popular-btn-color">
          {{ t("home.button.live_casino") }}
        </v-btn>
        <v-btn class="mr-2 my-2 text-none popular-btn-color">
          {{ t("home.button.blue_originals") }}
        </v-btn>
      </template>
      <template v-else>
        <v-col cols="4" class="px-1">
          <v-btn class="mr-2 my-2 text-none lobby-btn-color">
            {{ t("home.button.lobby") }}
          </v-btn>
        </v-col>
        <v-col cols="4" class="px-1">
          <v-btn class="mr-2 my-2 text-none popular-btn-color">
            {{ t("home.button.popular") }}
          </v-btn>
        </v-col>
        <v-col cols="4" class="px-1">
          <v-btn class="mr-2 my-2 text-none popular-btn-color">
            {{ t("home.button.slots") }}
          </v-btn>
        </v-col>
      </template>
    </v-row>

    <!-- original games -->
    <v-row class="ml-4 mt-6 mb-2 original_game_text">
      {{ t("home.original_games") }}
    </v-row>
    <v-row class="mx-2 mt-2">
      <v-col cols="4" lg="2" md="2" sm="3" class="px-2" v-ripple.center v-for="(item, index) in originalGames"
        :key="index">
        <v-img :src="item" class="original-game-img-width" />
      </v-col>
    </v-row>
    <v-row class="mt-4 justify-center" :class="mobileWidth < 600 ? 'mx-3' : 'ml-4'">
      <v-btn class="text-none more-btn-color" variant="outlined" :width="mobileWidth < 600 ? '100%' : 300">
        {{ t("home.more") }}
      </v-btn>
    </v-row>

    <!-- principal games -->
    <v-row class="ml-4 mt-6 mb-2 original_game_text">
      {{ t("home.principal") }}
    </v-row>
    <v-row class="mx-2 mt-2">
      <v-col cols="4" lg="2" md="2" sm="3" class="px-2" v-ripple.center
        v-for="(principalItem, principalIndex) in principalGames" :key="principalIndex">
        <v-img :src="principalItem" class="original-game-img-width" />
      </v-col>
    </v-row>
    <v-row class="mt-4 justify-center" :class="mobileWidth < 600 ? 'mx-3' : 'ml-4'">
      <v-btn class="text-none more-btn-color" variant="outlined" :width="mobileWidth < 600 ? '100%' : 300">
        {{ t("home.more") }}
      </v-btn>
    </v-row>

    <!-------------------- game providers -------------->
    <GameProviders />

    <!-------------------- slot games -------------->
    <v-row class="ml-4 mt-6 mb-2 original_game_text">
      {{ t("home.slots") }}
    </v-row>
    <v-row class="mx-2 mt-2">
      <v-col cols="4" lg="2" md="2" sm="3" class="px-2" v-ripple.center v-for="(slotItem, slotIndex) in slots"
        :key="slotIndex">
        <v-img :src="slotItem" class="original-game-img-width" />
      </v-col>
    </v-row>
    <v-row class="mt-4 justify-center" :class="mobileWidth < 600 ? 'mx-3' : 'ml-4'">
      <v-btn class="text-none more-btn-color" variant="outlined" :width="mobileWidth < 600 ? '100%' : 300">
        {{ t("home.more") }}
      </v-btn>
    </v-row>

    <!-------------------- live casino games -------------->
    <v-row class="ml-4 mt-6 mb-2 original_game_text">
      {{ t("home.live_casino") }}
    </v-row>
    <v-row class="mx-2 mt-2">
      <v-col cols="4" lg="2" md="2" sm="3" class="px-2" v-ripple.center
        v-for="(liveCasinoItem, liveCasinoIndex) in liveCasinos" :key="liveCasinoIndex">
        <v-img :src="liveCasinoItem" class="original-game-img-width" />
      </v-col>
    </v-row>
    <v-row class="mt-4 justify-center" :class="mobileWidth < 600 ? 'mx-3' : 'ml-4'">
      <v-btn class="text-none more-btn-color" variant="outlined" :width="mobileWidth < 600 ? '100%' : 300">
        {{ t("home.more") }}
      </v-btn>
    </v-row>

    <!--------------------- Game History ---------------------->
    <v-row class="mx-2 mt-6" v-if="mobileWidth > 600">
      <v-col cols="12" md="6">
        <div class="d-flex align-center">
          <img src="@/assets/public/svg/icon_public_92.svg" />
          <p class="text-700-20 white ml-3">{{ t('home.lucky_jackpot_text') }}</p>
        </div>
        <v-card color="#211F32" theme="dark" class="home-lucky-jackpot-height mt-4">
          <v-card color="#29253C" theme="dark" height="64" class="mx-2 mt-2">
            <v-row class="mx-3 my-2 align-center">
              <v-col cols="4" class="text-700-16 gray">{{ t('home.rank_text') }}</v-col>
              <v-col cols="4" class="text-700-16 gray">
                <p class="ml-2">{{ t('home.player_text') }}</p>
              </v-col>
              <v-col cols="4" class="text-700-16 gray text-center">{{ t('home.profit_text') }}</v-col>
            </v-row>
          </v-card>
          <div class="home-overflow-auto" ref="luckyContainer" style="overflow-y: auto;">
            <v-row v-for="(item, index) in luckyJackpotList" :key="index" class="mx-4 mt-2 align-center">
              <v-col cols="4" class="py-1">
                <img :src="item.rank" v-if="!isNumeric(item.rank)" />
                <p class="text-500-16 gray text-center" style="width: 27px;" v-else>{{ item.rank }}</p>
              </v-col>
              <v-col cols="4" class="d-flex align-center py-1">
                <img :src="item.player.image" width="46" />
                <p class="text-500-16 gray">{{ item.player.name }}</p>
              </v-col>
              <v-col cols="4" class="py-1 text-500-16 color-01983A text-center">{{ item.profit }}</v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex align-center">
          <img src="@/assets/public/svg/icon_public_91.svg" />
          <p class="text-700-20 white ml-3">{{ t('home.latest_record_text') }}</p>
        </div>
        <v-card color="#211F32" theme="dark" class="home-lucky-jackpot-height mt-4">
          <v-card color="#29253C" theme="dark" height="64" class="mx-2 mt-2">
            <v-row class="mx-3 my-2 align-center">
              <v-col cols="4" class="text-700-16 gray">{{ t('home.game_text') }}</v-col>
              <v-col cols="4" class="text-700-16 gray">
                <p class="ml-2">{{ t('home.player_text') }}</p>
              </v-col>
              <v-col cols="4" class="text-700-16 gray text-center">{{ t('home.amount_text') }}</v-col>
            </v-row>
          </v-card>
          <div class="home-overflow-auto" ref="recordContainer">
            <v-row v-for="(item, index) in recordList" :key="index" class="mx-4 mt-2 align-center">
              <v-col cols="4" class="py-1 d-flex align-center">
                <img :src="item.game.image" />
                <p class="text-500-16 gray text-center ml-2">{{ item.game.name }}</p>
              </v-col>
              <v-col cols="4" class="d-flex align-center py-1">
                <img :src="item.player.image" width="46" />
                <p class="text-500-16 gray">{{ item.player.name }}</p>
              </v-col>
              <v-col cols="4" class="py-1 text-500-16 color-01983A text-center">{{ item.amount }}</v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <div class="history-toggle">
          <input type="checkbox" id="history-toggle" v-model="historyToggleSwitch" />
          <label for="history-toggle">
            <div class="winner">
              <img src="@/assets/public/svg/icon_public_92.svg" width="20" />
              <P class="text-500-12">{{ t('home.lucky_jackpot_text') }}</P>
            </div>
            <div class="prize">
              <img src="@/assets/public/svg/icon_public_91.svg" width="20" />
              <P class="text-500-12">{{ t('home.latest_record_text') }}</P>
            </div>
          </label>
        </div>
        <v-card color="#211F32" theme="dark" height="500" class="mt-4 mx-2" v-if="!historyToggleSwitch">
          <v-card color="#29253C" theme="dark" height="40" class="mx-2 mt-2">
            <v-row class="mx-3 my-2 align-center">
              <v-col cols="3" class="text-700-14 gray py-0">{{ t('home.rank_text') }}</v-col>
              <v-col cols="5" class="text-700-14 gray py-0">
                <p class="ml-2">{{ t('home.player_text') }}</p>
              </v-col>
              <v-col cols="4" class="text-700-14 gray py-0">{{ t('home.profit_text') }}</v-col>
            </v-row>
          </v-card>
          <div class="m-home-overflow-auto" ref="luckyContainer" style="overflow-y: auto;">
            <v-row v-for="(item, index) in luckyJackpotList" :key="index" class="mx-4 mt-2 align-center">
              <v-col cols="3" class="py-1">
                <img :src="item.rank" v-if="!isNumeric(item.rank)" width="22" />
                <p class="text-500-14 gray text-center" style="width: 27px;" v-else>{{ item.rank }}</p>
              </v-col>
              <v-col cols="5" class="d-flex align-center py-1">
                <img :src="item.player.image" width="40" />
                <p class="text-500-14 gray">{{ item.player.name }}</p>
              </v-col>
              <v-col cols="4" class="py-1 text-500-14 color-01983A text-center">{{ item.profit }}</v-col>
            </v-row>
          </div>
        </v-card>
        <v-card color="#211F32" theme="dark" height="500" class="mt-4 mx-2" v-else>
          <v-card color="#29253C" theme="dark" height="40" class="mx-2 mt-2">
            <v-row class="mx-3 my-2 align-center">
              <v-col cols="4" class="text-700-14 gray py-0">{{ t('home.game_text') }}</v-col>
              <v-col cols="4" class="text-700-14 gray py-0">
                <p class="ml-2">{{ t('home.player_text') }}</p>
              </v-col>
              <v-col cols="4" class="text-700-14 gray text-center py-0">{{ t('home.amount_text') }}</v-col>
            </v-row>
          </v-card>
          <div class="m-home-overflow-auto" ref="recordContainer">
            <v-row v-for="(item, index) in recordList" :key="index" class="mx-4 mt-2 align-center">
              <v-col cols="4" class="py-1 d-flex align-center">
                <img :src="item.game.image" width="22" />
                <p class="text-500-14 gray text-center ml-2">{{ item.game.name }}</p>
              </v-col>
              <v-col cols="4" class="d-flex align-center py-1">
                <img :src="item.player.image" width="40" />
                <p class="text-500-14 gray">{{ item.player.name }}</p>
              </v-col>
              <v-col cols="4" class="py-1 text-500-14 color-01983A text-center">{{ item.amount }}</v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
.home-overflow-auto {
  overflow-y: hidden;
  scroll-behavior: smooth;
  height: 568px;
}

@media (max-width: 600px) {

  .home-search-text-height {
    height: 30px !important;

    .v-field__field {
      padding-left: 0px !important;
    }

    .v-field__input::placeholder {
      opacity: unset !important;
      color: #7782AA !important;
      font-family: "Inter";
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .v-field__prepend-inner {
      .v-icon {
        opacity: unset !important;
        color: #7782AA;
      }
    }

    .v-input__control {
      .mdi:before {
        font-size: 19px !important;
      }
    }
  }


  .lobby-btn-color {

    .v-btn__content {
      font-size: 12px !important;
      font-family: "Inter";
    }
  }

  .popular-btn-color {

    .v-btn__content {
      font-size: 12px !important;
      font-family: "Inter";
    }
  }
}

.m-home-overflow-auto {
  overflow-y: hidden;
  scroll-behavior: smooth;
  height: 450px;
}

.home-lucky-jackpot-height {
  height: 640px;
}

.slider-img-width {
  width: 100%;
  height: 200px;
}

.v-field {
  color: white !important
}

.prev-btn-position {
  position: absolute !important;
  top: 36% !important;
  left: 5px !important;
  width: 32px !important;
  height: 32px !important;
}

.next-btn-position {
  position: absolute !important;
  top: 36% !important;
  right: 5px !important;
  width: 32px !important;
  height: 32px !important;
}

.m-carousel-img-border {
  border-radius: 16px 6px;
}

.v-carousel__controls {
  height: 12px !important;

  .v-btn {
    width: 6px !important;
    height: 6px !important;
    margin-right: 6px !important;
  }

  .v-btn__content {
    font-size: 6px;
    color: #7782aa;
  }

  .v-btn--active {
    .v-btn__content {
      font-size: 6px;
      width: 18px !important;
      color: #ffffff !important;
    }
  }
}

.form-textfield div.v-field__field {
  box-shadow: none !important;
}

.lobby-btn-color {
  background: #32cfec !important;
  color: #000000 !important;
  width: 160px !important;

  .v-btn__content {
    font-weight: 700 !important;
    font-size: 16px;
  }
}


.popular-btn-color {
  background: #211f31 !important;
  color: #7782aa !important;
  width: 160px !important;

  .v-btn__content {
    font-weight: 700 !important;
    font-size: 16px;
  }
}

// original game
.original_game_text {
  color: #ffffff;
  font-weight: 700;
  font-size: 22px;
}

@media (max-width: 600px) {
  .original_game_text {
    font-size: 14px;
  }


  .more-btn-color {

    .v-btn__content {
      font-size: 12px !important;
    }
  }
}

.original-game-img-border {
  border-radius: 3px 16px;
  cursor: pointer;
  flex: 10%;
}

.original-game-img-width {
  max-width: 230px !important;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.more-btn-color {
  background: #2f2756 !important;
  color: #6842ec !important;

  .v-btn__content {
    font-weight: 700 !important;
    font-size: 16px;
  }
}


// winner and prize toggle switch
.history-toggle {
  margin-top: -20px;

  label {
    width: 300px;
    height: 38px;
    position: relative;
    display: block;
    border-radius: 8px;
    background: #211F31;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
    cursor: pointer;
    transition: 0.3s;
    margin: auto;

    div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
    }

    .winner {
      display: flex;
      align-items: center;
      left: 8px;
      transition: 0.3s;
      color: black;
    }

    .prize {
      display: flex;
      align-items: center;
      left: 175px;
      transition: 0.3s;
      color: #FFFFFF;
    }
  }

  label:after {
    content: "";
    width: 136px;
    height: 34px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: #32CFEC;
    border-radius: 8px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:checked+label:after {
    left: 297px;
    transform: translateX(-100%);
  }

  label:active:after {
    width: 136px;
  }

  input:checked+label .winner {
    color: #FFFFFF;
  }

  input:checked+label .prize {
    color: black
  }

}
</style>
