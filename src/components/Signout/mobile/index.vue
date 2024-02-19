<script lang="ts" setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import { authStore } from "@/store/auth";
import { useI18n } from "vue-i18n";
import { resetAllStores } from "@/store";
import { gameStore } from "@/store/game";
const emit = defineEmits<{
  (e: "close"): void;
}>();
const { t } = useI18n();
const { dispatchSignout } = authStore();

const signoutContainerBackground = ref<string>("transparent");
const signoutContainerHeight = ref<number>(201);
const signoutContainerOverflow = ref<string>("hidden");

const signOut = (): void => {
  emit("close");
  dispatchSignout();
  resetAllStores();
  router.push({ name: "Dashboard" });
  window.location.reload();
};

onMounted(() => {
  setTimeout(() => {
    signoutContainerHeight.value = 465;
    signoutContainerOverflow.value = "unset";
  }, 600);
  setTimeout(() => {
    signoutContainerBackground.value = "#2E274C";
  }, 300);
});
</script>

<template>
  <div class="m-signout-container">
    <div
      class="m-signout-animation-container"
      :style="{
        height: signoutContainerHeight + 'px',
        background: signoutContainerBackground,
        overflow: signoutContainerOverflow,
      }"
    >
      <div class="m-header">
        <img src="@/assets/public/image/img_public_03.png" class="m-logout-logo" />
        <p class="text-700-16 white mt-3 mx-10">{{ t("signout.text_1") }}</p>
      </div>
      <p class="m-signout-text">{{ t("signout.text_2") }}</p>
      <p class="m-signout-notice">{{ t("signout.text_3") }}</p>
      <div class="mt-8 text-center">
        <v-btn
          class="m-signout-btn button-bright"
          width="-webkit-fill-available"
          height="48px"
          @click="signOut"
        >
          {{ t("signout.button") }}
        </v-btn>
      </div>
      <v-btn
        class="close-button"
        icon="true"
        @click="$emit('close')"
        width="30"
        height="30"
      >
        <img src="@/assets/public/svg/icon_public_10.svg" />
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
@keyframes scaling {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes signoutHeightFrame {
  0% {
    height: 201px;
  }

  80% {
    height: 515px;
  }

  100% {
    height: 465px;
  }
}

// container
.m-signout-container {
  border-radius: 20px 20px 16px 16px;
  width: 328px;
  height: 465px;

  .m-signout-animation-container {
    border-radius: 20px 20px 8px 8px;
    background: #1d2027 !important;
    width: 328px;
    height: 201px;
    animation-name: signoutHeightFrame;
    animation-duration: 0.3s;
    animation-delay: 0.3s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    overflow: hidden;

    .m-header {
      position: absolute;
      top: 0px;
      border-radius: 8px;
      background: #23262F;
      text-align: center;
      height: 201px;
      animation-name: scaling;
      animation-duration: 0.3s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.21);

      .m-logout-logo {
        margin-top: -21px;
        width: 195px;
      }

      .logo-text {
        color: white;
        font-size: 20px;
        font-weight: 700;
        padding: 12px 80px 28px 80px;
        margin: 0;
      }
    }

    .m-signout-text {
      padding: 225px 65px 0 65px;
      color: white;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
    }

    .m-signout-notice {
      margin: 30px 28px 0 28px;
      color: white;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
    }

    .m-signout-btn {
      width: 280px !important;

      .v-btn__content {
        text-align: center;
        font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        letter-spacing: normal;
      }
    }

    // close modal button
    .close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute !important;
      top: 8px;
      right: 8px;
    }

    .v-field--variant-solo {
      background: transparent !important;
    }
  }
}
</style>
