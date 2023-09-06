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
    <v-row class="mx-2 mt-1 m-forms-bonus-table1">
        <v-table class="m-forms-bonus-table-bg" theme="dark" fixed-header height="600px" style = "padding: 16px;">
            <thead class="forms-table-header">
                <tr>
                    <th class="text-700-12 black text-center" style="border-radius: 8px 0px 0px 8px;">
                        <div class="forms-table-border0" >
                            <div style = "width: 50px; margin-left: 16px; margin-right: 16px;">
                                {{ t('transaction.transactions.date') }}
                            </div>
                        </div>
                        
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 60px; margin-left: 16px; margin-right: 16px;">
                                {{ t('transaction.transactions.id') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 50px; margin-left: 16px; margin-right: 16px;">
                                {{ t('transaction.transactions.type') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 100px; margin-left: 16px; margin-right: 16px;">
                                {{ t('transaction.transactions.amount') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 90px; margin-left: 20px; margin-right: 20px;">
                                {{ t('transaction.game_history.status') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 90px; margin-left: 20px; margin-right: 20px;">
                                {{ t('transaction.transactions.note') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center" style="border-radius: 0px 8px 8px 0px;">
                        <div class="forms-table-border2" >
                            <div style = "width: 90px; margin-left: 20px; margin-right: 20px;">
                                {{ t('transaction.withdraw.action') }}
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody class="forms-table-body">
                <tr v-for="(item, index) in formsList" :key="index">
                    <td class="text-400-12" style = "padding-top:21px!important; padding-bottom: 21px!important;">{{ item.date }}</td>
                    <td class="text-400-12" style="padding-top:21px!important; padding-bottom: 21px!important; min-width: 60px;">{{ item.id }}</td>
                    <td class="text-400-12" style = "padding-top:21px!important; padding-bottom: 21px!important;">{{ item.type }}</td>
                    <td class="text-400-12 color-D42763" style="padding-top:21px!important; padding-bottom: 21px!important; min-width: 130px;">{{ item.amount }}</td>
                    <td class="text-400-12" :class="item.status == 'In Processing' ? 'color-F9BC01' : ''"
                        style="padding-top:21px!important; padding-bottom: 21px!important; min-width: 130px;">
                        {{ item.status }}
                    </td>
                    <td class="text-400-12" :class="item.status == 'In Processing' ? 'color-F9BC01' : ''" style = "padding-top:21px!important; padding-bottom: 21px!important;">{{ item.note }}
                    </td>
                    <td class="text-400-12" style = "padding-top:21px!important; padding-bottom: 21px!important;">
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
    <v-row class="m-bonus-transaction-table3">
        <v-col cols="4" class="d-flex " style = "margin-left: -12px; margin-top:4px;">
            <v-btn icon width="24" height="24" class="m-withdraw-info-icon">
                <v-icon>
                    <img src="@/assets/public/svg/icon_public_53.svg" />

                </v-icon>

            </v-btn>
        </v-col>
        <v-col cols="8" class="d-flex" style="padding-right: 6px;">
            <div style="width: 100%;">
                <Pagination />
            </div>
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

.m-forms-bonus-table1 {

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

    .forms-table-border0 {
        border-right: 1px solid #000000 !important;
    }

    .forms-table-border1 {
        border-left: 1px solid #000000 !important;
        border-right: 1px solid #000000 !important;
    }
    .forms-table-border2 {
        border-left: 1px solid #000000 !important;
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
.m-bonus-transaction-table3 {
    margin-left: 12px;
    margin-top: 16px!important;
    margin-bottom: 8px;
}
.m-withdraw-info-icon{
    background: transparent!important;
    box-shadow: none!important;;
}
</style>