<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { type GameItem } from "@/interface/game";
import { gameStore } from "@/store/game";
import { authStore } from "@/store/auth";
import { mailStore } from "@/store/mail";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import icon_public_36 from "@/assets/public/svg/icon_public_36.svg";
import icon_public_103 from "@/assets/public/svg/icon_public_103.svg";

const { t } = useI18n();
const router = useRouter();

const emit = defineEmits<{ (e: "closeGameConfirmDialog"): void, (e: "refreshGameFavoriteList", id: number | string): void }>();

const props = defineProps<{ selectedGameItem: GameItem, is_favorite: boolean }>();

const { selectedGameItem, is_favorite } = toRefs(props);

const { dispatchFavoriteGame } = gameStore();
const { setAuthModalType } = authStore();
const { setOverlayScrimShow } = appBarStore();
const { dispatchGameFavoriteList } = gameStore();
const { setMailMenuShow } = mailStore();

const favoriteSvgIconColor = ref<string>("#7782AA")

type dialogType = "login" | "signup";

// success

const success = computed(() => {
  const { getSuccess } = storeToRefs(gameStore());
  return getSuccess.value
})

// get Token
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

/* change svg icon or fill color */
const svgIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", favoriteSvgIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", favoriteSvgIconColor.value);
    }
  }
  return el;
};

const openDialog = (type: dialogType) => {
  setAuthModalType(type);
  setOverlayScrimShow(false);
};

// 添加收藏
const addFavoriteGame = async (id: string | number) => {
  if (!token.value) {
    emit("closeGameConfirmDialog");
    openDialog("login");
    return;
  }
  if (is_favorite.value) {
    await dispatchFavoriteGame({
      del_game: id,
    });
    emit("refreshGameFavoriteList", id);
  } else {
    await dispatchFavoriteGame({
      add_game: id,
    });
  }
  await dispatchGameFavoriteList()
  if (success.value) {
    favoriteSvgIconColor.value = favoriteSvgIconColor.value == "#7782AA" ? "#F9BC01" : "#7782AA";
  }
}

const handleEnterGame = async (id: number, name: string, is_demo: string) => {
  if (token.value) {
    let replaceName = name.replace(/ /g, "-");
    setMailMenuShow(true);
    // router.push(`/game/${id}/${replaceName}/${is_demo}`);
    router.push({ name: "Game", params: { id: id, name: replaceName, demo: is_demo } });
  } else {
    setAuthModalType('login');
  }
};

watch(is_favorite, (value) => {
  favoriteSvgIconColor.value = value ? "#F9BC01" : "#7782AA";
})
</script>

<template>
  <div class="m-game-confirm-body">
    <v-row class="mx-2 my-0">
      <v-col cols="4" class="px-1">
        <img
          :src="selectedGameItem.image"
          style="width: 100%"
          class="m-game-confirm-img"
        />
      </v-col>
      <v-col cols="5">
        <div class="text-700-14 white mt-2">{{ selectedGameItem.name }}</div>
        <div class="text-400-12 gray mt-1">by {{ selectedGameItem.provider }}</div>
      </v-col>
      <v-col cols="3" class="px-2 mt-2 d-flex">
        <inline-svg
          :src="icon_public_36"
          :transform-source="svgIconTransform"
          @click="addFavoriteGame(selectedGameItem.id)"
        ></inline-svg>
        <inline-svg :src="icon_public_103" style="margin-left: auto"></inline-svg>
      </v-col>
    </v-row>
    <v-row class="mx-8 pb-4 align-center" v-if="selectedGameItem.is_demo">
      <v-col
        cols="6"
        class="text-700-12 gray text-center"
        @click="handleEnterGame(selectedGameItem.id, selectedGameItem.name, 'true')"
      >
        {{ t("game_confirm.text_1") }}
      </v-col>
      <v-col cols="6">
        <v-btn
          class="text-none m-game-confirm-real-more-btn"
          width="144"
          height="40"
          @click="handleEnterGame(selectedGameItem.id, selectedGameItem.name, 'false')"
        >
          {{ t("game_confirm.text_2") }}
        </v-btn>
      </v-col>
    </v-row>
    <div class="text-center" v-else>
      <v-btn
        class="my-4 text-none m-game-confirm-real-more-btn"
        width="280"
        height="40"
        @click="handleEnterGame(selectedGameItem.id, selectedGameItem.name, 'false')"
      >
        {{ t("game_confirm.text_2") }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.m-game-confirm-body {
  // height: 244px;
  width: 100%;
  background: $color_1;

  .m-game-confirm-img {
    object-fit: cover;
    aspect-ratio: 0.74152;
    border-radius: 8px 32px;
  }

  .m-game-confirm-real-more-btn {
    border-radius: 8px;
    background: $color_2;
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);

    .v-btn__content {
      color: #fff;
      text-align: center;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
  }
}

.m-game-confirm-drawer-close-button {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: -26px;
  right: 6px;
  z-index: 100000;
}
</style>
