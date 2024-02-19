<script lang="ts">
import { defineComponent, reactive, toRefs, computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import ValidationBox from "@/components/Signup/ValidationBox.vue";
import SignupHeader from "@/components/Signup/Header.vue";
import Notification from "@/components/global/notification/index.vue";
import { authStore } from "@/store/auth";
import { userStore } from "@/store/user";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { ElNotification } from "element-plus";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { socketStore } from "@/store/socket";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { bannerStore } from "@/store/banner";
import { currencyStore } from "@/store/currency";

const Signup = defineComponent({
  components: {
    ValidationBox,
    SignupHeader,
    Notification,
  },
  emits: ["close", "switch"],
  setup(props, { emit }) {
    // translation
    const { t } = useI18n();
    const { name } = useDisplay();
    const { dispatchSignUp } = authStore();
    const { dispatchUserProfile } = authStore();
    const { dispatchUserBalance } = userStore();
    const { dispatchSocketConnect } = socketStore();
    const { dispatchCurrencyList } = currencyStore();

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
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      loading: false,
      mailCardHeight: 0,
      emailPartName: "",
      notificationShow: false,
      checkIcon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
      notificationText: t("signup.submit_result.success_text"),
    });

    const showPassword = () => {
      state.isShowPassword = !state.isShowPassword;
    };

    // computed variables
    const isFormDataReady = computed(
      (): boolean => validateEmail() && validatePassword() && state.formData.isAgreed
    );

    const mobileVersion = computed(() => {
      return name.value;
    });

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
      handleValidateEmail();
      if (validateEmail()) {
        state.isShowPasswordValidation = true;
      }
    };

    const handleOnPasswordInputBlur = (): void => {
      // state.isShowPasswordValidation = true;
      state.isShowPasswordValidation = false;
    };

    const handleOnUserNameInputFocus = (): void => {
      state.isShowUsernameValidation = true;
    };

    const handleOnUserNameInputBlur = (): void => {
      state.isShowUsernameValidation = false;
    };

    const handleOnPromoCodeInputFocus = (): void => {
      handleValidateEmail();
    };

    const handleOnEmailInputBlur = (): void => {
      handleValidateEmail();
      setTimeout(() => {
        state.mailCardHeight = 0;
      }, 100);
    };

    const handleClickContinueButton = (): void => {
      state.currentPage = state.PAGE_TYPE.SIGNUP_FORM;
    };

    const handleClickConfirmButton = (): void => {
      state.currentPage = state.PAGE_TYPE.DISPLAY_NAME;
    };

    // handle form submit
    const handleSignupFormSubmit = async () => {
      // state.currentPage = state.PAGE_TYPE.DISPLAY_NAME;
      console.log("sign up form submit!");
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
        await dispatchCurrencyList();
        await dispatchSocketConnect();
        // state.notificationShow = !state.notificationShow;
        // state.checkIcon = new URL(
        //   "@/assets/public/svg/icon_public_18.svg",
        //   import.meta.url
        // ).href;
        // state.notificationText = t("signup.submit_result.success_text");
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

        setTimeout(() => {
          emit("close");
        }, 1000);
      } else {
        // state.notificationShow = !state.notificationShow;
        // state.checkIcon = new URL(
        //   "@/assets/public/svg/icon_public_17.svg",
        //   import.meta.url
        // ).href;
        // state.notificationText = errMessage.value;

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

    const handleUsernameSubmit = (): void => {
      console.log("user name submit!");
    };

    const closeDialog = (): void => {
      if (state.currentPage == state.PAGE_TYPE.SIGNUP_FORM) {
        state.currentPage = state.PAGE_TYPE.CONFIRM_CANCEL;
      } else {
        emit("close");
      }
    };

    const handleEmailChange = () => {
      // console.log("onchange")
      if (state.formData.emailAddress.includes("@")) {
        state.emailPartName = state.formData.emailAddress.split("@")[0];
        state.mailCardHeight = 260;
      } else {
        setTimeout(() => {
          state.mailCardHeight = 0;
        }, 100);
      }
    };

    const handleEmailFocus = () => {
      // console.log("onFocus")
      if (state.formData.emailAddress.includes("@")) {
        state.emailPartName = state.formData.emailAddress.split("@")[0];
        state.mailCardHeight = 260;
      }
    };

    const mergeEmail = (mail: string) => {
      state.formData.emailAddress = state.formData.emailAddress.split("@")[0] + mail;
      setTimeout(() => {
        state.mailCardHeight = 0;
      }, 100);
    };

    onMounted(() => {
      console.log("promo code::::::::::::::::::::", route.query.code);
      state.formData.promoCode = route.query.code ? route.query.code.toString() : "";
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
      handleOnPromoCodeInputFocus,
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
    };
  },
});

export default Signup;
</script>

<template>
  <div class="signup-container">
    <SignupHeader v-if="currentPage !== PAGE_TYPE.DISPLAY_NAME" />
    <v-row class="signup-body pt-6">
      <!-- SIGN UP FORM  -->
      <v-form v-if="currentPage === PAGE_TYPE.SIGNUP_FORM" ref="form" class="full-width">
        <v-row class="relative mt-0">
          <v-text-field
            :label="t('signup.formPage.emailAddress')"
            class="form-textfield dark-textfield"
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
        </v-row>
        <div class="register-mail-card" :style="{ height: mailCardHeight + 'px' }">
          <v-list theme="dark" bg-color="#1D2027">
            <v-list-item
              class="text-500-16 white"
              value="gmail"
              @click="mergeEmail('@gmail.com')"
              >{{ emailPartName }}@gmail.com</v-list-item
            >
            <v-list-item
              class="text-500-16 white"
              value="hotmail"
              @click="mergeEmail('@hotmail.com')"
              >{{ emailPartName }}@hotmail.com</v-list-item
            >
            <v-list-item
              class="text-500-16 white"
              value="yahoo"
              @click="mergeEmail('@yahoo.com')"
              >{{ emailPartName }}@yahoo.com</v-list-item
            >
            <v-list-item
              class="text-500-16 white"
              value="icloud"
              @click="mergeEmail('@icloud.com')"
              >{{ emailPartName }}@icloud.com</v-list-item
            >
            <v-list-item
              class="text-500-16 white"
              value="outlook"
              @click="mergeEmail('@outlook.com')"
              >{{ emailPartName }}@outlook.com</v-list-item
            >
          </v-list>
        </div>
        <v-row class="mt-2 relative">
          <v-text-field
            :label="t('signup.formPage.password')"
            class="form-textfield dark-textfield"
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
            class="disable-password"
            @click="showPassword"
          />
          <img
            v-else
            src="@/assets/public/svg/icon_public_06.svg"
            class="disable-password"
            @click="showPassword"
          />
          <ValidationBox
            v-if="isShowPasswordValidation"
            :descriptionList="passwordValidationStrList"
            :validationList="passwordValidationList"
          />
        </v-row>
        <v-row class="mt-4">
          <v-text-field
            :label="t('signup.formPage.promoCode')"
            class="form-textfield normal-textfield"
            variant="solo"
            density="comfortable"
            v-model="formData.promoCode"
            :onfocus="handleOnPromoCodeInputFocus"
          />
        </v-row>
        <v-row class="mt-2">
          <v-col cols="1" class="pl-1">
            <v-checkbox
              v-model="formData.isAgreed"
              hide-details
              icon
              class="agreement-checkbox"
            />
          </v-col>
          <v-col cols="10">
            <p
              :class="currentLanguage === 'en' ? 'agreement-text' : 'agreement-text mt-3'"
            >
              {{ t("signup.formPage.agree.prefix") }}
              <span class="white pointer">
                {{ t("signup.formPage.agree.bold") }}
              </span>
              {{ t("signup.formPage.agree.suffix") }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            :loading="loading"
            class="ma-3 signup-btn"
            width="-webkit-fill-available"
            height="60px"
            :disabled="!isFormDataReady"
            :onclick="handleSignupFormSubmit"
          >
            {{ t("signup.formPage.button") }}
          </v-btn>
        </v-row>
        <v-row class="d-flex justify-center mb-6 mt-10">
          <p class="signin-text mr-4">{{ t("signup.formPage.alreadyAccount") }}</p>
          <p class="signin-text2" @click="$emit('switch')">
            {{ t("signup.formPage.signIn") }}
          </p>
        </v-row>
        <v-row class="mt-2">
          <p class="divide-text">
            {{ t("signup.formPage.divider") }}
          </p>
          <v-divider color="white" />
        </v-row>
        <v-row class="mt-10">
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
                <v-btn color="grey-darken-4" class="social-icon-button" icon="">
                  <img :src="item" />
                </v-btn>
              </v-sheet>
            </div>
          </v-col>
        </v-row>
      </v-form>
      <!-- Confirm cancel. -->
      <div v-if="currentPage == PAGE_TYPE.CONFIRM_CANCEL" class="full-width">
        <v-row class="mt-8">
          <p class="label-text-xl white center full-width">
            {{ t("signup.confirmCancelPage.title") }}
          </p>
        </v-row>
        <v-row class="mt-10">
          <p class="label-text-md slate-gray center full-width">
            {{ t("signup.confirmCancelPage.description") }}
          </p>
        </v-row>
        <v-row class="mt-8">
          <v-btn
            class="ma-3 button-bright text-none"
            width="-webkit-fill-available"
            height="60px"
            @click="handleClickContinueButton"
          >
            {{ t("signup.confirmCancelPage.continue") }}
          </v-btn>
        </v-row>
        <v-row class="mt-4">
          <v-btn
            class="ma-3 button-dark text-none"
            width="-webkit-fill-available"
            height="60px"
            @click="$emit('close')"
          >
            {{ t("signup.confirmCancelPage.cancel") }}
          </v-btn>
        </v-row>
      </div>
      <!-- Already registered notification -->
      <div v-if="currentPage == PAGE_TYPE.ALREADY_REGISTERED" class="full-width">
        <v-row class="mt-8">
          <p class="label-text-md slate-gray center full-width pl-12 pr-12">
            {{ t("signup.alreadyRegisterPage.title") }}
          </p>
        </v-row>
        <v-row class="mt-12">
          <v-btn
            class="ma-3 button-bright text-none"
            width="-webkit-fill-available"
            height="60px"
            autocapitalize="off"
            @click="handleClickConfirmButton"
          >
            {{ t("signup.alreadyRegisterPage.confirm") }}
          </v-btn>
        </v-row>
        <v-row class="mt-4">
          <v-btn
            class="ma-3 button-dark text-none"
            width="-webkit-fill-available"
            height="60px"
            autocapitalize="off"
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
                class="button-carousel ma-2 text-none"
                variant="text"
                icon="mdi-chevron-left"
                @click="props.onClick"
              ></v-btn>
            </template>
            <template v-slot:next="{ props }">
              <v-btn
                class="button-carousel ma-2 text-none"
                variant="text"
                icon="mdi-chevron-right"
                @click="props.onClick"
              ></v-btn>
            </template>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <img src="@/assets/public/image/ua_public_01.png" />
            </v-carousel-item>
          </v-carousel>
        </v-row>
        <v-row class="mt-4 mb-2">
          <p class="label-text-lg white full-width center">
            {{ t("signup.displayNamePage.title") }}
          </p>
        </v-row>
        <v-row class="mt-4 relative display-name-input">
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
            class="ma-3 mt-8 button-bright text-none"
            width="-webkit-fill-available"
            height="60px"
            :disabled="!validateUserName()"
            @click="$emit('close')"
          >
            {{ t("signup.displayNamePage.submit") }}
          </v-btn>
        </v-row>
      </div>
    </v-row>
    <v-btn class="close-button" icon="true" @click="closeDialog">
      <v-icon :color="currentPage === PAGE_TYPE.DISPLAY_NAME ? '#7782AA' : '#FFFFFF'">
        mdi-close
      </v-icon>
    </v-btn>
  </div>
  <!-- <Notification
    :notificationShow="notificationShow"
    :notificationText="notificationText"
    :checkIcon="checkIcon"
  /> -->
</template>

<style lang="scss">
.register-mail-card {
  position: absolute;
  top: 274px;
  left: 50%;
  transform: translateX(-50%);
  background: #1d2027;
  width: 375px;
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.signup-btn:disabled {
  background: #23262f;
  cursor: default;
}

.signup-btn {
  background: #009b3a;
}

.signup-btn:hover:enabled {
  background: #0cb6fa;
}

// button:active:enabled {
//     transform: scale(0.95);
//     filter: brightness(80%);
// }

.disable-password {
  position: absolute;
  top: 31px;
  right: 27px;
  cursor: pointer;
}

// pc dialog container
.signup-container {
  background-color: #2e274c;
  border-radius: 16px !important;
}

// wrapper
.signup-body {
  margin: 0px !important;
  padding: 48px;

  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.display-name-input {
  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

// close modal button
.close-button {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: 5px;
  right: 5px;
}

// divider
.divide-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #23262f;
  position: relative;
  top: 12px;
  text-align: center;
  width: 120px;
  background-color: #2e274c;
  margin: auto;
  z-index: 1;
}

// social icon list component
.social-icon-wrapper {
  background-color: #2e274c !important;

  .v-sheet {
    border-radius: 50px !important;
  }
}

.social-icon-button {
  background-color: #131828 !important;
}

// ask signin text
.signin-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-align: right;
}

.signin-text2 {
  cursor: pointer;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #009b3a;
}

// agreement
.agreement-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-top: 13px;
  color: #7782aa;
}

.agreement-checkbox {
  i.v-icon {
    color: #1d2027;
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
</style>
