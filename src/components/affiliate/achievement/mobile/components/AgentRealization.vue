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
import {type GetAchievementItem} from "@/interface/achievement";

const { t } = useI18n();
const { width } = useDisplay();

const props = defineProps<{ achievementItem: GetAchievementItem }>();

const { achievementItem } = toRefs(props);

const rate = ref(97.8); // 100 is 97.8

const realizationItem = ref<Array<any>>([
  {
    img: img_agentemblem_1,
    grade: 10,
    realization_grade: 5,
    rate: 97.8,
  },
  {
    img: img_agentemblem_1,
    grade: 40,
    realization_grade: 20,
    rate: 97.8,
  },
  {
    img: img_agentemblem_1,
    grade: 100,
    realization_grade: 50,
    rate: 97.8,
  },
  {
    img: img_agentemblem_1,
    grade: 200,
    realization_grade: 100,
    rate: 97.8,
  },
  {
    img: img_agentemblem_5,
    grade: 1000,
    realization_grade: 500,
    rate: 97.8,
  },
  {
    img: img_agentemblem_6,
    grade: 2000,
    realization_grade: 1000,
    rate: 21.5,
  },
  {
    img: img_agentemblem_7,
    grade: 6000,
    realization_grade: 3000,
    rate: 0,
  },
  {
    img: img_agentemblem_8,
    grade: 12000,
    realization_grade: 5000,
    rate: 0,
  },
  {
    img: img_agentemblem_9,
    grade: 25000,
    realization_grade: 10000,
    rate: 0,
  },
  {
    img: img_agentemblem_10,
    grade: 2000000,
    realization_grade: 50000,
    rate: 0,
  },
  {
    img: img_agentemblem_11,
    grade: 4000000,
    realization_grade: 100000,
    rate: 0,
  },
  {
    img: img_agentemblem_11,
    grade: 8000000,
    realization_grade: 200000,
    rate: 0,
  },
]);

const mobileWidth = computed(() => {
  return width.value;
});
</script>

<template>
  <v-card
    class="m-achievement-realization-card mx-4 mt-2"
    v-for="(item, index) in achievementItem.achievement_explain"
    :key="index"
  >
    <v-row class="mx-0">
      <v-col cols="5" class="text-center">
        <img
          :src="realizationItem[index].img"
          width="50"
          :class="
            item.achievement_progress < item.num && item.status != 1
              ? ''
              : 'img-gray opacity-3'
          "
        />
        <p
          class="text-900-18"
          :class="
            item.achievement_progress < item.num && item.status != 1
              ? 'color-F9BC01'
              : 'color-414968'
          "
        >
          R$ {{ item.award }}
        </p>
      </v-col>
      <v-col cols="7" class="text-center">
        <p
          class="text-700-12 mt-4"
          :class="
            item.achievement_progress < item.num && item.status != 1
              ? 'white'
              : 'color-414968'
          "
        >
          {{ t("affiliate.achievement.text_2") }} {{ item.num }}
        </p>
        <div
          class="mt-2"
          :class="
            item.achievement_progress < item.num && item.status != 1
              ? 'm-achievement-realization-progress-active-bg'
              : 'm-achievement-realization-progress-bg'
          "
        >
          <v-progress-linear
            v-model="item.rate"
            height="24"
            class="m-achievement-realization-progress"
          >
            <div
              class="text-800-10"
              :class="
                item.achievement_progress < item.num && item.status != 1
                  ? 'white'
                  : 'color-414968'
              "
            >
              {{ achievementItem.achievement_progress }}
              /
              {{ item.num }}
            </div>
          </v-progress-linear>
        </div>
        <v-btn
          class="text-none mt-3"
          width="132"
          height="32"
          :class="
            item.achievement_progress < item.num && item.status != 1
              ? 'm-achievement-realization-active-btn'
              : 'm-achievement-realization-btn'
          "
        >
          {{ t("affiliate.achievement.text_3") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss">
.m-achievement-realization-card {
  border-radius: 8px;
  background: #29253c;
  height: 121px;
  box-shadow: none;
}
.m-achievement-realization-progress-bg {
  .v-progress-linear {
    width: 180px;
    border-radius: 30px;
    background: #211f31;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }
  .v-progress-linear__determinate {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 30px;
    height: 20px;
    background: linear-gradient(0deg, #1c1929 0%, #393a71 100%);
  }
}
.m-achievement-realization-progress-active-bg {
  .v-progress-linear {
    width: 180px;
    border-radius: 30px;
    background: #211f31;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }
  .v-progress-linear__determinate {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 30px;
    height: 20px;
    background: linear-gradient(180deg, #6d44f8 0%, #5726fc 100%);
  }
}
.m-achievement-realization-active-btn {
  border-radius: 8px;
  background: #32cfec;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  .v-btn__content {
    color: #000;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
.m-achievement-realization-btn {
  border-radius: 8px;
  background: var(--Secondary-Button-353652, #353652);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  .v-btn__content {
    color: #414968;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
