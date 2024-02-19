<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const { width } = useDisplay();

const { dispatchInviteSelf } = inviteStore();

const summaryTabText = ref("today");

const mobileWidth = computed(() => {
  return width.value;
});

const personalInvitationInfo = computed(() => {
  const { getPersonalInvitationInfo } = storeToRefs(inviteStore());
  return getPersonalInvitationInfo.value;
});

const handleSummaryTab = (tabText: string) => {
  summaryTabText.value = tabText;
};

onMounted(async () => {
  await dispatchInviteSelf();
});
</script>
<template>
  <v-card class="statistics-summary-card">
    <div class="my-4 mx-8 text-700-18 white">
      {{ t("affiliate.statistics.summary_text") }}
    </div>
    <v-row class="mx-2 mb-4 mt-0 px-6 statistics-summary-level">
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.level_text") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.grade_text_1") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.grade_text_2") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.grade_text_3") }}
      </v-col>
    </v-row>
    <v-row class="mx-2 my-2 px-6 statistics-user-card">
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.text_4") }}
        {{ t("affiliate.statistics.text_5") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> 0 </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> 0 </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> 0 </v-col>
    </v-row>
    <v-row class="mx-2 my-2 px-6 statistics-user-card">
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.text_6") }} {{ t("affiliate.statistics.text_5") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> 0 </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> 0 </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> 0 </v-col>
    </v-row>
    <v-row class="mx-2 my-2 px-6 statistics-commission-card">
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.text_8") }}
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-16 yellow">R$ 0.00</v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> -- </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> -- </v-col>
    </v-row>
    <v-row class="mx-2 my-2 px-6 statistics-user-card">
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.text_6") }}
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray">R$ 0.00</v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray">R$ 0.00</v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray">R$ 0.00</v-col>
    </v-row>
    <v-row class="mx-2 my-2 px-6 statistics-user-card">
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.text_9") }}
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray">R$ 0.00</v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray">R$ 0.00</v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray">R$ 0.00</v-col>
    </v-row>
    <v-row class="mx-2 my-2 px-6 statistics-commission-card">
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.text_8") }}
        {{ t("affiliate.statistics.text_7") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-16 yellow">R$ 0.00</v-col>
      <v-col cols="3" class="pa-0 text-700-16 yellow">R$ 0.00</v-col>
      <v-col cols="3" class="pa-0 text-700-16 yellow">R$ 0.00</v-col>
    </v-row>
    <v-row class="mx-2 my-2 px-6 statistics-commission-card">
      <v-col cols="3" class="pa-0 text-400-16 gray">
        {{ t("affiliate.statistics.text_10") }}
        {{ t("affiliate.statistics.text_11") }}
      </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray">R$ 0.00</v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> -- </v-col>
      <v-col cols="3" class="pa-0 text-700-16 gray"> -- </v-col>
    </v-row>
  </v-card>
  <v-row class="mx-12 statistics-summary-tab my-0 align-center">
    <v-col
      cols="4"
      class="text-center pt-5 text-700-18"
      style="height: 100%; cursor: pointer"
      :class="
        summaryTabText == 'today'
          ? 'statistics-summary-tab-active black'
          : 'white text-500-13'
      "
      @click="handleSummaryTab('today')"
    >
      {{ t("affiliate.statistics.tab.text_1") }}
    </v-col>
    <v-col
      cols="4"
      class="text-center pt-5 text-700-18"
      style="height: 100%; cursor: pointer"
      :class="
        summaryTabText == 'week'
          ? 'statistics-summary-tab-active black'
          : 'white text-500-13'
      "
      @click="handleSummaryTab('week')"
    >
      {{ t("affiliate.statistics.tab.text_2") }}
    </v-col>
    <v-col
      cols="4"
      class="text-center pt-5 text-700-18"
      style="height: 100%; cursor: pointer"
      :class="
        summaryTabText == 'month'
          ? 'statistics-summary-tab-active black'
          : 'white text-500-13'
      "
      @click="handleSummaryTab('month')"
    >
      {{ t("affiliate.statistics.tab.text_3") }}
    </v-col>
  </v-row>
  <v-row class="mx-4 my-7 pa-0 statistics-receive-card">
    <v-col cols="4" class="pa-0 text-center">
      <img src="@/assets/affiliate/statistics/img_agent_8.png" width="108" />
      <p class="text-800-16 white">{{ t("affiliate.statistics.tab.text_1") }}</p>
    </v-col>
    <v-col cols="4" class="pa-0 text-center">
      <p class="text-800-32 yellow">R$ 19000,34</p>
    </v-col>
    <v-col cols="4" class="pa-0 text-center">
      <v-btn class="text-none statistics-receive-btn" width="185" height="64">
        {{ t("affiliate.achievement.text_3") }}
      </v-btn>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.statistics-summary-card {
  margin: 16px 16px 0px 16px;
  border-radius: 8px;
  background: #1D2027;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  overflow-x: auto;
}
.statistics-summary-level {
  align-items: center;
  height: 48px;
  border-radius: 8px;
  background: #1D2027;
}
.statistics-user-card {
  align-items: center;
  height: 48px;
  border-radius: 8px;
  background: #1D2027;
}
.statistics-commission-card {
  align-items: center;
  height: 48px;
  border-radius: 8px;
  background: #191725;
}
.statistics-summary-tab {
  height: 64px;
  border-radius: 0px 0px 8px 8px;
  background: #1D2027;
  align-items: center;
  justify-content: center;
}
.statistics-summary-tab-active {
  border-radius: 0px 0px 8px 8px;
  background: var(--Primary-Button-32CFEC, #009B3A);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}
.statistics-receive-card {
  height: 118px;
  border-radius: 8px;
  background: linear-gradient(180deg, #2e68af 0%, #21a68b 100%);
  align-items: center;
  justify-content: center;
}
.statistics-receive-btn {
  border-radius: 16px;
  background: var(--Secondary-Button-353652, #23262F);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  .v-btn__content {
    color: #fff;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
