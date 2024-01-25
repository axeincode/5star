<script lang="ts" setup>
import img_vipemblem_1 from "@/assets/vip/image/img_vipemblem_1.png";
import img_vipemblem_2 from "@/assets/vip/image/img_vipemblem_2.png";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";

const vipCardInfo = [
    {
        icon: img_vipemblem_1,
        title: 'black iron',
        vip: '(VIP 0)',
        status: []
    },
    {
        icon: img_vipemblem_1_24,
        title: 'Bronze',
        vip: '(VIP1-24)',
        status: ['Daily Spin Enabled']
    },
    {
        icon: img_vipemblem_25_49,
        title: 'Silver',
        vip: '(VIP25-49)',
        status: ['Daily Spin Enabled', 'Daily Spin Enabled', 'Daily Spin Enabled']
    },
    {
        icon: img_vipemblem_50_74,
        title: 'Gold',
        vip: '(VIP50-74)',
        status: ['Daily Spin Enabled', 'Daily Spin Enabled', 'Daily Spin Enabled']
    },
    {
        icon: img_vipemblem_75_99,
        title: 'Platinum',
        vip: '(VIP75-99)',
        status: ['Daily Spin Enabled', 'Daily Spin Enabled', 'Daily Spin Enabled']
    },
    {
        icon: img_vipemblem_100_149,
        title: 'Diamonds',
        vip: '(VIP100-149)',
        status: ['Daily Spin Enabled', 'Daily Spin Enabled', 'Daily Spin Enabled']
    },
    {
        icon: img_vipemblem_159_199,
        title: 'Yellow Diamond',
        vip: '(VIP150-199)',
        status: ['Daily Spin Enabled', 'Daily Spin Enabled', 'Daily Spin Enabled']
    },
    {
        icon: img_vipemblem_200,
        title: 'Blue Diamond',
        vip: '(VIP200)',
        status: ['Daily Spin Enabled', 'Daily Spin Enabled', 'Daily Spin Enabled']
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
                            <span v-for="subItem in item.status" :key="subItem">
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