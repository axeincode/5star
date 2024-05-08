<script setup lang="ts">
import { ref, computed, watch, onMounted, defineAsyncComponent } from "vue";
import { agentStore } from "@/store/agent";
import { mailStore } from "@/store/mail";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
import MReferral from "@/components/agent/my_referral/index.vue";
import usePageLoading from "@/hooks/pageLoading"
// import MFAQ from "@/components/agent/faq/index.vue";
// import MProfit from "@/components/agent/profit/index.vue";
// import MReport from "@/components/agent/report/index.vue";
// import MGrade from "@/components/agent/grade/mobile/index.vue";
const { pageLoading, setPageLoading, Loading } = usePageLoading()

const MFAQ = defineAsyncComponent(
  () => import("@/components/agent/faq/index.vue")
);
const MProfit = defineAsyncComponent(
  () => import("@/components/agent/profit/index.vue")
);
const MReport = defineAsyncComponent(
  () => import("@/components/agent/report/index.vue")
);
const MGrade = defineAsyncComponent(
  () => import("@/components/agent/grade/mobile/index.vue")
);

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});
const emit = defineEmits(["update:modelValue"]);

const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const { setMailMenuShow } = mailStore();
const { setAgentNavBarToggle } = agentStore();

const { t, locale } = useI18n();
// const drawer = ref<boolean>(false);
const activeIndex = ref<number>(0);

const scrollTop = ref<number>(0);

const currentLang = computed(() => {
  return locale.value;
});
// const agentNavBarToggle = computed(() => {
//   const { getAgentNavBarToggle } = storeToRefs(agentStore());
//   return getAgentNavBarToggle.value;
// });

// watch(agentNavBarToggle, (value) => {
//   drawer.value = value;
// });

const handleTab = (index: number) => {
  setPageLoading(true)
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
  console.log("mount ============== agentNavBarDrawer");
});
const inited = (val:boolean) => {
  setPageLoading(val)
}
</script>

<template>
  <v-navigation-drawer
    temporary
    location="right"
    v-model="modelValueNew"
    :touchless="true"
    class="m-agent-drawer"
  >
    <div class="m-agent-title">
      <!-- Agent -->
      <span>{{ t("agent.text_52") }}</span>
      <img
        :src="icon_public_10"
        @click="closeAgentNavBarToggle"
        width="18"
        class="m-agent-drawer-close-button"
      />
    </div>
    <div
      class="m-agent-header"
      :class="scrollTop == 0 ? '' : 'm-agent-header-active-bg'"
    >
      <div class="tabs" :class="[currentLang === 'es' ? 'tab-box' : '']">
        <div
          class="tabs-item tab-box-item"
          @click="handleTab(0)"
          :class="[activeIndex == 0 ? 'tabs-item-active' : '']"
        >
          {{ t("agent.text_1") }}
        </div>

        <div
          class="tabs-item tab-box-item"
          @click="handleTab(1)"
          :class="[activeIndex == 1 ? 'tabs-item-active' : '']"
        >
          {{ t("agent.text_2") }}
        </div>
        <div
          class="tabs-item tab-box-item"
          @click="handleTab(2)"
          :class="[activeIndex == 2 ? 'tabs-item-active' : '']"
        >
          {{ t("agent.text_3") }}
        </div>
        <div
          class="tabs-item tab-box-item"
          @click="handleTab(3)"
          :class="[activeIndex == 3 ? 'tabs-item-active' : '']"
        >
          {{ t("agent.text_4") }}
        </div>
        <!-- <div class="tab-box-item">
          <span
            @click="handleTab(4)"
            :class="activeIndex == 4 ? 'text-700-12 text-white' : 'text-400-12 text-gray'"
          >
            {{ t("agent.text_5") }}
          </span>
        </div> -->
      </div>
    </div>
    <div class="m-agent-body" v-show="pageLoading">
      <Loading height="100%"></Loading>
    </div>
    <div class="m-agent-body" v-show="!pageLoading" @scroll="handleScroll">
      <MReferral @inited="inited" v-if="activeIndex == 0" @goReportTab="goReportTab" />
      <MFAQ @inited="inited" v-if="activeIndex == 1" />
      <MProfit @inited="inited" v-if="activeIndex == 2" />
      <MReport @inited="inited" v-if="activeIndex == 3" />
      <MGrade @inited="inited" v-if="activeIndex == 4" />
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

  .m-agent-title {
    position: relative;
    height: 40px;
    width: 100vw;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    line-height: 40px;
    text-align: center;
    color: #fff;

    .m-agent-drawer-close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute !important;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      z-index: 100000;
    }
  }

  .m-agent-header {
    // z-index: 1000;
    // position: fixed;
    // top: 40px !important;
    width: 100% !important;
    border-style: none !important;
    height: 48px !important;

    // .tab-box {
    //   display: grid !important;
    //   grid-template-columns: repeat(4, 1fr) !important;
    // }
    .tabs {
      padding: 4px 16px;
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      height: 48px;

      .tab-box-item {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: pre-wrap;
        line-height: 14px;
      }

      .tabs-item {
        position: relative;
        height: 38px;
        background: #15161c;
        border-radius: 4px;
        position: relative;
        color: #7782AA;
        font-size: 12px;
        line-height: 15px;
        padding: 4px 6px;
      }

      .tabs-item-active {
        background: #1D2027;
        box-shadow: 0px 4px 6px 1px #0000004D;
        color: #fff;

         &::after {
          content: '';
          width: 24px;
          height: 2px;
          background: #009B3A;
          position: absolute;
          left: 50%;
          bottom: 0px;
          transform: translateX(-50%);
          border-radius: 4px 0px 0px 0px;
        }
      }
    }
  }

  .m-agent-header-active-bg {
    box-shadow: $agent_card_notmet_box_shadow !important;
    background: $agent_card_notmet_bg !important;
  }

  .m-agent-body {
    // margin-top: 70px;
    padding-top: 8px;
    height: calc(100vh - 90px);
    overflow: hidden;
    width: 100%;
  }

  .v-navigation-drawer__content {
    height: calc(100vh - 10px);
    overflow-y: hidden;
  }
}
</style>
