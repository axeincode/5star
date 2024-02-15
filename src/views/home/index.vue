<script lang="ts">
import { defineComponent } from "vue";
import { toRefs } from "vue";
import { reactive } from "vue";
import { watch } from "vue";
import { ref } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";
import { onUnmounted } from "vue";
import { getCurrentInstance } from "vue";
import { defineAsyncComponent } from "vue";
import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
// import GameProviders from "@/components/global/game_provider/index.vue";
import { type GetUserInfo } from "@/interface/user";
import icon_public_92 from "@/assets/public/svg/icon_public_92.svg";
import icon_public_91 from "@/assets/public/svg/icon_public_91.svg";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_35 from "@/assets/public/svg/icon_public_35.svg";
import icon_public_36 from "@/assets/public/svg/icon_public_36.svg";
import icon_public_37 from "@/assets/public/svg/icon_public_37.svg";
import icon_public_95 from "@/assets/public/svg/icon_public_95.svg";
import icon_public_38 from "@/assets/public/svg/icon_public_38.svg";
import icon_public_39 from "@/assets/public/svg/icon_public_39.svg";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
import img_public_42 from "@/assets/public/image/img_public_42.png";
import { mailStore } from "@/store/mail";
import { refferalStore } from "@/store/refferal";
import { appBarStore } from "@/store/appBar";
import { gameStore } from "@/store/game";
import { socketStore } from "@/store/socket";
import { authStore } from "@/store/auth";
import type * as Game from "@/interface/game";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import MGameConfirm from "@/views/home/components/mobile/GameConfirm.vue";
import { ProgressiveImage } from "vue-progressive-image";
import { mainStore } from "@/store/main";

const GameProviders = defineAsyncComponent(() => import("@/components/global/game_provider/index.vue"));

const { setAuthModalType } = authStore();
const Dashboard = defineComponent({
  async beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: any) {
    await Promise.all([
      import('@/layouts/index.vue'),
      import('@/views/vip/index.vue'),
      import('@/views/affiliate/index.vue'),
      import('@/views/bonus_transaction/index.vue'),
      import('@/views/account/index.vue'),
      import('@/views/game/index.vue'),
    ])
    next()
  },
  components: {
    GameProviders,
    MGameConfirm,
    ProgressiveImage,
  },
  setup() {
    const { t } = useI18n();
    const { name, width } = useDisplay();
    const { dispatchGameCategories } = gameStore();
    const { dispatchGameFavoriteList } = gameStore();
    const { dispatchGameSearch } = gameStore();
    const { dispatchGameEnter } = gameStore();
    const { dispatchUserGame } = gameStore();
    const { dispatchFavoriteGame } = gameStore();
    const { setOriginalGames } = gameStore();
    const { setFavoriteGameList } = gameStore();
    const { setMailMenuShow } = mailStore();
    const { setNavBarToggle } = appBarStore();
    const { setMainBlurEffectShow } = appBarStore();
    const { dispatchSocketConnect } = socketStore();
    const { setSearchDialogShow } = mainStore();
    const router = useRouter();
    const route = useRoute();
    const instance = getCurrentInstance();
    // const { dispatchUserActivityList } = gameStore()

    // initiate component state
    const state = reactive({
      signupDialog: false,
      loginDialog: false,
      signoutDialog: false,
      mobileDialog: false,
      mobileDialogCheck: false,
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
      paginGameShow: false,
      is_favorite: false,
    });

    const selectedGameFilterBtn = ref<any>(t("home.button.all_game"));
    const gameConfirmDialogShow = ref<boolean>(false);
    const filterTabText = ref<string>("lobby");
    const gameGroupBtnList = ref<Array<any>>([]);
    const selectedCategoryName = ref<any>("");
    const loading = ref<boolean>(false);
    const selectedGameItem = ref<Game.GameItem>({
      id: 0,
      name: "",
      image: "",
      provider: "",
      is_demo: false
    })

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

    const bannerComponent = ref<any>(null);
    const gameHistoryComponent = ref<any>(null);
    const liveWinComponent = ref<any>(null);
    const betHistoryComponent = ref<any>(null);

    const customTransition = ref<string>('custom-slide-transition');

    const bannerLoad = async () => {
      const bannerValue = await import('@/views/home/components/Banner.vue');
      bannerComponent.value = bannerValue.default;
    }

    const gameHistoryLoad = async () => {
      const gameHistoryValue = await import('@/views/home/components/GameHistory.vue');
      gameHistoryComponent.value = gameHistoryValue.default;
    }

    const betHistoryLoad = async () => {
      const betHistoryValue = await import('@/views/home/components/BetHistory.vue');
      betHistoryComponent.value = betHistoryValue.default;
    }

    const liveWinLoad = async () => {
      const liveWinValue = await import('@/views/home/components/LiveWin.vue');
      liveWinComponent.value = liveWinValue.default;
    }

    // get Token
    const token = computed(() => {
      const { getToken } = storeToRefs(authStore());
      return getToken.value;
    });

    const favoriteGameList = computed(() => {
      const { getFavoriteGameList } = storeToRefs(gameStore());
      console.log("11111111111111", getFavoriteGameList.value);
      return getFavoriteGameList.value
    })

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
      getGameCategories.value.map((item: any) => {
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

    const cdnUrl = computed(() => {
      return instance?.appContext.config.globalProperties.$cdn('vue');
    })

    watch(mobileVersion, (newValue: string) => {
      if (newValue == "sm") {
        state.loginDialog = false;
        state.signupDialog = false;
        state.mobileDialog = false;
      }
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

    const favoriteIconTransform = (el: any) => {
      for (let node of el.children) {
        node.setAttribute("fill", "#F9BC01");
        for (let subNode of node.children) {
          subNode.setAttribute("fill", "#F9BC01");
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

    const handleEnterGame = async (id: number, name: string) => {
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

    const gameFilterBtnFlag = ref<boolean>(false);

    const handleGameFilterBtn = async (gamFilterBtn: string) => {
      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });
      console.log(gamFilterBtn, t("home.button.all_game"));
      if (gameFilterBtnFlag.value) {
        return;
      }
      gameFilterBtnFlag.value = true;
      currentPage.value = 1;
      selectedGameFilterBtn.value = gamFilterBtn == "original" ? t("home.button.all_game") : gamFilterBtn;
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
        case "PGSOFT":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "PGSOFT";
          break;
        case "SOFTSWISS":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "SOFTSWISS";
          break;
        case "Evoplay":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "Evoplay";
          break;
        case "Bgaming":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "Bgaming";
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
        pagingGames.value.map(async (item: { slug: any; page_no: number; games: any; game_count: any; }) => {
          if (item.slug == selectedCategoryName.value) {
            if (gameSearchList.value.list.length > 0) {
              gameSearchList.value.list.map((item: { image: any; }) => {
                // item.image = state.testGames[Math.floor(Math.random() * 28)];
              });
            }
            item.page_no = 1;
            item.games = gameSearchList.value.list;
            item.game_count = gameSearchList.value.total;
          }
        });
      }
      if (mobileWidth.value > 600) {
        pagingGames.value.map((item: { games: string | any[]; page_no: number; }) => {
          if (item.games.length > 7) {
            item.games = item.games.slice(0, 7);
            item.page_no = 1;
          }
        });
        allGames.value.map((item: { games: string | any[]; page_no: number; }) => {
          if (item.games.length > 7) {
            item.games = item.games.slice(0, 7);
            item.page_no = 1;
          }
        });
      } else {
        pagingGames.value.map((item: { games: string | any[]; page_no: number; }) => {
          if (item.games.length > 6) {
            item.games = item.games.slice(0, 6);
            item.page_no = 1;
          }
        });
        allGames.value.map((item: { games: string | any[]; page_no: number; }) => {
          if (item.games.length > 6) {
            item.games = item.games.slice(0, 6);
            item.page_no = 1;
          }
        });
      }
      console.log(pagingGames.value);
      gameFilterBtnFlag.value = false;
    };

    watch(selectedGameFilterBtn, ()=>{
      const element = document.getElementsByClassName('filter-btn-container'); // Replace 'your-element-id' with the actual ID of your element
      if(element != undefined){
        let curPos = element[0].scrollLeft;
        let index = gameGroupBtnList.value.findIndex(item => item.slug == selectedGameFilterBtn.value);
        index = index + 1;
        let left = 0;
        let right = 116.48;
        if(index > 0){
          left = 116.48 + 148 * (index - 1);
          right = left + 148;
        }
        const width = element[0].offsetWidth;
        if(!(left > curPos && left < curPos + width)){
          element[0].scrollLeft = 116.48 + (index - 1) * 148;
        }
      }
    })
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
      gameSearchList.value.list.map((item: { image: any; }) => {
        // item.image = state.testGames[Math.floor(Math.random() * 28)];
      });
      if (gamFilterBtn == t("home.button.all_game")) {
        allGames.value.map((item: { slug: string; games: any[]; page_no: number; }) => {
          if (item.slug == slug) {
            item.games = [...item.games, ...gameSearchList.value.list];
            item.page_no = new_page_no;
          }
        });
      } else {
        pagingGames.value.map((item: { slug: string; games: any[]; page_no: number; }) => {
          if (item.slug == slug) {
            item.games = [...item.games, ...gameSearchList.value.list];
            item.page_no = new_page_no;
          }
        });
      }
    };
    // 添加收藏
    const addFavoriteGame = async (id: string | number) => {
      await dispatchFavoriteGame({
        add_game: id,
      });
    }

    // 取消收藏
    const cancelFavoriteGame = async (id: string | number, page_no: number) => {
      await dispatchFavoriteGame({
        del_game: id,
      });
      await dispatchGameFavoriteList();
      pagingGames.value.map((item: { name: string; games: any[]; page_no: number; }) => {
        if (item.name == 'Favorite') {
          item.games = item.games.filter((gameItem: { id: string | number; }) => gameItem.id != id);
          if (mobileWidth.value > 600) {
            item.page_no = Math.ceil(item.games.length / 7);
          } else {
            item.page_no = Math.ceil(item.games.length / 6);
          }
        }
      });
    };

    const refreshGameFavoriteList = (id: string | number) => {
      pagingGames.value.map((item: { name: string; games: any[]; page_no: number; }) => {
        if (item.name == 'Favorite') {
          item.games = item.games.filter((gameItem: { id: string | number; }) => gameItem.id != id);
          if (mobileWidth.value > 600) {
            item.page_no = Math.ceil(item.games.length / 7);
          } else {
            item.page_no = Math.ceil(item.games.length / 6);
          }
        }
      });
    }

    const handleSearchInputFocus = () => {
      setSearchDialogShow(true);
    };

    const showGameConfirmationDialog = async (game_item: Game.GameItem) => {
      setFavoriteGameList([]);
      await dispatchGameFavoriteList();
      state.is_favorite = favoriteGameList.value.some(item => item == game_item.id);
      console.log(favoriteGameList.value);
      console.log(state.is_favorite);
      gameConfirmDialogShow.value = true;
      selectedGameItem.value = game_item;
    }

    watch(gameConfirmDialogShow, (value: boolean) => {
      // setMailMenuShow(value);
    })

    watch(gameFilterText, async (value: any) => {
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
        pagingGames.value.map(async (item: { slug: any; page_no: number; games: any; game_count: any; }) => {
          if (item.slug == selectedCategoryName.value) {
            if (gameSearchList.value.list.length > 0) {
              gameSearchList.value.list.map((item: { image: any; }) => {
                // item.image = state.testGames[Math.floor(Math.random() * 28)];
              });
            }
            item.page_no = 1;
            item.games = gameSearchList.value.list;
            item.game_count = gameSearchList.value.total;
          }
        });
      }
    });

    const handleBannerCategory = (category: string) => {
      handleGameFilterBtn(category.toUpperCase());
    }

    watch(route, (to) => {
      selectedGameFilterBtn.value = route.query.filter ? route.query.filter : t("home.button.all_game");
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
        case "PGSOFT":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "PGSOFT";
          break;
        case "Evoplay":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "Evoplay";
          break;
        case "Bgaming":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "Bgaming";
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
    }, { flush: 'pre', immediate: true, deep: true })

    onMounted(async () => {
      loading.value = true;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      await dispatchGameCategories(`?type=sports`);
      await dispatchGameCategories(`?type=${filterTabText.value}`);
      // await dispatchUserActivityList({})
      await bannerLoad();
      await liveWinLoad();
      await betHistoryLoad();
      loading.value = false;
      allGames.value = gameCategories.value;
      allGames.value.map(async (item: { slug: string; page_no: number; games: any; }) => {
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
          gameSearchList.value.list.map(async (gameItem: { image: any; }) => {
            if (item.slug == "original") {
              // gameItem.image = state.originalGames[index];
            } else if (item.slug == "PGSOFT") {
              // gameItem.image = state.principalGames[index];
            } else if (item.slug == "slot") {
              // gameItem.image = state.slots[index];
            } else if (item.slug == "live") {
              // gameItem.image = state.liveCasinos[index];
            } else {
              // gameItem.image = state.testGames[Math.floor(Math.random() * 28)];
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

      if (token.value != undefined) {
        await dispatchSocketConnect();
      }

      await dispatchGameCategories("?type=paging");

      gameGroupBtnList.value = gameCategories.value;

      gameGroupBtnList.value.map((item: { slug: any; tranfromFunctionName: string; }) => {
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
          case "PGSOFT":
            item.tranfromFunctionName = "gameTransform5";
            break;
          case "SOFTSWISS":
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

      console.log("favoritegameList: ", favoriteGameList.value);

      await Promise.all(
        pagingGames.value.map(async (item: { slug: string; page_no: number; games: any; game_count: any; }) => {
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
            gameSearchList.value.list.map(async (gameItem: { image: any; }) => {
              if (item.slug == "original") {
                // gameItem.image = state.originalGames[index];
              } else if (item.slug == "PGSOFT") {
                // gameItem.image = state.principalGames[index];
              } else if (item.slug == "SOFTSWISS") {
                // gameItem.image = state.principalGames[index];
              } else if (item.slug == "slot") {
                // gameItem.image = state.slots[index];
              } else if (item.slug == "live") {
                // gameItem.image = state.liveCasinos[index];
              } else {
                // gameItem.image = state.testGames[Math.floor(Math.random() * 28)];
              }
              index++;
            });
          }
          item.page_no = 1;
          item.games = gameSearchList.value.list;
          item.game_count = gameSearchList.value.total;
        })
      );

      await gameHistoryLoad();

      setTimeout(() => {
        state.paginGameShow = true;
      }, 1000);

      selectedCategoryName.value = route.query.filter ? route.query.filter : "";
      selectedGameFilterBtn.value = route.query.filter ? route.query.filter : t("home.button.all_game");
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
        case "Evoplay":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "Evoplay";
          break;
        case "Bgaming":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "Bgaming";
          break;
        case "PGSOFT":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          gameFilterIconColor4.value = "#7782AA";
          gameFilterIconColor5.value = "#FFFFFF";
          gameFilterIconColor6.value = "#7782AA";
          gameFilterIconColor7.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "PGSOFT";
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
    });

    return {
      t,
      ...toRefs(state),
      mobileVersion,
      mobileWidth,
      mailMenuShow,
      icon_public_92,
      icon_public_91,
      icon_public_34,
      icon_public_35,
      icon_public_36,
      icon_public_37,
      icon_public_95,
      icon_public_38,
      icon_public_39,
      icon_public_10,
      img_public_42,
      gameCategories,
      handleEnterGame,
      selectedGameFilterBtn,
      handleGameFilterBtn,
      favoriteGameList,
      gameTransform1,
      gameTransform2,
      gameTransform3,
      gameTransform4,
      gameTransform5,
      gameTransform6,
      gameTransform7,
      handleMoreGame,
      handleSearchInputFocus,
      showGameConfirmationDialog,
      selectedCategoryName,
      favoriteIconTransform,
      addFavoriteGame,
      cancelFavoriteGame,
      gameGroupBtnList,
      iconTransform,
      pgIconTransform,
      moreLoading,
      moreIndex,
      loading,
      allGames,
      pagingGames,
      bannerComponent,
      liveWinComponent,
      betHistoryComponent,
      bannerLoad,
      gameHistoryLoad,
      liveWinLoad,
      betHistoryLoad,
      customTransition,
      gameHistoryComponent,
      handleBannerCategory,
      gameConfirmDialogShow,
      selectedGameItem,
      refreshGameFavoriteList,
      // comUserActivityList
    };
  },
});

export default Dashboard;
</script>

<template>
  <!-- spin show while game get from api -->
  <div class="m-home-loading" v-if="loading">
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div>
  <!-- game show -->
  <div
    class="home-body"
    :class="
      mobileWidth > 1024
        ? 'my-6 mx-6 body-pc-max'
        : mobileWidth > 600 && mobileWidth < 1024
        ? 'my-6 mx-6'
        : 'mx-2'
    "
    v-else
  >
    <!-- game confirmation dialog -->

    <v-navigation-drawer
      v-model="gameConfirmDialogShow"
      location="bottom"
      class="m-game-confirm-bar"
      temporary
      :touchless="true"
      :style="{
        height: 'unset',
        bottom: '0px',
        zIndex: 300000,
        background: 'unset !important',
      }"
      v-if="mobileWidth < 600"
    >
      <v-btn
        class="m-game-confirm-drawer-close-button"
        icon="true"
        width="24"
        height="24"
        @click="gameConfirmDialogShow = false"
      >
        <inline-svg :src="icon_public_10" width="20" height="20"></inline-svg>
      </v-btn>
      <MGameConfirm
        :selectedGameItem="selectedGameItem"
        :is_favorite="is_favorite"
        :gameConfirmDialogShow="gameConfirmDialogShow"
        @closeGameConfirmDialog="gameConfirmDialogShow = false"
        @refreshGameFavoriteList="refreshGameFavoriteList"
      />
    </v-navigation-drawer>

    <div :class="gameConfirmDialogShow ? 'home-bg-blur' : ''">
      <!-- 这里是banner -->
      <component
        :is="bannerComponent"
        @handleBannerCategory="handleBannerCategory"
      ></component>

      <!-- input for search -->
      <v-row class="mt-4 home-search-bar" :class="mobileWidth < 600 ? 'px-1' : 'px-4'">
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

      <!-- Live Win Component -->
      <component :is="liveWinComponent"></component>

      <!-- buttons for filter -->
      <v-row
        :class="[mobileVersion == 'sm' ? 'mx-2 mb-0' : 'mx-4 mb-0']"
        style="margin-top: 0px"
      >
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
              <!-- width="159" -->
              <v-btn
                class="mr-6 text-none"
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
            <v-slide-group-item
              v-for="(item, index) in gameGroupBtnList"
              :key="index"
              :value="item.slug"
            >
              <v-btn
                class="mr-6 text-none"
                width="159"
                height="48"
                :class="
                  selectedGameFilterBtn == item.slug
                    ? 'black button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn(item.slug)"
              >
                <inline-svg
                  :src="item.image"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform2"
                  v-if="item.tranfromFunctionName == 'gameTransform2'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform3"
                  v-if="item.tranfromFunctionName == 'gameTransform3'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform4"
                  v-if="item.tranfromFunctionName == 'gameTransform4'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform5"
                  v-if="item.tranfromFunctionName == 'gameTransform5'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform6"
                  v-if="item.tranfromFunctionName == 'gameTransform6'"
                ></inline-svg>
                <inline-svg
                  :src="item.image"
                  width="24"
                  height="24"
                  class="mr-2"
                  :transform-source="gameTransform7"
                  v-if="item.tranfromFunctionName == 'gameTransform7'"
                ></inline-svg>
                {{ item.name }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </template>
        <template v-else>
          <div style="overflow:auto; color:white" class="filter-btn-container mt-4 mb-0 d-flex">
            <v-btn
                class="mr-3 text-none"
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
            <div
              v-for="(item, index) in gameGroupBtnList"
              :key="index"
              :value="item.slug"
            >
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
            </div>
          </div>
        </template>
      </v-row>

      <!-- game list -->
      <template v-if="selectedGameFilterBtn == t('home.button.all_game')">
        <template v-for="(item, index) in allGames" :key="index">
          <v-row
            class="ml-4 original_game_text"
            :class="mobileWidth > 600 ? ' mt-12' : ' mt-4'"
            v-if="item.games.length > 0"
            style="margin-bottom: 6px !important"
            @click="handleGameFilterBtn(item.slug)"
          >
            <!-- <inline-svg
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
            </inline-svg> -->
            {{ item.name }}
          </v-row>

          <v-row class="ml-4 mr-2 mt-2 mb-0 pc-game-row" v-if="mobileWidth > 600">
            <template v-if="item.games.length > 0">
              <template v-for="(gameItem, gameIndex) in item.games" :key="gameIndex">
                <div
                  class="original-game-img-width pc-game-img-width"
                  v-if="gameIndex < 7 * item.page_no"
                >
                  <ProgressiveImage
                    :src="gameItem.image"
                    lazy-placeholder
                    blur="30"
                    style="max-width: unset"
                    @click="handleEnterGame(gameItem.id, gameItem.name)"
                  />
                </div>
              </template>
            </template>
          </v-row>
          <v-row class="mx-1 mt-0 mb-0" v-else>
            <template v-if="item.games.length > 0">
              <template v-for="(gameItem, gameIndex) in item.games" :key="gameIndex">
                <v-col
                  cols="4"
                  lg="2"
                  md="2"
                  sm="3"
                  class="px-1 relative pb-0 original-game-img-width mb-2"
                  v-if="gameIndex < 6 * item.page_no"
                >
                  <ProgressiveImage
                    :src="gameItem.image"
                    lazy-placeholder
                    blur="30"
                    @click="showGameConfirmationDialog(gameItem)"
                  />
                  <!-- <img
                    v-lazy="gameItem.image"
                    :data-src="gameItem.image"
                    class="original-game-img-width"
                    @click="handleEnterGame(gameItem.id, gameItem.name)"
                  /> -->
                </v-col>
              </template>
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
      </template>

      <template
        v-for="(otherGameItem, otherIndex) in pagingGames"
        :key="otherIndex"
        v-else
      >
        <template
          v-if="
            otherGameItem.slug.toLocaleLowerCase() ==
              selectedCategoryName.toLocaleLowerCase() && paginGameShow
          "
        >
          <v-row
            class="ml-4 mr-2 mt-2 pt-8"
            v-if="mobileWidth > 600"
            :class="otherGameItem.games.length > 0 ? '' : 'justify-center'"
          >
            <template
              v-if="
                otherGameItem.games.length > 0 &&
                otherGameItem.games != undefined &&
                otherGameItem.games != null
              "
            >
              <template
                v-for="(gameItem, gameIndex) in otherGameItem.games"
                :key="gameIndex"
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
            </template>
            <div class="mt-2" style="height: 200px" v-else>
              <img src="@/assets/public/image/img_se_1.png" class="text-center" />
              <p class="text-400-12 gray">{{ t("home.search_dialog.text_2") }}</p>
            </div>
          </v-row>
          <v-row
            class="mx-1 mt-6"
            :class="otherGameItem.games.length > 0 ? '' : 'justify-center'"
            v-else
          >
            <template
              v-if="
                otherGameItem.games.length > 0 &&
                otherGameItem.games != undefined &&
                otherGameItem.games != null
              "
            >
              <template
                v-for="(gameItem, gameIndex) in otherGameItem.games"
                :key="gameIndex"
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
                    @click="showGameConfirmationDialog(gameItem)"
                  />
                  <div
                    v-if="selectedCategoryName == 'favorite'"
                    class="m-home-favorite-icon"
                    @click="cancelFavoriteGame(gameItem.id, otherGameItem.page_no)"
                  >
                    <inline-svg
                      :src="icon_public_36"
                      width="18"
                      height="18"
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
            </template>
            <div class="mt-10" style="height: 200px" v-else>
              <img src="@/assets/public/image/img_se_1.png" class="text-center" />
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

      <!-------------------- game providers -------------->

      <GameProviders v-if="selectedGameFilterBtn == t('home.button.all_game')" />

      <!--------------------- Game History ---------------------->
      <!-- <component :is="gameHistoryComponent" v-if="bannerComponent"></component> -->

      <!--------------------- Bet History ---------------------->
      <component :is="betHistoryComponent" v-if="bannerComponent"></component>
    </div>
  </div>
</template>

<style lang="scss">
.custom-slide-transition-enter-to,
.custom-slide-transition-leave-to {
  transform: translateY(0);
}

.custom-slide-transition-enter-active,
.custom-slide-transition-leave-active {
  transition: transform 0.5s;
  /* Define the transition speed in seconds */
}

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

.m-game-confirm-bar {
  .v-navigation-drawer__content {
    height: 100%;
  }
}

.v-progressive-image-main {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-game-record-name-text {
  text-overflow: ellipsis;
  word-wrap: initial;
  overflow-x: hidden;
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
  top: 7px;
  right: 2px;
  width: 24px;
  height: 24px;
  background: #29263c;
  border-radius: 24px;
  filter: drop-shadow(0px 2.25px 3px rgba(0, 0, 0, 0.21));

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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

.home-body {
  .home-bg-blur {
    filter: blur(3px);
    -webkit-filter: blur(3px);
  }

  .v-progressive-image {
    border-radius: 8px 46px;
    background: #1d2027;
    aspect-ratio: 0.74152;
  }

  .v-progressive-image-loading {
    height: 160px;
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
      border-radius: 8px 8px !important;
    }
  }

  .v-navigation-drawer__scrim {
    background: black !important;
    opacity: 0.72 !important;
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

.body-pc-max {
  min-width: 1024px;
  max-width: 1300px;
  margin: 24px auto !important;
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
    border-radius: 8px !important;

    .v-btn__content {
      font-size: 12px;
    }
  }

  .button-bright {
    border-radius: 8px !important;

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

.slider-img-width {
  width: 100%;
  // height: 225px;
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
  border-radius: 8px !important;

  .v-btn__content {
    font-weight: 700 !important;
    font-size: 16px;
  }
}

.popular-btn-color {
  border-radius: 8px !important;

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

.pc-game-row {
  justify-content: flex-start;
  gap: 14px;
}

.pc-game-img-width {
  display: flex;

  .v-progressive-image {
    div {
      height: 100%;
      padding: 0 !important;
    }
  }

  img {
    position: relative;
    max-width: 162px;
  }
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
  background: transparent !important;
  color: #009b3a !important;

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
    background: #1d2027;
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
    background: #009b3a;
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

  .form-textfield div.v-field.v-field--appended {
    background-color: #1d2027;
    border-radius: 8px;
  }

  .v-field__field {
    background-color: #1d2027 !important;
  }
}

.m-search-bar {
  box-shadow: none !important;
}

.m-game-confirm-bar {
  box-shadow: none !important;
}
.filter-btn-container{
  overscroll-behavior: auto !important;
  touch-action: manipulation;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.filter-btn-container::-webkit-scrollbar{
  display: none;
}
</style>
