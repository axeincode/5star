<script lang="ts" setup>
import img_vip_bg from "@/assets/vip/image/Union.png";
</script>
<template>
    <div class="bonus-main">
        <div class="bonus-main-cashback">
            <div class="bonus-main-cashback-l">
                <span>Cashback</span>
                <span>R$ 999.999.999.00</span>
            </div>
            <div class="bonus-main-cashback-r">
                <span>CLAIM</span>
            </div>
        </div>
        <div class="bonus-main-membership">
            <div class="bonus-main-membership-l">
                <span>Membership Day</span>
                <span>R$ 100.000.00</span>
            </div>
            <div class="bonus-main-membership-r">
                <span>CLAIM</span>
            </div>
            <div class="bonus-main-membership-tip">
                <span>AvailabIe at </span>
                <span>21:23:22</span>
            </div>
        </div>
        <div class="bonus-main-gift">
            <div class="bonus-main-gift-cycle">
                <div class="bonus-main-gift-cycle-t">
                    <div class="bonus-main-gift-cycle-t-l">
                        <span>VIP Week Gift</span>
                        <span>R$ 99.00</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span>CLAIM</span>
                    </div>
                </div>
                <div class="bonus-main-gift-cycle-b">
                    <span></span>
                </div>
            </div>
            <div class="bonus-main-gift-cycle">
                <div class="bonus-main-gift-cycle-t">
                    <div class="bonus-main-gift-cycle-t-l">
                        <span>VIP Month Gift</span>
                        <span>R$ 999.00</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span>CLAIM</span>
                    </div>
                </div>
                <div class="bonus-main-gift-cycle-b">
                    <span></span>
                </div>
            </div>
            <div class="bonus-main-gift-cycle">
                <div class="bonus-main-gift-cycle-t">
                    <div class="bonus-main-gift-cycle-t-l">
                        <span>VIP Rank Bonus</span>
                        <span>R$ 999.999.999.00</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span>CLAIM</span>
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