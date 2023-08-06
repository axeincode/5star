<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import Pagination from '@/components/global/pagination/index.vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

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
])

const mobileWidth = computed(() => {
    return width.value
})
</script>
<template>
    <v-row class="mx-2 mt-1 m-forms-bonus-table">
        <v-table class="m-forms-bonus-table-bg" theme="dark" fixed-header height="600px">
            <thead class="forms-table-header">
                <tr>
                    <th class="text-700-12 black text-center" style="border-radius: 8px 0px 0px 8px;">
                        {{ t('transaction.transactions.date') }}
                    </th>
                    <th class="text-700-12 black text-center" style="width: 130px;">
                        <div class="forms-table-border">{{ t('transaction.transactions.amount') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div>{{ t('transaction.transactions.type') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border">{{ t('transaction.transactions.id') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border-right">
                            {{ t('transaction.transactions.note') }}
                        </div>
                    </th>
                    <th class="text-700-12 black text-center" style="border-radius: 0px 8px 8px 0px;">
                        {{ t('transaction.transactions.balance') }}
                    </th>
                </tr>
            </thead>
            <tbody class="forms-table-body">
                <tr v-for="(item, index) in formsList" :key="index">
                    <td class="text-400-10">{{ item.date }}</td>
                    <td class="text-400-10" style="min-width: 160px;"
                        :class="item.type != 'Game Bet' && item.type != 'Withdrawal PIX' ? 'color-01983A' : 'color-D42763'">
                        {{ item.amount }}
                    </td>
                    <td class="text-400-10">{{ item.type }}</td>
                    <td class="text-400-10" style="min-width: 160px;">{{ item.id }}</td>
                    <td class="text-400-10">{{ item.note }}</td>
                    <td class="text-400-10" style="min-width: 130px;">{{ item.balance }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-row>
    <v-row class="ma-4 justify-end">
        <Pagination />
    </v-row>
</template>
<style lang="scss">
.m-forms-bonus-table-bg {
    background: #1C1929 !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 12px !important;
    width: 100% !important;
}

.m-forms-bonus-table {

    .v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
        background: #414968;
        height: 46px !important;
    }

    .v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td,
    .v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>th {
        border-bottom: 1px solid #414968;
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

    .forms-table-border {
        padding: 0px 20px;
        border-left: 1px solid #000000 !important;
        border-right: 1px solid #000000 !important;
    }

    .forms-table-border-right {
        padding-right: 20px;
        border-right: 1px solid #000000 !important;
    }

}
</style>