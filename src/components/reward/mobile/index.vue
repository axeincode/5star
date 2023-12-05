<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { ref, computed, watch, onMounted, onUnmounted, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Search } from "@/interface/game";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const { dispatchGameSearch } = gameStore();
const { setGameSearchList } = gameStore();
const { removeAllSearchTextList } = gameStore();
const { removeSearchTextList } = gameStore();
const { setSearchTextList } = gameStore();
const { setMailMenuShow } = mailStore();

const props = defineProps<{ rewardNavShow: boolean }>();

const { rewardNavShow } = toRefs(props);

const rewardContainerHeight = ref<number>(590);

const mobileWidth = computed(() => {
  return width.value;
});

onMounted(() => {
  rewardContainerHeight.value = window.innerHeight - 172;
});
</script>

<template>
  <div class="m-reward-body" :style="{ height: rewardContainerHeight + 'px' }"></div>
</template>

<style lang="scss">
.m-reward-body {
  background: #29253c;
}
</style>
