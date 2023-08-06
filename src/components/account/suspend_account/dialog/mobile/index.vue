
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import router from '@/router';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { authStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import Notification from "@/components/global/notification/index.vue";

const { t } = useI18n();
const { width } = useDisplay();
const emit = defineEmits<{ (e: 'suspendDialogHide'): void }>()
const props = defineProps<{ suspendDate: number }>();
const { suspendDate } = toRefs(props);
const { dispatchSuspendUser } = authStore();
const { dispatchSignout } = authStore()

const loading = ref<boolean>(false);
const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);
const notificationText = ref<string>('');

const success = computed(() => {
    const { getSuccess } = storeToRefs(authStore());
    return getSuccess.value
})

const errMessage = computed((): string => {
    const { getErrMessage } = storeToRefs(authStore());
    return getErrMessage.value
})


const submitSuspend = async () => {
    loading.value = true;
    await dispatchSuspendUser({
        time: suspendDate.value
    })
    if (success.value) {
        emit('suspendDialogHide')
        dispatchSignout();
        router.push({ name: "Dashboard" })
    } else {
        notificationShow.value = !notificationShow.value;
        checkIcon.value = new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href
        notificationText.value = errMessage.value;
        loading.value = false;
    }
}

</script>

<template>
    <div class="m-suspend-dialog-container">
        <v-row class="mx-4 mt-6 text-700-12 text-gray justify-center">
            {{ t('account.suspend_account.dialog.title_text') }}
        </v-row>
        <v-row class="mx-4 mt-6 text-700-12 text-gray">
            <p class="text-center">
                {{ t('account.suspend_account.dialog.content_text_1') }}
                <font color="#FFFFFF">
                    {{ suspendDate }}
                    {{ t('account.suspend_account.dialog.content_text_2') }}
                </font>
            </p>
        </v-row>
        <v-row class="mx-10 mt-10 text-700-14">
            <div class="m-suspend-confirm-btn">
                <v-btn class="button-bright text-none" height="28" width="76" @click="submitSuspend" :loading="loading">
                    {{ t('account.suspend_account.dialog.determine_btn_text') }}
                </v-btn>
            </div>
            <div class="m-suspend-cancel-btn ml-auto">
                <v-btn class="button-bright text-none" height="28" width="76" @click="emit('suspendDialogHide')">
                    {{ t('account.suspend_account.dialog.cancel_btn_text') }}
                </v-btn>
            </div>
        </v-row>
        <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
    </div>
</template>

<style lang="scss">
// account dialog container
.m-suspend-dialog-container {
    background-color: #29253C;
    border-radius: 16px !important;
    height: 173px;
}

.m-suspend-confirm-btn {

    // button
    button {
        border-radius: 26px !important;

        .v-btn__content {
            font-weight: 700;
            font-size: 10px;
        }
    }
}

.m-suspend-cancel-btn {

    // button
    button {
        background: #414968 !important;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 26px;

        .v-btn__content {
            font-weight: 700;
            font-size: 10px;
            color: #FFFFFF;
        }
    }
}
</style>