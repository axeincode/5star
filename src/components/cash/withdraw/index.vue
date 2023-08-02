<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import moment from 'moment-timezone';
import { appBarStore } from '@/store/appBar';
import { type GetCurrencyItem } from '@/interface/deposit';
import { type GetPaymentItem } from '@/interface/deposit';
import { type GetPersonalInfo } from '@/interface/deposit';
import { mailStore } from '@/store/mail';
import ValidationBox from '@/components/cash/withdraw/ValidationBox.vue';
import Notification from "@/components/global/notification/index.vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setMailList } = mailStore();

const selectedCurrencyItem = ref<GetCurrencyItem>({
    icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
    name: "BRL"
})
const selectedPaymentItem = ref<GetPaymentItem>({
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX",
    description: "20~150.000 BRL"
})

const currencyList = ref<Array<GetCurrencyItem>>([
    {
        icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
        name: "BRL"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_85.svg", import.meta.url).href,
        name: "PHP"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_86.svg", import.meta.url).href,
        name: "PEN"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_87.svg", import.meta.url).href,
        name: "MXN"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_88.svg", import.meta.url).href,
        name: "CLP"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_89.svg", import.meta.url).href,
        name: "USD"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_90.svg", import.meta.url).href,
        name: "COP"
    },
])

const paymentList = ref<Array<GetPaymentItem>>([
    {
        icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
        name: "PIX_1",
        description: "20~150.000 BRL"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
        name: "PIX_2",
        description: "20~150.000 BRL"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
        name: "PIX_3",
        description: "20~150.000 BRL"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
        name: "PIX_4",
        description: "20~150.000 BRL"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
        name: "PIX_5",
        description: "20~150.000 BRL"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
        name: "PIX_6",
        description: "20~150.000 BRL"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
        name: "PIX_5",
        description: "20~150.000 BRL"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
        name: "PIX_6",
        description: "20~150.000 BRL"
    },
])

const withdrawAmount = ref<string>("")

const notificationShow = ref<boolean>(false);

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const notificationText = ref<string>("");

const isShowAmountValidaton = ref<boolean>(false);

const isDepositBtnReady = ref<boolean>(false);

const handleSelectCurrency = (item: GetCurrencyItem) => {
    selectedCurrencyItem.value = item;
}

const handleSelectPayment = (item: GetPaymentItem) => {
    selectedPaymentItem.value = item;
}

const validateAmount = (): boolean => {
    return Number(withdrawAmount.value) >= 149 && Number(withdrawAmount.value) <= 600;
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
    if (validateAmount()) {
        isShowAmountValidaton.value = false;
    } else {
        isShowAmountValidaton.value = true;
    }
}

const handleWithdrawSubmit = (): void => {
    let mailItem = {
        id: 5,
        icon: new URL("@/assets/public/svg/icon_public_16.svg", import.meta.url).href,
        mail_content_1: {
            color: "text-color-gray",
            content: "Withdrawal Amount"
        },
        mail_content_2: {
            color: "money-color-white",
            content: "$" + Number(withdrawAmount.value).toFixed(2)
        },
        mail_rail_1: {
            color: "text-color-gray",
            content: moment().tz("Asia/Hong_Kong").format("YYYY/MM/DD HH:mm:ss")
        },
        mail_rail_2: {
            color: "text-color-yellow",
            content: "ln processing..."
        }
    }
    setMailList(mailItem);
    setWithdrawDialogToggle(false);
    setCashDialogToggle(false);
}

watch(withdrawAmount, (newValue) => {
    if (validateAmount()) {
        isDepositBtnReady.value = true;
    } else {
        isDepositBtnReady.value = false;
    }
    isShowAmountValidaton.value = !validateAmount();
})
</script>
  
<template>
    <div class="withdraw-container">
        <v-row class="mt-6 ml-16 deposit-text">
            {{ t('withdraw_dialog.withdraw_currency') }}
        </v-row>
        <v-menu offset="4" class="mt-1">
            <template v-slot:activator="{ props }">
                <v-card color="#1C1929" theme="dark" class="mx-12 mt-4 deposit-card-height">
                    <v-list-item v-bind="props" class="currency-item deposit-card-height" value="currency dropdown"
                        append-icon="mdi-chevron-down">
                        <template v-slot:prepend>
                            <img :src="selectedCurrencyItem.icon" width="26" />
                        </template>
                        <v-list-item-title class="ml-2">{{ selectedCurrencyItem.name }}</v-list-item-title>
                    </v-list-item>
                </v-card>
            </template>
            <v-list theme="dark" bg-color="#211F31" class="px-2">
                <v-list-item class="currency-item pl-6" :value="currencyItem.name"
                    v-for="(currencyItem, currencyIndex) in currencyList" :key="currencyIndex"
                    @click="handleSelectCurrency(currencyItem)">
                    <template v-slot:prepend>
                        <img :src="currencyItem.icon" width="26" />
                    </template>
                    <v-list-item-title class="ml-2">{{ currencyItem.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-row class="mt-6 ml-16 deposit-text">
            {{ t('withdraw_dialog.withdraw_payment_method') }}
        </v-row>
        <v-menu offset="4" class="mt-1">
            <template v-slot:activator="{ props }">
                <v-card color="#1C1929" theme="dark" class="mx-12 mt-4 deposit-card-height">
                    <v-list-item v-bind="props" class="payment-item deposit-card-height" value="payment dropdown"
                        append-icon="mdi-chevron-down">
                        <template v-slot:prepend>
                            <img :src="selectedPaymentItem.icon" />
                        </template>
                        <v-list-item-title class="ml-2">{{ selectedPaymentItem.name }}</v-list-item-title>
                    </v-list-item>
                </v-card>
            </template>
            <v-list theme="dark" bg-color="#181522">
                <v-row class="payment-width-370">
                    <v-col cols="6" v-for="(paymentItem, paymentIndex) in paymentList" :key="paymentIndex">
                        <v-card color="#1C1929" theme="dark" class="deposit-card-height text-center">
                            <v-list-item class="payment-select-item pa-2" :value="paymentItem.name"
                                @click="handleSelectPayment(paymentItem)">
                                <img :src="paymentItem.icon" />
                                <v-list-item-title>{{ paymentItem.name }}</v-list-item-title>
                                <v-list-item-title>{{ paymentItem.description }}</v-list-item-title>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-list>
        </v-menu>
        <v-row class="mt-6 ml-16 withdraw-text">
            {{ t('withdraw_dialog.withdraw_amount') }}
        </v-row>
        <v-row class="relative">
            <v-text-field :label="`${t('withdraw_dialog.amount')}(${selectedCurrencyItem.name})`"
                class="form-textfield dark-textfield mx-14" variant="solo" density="comfortable" color="#7782AA"
                v-model="withdrawAmount" :onfocus="handleAmountInputFocus" :onblur="handleAmountInputBlur"
                @input="handleAmountInputChange" />
            <ValidationBox v-if="isShowAmountValidaton" />
        </v-row>
        <v-row class="mt-4 ml-16 other-text">
            {{ t('withdraw_dialog.text_1') }}
        </v-row>
        <v-row class="mt-4 ml-16 other-text">
            {{ t('withdraw_dialog.text_2') }}
        </v-row>
        <v-row class="mt-4 ml-16 other-text">
            {{ t('withdraw_dialog.text_3') }}
        </v-row>
        <v-row class="mt-4 ml-16 other-text">
            {{ t('withdraw_dialog.text_4') }}
        </v-row>
        <v-row class="mt-16 deposit-other-text justify-center">
            {{ t('withdraw_dialog.other_text') }}
        </v-row>
        <v-row class="mt-2 mx-8">
            <v-btn class="ma-3 button-bright text-none" width="-webkit-fill-available" height="54px"
                :disabled="!isDepositBtnReady" :onclick="handleWithdrawSubmit">
                {{ t('withdraw_dialog.withdraw_btn_text') }}
            </v-btn>
        </v-row>
        <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
    </div>
</template>

<style lang="scss">
// container
.withdraw-container {
    background-color: #211F31;
    height: 700px;
    border-radius: 0px 0px 16px 16px;

    .deposit-card-height {
        height: 48px;
    }

    .v-list-item__prepend {
        padding-left: 20px;
    }

    .currency-item {
        font-weight: 400;
        font-size: 14px;
        color: #FFFFFF;
    }

    .payment-item {
        font-weight: 400;
        font-size: 14px;
        color: #FFFFFF;
    }

    .deposit-amout-btn-black {
        background: #32CFEC;
        font-weight: 700;
        font-size: 12px;
        border-radius: 4px;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
        width: 100% !important;
    }

    .deposit-amout-btn-white {
        background: #353652;
        font-weight: 700;
        font-size: 12px;
        border-radius: 4px;
        color: #FFFFFF;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
        width: 100% !important;
    }

    .deposit-amount-area {
        width: 40px;
        position: absolute;
        top: 0;
        right: 0;
        background: #F97001;
        border-radius: 0px 4px;
        height: 15px;
    }

    .deposit-amount-rate-text {
        position: absolute;
        top: -3px;
        right: 2px;
        font-size: 8px;
        color: #FFFFFF;
    }

    .dark-textfield .v-field__field {
        background-color: #1C1929 !important;
    }

    .v-field--variant-solo {
        background: transparent !important;
    }

    .amount-checkbox {
        i.v-icon {
            color: #1C1929;
            background-color: #01983A;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            margin-top: 4px;
        }

        i.mdi-checkbox-blank-outline {
            background-color: #1C1929;
            box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
            border-radius: 4px;
        }
    }

    .deposit-other-text {
        font-weight: 600;
        font-size: 12px;
        color: #FFFFFF;
    }
}

.deposit-text {
    font-weight: 400;
    font-size: 14px;
    color: #7782AA;
}

.other-text {
    font-weight: 400;
    font-size: 12px;
    color: #7782AA;
}

.withdraw-text {
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
}

.payment-select-item {
    font-weight: 300;
    font-size: 10px;
    color: #7782AA;
}

.payment-width-370 {
    width: 370px !important;
    margin: auto;
    height: 440px !important;
}
</style>