
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import Header from './Header.vue';
import { useDisplay } from 'vuetify';
import { authStore } from "@/store/auth";
import { storeToRefs } from 'pinia';
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from 'element-plus'
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
            ElNotification({
                icon: SuccessIcon,
                title: notificationText.value,
                duration: 3000,
            })
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
            ElNotification({
                icon: WarningIcon,
                title: notificationText.value,
                duration: 3000,
            })
        }
        loading.value = false;
    }
}
</script>

<template>
    <div class="user-container">
        <Header @userDialogHide="emit('userDialogHide')" :title="title" />
        <v-row class="mt-6 relative" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-text-field :label="t('account.item.email_text')" class="form-textfield dark-textfield" variant="solo"
                density="comfortable" v-model="email" />
        </v-row>
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
    background-color: #2a283b;
    border-radius: 16px !important;
    height: 470px;

    .v-btn--disabled {
        background-color: #353652 !important;
        color: white !important;
    }
}

.el-notification {
    align-items: center !important;
    z-index: 1000000000 !important;
    top: 70px !important;
    right: 0px !important;
    height: 60px;
    border: none;
    border-radius: 16px 0px 0px 16px;
    background: var(--bg-2, #181522);
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.el-notification__title {
    color: var(--sec-text, #7782aa);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
}

.el-notification__closeBtn svg {
    display: none;
}

.el-notification__closeBtn {
    top: 22px !important;
    background-image: url("@/assets/public/svg/icon_public_52.svg");
    background-repeat: no-repeat;
    background-size: 18px;
}
</style>