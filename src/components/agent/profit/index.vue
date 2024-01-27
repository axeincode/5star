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
    return getStatisticsItem.value;
});

onMounted(async () => {
    await dispatchStatisticsList();
    selectedItem.value = statisticsItem.value.today_profit
    console.log(selectedItem.value);
});
</script>
<template>
  <v-card class="m-agent-profit-summary-card mx-2">
    <div class="ma-4 text-800-14 white">{{ t("affiliate.statistics.summary_text") }}</div>
    <v-row class="mx-1 my-0 px-6 m-agent-profit-summary-level">
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
    <v-row class="mx-1 my-1 px-6 m-agent-profit-user-card">
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
    <v-row class="mx-1 my-1 px-6 m-agent-profit-user-card">
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
    <v-row class="mx-1 my-1 px-6 m-agent-profit-commission-card">
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
    <v-row class="mx-1 my-1 px-6 m-agent-profit-user-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ selectedItem.deposit_amount[0] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ selectedItem.deposit_amount[1] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ selectedItem.deposit_amount[2] }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-agent-profit-user-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_9") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ selectedItem.bet_amount[0] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ selectedItem.bet_amount[1] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ selectedItem.bet_amount[2] }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-agent-profit-commission-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 yellow">
        R$ {{ selectedItem.bet_bonus[0] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 yellow">
        R$ {{ selectedItem.bet_bonus[1] }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 yellow">
        R$ {{ selectedItem.bet_bonus[2] }}
      </v-col>
    </v-row>
    <v-row class="mx-1 my-1 px-6 m-agent-profit-user-card">
      <v-col cols="3" class="pa-0 text-400-12 gray">
        {{ t("affiliate.statistics.text_10") }}
        <br />
        {{ t("affiliate.statistics.text_11") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray">
        R$ {{ selectedItem.achievement_award }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
      <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
    </v-row>
  </v-card>
  <v-row class="mx-6 m-agent-profit-summary-tab my-0">
    <v-col
      cols="4"
      class="text-center text-500-13"
      style="height: 100%"
      :class="
        summaryTabText == 'today' ? 'm-agent-profit-summary-tab-active white' : 'gray'
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
        summaryTabText == 'week' ? 'm-agent-profit-summary-tab-active white' : 'gray'
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
        summaryTabText == 'month' ? 'm-agent-profit-summary-tab-active white' : 'gray'
      "
      @click="handleSummaryTab('month')"
    >
      {{ t("affiliate.statistics.tab.text_3") }}
    </v-col>
  </v-row>
</template>
<style lang="scss">
.m-agent-profit-summary-card {
  border-radius: 8px;
  background: $agent_card_notmet_bg;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);
  overflow-x: auto;
}

.m-agent-profit-summary-card::-webkit-scrollbar-thumb {
  background: $agent_card_bg;
  border-radius: 20px;
}

.m-agent-profit-summary-card::-webkit-scrollbar {
  width: 3px;
  height: 6px;
  scroll-padding: 20px;
}

.m-agent-profit-summary-level {
  align-items: center;
  width: 600px;
  height: 32px;
  border-radius: 8px;
  background: $agent_card_bg;
}

.m-agent-profit-user-card {
  align-items: center;
  width: 600px;
  height: 48px;
  border-radius: 8px;
  background: $agent_card_bg;
}

.m-agent-profit-commission-card {
  align-items: center;
  width: 600px;
  height: 48px;
  border-radius: 8px;
  background: $agent_color_3;
}

.m-agent-profit-summary-tab {
  height: 64px;
  border-radius: 0px 0px 8px 8px;
  background: $agent_card_notmet_bg;
  align-items: center;
  justify-content: center;
}

.m-agent-profit-summary-tab-active {
  border-radius: 0px 0px 8px 8px;
  background: $agent_card_bar_bg;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);
}
</style>
