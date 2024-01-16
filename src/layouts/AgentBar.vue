<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { agentStore } from "@/store/agent";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg"

const { t } = useI18n();

const drawer = ref<boolean>(false);
const { setAgentNavBarToggle } = agentStore();
const activeIndex = ref<number>(0);

const agentNavBarToggle = computed(() => {
    const { getAgentNavBarToggle } = storeToRefs(agentStore());
    return getAgentNavBarToggle.value
})

watch(agentNavBarToggle, (value) => {
    drawer.value = value;
})

const handleTab = (index: number) => {
    activeIndex.value = index;
}

onMounted(() => {
    setAgentNavBarToggle(false)
})
</script>

<template>
    <v-navigation-drawer temporary location="right" v-model="drawer" :touchless="true" class="m-agent-drawer">
        <v-btn class="m-agent-drawer-close-button" icon="true" width="20" height="20" @click="setAgentNavBarToggle(false)">
            <img :src="icon_public_10" width="18" />
        </v-btn>
        <div class="m-agent-header">
            <div class="d-flex mx-5 justify-between mt-10">
                <span @click="handleTab(0)" :class="activeIndex == 0 ? 'text-700-12 text-white' : 'text-400-12 text-gray'">{{ t("agent.text_1") }}</span>
                <span @click="handleTab(1)"  :class="activeIndex == 1 ? 'text-700-12 text-white' : 'text-400-12 text-gray'">{{ t("agent.text_2") }}</span>
                <span @click="handleTab(2)"  :class="activeIndex == 2 ? 'text-700-12 text-white' : 'text-400-12 text-gray'">{{ t("agent.text_3") }}</span>
                <span @click="handleTab(3)" :class="activeIndex == 3 ? 'text-700-12 text-white' : 'text-400-12 text-gray'">{{ t("agent.text_4") }}</span>
                <span @click="handleTab(4)" :class="activeIndex == 4 ? 'text-700-12 text-white' : 'text-400-12 text-gray'">{{ t("agent.text_5") }}</span>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<style lang="scss">
.m-agent-drawer {
    background: var(--grade-1-black, #15161C) !important;
    height: 100% !important;
    width: 100% !important;
    top: 0px !important;
    z-index: 100000000 !important;
}

.m-agent-header {
    position: fixed;
    width: 100% !important;
    top: 0px !important;
    border-style: none !important;
    background: var(--grade-2-black, #1D2027) !important;
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.30) !important;
    height: 70px !important;
}

.m-agent-drawer-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 6px;
    right: 6px;
    z-index: 100000;
}
</style>