<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { type GetUserInfo } from "@/interface/user";
import EditNickname from "@/components/account/user_information/dialog/EditNickname.vue";
import MEditNickname from "@/components/account/user_information/dialog/mobile/MEditNickname.vue";
import EditPassword from "@/components/account/user_information/dialog/EditPassword.vue";
import MEditPassword from "@/components/account/user_information/dialog/mobile/MEditPassword.vue";
import EditEmail from "@/components/account/user_information/dialog/EditEmail.vue";
import MEditEmail from "@/components/account/user_information/dialog/mobile/MEditEmail.vue";
import Notification from "@/components/global/notification/index.vue";
import { appBarStore } from "@/store/appBar";
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useToast } from "vue-toastification";

const { t } = useI18n();
const { width } = useDisplay()
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();

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
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    setOverlayScrimShow(true);
}

const editPasswordDialogShow = () => {
    dialogVisible.value = true;
    editPasswordDialog.value = true;
    editNicknameDialog.value = false;
    editEmailDialog.value = false;
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    setOverlayScrimShow(true);
}

const editEmailDialogShow = () => {
    dialogVisible.value = true;
    editEmailDialog.value = true;
    editPasswordDialog.value = false;
    editNicknameDialog.value = false;
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    setOverlayScrimShow(true);
}

const userDialogHide = () => {
    dialogVisible.value = false;
    editPasswordDialog.value = false;
    editNicknameDialog.value = false;
    editEmailDialog.value = false;
    setMainBlurEffectShow(false);
    setHeaderBlurEffectShow(false);
    setMenuBlurEffectShow(false);
    setOverlayScrimShow(false);
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
      {{ t("account.menu.user_info_text") }}
    </v-row>
    <v-row class="mx-3 mt-6">
      <v-col cols="12" class="pa-0">
        <v-card color="#15161C" theme="dark" class="m-user-info-item">
          <v-list-item style="height: 100%; top: -3px !important">
            <v-list-item-title class="ml-2" style="line-height: 18px">
              <div class="text-400-10 text-gray">
                {{ t("account.item.nick_name_text") }}
              </div>
              <div class="text-600-12">{{ userInfo.name }}</div>
            </v-list-item-title>
            <template v-slot:append>
              <v-btn class="m-account-edit-btn text-none" @click="editNicknameDialogShow">
                {{ t("account.edit_text") }}
              </v-btn>
            </template>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mx-3 mt-8">
      <v-col cols="12" class="pa-0">
        <v-card color="#15161C" theme="dark" class="m-user-info-item">
          <v-list-item style="height: 100%; top: -3px !important">
            <v-list-item-title class="ml-2" style="line-height: 18px">
              <div class="text-400-10 text-gray">{{ t("account.item.email_text") }}</div>
              <div class="text-600-12">{{ userInfo.email }}</div>
            </v-list-item-title>
            <template v-slot:append>
              <v-btn class="m-account-edit-btn text-none" @click="editEmailDialogShow">
                <img
                  src="@/assets/public/svg/icon_public_08.svg"
                  v-if="userInfo.email_confirmd"
                  width="16"
                />
                <img src="@/assets/public/svg/icon_public_09.svg" v-else width="16" />
                {{ t("account.edit_text") }}
              </v-btn>
            </template>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col class="pa-0 mt-2">
        <v-btn
          class="text-none m-email-verify-btn-color"
          @click="handleVerifyCode"
          height="40px"
        >
          {{ t("account.verify_code_text") }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mx-3 mt-8">
      <v-col cols="12" class="pa-0">
        <v-card color="#15161C" theme="dark" class="m-user-info-item">
          <v-list-item style="height: 100%; top: -3px !important">
            <v-list-item-title class="ml-2" style="line-height: 18px">
              <div class="text-400-10 text-gray">
                {{ t("account.item.current_pwd_text") }}
              </div>
              <div class="text-600-12 user-pwd-spacing">***************</div>
            </v-list-item-title>
            <template v-slot:append>
              <v-btn class="m-account-edit-btn text-none" @click="editPasswordDialogShow">
                {{ t("account.edit_text") }}
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
              <v-card color="#15161C" theme="dark" class="m-user-info-item">
                <v-list-item
                  :value="t('account.item.area_text')"
                  class="text-center"
                  style="height: 100%; top: -3px !important"
                >
                  <v-list-item-title style="line-height: 18px">
                    <div class="text-400-10 text-gray">
                      {{ t("account.item.area_text") }}
                    </div>
                    <div class="d-flex align-center justify-center">
                      <img src="@/assets/public/image/img_public_25.png" width="23" />
                      <!-- <v-icon class="ml-1">mdi-chevron-down</v-icon> -->
                      <img
                        src="@/assets/public/svg/icon_public_50.svg"
                        width="14"
                        class="ml-2"
                      />
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="8" lg="9" class="pl-0">
              <v-card color="#15161C" theme="dark" class="m-user-info-item">
                <v-list-item style="height: 100%; top: -3px !important">
                  <v-list-item-title class="ml-2">
                    <div class="text-600-12 text-gray">{{ userInfo.phone }}</div>
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-btn class="m-account-edit-btn" @click="handlePhonNumber">
                      <img src="@/assets/public/svg/icon_public_12.svg" width="16" />
                    </v-btn>
                  </template>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-btn class="m-account-speaker-bg" icon>
      <img
        src="@/assets/public/svg/icon_public_75.svg"
        class="m-account-speaker-img-position"
      />
    </v-btn>
    <v-dialog
      v-model="dialogVisible"
      :width="mobileWidth < 600 ? 328 : 471"
      @click:outside="userDialogHide"
    >
      <template v-if="mobileWidth > 600">
        <EditNickname
          v-if="editNicknameDialog"
          @userDialogHide="userDialogHide"
          :email="userInfo.email"
          @submitNickName="submitNickName"
        />
        <EditPassword v-if="editPasswordDialog" @userDialogHide="userDialogHide" />
        <EditEmail v-if="editEmailDialog" @userDialogHide="userDialogHide" />
      </template>
      <template v-else>
        <MEditNickname
          v-if="editNicknameDialog"
          @userDialogHide="userDialogHide"
          :email="userInfo.email"
          @submitNickName="submitNickName"
        />
        <MEditPassword v-if="editPasswordDialog" @userDialogHide="userDialogHide" />
        <MEditEmail v-if="editEmailDialog" @userDialogHide="userDialogHide" />
      </template>
    </v-dialog>
    <!-- <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" /> -->
  </div>
</template>

<style lang="scss">
.m-account-speaker-bg {
  width: 44px;
  height: 44px;
  background: #009B3A;
  border-radius: 44px;
  position: absolute;
  right: 20px;
  top: 328px;

  .m-account-speaker-img-position {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.m-user-info-item {
  height: 40px !important;
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

.m-account-edit-btn {
  background: transparent !important;
  box-shadow: none !important;
  min-width: auto !important;

  .v-btn__content {
    font-weight: 400;
    font-size: 12px;
    color: #7782aa;
  }
}

.user-pwd-spacing {
  letter-spacing: 2px;
}

.m-email-verify-btn-color {
  width: 100%;
  background: transparent;
  border: 1px solid #009B3A;
  border-radius: 8px;

  .v-btn__content {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #009B3A;
  }
}

.Vue-Toastification__container {
  right: 0 !important;
  left: unset !important;
  width: 290px !important;
  margin-right: 37px;
  height: 60px !important;
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

.Vue-Toastification__close-button {
  top: 22px !important;
  background-image: url("@/assets/public/svg/icon_public_52.svg");
  background-repeat: no-repeat;
  background-size: 18px;
  color: transparent;
  opacity: 1;
}
</style>
