
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import Header from './Header.vue';
import { useDisplay } from 'vuetify';
import Notification from "@/components/global/notification/index.vue";
import { authStore } from "@/store/auth";
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useToast } from "vue-toastification";

const { t } = useI18n();
const { width } = useDisplay();
const emit = defineEmits<{ (e: 'userDialogHide'): void, (e: 'submitPhone', phone: string): void }>()
const { dispatchUpdateUserInfo } = authStore();

const phone = ref<string>("");
const title = ref<string>(t('account.edit_phone_text'))
const loading = ref<boolean>(false);
const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);
const notificationText = ref<string>('');

const mobileWidth = computed(() => {
    return width.value
})

const success = computed((): boolean => {
    const { getSuccess } = storeToRefs(authStore());
    return getSuccess.value
})

const errMessage = computed((): string => {
    const { getErrMessage } = storeToRefs(authStore());
    return getErrMessage.value
})

const validatePhone = (): boolean => {
    phone.value = (phone.value + '').replace(/[^\d]/g, '')
    return phone.value != "" && phone.value != "+"
}

const updatePhone = async () => {
    loading.value = true;
    await dispatchUpdateUserInfo({
        phone: phone.value
    })
    if (success.value) {
        notificationShow.value = !notificationShow.value;
        checkIcon.value = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
        notificationText.value = "Phone updated successfully!"
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
            emit("submitPhone", phone.value);
            emit('userDialogHide')
        }, 1000)
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
        <v-row class="mt-10 relative" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-text-field :label="t('account.item.phone_text')" class="form-textfield dark-textfield" variant="solo"
                density="comfortable" v-model="phone" oninput="value = (value + '').replace(/[^\d]/g, '')" onblur="value = (value + '').replace(/[^\d]/g, '')" onfocus="value = (value + '').replace(/[^\d]/g, '')" />
        </v-row>
        <v-row class="mt-10" :class="mobileWidth < 600 ? 'ma-2' : 'ma-10'">
            <v-btn class="ma-3 mt-8 button-bright text-none" width="-webkit-fill-available" :loading="loading"
                :height="mobileWidth < 600 ? '46px' : '60px'" :disabled="!validatePhone()" @click="updatePhone">
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