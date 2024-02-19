
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { authStore } from "@/store/auth";
import { storeToRefs } from 'pinia';
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useToast } from "vue-toastification";

const { t } = useI18n();
const { width } = useDisplay();
const emit = defineEmits<{ (e: 'userDialogHide'): void, (e: 'submitEmail', name: string): void }>()
const { dispatchUpdateEmail } = authStore();

const email = ref<string>("");
const title = ref<string>(t('account.edit_email_text'))
const password = ref<string>("");
const isShowCurrentPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);
const notificationText = ref<string>('');

const mobileWidth = computed(() => {
    return width.value
})

const validateEmail = (): boolean => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isMatch = email.value.match(validRegex);
    return !!isMatch;
}

const passwordValidationList = computed((): boolean => {
    // 8-30 characters in length
    const condition = password.value.length <= 30 && password.value.length >= 8;
    return condition;
})

const success = computed((): boolean => {
    const { getSuccess } = storeToRefs(authStore());
    return getSuccess.value
})

const errMessage = computed((): string => {
    const { getErrMessage } = storeToRefs(authStore());
    return getErrMessage.value
})

// computed variables
const isFormDataReady = computed((): boolean =>
    validateEmail() && passwordValidationList.value
)

const showCurrentPassword = () => {
    isShowCurrentPassword.value = !isShowCurrentPassword.value;
}

const updateEmail = async () => {
    loading.value = true;
    await dispatchUpdateEmail({
        email: email.value,
        password: password.value
    })
    if (success.value) {
        notificationShow.value = !notificationShow.value;
        checkIcon.value = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
        notificationText.value = "Email updated successfully!"
        
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
            emit("submitEmail", email.value);
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
        <v-row class="mt-6 relative" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-text-field :label="t('account.item.email_text')" class="form-textfield dark-textfield m-account-email-edit-address" variant="solo"
                density="comfortable" v-model="email" />
        </v-row>
        <v-row class="relative" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-text-field :label="t('account.password.current_text')" class="form-textfield dark-textfield m-account-email-edit-password" variant="solo"
                density="comfortable" :type="isShowCurrentPassword ? 'text' : 'password'" v-model="password" />
            <img v-if="isShowCurrentPassword" src="@/assets/public/svg/icon_public_07.svg" class="m-disable-password"
                @click="showCurrentPassword" width="16" />
            <img v-else src="@/assets/public/svg/icon_public_06.svg" class="m-disable-password" @click="showCurrentPassword"
                width="16" />
        </v-row>
        <v-row class="mt-6" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-btn class="ma-3 mt-8 button-bright m-account-dialog-save-btn" width="-webkit-fill-available" :loading="loading"
                height="48px" :disabled="!isFormDataReady" @click="updateEmail">
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

.m-account-email-edit-address {
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

.m-account-email-edit-password {
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