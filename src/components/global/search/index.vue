<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { ref, computed, watch, onMounted, onUnmounted, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Search } from "@/interface/game";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";
import { ProgressiveImage } from "vue-progressive-image";
import img_public_42 from "@/assets/public/image/img_public_42.png";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import { Pagination } from "swiper/modules";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const { dispatchGameSearch } = gameStore();
const { setGameSearchList } = gameStore();
const { removeAllSearchTextList } = gameStore();
const { removeSearchTextList } = gameStore();
const { setSearchTextList } = gameStore();
const { setMailMenuShow } = mailStore();
const searchText = ref<string>("");
const searchLoading = ref<boolean>(false);
const page_no = ref<number>(1);
const currentPage = ref<number>(1);
const moreCurrentPage = ref<number>(1);
const limit = ref<number>(4);
const moreLoading = ref<boolean>(false);
const swiper = ref<any>(null);

const modules = [Pagination];

const testGames = [
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
];

const searchedGameList = ref<Array<Search>>([]);

const searchedGameCount = ref<number>(0);

const searchRef = ref<HTMLElement | undefined>(undefined);

const recommendedGameList = ref<Array<Search>>([]);

const emit = defineEmits<{ (e: "searchCancel"): void }>();

const props = defineProps<{ searchDialogShow: boolean }>();

const { searchDialogShow } = toRefs(props);

const searchContainerHeight = ref<number>(590);

const mobileWidth = computed(() => {
  return width.value;
});

const searchHistoryKeywords = computed(() => {
  const { getSearchTextList } = storeToRefs(gameStore());
  return getSearchTextList.value;
});

const gameSearchList = computed(() => {
  const { getGameSearchList } = storeToRefs(gameStore());
  return getGameSearchList.value;
});

const success = computed(() => {
  const { getSuccess } = storeToRefs(gameStore());
  return getSuccess.value;
});

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
  setSearchTextList(searchText.value);
  searchText.value = "";
  page_no.value = 1;
  setGameSearchList({
    list: [],
    total: 0,
  });
  searchedGameList.value = [];
  let replaceName = name.replace(/ /g, "-");
  if (mobileWidth.value < 600) {
    setMailMenuShow(true);
  }
  router.push(`/game/${id}/${replaceName}`);
};

const handleSearchInput = async () => {
  if (searchText.value.length >= 3) {
    searchLoading.value = true;
    await dispatchGameSearch(
      `?search=${searchText.value}&page=${currentPage.value}&limit=${
        limit.value * page_no.value
      }`
    );
    searchLoading.value = false;
    // if (success.value) {
    searchedGameCount.value = gameSearchList.value.total;
    searchedGameList.value = gameSearchList.value.list;
    searchedGameList.value.map((item) => {
      item.image = testGames[Math.floor(Math.random() * 7)];
    });
    // }
  } else {
    page_no.value = 1;
    setGameSearchList({
      list: [],
      total: 0,
    });
    searchedGameList.value = [];
  }
};

const handleResize = () => {
  if (window.visualViewport?.height != undefined) {
    searchContainerHeight.value = window.visualViewport.height;
    console.log(searchContainerHeight);
  }
};

const handleMoreGame = async () => {
  moreLoading.value = true;
  page_no.value += 1;
  moreCurrentPage.value += 1;
  if (searchText.value.length >= 3) {
    searchLoading.value = true;
    await dispatchGameSearch(
      `?search=${searchText.value}&page=${moreCurrentPage.value}&limit=${limit.value}`
    );
    moreLoading.value = false;
    searchLoading.value = false;
    if (success.value) {
      searchedGameList.value = [...searchedGameList.value, ...gameSearchList.value.list];
      searchedGameList.value.map((item) => {
        item.image = testGames[Math.floor(Math.random() * 28)];
      });
    }
  }
};

const handleRemoveSearchKeyword = (index: number) => {
  // searchHistoryKeywords.value.splice(index, 1);
  removeSearchTextList(index);
};

const removeAllSearchKeyword = () => {
  removeAllSearchTextList();
};

const handleSearchGame = async (keyword: string) => {
  searchText.value = keyword;
  if (searchText.value.length >= 3) {
    searchLoading.value = true;
    await dispatchGameSearch(
      `?search=${searchText.value}&page=${currentPage.value}&limit=${
        limit.value * page_no.value
      }`
    );
    searchLoading.value = false;
    // if (success.value) {
    searchedGameCount.value = gameSearchList.value.total;
    searchedGameList.value = gameSearchList.value.list;
    searchedGameList.value.map((item) => {
      item.image = testGames[Math.floor(Math.random() * 7)];
    });
    // }
  } else {
    page_no.value = 1;
    setGameSearchList({
      list: [],
      total: 0,
    });
    searchedGameList.value = [];
  }
};

watch(
  searchText,
  (value) => {
    if (value == null) searchText.value = "";
    if (searchText.value == "") {
      page_no.value = 1;
      setGameSearchList({
        list: [],
        total: 0,
      });
      searchedGameList.value = [];
    }
  },
  { deep: true }
);

watch(searchDialogShow, (value) => {
  if (value) {
    if (searchRef.value != undefined) {
      searchRef.value.focus();
    }
  }
  if (!value && searchText.value != "") {
    setSearchTextList(searchText.value);
    searchText.value = "";
    page_no.value = 1;
    setGameSearchList({
      list: [],
      total: 0,
    });
    searchedGameList.value = [];
  }
});

onMounted(async () => {
  // if (searchRef.value != undefined) {
  //   searchRef.value.focus();
  // }
  window.addEventListener("resize", handleResize);
  await dispatchGameSearch(
    `?game_categories_slug=recommend&page=${currentPage.value}&limit=${
      limit.value * page_no.value
    }`
  );
  recommendedGameList.value = gameSearchList.value.list;
  if (recommendedGameList.value.length > 0) {
    recommendedGameList.value.map((item) => {
      item.image = testGames[Math.floor(Math.random() * 28)];
    });
  }
});
</script>

<template>
  <div class="m-home-search-body">
    <div class="m-search-header">
      <span class="m-search-header-icon" @click="emit('searchCancel')"></span>
      <span>{{ t("home.search") }}</span>
    </div>
    <!-- <div
    class="m-home-search-body"
    :style="{
      height: searchContainerHeight >= 590 ? '43vh' : searchContainerHeight - 80 + 'px',
      maxHeight: '643px',
    }"
  > -->
    <div class="pt-3">
      <v-text-field
        ref="searchRef"
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
        @input="handleSearchInput"
        v-model="searchText"
      />
    </div>
    <div class="m-search-loading-container relative pt-8" v-if="searchLoading">
      <div class="loading-body">
        <div class="dot-0"></div>
        <div class="dot-1"></div>
        <div class="dot-0"></div>
      </div>
    </div>
    <div class="m-home-search-result pt-8 text-center" v-else>
      <div v-if="searchedGameList.length == 0">
        <img
          src="@/assets/public/image/img_se_1.png"
          v-if="searchText.length >= 3 && searchText != ''"
        />
        <p class="text-400-12 gray" v-if="searchText.length >= 3 && searchText != ''">
          {{ t("home.search_dialog.text_2") }}
        </p>
        <p class="text-400-12 gray" v-else>{{ t("home.search_dialog.text_3") }}</p>
        <div
          class="mx-3 mt-4"
          style="display: flex; justify-content: space-between"
          v-if="searchHistoryKeywords.length > 0"
        >
          <p class="text-700-14 white">{{ t("home.search_dialog.search_history") }}</p>
          <div class="m-home-search-history-remove" @click="removeAllSearchKeyword">
            <img src="@/assets/public/svg/icon_public_82.svg" style="margin-top: 6px" />
          </div>
        </div>
        <div
          class="d-flex mx-3 mt-4"
          style="gap: 6px; flex-wrap: wrap"
          v-if="searchHistoryKeywords.length > 0"
        >
          <div
            class="m-home-search-history-text"
            v-for="(keyword, index) in searchHistoryKeywords"
            :key="index"
          >
            <font @click="handleSearchGame(keyword)"> {{ keyword }}</font>
            <span
              class="m-home-search-history-word-remove"
              v-if="index + 1 == searchHistoryKeywords.length"
              @click="handleRemoveSearchKeyword(index)"
            >
              <img
                src="@/assets/public/svg/icon_public_52.svg"
                width="9"
                class="m-home-search-history-word-remove-icon-position"
              />
            </span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex justify-between align-center mx-3">
          <p class="text-700-14 white">{{ t("home.search_dialog.text_4") }}</p>
          <p class="text-600-10 gray">
            {{ t("home.search_dialog.text_5") }}
            <font class="text-600-10 color-32CFEC">{{ searchedGameCount }}</font>
            {{ t("home.search_dialog.text_6") }}
          </p>
        </div>
        <v-row class="mx-2 my-4">
          <template v-for="(item, index) in searchedGameList" :key="index">
            <v-col cols="4" class="py-0 px-1" v-if="index < 3 * page_no">
              <ProgressiveImage
                :src="item.image"
                lazy-placeholder
                :placeholder-src="img_public_42"
                blur="30"
                @click="handleEnterGame(item.id, item.name)"
              />
            </v-col>
          </template>
        </v-row>
        <v-row
          class="justify-center"
          :class="mobileWidth < 600 ? 'mt-6 mx-3' : 'mt-8 ml-4'"
        >
          <v-btn
            class="text-none more-btn-color"
            variant="outlined"
            width="100%"
            height="41"
            v-if="searchedGameCount > 3 && searchedGameCount > 3 * page_no"
            @click="handleMoreGame()"
          >
            <div v-if="!moreLoading">{{ t("home.more") }}</div>
            <div class="loading-body" v-else>
              <div class="dot-0"></div>
              <div class="dot-1"></div>
              <div class="dot-0"></div>
            </div>
          </v-btn>
        </v-row>
      </div>
    </div>
    <div class="m-home-search-swiper-title mt-8">
      <p class="ml-3 text-700-14 white">{{ t("home.search_dialog.text_1") }}</p>
      <div class="swiper-button-next" slot="button-next" @click="goToNext"></div>
      <div class="swiper-button-prev" slot="button-prev" @click="goToPrev"></div>
    </div>
    <div class="relative m-home-search-swiper pt-5">
      <Swiper
        :modules="modules"
        :slidesPerView="3"
        :spaceBetween="8"
        class="mx-3"
        style="height: auto"
        @swiper="getSwiperRef"
      >
        <SwiperSlide
          v-for="(gameItem, index) in recommendedGameList"
          :key="index"
          :virtualIndex="index"
        >
          <img
            :src="gameItem.image"
            class="m-home-search-swiper-img"
            @click="handleEnterGame(gameItem.id, gameItem.name)"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style lang="scss">
@keyframes opacityAnimation {
  0% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}

.m-home-search-body::-webkit-scrollbar {
  width: 0px;
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
//   animation: opacityAnimation 0.8s ease-in infinite;
// }

.m-home-search-history-word-remove {
  position: absolute;
  top: 0px;
  right: -10px;
  width: 15px;
  height: 28px;
  border-radius: 0px 6px 6px 0px;
  background: var(--Text-Dark-Black-000000, #000);

  /* Button Primary */
  box-shadow: 0px 3px 2px 1px rgba(0, 0, 0, 0.11);

  .m-home-search-history-word-remove-icon-position {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.m-home-search-history-text {
  position: relative;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  background: var(--Secondary-Button-353652, #23262f);

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  color: var(--Sec-Text-7782AA, #7782aa);
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.m-home-search-history-text:active {
  transform: scale(0.9);
  filter: brightness(80%);
  transition-duration: 0.28s;
}

.m-home-search-history-remove {
  width: 28px;
  height: 28px;
  border-radius: 3px;
  background: var(--Secondary-Button-353652, #23262f);
  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}

.m-home-search-history-remove:active {
  transform: scale(0.9);
  filter: brightness(80%);
  transition-duration: 0.28s;
}

.m-search-header {
  position: relative;
  height: 50px;
  line-height: 50px;
  background: var(--BG-5-1C1929, #15161c);
  color: #fff;
  text-align: center;

  .m-search-header-icon {
    width: 20px;
    height: 20px;
  }

  .m-search-header-icon::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%) rotate(45deg);
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    width: 10px;
    height: 10px;
  }
}

.m-home-search-body {
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 8px 8px;
  background: var(--Text-Box-1-211F31, #1d2027);
  overflow-y: auto;

  .m-home-search-game:active {
    transform: scale(0.9);
    filter: brightness(80%);
    transition-duration: 0.28s;
  }

  .m-home-search-swiper-img:active {
    transform: scale(0.9);
    filter: brightness(80%);
    transition-duration: 0.28s;
  }

  .form-textfield div.v-field.v-field--appended {
    border-radius: 10px;
    background: var(--BG-5-1C1929, #15161c);
    height: 40px;

    /* Text Box */
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }

  .form-textfield div.v-field__field {
    color: white;
    background: var(--BG-5-1C1929, #15161c);
    padding-left: 0px;
  }

  .mdi:before {
    font-size: 16px !important;
  }

  .v-field__input {
    padding-top: 6px !important;
  }

  .v-field__input::placeholder {
    color: var(--Sec-Text-7782AA, #7782aa);
    font-family: Inter;
    font-size: 10px !important;
    font-style: normal;
    font-weight: 400 !important;
    line-height: normal;
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

  .m-search-loading-container {
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

.m-home-search-swiper-title {
  height: 24px;
  position: relative;

  .swiper-button-next {
    width: 24px;
    height: 24px;
    border-radius: 46px;
    background: #1d2027;
    right: 12px;
    top: 20px;
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    z-index: 2;
  }

  .swiper-button-next:active {
    transform: scale(0.9);
    filter: brightness(80%);
    transition-duration: 0.28s;
  }

  .swiper-button-prev:active {
    transform: scale(0.9);
    filter: brightness(80%);
    transition-duration: 0.28s;
  }

  .swiper-button-prev {
    width: 24px;
    height: 24px;
    border-radius: 46px;
    background: #1d2027;
    right: 46px;
    top: 20px;
    left: unset;
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    z-index: 2;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-family: swiper-icons;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    font-size: 10px;
    font-weight: 900;
    color: white;
  }
}

.m-home-search-swiper {
  padding-bottom: 16px;

  .m-home-search-swiper-img {
    width: 100%;
  }
}
</style>
