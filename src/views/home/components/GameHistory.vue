<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  computed,
  watch,
  onMounted,
  onUnmounted,
} from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
import icon_public_92 from "@/assets/public/svg/icon_public_92.svg";
import icon_public_91 from "@/assets/public/svg/icon_public_91.svg";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
// import Swiper core and required modules
import { Pagination, Virtual, Autoplay, Navigation } from "swiper/modules";
const GameHistoryComponent = defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    Virtual,
    Autoplay,
    Pagination,
    Navigation,
  },
  setup() {
    const { t } = useI18n();
    const state = reactive({
      /**
       * 初始化Lucky列表的值
       * Initialize the value of Lucky list
       */
      luckyJackpotList: [
        {
          rank: new URL("@/assets/public/image/img_public_29.png", import.meta.url).href,
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 13322.17,
        },
        {
          rank: new URL("@/assets/public/image/img_public_30.png", import.meta.url).href,
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 12323.29,
        },
        {
          rank: new URL("@/assets/public/image/img_public_31.png", import.meta.url).href,
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 10578.15,
        },
        {
          rank: "4",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 9394.15,
        },
        {
          rank: "5",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 9035.9,
        },
        {
          rank: "6",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 8313.59,
        },
        {
          rank: "7",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 6570,
        },
        {
          rank: "8",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 6210.23,
        },
        {
          rank: "9",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 5921.45,
        },
        {
          rank: "10",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 5020,
        },
        {
          rank: "11",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 4962.35,
        },
        {
          rank: "12",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 5020,
        },
        {
          rank: "13",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 4962.35,
        },
        {
          rank: "14",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 5020,
        },
        {
          rank: "15",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 4962.35,
        },
        {
          rank: "16",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 5020,
        },
        {
          rank: "17",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 4962.35,
        },
        {
          rank: "18",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 5020,
        },
        {
          rank: "19",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 4962.35,
        },
        {
          rank: "20",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 5020,
        },
        {
          rank: "21",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 4962.35,
        },
        {
          rank: "22",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 5020,
        },
        {
          rank: "23",
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          profit: 4962.35,
        },
      ],
      recordList: [
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
              .href,
            name: "Mines",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 20,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
              .href,
            name: "Mines",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 12,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
              .href,
            name: "Mines",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 7,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
              .href,
            name: "Mines",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 12.17,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
              .href,
            name: "Double",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 32,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_27.png", import.meta.url)
              .href,
            name: "Crash",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 5,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_27.png", import.meta.url)
              .href,
            name: "Crash",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 13,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
              .href,
            name: "Double",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 19,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
              .href,
            name: "Double",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 22.1,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_28.png", import.meta.url)
              .href,
            name: "Dice",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 133,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_28.png", import.meta.url)
              .href,
            name: "Dice",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 25,
        },
      ],
    });
    const historyToggleSwitch = ref<boolean>(false);
    const winnerCheckboxColor = ref<string>("#ffffff");
    const prizeCheckboxColor = ref<string>("#7782AA");

    const luckyContainer = ref<HTMLElement | null>(null);
    const luckyScrollInterval = ref<any>(null);

    const recordContainer = ref<HTMLElement | null>(null);
    const recordScrollInterval = ref<any>(null);
    /**
     * 提取width属性
     * Extract width attribute
     */
    const { width } = useDisplay();
    /**
     * 获取屏幕的宽度
     * Get the width of the screen
     */
    const mobileWidth = computed(() => {
      return width.value;
    });
    const isNumeric = (value: any) => {
      return /^-?\d+$/.test(value);
    };
    const winnerTransform = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", winnerCheckboxColor.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", winnerCheckboxColor.value);
        }
      }
      return el;
    };

    const prizeTransform = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", prizeCheckboxColor.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", prizeCheckboxColor.value);
        }
      }
      return el;
    };

    watch(mobileWidth, (value) => {
      clearInterval(luckyScrollInterval.value);
      clearInterval(recordScrollInterval.value);
      state.recordList = [
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
              .href,
            name: "Mines",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 20,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
              .href,
            name: "Mines",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 12,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
              .href,
            name: "Mines",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 7,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
              .href,
            name: "Mines",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 12.17,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
              .href,
            name: "Double",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 32,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_27.png", import.meta.url)
              .href,
            name: "Crash",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 5,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_27.png", import.meta.url)
              .href,
            name: "Crash",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 13,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
              .href,
            name: "Double",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 19,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
              .href,
            name: "Double",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 22.1,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_28.png", import.meta.url)
              .href,
            name: "Dice",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 133,
        },
        {
          game: {
            image: new URL("@/assets/public/image/img_public_28.png", import.meta.url)
              .href,
            name: "Dice",
          },
          player: {
            image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
              .href,
            name: "Ar***ra",
          },
          amount: 25,
        },
      ];
      recordScrollInterval.value = setInterval(() => {
        state.recordList.push(state.recordList[Math.floor(Math.random() * 10)]);
      }, 600);
    });

    watch(
      historyToggleSwitch,
      (value) => {
        if (value) {
          state.recordList = [
            {
              game: {
                image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
                  .href,
                name: "Mines",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 20,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
                  .href,
                name: "Mines",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 12,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
                  .href,
                name: "Mines",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 7,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_35.png", import.meta.url)
                  .href,
                name: "Mines",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 12.17,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
                  .href,
                name: "Double",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 32,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_27.png", import.meta.url)
                  .href,
                name: "Crash",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 5,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_27.png", import.meta.url)
                  .href,
                name: "Crash",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 13,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
                  .href,
                name: "Double",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 19,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_26.png", import.meta.url)
                  .href,
                name: "Double",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 22.1,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_28.png", import.meta.url)
                  .href,
                name: "Dice",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 133,
            },
            {
              game: {
                image: new URL("@/assets/public/image/img_public_28.png", import.meta.url)
                  .href,
                name: "Dice",
              },
              player: {
                image: new URL("@/assets/public/image/ua_public_04.png", import.meta.url)
                  .href,
                name: "Ar***ra",
              },
              amount: 25,
            },
          ];
          winnerCheckboxColor.value = "#7782AA";
          prizeCheckboxColor.value = "#ffffff";
        } else {
          winnerCheckboxColor.value = "#ffffff";
          prizeCheckboxColor.value = "#7782AA";
        }
      },
      { deep: true }
    );

    onMounted(() => {
      recordScrollInterval.value = setInterval(() => {
        state.recordList.push(state.recordList[Math.floor(Math.random() * 10)]);
      }, 600);
    });

    onUnmounted(() => {
      clearInterval(luckyScrollInterval.value);
      clearInterval(recordScrollInterval.value);
    });

    return {
      t,
      ...toRefs(state),
      modules: [Pagination, Virtual, Autoplay, Navigation],
      historyToggleSwitch,
      winnerTransform,
      prizeTransform,
      icon_public_92,
      icon_public_91,
      isNumeric,
      mobileWidth,
    };
  },
});
export default GameHistoryComponent;
</script>
<template>
  <v-row class="mx-2 mt-6" v-if="mobileWidth > 600">
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
          style="border-radius: 16px; background: #1D2027; box-shadow: unset"
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
          style="border-radius: 16px; background: #1D2027; box-shadow: unset"
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
        <swiper
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
          <swiper-slide v-for="(item, index) in recordList" :key="index">
            <v-row class="mx-4 mt-2 align-center">
              <v-col
                cols="4"
                class="py-1 d-flex align-center"
                style="flex: -1 0 33.3333333333%"
              >
                <img :src="item.game.image" />
                <p class="text-500-16 gray text-center ml-2">
                  {{ item.game.name }}
                </p>
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
          </swiper-slide>
        </swiper>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <div class="history-toggle">
        <input type="checkbox" id="history-toggle" v-model="historyToggleSwitch" />
        <label for="history-toggle">
          <div class="winner">
            <inline-svg
              :src="icon_public_92"
              width="20"
              height="20"
              :transform-source="winnerTransform"
            >
            </inline-svg>
            <P class="ml-1">{{ t("home.lucky_jackpot_text") }}</P>
          </div>
          <div class="prize">
            <inline-svg
              :src="icon_public_91"
              width="20"
              height="20"
              :transform-source="prizeTransform"
            >
            </inline-svg>
            <p class="ml-1">{{ t("home.latest_record_text") }}</p>
          </div>
        </label>
      </div>
      <v-card
        color="#211F32"
        theme="dark"
        height="500"
        class="mt-4 mx-2"
        v-if="!historyToggleSwitch"
      >
        <v-card color="#1D2027" theme="dark" height="40" class="mx-2 mt-2">
          <v-row class="mx-3 my-2 align-center">
            <v-col cols="3" class="text-700-14 gray py-0">{{
              t("home.rank_text")
            }}</v-col>
            <v-col cols="5" class="text-700-14 gray py-0">
              <p class="ml-2">{{ t("home.player_text") }}</p>
            </v-col>
            <v-col cols="4" class="text-700-14 gray py-0">{{
              t("home.profit_text")
            }}</v-col>
          </v-row>
        </v-card>
        <div class="m-home-overflow-auto" ref="luckyContainer" style="overflow-y: auto">
          <v-row
            v-for="(item, index) in luckyJackpotList"
            :key="index"
            class="mx-4 mt-2 align-center"
          >
            <v-col cols="3" class="py-1">
              <img :src="item.rank" v-if="!isNumeric(item.rank)" width="22" />
              <p class="text-500-14 gray text-center" style="width: 27px" v-else>
                {{ item.rank }}
              </p>
            </v-col>
            <v-col cols="5" class="d-flex align-center py-1">
              <img :src="item.player.image" width="40" />
              <p class="text-500-14 gray">{{ item.player.name }}</p>
            </v-col>
            <v-col cols="4" class="py-1 text-500-14 color-01983A text-center">{{
              item.profit
            }}</v-col>
          </v-row>
        </div>
      </v-card>
      <v-card
        color="#211F32"
        theme="dark"
        height="500"
        class="mt-4 mx-2 m-home-lucky-jackpot-height"
        v-else
      >
        <v-card color="#1D2027" theme="dark" height="40" class="mx-2 mt-2">
          <v-row class="mx-3 my-2 align-center">
            <v-col cols="4" class="text-700-14 gray py-0">{{
              t("home.game_text")
            }}</v-col>
            <v-col cols="4" class="text-700-14 gray py-0">
              <p class="ml-2">{{ t("home.player_text") }}</p>
            </v-col>
            <v-col cols="4" class="text-700-14 gray text-center py-0">{{
              t("home.amount_text")
            }}</v-col>
          </v-row>
        </v-card>

        <swiper
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
          <swiper-slide v-for="(item, index) in recordList" :key="index">
            <v-row class="mx-4 mt-1 align-center">
              <v-col cols="4" class="py-1 d-flex align-center">
                <img :src="item.game.image" width="22" />
                <p class="text-500-14 gray text-center ml-2">
                  {{ item.game.name }}
                </p>
              </v-col>
              <v-col cols="4" class="d-flex align-center py-1">
                <img :src="item.player.image" width="40" />
                <p class="text-500-14 gray">{{ item.player.name }}</p>
              </v-col>
              <v-col cols="4" class="py-1 text-500-14 color-01983A text-center">{{
                item.amount
              }}</v-col>
            </v-row>
          </swiper-slide>
        </swiper>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss"></style>
