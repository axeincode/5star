<script lang="ts" setup>
import { ref, defineAsyncComponent } from "vue"
const vipTab = ref('progress')
const vipItems = [
    'progress',
    'Benefits',
    'VIP Bonus'
]
const Benefits = defineAsyncComponent(() => import("@/components/vip/components/benefits/index.vue"));
const VipBonus = defineAsyncComponent(() => import("@/components/vip/components/vip_bonus/index.vue"));
const Progress = defineAsyncComponent(() => import("@/components/vip/components/progress/index.vue"));
</script>

<template>
    <div class="vip-main">
        <v-tabs center-active dark v-model="vipTab">
            <v-tab
                v-for="item in vipItems"
                :key="item"
                :value="item"
            >
                {{ item }}
            </v-tab>
        </v-tabs>
        <Progress v-if="vipTab === 'progress'"></Progress>
        <Benefits v-if="vipTab === 'Benefits'"></Benefits>
        <VipBonus v-if="vipTab === 'VIP Bonus'"></VipBonus>
    </div>
</template>

<style lang="scss" scoped>
.vip-main {
    ::v-deep(.v-tab) {
        width: 33.3%;
        color: #7782AA;
    }
    ::v-deep(.v-tab--selected) {
        color: #fff;
    }
    ::v-deep(.v-btn__content) {
        font-size: 12px;
        font-weight: 700;
    }
    ::v-deep(.v-slide-group__content) {
        justify-content: center;
    }
    ::v-deep(.v-tab__slider) {
        display: none;
    }
}
</style>