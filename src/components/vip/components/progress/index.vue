
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { vipStore } from "@/store/vip";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import telegram_1 from "@/assets/vip/image/telegram_1.png";
const { t } = useI18n();
const vipInfo = computed(() => {
    const { getVipInfo } = storeToRefs(vipStore());
    return getVipInfo.value
})
const depositRate = computed(() => {
    return (vipInfo.deposit_exp / vipInfo.rank_deposit_exp * 100) || 0
})
const betRate = computed(() => {
    return (vipInfo.bet_exp / vipInfo.rank_bet_exp * 100) || 0
})
const vipLevelText = (value: number) => {
    if (value === 0) {
        return t('vip.vip_level_content.text_1')
    } else if (value > 0 && value < 25) {
        return t('vip.vip_level_content.text_2')
    } else if (value > 24 && value < 50) {
        return t('vip.vip_level_content.text_3')
    } else if (value > 49 && value < 75) {
        return t('vip.vip_level_content.text_4')
    } else if (value > 74 && value < 100) {
        return t('vip.vip_level_content.text_5')
    } else if (value > 99 && value < 150) {
        return t('vip.vip_level_content.text_6')
    } else if (value > 149 && value < 200) {
        return t('vip.vip_level_content.text_7')
    } else {
        return t('vip.vip_level_content.text_8')
    }
}

</script>
<template>
    <div class="progress-main">
        <div class="progress-main-card">
            <div class="progress-main-card-t">
                <div class="progress-main-card-t-icon">
                    <img :src="img_vipemblem_1_24" />
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
        <div class="progress-main-reward">
            <div class="progress-main-reward-bg">
                <div class="progress-main-reward-bg-t">
                    <span>Rewards available</span>
                    <span>COLLECT ALL</span>
                </div>
                <div class="progress-main-reward-bg-b">
                    R$ 0
                </div>
            </div>
            
            <div class="progress-main-reward-svg">
                <img src="@/assets/public/svg/icon_public_83.svg" />
                <span>View Records</span>
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
                <span>Join in now</span>
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
                <el-collapse-item title='What is an " Evolution Bonus"?' name="1">
                    <div>What is an " Evolution Bonus"?What is an " Evolution Bonus"?What is an " Evolution Bonus"?What is an " Evolution Bonus"?What is an " Evolution Bonus"?</div>
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
        height: 96px;
        margin-top: 6px;
        z-index: auto;
        &-bg {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 16px 32px;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 96px;
            background-image: url("@/assets/vip/image/img_public_26.png");
            background-size: 100%;
            z-index: 9;
            &-t {
                display: flex;
                justify-content: space-between;
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
            height: 24px;
            right: 14px;
            bottom: 4px;
            background-image: url("@/assets/vip/image/Rectangle_2428.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            z-index: 8;
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