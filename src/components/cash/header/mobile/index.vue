<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { appBarStore } from '@/store/appBar';
import { depositStore } from '@/store/deposit';
import { authStore } from "@/store/auth";
import { type GetPixInfo } from '@/interface/deposit';
import Notification from "@/components/global/notification/index.vue";
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus'
import { type GetUserInfo } from "@/interface/user";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import icon_public_60 from "@/assets/public/svg/icon_public_60.svg";
import icon_public_65 from "@/assets/public/svg/icon_public_65.svg";
import { useToast } from "vue-toastification";

const { name, width } = useDisplay();
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setDepositBlurEffectShow } = appBarStore();
const { setPixInfo } = depositStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { dispatchUserProfile } = authStore();
const { setPixInfoToggle } = depositStore();

const cashToggleSwitch = ref<boolean>(false);

const personalInfoToggle = ref<boolean>(false);

const confirmValidation = ref<boolean>(false);

const notificationShow = ref<boolean>(false);

const pixInfoMenuShow = ref<boolean>(false);

const depositCheckboxColor = ref<string>("#ffffff");
const withdrawCheckboxColor = ref<string>("#7782AA");

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const notificationText = ref<string>("");

const pixInfoItem = ref<GetPixInfo>({
  id: "",
  first_name: "",
  last_name: ""
})

const isPersonalBtnReady = ref<boolean>(false);

const mobileWidth = computed(() => {
  return width.value
})

const handlePersonalInfoToggle = (): void => {
  personalInfoToggle.value = !personalInfoToggle.value;
  // setMainBlurEffectShow(personalInfoToggle.value == true? true : false);
}

const handleConfirmValidation = (): void => {
  if (confirmValidation.value) {
    // notificationText.value = t('deposit_dialog.personal_information.confirm_warning_text');
    // checkIcon.value = new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href;
    // notificationShow.value = !notificationShow.value;
    const toast = useToast();
    toast.success(t('deposit_dialog.personal_information.confirm_warning_text'), {
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

const handlePixInfoID = (): void => {
  console.log(validateCPF(pixInfoItem.value.id));
  if (pixInfoItem.value.id != "" && validateCPF(pixInfoItem.value.id) && pixInfoItem.value.first_name != "" && pixInfoItem.value.last_name != "") {
    isPersonalBtnReady.value = true;
  } else {
    isPersonalBtnReady.value = false;
  }
}

const handlePixInfoFirstName = (): void => {
  if (pixInfoItem.value.id != "" && validateCPF(pixInfoItem.value.id) && pixInfoItem.value.first_name != "" && pixInfoItem.value.last_name != "") {
    isPersonalBtnReady.value = true;
  } else {
    isPersonalBtnReady.value = false;
  }
}

const handlePixInfoLastName = (): void => {
  if (pixInfoItem.value.id != "" && validateCPF(pixInfoItem.value.id) && pixInfoItem.value.first_name != "" && pixInfoItem.value.last_name != "") {
    isPersonalBtnReady.value = true;
  } else {
    isPersonalBtnReady.value = false;
  }
}

const cashDialogShow = () => {
  setCashDialogToggle(false);
  setDepositDialogToggle(false);
  setWithdrawDialogToggle(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
}

const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  var sum = 0;
  for (var i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  var rest = sum % 11;
  var digit1 = (rest < 2) ? 0 : (11 - rest);
  sum = 0;
  for (var i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rest = sum % 11;
  var digit2 = (rest < 2) ? 0 : (11 - rest);
  return (digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10)));
}


const handlePixInfoSubmit = (): void => {
  if (isPersonalBtnReady.value) {
    setPixInfo(pixInfoItem.value);
    confirmValidation.value = true;
    // notificationText.value = t('deposit_dialog.personal_information.confirm_success_text');
    // checkIcon.value = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
    // notificationShow.value = !notificationShow.value;
    const toast = useToast();
    toast.success(t('deposit_dialog.personal_information.confirm_success_text'), {
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
      pixInfoMenuShow.value = false;
    }, 2000)
  }
}

const pixInfoToggle = computed(() => {
  const { getPixInfoToggle } = storeToRefs(depositStore());
  return getPixInfoToggle.value
})

watch(pixInfoToggle, (value) => {
  pixInfoMenuShow.value = value;
})

const userInfo = computed((): GetUserInfo => {
  const { getUserInfo } = storeToRefs(authStore());
  pixInfoItem.value.id = getUserInfo.value.id_number;
  pixInfoItem.value.first_name = getUserInfo.value.first_name;
  pixInfoItem.value.last_name = getUserInfo.value.last_name;
  setPixInfo(pixInfoItem.value);
  return getUserInfo.value;
})

watch(userInfo, (value) => {
  pixInfoItem.value.id = value.id_number;
  pixInfoItem.value.first_name = value.first_name;
  pixInfoItem.value.last_name = value.last_name;
  setPixInfo(pixInfoItem.value);
})

const depositDialogToggle = computed(() => {
  const { getDepositDialogToggle } = storeToRefs(appBarStore());
  return getDepositDialogToggle.value
})

const depositHeaderBlurEffectShow = computed(() => {
  const { getDepositHeaderBlurEffectShow } = storeToRefs(appBarStore());
  return getDepositHeaderBlurEffectShow.value
})

const withdrawDialogToggle = computed(() => {
  const { getWithdrawDialogToggle } = storeToRefs(appBarStore());
  return getWithdrawDialogToggle.value
})

watch(cashToggleSwitch, (newValue) => {
  if (newValue) {
    // pixInfoItem.value.id = "";
    // pixInfoItem.value.first_name = "";
    // pixInfoItem.value.last_name = "";
    isPersonalBtnReady.value = false;
    confirmValidation.value = false;

    setWithdrawDialogToggle(true);
    setDepositDialogToggle(false);
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    setDepositBlurEffectShow(false);

    depositCheckboxColor.value = "#7782AA";
    withdrawCheckboxColor.value = "#ffffff";
  } else {
    // pixInfoItem.value.id = "";
    // pixInfoItem.value.first_name = "";
    // pixInfoItem.value.last_name = "";
    isPersonalBtnReady.value = false;
    confirmValidation.value = false;

    setWithdrawDialogToggle(false);
    setDepositDialogToggle(true);
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    setDepositBlurEffectShow(false);

    depositCheckboxColor.value = "#ffffff";
    withdrawCheckboxColor.value = "#7782AA";
  }
}, { deep: true });

watch(pixInfoMenuShow, (value) => {
  if (pixInfoItem.value.id != "" && pixInfoItem.value.first_name != "" && pixInfoItem.value.last_name != "") {
    isPersonalBtnReady.value = true;
    confirmValidation.value = true;
  } else {
    isPersonalBtnReady.value = false;
    confirmValidation.value = false;
  }
  setDepositBlurEffectShow(pixInfoMenuShow.value == true ? true : false)
  if (!value) {
    setPixInfoToggle(false);
  }
})

const depositTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', depositCheckboxColor.value)
  }
  return el
}

const withdrawTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', withdrawCheckboxColor.value)
  }
  return el
}


onMounted(() => {
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  if (depositDialogToggle.value) {
    cashToggleSwitch.value = false;
  }
  if (withdrawDialogToggle.value) {
    cashToggleSwitch.value = true;
  }
})
</script>

<template>
  <div
    class="mobile-cash-header"
    :class="depositHeaderBlurEffectShow ? 'm-deposit-header-bg-blur' : ''"
    
  >
    <div
      class="d-flex align-center relative"
      :class="pixInfoMenuShow ? 'm-header-dropped' : 'm-header'"
    >
      <v-menu
        offset="-5"
        :close-on-content-click="false"
        content-class="m-personal-info-menu"
        v-model:model-value="pixInfoMenuShow"
        :transition="{
          enterActiveClass: 'my-enter-active-class',
          leaveActiveClass: 'my-leave-active-class',
        }"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            class="m-deposit-header-btn"
            v-bind="props"
            @click="handlePersonalInfoToggle"
          >
            <div class="m-deposit-header-account-bg relative">
              <div class="m-deposit-header-account-bg-1">
                <img
                  src="@/assets/public/svg/icon_public_59.svg"
                  width="16"
                  class="deposit-header-account-position"
                />
              </div>
            </div>
            <!-- <v-icon class="header-mdi-icon">mdi-chevron-right</v-icon> -->
            <img
              src="@/assets/public/svg/icon_public_11.svg"
              width="16"
              class="ml-1"
              v-if="!pixInfoMenuShow"
            />
            <img
              src="@/assets/public/svg/icon_public_50.svg"
              width="16"
              class="ml-1"
              v-else
            />
          </v-btn>
        </template>
        <v-list
          theme="dark"
          bg-color="#1D2027"
          class="px-2"
          :width="mobileWidth > 600 ? 471 : mobileWidth"
        >
          <v-list-item class="pt-4">
            <div class="text-center text-400-12 gray">
              {{ t("deposit_dialog.personal_information.header_text") }}
            </div>
          </v-list-item>
          <div
            @click="handleConfirmValidation"
            class="m-personal-information-id-text mx-4"
          >
            <v-text-field
              :label="t('deposit_dialog.personal_information.id_text')"
              style="margin: 0px"
              class="form-textfield dark-textfield"
              variant="solo"
              density="comfortable"
              :disabled="userInfo.id_number != ''"
              append-icon="mdi"
              color="#7782AA"
              v-model="pixInfoItem.id"
              @input="handlePixInfoID"
            />
            <img
              src="@/assets/public/svg/icon_public_19.svg"
              class="personal-info-key-position"
              v-if="confirmValidation"
            />
          </div>
          <div
            class="mx-4 d-flex m-personal-information-id-text"
            @click="handleConfirmValidation"
          >
            <v-text-field
              :label="t('deposit_dialog.personal_information.first_name')"
              class="form-textfield dark-textfield mx-1"
              variant="solo"
              density="comfortable"
              append-icon="mdi"
              color="#7782AA"
              v-model="pixInfoItem.first_name"
              :disabled="userInfo.first_name != ''"
              @input="handlePixInfoFirstName"
              @mousedown="handleConfirmValidation"
            />
            <img
              src="@/assets/public/svg/icon_public_19.svg"
              class="personal-info-key-position-1"
              v-if="confirmValidation"
            />
            <v-text-field
              :label="t('deposit_dialog.personal_information.last_name')"
              class="form-textfield dark-textfield mx-1"
              variant="solo"
              density="comfortable"
              append-icon="mdi"
              color="#7782AA"
              v-model="pixInfoItem.last_name"
              :disabled="userInfo.last_name != ''"
              @input="handlePixInfoLastName"
            >
            </v-text-field>
            <img
              src="@/assets/public/svg/icon_public_19.svg"
              class="personal-info-key-position-2"
              v-if="confirmValidation"
            />
          </div>
          <v-list-item class="text-center">
            <v-btn
              class="mx-16 mt-2 mb-6 m-personal-confirm-btn"
              :class="isPersonalBtnReady ? 'personal-btn-ready' : ''"
              height="48px"
              :onclick="handlePixInfoSubmit"
            >
              {{ t("deposit_dialog.personal_information.confirm_text") }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="m-deposit-toggle">
        <input type="checkbox" id="m-deposit-toggle" v-model="cashToggleSwitch" />
        <label for="m-deposit-toggle">
          <div class="deposit">
            <inline-svg
              :src="icon_public_60"
              width="18"
              height="18"
              :transform-source="depositTransform"
            >
            </inline-svg>
            <!-- <img src="@/assets/public/svg/icon_public_60.svg" width="18" /> -->
            <p class="text-700-10 ml-1">{{ t("appBar.deposit") }}</p>
          </div>
          <div class="withdraw">
            <inline-svg
              :src="icon_public_65"
              width="18"
              height="18"
              :transform-source="withdrawTransform"
            >
            </inline-svg>
            <!-- <img src="@/assets/public/svg/icon_public_65.svg" width="18" /> -->
            <p class="text-700-10 ml-1">{{ t("appBar.withdraw") }}</p>
          </div>
        </label>
      </div>
      <v-btn
        class="m-deposit-close-button"
        icon="true"
        @click="cashDialogShow"
        width="40"
        height="40"
      >
        <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
      </v-btn>
    </div>
    <!-- <Notification
      :notificationShow="notificationShow"
      :notificationText="notificationText"
      :checkIcon="checkIcon"
    /> -->
  </div>
</template>

<style lang="scss">
// header container
.mobile-cash-header {
  background-color:#1D2027;

  .m-header {
    text-align: center;
    border-radius: 0px 0px 8px 8px;
    background: #1D2027;
    /* Button Shadow */
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.5);
    height: 60px;
  }

  .m-header-dropped {
    text-align: center;
    border-radius: 0px;
    background: #1D2027;
    /* Button Shadow */
    height: 60px;
  }

  .m-deposit-header-btn {
    width: 70px !important;
    height: 60px !important;
    background: #1D2027 !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 25px;
  }

  .header-mdi-icon {
    font-weight: 800;
    font-size: 28px;
    color: #ffffff;
  }

  // close modal button
  .m-deposit-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 8px;
    right: 5px;
  }

  // deposit and withdraw toggle switch
  .m-deposit-toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    label {
      width: 196px;
      height: 40px;
      position: relative;
      display: block;
      background: #15161C;
      border-radius: 20px !important;
      cursor: pointer;
      transition: 0.3s;

      div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 14px;
      }

      .deposit {
        left: 14px;
        transition: 0.3s;
        color: white;

        img {
          width: 20px;
          height: 24px;
          margin-right: 4px;
        }
      }

      .withdraw {
        left: 111px;
        transition: 0.3s;
        color: #7782aa;

        img {
          width: 20px;
          margin-right: 4px;
        }
      }
    }

    label:after {
      content: "";
      width: 96px;
      height: 36px;
      position: absolute;
      top: 2px;
      left: 2px;
      background: #009B3A;
      border-radius: 18px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
      transition: 0.3s;
    }

    input {
      width: 0;
      height: 0;
      visibility: hidden;
      position: absolute;
    }

    input:checked + label:after {
      left: 97px;
      // transform: translateX(-100%);
    }

    label:active:after {
      width: 96px;
    }

    input:checked + label .deposit {
      color: #7782aa;
    }

    input:checked + label .withdraw {
      color: white;
    }
  }

  .v-list-item__prepend {
    padding-left: 20px;
  }

  .dark-textfield .v-field__field {
    background-color: #15161C !important;
  }

  .v-field--variant-solo {
    background: transparent !important;
  }
}

.m-deposit-header-account-bg {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 48px;
  background: #1D2027;
}

.m-deposit-header-account-bg-1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 38px;
  background: #1D2027;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.5);
}

.m-personal-confirm-btn {
  text-align: center;
  width: 150px;
  border-radius: 8px;
  background: #23262F;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

  .v-btn__content {
    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 14px !important;
    text-transform: none;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-personal-information-id-text {
  .v-input__append {
    width: 0px !important;
  }

  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .form-textfield div.v-field--variant-solo,
  .v-field--variant-solo-filled {
    background: transparent;
  }
}

.m-personal-info-menu {
  left: unset !important;
  top: 56px !important;
  border-radius: 0px 0px 25px 25px !important;

  .personal-info-key-position {
    position: absolute;
    top: 70px;
    right: 40px;
  }

  .personal-info-key-position-1 {
    position: absolute;
    top: 132px;
    left: 40%;
  }

  .personal-info-key-position-2 {
    position: absolute;
    top: 132px;
    right: 39px;
  }

  .v-input--horizontal .v-input__append {
    margin-inline-start: 0px !important;
  }

  .v-list {
    box-shadow: none !important;
  }
}

@media (max-width: 600px) {
  .m-personal-info-menu {
    transform-origin: top !important;

    .v-field__field {
      .v-label.v-field-label {
        font-family: "Inter";
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
}

@media (max-width: 600px) {
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
    font-family: Inter;
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
}

@media (max-width: 600px) {
  .my-enter-active-class {
    transform: translateY(0);
  }

  .my-leave-active-class {
    transform: translateY(0);
  }

  .personal-btn-ready {
    background: #009B3A;
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

    .v-btn__content {
      color: white;
    }
  }
}
.deposit-header-account-position {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.m-deposit-header-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  height: 70px !important;
}
</style>
