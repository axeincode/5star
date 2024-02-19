<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import ValidationBox from '@/components/Signup/ValidationBox.vue';
import ExistValidationBox from './../ExistValidationBox.vue';
import Notification from "@/components/global/notification/index.vue";
import { authStore } from "@/store/auth";
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useToast } from "vue-toastification";

const { t } = useI18n();
const { width } = useDisplay();
const emit = defineEmits<{ (e: 'userDialogHide'): void, (e: 'submitPassword', newPassword: string): void }>()
const { dispatchUpdatePassword } = authStore();

const currentPassword = ref<string>("");
const newPassword = ref<string>("");
const repeatPassword = ref<string>("");
const isShowPasswordValidation = ref<boolean>(false);
const isExistValidation = ref<boolean>(false);
const passwordValidationStrList = ref<Array<string>>([
    t('signup.formPage.validation.password.items[0]'),
])
const title = ref<string>(t('account.edit_password_text'));
const isShowCurrentPassword = ref<boolean>(false);
const isShowNewPassword = ref<boolean>(false);
const isShowRepeatPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);
const notificationText = ref<string>('');

const mobileWidth = computed(() => {
    return width.value
})

const passwordValidationList = computed((): boolean[] => {
    // 8-30 characters in length
    const condition1 = newPassword.value.length <= 30 && newPassword.value.length >= 8;

    return [condition1];
})

const success = computed((): boolean => {
    const { getSuccess } = storeToRefs(authStore());
    return getSuccess.value
})

const errMessage = computed((): string => {
    const { getErrMessage } = storeToRefs(authStore());
    return getErrMessage.value
})

const validatePassword = (): boolean => {
    return passwordValidationList.value.reduce((res, item) => res && item, true) && newPassword.value == repeatPassword.value
}

const handleCurrentPasswordInputBlur = (): void => {

}

const handleNewPasswordInputFocus = (): void => {
    isShowPasswordValidation.value = true;
}

const handleNewPasswordInputBlur = (): void => {
    isShowPasswordValidation.value = false;
}

const handleRepeatPasswordInputFocus = (): void => {
    if (newPassword.value != repeatPassword.value) {
        isExistValidation.value = true;
    } else {
        isExistValidation.value = false;
    }
}

const handleRepeatPasswordInputBlur = (): void => {
    isExistValidation.value = false;
}

const showCurrentPassword = () => {
    isShowCurrentPassword.value = !isShowCurrentPassword.value;
}

const showNewPassword = () => {
    isShowNewPassword.value = !isShowNewPassword.value;
}

const showRepeatPassword = () => {
    isShowRepeatPassword.value = !isShowRepeatPassword.value;
}

const submitPassword = async () => {
    loading.value = true;
    await dispatchUpdatePassword({
        now_password: currentPassword.value,
        new_password: newPassword.value
    })
    if (success.value) {
        notificationShow.value = !notificationShow.value;
        checkIcon.value = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
        notificationText.value = "Password updated successfully!"
        if (notificationShow.value) {
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
                icon: SuccessIcon,
                rtl: false,
            });
        }
        setTimeout(() => {
            loading.value = false;
            emit("submitPassword", newPassword.value);
            emit('userDialogHide')
        }, 2000)
    } else {
        notificationShow.value = !notificationShow.value;
        checkIcon.value = new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href
        notificationText.value = errMessage.value;
        if (notificationShow.value) {
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
        }
        loading.value = false;
    }
}
</script>

<template>
    <div class="m-user-container">
        <div class="mt-8 text-700-14 text-center white">{{ title }}</div>
        <v-row class="mt-4 relative" :class="mobileWidth < 600 ? 'mx-2' : 'mx-10'">
            <v-text-field :label="t('account.password.current_text')" class="form-textfield dark-textfield m-account-password-edit-current" variant="solo"
                density="comfortable" v-model="currentPassword" :type="isShowCurrentPassword ? 'text' : 'password'"
                :onblur="handleCurrentPasswordInputBlur" />
            <img v-if="isShowCurrentPassword" src="@/assets/public/svg/icon_public_07.svg" class="m-disable-password"
                @click="showCurrentPassword" width="16" />
            <img v-else src="@/assets/public/svg/icon_public_06.svg" class="m-disable-password" @click="showCurrentPassword"
                width="16" />
        </v-row>
        <v-row class="mt-4 relative" :class="mobileWidth < 600 ? 'mx-2' : 'mx-10'">
            <v-text-field :label="t('account.password.new_text')" class="form-textfield dark-textfield m-account-password-edit-new" variant="solo"
                density="comfortable" v-model="newPassword" :onfocus="handleNewPasswordInputFocus"
                :type="isShowNewPassword ? 'text' : 'password'" :onblur="handleNewPasswordInputBlur" />
            <img v-if="isShowNewPassword" src="@/assets/public/svg/icon_public_07.svg" class="m-disable-password"
                @click="showNewPassword" width="16" />
            <img v-else src="@/assets/public/svg/icon_public_06.svg" class="m-disable-password" @click="showNewPassword"
                width="16" />
            <ValidationBox v-if="isShowPasswordValidation" :title="t('signup.displayNamePage.validation.username.title')"
                :descriptionList="passwordValidationStrList" :validationList="passwordValidationList" />
        </v-row>
        <v-row class="mt-4 relative" :class="mobileWidth < 600 ? 'mx-2' : 'mx-10'">
            <v-text-field :label="t('account.password.repeat_text')" class="form-textfield dark-textfield m-account-password-edit-repeat" variant="solo"
                density="comfortable" v-model="repeatPassword" :onfocus="handleRepeatPasswordInputFocus"
                :type="isShowRepeatPassword ? 'text' : 'password'" :onblur="handleRepeatPasswordInputBlur" />
            <img v-if="isShowRepeatPassword" src="@/assets/public/svg/icon_public_07.svg" class="m-disable-password"
                @click="showRepeatPassword" width="16" />
            <img v-else src="@/assets/public/svg/icon_public_06.svg" class="m-disable-password" @click="showRepeatPassword"
                width="16" />
            <ExistValidationBox v-if="isExistValidation" :title="t('account.repeat_validation_text')"
                :withCautionIcon="true" />
        </v-row>
        <v-row class="mt-4" :class="mobileWidth < 600 ? 'mx-2' : 'mx-10'">
            <v-btn class="ma-3 mt-8 button-bright text-none m-account-dialog-save-btn" width="-webkit-fill-available"
                :loading="loading" height="48" :disabled="!validatePassword()" @click="submitPassword">
                {{ t('account.save_text') }}
            </v-btn>
        </v-row>
        <v-btn class="m-account-dialog-close-btn" icon="true" @click="emit('userDialogHide')" width="30" height="30">
            <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
        </v-btn>
        <!-- <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" /> -->
    </div>
</template>

<style lang="scss">
// account dialog container
.m-user-container {
    .form-textfield div.v-field__field {
        box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
    }
    border-radius: 8px;
    background: #1D2027;
    height: 422px;
    position: relative;
    z-index: 102;

    .v-btn--disabled {
        background-color: $agent_color_3 !important;
        color: white !important;
    }

    .m-account-dialog-close-btn {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 6px;
        right: 6px;
    }

    .m-account-dialog-save-btn {
        .v-btn__content {
            text-align: center;
            font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
    }
    
    .m-disable-password {
        top: 39%!important;
        right: 34px!important;
    }
}

.m-user-dialog-header {
    width: 280px;
    height: 74px;
    flex-shrink: 0;
    border-radius: 16px 16px 0px 0px;
    background: #1D2027;
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
}

.m-account-password-edit-current {
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

.m-account-password-edit-new {
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

.m-account-password-edit-repeat {
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
</style>