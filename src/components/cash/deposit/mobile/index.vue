<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { appBarStore } from '@/store/appBar';
import { authStore } from "@/store/auth";
import { depositStore } from '@/store/deposit';
import { type GetCurrencyItem } from '@/interface/deposit';
import { type GetPaymentItem } from '@/interface/deposit';
import { type GetPersonalInfo } from '@/interface/deposit';
import { type GetUserInfo } from "@/interface/user";
import ValidationBox from '@/components/cash/deposit/ValidationBox.vue';
import Notification from "@/components/global/notification/index.vue";
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia';
const { name, width } = useDisplay();
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { dispatchUserDepositCfg } = depositStore();
const { dispatchUserDepositSubmit } = depositStore();

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

const currencyList = ref<Array<GetCurrencyItem>>([
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
])

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

const depositToggleSwitch = ref<boolean>(false);

const depositAmountUnit = ref<string>("R$");

const depositRate = ref<string>("+100");

const depositAmount = ref<string>("")

const bonusCheck = ref<boolean>(false);

const notificationShow = ref<boolean>(false);
const currencyMenuShow = ref<boolean>(false);
const paymentMenuShow = ref<boolean>(false);

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const notificationText = ref<string>("");

const isShowAmountValidaton = ref<boolean>(false);

const isDepositBtnReady = ref<boolean>(false);

const userInfo = computed((): GetUserInfo => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
})

const depositConfig = computed(() => {
  const { getDepositCfg } = storeToRefs(depositStore());
  return getDepositCfg.value
})

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
    isShowAmountValidaton.value = false;
  } else {
    isShowAmountValidaton.value = true;
  }
}

const handleAmountInputChange = (): void => {
  if (validateAmount()) {
    isShowAmountValidaton.value = false;
  } else {
    isShowAmountValidaton.value = true;
  }
}

const handleAmountInputBlur = (): void => {
  // if (validateAmount()) {
  isShowAmountValidaton.value = false;
  // } else {
  //     isShowAmountValidaton.value = true;
  // }
}

const handleDepositSubmit = async () => {
  await dispatchUserDepositSubmit({
    id_number: userInfo.value.uid,
    first_name: userInfo.value.first_name == "" ? "test" : userInfo.value.first_name,
    last_name: userInfo.value.last_name == "" ? "test" : userInfo.value.last_name,
    channels_id: selectedPaymentItem.value.id,
    amount: Number(depositAmount.value)
  })
  setDepositDialogToggle(false);
  setCashDialogToggle(false);
}

watch(bonusCheck, (newValue) => {
  if (newValue && validateAmount()) {
    isDepositBtnReady.value = true;
  } else {
    isDepositBtnReady.value = false;
  }
})

watch(depositAmount, (newValue) => {
  if (bonusCheck.value && validateAmount()) {
    isDepositBtnReady.value = true;
  } else {
    isDepositBtnReady.value = false;
  }
  isShowAmountValidaton.value = !validateAmount();
})

watch(depositToggleSwitch, (newValue) => {
  if (newValue) {
    setWithdrawDialogToggle(true);
    setDepositDialogToggle(false);
  } else {
    setWithdrawDialogToggle(false);
    setDepositDialogToggle(true);
  }
})

onMounted(async () => {
  await dispatchUserDepositCfg();
})
</script>

<template>
  <div class="mobile-deposit-container">
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
          <v-list-item-title class="ml-2 text-400-12">{{
            currencyItem.name
          }}</v-list-item-title>
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
          <div class="m-deposit-amount-area"></div>
          <div class="m-deposit-amount-rate-text">{{ depositRate }}</div>
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
      <ValidationBox v-if="isShowAmountValidaton" />
    </v-row>
    <div class="mt-0 mx-4 d-flex align-center">
      <div>
        <v-checkbox hide-details icon class="amount-checkbox" v-model="bonusCheck" />
      </div>
      <p class="text-400-10 gray" style="margin-top: 3px; margin-left: 2px">
        {{ t("deposit_dialog.check_text") }}
      </p>
      <img src="@/assets/public/svg/icon_public_22.svg" class="ml-auto" width="16" />
    </div>
    <v-row class="m-deposit-footer-text-position text-600-10 white justify-center mx-2">
      {{ t("deposit_dialog.other_text") }}
    </v-row>
    <div class="m-deposit-btn-position">
      <v-btn
        class="ma-3 button-bright m-deposit-btn"
        width="-webkit-fill-available"
        height="48px"
        :disabled="!isDepositBtnReady"
        :onclick="handleDepositSubmit"
      >
        {{ t("deposit_dialog.deposit_btn_text") }}
      </v-btn>
    </div>
    <Notification
      :notificationShow="notificationShow"
      :notificationText="notificationText"
      :checkIcon="checkIcon"
    />
  </div>
</template>

<style lang="scss">
// container
.mobile-deposit-container {
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
    .v-btn__content {
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .dark-textfield .v-field__field {
    background-color: #1c1929 !important;
  }

  .v-field--variant-solo {
    background: transparent !important;
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
</style>
