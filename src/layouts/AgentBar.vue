<script setup lang="ts">
import { ref, computed, watch, onMounted, defineAsyncComponent } from "vue";
import { agentStore } from "@/store/agent";
import { mailStore } from "@/store/mail";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
import MReferral from "@/components/agent/my_referral/index.vue";
// import MFAQ from "@/components/agent/faq/index.vue";
// import MProfit from "@/components/agent/profit/index.vue";
// import MReport from "@/components/agent/report/index.vue";
// import MGrade from "@/components/agent/grade/mobile/index.vue";

const MFAQ = defineAsyncComponent(() => import("@/components/agent/faq/index.vue"));
const MProfit = defineAsyncComponent(() => import("@/components/agent/profit/index.vue"));
const MReport = defineAsyncComponent(() => import("@/components/agent/report/index.vue"));
const MGrade = defineAsyncComponent(
  () => import("@/components/agent/grade/mobile/index.vue")
);

const { setMailMenuShow } = mailStore();
const { setAgentNavBarToggle } = agentStore();

const { t } = useI18n();

const drawer = ref<boolean>(false);
const activeIndex = ref<number>(0);

const scrollTop = ref<number>(0);

const agentNavBarToggle = computed(() => {
  const { getAgentNavBarToggle } = storeToRefs(agentStore());
  return getAgentNavBarToggle.value;
});

watch(agentNavBarToggle, (value) => {
  drawer.value = value;
});

const handleTab = (index: number) => {
  activeIndex.value = index;
};

const handleScroll = (event: any) => {
  scrollTop.value = event.target.scrollTop;
};

const goReportTab = (index: number) => {
  activeIndex.value = index;
};

const closeAgentNavBarToggle = () => {
  setAgentNavBarToggle(false);
  setMailMenuShow(false);
};

onMounted(() => {
  // setAgentNavBarToggle(false);
});
</script>

<template>
  <v-navigation-drawer
    temporary
    location="right"
    v-model="drawer"
    :touchless="true"
    class="m-agent-drawer"
  >
    <v-btn
      class="m-agent-drawer-close-button"
      icon="true"
      width="20"
      height="20"
      @click="closeAgentNavBarToggle"
    >
      <img :src="icon_public_10" width="18" />
    </v-btn>
    <div class="m-agent-header" :class="scrollTop == 0 ? '' : 'm-agent-header-active-bg'">
      <div class="d-flex mx-5 justify-between mt-10">
        <span
          @click="handleTab(0)"
          :class="activeIndex == 0 ? 'text-700-12 text-white' : 'text-400-12 text-gray'"
        >
          {{ t("agent.text_1") }}
        </span>
        <span
          @click="handleTab(1)"
          :class="activeIndex == 1 ? 'text-700-12 text-white' : 'text-400-12 text-gray'"
        >
          {{ t("agent.text_2") }}
        </span>
        <span
          @click="handleTab(2)"
          :class="activeIndex == 2 ? 'text-700-12 text-white' : 'text-400-12 text-gray'"
        >
          {{ t("agent.text_3") }}
        </span>
        <span
          @click="handleTab(3)"
          :class="activeIndex == 3 ? 'text-700-12 text-white' : 'text-400-12 text-gray'"
        >
          {{ t("agent.text_4") }}
        </span>
        <span
          @click="handleTab(4)"
          :class="activeIndex == 4 ? 'text-700-12 text-white' : 'text-400-12 text-gray'"
        >
          {{ t("agent.text_5") }}
        </span>
      </div>
    </div>
    <div class="m-agent-body" @scroll="handleScroll">
      <MReferral v-if="activeIndex == 0" @goReportTab="goReportTab" />
      <MFAQ v-if="activeIndex == 1" />
      <MProfit v-if="activeIndex == 2" />
      <MReport v-if="activeIndex == 3" />
      <MGrade v-if="activeIndex == 4" />
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss">
.m-agent-drawer {
  background: $agent_card_bg !important;
  height: 100% !important;
  width: 100% !important;
  top: 0px !important;
  z-index: 100000000 !important;

  .m-agent-header {
    z-index: 1000;
    position: fixed;
    width: 100% !important;
    top: 0px !important;
    border-style: none !important;
    height: 70px !important;
  }

  .m-agent-header-active-bg {
    box-shadow: $agent_card_notmet_box_shadow !important;
    background: $agent_card_notmet_bg !important;
  }

  .m-agent-drawer-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 6px;
    right: 6px;
    z-index: 100000;
  }

  .m-agent-body {
    // margin-top: 70px;
    // padding-top: 8px;
    height: calc(100vh - 70px);
    overflow-y: scroll;
    position: absolute;
    top: 70px;
    width: 100%;
  }
}
</style>
