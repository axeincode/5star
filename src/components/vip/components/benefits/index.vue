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

const { t } = useI18n();

const vipLevels = computed(() => {
  const { getVipLevels } = storeToRefs(vipStore());
  return getVipLevels.value;
});

const vipCardInfo = [
    {
        icon: img_vipemblem_1,
        title: vipLevels.value[0].rank_name,
        vip: '(VIP 0)',
        info: []
    },
    {
        icon: img_vipemblem_1_24,
        title: vipLevels.value[1].rank_name,
        vip: '(VIP1-24)',
        info: [
            t('vip.vip_level_info.bronze.week'), 
            t('vip.vip_level_info.bronze.moon'),
            t('vip.vip_level_info.bronze.cash'),
            t('vip.vip_level_info.bronze.mosaic'),
        ]
    },
    {
        icon: img_vipemblem_25_49,
        title: vipLevels.value[25].rank_name,
        vip: '(VIP25-49)',
        info: [
            t('vip.vip_level_info.silver.week'), 
            t('vip.vip_level_info.silver.moon'),
            t('vip.vip_level_info.silver.cash'),
            t('vip.vip_level_info.silver.mosaic'),
        ]
    },
    {
        icon: img_vipemblem_50_74,
        title: vipLevels.value[50].rank_name,
        vip: '(VIP50-75)',
        info: [
            t('vip.vip_level_info.gold.week'), 
            t('vip.vip_level_info.gold.moon'),
            t('vip.vip_level_info.gold.cash'),
            t('vip.vip_level_info.gold.mosaic'),
        ]
    },
    {
        icon: img_vipemblem_75_99,
        title: vipLevels.value[76].rank_name,
        vip: '(VIP76-99)',
        info: [
            t('vip.vip_level_info.platinum.week'), 
            t('vip.vip_level_info.platinum.moon'),
            t('vip.vip_level_info.platinum.cash'),
            t('vip.vip_level_info.platinum.mosaic'),
            t('vip.vip_level_info.platinum.withdraw'),
        ]
    },
    {
        icon: img_vipemblem_100_149,
        title: vipLevels.value[100].rank_name,
        vip: '(VIP100-149)',
        info: [
            t('vip.vip_level_info.diamonds.week'), 
            t('vip.vip_level_info.diamonds.moon'),
            t('vip.vip_level_info.diamonds.cash'),
            t('vip.vip_level_info.diamonds.mosaic'),
            t('vip.vip_level_info.diamonds.withdraw'),
        ]
    },
    {
        icon: img_vipemblem_159_199,
        title: vipLevels.value[159].rank_name,
        vip: '(VIP150-199)',
        info: [
            t('vip.vip_level_info.yellow_diamond.week'), 
            t('vip.vip_level_info.yellow_diamond.moon'),
            t('vip.vip_level_info.yellow_diamond.cash'),
            t('vip.vip_level_info.yellow_diamond.mosaic'),
            t('vip.vip_level_info.yellow_diamond.withdraw'),
        ]
    },
    {
        icon: img_vipemblem_200,
        title: vipLevels.value[200].rank_name,
        vip: '(VIP200)',
        info: [
            t('vip.vip_level_info.blue_diamond.week'), 
            t('vip.vip_level_info.blue_diamond.moon'),
            t('vip.vip_level_info.blue_diamond.cash'),
            t('vip.vip_level_info.blue_diamond.mosaic'),
            t('vip.vip_level_info.blue_diamond.withdraw'),
        ]
    }
]
</script>
<template>
    <div class="benefits-main">
        <div class="benefits-main-card">
            <div v-for="item in vipCardInfo" :key="item">
                <div class="benefits-main-card-content">
                    <img :src="item.icon" />
                    <div class="benefits-main-card-content-info">
                        <div class="benefits-main-card-content-info-title">
                            <span>{{ item.title }}</span>
                            <span>{{ item.vip }}</span>
                        </div>
                        <div class="benefits-main-card-content-info-status">
                            <span v-for="subItem in item.info" :key="subItem">
                                <i v-if="subItem"></i>
                                {{ subItem }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="benefits-main-card-content-line">
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.benefits-main {
    margin: 0 16px;
    border: 1px solid #15161C;
    background: #1D2027;
    border-radius: 8px;
    &-card {
        margin: 0 16px;
        &-content {
            display: flex;
            align-items: center;
            padding: 32px 0;
            img {
                margin-right: 16px;
                height: 64px;
            }
            &-info {
                &-title {
                    font-size: 16px;
                    font-weight: 900;
                    color: #fff;
                    margin-bottom: 4px;
                    span:nth-child(1) {
                        margin-right: 2px;
                    }
                }
                &-status {
                    display: flex;
                    flex-direction: column;
                    span {
                        font-size: 10px;
                        font-weight: 400;
                        color: #7782AA;
                        i {
                            display: inline-block;
                            width: 4px;
                            height: 4px;
                            border-radius: 4px;
                            background: #009B3A;
                            margin-right: 4px;
                        }
                    }
                }
            }
            &-line {
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