<script lang="ts" setup>
import { ref, computed, toRefs } from "vue";
import router from "@/router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from "element-plus";
import { useToast } from "vue-toastification";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
const { t } = useI18n();
const { width } = useDisplay();
const emit = defineEmits<{ (e: "bonusDialogHide"): void }>();

const loading = ref<boolean>(false);
const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(
  new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
);
const notificationText = ref<string>("");

const success = computed(() => {
  const { getSuccess } = storeToRefs(bonusStore());
  return getSuccess.value;
});

const errMessage = computed((): string => {
  const { getErrMessage } = storeToRefs(bonusStore());
  return getErrMessage.value;
});

const submitCancel = async () => {
  loading.value = true;
  if (success.value) {
    emit("bonusDialogHide");
  } else {
    notificationShow.value = !notificationShow.value;

    checkIcon.value = new URL(
      "@/assets/public/svg/icon_public_17.svg",
      import.meta.url
    ).href;
    notificationText.value = errMessage.value;
    if (notificationShow.value) {
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
        icon: WarningIcon,
        rtl: false,
      });
    }
    loading.value = false;
  }
};
</script>

<template>
  <div class="bonus-dialog-container">
    <v-row class="mx-10 mt-6 text-700-16 text-gray">
      {{ t("bonus.dialog.title_text") }}
    </v-row>
    <v-row class="mx-10 mt-10 text-700-16 text-gray">
      <p>
        {{ t("bonus.dialog.content_text_1") }}
      </p>
    </v-row>
    <v-row class="mx-10 mt-10 text-700-14 justify-end">
      <div class="bonus-confirm-btn">
        <v-btn
          class="button-bright text-none"
          width="-webkit-fill-available"
          height="40px"
          @click="submitCancel"
          :loading="loading"
        >
          {{ t("bonus.dialog.determine_btn_text") }}
        </v-btn>
      </div>
      <div class="bonus-cancel-btn ml-2">
        <v-btn
          class="button-bright text-none"
          width="-webkit-fill-available"
          height="40px"
          @click="emit('bonusDialogHide')"
        >
          {{ t("bonus.dialog.cancel_btn_text") }}
        </v-btn>
      </div>
    </v-row>
  </div>
</template>

<style lang="scss">
// bonus dialog container
.bonus-dialog-container {
  background-color: #15161C;
  border-radius: 16px !important;
  height: 220px;
}

.bonus-confirm-btn {
  // button
  button {
    border-radius: 26px !important;

    .v-btn__content {
      font-weight: 700;
      font-size: 14px;
    }
  }
}

.bonus-cancel-btn {
  // button
  button {
    background: #23262F !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    border-radius: 26px;

    .v-btn__content {
      font-weight: 700;
      font-size: 14px;
      color: #ffffff;
    }
  }
}

.Vue-Toastification__container {
  right: 0 !important;
  left: unset !important;
  width: 290px !important;
  margin-right: 37px;
  height: 60px !important;
  //flex-direction: unset!important;
}
.Vue-Toastification__toast {
  align-items: center !important;
  z-index: 1000000000 !important;
  top: 70px;
  right: -20px !important;
  width: 320px !important;
  height: 60px;
  border: none;
  border-radius: 16px 0px 0px 16px;
  background: var(--bg-2, #181522);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.Vue-Toastification__toast-body {
  color: var(--sec-text, #7782aa);
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
}

.Vue-Toastification__close-button {
  top: 22px !important;
  background-image: url("@/assets/public/svg/icon_public_52.svg");
  background-repeat: no-repeat;
  background-size: 18px;
  color: transparent;
  opacity: 1;
}
</style>
