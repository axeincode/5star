<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";
import { type StatisticsItem } from "@/interface/invite";

const { t } = useI18n();
const { width } = useDisplay();

const { dispatchStatisticsList } = inviteStore();
const { dispatchInviteAward } = inviteStore();

const summaryTabText = ref<string>("today");

const selectedItem = ref<StatisticsItem>({
  register_user: [],
  deposit_user: [],
  deposit_bonus: 0,
  deposit_amount: [],
  bet_amount: [],
  bet_bonus: [],
  achievement_award: 0,
})

const mobileWidth = computed(() => {
  return width.value;
});

const handleSummaryTab = (tabText: string) => {
  summaryTabText.value = tabText;
  switch (tabText) {
    case "today":
      selectedItem.value = statisticsItem.value.today_profit
      break;
    case "week":
      selectedItem.value = statisticsItem.value.week_profit
      break;
    case "month":
      selectedItem.value = statisticsItem.value.month_profit
      break;
  }
};

const statisticsItem = computed(() => {
  const { getStatisticsItem } = storeToRefs(inviteStore());
  selectedItem.value = getStatisticsItem.value.today_profit
  return getStatisticsItem.value;
});

const inviteAward = async () => {
  await dispatchInviteAward({});
}

onMounted(async () => {
  await dispatchStatisticsList();
});
</script>
<template>
  <v-card class="m-statistics-summary-card">
    <div class="ma-4 text-800-14 white">{{ t("affiliate.statistics.summary_text") }}</div>
    <v-row class="mx-1 my-0 px-6 m-statistics-summary-level">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.level_text") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.grade_text_1") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.grade_text_2") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.grade_text_3") }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-statistics-user-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_4") }}
        <br />
        {{ t("affiliate.statistics.text_5") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        {{ selectedItem.register_user[0] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        {{ selectedItem.register_user[1] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        {{ selectedItem.register_user[2] }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-statistics-user-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_5") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        {{ selectedItem.deposit_user[0] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        {{ selectedItem.deposit_user[1] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        {{ selectedItem.deposit_user[2] }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-statistics-commission-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 yellow">
        R$ {{ Number(selectedItem.deposit_bonus).toFixed(2) }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-statistics-user-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ Number(selectedItem.deposit_amount[0]).toFixed(2) }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ Number(selectedItem.deposit_amount[1]).toFixed(2) }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ Number(selectedItem.deposit_amount[2]).toFixed(2) }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-statistics-user-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_9") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ Number(selectedItem.bet_amount[0]).toFixed(2) }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ Number(selectedItem.bet_amount[1]).toFixed(2) }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ Number(selectedItem.bet_amount[2]).toFixed(2) }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-statistics-commission-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 yellow">
        R$ {{ Number(selectedItem.bet_bonus[0]).toFixed(2) }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 yellow">
        R$ {{ Number(selectedItem.bet_bonus[1]).toFixed(2) }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 yellow">
        R$ {{ Number(selectedItem.bet_bonus[2]).toFixed(2) }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-statistics-commission-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_10") }}
        <br />
        {{ t("affiliate.statistics.text_11") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ Number(selectedItem.achievement_award).toFixed(2) }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
    </v-row>
  </v-card>
  <v-row class="mx-6 m-statistics-summary-tab my-0">
    <v-col
      cols="4"
      class="text-center text-500-13"
      style="height: 100%"
      :class="
        summaryTabText == 'today'
          ? 'm-statistics-summary-tab-active black'
          : 'white text-500-13'
      "
      @click="handleSummaryTab('today')"
    >
      {{ t("affiliate.statistics.tab.text_1") }}
    </v-col>
    <v-col
      cols="4"
      class="text-center text-500-13"
      style="height: 100%"
      :class="
        summaryTabText == 'week' ? 'm-statistics-summary-tab-active black' : 'white'
      "
      @click="handleSummaryTab('week')"
    >
      {{ t("affiliate.statistics.tab.text_2") }}
    </v-col>
    <v-col
      cols="4"
      class="text-center text-500-13"
      style="height: 100%"
      :class="
        summaryTabText == 'month' ? 'm-statistics-summary-tab-active black' : 'white'
      "
      @click="handleSummaryTab('month')"
    >
      {{ t("affiliate.statistics.tab.text_3") }}
    </v-col>
  </v-row>
  <v-row class="mx-4 my-7 pa-0 m-statistics-receive-card">
    <v-col cols="5" class="pa-0 text-center">
      <img src="@/assets/affiliate/statistics/img_agent_8.png" width="82" />
      <p class="text-800-12 white">{{ t("affiliate.statistics.tab.text_1") }}</p>
    </v-col>
    <v-col cols="7" class="pa-0 text-center">
      <p class="text-800-24 yellow">
        R$ {{ Number(statisticsItem.receive_profit).toFixed(2) }}
      </p>
      <v-btn
        class="text-none mt-1 m-statistics-receive-btn"
        width="114"
        height="32"
        :disabled="Number(statisticsItem.receive_profit) == 0"
        @click="inviteAward"
      >
        {{ t("affiliate.achievement.text_3") }}
      </v-btn>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.m-statistics-summary-card {
  margin: 16px 16px 0px 16px;
  border-radius: 8px;
  background: #1D2027;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  overflow-x: auto;
}
.m-statistics-summary-level {
  align-items: center;
  width: 600px;
  height: 32px;
  border-radius: 8px;
  background: #1D2027;
}
.m-statistics-user-card {
  align-items: center;
  width: 600px;
  height: 48px;
  border-radius: 8px;
  background: #1D2027;
}
.m-statistics-commission-card {
  align-items: center;
  width: 600px;
  height: 48px;
  border-radius: 8px;
  background: #191725;
}
.m-statistics-summary-tab {
  height: 64px;
  border-radius: 0px 0px 8px 8px;
  background: #1D2027;
  align-items: center;
  justify-content: center;
}
.m-statistics-summary-tab-active {
  border-radius: 0px 0px 8px 8px;
  background: var(--Primary-Button-32CFEC, #009B3A);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}
.m-statistics-receive-card {
  height: 101px;
  border-radius: 8px;
  background: linear-gradient(180deg, #2e68af 0%, #21a68b 100%);
  align-items: center;
  justify-content: center;
}
.m-statistics-receive-btn {
  border-radius: 9px;
  background: var(--Secondary-Button-353652, #23262F);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  .v-btn__content {
    color: #fff;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
