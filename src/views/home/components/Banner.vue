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
    /**
     * 初始化swiper
     * Initialize swiper
     */
    const swiper = ref<any>(null);
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

    onMounted(async () => {
      await dispatchBannerList();

      const { getBannerList } = storeToRefs(bannerStore());
      state.slides.length = 0;
      getBannerList.value.forEach((element) => {
        state.slides.push(element.image_path);
      });
    });
    const slideImageClick = async (index: number) => {
      const { getBannerList } = storeToRefs(bannerStore());
      let type: number = getBannerList.value[index].click_feedback;
      console.log(type);
      if (type == 5) {
        //window.location.href = getBannerList.value[index].content;.
        const relocation_url = getBannerList.value[index].content;
        const url_parts = relocation_url.split("?");
        console.log(url_parts);
        if (url_parts.length > 1) {
          if (url_parts[0] == "/promo/detail") {
            await dispatchUserActivityList();
            const num = url_parts[1].split("=");
            router.push({ name: "Promo_Detail", query: { id: parseInt(num[1]) } });
          }
        } else {
          window.location.href = getBannerList.value[index].content;
        }
      }
      if (type == 6) {
        window.location.href = getBannerList.value[index].content;
      }
      if (type == 7) {
        emit("handleBannerCategory", getBannerList.value[index].content);
      }
      if (type == 8) {
        window.location.href = "game/" + getBannerList.value[index].content;
      }
    };
    const calcSlide = () => {
      let res = [...state.slides, ...state.slides];
      //let res = [...state.slides];
      return res;
    };
    const handleSlideChange = (event: any) => {
      let bullets = document.getElementsByClassName("swiper-pagination-bullet");

      for (let i = 0; i < bullets.length; i++) {
        if (i == event.activeIndex % state.slides.length)
          bullets[event.activeIndex % state.slides.length].classList.add(
            "swiper-pagination-bullet-active"
          );
        else {
          bullets[i].classList.remove("swiper-pagination-bullet-active");
        }
      }
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
      <swiper-slide v-for="(slide, index) in slides" :key="index" :virtualIndex="index">
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
  <div class="relative m-home-swiper" :class="!refferalAppBarShow ? 'mt-2' : ''" v-else>
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
      style="border-radius: 8px"
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
  .swiper-pagination-bullet:not(:nth-child(-n + 3)) {
    display: none !important;
  }
  .swiper-pagination {
    bottom: -12px !important;
  }

  .m-slider-img-width {
    height: fit-content !important;
  }
}
</style>
