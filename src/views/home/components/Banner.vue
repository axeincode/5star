<script lang="ts">
import { defineComponent, ref, toRefs, reactive, computed, watch, onMounted, defineEmits } from "vue";
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
const BannerComponent = defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    Virtual,
    Autoplay,
    Pagination,
    Navigation,
  },
  setup(components, {emit}) {
    /**
     * 提取width属性
     * Extract width attribute
     */
    const { width } = useDisplay();
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
      slides: [
        new URL("@/assets/home/image/img_hp_01.png", import.meta.url).href,
        new URL("@/assets/home/image/img_hp_02.png", import.meta.url).href,
        new URL("@/assets/home/image/img_hp_03.png", import.meta.url).href,
      ]
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

    onMounted(async ()=>{
      await dispatchBannerList();
      
      const { getBannerList } = storeToRefs(bannerStore());
      state.slides.length = 0;
      getBannerList.value.forEach(element => {
        state.slides.push(new URL(element.image_path, import.meta.url).href);
      });
    })
    const slideImageClick = (index:number) => {
      const { getBannerList } = storeToRefs(bannerStore());
      let type : number = getBannerList.value[index].click_feedback;
      if(type == 5){
        window.location.href = getBannerList.value[index].content;
      }
      if(type == 6){
        window.location.href = getBannerList.value[index].content;
      }
      if(type == 7){
        emit('handleBannerCategory', getBannerList.value[index].content);
      }
      if(type == 8){
        window.location.href = "game/" + getBannerList.value[index].content;
      }

    }
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
      style="border-radius: 8px; height: 195px"
      @swiper="getSwiperRef"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index" :virtualIndex="index">
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
  // height: 247px;

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
  height: 208px;

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

  .swiper-pagination {
    bottom: -12px !important;
  }
}
</style>
