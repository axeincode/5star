<script lang="ts" setup>
import { ref, defineAsyncComponent, watch, computed, onMounted } from "vue"
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { vipStore } from "@/store/vip";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg"
const vipTab = ref('Progress');
const vipNavigation = ref(null);
const { dispatchVipInfo, dispatchVipCycleawardList, dispatchVipBetawardList, dispatchVipLevelAward } = vipStore();
const vipItems = [
    'Progress',
    'Benefits',
    'VIP Bonus'
]
const vipDrawer = ref<boolean>(true);
const Benefits = defineAsyncComponent(() => import("@/components/vip/components/benefits/index.vue"));
const VipBonus = defineAsyncComponent(() => import("@/components/vip/components/vip_bonus/index.vue"));
const Progress = defineAsyncComponent(() => import("@/components/vip/components/progress/index.vue"));
const { setVipNavBarToggle } = vipStore();

const { t } = useI18n();

const vipNavBarToggle = computed(() => {
    const { getVipNavBarToggle } = storeToRefs(vipStore());
    return getVipNavBarToggle.value
})

// VIP related request initialization  vip相关请求初始化
const initVip = async () => {
    await dispatchVipInfo();
    await dispatchVipLevelAward();
    await dispatchVipCycleawardList();
    await dispatchVipBetawardList();
}

watch(vipNavBarToggle, (value: string) => {
    if (value === '1') {
        initVip();
        vipDrawer.value = true;
        document.body.style.height = vipNavigation.value.getBoundingClientRect().height + 'px';
    } else {
        vipDrawer.value = false;
        document.body.style.height = "auto";
    }
})

onMounted(async () => {
    if (localStorage.getItem('vipBar') === '1') {
        vipDrawer.value = true;
        document.body.style.height = vipNavigation.value.getBoundingClientRect().height + 'px';
    } else {
        vipDrawer.value = false;
    }
    await dispatchVipCycleawardList();
    await dispatchVipBetawardList();
})
</script>

<template>
    <v-navigation-drawer temporary location="right" v-model="vipDrawer" :touchless="true" class="m-vip-drawer">
        <div class="vip-main" ref="vipNavigation">
            <div class="vip-main-header">
                <v-btn class="m-vip-drawer-close-button" icon="true" width="20" height="20" @click="setVipNavBarToggle('0')">
                    <img :src="icon_public_10" width="18" />
                </v-btn>
            </div>
            <v-tabs center-active dark v-model="vipTab">
                <v-tab
                    v-for="item in vipItems"
                    :key="item"
                    :value="item"
                >
                    {{ item }}
                </v-tab>
            </v-tabs>
            <div class="vip-main-content">
                <Progress v-if="vipTab === 'Progress'"></Progress>
                <Benefits v-if="vipTab === 'Benefits'"></Benefits>
                <VipBonus v-if="vipTab === 'VIP Bonus'"></VipBonus>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<style lang="scss">
.m-vip-drawer {
    background: $agent_card_bg !important;
    height: 100% !important;
    width: 100% !important;
    top: 0px !important;
    z-index: 10000 !important;
    overflow: hidden;

    .m-vip-drawer-close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 16px;
        right: 16px;
        z-index: 99;
    }
}
</style>

<style lang="scss" scoped>
.vip-main {
    height: 100%;
    &-header {
        height: 40px;
    }
    &-content {
        height: calc(100% - 100px);
        overflow-y: auto;
        overscroll-behavior-y: contain;
    }
    ::v-deep(.v-navigation-drawer) {
        width: 100% !important;
    }
    ::v-deep(.v-tab) {
        width: 33.3%;
        color: #7782AA;
        text-transform: none;
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