<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { vipStore } from "@/store/vip";
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
import icon_public_87 from "@/assets/public/svg/icon_public_87.svg";

const { t } = useI18n();
const { dispatchVipLevelAward } = vipStore();
const { dispatchVipInfo } = vipStore();
const vipOverlay = ref(true);
const vipCheckboxVal = ref(false);
const vipInfo = computed(() => {
    const { getVipInfo } = storeToRefs(vipStore());
    return getVipInfo.value
})

const alertMessage = (message:string, type: number) => {
  const toast = useToast();
  toast.success(message, { 
      timeout: 3000,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: type == 1 ? SuccessIcon : WarningIcon,
      rtl: false,
  });
}

const errVIPMessage = computed((): string => {
    const { getErrMessage } = storeToRefs(vipStore());
    return getErrMessage.value
})

const submitVipLevelAward = async (awardType: number) => {
  await dispatchVipLevelAward({
    type: awardType
  }).then(() => {
    alertMessage(t('reward.success_text'), 1);
    dispatchVipInfo();
  }).catch(()=>{
    alertMessage(errVIPMessage.value, 0);
  });
}

watch(vipCheckboxVal, (value: boolean) => {
    if (value) {
        localStorage.setItem("vipCheckbox", '1');
    } else {
        localStorage.setItem("vipCheckbox", '0');
    }
})

onMounted(() => {
    if (localStorage.getItem('vipCheckbox') === '1') {
        vipOverlay.value = true;
    } else {
        vipOverlay.value = false;
    }
})
</script>
<template>
    <div class="bonus-main">
        <div class="bonus-main-cashback">
            <div class="bonus-main-cashback-l">
                <span>Cashback</span>
                <span>R$ 0</span>
            </div>
            <div class="bonus-main-cashback-r">
                <span v-if="vipInfo.membership > 0">CLAIM</span>
                <span class="available-button" v-else>CLAIM</span>
            </div>
        </div>
        <div class="bonus-main-membership">
            <div class="bonus-main-membership-l">
                <span>Membership Day</span>
                <span>R$ 0</span>
            </div>
            <div class="bonus-main-membership-r">
                <span v-if="vipInfo.membership > 0">CLAIM</span>
                <span class="available-button" v-else>CLAIM</span>
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
                        <span>R$ {{ vipInfo.week_gift }}</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span v-if="vipInfo.week_gift > 0" @click="submitVipLevelAward(1)">CLAIM</span>
                        <span class="available-button" v-else>CLAIM</span>
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
                        <span>R$ {{ vipInfo.month_gift }}</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span v-if="vipInfo.month_gift > 0" @click="submitVipLevelAward(2)">CLAIM</span>
                        <span class="available-button" v-else>CLAIM</span>
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
                        <span>R$ {{ vipInfo.uprank_gift }}</span>
                    </div>
                    <div class="bonus-main-gift-cycle-t-r">
                        <span v-if="vipInfo.uprank_gift > 0" @click="submitVipLevelAward(3)">CLAIM</span>
                        <span class="available-button" v-else>CLAIM</span>
                    </div>
                </div>
                <div class="bonus-main-gift-cycle-b">
                    <span></span>
                </div>
            </div>
        </div>
    </div>
    <v-overlay
        v-model="vipOverlay"
        contained
        class="align-center justify-center"
    >
        <div class="vip-overlay">
            <div class="vip-overlay-header">
                <span>Level Up!</span>
                <v-btn class="vip-overlay-header-close" icon="true" width="20" height="20" @click="setVipNavBarToggle('0')">
                    <img :src="icon_public_10" width="18" />
                </v-btn>
            </div>
            <div class="vip-overlay-level">
                <span>Level 0 - Level 13</span>
            </div>
            <div class="vip-overlay-tip">
                <span>Congratulations on leveling up!</span>
            </div>
            <div class="vip-overlay-content">
                <div class="vip-overlay-content-title">Congrats on the award!</div>
                <div class="vip-overlay-content-icon">
                    <img :src="icon_public_87" width="20" />
                    <span>MXN</span>
                </div>
                <div class="vip-overlay-content-price">
                    <span>20.00</span>
                </div>
            </div>
            <div class="vip-overlay-button">
                <v-btn
                    color="success"
                    @click="overlay = false"
                >
                    Go To Rewards
                </v-btn>
            </div>
            <div class="vip-overlay-checkbox">
                <v-checkbox
                    v-model="vipCheckboxVal"
                    label="Do Not Show Again"
                ></v-checkbox>
            </div>
        </div>
    </v-overlay>
</template>

<style>
.custom-checkbox .v-icon {
  background-image: url("@/assets/public/svg/icon_public_10.svg"); /* 这里替换成你想要显示的图片路径 */
}
</style>

<style lang="scss" scoped>
::v-deep(.v-overlay__content) {
    width: 100%;
    top: auto;
}
.vip-overlay {
    width: 90%;
    height: 411px;
    margin: 0 auto;
    border: 1px solid #23262F;
    background: linear-gradient(0deg, #23262F, #23262F),
    conic-gradient(from 45.08deg at 50.17% 49.69%, #1D2027 0deg, #23262F 360deg);
    border-radius: 8px;
    &-header {
        position: relative;
        height: 50px;
        line-height: 50px;
        text-align: center;
        span {
            font-size: 16px;
            font-weight: 800;
            color: #fff;
        }
        &-close {
            box-shadow: none !important;
            background-color: transparent !important;
            position: absolute !important;
            top: 16px;
            right: 16px;
            z-index: 99;
        }
    }
    &-level {
        line-height: 30px;
        width: 100%;
        text-align: center;
        span {
            font-size: 20px;
            font-weight: 800;
            color: #F9BC01;
        }
    }
    &-tip {
        line-height: 30px;
        width: 100%;
        text-align: center;
        span {
            font-size: 14px;
            font-weight: 400;
            color: #fff;
        }
    }
    &-content {
        width: 92%;
        height: 155px;
        margin: 20px auto;
        background: #15161C;
        box-shadow: 0px 0px 6px 1px #00000059 inset;
        border-radius: 8px;
        background-image: url("@/assets/vip/image/img_vip_5.png");
        background-repeat: no-repeat;
        background-position: center;
        background-position-y: 36px;
        &-title {
            line-height: 50px;
            text-align: center;
            font-size: 16px;
            font-weight: 800;
            color: #fff;
        }
        &-icon {
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            span {
                font-size: 12px;
                font-weight: 600;
                color: #fff;
                margin-left: 10px;
            }
        }
        &-price {
            display: flex;
            justify-content: center;
            span {
                font-size: 36px;
                font-weight: 800;
                color: #F9BC01;
            }
        }
    }
    &-button {
        width: 92%;
        margin: 0 auto;
        ::v-deep(.v-btn) {
            width: 100%;
            height: 48px;
            border-radius: 8px;
        }
        ::v-deep(.v-btn__content) {
            font-size: 14px;
            font-weight: 700;
        }
    }
    &-checkbox {
        display: grid;
        justify-content: center;
        ::v-deep(.v-label) {
            font-size: 12px;
            font-weight: 600;
            color: #fff;
            opacity: 1;
        }
        ::v-deep(.v-selection-control--density-default .v-icon) {
            background-image: url("@/assets/public/svg/icon_public_checkbox_true.svg");
            background-size: 100%;
        }
        ::v-deep(.v-selection-control__input > .mdi-checkbox-blank-outline) {
            background-image: url("@/assets/public/svg/icon_public_checkbox_false.svg");
            background-size: 100%;
        }
    }
}
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