<script lang="ts" setup>
import { ref, computed, toRefs } from "vue";
import router from "@/router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { bonusStore } from "@/store/bonus";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from "element-plus";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { useToast } from "vue-toastification";

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchBonusCancel } = bonusStore();
const { dispatchUserBonus } = bonusStore();
const emit = defineEmits<{ (e: "bonusDialogHide"): void }>();
const props = defineProps<{ id: number }>();
const { id } = toRefs(props);

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
  await dispatchBonusCancel({
    id: id.value,
  });
  await dispatchUserBonus();
  if (success.value) {
    emit("bonusDialogHide");
  } else {
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
    loading.value = false;
  }
};
</script>

<template>
  <div class="m-bonus-dialog-container">
    <v-row class="mx-4 mt-6 text-700-12 text-gray justify-center">
      {{ t("bonus.dialog.title_text") }}
    </v-row>
    <v-row class="mx-4 mt-6 text-700-12 text-gray">
      <p class="text-center">
        {{ t("bonus.dialog.content_text_1") }}
      </p>
    </v-row>
    <v-row class="mx-10 mt-10 text-700-14">
      <div class="m-bonus-confirm-btn">
        <v-btn
          class="button-bright text-none"
          height="40"
          width="88"
          @click="submitCancel"
          :loading="loading"
        >
          {{ t("bonus.dialog.determine_btn_text") }}
        </v-btn>
      </div>
      <div class="m-bonus-cancel-btn ml-auto">
        <v-btn
          class="button-bright text-none"
          height="40"
          width="88"
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
.m-bonus-dialog-container {
  background-color: #1d2027;
  border-radius: 8px !important;
  height: 173px;
}

.m-bonus-confirm-btn {
  // button
  button {
    border-radius: 8px !important;

    .v-btn__content {
      color: #ffffff;
    }
  }
}

.m-bonus-cancel-btn {
  // button
  button {
    background: #23262f !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    border-radius: 26px;

    .v-btn__content {
      color: #ffffff;
    }
  }
}
</style>
