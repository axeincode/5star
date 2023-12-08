<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import icon_public_91 from "@/assets/public/svg/icon_public_91.svg";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";
import type * as LiveWinItem from "@/interface/home";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import { Pagination, Virtual, Autoplay, Navigation } from "swiper/modules";

const { t } = useI18n();
const { width } = useDisplay();
const modules = [Pagination, Autoplay, Navigation];

const svgIconColor = ref<string>("#7782AA");
const interval = ref<any>(null);

/* vip level images */
const vipLevelImgs = ref<Array<any>>([
  img_vipemblem_1_24,
  img_vipemblem_25_49,
  img_vipemblem_50_74,
  img_vipemblem_75_99,
  img_vipemblem_100_149,
  img_vipemblem_159_199,
  img_vipemblem_200,
]);

/* change svg icon or fill color */
const svgIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", svgIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", svgIconColor.value);
    }
  }
  return el;
};

/* live win game temp list */
const liveWinList = ref<Array<LiveWinItem>>([
  {
    image: new URL("@/assets/home/image/img_win_01.png", import.meta.url).href,
    level: 0,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_02.png", import.meta.url).href,
    level: 1,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_03.png", import.meta.url).href,
    level: 2,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_01.png", import.meta.url).href,
    level: 3,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_02.png", import.meta.url).href,
    level: 4,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_03.png", import.meta.url).href,
    level: 5,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_01.png", import.meta.url).href,
    level: 6,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_02.png", import.meta.url).href,
    level: 1,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_02.png", import.meta.url).href,
    level: 1,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_02.png", import.meta.url).href,
    level: 1,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
  {
    image: new URL("@/assets/home/image/img_win_03.png", import.meta.url).href,
    level: 2,
    game_name: "Mgnonk...",
    betting_amount: "$12.33",
  },
]);

const mobileWidth = computed(() => {
  return width.value;
});

onMounted(() => {
  interval.value = setInterval(() => {
    liveWinList.value.push(liveWinList.value[Math.floor(Math.random() * 8)]);
  }, 60000);
});

// 在頁面銷毀之前先銷毀定時器
onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
})
</script>

<template>
  <div class="m-home-live-win" v-if="mobileWidth < 600">
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
    <div class="live-win-body">
      <Swiper
        :modules="modules"
        :slidesPerView="5"
        :spaceBetween="8"
        :autoplay="{
          delay: 600,
          disableOnInteraction: false,
        }"
        class="mx-2"
        style="height: auto"
      >
        <SwiperSlide
          v-for="(item, index) in liveWinList"
          :key="index"
          :virtualIndex="index"
        >
          <div class="text-center">
            <img :src="item.image" class="live-win-img" />
            <div class="live-win-level-text">
              <img :src="vipLevelImgs[item.level]" width="12" />
              <p class="text-500-8 white ml-1">{{ item.game_name }}</p>
            </div>
            <div class="text-900-10 color-12FF76">{{ item.betting_amount }}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <div class="home-live-win" v-else>
    <!-- <img src="@/assets/home/svg/live_win.svg" class="live-win-img-width" /> -->
    <div class="live-win-header">
      <inline-svg
        :src="icon_public_91"
        width="24"
        height="24"
        :transform-source="svgIconTransform"
      ></inline-svg>
      <p class="text-700-22 gray ml-2">{{ t("home.live_win.text_1") }}</p>
    </div>
    <div class="live-win-body">
      <Swiper
        :modules="modules"
        :slidesPerView="mobileWidth / 100"
        :spaceBetween="10"
        :autoplay="{
          delay: 600,
          disableOnInteraction: false,
        }"
        class="mx-2"
        style="height: auto"
      >
        <SwiperSlide
          v-for="(item, index) in liveWinList"
          :key="index"
          :virtualIndex="index"
        >
          <div class="text-center">
            <img :src="item.image" class="live-win-img" />
            <div class="live-win-level-text">
              <img :src="vipLevelImgs[item.level]" width="21" />
              <p class="text-400-14 white ml-2">{{ item.game_name }}</p>
            </div>
            <div class="text-900-18 color-12FF76">{{ item.betting_amount }}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style lang="scss">
.m-home-live-win {
  min-height: 123px;
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
  .live-win-body {
    position: absolute;
    top: 30px;
    width: 100%;
  }
  .live-win-img {
    width: 95%;
    border-radius: 12px;
  }
  .live-win-level-text {
    display: flex;
    align-items: center;
    margin: 0px 6px;
    justify-content: center;
  }
}
.home-live-win {
  position: relative;
  margin: 28px 16px 0px 16px;
  background-image: url('@/assets/home/svg/live_win.svg');
  background-size: cover;
  border-radius: 16px;
  .live-win-img-width {
    width: 100%;
  }
  .live-win-header {
    // position: absolute;
    // top: 15px;
    // left: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
  }
  .live-win-body {
    // position: absolute;
    // top: 76px;
    width: 100%;
    .swiper-slide {
      width: 100px !important;
    }
  }
  .live-win-img {
    // width: 95%;
    height: 100px;
    border-radius: 12px;
  }
  .live-win-level-text {
    display: flex;
    align-items: center;
    margin: 0px 6px;
    justify-content: center;
  }
}
</style>
