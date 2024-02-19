<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import LoginHeader from "./Header.vue";
import { authStore } from "@/store/auth";
import { userStore } from "@/store/user";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from "element-plus";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { socketStore } from "@/store/socket";
import { vipStore } from "@/store/vip";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { gameStore } from "@/store/game";
import { bannerStore } from "@/store/banner";
import { currencyStore } from "@/store/currency";

const Login = defineComponent({
  components: {
    LoginHeader,
    Notification,
  },
  emits: ["close", "switch"],
  setup(props, { emit }) {
    // translation
    const { t } = useI18n();
    const { dispatchSignIn } = authStore();
    const { dispatchUserProfile } = authStore();
    const { setAuthModalType } = authStore();
    const { setToken } = authStore();
    const { dispatchUserBalance } = userStore();
    const { dispatchCurrencyList } = currencyStore();
    const { dispatchSocketConnect } = socketStore();
    const { dispatchVipInfo } = vipStore();
    const { dispatchVipLevels } = vipStore();
    const route = useRoute();
    const { dispatchGameEnter, getGameBetbyInit, closeKill } = gameStore();

    // initiate component state
    const state = reactive({
      currentPage: 0, // default login form
      PAGE_TYPE: {
        LOGIN_FORM: 0,
        FORGOT_PASSWORD: 1,
      },
      formData: {
        emailAddress: "",
        password: "",
      },
      socialIconList: [
        new URL("@/assets/public/svg/icon_public_28.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_29.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_30.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_31.svg", import.meta.url).href,
      ],
      isShowPassword: false,
      notificationShow: false,
      checkIcon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
      notificationText: t("login.forgotPasswordPage.notification"),
      loading: false,
      mailCardHeight: 0,
      emailPartName: "",
    });

    // computed variables
    const isFormDataReady = computed(
      (): boolean =>
        state.formData.emailAddress.length > 0 && state.formData.password.length > 0
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

    // forgot password function when password fogot

    const handleForgotPassword = () => {
      // state.notificationShow = !state.notificationShow;
      // state.checkIcon = new URL(
      //   "@/assets/public/svg/icon_public_18.svg",
      //   import.meta.url
      // ).href;
      // state.notificationText = t("login.forgotPasswordPage.notification");

      const toast = useToast();
      toast.success(t("login.forgotPasswordPage.notification"), {
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
      state.currentPage = state.PAGE_TYPE.LOGIN_FORM;
    };

    // methods
    const handleLoginFormSubmit = async () => {
      state.loading = true;

      // setToken("token");
      // state.notificationShow = !state.notificationShow;
      // state.checkIcon = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
      // state.notificationText = t('login.submit_result.success_text')
      // setTimeout(() => {
      //     setAuthModalType("");
      //     emit('close');
      // }, 1000)

      await dispatchSignIn({
        uid: state.formData.emailAddress,
        password: state.formData.password,
      });
      if (success.value) {
        await dispatchUserProfile();
        await dispatchUserBalance();
        await dispatchCurrencyList();
        await dispatchVipInfo();
        await dispatchVipLevels();
        // await dispatchSocketConnect();
        // state.notificationShow = !state.notificationShow;
        // state.checkIcon = new URL(
        //   "@/assets/public/svg/icon_public_18.svg",
        //   import.meta.url
        // ).href;
        // state.notificationText = t("login.submit_result.success_text");
        if (route.name == 'Sports') {
          await closeKill();
          // await dispatchGameEnter({ id: '9999', demo: false });
          await getGameBetbyInit();
        }
        const toast = useToast();
        toast.success(t("login.submit_result.success_text"), {
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
          setAuthModalType("");
          emit("close");
        }, 1000);
        await dispatchSocketConnect();
      } else {
        // state.notificationShow = !state.notificationShow;
        // state.checkIcon = new URL(
        //   "@/assets/public/svg/icon_public_17.svg",
        //   import.meta.url
        // ).href;
        // state.notificationText = t("login.submit_result.err_text");

        const toast = useToast();
        toast.success(t("login.submit_result.err_text"), {
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

      state.loading = false;
    };

    const showPassword = () => {
      state.isShowPassword = !state.isShowPassword;
    };

    const handleEmailBlur = () => {
      // console.log("onblur")
      setTimeout(() => {
        state.mailCardHeight = 0;
      }, 100);
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

    return {
      t,
      ...toRefs(state),
      isFormDataReady,
      handleLoginFormSubmit,
      handleForgotPassword,
      showPassword,
      handleEmailBlur,
      handleEmailChange,
      handleEmailFocus,
      mergeEmail,
    };
  },
});

export default Login;
</script>

<template>
  <div class="login-container">
    <LoginHeader v-if="currentPage === PAGE_TYPE.LOGIN_FORM" />
    <v-row class="login-body pt-6">
      <!-- SIGN UP FORM  -->
      <v-form v-if="currentPage === PAGE_TYPE.LOGIN_FORM" ref="form" class="full-width">
        <v-row class="relative mt-0">
          <v-text-field
            :label="t('signup.formPage.emailAddress')"
            class="form-textfield dark-textfield"
            variant="solo"
            density="comfortable"
            v-model="formData.emailAddress"
            :onblur="handleEmailBlur"
            @input="handleEmailChange"
            :onfocus="handleEmailFocus"
          />
        </v-row>
        <div class="login-mail-card" :style="{ height: mailCardHeight + 'px' }">
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
        </v-row>
        <v-row>
          <p
            class="ml-9 login-forget-passwrod-text"
            @click="currentPage = PAGE_TYPE.FORGOT_PASSWORD"
          >
            {{ t("login.formPage.forgetPassword") }}
          </p>
        </v-row>
        <v-row class="mt-12">
          <v-btn
            :loading="loading"
            class="ma-3 button-bright text-none"
            width="-webkit-fill-available"
            height="60px"
            :disabled="!isFormDataReady"
            :onclick="handleLoginFormSubmit"
          >
            {{ t("login.formPage.button") }}
          </v-btn>
        </v-row>
        <v-row class="d-flex justify-center mb-6 mt-10">
          <p class="signin-text mr-2">{{ t("login.formPage.donthaveAccount") }}</p>
          <p class="signin-text2" @click="$emit('switch')">
            {{ t("login.formPage.createOne") }}
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
      <!-- Forgot password -->
      <div v-if="currentPage == PAGE_TYPE.FORGOT_PASSWORD" class="full-width">
        <v-row class="mt-8 d-flex justify-center">
          <img src="@/assets/public/image/logo_public_01.png" class="logo-image mr-2" />
          <!-- <span class="logo-text purple text-large">{{ t('main.logo_text_1') }}</span>
                    <span class="logo-text yellow text-large">{{ t('main.logo_text_2') }}</span> -->
        </v-row>
        <v-row class="mt-8">
          <p class="label-text-md2 white center full-width pl-12 pr-12">
            {{ t("login.forgotPasswordPage.title") }}
          </p>
        </v-row>
        <v-row class="relative mt-8">
          <v-text-field
            :label="t('signup.formPage.emailAddress')"
            class="form-textfield dark-textfield"
            variant="solo"
            density="comfortable"
          />
        </v-row>
        <v-row class="mt-8">
          <v-btn
            :disabled="loading"
            :loading="loading"
            class="ma-3 button-bright text-none"
            width="-webkit-fill-available"
            height="60px"
            autocapitalize="off"
            @click="handleForgotPassword"
          >
            {{ t("login.forgotPasswordPage.submit") }}
          </v-btn>
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
      </div>
    </v-row>
    <v-btn class="close-button" icon="true" @click="$emit('close')">
      <v-icon :color="currentPage !== PAGE_TYPE.LOGIN_FORM ? '#7782AA' : '#FFFFFF'">
        mdi-close
      </v-icon>
    </v-btn>
    <Notification
      :notificationShow="notificationShow"
      :notificationText="notificationText"
      :checkIcon="checkIcon"
    />
  </div>
</template>

<style lang="scss">
.login-mail-card {
  position: absolute;
  top: 272px;
  left: 50%;
  transform: translateX(-50%);
  background: #1D2027;
  width: 375px;
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.disable-password {
  position: absolute;
  top: 31px;
  right: 27px;
  cursor: pointer;
}

// button:active:enabled {
//     transform: scale(0.95);
//     filter: brightness(80%);
// }

// container
.login-container {
  background-color: #2e274c;
  border-radius: 16px !important;
}

// wrapper
.login-body {
  margin: 0px !important;
  padding: 48px;

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
  color: #23262F;
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

.login-forget-passwrod-text {
  cursor: pointer;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #7782aa;
}

.text-large {
  font-size: 32px !important;
}
</style>
