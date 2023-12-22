<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { menuStore } from "@/store/menu";
import { mailStore } from "@/store/mail";
import { appBarStore } from "@/store/appBar";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_40 from "@/assets/public/svg/icon_public_40.svg";
import icon_public_100 from "@/assets/public/svg/icon_public_100.svg";

const casinoIconColor = ref<string>("#7782AA");
const rewardIconColor = ref<string>("#ffffff");
const sportIconColor = ref<string>("#7782AA");
const scale = ref<number>(1);
const bottom = ref<number>(-48);

const { t } = useI18n();
const { name, width } = useDisplay();
const router = useRouter();
const route = useRoute();

const { setSelectedItem } = menuStore();
const { setSemiCircleShow } = menuStore();
const { setRewardNavShow } = menuStore();
const { setMailMenuShow } = mailStore();
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();

const selectedItem = computed(() => {
  const { getSelectedItem } = storeToRefs(menuStore());
  return getSelectedItem.value;
});

const semiCircleShow = computed(() => {
  const { getSemiCircleShow } = storeToRefs(menuStore());
  return getSemiCircleShow.value;
});

watch(selectedItem, (newValue) => {
  switch (newValue) {
    case t("mobile_menu.casino"):
      casinoIconColor.value = "#ffffff";
      rewardIconColor.value = "#7782AA";
      sportIconColor.value = "#7782AA";
      break;
    case t("mobile_menu.sport"):
      casinoIconColor.value = "#7782AA";
      rewardIconColor.value = "#7782AA";
      sportIconColor.value = "#ffffff";
      break;
    case t("mobile_menu.reward"):
      casinoIconColor.value = "#7782AA";
      rewardIconColor.value = "#ffffff";
      sportIconColor.value = "#7782AA";
      break;
  }
});

watch(semiCircleShow, (value) => {
  if (value) {
    bottom.value = 48;
  } else {
    bottom.value = -48;
  }
});

const casinoSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", casinoIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", casinoIconColor.value);
    }
  }
  return el;
};

const rewardSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", rewardIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", rewardIconColor.value);
    }
  }
  return el;
};

const sportSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", sportIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", sportIconColor.value);
    }
  }
  return el;
};

const handleSelectItem = (item: string) => {
  setSelectedItem(item);
  setSemiCircleShow(false);
  bottom.value = -48;
  if (item == t("mobile_menu.casino")) {
    router.push({ name: "Dashboard" });
    setRewardNavShow(false);
    setOverlayScrimShow(false);
    setMainBlurEffectShow(false);
    setMailMenuShow(false);
  } else if (item == t("mobile_menu.reward")) {
    setRewardNavShow(true);
    setOverlayScrimShow(true);
    setMainBlurEffectShow(true);
    setMailMenuShow(true);
  } else if (item == t("mobile_menu.sport")) {
    router.push(`/sports`);
    setRewardNavShow(false);
    setOverlayScrimShow(false);
    setMainBlurEffectShow(false);
    setMailMenuShow(false);
  }
};

const handleWindowScroll = () => {
  setSemiCircleShow(false);
  bottom.value = -48;
};

watch(route, (to, from) => {
  setSemiCircleShow(false);
  bottom.value = -48;
});

onMounted(() => {
  window.addEventListener("scroll", handleWindowScroll);
});
</script>

<template>
  <div
    class="m-menu-semicircle-toggle"
    :style="{ transform: `translateX(-50%)`, bottom: `${bottom}px` }"
    v-if="route.name !== 'Sports'"
  >
    <div
      class="m-semicircle-item m-semicircle-casino"
      @click="handleSelectItem(t('mobile_menu.casino'))"
    >
      <inline-svg
        :src="icon_public_34"
        width="22"
        height="22"
        :transform-source="casinoSvgTransform"
      ></inline-svg>
      <div
        class="text-600-12"
        :class="selectedItem == t('mobile_menu.casino') ? 'white' : 'gray'"
      >
        {{ t("mobile_menu.casino") }}
      </div>
    </div>
    <div
      class="m-semicircle-item m-semicircle-sport"
      @click="handleSelectItem(t('mobile_menu.sport'))"
    >
      <inline-svg
        :src="icon_public_40"
        width="22"
        height="22"
        :transform-source="sportSvgTransform"
      ></inline-svg>
      <div
        class="text-600-12"
        :class="selectedItem == t('mobile_menu.sport') ? 'white' : 'gray'"
      >
        {{ t("mobile_menu.sport") }}
      </div>
    </div>
    <div
      class="m-semicircle-item m-semicircle-reward"
      @click="handleSelectItem(t('mobile_menu.reward'))"
    >
      <inline-svg
        :src="icon_public_100"
        width="22"
        height="22"
        :transform-source="rewardSvgTransform"
      ></inline-svg>
      <div
        class="text-600-12"
        :class="selectedItem == t('mobile_menu.reward') ? 'white' : 'gray'"
      >
        {{ t("mobile_menu.reward") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-menu-semicircle-toggle {
  width: 175px;
  height: 87.5px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  position: fixed;
  left: 50%;
  // transform-origin: center;
  z-index: 14;
  transition: bottom 0.1s;
  border-radius: 100px 100px 0 0;
  .m-semicircle-item {
    align-items: center;
    display: flex;
    flex-direction: column;
    position: absolute;
  }
  .m-semicircle-casino {
    left: 17px;
    top: 32px;
  }
  .m-semicircle-reward {
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
  }
  .m-semicircle-sport {
    right: 17px;
    top: 32px;
  }
}
</style>
