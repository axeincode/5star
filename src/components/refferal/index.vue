<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { refferalStore } from '@/store/refferal';
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useToast } from "vue-toastification";

const { t } = useI18n();
const { width } = useDisplay();
const { setRefferalDialogShow } = refferalStore();

const invitedUser = ref<number>(28560);
const earnMoney = ref<number>(85601479);
const host = ref<string>("xxx.com");
const refferalCode = ref<string>("xxxxxxxxxx");
const siteUrl = ref<string>("https://Brazstar.com/xxxxxxxxxx");

const descriptionVisible = ref<boolean>(false);

const notificationShow = ref<boolean>(false);

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const notificationText = ref<string>(t('refferal.copy_success_text'));

const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl.value).then(
        () => {
            console.log('Copied to clipboard!');
            // notificationShow.value = !notificationShow.value;
            const toast = useToast();
            toast.success( notificationText.value, { 
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
            // setRefferalDialogShow(false);
        },
        (error) => {
            console.error('Could not copy text: ', error);
        }
    );
}

const showMainDialog = () => {
    descriptionVisible.value = false;
}

const showDescriptionDialog = () => {
    descriptionVisible.value = true;
}

onMounted(() => {
})
</script>

<template>
    <div class="refferal-container">
        <template v-if="descriptionVisible">
            <div class="mt-6 text-center text-700-20 white">
                {{ t('refferal.dialog.header.body_text') }}
            </div>
            <div class="mt-6">
                <img src="@/assets/public/image/bg_public_02_01.png" class="full-width" />
            </div>
            <div class="mt-6 mx-10 white text-400-16">
                {{ t('refferal.description.text_1') }}
            </div>
            <div class="mt-4 mx-10 text-gray text-500-14 text-justify">
                {{ t('refferal.description.text_2') }}
            </div>
            <div class="mt-6 mx-10">
                <v-card height="420" theme="dark" color="#1D2027" class="overflow-y-auto">
                    <div class="mx-4 mt-4 text-600-16 text-gray">
                        {{ t('refferal.description.term_text') }}
                    </div>
                    <p class="mx-4 mt-3 text-400-14 text-gray text-justify">
                        {{ t('refferal.description.text_3') }}
                    </p>
                </v-card>
            </div>
            <div class="mt-8 mx-12">
                <v-btn class="button-dark text-none" width="-webkit-fill-available" height="60px" @click="showMainDialog">
                    {{ t('refferal.description.back_btn_text') }}
                </v-btn>
            </div>
        </template>
        <template v-else>
            <div class="refferal-dialog-header text-center">
                <img src="@/assets/public/image/img_public_08.png" style="margin-top: -10px" />
                <div class="mt-8 text-center text-700-18 yellow">
                    {{ t('refferal.dialog.header.title_text') }}
                </div>
                <div class="mt-8 text-center text-700-22 white">
                    {{ t('refferal.dialog.header.body_text') }}
                </div>
                <div class="mx-12 mt-6 text-center text-400-14 white">
                    <Font color="#F9BC01">{{ invitedUser.toLocaleString() }}</Font>
                    {{ t('refferal.dialog.header.body_text_1') }}
                    <Font color="#F9BC01">{{ earnMoney.toLocaleString() }}</Font>
                    {{ t('refferal.dialog.header.body_text_2') }}
                    <Font color="#F9BC01">{{ host }}</Font>
                    {{ t('refferal.dialog.header.body_text_3') }}
                </div>
                <div class="mt-6 text-center text-700-16 color-31E598 boder-bottom-31E598" @click="showDescriptionDialog">
                    {{ t('refferal.dialog.header.body_text_4') }}
                </div>
            </div>
            <div class="refferal-dialog-body">
                <div class="text-center mt-10 text-700-22 white">
                    {{ t('refferal.dialog.body.text_1') }}
                </div>
                <div class="text-center mt-5 text-500-16 text-gray">
                    {{ t('refferal.dialog.body.text_2') }}{{ refferalCode }}{{ t('refferal.dialog.body.text_3') }}
                </div>
                <div class="text-center mt-6 mx-12">
                    <v-card theme="dark" color="#1D2027" height="48">
                        <div class="text-400-14 text-gray mt-4">{{ siteUrl }}</div>
                    </v-card>
                </div>
                <div class="text-center mt-10 mx-12">
                    <v-btn class="button-bright text-none" width="-webkit-fill-available" height="60px"
                        @click="copyToClipboard">
                        {{ t('refferal.dialog.body.copy_btn_text') }}
                    </v-btn>
                </div>
            </div>
        </template>
        <v-btn class="close-button" icon="true" @click="setRefferalDialogShow(false)">
            <v-icon color="#FFFFFF">
                mdi-close
            </v-icon>
        </v-btn>
        <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
    </div>
</template>

<style lang="scss">
.refferal-container {
    background: #2E274C;
    border-radius: 16px;
    height: 815px;

    .refferal-dialog-header {
        background: linear-gradient(180deg, #5EAD1F 0%, #1B5A65 100%);
        border-radius: 16px;
        height: 491px;
    }

    // close modal button
    .close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 5px;
        right: 5px;
    }

    .boder-bottom-31E598 {
        color: #31E598;
        text-decoration: underline;
        text-underline-position: under;
        cursor: pointer;
    }

    .text-over-flow {
        /* Width of the container */
        white-space: nowrap;
        /* Prevents text from breaking into multiple lines */
        overflow: hidden;
        /* Hides any overflowing text */
        text-overflow: ellipsis;
        /* Adds ellipsis to truncate the text */
    }
}
</style>
