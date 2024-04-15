<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch, ref } from "vue";
import { useI18n } from "vue-i18n";
import { authStore } from "@/store/auth";
import { userStore } from "@/store/user";
import { socketStore } from "@/store/socket";
import { inviteStore } from "@/store/invite";
import { vipStore } from "@/store/vip";
import { refferalStore } from "@/store/refferal";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useDisplay } from "vuetify";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { useToast } from "vue-toastification";
import { throwStatement } from "@babel/types";
import { bannerStore } from "@/store/banner";
import { currencyStore } from "@/store/currency";
import { googleTokenLogin } from "vue3-google-login";
import AdjustClass from "@/utils/adjust";
import EventToken from "@/constants/EventToken";
import { useRoute } from "vue-router";
import { gameStore } from "@/store/game";
import { jwtDecode } from "jwt-decode";
import { loginWithSocialMedia, loginType, loginOrRegister } from "@/plugins/third-party-login";
import { ThirdPartyWayEnum } from '@/enums/userEnum'
import { getQueryParams } from "@/utils/getPublicInformation";
import { activityAppStore } from "@/store/activityApp";
import { mainStore } from "@/store/main";
import { ElLoading } from "element-plus";
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const Login = defineComponent({
  components: {
    SuccessIcon,
    WarningIcon,
  },
  emits: ["close", "switch"],
  props: {
    signInForm: {
      type: Object as any,
    },
  },
  setup(props, { emit }) {
    // translation
    const { t } = useI18n();
    const route = useRoute();
    const { dispatchSignIn, dispatchQuickLogin } = authStore();
    const { dispatchUserProfile } = authStore();
    const { setAuthModalType } = authStore();
    const { setAuthDialogVisible } = authStore();
    const { dispatchUserBalance } = userStore();
    const { setOverlayScrimShow } = appBarStore();
    const { setRefferalDialogShow } = refferalStore();
    const { setToken } = authStore();
    const { dispatchSocketConnect } = socketStore();
    const { dispatchUserInvite } = inviteStore();
    const { dispatchVipInfo } = vipStore();
    const { dispatchVipLevels } = vipStore();
    const { dispatchVipLevelAward } = vipStore();
    const { width } = useDisplay();
    const { dispatchCurrencyList } = currencyStore();
    const {  getGameBetbyInit, closeKill } = gameStore();
    const {  downloadApprReceive } = activityAppStore();
    const {  userDownloadAppAcquisition } = activityAppStore();
    const { dispatchTimeunix } = mainStore()

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
        {
          url: new URL("@/assets/public/svg/icon_public_28.svg", import.meta.url).href,
          value: ThirdPartyWayEnum.FACEBOOK_LOGIN
        },
        {
          url: new URL("@/assets/public/svg/icon_public_google.svg", import.meta.url).href,
          value: ThirdPartyWayEnum.GOOGLE_LOGIN
        },
      ],
      isShowPassword: false,
      notificationShow: false,
      checkIcon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
      notificationText: t("login.forgotPasswordPage.notification"),
      loading: false,
      mailCardHeight: 0,
      emailPartName: "",
      closeBtnHeight: 0,
      containerHeight: 0 as number | undefined,
      bodyHeight: 0,
      clientId:
        "315002729492-ij8mt521q04m5hmqmdl1gdgc70oedbsi.apps.googleusercontent.com",
      indexValue: "",
      typeValue: "",
    });
    const mobileWidth = computed(() => {
      return width.value;
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

    const userInfo = computed(() => {
      const { getUserInfo } = storeToRefs(authStore());
      return getUserInfo.value;
    });

    // forgot password function when password fogot

    const handleForgotPassword = () => {
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

    const loginSuccess = async () => {
      console.log('loginSuccess', success.value);

      if (success.value) {
        await dispatchUserProfile();
        await dispatchUserBalance();
        await dispatchCurrencyList();
        // await dispatchUserInvite();
        await dispatchVipInfo();
        await dispatchVipLevels();
        await dispatchVipLevelAward();

        // 获取服务器时间戳
        dispatchTimeunix()
        // await dispatchSocketConnect();
        setOverlayScrimShow(false);
        setRefferalDialogShow(true);

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

        // 埋点统计
        AdjustClass.getInstance().adjustTrackEvent({
          key: "LOGIN",
          value: String(userInfo.value.id),
          params: "",
        });
        setTimeout(() => {
          setAuthModalType("");
          setAuthDialogVisible(false);
        }, 100);
        if (route.name == 'Sports') {
          await closeKill();
          await getGameBetbyInit();
        }
        await dispatchSocketConnect();

      } else {
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
    };

    // 获取活动奖金
    const activityAppBonus = computed(() => {
      const { getActivityBonus } = storeToRefs(activityAppStore());
      return getActivityBonus.value;
    });

    // 获取app下载活动id
    let downloadID = computed(() => {
      const { getDownloadID } = storeToRefs(activityAppStore());
      return getDownloadID.value;
    });

    // methods
    const handleLoginFormSubmit = async (event) => {
      // 不是回车键不触发  event.keyCode判断是不是软键盘触发
      if(event.keyCode !== undefined && event.keyCode !== 13) return
      //关闭手机软键盘
      document.activeElement.blur();

      state.loading = true;

      await dispatchSignIn({
        uid: state.formData.emailAddress,
        password: state.formData.password,
      });

      await loginSuccess();
      if(!localStorage.getItem(userInfo.value.name)){
        localStorage.setItem(userInfo.value.name,'0');
      }else{
        localStorage.setItem(userInfo.value.name,'1');
      }

      setTimeout(async () => {
        const queryParams = getQueryParams()
        // 如果用户是app登录，那就领取奖励
        if (queryParams['mobile']) {
          try {
            await downloadApprReceive({id: Number(downloadID.value)})
            const toast = useToast();
            toast.success(`${t('activity_app.text_1')} ${platformCurrency.value}${activityAppBonus.value}`, {
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

            await userDownloadAppAcquisition()
          } catch (error) {

          }
        }
      }, 500);

      state.loading = false;
    };

    const showPassword = () => {
      state.isShowPassword = !state.isShowPassword;
    };

    const handleEmailBlur = (e:any) => {
      // console.log("onblur")
      // 去除空格和特殊符号
      state.formData.emailAddress =e.target.value.replace(/([^@.])[\s~`!#$%^&*()_+=[\]{};:"<>?/,]/g, '$1')
      setTimeout(() => {
        state.mailCardHeight = 0;
      }, 100);
    };

    const handleEmailChange = (e:any) => {
      // 去除空格和特殊符号
      state.formData.emailAddress =e.target.value.replace(/([^@.])[\s~`!#$%^&*()_+=[\]{};:"<>?/,]/g, '$1')
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

    const loginState = async (response: any) => {
      if (response.access_token) {
        const params = {
          id_token: response.access_token,
          type: 2,
        };
        await dispatchQuickLogin(params);
        await loginSuccess();
      }
    };

    // 全局 window 对象
    const globalWindow: any = window;

    // 接受android傳遞的token - google 登录模拟
    globalWindow.googleLogin = async (token: string) => {
      const elLoading = ElLoading.service({ lock: true, text: '', background: 'rgba(0, 0, 0, 0.7)', customClass: 'top-loading' });
      if(token) {
        await loginOrRegister(token, state.indexValue, state.typeValue);
        await loginSuccess();
        elLoading.close();
        loginType(state.indexValue);
      } else {
        const toast = useToast();
        toast.error(t("login.submit_result.err_text"), {
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
        elLoading.close();
      }
    }
    // 接受android傳遞的token  - facebook 登录模拟
    globalWindow.fbrLogin = async (token: string) => {
      const elLoading = ElLoading.service({ lock: true, text: '', background: 'rgba(0, 0, 0, 0.7)', customClass: 'top-loading' });
      if(token) {
        await loginOrRegister(token, state.indexValue, state.typeValue);
        await loginSuccess();
        elLoading.close();
        loginType(state.indexValue);
      } else {
        const toast = useToast();
        toast.error(t("login.submit_result.err_text"), {
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
        elLoading.close();
      }
    }

    // social login function
    const handleSocialSigin = async (value: string) => {
      const elLoading = ElLoading.service({ lock: true, text: '', background: 'rgba(0, 0, 0, 0.7)', customClass: 'top-loading' });
      try {
        state.loading = true;
        if (AdjustClass.getInstance().isMobileWebview) {
            state.indexValue = value;
            state.typeValue = 'login';
            // 啟動android原生登錄流程
            if (value === "google") {
              globalWindow["AndroidWebView"].googleLogin();
            }
            if (value === "facebook") {
              globalWindow["AndroidWebView"].facebookLogin();
            }
        } else {
          await loginWithSocialMedia(value, 'login');
          await loginSuccess();
          loginType(value);
        }
      } catch (err) {
        console.error(err);
      } finally {
        state.loading = false;
        elLoading.close();
      }
    };

    watch(
      mobileWidth,
      (newValue) => {
        state.containerHeight = window.innerHeight - 54;
        state.bodyHeight = window.innerHeight - 194;
      },
      { deep: true }
    );

    onMounted(() => {
      if(props.signInForm.emailAddress){
        state.formData.emailAddress=props.signInForm.emailAddress
        state.formData.password=props.signInForm.password
      }
    });


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
      loginSuccess,
      handleSocialSigin
    };
  },
});
export default Login;
</script>

<template>
  <div class="m-login-container px-6">
    <div id="status"></div>
    <div class="my-15 d-flex justify-center align-center">
      <img src="@/assets/public/image/logo_public_04.png" width="86" />
      <div class="ml-2">
        <div class="text-800-16 white">
          {{ t("signup.formPage.header.titleLine1") }}
        </div>
        <div class="text-900-20 white">
          {{ t("signup.formPage.header.titleLine2") }}
        </div>
      </div>
    </div>

    <!-- S 登录 -->
    <template v-if="currentPage === PAGE_TYPE.LOGIN_FORM">
      <!-- 表单提交 -->
      <form action="javascript:return true;" @submit.prevent>
        <div class="relative mt-8">
          <v-text-field
            :label="t('signup.formPage.emailAddress')"
            class="form-textfield dark-textfield m-login-email mx-0"
            variant="solo"
            density="comfortable"
            v-model="formData.emailAddress"
            :onblur="handleEmailBlur"
            @input="handleEmailChange"
            :onfocus="handleEmailFocus"
            @keypress="handleLoginFormSubmit"
          />
          <div class="m-login-mail-card" :style="{ height: mailCardHeight + 'px' }">
            <v-list theme="dark" bg-color="#15161C">
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
            class="form-textfield dark-textfield ma-0 m-login-password"
            variant="solo"
            density="comfortable"
            :type="isShowPassword ? 'text' : 'password'"
            v-model="formData.password"
            @keypress="handleLoginFormSubmit"
          />
          <div v-if="isShowPassword" @click="showPassword" class="m-password-icon">
            <img
              src="@/assets/public/svg/icon_public_07.svg"
              class="m-disable-password"
              width="16"
            />
          </div>
          <div v-else @click="showPassword" class="m-password-icon">
            <img
              src="@/assets/public/svg/icon_public_06.svg"
              class="m-disable-password"
              width="16"
            />
          </div>
        </div>
        <v-row class="mt-2">
          <p
            class="ml-9 login-forget-passwrod-text text-400-12"
            @click="currentPage = PAGE_TYPE.FORGOT_PASSWORD"
          >
            {{ t("login.formPage.forgetPassword") }}
          </p>
        </v-row>
      </form>
      <v-row style="margin-top: 100px">
          <v-btn
            type="search"
            class="ma-3 button-bright m-signin-btn-text"
            width="94%"
            height="48px"
            :loading="loading"
            :onclick="handleLoginFormSubmit"
          >
            {{ t("login.formPage.button") }}
          </v-btn>
      </v-row>
      <v-row class="mt-4">
        <p class="m-divide-text">
          {{ t("signup.formPage.divider") }}
        </p>
        <v-divider class="mx-10" style="border: 1px solid #414968 !important" />
      </v-row>
      <v-row class="mt-6 m-justify-content">
        <v-col cols="4">
          <div class="d-flex justify-space-around bg-surface-variant social-icon-wrapper">
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
                width="36px"
                height="36px"
                @click="handleSocialSigin(item.value)"
              >
                <img :src="item.url" width="36" />
              </v-btn>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </template>
    <!-- E 登录 -->

    <!-- Forgot password -->

    <template v-if="currentPage == PAGE_TYPE.FORGOT_PASSWORD">
      <v-row class="relative mt-8">
        <v-text-field
          :label="t('signup.formPage.emailAddress')"
          class="form-textfield dark-textfield m-login-forgot"
          variant="solo"
          density="comfortable"
          v-model="formData.emailAddress"
          :onblur="handleEmailBlur"
          @input="handleEmailChange"
          :onfocus="handleEmailFocus"
        />
        <div class="m-forgot-mail-card" :style="{ height: mailCardHeight + 'px' }">
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
      </v-row>
      <v-row style="margin-top: 100px">
        <v-btn
          class="ma-3 button-bright m-signin-btn-text"
          width="94%"
          height="48"
          autocapitalize="off"
          @click="handleForgotPassword"
        >
          {{ t("login.forgotPasswordPage.submit") }}
        </v-btn>
      </v-row>
      <v-row>
        <v-btn
          class="ma-3 m-forgot-back-btn"
          width="94%"
          height="48"
          autocapitalize="off"
          @click="currentPage = PAGE_TYPE.LOGIN_FORM"
        >
          {{ t("login.forgotPasswordPage.back_text") }}
        </v-btn>
      </v-row>
      <v-row class="mt-4">
        <p class="m-divide-text">
          {{ t("signup.formPage.divider") }}
        </p>
        <v-divider class="mx-10" style="border: 1px solid #414968 !important" />
      </v-row>
      <v-row class="mt-6  m-justify-content">
        <v-col cols="4">
          <div class="d-flex justify-space-around bg-surface-variant social-icon-wrapper">
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
                width="36px"
                height="36px"
              >
                <img :src="item.url" width="36" />
              </v-btn>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<style lang="scss">
@media (max-width: 600px) {
  .v-field__field {
    color: var(--sec-text-7782-aa, #7782aa);
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
      Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei,
      Microsoft Yahei, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 40px !important;

    input {
      padding-top: 6px !important;
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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
}

.m-forgot-back-btn {
  background: #23262f;
  box-shadow: 0px 4px 6px 1px #0000004d;

  .v-btn__content {
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
      Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei,
      Microsoft Yahei, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #ffffff;
  }
}

.m-login-mail-card {
  position: absolute;
  top: 42px;
  left: 50%;
  transform: translateX(-50%);
  background: #1d2027;
  width: 100%;
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.m-forgot-mail-card {
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  background: #1d2027;
  width: calc(100% - 48px);
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.v-overlay__content {
  overflow-y: unset !important;
}

.m-signin-btn-text {
  .v-btn__content {
    text-align: center;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
      Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei,
      Microsoft Yahei, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-password-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 40px;
}

.m-disable-password {
  position: absolute;
  top: 16px;
  right: 10px;
  cursor: pointer;
}

// container
.m-login-container {
  width: 100%;
  background: $color_1;
  overflow-y: auto;
  height: calc(100vh - 50px);
  padding-bottom: 120px;

  .v-field--variant-solo {
    background: transparent !important;
  }

  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.m-login-container::-webkit-scrollbar {
  width: 0px;
}

// divider
.m-divide-text {
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
    Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei,
    sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #414968;
  position: relative;
  top: 12px;
  text-align: center;
  width: 120px;
  background-color: #1d2027;
  margin: auto;
  z-index: 1;
}

.m-justify-content {
  justify-content: center;
}

// divider
.divide-text {
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
    Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei,
    sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
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

.login-forget-passwrod-text {
  cursor: pointer;
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
    Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #7782aa;
}

.text-large {
  font-size: 32px !important;
}

.m-login-email {
  transform-origin: top !important;

  .v-field__field {
    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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

.m-login-password {
  transform-origin: top !important;

  .v-field__field {
    input {
      padding-right: 30px !important;
    }

    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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

.m-login-forgot {
  transform-origin: top !important;

  .v-field__field {
    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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

.top-loading {
  z-index: 99999999999999 !important;
  color: var(--Primary-Button-32CFEC, #009B3A) !important;
  background: rgba(0, 0, 0, 0.7);
}
</style>
