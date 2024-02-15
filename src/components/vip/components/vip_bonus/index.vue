<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { vipStore } from "@/store/vip";

const { t } = useI18n();
const { dispatchVipCycleawardReceive } = vipStore();
const { dispatchVipLevelAwardReceive } = vipStore();
const { dispatchVipBetawardReceive } = vipStore();

// periodic rewards  周期性奖励
const vipCycleawardList = computed(() => {
    const { getVipCycleawardList } = storeToRefs(vipStore());
    return getVipCycleawardList.value;
})

// Level related rewards  等级相关奖励
const vipLevelAward = computed(() => {
    const { getVipLevelAward } = storeToRefs(vipStore());
    return getVipLevelAward.value;
})

// Code rebate  打码返利
const vipBetawardList = computed(() => {
    const { getVipBetawardList } = storeToRefs(vipStore());
    return getVipBetawardList.value;
})

</script>
<template>
    <div class="bonus-main">
        <div class="bonus-main-cashback">
            <div class="bonus-main-cashback-l">
                <span>{{ t('vip.vip_level_info.bonus.text_1') }}</span>
                <span>R$ {{ vipBetawardList.now_cash_back }}</span>
            </div>
            <div class="bonus-main-cashback-r">
                <span v-if="+vipBetawardList.now_cash_back > 0" @click="dispatchVipBetawardReceive({ type: 7 })">{{ t('vip.vip_level_info.bonus.text_2') }}</span>
                <span class="available-button" v-else>{{ t('vip.vip_level_info.bonus.text_2') }}</span>
            </div>
        </div>
        <div class="bonus-main-membership">
            <div class="bonus-main-membership-l">
                <span>{{ t('vip.vip_level_info.bonus.text_3') }}</span>
                <span>R$ {{ vipCycleawardList.membership_day_gift }}</span>
            </div>
            <div class="bonus-main-membership-r">
                <span v-if="+vipCycleawardList.membership_day_gift > 0" @click="dispatchVipCycleawardReceive({ type: 2 })">{{ t('vip.vip_level_info.bonus.text_2') }}</span>
                <span class="available-button" v-else>{{ t('vip.vip_level_info.bonus.text_2') }}</span>
            </div>
            <div class="bonus-main-membership-tip">
                <span>{{ t('vip.vip_level_info.bonus.text_4') }} </span>
                <span>21:23:22</span>
            </div>
        </div>
        <div class="bonus-main-gift">
            <div class="bonus-main-gift-cycle">
                <div class="bonus-main-gift-cycle-t">
                    <div class="bonus-main-gift-cycle-t-l">
                        <span>{{ t('vip.vip_level_info.bonus.text_5') }}</span>
                        <span>R$ {{ vipCycleawardList.week_gift }}</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span v-if="+vipCycleawardList.week_gift > 0" @click="dispatchVipCycleawardReceive({ type: 3 })">{{ t('vip.vip_level_info.bonus.text_2') }}</span>
                        <span class="available-button" v-else>{{ t('vip.vip_level_info.bonus.text_2') }}</span>
                    </div>
                </div>
                <div class="bonus-main-gift-cycle-b">
                    <span></span>
                </div>
            </div>
            <div class="bonus-main-gift-cycle">
                <div class="bonus-main-gift-cycle-t">
                    <div class="bonus-main-gift-cycle-t-l">
                        <span>{{ t('vip.vip_level_info.bonus.text_6') }}</span>
                        <span>R$ {{ vipCycleawardList.month_gift }}</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span v-if="+vipCycleawardList.month_gift > 0" @click="dispatchVipCycleawardReceive({ type: 4 })">{{ t('vip.vip_level_info.bonus.text_2') }}</span>
                        <span class="available-button" v-else>{{ t('vip.vip_level_info.bonus.text_2') }}</span>
                    </div>
                </div>
                <div class="bonus-main-gift-cycle-b">
                    <span></span>
                </div>
            </div>
            <div class="bonus-main-gift-cycle">
                <div class="bonus-main-gift-cycle-t">
                    <div class="bonus-main-gift-cycle-t-l">
                        <span>{{ t('vip.vip_level_info.bonus.text_7') }}</span>
                        <span>R$ {{ vipLevelAward.uprank_gift }}</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span v-if="+vipLevelAward.uprank_gift > 0" @click="dispatchVipLevelAwardReceive({ type: 6 })">{{ t('vip.vip_level_info.bonus.text_2') }}</span>
                        <span class="available-button" v-else>{{ t('vip.vip_level_info.bonus.text_2') }}</span>
                    </div>
                </div>
                <div class="bonus-main-gift-cycle-b">
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.bonus-main {
    margin: 0 16px;
    &-cashback {
        display: flex;
        justify-content: space-between;
        background: #1D2027;
        border-radius: 8px;
        padding: 32px 16px;
        &-l {
            display: flex;
            flex-direction: column;
            color: #fff;
            span:nth-child(1) {
                font-size: 12px;
                font-weight: 400;
            }
            span:nth-child(2) {
                font-size: 18px;
                font-weight: 700;
            }
        }
        &-r {
            display: flex;
            align-items: center;
            .available-button {
                background: #23262F;
                box-shadow: 0px 4px 6px 1px #0000004D;
                color: #7782AA;
            }
            span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 88px;
                height: 32px;
                border-radius: 8px;
                background: #F9BC01;
                color: #000;
                font-size: 12px;
                font-weight: 700;
            }
        }
    }
    &-membership {
        position: relative;
        display: flex;
        justify-content: space-between;
        background: url("@/assets/vip/image/Union.png") #009B3A no-repeat;
        border-radius: 8px;
        padding: 32px 16px;
        margin-top: 8px;
        &-l {
            display: flex;
            flex-direction: column;
            color: #fff;
            span:nth-child(1) {
                font-size: 12px;
                font-weight: 400;
            }
            span:nth-child(2) {
                font-size: 18px;
                font-weight: 700;
            }
        }
        &-r {
            display: flex;
            align-items: center;
            .available-button {
                background: #23262F;
                box-shadow: 0px 4px 6px 1px #0000004D;
                color: #7782AA;
            }
            span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 88px;
                height: 32px;
                border-radius: 8px;
                background: #F9BC01;
                color: #000;
                font-size: 12px;
                font-weight: 700;
            }
        }
        &-tip {
            position: absolute;
            right: 16px;
            bottom: 10px;
            span:nth-child(1) {
                font-size: 8px;
                font-weight: 400;
                color: #fff;
            }
            span:nth-child(2) {
                font-size: 10px;
                font-weight: 900;
                color: #f9bc01;
            }
        }
    }
    &-gift {
        background: #1D2027;
        border-radius: 8px;
        margin-top: 8px;
        &-cycle {
            display: flex;
            flex-direction: column;
            justify-content: center;
            &-t {
                display: flex;
                justify-content: space-between;
                padding: 32px 16px;
                &-l {
                    display: flex;
                    flex-direction: column;
                    color: #fff;
                    span:nth-child(1) {
                        font-size: 12px;
                        font-weight: 400;
                    }
                    span:nth-child(2) {
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
                &-r {
                    display: flex;
                    align-items: center;
                    .available-button {
                        background: #23262F;
                        box-shadow: 0px 4px 6px 1px #0000004D;
                        color: #7782AA;
                    }
                    span {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 88px;
                        height: 32px;
                        border-radius: 8px;
                        background: #F9BC01;
                        color: #000;
                        font-size: 12px;
                        font-weight: 700;
                    }
                }
            }
            &-b {
                width: 100%;
                span {
                    display: block;
                    width: 256px;
                    height: 1px;
                    margin: 0 auto;
                    background: #15161C;
                }
            }
        }
    }
}
</style>