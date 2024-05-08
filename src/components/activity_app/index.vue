<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
import { useDisplay } from "vuetify";
import { storeToRefs } from 'pinia';
import { activityAppStore } from '@/store/activityApp';
const { setAppConfirmDialogShow, setShowAppGuidance, setAppGuidance, setOpenAppGuidance, automaticPopUpApp } = activityAppStore();
import { toFormatNum } from '@/utils/numFormat';
import { mailStore } from "@/store/mail";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRoute } from 'vue-router';
const route = useRoute();

// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const { name, width } = useDisplay();
const mobileWidth = computed(() => {
  return width.value;
});

const appConfirmDialogShow = computed(() => {
  const { getAppConfirmDialogShow } = storeToRefs(activityAppStore());
  return getAppConfirmDialogShow.value
})

const downloadLink = computed(() => {
  const { getDownloadLink } = storeToRefs(activityAppStore());
  return getDownloadLink.value;
});

// 安装 APP
const installAPP = () => {
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = downloadLink.value
  tempLink.setAttribute('download', '')
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
}

// 获取活动奖金
const activityAppBonus = computed(() => {
  const { getActivityBonus } = storeToRefs(activityAppStore());
  return getActivityBonus.value;
});

// 获取模式
const mobile = computed(() => {
  const { getMobile } = storeToRefs(activityAppStore());
  return getMobile.value;
});

const showAppGuidance = computed(() => {
  const { getShowAppGuidance } = storeToRefs(activityAppStore());
  return getShowAppGuidance.value;
});

watch(showAppGuidance, (value) => {
  if (value) {
    // 打开关闭定时器
    setAppGuidance(false)
    // 关闭打开引导定时器
    setOpenAppGuidance(true)
  } else {
    setOpenAppGuidance(false)
  }
})
// 判断下载页面是否打开状态，如果打开关闭引导框的显示，关闭时打开引导框的显示
watch(appConfirmDialogShow, (value) => {
  if (value) {
    setOpenAppGuidance(true)
  } else {
    setOpenAppGuidance(false)
  }
})

// 判断是否打开弹框
const mailMenuShow = computed(() => {
  const { getMailMenuShow } = storeToRefs(mailStore());
  return getMailMenuShow.value;
});

const isHomePage = ref(route.path === '/');
// 使用 watch 监听路由变化
// watch(() => route.path, (newPath) => {
//   isHomePage.value = newPath === '/';
//   if (newPath !== '/') {
//     automaticPopUpApp(true)
//   } else {
//     automaticPopUpApp(false, mailMenuShow.value)
//   }
// });

// 如果在首页，就打开监听
// if (isHomePage.value) {
//   automaticPopUpApp(false, mailMenuShow.value)
// } else {
//   automaticPopUpApp(true)
// }

// 初始化执行一次
setOpenAppGuidance(false)

const frequency = ref(0) // 监听控制引导弹框打开
// 关闭app弹框执行
const closeApp = () => {
  setAppConfirmDialogShow(false)
 
  if (frequency.value === 0) {
    setTimeout(() => {
      setShowAppGuidance(true)
    }, 3000);
    frequency.value++
  }
}

</script>

<template>
<transition
  enter-active-class="animated hinge fadeInUp"
  leave-active-class="animated hinge fadeOutDown"
>
  <div class="m-app slideInDown" v-if="appConfirmDialogShow && mobileWidth < 600 && mobile">
    <v-btn
      class="m-app-confirm-drawer-close-button"
      icon="true"
      width="24"
      height="24"
      @click="closeApp"
    >
      <inline-svg :src="icon_public_10" width="20" height="20"></inline-svg>
    </v-btn>

    <div>
      <p class="m-app-illustrate">{{ t('activity_app.text_2') }}</p>
      <p class="m-app-bonus">{{ platformCurrency }} {{ toFormatNum(activityAppBonus) }}</p>
      <p class="m-app-illustrate2">{{ t('activity_app.text_4') }}</p>
      <p class="m-app-illustrate2">{{ t('activity_app.text_5') }} <span>{{ t('activity_app.text_6') }}</span></p>

      <v-btn
        width="298"
        height="40"
        class="m-app-btn"
        @click="installAPP"
      >
        {{ t('activity_app.text_8') }}
      </v-btn>
    </div>
  </div>
</transition>
</template>

<style scoped lang="scss">
.m-app {
  width: 100%;
  // height: 188px;
  position: fixed;
  bottom: 0;
  z-index: 1000000;
  background-color: #0000008a;
  backdrop-filter: blur(5px); /* 添加模糊效果，可以调整模糊半径 */
  -webkit-backdrop-filter: blur(5px); /* 兼容WebKit浏览器 */
  background-image: url(@/assets/activity_app/activity-bg.svg);
  background-size: cover;
  padding: 16px 8px 24px 24px;

  .m-app-confirm-drawer-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 8px;
    right: 8px;
    z-index: 100000;
  }

  .m-app-illustrate {
    font-weight: 900;
    font-size: 12px;
    line-height: 14.52px;
    max-width: 240px;
    color: #FFFFFF
  }

  .m-app-bonus {
    font-size: 20px;
    font-weight: 900;
    color: #F9BC01;
  }

  .m-app-illustrate2 {
    font-size: 10px;
    font-weight: 700;
    color: #FFFFFF;

    span {
      color: #F9BC01;
    }
  }

  .m-app-btn {
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    background-color: rgba(0, 155, 58, 1);
    display: block;
    margin: 12px auto 0;
  }

}
</style>