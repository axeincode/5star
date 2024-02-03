<script lang="ts" setup>
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import { gameStore } from "@/store/game";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();
const { dispatchGameEnter, getGameBetbyInit, closeKill } = gameStore();
const betbyShow = ref<boolean>(false);
const betbyHeight = ref<number | undefined>(0);
const betby = ref(null);
type dialogType = "login" | "signup";

const handleResize = () => {
    betbyHeight.value = window.innerHeight;
};

const getLang = computed(() => {
    const { getLanguage } = storeToRefs(gameStore());
    return getLanguage.value;
});

watch(getLang, async(oldVal: string, newVal: string) => {
    if (oldVal !== newVal) {
        betbyShow.value = true;
        await closeKill();
        await dispatchGameEnter({ id: route.params.id });
        await getGameBetbyInit();
        betbyShow.value = false;
    }
}, {deep: true});

onMounted(async () => {
    window.addEventListener("resize", handleResize);
    betbyHeight.value = window.innerHeight;
    betbyShow.value = true;
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    await dispatchGameEnter({ id: route.params.id });
    await getGameBetbyInit();
    betbyShow.value = false;
});
</script>
<template>
    <div class="p-betby-main">
        <div class="m-loading-container relative" v-if="betbyShow">
            <div class="loading-body">
            <div class="dot-0"></div>
            <div class="dot-1"></div>
            <div class="dot-0"></div>
            </div>
        </div>
        <div id="betby"></div>
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
.p-betby-main {
    width: 100%;
    max-width: 1300px;
    min-height: 500px;
    margin: 0 auto;
}
.m-loading-container {
    position: absolute;
    top: 0px;
    border: none;
    width: 100%;
    height: 100vh;
    opacity: 1;
    z-index: 20000000;
    background: #15161C;

    .loading-body {
        display: flex;
        align-items: center;
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translateX(-50%);
    }

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