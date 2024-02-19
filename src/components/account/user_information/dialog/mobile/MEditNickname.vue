
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
        const toast = useToast();
        toast.success("Nickname updated successfully!", { 
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
            loading.value = false;
            emit("submitNickName", nickName.value);
            emit('userDialogHide')
        }, 2000)
    } else {
        notificationShow.value = !notificationShow.value;
        checkIcon.value = new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href
        notificationText.value = errMessage.value;
        loading.value = false;
        
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
}
</script>

<template>
    <div class="m-user-container">
        <div class="mt-8 text-700-14 text-center white">{{ title }}</div>
        <v-row class="relative ma-2" style="margin-top: 110px !important;">
            <v-text-field :label="t('account.item.nick_name_text')" class="form-textfield dark-textfield m-account-nickname-edit" variant="solo"
                density="comfortable" v-model="nickName" :onfocus="handleNickNameInputFocus"
                :onChange="handleNickNameChange" :onblur="handleNickNameInputBlur" />
            <ValidationBox v-if="isShowNicknameValidation" :title="t('signup.displayNamePage.validation.username.title')"
                :descriptionList="nickNameValidationStrList" :validationList="nickNameValidationList" />
            <ExistValidationBox v-if="isExistValidation" :title="t('account.exist_validation_text')"
                :withCautionIcon="true" />
        </v-row>
        <v-row style="margin-top: 70px !important" class="ma-2">
            <v-btn class="ma-3 mt-8 button-bright m-account-dialog-save-btn" width="-webkit-fill-available" height="48"
                :disabled="!validateNickName()" :loading="loading" @click="submitNickName">
                {{ t('account.save_text') }}
            </v-btn>
        </v-row>
        <v-btn class="m-account-dialog-close-btn" icon="true" @click="emit('userDialogHide')" width="30" height="30">
            <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
        </v-btn>
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
@media (max-width: 600px) {
  
    
    .Vue-Toastification__container {
    right: 0!important;
    left: unset!important;;
    width: 290px!important;
    margin-right: 37px;
    height: 60px!important;
    //flex-direction: unset!important;
    }
    .Vue-Toastification__toast {
        align-items: center !important;
        z-index: 1000000000 !important;
        top: 70px;
        right: -20px !important;
        width: 320px !important;
        height: 60px;
        border: none;
        border-radius: 16px 0px 0px 16px;
        background: var(--bg-2, #181522);
        box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
    }

    .Vue-Toastification__toast-body {
    color: var(--sec-text, #7782aa);
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
    }

    .Vue-Toastification__close-button{
    top: 22px !important;
    background-image: url("@/assets/public/svg/icon_public_52.svg");
    background-repeat: no-repeat;
    background-size: 18px;
    color: transparent;
    opacity: 1;
    }
}


.Vue-Toastification__container {
  right: 0!important;
  left: unset!important;;
  width: 290px!important;
  margin-right: 37px;
  height: 60px!important;
  //flex-direction: unset!important;
}
.Vue-Toastification__toast {
    align-items: center !important;
    z-index: 1000000000 !important;
    top: 70px;
    right: -20px !important;
    width: 320px !important;
    height: 60px;
    border: none;
    border-radius: 16px 0px 0px 16px;
    background: var(--bg-2, #181522);
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.Vue-Toastification__toast-body {
  color: var(--sec-text, #7782aa);
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
}

.Vue-Toastification__close-button{
  top: 22px !important;
  background-image: url("@/assets/public/svg/icon_public_52.svg");
  background-repeat: no-repeat;
  background-size: 18px;
  color: transparent;
  opacity: 1;
}

.m-account-nickname-edit {
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