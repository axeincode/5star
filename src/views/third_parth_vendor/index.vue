<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { adjustTrackEvent } from "@/utils/adjust";
import { useRouter, useRoute } from "vue-router";
import { gameStore } from "@/store/game";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const { dispatchGameCategories } = gameStore();
const { t } = useI18n();

const loading = ref<boolean>(false);
const gameConfirmDialogShow = ref<boolean>(false);

const goToBackPage = () => {
  router.push({ name: "Dashboard" });
};

watch(route, async (to, from) => {
  loading.value = true;
  await dispatchGameCategories("?type=providers");
  loading.value = false;
});

const gameProviders = computed(() => {
  const { getGameProviders } = storeToRefs(gameStore());
  return getGameProviders.value;
});

const handleGameProviderPage = (slug: string) => {
  router.push({ name: "Provider", query: { slug: slug } });
};

onMounted(async () => {
  loading.value = true;
  adjustTrackEvent({
    eventToken: "s2jbxh", // PAGE_VIEW
  });
  
  await dispatchGameCategories("?type=providers");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  loading.value = false;
});
</script>

<template>
  <div
    class="m-third-parth-vendor-loading-container relative"
    style="padding-top: 400px"
    v-if="loading"
  >
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div>
  <div v-else>
    <div
      class="mx-3 m-third-parth-vendor-loading-container"
      :class="gameConfirmDialogShow ? 'm-third-parth-vendor-bg-blur' : ''"
    >
      <div class="d-flex align-center">
        <v-btn
          class="text-none m-third-parth-vendor-back-btn"
          variant="elevated"
          icon="mdi-chevron-left"
          width="20"
          height="20"
          @click="goToBackPage"
        >
        </v-btn>
        <p class="text-800-14 white ml-2">{{ t("home.game_providers") }}</p>
      </div>

      <div class="mt-2 m-third-parth-vendor">
        <div 
          v-for="(gameProviderItem, gameProviderIndex) in gameProviders"
          :key="gameProviderIndex"
          class="ma-2"
        >
          <div class="m-third-parth-vendor-image">
            <img
              :src="gameProviderItem.pictures"
              width="156"
              height="68"
              @click="handleGameProviderPage(gameProviderItem.slug)"
            />
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-third-parth-vendor-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
}

.m-third-parth-vendor-back-btn {
  background: transparent !important;
  box-shadow: unset !important;

  .v-icon {
    font-size: 20px !important;
    color: white;
  }
}

.m-third-parth-vendor-loading-container {
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

.m-third-parth-vendor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;

  .m-third-parth-vendor-image {
    display: flex;
    justify-content: center;
  }
}


</style>
