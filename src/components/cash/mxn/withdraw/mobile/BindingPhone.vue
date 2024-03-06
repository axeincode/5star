<script setup lang="ts">
import { ref, computed, watch, onMounted, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { withdrawStore } from "@/store/withdraw";
import { userStore } from "@/store/user";
import { storeToRefs } from "pinia";
import store from "@/store";
import { useToast } from "vue-toastification";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { useTimer } from "vue-timer-hook";
import phones from "@/utils/phoneValidation";
import currencyList from "@/utils/currencyList";
import { getPhoneCodeByLocale } from "@/utils/phoneCodes";
import { authStore } from "@/store/auth";

const { t } = useI18n();
const { dispatchSmsVerificationCode } = withdrawStore();
const { dispatchSubmitSMS } = withdrawStore();
const { dispatchUserProfile } = authStore();

const emit = defineEmits<{
  (e: "submitPhoneBinding"): void;
  (e: "closePhoneBindingDialog"): void;
}>();

const smsVerificationItem = computed(() => {
  const { getSmsVerificationItem } = storeToRefs(withdrawStore());
  return getSmsVerificationItem.value;
});

const userBalance = computed(() => {
  const { getUserBalance } = storeToRefs(userStore());
  return getUserBalance.value;
});

const phone_number = ref<string>("");
const captchaLoading = ref<boolean>(false);
const submitLoading = ref<boolean>(false);
const verification_code = ref<string>("");
const phone_code = ref<string>("");

const timer_value = ref<number>(0);

const time = new Date();
time.setSeconds(time.getSeconds() + timer_value.value);

const timer = useTimer(Number(time));
timer.start();

watch(
  smsVerificationItem,
  (value) => {
    timer_value.value = Number(value.remaining_time);
    const time = new Date();
    time.setSeconds(time.getSeconds() + timer_value.value);
    timer.restart(Number(time));
  },
  { deep: true }
);

const capthcaDisabled = computed((): boolean => {
  if (phone_number.value == "" || timer_value.value != 0) {
    return true;
  }
  console.log(phone_code.value + phone_number.value);
  let disabled = (phone_code.value + phone_number.value).match(
    phones[currencyList[userBalance.value.currency]]
  );
  console.log(phones[currencyList[userBalance.value.currency]]);
  console.log(disabled);
  return Boolean(disabled);
});

const submitDisabled = computed(() => {
  return phone_number.value == "" || verification_code.value == "" ? true : false;
});

const success = computed(() => {
  const { getSuccess } = storeToRefs(withdrawStore());
  return getSuccess.value;
});

const errMessage = computed(() => {
  const { getErrMessage } = storeToRefs(withdrawStore());
  return getErrMessage.value;
});

const sendSMSVerificationCode = async () => {
  captchaLoading.value = true;
  await dispatchSmsVerificationCode({
    phone: "52" + phone_number.value,
  });
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + timer_value.value);
  // timer.restart(Number(time));
  captchaLoading.value = false;
};

const submitSMS = async () => {
  submitLoading.value = true;
  emit("submitPhoneBinding");
  await dispatchSubmitSMS({
    phone: "52" + phone_number.value,
    code: verification_code.value,
  });
  submitLoading.value = false;
  if (success.value) {
    await dispatchUserProfile();
    emit("submitPhoneBinding");
  } else {
    const toast = useToast();
    toast.success(errMessage.value, {
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
};

onMounted(() => {
  phone_code.value = getPhoneCodeByLocale(currencyList[userBalance.value.currency]);
  watchEffect(async () => {
    if (timer.isExpired.value) {
      console.log("isExpired");
      timer_value.value = 0;
    }
  });
});
</script>

<template>
  <div class="m-phone-binding-container">
    <div class="m-phone-binding-dailog-header">
      <v-btn
        class="m-close-button"
        icon="true"
        width="24"
        height="24"
        @click="$.emit('closePhoneBindingDialog')"
      >
        <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
      </v-btn>
    </div>
    <div class="m-phone-binding-dialog-body px-6">
      <div class="text-700-14 white text-center">
        {{ t("phone_binding_dialog.text_1") }}
      </div>
      <div class="text-400-10 gray text-center mt-1">
        <p>{{ t("phone_binding_dialog.text_2") }}</p>
        <p>{{ t("phone_binding_dialog.text_3") }}</p>
      </div>
      <div class="mx-4 mt-4 text-400-12 gray">{{ t("phone_binding_dialog.text_4") }}</div>
      <div class="mt-1 d-flex align-center">
        <div class="m-phone-binding-input mr-2 relative">
          <div class="m-phone-binding-code text-700-12 white">{{ phone_code }}</div>
          <input
            type="number"
            v-model="phone_number"
            :placeholder="t('phone_binding_dialog.text_5')"
            class="text-700-12 px-2"
          />
        </div>
        <v-btn
          class="m-phone-binding-captcha-btn"
          :disabled="capthcaDisabled"
          :loading="captchaLoading"
          @click="sendSMSVerificationCode"
        >
          <template v-if="timer_value == 0">
            {{ t("phone_binding_dialog.text_6") }}
          </template>
          <template v-else>{{ timer.seconds }} s</template>
        </v-btn>
      </div>
      <div class="mx-4 mt-4 text-400-12 gray">{{ t("phone_binding_dialog.text_6") }}</div>
      <div class="mt-1 d-flex align-center">
        <div class="m-phone-binding-input relative">
          <input
            type="number"
            v-model="verification_code"
            :placeholder="t('phone_binding_dialog.text_7')"
            class="text-700-12 px-4"
            style="width: 100%"
          />
        </div>
      </div>
      <div class="mt-6 text-center">
        <v-btn
          width="288"
          height="48"
          :disabled="submitDisabled"
          :loading="submitLoading"
          class="m-phone-binding-submit-btn"
          @click="submitSMS"
        >
          {{ t("phone_binding_dialog.text_8") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-phone-binding-container {
  height: 360px;
  background: $color_1;

  .m-phone-binding-dailog-header {
    height: 36px;
    position: fixed;
    top: 0px;
    width: 100%;

    .m-close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute;
      top: 6px;
      right: 8px;
    }
  }

  .m-phone-binding-dialog-body {
    position: absolute;
    top: 36px;
    width: 100%;
    height: 324px;

    .m-phone-binding-input {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      background: #15161c;
      box-shadow: 0px 0px 6px 1px #00000059 inset;

      .m-phone-binding-code {
        position: absolute;
        top: 12px;
        left: 14px;
      }

      input {
        height: 40px;
        float: right;
        color: white;
      }

      input:focus {
        outline: none;
      }

      input::placeholder {
        font-size: 12px;
        font-weight: 400;
        color: #7782aa;
      }
    }

    .m-phone-binding-captcha-btn {
      margin-left: auto;
      width: 88px;
      height: 40px;
      background: #009b3a;
      box-shadow: 0px 3px 4px 1px #00000036;
      border-radius: 8px;

      .v-btn__content {
        font-family: Inter;
        font-size: 10px;
        font-weight: 700;
        color: white;
      }
    }

    .m-phone-binding-submit-btn {
      margin-left: auto;
      width: 88px;
      height: 40px;
      background: #009b3a;
      box-shadow: 0px 3px 4px 1px #00000036;
      border-radius: 8px;

      .v-btn__content {
        font-family: Inter;
        font-size: 14px;
        font-weight: 700;
        color: white;
      }
    }
  }
}
</style>
