<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { vipStore } from "@/store/vip";
import img_vip_1 from "@/assets/vip/image/img_vip_1.png";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const { width } = useDisplay();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setLevelUpDialogVisible } = vipStore();
const { dispatchVipLevelUpList } = vipStore();
const { dispatchVipLevelUpReceive } = vipStore();

const chestList = ref<Array<any>>([img_vip_1, img_vip_1, img_vip_1, img_vip_1]);

const vipLevelUpList = computed(() => {
  const { getVipLevelUpList } = storeToRefs(vipStore());
  return getVipLevelUpList.value;
});

const success = computed(() => {
  const { getSuccess } = storeToRefs(vipStore());
  return getSuccess.value;
});

const closeLevelUpDialog = () => {
  setLevelUpDialogVisible(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setOverlayScrimShow(false);
};

const submitVipLevelUpReceive = async () => {
  await dispatchVipLevelUpReceive();
  if (success.value) {
    setLevelUpDialogVisible(false);
    setMainBlurEffectShow(false);
    setHeaderBlurEffectShow(false);
    setOverlayScrimShow(false);
  }
};

onMounted(async () => {
  await dispatchVipLevelUpList();
  setTimeout(() => {
    setMainBlurEffectShow(true);
  }, 100);
  setHeaderBlurEffectShow(true);
  setOverlayScrimShow(true);
});
</script>

<template>
  <div class="m-level-up-container">
    <v-btn
      class="m-close-button"
      icon="true"
      @click="closeLevelUpDialog"
      width="30"
      height="30"
    >
      <img src="@/assets/public/svg/icon_public_10.svg" />
    </v-btn>
    <div class="mt-3 text-center text-800-16 white">{{ t("level_up.text_1") }}</div>
    <div class="mt-2 text-800-20 yellow text-center">
      {{ t("level_up.text_2") }} {{ vipLevelUpList.upgreadegift }}
    </div>
    <div class="mt-2 text-400-14 white text-center">{{ t("level_up.text_3") }}</div>
    <div class="text-400-14 white text-center">{{ t("level_up.text_4") }}</div>
    <div class="mt-3 mx-3 m-level-up-body">
      <div class="pt-5 text-800-16 white text-center">{{ t("level_up.text_5") }}</div>
      <v-row class="ma-0 pa-0 mt-12">
        <template v-for="(i, index) in vipLevelUpList.upgrade_award" :key="index">
          <v-col class="ma-0 pa-0 text-center" :cols="12 / vipLevelUpList.upgrade_award">
            <img :src="chestList[index]" width="61" />
          </v-col>
        </template>
      </v-row>
    </div>
    <v-btn
      class="mt-4 mx-3 button-bright m-level-up-reward-btn"
      width="-webkit-fill-available"
      height="48"
      @click="submitVipLevelUpReceive"
    >
      {{ t("level_up.text_6") }}
    </v-btn>
    <div class="d-flex mt-3 align-center justify-center" style="height: 40px">
      <div>
        <v-checkbox hide-details icon class="m-show-checkbox" />
      </div>
      <div class="text_600-12 white mt-1">{{ t("level_up.text_7") }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.m-level-up-container {
  position: relative;
  height: 458px;
  border-radius: 24px;
  background: linear-gradient(0deg, #2c2744 0%, #693ff6 100%);

  // close modal button
  .m-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 5px;
    right: 4px;

    .v-icon {
      font-size: 24px;
    }
  }
  .m-level-up-body {
    height: 197px;
    border-radius: 10px;
    background: #1D2027;

    /* Text Box */
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }
  .m-level-up-reward-btn {
    .v-btn__content {
      color: var(--Text-Dark-Black-000000, #000);
      text-align: center;
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .m-show-checkbox {
    i.v-icon {
      color: #15161C;
      background-color: #01983a;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      margin-top: 4px;
    }

    i.mdi-checkbox-blank-outline {
      background-color: #15161C;
      box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
      border-radius: 4px;
    }
  }
}
</style>
