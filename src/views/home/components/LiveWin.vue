<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, onActivated, onDeactivated } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import { gameStore } from "@/store/game";
import icon_public_91 from "@/assets/public/svg/icon_public_91.svg";
import icon_public_91_1 from "@/assets/public/svg/icon_public_91_1.svg";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";
import img_win_01 from "@/assets/home/image/img_win_01.png";
import img_win_02 from "@/assets/home/image/img_win_02.png";
import img_win_03 from "@/assets/home/image/img_win_03.png";
import { type LiveWinItem } from "@/interface/affiliate/home";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import { Pagination, Virtual, Autoplay, Navigation } from "swiper/modules";
import vipLevelGroups from "@/utils/VipLevelGroup";
import { storeToRefs } from "pinia";
import {GameBigWinItem} from "@/interface/game"

// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed<string>(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const emit = defineEmits<{ (e: "openGame", item: any): void }>();

const { t } = useI18n();
const { width } = useDisplay();
const modules = [Pagination, Autoplay, Navigation];
const { dispatchGameBigWin } = gameStore();
const router = useRouter();

const svgIconColor = ref<string>("#7782AA");
const interval = ref<any>(null);
const liveWinBody = ref<any>({});
const winBodyWidth = ref<number>(0);
const winBodyMargin = ref<number>(0);

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

const imgWinList = ref<Array<any>>([
  img_win_01,
  img_win_02,
  img_win_03
])

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

const gameBigWinItem = computed(() => {
  const { getGameBigWinItem } = storeToRefs(gameStore());
  return getGameBigWinItem.value;
});

const mobileWidth = computed(() => {
  if (liveWinBody.value) {
    const s = liveWinBody.value?.clientWidth;
    const st: any = s / 100;
    const sti = parseInt(st);
    console.log("zhelli", (s % 100) / (sti - 1));
    // (winBodyWidth % 100) / parseInt(winBodyWidth / 100)
    if ((s % 100) / sti < 8) {
      // winBodyWidth.value = liveWinBody.value.clientWidth - (sti - 1) * 8;
      winBodyWidth.value = sti;
      winBodyMargin.value = 8 + (s % 100) / (st - 1);
      console.log(winBodyMargin.value);
    } else {
      // winBodyWidth.value = liveWinBody.value.clientWidth;
      winBodyWidth.value = sti;
      winBodyMargin.value = (s % 100) / (st - 1);
    }
  }
  return width.value;
});

const goGame = (item: any) => {
  // emit到上一层触发公共的打开游戏的方法， 和游戏列表的打开游戏类似，字段做了重新keyValue处理
  emit('openGame', {
    image: item.game_icon,
    id: item.game_id,
    name: item.game_name,
    provider_name: '',
    is_demo: false,
  })
}

const swiper = ref<any>(null);
const swiperShow = ref<boolean>(true);
const getSwiperRef = (swiperInstance: any) => {
  swiper.value = swiperInstance;
};

onMounted(async () => {
  await dispatchGameBigWin();
});

// 提前手动关闭swiper，缓存组件时，就可以避免不动的问题
onActivated(() => {
  swiperShow.value = true;
})
onDeactivated(() => {
  swiperShow.value = false;
})

const liveWinList = ()=>{
  let res =[...gameBigWinItem.value.lucky_bets, ...gameBigWinItem.value.lucky_bets];
  console.log(res.length);
  return res;
}
</script>

<template>
  <!-- H5 -->
  <div class="m-home-live-win" v-if="mobileWidth < 600">
    <!-- <img src="@/assets/home/svg/live_win_1.svg" class="m-live-win-img-width" /> -->
    <!-- 标题 -->
    <div class="live-win-header-new">
      <div class="live-win-header-new-title">
        <inline-svg
          :src="icon_public_91_1"
          width="16"
          height="16"
          style="margin-top: 2px"
        ></inline-svg>
        <p class="text-900-10 ml-1">{{ t("home.live_win.text_1") }}</p>
      </div>
    </div>
    <!-- <div class="live-win-header">
      <inline-svg
        :src="icon_public_91_1"
        width="16"
        height="16"
        :transform-source="svgIconTransform"
        style="margin-top: 2px"
      ></inline-svg>
      <p class="text-900-10 gray ml-1">{{ t("home.live_win.text_1") }}</p>
    </div> -->
    <div class="live-win-body">
      <Swiper
        v-if="swiperShow"
        :modules="modules"
        :slidesPerView="5"
        :spaceBetween="8"
        :loop="true"
        :autoplay="{
          delay: 600,
          disableOnInteraction: false,
        }"
        class="mx-2"
        style="height: auto"
        @swiper="getSwiperRef"
      >
        <SwiperSlide
          v-for="(item, index) in liveWinList()"
          :key="index"
          :virtualIndex="index"
          @click="goGame(item)"
        >
          <div class="text-center">
            <div style="position: relative;">
              <img :src="item.game_icon" class="live-win-img" />
              <div class="text-overlay--swiper" style="margin-bottom: 7px;">
                <h2>{{ item.game_name }}</h2>
              </div>
            </div>
            <div class="live-win-level-text">
              <img :src="vipLevelGroups[item.user_vip_group]" width="12" />
              <p class="text-500-8 white ml-1">{{ item.user_name }}</p>
            </div>
            <div class="text-900-10 color-12FF76">{{ platformCurrency }}{{ item.win_amount }}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

  <!-- PC -->
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
    <div class="live-win-body" ref="liveWinBody">
      <Swiper
        :modules="modules"
        :slidesPerView="winBodyWidth"
        :spaceBetween="winBodyMargin"
        :autoplay="{
          delay: 600,
          disableOnInteraction: false,
        }"
        class="mx-2"
        style="height: auto"
      >
        <SwiperSlide
          v-for="(item, index) in gameBigWinItem.lucky_bets"
          :key="index"
          :virtualIndex="index"
          @click="goGame(item)"
        >
          <div class="text-center">
            <img :src="imgWinList[Math.floor(Math.random() * 3)]" class="live-win-img" />
            <div class="live-win-level-text">
              <img :src="vipLevelGroups[item.user_vip_group]" width="21" />
              <p class="text-400-14 white ml-2">{{ item.user_name }}</p>
            </div>
            <div class="text-900-18 color-12FF76">{{ platformCurrency }}{{ item.win_amount }}</div>
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
    // position: absolute;
    // top: 30px;
    width: 100%;
    min-height: 100px;
    background: #1D2027;
    border-radius: 0 8px 8px 8px;
    padding: 8px 0px;
  }
  .live-win-img {
    width: 95%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 8px;
  }
  .live-win-level-text {
    display: flex;
    align-items: center;
    margin: 0px 6px;
    justify-content: center;
  }
  .live-win-header-new {
    width: 100%;
    // display: flex;
    .live-win-header-new-title {
      display: flex;
      width: fit-content;
      background: #1D2027;
      border-radius: 8px 8px 0 0;
      padding: 2px 20px 0px 10PX;
      line-height: 16px;
      color: #fff !important;
      margin-right: 8px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        right: -8px;
        top: 6px;
        width: 0px;
        height: 0px;
        border: 9px solid #1D2027;
        border-left: 4px solid #1D2027;
        border-right: 4px solid #1D2027;
        border-top-color: transparent;
        border-right-color: transparent;
      }
    }
  }
}
.home-live-win {
  position: relative;
  margin: 28px 16px 0px 16px;
  background-image: url("@/assets/home/svg/live_win.svg");
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
    padding-left: 10px;
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
    border-radius: 8px;
  }
  .live-win-level-text {
    display: flex;
    align-items: center;
    margin: 0px 6px;
    justify-content: center;
  }
  .text-center {
    cursor: pointer;
  }
}

/* 文字叠加在图片上 */
.text-overlay--swiper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 1.8px;
  padding: 8px 7px 4px;
  color: white;
  border-bottom-left-radius: 8px 8px;
  border-bottom-right-radius: 8px 8px;

  h2 {
    margin: 0;
    font-size: 8px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.2;
  }
}
</style>
