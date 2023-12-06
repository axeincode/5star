<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { mailStore } from "@/store/mail";
import { menuStore } from "@/store/menu";
import { appBarStore } from "@/store/appBar";
import img_vip_4 from "@/assets/vip/image/img_vip_4.png";
import temp_1077 from "@/assets/vip/image/temp_1077.png";
import temp_1078 from "@/assets/vip/image/temp_1078.png";
import temp_1079 from "@/assets/vip/image/temp_1079.png";
import img_public_1 from "@/assets/public/image/img_public_1.png";
import img_public_2 from "@/assets/public/image/img_public_2.png";
import img_vip_1 from "@/assets/vip/image/img_vip_1.png";
import img_vip_3 from "@/assets/vip/image/img_vip_3.png";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const { setRewardNavShow } = menuStore();
const { setMailMenuShow } = mailStore();
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();

const rewardContainerHeight = ref<number>(590);
const rewardNavShow = ref<boolean>(false);

const items_1 = ref<Array<any>>([
  {
    image: img_vip_4,
    content: t("reward.text_8"),
    value: 2,
  },
  {
    image: temp_1077,
    content: t("reward.text_9"),
    value: 2,
  },
  {
    image: temp_1078,
    content: t("reward.text_10"),
    value: 2,
  },
  {
    image: temp_1079,
    content: t("reward.text_11"),
    value: 2,
  },
  {
    image: img_public_1,
    content: t("reward.text_12"),
    value: "",
  },
  {
    image: img_public_2,
    content: t("reward.text_13"),
    value: "",
  },
]);

const items_2 = ref<Array<any>>([
  {
    image: img_vip_1,
    content: t("reward.text_15"),
  },
  {
    image: img_vip_3,
    content: t("reward.text_17"),
  },
]);

const mobileWidth = computed(() => {
  return width.value;
});

const rewardNavigationShow = computed(() => {
  const { getRewardNavShow } = storeToRefs(menuStore());
  return getRewardNavShow.value;
});

watch(rewardNavigationShow, (value) => {
  rewardNavShow.value = value;
});

watch(rewardNavShow, (value) => {
  if (!value) {
    setRewardNavShow(false);
    setOverlayScrimShow(false);
    setMainBlurEffectShow(false);
    setMailMenuShow(false);
  }
});

onMounted(() => {
  rewardContainerHeight.value = window.innerHeight - 202;
});
</script>

<template>
  <v-navigation-drawer
    v-model="rewardNavShow"
    location="bottom"
    temporary
    :touchless="true"
    :style="{
      height: 'unset',
      bottom: '0px',
      zIndex: 13,
      background: 'unset !important',
    }"
  >
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
      <div
        style="overflow-y: auto; padding-bottom: 80px"
        :style="{ height: rewardContainerHeight - 125 + 'px' }"
      >
        <v-row class="mx-2 mt-4 m-reward-body-3">
          <v-col cols="3" class="d-flex align-center justify-center">
            <img
              src="@/assets/affiliate/statistics/img_agent_8.png"
              width="54"
              class="m-reward-achievement-img"
            />
          </v-col>
          <v-col cols="6">
            <p class="text-400-12 color-353652">
              {{ t("reward.text_6") }}
            </p>
            <p class="text-800-14 color-353652">R$ 0.00</p>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <v-btn class="bg-353652 m-reward-bonus-btn" width="72" height="32">
              {{ t("reward.text_7") }}
            </v-btn>
          </v-col>
        </v-row>
        <div class="mx-2 mt-4 m-reward-body-4 pa-2">
          <template v-for="(item, index) in items_1" :key="index">
            <v-row class="ma-0 m-reward-content-2" :class="index != 0 ? 'mt-2' : ''">
              <v-col cols="3" class="d-flex align-center justify-center py-1">
                <img :src="item.image" :width="index == 0 ? 42 : 48" />
              </v-col>
              <v-col cols="6" class="py-1 d-flex align-center">
                <div>
                  <p class="text-400-12 white">
                    {{ item.content }}
                  </p>
                  <p class="text-800-14 active" v-if="item.value != ''">
                    R$ {{ Number(item.value).toFixed(2) }}
                  </p>
                </div>
              </v-col>
              <v-col cols="3" class="d-flex align-center py-1">
                <v-btn
                  class="button-yellow m-reward-bonus-active-btn"
                  width="72"
                  height="32"
                >
                  {{ t("reward.text_7") }}
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </div>
        <div class="mt-6 mx-4 text-700-12 white">{{ t("reward.text_14") }}</div>
        <div class="mx-2 mt-4 m-reward-body-4 pa-2">
          <template v-for="(item, index) in items_2" :key="index">
            <v-row class="ma-0 m-reward-content-2" :class="index != 0 ? 'mt-2' : ''">
              <v-col cols="3" class="d-flex align-center justify-center py-1">
                <img :src="item.image" width="48" />
              </v-col>
              <v-col cols="6" class="py-1 d-flex align-center">
                <div>
                  <p class="text-700-12 color-F9BC01">
                    {{ item.content }}
                  </p>
                  <p class="text-700-12 white" v-if="index == 0">
                    1 <font class="text-400-10 gray">{{ t("reward.text_16") }}</font>
                  </p>
                </div>
              </v-col>
              <v-col cols="3" class="d-flex align-center py-1">
                <v-btn
                  class="button-yellow m-reward-bonus-active-btn"
                  width="72"
                  height="32"
                >
                  {{ t("reward.text_7") }}
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
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
.m-reward-body-3 {
  border-radius: 8px;
  background: #221f32;

  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}
.m-reward-bonus-btn {
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
.m-reward-body-4 {
  border-radius: 8px;
  background: #221f32;

  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}
.m-reward-content-2 {
  border-radius: 8px;
  background: #29253c;
  height: 66px;
}
.m-reward-achievement-img {
  opacity: 0.3;
  filter: grayscale(100%);
}
.m-reward-bonus-active-btn {
  .v-btn__content {
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
