<script lang="ts" setup>
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import { gameStore } from "@/store/game";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import AdjustClass from "@/utils/adjust";
import EventToken from "@/constants/EventToken";

const route = useRoute();
const { dispatchGameEnter, getGameBetbyInit,updateOptionsBy, closeKill } = gameStore();
const betbyShow = ref<boolean>(false);
const betbyHeight = ref<number | undefined>(0);
const betby = ref(null);
type dialogType = "login" | "signup";

let observer: null = null;
let resizeTimer: any = null;
// 监听嵌套体育页面高度，当有内容就会有高度，去掉页面loading
const handleResize = (entries: any) => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    for (const entry of entries) {
      const { height } = entry.contentRect;
      if (height > 20) {
        betbyShow.value = false;
        document.body.style.overflow = 'scroll';
      }
    }
  }, 200);
};

const getLang = computed(() => {
  const { getLanguage } = storeToRefs(gameStore());
  return getLanguage.value;
});

watch(
  getLang,
  async (oldVal: string, newVal: string) => {
    if (oldVal !== newVal) {
      betbyShow.value = true;
      await closeKill();
      // await dispatchGameEnter({ id: "9999", demo: false });
      await getGameBetbyInit();
      betbyShow.value = false;
      document.body.style.overflow = 'scroll';
    }
  },
  { deep: true }
);

watch(route, async () => {
  console.log(route,route.query,'routerouteroute')
  updateOptionsBy({url:route.query['bt-path']})
  // betbyShow.value = true;
  // await closeKill();
  // await getGameBetbyInit();
  // observer = new ResizeObserver(handleResize);
  // observer.observe(betby.value);
  // betbyShow.value = false;
});

onMounted(async () => {
  AdjustClass.getInstance().adjustTrackEvent({
    key: "PAGE_VIEW",
    value: "sports",
    params: ""
  });
  // window.addEventListener("resize", handleResize);
  betbyHeight.value = window.innerHeight;
  betbyShow.value = true;
  document.body.style.overflow = 'hidden';
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  // await dispatchGameEnter({ id: "9999", demo: false });
  await getGameBetbyInit();
  // 监听嵌套体育页面高度，当有内容就会有高度，去掉页面loading
  observer = new ResizeObserver(handleResize);
  observer.observe(betby.value);
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
    <div id="betby" ref="betby" class="betby"></div>
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
  position: relative;
  width: 100%;
  max-width: 1300px;
  // min-height: 500px;
  height: 100vh;
  overflow: auto;
  margin: 0 auto;
}

.betby {
  height: 100%;
}

.m-loading-container {
  position: absolute;
  top: 0px;
  border: none;
  width: 100%;
  height: 100vh;
  opacity: 1;
  z-index: 20000000;
  background: #15161c;

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
