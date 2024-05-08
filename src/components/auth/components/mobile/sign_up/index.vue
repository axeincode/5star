<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ValidationBox from './ValidationBox.vue'
import grecaptchaDrawer from './grecaptchaDrawer.vue'
import { useDisplay } from 'vuetify'
import { authStore } from '@/store/auth'
import { userStore } from '@/store/user'
import { socketStore } from '@/store/socket'
import { storeToRefs } from 'pinia'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue'
import WarningIcon from '@/components/global/notification/WarningIcon.vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import { bannerStore } from '@/store/banner'
import { currencyStore } from '@/store/currency'
import AdjustClass from '@/utils/adjust'
import { googleTokenLogin } from 'vue3-google-login'
import EventToken from '@/constants/EventToken'
import { useTimer } from 'vue-timer-hook'
import { loginWithSocialMedia, loginType, loginOrRegister } from '@/plugins/third-party-login'
import { ThirdPartyWayEnum } from '@/enums/userEnum'
import { ElLoading } from 'element-plus'
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import LoadingBtn from "@/components/global/loadingBtn.vue"

const MSignup = defineComponent({
  components: {
    ValidationBox,
    SuccessIcon,
    WarningIcon,
    grecaptchaDrawer,
    LoadingBtn
  },
  emits: ['close', 'switchAuthDialog', 'setSignInForm'],
  props: {
    signUpDialogCheck: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    // translation
    const { t } = useI18n()
    const { name } = useDisplay()
    const { dispatchSignUp, dispatchQuickRegister } = authStore()
    const { setAuthDialogVisible } = authStore()
    const { dispatchUserProfile } = authStore()
    const { setNickNameDialogVisible } = authStore()
    const { dispatchUserBalance } = userStore()
    const { dispatchSocketConnect } = socketStore()
    const { dispatchCurrencyList } = currencyStore()
    const { dispatchRegisterConfig } = authStore()

    const { width } = useDisplay()
    const route = useRoute()

    const network: Network = Network.getInstance()

    // initiate component state
    const state = reactive({
      currentPage: 0, // default signup form
      dialog: true,
      isAgreed: true,
      socialIconList: [
        {
          url: new URL('@/assets/public/svg/icon_public_28.svg', import.meta.url).href,
          value: ThirdPartyWayEnum.FACEBOOK_LOGIN,
        },
        {
          url: new URL('@/assets/public/svg/icon_public_google.svg', import.meta.url).href,
          value: ThirdPartyWayEnum.GOOGLE_LOGIN,
        },
        // new URL("@/assets/public/svg/icon_public_28.svg", import.meta.url).href,
        // new URL("@/assets/public/svg/icon_public_29.svg", import.meta.url).href,
        // new URL("@/assets/public/svg/icon_public_30.svg", import.meta.url).href,
        // new URL("@/assets/public/svg/icon_public_31.svg", import.meta.url).href,
      ],
      emailCollection: [
        'gmail.com',
        'hotmail.com',
        'yahoo.com',
        'icloud.com',
        'outlook.com'
      ], // 邮箱集合
      emailFormat: <any>[], // 用于显示
      PAGE_TYPE: {
        SIGNUP_FORM: 0,
        CONFIRM_CANCEL: 1,
        ALREADY_REGISTERED: 2,
      },
      formData: {
        emailAddress: '',
        phone: '',
        code: '',
        password: '',
        promoCode: '',
        isAgreed: true,
        visible: false,
        areaCode: '+52',
      },
      userName: '',
      isShowPassword: false,
      // isShowEmailValidaton: true,
      isShowEmailValidaton: false,
      // isShowPasswordValidation: true,
      isShowPasswordValidation: false,
      isShowUsernameValidation: false,
      passwordValidationStrList: [
        t('signup.formPage.validation.password.items[0]'),
        // t("signup.formPage.validation.password.items[1]"),
        // t("signup.formPage.validation.password.items[2]"),
        // t("signup.formPage.validation.password.items[3]"),
      ],
      userNameValidationStrList: [t('signup.displayNamePage.validation.username.items[0]'), t('signup.displayNamePage.validation.username.items[1]')],
      slides: [
        new URL('@/assets/public/image/ua_public_01.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_02.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_03.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_04.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_05.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_06.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_07.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_08.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_09.png', import.meta.url).href,
        new URL('@/assets/public/image/ua_public_10.png', import.meta.url).href,
      ],
      loading: false,
      mailCardHeight: 0,
      emailPartName: '',
      promoCodeDisabled: false,
      indexValue: '',
      typeValue: '',
      grecaptchaDrawer: false,
      registerConfig: {
        model: 1, //1:邮件登录 2:手机登录
        is_verify: false, //登录是否验证
      },
      showPhoneAreaCode: false,
    })

    // const timer_value = ref<number>(60);
    // const time = new Date();
    // const timer = useTimer(Number(time));
    // time.setSeconds(time.getSeconds() + timer_value.value); // 1hour timer
    // timer.start();
    const timer_value = ref<number>(0) //120秒
    const time = new Date()
    time.setSeconds(time.getSeconds() + timer_value.value)
    const timer = useTimer(Number(time))

    watch(
      props,
      (value) => {
        if (state.currentPage == state.PAGE_TYPE.SIGNUP_FORM) {
          state.currentPage = state.PAGE_TYPE.CONFIRM_CANCEL
        } else if (state.currentPage == state.PAGE_TYPE.CONFIRM_CANCEL) {
          setAuthDialogVisible(false)
        }
      },
      { deep: true }
    )

    const showPassword = () => {
      state.isShowPassword = !state.isShowPassword
    }

    const mobileWidth = computed(() => {
      return width.value
    })

    // computed variables
    const isFormDataReady = computed((): boolean => validateEmail() && validatePassword() && state.formData.isAgreed)

    const mobileVersion = computed(() => {
      return name.value
    })

    // flag when login successed
    const success = computed(() => {
      const { getSuccess } = storeToRefs(authStore())
      return getSuccess.value
    })

    // error message when login failed

    const errMessage = computed(() => {
      const { getErrMessage } = storeToRefs(authStore())
      return getErrMessage.value
    })

    const userInfo = computed(() => {
      const { getUserInfo } = storeToRefs(authStore())
      return getUserInfo.value
    })

    const passwordValidationList = computed((): boolean[] => {
      const password = state.formData.password

      // 8-30 Characters in length
      const condition1 = password.length <= 30 && password.length >= 8

      // Contains one upper and one lowercase character
      // const condition2 = /[A-Z]/.test(password) && /[a-z]/.test(password);

      // Contains a number
      // const condition3 = /\d/.test(password);

      // Contains Special Code
      // const condition4 = /[~!@#$%&*()_-]/.test(password);

      // return [condition1, condition2, condition3, condition4];
      return [condition1]
    })

    const userNameValidationList = computed((): boolean[] => {
      const username = state.userName
      // 2-20 characters in length
      const condition1 = username.length <= 20 && username.length >= 2
      // Nickname must not be like your email
      const condition2 = !(username.toLowerCase().trim() === state.formData.emailAddress.toLowerCase().trim())

      return [condition1, condition2]
    })

    const timerValue = computed(() => {
      const { getTimerValue } = storeToRefs(authStore())
      return getTimerValue.value
    })

    const currentLanguage = computed((): string => localStorage.getItem('lang') || 'en')

    // validation functions
    const validateEmail = (): boolean => {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      const isMatch = state.formData.emailAddress.match(validRegex)

      return !!isMatch
    }

    const handleValidateEmail = (): void => {
      if (validateEmail()) {
        state.isShowEmailValidaton = false
      } else {
        state.isShowEmailValidaton = true
      }
    }

    const validatePassword = (): boolean => {
      return passwordValidationList.value.reduce((res, item) => res && item, true)
    }

    const validateUserName = (): boolean => {
      return userNameValidationList.value.reduce((res, item) => res && item, true)
    }

    // event handler functions, needs to be updated
    const handleOnPasswordInputFocus = (): void => {
      // handleValidateEmail();
      // if (validateEmail()) {
      state.isShowPasswordValidation = true
      // }
    }

    const handleOnPasswordInputBlur = (): void => {
      state.isShowPasswordValidation = false
    }

    const handleOnUserNameInputFocus = (): void => {
      state.isShowUsernameValidation = true
    }

    const handleOnUserNameInputBlur = (): void => {
      state.isShowUsernameValidation = false
    }

    const handleClickContinueButton = (): void => {
      state.currentPage = state.PAGE_TYPE.SIGNUP_FORM
    }

    const goSignInPage = (): void => {
      emit('switchAuthDialog', 'login')
      emit('setSignInForm', state.formData)
    }

    const registerSuccess = async () => {
      if (success.value) {
        await dispatchUserProfile()
        await dispatchUserBalance()
        await dispatchSocketConnect()
        await dispatchCurrencyList()
        setAuthDialogVisible(false)
        setNickNameDialogVisible(true)
        const toast = useToast()
        toast.success(t('signup.submit_result.success_text'), {
          timeout: 3000,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: false,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: SuccessIcon,
          rtl: false,
        })

        // 数据埋点
        AdjustClass.getInstance().adjustTrackEvent({
          key: 'REGISTER',
          value: userInfo.value.id.toString(),
          params: '',
        })
      } else {
        if (
          errMessage.value == 'The account you entered has been used by someone else, please input again' ||
          errMessage.value == 'The account number you have entered has been used by someone else, please re-enter'
        ) {
          state.currentPage = state.PAGE_TYPE.ALREADY_REGISTERED
        } else {
          const toast = useToast()
          toast.success(errMessage.value, {
            timeout: 3000,
            closeOnClick: false,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            draggable: false,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: WarningIcon,
            rtl: false,
          })
        }
      }
    }
    // 打开人机校验
    const showGrecaptchaDrawer = (event: any) => {
      // 不是回车键不触发 event.keyCode判断是不是软键盘触发
      if (event.keyCode !== undefined && event.keyCode !== 13) return
      //关闭手机软键盘
      document.activeElement.blur()

      if (!validateEmail()) {
        state.isShowEmailValidaton = true
        return
      }

      if (!validatePassword()) {
        state.isShowPasswordValidation = true
        return
      }

      if (!state.formData.isAgreed) {
        const toast = useToast()
        toast.success(t('signup.formPage.agree_alert_text'), {
          timeout: 3000,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: false,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: WarningIcon,
          rtl: false,
        })
        return
      }
      state.grecaptchaDrawer = true
    }

    // handle form submit  登录提交
    const handleSignupFormSubmit = async (event) => {
      // // 不是回车键不触发 event.keyCode判断是不是软键盘触发
      if (event.keyCode !== undefined && event.keyCode !== 13) return;
      if (event.keyCode !== undefined && event.keyCode !== 13) return;
      //关闭手机软键盘
      document.activeElement.blur();

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
          rtl: false
        });
        return;
      }
      state.loading = true
      await dispatchSignUp({
        uid: state.registerConfig.model != 2 ? state.formData.emailAddress : state.formData.phone,
        password: state.formData.password,
        referral_code: state.formData.promoCode.trim().replace(/\s+/g, ' '),
        browser: '',
        device: '',
        model: '',
        brand: '',
        imei: '',
        code: state.formData.code,
      })
      state.loading = false
      await registerSuccess()
      if (!localStorage.getItem(userInfo.value.name)) {
        localStorage.setItem(userInfo.value.name, '0')
      } else {
        localStorage.setItem(userInfo.value.name, '1')
      }
      if (route.query.code) {
        funcUrlDel()
      }
    }
    // 带有邀请码进来注册完后去掉url上的参数
    const funcUrlDel = () => {
      let url = window.location.href
      if (url.indexOf('?') != -1) {
        url = url.replace(/(\?|#)[^'"]*/, '')
        window.history.pushState({}, '0', url)
      }
    }

    const goRegisterPage = (): void => {
      state.currentPage = state.PAGE_TYPE.SIGNUP_FORM
    }

    const handleOnEmailInputBlur = (e: any): void => {
      handleValidateEmail()
      state.formData.emailAddress = e.target.value.replace(/([^@.])[\s~`!#$%^&*()_+=[\]{};:"<>?/,]/g, '$1')
      state.isShowEmailValidaton = false
      setTimeout(() => {
        state.mailCardHeight = 0
      }, 100)
    }

    const handleEmailChange = (e: any) => {
      state.formData.emailAddress = e.target.value.replace(/([^@.])[\s~`!#$%^&*()_+=[\]{};:"<>?/,]/g, '$1')
      handleValidateEmail()
      if (state.formData.emailAddress.includes('@')) {
        if (!state.formData.emailAddress.split('@')[1].charAt(0)) {
          state.emailFormat = state.emailCollection
          state.mailCardHeight = 220
          return
        } else {
          // 查找包含符合的字符串
          const filteredEmails = state.emailCollection.filter(email => email.includes(state.formData.emailAddress.split('@')[1]) && email !== state.formData.emailAddress.split('@')[1]);
          if (filteredEmails[0]) {
            state.emailFormat = [filteredEmails[0]]
            state.mailCardHeight = 220
          } else {
            state.emailFormat = []
            state.mailCardHeight = 0
          }
        }
      } else {
        setTimeout(() => {
          state.mailCardHeight = 0
        }, 100)
      }
    }

    const handleEmailFocus = () => {
      handleValidateEmail()
      if (state.formData.emailAddress.includes('@')) {
        if (!state.formData.emailAddress.split('@')[1].charAt(0)) {
          state.emailFormat = state.emailCollection
          state.mailCardHeight = 220
          return
        } else {
          // 查找包含符合的字符串
          const filteredEmails = state.emailCollection.filter(email => email.includes(state.formData.emailAddress.split('@')[1]) && email !== state.formData.emailAddress.split('@')[1]);
          if (filteredEmails[0]) {
            state.emailFormat = [filteredEmails[0]]
            state.mailCardHeight = 220
          } else {
            state.emailFormat = []
            state.mailCardHeight = 0
          }
        }
      }
    }

    const mergeEmail = (mail: string) => {
      state.formData.emailAddress = state.formData.emailAddress.split('@')[0] + mail
      setTimeout(() => {
        state.mailCardHeight = 0
      }, 100)
    }

    //手机区号
    const mergePhone = (code: string) => {
      state.formData.areaCode = '+' + code
      state.showPhoneAreaCode = false
    }

    const cancelConfirm = () => {
      setAuthDialogVisible(false)
    }

    onMounted(async () => {
      console.log('promo code::::::::::::::::::::', route.query.code, state.grecaptchaDrawer)
      // 带有邀请注册码的自动填入，并且邀请注册码输入框不让填写
      state.formData.promoCode = route.query.code ? route.query.code.toString() : ''
      if (route.query.code) {
        state.promoCodeDisabled = true
      }
      getRegisterConfig()
    })

    // 获取注册配置
    const getRegisterConfig = () => {
      network
        .request({
          url: NETWORK.LOGIN.REGISTER_CONFIG,
          method: 'GET',
          data: {},
        })
        .then((res: any) => {
          if (res.code === 200) {
            state.registerConfig = res.data
          }
        })
    }

    const router = useRouter()

    const goPrivatePolicy = async () => {
      await router.push({ name: 'About_US', query: { index: 1 } })
      setAuthDialogVisible(false)
    }

    const facebookRegister = () => {
      AdjustClass.getInstance().adjustTrackEvent({
        key: 'FB_REGISTER',
        value: userInfo.value.id.toString(),
        params: '',
      })
    }

    const gooleRegister = () => {
      AdjustClass.getInstance().adjustTrackEvent({
        key: 'GOOGLE_REGISTER',
        value: userInfo.value.id.toString(),
        params: '',
      })
    }

    const loginState = async (response: any) => {
      if (response.access_token) {
        const params = {
          id_token: response.access_token,
          type: 2,
        }
        await dispatchQuickRegister(params)
        await registerSuccess()
      }
    }

    // 全局 window 对象
    const globalWindow: any = window

    // 接受android傳遞的token - google 登录模拟
    globalWindow.googleLogin = async (token: string) => {
      const elLoading = ElLoading.service({
        lock: true,
        text: '',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'top-loading',
      })
      if (token) {
        await loginOrRegister(token, state.indexValue, state.typeValue)
        await registerSuccess()
        elLoading.close()
        loginType(state.indexValue)
      } else {
        const toast = useToast()
        toast.error(t('login.submit_result.err_text'), {
          timeout: 3000,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: false,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: WarningIcon,
          rtl: false,
        })
        elLoading.close()
      }
    }
    // 接受android傳遞的token  - facebook 登录模拟
    globalWindow.fbrLogin = async (token: string) => {
      const elLoading = ElLoading.service({
        lock: true,
        text: '',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'top-loading',
      })
      if (token) {
        await loginOrRegister(token, state.indexValue, state.typeValue)
        await registerSuccess()
        elLoading.close()
        loginType(state.indexValue)
      } else {
        const toast = useToast()
        toast.error(t('login.submit_result.err_text'), {
          timeout: 3000,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: false,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: WarningIcon,
          rtl: false,
        })
        elLoading.close()
      }
    }

    // 一键注册
    const onSignInSuccessGoogle = async (value: string) => {
      // const elLoading = ElLoading.service({ lock: true, text: '', background: 'rgba(0, 0, 0, 0.7)', customClass: 'top-loading' });
      try {
        if (AdjustClass.getInstance().isMobileWebview) {
          state.indexValue = value
          state.typeValue = 'register'
          // 啟動android原生登錄流程
          if (value === 'google') {
            globalWindow['AndroidWebView'].googleLogin()
          }
          if (value === 'facebook') {
            globalWindow['AndroidWebView'].facebookLogin()
          }
        } else {
          await loginWithSocialMedia(value, 'register')
          await registerSuccess()
          loginType(value)
        }
      } catch (err) {
        console.error(err)
      } finally {
        // elLoading.close();
      }
    }
    // 倒计时
    const countdownTime = computed(() => {
      return timer.minutes.value.toString().padStart(1, '0') != '0'
        ? timer.minutes.value.toString().padStart(1, '0') * 60 + timer.seconds.value.toString().padStart(2, '0') * 1
        : timer.seconds.value.toString().padStart(2, '0')
    })
    //发送验证码
    const sendingCode = () => {
      if (countdownTime.value != 0) return
      let data = {
        type: state.registerConfig.model != 2 ? 2 : 1,
        value: state.registerConfig.model != 2 ? state.formData.emailAddress : state.formData.phone,
      }
      network
        .request({
          url: NETWORK.LOGIN.VERIFY_SEND,
          method: 'POST',
          data,
        })
        .then((res: any) => {
          if (res.code === 200) {
            const time = new Date()
            time.setSeconds(time.getSeconds() + res.data.remaining_time)
            timer.restart(Number(time))
          }
        })
    }

    return {
      t,
      timer,
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
      goSignInPage,
      handleSignupFormSubmit,
      showPassword,
      goRegisterPage,
      handleEmailChange,
      handleEmailFocus,
      mergeEmail,
      mergePhone,
      cancelConfirm,
      goPrivatePolicy,
      registerSuccess,
      onSignInSuccessGoogle,
      sendingCode,
      countdownTime,
      showGrecaptchaDrawer,
    }
  },
})

export default MSignup
</script>

<template>
  <div class="m-signup-container px-6">
    <div class="my-15 d-flex justify-center align-center">
      <img src="@/assets/public/image/logo_public_04.png" width="86" />
      <div class="ml-2">
        <div class="text-800-16 white">
          {{ t('signup.formPage.header.titleLine1') }}
        </div>
        <div class="text-900-20 white">
          {{ t('signup.formPage.header.titleLine2') }}
        </div>
      </div>
    </div>
    <!-- S 表单 -->
    <v-form @submit.prevent v-if="currentPage === PAGE_TYPE.SIGNUP_FORM" class="full-width">
      <v-row class="mt-1" v-if="registerConfig.model === 2">
        <v-col cols="4" class="relative" style="paddingright: 0">
          <v-text-field
            :label="'captcha'"
            class="form-textfield normal-textfield ma-0 m-signup-promo"
            variant="solo"
            density="comfortable"
            v-model="formData.areaCode"
            @click="showPhoneAreaCode = !showPhoneAreaCode"
          />
          <div class="m-register-mail-card m-register-phone-card" v-if="showPhoneAreaCode">
            <v-list theme="dark" style="padding: 0 8px" bg-color="#15161c">
              <v-list-item class="text-600-12 white" value="52" @click="mergePhone('52')">+52</v-list-item>
              <!-- <v-list-item
                class="text-600-12 white"
                value="86"
                @click="mergePhone('852')"
                >+852</v-list-item
              > -->
            </v-list>
          </div>
        </v-col>
        <v-col cols="8">
          <v-text-field :label="'Enter phone number'" class="form-textfield normal-textfield ma-0 m-signup-promo" variant="solo" density="comfortable" v-model="formData.phone" />
        </v-col>
      </v-row>
      <!-- 手机号 -->
      <div class="relative mt-10 pa-0" v-else>
        <v-text-field
          :label="t('signup.formPage.emailAddress')"
          class="form-textfield dark-textfield ma-0 m-text-field m-signup-email"
          variant="solo"
          density="comfortable"
          v-model="formData.emailAddress"
          :onblur="handleOnEmailInputBlur"
          @input="handleEmailChange"
          :onfocus="handleEmailFocus"
          @keypress="handleSignupFormSubmit"
        />
        <ValidationBox v-if="isShowEmailValidaton" :title="t(`signup.formPage.validation.email.${formData.emailAddress.length ? 'title2' : 'title'}`)" :withCautionIcon="true" />
        <div class="m-register-mail-card" :style="{ 'max-height': mailCardHeight + 'px' }">
          <v-list theme="dark" bg-color="#15161c">
            <!-- <v-list-item class="text-600-12 white" value="gmail" @click="mergeEmail('@gmail.com')"> {{ emailPartName }}@gmail.com </v-list-item>
            <v-list-item class="text-600-12 white" value="hotmail" @click="mergeEmail('@hotmail.com')">{{ emailPartName }}@hotmail.com</v-list-item>
            <v-list-item class="text-600-12 white" value="yahoo" @click="mergeEmail('@yahoo.com')">{{ emailPartName }}@yahoo.com</v-list-item>
            <v-list-item class="text-600-12 white" value="icloud" @click="mergeEmail('@icloud.com')">{{ emailPartName }}@icloud.com</v-list-item>
            <v-list-item class="text-600-12 white" value="outlook" @click="mergeEmail('@outlook.com')">{{ emailPartName }}@outlook.com</v-list-item> -->
            <v-list-item v-for="item in emailFormat" :key="item" class="text-600-12 white" :value="`@${item}`" @click="mergeEmail(`@${item}`)">{{ emailPartName }}@{{ item }}</v-list-item>
          </v-list>
        </div>
      </div>
      <!-- 邮箱 / -->

      <v-row v-if="registerConfig.is_verify" class="mt-1">
        <v-col cols="8">
          <v-text-field :label="'captcha'" class="form-textfield normal-textfield ma-0 m-signup-promo" variant="solo" density="comfortable" v-model="formData.code" />
        </v-col>
        <v-col cols="4">
          <v-btn :class="countdownTime == 0 ? 'm-signup-btn' : 'm-signup-disabled-btn'" width="100%" height="40px" :loading="loading" :onclick="sendingCode">
            {{ countdownTime == 0 ? 'SENDING' : countdownTime }}
          </v-btn>
        </v-col>
      </v-row>
      <!-- 验证码 -->
      <div class="relative pa-0 mt-2">
        <v-text-field
          :label="t('signup.formPage.password')"
          class="form-textfield dark-textfield ma-0 m-signup-password"
          variant="solo"
          density="comfortable"
          :type="isShowPassword ? 'text' : 'password'"
          v-model="formData.password"
          :onfocus="handleOnPasswordInputFocus"
          :onblur="handleOnPasswordInputBlur"
          @keypress="handleSignupFormSubmit"
        />
        <div v-if="isShowPassword" @click="showPassword" class="m-password-icon">
          <img src="@/assets/public/svg/icon_public_07.svg" class="m-disable-password" width="20" />
        </div>
        <div v-else @click="showPassword" class="m-password-icon">
          <img src="@/assets/public/svg/icon_public_06.svg" class="m-disable-password" width="20" />
        </div>
        <ValidationBox v-if="isShowPasswordValidation" :descriptionList="passwordValidationStrList" :validationList="passwordValidationList" />
      </div>
      <!-- 密码 / -->

      <v-row class="mt-1">
        <v-text-field
          :label="t('signup.formPage.promoCode')"
          class="form-textfield dark-textfield m-signup-promo"
          variant="solo"
          density="comfortable"
          v-model="formData.promoCode"
          :disabled="promoCodeDisabled"
          @keypress="handleSignupFormSubmit"
        />
      </v-row>
      <!-- 邀请码 / -->

      <div class="mt-2" style="display: flex; align-items: center; height: 46px">
        <v-checkbox v-model="formData.isAgreed" hide-details icon class="m-agreement-checkbox" style="margin-bottom: 20px" />
        <p class="text-600-12 gray ml-1">
          {{ t('signup.formPage.agree.prefix') }}
          <span class="white pointer" @click="goPrivatePolicy">
            {{ t('signup.formPage.agree.bold') }}
          </span>
          {{ t('signup.formPage.agree.suffix') }}
        </p>
      </div>
      <v-row>
        <v-btn class="mt-8 mx-3" :class="isFormDataReady ? 'm-signup-btn' : 'm-signup-disabled-btn'" width="94%" height="48px" :onclick="handleSignupFormSubmit">
          <LoadingBtn v-if="loading"></LoadingBtn>
          <div v-else>
            {{ t('signup.formPage.button') }}
          </div>
        </v-btn>
      </v-row>
      <v-row class="mt-6">
        <p class="m-divide-text">
          {{ t('signup.formPage.divider') }}
        </p>
        <v-divider class="mx-10" style="border: 1px solid #414968 !important" />
      </v-row>
      <v-row class="mt-6 m-justify-content">
        <v-col cols="4">
          <div class="d-flex justify-space-around bg-surface-variant social-icon-wrapper">
            <v-sheet v-for="(item, index) in socialIconList" :key="index" color="#131828" class="rounded">
              <v-btn color="grey-darken-4" class="m-social-icon-button" icon="" height="36px" width="36px" @click="onSignInSuccessGoogle(item.value)">
                <img :src="item.url" width="36" />
              </v-btn>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </v-form>
    <!-- E 表单 -->

    <!-- Confirm cancel. 确认取消 -->
    <div v-if="currentPage == PAGE_TYPE.CONFIRM_CANCEL" class="full-width">
      <v-row style="margin-top: 100px" class="mx-4">
        <p class="text-700-20 white center full-width">
          {{ t('signup.confirmCancelPage.title') }}
        </p>
      </v-row>
      <v-row class="mt-7">
        <p class="text-400-14 slate-gray center full-width">
          {{ t('signup.confirmCancelPage.description') }}
        </p>
      </v-row>
      <v-row style="margin-top: 100px">
        <v-btn class="ma-3 button-bright m-signup-continue-btn" width="94%" height="48px" @click="handleClickContinueButton">
          {{ t('signup.confirmCancelPage.continue') }}
        </v-btn>
      </v-row>
      <v-row class="mt-4">
        <v-btn class="ma-3 button-dark m-signup-cancel-btn" width="94%" height="48px" @click="cancelConfirm">
          {{ t('signup.confirmCancelPage.cancel') }}
        </v-btn>
      </v-row>
    </div>

    <!-- Already registered notification 已经注册过提醒 -->
    <div v-if="currentPage == PAGE_TYPE.ALREADY_REGISTERED" class="full-width">
      <v-row>
        <p class="m-label-text-md slate-gray center full-width px-8">
          {{ t('signup.alreadyRegisterPage.title') }}
        </p>
      </v-row>
      <v-row style="margin-top: 126px">
        <v-btn class="ma-3 button-bright m-signup-confirm-btn" width="-webkit-fill-available" height="48px" autocapitalize="off" @click="goSignInPage">
          {{ t('signup.alreadyRegisterPage.confirm') }}
        </v-btn>
      </v-row>
      <v-row class="mt-4">
        <v-btn class="ma-3 button-dark m-signup-cancel-btn" width="-webkit-fill-available" height="48px" autocapitalize="off" @click="goRegisterPage">
          {{ t('signup.alreadyRegisterPage.cancel') }}
        </v-btn>
      </v-row>
    </div>
    <!-- <grecaptchaDrawer v-if="grecaptchaDrawer" v-model="grecaptchaDrawer" @grecaptchaSuccess="handleSignupFormSubmit"></grecaptchaDrawer> -->
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 600px) {
  .v-field__field {
    color: var(--sec-text-7782-aa, #7782aa);
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 40px !important;

    input {
      padding-top: 6px !important;
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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

  .v-list-item--density-default.v-list-item--one-line {
    min-height: 42px !important;
    background: #15161c;
  }
}

.m-label-text-md {
  margin-top: 80px;
  font-weight: 600;
  font-size: 16px;
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
}

:deep .v-field__field {
  color: var(--sec-text-7782-aa, #7782aa);
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 40px !important;
}

:deep.m-signup-continue-btn {
  .v-btn__content {
    color: var(--text-dark-black, white);
    text-align: center;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
}

:deep.m-signup-confirm-btn {
  .v-btn__content {
    text-align: center;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

:deep.m-signup-cancel-btn {
  .v-btn__content {
    color: var(--text-dark-black, #fff);
    text-align: center;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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

.m-register-phone-card {
  padding-left: 12px;
  top: 50px;
}

:deep.m-signup-btn {
  background: #009b3a;
  color: white;
  border-radius: 8px !important;

  .v-btn__content {
    text-align: center;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-signup-btn:hover:enabled {
  background: #009b3a;
}

:deep.m-signup-disabled-btn {
  border-radius: 8px;
  background: var(--Secondary-Button, #23262f);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

  .v-btn__content {
    color: #ffffff;
    text-align: center;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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
  width: 70px;
  height: 40px;
}

.m-disable-password {
  position: absolute;
  top: 16px;
  right: 10px;
  cursor: pointer;
}

// mobile dialog contaier
:deep.m-signup-container {
  height: calc(100vh - 50px);
  width: 100%;
  background: $color_1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 120px;

  .v-field--variant-solo {
    background: transparent !important;
  }

  .form-textfield div.v-field__field {
    background: #15161c;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.m-justify-content {
  justify-content: center;
}

:deep.m-signup-container::-webkit-scrollbar {
  width: 0px;
}

:deep.m-display-name-input {
  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

// divider
:deep.m-divide-text {
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-align: right;
}

.signin-text2 {
  cursor: pointer;
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #009b3a;
}

// agreement
.agreement-text {
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-top: 13px;
  color: #7782aa;
}

:deep.m-agreement-checkbox {
  width: fit-content;
  flex-shrink: 0;

  .v-input__control {
    margin-right: 5px;
  }
  .v-selection-control__wrapper {
    width: 20px !important;
    height: 20px !important;
  }

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

:deep.m-signup-email {
  transform-origin: top !important;

  .v-field__field {
    input {
      padding-top: 2px !important;
    }

    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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

:deep.m-signup-password {
  transform-origin: top !important;

  .v-field__field {
    input {
      padding-top: 2px !important;
      padding-right: 30px !important;
    }

    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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

:deep.m-signup-promo {
  transform-origin: top !important;

  .v-field__field {
    background: #15161c;

    input {
      padding-top: 2px !important;
    }

    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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
