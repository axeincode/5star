<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from 'vuetify';

const { t } = useI18n();
const { width } = useDisplay();

const gameProviders = ref<Array<string>>([
    new URL("@/assets/home/image/img_gp_01.png", import.meta.url).href,
    new URL("@/assets/home/image/img_gp_02.png", import.meta.url).href,
    new URL("@/assets/home/image/img_gp_03.png", import.meta.url).href,
    new URL("@/assets/home/image/img_gp_05.png", import.meta.url).href,
    new URL("@/assets/home/image/img_gp_06.png", import.meta.url).href,
    new URL("@/assets/home/image/img_gp_07.png", import.meta.url).href,
])

const mobileWidth = computed(() => {
    return width.value
})
</script>

<template>
    <!-------------------- game providers -------------->
    <v-row class="mx-4 mt-6 mb-2 white" :class="[mobileWidth < 600 ? 'text-700-14' : 'text-700-22']">
        {{ t("home.game_providers") }}
    </v-row>
    <v-row class="mx-2 mt-2">
        <v-col cols="4" lg="2" md="2" sm="3" class="px-2 py-1 " v-ripple.center
            v-for="(gameProviderItem, gameProviderIndex) in gameProviders" :key="gameProviderIndex">
            <img :src="gameProviderItem" class="game-provider-img-width" />
        </v-col>
    </v-row>
</template>

<style lang="scss">
.game-provider-img-width {
    max-width: 160px !important;
    width: 100%;
    cursor: pointer;
}
</style>
