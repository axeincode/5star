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
        amount: "R$ 150.00",
        status: "Cancelled",
        note: "",
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Cancelled",
        note: "",
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Complete",
        note: "",
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Complete",
        note: "",
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Complete",
        note: "Stale",
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Cancelled",
        note: "Stale",
    },
    {
        date: "2023/1/29 17:50:36",
        id: "re54er35sgf",
        type: "pix",
        amount: "R$ 150.00",
        status: "Cancelled",
        note: "Stale",
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
                            <div style = "width: 50px; margin-left: 16px; margin-right: 20px;">
                                {{ t('transaction.transactions.date') }}
                            </div>
                        </div>
                        
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 130px; margin-left: 20px; margin-right: 20px;">
                                {{ t('transaction.transactions.id') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 60px; margin-left: 20px; margin-right: 20px;">
                                {{ t('transaction.transactions.type') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 120px; margin-left: 20px; margin-right: 20px;">
                                {{ t('transaction.transactions.amount') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border1" >
                            <div style = "width: 120px; margin-left: 20px; margin-right: 20px;">
                                {{ t('transaction.game_history.status') }}
                            </div>
                        </div>
                    </th>
                    <th class="text-700-12 black text-center" style="border-radius: 0px 8px 8px 0px;">
                        <div class="forms-table-border2" >
                            <div style = "width: 120px; margin-left: 20px; margin-right: 20px;">
                                {{ t('transaction.transactions.note') }}
                            </div>
                        </div>
                        
                    </th>
                </tr>
            </thead>
            <tbody class="forms-table-body">
                <tr v-for="(item, index) in formsList" :key="index">
                    <td class="text-400-10 text-center" style = "padding-top:21px!important; padding-bottom: 21px!important;">{{ item.date }}</td>
                    <td class="text-400-10 text-center" style="min-width: 130px; padding-top:21px!important; padding-bottom: 21px!important;">{{ item.id }}</td>
                    <td class="text-400-10 text-center" style = "padding-top:21px!important; padding-bottom: 21px!important;">{{ item.type }}</td>
                    <td class="text-400-10 text-center color-01983A" style="min-width: 130px; padding-top:21px!important; padding-bottom: 21px!important;">{{ item.amount }}</td>
                    <td class="text-400-10 text-center" :class="item.status == 'Complete' ? 'color-01983A' : ''" style = "padding-top:21px!important; padding-bottom: 21px!important;">{{ item.status }}</td>
                    <td class="text-400-10 text-center" style = "padding-top:21px!important; padding-bottom: 21px!important;">{{ item.note }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-row>
    <v-row class="m-bonus-transaction-table2">
        <Pagination style = "margin-top:4px;"/>
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

}
.m-bonus-transaction-table2 {
    float: right;
    margin-right: 4px;
    margin-top: 20px!important;
    margin-bottom: 20px;
}
</style>