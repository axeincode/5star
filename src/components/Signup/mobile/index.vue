<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import ValidationBox from '@/components/Signup/ValidationBox.vue';
import SignupHeader from '@/components/Signup/mobile/Header.vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import Notification from "@/components/global/notification/index.vue";
import { authStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

const MSignup = defineComponent({
    components: {
        ValidationBox,
        SignupHeader,
        Notification
    },
    emits: ["close", "switch"],
    setup(props, { emit }) {
        // translation
        const { t } = useI18n();
        const { name } = useDisplay();
        const { dispatchSignUp } = authStore();
        const { dispatchUserProfile } = authStore();

        // initiate component state
        const state = reactive({
            currentPage: 0,  // default signup form
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
                t('signup.formPage.validation.password.items[0]'),
                t('signup.formPage.validation.password.items[1]'),
                t('signup.formPage.validation.password.items[2]'),
                t('signup.formPage.validation.password.items[3]'),
            ],
            userNameValidationStrList: [
                t('signup.displayNamePage.validation.username.items[0]'),
                t('signup.displayNamePage.validation.username.items[1]'),
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
            loading: false,
            mailCardHeight: 0,
            emailPartName: "",
            notificationShow: false,
            checkIcon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
            notificationText: t('signup.submit_result.success_text'),
            closeBtnHeight: 0,
        });

        const showPassword = () => {
            state.isShowPassword = !state.isShowPassword
        }

        // computed variables
        const isFormDataReady = computed((): boolean =>
            validateEmail() && validatePassword() && state.formData.isAgreed
        )

        const mobileVersion = computed(() => {
            return name.value;
        })

        // flag when login successed
        const success = computed(() => {
            const { getSuccess } = storeToRefs(authStore());
            return getSuccess.value
        })

        // error message when login failed

        const errMessage = computed(() => {
            const { getErrMessage } = storeToRefs(authStore());
            return getErrMessage.value;
        })

        const passwordValidationList = computed((): boolean[] => {
            const password = state.formData.password;
            // 8-30 Characters in length
            const condition1 = password.length <= 30 && password.length >= 8;
            // Contains one upper and one lowercase character
            const condition2 = /[A-Z]/.test(password) && /[a-z]/.test(password);
            // Contains a number
            const condition3 = /\d/.test(password);
            // Contains Special Code
            const condition4 = /[~!@#$%&*()_-]/.test(password)

            return [condition1, condition2, condition3, condition4];
        })

        const userNameValidationList = computed((): boolean[] => {
            const username = state.userName;
            // 2-20 characters in length
            const condition1 = username.length <= 20 && username.length >= 2;
            // Nickname must not be like your email
            const condition2 = !(username.toLowerCase().trim() === state.formData.emailAddress.toLowerCase().trim());

            return [condition1, condition2];
        })

        const currentLanguage = computed((): string =>
            localStorage.getItem('lang') || 'en'
        )

        // validation functions
        const validateEmail = (): boolean => {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const isMatch = state.formData.emailAddress.match(validRegex);

            return !!isMatch;
        }

        const handleValidateEmail = (): void => {
            if (validateEmail()) {
                state.isShowEmailValidaton = false;
            } else {
                state.isShowEmailValidaton = true;
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
            handleValidateEmail();
            if (validateEmail()) {
                state.isShowPasswordValidation = true;
            }
        }

        const handleOnPasswordInputBlur = (): void => {
            state.isShowPasswordValidation = false;
        }

        const handleOnUserNameInputFocus = (): void => {
            state.isShowUsernameValidation = true;
        }

        const handleOnUserNameInputBlur = (): void => {
            state.isShowUsernameValidation = false;
        }

        const handleOnPromoCodeInputFocus = (): void => {
            handleValidateEmail();
        }

        const handleOnEmailInputBlur = (): void => {
            handleValidateEmail();
            setTimeout(() => {
                state.mailCardHeight = 0;
            }, 100)
        }

        const handleClickContinueButton = (): void => {
            state.currentPage = state.PAGE_TYPE.SIGNUP_FORM;
        }

        const handleClickConfirmButton = (): void => {
            state.currentPage = state.PAGE_TYPE.DISPLAY_NAME;
        }

        // handle form submit
        const handleSignupFormSubmit = async () => {
            // state.currentPage = state.PAGE_TYPE.DISPLAY_NAME;
            console.log('sign up form submit!');
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
                state.notificationShow = !state.notificationShow;
                state.checkIcon = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href;
                state.notificationText = t('signup.submit_result.success_text');
                setTimeout(() => {
                    emit("close");
                }, 1000)
            } else {
                state.notificationShow = !state.notificationShow;
                state.checkIcon = new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href;
                state.notificationText = errMessage.value;
            }
        }

        const handleUsernameSubmit = (): void => {
            console.log('user name submit!');
        }

        const closeDialog = (): void => {
            if (state.currentPage == state.PAGE_TYPE.SIGNUP_FORM) {
                state.currentPage = state.PAGE_TYPE.CONFIRM_CANCEL;
            } else {
                emit("close");
            }
        }

        const handleEmailChange = () => {
            // console.log("onchange")
            if (state.formData.emailAddress.includes("@")) {
                state.emailPartName = state.formData.emailAddress.split("@")[0];
                state.mailCardHeight = 220
            } else {
                setTimeout(() => {
                    state.mailCardHeight = 0;
                }, 100)
            }
        }

        const handleEmailFocus = () => {
            // console.log("onFocus")
            if (state.formData.emailAddress.includes("@")) {
                state.emailPartName = state.formData.emailAddress.split("@")[0];
                state.mailCardHeight = 220
            }
        }

        const mergeEmail = (mail: string) => {
            state.formData.emailAddress = state.formData.emailAddress.split("@")[0] + mail;
            setTimeout(() => {
                state.mailCardHeight = 0;
            }, 100)
        }

        onMounted(() => {
            state.closeBtnHeight = 613 - window.innerHeight + 2;
        })

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
            mergeEmail
        }
    },
})

export default MSignup
</script>

<template>
    <div class="m-signup-container">
        <SignupHeader v-if="currentPage !== PAGE_TYPE.DISPLAY_NAME" />
        <div class="m-signup-body px-6">

            <!-- SIGN UP FORM  -->
            <v-form v-if="currentPage === PAGE_TYPE.SIGNUP_FORM" ref="form" class="full-width">
                <div class="relative mt-10 pa-0">
                    <v-text-field :label="t('signup.formPage.emailAddress')" class="form-textfield dark-textfield ma-0"
                        variant="solo" density="comfortable" v-model="formData.emailAddress"
                        :onblur="handleOnEmailInputBlur" @input="handleEmailChange" :onfocus="handleEmailFocus" />
                    <ValidationBox v-if="isShowEmailValidaton"
                        :title="t(`signup.formPage.validation.email.${formData.emailAddress.length ? 'title2' : 'title'}`)"
                        :withCautionIcon="true" />
                    <div class="m-register-mail-card" :style="{ height: mailCardHeight + 'px' }">
                        <v-list theme="dark" bg-color="#211F31">
                            <v-list-item class="text-600-12 white" value="gmail" @click="mergeEmail('@gmail.com')">
                                {{ emailPartName }}@gmail.com
                            </v-list-item>
                            <v-list-item class="text-600-12 white" value="hotmail" @click="mergeEmail('@hotmail.com')">{{
                                emailPartName }}@hotmail.com</v-list-item>
                            <v-list-item class="text-600-12 white" value="yahoo" @click="mergeEmail('@yahoo.com')">{{
                                emailPartName }}@yahoo.com</v-list-item>
                            <v-list-item class="text-600-12 white" value="icloud" @click="mergeEmail('@icloud.com')">{{
                                emailPartName }}@icloud.com</v-list-item>
                            <v-list-item class="text-600-12 white" value="outlook" @click="mergeEmail('@outlook.com')">{{
                                emailPartName }}@outlook.com</v-list-item>
                        </v-list>
                    </div>
                </div>
                <v-row class="mt-2 relative">
                    <v-text-field :label="t('signup.formPage.password')" class="form-textfield dark-textfield"
                        variant="solo" density="comfortable" :type="isShowPassword ? 'text' : 'password'"
                        v-model="formData.password" :onfocus="handleOnPasswordInputFocus"
                        :onblur="handleOnPasswordInputBlur" />
                    <img v-if="isShowPassword" src="@/assets/public/svg/icon_public_07.svg" class="m-disable-password"
                        @click="showPassword" width="16" />
                    <img v-else src="@/assets/public/svg/icon_public_06.svg" class="m-disable-password"
                        @click="showPassword" width="16" />
                    <ValidationBox v-if="isShowPasswordValidation" :descriptionList="passwordValidationStrList"
                        :validationList="passwordValidationList" />
                </v-row>
                <v-row class="mt-2">
                    <v-text-field :label="t('signup.formPage.promoCode')" class="form-textfield normal-textfield"
                        variant="solo" density="comfortable" v-model="formData.promoCode"
                        :onfocus="handleOnPromoCodeInputFocus" />
                </v-row>
                <div class="mt-2" style="display: flex; align-items: center;">
                    <v-checkbox v-model="formData.isAgreed" hide-details icon class="m-agreement-checkbox" />
                    <p class="text-600-12 gray ml-1">
                        {{ t('signup.formPage.agree.prefix') }}
                        <span class="white pointer">
                            {{ t('signup.formPage.agree.bold') }}
                        </span>
                        {{ t('signup.formPage.agree.suffix') }}
                    </p>
                </div>
                <v-row>
                    <v-btn class="mt-8 mx-3 m-signup-btn" width="-webkit-fill-available" height="48px" :loading="loading"
                        :disabled="!isFormDataReady" :onclick="handleSignupFormSubmit">
                        {{ t('signup.formPage.button') }}
                    </v-btn>
                </v-row>
                <v-row class="mt-6">
                    <p class="m-divide-text">
                        {{ t('signup.formPage.divider') }}
                    </p>
                    <v-divider color="white" />
                </v-row>
                <v-row class="mt-6">
                    <v-col cols="8" offset="2">
                        <div class="d-flex justify-space-around bg-surface-variant social-icon-wrapper">
                            <v-sheet v-for="(item, index) in socialIconList" :key="index" color="#131828" class="rounded">
                                <v-btn color="grey-darken-4" class="m-social-icon-button" icon="" height="36px"
                                    width="36px">
                                    <img :src="item" width="36" />
                                </v-btn>
                            </v-sheet>
                        </div>
                    </v-col>
                </v-row>
            </v-form>

            <!-- Confirm cancel. -->
            <div v-if="currentPage == PAGE_TYPE.CONFIRM_CANCEL" class="full-width">
                <v-row style="margin-top: 100px;" class="mx-4">
                    <p class="text-700-20 white center full-width">
                        {{ t('signup.confirmCancelPage.title') }}
                    </p>
                </v-row>
                <v-row class="mt-7">
                    <p class="text-400-14 slate-gray center full-width">
                        {{ t('signup.confirmCancelPage.description') }}
                    </p>
                </v-row>
                <v-row style="margin-top: 100px;">
                    <v-btn class="ma-3 button-bright m-signup-continue-btn" width="-webkit-fill-available" height="48px"
                        @click="handleClickContinueButton">
                        {{ t('signup.confirmCancelPage.continue') }}
                    </v-btn>
                </v-row>
                <v-row class="mt-4">
                    <v-btn class="ma-3 button-dark m-signup-cancel-btn" width="-webkit-fill-available" height="48px"
                        @click="$emit('close')">
                        {{ t('signup.confirmCancelPage.cancel') }}
                    </v-btn>
                </v-row>
            </div>

            <!-- Already registered notification -->
            <div v-if="currentPage == PAGE_TYPE.ALREADY_REGISTERED" class="full-width">
                <v-row>
                    <p class="m-label-text-md slate-gray center full-width pl-12 pr-12">
                        {{ t('signup.alreadyRegisterPage.title') }}
                    </p>
                </v-row>
                <v-row style="margin-top: 126px;">
                    <v-btn class="ma-3 button-bright m-signup-confirm-btn" width="-webkit-fill-available" height="48px"
                        autocapitalize="off" @click="handleClickConfirmButton">
                        {{ t('signup.alreadyRegisterPage.confirm') }}
                    </v-btn>
                </v-row>
                <v-row class="mt-4">
                    <v-btn class="ma-3 button-dark m-signup-cancel-btn" width="-webkit-fill-available" height="48px"
                        autocapitalize="off">
                        {{ t('signup.alreadyRegisterPage.cancel') }}
                    </v-btn>
                </v-row>
            </div>

            <!-- Enter avatar and display name -->
            <div v-if="currentPage == PAGE_TYPE.DISPLAY_NAME" class="full-width">
                <v-row class="carousel-container ml-0">
                    <v-carousel height="400" show-arrows hide-delimiters class="carousel">
                        <template v-slot:prev="{ props }">
                            <v-btn class="button-carousel ma-2" variant="text" icon="mdi-chevron-left"
                                @click="props.onClick"></v-btn>
                        </template>
                        <template v-slot:next="{ props }">
                            <v-btn class="button-carousel ma-2" variant="text" icon="mdi-chevron-right"
                                @click="props.onClick"></v-btn>
                        </template>
                        <v-carousel-item v-for="(slide, i) in slides" :key="i">
                            <img src="@/assets/public/image/ua_public_01.png" width="123" style="margin-top: 20px;">
                        </v-carousel-item>
                    </v-carousel>
                </v-row>
                <v-row class="mt-4 mb-2">
                    <p class="text-700-16 white full-width center">
                        {{ t('signup.displayNamePage.title') }}
                    </p>
                </v-row>
                <v-row class="mt-4 relative">
                    <v-text-field :label="t('signup.displayNamePage.username')" class="form-textfield dark-textfield"
                        variant="solo" density="comfortable" v-model="userName" :onfocus="handleOnUserNameInputFocus"
                        :onblur="handleOnUserNameInputBlur" />
                    <ValidationBox v-if="isShowUsernameValidation"
                        :title="t('signup.displayNamePage.validation.username.title')"
                        :descriptionList="userNameValidationStrList" :validationList="userNameValidationList" />
                </v-row>
                <v-row>
                    <v-btn class="ma-3 mt-8 mb-8 button-bright m-signup-confirm-btn" width="-webkit-fill-available"
                        height="48px" :disabled="!validateUserName()" @click="$emit('close')">
                        {{ t('signup.displayNamePage.submit') }}
                    </v-btn>
                </v-row>
            </div>
        </div>
        <v-btn :class="currentPage == PAGE_TYPE.DISPLAY_NAME ? 'm-close-button-1' : 'm-close-button'" icon="true"
            @click="closeDialog" width="30" height="30" :style="{ top: closeBtnHeight + 'px' }">
            <img src="@/assets/public/svg/icon_public_10.svg" />
            <!-- <v-icon :color="currentPage === PAGE_TYPE.DISPLAY_NAME ? '#7782AA' : '#FFFFFF'">
                mdi-close
            </v-icon> -->
        </v-btn>
    </div>
    <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
</template>

<style lang="scss">
@media (max-width: 600px) {
    .v-field__field {
        color: var(--sec-text-7782-aa, #7782AA);
        font-family: "Inter";
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        height: 40px;

        input {
            padding-top: 10px !important;
            font-family: "Inter";
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }

        .v-field-label {
            font-family: "Inter";
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
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
    margin-top: 132px;
    font-weight: 600;
    font-size: 16px;
    font-family: "Inter";
}

.m-signup-continue-btn {
    .v-btn__content {
        color: var(--text-dark-black, #000);
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
    background: #211F31;
    width: 328px;
    border-radius: 16px;
    z-index: 200;
    overflow: hidden;
    transition: height 0.3s ease-out;
}

.m-signup-btn:disabled {
    background: #353652;
    cursor: default;
}

.m-signup-btn {
    background: #32CFEC;

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
    background: #0cb6fa;
}

button:active:enabled {
    transform: scale(0.95);
    filter: brightness(80%);
}

.m-disable-password {
    position: absolute;
    top: 28px;
    right: 27px;
    cursor: pointer;
}

// mobile dialog contaier
.m-signup-container {
    border-radius: 26px 26px 0px 0px;
    // background: linear-gradient(0deg, #F08734 0%, #C6428B 100%), #5904D9;
    position: absolute;
    bottom: 0;
    height: 613px;
    width: 100%;

    .v-field--variant-solo {
        background: transparent !important;
    }
}

// wrapper
.m-signup-body {
    border-radius: 26px 26px 0px 0px;
    background: var(--bg-2-e-274-c, #2E274C);
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 464px;
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
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #414968;
    position: relative;
    top: 12px;
    text-align: center;
    width: 120px;
    background-color: #2E274C;
    margin: auto;
    z-index: 1;
}

// social icon list component
.social-icon-wrapper {
    background-color: #2E274C !important;

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
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    text-align: right;
}

.signin-text2 {
    cursor: pointer;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 19px;
    color: #32CFEC;
}

// agreement
.agreement-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin-top: 13px;
    color: #7782AA;
}

.m-agreement-checkbox {
    i.v-icon {
        color: #211F31;
        background-color: #01983A;
        width: 16px;
        height: 16px;
        border-radius: 4px;
        margin-top: 4px;
    }

    i.mdi-checkbox-blank-outline {
        background-color: #211F31;
        box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
        border-radius: 4px;
    }
}

// carousel
.carousel-container {
    width: 100%;
}
</style>