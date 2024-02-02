<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { type GetUserInfo } from "@/interface/user";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import EditNickname from "@/components/account/user_information/dialog/EditNickname.vue";
import EditPassword from "@/components/account/user_information/dialog/EditPassword.vue";
import EditEmail from "@/components/account/user_information/dialog/EditEmail.vue";
import EditPhone from "@/components/account/user_information/dialog/EditPhone.vue";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useToast } from "vue-toastification";

const { t } = useI18n();
const { width } = useDisplay()

const mobileWidth: any = computed(() => {
    return width.value;
})

const dialogVisible = ref<boolean>(false);
const editNicknameDialog = ref<boolean>(false);
const editPasswordDialog = ref<boolean>(false);
const editEmailDialog = ref<boolean>(false);
const editPhoneDialog = ref<boolean>(false);

const notificationShow = ref<boolean>(false);

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href);

const notificationText = ref<string>(t('account.phone_warning_text'));

const userInfo = computed((): GetUserInfo => {
    const { getUserInfo } = storeToRefs(authStore());
    return getUserInfo.value;
})

const handleService = () => {
    notificationShow.value = !notificationShow.value;
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
}

const editNicknameDialogShow = () => {
    dialogVisible.value = true;
    editNicknameDialog.value = true;
    editPasswordDialog.value = false;
    editEmailDialog.value = false;
    editPhoneDialog.value = false;
}

const editPasswordDialogShow = () => {
    dialogVisible.value = true;
    editPasswordDialog.value = true;
    editNicknameDialog.value = false;
    editEmailDialog.value = false;
    editPhoneDialog.value = false
}

const editEmailDialogShow = () => {
    dialogVisible.value = true;
    editEmailDialog.value = true;
    editPasswordDialog.value = false;
    editNicknameDialog.value = false;
    editPhoneDialog.value = false;
}

const editPhoneDialogShow = () => {
    dialogVisible.value = true;
    editPhoneDialog.value = true;
    editEmailDialog.value = false;
    editPasswordDialog.value = false;
    editNicknameDialog.value = false;
}

const userDialogHide = () => {
    dialogVisible.value = false;
    editPasswordDialog.value = false;
    editNicknameDialog.value = false;
    editEmailDialog.value = false;
    editPhoneDialog.value = false;
}

const submitNickName = (name: string) => {
    userInfo.value.name = name
}

const submitEmail = (email: string) => {
    userInfo.value.email = email;
}

const submitPhone = (phone: string) => {
    userInfo.value.phone = phone;
}

const handleVerifyCode = () => {
}
</script>

<template>
    <div class="account-menu py-10 relative user-info-body">
        <v-row class="mx-6 mt-5 text-700-20 text-white">
            {{ t('account.menu.user_info_text') }}
        </v-row>
        <v-row class="mx-6 mt-8">
            <v-col cols="6">
                <div>
                    <v-card color="#15161C" theme="dark" class="user-info-item">
                        <v-list-item>
                            <v-list-item-title class="ml-2">
                                <div class="text-400-12 text-gray">{{ t('account.item.nick_name_text') }}</div>
                                <div class="text-600-14">{{ userInfo.name }}</div>
                            </v-list-item-title>
                            <template v-slot:append>
                                <v-btn class="account-edit-btn" @click="handleService"
                                    v-if="userInfo.locked_personal_info_fields?.includes('phone')">
                                    <img src="@/assets/public/svg/icon_public_12.svg" />
                                </v-btn>
                                <v-btn class="account-edit-btn" @click="editNicknameDialogShow" v-else>
                                    {{ t('account.edit_text') }}
                                </v-btn>
                            </template>
                        </v-list-item>
                    </v-card>
                </div>
                <div class="text-400-12" style="visibility: hidden;">
                    {{ t('account.verify_code_text') }}
                </div>
                <div class="mt-6">
                    <v-row>
                        <v-col cols="4" lg="3">
                            <v-card color="#15161C" theme="dark">
                                <v-list-item :value="t('account.item.area_text')" class="text-center">
                                    <v-list-item-title>
                                        <div class="text-400-12 text-gray">
                                            {{ t('account.item.area_text') }}
                                        </div>
                                        <div class="d-flex align-center justify-center">
                                            <img src="@/assets/public/image/img_public_25.png" width="32" />
                                            <v-icon class="ml-1">mdi-chevron-down</v-icon>
                                        </div>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-card>
                        </v-col>
                        <v-col cols="8" lg="9" class="pl-0">
                            <v-card color="#15161C" theme="dark" class="user-info-item">
                                <v-list-item class="user-info-item">
                                    <v-list-item-title class="ml-2">
                                        <div class="text-400-12 text-gray">{{ t('account.item.phone_text') }}</div>
                                        <div class="text-600-14 white">{{ userInfo.phone }}</div>
                                    </v-list-item-title>
                                    <template v-slot:append>
                                        <v-btn class="account-edit-btn" @click="handleService"
                                            v-if="userInfo.locked_personal_info_fields?.includes('phone')">
                                            <img src="@/assets/public/svg/icon_public_12.svg" />
                                        </v-btn>
                                        <v-btn class="account-edit-btn" @click="editPhoneDialogShow" v-else>
                                            {{ t('account.edit_text') }}
                                        </v-btn>
                                    </template>
                                </v-list-item>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col cols="6">
                <v-card color="#15161C" theme="dark" class="user-info-item">
                    <v-list-item>
                        <v-list-item-title class="ml-2">
                            <div class="text-400-12 text-gray">{{ t('account.item.email_text') }}</div>
                            <div class="text-600-14">{{ userInfo.email }}</div>
                        </v-list-item-title>
                        <template v-slot:append>
                            <v-btn class="account-edit-btn" @click="handleService"
                                v-if="userInfo.locked_personal_info_fields?.includes('phone')">
                                <img src="@/assets/public/svg/icon_public_12.svg" />
                            </v-btn>
                            <v-btn class="account-edit-btn" @click="editEmailDialogShow" v-else>
                                <img src="@/assets/public/svg/icon_public_08.svg" v-if="userInfo.email_confirmd" />
                                <img src="@/assets/public/svg/icon_public_09.svg" v-else />
                                {{ t('account.edit_text') }}
                            </v-btn>
                        </template>
                    </v-list-item>
                </v-card>
                <div class="text-400-12 text-gray text-right mr-2 cursor-pointer mt-1" @click="handleVerifyCode">
                    {{ t('account.verify_code_text') }}
                </div>
                <v-card color="#15161C" theme="dark" class="user-info-item mt-6">
                    <v-list-item>
                        <v-list-item-title class="ml-2">
                            <div class="text-400-12 text-gray">{{ t('account.item.current_pwd_text') }}</div>
                            <div class="text-600-14 user-pwd-spacing">*******************</div>
                        </v-list-item-title>
                        <template v-slot:append>
                            <v-btn class="account-edit-btn" @click="handleService"
                                v-if="userInfo.locked_personal_info_fields?.includes('phone')">
                                <img src="@/assets/public/svg/icon_public_12.svg" />
                            </v-btn>
                            <v-btn class="account-edit-btn" @click="editPasswordDialogShow" v-else>
                                {{ t('account.edit_text') }}
                            </v-btn>
                        </template>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogVisible" width="471">
            <EditNickname v-if="editNicknameDialog" @userDialogHide="userDialogHide" :email="userInfo.email"
                @submitNickName="submitNickName" />
            <EditPassword v-if="editPasswordDialog" @userDialogHide="userDialogHide" />
            <EditEmail v-if="editEmailDialog" @userDialogHide="userDialogHide" @submitEmail="submitEmail" />
            <EditPhone v-if="editPhoneDialog" @userDialogHide="userDialogHide" @submitPhone="submitPhone" />
        </v-dialog>
        <!-- <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" /> -->
    </div>
</template>

<style lang="scss">
.user-info-body:before {
    content: "";
    position: absolute;
    left: -10px;
    top: 60px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #1D2027;
}

.user-info-item {
    height: 56px !important;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;

}

.account-edit-btn {
    background: transparent !important;
    box-shadow: none !important;

    .v-btn__content {
        font-weight: 400;
        font-size: 12px;
        color: #7782AA;
    }
}

.user-pwd-spacing {
    letter-spacing: 2px;
}
</style>