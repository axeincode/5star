<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { refferalStore } from "@/store/refferal";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from "element-plus";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import { useToast } from "vue-toastification";
import * as clipboard from "clipboard-polyfill";

const { t } = useI18n();
const { width } = useDisplay();
const { setRefferalDialogShow } = refferalStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { dispatchUserInvite } = inviteStore();

const invitedUser = ref<number>(28560);
const earnMoney = ref<number>(85601479);
const host = ref<string>("xxx.com");
const refferalCode = ref<string>("xxxxxxxxxx");
const siteUrl = ref<string>("https://Brazstar.com/xxxxxxxxxx");
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

const closeReferDialog = () => {
  setRefferalDialogShow(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
};

onMounted(async () => {
  setTimeout(() => {
    refferalContainerHeight.value = 594;
  }, 800);
  setTimeout(() => {
    refferalContainerBackground.value = "#1D2027";
  }, 400);
  await dispatchUserInvite();
});
</script>

<template>
  <div class="m-refferal-container">
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
          <img src="@/assets/public/image/bg_public_02_01.png" class="full-width" />
        </div>
        <div class="mt-4 mx-6 white text-400-14">
          {{ t("refferal.description.text_1") }}
        </div>
        <div class="mt-3 mx-6 text-gray text-500-10 text-justify">
          {{ t("refferal.description.text_2") }}
        </div>
        <div class="mt-4 mx-6">
          <v-card
            height="292"
            theme="dark"
            color="#15161C"
            class="overflow-y-auto description-card"
            style="scroll-padding: 20px"
          >
            <div class="mx-4 mt-4 text-600-14 text-gray">
              {{ t("refferal.description.term_text") }}
            </div>
            <p class="ml-4 mr-2 mt-3 text-400-10 text-gray text-justify">
              {{ t("refferal.description.text_3") }}
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
          <img
            src="@/assets/public/image/img_public_08.png"
            class="m-refferal-header-img"
          />
          <div class="mt-2 mx-10 text-center text-700-14 yellow">
            {{ t("refferal.dialog.header.title_text") }}
          </div>
          <div class="mt-2 text-center text-700-18 white">
            {{ t("refferal.dialog.header.body_text") }}
          </div>
          <div
            class="mx-7 mt-2 text-center text-400-12 white text-justify"
            style="letter-spacing: normal"
          >
            <Font color="#F9BC01">{{ invitedUser.toLocaleString() }}</Font>
            {{ t("refferal.dialog.header.body_text_1") }}
            <Font color="#F9BC01">{{ earnMoney.toLocaleString() }}</Font>
            {{ t("refferal.dialog.header.body_text_2") }}
            <Font color="#F9BC01">{{ host }}</Font>
            {{ t("refferal.dialog.header.body_text_3") }}
          </div>
          <div
            class="mt-3 text-center text-500-12 color-31E598 boder-bottom-31E598"
            @click="showDescriptionDialog"
          >
            {{ t("refferal.dialog.header.body_text_4") }}
          </div>
          <v-btn
            class="m-close-button"
            icon="true"
            @click="closeReferDialog"
            width="30"
            height="30"
          >
            <img src="@/assets/public/svg/icon_public_10.svg" />
          </v-btn>
        </div>
        <div class="refferal-dialog-body">
          <div class="text-center mt-6 text-700-18 white">
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
          <div class="text-center mt-6 mx-6">
            <v-card theme="dark" color="#15161C" height="40">
              <div class="text-400-14 text-gray mt-2">
                {{ inviteItem.web_invite_url }}
              </div>
            </v-card>
          </div>
          <div class="text-center mt-8 mx-6">
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
  height: 594px;
  overflow-y: auto;

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
    height: 333px;
    animation-name: scaling;
    animation-duration: 0.4s;
    animation-timing-function: linear;
    animation-iteration-count: 1;

    .m-refferal-header-img {
      margin-top: -10px;
      width: 212px;
    }
  }

  .refferal-dialog-header {
    background: linear-gradient(180deg, #5ead1f 0%, #1b5a65 100%);
    border-radius: 16px;
    height: 333px;

    .m-refferal-header-img {
      margin-top: -10px;
      width: 212px;
    }
  }

  // close modal button
  .m-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 10px;
    right: 15px;

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
