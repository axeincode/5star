<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import ValidationBox from "@/components/Signup/ValidationBox.vue";
import { storeToRefs } from "pinia";
import { authStore } from "@/store/auth";
import { vipStore } from "@/store/vip";
import { ElNotification } from "element-plus";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { useToast } from "vue-toastification";
import img_public_42 from "@/assets/public/image/img_public_42.png";
import { ProgressiveImage } from "vue-progressive-image";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import { Pagination } from "swiper/modules";

const modules = [Pagination];

const { t } = useI18n();
const emit = defineEmits<{ (e: "close"): void }>();
const { dispatchUpdateUserInfo } = authStore();
const { dispatchUserProfile } = authStore();
const { dispatchVipInfo } = vipStore();
const { dispatchVipLevels } = vipStore();

const userName = ref<string>("");
const loading = ref<boolean>(false);
const isShowUsernameValidation = ref<boolean>(false);
const selectedAvatarItem = ref<number>(1);
const slides = ref<Array<string>>([
  new URL("@/assets/public/image/ua_public_01.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_02.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_03.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_04.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_05.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_06.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_07.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_08.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_09.png", import.meta.url).href,
  new URL("@/assets/public/image/ua_public_10.png", import.meta.url).href,
]);
const userNameValidationStrList = ref<Array<string>>([
  t("signup.displayNamePage.validation.username.items[0]"),
  t("signup.displayNamePage.validation.username.items[1]"),
]);
const swiper = ref<any>(null);

const closeDialog = () => {
  emit("close");
};

const userInfo = computed(() => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
});

const success = computed(() => {
  const { getSuccess } = storeToRefs(authStore());
  return getSuccess.value;
});

const errMessage = computed(() => {
  const { getErrMessage } = storeToRefs(authStore());
  return getErrMessage.value;
});

// computed variables
const isFormDataReady = computed((): boolean => validateUserName());

const userNameValidationList = computed((): boolean[] => {
  const username = userName.value;
  // 2-20 characters in length
  const condition1 = username.length <= 20 && username.length >= 2;
  // Nickname must not be like your email
  const condition2 = !(
    username.toLowerCase().trim() === userInfo.value.email.toLowerCase().trim()
  );

  return [condition1, condition2];
});

const validateUserName = (): boolean => {
  return userNameValidationList.value.reduce((res, item) => res && item, true);
};

const handleOnUserNameInputFocus = (): void => {
  isShowUsernameValidation.value = true;
};

const handleOnUserNameInputBlur = (): void => {
  isShowUsernameValidation.value = false;
};

const goToPrev = () => {
  swiper.value.slidePrev();
};

const goToNext = () => {
  swiper.value.slideNext();
};

const getSwiperRef = (swiperInstance: any) => {
  swiper.value = swiperInstance;
};

const submitNickName = async () => {
  if (!validateUserName()) {
    isShowUsernameValidation.value = true;
    return;
  }
  loading.value = true;
  await dispatchUpdateUserInfo({
    name: userName.value,
    avatar: selectedAvatarItem.value,
  });
  loading.value = false;
  if (success.value) {
    await dispatchUserProfile();
    await dispatchVipInfo();
    await dispatchVipLevels();
    const toast = useToast();
    toast.success("added name successfully!", {
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
    emit("close");
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
  swiper.value.on("slideChange", () => {
    selectedAvatarItem.value = swiper.value.activeIndex;
  });
});
</script>

<template>
  <div class="m-nickname-container">
    <img src="@/assets/public/image/bg_public_05.png" class="m-header-img" />
    <img src="@/assets/public/image/bg_public_01.png" class="m-body-img" />
    <div class="m-nickname-circle"></div>
    <div class="m-nickname-swiper-container mt-10">
      <Swiper
        v-model="selectedAvatarItem"
        :modules="modules"
        class="mx-80"
        style="height: 130px"
        :loop="true"
        @swiper="getSwiperRef"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index" :virtualIndex="index">
          <ProgressiveImage
            :src="slide"
            blur="30"
            custom-class="m-signup-displayname-img"
          />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="m-nickname-avatar-btn">
      <div class="swiper-button-next" slot="button-next" @click="goToNext"></div>
      <div class="swiper-button-prev" slot="button-prev" @click="goToPrev"></div>
    </div>
    <div class="m-nickname-displayname">
      <p class="text-700-16 white full-width center">
        {{ t("signup.displayNamePage.title") }}
      </p>
    </div>
    <div class="mx-5 mt-16 relative m-display-name-input">
      <v-text-field
        :label="t('signup.displayNamePage.username')"
        class="form-textfield dark-textfield ma-0 m-signup-displayname"
        variant="solo"
        density="comfortable"
        v-model="userName"
        :onfocus="handleOnUserNameInputFocus"
        :onblur="handleOnUserNameInputBlur"
      />
      <ValidationBox
        v-if="isShowUsernameValidation"
        :title="t('signup.displayNamePage.validation.username.title')"
        :descriptionList="userNameValidationStrList"
        :validationList="userNameValidationList"
      />
    </div>
    <v-row class="mx-5 mt-5">
      <v-btn
        :class="isFormDataReady ? 'm-signup-btn' : 'm-signup-disabled-btn'"
        width="-webkit-fill-available"
        height="48px"
        :loading="loading"
        @click="submitNickName"
      >
        {{ t("signup.displayNamePage.submit") }}
      </v-btn>
    </v-row>
    <v-btn
      class="m-nickname-close-button"
      icon="true"
      @click="closeDialog"
      width="24"
      height="24"
    >
      <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
    </v-btn>
  </div>
</template>

<style lang="scss">
.m-nickname-container {
  width: 320px;
  height: 471px;

  .swiper-slide {
    text-align: center;
  }

  .v-progressive-image {
    aspect-ratio: 0.74152;
    background: transparent !important;
  }

  .m-nickname-swiper-container {
    .swiper {
      overflow: hidden !important;
    }
  }

  .m-nickname-avatar-btn {
    position: absolute;
    top: 112px;
    left: 63%;
    z-index: 2000;

    .swiper-button-next {
      width: 30px;
      height: 30px;
      background: transparent;
      right: -63px;
      top: 0px;
    }

    .swiper-button-next:active {
      transform: scale(0.9);
      filter: brightness(80%);
      transition-duration: 0.28s;
    }

    .swiper-button-prev:active {
      transform: scale(0.9);
      filter: brightness(80%);
      transition-duration: 0.28s;
    }

    .swiper-button-prev {
      width: 30px;
      height: 30px;
      background: transparent;
      left: -146px;
      top: 0px;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-family: swiper-icons;
      text-transform: none !important;
      letter-spacing: 0;
      font-variant: initial;
      font-size: 10px;
      font-weight: 900;
      color: white;
    }
  }

  .m-header-img {
    position: absolute;
    top: 0px;
    left: 20px;
  }

  .m-body-img {
    position: absolute;
    top: 20px;
    left: 0px;
  }

  .m-nickname-circle {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    border-radius: 32px;
    background: #15161c;
  }

  .m-nickname-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute;
    top: 30px;
    right: 10px;
  }

  .m-nickname-carousel-btn {
    background: transparent;
    width: 32px !important;
    height: 32px !important;
    color: white !important;
  }

  .m-nickname-displayname {
    width: 320px;
    position: absolute;
    top: 176px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .m-display-name-input {
    .form-textfield div.v-field__field {
      box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
    }

    .form-textfield div.v-field--variant-solo,
    .v-field--variant-solo-filled {
      background: transparent;
    }
  }
}

.m-signup-btn {
  background: #009b3a;

  .v-btn__content {
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
.m-signup-disabled-btn {
  border-radius: 8px;
  background: var(--Secondary-Button, #23262f);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

  .v-btn__content {
    color: #ffffff;
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
.m-signup-displayname {
  transform-origin: top !important;

  .v-field__field {
    .v-label.v-field-label {
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #7782aa !important;
      opacity: 1 !important;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: 10px !important;
      max-width: 100%;
      color: #7782aa !important;
      opacity: 1 !important;
    }
  }
}

.m-signup-displayname-img {
  width: 123px !important;
  height: 123px !important;
}
</style>
