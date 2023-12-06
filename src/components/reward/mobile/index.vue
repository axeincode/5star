<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { ref, computed, watch, onMounted, onUnmounted, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Search } from "@/interface/game";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();

const props = defineProps<{ rewardNavShow: boolean }>();

const { rewardNavShow } = toRefs(props);

const rewardContainerHeight = ref<number>(590);

const mobileWidth = computed(() => {
  return width.value;
});

onMounted(() => {
  rewardContainerHeight.value = window.innerHeight - 202;
});
</script>

<template>
  <div class="m-reward-body" :style="{ height: rewardContainerHeight + 'px' }">
    <p class="text-700-18 white text-center m-reward-header-text">
      {{ t("reward.text_1") }}
    </p>
    <div class="m-reward-body-1">
      <div class="m-reward-content-1 d-flex align-center justify-center">
        <p class="text-700-14 white">{{ t("reward.text_2") }}</p>
      </div>
    </div>
    <div class="m-reward-body-2">
      <p class="text-700-12 white pt-10 mx-4">{{ t("reward.text_3") }}</p>
      <v-row class="mx-2 mt-1">
        <v-col
          cols="9"
          class="m-reward-claim-bg text-400-12 gray py-1 px-2 d-flex align-center"
        >
          {{ t("reward.text_4") }}
        </v-col>
        <v-col cols="3" class="pa-1 text-right">
          <v-btn class="text-none m-reward-claim-btn" width="72" height="32">
            {{ t("reward.text_5") }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss">
.m-reward-body {
  background: #29253c;
}
.m-reward-header-text {
  position: absolute;
  top: -58px;
  left: 50%;
  transform: translateX(-50%);
}
.m-reward-body-1 {
  position: absolute;
  top: -30px;
  width: 100%;
  height: 60px;
  border-radius: 60px;
  background: #29253c;
  /* Drop Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.3);
}
.m-reward-body-2 {
  background: #221f32;
  height: 125px;
}
.m-reward-content-1 {
  height: 38px;
  margin: 11px;
  border-radius: 60px;
  background: linear-gradient(180deg, #6d44f8 0%, #5726fc 100%);
}
.m-reward-claim-bg {
  border-radius: 8px;
  background: #181522;

  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}
.m-reward-claim-btn {
  border-radius: 12px;
  background: #6d44f8;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  .v-btn__content {
    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
