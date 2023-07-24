<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { type GetUserInfo } from "@/interface/user";
import EditNickname from "@/components/account/user_information/dialog/EditNickname.vue";
import EditPassword from "@/components/account/user_information/dialog/EditPassword.vue";
import EditEmail from "@/components/account/user_information/dialog/EditEmail.vue";
import Notification from "@/components/global/notification/index.vue";

const { t } = useI18n();
const { width } = useDisplay()

const userInfo = computed((): GetUserInfo => {
    const { getUserInfo } = storeToRefs(authStore());
    return getUserInfo.value;
})

const mobileWidth: any = computed(() => {
    return width.value;
})

const dialogVisible = ref<boolean>(false);
const editNicknameDialog = ref<boolean>(false);
const editPasswordDialog = ref<boolean>(false);
const editEmailDialog = ref<boolean>(false);

const notificationShow = ref<boolean>(false);

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href);

const notificationText = ref<string>(t('account.phone_warning_text'));

const handlePhonNumber = () => {
    notificationShow.value = !notificationShow.value;
}

const editNicknameDialogShow = () => {
    dialogVisible.value = true;
    editNicknameDialog.value = true;
    editPasswordDialog.value = false;
    editEmailDialog.value = false;
}

const editPasswordDialogShow = () => {
    dialogVisible.value = true;
    editPasswordDialog.value = true;
    editNicknameDialog.value = false;
    editEmailDialog.value = false;
}

const editEmailDialogShow = () => {
    dialogVisible.value = true;
    editEmailDialog.value = true;
    editPasswordDialog.value = false;
    editNicknameDialog.value = false;
}

const userDialogHide = () => {
    dialogVisible.value = false;
    editPasswordDialog.value = false;
    editNicknameDialog.value = false;
    editEmailDialog.value = false;
}

const submitNickName = (name: string) => {
    userInfo.value.name = name
}

const handleVerifyCode = () => {
}
</script>

<template>
    <div class="relative">
        <v-row class="mx-4 mt-4 text-700-12 text-white">
            {{ t('account.menu.user_info_text') }}
        </v-row>
        <v-row class="mx-3 mt-8">
            <v-col cols="12" class="pa-0">
                <v-card color="#1C1929" theme="dark" class="m-user-info-item">
                    <v-list-item style="height: 100%;">
                        <v-list-item-title class="ml-2">
                            <div class="text-400-12 text-gray">{{ t('account.item.nick_name_text') }}</div>
                            <div class="text-600-12">{{ userInfo.name }}</div>
                        </v-list-item-title>
                        <template v-slot:append>
                            <v-btn class="account-edit-btn" @click="editNicknameDialogShow">{{
                                t('account.edit_text') }}</v-btn>
                        </template>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mx-3 mt-8">
            <v-col cols="12" class="pa-0">
                <v-card color="#1C1929" theme="dark" class="m-user-info-item">
                    <v-list-item style="height: 100%;">
                        <v-list-item-title class="ml-2">
                            <div class="text-400-12 text-gray">{{ t('account.item.email_text') }}</div>
                            <div class="text-600-14">{{ userInfo.email }}</div>
                        </v-list-item-title>
                        <template v-slot:append>
                            <v-btn class="account-edit-btn" @click="editEmailDialogShow">
                                <img src="@/assets/public/svg/icon_public_08.svg" v-if="userInfo.email_confirmd" />
                                <img src="@/assets/public/svg/icon_public_09.svg" v-else />
                                {{ t('account.edit_text') }}
                            </v-btn>
                        </template>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col class="pa-0 mt-2">
                <v-btn class="text-none email-verify-btn-color" @click="handleVerifyCode" height="40px">
                    {{ t('account.verify_code_text') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="mx-3 mt-8">
            <v-col cols="12" class="pa-0">
                <v-card color="#1C1929" theme="dark" class="m-user-info-item">
                    <v-list-item style="height: 100%;">
                        <v-list-item-title class="ml-2">
                            <div class="text-400-12 text-gray">{{ t('account.item.current_pwd_text') }}</div>
                            <div class="text-600-14 user-pwd-spacing">*******************</div>
                        </v-list-item-title>
                        <template v-slot:append>
                            <v-btn class="account-edit-btn" @click="editPasswordDialogShow">
                                {{ t('account.edit_text') }}
                            </v-btn>
                        </template>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mx-3 my-4">
            <v-col cols="12" class="pa-0">
                <div class="mt-4">
                    <v-row>
                        <v-col cols="4" lg="3">
                            <v-card color="#1C1929" theme="dark" class="m-user-info-item">
                                <v-list-item :value="t('account.item.area_text')" class="text-center" style="height: 100%;">
                                    <v-list-item-title>
                                        <div class="text-400-12 text-gray">
                                            {{ t('account.item.area_text') }}
                                        </div>
                                        <div class="d-flex align-center justify-center">
                                            <img src="@/assets/public/image/img_public_25.png" width="32"/>
                                            <v-icon class="ml-1">mdi-chevron-down</v-icon>
                                        </div>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-card>
                        </v-col>
                        <v-col cols="8" lg="9" class="pl-0">
                            <v-card color="#1C1929" theme="dark" class="m-user-info-item">
                                <v-list-item style="height: 100%;">
                                    <v-list-item-title class="ml-2">
                                        <div class="text-600-14 text-gray">{{ userInfo.phone }}</div>
                                    </v-list-item-title>
                                    <template v-slot:append>
                                        <v-btn class="account-edit-btn" @click="handlePhonNumber">
                                            <img src="@/assets/public/svg/icon_public_12.svg" />
                                        </v-btn>
                                    </template>
                                </v-list-item>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogVisible" :width="mobileWidth < 600 ? 330 : 471">
            <EditNickname v-if="editNicknameDialog" @userDialogHide="userDialogHide" :email="userInfo.email"  @submitNickName="submitNickName"/>
            <EditPassword v-if="editPasswordDialog" @userDialogHide="userDialogHide" />
            <EditEmail v-if="editEmailDialog" @userDialogHide="userDialogHide" />
        </v-dialog>
        <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
    </div>
</template>

<style lang="scss">
.m-user-info-item {
    height: 48px !important;
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

.email-verify-btn-color {
    width: 100%;
    background: #2F2756;
    border: 1px solid #6842EC;
    border-radius: 12px;

    .v-btn__content {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #6842EC;
    }
}
</style>