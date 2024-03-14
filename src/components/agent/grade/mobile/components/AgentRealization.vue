<script setup lang="ts">
import { ref, watch, computed, onMounted, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import img_agentemblem_1 from "@/assets/affiliate/achievement/img_agentemblem_1.png";
import img_agentemblem_2 from "@/assets/affiliate/achievement/img_agentemblem_2.png";
import img_agentemblem_3 from "@/assets/affiliate/achievement/img_agentemblem_3.png";
import img_agentemblem_4 from "@/assets/affiliate/achievement/img_agentemblem_4.png";
import img_agentemblem_5 from "@/assets/affiliate/achievement/img_agentemblem_5.png";
import img_agentemblem_6 from "@/assets/affiliate/achievement/img_agentemblem_6.png";
import img_agentemblem_7 from "@/assets/affiliate/achievement/img_agentemblem_7.png";
import img_agentemblem_8 from "@/assets/affiliate/achievement/img_agentemblem_8.png";
import img_agentemblem_9 from "@/assets/affiliate/achievement/img_agentemblem_9.png";
import img_agentemblem_10 from "@/assets/affiliate/achievement/img_agentemblem_10.png";
import img_agentemblem_11 from "@/assets/affiliate/achievement/img_agentemblem_11.png";
import img_agentemblem_12 from "@/assets/affiliate/achievement/img_agentemblem_12.png";
import img_agentemblem_13 from "@/assets/affiliate/achievement/img_agentemblem_13.png";
import img_agentemblem_14 from "@/assets/affiliate/achievement/img_agentemblem_14.png";
import img_agentemblem_15 from "@/assets/affiliate/achievement/img_agentemblem_15.png";
import { type AchievementItem, type GetAchievementItem } from "@/interface/achievement";
import { achievementStore } from "@/store/achievement";

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchAchievementAward } = achievementStore();
const { dispatchAchievementList } = achievementStore();

const props = defineProps<{ achievementItem: GetAchievementItem }>();

const { achievementItem } = toRefs(props);

const rate = ref(97.8); // 100 is 97.8

const receivedAchievementListShow = ref<boolean>(false);

const realizationItem = ref<Array<any>>([
  {
    img: img_agentemblem_1,
    min: 0,
    max: 200,
  },
  {
    img: img_agentemblem_5,
    min: 200,
    max: 500,
  },
  {
    img: img_agentemblem_6,
    min: 500,
    max: 1000,
  },
  {
    img: img_agentemblem_7,
    min: 1000,
    max: 3000,
  },
  {
    img: img_agentemblem_8,
    min: 3000,
    max: 5000,
  },
  {
    img: img_agentemblem_9,
    min: 5000,
    max: 10000,
  },
  {
    img: img_agentemblem_10,
    min: 10000,
    max: 50000,
  },
  {
    img: img_agentemblem_11,
    min: 50000,
    max: 100000,
  },
  {
    img: img_agentemblem_11,
    min: 100000,
    max: 200000,
  },
]);

const mobileWidth = computed(() => {
  return width.value;
});

const achievementAward = async (achievement_item: AchievementItem, achievement_progress: number) => {
  console.log(achievement_item);
  if (achievement_item.num <= achievement_progress && achievement_item.state == 1) {
    await dispatchAchievementAward({ index: achievement_item.index });
    await dispatchAchievementList();
  }
}

const showReceivedAchievementList = () => {
  receivedAchievementListShow.value = true;
}

const hideReceivedAchievementList = () => {
  receivedAchievementListShow.value = false;
}
</script>

<template>
  <div
    class="relative"
    style="height: 38px"
    v-if="achievementItem.achievement_explain.filter((item: any) => item.state == 2).length > 0 && !receivedAchievementListShow"
  >
    <v-card
      class="m-achievement-realization-card"
      style="
        box-shadow: 0px 4px 6px 1px #0000004d;
        position: absolute;
        top: -111px;
        width: 100%;
        z-index: -1;
        scale: 0.92;
      "
    ></v-card>
    <v-card
      class="m-achievement-realization-card"
      style="
        box-shadow: 0px 4px 6px 1px #0000004d;
        position: absolute;
        top: -103px;
        width: 100%;
        z-index: -2;
        scale: 0.88;
        opacity: 0.8;
      "
    ></v-card>
    <v-card
      class="m-achievement-realization-card"
      style="
        box-shadow: 0px 4px 6px 1px #0000004d;
        position: absolute;
        top: -94px;
        width: 100%;
        z-index: -3;
        scale: 0.84;
        opacity: 0.5;
      "
    ></v-card>
    <v-card
      class="m-achievement-realization-card"
      style="
        box-shadow: 0px 4px 6px 1px #0000004d;
        position: absolute;
        top: -87px;
        width: 100%;
        z-index: -4;
        scale: 0.8;
        opacity: 0.3;
      "
    ></v-card>
    <div class="text-center pt-5">
      <v-icon
        class="m-achievement-realization-arrow"
        color="white"
        @click="showReceivedAchievementList"
      >
        mdi-chevron-down
      </v-icon>
    </div>
  </div>
  <template v-if="receivedAchievementListShow">
    <v-card
      v-if="receivedAchievementListShow"
      class="m-achievement-realization-card mx-4 mt-2"
      v-for="(item, index) in achievementItem.achievement_explain.filter(
      (item: any) => item.state == 2
    )"
      :key="index"
    >
      <v-row class="mx-0">
        <v-col cols="5" class="text-center">
          <template v-for="(imageItem, imageIndex) in realizationItem" :key="imageIndex">
            <img
              :src="imageItem.img"
              width="50"
              class="img-gray opacity-1"
              v-if="imageItem.min < item.num && imageItem.max >= item.num"
            />
          </template>
          <p class="text-900-18 gray opacity-45">R$ {{ item.award }}</p>
        </v-col>
        <v-col cols="7" class="text-center">
          <p class="text-700-12 mt-4 gray opacity-45">
            {{ t("affiliate.achievement.text_2") }} {{ item.num }}
          </p>
          <div class="mt-2 m-achievement-realization-progress-bg">
            <v-progress-linear
              v-model="item.rate"
              height="24"
              class="m-achievement-realization-progress"
            >
              <div class="text-800-10 gray opacity-45">
                {{
                  Number(achievementItem.achievement_progress) > Number(item.num)
                    ? item.num
                    : achievementItem.achievement_progress
                }}
                /
                {{ item.num }}
              </div>
            </v-progress-linear>
          </div>
          <v-btn
            class="mt-3 m-achievement-realization-btn"
            width="132"
            height="32"
            :disabled="true"
          >
            {{ t("affiliate.achievement.text_3") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-center">
      <v-icon
        class="m-achievement-realization-arrow"
        color="white"
        @click="hideReceivedAchievementList"
      >
        mdi-chevron-up
      </v-icon>
    </div>
  </template>
  <v-card
    class="m-achievement-realization-card mx-4 mt-2"
    v-for="(item, index) in achievementItem.achievement_explain.filter(
      (item) => item.state != 2
    )"
    :key="index"
  >
    <v-row class="mx-0">
      <v-col cols="5" class="text-center">
        <template v-for="(imageItem, imageIndex) in realizationItem" :key="imageIndex">
          <img
            :src="imageItem.img"
            width="50"
            v-if="imageItem.min < item.num && imageItem.max >= item.num"
          />
        </template>
        <p class="text-900-18 color-F9BC01">R$ {{ item.award }}</p>
      </v-col>
      <v-col cols="7" class="text-center">
        <p class="text-700-12 mt-4 white">
          {{ t("affiliate.achievement.text_2") }} {{ item.num }}
        </p>
        <div
          class="mt-2"
          :class="
            item.num <= achievementItem.achievement_progress && item.state == 1
              ? 'm-achievement-realization-progress-active-bg'
              : 'm-achievement-realization-progress-bg'
          "
        >
          <v-progress-linear
            v-model="item.rate"
            height="24"
            class="m-achievement-realization-progress"
          >
            <div class="text-800-10">
              <span class="color-F9BC01">
                {{
                  Number(achievementItem.achievement_progress) > Number(item.num)
                    ? item.num
                    : achievementItem.achievement_progress
                }}
                /
              </span>
              <span class="white">
                {{ item.num }}
              </span>
            </div>
          </v-progress-linear>
        </div>
        <v-btn
          class="mt-3"
          width="132"
          height="32"
          :class="
            item.num <= achievementItem.achievement_progress && item.state == 1
              ? 'm-achievement-realization-active-btn'
              : 'm-achievement-realization-btn'
          "
          :disabled="item.num > achievementItem.achievement_progress && item.state != 1"
          @click="achievementAward(item, achievementItem.achievement_progress)"
        >
          {{ t("affiliate.achievement.text_3") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss">
.m-achievement-realization-arrow {
  font-size: 27px;
}

.m-achievement-realization-card {
  border-radius: 8px;
  background: $agent_card_notmet_bg;
  height: 121px;
  box-shadow: none;
}

.m-achievement-realization-progress-bg {
  .v-progress-linear__background {
    background: black !important;
    opacity: 0.8 !important;
  }
  .v-progress-linear {
    width: 180px !important;
    border-radius: 30px !important;
    background: $agent_card_bg;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .v-progress-linear__determinate {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 30px;
    height: 20px;
    background: $agent_card_notmet_bg;
  }
}

.m-achievement-realization-progress-active-bg {
  .v-progress-linear {
    width: 180px !important;
    border-radius: 30px !important;
    background: $agent_card_bg;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .v-progress-linear__determinate {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 30px;
    height: 20px;
    background: $agent_color_4;
  }
}

.m-achievement-realization-active-btn {
  border-radius: 8px;
  background: $agent_card_bonuses_text_color;
  box-shadow: 0px 4px 6px 1px #0000004d;

  .v-btn__content {
    color: #fff;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
      Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei,
      Microsoft Yahei, sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
}

.m-achievement-realization-btn {
  border-radius: 4px;
  background: $agent_color_3 !important;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3) !important;

  .v-btn__content {
    color: #7782aa;
    font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
      Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei,
      Microsoft Yahei, sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    opacity: 0.45;
  }
}
</style>
