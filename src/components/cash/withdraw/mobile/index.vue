<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import moment from 'moment-timezone';
import { appBarStore } from '@/store/appBar';
import { mailStore } from '@/store/mail';
import { type GetCurrencyItem } from '@/interface/deposit';
import { type GetPaymentItem } from '@/interface/deposit';
import ValidationBox from '@/components/cash/withdraw/ValidationBox.vue';
import Notification from "@/components/global/notification/index.vue";
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
const { name, width } = useDisplay();
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setMailList } = mailStore();

const selectedCurrencyItem = ref<GetCurrencyItem>({
    icon: new URL("@/assets/public/svg/icon_public_84.svg", import.meta.url).href,
    name: "BRL",
    value: 5.25
})
const selectedPaymentItem = ref<GetPaymentItem>({
    icon: new URL("@/assets/public/svg/icon_public_74.svg", import.meta.url).href,
    name: "PIX",
    description: "20~150.000 BRL"
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

const currencyMenuShow = ref<boolean>(false);
const paymentMenuShow = ref<boolean>(false);

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
    // if (validateAmount()) {
        isShowAmountValidaton.value = false;
    // } else {
    //     isShowAmountValidaton.value = true;
    // }
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
    <div class="mobile-withdraw-container">
        <v-row class="mt-6 mx-6 text-400-12 gray">
            {{ t('withdraw_dialog.withdraw_currency') }}
        </v-row>
        <v-menu offset="4" class="mt-1" v-model:model-value="currencyMenuShow">
            <template v-slot:activator="{ props }">
                <v-card color="#1C1929" theme="dark" class="mx-4 mt-4 m-deposit-card-height" style="border-radius: 12px;">
                    <v-list-item v-bind="props" class="currency-item m-deposit-card-height" value="currency dropdown"
                        :append-icon="currencyMenuShow ? 'mdi-chevron-down' : 'mdi-chevron-right'">
                        <template v-slot:prepend>
                            <img :src="selectedCurrencyItem.icon" width="20" />
                        </template>
                        <v-list-item-title class="ml-2 text-400-12">{{ selectedCurrencyItem.name }}</v-list-item-title>
                    </v-list-item>
                </v-card>
            </template>
            <v-list theme="dark" bg-color="#211F31" class="px-2">
                <v-list-item class="currency-item pl-6" :value="currencyItem.name"
                    v-for="(currencyItem, currencyIndex) in currencyList" :key="currencyIndex"
                    :class="selectedCurrencyItem.name == currencyItem.name ? 'currency-selected-item' : ''"
                    @click="handleSelectCurrency(currencyItem)">
                    <template v-slot:prepend>
                        <img :src="currencyItem.icon" width="20" />
                    </template>
                    <v-list-item-title class="ml-2 text-400-12">{{ currencyItem.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-row class="mt-6 mx-6 text-400-12 gray">
            {{ t('withdraw_dialog.withdraw_payment_method') }}
        </v-row>
        <v-menu offset="4" class="mt-1" v-model:model-value="paymentMenuShow">
            <template v-slot:activator="{ props }">
                <v-card color="#1C1929" theme="dark" class="mx-4 mt-4 m-deposit-card-height" style="border-radius: 12px;">
                    <v-list-item v-bind="props" class="payment-item m-deposit-card-height" value="payment dropdown"
                        :append-icon="paymentMenuShow ? 'mdi-chevron-down' : 'mdi-chevron-right'">
                        <template v-slot:prepend>
                            <img :src="selectedPaymentItem.icon" width="52" />
                        </template>
                        <v-list-item-title class="ml-2 text-400-12">{{ selectedPaymentItem.name }}</v-list-item-title>
                    </v-list-item>
                </v-card>
            </template>
            <v-list theme="dark" bg-color="#181522">
                <v-row class="m-payment-width-370">
                    <v-col cols="6" v-for="(paymentItem, paymentIndex) in paymentList" :key="paymentIndex" class="pa-1">
                        <v-card color="#1C1929" theme="dark" class="text-center">
                            <v-list-item class="payment-select-item pa-2" :value="paymentItem.name"
                                @click="handleSelectPayment(paymentItem)">
                                <img :src="paymentItem.icon" width="62" />
                                <v-list-item-title class="text-400-10">{{ paymentItem.name }}</v-list-item-title>
                                <v-list-item-title class="text-400-10">{{ paymentItem.description }}</v-list-item-title>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-list>
        </v-menu>
        <v-row class="mt-6 mx-6 text-500-10 white">
            {{ t('withdraw_dialog.withdraw_amount') }}
        </v-row>
        <v-row class="mt-4 mx-2 relative">
            <v-text-field :label="`${t('withdraw_dialog.amount')}(${selectedCurrencyItem.name})`"
                class="form-textfield dark-textfield" variant="solo" density="comfortable" color="#7782AA"
                v-model="withdrawAmount" :onfocus="handleAmountInputFocus" :onblur="handleAmountInputBlur"
                @input="handleAmountInputChange" />
            <ValidationBox v-if="isShowAmountValidaton" />
        </v-row>
        <v-row class="mt-4 mx-6 text-400-10 gray">
            {{ t('withdraw_dialog.text_1') }}
        </v-row>
        <v-row class="mt-4 mx-6 text-400-10 gray">
            {{ t('withdraw_dialog.text_2') }}
        </v-row>
        <v-row class="mt-4 mx-6 text-400-10 gray">
            {{ t('withdraw_dialog.text_3') }}
        </v-row>
        <v-row class="mt-4 mx-6 text-400-10 gray">
            {{ t('withdraw_dialog.text_4') }}
        </v-row>
        <v-row class="m-deposit-footer-text-position text-600-10 white justify-center mx-2">
            {{ t('withdraw_dialog.other_text') }}
        </v-row>
        <div class="m-deposit-btn-position">
            <v-btn class="ma-3 button-bright m-deposit-btn" width="-webkit-fill-available" height="48px"
                :disabled="!isDepositBtnReady" :onclick="handleWithdrawSubmit">
                {{ t('withdraw_dialog.withdraw_btn_text') }}
            </v-btn>
        </div>
        <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
    </div>
</template>

<style lang="scss">
// container
.mobile-withdraw-container {
    background-color: #211F31;
    height: 100%;

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

.other-text {
    font-weight: 400;
    font-size: 12px;
    color: #7782AA;
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
</style>