<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import ValidationBox from "@/components/Signup/ValidationBox.vue";
import SignupHeader from "@/components/Signup/mobile/Header.vue";
import { useDisplay } from "vuetify";
import Notification from "@/components/global/notification/index.vue";
import { authStore } from "@/store/auth";
import { userStore } from "@/store/user";
import { socketStore } from "@/store/socket";
import { storeToRefs } from "pinia";
import { ElNotification } from "element-plus";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";

const MSignup = defineComponent({
  components: {
    ValidationBox,
    SignupHeader,
    Notification,
    ElNotification,
    SuccessIcon,
    WarningIcon,
  },
  emits: ["close", "switch"],
  setup(props, { emit }) {
    // translation
    const { t } = useI18n();
    const { name } = useDisplay();
    const { dispatchSignUp } = authStore();
    const { dispatchUserProfile } = authStore();
    const { setSignUpForm } = authStore();
    const { setDialogCheckbox } = authStore();
    const { setNickNameDialogVisible } = authStore();
    const { dispatchUserBalance } = userStore();
    const { dispatchSocketConnect } = socketStore();
    const { width } = useDisplay();
    const route = useRoute();

    // initiate component state
    const state = reactive({
      currentPage: 0, // default signup form
      dialog: true,
      isAgreed: false,
      socialIconList: [
        new URL("@/assets/public/svg/icon_public_28.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_29.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_30.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_31.svg", import.meta.url).href,
      ],
      PAGE_TYPE: {
        SIGNUP_FORM: 0,
        CONFIRM_CANCEL: 1,
        ALREADY_REGISTERED: 2,
        DISPLAY_NAME: 3,
      },
      formData: {
        emailAddress: "",
        password: "",
        promoCode: "",
        isAgreed: false,
        visible: false,
      },
      userName: "",
      isShowPassword: false,
      // isShowEmailValidaton: true,
      isShowEmailValidaton: false,
      // isShowPasswordValidation: true,
      isShowPasswordValidation: false,
      isShowUsernameValidation: false,
      passwordValidationStrList: [
        t("signup.formPage.validation.password.items[0]"),
        t("signup.formPage.validation.password.items[1]"),
        t("signup.formPage.validation.password.items[2]"),
        t("signup.formPage.validation.password.items[3]"),
      ],
      userNameValidationStrList: [
        t("signup.displayNamePage.validation.username.items[0]"),
        t("signup.displayNamePage.validation.username.items[1]"),
      ],
      slides: [
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
      ],
      loading: false,
      mailCardHeight: 0,
      emailPartName: "",
      notificationShow: false,
      checkIcon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
      notificationText: t("signup.submit_result.success_text"),
      closeBtnHeight: 0,
      closeBtnShow: false,
      containerHeight: 0,
      bodyHeight: 0,
      overflow: false,
    });

    const showPassword = () => {
      state.isShowPassword = !state.isShowPassword;
    };

    const mobileWidth = computed(() => {
      return width.value;
    });

    // computed variables
    const isFormDataReady = computed(
      (): boolean => validateEmail() && validatePassword() && state.formData.isAgreed
    );

    const mobileVersion = computed(() => {
      return name.value;
    });

    const dialogCheckbox = computed(() => {
      const { getDialogCheckbox } = storeToRefs(authStore());
      return getDialogCheckbox.value;
    });

    watch(
      dialogCheckbox,
      (newValue) => {
        state.closeBtnShow = false;
      },
      { deep: true }
    );

    // flag when login successed
    const success = computed(() => {
      const { getSuccess } = storeToRefs(authStore());
      return getSuccess.value;
    });

    // error message when login failed

    const errMessage = computed(() => {
      const { getErrMessage } = storeToRefs(authStore());
      return getErrMessage.value;
    });

    const passwordValidationList = computed((): boolean[] => {
      const password = state.formData.password;
      // 8-30 Characters in length
      const condition1 = password.length <= 30 && password.length >= 8;
      // Contains one upper and one lowercase character
      const condition2 = /[A-Z]/.test(password) && /[a-z]/.test(password);
      // Contains a number
      const condition3 = /\d/.test(password);
      // Contains Special Code
      const condition4 = /[~!@#$%&*()_-]/.test(password);

      return [condition1, condition2, condition3, condition4];
    });

    const userNameValidationList = computed((): boolean[] => {
      const username = state.userName;
      // 2-20 characters in length
      const condition1 = username.length <= 20 && username.length >= 2;
      // Nickname must not be like your email
      const condition2 = !(
        username.toLowerCase().trim() === state.formData.emailAddress.toLowerCase().trim()
      );

      return [condition1, condition2];
    });

    const currentLanguage = computed((): string => localStorage.getItem("lang") || "en");

    // validation functions
    const validateEmail = (): boolean => {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const isMatch = state.formData.emailAddress.match(validRegex);

      return !!isMatch;
    };

    const handleValidateEmail = (): void => {
      if (validateEmail()) {
        state.isShowEmailValidaton = false;
      } else {
        state.isShowEmailValidaton = true;
      }
    };

    const validatePassword = (): boolean => {
      return passwordValidationList.value.reduce((res, item) => res && item, true);
    };

    const validateUserName = (): boolean => {
      return userNameValidationList.value.reduce((res, item) => res && item, true);
    };

    // event handler functions, needs to be updated
    const handleOnPasswordInputFocus = (): void => {
      // handleValidateEmail();
      // if (validateEmail()) {
      state.isShowPasswordValidation = true;
      // }
    };

    const handleOnPasswordInputBlur = (): void => {
      state.isShowPasswordValidation = false;
    };

    const handleOnUserNameInputFocus = (): void => {
      state.isShowUsernameValidation = true;
    };

    const handleOnUserNameInputBlur = (): void => {
      state.isShowUsernameValidation = false;
    };

    const handleOnEmailInputBlur = (): void => {
      // handleValidateEmail();
      state.isShowEmailValidaton = false;
      setTimeout(() => {
        state.mailCardHeight = 0;
      }, 100);
    };

    const handleClickContinueButton = (): void => {
      state.currentPage = state.PAGE_TYPE.SIGNUP_FORM;
    };

    const handleClickConfirmButton = (): void => {
      emit("switch", "login");
    };

    // handle form submit
    const handleSignupFormSubmit = async () => {
      // setSignUpForm(false);
      // emit("close");
      // setNickNameDialogVisible(true);

      if (!validateEmail()) {
        state.isShowEmailValidaton = true;
        return;
      }

      if (!validatePassword()) {
        state.isShowPasswordValidation = true;
        return;
      }

      if (!state.formData.isAgreed) {
        const toast = useToast();
        toast.success(t("signup.formPage.agree_alert_text"), {
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
        return;
      }

      state.loading = true;
      await dispatchSignUp({
        uid: state.formData.emailAddress,
        password: state.formData.password,
        referral_code: state.formData.promoCode,
        browser: "",
        device: "",
        model: "",
        brand: "",
        imei: "",
      });
      state.loading = false;
      if (success.value) {
        await dispatchUserProfile();
        await dispatchUserBalance();
        await dispatchSocketConnect();
        setSignUpForm(false);
        emit("close");
        setNickNameDialogVisible(true);
        const toast = useToast();
        toast.success(t("signup.submit_result.success_text"), {
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
        // state.notificationShow = !state.notificationShow;
        // state.checkIcon = new URL(
        //   "@/assets/public/svg/icon_public_18.svg",
        //   import.meta.url
        // ).href;
        // state.notificationText = t("signup.submit_result.success_text");
      } else {
        if (errMessage.value == "Registering an existing account is abnormal") {
          state.currentPage = state.PAGE_TYPE.ALREADY_REGISTERED;
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
        // state.notificationShow = !state.notificationShow;
        // state.checkIcon = new URL(
        //   "@/assets/public/svg/icon_public_17.svg",
        //   import.meta.url
        // ).href;
        // state.notificationText = errMessage.value;
      }
    };

    const handleUsernameSubmit = (): void => {
      console.log("user name submit!");
    };

    const dialogVisible = computed(() => {
      const { getAuthDialogVisible } = storeToRefs(authStore());
      return getAuthDialogVisible.value;
    });

    watch(
      dialogVisible,
      (newValue) => {
        if (state.currentPage == state.PAGE_TYPE.SIGNUP_FORM) {
          state.currentPage = state.PAGE_TYPE.CONFIRM_CANCEL;
        } else {
          setSignUpForm(false);
          emit("close");
        }
      },
      { deep: true }
    );

    const closeDialog = (): void => {
      if (state.currentPage == state.PAGE_TYPE.SIGNUP_FORM) {
        state.currentPage = state.PAGE_TYPE.CONFIRM_CANCEL;
      } else {
        setSignUpForm(false);
        emit("close");
      }
    };

    const handleEmailChange = () => {
      handleValidateEmail();
      // console.log("onchange")
      if (state.formData.emailAddress.includes("@")) {
        state.emailPartName = state.formData.emailAddress.split("@")[0];
        state.mailCardHeight = 220;
      } else {
        setTimeout(() => {
          state.mailCardHeight = 0;
        }, 100);
      }
    };

    const handleEmailFocus = () => {
      handleValidateEmail();
      // console.log("onFocus")
      if (state.formData.emailAddress.includes("@")) {
        state.emailPartName = state.formData.emailAddress.split("@")[0];
        state.mailCardHeight = 220;
      }
    };

    const mergeEmail = (mail: string) => {
      state.formData.emailAddress = state.formData.emailAddress.split("@")[0] + mail;
      setTimeout(() => {
        state.mailCardHeight = 0;
      }, 100);
    };

    const cancelConfirm = () => {
      setSignUpForm(false);
      emit("close");
    };

    watch(
      mobileWidth,
      (newValue) => {
        state.containerHeight = window.innerHeight - 54;
        state.bodyHeight = window.innerHeight - 203;
      },
      { deep: true }
    );

    const handleResize = () => {
      if (window.visualViewport?.height != undefined) {
        state.containerHeight = window.visualViewport?.height - 54;
        state.bodyHeight = window.innerHeight - 194;
        if (window.visualViewport.height < 667) {
          state.overflow = true;
        } else {
          state.overflow = false;
        }
      }
    };

    onMounted(() => {
      console.log("promo code::::::::::::::::::::", route.query.code);
      state.formData.promoCode = route.query.code ? route.query.code.toString() : "";
      if (window.visualViewport?.height != undefined) {
        state.containerHeight = window.visualViewport?.height - 54;
        state.bodyHeight = window.innerHeight - 194;
        if (window.visualViewport.height < 667) {
          state.overflow = true;
        }
      }
      setSignUpForm(true);
      window.addEventListener("resize", handleResize);
      // setTimeout(() => {
      //   state.closeBtnShow = true;
      // }, 300);
    });

    onBeforeUnmount(() => {
      state.closeBtnShow = false;
    });

    return {
      t,
      ...toRefs(state),
      isFormDataReady,
      currentLanguage,
      passwordValidationList,
      userNameValidationList,
      mobileVersion,
      validateUserName,
      handleOnPasswordInputFocus,
      handleOnPasswordInputBlur,
      handleOnUserNameInputFocus,
      handleOnUserNameInputBlur,
      handleOnEmailInputBlur,
      handleClickContinueButton,
      handleClickConfirmButton,
      handleSignupFormSubmit,
      handleUsernameSubmit,
      showPassword,
      closeDialog,
      handleEmailChange,
      handleEmailFocus,
      mergeEmail,
      cancelConfirm,
    };
  },
});

export default MSignup;
</script>

<template>
  <div class="m-signup-container">
    <!-- <div
    class="m-signup-container"
    :style="{ height: containerHeight + 'px', overflowY: overflow ? 'auto' : 'unset' }"
  > -->
    <SignupHeader v-if="currentPage !== PAGE_TYPE.DISPLAY_NAME" />
    <div
      class="m-signup-body px-6"
      :style="{
        height: bodyHeight + 'px',
      }"
    >
      <!-- SIGN UP FORM  -->
      <v-form
        v-if="currentPage === PAGE_TYPE.SIGNUP_FORM"
        ref="form"
        class="full-width"
        @keyup.enter="handleSignupFormSubmit"
      >
        <div class="relative mt-10 pa-0">
          <v-text-field
            :label="t('signup.formPage.emailAddress')"
            class="form-textfield dark-textfield ma-0 m-text-field m-signup-email"
            variant="solo"
            density="comfortable"
            v-model="formData.emailAddress"
            :onblur="handleOnEmailInputBlur"
            @input="handleEmailChange"
            :onfocus="handleEmailFocus"
          />
          <ValidationBox
            v-if="isShowEmailValidaton"
            :title="
              t(
                `signup.formPage.validation.email.${
                  formData.emailAddress.length ? 'title2' : 'title'
                }`
              )
            "
            :withCautionIcon="true"
          />
          <div class="m-register-mail-card" :style="{ height: mailCardHeight + 'px' }">
            <v-list theme="dark" bg-color="#1D2027">
              <v-list-item
                class="text-600-12 white"
                value="gmail"
                @click="mergeEmail('@gmail.com')"
              >
                {{ emailPartName }}@gmail.com
              </v-list-item>
              <v-list-item
                class="text-600-12 white"
                value="hotmail"
                @click="mergeEmail('@hotmail.com')"
                >{{ emailPartName }}@hotmail.com</v-list-item
              >
              <v-list-item
                class="text-600-12 white"
                value="yahoo"
                @click="mergeEmail('@yahoo.com')"
                >{{ emailPartName }}@yahoo.com</v-list-item
              >
              <v-list-item
                class="text-600-12 white"
                value="icloud"
                @click="mergeEmail('@icloud.com')"
                >{{ emailPartName }}@icloud.com</v-list-item
              >
              <v-list-item
                class="text-600-12 white"
                value="outlook"
                @click="mergeEmail('@outlook.com')"
                >{{ emailPartName }}@outlook.com</v-list-item
              >
            </v-list>
          </div>
        </div>
        <div class="mt-6 relative pa-0">
          <v-text-field
            :label="t('signup.formPage.password')"
            class="form-textfield dark-textfield ma-0 m-signup-password"
            variant="solo"
            density="comfortable"
            :type="isShowPassword ? 'text' : 'password'"
            v-model="formData.password"
            :onfocus="handleOnPasswordInputFocus"
            :onblur="handleOnPasswordInputBlur"
          />
          <img
            v-if="isShowPassword"
            src="@/assets/public/svg/icon_public_07.svg"
            class="m-disable-password"
            @click="showPassword"
            width="16"
          />
          <img
            v-else
            src="@/assets/public/svg/icon_public_06.svg"
            class="m-disable-password"
            @click="showPassword"
            width="16"
          />
          <ValidationBox
            v-if="isShowPasswordValidation"
            :descriptionList="passwordValidationStrList"
            :validationList="passwordValidationList"
          />
        </div>
        <v-row class="mt-2">
          <v-text-field
            :label="t('signup.formPage.promoCode')"
            class="form-textfield normal-textfield m-signup-promo"
            variant="solo"
            density="comfortable"
            v-model="formData.promoCode"
          />
        </v-row>
        <div class="mt-2" style="display: flex; align-items: center; height: 46px">
          <v-checkbox
            v-model="formData.isAgreed"
            hide-details
            icon
            class="m-agreement-checkbox"
            style="margin-bottom: 20px"
          />
          <p class="text-600-12 gray ml-1">
            {{ t("signup.formPage.agree.prefix") }}
            <span class="white pointer">
              {{ t("signup.formPage.agree.bold") }}
            </span>
            {{ t("signup.formPage.agree.suffix") }}
          </p>
        </div>
        <v-row>
          <v-btn
            class="mt-8 mx-3"
            :class="isFormDataReady ? 'm-signup-btn' : 'm-signup-disabled-btn'"
            width="94%"
            height="48px"
            :loading="loading"
            :onclick="handleSignupFormSubmit"
          >
            {{ t("signup.formPage.button") }}
          </v-btn>
        </v-row>
        <v-row class="mt-6">
          <p class="m-divide-text">
            {{ t("signup.formPage.divider") }}
          </p>
          <v-divider color="white" />
        </v-row>
        <v-row class="mt-6">
          <v-col cols="8" offset="2">
            <div
              class="d-flex justify-space-around bg-surface-variant social-icon-wrapper"
            >
              <v-sheet
                v-for="(item, index) in socialIconList"
                :key="index"
                color="#131828"
                class="rounded"
              >
                <v-btn
                  color="grey-darken-4"
                  class="m-social-icon-button"
                  icon=""
                  height="36px"
                  width="36px"
                >
                  <img :src="item" width="36" />
                </v-btn>
              </v-sheet>
            </div>
          </v-col>
        </v-row>
      </v-form>

      <!-- Confirm cancel. -->
      <div v-if="currentPage == PAGE_TYPE.CONFIRM_CANCEL" class="full-width">
        <v-row style="margin-top: 100px" class="mx-4">
          <p class="text-700-20 white center full-width">
            {{ t("signup.confirmCancelPage.title") }}
          </p>
        </v-row>
        <v-row class="mt-7">
          <p class="text-400-14 slate-gray center full-width">
            {{ t("signup.confirmCancelPage.description") }}
          </p>
        </v-row>
        <v-row style="margin-top: 100px">
          <v-btn
            class="ma-3 button-bright m-signup-continue-btn"
            width="94%"
            height="48px"
            @click="handleClickContinueButton"
          >
            {{ t("signup.confirmCancelPage.continue") }}
          </v-btn>
        </v-row>
        <v-row class="mt-4">
          <v-btn
            class="ma-3 button-dark m-signup-cancel-btn"
            width="94%"
            height="48px"
            @click="cancelConfirm"
          >
            {{ t("signup.confirmCancelPage.cancel") }}
          </v-btn>
        </v-row>
      </div>

      <!-- Already registered notification -->
      <div v-if="currentPage == PAGE_TYPE.ALREADY_REGISTERED" class="full-width">
        <v-row>
          <p class="m-label-text-md slate-gray center full-width px-8">
            {{ t("signup.alreadyRegisterPage.title") }}
          </p>
        </v-row>
        <v-row style="margin-top: 126px">
          <v-btn
            class="ma-3 button-bright m-signup-confirm-btn"
            width="-webkit-fill-available"
            height="48px"
            autocapitalize="off"
            @click="handleClickConfirmButton"
          >
            {{ t("signup.alreadyRegisterPage.confirm") }}
          </v-btn>
        </v-row>
        <v-row class="mt-4">
          <v-btn
            class="ma-3 button-dark m-signup-cancel-btn"
            width="-webkit-fill-available"
            height="48px"
            autocapitalize="off"
            @click="closeDialog"
          >
            {{ t("signup.alreadyRegisterPage.cancel") }}
          </v-btn>
        </v-row>
      </div>

      <!-- Enter avatar and display name -->
      <div v-if="currentPage == PAGE_TYPE.DISPLAY_NAME" class="full-width">
        <v-row class="carousel-container ml-0">
          <v-carousel height="400" show-arrows hide-delimiters class="carousel">
            <template v-slot:prev="{ props }">
              <v-btn
                class="button-carousel ma-2"
                variant="text"
                icon="mdi-chevron-left"
                @click="props.onClick"
              ></v-btn>
            </template>
            <template v-slot:next="{ props }">
              <v-btn
                class="button-carousel ma-2"
                variant="text"
                icon="mdi-chevron-right"
                @click="props.onClick"
              ></v-btn>
            </template>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <img :src="slide" width="123" style="margin-top: 20px" />
            </v-carousel-item>
          </v-carousel>
        </v-row>
        <v-row class="mt-4 mb-2">
          <p class="text-700-16 white full-width center">
            {{ t("signup.displayNamePage.title") }}
          </p>
        </v-row>
        <v-row class="mt-4 relative m-display-name-input">
          <v-text-field
            :label="t('signup.displayNamePage.username')"
            class="form-textfield dark-textfield"
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
        </v-row>
        <v-row>
          <v-btn
            class="ma-3 mt-8 mb-8 button-bright m-signup-confirm-btn"
            width="-webkit-fill-available"
            height="48px"
            :disabled="!validateUserName()"
            @click="$emit('close')"
          >
            {{ t("signup.displayNamePage.submit") }}
          </v-btn>
        </v-row>
      </div>
    </div>
    <v-btn
      :class="
        currentPage == PAGE_TYPE.DISPLAY_NAME ? 'm-close-button-1' : 'm-close-button'
      "
      icon="true"
      @click="closeDialog"
      width="30"
      height="30"
      style="top: -53px; visibility: hidden"
      v-if="closeBtnShow"
    >
      <img src="@/assets/public/svg/icon_public_10.svg" />
      <!-- <v-icon :color="currentPage === PAGE_TYPE.DISPLAY_NAME ? '#7782AA' : '#FFFFFF'">
                mdi-close
            </v-icon> -->
    </v-btn>
  </div>
  <!-- <Notification
    :notificationShow="notificationShow"
    :notificationText="notificationText"
    :checkIcon="checkIcon"
  /> -->
</template>

<style lang="scss">
@media (max-width: 600px) {
  .v-field__field {
    color: var(--sec-text-7782-aa, #7782aa);
    font-family: "Inter";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 40px;

    input {
      padding-top: 6px !important;
      font-family: "Inter";
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .v-label.v-field-label {
      font-family: "Inter";
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: var(--v-field-label-scale);
      max-width: 100%;
    }
  }

  .v-input__control {
    .mdi:before {
      // font-size: 23px !important;
    }
  }

  .v-list-item--density-default.v-list-item--one-line {
    min-height: 42px !important;
  }
}

.m-label-text-md {
  margin-top: 142px;
  font-weight: 600;
  font-size: 16px;
  font-family: "Inter";
}

.m-signup-continue-btn {
  .v-btn__content {
    color: var(--text-dark-black, white);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
}

.m-signup-confirm-btn {
  .v-btn__content {
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-signup-cancel-btn {
  .v-btn__content {
    color: var(--text-dark-black, #fff);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-register-mail-card {
  position: absolute;
  top: 43px;
  left: 50%;
  transform: translateX(-50%);
  background: #1d2027;
  width: 100%;
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.m-signup-btn {
  background: #009b3a;
  color: white;
  border-radius: 8px !important;
  .v-btn__content {
    text-align: center;
    font-family: "Inter";
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-signup-btn:hover:enabled {
  background: #009b3a;
}

.m-signup-disabled-btn {
  border-radius: 8px;
  background: var(--Secondary-Button, #23262f);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

  .v-btn__content {
    color: #ffffff;
    text-align: center;
    font-family: "Inter";
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-disable-password {
  position: absolute;
  top: 16px;
  right: 24px;
  cursor: pointer;
}

// mobile dialog contaier
.m-signup-container {
  border-radius: 26px 26px 0px 0px;
  position: fixed;
  bottom: 0;
  height: 613px;
  width: 100%;
  background: var(--bg-2-e-274-c, #2e274c);

  .v-field--variant-solo {
    background: transparent !important;
  }
}

.m-signup-container::-webkit-scrollbar {
  width: 0px;
}

// wrapper
.m-signup-body {
  border-radius: 8px 8px 0px 0px;
  background: var(--bg-2-e-274-c, #1D2027);
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 464px;
  z-index: 99;

  // overflow-y: auto;
  .form-textfield div.v-field__field {
    background: #15161c;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.m-display-name-input {
  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.m-signup-body::-webkit-scrollbar {
  width: 0px;
}

// close modal button
.m-close-button {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: 9px;
  right: 12px;
}

.m-close-button-1 {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: 160px;
  right: 12px;
}

// divider
.m-divide-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #23262f;
  position: relative;
  top: 12px;
  text-align: center;
  width: 120px;
  background-color: #1d2027;
  margin: auto;
  z-index: 1;
}

// social icon list component
.social-icon-wrapper {
  background-color: #1d2027 !important;

  .v-sheet {
    border-radius: 50px !important;
  }
}

.m-social-icon-button {
  background-color: #131828 !important;
  width: 36px;
  height: 36px;
}

// ask signin text
.signin-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-align: right;
}

.signin-text2 {
  cursor: pointer;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #009b3a;
}

// agreement
.agreement-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-top: 13px;
  color: #7782aa;
}

.m-agreement-checkbox {
  i.v-icon {
    color: #15161c;
    background-color: #01983a;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-top: 4px;
  }

  i.mdi-checkbox-blank-outline {
    background-color: #1d2027;
    box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
    border-radius: 4px;
  }
}

// carousel
.carousel-container {
  width: 100%;
}

.m-signup-email {
  transform-origin: top !important;

  .v-field__field {
    input {
      padding-top: 2px !important;
    }
    .v-label.v-field-label {
      font-family: "Inter";
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #7782aa !important;
      opacity: 1 !important;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: 8px !important;
      max-width: 100%;
      color: #7782aa !important;
      opacity: 1 !important;
    }
  }
}

.m-signup-password {
  transform-origin: top !important;

  .v-field__field {
    input {
      padding-top: 2px !important;
    }
    .v-label.v-field-label {
      font-family: "Inter";
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #7782aa !important;
      opacity: 1 !important;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: 8px !important;
      max-width: 100%;
      color: #7782aa !important;
      opacity: 1 !important;
    }
  }
}

.m-signup-promo {
  transform-origin: top !important;

  .v-field__field {
    background: #15161c;
    input {
      padding-top: 2px !important;
    }
    .v-label.v-field-label {
      font-family: "Inter";
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #7782aa !important;
      opacity: 1 !important;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: 8px !important;
      max-width: 100%;
      color: #7782aa !important;
      opacity: 1 !important;
    }
  }
}
</style>
