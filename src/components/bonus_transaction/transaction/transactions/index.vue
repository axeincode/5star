<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import Pagination from '@/components/global/pagination/index.vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";

const { t } = useI18n()
const { width } = useDisplay();

const formsList = ref<Array<any>>([
    {
        date: "2023/1/29 17:50:36",
        amount: "R$3000000000.00",
        type: "Game Win",
        id: "re54er35sgf",
        note: "",
        balance: "R$ 300000000.00"
    },
    {
        date: "2023/1/29 17:50:36",
        amount: "-R$2.00",
        type: "Game Bet",
        id: "re54er35sgf",
        note: "",
        balance: "R$ 300000000.00"
    },
    {
        date: "2023/1/29 17:50:36",
        amount: "-R$10.00",
        type: "Game Bet",
        id: "re54er35sgf",
        note: "",
        balance: "R$ 300000000.00"
    },
    {
        date: "2023/1/29 17:50:36",
        amount: "R$0.81",
        type: "Berate",
        id: "4524",
        note: "",
        balance: "R$ 300000000.00"
    },
    {
        date: "2023/1/29 17:50:36",
        amount: "R$20.00",
        type: "Reffer reward",
        id: "45612456",
        note: "",
        balance: "R$ 300000000.00"
    },
    {
        date: "2023/1/29 17:50:36",
        amount: "-R$100.00",
        type: "Withdrawal PIX",
        id: "45612456",
        note: "",
        balance: "R$ 300000000.00"
    },
    {
        date: "2023/1/29 17:50:36",
        amount: "R$200.00",
        type: "Deposit PIX",
        id: "45612456",
        note: "",
        balance: "R$ 300000000.00"
    },
    {
        date: "2023/1/29 17:50:36",
        amount: "R$100.00",
        type: "Deposit PIX",
        id: "45612456",
        note: "",
        balance: "R$ 300000000.00"
    },
    {
        date: "2023/1/29 17:50:36",
        amount: "R$100.00",
        type: "Deposit PIX",
        id: "45612456",
        note: "",
        balance: "R$ 300000000.00"
    },
    {},
    {},
    {},
])

const mobileWidth = computed(() => {
    return width.value
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

</script>
<template>
    <v-row class="mx-2 mt-4">
        <v-table class="forms-bonus-table-bg" theme="dark" fixed-header height="700px">
            <thead class="forms-table-header">
                <tr>
                    <th class="forms-table-header-text" style="border-radius: 8px 0px 0px 8px;">
                        {{ t('transaction.transactions.date') }}
                    </th>
                    <th class="forms-table-header-text">
                        <div class="forms-table-border">{{ t('transaction.transactions.amount') }}</div>
                    </th>
                    <th class="forms-table-header-text">
                        <div>{{ t('transaction.transactions.type') }}</div>
                    </th>
                    <th class="forms-table-header-text">
                        <div class="forms-table-border">{{ t('transaction.transactions.id') }}</div>
                    </th>
                    <th class="forms-table-header-text">
                        <div class="forms-table-border-right">
                            {{ t('transaction.transactions.note') }}
                        </div>
                    </th>
                    <th class="forms-table-header-text" style="border-radius: 0px 8px 8px 0px;">
                        {{ t('transaction.transactions.balance') }}
                    </th>
                </tr>
            </thead>
            <tbody class="forms-table-body">
                <tr v-for="(item, index) in formsList" :key="index">
                    <td class="text-400-14">{{ item.date }}</td>
                    <td class="text-400-14"
                        :class="item.type != 'Game Bet' && item.type != 'Withdrawal PIX' ? 'color-01983A' : 'color-D42763'">
                        {{ item.amount }}</td>
                    <td class="text-400-14">{{ item.type }}</td>
                    <td class="text-400-14">{{ item.id }}</td>
                    <td class="text-400-14">{{ item.note }}</td>
                    <td class="text-400-14">{{ item.balance }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-row>
    <v-row class="justify-end" style="margin: 16px 8px 16px 16px!important; padding-right: 0px!important; padding-left: 0px!important;">
        <div style="float: right!important; width: 100%;">
            <Pagination style="float: right;"/>
        </div>
    </v-row>
</template>
<style lang="scss">
.forms-bonus-table-bg {
    background: #15161C !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 8px !important;
    width: 100% !important;
}

.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td,
.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>th {
    border-bottom: 1px solid #23262F;
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
    background: #23262F;
}

.forms-table-header {
    border-radius: 8px !important;
}

.forms-table-body {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    text-align: center;
}

.forms-table-header-text {
    font-weight: 700 !important;
    font-size: 16px !important;
    text-align: center !important;
    color: #000000 !important;
}

.forms-table-border {
    padding: 0px 20px;
    border-left: 1px solid #000000 !important;
    border-right: 1px solid #000000 !important;
}

.forms-table-border-right {
    padding-right: 20px;
    border-right: 1px solid #000000 !important;
}
</style>