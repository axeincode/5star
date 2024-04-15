<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  computed,
  watch,
  onMounted,
  defineEmits,
  onActivated, 
  onDeactivated
} from "vue";
import { storeToRefs } from "pinia";
import { refferalStore } from "@/store/refferal";
import { useDisplay } from "vuetify";
import { Swiper, SwiperSlide } from "swiper/vue";
import { bannerStore } from "@/store/banner";
import { authStore } from "@/store/auth";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
// import Swiper core and required modules
import { Pagination, Virtual, Autoplay, Navigation } from "swiper/modules";
import { useRouter } from "vue-router";
import { promoStore } from "@/store/promo";
import { STATEMENT_TYPES } from "@babel/types";
import { agentStore } from "@/store/agent";
import { vipStore } from "@/store/vip";
import { useOpenUrl } from '@/plugins/openPage'

const BannerComponent = defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    Virtual,
    Autoplay,
    Pagination,
    Navigation,
  },
  setup(components, { emit }) {
    /**
     * 提取width属性
     * Extract width attribute
     */
    const { width } = useDisplay();
    const router = useRouter();
    const { dispatchUserActivityList } = promoStore();
    const { setAgentNavBarToggle } = agentStore();
    const { setVipNavBarToggle } = vipStore();
    const { openUrl } = useOpenUrl()
    /**
     * 初始化swiper
     * Initialize swiper
     */
    const swiper = ref<any>(null);
    const swiperShow = ref<boolean>(false);
    const { dispatchBannerList } = bannerStore();
    const state = reactive({
      /**
       * 初始化banner的值
       * Initialize the value of banner
       */
      slides: [] as Array<string>,
    });
    /**
     * 获取swiper的属性
     * Get the properties of swiper
     */
    const getSwiperRef = (swiperInstance: any) => {
      swiper.value = swiperInstance;
    };
    /**
     * swiper左侧点击事件
     * swiper interface click event
     */
    const goToPrev = () => {
      swiper.value.slidePrev();
    };
    /**
     * swiper右侧点击事件
     * swiper right click event
     */
    const goToNext = () => {
      swiper.value.slideNext();
    };
    /**
     * 获取屏幕的宽度
     * Get the width of the screen
     */
    const mobileWidth = computed(() => {
      return width.value;
    });
    /**
     * 计算appBar的状态
     * Calculate the state of appBar
     */
    const refferalAppBarShow = computed(() => {
      const { getRefferalAppBarShow } = storeToRefs(refferalStore());
      return getRefferalAppBarShow.value;
    });

    // get Token
    const token = computed(() => {
      const { getToken } = storeToRefs(authStore());
      return getToken.value;
    });
    
    const bannerList = computed(() => {
      const { getBannerList } = storeToRefs(bannerStore());
      return getBannerList.value
    })

    onMounted(async () => {
      await dispatchBannerList();
      swiperShow.value = true;
      state.slides.length = 0;
      bannerList.value.forEach((element) => {
        if (element.image_path) {
          state.slides.push(element.image_path);
        }
      });
    });

    // 提前手动关闭swiper，缓存组件时，就可以避免不动的问题
    onActivated(() => {
      console.log('onActivated=============');
      swiperShow.value = true;
    })
    onDeactivated(() => {
      console.log('onDeactivated=============');
      swiperShow.value = false;
    })

    // click_feedback枚举类型如下:
    // - 0 无响应
    // - 1 打开弹窗
    // - 2 打开客服
    // - 3 下载APP
    // - 4 打开客服列表
    // - 5 站内页面 此情况下需要关注content内容 具体定义见下文
    // - 6 站外链接
    // - 7 游戏分类 此情况下需要关注content内容, 为游戏分类字符串 比如bgaming
    // - 8 具体游戏 此情况下需要关注content内容, 为具体游戏id 比如 1234
    // - 9 打开活动广告页面 此情况下需要关注content内容, 为活动广告页面id 比如 1
    const slideImageClick = async (index: number) => {
      console.log("slideImageClick", index);
      const currentIndex = index % bannerList.value.length
      const currentItem = bannerList.value[currentIndex]
      let type: number =
        bannerList.value[currentIndex].click_feedback;
      console.log(type, 'type');

      // 5 站内页面 此情况下需要关注content内容
      if (type == 5) {
        const contentValue = currentItem.content;
        console.log(contentValue, 'contentValue');
        
        switch (contentValue) {
          case "invite_popup":
            setAgentNavBarToggle(true)
            break;
          case "vip":
            setVipNavBarToggle('1');
            break;
          default:
            // window.location.href = contentValue;
            openUrl(contentValue)
            break;
        }
      }

      // 站外链接 打开新页签
      if (type == 6) {
        if(!currentItem.content) return;
        // window.open(currentItem.content, '_blank')
        openUrl(currentItem.content, true)
      }

      //
      if (type == 7) {
        emit("handleBannerCategory", currentItem.content);
      }
      if (type == 8) {
        window.location.href = "game/" + currentItem.content;
      }
      if (type == 9) {
        console.log(currentIndex);
        router.push({
          name: "Promo_Detail",
          query: {
            id: parseInt(
              currentItem.content
            ),
          },
        });
      }
    };
    const calcSlide = () => {
      // let res = [...state.slides, ...state.slides];

      let res = [...state.slides];
      return res;
    };
    const handleSlideChange = (event: any) => {
      // let bullets = document.getElementsByClassName("swiper-pagination-bullet");

      // for (let i = 0; i < bullets.length; i++) {
      //   if (i == event.activeIndex % state.slides.length)
      //     bullets[event.activeIndex % state.slides.length].classList.add(
      //       "swiper-pagination-bullet-active"
      //     );
      //   else {
      //     bullets[i].classList.remove("swiper-pagination-bullet-active");
      //   }
      // }
    };
    
    return {
      ...toRefs(state),
      mobileWidth,
      modules: [Pagination, Virtual, Autoplay, Navigation],
      swiper,
      getSwiperRef,
      goToPrev,
      goToNext,
      slideImageClick,
      refferalAppBarShow,
      calcSlide,
      handleSlideChange,
      swiperShow
    };
  },
});
export default BannerComponent;
</script>
<template>
  <!-- 屏幕宽度大于600展示区域 -->
  <!-- Screen width is greater than 600 display area -->
  <div class="relative home-swiper" v-if="mobileWidth > 600">
    <swiper
      :modules="modules"
      :slidesPerView="3"
      :centeredSlides="true"
      :spaceBetween="16"
      :loop="true"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
      }"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
      :navigation="false"
      :virtual="true"
      class="mx-4"
      style="border-radius: 8px"
      @swiper="getSwiperRef"
    >
      <swiper-slide
        v-for="(slide, index) in slides"
        :key="index"
        :virtualIndex="index"
      >
        <img
          :src="slide"
          class="slider-img-width"
          :class="mobileWidth < 600 ? 'm-carousel-img-border' : ''"
        />
      </swiper-slide>
    </swiper>

    <div class="swiper-button-next" slot="button-next" @click="goToNext"></div>
    <div class="swiper-button-prev" slot="button-prev" @click="goToPrev"></div>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>

  <!-- 屏幕宽度小于600展示区域 -->
  <!-- Screen width is less than 600 display area -->
  <div
    class="relative m-home-swiper"
    :class="!refferalAppBarShow ? 'mt-2' : ''"
    v-else
  >
    <template v-if="swiperShow">
      <swiper
        :modules="modules"
        :slidesPerView="1"
        :spaceBetween="6"
        :centeredSlides="true"
        :loop="true"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
        }"
        :navigation="false"
        :virtual="true"
        class="mx-2"
        @swiper="getSwiperRef"
        @slideChange="handleSlideChange"
      >
        <swiper-slide
          v-for="(slide, index) in calcSlide()"
          :key="index"
          :virtualIndex="index"
        >
          <img
            :src="slide"
            class="m-slider-img-width"
            :class="mobileWidth < 600 ? 'm-carousel-img-border' : ''"
            @click="slideImageClick(index)"
          />
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination" slot="pagination"></div>
    </template>
  </div>
</template>

<style lang="scss">
.home-swiper {
  //height: 247px;

  .swiper-pagination-bullet-active {
    width: 18px !important;
    height: 6px !important;
    border-radius: 24px !important;
    background: var(--white-bg, #fff) !important;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #7782aa;
    border-radius: 6px;
    opacity: 1;
  }

  .swiper-pagination {
    bottom: -18px !important;
  }

  .swiper-button-next {
    position: absolute;
    width: 32px;
    height: 32px;
    background: black;
    border-radius: 4px;
    right: 3px;
    opacity: 0.7;
    z-index: 2;
  }

  .swiper-button-prev {
    width: 32px;
    height: 32px;
    background: black;
    border-radius: 4px;
    left: -0px;
    opacity: 0.7;
    z-index: 2;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-family: swiper-icons;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
    font-size: 14px;
    font-weight: 900;
    color: white;
  }
}

.m-home-swiper {
  height: fit-content !important;
  .swiper-pagination-bullet-active {
    width: 18px !important;
    height: 6px !important;
    border-radius: 24px !important;
    background: var(--white-bg, #fff) !important;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #7782aa;
    border-radius: 6px;
    opacity: 1;
    margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 2px) !important;
  }
  // .swiper-pagination-bullet:not(:nth-child(-n + 3)) {
    // display: none !important;
  // }
  .swiper-pagination {
    bottom: -12px !important;
  }

  .m-slider-img-width {
    height: fit-content !important;
  }
}
</style>
