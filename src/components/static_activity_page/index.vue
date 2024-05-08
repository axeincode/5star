<script lang="ts" setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { CookieService } from "@/utils/cookieService";
// 获取平台货币
import { appCurrencyStore } from "@/store/app";

const props = defineProps({
  modelValue: {
    type: Boolean
  }
});

const emit = defineEmits(["update:modelValue", 'close']);

const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});

const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

// const emit = defineEmits<{
//   (e: "close"): void;
// }>();
const { t } = useI18n();

const activityCheck = ref(false)

const checkboxChanged = () => {
  if (activityCheck.value) {
    CookieService.setCookie('Static_Activity', '1')
  } else {
    CookieService.deleteCookie('Static_Activity')
  }
}
</script>

<template>
<v-dialog
  v-model="modelValueNew"
  :width="328"
  :scrim="true"
  persistent
  style="z-index: 1000002"
>
  <div class="m-static-activity-container">
    <div class="m-static-activity-animation-container">
      <div class="m-static-activity-title">
        {{ t('static_activity.text_1') }}
      </div>

      <div class="m-static-activity-content">
        <p class="content-title">{{ t('static_activity.text_2') }}</p>
        <p>🎁 {{ t('static_activity.text_3') }} <span class="highline-text-1">{{ t('static_activity.text_3_1', [platformCurrency]) }}</span> {{ t('static_activity.text_3_2') }}</p>
        <p>🎁 {{ t('static_activity.text_4') }} <span class="highline-text-1">{{ t('static_activity.text_4_1', [platformCurrency]) }}</span> {{ t('static_activity.text_4_2') }}</p>
        <p>🎁 {{ t('static_activity.text_5') }} <span class="highline-text-1">{{ t('static_activity.text_5_1') }}</span></p>
        <p style="margin: 0;">👉 {{ t('static_activity.text_6') }} <span class="highline-text-1">{{ t('static_activity.text_6_1', [platformCurrency]) }}</span> {{ t('static_activity.text_6_2') }}</p>
        <p style="margin: 0;">👉 {{ t('static_activity.text_7') }} <span class="highline-text-1">{{ t('static_activity.text_7_1', [platformCurrency]) }}</span> {{ t('static_activity.text_7_2') }}</p>
        <p>👉 {{ t('static_activity.text_8') }} <span class="highline-text-1">{{ t('static_activity.text_8_1', [platformCurrency]) }}</span> {{ t('static_activity.text_8_2') }}</p>
        <p>{{ t('static_activity.text_9') }}</p>
        <p style="margin: 0;" class="highline-text-2">✅ {{ t('static_activity.text_10') }}</p>
      </div>

      <div class=" d-flex align-center">
        <div class="static-activity-checkbox_c" style="margin: auto;">
          <v-checkbox
            hide-details
            icon
            class="static-activity-checkbox"
            v-model="activityCheck"
            label="No más consejos por hoy"
            @change="checkboxChanged"
          />
        </div>
      </div>

      <img class="m-static-activity-top-icon" src="@/assets/static_pop_frame/bg_public_16.svg" alt="">

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

<style lang="scss">
.m-static-activity-container {
  width: 328px;
  height: 569px;

  .m-static-activity-animation-container {
    border-radius: 8px 8px 8px 8px;
    background: #1d2027 !important;
    width: 328px;
    height: 569px;
    position: relative;
    display: flex;
    flex-direction: column;

    // close modal button
    .close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute !important;
      top: 8px;
      right: 8px;
    }

    .m-static-activity-content {
      width: 280px;
      // height: 435px;
      flex: 1;
      border-radius: 8px;
      background: rgba(21, 22, 28, 1);
      margin: 16px auto 0px;
      padding: 13px 16px 32px 16px;
      overflow-y: auto;

      p {
        color: rgba(119, 130, 170, 1);
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        margin-bottom: 14px;
      }

      .content-title {
        text-align: center;
        margin-bottom: 20px;
        font-weight: 700;
        color: white;
        font-size: 18px;
      }
    }

    .m-static-activity-top-icon {
      width: 83px;
      height: 48px;
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .m-static-activity-title {
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      color: rgba(255, 255, 255, 1);
      border-radius: 8px 8px 0px 0px;
      background: url(@/assets/static_pop_frame/top-bg.svg) no-repeat;
      background-color: rgba(0, 155, 58, 1);
      background-size: 100% 100%;
    }

    .highline-text-1 {
      color: #F9BC01 !important;
      font-weight: 800 !important;
      font-family: $font_family !important;
    }
    .highline-text-2 {
      color: #DE3D12 !important;
      font-weight: 800 !important;
      font-family: $font_family !important;
    }
  }

  .static-activity-checkbox .v-input--selection-controls__ripple {
    padding: 16px !important;
    border: 1px solid yellow !important;
  }

  .static-activity-checkbox {
    margin: 5px 0px 15px;

    i.v-icon {
      color: #15161c;
      background-color: #01983a;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      margin-top: 4px;
    }

    i.mdi-checkbox-blank-outline {
      background-color: rgba(21, 22, 28, 1);
      box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
      border-radius: 4px;
    }

    .v-selection-control {
      height:30px !important;
    }

    .v-selection-control__wrapper,
    .v-selection-control__input {
      width: 20px;
      height: 20px;
    }

    .v-selection-control__wrapper {
      margin: 0 10px;
    }
  }

  .static-activity-checkbox {
    .v-label {
      color: #7782aa !important;
      font-weight: 400;
      font-size: 12px !important;
    }
  }
}

</style>
