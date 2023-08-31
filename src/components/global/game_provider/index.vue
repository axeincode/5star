<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();

const gameProviders = ref<Array<string>>([
  new URL("@/assets/home/image/img_gp_01.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_02.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_03.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_04.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_05.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_06.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_07.png", import.meta.url).href,
]);

const mGameProviders = ref<Array<string>>([
  new URL("@/assets/home/image/img_gp_01.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_02.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_03.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_05.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_06.png", import.meta.url).href,
  new URL("@/assets/home/image/img_gp_07.png", import.meta.url).href,
]);

const mobileWidth = computed(() => {
  return width.value;
});
</script>

<template>
  <!-------------------- game providers -------------->
  <v-row
    class="mb-4 white"
    :class="[mobileWidth < 600 ? 'mx-2 mt-8 text-800-16' : 'mx-4 mt-6 text-700-22']"
  >
    {{ t("home.game_providers") }}
  </v-row>
  <v-row class="ml-4 mr-2 mt-2" v-if="mobileWidth > 600">
    <div
      style="flex: 0 0 14.2857%; max-width: 14.2857%; padding-right: 8px"
      v-ripple.center
      v-for="(item, index) in gameProviders"
      :key="index"
    >
      <img :src="item" class="game-provider-img-width" />
    </div>
  </v-row>
  <v-row class="ma-2" v-else>
    <v-slide-group>
      <v-slide-group-item
        v-for="(gameProviderItem, gameProviderIndex) in mGameProviders"
        :key="gameProviderIndex"
      >
        <img :src="gameProviderItem" width="126" height="49" class="mr-5" />
      </v-slide-group-item>
    </v-slide-group>
  </v-row>
</template>

<style lang="scss">
.game-provider-img-width {
  max-width: 160px !important;
  width: 100%;
  cursor: pointer;
}
</style>
