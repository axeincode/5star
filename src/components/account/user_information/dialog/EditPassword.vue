<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import ValidationBox from '@/components/Signup/ValidationBox.vue';
import ExistValidationBox from './ExistValidationBox.vue';
import Notification from "@/components/global/notification/index.vue";
import { authStore } from "@/store/auth";
import Header from './Header.vue';
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
    <div class="user-container">
        <Header @userDialogHide="emit('userDialogHide')" :title="title" />
        <v-row class="mt-4 relative" :class="mobileWidth < 600 ? 'mx-2' : 'mx-10'">
            <v-text-field :label="t('account.password.current_text')" class="form-textfield dark-textfield" variant="solo"
                density="comfortable" v-model="currentPassword" :type="isShowCurrentPassword ? 'text' : 'password'"
                :onblur="handleCurrentPasswordInputBlur" />
            <img v-if="isShowCurrentPassword" src="@/assets/public/svg/icon_public_07.svg" class="disable-password"
                @click="showCurrentPassword" />
            <img v-else src="@/assets/public/svg/icon_public_06.svg" class="disable-password"
                @click="showCurrentPassword" />
        </v-row>
        <v-row class="mt-4 relative" :class="mobileWidth < 600 ? 'mx-2' : 'mx-10'">
            <v-text-field :label="t('account.password.new_text')" class="form-textfield dark-textfield" variant="solo"
                density="comfortable" v-model="newPassword" :onfocus="handleNewPasswordInputFocus"
                :type="isShowNewPassword ? 'text' : 'password'" :onblur="handleNewPasswordInputBlur" />
            <img v-if="isShowNewPassword" src="@/assets/public/svg/icon_public_07.svg" class="disable-password"
                @click="showNewPassword" />
            <img v-else src="@/assets/public/svg/icon_public_06.svg" class="disable-password" @click="showNewPassword" />
            <ValidationBox v-if="isShowPasswordValidation" :title="t('signup.displayNamePage.validation.username.title')"
                :descriptionList="passwordValidationStrList" :validationList="passwordValidationList" />
        </v-row>
        <v-row class="mt-4 relative" :class="mobileWidth < 600 ? 'mx-2' : 'mx-10'">
            <v-text-field :label="t('account.password.repeat_text')" class="form-textfield dark-textfield" variant="solo"
                density="comfortable" v-model="repeatPassword" :onfocus="handleRepeatPasswordInputFocus"
                :type="isShowRepeatPassword ? 'text' : 'password'" :onblur="handleRepeatPasswordInputBlur" />
            <img v-if="isShowRepeatPassword" src="@/assets/public/svg/icon_public_07.svg" class="disable-password"
                @click="showRepeatPassword" />
            <img v-else src="@/assets/public/svg/icon_public_06.svg" class="disable-password" @click="showRepeatPassword" />
            <ExistValidationBox v-if="isExistValidation" :title="t('account.repeat_validation_text')"
                :withCautionIcon="true" />
        </v-row>
        <v-row class="mt-4" :class="mobileWidth < 600 ? 'mx-2' : 'mx-10'">
            <v-btn class="ma-3 mt-8 button-bright text-none" width="-webkit-fill-available" :loading="loading"
                :height="mobileWidth < 600 ? '46px' : '60px'" :disabled="!validatePassword()" @click="submitPassword">
                {{ t('account.save_text') }}
            </v-btn>
        </v-row>
        <!-- <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" /> -->
    </div>
</template>

<style lang="scss">
// account dialog container
.user-container {
    .form-textfield div.v-field__field {
        box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
    }
    background-color: #2a283b;
    border-radius: 16px !important;
    height: 470px;

    .v-btn--disabled {
        background-color: $agent_color_3 !important;
        color: white !important;
    }
}
</style>