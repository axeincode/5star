<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { appBarStore } from "@/store/appBar";
import { refferalStore } from '@/store/refferal';
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import Invite from "@/components/affiliate/invite/index.vue";
import MInvite from "@/components/affiliate/invite/mobile/index.vue";
import Statistics from "@/components/affiliate/statistics/index.vue";
import MStatistics from "@/components/affiliate/statistics/mobile/index.vue";
import Forms from "@/components/affiliate/forms/index.vue";
import MForms from "@/components/affiliate/forms/mobile/index.vue";

const { t } = useI18n();
const { width } = useDisplay()

const affiliateWidth = ref<string>('affiliate-container');
const selectedTabIndex = ref<number>(0)

const rightBarToggle = computed(() => {
    const { getRightBarToggle } = storeToRefs(appBarStore());
    return getRightBarToggle.value;
})

const refferalAppBarShow = computed(() => {
    const { getRefferalAppBarShow } = storeToRefs(refferalStore());
    return getRefferalAppBarShow.value;
})

const mobileWidth: any = computed(() => {
    return width.value;
})

watch(rightBarToggle, (newValue) => {
    if (mobileWidth.value > 1280) {
        if (newValue) {
            affiliateWidth.value = "affiliate-container";
        } else {
            affiliateWidth.value = "affiliate-container-1";
        }
    } else {
        affiliateWidth.value = "m-affiliate-container";
    }
})

watch(mobileWidth, (newValue: number) => {
    if (newValue > 1280) {
        if (rightBarToggle.value) {
            affiliateWidth.value = "affiliate-container";
        } else {
            affiliateWidth.value = "affiliate-container-1";
        }
    } else {
        affiliateWidth.value = "m-affiliate-container";
    }
})

const tabSelect = (index: number) => {
    selectedTabIndex.value = index;
}

onMounted(() => {
    if (mobileWidth.value > 1280) {
        if (rightBarToggle.value) {
            affiliateWidth.value = "affiliate-container";
        } else {
            affiliateWidth.value = "affiliate-container-1";
        }
    } else {
        affiliateWidth.value = "m-affiliate-container";
    }
})
</script>

<template>
    <div :class="affiliateWidth">
        <div :class="mobileWidth > 600 ? 'affiliate-tabs' : refferalAppBarShow ? 'm-affiliate-tabs' : 'm-affiliate-tabs-1'">
            <div class="affiliate-tab-body" v-if="mobileWidth > 600">
                <p class="affiliate-tab-text" v-ripple.center @click="tabSelect(0)"
                    :class="[selectedTabIndex == 0 ? 'selected-tab-text' : '']">{{ t('affiliate.tab.text_1') }}</p>
                <p class="affiliate-tab-text" v-ripple.center @click="tabSelect(1)"
                    :class="[selectedTabIndex == 1 ? 'selected-tab-text' : '']">{{ t('affiliate.tab.text_2') }}</p>
                <p class="affiliate-tab-text" v-ripple.center @click="tabSelect(2)"
                    :class="[selectedTabIndex == 2 ? 'selected-tab-text' : '']">{{ t('affiliate.tab.text_3') }}</p>
            </div>
            <div class="m-affiliate-tab-body" v-else>
                <v-row class="text-center">
                    <v-col cols="4">
                        <p v-ripple.center @click="tabSelect(0)" class="cursor-pointer"
                            :class="[selectedTabIndex == 0 ? 'selected-tab-text' : '']">{{ t('affiliate.tab.text_1') }}</p>
                    </v-col>
                    <v-col cols="4">
                        <p v-ripple.center @click="tabSelect(1)" class="cursor-pointer"
                            :class="[selectedTabIndex == 1 ? 'selected-tab-text' : '']">{{ t('affiliate.tab.text_2') }}</p>
                    </v-col>
                    <v-col cols="4">
                        <p v-ripple.center @click="tabSelect(2)" class="cursor-pointer"
                            :class="[selectedTabIndex == 2 ? 'selected-tab-text' : '']">{{ t('affiliate.tab.text_3') }}</p>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="affiliate-body">
            <div v-if="selectedTabIndex == 0">
                <Invite v-if="mobileWidth > 600" />
                <MInvite v-else />
            </div>
            <div v-if="selectedTabIndex == 1">
                <Statistics v-if="mobileWidth > 600" />
                <MStatistics v-else />
            </div>
            <div v-if="selectedTabIndex == 2">
                <Forms v-if="mobileWidth > 600" />
                <MForms v-else />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.affiliate-container {
    margin: -20px 20px;
    background: #211F31;
    padding-bottom: 20px;
    border-radius: 8px;
}

.affiliate-container-1 {
    margin: -20px 10px;
    background: #211F31;
    padding-bottom: 20px;
    border-radius: 8px;
}

.m-affiliate-container {
    margin: -60px 0px;
    background: #211F31;
    padding-bottom: 10px;
    margin-bottom: 1px;
    border-radius: 8px;
}

.affiliate-tabs {
    padding-top: 30px;

    .affiliate-tab-body {
        display: flex;
        padding: 0px 60px;
        align-items: center;
        background: #29253C;
        height: 64px;
        margin: 8px;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 8px;
        font-weight: 400;
        font-size: 16px;
        color: #7782AA;
    }

    .affiliate-tab-text {
        margin-right: 100px;
        cursor: pointer;
    }

    .selected-tab-text {
        font-weight: 700 !important;
        color: #FFFFFF !important;
    }

    .cursor-pointer {
        cursor: pointer;
    }
}

.m-affiliate-tabs {
    padding-top: 50px;

    .m-affiliate-tab-body {
        display: flex;
        padding: 0px 60px;
        align-items: center;
        background: #29253C;
        height: 48px;
        margin: 0px 16px;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 12px;
        font-weight: 400;
        font-size: 12px;
        color: #7782AA;
    }

    .affiliate-tab-text {
        margin-right: 100px;
        cursor: pointer;
    }

    .selected-tab-text {
        font-weight: 700 !important;
        color: #FFFFFF !important;
    }

    .cursor-pointer {
        cursor: pointer;
    }
}

.m-affiliate-tabs-1 {
    padding-top: 66px;

    .m-affiliate-tab-body {
        display: flex;
        padding: 0px 60px;
        align-items: center;
        background: #29253C;
        height: 48px;
        margin: 0px 16px;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 12px;
        font-weight: 400;
        font-size: 12px;
        color: #7782AA;
    }

    .affiliate-tab-text {
        margin-right: 100px;
        cursor: pointer;
    }

    .selected-tab-text {
        font-weight: 700 !important;
        color: #FFFFFF !important;
    }

    .cursor-pointer {
        cursor: pointer;
    }
}
</style>