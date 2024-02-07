<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { LocationQueryValue, useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import img_og_03 from "@/assets/home/image/img_og_03.png";
import { ProgressiveImage } from "vue-progressive-image";
import { type Search } from "@/interface/game";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const { width } = useDisplay();
const route = useRoute();
const router = useRouter();
const { dispatchGameSearch } = gameStore();
const { setMailMenuShow } = mailStore();

const currentPage = ref<number>(1);
const limit = ref<number>(8);
const loading = ref<boolean>(false);
const searchLoading = ref<boolean>(false);
const moreLoading = ref<boolean>(false);
const slug = ref<any>("");
const searchText = ref<string>("");

const mobileWidth: any = computed(() => {
  return width.value;
});

const providerGameList = ref<Array<Search>>([]);

const providerGames = computed(() => {
  const { getGameSearchList } = storeToRefs(gameStore());
  // getGameSearchList.value.list.map((item) => {
  //   item.image = img_og_03;
  // });
  return getGameSearchList.value;
});

const goToBackPage = () => {
  router.go(-1);
};

const handleMoreGame = async () => {
  moreLoading.value = true;
  currentPage.value += 1;
  await dispatchGameSearch(
    "?game_categories_slug=" + slug.value + "&page=" + currentPage.value + "&limit=" + limit.value
  );
  providerGameList.value = [...providerGameList.value, ...providerGames.value.list];
  moreLoading.value = false;
};

const handleEnterGame = async (id: number, name: string) => {
  let replaceName = name.replace(/ /g, "-");
  if (mobileWidth.value < 600) {
    setMailMenuShow(true);
  }
  router.push(`/game/${id}/${replaceName}`);
};

const handleInputChange = async (event: any) => {
  providerGameList.value = [];
  searchLoading.value = true;
  await dispatchGameSearch(
    "?game_categories_slug=" + slug.value + "&search=" + searchText.value + "&page=" + currentPage.value + "&limit=" + limit.value
  );
  providerGameList.value = [...providerGameList.value, ...providerGames.value.list];
  searchLoading.value = false;
}

watch(searchText, async (value) => {
  providerGameList.value = [];
  if (value) {
    searchLoading.value = true;
    await dispatchGameSearch(
      "?game_categories_slug=" + slug.value + "&search=" + value + "&page=" + currentPage.value + "&limit=" + limit.value
    );
    providerGameList.value = [...providerGameList.value, ...providerGames.value.list];
    searchLoading.value = false;
  } else {
    searchLoading.value = true;
    await dispatchGameSearch(
      "?game_categories_slug=" + slug.value + "&page=" + currentPage.value + "&limit=" + limit.value
    );
    providerGameList.value = [...providerGameList.value, ...providerGames.value.list];
    searchLoading.value = false;
  }
})

onMounted(async () => {
  loading.value = true;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  slug.value = route.query.slug ? route.query.slug : "";
  await dispatchGameSearch(
    "?game_categories_slug=" + slug.value + "&page=" + currentPage.value + "&limit=" + limit.value
  );
  providerGameList.value = [...providerGameList.value, ...providerGames.value.list];
  loading.value = false;
});
</script>

<template>
  <div
    class="m-provider-loading-container relative"
    style="padding-top: 400px"
    v-if="loading"
  >
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div>
  <div class="mx-3 m-provider-loading-container" v-else>
    <div class="d-flex align-center">
      <v-btn
        class="text-none m-provider-back-btn"
        variant="elevated"
        icon="mdi-chevron-left"
        width="20"
        height="20"
        @click="goToBackPage"
      >
      </v-btn>
      <p class="text-800-14 white ml-2">{{ t("provider.text_1") }}</p>
    </div>
    <v-text-field
      :placeholder="t('provider.text_2')"
      class="form-textfield dark-textfield mx-0"
      variant="solo"
      hide-details
      filled
      clearable
      density="compact"
      prepend-inner-icon="mdi-magnify"
      color="#7782AA"
      :class="mobileWidth < 600 ? 'm-provider-game-search-text' : ''"
      v-model="searchText"
    />
    <template v-if="searchLoading">
      <div class="m-provider-loading-container relative" style="padding-top: 400px">
        <div class="loading-body">
          <div class="dot-0"></div>
          <div class="dot-1"></div>
          <div class="dot-0"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        v-if="providerGameList.length == 0"
        class="text-400-12 gray text-center mt-4"
        style="width: 202px; margin: auto"
      >
        {{ t("provider.text_6") }}
      </div>
      <v-row class="ma-0">
        <template v-for="(game, index) in providerGameList" :key="index">
          <v-col
            cols="4"
            lg="2"
            md="2"
            sm="3"
            class="px-1 relative py-0 m-provider-game-img"
            v-if="index < 6 * currentPage"
          >
            <ProgressiveImage
              :src="game.image"
              lazy-placeholder
              blur="30"
              @click="handleEnterGame(game.id, game.name)"
            />
          </v-col>
        </template>
      </v-row>
      <div
        class="mt-4 text-center text-700-14 gray"
        v-if="providerGames.total > 6 && providerGames.total > 6 * currentPage"
      >
        {{ t("provider.text_3") }}
        <font class="white">&nbsp;{{ 6 * currentPage }}&nbsp;</font>
        {{ t("provider.text_4") }}
        <font class="white">&nbsp;{{ providerGames.total }}&nbsp;</font>
        {{ t("provider.text_5") }}
      </div>
      <v-btn
        class="text-none more-btn-color mt-5 text-center"
        variant="outlined"
        :width="mobileWidth < 600 ? '100%' : 164"
        :height="mobileWidth < 600 ? 41 : 48"
        v-if="providerGames.total > 6 && providerGames.total > 6 * currentPage"
        @click="handleMoreGame()"
      >
        <div v-if="!moreLoading">{{ t("home.more") }}</div>
        <div class="m-more-loading-body" v-else>
          <div class="dot-0"></div>
          <div class="dot-1"></div>
          <div class="dot-0"></div>
        </div>
      </v-btn>
    </template>
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
.m-provider-back-btn {
  background: transparent !important;
  box-shadow: unset !important;
  .v-icon {
    font-size: 20px !important;
    color: white;
  }
}

.m-provider-game-search-text {
  height: 36px !important;

  .v-field__clearable {
    padding-top: 6px !important;
  }

  div.v-field__field {
    box-shadow: none !important;
    background-color: #1d2027;
  }

  .v-field__overlay {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .v-field {
    border-radius: 10px !important;
  }

  .v-field__prepend-inner {
    padding-top: 7px !important;
  }

  .v-field__input {
    height: 36px !important;
    padding: 0px !important;
    min-height: 36px !important;
  }

  .v-field__field {
    height: 36px !important;
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
    height: 36px !important;
    .mdi:before {
      font-size: 19px !important;
      color: #7782aa !important;
    }
  }
}

.m-provider-game-img {
  cursor: pointer;
}

.m-provider-game-img:active {
  transform: scale(0.9);
  filter: brightness(80%);
  transition-duration: 0.28s;
}

.v-progressive-image-main {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

@media (max-width: 600px) {
  .v-progressive-image {
    border-radius: 8px 8px;
  }

  .more-btn-color {
    .v-btn__content {
      font-size: 12px !important;
    }
  }
}

.more-btn-color {
  background: transparent !important;
  color: #009b3a !important;

  .v-btn__content {
    font-weight: 700 !important;
    font-size: 16px;
  }
}

.m-provider-loading-container {
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

.m-more-loading-body {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
</style>
