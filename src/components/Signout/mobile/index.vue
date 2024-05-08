<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import router from "@/router";
import { authStore } from "@/store/auth";
import { useI18n } from "vue-i18n";
import { resetAllStores } from "@/store";
import { gameStore } from "@/store/game";
import { getQueryParams } from "@/utils/getPublicInformation";
import { useDisplay } from 'vuetify';
import LoadingBtn from "@/components/global/loadingBtn.vue"

const { name, width } = useDisplay();
const mobileWidth = computed(() => {
  return width.value
})

const props = defineProps({
  signoutDialog: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:signoutDialog", 'close']);

const signoutDialog = computed({
  get() {
    return props.signoutDialog;
  },
  set(val) {
    emit("update:signoutDialog", val);
  },
});

const { t } = useI18n();
const { dispatchSignout } = authStore();

const signoutContainerBackground = ref<string>("transparent");
const signoutContainerHeight = ref<number>(201);
const signoutContainerOverflow = ref<string>("hidden");
const loading = ref<boolean>(false)
const queryParams = getQueryParams()

const signOut = (): void => {
  loading.value = true
  dispatchSignout();
  resetAllStores();
  emit("close");
  router.push({ path: '/', query: queryParams })
  loading.value = false
  // setTimeout(() => {
  //   window.location.reload();
  // }, 300);
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
  <v-dialog
    v-model="signoutDialog"
    :width="mobileWidth < 600 ? 328 : 471"
    :scrim="true"
    @click:outside="$emit('close')"
  >
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
          <p class="text-700-16 white mt-3 m-header-10">{{ t("signout.text_1") }}</p>
        </div>
        <p class="m-signout-text">{{ t("signout.text_2") }}</p>
        <p class="m-signout-notice">{{ t("signout.text_3") }}</p>
        <div class="mt-8 text-center m-signout-box">
          <v-btn
            class="m-signout-btn button-bright"
            width="-webkit-fill-available"
            height="48px"
            @click="signOut"
          >
            <LoadingBtn v-if="loading"></LoadingBtn>
            <div v-else>
              {{ t("signout.button") }}
            </div>
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
  </v-dialog>
</template>

<style lang="scss" scoped>
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
      
      .m-header-10 {
        margin-right: 10px;
        margin-left: 10px;
      }
    }

    .m-signout-text {
      padding: 225px 35px 0 35px;
      color: white;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      line-height: 24px;
    }

    .m-signout-notice {
      margin: 24px 28px 0 28px;
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
    .m-signout-box {
      // position: absolute;
      // bottom: 20px;
      // left: 50%;
      // transform: translateX(-50%);
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
