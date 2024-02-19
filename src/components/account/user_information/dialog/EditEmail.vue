
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import Header from './Header.vue';
import { useDisplay } from 'vuetify';
import { authStore } from "@/store/auth";
import { storeToRefs } from 'pinia';
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from 'element-plus'
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';

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
const emailPartName = ref<string>("");
const mailCardHeight = ref<number>(0);

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
const handleEmailBlur = () => {
    setTimeout(() => {
        mailCardHeight.value = 0;
    }, 100);
};
const mergeEmail = (mail: string) => {
    email.value = email.value.split("@")[0] + mail;
    setTimeout(() => {
        mailCardHeight.value = 0;
    }, 100);
};
const handleEmailChange = () => {
    if (email.value.includes("@")) {
        emailPartName.value = email.value.split("@")[0];
        mailCardHeight.value = 260;
    } else {
        setTimeout(() => {
            mailCardHeight.value = 0;
        }, 100);
    }
};
const handleEmailFocus = () => {
    if (email.value.includes("@")) {
        emailPartName.value = email.value.split("@")[0];
        mailCardHeight.value = 260;
    }
};
</script>

<template>
    <div class="user-container">
        <Header @userDialogHide="emit('userDialogHide')" :title="title" />
        <v-row class="mt-6 relative" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-text-field :label="t('account.item.email_text')" class="form-textfield dark-textfield" variant="solo"
                density="comfortable" v-model="email" :onblur="handleEmailBlur" @input="handleEmailChange" :onfocus="handleEmailFocus" />
        </v-row>
        <div class="login-mail-card edit-mail" :style="{ height: mailCardHeight + 'px' }">
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
        <v-row class="relative" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-text-field :label="t('account.password.current_text')" class="form-textfield dark-textfield" variant="solo"
                density="comfortable" :type="isShowCurrentPassword ? 'text' : 'password'" v-model="password" />
            <img v-if="isShowCurrentPassword" src="@/assets/public/svg/icon_public_07.svg" class="disable-password"
                @click="showCurrentPassword" />
            <img v-else src="@/assets/public/svg/icon_public_06.svg" class="disable-password"
                @click="showCurrentPassword" />
        </v-row>
        <v-row class="mt-6" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-btn class="ma-3 mt-8 button-bright text-none" width="-webkit-fill-available" :loading="loading"
                :height="mobileWidth < 600 ? '46px' : '60px'" :disabled="!isFormDataReady" @click="updateEmail">
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

.edit-mail {
    width: 368px;
    top: 160px;
}
</style>