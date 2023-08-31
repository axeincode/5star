<script lang="ts" setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from "pinia";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import GameHistory from "./game_history/index.vue";
import MGameHistory from "./mobile/game_history/index.vue";
import Transactions from "./transactions/index.vue";
import MTransactions from "./mobile/transactions/index.vue";
import Deposit from "./deposit/index.vue";
import MDeposit from "./mobile/deposit/index.vue";
import Withdrawal from "./withdrawal/index.vue";
import MWithdrawal from "./mobile/withdrawal/index.vue";

const { t } = useI18n()
const { width } = useDisplay();

const mobileWidth = computed(() => {
    return width.value
})

const transactionTabs = ref<Array<string>>([
    t('transaction.tab.game_history'),
    t('transaction.tab.transactions'),
    t('transaction.tab.deposit'),
    t('transaction.tab.withdrawal'),
    t('transaction.tab.vip'),
    t('transaction.tab.referral'),
])

const selectedTab = ref(t('transaction.tab.game_history'))

const transactionTab = computed(() => {
    const { getTransactionTab } = storeToRefs(bonusTransactionStore());
    return getTransactionTab.value
})

watch(transactionTab, (newValue) => {
    console.log(newValue);
    selectedTab.value = newValue;
}, { deep: true })

const touchless = () => {
    return false;
}

onMounted(() => {
    console.log(transactionTab.value);
    selectedTab.value = transactionTab.value == "" ? selectedTab.value : transactionTab.value;
})
</script>
<template>
    <v-slide-group class="mt-2" v-model="selectedTab" show-arrows style="touch-action: none; margin-left: 16px!important; margin-right: 16px!important;">
        <v-slide-group-item v-for="(item, index) in transactionTabs" :key="index" v-slot="{ isSelected, toggle }"
            :value="item">
            <v-btn class="ma-2 text-none transaction-tab-btn" :class="isSelected ? 'white' : 'text-gray'" rounded
                :color="isSelected ? '#29253C' : 'transparent'" @click="toggle" :width="mobileWidth < 600 ? 106 : 150">
                {{ item }}
            </v-btn>
        </v-slide-group-item>
    </v-slide-group>
    <v-window v-model="selectedTab" :disable-swipe="true" :touch="touchless()">
        <v-window-item :value="t('transaction.tab.game_history')" style="margin-left: 10px; margin-right: 10px;">
            <GameHistory v-if="mobileWidth > 600" />
            <MGameHistory v-else />
        </v-window-item>
        <v-window-item :value="t('transaction.tab.transactions')" style="margin-left: 10px; margin-right: 10px;">
            <Transactions v-if="mobileWidth > 600" />
            <MTransactions v-else />
        </v-window-item>
        <v-window-item :value="t('transaction.tab.deposit')" style="margin-left: 10px; margin-right: 10px;">
            <Deposit v-if="mobileWidth > 600" />
            <MDeposit v-else />
        </v-window-item>
        <v-window-item :value="t('transaction.tab.withdrawal')" style="margin-left: 10px; margin-right: 10px;">
            <Withdrawal v-if="mobileWidth > 600" />
            <MWithdrawal v-else />
        </v-window-item>
    </v-window>
</template>
<style lang="scss">
.v-slide-group {
    background: #1C1929 !important;
    margin: 8px !important;
    border-radius: 8px !important;
}

.v-slide-group__prev,
.v-slide-group__next {
    color: white !important;
}

.transaction-tab-btn {
    box-shadow: none;

    .v-btn__content {
        font-weight: 700;
        font-size: 16px !important;
    }
}

@media (max-width: 600px) {

    .v-slide-group {
        margin: 10px 0px !important;
    }

    .transaction-tab-btn {
        box-shadow: none;

        .v-btn__content {
            font-size: 12px !important;
        }
    }

    .v-slide-group__next,
    .v-slide-group__prev {
        display: none !important;
    }

}
</style>