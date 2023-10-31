<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import img_agent_6 from "@/assets/affiliate/invite/image/img_agent_6.png";
import img_agent_6_1 from "@/assets/affiliate/invite/image/img_agent_6_1.png";

const { t } = useI18n();
const { width } = useDisplay();

const rewardGrades = ref<Array<any>>([
  {
    img: img_agent_6,
    value: 100,
    grade: 3,
  },
  {
    img: img_agent_6_1,
    value: 1000,
    grade: 6,
  },
  {
    img: img_agent_6_1,
    value: 10000,
    grade: 9,
  },
  {
    img: img_agent_6_1,
    value: 100000,
    grade: 12,
  },
]);

const rate = ref(99); // 100 is 99

const mobileWidth = computed(() => {
  return width.value;
});
</script>

<template>
  <v-card class="m-achievement-reward-card mx-2">
    <img src="@/assets/affiliate/invite/image/img_agent_7.png" class="mt-1" width="88" />
    <p class="text-700-16 white">{{ t("affiliate.achievement.text_1") }}</p>
    <v-row class="mx-3 mt-6">
      <template v-for="(item, index) in rewardGrades" :key="index">
        <v-col cols="3">
          <img :src="item.img" />
          <p class="text-900-11" :class="index == 0 ? 'gray' : 'color-F9BC01'">
            R$ {{ item.value }}
          </p>
          <div class="m-achievement-reward-bar"></div>
        </v-col>
      </template>
    </v-row>
    <div class="m-achievement-reward-progress-bg mx-3 mb-2">
      <v-progress-linear v-model="rate" height="24" class="m-achievement-reward-progress">
      </v-progress-linear>
      <v-row class="m-achievement-progress-grade">
        <template v-for="(item, index) in rewardGrades" :key="index">
          <v-col cols="3" class="ma-0 pa-0">
            <p class="text-900-10 white">{{ item.grade }}</p>
          </v-col>
        </template>
      </v-row>
    </div>
  </v-card>
</template>

<style lang="scss">
.m-achievement-reward-card {
  margin-top: 16px;
  border-radius: 12px;
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%);
  text-align: center;
  box-shadow: none;
}
.m-achievement-reward-bar {
  margin: auto;
  width: 4px;
  height: 8px;
  background: #6d44f8;
}
.m-achievement-reward-progress-bg {
  position: relative;
  .v-progress-linear {
    border-radius: 10px;
    background: #1c1929;
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
