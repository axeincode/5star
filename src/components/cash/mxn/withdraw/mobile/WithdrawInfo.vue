<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import icon_public_09 from "@/assets/public/svg/icon_public_09.svg";
import { type GetUserInfo } from "@/interface/user";
import { authStore } from "@/store/auth";
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const props = defineProps<{ withdraw_type: string }>();
const { withdraw_type } = toRefs(props)
const withdrawMethodShow = ref<boolean>(false);
const selectedWithdrawMethodItem = ref<string>(t("withdraw_info_dialog.text_2"));
const withdrawMethodList = ref<Array<string>>([
  t("withdraw_info_dialog.text_2"),
  t("withdraw_info_dialog.text_3"),
]);
const bankCodeList = ref<any>({
  ABC_CAPITAL: "ABC CAPITAL",
  ACCENDO_BANCO: "ACCENDO BANCO",
  ACTINVER: "ACTINVER",
  AFIRME: "AFIRME",
  AKALA: "AKALA",
  AMERICAN_EXPRES: "AMERICAN EXPRES",
  ASP_INTEGRA_OPC: "ASP INTEGRA OPC",
  AUTOFIN: "AUTOFIN",
  AZTECA: "AZTECA",
  BAJIO: "BAJIO",
  BANAMEX: "BANAMEX",
  BANCO_FINTERRA: "BANCO FINTERRA",
  BANCO_S3: "BANCO S3",
  BANCOMEXT: "BANCOMEXT",
  BANCOPPEL: "BANCOPPEL",
  BANCREA: "BANCREA",
  BANJERCITO: "BANJERCITO",
  BANK_OF_AMERICA: "BANK OF AMERICA",
  BANKAOOL: "BANKAOOL",
  BANOBRAS: "BANOBRAS",
  BANORTE: "BANORTE",
  BANREGIO: "BANREGIO",
  BANSEFI: "BANSEFI",
  BANSI: "BANSI",
  BANXICO: "BANXICO",
  BARCLAYS: "BARCLAYS",
  BBASE: "BBASE",
  BBVA_BANCOMER: "BBVA BANCOMER",
  BMONEX: "BMONEX",
  CAJA_POP_MEXICA: "CAJA POP MEXICA",
  CAJA_TELEFONIST: "CAJA TELEFONIST",
  CB_INTERCAM: "CB INTERCAM",
  CI_BOLSA: "CI BOLSA",
  CIBANCO: "CIBANCO",
  CoDi_Valida: "CoDi Valida",
  COMPARTAMOS: "COMPARTAMOS",
  CONSUBANCO: "CONSUBANCO",
  CREDICAPITAL: "CREDICAPITAL",
  CREDIT_SUISSE: "CREDIT SUISSE",
  CRISTOBAL_COLON: "CRISTOBAL COLON",
  DEUTSCHE: "DEUTSCHE",
  DONDE: "DONDE",
  ESTRUCTURADORES: "ESTRUCTURADORES",
  EVERCORE: "EVERCORE",
  FINAMEX: "FINAMEX",
  FINCOMUN: "FINCOMUN",
  FOMPED: "FOMPED",
  FONDO_FIRA: "FONDO (FIRA)",
  GBM: "GBM",
  HDI_SEGUROS: "HDI SEGUROS",
  HIPOTECARIA_FED: "HIPOTECARIA FED",
  HSBC: "HSBC",
  ICBC: "ICBC",
  INBURSA: "INBURSA",
  INDEVAL: "INDEVAL",
  INMOBILIARIO: "INMOBILIARIO",
  INTERCAM_BANCO: "INTERCAM BANCO",
  INVERCAP: "INVERCAP",
  INVEX: "INVEX",
  JP_MORGAN: "JP MORGAN",
  KUSPIT: "KUSPIT",
  LIBERTAD: "LIBERTAD",
  MASARI: "MASARI",
  MIFEL: "MIFEL",
  MIZUHO_BANK: "MIZUHO BANK",
  MONEXCB: "MONEXCB",
  MUFG: "MUFG",
  MULTIVA_BANCO: "MULTIVA BANCO",
  MULTIVA_CBOLSA: "MULTIVA CBOLSA",
  NAFIN: "NAFIN",
  PAGATODO: "PAGATODO",
  PROFUTURO: "PROFUTURO",
  REFORMA: "REFORMA",
  SABADELL: "SABADELL",
  SANTANDER: "SANTANDER",
  SANTANDER2: "SANTANDER2",
  SCOTIABANK: "SCOTIABANK",
  SHINHAN: "SHINHAN",
  TP: "STP",
  TRANSFER: "TRANSFER",
  UNAGRA: "UNAGRA",
  VALMEX: "VALMEX",
  VALUE: "VALUE",
  VE_POR_MAS: "VE POR MAS",
  VECTOR: "VECTOR",
  VOLKSWAGEN: "VOLKSWAGEN"
})
const accountTypeList = ref<Array<string>>([
  "Clabe"
])
const bankCodeMenuShow = ref<boolean>(false);
const accountTypeMenuShow = ref<boolean>(false);
const typeMenuShow = ref<boolean>(false);

const withdrawInfoItem = ref<any>({
  name: "",
  email: "",
  phone: "",
  bank_code: "",
  account_type: "",
  clabe_number: "",
  type: "RFC",
  rfc: "",
  paypal_account: "",
})

const typeList = ref<Array<string>>([
  "RFC",
  "CURP"
]);

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
  withdrawInfoItem.value.account_type = item;
}
const handleSelectType = (item: string) => {
  withdrawInfoItem.value.type = item;
}
const svgTransform = (el: any, color: string) => {
  el.children[0].setAttribute("fill", color);
  return el;
};

const addWithdrawInfo = () => {
  localStorage.setItem(userInfo.value.id.toString(), JSON.stringify(withdrawInfoItem.value))
}

onMounted(() => {
  selectedWithdrawMethodItem.value = withdraw_type.value.toLocaleLowerCase() == t("withdraw_info_dialog.text_2").toLocaleLowerCase() ? t("withdraw_info_dialog.text_2") : t("withdraw_info_dialog.text_3")
  const withdrawInfo = localStorage.getItem(userInfo.value.id.toString());
  if (withdrawInfo !== null) {
    withdrawInfoItem.value = withdrawInfo;
  }
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
    <div class="m-withdraw-info-dialog-body px-4 pt-2 pb-4">
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
              :append-icon="withdrawMethodShow ? 'mdi-chevron-down' : 'mdi-chevron-up'"
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

      <!------------------- name ------------------------>
      <div class="text-400-12 gray px-4 mt-4">{{ t("withdraw_info_dialog.text_4") }}</div>
      <div class="mt-2 m-withdraw-info-input-card px-4">
        <input
          type="text"
          v-model="withdrawInfoItem.name"
          :placeholder="t('withdraw_info_dialog.text_5')"
          class="text-700-12"
        />
      </div>

      <!------------------- e-mail ------------------------>
      <div class="text-400-12 gray px-4 mt-4">{{ t("withdraw_info_dialog.text_6") }}</div>
      <div class="mt-2 m-withdraw-info-input-card px-4">
        <input
          type="text"
          v-model="withdrawInfoItem.email"
          :placeholder="t('withdraw_info_dialog.text_7')"
          class="text-700-12"
        />
      </div>

      <!------------------- phone number ------------------------>
      <div class="text-400-12 gray px-4 mt-4">{{ t("withdraw_info_dialog.text_8") }}</div>
      <div class="mt-2 m-withdraw-info-input-card px-4 d-flex align-center">
        <div class="text-600-12 white">+52 123456</div>
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
      <div class="text-400-12 gray px-4 mt-4">{{ t("withdraw_info_dialog.text_9") }}</div>
      <v-menu
        offset="4"
        v-model:model-value="bankCodeMenuShow"
        content-class="m-withdraw-method-menu"
      >
        <template v-slot:activator="{ props }">
          <v-card color="#15161C" theme="dark" class="mt-2 m-withdraw-info-input-card">
            <v-list-item
              v-bind="props"
              class=""
              value="withdraw method dropdown"
              :append-icon="bankCodeMenuShow ? 'mdi-chevron-down' : 'mdi-chevron-up'"
            >
              <v-list-item-title
                class="ml-2 text-400-12 d-flex align-center"
                :class="withdrawInfoItem.bank_code == '' ? 'gray' : 'white'"
              >
                {{
                  withdrawInfoItem.bank_code == ""
                    ? t("withdraw_info_dialog.text_10")
                    : bankCodeList[withdrawInfoItem.bank_code]
                }}
              </v-list-item-title>
            </v-list-item>
          </v-card>
        </template>
        <v-list
          theme="dark"
          bg-color="#23262F"
          class="m-withdraw-method-list px-2"
          style="height: 160px !important; overflow-y: auto"
        >
          <template v-for="(key, index) in Object.keys(bankCodeList)" :key="index">
            <div
              class="m-withdraw-info-menu-list text-700-12 white d-flex align-center px-4"
              :class="withdrawInfoItem.bank_code == key ? 'active' : ''"
              @click="handleSelectBankCode(key)"
            >
              {{ bankCodeList[key] }}
            </div>
          </template>
        </v-list>
      </v-menu>

      <template v-if="selectedWithdrawMethodItem == t('withdraw_info_dialog.text_2')">
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
                :append-icon="accountTypeMenuShow ? 'mdi-chevron-down' : 'mdi-chevron-up'"
              >
                <v-list-item-title
                  class="ml-2 text-400-12 d-flex align-center"
                  :class="withdrawInfoItem.account_type == '' ? 'gray' : 'white'"
                >
                  {{
                    withdrawInfoItem.account_type == ""
                      ? t("withdraw_info_dialog.text_12")
                      : withdrawInfoItem.account_type
                  }}
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#23262F" class="m-withdraw-method-list px-2">
            <template v-for="(item, index) in accountTypeList" :key="index">
              <div
                class="m-withdraw-info-menu-list text-700-12 white d-flex align-center px-4"
                :class="withdrawInfoItem.account_type == item ? 'active' : ''"
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
            v-model="withdrawInfoItem.clabe_number"
            :placeholder="t('withdraw_info_dialog.text_14')"
            class="text-700-12"
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
                :append-icon="typeMenuShow ? 'mdi-chevron-down' : 'mdi-chevron-up'"
              >
                <v-list-item-title
                  class="ml-2 text-400-12 d-flex align-center"
                  :class="withdrawInfoItem.type == '' ? 'gray' : 'white'"
                >
                  {{ withdrawInfoItem.type }}
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#23262F" class="m-withdraw-method-list px-2">
            <template v-for="(item, index) in typeList" :key="index">
              <div
                class="m-withdraw-info-menu-list text-700-12 white d-flex align-center px-4"
                :class="withdrawInfoItem.type == item ? 'active' : ''"
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
            v-model="withdrawInfoItem.rfc"
            :placeholder="t('withdraw_info_dialog.text_17')"
            class="text-700-12"
          />
        </div>
      </template>
      <template v-else>
        <!------------------- paypal account ------------------------>
        <div class="text-400-12 gray px-4 mt-4">
          {{ t("withdraw_info_dialog.text_20") }}
        </div>
        <div class="mt-2 m-withdraw-info-input-card px-4">
          <input
            type="text"
            v-model="withdrawInfoItem.paypal_account"
            :placeholder="t('withdraw_info_dialog.text_7')"
            class="text-700-12"
          />
        </div>
      </template>

      <!------------------- add ------------------------>
      <v-row class="ma-0 pa-0 mt-4 align-center">
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
    overflow-y: auto;

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
