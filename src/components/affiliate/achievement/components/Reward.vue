<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import img_agent_6 from "@/assets/affiliate/invite/image/img_agent_6.png";

const { t } = useI18n();
const { width } = useDisplay();

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

const rate = ref(60); // 100 is 99

const mobileWidth = computed(() => {
  return width.value;
});
</script>

<template>
  <v-card class="achievement-reward-card mx-4">
    <v-row class="my-2">
      <v-col cols="3">
        <img
          src="@/assets/affiliate/invite/image/img_agent_7.png"
          class="mt-1"
          width="129"
        />
        <p class="text-700-18 white">{{ t("affiliate.achievement.text_1") }}</p>
      </v-col>
      <v-col cols="9" class="relative">
        <v-row class="mx-3 mt-0">
          <template v-for="(item, index) in rewardGrades" :key="index">
            <v-col cols="3">
              <img :src="item.img" :class="index == 0 ? 'img-gray' : ''" width="69" />
              <p class="text-900-24" :class="index == 0 ? 'gray' : 'color-F9BC01'">
                R$ {{ item.value }}
              </p>
              <div class="achievement-reward-bar"></div>
            </v-col>
          </template>
        </v-row>
        <div class="achievement-reward-progress-bg mx-3 mb-2">
          <v-progress-linear
            v-model="rate"
            height="24"
            class="achievement-reward-progress"
          >
          </v-progress-linear>
          <v-row class="achievement-progress-grade">
            <template v-for="(item, index) in rewardGrades" :key="index">
              <v-col cols="3" class="ma-0 pa-0">
                <p class="text-900-16 white">{{ item.grade }}</p>
              </v-col>
            </template>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss">
.achievement-reward-card {
  margin-top: 16px;
  border-radius: 8px;
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%);
  text-align: center;
  box-shadow: none;
}
.achievement-reward-bar {
  margin: auto;
  width: 6px;
  height: 10px;
  background: #6d44f8;
}
.achievement-reward-progress-bg {
  position: relative;
  .v-progress-linear {
    border-radius: 10px;
    background: #15161C;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }
  .v-progress-linear__determinate {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 8px;
    height: 20px;
    background: linear-gradient(180deg, #6d44f8 0%, #5726fc 100%);
  }
  .achievement-progress-grade {
    height: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    top: 12px;
  }
}
</style>
