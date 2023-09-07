<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Search } from "@/interface/game";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";
import { ProgressiveImage } from "vue-progressive-image";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import { Pagination } from "swiper/modules";
import store from "@/store";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const { dispatchGameSearch } = gameStore();
const { setMailMenuShow } = mailStore();
const searchText = ref<string>("");
const searchLoading = ref<boolean>(false);
const page_no = ref<number>(1);
const currentPage = ref<number>(1);
const limit = ref<number>(10);

const swiper = ref<any>(null);

const modules = [Pagination];

const searchedGameList = ref<Array<Search>>([]);

const recommendedGameList = ref<Array<Search>>([]);

const searchContainerHeight = ref<number>(590);

const mobileWidth = computed(() => {
  return width.value;
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
      `?game_categories_slug=${searchText.value}&page=${currentPage.value}&limit=${
        limit.value * page_no.value
      }`
    );
    searchLoading.value = false;
    if (success.value) {
      searchedGameList.value = gameSearchList.value.list;
      searchedGameList.value.map((item) => {
        item.image = new URL("@/assets/home/image/img_og_01.png", import.meta.url).href;
      });
    }
  }
};

const handleResize = () => {
  if (window.visualViewport?.height != undefined) {
    searchContainerHeight.value = window.visualViewport.height;
    console.log(searchContainerHeight);
  }
};

watch(
  searchText,
  (value) => {
    if (value == null) searchText.value = "";
  },
  { deep: true }
);

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  await dispatchGameSearch(
    `?game_categories_slug=recommend&page=${currentPage.value}&limit=${
      limit.value * page_no.value
    }`
  );
  recommendedGameList.value = gameSearchList.value.list;
  recommendedGameList.value.map((item) => {
    item.image = new URL("@/assets/home/image/img_og_01.png", import.meta.url).href;
  });
});
</script>

<template>
  <div
    class="m-home-search-body"
    :style="{
      height: searchContainerHeight >= 590 ? 'unset' : searchContainerHeight - 80 + 'px',
    }"
  >
    <div class="pt-3">
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
        <img src="@/assets/public/image/img_public_20.png" />
        <p class="text-400-12 gray" v-if="searchText.length >= 3 && searchText != ''">
          {{ t("home.search_dialog.text_2") }}
        </p>
        <p class="text-400-12 gray" v-else>{{ t("home.search_dialog.text_3") }}</p>
      </div>
      <div v-else>
        <div class="d-flex justify-between align-center mx-3">
          <p class="text-700-14 white">{{ t("home.search_dialog.text_4") }}</p>
          <p class="text-600-10 gray">
            {{ t("home.search_dialog.text_5") }}
            <font class="text-600-10 color-32CFEC">{{ searchedGameList.length }}</font>
            {{ t("home.search_dialog.text_6") }}
          </p>
        </div>
        <v-row class="mx-2 my-4">
          <template v-for="(item, index) in searchedGameList" :key="index">
            <v-col cols="4" class="py-0 px-1" v-if="index < 3">
              <ProgressiveImage
                :src="item.image"
                lazy-placeholder
                blur="30"
                delay="500"
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
          >
            {{ t("home.more") }}
          </v-btn>
        </v-row>
      </div>
    </div>
    <div class="m-home-search-swiper-title mt-9">
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
.m-home-search-body::-webkit-scrollbar {
  width: 0px;
}

.m-home-search-body {
  width: 100%;
  border-radius: 0px 0px 30px 30px;
  background: var(--Text-Box-1-211F31, #211f31);
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
    background: var(--BG-5-1C1929, #1c1929);
    height: 40px;

    /* Text Box */
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }

  .form-textfield div.v-field__field {
    color: white;
    background: var(--BG-5-1C1929, #1c1929);
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
    background: #29253c;
    right: 12px;
    top: 20px;
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    z-index: 2;
  }

  .swiper-button-prev {
    width: 24px;
    height: 24px;
    border-radius: 46px;
    background: #29253c;
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
  padding-bottom: 32px;

  .m-home-search-swiper-img {
    width: 100%;
  }
}
</style>
