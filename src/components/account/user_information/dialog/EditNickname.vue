
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
const emit = defineEmits<{ (e: 'userDialogHide'): void, (e: 'submitNickName', name: string): void }>()
const props = defineProps<{ email: string }>();
const { email } = toRefs(props);
const { width } = useDisplay();
const { dispatchUpdateUserInfo } = authStore();

const nickName = ref<string>("");
const isShowNicknameValidation = ref<boolean>(false);
const isExistValidation = ref<boolean>(false);
const loading = ref<boolean>(false);
const nickNameValidationStrList = ref<Array<string>>([
    t('signup.displayNamePage.validation.username.items[0]'),
    t('signup.displayNamePage.validation.username.items[1]'),
])
const title = ref<string>(t('account.edit_nick_name_text'))
const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);
const notificationText = ref<string>('');

const mobileWidth = computed(() => {
    return width.value
})

const nickNameValidationList = computed((): boolean[] => {
    // 2-20 characters in length
    const condition1 = nickName.value.length <= 20 && nickName.value.length >= 2;
    // Nickname must not be like your email
    const condition2 = !(nickName.value.toLowerCase().trim() === email.value.toLowerCase().trim());

    return [condition1, condition2];
})

const success = computed((): boolean => {
    const { getSuccess } = storeToRefs(authStore());
    return getSuccess.value
})

const errMessage = computed((): string => {
    const { getErrMessage } = storeToRefs(authStore());
    return getErrMessage.value
})

const validateNickName = (): boolean => {
    return nickNameValidationList.value.reduce((res, item) => res && item, true) && nickName.value != "DanDan"
}

const handleNickNameInputFocus = (): void => {
    if (nickName.value == "DanDan") {
        isExistValidation.value = true;
    } else {
        isExistValidation.value = false;
        isShowNicknameValidation.value = true;
    }
}

const handleNickNameInputBlur = (): void => {
    isShowNicknameValidation.value = false;
    isExistValidation.value = false;
}

const handleNickNameChange = () => {
    if (nickName.value == "DanDan") {
        isExistValidation.value = true;
        isShowNicknameValidation.value = false
    } else if (validateNickName() && nickName.value != "DanDan") {
        isExistValidation.value = false;
        isShowNicknameValidation.value = false;
    } else {
        isExistValidation.value = false;
        isShowNicknameValidation.value = true;
    }
}

const submitNickName = async () => {
    loading.value = true;
    await dispatchUpdateUserInfo({
        name: nickName.value
    })
    if (success.value) {
        notificationShow.value = !notificationShow.value;
        checkIcon.value = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
        notificationText.value = "Nickname updated successfully!"
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
            emit("submitNickName", nickName.value);
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
        <v-row class="relative mt-10" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-text-field :label="t('account.item.nick_name_text')" class="form-textfield dark-textfield" variant="solo"
                density="comfortable" v-model="nickName" :onfocus="handleNickNameInputFocus"
                :onChange="handleNickNameChange" :onblur="handleNickNameInputBlur" />
            <ValidationBox v-if="isShowNicknameValidation" :title="t('signup.displayNamePage.validation.username.title')"
                :descriptionList="nickNameValidationStrList" :validationList="nickNameValidationList" />
            <ExistValidationBox v-if="isExistValidation" :title="t('account.exist_validation_text')"
                :withCautionIcon="true" />
        </v-row>
        <v-row :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'" class="mt-10">
            <v-btn class="ma-3 mt-8 button-bright text-none" width="-webkit-fill-available"
                :height="mobileWidth < 600 ? '46px' : '60px'" :disabled="!validateNickName()" :loading="loading"
                @click="submitNickName">
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