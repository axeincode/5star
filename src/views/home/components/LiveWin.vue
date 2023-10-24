<script setup lang="ts">
import { ref } from "vue";
import icon_public_91 from "@/assets/public/svg/icon_public_91.svg";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";
import type * as LiveWinItem from "@/interface/home";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const svgIconColor = ref<string>("#7782AA");

const vipLevelImgs = ref<Array<any>>([
  img_vipemblem_1_24,
  img_vipemblem_25_49,
  img_vipemblem_50_74,
  img_vipemblem_75_99,
  img_vipemblem_100_149,
  img_vipemblem_159_199,
  img_vipemblem_200,
]);

const svgIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", svgIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", svgIconColor.value);
    }
  }
  return el;
};

const liveWinList = ref<Array<LiveWinItem>>([
  {
    image: new URL("@/assets/home/image/img_win_01.png", import.meta.url).href,
  },
]);
</script>

<template>
  <div class="home-live-win">
    <img src="@/assets/home/svg/live_win_1.svg" class="m-live-win-img-width" />
    <div class="live-win-header">
      <inline-svg
        :src="icon_public_91"
        width="16"
        height="16"
        :transform-source="svgIconTransform"
        style="margin-top: 2px"
      ></inline-svg>
      <p class="text-900-10 gray ml-1">{{ t("home.live_win.text_1") }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.home-live-win {
  position: relative;
  margin: 28px 4px 0px 4px;
  .m-live-win-img-width {
    width: 100%;
  }
  .live-win-header {
    position: absolute;
    top: 3px;
    left: 10px;
    display: flex;
    align-items: center;
  }
}
</style>
