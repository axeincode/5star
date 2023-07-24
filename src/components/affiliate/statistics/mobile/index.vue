<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

const { t } = useI18n()
const { width } = useDisplay();

const profitTab = ref("today");

const mobileWidth = computed(() => {
    return width.value
})
</script>
<template>
    <v-row class="mt-4 m-statistics-profit-text">
        {{ t('affiliate.statistics.mobile_profit_title') }}
    </v-row>
    <v-card class="m-statistics-profit-card-body">
        <v-row class="justify-center">
            <v-col cols="12" class="text-center mt-4">
                <v-row class="justify-center align-center">
                    <v-col cols="6">
                        <img src="@/assets/public/image/img_public_15.png" width="140" />
                    </v-col>
                    <v-col cols="6" class="text-justify">
                        <p class="m-statistics-profit-cash-text">R$ 19,34</p>
                        <p class="m-statistics-profit-text pa-0 my-2">
                            {{ t('affiliate.statistics.total_profit_text') }}
                        </p>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" class="text-center pt-0">
                <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                    <p class="m-statistics-profit-cash-text-1 mt-1">R$ 25.916</p>
                    <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.invitation_bonus') }}</p>
                </v-card>
                <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                    <p class="m-statistics-profit-cash-text-1 mt-1">R$ 40.533,73</p>
                    <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.betting_commision') }}</p>
                </v-card>
                <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                    <p class="m-statistics-profit-cash-text-1 mt-1">R$ 3.225</p>
                    <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.achivement_bonus') }}</p>
                </v-card>
                <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                    <p class="m-statistics-profit-cash-text-1 mt-1">3972</p>
                    <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.deposit_user') }}</p>
                </v-card>
                <div class="px-10 mb-4">
                    <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.text_1') }}</p>
                    <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.text_2') }}</p>
                    <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.text_3') }}</p>
                </div>
            </v-col>
        </v-row>
    </v-card>
    <v-tabs v-model="profitTab" bg-color="#211F31" class="mt-4 mx-6">
        <v-tab value="today" :class="[profitTab == 'today' ? 'm-statistics-tab-active' : 'm-statistics-tab']">
            {{ t('affiliate.statistics.tab.text_1') }}
        </v-tab>
        <v-tab value="week" :class="[profitTab == 'week' ? 'm-statistics-tab-active' : 'm-statistics-tab']" class="pa-0">
            {{ t('affiliate.statistics.tab.text_2') }}
        </v-tab>
        <v-tab value="month" :class="[profitTab == 'month' ? 'm-statistics-tab-active' : 'm-statistics-tab']" class="pa-0">
            {{ t('affiliate.statistics.tab.text_3') }}
        </v-tab>
    </v-tabs>
    <v-window v-model="profitTab">
        <v-window-item value="today">
            <v-card class="m-statistics-profit-card-today">
                <v-row class="justify-center">
                    <v-col cols="12" class="text-center mt-4">
                        <v-row class="justify-center align-center">
                            <v-col cols="6">
                                <img src="@/assets/public/image/img_public_16.png" width="140" />
                            </v-col>
                            <v-col cols="6" class="text-justify">
                                <p class="m-statistics-profit-cash-text">R$ 19,34</p>
                                <p class="m-statistics-profit-text pa-0 my-2">
                                    {{ t('affiliate.statistics.tab.today.profit_today_text') }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="text-center pt-0">
                        <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                            <p class="m-statistics-profit-cash-text-1 mt-1">R$ 19,34</p>
                            <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.betting_commision') }}</p>
                        </v-card>
                        <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                            <p class="m-statistics-profit-cash-text-1 mt-1">R$ 0</p>
                            <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.invitation_bonus') }}</p>
                        </v-card>
                        <div class="px-10 mb-4">
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_1') }}</p>
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_2') }}</p>
                            <p class="m-statistics-text_1">{{ t('affiliate.statistics.tab.profit_tab_text_3') }}</p>
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_4') }}</p>
                            <p class="m-statistics-text_1">
                                {{ t('affiliate.statistics.tab.profit_tab_text_5') }}<Font color="#F9BC01">$12</Font>
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-window-item>
        <v-window-item value="week">
            <v-card class="m-statistics-profit-card-week">
                <v-row class="justify-center">
                    <v-col cols="12" class="text-center mt-4">
                        <v-row class="justify-center align-center">
                            <v-col cols="6">
                                <img src="@/assets/public/image/img_public_16.png" width="140" />
                            </v-col>
                            <v-col cols="6" class="text-justify">
                                <p class="m-statistics-profit-cash-text">R$ 19,34</p>
                                <p class="m-statistics-profit-text pa-0 my-2">
                                    {{ t('affiliate.statistics.tab.week.profit_this_week_text') }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="text-center pt-0">
                        <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                            <p class="m-statistics-profit-cash-text-1 mt-1">R$ 19,34</p>
                            <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.betting_commision') }}</p>
                        </v-card>
                        <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                            <p class="m-statistics-profit-cash-text-1 mt-1">R$ 0</p>
                            <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.invitation_bonus') }}</p>
                        </v-card>
                        <div class="px-10 mb-4">
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_1') }}</p>
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_2') }}</p>
                            <p class="m-statistics-text_1">{{ t('affiliate.statistics.tab.profit_tab_text_3') }}</p>
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_4') }}</p>
                            <p class="m-statistics-text_1">
                                {{ t('affiliate.statistics.tab.profit_tab_text_5') }}<Font color="#F9BC01">$12</Font>
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-window-item>
        <v-window-item value="month">
            <v-card class="m-statistics-profit-card-month">
                <v-row class="justify-center">
                    <v-col cols="12" class="text-center mt-4">
                        <v-row class="justify-center align-center">
                            <v-col cols="6">
                                <img src="@/assets/public/image/img_public_16.png" width="140" />
                            </v-col>
                            <v-col cols="6" class="text-justify">
                                <p class="m-statistics-profit-cash-text">R$ 19,34</p>
                                <p class="m-statistics-profit-text pa-0 my-2">
                                    {{ t('affiliate.statistics.tab.month.profit_this_month_text') }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="text-center pt-0">
                        <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                            <p class="m-statistics-profit-cash-text-1 mt-1">R$ 19,34</p>
                            <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.betting_commision') }}</p>
                        </v-card>
                        <v-card theme="dark" color="#1C1929" class="ma-4 text-center m-statistics-card-border">
                            <p class="m-statistics-profit-cash-text-1 mt-1">R$ 0</p>
                            <p class="m-statistics-text-700 mb-1">{{ t('affiliate.invite.invitation_bonus') }}</p>
                        </v-card>
                        <div class="px-10 mb-4">
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_1') }}</p>
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_2') }}</p>
                            <p class="m-statistics-text_1">{{ t('affiliate.statistics.tab.profit_tab_text_3') }}</p>
                            <p class="m-statistics-text_1 mt-6">{{ t('affiliate.statistics.tab.profit_tab_text_4') }}</p>
                            <p class="m-statistics-text_1">
                                {{ t('affiliate.statistics.tab.profit_tab_text_5') }}<Font color="#F9BC01">$12</Font>
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-window-item>
    </v-window>
</template>
<style lang="scss">
.m-statistics-text_1 {
    font-weight: 700;
    font-size: 12px;
    color: #FFFFFF;
    text-align: justify;
}

.m-statistics-profit-text {
    padding: 0px 86px;
    font-weight: 800;
    font-size: 14px;
    color: #FFFFFF;
}

.m-statistics-card-border {
    border-radius: 30px;
}

.m-statistics-profit-card-body {
    margin: 24px 16px 0px 16px;
    background: linear-gradient(90deg, #29263F 0%, #4A32AA 100%) !important;
    border-radius: 8px !important;
}

.m-statistics-profit-cash-text {
    font-weight: 800;
    font-size: 26px;
    color: #F9BC01;
}

.m-statistics-profit-cash-text-1 {
    font-weight: 800;
    font-size: 20px;
    color: #F9BC01;
}

.m-statistics-text-700 {
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
}

.m-statistics-tab-active {
    width: 100px !important;
    background: #32CFEC !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    border-radius: 8px 8px 0px 0px !important;

    .v-btn__content {
        font-weight: 700 !important;
        font-size: 12px !important;
        white-space: normal !important;
        letter-spacing: normal !important;
        line-height: inherit !important;
    }
}

.m-statistics-tab {
    width: 100px !important;
    background: #29253C !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    border-radius: 8px 8px 0px 0px !important;
    color: #FFFFFF;

    .v-btn__content {
        font-weight: 700 !important;
        font-size: 12px !important;
        white-space: normal !important;
        letter-spacing: normal !important;
        line-height: inherit !important;
    }
}

.m-statistics-profit-card-today {
    margin: 0px 16px;
    background: linear-gradient(90deg, #2E68AF 0%, #21A68B 100%);
    border-radius: 8px;
}

.m-statistics-profit-card-week {
    margin: 0px 16px;
    background: linear-gradient(90deg, #3B26A6 0%, #6C2FE6 100%);
    border-radius: 8px;
}

.m-statistics-profit-card-month {
    margin: 0px 16px;
    background: linear-gradient(90deg, #DE8245 0%, #D84594 100%);
    border-radius: 8px;
}
</style>