<script lang="ts" setup>
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import QrcodeVue from 'qrcode.vue'
const { width } = useDisplay();
import { storeToRefs } from 'pinia';
import { activityAppStore } from '@/store/activityApp';
const mobileWidth = computed(() => {
  return width.value;
});
const { downloadAppAcquisition } = activityAppStore()
await downloadAppAcquisition()

const downloadLink = computed(() => {
  const { getDownloadLink } = storeToRefs(activityAppStore());
  return getDownloadLink.value;
});
const downLoadApp = () => {
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
};

const domainUrl = window.location.href
</script>

<template>
  <div class="screen">
    <template v-if="mobileWidth < 1000">
    <div class="screen-tips">
      <img class="screen-img" src="@/assets/common/screen-phone.jpg" />
      <span class="tips-text">Rotate phone screen</span>
    </div>
    <div class="down-btn" @click="downLoadApp"></div>
  </template>
  <template v-else>
    <div class="pc-screen-tips">
      <img src="@/assets/common/logo_public_1.png" class="screen-logo" alt="">
      <p class="screen-adv">{{ t('screen.text_1') }}</p>
      <div class="screen-dow">
        <div class="dow-app" @click="downLoadApp">
          <img src="@/assets/common/Group.png" alt="">
          <p>{{ t('screen.text_2') }}</p>
        </div>
        <p class="separate">OR</p>
        <div class="qr-code">
          <div class="invite-qr-code-body text-center">
            <QrcodeVue :value="domainUrl" :size="150" style="margin: 8px" />
          </div>
          <p>{{ t('screen.text_3') }}</p>
        </div>
      </div>
    </div>
  </template>
  </div>
</template>

<style lang="scss">
.screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000000009;
//   background: url("@/assets/common/screen.jpg");
//   background-size: cover;
  background: #000;
  padding: 50px;
  .screen-tips {
    display: flex;
    flex-direction: column;
    align-items: center;
    .screen-img {
      width: 48px;
      height: 48px;
    }
    .tips-text {
      color: #7782aa;
      font-size: 12px;
      margin-top: 16px;
    }
  }
  .down-btn {
    width: 310px;
    height: 76px;
    background: url("@/assets/common/downLoad.jpg");
    background-size: cover;
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translate(-50%,0);
  }

  .pc-screen-tips {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .screen-logo {
      width: 300px;
      height: 72px;
      display: inline-block;
      margin-bottom: 24px;
    }

    .screen-adv {
      font-family: Inter;
      font-size: 24px;
      font-weight: 700;
      line-height: 29.05px;
      text-align: center;
      color: #ffffff;
      margin-bottom: 60px;
    }

    .screen-dow {
      width: 630px;
      display: flex;
      justify-content: space-around;
      align-items: center;


      .dow-app {
        font-family: Inter;
        font-size: 14px;
        font-weight: 700;
        line-height: 16.94px;
        text-align: center;
        color: rgba(249, 188, 1, 1);
        width: 168px;

        img {
          width: 100%;
          margin-bottom: 68px
        }
      }

      .separate {
        font-family: Inter;
        font-size: 32px;
        font-weight: 700;
        line-height: 38.73px;
        text-align: center;
        color: rgba(255, 255, 255, 1);
      }

      .qr-code {
        font-family: Inter;
        font-size: 14px;
        font-weight: 700;
        line-height: 16.94px;
        text-align: center;
        color: rgba(249, 188, 1, 1);
        width: 230px;

        .invite-qr-code-body {
          width: 166px;
          height: 166px;
          background: #ffffff;
          margin: auto;
          margin-bottom: 20px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
