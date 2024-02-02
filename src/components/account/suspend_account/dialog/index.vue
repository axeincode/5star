<script lang="ts" setup>
import { ref, computed, toRefs } from "vue";
import router from "@/router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from "element-plus";
import { useToast } from "vue-toastification";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
const { t } = useI18n();
const { width } = useDisplay();
const emit = defineEmits<{ (e: "suspendDialogHide"): void }>();
const props = defineProps<{ suspendDate: number }>();
const { suspendDate } = toRefs(props);
const { dispatchSuspendUser } = authStore();
const { dispatchSignout } = authStore();

const loading = ref<boolean>(false);
const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(
  new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
);
const notificationText = ref<string>("");

const success = computed(() => {
  const { getSuccess } = storeToRefs(authStore());
  return getSuccess.value;
});

const errMessage = computed((): string => {
  const { getErrMessage } = storeToRefs(authStore());
  return getErrMessage.value;
});

const submitSuspend = async () => {
  loading.value = true;
  await dispatchSuspendUser({
    time: suspendDate.value,
  });
  if (success.value) {
    emit("suspendDialogHide");
    dispatchSignout();
    router.push({ name: "Dashboard" });
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
  <div class="suspend-dialog-container">
    <v-row class="mx-10 mt-6 text-700-16 text-gray">
      {{ t("account.suspend_account.dialog.title_text") }}
    </v-row>
    <v-row class="mx-10 mt-10 text-700-16 text-gray">
      <p>
        {{ t("account.suspend_account.dialog.content_text_1") }}
        <font color="#FFFFFF">
          {{ suspendDate }}
          {{ t("account.suspend_account.dialog.content_text_2") }}
        </font>
      </p>
    </v-row>
    <v-row class="mx-10 mt-10 text-700-14 justify-end">
      <div class="suspend-confirm-btn">
        <v-btn
          class="button-bright text-none"
          width="-webkit-fill-available"
          height="40px"
          @click="submitSuspend"
          :loading="loading"
        >
          {{ t("account.suspend_account.dialog.determine_btn_text") }}
        </v-btn>
      </div>
      <div class="suspend-cancel-btn ml-2">
        <v-btn
          class="button-bright text-none"
          width="-webkit-fill-available"
          height="40px"
          @click="emit('suspendDialogHide')"
        >
          {{ t("account.suspend_account.dialog.cancel_btn_text") }}
        </v-btn>
      </div>
    </v-row>
    <!-- <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" /> -->
  </div>
</template>

<style lang="scss">
// account dialog container
.suspend-dialog-container {
  background-color: #15161C;
  border-radius: 16px !important;
  height: 220px;
}

.suspend-confirm-btn {
  // button
  button {
    border-radius: 26px !important;

    .v-btn__content {
      font-weight: 700;
      font-size: 14px;
    }
  }
}

.suspend-cancel-btn {
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
  font-family: Inter;
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
