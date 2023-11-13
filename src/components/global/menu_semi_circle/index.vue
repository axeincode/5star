<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_40 from "@/assets/public/svg/icon_public_40.svg";
import icon_public_100 from "@/assets/public/svg/icon_public_100.svg";

const casinoIconColor = ref<string>("#7782AA");
const rewardIconColor = ref<string>("#ffffff");
const sportIconColor = ref<string>("#7782AA");

const { t } = useI18n();
const { name, width } = useDisplay();

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
</script>

<template>
  <div class="m-menu-semicircle-toggle">
    <div class="m-semicircle-item m-semicircle-casino">
      <inline-svg
        :src="icon_public_34"
        width="22"
        height="22"
        :transform-source="casinoSvgTransform"
      ></inline-svg>
      <div class="text-600-12 gray">{{ t("mobile_menu.casino") }}</div>
    </div>
    <div class="m-semicircle-item m-semicircle-sport">
      <inline-svg
        :src="icon_public_40"
        width="22"
        height="22"
        :transform-source="casinoSvgTransform"
      ></inline-svg>
      <div class="text-600-12 gray">{{ t("mobile_menu.sport") }}</div>
    </div>
    <div class="m-semicircle-item m-semicircle-reward">
      <inline-svg
        :src="icon_public_100"
        width="22"
        height="22"
        :transform-source="rewardSvgTransform"
      ></inline-svg>
      <div class="text-600-12 white">{{ t("mobile_menu.reward") }}</div>
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
  bottom: 48px;
  transform: translateX(-50%);
  z-index: 5;
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
