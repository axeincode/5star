<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { defineAsyncComponent } from "vue";
import { appBarStore } from "@/store/appBar";
import { refferalStore } from "@/store/refferal";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import Invite from "@/components/affiliate/invite/index.vue";
import MInvite from "@/components/affiliate/invite/mobile/index.vue";
// import Statistics from "@/components/affiliate/statistics/index.vue";
// import MStatistics from "@/components/affiliate/statistics/mobile/index.vue";
// import Forms from "@/components/affiliate/forms/index.vue";
// import MForms from "@/components/affiliate/forms/mobile/index.vue";

// const Invite = defineAsyncComponent(
//   () => import("@/components/affiliate/invite/index.vue")
// );
// const MInvite = defineAsyncComponent(
//   () => import("@/components/affiliate/invite/mobile/index.vue")
// );
const Statistics = defineAsyncComponent(
  () => import("@/components/affiliate/statistics/index.vue")
);
const MStatistics = defineAsyncComponent(
  () => import("@/components/affiliate/statistics/mobile/index.vue")
);
const Forms = defineAsyncComponent(
  () => import("@/components/affiliate/forms/index.vue")
);
const MForms = defineAsyncComponent(
  () => import("@/components/affiliate/forms/mobile/index.vue")
);
const Achievement = defineAsyncComponent(
  () => import("@/components/affiliate/achievement/index.vue")
);
const MAchievement = defineAsyncComponent(
  () => import("@/components/affiliate/achievement/mobile/index.vue")
);

const { t } = useI18n();
const { width } = useDisplay();

const affiliateWidth = ref<string>("affiliate-container");
const selectedTabIndex = ref<number>(0);

const loading = ref<boolean>(true);

const rightBarToggle = computed(() => {
  const { getRightBarToggle } = storeToRefs(appBarStore());
  return getRightBarToggle.value;
});

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});

const mobileWidth: any = computed(() => {
  return width.value;
});

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
});

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
});

const tabSelect = (index: number) => {
  selectedTabIndex.value = index;
};

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
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<template>
  <div class="m-home-loading" v-if="loading">
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div>
  <div :class="affiliateWidth" v-else>
    <div
      :class="
        mobileWidth > 600
          ? 'affiliate-tabs'
          : refferalAppBarShow
          ? 'm-affiliate-tabs'
          : 'm-affiliate-tabs-1'
      "
    >
      <div class="affiliate-tab-body" v-if="mobileWidth > 600">
        <p
          class="affiliate-tab-text"
          v-ripple.center
          @click="tabSelect(0)"
          :class="[selectedTabIndex == 0 ? 'selected-tab-text' : '']"
        >
          {{ t("affiliate.tab.text_1") }}
        </p>
        <p
          class="affiliate-tab-text"
          v-ripple.center
          @click="tabSelect(3)"
          :class="[selectedTabIndex == 3 ? 'selected-tab-text' : '']"
        >
          {{ t("affiliate.tab.text_4") }}
        </p>
        <p
          class="affiliate-tab-text"
          v-ripple.center
          @click="tabSelect(1)"
          :class="[selectedTabIndex == 1 ? 'selected-tab-text' : '']"
        >
          {{ t("affiliate.tab.text_2") }}
        </p>
        <p
          class="affiliate-tab-text"
          v-ripple.center
          @click="tabSelect(2)"
          :class="[selectedTabIndex == 2 ? 'selected-tab-text' : '']"
        >
          {{ t("affiliate.tab.text_3") }}
        </p>
      </div>
      <div class="m-affiliate-tab-body" v-else>
        <v-row class="text-center">
          <v-col cols="3" class="px-1">
            <p
              v-ripple.center
              @click="tabSelect(0)"
              class="cursor-pointer"
              :class="[selectedTabIndex == 0 ? 'selected-tab-text' : '']"
            >
              {{ t("affiliate.tab.text_1") }}
            </p>
          </v-col>
          <v-col cols="3" class="px-1">
            <p
              v-ripple.center
              @click="tabSelect(3)"
              class="cursor-pointer"
              :class="[selectedTabIndex == 3 ? 'selected-tab-text' : '']"
            >
              {{ t("affiliate.tab.text_4") }}
            </p>
          </v-col>
          <v-col cols="3" class="px-1">
            <p
              v-ripple.center
              @click="tabSelect(1)"
              class="cursor-pointer"
              :class="[selectedTabIndex == 1 ? 'selected-tab-text' : '']"
            >
              {{ t("affiliate.tab.text_2") }}
            </p>
          </v-col>
          <v-col cols="3" class="px-1">
            <p
              v-ripple.center
              @click="tabSelect(2)"
              class="cursor-pointer"
              :class="[selectedTabIndex == 2 ? 'selected-tab-text' : '']"
            >
              {{ t("affiliate.tab.text_3") }}
            </p>
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
      <div v-if="selectedTabIndex == 3">
        <Achievement v-if="mobileWidth > 600" />
        <MAchievement v-else />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@keyframes expandAnimation {
  0% {
    scale: 1.3;
  }

  50% {
    scale: 1;
  }

  100% {
    scale: 1.3;
  }
}

@keyframes expandReverseAnimation {
  0% {
    scale: 0.8;
  }

  50% {
    scale: 1.2;
  }

  100% {
    scale: 0.8;
  }
}

.m-home-loading {
  height: 100vh;
  position: relative;
  overflow-y: hidden;

  .loading-body {
    display: flex;
    align-items: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);

    .dot-0 {
      width: 10px;
      height: 10px;
      background: #12ff76;
      border-radius: 10px;
      margin: 0px 4px;
      animation: expandAnimation 0.6s 0.1s ease-in infinite;
    }

    .dot-1 {
      width: 16px;
      height: 16px;
      background: #12ff76;
      border-radius: 16px;
      margin: 0px 4px;
      animation: expandReverseAnimation 0.6s 0.1s ease-in infinite;
    }
  }
}

.affiliate-container {
  margin: -20px 40px;
  background: #1D2027;
  padding-bottom: 20px;
  border-radius: 8px;
}

.affiliate-container-1 {
  margin: -20px 40px;
  background: #1D2027;
  padding-bottom: 20px;
  border-radius: 8px;
}

.m-affiliate-container {
  margin: -60px 0px 10px 0px;
  background: #1D2027;
  padding-bottom: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.affiliate-tabs {
  padding-top: 30px;

  .affiliate-tab-body {
    display: flex;
    padding: 0px 60px;
    align-items: center;
    background: #1D2027;
    height: 64px;
    margin: 8px 16px;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    border-radius: 8px;
    font-weight: 400;
    font-size: 16px;
    color: #7782aa;
  }

  .affiliate-tab-text {
    margin-right: 100px;
    cursor: pointer;
  }

  .selected-tab-text {
    font-weight: 700 !important;
    color: #ffffff !important;
  }

  .cursor-pointer {
    cursor: pointer;
  }
}

.m-affiliate-tabs {
  padding-top: 50px;

  .m-affiliate-tab-body {
    display: flex;
    padding: 0px 30px;
    align-items: center;
    background: rgb(var(--v-theme-color_29253c));
    height: 48px;
    margin: 0px 16px;
    box-shadow: 0px 3px 4px 1px rgba(var(--v-theme-color_000000), 0.21);
    border-radius: 8px;
    font-weight: 400;
    font-size: 12px;
    color: #7782aa;
  }

  .affiliate-tab-text {
    margin-right: 100px;
    cursor: pointer;
  }

  .selected-tab-text {
    font-weight: 700 !important;
    color: #ffffff !important;
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
    background: #1D2027;
    height: 48px;
    margin: 0px 16px;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    border-radius: 8px;
    font-weight: 400;
    font-size: 12px;
    color: #7782aa;
  }

  .affiliate-tab-text {
    margin-right: 100px;
    cursor: pointer;
  }

  .selected-tab-text {
    font-weight: 700 !important;
    color: #ffffff !important;
  }

  .cursor-pointer {
    cursor: pointer;
  }
}
</style>
