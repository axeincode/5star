<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { defineAsyncComponent } from "vue";
import { appBarStore } from "@/store/appBar";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { refferalStore } from "@/store/refferal";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
// import Bonus from "@/components/bonus_transaction/bonus/index.vue";
// import MBonus from "@/components/bonus_transaction/bonus/mobile/index.vue";
// import Transaction from "@/components/bonus_transaction/transaction/index.vue";
import GameProviders from "@/components/global/game_provider/index.vue";

const Bonus = defineAsyncComponent(
  () => import("@/components/bonus_transaction/bonus/index.vue")
);
const MBonus = defineAsyncComponent(
  () => import("@/components/bonus_transaction/bonus/mobile/index.vue")
);
const Transaction = defineAsyncComponent(
  () => import("@/components/bonus_transaction/transaction/index.vue")
);
// const GameProviders = defineAsyncComponent(
//   () => import("@/components/global/game_provider/index.vue")
// );

const { t } = useI18n();
const { width } = useDisplay();

const affiliateWidth = ref<string>("bonus-transaction-container");
const selectedTabIndex = ref<number>(0);

const loading = ref<boolean>(true);

const rightBarToggle = computed(() => {
  const { getRightBarToggle } = storeToRefs(appBarStore());
  return getRightBarToggle.value;
});

const bonusTabIndex = computed(() => {
  const { getBonusTabIndex } = storeToRefs(bonusTransactionStore());
  return getBonusTabIndex.value;
});

const mobileWidth: any = computed(() => {
  return width.value;
});

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});

watch(
  bonusTabIndex,
  (newValue) => {
    selectedTabIndex.value = newValue;
  },
  { deep: true }
);

watch(rightBarToggle, (newValue) => {
  if (mobileWidth.value > 1280) {
    if (newValue) {
      affiliateWidth.value = "bonus-transaction-container";
    } else {
      affiliateWidth.value = "bonus-transaction-container-1";
    }
  } else {
    affiliateWidth.value = "m-bonus-transaction-container";
  }
});

watch(mobileWidth, (newValue: number) => {
  if (newValue > 1280) {
    if (rightBarToggle.value) {
      affiliateWidth.value = "bonus-transaction-container";
    } else {
      affiliateWidth.value = "bonus-transaction-container-1";
    }
  } else {
    affiliateWidth.value = "m-bonus-transaction-container";
  }
});

const tabSelect = (index: number) => {
  selectedTabIndex.value = index;
};

onMounted(() => {
  if (mobileWidth.value > 1280) {
    if (rightBarToggle.value) {
      affiliateWidth.value = "bonus-transaction-container";
    } else {
      affiliateWidth.value = "bonus-transaction-container-1";
    }
  } else {
    affiliateWidth.value = "m-bonus-transaction-container";
  }

  selectedTabIndex.value = bonusTabIndex.value;
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
          ? 'bonus-transaction-tabs'
          : refferalAppBarShow
          ? 'm-bonus-transaction-tabs'
          : 'm-bonus-transaction-tabs-1'
      "
    >
      <div class="bonus-transaction-tab-body" v-if="mobileWidth > 600">
        <p
          class="bonus-transaction-tab-text"
          v-ripple.center
          @click="tabSelect(0)"
          :class="[selectedTabIndex == 0 ? 'selected-tab-text' : '']"
        >
          {{ t("appBar.bonuses") }}
        </p>
        <p
          class="bonus-transaction-tab-text"
          v-ripple.center
          @click="tabSelect(1)"
          :class="[selectedTabIndex == 1 ? 'selected-tab-text' : '']"
        >
          {{ t("appBar.transactions") }}
        </p>
      </div>
      <div class="m-bonus-transaction-tab-body" v-else>
        <v-row class="text-center">
          <v-col cols="4">
            <p
              v-ripple.center
              @click="tabSelect(0)"
              class="cursor-pointer"
              :class="[selectedTabIndex == 0 ? 'selected-tab-text' : '']"
            >
              {{ t("appBar.bonuses") }}
            </p>
          </v-col>
          <v-col cols="8">
            <p
              v-ripple.center
              @click="tabSelect(1)"
              class="cursor-pointer"
              :class="[selectedTabIndex == 1 ? 'selected-tab-text' : '']"
            >
              {{ t("appBar.transactions") }}
            </p>
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-if="selectedTabIndex == 0">
      <Bonus v-if="mobileWidth > 600" />
      <MBonus v-else />
    </div>
    <div v-else>
      <Transaction />
    </div>
  </div>
  <div class="mx-2 pt-12">
    <GameProviders />
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
.bonus-transaction-container {
  margin: -20px 40px;
  background: #1D2027;
  padding-bottom: 20px;
  border-radius: 8px;
}

.bonus-transaction-container-1 {
  margin: -20px 40px;
  background: #1D2027;
  // padding-bottom: 20px;
  border-radius: 8px;
}

.m-bonus-transaction-container {
  margin: -60px 0px;
  background: #1D2027;
  // padding-bottom: 20px;
  border-radius: 8px;
}

.m-bonus-transaction-tabs {
  padding-top: 50px;

  .m-bonus-transaction-tab-body {
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

  .bonus-transaction-tab-text {
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

.m-bonus-transaction-tabs-1 {
  padding-top: 66px;

  .m-bonus-transaction-tab-body {
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

  .bonus-transaction-tab-text {
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

.bonus-transaction-tabs {
  padding-top: 30px;

  .bonus-transaction-tab-body {
    display: flex;
    padding: 0px 60px;
    align-items: center;
    background: #1D2027;
    height: 64px;
    margin: 16px 16px 10px 16px;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    border-radius: 8px;
    font-weight: 400;
    font-size: 16px;
    color: #7782aa;
  }

  .bonus-transaction-tab-text {
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
