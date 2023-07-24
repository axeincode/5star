<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { appBarStore } from "@/store/appBar";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import Bonus from "@/components/bonus_transaction/bonus/index.vue";
import MBonus from "@/components/bonus_transaction/bonus/mobile/index.vue";
import Transaction from "@/components/bonus_transaction/transaction/index.vue";
import GameProviders from "@/components/global/game_provider/index.vue";

const { t } = useI18n();
const { width } = useDisplay()

const affiliateWidth = ref<string>('affiliate-container');
const selectedTabIndex = ref<number>(0)

const rightBarToggle = computed(() => {
    const { getRightBarToggle } = storeToRefs(appBarStore());
    return getRightBarToggle.value;
})

const  bonusTabIndex = computed(() => {
    const { getBonusTabIndex} = storeToRefs(bonusTransactionStore());
    return getBonusTabIndex.value
})

const mobileWidth: any = computed(() => {
    return width.value;
})

watch(bonusTabIndex, (newValue) => {
    selectedTabIndex.value = newValue;
}, {deep: true});

watch(rightBarToggle, (newValue) => {
    if (mobileWidth.value > 1280) {
        if (newValue) {
            affiliateWidth.value = "affiliate-container";
        } else {
            affiliateWidth.value = "affiliate-container-1";
        }
    } else {
        affiliateWidth.value = "m-affiliate-container";
    }
})

watch(mobileWidth, (newValue: number) => {
    if (newValue > 1280) {
        if (rightBarToggle.value) {
            affiliateWidth.value = "affiliate-container";
        } else {
            affiliateWidth.value = "affiliate-container-1";
        }
    } else {
        affiliateWidth.value = "m-affiliate-container";
    }
})

const tabSelect = (index: number) => {
    selectedTabIndex.value = index;
}

onMounted(() => {
    if (mobileWidth.value > 1280) {
        if (rightBarToggle.value) {
            affiliateWidth.value = "affiliate-container";
        } else {
            affiliateWidth.value = "affiliate-container-1";
        }
    } else {
        affiliateWidth.value = "m-affiliate-container";
    }
    selectedTabIndex.value = bonusTabIndex.value;
})
</script>

<template>
    <div :class="affiliateWidth">
        <div class="affiliate-tabs">
            <div class="affiliate-tab-body" v-if="mobileWidth > 600">
                <p class="affiliate-tab-text" v-ripple.center @click="tabSelect(0)"
                    :class="[selectedTabIndex == 0 ? 'selected-tab-text' : '']">{{ t('appBar.bonuses') }}</p>
                <p class="affiliate-tab-text" v-ripple.center @click="tabSelect(1)"
                    :class="[selectedTabIndex == 1 ? 'selected-tab-text' : '']">{{ t('appBar.transactions') }}</p>
            </div>
            <div class="m-affiliate-tab-body" v-else>
                <v-row class="text-center">
                    <v-col cols="4">
                        <p v-ripple.center @click="tabSelect(0)" class="cursor-pointer"
                            :class="[selectedTabIndex == 0 ? 'selected-tab-text' : '']">{{ t('appBar.bonuses') }}</p>
                    </v-col>
                    <v-col cols="8">
                        <p v-ripple.center @click="tabSelect(1)" class="cursor-pointer"
                            :class="[selectedTabIndex == 1 ? 'selected-tab-text' : '']">{{ t('appBar.transactions') }}</p>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="affiliate-body">
            <div v-if="selectedTabIndex == 0">
                <Bonus v-if="mobileWidth > 600" />
                <MBonus v-else />
            </div>
            <div v-else>
                <Transaction/>
            </div>
        </div>
    </div>
    <div class="mx-2 mt-10">
        <GameProviders />
    </div>
</template>
<style lang="scss">
.affiliate-container {
    margin: -20px 20px;
    background: #211F31;
    padding-bottom: 20px;
    border-radius: 8px;
}

.affiliate-container-1 {
    margin: -20px 10px;
    background: #211F31;
    padding-bottom: 20px;
    border-radius: 8px;
}

.m-affiliate-container {
    margin: -20px 0px;
    background: #211F31;
    padding-bottom: 20px;
    border-radius: 8px;
}

.affiliate-tabs {
    padding-top: 30px;

    .affiliate-tab-body {
        display: flex;
        padding: 0px 60px;
        align-items: center;
        background: #29253C;
        height: 64px;
        margin: 8px;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 8px;
        font-weight: 400;
        font-size: 16px;
        color: #7782AA;
    }

    .m-affiliate-tab-body {
        display: flex;
        padding: 0px 60px;
        align-items: center;
        background: #29253C;
        height: 54px;
        margin: 0px 8px;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 8px;
        font-weight: 400;
        font-size: 16px;
        color: #7782AA;
    }

    .affiliate-tab-text {
        margin-right: 100px;
        cursor: pointer;
    }

    .selected-tab-text {
        font-weight: 700 !important;
        color: #FFFFFF !important;
    }

    .cursor-pointer {
        cursor: pointer;
    }
}
</style>