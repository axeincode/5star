<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { vipStore } from "@/store/vip";
import { gameStore } from "@/store/game";
import AdjustClass from "@/utils/adjust";
import usePageLoading from "@/hooks/pageLoading"
import bgImg from "@/assets/vip/image/group_select.png"

const props = defineProps({
  modelValue: {
    type: Boolean
  }
});

const emit = defineEmits(["update:modelValue", "dialogHandle"]);

const { pageLoading, setPageLoading, Loading } = usePageLoading()
setPageLoading(true)
const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});
const { t } = useI18n();
// member information  会员信息
const vipInfo = computed(() => {
  const { getVipInfo } = storeToRefs(vipStore());
  return getVipInfo.value;
});
// 获取国际化语言
const getLang = computed(() => {
  const { getLanguage } = storeToRefs(gameStore());
  return getLanguage.value;
});

const closeGroupDialog = () => {
  emit("update:modelValue", false);
};

// 获取app端对象
let appInstance = AdjustClass.getInstance();

// 加入telegram
const joinTelegram = () => {
  // window.location.href = `https://t.me/${vipInfo.value.telegram}`
  setTimeout(() => {
    console.log(appInstance);
    const url = 'https://t.me/HOY777Oficial'
    if (!appInstance.isMobileWebview) {
      // 浏览器端打开页面
      window.location.href = url;
    } else {
      // app端打开页面
      window["AndroidWebView"].openUrl(url);
    }
  }, 0);
};

//加入watsapp
const joinWatsapp = () => {
  setTimeout(() => {
    if (!appInstance.isMobileWebview) {
      // 浏览器端打开页面
      window.location.href = `https://whatsapp.com/channel/0029VaVcgRGAu3aVUq386c1H`;
    } else {
      // app端打开页面
      window["AndroidWebView"].openUrl(
        `https://whatsapp.com/channel/0029VaVcgRGAu3aVUq386c1H`
      );
    }
  }, 0);
};
const container = ref(null)
onMounted(() => {
  const image = new Image();
  image.onload = () => {
    container.value.style.backgroundImage = `url(${bgImg})`
    onImageLoad()
  }
  image.src = bgImg
})

const onImageLoad = () => {
  setPageLoading(false)
}
</script>

<template>
  <v-dialog v-model="modelValueNew" @click:outside="closeGroupDialog" style="z-index: 20000">
    <div class="group_dialog-container" v-show="pageLoading">
      <Loading height="100%"></Loading>
    </div>
    <div class="group_dialog-container" ref="container" v-show="!pageLoading">
      <!-- <img src="@/assets/vip/image/group_select.png" @load="onImageLoad" class="m-img" alt=""> -->
      <v-btn class="m-close-button" icon="true" @click="closeGroupDialog" width="30" height="30">
        <img src="@/assets/public/svg/icon_public_10.svg" />
      </v-btn>
      <!-- <img
        v-if="getLang=='en'"
        class="group-select-text-img"
        src="@/assets/vip/svg/group_select_en.svg"
      /> -->
      <!-- <img v-else class="group-select-text-img" src="@/assets/vip/svg/group_select_es.svg"> -->
      <div class="group-text text-900-24">{{ t("vip.vip_level_info.progress.text_19") }}</div>
      <div class="join-text">
        <font class="text-400-14 white">{{ t("vip.vip_level_info.progress.text_17") }}</font>
      </div>
      <div class="footer-btn">
        <div class="telegram-btn">
          <img src="@/assets/vip/svg/telegram_btn.svg" @click="joinTelegram" />
        </div>
        <div class="watsapp_btn-btn">
          <img src="@/assets/vip/svg/watsapp_btn.svg" @click="joinWatsapp" />
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<style lang="scss">
::deep .v-overlay__content {
  width:100%
}
.group_dialog-container {
  width: 100%;
  height: 650px;
  // height: 90vh;
  flex-shrink: 1;
  margin: auto;
  position: relative;
  // background: url("@/assets/vip/image/group_select.png") no-repeat;
  background: transparent;
  background-size: 100% 100%;
  padding: 24px;
  box-sizing: border-box;
  .m-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 8px;
    right: 8px;
    .v-icon {
      font-size: 24px;
    }
  }
  .group-select-text-img {
    position: absolute;
    bottom: 28%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .group-text {
    // text-shadow: -1px -1px 0 #F9BC01, 1px -1px 0 #F9BC01, -1px 1px 0 #F9BC01, 1px 1px 0 #F9BC01;
    // color: #fff5d2;
    color: #ffffff;
    text-shadow: 0px -1px 1px#F9BC01, 1px -1px 17px#F9BC01,
      -1px 1px 0px #F9BC01, 1px 1px 10px#F9BC01;
    line-height: 29px;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 28%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .join-text {
    line-height: 17px;
    width: 275px;
    text-align: center;
    position: absolute;
    left: 50%;
    // bottom: 143px;
    bottom: 20%;
    transform: translate(-50%, 0);
  }
  .footer-btn {
    width: calc(100% - 48px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: absolute;
    // bottom: 48px;
    bottom: 7%;
  }
  .telegram-btn,
  .watsapp_btn-btn {
    img {
      width: 100%;
    }
  }
  .telegram-btn {
    margin-right: 15px;
  }
  .watsapp_btn-btn {
    margin-left: 15px;
  }
  .m-img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
  }
}
</style>
