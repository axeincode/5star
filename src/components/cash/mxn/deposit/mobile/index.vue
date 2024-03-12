<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { appBarStore } from '@/store/appBar';
import { authStore } from "@/store/auth";
import { userStore } from '@/store/user';
import { depositStore } from '@/store/deposit';
import { type GetCurrencyItem } from '@/interface/deposit';
import { type GetPaymentItem } from '@/interface/deposit';
import { type GetPixInfo } from '@/interface/deposit';
import { type GetUserInfo } from "@/interface/user";
import ValidationBox from '@/components/cash/mxn/deposit/ValidationBox.vue';
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';
import router from '@/router';
import MParticipatingDialog from "./MParticipatingDialog.vue";
import MDepositInfoDialog from "./MDepositInfoDialog.vue";
import { useToast } from "vue-toastification";
import icon_public_105 from "@/assets/public/svg/icon_public_105.svg";
import icon_public_106 from "@/assets/public/svg/icon_public_106.svg";
import icon_public_107 from "@/assets/public/svg/icon_public_107.svg";
import { getUnitByCurrency } from '@/utils/currencyUnit';
import currencyListValue from '@/utils/currencyList';
import { adjustTrackEvent } from '@/utils/adjust';

const { name, width } = useDisplay();
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setDepositWithdrawToggle } = appBarStore();

const { setDepositBlurEffectShow } = appBarStore();
const { setDepositHeaderBlurEffectShow } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { dispatchUserDepositCfg } = depositStore();
const { dispatchUserDepositSubmit } = depositStore();
const { setPixInfoToggle } = depositStore();
const { setDepositConfirmDialogToggle } = depositStore();
const { setDepositAmount } = depositStore();
const { dispatchUserProfile } = authStore();
const { dispatchUserBalance } = userStore();
const { setDepositOrderDialog } = depositStore();
const { setTimerValue } = depositStore();
const { setDepositOrderTimeRefresh } = depositStore();
const { setDepositCurrency } = depositStore();

const selectedCurrencyUnit = ref<string>("R$");

const selectedCurrencyItem = ref<GetCurrencyItem>({
  icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
  name: "MXN",
  value: 5.25
})

const selectedPaymentItem = ref<GetPaymentItem>({
  id: "",
  icon: "",
  name: "",
  channel_type: "",
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
    channel_type: "",
    description: "20~150.000 BRL",
    min: 149,
    max: 588.88
  },
])

const depositAmountList = ref<Array<any>>([])

const depositBlurEffectShow = computed(() => {
  const { getDepositBlurEffectShow } = storeToRefs(appBarStore());
  return getDepositBlurEffectShow.value
})

const { setOverlayScrimShow } = appBarStore();

const depositToggleSwitch = ref<boolean>(false);

const depositRate = ref<number>(0);

const depositAmount = ref<string | number>(0)

const depositAmountWithCurrency = ref<string>("");

const depositAmountWithBonus = ref<string | number>(0);

const bonusCheck = ref<boolean>(false);

const codeUrl = ref<string>('00020126890014BR.GOV.BCB.PIX2567api-pix.bancobs2.com.br/spi/v2/cdbd7c5c-0465-41da-bf4f-2abc393011ec520400005303986540510.305802BR5908PAGSMILE6014Belo Horizonte61083038040362070503***63044D55');

const loading = ref<boolean>(false);

const promotionDialogVisible = ref<boolean>(false);

const depositInfoDialogVisible = ref<boolean>(false);

const mxnPaymentChannel = ref<any>({
  spei: icon_public_106,
  oxxo: icon_public_105,
  codi: icon_public_107
})

const notificationShow = ref<boolean>(false);
const currencyMenuShow = ref<boolean>(false);
const paymentMenuShow = ref<boolean>(false);
const bonusAmount = ref<number>(0);

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const notificationText = ref<string>("");

const isShowAmountValidation = ref<boolean>(false);

const isDepositBtnReady = ref<boolean>(false);

const userInfo = computed((): GetUserInfo => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
})

const userBalance = computed(() => {
  const { getUserBalance } = storeToRefs(userStore());
  return getUserBalance.value
})

const userFundsIdentity = computed(() => {
  const { getUserFundsIdentity } = storeToRefs(userStore());
  return getUserFundsIdentity.value
})

const depositOrderTimeRefresh = computed(() => {
  const { getDepositOrderTimeRefresh } = storeToRefs(depositStore());
  return getDepositOrderTimeRefresh.value
})

const pixInfo = computed(() => {
  const { getPixInfo } = storeToRefs(depositStore());
  return getPixInfo.value
})

const depositConfig = computed(() => {
  const { getDepositCfg } = storeToRefs(depositStore());
  return getDepositCfg.value
})

const depositSubmit = computed(() => {
  const { getDepositSubmit } = storeToRefs(depositStore());
  return getDepositSubmit.value
})

const filterByKeyArray = (arr: any, key: any, valueArr: any) => {
  return arr.filter((obj: any) => {
    const objValues = obj[key];
    return valueArr.some((value: any) => objValues.includes(value));
  });
};

watch(depositConfig, (newValue) => {
  depositAmountList.value = [];
  paymentList.value = [];
  newValue["cfg"][userBalance.value.currency].map((item: any) => {
    paymentList.value.push({
      id: item.channel_id,
      icon: userBalance.value.currency == "MXN" ? mxnPaymentChannel.value[item.channel_type.toLowerCase()] : new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
      name: item.channel_name,
      channel_type: item.channel_type,
      description: item.min + "~" + item.max + " " + item.currecy_type,
      min: item.min,
      max: item.max
    })
  })
  const keyArray = Object.keys(newValue["cfg"]);
  const filteredObjects = filterByKeyArray(currencyTemplateList, 'name', keyArray);
  currencyList.value = filteredObjects;
  selectedPaymentItem.value = paymentList.value[0];
  newValue["list"].map((item: string) => {
    let bonusAmount: number = 0;
    let bonusType: number = 0;
    newValue["bonus"].map((bonusItem: any) => {
      if (bonusItem["type"] == 0) {
        if (Number(item) >= bonusItem["min"] && Number(item) <= bonusItem["max"]) {
          bonusAmount = bonusItem["award"]
          bonusType = bonusItem["type"]
        } else if (bonusItem["max"] == 0 && Number(item) >= bonusItem["min"]) {
          bonusAmount = bonusItem["award"]
          bonusType = bonusItem["type"]
        }
      } else if (bonusItem["type"] == 1) {
        if (Number(item) >= bonusItem["min"] && Number(item) <= bonusItem["max"]) {
          bonusAmount = bonusItem["rate"]
          bonusType = bonusItem["type"]
        } else if (bonusItem["max"] == 0 && Number(item) >= bonusItem["min"]) {
          bonusAmount = bonusItem["rate"]
          bonusType = bonusItem["type"]
        }
      }
    })
    depositAmountList.value.push({
      depositSelect: item,
      bonus: bonusAmount,
      type: bonusType
    })
  })
  // depositAmountList.value = newValue["list"];
  // bonusAmount.value = newValue["bonus"][0]["type"] == 0 ? Number(newValue["bonus"][0].award) : Number(newValue["bonus"][0].rate) * 100
}, { deep: true });

const handleDepositAmount = (amount: string) => {
  depositAmount.value = amount;
}

const handleSelectCurrency = (item: GetCurrencyItem) => {
  selectedCurrencyItem.value = item;
  paymentList.value = [];
  depositConfig.value["cfg"][userBalance.value.currency]?.map((item: any) => {
    paymentList.value.push({
      id: item.channel_id,
      icon: userBalance.value.currency == "MXN" ? mxnPaymentChannel.value[item.channel_type.toLowerCase()] : new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
      name: item.channel_name,
      channel_type: item.channel_type,
      description: item.min + "~" + item.max + " " + item.currecy_type,
      min: item.min,
      max: item.max
    })
  })
  selectedPaymentItem.value = paymentList.value[0];
  selectedCurrencyUnit.value = getUnitByCurrency(userBalance.value.currency);
  setDepositCurrency(userBalance.value.currency);
}

const formatCurrency = (currency: number, locale: string, currencyUnit: string) => {
  const fomarttedAmount = currency.toLocaleString(locale, {
    style: "currency",
    currency: currencyUnit,
  })
  return fomarttedAmount
}

const handleSelectPayment = (item: GetPaymentItem) => {
  selectedPaymentItem.value = item;
}

const validateAmount = (): boolean => {
  return Number(depositAmount.value) >= Number(selectedPaymentItem.value.min) && Number(depositAmount.value) <= Number(selectedPaymentItem.value.max);
}

const handleAmountInputFocus = (): void => {
  if (validateAmount()) {
    isShowAmountValidation.value = false;
  } else {
    isShowAmountValidation.value = true;
    setTimeout(() => {
      isShowAmountValidation.value = false;
    }, 5000)
  }
}

const handleAmountInputChange = (): void => {
  if (validateAmount()) {
    isShowAmountValidation.value = false;
  } else {
    isShowAmountValidation.value = true;
    setTimeout(() => {
      isShowAmountValidation.value = false;
    }, 5000)
  }
}

const handleAmountInputBlur = (): void => {
  isShowAmountValidation.value = false;
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
  if (Number(depositAmount.value) == 0) return;
  if (depositConfig.value.deposit_user_switch) {
    setPixInfoToggle(true);
    return;
  }
  loading.value = true
  let formData = {} as any;
  formData.id_number = "";
  formData.bank_number = "";
  formData.first_name = "";
  formData.last_name = "";
  if (userBalance.value.currency.toLocaleUpperCase() == "BRL") {
    if (depositConfig.value.deposit_user_switch) {
      formData.id_number = pixInfo.value.id
      formData.bank_number = pixInfo.value.id
      formData.first_name = pixInfo.value.first_name
      formData.last_name = pixInfo.value.last_name
    }
    if (userFundsIdentity.value.identity.pix !== undefined) {
      formData.id_number = userFundsIdentity.value.identity.pix.id_number
      formData.bank_number = userFundsIdentity.value.identity.pix.bank_number
      formData.first_name = userFundsIdentity.value.identity.pix.user_name
    } else {
      formData.id_number = userInfo.value.id_number
      formData.bank_number = userInfo.value.id_number
      formData.first_name = userInfo.value.first_name
    }
  }
  formData.channels_id = selectedPaymentItem.value.id;
  formData.amount = depositConfig.value["bonus"].length > 0 && depositConfig.value["bonus"][0]["type"] == 0 ? Number(depositAmount.value) + Number(depositRate.value) : Number((Number(depositAmount.value) * (1 + Number(depositRate.value))).toFixed(2))
  formData.is_bonus = bonusCheck.value ? false : true;
  await dispatchUserDepositSubmit(formData);
  loading.value = false;
  if (success.value) {
    if (depositSubmit.value.url != "") {
      // let newWindow = window.open(depositSubmit.value.url, '_blank');

      // if (newWindow) {
      //   newWindow.focus(); // If the new window is successfully opened, switch the focus to the new window
      // } else {
      //   alert('Please allow pop-ups in your browser to view the content.'); // If unable to open a new window, show an alert message
      // }

      // 处理跳转新窗口浏览器拦截
      const elementA = document.createElement('a');
      const elementAid = 'newpage'
      elementA.setAttribute('href', depositSubmit.value.url);
      elementA.setAttribute('target', '_blank');
      elementA.setAttribute('id', elementAid);
      // 防止反复添加
      if (!document.getElementById(elementAid)) {
        document.body.appendChild(elementA);
      }
      elementA.click();
      elementA.addEventListener('click', function (event) {
        event.preventDefault(); // 阻止默认行为
        window.location.href = this.href; // 手动跳转
      });

      const toast = useToast();
      toast.success(t("deposit_dialog.text_1"), {
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
      depositAmount.value = "";
      return;
    }
    if (depositSubmit.value.code_url != "") {
      depositAmountWithBonus.value = depositConfig.value["bonus"].length > 0 && depositConfig.value["bonus"][0]["type"] == 0 ? Number(depositAmount.value) + Number(depositRate.value) : Number((Number(depositAmount.value) * (1 + Number(depositRate.value))).toFixed(2))
      let locale = currencyListValue[userBalance.value.currency];
      depositAmountWithCurrency.value = formatCurrency(Number(depositAmount.value), locale, userBalance.value.currency);
      codeUrl.value = depositSubmit.value.code_url;
      setMainBlurEffectShow(false);
      setOverlayScrimShow(false);
      setDepositHeaderBlurEffectShow(false);
      setDepositBlurEffectShow(false);
      setTimeout(() => {
        depositInfoDialogVisible.value = true;
      }, 10)
      return;
    }
    if (userBalance.value.currency.toLocaleUpperCase() == "MXN") {
      let depositConfirmItem: any = {
        deposit_amount: depositAmount.value,
        bank_name: depositSubmit.value.bank_name,
        account_number: depositSubmit.value.account_number,
        account_name: depositSubmit.value.account_name,
      }
      localStorage.setItem("spei", JSON.stringify(depositConfirmItem));
      setDepositOrderTimeRefresh(!depositOrderTimeRefresh.value);
      setTimerValue(0);
      setDepositOrderDialog(true);
      // setDepositAmount(Number(depositAmount.value));
    }
    const toast = useToast();
    toast.success(t("deposit_dialog.text_1"), {
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
    if (localStorage.getItem("recharge_number") == null) {
      localStorage.setItem("recharge_number", "1");
      adjustTrackEvent({
        eventToken: "r15rr9", // FIRST_RECHARGE
      });
    } else {
      localStorage.setItem("recharge_number", (Number(localStorage.getItem("recharge_number")) + 1).toString());
      if (Number(localStorage.getItem("recharge_number")) == 2) {
        adjustTrackEvent({
          eventToken: "ld7asn", // SECOND_RECHARGE
        });
      } else {
        adjustTrackEvent({
          eventToken: "gdlh3x", // PAY_RECHARGE
        });
      }
    }
    await dispatchUserProfile();
    await dispatchUserBalance();
    // if (depositSubmit.value.code_url != "") {
    //   depositAmountWithBonus.value = depositConfig.value["bonus"].length > 0 && depositConfig.value["bonus"][0]["type"] == 0 ? Number(depositAmount.value) + Number(depositRate.value) : Number((Number(depositAmount.value) * (1 + Number(depositRate.value))).toFixed(2))
    //   let locale = 'pt-BR';
    //   switch (selectedCurrencyItem.value.name) {
    //     case "BRL":
    //       locale = 'pt-BR';
    //       break;
    //     case "PHP":
    //       locale = 'en-PH';
    //       break;
    //     case "PEN":
    //       locale = 'en-PE';
    //       break;
    //     case "MXN":
    //       locale = 'en-MX';
    //       break;
    //     case "CLP":
    //       locale = 'es-CL';
    //       break;
    //     case "USD":
    //       locale = 'en-US';
    //     case "COP":
    //       locale = 'es-CO';
    //       break;
    //   }
    //   depositAmountWithCurrency.value = formatCurrency(Number(depositAmount.value), locale, selectedCurrencyItem.value.name);
    //   codeUrl.value = depositSubmit.value.code_url;
    //   setMainBlurEffectShow(false);
    //   setOverlayScrimShow(false);
    //   setDepositHeaderBlurEffectShow(false);
    //   setDepositBlurEffectShow(false);
    //   setTimeout(() => {
    //     depositInfoDialogVisible.value = true;
    //   }, 10)
    //   return;
    // }
    // window.open(depositSubmit.value.url, '_blank');
    // const toast = useToast();
    // toast.success("Successfully submitted", {
    //   timeout: 3000,
    //   closeOnClick: false,
    //   pauseOnFocusLoss: false,
    //   pauseOnHover: false,
    //   draggable: false,
    //   showCloseButtonOnHover: false,
    //   hideProgressBar: true,
    //   closeButton: "button",
    //   icon: SuccessIcon,
    //   rtl: false,
    // });


    // setDepositDialogToggle(false);
    // setCashDialogToggle(false);
    // setMainBlurEffectShow(false);
    // setHeaderBlurEffectShow(false);
    // setMenuBlurEffectShow(false);
    setDepositConfirmDialogToggle(true);
    depositAmount.value = "";
  } else {
    const toast = useToast();
    toast.success(errMessage.value, {
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

const handleParticipate = (type: string) => {
  if (type == "ok") {
    bonusCheck.value = true;
    depositRate.value = 0;
  } else {
    bonusCheck.value = false;
  }

  setDepositBlurEffectShow(false);
  setDepositHeaderBlurEffectShow(false);
  setTimeout(() => {
    promotionDialogVisible.value = false
  }, 10);
}

const handleDepositInformation = () => {
  setDepositBlurEffectShow(false);
  setDepositHeaderBlurEffectShow(false);
  setTimeout(() => {
    depositInfoDialogVisible.value = false
  }, 10);
}

// main blur effect
const promoBlurEffectShow = computed(() => {
  const { getMainBlurEffectShow } = storeToRefs(appBarStore());
  return getMainBlurEffectShow.value
})

watch(bonusCheck, (newValue) => {
  if (newValue) {
    setOverlayScrimShow(true);
    setDepositHeaderBlurEffectShow(true);
    setDepositBlurEffectShow(true);
    setTimeout(() => {
      promotionDialogVisible.value = newValue;
    }, 10)
  } else {
    depositConfig.value["bonus"].map((bonusItem: any) => {
      if (bonusItem["type"] == 0) {
        if (Number(depositAmount.value) >= bonusItem["min"] && Number(depositAmount.value) <= bonusItem["max"]) {
          depositRate.value = bonusItem["award"]
        } else if (bonusItem["max"] == 0 && Number(depositAmount.value) >= bonusItem["min"]) {
          depositRate.value = bonusItem["award"]
        }
      } else if (bonusItem["type"] == 1) {
        if (Number(depositAmount.value) >= bonusItem["min"] && Number(depositAmount.value) <= bonusItem["max"]) {
          depositRate.value = bonusItem["rate"]
        } else if (bonusItem["max"] == 0 && Number(depositAmount.value) >= bonusItem["min"]) {
          depositRate.value = bonusItem["rate"]
        }
      }
    })
  }
})

watch(depositAmount, (newValue) => {
  depositRate.value = 0
  if (validateAmount()) {
    isDepositBtnReady.value = true;
  } else {
    isDepositBtnReady.value = false;
  }
  isShowAmountValidation.value = !validateAmount();
  setTimeout(() => {
    isShowAmountValidation.value = false;
  }, 5000)
  if (!bonusCheck.value) {
    depositConfig.value["bonus"].map((bonusItem: any) => {
      if (bonusItem["type"] == 0) {
        if (Number(depositAmount.value) >= bonusItem["min"] && Number(depositAmount.value) <= bonusItem["max"]) {
          depositRate.value = bonusItem["award"]
        } else if (bonusItem["max"] == 0 && Number(depositAmount.value) >= bonusItem["min"]) {
          depositRate.value = bonusItem["award"]
        }
      } else if (bonusItem["type"] == 1) {
        if (Number(depositAmount.value) >= bonusItem["min"] && Number(depositAmount.value) <= bonusItem["max"]) {
          depositRate.value = bonusItem["rate"]
        } else if (bonusItem["max"] == 0 && Number(depositAmount.value) >= bonusItem["min"]) {
          depositRate.value = bonusItem["rate"]
        }
      }
    })
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
  // if (currencyMenuShow.value && currencyList.value.length < 2) {
  //   currencyMenuShow.value = false
  // }
})

onMounted(async () => {
  adjustTrackEvent({
    eventToken: "s2jbxh", // PAGE_VIEW
  });
  setDepositWithdrawToggle(false);
  await dispatchUserDepositCfg();
  selectedCurrencyUnit.value = userBalance.value.currency;
  currencyList.value.map(item => {
    if (item.name == userBalance.value.currency) {
      selectedCurrencyItem.value = item;
    }
  })
})
</script>

<template>
  <div
    class="mobile-deposit-container"
    :class="depositBlurEffectShow ? 'deposit-bg-blur' : ''"
  >
    <v-row class="mt-6 mx-10 text-400-12 gray">
      {{ t("deposit_dialog.deposit_currency") }}22
    </v-row>
    <v-menu offset="4" class="mt-1" v-model:model-value="currencyMenuShow">
      <template v-slot:activator="{ props }">
        <v-card
          color="#15161C"
          theme="dark"
          class="mx-6 mt-4 m-deposit-card-height"
          style="border-radius: 8px"
        >
          <v-list-item
            v-bind="props"
            class="currency-item m-deposit-card-height"
            value="currency dropdown"
          >
            <template v-slot:prepend>
              <img :src="selectedCurrencyItem.icon" width="20" />
            </template>
            <v-list-item-title class="ml-2 text-400-12">
              {{ selectedCurrencyItem.name }}
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </template>
      <!-- <v-list theme="dark" bg-color="#15161C" class="px-2">
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
      </v-list> -->
    </v-menu>
    <v-row class="mt-6 mx-10 text-400-12 gray">
      {{ t("deposit_dialog.choose_payment_method") }}
    </v-row>
    <v-menu
      offset="4"
      class="mt-1"
      v-model:model-value="paymentMenuShow"
      content-class="m-deposit-payment-menu"
    >
      <template v-slot:activator="{ props }">
        <v-card
          color="#15161C"
          theme="dark"
          class="mx-6 mt-4 m-deposit-card-height"
          style="border-radius: 8px"
        >
          <v-list-item
            v-bind="props"
            class="payment-item m-deposit-card-height"
            value="payment dropdown"
            :append-icon="paymentMenuShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          >
            <template v-slot:prepend>
              <img :src="selectedPaymentItem.icon" width="52" />
            </template>
            <v-list-item-title class="ml-2 text-400-12">
              {{ selectedPaymentItem.name }}
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </template>
      <v-list theme="dark" bg-color="#15161C" class="mr-6">
        <v-row class="m-payment-width-370 px-2">
          <v-col
            cols="12"
            v-for="(paymentItem, paymentIndex) in paymentList"
            :key="paymentIndex"
            class="pa-1"
          >
            <v-card
              color="#23262F"
              theme="dark"
              class="text-center"
              :class="selectedPaymentItem.name == paymentItem.name ? 'border-active' : ''"
              style="border-radius: 8px; box-shadow: none"
            >
              <v-list-item
                class="payment-select-item pa-2"
                :value="paymentItem.name"
                @click="handleSelectPayment(paymentItem)"
              >
                <v-row class="align-center">
                  <v-col cols="4" class="text-center">
                    <img :src="paymentItem.icon" width="62" />
                  </v-col>
                  <v-col cols="8" class="text-left">
                    <v-list-item-title class="text-400-12">
                      {{ paymentItem.name }}
                    </v-list-item-title>
                    <v-list-item-title class="text-400-12">
                      {{ paymentItem.description }}
                    </v-list-item-title>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-list>
    </v-menu>
    <div class="mx-4 mt-2">
      <img src="@/assets/public/image/bg_public_02_01.png" style="width: 100%" />
    </div>
    <v-row class="mt-2 mx-10 text-400-12 gray">
      {{ t("deposit_dialog.deposit_amount") }}
    </v-row>
    <v-row class="mt-2 mx-4">
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
            depositAmountItem.depositSelect == depositAmount
              ? 'm-deposit-amout-btn-black'
              : 'm-deposit-amout-btn-white',
          ]"
          @click="handleDepositAmount(depositAmountItem.depositSelect)"
        >
          {{ selectedCurrencyUnit }} {{ depositAmountItem.depositSelect }}
          <div
            class="m-deposit-amount-area"
            v-if="!bonusCheck && depositAmountItem.bonus != 0"
          >
            <div class="m-deposit-amount-rate-text">
              {{
                depositAmountItem.type == 0
                  ? depositAmountItem.bonus
                  : Number(depositAmountItem.bonus) * 100 + "%"
              }}
            </div>
          </div>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-3 mx-3 relative">
      <v-text-field
        :label="`${t('deposit_dialog.amount')}(${selectedCurrencyItem.name})`"
        class="form-textfield dark-textfield m-deposit-amount-text"
        variant="solo"
        density="comfortable"
        color="#7782AA"
        style="border-radius: 8px"
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
        <v-checkbox
          hide-details
          icon
          class="amount-checkbox"
          v-model="bonusCheck"
          label="Not participating in promotional activities"
        />
      </div>

      <!-- <img src="@/assets/public/svg/icon_public_22.svg" class="ml-auto" width="16" /> -->
    </div>
    <!-- <v-row class="m-deposit-footer-text-position text-600-10 white justify-center mx-2">
      {{ selectedCurrencyUnit }}{{ depositAmount }} + {{ selectedCurrencyUnit }}
      {{
        depositConfig["bonus"].length > 0 &&
        depositConfig["bonus"][0]["type"] == 0 &&
        depositConfig["bonus"] != undefined
          ? depositRate
          : (Number(depositAmount) * depositRate).toFixed(2)
      }}
      {{ t("deposit_dialog.other_text_1") }}
    </v-row> -->
    <div
      class="m-deposit-bonus-card mx-6 px-2 py-2"
      :class="bonusCheck ? '' : 'm-deposit-bonus-card-border'"
    >
      <div class="d-flex align-center">
        <img src="@/assets/vip/image/img_vip_10.png" width="21" />
        <div class="text-700-12 white">{{ depositConfig.name }}</div>
      </div>
      <div class="d-flex align-start ml-6">
        <img src="@/assets/public/svg/icon_public_03.svg" />
        <div class="text-400-8 gray">{{ t("deposit_dialog.text_2") }}</div>
      </div>
    </div>
    <div class="m-deposit-btn-position">
      <v-btn
        class="my-4 mx-6 m-deposit-btn"
        :class="isDepositBtnReady ? 'm-deposit-btn-ready' : ''"
        width="-webkit-fill-available"
        height="48px"
        :loading="loading"
        :onclick="handleDepositSubmit"
        style="width: -moz-available"
      >
        {{ t("deposit_dialog.deposit_btn_text") }}
      </v-btn>
    </div>
    <v-dialog
      v-model="promotionDialogVisible"
      width="326"
      content-class="m-promotion-dialog-position"
      @click:outside="handleParticipate"
    >
      <MParticipatingDialog @promotionDialogHide="handleParticipate" />
    </v-dialog>
    <v-dialog
      v-model="depositInfoDialogVisible"
      width="328"
      content-class="m-deposit-info-dialog-position"
      @click:outside="handleDepositInformation"
    >
      <MDepositInfoDialog
        :selectedPaymentItem="selectedPaymentItem"
        :selectedCurrencyItem="selectedCurrencyItem"
        :depositAmount="depositAmount"
        :depositAmountWithCurrency="depositAmountWithCurrency"
        :codeUrl="codeUrl"
        @depositInfoDialogClose="handleDepositInformation"
      />
    </v-dialog>
  </div>
</template>

<style lang="scss">
.m-deposit-payment-menu {
  left: 24px !important;
}

// container
.mobile-deposit-container {
  overflow-y: auto;

  .m-deposit-bonus-card {
    // height: 83px;
    border-radius: 8px;
    background: #23262f;
  }

  .m-deposit-bonus-card-border {
    border: 1px solid #009b3a;
  }

  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .form-textfield div.v-field--variant-solo,
  .v-field--variant-solo-filled {
    background: transparent;
  }

  background-color: #1d2027;
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
    background: #009b3a;
    border-radius: 4px;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    width: 100% !important;
    color: white !important;

    .v-btn__content {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .m-deposit-amout-btn-white {
    background: #23262f;
    border-radius: 4px;
    color: #ffffff;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    width: 100% !important;

    .v-btn__content {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 8px;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: normal;
  }

  .m-deposit-btn {
    text-align: center;
    background: #23262f;

    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

    .v-btn__content {
      color: #fff;
      text-align: center;
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .m-deposit-btn-ready {
    background: #009b3a;
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

    .v-btn__content {
      color: white;
    }
  }

  .dark-textfield .v-field__field {
    background-color: #15161c !important;
  }

  .v-field--variant-solo {
    background: transparent !important;
  }

  .amount-checkbox .v-input--selection-controls__ripple {
    padding: 16px !important;
    border: 1px solid yellow !important;
  }

  .amount-checkbox {
    margin: 5px 0px 15px;

    i.v-icon {
      color: #15161c;
      background-color: #01983a;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      margin-top: 4px;
    }

    i.mdi-checkbox-blank-outline {
      background-color: #15161c;
      box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
      border-radius: 4px;
    }

    .v-selection-control {
      min-height: 20px !important;
    }
    .v-selection-control__wrapper,
    .v-selection-control__input {
      width: 20px;
      height: 20px;
    }
    .v-selection-control__wrapper {
      margin: 0 10px;
    }
  }

  .deposit-other-text {
    font-weight: 600;
    font-size: 12px;
    color: #ffffff;
  }
}

.m-deposit-btn-position {
  // position: absolute;
  // bottom: 48px;
  // left: 50%;
  // transform: translateX(-50%);
  // width: 98%;
}

.m-deposit-footer-text-position {
  position: absolute;
  bottom: 128px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
}

.m-payment-width-370 {
  margin: auto;
  max-height: 290px !important;

  .border-active {
    border: 2px solid #009b3a;
  }
}

@media (max-width: 600px) {
  .deposit-bg-blur {
    filter: blur(3px) !important;
    -webkit-filter: blur(3px) !important;
    // filter: saturate(180%) blur(3px);
    // -webkit-filter: saturate(180%) blur(3px);
  }
}

.amount-checkbox {
  .v-label {
    color: #7782aa !important;
    // background: rgba(119, 130, 170, 1);
    font-weight: 400;
    font-size: 10px !important;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
      Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei,
      Microsoft Yahei, sans-serif;
    opacity: 1;
  }
}

.m-promotion-dialog-position {
  z-index: 2550;
  // top: -20px !important;
}

.m-deposit-info-dialog-position {
  z-index: 2550;
}

.v-dialog--persistent .v-dialog__content {
  transform: none !important;
}

.m-deposit-amount-text {
  transform-origin: top !important;

  .v-field__field {
    .v-label.v-field-label {
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
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
</style>
