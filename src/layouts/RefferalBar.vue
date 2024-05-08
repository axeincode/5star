<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { appBarStore } from "@/store/appBar";
import { refferalStore } from "@/store/refferal";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { authStore } from "@/store/auth";
import { activityAppStore } from '@/store/activityApp';
const { setAppConfirmDialogShow, downloadAppAcquisition,userDownloadAppAcquisition, runningSystem, automaticPopUpApp } = activityAppStore();
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

import { toFormatNum } from '@/utils/numFormat';

const { t } = useI18n();
const { width } = useDisplay();
const { setRefferalAppBarShow } = refferalStore();
const { setRefferalDialogShow } = refferalStore();
const { setOverlayScrimShow } = appBarStore();

const invertedScroll = ref<boolean>(true);
const elevateOnScroll = ref<boolean>(true);

const mobileWidth = computed((): number => {
  return width.value;
});

const headerBlurEffectShow = computed(() => {
  const { getHeaderBlurEffectShow } = storeToRefs(appBarStore());
  return getHeaderBlurEffectShow.value;
});

const activityAppBonus = computed(() => {
  const { getActivityBonus } = storeToRefs(activityAppStore());
  return getActivityBonus.value;
});

const userInfo = computed(() => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
});

const openRefferalDialogShow = () => {
  setOverlayScrimShow(false);
  setRefferalDialogShow(true);
};


const downloadAppEvent = () => {
  setAppConfirmDialogShow(true)
  // automaticPopUpApp(true)
}

// 获取模式
const mobile = computed(() => {
  const { getMobile } = storeToRefs(activityAppStore());
  return getMobile.value;
});

onMounted(() => {
  // 获取当前运行的是否浏览器
  runningSystem()
  if(userInfo.value.id){
    // 获取登录之后下载app活动的数据
    userDownloadAppAcquisition()
  }else{
    // 未登录时下载app活动的数据
    downloadAppAcquisition()
  }
})

</script>

<template>
  <v-app-bar
    id="refferalBar"
    app
    class="refferal-app-bar-background justify-center"
    :class="headerBlurEffectShow ? 'header-bg-blur' : ''"
    density="compact"
    :inverted-scroll="invertedScroll"
    :elevate-on-scroll="elevateOnScroll"
    v-if="mobile"
    @click="downloadAppEvent"
  >
    <v-toolbar-title class="d-flex align-center justify-center">
      <p class="white" :class="mobileWidth < 600 ? 'text-500-10 wrap' : 'text-700-16'">
        {{ t('activity_app.text_7') }} {{ platformCurrency }}{{ toFormatNum(activityAppBonus) }}
      </p>
      <img
        src="@/assets/public/image/img_public_09.png"
        class="ml-3"
        :width="mobileWidth > 600 ? 50 : 33"
      />
      <v-btn
        rounded
        :height="mobileWidth < 600 ? '24px' : '28px'"
        class="text-none ml-3 earn-btn-bg "
        style=""
        @click="downloadAppEvent"
      >
      GANAR
      </v-btn>
    </v-toolbar-title>
    <v-btn
      icon
      density="compact"
      :height="mobileWidth < 600 ? '20px' : '28px'"
      :width="mobileWidth < 600 ? '20px' : '28px'"
    >
      <v-icon
        color="#FFFFFF"
        style="font-size: 20px"
        @click="setRefferalAppBarShow(false)"
        >mdi-close</v-icon
      >
    </v-btn>
  </v-app-bar>
</template>

<!-- <style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .refferal-app-bar-background {
    .v-toolbar__content {
      height: 32px !important;
    }

  }
}
</style> -->

<style lang="scss">
.refferal-app-bar-background {
  background: url(@/assets/activity_app/activity-app-header.png) !important;

  .v-toolbar__content {
    height: $refferalBarHeight;
  }

  @media (max-width: 600px) {
    .v-toolbar__content {
      height: $refferalBarHeight !important;
    }
    .wrap {
      min-width: 180px;
      white-space: pre-wrap;
      word-break: keep-all;
      // word-warp: break-word;
      text-align: center;
      line-height: 13px;
      font-size: 11px;
      max-width: 55vw;
    }
  }

  .v-toolbar__content > .v-toolbar-title {
    margin-inline-start: 0px !important;
  }

  .v-toolbar-title__placeholder {
    display: flex !important;
    align-items: center;
  }

  .earn-btn-bg {
    background: #F9BC01 !important;
    border-radius: 4px;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;

    .v-btn__content {
      font-weight: 700;
      font-size: 16px;
      color: #000000;
    }

    @media (max-width: 600px) {
      .v-btn__content {
        // font-size: 12px;
        font-size: 13px;
        font-weight: 800;
      }
    }
  }
}

.header-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  // filter: saturate(180%) blur(3px);
  // -webkit-filter: saturate(180%) blur(3px);
}
</style>
