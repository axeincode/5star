<script lang="ts">
import { defineComponent, nextTick, toRefs, reactive, watch, ref, computed, onMounted, onActivated, getCurrentInstance, defineAsyncComponent, onBeforeUnmount  } from "vue";
import { RouteLocationNormalized, RouteLocationNormalizedLoaded, onBeforeRouteLeave } from 'vue-router'
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

import { type GetUserInfo } from "@/interface/user";
// import icon_public_92 from "@/assets/public/svg/icon_public_92.svg";
// import icon_public_91 from "@/assets/public/svg/icon_public_91.svg";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
// import icon_public_35 from "@/assets/public/svg/icon_public_35.svg";
import icon_public_36 from "@/assets/public/svg/icon_public_36.svg";
// import icon_public_37 from "@/assets/public/svg/icon_public_37.svg";
// import icon_public_95 from "@/assets/public/svg/icon_public_95.svg";
// import icon_public_38 from "@/assets/public/svg/icon_public_38.svg";
// import icon_public_39 from "@/assets/public/svg/icon_public_39.svg";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
// import img_public_42 from "@/assets/public/image/img_public_42.png";
import { mailStore } from "@/store/mail";
import { refferalStore } from "@/store/refferal";
import { appBarStore } from "@/store/appBar";
import { gameStore } from "@/store/game";
import { socketStore } from "@/store/socket";
import { authStore } from "@/store/auth";
import { menuStore } from "@/store/menu";
import type * as Game from "@/interface/game";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import MGameConfirm from "@/views/home/components/mobile/GameConfirm.vue";
import { ProgressiveImage } from "vue-progressive-image";
import { mainStore } from "@/store/main";
import MOrder from "@/views/home/components/mobile/Order.vue";
import Loading from "@/components/global/loading.vue";
import AdjustClass from "@/utils/adjust";
import EventToken from "@/constants/EventToken";
import { Network } from "@/net/Network";
import { NETWORK } from '@/net/NetworkCfg';
import { appCurrencyStore } from "@/store/app";
// 设置首屏是否显示
const { setIsShowSkeleton } = appCurrencyStore()

const GameProviders = defineAsyncComponent(() => import("@/components/global/game_provider/index.vue"));

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
    MOrder,
    ProgressiveImage,
    Loading
  },
  setup(props, context) {
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
    const { setAuthModalType } = authStore();
    const { setAuthDialogVisible } = authStore();
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

    const selectedGameFilterBtn = ref<any>('all_game'); // 改用常用的值来做判断，多语言作为判断值切换语言时有问题
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
      provider_name: '',
      producer: "",
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
    const limit = ref<number>(30);
    const initLimit = ref<number>(6);

    const moreLoading = ref<boolean>(false);
    const moreIndex = ref<number>(0);

    const bannerComponent = ref<any>(null);
    const gameHistoryComponent = ref<any>(null);
    const liveWinComponent = ref<any>(null);
    const betHistoryComponent = ref<any>(null);

    const customTransition = ref<string>('custom-slide-transition');

    // 游戏分类粘性定位相关
    const gameCategorySticky = ref(false);
    const gameCategoryOffsetTop = ref(0)
    const gameCategoryStickyEle = ref<any>(null); 
    const navOffsetHeight = 60 // 导航栏高度

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
      return getFavoriteGameList.value
    })

    const casinoGameShow = computed(() => {
      const { getCasinoGameShow } = storeToRefs(mainStore());
      return getCasinoGameShow.value
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

    const homeMenuBtnClicked = computed(() => {
      const { getHomeMenuBtnClicked } = storeToRefs(menuStore());
      return getHomeMenuBtnClicked.value
    })

    const refferalAppBarShow = computed(() => {
      const { getRefferalAppBarShow } = storeToRefs(refferalStore());
      return getRefferalAppBarShow.value;
    });

    watch(() => refferalAppBarShow.value, (newValue) => {
      console.log('refferalAppBarShow -- watch', newValue);
      
      if(!newValue) {
        document.addEventListener('remove', stickyScrollEvent)
        

        nextTick(() => {
          console.log(`${navOffsetHeight}px`, gameCategoryStickyEle.value);
          gameCategoryStickyEle.value.style.top = `${navOffsetHeight}px !important`;
          // stickyElement.style.top = `${navOffsetHeight}px !important`;
          initSticky()
        })
      }
    })

    watch(homeMenuBtnClicked, (newValue) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    })

    watch(casinoGameShow, (newValue) => {
      window.scrollTo({
        top: 450,
        behavior: "smooth",
      });
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
        // router.push(`/game/${id}/${replaceName}`);
        router.push(`/game-${id}-${replaceName}`);
      } else {
        setAuthModalType('login');
        setAuthDialogVisible(true);
      }

    };

    const gameFilterBtnFlag = ref<boolean>(false);

    const handleGameFilterBtn = async (gamFilterBtn: string) => {
      console.log(gamFilterBtn, 'handleGameFilterBtn ==========');

      if(gameCategorySticky.value) {
        window.scrollTo({
          top: gameCategoryOffsetTop.value,
          behavior: "smooth",
        });
      }

      
      if (gameFilterBtnFlag.value) {
        return;
      }
      gameFilterBtnFlag.value = true;
      currentPage.value = 1;
      selectedGameFilterBtn.value = gamFilterBtn == "original" ? 'all_game' : gamFilterBtn;
      
      switch (selectedGameFilterBtn.value) {
        case 'all_game':
          gameFilterIconColor1.value = "#FFFFFF";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          filterTabText.value = "lobby";
          break;
        case "favorite":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#FFFFFF";
          gameFilterIconColor3.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = selectedGameFilterBtn.value;
          break;
        case "history":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#FFFFFF";
          filterTabText.value = "paging";
          selectedCategoryName.value = "history";
          break;
      
        default:
          filterTabText.value = "paging";
          selectedCategoryName.value = selectedGameFilterBtn.value;
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
          limit: initLimit.value,
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
      // PC 
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
        // H5
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
      gameFilterBtnFlag.value = false;
    };

    watch(selectedGameFilterBtn, () => {
      const element = document.getElementsByClassName('filter-btn-container'); // Replace 'your-element-id' with the actual ID of your element
      const childNodeList = element[0].childNodes; // 获取所有子元素
      const childNodes = [] // 获取过滤之后的所有子元素
      for (let i = 0; i < childNodeList.length; i++) {
        const child = childNodeList[i];
        if (child.nodeType === 1) { // 过滤掉非元素节点
          childNodes.push(child)
        }
      }

      if (element != undefined) {
        let curPos = element[0].scrollLeft;
        let index = gameGroupBtnList.value.findIndex(item => item.slug == selectedGameFilterBtn.value);

        element[0].scrollTo({
          left: (childNodes[index + 1] as any).offsetLeft - (element[0] as any).offsetLeft - ((element[0] as any).offsetWidth - (childNodes[index + 1] as any).offsetWidth) / 2,
          behavior: 'smooth'
        });

        // index = index + 1;
        // let left = 0;
        // let right = 116.48;
        // if (index > 0) {
        //   left = 116.48 + 148 * (index - 1);
        //   right = left + 148;
        // }
        // console.log((element[0] as any).offsetWidth);
        // const width = (element[0] as any).offsetWidth;
        // if (!(left > curPos && left < curPos + width)) {
        //   element[0].scrollLeft = 116.48 + (index - 1) * 148;
        // }
      }
    })

    // 显示更多游戏
    const handleMoreGame = async (
      moreGameItem: any,
      index: number,
      gamFilterBtn: string
    ) => {
      const { slug, page_no, games} = moreGameItem;
      const existingGames = games ? games.length : 0;
      let new_page_no = page_no + 1;
      moreGameCurrentPage.value += 1;
      moreLoading.value = true;
      moreIndex.value = index;
      if (slug == "favorite" || slug == "history") {
        await dispatchUserGame({
          game_categories_slug: selectedCategoryName.value,
          page: new_page_no,
          limit: limit.value,
          existing: existingGames
        });
      } else {
        // 首页是6+6 其余的是6+30
        const limitNum = gamFilterBtn == 'all_game' ? initLimit.value : limit.value
        await dispatchGameSearch(
          "?game_categories_slug=" +
          slug +
          "&page=" +
          new_page_no +
          "&limit=" +
          limitNum + 
          "&existing=" + existingGames
        );
      }
      moreLoading.value = false;
      // gameSearchList.value.list.map((item: { image: any; }) => {
        // item.image = state.testGames[Math.floor(Math.random() * 28)];
      // });
      if (gamFilterBtn == 'all_game') {
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
      gameConfirmDialogShow.value = true;
      selectedGameItem.value = game_item;
    }

    const getCategoriesFunc = async (sub_api: string) => {
      let result;
      const route: string = NETWORK.GAME_INFO.GAME_CATEGORY + sub_api
      const network: Network = Network.getInstance();
      try {
        const res = await network.request({
          url: route,
          method: 'GET',
        })
        result = res.data || []
      } catch (err) {
        result = []
      }
      return result
    }

    const { setControlLevel } = appBarStore();

    watch(gameConfirmDialogShow, (value: boolean) => {
      // setMailMenuShow(value);
      setControlLevel(value)
    })

    watch(mailMenuShow, (value) => {
      // handleGameFilterBtn(t('home.button.all_game'))
    })

    watch(gameFilterText, async (value: any) => {
      selectedGameFilterBtn.value = value;
      switch (selectedGameFilterBtn.value) {
        case "favorite":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#FFFFFF";
          gameFilterIconColor3.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "favorite";
          break;
        case "history":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#FFFFFF";
          filterTabText.value = "paging";
          selectedCategoryName.value = "history";
          break;
        default:
          filterTabText.value = "paging";
          selectedCategoryName.value = selectedGameFilterBtn.value;
          break;
      }

      if (
        selectedCategoryName.value == "favorite" ||
        selectedCategoryName.value == "history"
      ) {
        await dispatchUserGame({
          game_categories_slug: selectedCategoryName.value,
          page: currentPage.value,
          limit: initLimit.value,
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
      selectedGameFilterBtn.value = route.query.filter ? route.query.filter : 'all_game';
      switch (selectedGameFilterBtn.value) {
        case 'all_game':
          gameFilterIconColor1.value = "#FFFFFF";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          filterTabText.value = "lobby";
          break;
        case "favorite":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#FFFFFF";
          gameFilterIconColor3.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "favorite";
          break;
        case "history":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#FFFFFF";
          filterTabText.value = "paging";
          selectedCategoryName.value = "history";
          break;
        default:
          filterTabText.value = "paging";
          selectedCategoryName.value = selectedGameFilterBtn.value;
          break;
      }

      handleGameFilterBtn(selectedGameFilterBtn.value)
    }, { flush: 'pre', immediate: true, deep: true })

    let stickyBoxElement = null
    let stickyElement = null
    let refferalBar = null
    let stickyBoxOffset = null
    let refferalBarHeight = null
    let topOffset = null
    // 初始化游戏分类事件监听
    const initSticky = () => {
      stickyBoxElement = document.getElementById('gameCategoryBox');
      stickyElement = document.getElementById('gameCategory');
      refferalBar = document.getElementById('refferalBar');
      
      gameCategoryStickyEle.value = stickyElement;
      
      stickyBoxOffset = stickyBoxElement?.offsetTop;
      refferalBarHeight = refferalBar ? refferalBar.offsetHeight : 0
      // 相对顶部的距离 = 顶部refferal+导航栏高度
      topOffset = refferalBarHeight + navOffsetHeight;
      gameCategoryOffsetTop.value = stickyBoxOffset - topOffset;

      document.addEventListener('scroll', stickyScrollEvent)
    }
    const stickyScrollEvent = () => {
      // console.log(stickyBoxOffset,topOffset, 'stickyScrollEvent!!!!!! =============');
      if(stickyElement && stickyBoxOffset) {
        if (window.pageYOffset > stickyBoxOffset - topOffset) {
          // 当滚动位置超过 sticky 元素的顶部偏移量时，添加 fixed 样式
          stickyElement.classList.add('home-game-category-stick');
          stickyElement.style.top = `${topOffset}px`;
          filterContainer.value.style.top = `${topOffset}px`
          gameCategorySticky.value = true;
        } else {
          // 移除 fixed 样式
          // stickyElement.style.position = 'relative';
          stickyElement.classList.remove('home-game-category-stick');
          stickyElement.style.top = 'auto';
          gameCategorySticky.value = false;
        }
      }
    }

    // 
    const filterContainer = ref(null)
    const filterContainerShowMoreArrow = ref(false)
    const filterContainerScroll = (e) => {
      if (
        filterContainer.value.scrollLeft + filterContainer.value.clientWidth >=
        filterContainer.value.scrollWidth
      ) {
        filterContainerShowMoreArrow.value = false
      } else {
        filterContainerShowMoreArrow.value = true;
      }
    }

    onMounted(async () => {
      loading.value = true;

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // await dispatchGameCategories(`?type=sports`);
      // await dispatchGameCategories(`?type=${filterTabText.value}`);
      console.log(filterTabText.value, 'filterTabText.value');
      
      const categorieList = await getCategoriesFunc(`?type=${filterTabText.value}`)
      // await dispatchUserActivityList({})
      await bannerLoad();
      await liveWinLoad();
      await betHistoryLoad();
      loading.value = false;

      // 全部游戏
      allGames.value = categorieList;
      allGames.value.map(async (item: { slug: string; page_no: number; games: any; }) => {

        // 查询每个分类里游戏的数据 gameSearchList是查询回来的结果
        await dispatchGameSearch(
          "?game_categories_slug=" +
          item.slug +
          "&page=" +
          currentPage.value +
          "&limit=" +
          initLimit.value
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
        // 初始化页码为1
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

      // console.log("favoritegameList: ", favoriteGameList.value);
      // console.log("gameGroupBtnList: ", gameGroupBtnList.value);
      // console.log("allGames: ", allGames.value);

      await Promise.all(
        pagingGames.value.map(async (item: { slug: string; page_no: number; games: any; game_count: any; }) => {
          if (item.slug == "favorite" || item.slug == "history") {
            await dispatchUserGame({
              game_categories_slug: item.slug,
              page: currentPage.value,
              limit: initLimit.value,
            });
          } else {
            await dispatchGameSearch(
              "?game_categories_slug=" +
              item.slug +
              "&page=" +
              currentPage.value +
              "&limit=" +
              initLimit.value
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
      selectedGameFilterBtn.value = route.query.filter ? route.query.filter : 'all_game';
      switch (selectedGameFilterBtn.value) {
        case 'all_game':
          gameFilterIconColor1.value = "#FFFFFF";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#7782AA";
          filterTabText.value = "lobby";
          break;
        case "favorite":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#FFFFFF";
          gameFilterIconColor3.value = "#7782AA";
          filterTabText.value = "paging";
          selectedCategoryName.value = "favorite";
          break;
        case "history":
          gameFilterIconColor1.value = "#7782AA";
          gameFilterIconColor2.value = "#7782AA";
          gameFilterIconColor3.value = "#FFFFFF";
          filterTabText.value = "paging";
          selectedCategoryName.value = "history";
          break;
        default:
          filterTabText.value = "paging";
          selectedCategoryName.value = selectedGameFilterBtn.value;
          break;
      }
      if (route.query.game == "casino") {
        window.scrollTo({
          top: 450,
          behavior: "smooth",
        });
      }

      let isMobile: boolean = false
      if (route.query.mobile && route.query.mobile == "android"){
        isMobile = true
      }
      
      AdjustClass.getInstance(isMobile).adjustTrackEvent({ key: "PAGE_VIEW", value: "home", params: "" });

      // context.emit('inited')

      // 分类粘性定位初始化
      initSticky()

      nextTick(() => {
        if(filterContainer.value.scrollWidth > filterContainer.value.clientWidth) {
          filterContainerShowMoreArrow.value = true;
        }

        // 设置首屏加载动画关闭
        setIsShowSkeleton(false)
      })

    });

    onBeforeUnmount(() => {
      document.addEventListener('remove', stickyScrollEvent);
    })

    // 跳转条款， 缓存home页面，返回到跳转前的位置
    const placeScroll = ref()
    onBeforeRouteLeave((to, from, next) => {
      //在路由跳转之前，对当前浏览位置进行保存
      placeScroll.value = document.documentElement.scrollTop;
      next();
    });
    //组件激活
    onActivated(() => {
      // 等待nexttick再赋值
      nextTick(() => {
        if (placeScroll.value != null && placeScroll.value > 0) {
          //组件激活后进行浏览位置的赋值
          document.documentElement.scrollTop = placeScroll.value;
          document.body.scrollTop = placeScroll.value;
        }
      })

    });

    // 打开分类全部
    const viewAllByKind = (slug:string) => {
      router.push({ name: "Provider", query: { slug: slug } });
    }

    const returnGamesCount = (page: any) => {
      return initLimit.value + limit.value * (page - 1)
    }

    return {
      t,
      ...toRefs(state),
      mobileVersion,
      mobileWidth,
      mailMenuShow,
      // icon_public_92,
      // icon_public_91,
      icon_public_34,
      // icon_public_35,
      icon_public_36,
      // icon_public_37,
      // icon_public_95,
      // icon_public_38,
      // icon_public_39,
      icon_public_10,
      // img_public_42,
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
      // comUserActivityList,
      viewAllByKind,
      filterContainer,
      filterContainerScroll,
      filterContainerShowMoreArrow,
      gameCategorySticky,
      limit,
      initLimit,
      returnGamesCount
    };
  },
});

export default Dashboard;
</script>

<template>
  <!-- spin show while game get from api -->
  <!-- <div class="m-home-loading" v-if="loading">
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div> -->
  <Loading v-if="loading"></Loading>
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
    <!----------------------- Order component --------------------------->
    <MOrder />
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
      <template v-if="gameConfirmDialogShow">

        <div  class="m-game-confirm-drawer-close-button-box" style="display:flex; justify-content: flex-end;">
          <v-btn
            class="m-game-confirm-drawer-close-button"
            icon="true"
            width="24"
            height="24"
            @click="gameConfirmDialogShow = false"
          >
            <inline-svg :src="icon_public_10" width="20" height="20"></inline-svg>
          </v-btn>
        </div>
        <!-- 打开游戏 确认弹窗 - 二级页面 -->
        <MGameConfirm
          :selectedGameItem="selectedGameItem"
          :is_favorite="is_favorite"
          :gameConfirmDialogShow="gameConfirmDialogShow"
          @closeGameConfirmDialog="gameConfirmDialogShow = false"
          @refreshGameFavoriteList="refreshGameFavoriteList"
        />
      </template>
    </v-navigation-drawer>

    <div :class="gameConfirmDialogShow ? 'home-bg-blur' : ''">
      <!-- 这里是banner -->
      <component
        :is="bannerComponent"
        @handleBannerCategory="handleBannerCategory"
      ></component>

      <!-- input for search -->
      <!-- <v-row class="mt-4 home-search-bar" :class="mobileWidth < 600 ? 'px-1' : 'px-4'">
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
      </v-row> -->

      <!-- Live Win Component -->
      <!-- liveWin会触发游戏打开二次确认弹窗 -->
      <component :is="liveWinComponent" @openGame="showGameConfirmationDialog"></component>

      <!-- buttons for filter -->
      <v-row
        id='gameCategoryBox'
        :class="[mobileVersion == 'sm' ? 'mx-2 mb-0' : 'mx-4 mb-0', 'home-game-category-container']"
        style="margin-top: 0px;"
      > 
        <!-- PC 分类按钮 -->
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
                  selectedGameFilterBtn == 'all_game'
                    ? 'black home-game-filter-btn button-bright'
                    : 'text-gray btn-211f31'
                "
                @click="handleGameFilterBtn('all_game')"
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
                    ? 'black home-game-filter-btn button-bright'
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
        <!-- H5 分类按钮 -->
        <template v-else>
          <div
            id="gameCategory"
            style="overflow: auto; color: white"
            class="filter-btn-container mb-0 d-flex"
            @scroll="filterContainerScroll"
            ref="filterContainer"
          >
            <v-btn
              class="mr-3 text-none"
              height="36"
              :class="
                selectedGameFilterBtn == 'all_game'
                  ? 'black home-game-filter-btn button-bright'
                  : 'text-gray btn-211f31'
              "
              @click="handleGameFilterBtn('all_game')"
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
            <!-- / 所有游戏 -->
            
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
                    ? 'black home-game-filter-btn button-bright'
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
                <!-- <inline-svg
                  :src="item.image"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform4"
                  v-if="item.tranfromFunctionName == 'gameTransform4'"
                ></inline-svg> -->
                <!-- <inline-svg
                  :src="item.image"
                  width="18"
                  height="18"
                  style="margin-right: 6px"
                  :transform-source="gameTransform5"
                  v-if="item.tranfromFunctionName == 'gameTransform5'"
                ></inline-svg> -->
                <!-- <inline-svg
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
                ></inline-svg> -->
                {{ item.name }}
              </v-btn>
            </div>

            <div class="arrow" :class="[gameCategorySticky ? 'arrow-fixed' : 'arrow-absolute']" v-if="filterContainerShowMoreArrow">
              <img src="@/assets/public/svg/arrow-right.svg" alt="">
            </div>
          </div>
        </template>
      </v-row>
      <!-- <div class="home-game-category-relative" >
      </div> -->

      <!-- game list -->
      <!-- 全部游戏 -->
      <template v-if="selectedGameFilterBtn == 'all_game'">
        <template v-for="(item, index) in allGames" :key="index">
          <v-row
            class="original_game_text"
            :class="mobileWidth > 600 ? ' mt-12' : ' mt-4'"
            v-if="item.games != undefined && item.games.length > 0"
            style="margin-bottom: 6px !important"
          >
            <!-- <p @click="handleGameFilterBtn(item.slug)">{{ item.name }}</p> -->
            <span>{{ item.name }}</span>
            <span class='viewall' @click="viewAllByKind(item.slug)">{{ t('home.viewall')}}</span>
          </v-row>

          <!-- PC 游戏列表 -->
          <v-row class="ml-4 mr-2 mt-2 mb-0 pc-game-row" v-if="mobileWidth > 600">
            <template v-if="item.games != undefined && item.games.length > 0">
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
          <!-- H5 游戏列表  -->
          <v-row class="mx-1 mt-0 mb-0" v-else>
            <template v-if="item.games != undefined && item.games.length > 0">
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
                  >
                    <div class="text-overlay">
                      <h2>{{ gameItem.name }}</h2>
                      <p>{{ gameItem.provider_name }}</p>
                    </div>
                  </ProgressiveImage>

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
              item.games?.length > 0
            "
          >
            <div style="width: 100%" class="text-center">
              <template v-if="selectedGameFilterBtn != 'all_game'">
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
                  handleMoreGame(item, index, selectedGameFilterBtn)
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

      <!-- 某个类型游戏 -->
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
          <!-- pc -->
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

          <!-- h5 -->
          <v-row
            class="mx-1 mt-0"
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
                  v-if="gameIndex < returnGamesCount(otherGameItem.page_no)"
                >
                  <ProgressiveImage
                    :src="gameItem.image"
                    lazy-placeholder
                    blur="30"
                    @click="showGameConfirmationDialog(gameItem)"
                  >
                    <div class="text-overlay">
                      <h2>{{ gameItem.name }}</h2>
                      <p>{{ gameItem.provider_name }}</p>
                    </div>
                  </ProgressiveImage>
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
                Number(returnGamesCount(otherGameItem.page_no)) < Number(otherGameItem.game_count)) ||
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
                <font color="white">{{ returnGamesCount(otherGameItem.page_no) }}</font>
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
                    otherGameItem,
                    otherIndex,
                    selectedGameFilterBtn,
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

      <GameProviders v-if="selectedGameFilterBtn == 'all_game'" />

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

// .m-home-loading {
//   height: 100vh;
//   position: relative;
//   overflow-y: hidden;

//   .loading-body {
//     display: flex;
//     align-items: center;
//     position: absolute;
//     top: 40%;
//     left: 50%;
//     transform: translateX(-50%);

//     .dot-0 {
//       width: 10px;
//       height: 10px;
//       background: #12ff76;
//       border-radius: 10px;
//       margin: 0px 4px;
//       animation: expandAnimation 0.6s 0.1s ease-in infinite;
//     }

//     .dot-1 {
//       width: 16px;
//       height: 16px;
//       background: #12ff76;
//       border-radius: 16px;
//       margin: 0px 4px;
//       animation: expandReverseAnimation 0.6s 0.1s ease-in infinite;
//     }
//   }
// }

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
  z-index: 1000;

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
    background-image: url("@/assets/public/image/logo_public_06.png");
    background-repeat: no-repeat;
    background-size: contain;
    animation: opacityAnimation 0.6s ease-in infinite;
  }

  // 分类盒子
  .home-game-category-container {
    height: 68px;
    position: relative
  }
  // 游戏分类定位类名
  .home-game-category-stick {
    max-width: 100vw;
    width: 100vw;
    overflow-x: auto; 
    position: fixed;
    z-index: 9999;
    left: 0px;
    padding-left: 16px;
  }

  .filter-btn-container {
    overscroll-behavior: auto !important;
    touch-action: manipulation;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
    padding-top: 16px;
    padding-bottom: 16px;
    background: #15161C;

    .arrow {
      background: linear-gradient(to right, transparent, #15161c);
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 40px;
      padding-left: 3px;

      img {
        width: 14px;
        height: 14px;
      }
    }
    .arrow-absolute {
      position: absolute;
      right: 0px;
      top: 50% !important;
      transform: translateY(-50%);
    }
    .arrow-fixed {
      position: fixed;
      right: 0px;
    }
  }

  .filter-btn-container::-webkit-scrollbar {
    display: none;
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
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
    Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei,
    sans-serif;
  // font-size: 14px;
  // font-style: normal;
  // font-weight: 400;
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

  .home-game-filter-btn {
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
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
    }
  }

  .popular-btn-color {
    .v-btn__content {
      font-size: 12px !important;
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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
  // border-radius: 16px 6px;
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
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
      Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei,
      Microsoft Yahei, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

// original game
.original_game_text {
  width: 100%;
  color: #ffffff;
  font-weight: 700;
  font-size: 22px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0;

  .viewall {
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: left;
    color: #009B3A;
  }
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



/* 文字叠加在图片上 */
.text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 10px 12px 3px;
  color: white;
  border-bottom-left-radius: 8px 8px;
  border-bottom-right-radius: 8px 8px;

  h2 {
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1;
  }

  p {
    margin: 0;
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 4px;
    overflow-wrap: break-word;
  }
}

.m-game-confirm-drawer-close-button {
  // padding: 20px;
}
</style>
