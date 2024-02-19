<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const { width } = useDisplay();

const { dispatchInviteSelf } = inviteStore();

const profitTab = ref("today");

const mobileWidth = computed(() => {
  return width.value;
});

const personalInvitationInfo = computed(() => {
  const { getPersonalInvitationInfo } = storeToRefs(inviteStore());
  return getPersonalInvitationInfo.value;
});

onMounted(async () => {
  await dispatchInviteSelf();
});
</script>
<template>
  <v-row class="mt-4 m-statistics-profit-text justify-center">
    {{ t("affiliate.statistics.mobile_profit_title") }}
  </v-row>
  <v-card class="m-statistics-profit-card-body">
    <v-row class="justify-center">
      <v-col cols="12" class="text-center mt-4">
        <v-row class="justify-center align-center">
          <v-col cols="12">
            <img src="@/assets/public/image/img_public_15.png" width="143" />
          </v-col>
          <v-col cols="12" class="py-0">
            <p class="m-statistics-profit-cash-text">
              R$ {{ personalInvitationInfo.total_profit }}
            </p>
            <p class="m-statistics-profit-text pa-0 my-2">
              {{ t("affiliate.statistics.total_profit_text") }}
            </p>
            <v-btn
              class="button-bright text-none m-statistics-receive-btn"
              width="190"
              height="48"
            >
              {{ t("affiliate.statistics.receive_btn_text") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="text-center pt-0 justify-center">
        <v-card
          theme="dark"
          color="#15161C"
          class="ma-4 text-center m-statistics-card-border"
        >
          <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
            R$ {{ personalInvitationInfo.invitation_bonus }}
          </p>
          <p class="m-statistics-text-700 mb-1">
            {{ t("affiliate.invite.invitation_bonus") }}
          </p>
        </v-card>
        <v-card
          theme="dark"
          color="#15161C"
          class="ma-4 text-center m-statistics-card-border"
        >
          <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
            R$ {{ personalInvitationInfo.bettion_commission }}
          </p>
          <p class="m-statistics-text-700 mb-1">
            {{ t("affiliate.invite.betting_commision") }}
          </p>
        </v-card>
        <v-card
          theme="dark"
          color="#15161C"
          class="ma-4 text-center m-statistics-card-border"
        >
          <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
            R$ {{ personalInvitationInfo.achievement_bonus }}
          </p>
          <p class="m-statistics-text-700 mb-1">
            {{ t("affiliate.invite.achivement_bonus") }}
          </p>
        </v-card>
        <v-card
          theme="dark"
          color="#15161C"
          class="ma-4 text-center m-statistics-card-border"
        >
          <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
            {{ personalInvitationInfo.deposited_users }}
          </p>
          <p class="m-statistics-text-700 mb-1">
            {{ t("affiliate.invite.deposit_user") }}
          </p>
        </v-card>
        <div class="px-10 mb-4">
          <p class="m-statistics-text_1 mt-4">{{ t("affiliate.statistics.text_1") }}</p>
          <p class="m-statistics-text_1 mt-4">{{ t("affiliate.statistics.text_2") }}</p>
          <p class="m-statistics-text_1 mt-4">{{ t("affiliate.statistics.text_3") }}</p>
        </div>
      </v-col>
    </v-row>
  </v-card>
  <v-tabs
    v-model="profitTab"
    bg-color="#1D2027"
    class="mt-4 mx-6"
    style="height: 64px !impoartant"
  >
    <v-tab
      value="today"
      :class="[profitTab == 'today' ? 'm-statistics-tab-active' : 'm-statistics-tab']"
    >
      {{ t("affiliate.statistics.tab.text_1") }}
    </v-tab>
    <v-tab
      value="week"
      :class="[profitTab == 'week' ? 'm-statistics-tab-active' : 'm-statistics-tab']"
      class="pa-0"
    >
      {{ t("affiliate.statistics.tab.text_2") }}
    </v-tab>
    <v-tab
      value="month"
      :class="[profitTab == 'month' ? 'm-statistics-tab-active' : 'm-statistics-tab']"
      class="pa-0"
    >
      {{ t("affiliate.statistics.tab.text_3") }}
    </v-tab>
  </v-tabs>
  <v-window v-model="profitTab">
    <v-window-item value="today">
      <v-card class="m-statistics-profit-card-today">
        <v-row class="justify-center">
          <v-col cols="12" class="text-center mt-4 px-6 pb-0">
            <v-row class="justify-center align-center">
              <v-col cols="6">
                <img src="@/assets/public/image/img_public_16.png" width="119" />
              </v-col>
              <v-col cols="6" class="text-center">
                <p class="text-800-26 yellow">
                  R$ {{ personalInvitationInfo.profit_today.profit }}
                </p>
                <p class="text-800-12 white pa-0 my-2">
                  {{ t("affiliate.statistics.tab.today.profit_today_text") }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="text-center pt-0">
            <v-card
              theme="dark"
              color="#15161C"
              class="ma-4 text-center m-statistics-card-border"
            >
              <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
                R$ {{ personalInvitationInfo.profit_today.bettion_commission }}
              </p>
              <p class="m-statistics-text-700 mb-1">
                {{ t("affiliate.invite.betting_commision") }}
              </p>
            </v-card>
            <v-card
              theme="dark"
              color="#15161C"
              class="ma-4 text-center m-statistics-card-border"
            >
              <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
                R$ {{ personalInvitationInfo.profit_today.invite_bonus }}
              </p>
              <p class="m-statistics-text-700 mb-1">
                {{ t("affiliate.invite.invitation_bonus") }}
              </p>
            </v-card>
            <div class="px-10 mb-4">
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="m-statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="m-statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5")
                }}<Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item value="week">
      <v-card class="m-statistics-profit-card-week">
        <v-row class="justify-center">
          <v-col cols="12" class="text-center mt-4 px-6 pb-0">
            <v-row class="justify-center align-center">
              <v-col cols="6">
                <img src="@/assets/public/image/img_public_16.png" width="119" />
              </v-col>
              <v-col cols="6" class="text-center">
                <p class="text-800-26 yellow">
                  R$ {{ personalInvitationInfo.profit_week.profit }}
                </p>
                <p class="text-800-12 white pa-0 my-2">
                  {{ t("affiliate.statistics.tab.week.profit_this_week_text") }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="text-center pt-0">
            <v-card
              theme="dark"
              color="#15161C"
              class="ma-4 text-center m-statistics-card-border"
            >
              <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
                R$ {{ personalInvitationInfo.profit_week.bettion_commission }}
              </p>
              <p class="m-statistics-text-700 mb-1">
                {{ t("affiliate.invite.betting_commision") }}
              </p>
            </v-card>
            <v-card
              theme="dark"
              color="#15161C"
              class="ma-4 text-center m-statistics-card-border"
            >
              <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
                R$ {{ personalInvitationInfo.profit_week.invite_bonus }}
              </p>
              <p class="m-statistics-text-700 mb-1">
                {{ t("affiliate.invite.invitation_bonus") }}
              </p>
            </v-card>
            <div class="px-10 mb-4">
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="m-statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="m-statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5")
                }}<Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item value="month">
      <v-card class="m-statistics-profit-card-month">
        <v-row class="justify-center">
          <v-col cols="12" class="text-center mt-4 px-6 pb-0">
            <v-row class="justify-center align-center">
              <v-col cols="6">
                <img src="@/assets/public/image/img_public_16.png" width="119" />
              </v-col>
              <v-col cols="6" class="text-center">
                <p class="text-800-26 yellow">
                  R$ {{ personalInvitationInfo.profit_month.profit }}
                </p>
                <p class="text-800-12 white pa-0 my-2">
                  {{ t("affiliate.statistics.tab.month.profit_this_month_text") }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="text-center pt-0">
            <v-card
              theme="dark"
              color="#15161C"
              class="ma-4 text-center m-statistics-card-border"
            >
              <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
                R$ {{ personalInvitationInfo.profit_month.bettion_commission }}
              </p>
              <p class="m-statistics-text-700 mb-1">
                {{ t("affiliate.invite.betting_commision") }}
              </p>
            </v-card>
            <v-card
              theme="dark"
              color="#15161C"
              class="ma-4 text-center m-statistics-card-border"
            >
              <p class="m-statistics-profit-cash-text-1" style="margin-top: 11px">
                R$ {{ personalInvitationInfo.profit_month.invite_bonus }}
              </p>
              <p class="m-statistics-text-700 mb-1">
                {{ t("affiliate.invite.invitation_bonus") }}
              </p>
            </v-card>
            <div class="px-10 mb-4">
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="m-statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="m-statistics-text_1 mt-4">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="m-statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5") }}
                <Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
  </v-window>
</template>
<style lang="scss">
.m-statistics-tab-active {
  .v-tab__slider {
    height: 0px !important;
  }
}

.m-statistics-text_1 {
  color: var(--white-bg, #fff);
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
}

.m-statistics-profit-text {
  font-weight: 800;
  font-size: 14px;
  color: #ffffff;
}

.m-statistics-card-border {
  // width: 280px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 30px;
}

.m-statistics-receive-btn {
  border-radius: 9px;
  background: var(--primary-button-32-cfec, #009B3A);

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

  .v-btn__content {
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-statistics-profit-card-body {
  margin: 24px 16px 0px 16px;
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%) !important;
  border-radius: 8px !important;
}

.m-statistics-profit-cash-text {
  font-weight: 800;
  font-size: 28px;
  color: #f9bc01;
}

.m-statistics-profit-cash-text-1 {
  font-weight: 800;
  font-size: 20px;
  color: #f9bc01;
}

.m-statistics-text-700 {
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
}

@media (max-width: 600px) {
  .v-tabs--density-default {
    --v-tabs-height: 64px;
  }
}

.m-statistics-tab-active {
  width: 100px !important;
  background: #009B3A !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 8px 8px 0px 0px !important;

  .v-btn__content {
    font-weight: 600 !important;
    font-size: 13px !important;
    white-space: normal !important;
    letter-spacing: normal !important;
    line-height: inherit !important;
  }
}

.m-statistics-tab {
  width: 100px !important;
  background: #1D2027 !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 8px 8px 0px 0px !important;
  color: #ffffff;

  .v-btn__content {
    font-weight: 500 !important;
    font-size: 13px !important;
    white-space: normal !important;
    letter-spacing: normal !important;
    line-height: inherit !important;
  }
}

.m-statistics-profit-card-today {
  margin: 0px 16px;
  background: linear-gradient(90deg, #2e68af 0%, #21a68b 100%);
  border-radius: 8px;
}

.m-statistics-profit-card-week {
  margin: 0px 16px;
  background: linear-gradient(90deg, #3b26a6 0%, #6c2fe6 100%);
  border-radius: 8px;
}

.m-statistics-profit-card-month {
  margin: 0px 16px;
  background: linear-gradient(90deg, #de8245 0%, #d84594 100%);
  border-radius: 8px;
}
</style>
