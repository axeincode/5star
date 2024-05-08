<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";
import { type StatisticsItem } from "@/interface/invite";
import { toFormatNum } from '@/utils/numFormat';
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});
const emit = defineEmits<{ (e: 'inited', val:boolean): void }>();

const { t } = useI18n();
const { width } = useDisplay();

const { dispatchStatisticsList } = inviteStore();
const { dispatchInviteAward } = inviteStore();

const summaryTabText = ref<string>("today");

const profitSummaryCard = ref<HTMLElement | undefined>(undefined);

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

const handleSummaryTab = async(tabText: string) => {
    summaryTabText.value = tabText;
    await dispatchStatisticsList();
    switch (tabText) {
        case "today":
            selectedItem.value = statisticsItem.value.today_profit
            if (profitSummaryCard.value != undefined) {
              profitSummaryCard.value.scrollLeft = 0;
            }
            break;
        case "week":
            selectedItem.value = statisticsItem.value.week_profit
            if (profitSummaryCard.value != undefined) {
              profitSummaryCard.value.scrollLeft = 0;
            }
            break;
        case "month":
            selectedItem.value = statisticsItem.value.month_profit
            if (profitSummaryCard.value != undefined) {
              profitSummaryCard.value.scrollLeft = 0;
            }
            break;
    }
};

const statisticsItem = computed(() => {
    const { getStatisticsItem } = storeToRefs(inviteStore());
    return getStatisticsItem.value;
});

const containerShowMoreArrow = ref(true)
const containerScroll = () => {
  if (
    profitSummaryCard.value.scrollLeft + profitSummaryCard.value.clientWidth >=
    profitSummaryCard.value.scrollWidth
  ) {
    containerShowMoreArrow.value = false
  } else {
    containerShowMoreArrow.value = true;
  }
}

onMounted(async () => {
    await dispatchStatisticsList();
    selectedItem.value = statisticsItem.value.today_profit
    console.log(selectedItem.value);
    emit('inited', false)
});
</script>
<template>
  <div class="m-agent-profit-summary-card-box">
    <div class="m-agent-profit-summary-card_c">
      <div class="text-800-14 white m-agent-profit-summary-card_c_title">{{ t("affiliate.statistics.summary_text") }}</div>
        <div class="m-agent-profit-summary-card" ref="profitSummaryCard" @scroll="containerScroll">
          <el-scrollbar max-width="400px" class="m-agent-profit-summary-card-scrollbar" always min-size="18">
            <v-row class="my-0 px-6 m-agent-profit-summary-level">
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

            <!-- 行Registered Users -->
            <v-row class="my-1 px-6 m-agent-profit-user-card">
              <v-col cols="3" class="pa-0 text-400-12 gray">
                <!-- {{ t("affiliate.statistics.text_4") }}
                <br /> 3
                {{ t("affiliate.statistics.text_5") }} -->
                {{ t("affiliate.statistics.text_12") }}
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

            <!-- 行 Deposit Users -->
            <v-row class="my-1 px-6 m-agent-profit-user-card">
              <v-col cols="3" class="pa-0 text-400-12 gray">
                <!-- {{ t("affiliate.statistics.text_6") }}
                <br /> 4
                {{ t("affiliate.statistics.text_5") }} -->
                {{ t("affiliate.statistics.text_13") }}
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

            <!-- 行 Commission Amount -->
            <v-row class="my-1 px-6 m-agent-profit-commission-card">
              <v-col cols="3" class="pa-0 text-400-12 gray">
                <!-- {{ t("affiliate.statistics.text_8") }}
                <br /> 5
                {{ t("affiliate.statistics.text_7") }} -->
                {{ t("affiliate.statistics.text_14") }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 yellow">
                {{ platformCurrency }} {{ Number(selectedItem.deposit_bonus).toFixed(2) }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
            </v-row>

            <!-- 行 Deposit Amount -->
            <v-row class="my-1 px-6 m-agent-profit-user-card">
              <v-col cols="3" class="pa-0 text-400-12 gray">
                <!-- {{ t("affiliate.statistics.text_6") }}
                <br /> 6
                {{ t("affiliate.statistics.text_7") }} -->
                {{ t("affiliate.statistics.text_15") }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.deposit_amount[0]) }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.deposit_amount[1]) }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.deposit_amount[2]) }}
              </v-col>
            </v-row>

            <!-- 行 Bet Amount -->
            <v-row class="my-1 px-6 m-agent-profit-user-card">
              <v-col cols="3" class="pa-0 text-400-12 gray">
                <!-- {{ t("affiliate.statistics.text_9") }}
                <br /> 7
                {{ t("affiliate.statistics.text_7") }} -->
                {{ t("affiliate.statistics.text_16") }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.bet_amount[0]) }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.bet_amount[1]) }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.bet_amount[2]) }}
              </v-col>
            </v-row>

            <!-- 行 Commission Amount -->
            <v-row class="my-1 px-6 m-agent-profit-commission-card">
              <v-col cols="3" class="pa-0 text-400-12 gray">
                <!-- {{ t("affiliate.statistics.text_8") }}
                <br /> 8
                {{ t("affiliate.statistics.text_7") }} -->
                {{ t("affiliate.statistics.text_17") }}

              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 yellow">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.bet_bonus[0]) }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 yellow">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.bet_bonus[1]) }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 yellow">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.bet_bonus[2]) }}
              </v-col>
            </v-row>

            <!-- 行 Achievement Reward -->
            <v-row class="my-1 px-6 m-agent-profit-user-card">
              <v-col cols="3" class="pa-0 text-400-12 gray">
                <!-- {{ t("affiliate.statistics.text_10") }}
                <br /> 9
                {{ t("affiliate.statistics.text_11") }} -->
                {{ t("affiliate.statistics.text_18") }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray">
                {{ platformCurrency }} {{ toFormatNum(selectedItem.achievement_award) }}
              </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
              <v-col cols="3" class="pa-0 text-700-12 gray"> -- </v-col>
            </v-row>
          </el-scrollbar>
        </div>
    </div>
    <div class="arrow" :class="['arrow-absolute']" v-if="containerShowMoreArrow">
      <img src="@/assets/public/svg/arrow-right.svg" alt="">
    </div>
  </div>
  <!-- 底部页签 -->
  <v-row class="mx-6 m-agent-profit-summary-tab my-0">
    <v-col
      cols="4"
      class="text-center text-500-13 m-agent-profit-summary-tab-item"
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
      class="text-center text-500-13 m-agent-profit-summary-tab-item"
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
      class="text-center text-500-13 m-agent-profit-summary-tab-item"
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
<style lang="scss" scoped>
.m-agent-profit-summary-card-box {
  height: fit-content;
  width: 100%;
  position: relative;
  padding: 0 16px;

  .arrow {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 40px;
    padding-left: 3px;
    width: 13px;
    height: 39px;
    border-radius: 4px 0px 0px 4px;
    background: #000;
    opacity: 0.5;

    img {
      width: 14px;
      height: 14px;
    }
  }
  .arrow-absolute {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.m-agent-profit-summary-card_c {
  // padding-bottom: 8px;
  background: $agent_card_notmet_bg;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
.m-agent-profit-summary-card_c_title {
  padding: 16px;
}
.m-agent-profit-summary-card {
  overflow-x: auto;
  position: relative;
  margin-left: 4px;
  margin-right: 4px;
}
.m-agent-profit-summary-card-scrollbar {
  padding-bottom: 24px;

  .el-scrollbar__bar {
    bottom: 9px;
    height: 8px;
  }
}

.m-agent-profit-summary-card::-webkit-scrollbar-thumb {
  background: #303543;
  border-radius: 20px;
}

.m-agent-profit-summary-card::-webkit-scrollbar {
  width: 3px;
  height: 8px;
  scroll-padding: 20px;
}
.m-agent-profit-summary-card::-webkit-scrollbar-track {
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
  line-height: 15px;
}
.m-agent-profit-summary-tab-item {
  display: flex;
  align-items: center;
}

.m-agent-profit-summary-tab-active {
  border-radius: 0px 0px 8px 8px;
  background: $agent_card_bar_bg;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);
}
</style>
