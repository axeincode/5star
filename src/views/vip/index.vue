<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
// import VIP from "@/components/vip/index.vue";
// import MVIP from "@/components/vip/mobile/index.vue";
import { useDisplay } from "vuetify";
import { defineAsyncComponent } from "vue";

const { width } = useDisplay();

const loading = ref<boolean>(true);

const mobileWidth: any = computed(() => {
  return width.value;
});

const MVIP = defineAsyncComponent(() => import("@/components/vip/mobile/index1.vue"));
const VIP = defineAsyncComponent(() => import("@/components/vip/index.vue"));

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<template>
  <!-- <div class="m-home-loading" v-if="loading">
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div>
  <div v-else> -->
    <VIP v-if="mobileWidth > 600" />
    <MVIP v-else />
  <!-- </div> -->
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
.m-home-loading {
  height: 100vh;
  position: relative;
  overflow-y: hidden;

  .loading-body {
    display: flex;
    align-items: center;
    position: absolute;
    top: 40%;
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
</style>
