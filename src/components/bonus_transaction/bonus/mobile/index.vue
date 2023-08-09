<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { type GetBonusData } from "@/interface/bonus";

const { t } = useI18n()
const { width } = useDisplay();

const mobileWidth = computed(() => {
    return width.value
})

const totalAmount = ref<string>("R$ 1500.56");
const withdrawAmount = ref<string>("R$ 855.79");

const bonusList = ref<Array<GetBonusData>>([
    {
        type: "Completion",
        rate: 100,
        currentCash: "R$ 90000.00",
        totalCash: "R$ 90000.00",
        restCash: "RRL 3000",
        bonusCash: "R$ 6000",
        expireDate: "2023/2/20"
    },
    {
        type: "Underway",
        rate: 50,
        currentCash: "R$ 90000.00",
        totalCash: "R$ 90000.00",
        restCash: "RRL 3000",
        bonusCash: "R$ 6000",
        expireDate: "2023/2/20"
    },
    {
        type: "Failure",
        rate: 0,
        currentCash: "R$ 0.00",
        totalCash: "R$ 67500.00",
        restCash: "RRL 3000",
        bonusCash: "R$ 0",
        expireDate: "2023/2/20"
    },
    {
        type: "Failure",
        rate: 50,
        currentCash: "R$ 36000.00",
        totalCash: "R$ 67500.00",
        restCash: "RRL 3000",
        bonusCash: "R$ 0",
        expireDate: "2023/2/20"
    },
]);

const formsList = ref<Array<any>>([
    {
        date: "2023/01/20",
        deposit: 3000,
        receive: 6000,
        wager: 90000
    },
])
</script>
<template>
    <v-row class="mt-4 mx-2 text-400-12 text-gray text-center">
        <v-col cols="12" class="pa-0">
            {{ t('bonus.title_text') }}
        </v-col>
    </v-row>
    <v-row class="mx-1 mt-4">
        <v-col cols="12" class="pa-1">
            <v-list-item class="m-bg-color-1 mx-6">
                <template v-slot:prepend>
                    <img src="@/assets/public/svg/icon_public_26.svg" width="30" />
                </template>
                <v-list-item-title class="ml-4" style="line-height: 20px;">
                    <div class="text-400-10 text-gray">{{ t('bonus.total_text') }}</div>
                    <div class="text-600-12 white">{{ totalAmount }}</div>
                </v-list-item-title>
                <template v-slot:append>
                    <div v-ripple.center style="width: 24px; height: 24px;">
                        <img src="@/assets/public/svg/btn_public_02.svg" width="24" />
                    </div>
                </template>
            </v-list-item>
            <v-list-item class="m-bg-color-1 mt-4 mx-6">
                <template v-slot:prepend>
                    <img src="@/assets/public/svg/icon_public_27.svg" width="30" />
                </template>
                <v-list-item-title class="ml-4" style="line-height: 20px;">
                    <div class="text-400-10 text-gray">{{ t('bonus.withdraw_text') }}</div>
                    <div class="text-600-12 white">{{ withdrawAmount }}</div>
                </v-list-item-title>
            </v-list-item>
        </v-col>
        <v-col cols="12" class="pa-1">
            <v-card theme="dark" color="#1C1929" class="m-bonus-card-body pa-2">
                <v-expansion-panels>
                    <v-expansion-panel class="bg-color-211F31 mt-2 m-collapse-body" v-for="(item, index) in bonusList"
                        :key="index">
                        <v-expansion-panel-title :class="[item.type == 'Failure' ? 'failure-title' : 'completion-title']">
                            <template v-slot:default="{ expanded }">
                                <v-row no-gutters class="align-center">
                                    <v-col cols="3"
                                        class="text-700-10 text-center bonus-cash-border d-flex align-center justify-center"
                                        :class="[item.type == 'Failure' ? 'black' : '']">{{ item.restCash }}</v-col>
                                    <v-col cols="3"
                                        class="text-400-10 text-center bonus-cash-border d-flex align-center justify-center"
                                        :class="[item.type == 'Failure' ? 'color-FF6200' : '']">{{ item.type }}</v-col>
                                    <v-col cols="4" class="text-center bonus-cash-border" v-if="item.type != 'Underway'">
                                        <div class="text-400-10" :class="[item.type == 'Failure' ? 'black' : '']">Expire on
                                        </div>
                                        <div class="text-600-10 mt-2" :class="[item.type == 'Failure' ? 'black' : '']">{{
                                            item.expireDate }}</div>
                                    </v-col>
                                    <v-col cols="4" class="text-center bonus-cash-border d-flex align-center justify-center"
                                        v-else>
                                        <div class="text-400-10">No time limit</div>
                                    </v-col>
                                    <v-col cols="2" class="text-right">
                                        <img src="@/assets/bonus/img/img_so_03.png" v-if="item.type == 'Completion'"
                                            width="25" />
                                        <img src="@/assets/bonus/img/img_so_07.png" v-else-if="item.type == 'Failure'"
                                            width="25" />
                                    </v-col>
                                    <v-col cols="12" class="text-center mt-1">
                                        <div class="text-400-10 mt-2" v-if="item.type != 'Underway'"
                                            :class="[item.type == 'Failure' ? 'black' : '']">
                                            Complete the task and get
                                            <Font :class="[item.type == 'Failure' ? 'm-bonus-cash-failure' : 'bonus-cash']">
                                                {{ item.bonusCash }}</Font> bonus
                                        </div>
                                        <div :class="[item.type == 'Underway' ? 'mt-4' : 'mt-2']">
                                            <v-progress-linear v-model="item.rate" height="16"
                                                :class="[item.type == 'Failure' ? 'failure-progress' : 'completion-progress']">
                                                <div class="text-400-10" :class="[item.type == 'Failure' ? 'gray' : '']">{{
                                                    item.currentCash }} / {{ item.totalCash }}</div>
                                            </v-progress-linear>
                                        </div>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row class="ma-0">
                                <v-col cols="8" class="text-right text-400-12">
                                    {{ t('bonus.super_bonus_text') }}
                                </v-col>
                                <v-col cols="4" class="text-right">
                                    <img src="@/assets/public/svg/icon_public_53.svg" width="20" />
                                </v-col>
                            </v-row>
                            <v-table class="m-forms-bonus-table-bg text-400-10">
                                <thead>
                                    <tr>
                                        <th>
                                            {{ t('bonus.table.date') }}
                                        </th>
                                        <th>
                                            {{ t('bonus.table.deposit') }}
                                        </th>
                                        <th>
                                            {{ t('bonus.table.receive') }}
                                        </th>
                                        <th>
                                            {{ t('bonus.table.wager') }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in formsList" :key="index">
                                        <td>{{ item.date }}</td>
                                        <td>{{ item.deposit }}</td>
                                        <td>{{ item.receive }}</td>
                                        <td>{{ item.wager }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                            <v-row class="ma-0">
                                <v-col cols="5" class="text-left text-500-10">
                                    ID: Qsd58844221122
                                </v-col>
                                <v-col cols="7" class="justify-end d-flex text-500-10">
                                    {{ t('bonus.table.deposit') }} $3000, {{ t('bonus.table.receive') }} $6000
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </v-col>
    </v-row>
</template>
<style lang="scss">
.m-bonus-card-body {
    // height: 700px;
    overflow-y: auto;

    .v-expansion-panel-title__icon {
        display: inline-flex;
        margin-bottom: -4px;
        margin-top: -4px;
        user-select: none;
        margin-inline-start: auto;
        position: absolute;
        top: 40px;
        right: 10px;
    }
}

.m-forms-bonus-table-bg {
    background: #1C1929 !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 12px !important;
    width: 100% !important;
}

.v-expansion-panel-title:active:enabled {
    transform: none !important;
    filter: none !important;
}

.bonus-cash-border {
    height: 30px;
    border-right: 1px solid #211F31;
}

.m-collapse-body .v-expansion-panel-title {
    border-radius: 8px !important;
    padding: 14px 8px !important;
    height: 100px !important;
}

.completion-title {
    background: linear-gradient(90deg, #29263F 0%, #4A32AA 100%) !important;
}

.failure-title {
    background: linear-gradient(90deg, #221F32 0%, #424567 100%) !important;
}

.v-expansion-panel:not(:first-child)::after {
    content: none !important;
}

.v-progress-linear {
    background: #211F31 !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 8px !important;
}

.v-progress-linear__background {
    background: transparent !important;
}

.completion-progress {
    .v-progress-linear__determinate {
        background: linear-gradient(180deg, #6D44F8 0%, #5726FC 100%) !important;
        border-radius: 8px !important;
    }
}

.failure-progress {
    .v-progress-linear__determinate {
        background: linear-gradient(0deg, #1C1929 0%, #393A71 100%);
        border-radius: 8px;
    }
}

.v-expansion-panel {
    border-radius: 8px !important;
}

.bonus-cash {
    color: #F9BC01;
    font-weight: 700;
}

.m-bonus-cash-failure {
    color: #000000;
    font-weight: 700;
}

.v-expansion-panel-text__wrapper {
    padding: 8px 8px 16px !important;
}
</style>