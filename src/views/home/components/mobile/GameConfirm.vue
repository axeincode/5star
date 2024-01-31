<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { type GameItem } from "@/interface/game";
import { ProgressiveImage } from "vue-progressive-image";
import icon_public_36 from "@/assets/public/svg/icon_public_36.svg";
import icon_public_103 from "@/assets/public/svg/icon_public_103.svg";

const props = defineProps<{ selectedGameItem: GameItem }>();

const { selectedGameItem } = toRefs(props);

const svgIconColor = ref<string>("#7782AA")

/* change svg icon or fill color */
const svgIconTransform = (el: any) => {
    for (let node of el.children) {
        node.setAttribute("fill", svgIconColor.value);
        for (let subNode of node.children) {
            subNode.setAttribute("fill", svgIconColor.value);
        }
    }
    return el;
};

const { t } = useI18n();
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
        ></inline-svg>
        <inline-svg
          :src="icon_public_103"
          :transform-source="svgIconTransform"
          style="margin-left: auto"
        ></inline-svg>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn class="my-4 text-none m-game-confirm-real-more-btn" width="280" height="40">
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
