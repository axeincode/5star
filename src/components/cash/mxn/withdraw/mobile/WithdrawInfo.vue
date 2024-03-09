<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import icon_public_09 from "@/assets/public/svg/icon_public_09.svg";
import { type GetUserInfo } from "@/interface/user";
import { authStore } from "@/store/auth";
import { userStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import mxBankList from "@/utils/mx_bank";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useToast } from "vue-toastification";

const { t } = useI18n();
const props = defineProps<{ withdraw_type: string }>();
const { withdraw_type } = toRefs(props)
const withdrawMethodShow = ref<boolean>(false);
const selectedWithdrawMethodItem = ref<string>(t("withdraw_info_dialog.text_2"));
const withdrawMethodList = ref<Array<string>>([
  t("withdraw_info_dialog.text_2"),
  t("withdraw_info_dialog.text_3"),
]);
const accountTypeList = ref<Array<string>>([
  "Clabe"
])
const bankCodeMenuShow = ref<boolean>(false);
const accountTypeMenuShow = ref<boolean>(false);
const typeMenuShow = ref<boolean>(false);

const withdrawInfoItem = ref<any>({
  paypal: {
    name: "",
    email: "",
    paypal_account: "",
  },
  spei: {
    name: "",
    email: "",
    phone: "",
    bank_code: "",
    account_type: "",
    clabe_number: "",
    type: "RFC",
    rfc: "",
  }
})

const typeList = ref<Array<string>>([
  "RFC",
  "CURP"
]);

const userFundsIdentity = computed(() => {
  const { getUserFundsIdentity } = storeToRefs(userStore());
  return getUserFundsIdentity.value
})

const userInfo = computed((): GetUserInfo => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
})

watch(withdraw_type, (value) => {
  console.log(withdraw_type);
  selectedWithdrawMethodItem.value = value.toLocaleLowerCase() == t("withdraw_info_dialog.text_2").toLocaleLowerCase() ? t("withdraw_info_dialog.text_2") : t("withdraw_info_dialog.text_3")
})

const handleSelectWithdrawMethod = (item: string) => {
  selectedWithdrawMethodItem.value = item;
};
const handleSelectBankCode = (key: string) => {
  withdrawInfoItem.value.bank_code = key;
}
const handleSelectAccountType = (item: string) => {
  withdrawInfoItem.value.spei.account_type = item;
}
const handleSelectType = (item: string) => {
  withdrawInfoItem.value.spei.type = item;
}
const svgTransform = (el: any, color: string) => {
  el.children[0].setAttribute("fill", color);
  return el;
};

const addWithdrawInfo = () => {
  localStorage.setItem(userInfo.value.id.toString(), JSON.stringify(withdrawInfoItem.value))
  const toast = useToast();
  toast.success('Successfully added !', {
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

watch(withdrawInfoItem, (newValue) => {
  if (newValue.spei.clabe_number.length > 2) {
    withdrawInfoItem.value.spei.bank_code = Object.keys(mxBankList).filter(item => item.slice(-3) === newValue.spei.clabe_number.substring(0, 3))[0];
  } else {
    withdrawInfoItem.value.spei.bank_code = "";
  }
}, { immediate: true, deep: true });

onMounted(() => {
  selectedWithdrawMethodItem.value = withdraw_type.value.toLocaleLowerCase() == t("withdraw_info_dialog.text_2").toLocaleLowerCase() ? t("withdraw_info_dialog.text_2") : t("withdraw_info_dialog.text_3")
  const withdrawInfo = localStorage.getItem(userInfo.value.id.toString());
  if (withdrawInfo !== null) {
    withdrawInfoItem.value = JSON.parse(withdrawInfo);
  }
  withdrawInfoItem.value.spei.clabe_number = userFundsIdentity.value.identity.SPEI != undefined ? userFundsIdentity.value.identity.SPEI.bank_number : "";
  withdrawInfoItem.value.spei.rfc = userFundsIdentity.value.identity.SPEI != undefined ? userFundsIdentity.value.identity.SPEI.id_number : "";
  withdrawInfoItem.value.spei.name = userFundsIdentity.value.identity.SPEI != undefined ? userFundsIdentity.value.identity.SPEI.user_name : "";
  withdrawInfoItem.value.paypal.paypal_account = userFundsIdentity.value.identity.Paypal != undefined ? userFundsIdentity.value.identity.Paypal.bank_number : "";
  withdrawInfoItem.value.paypal.name = userFundsIdentity.value.identity.Paypal != undefined ? userFundsIdentity.value.identity.Paypal.user_name : "";
})
</script>

<template>
  <div class="m-withdraw-info-container">
    <div class="m-withdraw-info-dialog-header">
      <v-btn
        class="m-close-button"
        icon="true"
        width="24"
        height="24"
        @click="$.emit('closeWithdrawInfoDialog')"
      >
        <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
      </v-btn>
    </div>
    <div class="m-withdraw-info-dialog-body px-4 py-2 mb-16">
      <div class="text-700-14 white text-center">
        {{ t("withdraw_info_dialog.text_1") }}
      </div>

      <!------------------- withdraw method menu ------------------------>
      <v-menu
        offset="4"
        v-model:model-value="withdrawMethodShow"
        content-class="m-withdraw-method-menu"
      >
        <template v-slot:activator="{ props }">
          <v-card color="#15161C" theme="dark" class="mt-2 m-withdraw-info-input-card">
            <v-list-item
              v-bind="props"
              class=""
              value="withdraw method dropdown"
              :append-icon="withdrawMethodShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            >
              <v-list-item-title class="ml-2 text-400-12 d-flex align-center">
                {{ selectedWithdrawMethodItem }}
              </v-list-item-title>
            </v-list-item>
          </v-card>
        </template>
        <v-list theme="dark" bg-color="#23262F" class="m-withdraw-method-list px-2">
          <template v-for="(item, index) in withdrawMethodList" :key="index">
            <div
              class="m-withdraw-info-menu-list text-700-12 white d-flex align-center px-4"
              :class="selectedWithdrawMethodItem == item ? 'active' : ''"
              @click="handleSelectWithdrawMethod(item)"
            >
              {{ item }}
            </div>
          </template>
        </v-list>
      </v-menu>

      <template v-if="selectedWithdrawMethodItem == t('withdraw_info_dialog.text_2')">
        <!------------------- name ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_4") }}
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4">
          <input
            type="text"
            v-model="withdrawInfoItem.spei.name"
            :placeholder="t('withdraw_info_dialog.text_5')"
            :disabled="userFundsIdentity.identity.SPEI != undefined"
            class="text-700-12"
          />
        </div>

        <!------------------- e-mail ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_6") }}
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4">
          <input
            type="text"
            v-model="withdrawInfoItem.spei.email"
            :placeholder="t('withdraw_info_dialog.text_7')"
            class="text-700-12"
          />
        </div>

        <!------------------- phone number ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_8") }}
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4 d-flex align-center">
          <div class="text-600-12 white">+52 {{ userInfo.phone.substring(2) }}</div>
          <inline-svg
            :src="icon_public_09"
            width="20"
            height="20"
            :transform-source="(el: any) => svgTransform(el, '#12FF76')"
            style="margin-left: auto"
            v-if="userInfo.phone_confirmd"
          >
          </inline-svg>
        </div>
        <!------------------- bank code ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_9") }}
        </div>
        <v-card color="#15161C" theme="dark" class="mt-2 m-withdraw-info-input-card">
          <v-list-item>
            <v-list-item-title
              class="ml-2 text-400-12 d-flex align-center"
              :class="withdrawInfoItem.spei.bank_code == '' ? 'gray' : 'white'"
            >
              {{
                withdrawInfoItem.spei.bank_code == ""
                  ? t("withdraw_info_dialog.text_10")
                  : mxBankList[withdrawInfoItem.spei.bank_code]
              }}
            </v-list-item-title>
          </v-list-item>
        </v-card>

        <!------------------- account type ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_11") }}
        </div>
        <v-menu
          offset="4"
          v-model:model-value="accountTypeMenuShow"
          content-class="m-withdraw-method-menu"
        >
          <template v-slot:activator="{ props }">
            <v-card color="#15161C" theme="dark" class="mt-2 m-withdraw-info-input-card">
              <v-list-item
                v-bind="props"
                class=""
                value="withdraw method dropdown"
                :append-icon="accountTypeMenuShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              >
                <v-list-item-title
                  class="ml-2 text-400-12 d-flex align-center"
                  :class="withdrawInfoItem.spei.account_type == '' ? 'gray' : 'white'"
                >
                  {{
                    withdrawInfoItem.spei.account_type == ""
                      ? t("withdraw_info_dialog.text_12")
                      : withdrawInfoItem.spei.account_type
                  }}
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#23262F" class="m-withdraw-method-list px-2">
            <template v-for="(item, index) in accountTypeList" :key="index">
              <div
                class="m-withdraw-info-menu-list text-700-12 white d-flex align-center px-4"
                :class="withdrawInfoItem.spei.account_type == item ? 'active' : ''"
                @click="handleSelectAccountType(item)"
              >
                {{ item }}
              </div>
            </template>
          </v-list>
        </v-menu>

        <!------------------- clabe number ------------------------>
        <div class="text-400-12 gray px-4 mt-4 d-flex align-center">
          {{ t("withdraw_info_dialog.text_13") }}
          <div class="blue text-decoration ml-auto">
            {{ t("withdraw_info_dialog.text_15") }}
          </div>
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4">
          <input
            type="text"
            v-model="withdrawInfoItem.spei.clabe_number"
            :placeholder="t('withdraw_info_dialog.text_14')"
            class="text-700-12"
            :disabled="userFundsIdentity.identity.SPEI != undefined"
          />
        </div>

        <!------------------- type ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_16") }}
        </div>
        <v-menu
          offset="4"
          v-model:model-value="typeMenuShow"
          content-class="m-withdraw-method-menu"
        >
          <template v-slot:activator="{ props }">
            <v-card color="#15161C" theme="dark" class="mt-2 m-withdraw-info-input-card">
              <v-list-item
                v-bind="props"
                class=""
                value="withdraw method dropdown"
                :append-icon="typeMenuShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              >
                <v-list-item-title
                  class="ml-2 text-400-12 d-flex align-center"
                  :class="withdrawInfoItem.spei.type == '' ? 'gray' : 'white'"
                >
                  {{ withdrawInfoItem.spei.type }}
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#23262F" class="m-withdraw-method-list px-2">
            <template v-for="(item, index) in typeList" :key="index">
              <div
                class="m-withdraw-info-menu-list text-700-12 white d-flex align-center px-4"
                :class="withdrawInfoItem.spei.type == item ? 'active' : ''"
                @click="handleSelectType(item)"
              >
                {{ item }}
              </div>
            </template>
          </v-list>
        </v-menu>

        <!------------------- RFC ------------------------>
        <div class="text-400-12 gray px-4 mt-4">RFC</div>
        <div class="mt-2 m-withdraw-info-input-card px-4">
          <input
            type="text"
            v-model="withdrawInfoItem.spei.rfc"
            :placeholder="t('withdraw_info_dialog.text_17')"
            :disabled="userFundsIdentity.identity.SPEI != undefined"
            class="text-700-12"
          />
        </div>
      </template>

      <template v-else>
        <!------------------- name ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_4") }}
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4">
          <input
            type="text"
            v-model="withdrawInfoItem.paypal.name"
            :placeholder="t('withdraw_info_dialog.text_5')"
            :disabled="userFundsIdentity.identity.Paypal != undefined"
            class="text-700-12"
          />
        </div>

        <!------------------- e-mail ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_6") }}
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4">
          <input
            type="text"
            v-model="withdrawInfoItem.paypal.email"
            :placeholder="t('withdraw_info_dialog.text_7')"
            class="text-700-12"
          />
        </div>

        <!------------------- phone number ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_8") }}
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4 d-flex align-center">
          <div class="text-600-12 white">+52 {{ userInfo.phone.substring(2) }}</div>
          <inline-svg
            :src="icon_public_09"
            width="20"
            height="20"
            :transform-source="(el: any) => svgTransform(el, '#12FF76')"
            style="margin-left: auto"
            v-if="userInfo.phone_confirmd"
          >
          </inline-svg>
        </div>
        <!------------------- paypal account ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_20") }}
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4">
          <input
            type="text"
            v-model="withdrawInfoItem.paypal.paypal_account"
            :placeholder="t('withdraw_info_dialog.text_7')"
            :disabled="userFundsIdentity.identity.Paypal != undefined"
            class="text-700-12"
          />
        </div>
      </template>

      <!------------------- add ------------------------>
      <v-row class="ma-0 pa-0 mt-4 align-center mb-16">
        <v-col
          cols="6"
          class="text-700-12 gray text-center"
          @click="$.emit('closeWithdrawInfoDialog')"
        >
          {{ t("withdraw_info_dialog.text_18").toUpperCase() }}
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn
            class="m-withdraw-info-add-btn"
            width="144"
            height="40"
            @click="addWithdrawInfo"
          >
            {{ t("withdraw_info_dialog.text_19") }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss">
.m-withdraw-info-container {
  height: 100vh;
  background: $color_1;

  .m-withdraw-info-dialog-header {
    height: 36px;
    position: fixed;
    top: 0px;
    width: 100%;

    .m-close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute;
      top: 6px;
      right: 8px;
    }
  }

  .m-withdraw-info-dialog-body {
    position: absolute;
    top: 36px;
    width: 100%;
    height: calc(100vh - 36px);
    overflow-y: scroll;

    .m-withdraw-info-input-card {
      box-shadow: 0px 0px 6px 1px #00000059 inset;
      border-radius: 8px;
      background: $color_3;
      height: 40px;

      input {
        height: 40px;
        color: white;
        width: 100%;
      }

      input:focus {
        outline: none;
      }

      input::placeholder {
        font-size: 12px;
        font-weight: 400;
        color: #7782aa;
      }
    }

    .m-withdraw-info-add-btn {
      background: $color_2;
      box-shadow: 0px 4px 6px 1px #0000004d;
      border-radius: 8px !important;

      .v-btn__content {
        font-family: Inter;
        font-size: 12px;
        font-weight: 700;
        color: #ffffff;
      }
    }
  }
}

.m-withdraw-method-menu {
  .m-withdraw-method-list {
    box-shadow: 0px 4px 6px 1px #0000004d !important;
    border-radius: 8px !important;

    .m-withdraw-info-menu-list {
      height: 36px !important;
      border-radius: 8px !important;
    }

    .active {
      border: 1px solid #00b25c !important;
    }
  }
}
</style>
