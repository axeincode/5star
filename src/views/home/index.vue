<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  watch,
  ref,
  computed,
  onMounted,
  onUnmounted,
} from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import GameProviders from "@/components/global/game_provider/index.vue";
import { type GetUserInfo } from "@/interface/user";
// import { Carousel, Slide, Navigation } from "vue3-carousel";
import icon_public_92 from "@/assets/public/svg/icon_public_92.svg";
import icon_public_91 from "@/assets/public/svg/icon_public_91.svg";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_35 from "@/assets/public/svg/icon_public_35.svg";
import icon_public_36 from "@/assets/public/svg/icon_public_36.svg";
import icon_public_37 from "@/assets/public/svg/icon_public_37.svg";
import icon_public_95 from "@/assets/public/svg/icon_public_95.svg";
import icon_public_38 from "@/assets/public/svg/icon_public_38.svg";
import icon_public_39 from "@/assets/public/svg/icon_public_39.svg";
import img_public_42 from "@/assets/public/image/img_public_42.png";
import { mailStore } from "@/store/mail";
import { refferalStore } from "@/store/refferal";
import { appBarStore } from "@/store/appBar";
import { gameStore } from "@/store/game";
import { socketStore } from "@/store/socket";
import { authStore } from "@/store/auth";
import type * as Game from "@/interface/game";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Search from "@/views/home/components/Search.vue";
import MSearch from "@/views/home/components/mobile/Search.vue";
import { ProgressiveImage } from "vue-progressive-image";

import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
// import Swiper core and required modules
import { Pagination, Virtual, Autoplay, Navigation } from "swiper/modules";

const { setAuthModalType } = authStore();
const Dashboard = defineComponent({
  components: {
    GameProviders,
    // Carousel,
    // Slide,
    // Navigation,
    Swiper,
    SwiperSlide,
    Virtual,
    Autoplay,
    Pagination,
    Navigation,
    Search,
    MSearch,
    ProgressiveImage,
  },
  setup() {
    const { t } = useI18n();
    const { name, width } = useDisplay();
    const { dispatchGameCategories } = gameStore();
    const { dispatchGameSearch } = gameStore();
    const { dispatchGameEnter } = gameStore();
    const { dispatchUserGame } = gameStore();
    const { dispatchFavoriteGame } = gameStore();
    const { setOriginalGames } = gameStore();
    const { setMailMenuShow } = mailStore();
    const { setNavBarToggle } = appBarStore();
    const { setMainBlurEffectShow } = appBarStore();
    const { dispatchSocketConnect } = socketStore();
    const router = useRouter();

    // initiate component state
    const state = reactive({
      signupDialog: false,
      loginDialog: false,
      signoutDialog: false,
      mobileDialog: false,
      mobileDialogCheck: false,
      carouselSlides: [
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
      slides: [
        new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
        // new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
        // new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        // new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
        // new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
        // new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
        // new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
        // new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
        // new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
      ],
      originalGames: [
        new URL("@/assets/home/image/img_og_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_07.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_01.png", import.meta.url).href,
      ],
      mOriginalGames: [
        new URL("@/assets/home/image/img_og_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_06.png", import.meta.url).href,
      ],
      principalGames: [
        new URL("@/assets/home/image/img_pg_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_07.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_01.png", import.meta.url).href,
      ],
      mPrincipalGames: [
        new URL("@/assets/home/image/img_pg_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_06.png", import.meta.url).href,
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
        new URL("@/assets/home/image/img_slots_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_07.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_01.png", import.meta.url).href,
      ],
      mSlots: [
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
        new URL("@/assets/home/image/img_lc_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_07.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_01.png", import.meta.url).href,
      ],
      mLiveCasinos: [
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
      testGames: [
        new URL("@/assets/home/image/img_pg_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_pg_07.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_og_07.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_slots_07.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_03.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_04.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_05.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_06.png", import.meta.url).href,
        new URL("@/assets/home/image/img_lc_07.png", import.meta.url).href,
      ],
    });

    const luckyContainer = ref<HTMLElement | null>(null);
    const luckyScrollInterval = ref<any>(null);

    const recordContainer = ref<HTMLElement | null>(null);
    const recordScrollInterval = ref<any>(null);
    const historyToggleSwitch = ref<boolean>(false);
    const selectedGameFilterBtn = ref<string>(t("home.button.all_game"));
    const searchDialogShow = ref<boolean>(false);
    const filterTabText = ref<string>("lobby");
    const gameGroupBtnList = ref<Array<any>>([]);
    const selectedCategoryName = ref<string>("");
    const loading = ref<boolean>(false);

    const swiper = ref<any>(null);

    const winnerCheckboxColor = ref<string>("#ffffff");
    const prizeCheckboxColor = ref<string>("#7782AA");

    const whiteColor = ref<string>("#ffffff");

    const gameFilterIconColor1 = ref<string>("#ffffff");
    const gameFilterIconColor2 = ref<string>("#7782AA");
    const gameFilterIconColor3 = ref<string>("#7782AA");
    const gameFilterIconColor4 = ref<string>("#7782AA");
    const gameFilterIconColor5 = ref<string>("#7782AA");
    const gameFilterIconColor6 = ref<string>("#7782AA");
    const gameFilterIconColor7 = ref<string>("#7782AA");

    const allGames = ref<Array<Game.Category>>([]);
    const pagingGames = ref<Array<Game.Category>>([]);

    const currentPage = ref<number>(1);
    const moreGameCurrentPage = ref<number>(1);
    const limit = ref<number>(8);

    const moreLoading = ref<boolean>(false);
    const moreIndex = ref<number>(0);

    const refferalAppBarShow = computed(() => {
      const { getRefferalAppBarShow } = storeToRefs(refferalStore());
      return getRefferalAppBarShow.value;
    });

    const mobileVersion = computed(() => {
      return name.value;
    });

    const mobileWidth = computed(() => {
      return width.value;
    });

    const mailMenuShow = computed(() => {
      const { getMailMenuShow } = storeToRefs(mailStore());
      return getMailMenuShow.value;
    });

    const gameCategories = computed(() => {
      const { getGameCategories } = storeToRefs(gameStore());
      getGameCategories.value.map((item) => {
        item.games = [];
      });
      return getGameCategories.value;
    });

    const gameSearchList = computed(() => {
      const { getGameSearchList } = storeToRefs(gameStore());
      return getGameSearchList.value;
    });

    const success = computed(() => {
      const { getSuccess } = storeToRefs(gameStore());
      return getSuccess.value;
    });

    const searchGameDialogShow = computed(() => {
      const { getSearchGameDialogShow } = storeToRefs(gameStore());
      return getSearchGameDialogShow.value;
    });

    const gameFilterText = computed(() => {
      const { getGameFilterText } = storeToRefs(gameStore());
      return getGameFilterText.value;
    });

    const isNumeric = (value: any) => {
      return /^-?\d+$/.test(value);
    };

    const startLuckyScrollingInterval = () => {
      luckyScrollInterval.value = setInterval(() => {
        if (luckyContainer.value) {
          if (mobileWidth.value > 600) {
            luckyContainer.value.scrollTop += 56;
          } else {
            luckyContainer.value.scrollTop += 51;
          }
          // console.log(luckyContainer.value.scrollTop + luckyContainer.value.clientHeight, luckyContainer.value.scrollHeight);
          if (
            luckyContainer.value.scrollTop + luckyContainer.value.clientHeight >=
            luckyContainer.value.scrollHeight
          ) {
            state.luckyJackpotList = [
              ...state.luckyJackpotList,
              ...state.luckyJackpotList,
            ];
          }
        }
      }, 1000);
    };

    const startRecordScrollingInterval = () => {
      recordScrollInterval.value = setInterval(() => {
        if (recordContainer.value) {
          if (mobileWidth.value > 600) {
            recordContainer.value.scrollTop += 65.83;
          } else {
            recordContainer.value.scrollTop += 55.33;
          }
          if (
            recordContainer.value.scrollTop + recordContainer.value.clientHeight >=
            recordContainer.value.scrollHeight
          ) {
            state.recordList.push(state.recordList[Math.floor(Math.random() * 10)]);
          }
        }
      }, 600);
    };

    watch(mobileVersion, (newValue) => {
      if (newValue == "sm") {
        state.loginDialog = false;
        state.signupDialog = false;
        state.mobileDialog = false;
      }
    });

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
      // startRecordScrollingInterval();
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

    watch(searchGameDialogShow, (value) => {
      searchDialogShow.value = false;
    });

    const gameTransform1 = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", gameFilterIconColor1.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", gameFilterIconColor1.value);
        }
      }
      return el;
    };

    const gameTransform2 = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", gameFilterIconColor2.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", gameFilterIconColor2.value);
        }
      }
      return el;
    };

    const gameTransform3 = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", gameFilterIconColor3.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", gameFilterIconColor3.value);
        }
      }
      return el;
    };

    const gameTransform4 = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", gameFilterIconColor4.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", gameFilterIconColor4.value);
        }
      }
      return el;
    };

    const gameTransform5 = (el: any) => {
      el.children[0].setAttribute("fill", gameFilterIconColor5.value);
      return el;
    };

    const gameTransform6 = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", gameFilterIconColor6.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", gameFilterIconColor6.value);
        }
      }
      return el;
    };

    const gameTransform7 = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", gameFilterIconColor7.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", gameFilterIconColor7.value);
        }
      }
      return el;
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

    const favoriteIconTransform = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", "#D42763");
        for (let subNode of node.children) {
          subNode.setAttribute("fill", "#D42763");
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

    const iconTransform = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", whiteColor.value);
        for (let subNode of node.children) {
          subNode.setAttribute("fill", whiteColor.value);
        }
      }
      return el;
    };

    const pgIconTransform = (el: any) => {
      el.children[0].setAttribute("fill", whiteColor.value);
      return el;
    };

    const goToPrev = () => {
      swiper.value.slidePrev();
    };

    const goToNext = () => {
      swiper.value.slideNext();
    };

    const getSwiperRef = (swiperInstance: any) => {
      swiper.value = swiperInstance;
    };

    const handleEnterGame = async (id: number, name: string) => {

      const token = computed(() => {
        const { getToken } = storeToRefs(authStore());
        return getToken.value;
      });
      if (token.value != undefined) {
        let replaceName = name.replace(/ /g, "-");
      
        if (mobileWidth.value < 600) {
          setMailMenuShow(true);
        }
        router.push(`/game/${id}/${replaceName}`);
      } else {
        setAuthModalType('login');
      }

      
    };

    const handleGameFilterBtn = async (gamFilterBtn: string) => {
      currentPage.value = 1;
      selectedGameFilterBtn.value = gamFilterBtn;
      switch (selectedGameFilterBtn.value) {
        case t("home.button.all_game"):
          gameFilterIconColor1.value = "#FFFFFF";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "lobby";
          break;
        case "favorite":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#FFFFFF";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "favorite";
          break;
        case "history":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#FFFFFF";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "history";
          break;
        case "original":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#FFFFFF";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "original";
          break;
        case "pgsoft":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "pgsoft";
          break;
        case "slot":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#FFFFFF";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "slot";
          break;
        case "live":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#FFFFFF";
          filterTabText.value = "paging";
          selectedCategoryName.value = "live";
          break;
      }

      if (
        selectedCategoryName.value == "favorite" ||
        selectedCategoryName.value == "history"
      ) {
        console.log(selectedGameFilterBtn.value);
        await dispatchUserGame({
          game_categories_slug: selectedCategoryName.value,
          page: currentPage.value,
          limit: limit.value,
        });
        pagingGames.value.map(async (item) => {
          if (item.slug == selectedCategoryName.value) {
            if (gameSearchList.value.list.length > 0) {
              gameSearchList.value.list.map((item) => {
                item.image = state.testGames[Math.floor(Math.random() * 28)];
              });
            }
            item.page_no = 1;
            item.games = gameSearchList.value.list;
            item.game_count = gameSearchList.value.total;
          }
        });
      }
      if (mobileWidth.value > 600) {
        pagingGames.value.map((item) => {
          if (item.games.length > 7) {
            item.games = item.games.slice(0, 7);
            item.page_no = 1;
          }
        });
        allGames.value.map((item) => {
          if (item.games.length > 7) {
            item.games = item.games.slice(0, 7);
            item.page_no = 1;
          }
        });
      } else {
        pagingGames.value.map((item) => {
          if (item.games.length > 6) {
            item.games = item.games.slice(0, 6);
            item.page_no = 1;
          }
        });
        allGames.value.map((item) => {
          if (item.games.length > 6) {
            item.games = item.games.slice(0, 6);
            item.page_no = 1;
          }
        });
      }
      console.log(pagingGames.value);
    };

    const handleMoreGame = async (
      slug: string,
      page_no: number,
      index: number,
      gamFilterBtn: string
    ) => {
      let new_page_no = page_no + 1;
      moreGameCurrentPage.value += 1;
      moreLoading.value = true;
      moreIndex.value = index;
      if (slug == "favorite" || slug == "history") {
        await dispatchUserGame({
          game_categories_slug: selectedCategoryName.value,
          page: new_page_no,
          limit: limit.value * new_page_no,
        });
      } else {
        await dispatchGameSearch(
          "?game_categories_slug=" +
            slug +
            "&page=" +
            new_page_no +
            "&limit=" +
            limit.value
        );
      }
      moreLoading.value = false;
      gameSearchList.value.list.map((item) => {
        item.image = state.testGames[Math.floor(Math.random() * 28)];
      });
      if (gamFilterBtn == t("home.button.all_game")) {
        allGames.value.map((item) => {
          if (item.slug == slug) {
            item.games = [...item.games, ...gameSearchList.value.list];
            item.page_no = new_page_no;
          }
        });
      } else {
        pagingGames.value.map((item) => {
          if (item.slug == slug) {
            item.games = [...item.games, ...gameSearchList.value.list];
            item.page_no = new_page_no;
          }
        });
      }
    };

    const cancelFavoriteGame = async (id: string | number, page_no: number) => {
      await dispatchFavoriteGame({
        del_game: id,
      });
      // await dispatchUserGame({
      //   game_categories_slug: selectedCategoryName.value,
      //   page: currentPage.value,
      //   limit: limit.value * page_no,
      // });
      // gameSearchList.value.list.map((item) => {
      //   item.image = state.testGames[Math.floor(Math.random() * 28)];
      // });
      pagingGames.value.map((item) => {
        if (item.name == selectedCategoryName.value) {
          item.games = item.games.filter((gameItem) => gameItem.id != id);
          if (mobileWidth.value > 600) {
            item.page_no = Math.ceil(item.games.length / 7);
          } else {
            item.page_no = Math.ceil(item.games.length / 6);
          }
        }
      });
    };

    const handleSearchInputFocus = () => {
      searchDialogShow.value = true;
      setMailMenuShow(true);
    };

    watch(searchDialogShow, (value) => {
      setMailMenuShow(value);
    });

    watch(gameFilterText, async (value) => {
      selectedGameFilterBtn.value = value;
      switch (selectedGameFilterBtn.value) {
        case "favorite":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#FFFFFF";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "favorite";
          break;
        case "history":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#FFFFFF";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "history";
          break;
        case "original":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#FFFFFF";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "original";
          break;
        case "pgsoft":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "pgsoft";
          break;
        case "slot":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#FFFFFF";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "slot";
          break;
        case "live":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#7782AA";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#FFFFFF";
          filterTabText.value = "paging";
          selectedCategoryName.value = "live";
          break;
      }

      if (
        selectedCategoryName.value == "favorite" ||
        selectedCategoryName.value == "history"
      ) {
        await dispatchUserGame({
          game_categories_slug: selectedCategoryName.value,
          page: currentPage.value,
          limit: limit.value,
        });
        pagingGames.value.map(async (item) => {
          if (item.slug == selectedCategoryName.value) {
            if (gameSearchList.value.list.length > 0) {
              gameSearchList.value.list.map((item) => {
                item.image = state.testGames[Math.floor(Math.random() * 28)];
              });
            }
            item.page_no = 1;
            item.games = gameSearchList.value.list;
            item.game_count = gameSearchList.value.total;
          }
        });
      }
    });

    onMounted(async () => {
      loading.value = true;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      recordScrollInterval.value = setInterval(() => {
        state.recordList.push(state.recordList[Math.floor(Math.random() * 10)]);
      }, 600);
      await dispatchSocketConnect();
      await dispatchGameCategories("?type=paging");
      gameGroupBtnList.value = gameCategories.value;
      gameGroupBtnList.value.map((item) => {
        switch (item.slug) {
          case "favorite":
            item.tranfromFunctionName = "gameTransform2";
            break;
          case "history":
            item.tranfromFunctionName = "gameTransform3";
            break;
          case "original":
            item.tranfromFunctionName = "gameTransform4";
            break;
          case "pgsoft":
            item.tranfromFunctionName = "gameTransform5";
            break;
          case "slot":
            item.tranfromFunctionName = "gameTransform6";
            break;
          case "live":
            item.tranfromFunctionName = "gameTransform7";
            break;
        }
      });
      pagingGames.value = gameCategories.value;
      await Promise.all(
        pagingGames.value.map(async (item) => {
          if (item.slug == "favorite" || item.slug == "history") {
            await dispatchUserGame({
              game_categories_slug: item.slug,
              page: currentPage.value,
              limit: limit.value,
            });
          } else {
            await dispatchGameSearch(
              "?game_categories_slug=" +
                item.slug +
                "&page=" +
                currentPage.value +
                "&limit=" +
                limit.value
            );
          }
          if (gameSearchList.value.list.length > 0) {
            let index = 0;
            gameSearchList.value.list.map(async (gameItem) => {
              if (item.slug == "original") {
                gameItem.image = state.originalGames[index];
              } else if (item.slug == "pgsoft") {
                gameItem.image = state.principalGames[index];
              } else if (item.slug == "slot") {
                gameItem.image = state.slots[index];
              } else if (item.slug == "live") {
                gameItem.image = state.liveCasinos[index];
              } else {
                gameItem.image = state.testGames[Math.floor(Math.random() * 28)];
              }
              index++;
            });
          }
          item.page_no = 1;
          item.games = gameSearchList.value.list;
          item.game_count = gameSearchList.value.total;
        })
      );
      await dispatchGameCategories(`?type=${filterTabText.value}`);
      allGames.value = gameCategories.value;
      allGames.value.map(async (item) => {
        await dispatchGameSearch(
          "?game_categories_slug=" +
            item.slug +
            "&page=" +
            currentPage.value +
            "&limit=" +
            limit.value
        );
        if (gameSearchList.value.list.length > 0) {
          let index = 0;
          gameSearchList.value.list.map(async (gameItem) => {
            if (item.slug == "original") {
              gameItem.image = state.originalGames[index];
            } else if (item.slug == "pgsoft") {
              gameItem.image = state.principalGames[index];
            } else if (item.slug == "slot") {
              gameItem.image = state.slots[index];
            } else if (item.slug == "live") {
              gameItem.image = state.liveCasinos[index];
            } else {
              gameItem.image = state.testGames[Math.floor(Math.random() * 28)];
            }
            index++;
          });
        }
        item.page_no = 1;
        item.games = gameSearchList.value.list;
        if (item.slug == "original") {
          setOriginalGames(gameSearchList.value.list.slice(0, 9));
        }
      });

      loading.value = false;
    });

    onUnmounted(() => {
      clearInterval(luckyScrollInterval.value);
      clearInterval(recordScrollInterval.value);
    });

    return {
      t,
      ...toRefs(state),
      mobileVersion,
      mobileWidth,
      mailMenuShow,
      historyToggleSwitch,
      luckyContainer,
      recordContainer,
      winnerTransform,
      prizeTransform,
      isNumeric,
      modules: [Pagination, Virtual, Autoplay, Navigation],
      icon_public_92,
      icon_public_91,
      icon_public_34,
      icon_public_35,
      icon_public_36,
      icon_public_37,
      icon_public_95,
      icon_public_38,
      icon_public_39,
      img_public_42,
      goToPrev,
      goToNext,
      getSwiperRef,
      refferalAppBarShow,
      gameCategories,
      handleEnterGame,
      selectedGameFilterBtn,
      handleGameFilterBtn,
      gameTransform1,
      gameTransform2,
      gameTransform3,
      gameTransform4,
      gameTransform5,
      gameTransform6,
      gameTransform7,
      handleMoreGame,
      handleSearchInputFocus,
      searchDialogShow,
      selectedCategoryName,
      favoriteIconTransform,
      cancelFavoriteGame,
      gameGroupBtnList,
      iconTransform,
      pgIconTransform,
      moreLoading,
      moreIndex,
      loading,
      allGames,
      pagingGames,
    };
  },
});

export default Dashboard;
</script>

<template>
  <div class="m-home-loading" v-if="loading">
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div>
  <div class="home-body" :class="mobileWidth > 600 ? 'my-6 mx-6' : 'mx-2'" v-else>
    <v-navigation-drawer
      v-model="searchDialogShow"
      location="top"
      class="m-search-bar"
      temporary
      :touchless="true"
      :style="{ height: 'unset', top: '0px', zIndex: 300000, background: 'unset' }"
      v-if="mobileWidth < 600"
    >
      <MSearch :searchDialogShow="searchDialogShow" />
    </v-navigation-drawer>

    <div :class="searchDialogShow ? 'main-bg-blur' : ''">
      <!-- image carousel -->

      <!-- <v-carousel
        cycle
        interval="6000"
        height="247"
        hide-delimiter-background
        :hide-delimiters="slides.length <= 1"
        show-arrows="hover"
      >
        <template v-slot:prev="{ props }">
          <v-btn
            class="button-carousel text-none prev-btn-position"
            variant="elevated"
            icon="mdi-chevron-left"
            @click="props.onClick"
            v-if="slides.length > 1 && mobileWidth > 600"
          >
          </v-btn>
        </template>
        <template v-slot:next="{ props }">
          <v-btn
            class="button-carousel text-none next-btn-position"
            variant="elevated"
            icon="mdi-chevron-right"
            @click="props.onClick"
            v-if="slides.length > 1 && mobileWidth > 600"
          >
          </v-btn>
        </template>
        <v-carousel-item v-for="(slide, slideIndex) in carouselSlides" :key="slideIndex">
          <v-sheet color="#31275C" height="100%" tile>
            <v-row align="center" justify="center" class="mx-2 relative">
              <v-col
                v-for="(i, index) in 3"
                :key="index"
                cols="12"
                sm="6"
                md="6"
                lg="4"
                xl="4"
                :class="mobileWidth < 600 ? 'px-0' : 'px-2'"
              >
                <img
                  :src="slide[index]"
                  class="slider-img-width"
                  :class="mobileWidth < 600 ? 'm-carousel-img-border' : ''"
                />
              </v-col>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel> -->

      <div class="relative home-swiper" v-if="mobileWidth > 600">
        <swiper
          :modules="modules"
          :slidesPerView="3"
          :centeredSlides="true"
          :spaceBetween="16"
          :loop="true"
          :pagination="{
            el: '.swiper-pagination',
            clickable: true,
          }"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :navigation="false"
          :virtual="true"
          class="mx-4"
          style="border-radius: 8px; height: 225px"
          @swiper="getSwiperRef"
        >
          <swiper-slide
            v-for="(slide, index) in slides"
            :key="index"
            :virtualIndex="index"
          >
            <img
              :src="slide"
              class="slider-img-width"
              :class="mobileWidth < 600 ? 'm-carousel-img-border' : ''"
            />
          </swiper-slide>
        </swiper>

        <div class="swiper-button-next" slot="button-next" @click="goToNext"></div>
        <div class="swiper-button-prev" slot="button-prev" @click="goToPrev"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>

      <div
        class="relative m-home-swiper"
        :class="!refferalAppBarShow ? 'mt-2' : ''"
        v-else
      >
        <swiper
          :modules="modules"
          :slidesPerView="1"
          :spaceBetween="6"
          :centeredSlides="true"
          :loop="true"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :pagination="{
            el: '.swiper-pagination',
            clickable: true,
          }"
          :navigation="false"
          :virtual="true"
          class="mx-2"
          style="border-radius: 8px; height: 195px"
          @swiper="getSwiperRef"
        >
          <swiper-slide
            v-for="(slide, index) in slides"
            :key="index"
            :virtualIndex="index"
          >
            <img
              :src="slide"
              class="m-slider-img-width"
              :class="mobileWidth < 600 ? 'm-carousel-img-border' : ''"
            />
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>

      <!-- input for search -->
      <v-row class="mt-2 home-search-bar" :class="mobileWidth < 600 ? 'px-1' : 'px-4'">
        <v-text-field
          :placeholder="t('home.search')"
          class="form-textfield dark-textfield"
          variant="solo"
          hide-details
          filled
          clearable
          density="compact"
          prepend-inner-icon="mdi-magnify"
          color="#7782AA"
          :class="mobileWidth < 600 ? 'home-search-text-height' : ''"
          :onfocus="handleSearchInputFocus"
        />
      </v-row>

      <!-- buttons for filter -->
      <v-row :class="[mobileVersion == 'sm' ? 'mx-2 mb-0' : 'mx-4 mb-0']">
        <template v-if="mobileVersion != 'sm'">
          <v-slide-group
            class="mt-2"
            show-arrows
            style="
              touch-action: none;
              margin-left: 0px !important;
              margin-right: 0px !important;
              background: none !important;
            "
          >
            <v-slide-group-item>
              <v-btn
                class="mr-6 text-none"
                width="159"
                height="48"
                :class="
                  selectedGameFilterBtn == t('home.button.all_game')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.all_game'))"
              >
                <inline-svg
                  :src="icon_public_34"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform1"
                >
                </inline-svg>
                {{ t("home.button.all_game") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-6 text-none"
                width="144"
                height="48"
                :class="
                  selectedGameFilterBtn == t('home.button.favorite')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.favorite'))"
              >
                <inline-svg
                  :src="icon_public_36"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform2"
                ></inline-svg>
                {{ t("home.button.favorite") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-6 text-none"
                width="200"
                height="48"
                :class="
                  selectedGameFilterBtn == t('home.button.recently_played')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.recently_played'))"
              >
                <inline-svg
                  :src="icon_public_35"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform3"
                ></inline-svg>
                {{ t("home.button.recently_played") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-6 text-none"
                width="191"
                height="48"
                :class="
                  selectedGameFilterBtn == t('home.button.original_game')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.original_game'))"
              >
                <inline-svg
                  :src="icon_public_37"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform4"
                ></inline-svg>
                {{ t("home.button.original_game") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-6 text-none"
                width="134"
                height="48"
                :class="
                  selectedGameFilterBtn == t('home.button.pg_soft')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.pg_soft'))"
              >
                <inline-svg
                  :src="icon_public_95"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform5"
                ></inline-svg>
                {{ t("home.button.pg_soft") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-6 text-none"
                width="120"
                height="48"
                :class="
                  selectedGameFilterBtn == t('home.button.slots')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.slots'))"
              >
                <inline-svg
                  :src="icon_public_38"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform6"
                ></inline-svg>
                {{ t("home.button.slots") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-6 text-none"
                width="171"
                height="48"
                :class="
                  selectedGameFilterBtn == t('home.button.live_casino')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.live_casino'))"
              >
                <inline-svg
                  :src="icon_public_39"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform7"
                ></inline-svg>
                {{ t("home.button.live_casino") }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </template>
        <template v-else>
          <v-slide-group
            class="mt-4 mb-0"
            show-arrows
            style="
              touch-action: none;
              margin-left: 0px !important;
              margin-right: 0px !important;
              background: none !important;
            "
          >
            <v-slide-group-item>
              <v-btn
                class="mr-3 text-none"
                width="112"
                height="36"
                :class="
                  selectedGameFilterBtn == t('home.button.all_game')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.all_game'))"
              >
                <inline-svg
                  :src="icon_public_34"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform1"
                >
                </inline-svg>
                {{ t("home.button.all_game") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item v-for="(item, index) in gameGroupBtnList" :key="index">
              <v-btn
                class="mr-3 text-none"
                width="136"
                height="36"
                :class="
                  selectedGameFilterBtn == item.slug
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(item.slug)"
              >
                <inline-svg
                  :src="item.image"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform2"
                  v-if="item.tranfromFunctionName == 'gameTransform2'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform3"
                  v-if="item.tranfromFunctionName == 'gameTransform3'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform4"
                  v-if="item.tranfromFunctionName == 'gameTransform4'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform5"
                  v-if="item.tranfromFunctionName == 'gameTransform5'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform6"
                  v-if="item.tranfromFunctionName == 'gameTransform6'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform7"
                  v-if="item.tranfromFunctionName == 'gameTransform7'"
                ></inline-svg>
                {{ item.name }}
              </v-btn>
            </v-slide-group-item>
            <!-- <v-slide-group-item>
              <v-btn
                class="mr-3 text-none"
                width="112"
                height="36"
                :class="
                  selectedGameFilterBtn == t('home.button.favorite')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.favorite'))"
              >
                <inline-svg
                  :src="icon_public_36"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform2"
                ></inline-svg>
                {{ t("home.button.favorite") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-3 text-none"
                width="140"
                height="36"
                :class="
                  selectedGameFilterBtn == t('home.button.recently_played')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.recently_played'))"
              >
                <inline-svg
                  :src="icon_public_35"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform3"
                ></inline-svg>
                {{ t("home.button.recently_played") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-3 text-none"
                width="136"
                height="36"
                :class="
                  selectedGameFilterBtn == t('home.button.original_game')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.original_game'))"
              >
                <inline-svg
                  :src="icon_public_37"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform4"
                ></inline-svg>
                {{ t("home.button.original_game") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-3 text-none"
                width="112"
                height="36"
                :class="
                  selectedGameFilterBtn == t('home.button.pg_soft')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.pg_soft'))"
              >
                <inline-svg
                  :src="icon_public_95"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform5"
                ></inline-svg>
                {{ t("home.button.pg_soft") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-3 text-none"
                width="112"
                height="36"
                :class="
                  selectedGameFilterBtn == t('home.button.slots')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.slots'))"
              >
                <inline-svg
                  :src="icon_public_38"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform6"
                ></inline-svg>
                {{ t("home.button.slots") }}
              </v-btn>
            </v-slide-group-item>
            <v-slide-group-item>
              <v-btn
                class="mr-3 text-none"
                width="112"
                height="36"
                :class="
                  selectedGameFilterBtn == t('home.button.live_casino')
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(t('home.button.live_casino'))"
              >
                <inline-svg
                  :src="icon_public_39"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform7"
                ></inline-svg>
                {{ t("home.button.live_casino") }}
              </v-btn>
            </v-slide-group-item> -->
          </v-slide-group>
        </template>
      </v-row>

      <!-- game list -->
      <template
        v-for="(item, index) in allGames"
        :key="index"
        v-if="selectedGameFilterBtn == t('home.button.all_game')"
      >
        <v-row
          class="ml-4 original_game_text"
          :class="mobileWidth > 600 ? ' mt-12' : ' mt-7'"
          v-if="item.games.length > 0"
          style="margin-bottom: 6px !important"
        >
          <inline-svg
            :src="item.image"
            width="18"
            height="18"
            style="margin-right: 6px"
            :transform-source="iconTransform"
            v-if="item.slug != 'pgsoft'"
          >
          </inline-svg>
          <inline-svg
            :src="item.image"
            width="18"
            height="18"
            style="margin-right: 6px"
            :transform-source="pgIconTransform"
            v-else
          >
          </inline-svg>
          {{ item.name }}
        </v-row>
        <v-row class="ml-4 mr-2 mt-2 mb-0" v-if="mobileWidth > 600">
          <template
            v-for="(gameItem, gameIndex) in item.games"
            :key="gameIndex"
            v-if="item.games.length > 0"
          >
            <div
              style="flex: 0 0 14.2857%; max-width: 14.2857%; padding: 0px 8px 8px 0px"
              class="original-game-img-width"
              v-if="gameIndex < 7 * item.page_no"
            >
              <ProgressiveImage
                :src="gameItem.image"
                lazy-placeholder
                blur="30"
                @click="handleEnterGame(gameItem.id, gameItem.name)"
                style="max-width: unset"
              />
              <!-- <v-img
                :src="gameItem.image"
                class="original-game-img-width"
                @click="handleEnterGame(gameItem.id, gameItem.name)"
              /> -->
            </div>
          </template>
        </v-row>
        <v-row class="mx-1 mt-0 mb-0" v-else>
          <template
            v-for="(gameItem, gameIndex) in item.games"
            :key="gameIndex"
            v-if="item.games.length > 0"
          >
            <v-col
              cols="4"
              lg="2"
              md="2"
              sm="3"
              class="px-1 pb-0 original-game-img-width mb-2"
              v-if="gameIndex < 6 * item.page_no"
            >
              <ProgressiveImage
                :src="gameItem.image"
                lazy-placeholder
                blur="30"
                @click="handleEnterGame(gameItem.id, gameItem.name)"
              />
              <!-- <img
                v-lazy="gameItem.image"
                :data-src="gameItem.image"
                class="original-game-img-width"
                @click="handleEnterGame(gameItem.id, gameItem.name)"
              /> -->
            </v-col>
          </template>
        </v-row>
        <v-row
          class="justify-center"
          :class="mobileWidth < 600 ? 'pt-4 mx-3 mb-0 mt-0' : 'mt-8 ml-4'"
          v-if="
            ((mobileWidth < 600 &&
              Number(item.game_count) > 6 &&
              6 * Number(item.page_no) < Number(item.game_count)) ||
              (mobileWidth > 600 &&
                Number(item.game_count) > 7 &&
                7 * Number(item.page_no) < Number(item.game_count))) &&
            item.games.length > 0
          "
        >
          <div style="width: 100%" class="text-center">
            <template v-if="selectedGameFilterBtn != t('home.button.all_game')">
              <p class="text-700-14 gray text-center" v-if="mobileWidth < 600">
                {{ t("home.more_text_1") }}
                <font color="white">{{ 6 * item.page_no }}</font>
                {{ t("home.more_text_2") }}
                <font color="white">{{ item.game_count }}</font>
                {{ t("home.more_text_3") }}
              </p>
              <p class="text-700-18 gray text-center" v-else>
                {{ t("home.more_text_1") }}
                <font color="white">{{ 7 * item.page_no }}</font>
                {{ t("home.more_text_2") }}
                <font color="white">{{ item.game_count }}</font>
                {{ t("home.more_text_3") }}
              </p>
            </template>
            <v-btn
              class="text-none more-btn-color text-center"
              variant="outlined"
              :width="mobileWidth < 600 ? '100%' : 164"
              :height="mobileWidth < 600 ? 41 : 48"
              @click="
                handleMoreGame(item.slug, item.page_no, index, selectedGameFilterBtn)
              "
            >
              <div class="loading-body" v-if="moreLoading && index == moreIndex">
                <div class="dot-0"></div>
                <div class="dot-1"></div>
                <div class="dot-0"></div>
              </div>
              <div v-else>{{ t("home.more") }}</div>
            </v-btn>
          </div>
        </v-row>
      </template>
      <template
        v-for="(otherGameItem, otherIndex) in pagingGames"
        :key="otherIndex"
        v-else
      >
        <template v-if="otherGameItem.slug == selectedCategoryName">
          <v-row
            class="ml-4 mr-2 mt-2 pt-8"
            v-if="mobileWidth > 600"
            :class="otherGameItem.games.length > 0 ? '' : 'justify-center'"
          >
            <template
              v-for="(gameItem, gameIndex) in otherGameItem.games"
              :key="gameIndex"
              v-if="
                otherGameItem.games.length > 0 &&
                otherGameItem.games != undefined &&
                otherGameItem.games != null
              "
            >
              <div
                style="
                  flex: 0 0 14.2857%;
                  max-width: 14.2857%;
                  padding: 0px 8px 8px 0px;
                  position: relative;
                "
                class="original-game-img-width"
                v-if="gameIndex < 7 * otherGameItem.page_no"
              >
                <ProgressiveImage
                  :src="gameItem.image"
                  lazy-placeholder
                  blur="30"
                  @click="handleEnterGame(gameItem.id, gameItem.name)"
                />
                <div
                  v-if="selectedCategoryName == 'favorite'"
                  class="home-favorite-icon"
                  @click="cancelFavoriteGame(gameItem.id, otherGameItem.page_no)"
                >
                  <inline-svg
                    :src="icon_public_36"
                    width="20"
                    height="20"
                    style="margin: 6px 0px 0px 6px"
                    :transform-source="favoriteIconTransform"
                  ></inline-svg>
                </div>
                <!-- <v-img
                :src="gameItem.image"
                class="original-game-img-width"
                @click="handleEnterGame(gameItem.id, gameItem.name)"
              /> -->
              </div>
            </template>
            <div class="mt-2" style="height: 200px" v-else>
              <img src="@/assets/public/image/img_public_20.png" class="text-center" />
              <p class="text-400-12 gray">{{ t("home.search_dialog.text_2") }}</p>
            </div>
          </v-row>
          <v-row
            class="mx-1 mt-6"
            :class="otherGameItem.games.length > 0 ? '' : 'justify-center'"
            v-else
          >
            <template
              v-for="(gameItem, gameIndex) in otherGameItem.games"
              :key="gameIndex"
              v-if="
                otherGameItem.games.length > 0 &&
                otherGameItem.games != undefined &&
                otherGameItem.games != null
              "
            >
              <v-col
                cols="4"
                lg="2"
                md="2"
                sm="3"
                class="px-1 pb-0 relative original-game-img-width"
                v-if="gameIndex < 6 * otherGameItem.page_no"
              >
                <ProgressiveImage
                  :src="gameItem.image"
                  lazy-placeholder
                  blur="30"
                  @click="handleEnterGame(gameItem.id, gameItem.name)"
                />
                <div
                  v-if="selectedCategoryName == 'favorite'"
                  class="m-home-favorite-icon"
                  @click="cancelFavoriteGame(gameItem.id, otherGameItem.page_no)"
                >
                  <inline-svg
                    :src="icon_public_36"
                    width="16"
                    height="16"
                    class="mt-1 ml-1"
                    :transform-source="favoriteIconTransform"
                  ></inline-svg>
                </div>
                <!-- <img
                v-lazy="gameItem.image"
                :data-src="gameItem.image"
                class="original-game-img-width"
                @click="handleEnterGame(gameItem.id, gameItem.name)"
              /> -->
              </v-col>
            </template>
            <div class="mt-10" style="height: 200px" v-else>
              <img src="@/assets/public/image/img_public_20.png" class="text-center" />
              <p class="text-400-12 gray">{{ t("home.search_dialog.text_2") }}</p>
            </div>
          </v-row>
          <v-row
            class="justify-center"
            :class="mobileWidth < 600 ? 'pt-4 mx-3 mb-0' : 'mt-8 ml-4'"
            v-if="
              ((mobileWidth < 600 &&
                Number(otherGameItem.game_count) > 6 &&
                6 * Number(otherGameItem.page_no) < Number(otherGameItem.game_count)) ||
                (mobileWidth > 600 &&
                  Number(otherGameItem.game_count) > 7 &&
                  7 * Number(otherGameItem.page_no) <
                    Number(otherGameItem.game_count))) &&
              otherGameItem.games.length > 0
            "
          >
            <div class="text-center" style="width: 100%">
              <p class="text-700-14 gray text-center" v-if="mobileWidth < 600">
                {{ t("home.more_text_1") }}
                <font color="white">{{ 6 * otherGameItem.page_no }}</font>
                {{ t("home.more_text_2") }}
                <font color="white">{{ otherGameItem.game_count }}</font>
                {{ t("home.more_text_3") }}
              </p>
              <p class="text-700-18 gray text-center" v-else>
                {{ t("home.more_text_1") }}
                <font color="white">{{ 7 * otherGameItem.page_no }}</font>
                {{ t("home.more_text_2") }}
                <font color="white">{{ otherGameItem.game_count }}</font>
                {{ t("home.more_text_3") }}
              </p>
              <v-btn
                class="text-none more-btn-color mt-5 text-center"
                variant="outlined"
                :width="mobileWidth < 600 ? '100%' : 164"
                :height="mobileWidth < 600 ? 41 : 48"
                @click="
                  handleMoreGame(
                    otherGameItem.slug,
                    otherGameItem.page_no,
                    otherIndex,
                    selectedGameFilterBtn
                  )
                "
              >
                <div v-if="!moreLoading">{{ t("home.more") }}</div>
                <div class="loading-body" v-if="moreLoading && otherIndex == moreIndex">
                  <div class="dot-0"></div>
                  <div class="dot-1"></div>
                  <div class="dot-0"></div>
                </div>
              </v-btn>
            </div>
          </v-row>
        </template>
      </template>

      <!-- original games -->

      <!-- <v-row class="ml-4 mt-6 mb-1 original_game_text">
        {{ t("home.original_games") }}
      </v-row>
      <v-row class="ml-4 mr-2 mt-2" v-if="mobileWidth > 600">
        <div
          style="flex: 0 0 14.2857%; max-width: 14.2857%; padding-right: 8px"
          v-for="(item, index) in originalGames"
          :key="index"
        >
          <v-img :src="item" class="original-game-img-width" />
        </div>
      </v-row>
      <v-row class="mx-1 mt-0" v-else>
        <v-col
          cols="4"
          lg="2"
          md="2"
          sm="3"
          class="px-1"
          v-for="(item, index) in mOriginalGames"
          :key="index"
        >
          <img
            v-lazy="item"
            alt="Lazy loaded image"
            :data-src="item"
            class="original-game-img-width"
          />
        </v-col>
      </v-row>
      <v-row
        class="justify-center"
        :class="mobileWidth < 600 ? 'mt-6 mx-3 mb-0' : 'mt-8 ml-4'"
      >
        <v-btn
          class="text-none more-btn-color"
          variant="outlined"
          :width="mobileWidth < 600 ? '100%' : 164"
          :height="mobileWidth < 600 ? 41 : 48"
        >
          {{ t("home.more") }}
        </v-btn>
      </v-row> -->

      <!-- principal games -->

      <!-- <v-row class="ml-4 mt-7 mb-0 original_game_text">
        {{ t("home.principal") }}
      </v-row>
      <v-row class="ml-4 mr-2 mt-2" v-if="mobileWidth > 600">
        <div
          style="flex: 0 0 14.2857%; max-width: 14.2857%; padding-right: 8px"
          v-for="(principalItem, principalIndex) in principalGames"
          :key="principalIndex"
        >
          <v-img :src="principalItem" class="original-game-img-width" />
        </div>
      </v-row>
      <v-row class="mx-1 mt-2" v-else>
        <v-col
          cols="4"
          lg="2"
          md="2"
          sm="3"
          class="px-1"
          v-for="(principalItem, principalIndex) in mPrincipalGames"
          :key="principalIndex"
        >
          <v-img :src="principalItem" class="original-game-img-width" />
        </v-col>
      </v-row>
      <v-row class="justify-center" :class="mobileWidth < 600 ? 'mt-6 mx-3' : 'mt-8 ml-4'">
        <v-btn
          :ripple="false"
          class="text-none more-btn-color"
          variant="outlined"
          :width="mobileWidth < 600 ? '100%' : 164"
          :height="mobileWidth < 600 ? 41 : 48"
        >
          {{ t("home.more") }}
        </v-btn>
      </v-row> -->

      <!-------------------- game providers -------------->

      <GameProviders />

      <!-------------------- slot games -------------->

      <!-- <v-row class="ml-4 mt-6 mb-2 original_game_text">
        {{ t("home.slots") }}
      </v-row>
      <v-row class="ml-4 mr-2 mt-2" v-if="mobileWidth > 600">
        <div
          style="flex: 0 0 14.2857%; max-width: 14.2857%; padding-right: 8px"
          v-for="(slotItem, slotIndex) in slots"
          :key="slotIndex"
        >
          <v-img :src="slotItem" class="original-game-img-width" />
        </div>
      </v-row>
      <v-row class="mx-1 mt-2" v-else>
        <v-col
          cols="4"
          lg="2"
          md="2"
          sm="3"
          class="px-1"
          v-for="(slotItem, slotIndex) in mSlots"
          :key="slotIndex"
        >
          <v-img :src="slotItem" class="original-game-img-width" />
        </v-col>
      </v-row>
      <v-row class="justify-center" :class="mobileWidth < 600 ? 'mt-6 mx-3' : 'mt-8 ml-4'">
        <v-btn
          class="text-none more-btn-color"
          variant="outlined"
          :width="mobileWidth < 600 ? '100%' : 164"
          :height="mobileWidth < 600 ? 41 : 48"
        >
          {{ t("home.more") }}
        </v-btn>
      </v-row> -->

      <!-------------------- live casino games -------------->

      <!-- <v-row class="ml-4 mt-6 mb-2 original_game_text">
        {{ t("home.live_casino") }}
      </v-row>
      <v-row class="ml-4 mr-2 mt-2" v-if="mobileWidth > 600">
        <div
          style="flex: 0 0 14.2857%; max-width: 14.2857%; padding-right: 8px"
          v-for="(liveCasinoItem, liveCasinoIndex) in liveCasinos"
          :key="liveCasinoIndex"
        >
          <v-img :src="liveCasinoItem" class="original-game-img-width" />
        </div>
      </v-row>
      <v-row class="mx-1 mt-2" v-else>
        <v-col
          cols="4"
          lg="2"
          md="2"
          sm="3"
          class="px-1"
          v-for="(liveCasinoItem, liveCasinoIndex) in mLiveCasinos"
          :key="liveCasinoIndex"
        >
          <v-img :src="liveCasinoItem" class="original-game-img-width" />
        </v-col>
      </v-row>
      <v-row class="justify-center" :class="mobileWidth < 600 ? 'mt-6 mx-3' : 'mt-8 ml-4'">
        <v-btn
          class="text-none more-btn-color"
          variant="outlined"
          :width="mobileWidth < 600 ? '100%' : 164"
          :height="mobileWidth < 600 ? 41 : 48"
        >
          {{ t("home.more") }}
        </v-btn>
      </v-row> -->

      <!--------------------- Game History ---------------------->
      <v-row class="mx-2 mt-6" v-if="mobileWidth > 600">
        <v-col cols="12" md="6">
          <div class="d-flex align-center">
            <img src="@/assets/public/svg/icon_public_92.svg" />
            <p class="text-700-20 white ml-3">{{ t("home.lucky_jackpot_text") }}</p>
          </div>
          <v-card color="#211F32" theme="dark" class="home-lucky-jackpot-height mt-4">
            <v-card
              color="#29253C"
              theme="dark"
              height="64"
              class="mx-2 mt-2"
              style="border-radius: 16px; background: #29253c; box-shadow: unset"
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
              color="#29253C"
              theme="dark"
              height="64"
              class="mx-2 mt-2"
              style="border-radius: 16px; background: #29253c; box-shadow: unset"
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
              :preventInteractionOnTransition="true"
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
              </swiper-slide>
            </swiper>
            <!-- <div class="home-overflow-auto" ref="recordContainer">
              <v-row
                v-for="(item, index) in recordList"
                :key="index"
                class="mx-4 mt-2 align-center"
              >
                <v-col cols="4" class="py-1 d-flex align-center">
                  <img :src="item.game.image" />
                  <p class="text-500-16 gray text-center ml-2">{{ item.game.name }}</p>
                </v-col>
                <v-col cols="4" class="d-flex align-center py-1">
                  <img :src="item.player.image" width="46" />
                  <p class="text-500-16 gray">{{ item.player.name }}</p>
                </v-col>
                <v-col cols="4" class="py-1 text-500-16 color-01983A text-center">{{
                  item.amount
                }}</v-col>
              </v-row>
            </div> -->
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
                <!-- <img src="@/assets/public/svg/icon_public_92.svg" width="20" /> -->
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
                <!-- <img src="@/assets/public/svg/icon_public_91.svg" width="20" /> -->
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
            <v-card color="#29253C" theme="dark" height="40" class="mx-2 mt-2">
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
            <div
              class="m-home-overflow-auto"
              ref="luckyContainer"
              style="overflow-y: auto"
            >
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
            <v-card color="#29253C" theme="dark" height="40" class="mx-2 mt-2">
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
                    <p class="text-500-14 gray text-center ml-2">{{ item.game.name }}</p>
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
            <!-- <div class="m-home-overflow-auto" ref="recordContainer">
              <v-row
                v-for="(item, index) in recordList"
                :key="index"
                class="mx-4 mt-1 align-center"
              >
                <v-col cols="4" class="py-1 d-flex align-center">
                  <img :src="item.game.image" width="22" />
                  <p class="text-500-14 gray text-center ml-2">{{ item.game.name }}</p>
                </v-col>
                <v-col cols="4" class="d-flex align-center py-1">
                  <img :src="item.player.image" width="40" />
                  <p class="text-500-14 gray">{{ item.player.name }}</p>
                </v-col>
                <v-col cols="4" class="py-1 text-500-14 color-01983A text-center">{{
                  item.amount
                }}</v-col>
              </v-row>
            </div> -->
          </v-card>
        </v-col>
      </v-row>
    </div>
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

@keyframes opacityAnimation {
  0% {
    opacity: 0.4;
  }

  20% {
    opacity: 0.5;
  }

  40% {
    opacity: 0.6;
  }

  60% {
    opacity: 0.8;
  }

  80% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
}

.v-progressive-image-main {
  width: 100%;
  height: 100%;
}

.m-home-loading {
  height: 100vh;
  position: relative;
  overflow-y: hidden;

  .loading-body {
    display: flex;
    align-items: center;
    position: absolute;
    top: 40%;
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

.more-btn-color {
  .loading-body {
    display: flex;
    align-items: center;
    position: absolute;
    top: 11px;
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

.home-favorite-icon {
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 11px;
  width: 32px;
  height: 32px;
  background: #29263c;
  border-radius: 32px;
  filter: drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.21));
}

.m-home-favorite-icon {
  position: absolute;
  top: 13px;
  right: 2px;
  width: 24px;
  height: 24px;
  background: #29263c;
  border-radius: 24px;
  filter: drop-shadow(0px 2.25px 3px rgba(0, 0, 0, 0.21));
}

.home-favorite-icon:active {
  transform: scale(0.9);
  filter: brightness(80%);
  transition-duration: 0.28s;
}

.m-home-favorite-icon:active {
  transform: scale(0.9);
  filter: brightness(80%);
  transition-duration: 0.28s;
}

.swiper-vertical {
  // touch-action: unset;
}

.home-body {
  .v-progressive-image {
    border-radius: 8px 46px;
    background: #211f31;
    height: 100%;
  }

  .v-progressive-image-loading:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 46px;
    background-image: url("@/assets/public/image/img_public_42.png");
    background-repeat: no-repeat;
    background-size: contain;
    animation: opacityAnimation 0.6s ease-in infinite;
  }

  // .v-progressive-image-placeholder {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   width: 68px;
  //   height: 64px;
  //   animation: opacityAnimation 0.6s ease-in infinite;
  //   filter: unset;
  // }

  @media (max-width: 600px) {
    // .v-progressive-image-placeholder {
    //   width: 48px;
    //   height: 46px;
    // }

    .v-progressive-image {
      border-radius: 8px 32px;
    }
  }

  .v-navigation-drawer__scrim {
    background: black !important;
    opacity: 0 !important;
  }

  .v-navigation-drawer--top {
    border: none;
  }

  .v-slide-group__prev,
  .v-slide-group__next {
    color: white !important;
    display: none;
  }
}

.home-swiper {
  height: 247px;

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

.home-overflow-auto {
  overflow-y: hidden;
  scroll-behavior: smooth;
  height: 568px;
}

.v-field__input::placeholder {
  opacity: unset !important;
  color: #7782aa !important;
  font-family: "Inter";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.v-field__prepend-inner {
  .v-icon {
    opacity: unset !important;
    color: #7782aa;
  }
}

@media (max-width: 600px) {
  .btn-211f31 {
    border-radius: 10px !important;

    .v-btn__content {
      font-size: 12px;
    }
  }

  .button-bright {
    border-radius: 10px !important;

    .v-btn__content {
      font-size: 12px;
    }
  }

  .home-game-frame-area {
    margin-top: 0px;
  }

  .home-search-text-height {
    height: 30px !important;

    .v-field__field {
      padding-left: 0px !important;
    }

    .v-field__input::placeholder {
      opacity: unset !important;
      color: #7782aa !important;
      font-family: "Inter";
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
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

.slider-img-width {
  width: 100%;
  height: 225px;
}

.m-slider-img-width {
  width: 100%;
  height: 195px;
}

.slider-img-width:active {
  // transform: scale(1.2);
  // filter: brightness(80%);
  // transition-duration: 0.28s;
}

.v-field {
  color: white !important;
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
  border-radius: 12px !important;

  .v-btn__content {
    font-weight: 700 !important;
    font-size: 16px;
  }
}

.popular-btn-color {
  border-radius: 12px !important;

  .v-btn__content {
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

// original game
.original_game_text {
  color: #ffffff;
  font-weight: 700;
  font-size: 22px;
  align-items: center;
}

@media (max-width: 600px) {
  .original_game_text {
    font-size: 16px;
    font-weight: 800;
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
  cursor: pointer;
  // max-width: 211px !important;
  // width: 100%;
  // height: 100%;
  // cursor: pointer;
}

.original-game-img-width:active {
  transform: scale(0.9);
  filter: brightness(80%);
  transition-duration: 0.28s;
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
    width: 276px;
    height: 38px;
    position: relative;
    display: block;
    border-radius: 8px;
    background: #211f31;
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
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
    }

    .prize {
      display: flex;
      align-items: center;
      left: 154px;
      transition: 0.3s;
      color: #7782aa;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
    }
  }

  label:after {
    content: "";
    width: 136px;
    height: 34px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: #32cfec;
    border-radius: 8px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:checked + label:after {
    left: 274px;
    transform: translateX(-100%);
  }

  label:active:after {
    width: 136px;
  }

  input:checked + label .winner {
    color: #7782aa;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }

  input:checked + label .prize {
    color: black;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
  }
}

.v-carousel__controls {
  .v-btn {
    background-color: #7782aa !important;
    width: 6px !important;
    height: 6px !important;
    margin-right: 6px !important;

    .v-btn__content .v-icon {
      display: none;
      /* Removes the default icon */
    }
  }

  .v-btn--active {
    width: 18px !important;
    height: 6px !important;
    border-radius: 24px !important;
    background: var(--white-bg, #fff) !important;
  }
}

.home-search-bar {
  .form-textfield .v-field__overlay {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.m-search-bar {
  box-shadow: none !important;
}
</style>
