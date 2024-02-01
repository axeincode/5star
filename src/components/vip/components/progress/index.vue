
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { vipStore } from "@/store/vip";
import img_vipemblem_1 from "@/assets/vip/image/img_vipemblem_1.png";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";
import telegram_1 from "@/assets/vip/image/telegram_1.png";
import { useRouter } from "vue-router";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { refferalStore } from "@/store/refferal";
import { appBarStore } from "@/store/appBar";
const { t } = useI18n();
const { setVipNavBarToggle } = vipStore();
const { dispatchVipCycleawardReceive } = vipStore();
const { dispatchVipLevelAwardReceive } = vipStore();
const { dispatchVipBetawardReceive } = vipStore();
const { setBonusTabIndex } = bonusTransactionStore();
const { setDepositWithdrawToggle } = appBarStore();
const { setNavBarToggle } = appBarStore();
const { setUserNavBarToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setRefferalDialogShow } = refferalStore();
const vipButtonTipShow = ref(true);
const router = useRouter();

// member information  会员信息
const vipInfo = computed(() => {
    const { getVipInfo } = storeToRefs(vipStore());
    return getVipInfo.value
})

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

// Recharge progress bar  充值进度条
const depositRate = computed(() => {
    return vipInfo.value.deposit_exp / vipInfo.value.rank_deposit_exp * 100
})

// Betting progress bar  投注进度条
const betRate = computed(() => {
    return vipInfo.value.bet_exp / vipInfo.value.rank_bet_exp * 100
})

// vip level  vip等级
const vipLevels = computed(() => {
  const { getVipLevels } = storeToRefs(vipStore());
  return getVipLevels.value;
});

// Match VIP level name  匹配vip等级名称
const vipLevelText = (value: number) => {
    for (let i in vipLevels.value) {
        if (vipLevels.value[i].level === value) {
            return vipLevels.value[i].rank_name;
        }
    }
}

const vipLevelImg = (value: number) => {
    if (value === 0) {
        return img_vipemblem_1;
    }
    if (value > 0 && value < 25) {
        return img_vipemblem_1_24;
    }
    if (value > 25 && value < 50) {
        return img_vipemblem_25_49;
    }
    if (value > 49 && value < 76) {
        return img_vipemblem_50_74;
    }
    if (value > 75 && value < 100) {
        return img_vipemblem_75_99;
    }
    if (value > 99 && value < 150) {
        return img_vipemblem_100_149;
    }
    if (value > 149 && value < 200) {
        return img_vipemblem_159_199;
    }
    if (value === 200) {
        return img_vipemblem_200;
    }
}

// All available reward amounts  所有可领取奖励金额
const awardValue = () => {
    let val = 0;
    if (vipCycleawardList.value.membership_day_gift > 0) {
        val = val + vipCycleawardList.value.membership_day_gift * 1;
    }
    if (vipCycleawardList.value.week_gift > 0) {
        val = val + vipCycleawardList.value.week_gift * 1;
    }
    if (vipCycleawardList.value.month_gift > 0) {
        val = val + vipCycleawardList.value.month_gift * 1;
    }
    if (vipLevelAward.value.uprank_gift > 0) {
        val = val + vipLevelAward.value.uprank_gift * 1;
    }
    if (vipBetawardList.value.now_cash_back > 0) {
        val = val + vipBetawardList.value.now_cash_back * 1;
    }
    return val;
}

// Receive rewards with one click  一键领取奖励
const submitVipLevelAward = async () => {
    if (+vipCycleawardList.value.membership_day_gift > 0) {
        await dispatchVipCycleawardReceive({ type: 2 });
    }
    if (+vipCycleawardList.value.week_gift > 0) {
        await dispatchVipCycleawardReceive({ type: 3 });
    }
    if (+vipCycleawardList.value.month_gift > 0) {
        await dispatchVipCycleawardReceive({ type: 4 });
    }
    if (+vipLevelAward.value.uprank_gift > 0) {
        await dispatchVipLevelAwardReceive({ type: 6 });
    }
    if (+vipBetawardList.value.now_cash_back > 0) {
        await dispatchVipBetawardReceive({ type: 7 });
    }
}

// Route jump  路由跳转
const goPath = () => {
    setVipNavBarToggle('0');
    router.push({name: "Bonuses And Transactions", query: { tab: "VIP" }});
    setBonusTabIndex(1);
}

// Telegram jump  Telegram跳转
const goTelegram = () => {
    window.location.href = `https://t.me/${vipInfo.value.telegram}`
}

// vip prompt information status  vip提示信息状态
const getVipButtonShow = (show: boolean) => {
    vipButtonTipShow.value = show;
}

// Jump to the recharge pop-up window  跳转到充值弹窗
const depositDialogShow = () => {
    vipButtonTipShow.value = true;
    setVipNavBarToggle('0');
    setDepositWithdrawToggle(true);
    setNavBarToggle(false);
    setUserNavBarToggle(false);
    setDepositDialogToggle(true);
    setCashDialogToggle(true);
}

// Fission pop-up window pops up  弹出裂变弹窗
const refferalDialog = () => {
    vipButtonTipShow.value = true;
    setRefferalDialogShow(true);
}


</script>
<template>
    <div class="progress-main">
        <div class="progress-main-card">
            <div class="progress-main-card-t">
                <div class="progress-main-card-t-icon">
                    <img :src="vipLevelImg(vipInfo.level)" />
                </div>
                <div class="progress-main-card-t-info">
                    <div class="progress-main-card-t-info-title">
                        <span>{{ vipLevelText(vipInfo.level) }}</span>
                        <span>Level {{ vipInfo.level }}</span>
                    </div>
                    <div class="progress-main-card-t-info-content">
                        Get rewarded every time you fill the progress bar. Leveling upentitles you to bigger and better rewa rds！
                    </div>
                </div>
            </div>
            <div class="progress-main-card-m">
                <div class="progress-main-card-m-title">
                    <div class="progress-main-card-m-title-price">
                        <span>R$ {{ vipInfo.deposit_exp }}</span>
                        <span> / </span>
                        <span>R$ {{ vipInfo.rank_deposit_exp }}</span>
                    </div>
                </div>
                <div class="progress-main-card-m-info">
                    <span>Deposit</span>
                    <div class="progress-main-card-m-info-rate">
                        <v-progress-linear
                            v-model="depositRate"
                            height="16"
                            class="progress-main-card-m-info-rate-color"
                        >
                        </v-progress-linear>
                    </div>
                </div>
            </div>
            <div class="progress-main-card-b">
                <div class="progress-main-card-b-title">
                    <div class="progress-main-card-b-title-price">
                        <span>R$ {{ vipInfo.bet_exp }}</span>
                        <span> / </span>
                        <span>R$ {{ vipInfo.rank_bet_exp }}</span>
                    </div>
                </div>
                <div class="progress-main-card-b-info">
                    <span>Wager</span>
                    <div class="progress-main-card-b-info-rate">
                        <v-progress-linear
                            v-model="betRate"
                            height="16"
                            class="progress-main-card-b-info-rate-color"
                        >
                        </v-progress-linear>
                    </div>
                </div>
            </div>
        </div>
        <div class="progress-main-reward" v-if="vipButtonTipShow">
            <img src="@/assets/public/svg/img_public_26.svg" style="width: 100%" />
            <div class="progress-main-reward-bg">
                <div class="progress-main-reward-bg-t">
                    <span>Rewards available</span>
                    <span v-if="awardValue() > 0" @click="submitVipLevelAward">CLAIM</span>
                    <span class="available-button" v-else @click="getVipButtonShow(false)">CLAIM</span>
                </div>
                <div class="progress-main-reward-bg-b">
                    R$ {{ awardValue() }}
                </div>
            </div>
            
            <div class="progress-main-reward-svg"></div>

            <div class="progress-main-reward-view">
                <img src="@/assets/public/svg/icon_public_83.svg" />
                <span @click="goPath">View Records</span>
            </div>
        </div>
        <div class="progress-main-tip" v-else>
            <div class="progress-main-tip-title">No Claims</div>
            <div class="progress-main-tip-content">
                You must have made a deposit or referred a friend in the last 30 days to receive the bonus
            </div>
            <div class="progress-main-tip-button">
                <span @click="refferalDialog">REFER</span>
                <span @click="depositDialogShow">DEPOSIT</span>
            </div>
        </div>
        <div class="progress-main-group">
            <div class="progress-main-group-t">
                <div class="progress-main-group-t-icon">
                    <img :src="telegram_1" />
                </div>
                <div class="progress-main-group-t-info">
                    <span>VIP GROUP</span>
                    <span>Join our VIP group Get instant access to more events and bonuses</span>
                </div>
            </div>
            <div class="progress-main-group-b">
                <span @click="goTelegram">Join in now</span>
            </div>
        </div>
        <div class="progress-main-faq">
            <div class="progress-main-faq-title">FAQ</div>
            <el-collapse class="progress-main-faq-collapse">
                <el-collapse-item title='What is an " Evolution Bonus"?' name="1">
                    <div>What is an " Evolution Bonus"?What is an " Evolution Bonus"?What is an " Evolution Bonus"?What is an " Evolution Bonus"?What is an " Evolution Bonus"?</div>
                </el-collapse-item>
            </el-collapse>
            <el-collapse class="progress-main-faq-collapse">
                <el-collapse-item title='What is an " Weekly Bounes"?' name="1">
                    <div>What is an " Weekly Bounes"?What is an " Weekly Bounes"?What is an " Weekly Bounes"?What is an " Weekly Bounes"?What is an " Weekly Bounes"?</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.progress-main {
    margin: 0 16px;
    &-card {
        display: flex;
        flex-direction: column;
        padding: 16px 16px 32px 16px;
        border: 1px solid #23262F;
        background: linear-gradient(0deg, #23262F, #23262F),
        conic-gradient(from 45.08deg at 50.17% 49.69%, #1D2027 0deg, #23262F 360deg);
        border-radius: 8px;
        &-t {
            display: flex;
            &-icon {
                img {
                    height: 72px;
                    margin-right: 8px;
                }
            }
            &-info {
                display: flex;
                flex-direction: column;
                &-title {
                    display: flex;
                    justify-content: space-between;
                    span:nth-child(1) {
                        font-size: 16px;
                        font-weight: 800;
                        color: #F9BC01;
                    }
                    span:nth-child(2) {
                        font-size: 12px;
                        font-weight: 400;
                        color: #fff;
                    }
                }
                &-content {
                    font-size: 12px;
                    font-weight: 400;
                    color: #7782AA;
                }
            }
        }
        &-m {
            display: flex;
            flex-direction: column;
            &-title {
                display: flex;
                justify-content: flex-end;
                font-size: 12px;
                font-weight: 700;
                &-price {
                    color: #F9BC01;
                }
            }
            &-info {
                display: flex;
                justify-content: space-between;
                span {
                    width: 90px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #fff;
                }
                &-rate {
                    width: 100%;
                    &-color {
                        ::v-deep(.v-progress-linear__determinate) {
                            background: #F9BC01;
                            border-radius: 20px;
                        }
                        ::v-deep(.v-progress-linear__background) {
                            border-radius: 20px;
                        }
                    }
                }
            }
        }
        &-b {
            display: flex;
            flex-direction: column;
            &-title {
                display: flex;
                justify-content: flex-end;
                font-size: 12px;
                font-weight: 700;
                &-price {
                    span:nth-child(1) {
                        color: #7782AA;
                    }
                    span:nth-child(2) {
                        color: #009B3A;
                    }
                    span:nth-child(3) {
                        color: #009B3A;
                    }
                }
            }
            &-info {
                display: flex;
                justify-content: space-between;
                span {
                    width: 90px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #fff;
                }
                &-rate {
                    width: 100%;
                    &-color {
                        ::v-deep(.v-progress-linear__determinate) {
                            background: #009B3A;
                            border-radius: 20px;
                        }
                        ::v-deep(.v-progress-linear__background) {
                            border-radius: 20px;
                        }
                    }
                }
            }
        }
    }
    &-reward {
        position: relative;
        height: 104px;
        z-index: auto;
        margin: 6px -8px 0 -8px;
        &-bg {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 16px 32px;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 104px;
            background-image: url("@/assets/public/svg/img_public_26.svg");
            background-size: 100%;
            z-index: 9;
            &-t {
                display: flex;
                justify-content: space-between;
                .available-button {
                    background: #23262F !important;
                    box-shadow: 0px 4px 6px 1px #0000004D !important;
                    color: #7782AA !important;
                }
                span:nth-child(1) {
                    font-size: 12px;
                    font-weight: 400;
                    color: #fff;
                }
                span:nth-child(2) {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 112px;
                    height: 32px;
                    border-radius: 8px;
                    background: #F9BC01;
                    font-size: 12px;
                    font-weight: 700;
                    color: #000;
                    cursor: pointer;
                }
            }
            &-b {
                font-size: 18px;
                font-weight: 700;
                color: #fff;
            }
        }
        &-svg {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            width: 170px;
            height: 44px;
            right: 14px;
            bottom: 0px;
            background-image: url("@/assets/vip/image/Rectangle_2428.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            z-index: 8;
            padding-top: 14px;
            img {
                width: 12px;
                height: 12px;
                margin-right: 10px;
            }
            span {
                font-size: 10px;
                font-weight: 400;
                color: #fff;
                margin-right: 10px;
                cursor: pointer;
            }
        }
        &-view {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            width: 170px;
            height: 44px;
            right: 14px;
            bottom: 0px;
            z-index: 10;
            padding-top: 14px;
            img {
                width: 12px;
                height: 12px;
                margin-right: 10px;
            }
            span {
                font-size: 10px;
                font-weight: 400;
                color: #fff;
                margin-right: 10px;
                cursor: pointer;
            }
        }
    }
    &-tip {
        margin-top: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 104px;
        border-radius: 8px;
        background: #1D2027;
        &-title {
            display: flex;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            color: #fff;
        }
        &-content {
            width: 86%;
            margin: 4px auto;
            font-size: 10px;
            font-weight: 400;
            color: #7782AA;
        }
        &-button {
            display: flex;
            justify-content: center;
            span:nth-child(1) {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 112px;
                height: 32px;
                border-radius: 8px;
                background: #009B3A;
                box-shadow: 0px 4px 6px 1px #0000004D;
                font-size: 12px;
                font-weight: 700;
                color: #fff;
                cursor: pointer;
            }
            span:nth-child(2) {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 112px;
                height: 32px;
                border-radius: 8px;
                background: #009B3A;
                box-shadow: 0px 4px 6px 1px #0000004D;
                font-size: 12px;
                font-weight: 700;
                color: #fff;
                margin-left: 16px;
                cursor: pointer;
            }
        }
    }
    &-group {
        display: flex;
        flex-direction: column;
        height: 168px;
        background: #1D2027;
        border-radius: 8px;
        margin-top: 6px;
        padding: 24px 16px;
        &-t {
            display: flex;
            align-items: center;
            &-icon {
                img {
                    width: 48px;
                    height: 48px;
                    margin-right: 24px;
                }
            }
            &-info {
                display: flex;
                flex-direction: column;
                span:nth-child(1) {
                    font-size: 24px;
                    font-weight: 800;
                    color: #fff;
                }
                span:nth-child(2) {
                    font-size: 12px;
                    font-weight: 400;
                    color: #fff;
                }
            }
        }
        &-b {
            display: flex;
            justify-content: center;
            margin-top: 12px;
            span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 240px;
                height: 40px;
                border-radius: 8px;
                background: #1682F1;
                font-size: 14px;
                font-weight: 800;
                color: #fff;
            }
        }
    }
    &-faq {
        ::v-deep(.el-collapse) {
            --el-collapse-header-bg-color: #1D2027;
            --el-collapse-content-bg-color: #1D2027;
            --el-collapse-header-text-color: #7782AA;
            --el-collapse-border-color: #1D2027;
            padding: 0 16px;
            background: #1D2027;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 400;
        }
        ::v-deep(.el-collapse-item__content) {
            font-size: 10px;
            font-weight: 400;
            color: #7782AA;
        }
        &-title {
            font-size: 16px;
            font-weight: 800;
            color: #fff;
            margin-top: 10px;
        }
        &-collapse {
            margin-top: 10px;
        }
    }
}
</style>