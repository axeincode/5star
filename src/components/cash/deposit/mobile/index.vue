<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { appBarStore } from '@/store/appBar';
import { authStore } from "@/store/auth";
import { depositStore } from '@/store/deposit';
import { type GetCurrencyItem } from '@/interface/deposit';
import { type GetPaymentItem } from '@/interface/deposit';
import { type GetPixInfo } from '@/interface/deposit';
import { type GetUserInfo } from "@/interface/user";
import ValidationBox from '@/components/cash/deposit/ValidationBox.vue';
import Notification from "@/components/global/notification/index.vue";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia';
import store from '@/store';
import MParticipatingDialog  from "@/components/cash/deposit/mobile/MParticipatingDialog.vue";

const { name, width } = useDisplay();
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();

const { setDepositBlurEffectShow } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { dispatchUserDepositCfg } = depositStore();
const { dispatchUserDepositSubmit } = depositStore();
import router from '@/router';

const selectedCurrencyItem = ref<GetCurrencyItem>({
  icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
  name: "BRL",
  value: 5.25
})
const selectedPaymentItem = ref<GetPaymentItem>({
  id: "",
  icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
  name: "PIX",
  description: "20~150.000 BRL",
  min: 149,
  max: 588.88
})

const currencyTemplateList = [
  {
    icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
    name: "BRL",
    value: 5.25
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_85.svg", import.meta.url).href,
    name: "PHP",
    value: 0
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_86.svg", import.meta.url).href,
    name: "PEN",
    value: 0
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_87.svg", import.meta.url).href,
    name: "MXN",
    value: 0
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_88.svg", import.meta.url).href,
    name: "CLP",
    value: 0
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_89.svg", import.meta.url).href,
    name: "USD",
    value: 0
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_90.svg", import.meta.url).href,
    name: "COP",
    value: 0
  },
]

const currencyList = ref<Array<GetCurrencyItem>>([])

const paymentList = ref<Array<GetPaymentItem>>([
  {
    id: "1",
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX_1",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
  {
    id: "2",
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX_2",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
  {
    id: "3",
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX_3",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
  {
    id: "4",
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX_4",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
  {
    id: "5",
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX_5",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
  {
    id: "6",
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX_6",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
  {
    id: "7",
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX_7",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
  {
    id: "8",
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX_8",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
])

const depositAmountList = ref<Array<string>>([
  '20',
  '200',
  '500',
  '2000',
  '5000',
  '19999',
])

const depositBlurEffectShow = computed(() => {
  const { getDepositBlurEffectShow } = storeToRefs(appBarStore());
  return getDepositBlurEffectShow.value
})

const depositToggleSwitch = ref<boolean>(false);

const depositAmountUnit = ref<string>("R$");

const depositRate = ref<number>(0);

const depositAmount = ref<string | number>(0)

const bonusCheck = ref<boolean>(false);

const promotionDialogVisible = ref<boolean>(false);

const notificationShow = ref<boolean>(false);
const currencyMenuShow = ref<boolean>(false);
const paymentMenuShow = ref<boolean>(false);

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const notificationText = ref<string>("");

const isShowAmountValidation = ref<boolean>(false);

const isDepositBtnReady = ref<boolean>(false);

const userInfo = computed((): GetUserInfo => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
})

const pixInfo = computed(() => {
  const { getPixInfo } = storeToRefs(depositStore());
  return getPixInfo.value
})

const depositConfig = computed(() => {
  const { getDepositCfg } = storeToRefs(depositStore());
  return getDepositCfg.value
})

const filterByKeyArray = (arr: any, key: any, valueArr: any) => {
  return arr.filter((obj: any) => {
    const objValues = obj[key];
    return valueArr.every((value: any) => objValues.includes(value));
  });
};

watch(depositConfig, (newValue) => {
  paymentList.value = [];
  newValue["cfg"][selectedCurrencyItem.value.name].map((item: any) => {
    paymentList.value.push({
      id: item.channel_id,
      icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
      name: item.channel_name,
      description: item.min + "~" + item.max + " " + item.channel_type,
      min: item.min,
      max: item.max
    })
  })
  const keyArray = Object.keys(newValue["cfg"]);
  const filteredObjects = filterByKeyArray(currencyTemplateList, 'name', keyArray);
  currencyList.value = filteredObjects;
  selectedPaymentItem.value = paymentList.value[0];
  depositAmountList.value = newValue["list"];
}, { deep: true });

const handleDepositAmount = (amount: string) => {
  depositAmount.value = amount;
}

const handleSelectCurrency = (item: GetCurrencyItem) => {
  selectedCurrencyItem.value = item;
  paymentList.value = [];
  depositConfig.value["cfg"][selectedCurrencyItem.value.name]?.map((item: any) => {
    paymentList.value.push({
      id: item.channel_id,
      icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
      name: item.channel_name,
      description: item.min + "~" + item.max + " " + item.channel_type,
      min: item.min,
      max: item.max
    })
  })
}

const handleSelectPayment = (item: GetPaymentItem) => {
  selectedPaymentItem.value = item;
}

const validateAmount = (): boolean => {
  return Number(depositAmount.value) >= 20 && Number(depositAmount.value) <= 100000;
}

const handleAmountInputFocus = (): void => {
  if (validateAmount()) {
    isShowAmountValidation.value = false;
  } else {
    isShowAmountValidation.value = true;
  }
}

const handleAmountInputChange = (): void => {
  if (validateAmount()) {
    isShowAmountValidation.value = false;
  } else {
    isShowAmountValidation.value = true;
  }
}

const handleAmountInputBlur = (): void => {
  // if (validateAmount()) {
  isShowAmountValidation.value = false;
  // } else {
  //     isShowAmountValidation.value = true;
  // }
}

const success = computed(() => {
  const { getSuccess } = storeToRefs(depositStore());
  return getSuccess.value
})

const errMessage = computed(() => {
  const { getErrMessage } = storeToRefs(depositStore());
  return getErrMessage.value
})

const handleDepositSubmit = async () => {
  await dispatchUserDepositSubmit({
    id_number: pixInfo.value.id,
    first_name: pixInfo.value.first_name,
    last_name: pixInfo.value.last_name,
    channels_id: selectedPaymentItem.value.id,
    amount: depositConfig.value["bonus"][0]["type"] == 0 ? Number(depositAmount.value) + Number(depositRate.value) : Number((Number(depositAmount.value) * ( 1 + Number(depositRate.value))).toFixed(2))
  })
  if (success.value) {
    ElNotification({
      icon: SuccessIcon,
      title: "Successfully submitted, need to modify please contact customer service",
      duration: 3000,
    })
    setDepositDialogToggle(false);
    setCashDialogToggle(false);
    router.push({ name: "Dashboard" })
  } else {
    ElNotification({
      icon: WarningIcon,
      title: errMessage.value,
      duration: 3000,
    })
  }
}

const handleParticipate = () => {
  promotionDialogVisible.value = false
}

watch(bonusCheck, (newValue) => {
  console.log(newValue)
  if (newValue) {
    promotionDialogVisible.value = newValue

  }
})

watch(depositAmount, (newValue) => {
  alert
  if (validateAmount()) {
    isDepositBtnReady.value = true;
  } else {
    isDepositBtnReady.value = false;
  }
  isShowAmountValidation.value = !validateAmount();
  if (depositConfig.value["bonus"][0]["type"] == 0) {
    if (depositConfig.value["bonus"][0]["award"] > depositConfig.value["bonus"][0]["min"] && depositConfig.value["bonus"][0]["award"] < depositConfig.value["bonus"][0]["max"]) {
      depositRate.value = depositConfig.value["bonus"][0]["award"]
    } else if (depositConfig.value["bonus"][0]["min"] == depositConfig.value["bonus"][0]["max"] && depositConfig.value["bonus"][0]["min"] == depositConfig.value["bonus"][0]["award"]) {
      depositRate.value = depositConfig.value["bonus"][0]["min"];
    } else if (depositConfig.value["bonus"][0]["max"] == 0 && depositConfig.value["bonus"][0]["award"] > depositConfig.value["bonus"][0]["min"]) {
      depositRate.value = depositConfig.value["bonus"][0]["award"]
    }
  } else if (depositConfig.value["bonus"][0]["type"] == 1) {
    const bonus = Number(depositAmount.value) * Number(depositConfig.value["bonus"][0]["rate"]);
    if (bonus > depositConfig.value["bonus"][0]["min"] && bonus < depositConfig.value["bonus"][0]["max"]) {
      depositRate.value = depositConfig.value["bonus"][0]["rate"]
    } else if (depositConfig.value["bonus"][0]["min"] == depositConfig.value["bonus"][0]["max"] && depositConfig.value["bonus"][0]["min"] == bonus) {
      depositRate.value = depositConfig.value["bonus"][0]["rate"]
    } else if (depositConfig.value["bonus"][0]["max"] == 0 && bonus > depositConfig.value["bonus"][0]["min"]) {
      depositRate.value = depositConfig.value["bonus"][0]["rate"]
    }
  }
})

watch(depositToggleSwitch, (newValue) => {
  if (newValue) {
    setWithdrawDialogToggle(true);
    setDepositDialogToggle(false);
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    setDepositBlurEffectShow(false);
  } else {
    setWithdrawDialogToggle(false);
    setDepositDialogToggle(true);
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    setDepositBlurEffectShow(false);
  }
})

watch(currencyMenuShow, (value) => {
  if (currencyMenuShow.value && currencyList.value.length < 2) {
    currencyMenuShow.value = false
  }
})

onMounted(async () => {
  await dispatchUserDepositCfg();
})
</script>

<template>
  <div
    class="mobile-deposit-container"
    :class="depositBlurEffectShow ? 'deposit-bg-blur' : ''"
  >
    <v-row class="mt-6 mx-6 text-400-12 gray">
      {{ t("deposit_dialog.deposit_currency") }}
    </v-row>
    <v-menu offset="4" class="mt-1" v-model:model-value="currencyMenuShow">
      <template v-slot:activator="{ props }">
        <v-card
          color="#1C1929"
          theme="dark"
          class="mx-4 mt-4 m-deposit-card-height"
          style="border-radius: 12px"
        >
          <v-list-item
            v-bind="props"
            class="currency-item m-deposit-card-height"
            value="currency dropdown"
            :append-icon="currencyMenuShow ? 'mdi-chevron-down' : 'mdi-chevron-right'"
          >
            <template v-slot:prepend>
              <img :src="selectedCurrencyItem.icon" width="20" />
            </template>
            <v-list-item-title class="ml-2 text-400-12">{{
              selectedCurrencyItem.name
            }}</v-list-item-title>
          </v-list-item>
        </v-card>
      </template>
      <v-list theme="dark" bg-color="#181522" class="px-2">
        <v-list-item
          class="currency-item pl-6"
          :value="currencyItem.name"
          :class="
            selectedCurrencyItem.name == currencyItem.name ? 'currency-selected-item' : ''
          "
          v-for="(currencyItem, currencyIndex) in currencyList"
          :key="currencyIndex"
          @click="handleSelectCurrency(currencyItem)"
        >
          <template v-slot:prepend>
            <img :src="currencyItem.icon" width="20" />
          </template>
          <v-list-item-title class="ml-2 text-400-12">
            {{ currencyItem.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-row class="mt-6 mx-6 text-400-12 gray">
      {{ t("deposit_dialog.choose_payment_method") }}
    </v-row>
    <v-menu offset="4" class="mt-1" v-model:model-value="paymentMenuShow">
      <template v-slot:activator="{ props }">
        <v-card
          color="#1C1929"
          theme="dark"
          class="mx-4 mt-4 m-deposit-card-height"
          style="border-radius: 12px"
        >
          <v-list-item
            v-bind="props"
            class="payment-item m-deposit-card-height"
            value="payment dropdown"
            :append-icon="paymentMenuShow ? 'mdi-chevron-down' : 'mdi-chevron-right'"
          >
            <template v-slot:prepend>
              <img :src="selectedPaymentItem.icon" width="52" />
            </template>
            <v-list-item-title class="ml-2 text-400-12">{{
              selectedPaymentItem.name
            }}</v-list-item-title>
          </v-list-item>
        </v-card>
      </template>
      <v-list theme="dark" bg-color="#181522">
        <v-row class="m-payment-width-370">
          <v-col
            cols="6"
            v-for="(paymentItem, paymentIndex) in paymentList"
            :key="paymentIndex"
            class="pa-1"
          >
            <v-card color="#1C1929" theme="dark" class="text-center">
              <v-list-item
                class="payment-select-item pa-2"
                :value="paymentItem.name"
                @click="handleSelectPayment(paymentItem)"
              >
                <img :src="paymentItem.icon" width="62" />
                <v-list-item-title class="text-400-10">{{
                  paymentItem.name
                }}</v-list-item-title>
                <v-list-item-title class="text-400-10">{{
                  paymentItem.description
                }}</v-list-item-title>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-list>
    </v-menu>
    <v-row class="mt-6 mx-6 text-400-12 gray">
      {{ t("deposit_dialog.deposit_amount") }}
    </v-row>
    <v-row class="mt-2 mx-2">
      <v-col
        cols="4"
        class="py-1 px-2"
        v-for="(depositAmountItem, depositAmountIndex) in depositAmountList"
        :key="depositAmountIndex"
      >
        <v-btn
          class="my-1 text-none"
          height="40px"
          :class="[
            depositAmountItem == depositAmount
              ? 'm-deposit-amout-btn-black'
              : 'm-deposit-amout-btn-white',
          ]"
          @click="handleDepositAmount(depositAmountItem)"
        >
          {{ depositAmountUnit }} {{ depositAmountItem }}
          <div class="m-deposit-amount-area" v-if="depositRate != 0 && !bonusCheck">
            <div class="m-deposit-amount-rate-text">
              {{ depositRate.toFixed(2) }}
            </div>
          </div>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-4 mx-1 relative">
      <v-text-field
        :label="`${t('deposit_dialog.amount')}(${selectedCurrencyItem.name})`"
        class="form-textfield dark-textfield"
        variant="solo"
        density="comfortable"
        color="#7782AA"
        style="border-radius: 12px"
        v-model="depositAmount"
        :onfocus="handleAmountInputFocus"
        :onblur="handleAmountInputBlur"
        @input="handleAmountInputChange"
      />
      <ValidationBox
        v-if="isShowAmountValidation"
        :validationText2="
          t('withdraw_dialog.validation.text_2') +
          selectedPaymentItem.min +
          ', ' +
          t('withdraw_dialog.validation.text_3') +
          selectedPaymentItem.max +
          '.'
        "
      />
    </v-row>
    <div class="mt-0 mx-4 d-flex align-center">
      <div>
        <v-checkbox hide-details icon class="amount-checkbox" v-model="bonusCheck" label="Not participating in promotional activities"/>
      </div>
      
      <img src="@/assets/public/svg/icon_public_22.svg" class="ml-auto" width="16" />
    </div>
    <v-row
      class="m-deposit-footer-text-position text-600-10 white justify-center mx-2"
      v-if="depositRate != 0"
    >
      {{ t("deposit_dialog.other_text") }} R${{ depositAmount }} + R${{
        depositConfig["bonus"][0]["type"] == 0
          ? depositRate
          : (Number(depositAmount) * depositRate).toFixed(2)
      }}
      {{ t("deposit_dialog.other_text_1") }}
    </v-row>
    <div class="m-deposit-btn-position">
      <v-btn
        class="ma-3 m-deposit-btn"
        :class="isDepositBtnReady ? 'm-deposit-btn-ready' : ''"
        width="-webkit-fill-available"
        height="48px"
        :onclick="handleDepositSubmit"
      >
        {{ t("deposit_dialog.deposit_btn_text") }}
      </v-btn>
    </div>
    <v-dialog v-model="promotionDialogVisible" width="326" content-class="m-promotion-dialog-position" @click:outside="handleParticipate">
        <MParticipatingDialog @promotionDialogHide="handleParticipate" />
    </v-dialog>
  </div>
</template>

<style lang="scss">
// container
.mobile-deposit-container {
  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .form-textfield div.v-field--variant-solo,
  .v-field--variant-solo-filled {
    background: transparent;
  }

  background-color: #211f31;
  height: 100%;

  .m-deposit-card-height {
    height: 40px;
  }

  .v-list-item__prepend {
    padding-left: 20px;
  }

  .currency-item {
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
  }

  .payment-item {
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
  }

  .m-deposit-amout-btn-black {
    background: #32cfec;
    border-radius: 4px;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    width: 100% !important;

    .v-btn__content {
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .m-deposit-amout-btn-white {
    background: #353652;
    border-radius: 4px;
    color: #ffffff;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    width: 100% !important;

    .v-btn__content {
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .m-deposit-amount-area {
    width: 37px;
    position: absolute;
    top: 0;
    right: 0;
    background: #f97001;
    border-radius: 0px 4px;
    height: 11px;
  }

  .m-deposit-amount-rate-text {
    position: absolute;
    top: 1px;
    right: 8px;
    font-size: 8px;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: normal;
  }

  .m-deposit-btn {
    text-align: center;
    background: #353652;

    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

    .v-btn__content {
      color: #fff;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .m-deposit-btn-ready {
    background: #32cfec;
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

    .v-btn__content {
      color: #000000;
    }
  }

  .dark-textfield .v-field__field {
    background-color: #1c1929 !important;
  }

  .v-field--variant-solo {
    background: transparent !important;
  }

  .amount-checkbox .v-input--selection-controls__ripple {
    padding: 16px!important;
    border:1px solid yellow!important;;
  }

  .amount-checkbox {
    i.v-icon {
      color: #1c1929;
      background-color: #01983a;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      margin-top: 4px;
    }

    i.mdi-checkbox-blank-outline {
      background-color: #1c1929;
      box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
      border-radius: 4px;
    }
  }

  .deposit-other-text {
    font-weight: 600;
    font-size: 12px;
    color: #ffffff;
  }
}

.m-deposit-btn-position {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
}

.m-deposit-footer-text-position {
  position: absolute;
  bottom: 128px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
}

.m-payment-width-370 {
  // width: 370px !important;
  margin: auto;
  height: 290px !important;
}

@media (max-width: 600px) {
  .deposit-bg-blur {
    filter: blur(4px) !important;
    -webkit-filter: blur(4px) !important;
    // filter: saturate(180%) blur(4px);
    // -webkit-filter: saturate(180%) blur(4px);
  }
}
.amount-checkbox {
  .v-label {
    color: #7782AA !important;
    // background: rgba(119, 130, 170, 1);
    font-weight: 400;
    font-size: 10px!important;
    font-family: "Inter";
    opacity: 1;
  }
}
.m-promotion-dialog-position {
    z-index: 2550;
    // top: -20px !important;
}

.v-dialog--persistent .v-dialog__content {
  transform: none !important;
}

</style>
