<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
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

const { t } = useI18n();
const { dispatchVipLevelAwardReceive } = vipStore();
const { dispatchVipLevelAward } = vipStore();
const route = useRoute();
const vipCheckboxVal = ref(false);
const vipRankOverlay = ref(false);

const vipInfo = computed(() => {
    const { getVipInfo } = storeToRefs(vipStore());
    return getVipInfo.value;
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

// Level related rewards  等级相关奖励
const vipLevelAward = computed(() => {
    const { getVipLevelAward } = storeToRefs(vipStore());
    return getVipLevelAward.value;
})

// vip rank picture matching  vip段位图片匹配
const vipLevelImg = (value: number) => {
    if (value === 0) {
        return img_vipemblem_1;
    }
    if (value > 0 && value < 25) {
        return img_vipemblem_1_24;
    }
    if (value > 24 && value < 50) {
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

// watch(vipCheckboxVal, (value: boolean) => {
//     if (value) {
//         localStorage.setItem("vipCheckbox", '1');
//     } else {
//         localStorage.setItem("vipCheckbox", '0');
//     }
// })

watch(vipLevelAward, (value: any) => {
    if (+value.uprank_gift > 0) {
        vipRankOverlay.value = true;
    } else {
        vipRankOverlay.value = false;
    }
}, { deep: true })

onMounted(async () => {
    await dispatchVipLevelAward();
    if (route.name !=='Sports' && route.name !== 'Game') {
        if (+vipLevelAward.value.uprank_gift > 0) {
            vipRankOverlay.value = true;
    }
    }
    // if (localStorage.getItem('vipCheckbox') === '1') {
    //     vipRankOverlay.value = true;
    // } else {
    //     vipRankOverlay.value = false;
    // }
})
</script>

<template>
    <v-overlay
        v-model="vipRankOverlay"
        contained
        class="align-center justify-center vip-position"
    >
        <div class="vip-overlay">
            <div class="vip-overlay-header">
                <span>{{ t('vip.vip_level_info.uprank.text_1') }}</span>
                <v-btn class="vip-overlay-header-close" icon="true" width="20" height="20" @click="vipRankOverlay = false">
                    <img src="@/assets/public/svg/icon_public_10.svg" width="18" />
                </v-btn>
            </div>
            <div class="vip-overlay-level">
                <span>{{ vipLevelText(vipLevelAward.level) }}</span>
            </div>
            <div class="vip-overlay-tip">
                <span>{{ t('vip.vip_level_info.uprank.text_2') }}</span>
            </div>
            <div class="vip-overlay-content">
                <div class="vip-overlay-content-image"></div>
                <div class="vip-overlay-content-picture">
                    <img :src="vipLevelImg(vipLevelAward.level)" />
                </div>
                <div class="vip-overlay-content-title">{{ t('vip.vip_level_info.upgrade.text_4') }}</div>
                <div class="vip-overlay-content-icon">
                    <img src="@/assets/public/svg/icon_public_87.svg" width="20" />
                    <span>{{ t('vip.vip_level_info.upgrade.text_5') }}</span>
                </div>
                <div class="vip-overlay-content-price">
                    <span>{{ vipLevelAward.uprank_gift }}</span>
                </div>
            </div>
            <div class="vip-overlay-button">
                <v-btn
                    color="success"
                    @click="dispatchVipLevelAwardReceive({ type: 6 })"
                >
                {{ t('vip.vip_level_info.upgrade.text_6') }}
                </v-btn>
            </div>
            <!-- <div class="vip-overlay-checkbox">
                <v-checkbox
                    v-model="vipCheckboxVal"
                    label="Do Not Show Again"
                ></v-checkbox>
            </div> -->
        </div>
    </v-overlay>
</template>

<style lang="scss" scoped>
@keyframes zoomInOut {
    0% {
        transform: scale(0);
        opacity: 0;
        z-index: 999;
    }
    100% {
        transform: scale(1);
        opacity: 1;
        z-index: -1;
    }
}
.vip-position {
    position: fixed !important;
    z-index: 99999 !important;
}
::v-deep(.v-overlay__content) {
    width: 100%;
    top: auto;
}
.vip-overlay {
    width: 90%;
    height: 545px;
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
        min-height: 30px;
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
        min-height: 60px;
        line-height: 30px;
        width: 60%;
        text-align: center;
        margin: 0 auto;
        span {
            font-size: 14px;
            font-weight: 400;
            color: #fff;
        }
    }
    &-content {
        position: relative;
        width: 92%;
        height: 270px;
        margin: 20px auto;
        background: #15161C;
        box-shadow: 0px 0px 6px 1px #00000059 inset;
        border-radius: 8px;
        background-image: url("@/assets/vip/image/img_vip_11.png");
        background-repeat: no-repeat;
        background-size: 168px 168px;
        background-position-x: center;
        background-position-y: -10px;
        &-image {
            position: absolute;
            width: 100%;
            height: 100%;
            animation: zoomInOut 2s;
            background-image: url("@/assets/vip/image/img_vip_5.png");
            background-repeat: no-repeat;
            background-position: center;
            background-position-y: 36px;
            z-index: -1;
        }
        &-picture {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px 0 6px 0;
        }
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
</style>