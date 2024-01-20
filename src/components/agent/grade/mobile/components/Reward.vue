<script setup lang="ts">
import { ref, watch, computed, onMounted, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import img_agent_6 from "@/assets/affiliate/invite/image/img_agent_6.png";
import { type GetAchievementItem } from "@/interface/achievement";
import { type ExplainItem } from "@/interface/achievement";
import { achievementStore } from "@/store/achievement";

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchStageAward } = achievementStore();

const props = defineProps<{ achievementItem: GetAchievementItem }>()

const { achievementItem } = toRefs(props);

const rewardGrades = ref<Array<any>>([
  {
    img: img_agent_6,
    value: 100,
    grade: 3,
  },
  {
    img: img_agent_6,
    value: 1000,
    grade: 6,
  },
  {
    img: img_agent_6,
    value: 10000,
    grade: 9,
  },
  {
    img: img_agent_6,
    value: 100000,
    grade: 12,
  },
]);

const rate = ref(99); // 100 is 99

const mobileWidth = computed(() => {
  return width.value;
});

const achievementAward = async (award_item: ExplainItem, award_progress: number) => {
  if (award_item.num <= award_progress && award_item.status == 1) {
    await dispatchStageAward({ index: award_item.index });
  }
}
</script>

<template>
  <v-card class="m-achievement-reward-card mx-2">
    <img src="@/assets/affiliate/invite/image/img_agent_7.png" class="mt-1" width="88" />
    <p class="text-700-14 white">{{ t("affiliate.achievement.text_1") }}</p>
    <v-row class="mx-3 mt-6">
      <template v-for="(item, index) in achievementItem.award_explain" :key="index">
        <v-col cols="3" class="px-0">
          <img :src="rewardGrades[index].img" :class="item.num <= achievementItem.award_progress && item.status == 1
            ? ''
            : 'img-gray'
            " width="64" @click="achievementAward(item, achievementItem.award_progress)" />
          <p class="text-900-11" :class="item.num <= achievementItem.award_progress && item.status == 1
            ? 'color-F9BC01'
            : 'gray'
            ">
            R$ {{ item.award }}
          </p>
          <div class="m-achievement-reward-bar"></div>
        </v-col>
      </template>
    </v-row>
    <div class="m-achievement-reward-progress-bg mx-3 mb-2">
      <v-progress-linear v-model="achievementItem.rate" height="24" class="m-achievement-reward-progress">
      </v-progress-linear>
      <v-row class="m-achievement-progress-grade">
        <template v-for="(item, index) in achievementItem.award_explain" :key="index">
          <v-col cols="3" class="ma-0 pa-0">
            <p class="text-900-10 white">{{ item.num }}</p>
          </v-col>
        </template>
      </v-row>
    </div>
  </v-card>
</template>

<style lang="scss">
.m-achievement-reward-card {
  margin-top: 16px;
  border-radius: 8px;
  text-align: center;
  box-shadow: none;
  border: 1px solid $agent_color_3;
  background: conic-gradient(from 45deg at 50.17% 49.69%, $agent_card_notmet_bg 0deg, $agent_color_3 360deg);
}

.m-achievement-reward-bar {
  margin: auto;
  width: 4px;
  height: 8px;
  background: $agent_card_bar_bg;
}

.m-achievement-reward-progress-bg {
  position: relative;

  .v-progress-linear {
    border-radius: 10px;
    background: $agent_card_bg;
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.35) inset;
  }

  .v-progress-linear__determinate {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 8px;
    height: 20px;
    background: $agent_card_bar_bg;
  }

  .m-achievement-progress-grade {
    height: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    top: 16px;
  }
}
</style>
