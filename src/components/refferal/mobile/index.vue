<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import { appBarStore } from "@/store/appBar";
import { refferalStore } from "@/store/refferal";
import { inviteStore } from "@/store/invite";
import { agentStore } from "@/store/agent";
import { mailStore } from "@/store/mail";
import { storeToRefs } from "pinia";
import QrcodeVue from "qrcode.vue";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from "element-plus";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import { useToast } from "vue-toastification";
import * as clipboard from "clipboard-polyfill";
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const router = useRouter();
const { t } = useI18n();
const { width } = useDisplay();
const { setRefferalDialogShow } = refferalStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { dispatchUserInvite } = inviteStore();
const { setAgentNavBarToggle } = agentStore();
const { setNavBarToggle } = appBarStore();
const { setMailMenuShow } = mailStore();

const invitedUser = ref<number>(28560);
const earnMoney = ref<number>(85601479);
const host = ref<string>("HOY777.com");
const refferalCode = ref<string>("xxxxxxxxxx");
const siteUrl = ref<string>("https://HOY777.com/xxxxxxxxxx");
const refferalContainerHeight = ref<number>(333);
const refferalContainerBackground = ref<string>("transparent");
const animationEffect = ref<boolean>(true);

const descriptionVisible = ref<boolean>(false);

const notificationShow = ref<boolean>(false);

const checkIcon = ref<any>(
  new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
);

const notificationText = ref<string>(t("refferal.copy_success_text"));

const copyToClipboard = (copy_text: string) => {
  clipboard.writeText(copy_text).then(
    () => {
      console.log("Copied to clipboard!");
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 3000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: SuccessIcon,
        rtl: false,
      });
    },
    (error) => {
      console.error("Could not copy text: ", error);
    }
  );
  // navigator.clipboard.writeText(siteUrl.value).then(
  //   () => {
  //     console.log("Copied to clipboard!");
  //     const toast = useToast();
  //     toast.success(notificationText.value, {
  //       timeout: 3000,
  //       closeOnClick: false,
  //       pauseOnFocusLoss: false,
  //       pauseOnHover: false,
  //       draggable: false,
  //       showCloseButtonOnHover: false,
  //       hideProgressBar: true,
  //       closeButton: "button",
  //       icon: SuccessIcon,
  //       rtl: false,
  //     });
  //     notificationShow.value = !notificationShow.value;
  //     // setRefferalDialogShow(false);
  //   },
  //   (error) => {
  //     console.error("Could not copy text: ", error);
  //   }
  // );
};

const inviteItem = computed(() => {
  const { getInviteItem } = storeToRefs(inviteStore());
  return getInviteItem.value;
});

const showMainDialog = () => {
  descriptionVisible.value = false;
  animationEffect.value = false;
};

const showDescriptionDialog = () => {
  descriptionVisible.value = true;
};

const handleTabJump = () => {
  closeReferDialog();
  setAgentNavBarToggle(true);
  setNavBarToggle(false);
  setTimeout(() => {
    setMailMenuShow(false);
    setMailMenuShow(true);
  }, 200);
};

const closeReferDialog = () => {
  setRefferalDialogShow(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
};

onMounted(async () => {
  setTimeout(() => {
    refferalContainerHeight.value = 554;
  }, 800);
  setTimeout(() => {
    refferalContainerBackground.value = "#1D2027";
  }, 400);
  await dispatchUserInvite();
});
</script>

<template>
  <div class="m-refferal-container">
    <v-btn
      class="m-close-button"
      icon="true"
      @click="closeReferDialog"
      width="30"
      height="30"
    >
      <img src="@/assets/public/svg/icon_public_10.svg" />
    </v-btn>
    <div class="refferal-header-tabs">
      <div class="tab-item text-700-10"> 
        {{ t("refferal.dialog.header.tabs_text1") }}
      </div>
      <div class="tab-item-jump" @click="handleTabJump">
        <span class="junm-text text-700-10 white"
          >{{ t("refferal.dialog.header.tabs_text2") }}</span
        >
        <img
          src="@/assets/public/svg/img-public-right.svg"
          class="jump-img full-width"
        />
      </div>
    </div>
    <div
      class="m-refferal-animation-container"
      :style="{
        height: refferalContainerHeight + 'px',
        background: refferalContainerBackground,
      }"
    >
      <template v-if="descriptionVisible">
        <div class="mt-5 text-center text-700-14 white">
          {{ t("refferal.dialog.header.body_text") }}
        </div>
        <div class="mt-3">
          <img
            src="@/assets/public/image/bg_public_02_01.png"
            class="full-width"
          />
        </div>
        <div class="mt-4 mx-6 white text-400-14">
          {{ t("refferal.description.text_1") }}
        </div>
        <div
          class="mt-3 mx-6 text-gray text-500-10"
          style="word-break: break-all"
        >
          {{ t("refferal.description.text_2", [platformCurrency]) }}
        </div>
        <div class="mt-4 mx-6">
          <v-card
            height="262"
            theme="dark"
            color="#15161C"
            class="overflow-y-auto description-card"
            style="scroll-padding: 20px"
          >
            <div class="mx-4 mt-4 text-600-14 text-gray">
              {{ t("refferal.description.term_text") }}
            </div>
            <p
              class="ml-4 mr-2 mt-3 text-400-10 text-gray"
              style="word-break: break-all"
            >
              {{ t("refferal.description.text_3", [platformCurrency]) }}
            </p>
          </v-card>
        </div>
        <div class="mt-6 mx-6">
          <v-btn
            class="button-dark m-reffer-btn-font text-none"
            width="-webkit-fill-available"
            height="46px"
            @click="showMainDialog"
          >
            {{ t("refferal.description.back_btn_text") }}
          </v-btn>
        </div>
      </template>
      <template v-else>
        <div
          class="refferal-dialog-header text-center"
          :class="
            animationEffect
              ? 'refferal-dialog-header-animation'
              : 'refferal-dialog-header'
          "
        >
          <div class="m-agent-referral-qrcode refferal-qrcode">
            <QrcodeVue
              :value="inviteItem.web_invite_url"
              :size=64
              style="margin: 6px"
            />
          </div>
          <!-- <img
            src="@/assets/public/image/img_public_08.png"
            class="m-refferal-header-img"
          /> -->
          <img
            class="m-refferal-header-img1"
            src="@/assets/public/image/img_public_6.png"
          />
          <img
            class="m-refferal-header-img2"
            src="@/assets/public/image/img_public_45.png"
          />
          <img
            class="m-refferal-header-img3"
            src="@/assets/public/image/img_public_45.png"
          />
          <img
            class="m-refferal-header-img4"
            src="@/assets/public/image/img_public_6.png"
          />
          <div class="mt-2 mx-10 text-center text-700-14 yellow">
            {{ t("refferal.dialog.header.title_text", [platformCurrency]) }}
          </div>
          <div class="mt-2 text-center text-700-18 white" style="line-height:17px">
            {{ t("refferal.dialog.header.body_text") }}
          </div>
          <div
            class="mx-7 mt-2 text-400-12 white"
            style="word-break: break-all;line-height:17px"
          >
            <Font color="#F9BC01">{{ invitedUser.toLocaleString() }}</Font>
            {{ t("refferal.dialog.header.body_text_1") }}
            <Font color="#F9BC01">{{ earnMoney.toLocaleString() }}</Font>
            {{ t("refferal.dialog.header.body_text_2", [platformCurrency]) }}
            <Font color="#F9BC01">{{ host }}</Font>
            {{ t("refferal.dialog.header.body_text_3") }}
          </div>
          <div
            class="
              mt-3
              text-center text-500-12
              color-31E598
              boder-bottom-31E598
            "
            @click="showDescriptionDialog"
          >
            {{ t("refferal.dialog.header.body_text_4") }}
          </div>
        </div>
        <div class="refferal-dialog-body">
          <div class="text-center mt-4 text-700-18 white">
            {{ t("refferal.dialog.body.text_1") }}
          </div>
          <div
            class="text-center mt-4 text-500-12 text-gray"
            @click="copyToClipboard(inviteItem.invite_code)"
          >
            {{ t("refferal.dialog.body.text_2") }}
            {{ inviteItem.invite_code }}
            {{ t("refferal.dialog.body.text_3") }}
          </div>
          <div class="text-center mt-4 mx-6">
            <v-card theme="dark" color="#15161C" height="40">
              <div class="text-400-14 text-gray mt-2">
                {{ inviteItem.web_invite_url }}
              </div>
            </v-card>
          </div>
          <div class="text-center mt-4 mx-6">
            <v-btn
              class="button-bright m-reffer-btn-font text-none"
              width="-webkit-fill-available"
              height="48px"
              @click="copyToClipboard(inviteItem.web_invite_url)"
            >
              {{ t("refferal.dialog.body.copy_btn_text") }}
            </v-btn>
          </div>
        </div>
      </template>
    </div>
    <!-- <Notification
      :notificationShow="notificationShow"
      :notificationText="notificationText"
      :checkIcon="checkIcon"
    /> -->
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

@keyframes heighting {
  0% {
    height: 333px;
  }

  80% {
    height: 650px;
  }

  100% {
    height: 594px;
  }
}

.m-refferal-container {
  border-radius: 16px;
  height: 634px;
  overflow-y: auto;
  margin-top: 16px;
  .refferal-header-tabs {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 288px;
    .tab-item {
      width: 105px;
      height: 44px;
      border-radius: 8px 8px 0 0;
      padding: 0 15px;
      background: #5ead1f;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      line-height: 12px;
    }
    .tab-item-jump {
      border-radius: 8px 8px 0 0;
      width: 188px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(29, 32, 39, 1);
      .junm-text {
        width: 115px;
        margin-left: 30px;
        line-height: 12px;
      }
      .jump-img {
        width: 18px;
        height: 18px;
        margin-left: 10px;
      }
    }
  }

  .m-refferal-animation-container {
    margin-left: auto;
    margin-right: auto;
    width: 328px;
    background: #15161c;
    border-radius: 16px;
    height: 333px;
    animation-name: heighting;
    animation-duration: 0.4s;
    animation-delay: 0.4s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    overflow: hidden;
    .v-card {
      border-radius: 8px;
      &.description-card {
        border-radius: 16px;
      }
    }
  }

  .refferal-dialog-header-animation {
    background: linear-gradient(180deg, #5ead1f 0%, #1b5a65 100%);
    border-radius: 16px;
    height: 340px;
    animation-name: scaling;
    animation-duration: 0.4s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    position: relative;
  }

  .refferal-dialog-header {
    background: linear-gradient(180deg, #5ead1f 0%, #1b5a65 100%);
    border-radius: 16px;
    height: 340px;
    position: relative;

    .m-refferal-header-img1 {
      margin-top: -10px;
      width: 85px;
      height: 67px;
      position: relative;
      top: 30px;
      left: 70px;
    }
    .m-refferal-header-img2 {
      margin-top: -10px;
      width: 117px;
      height: 50px;
      position: relative;
      top: 16px;
      left: 82px;
    }
    .m-refferal-header-img3 {
      margin-top: -10px;
      width: 117px;
      height: 50px;
      position: relative;
      top: 45px;
      left: -157px;
    }
    .m-refferal-header-img4 {
      margin-top: -10px;
      width: 212px;
      width: 85px;
      height: 67px;
      position: relative;
      top: -10px;
      left: 64px;
    }
  }
  .refferal-qrcode {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 9999;
  }
  // close modal button
  .m-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: -15px;
    right: 0;

    .v-icon {
      font-size: 24px;
    }
  }

  .boder-bottom-31E598 {
    color: #31e598;
    text-decoration: underline;
    text-underline-position: under;
    cursor: pointer;
  }

  .text-over-flow {
    /* Width of the container */
    white-space: nowrap;
    /* Prevents text from breaking into multiple lines */
    overflow: hidden;
    /* Hides any overflowing text */
    text-overflow: ellipsis;
    /* Adds ellipsis to truncate the text */
  }

  .m-reffer-btn-font {
    .v-btn__content {
      font-weight: 700;
      font-size: 14px;
    }
  }
}

.m-refferal-container::-webkit-scrollbar {
  width: 0px;
}
</style>
