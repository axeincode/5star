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
        id: "re54er35sgf",
        type: "pix",
        amount: "150000000.00",
        status: "In Processing",
        note: "...",
        actionType: 1
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Complete",
        note: "Payment Approved",
        actionType: 2
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Refunded",
        note: "Refunded By User Request ",
        actionType: 3
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Failed",
        note: "Payment Approved",
        actionType: 3
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Payment in progress",
        note: "Payment Approved",
        actionType: 4
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Refunded",
        note: "Rejected",
        actionType: 3
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "No Refunded",
        note: "Rejected",
        actionType: 3
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Complete",
        note: "Payment Approved",
        actionType: 3
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Complete",
        note: "Payment Approved",
        actionType: 3
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
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border">{{ t('transaction.transactions.id') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div>{{ t('transaction.transactions.type') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border">{{ t('transaction.transactions.amount') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div>{{ t('transaction.game_history.status') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border">{{ t('transaction.transactions.note') }}</div>
                    </th>
                    <th class="text-700-12 black text-center" style="border-radius: 0px 8px 8px 0px;">
                        {{ t('transaction.withdraw.action') }}
                    </th>
                </tr>
            </thead>
            <tbody class="forms-table-body">
                <tr v-for="(item, index) in formsList" :key="index">
                    <td class="text-400-10">{{ item.date }}</td>
                    <td class="text-400-10" style="min-width: 130px;">{{ item.id }}</td>
                    <td class="text-400-10">{{ item.type }}</td>
                    <td class="text-400-10 color-D42763" style="min-width: 130px;">{{ item.amount }}</td>
                    <td class="text-400-10" :class="item.status == 'In Processing' ? 'color-F9BC01' : ''"
                        style="min-width: 130px;">
                        {{ item.status }}
                    </td>
                    <td class="text-400-10" :class="item.status == 'In Processing' ? 'color-F9BC01' : ''">{{ item.note }}
                    </td>
                    <td class="text-400-10">
                        <v-btn class="ma-2 button-bright text-none withdraw-refund-btn" rounded v-if="item.actionType == 1">
                            {{ t('transaction.withdraw.refund') }}
                        </v-btn>
                        <img src="@/assets/public/svg/icon_public_18.svg" v-if="item.actionType == 2" />
                        <img src="@/assets/public/svg/icon_public_52.svg" v-if="item.actionType == 3" width="24" />
                        <img src="@/assets/public/svg/icon_public_25.svg" v-if="item.actionType == 4" width="24" />
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-row>
    <v-row class="ma-2 justify-end">
        <v-col cols="4" class="d-flex justify-start">
            <img src="@/assets/public/svg/icon_public_53.svg" width="24" />
        </v-col>
        <v-col cols="8" class="d-flex justify-end">
            <Pagination />
        </v-col>
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

    .withdraw-refund-btn {
        width: 68px;
        height: 24px;
        flex-shrink: 0;

        .v-btn__content {
            font-weight: 400;
            font-size: 10px !important;
        }
    }

}
</style>