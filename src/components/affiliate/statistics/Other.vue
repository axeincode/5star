<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();

const profitTab = ref("today");

const mobileWidth = computed(() => {
  return width.value;
});
</script>
<template>
  <v-row class="mt-6 statistics-profit-text">
    {{ t("affiliate.statistics.total_profit_text") }}
  </v-row>
  <v-card class="statistics-profit-card-body">
    <v-row class="justify-center">
      <v-col cols="12" md="4" lg="4" class="text-center">
        <div v-if="mobileWidth > 960">
          <img
            src="@/assets/public/image/img_public_15.png"
            :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
          />
          <p class="statistics-profit-cash-text">R$ 19,34</p>
          <p
            class="statistics-profit-text pa-0"
            :class="[mobileWidth < 960 ? 'my-2' : 'my-4']"
          >
            {{ t("affiliate.statistics.total_profit_text") }}
          </p>
        </div>
        <div v-else>
          <v-row class="justify-center align-center">
            <v-col cols="6">
              <p class="statistics-profit-cash-text">R$ 19,34</p>
              <p
                class="statistics-profit-text pa-0"
                :class="[mobileWidth < 960 ? 'my-2' : 'my-8']"
              >
                {{ t("affiliate.statistics.total_profit_text") }}
              </p>
            </v-col>
            <v-col cols="6">
              <img
                src="@/assets/public/image/img_public_15.png"
                :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" md="8" lg="8" class="text-center">
        <v-card theme="dark" color="#15161C" class="ma-4">
          <v-row :class="[mobileWidth < 1280 ? 'py-4' : 'py-8']">
            <v-col cols="6" lg="3">
              <p class="statistics-profit-cash-text-1">R$ 25.916</p>
              <p class="statistics-text-700 mt-4">
                {{ t("affiliate.invite.invitation_bonus") }}
              </p>
            </v-col>
            <v-col cols="6" lg="3">
              <p class="statistics-profit-cash-text-1">R$ 40.533,73</p>
              <p class="statistics-text-700 mt-4">
                {{ t("affiliate.invite.betting_commision") }}
              </p>
            </v-col>
            <v-col cols="6" lg="3">
              <p class="statistics-profit-cash-text-1">R$ 3.225</p>
              <p class="statistics-text-700 mt-4">
                {{ t("affiliate.invite.achivement_bonus") }}
              </p>
            </v-col>
            <v-col cols="6" lg="3">
              <p class="statistics-profit-cash-text-1">3972</p>
              <p class="statistics-text-700 mt-4">
                {{ t("affiliate.invite.deposit_user") }}
              </p>
            </v-col>
          </v-row>
        </v-card>
        <div class="px-10 mb-4">
          <p class="statistics-text_1 mt-6">{{ t("affiliate.statistics.text_1") }}</p>
          <p class="statistics-text_1 mt-6">{{ t("affiliate.statistics.text_2") }}</p>
          <p class="statistics-text_1 mt-6">{{ t("affiliate.statistics.text_3") }}</p>
        </div>
      </v-col>
    </v-row>
  </v-card>
  <v-tabs v-model="profitTab" bg-color="#1D2027" class="mt-12 mx-12">
    <v-tab
      value="today"
      :class="[profitTab == 'today' ? 'statistics-tab-active' : 'statistics-tab']"
      >{{ t("affiliate.statistics.tab.text_1") }}</v-tab
    >
    <v-tab
      value="week"
      :class="[profitTab == 'week' ? 'statistics-tab-active' : 'statistics-tab']"
      >{{ t("affiliate.statistics.tab.text_2") }}</v-tab
    >
    <v-tab
      value="month"
      :class="[profitTab == 'month' ? 'statistics-tab-active' : 'statistics-tab']"
      >{{ t("affiliate.statistics.tab.text_3") }}</v-tab
    >
  </v-tabs>
  <v-window v-model="profitTab">
    <v-window-item value="today">
      <v-card class="statistics-profit-card-today">
        <v-row class="justify-center">
          <v-col cols="12" md="4" lg="4" class="text-center">
            <div v-if="mobileWidth > 960">
              <img
                src="@/assets/public/image/img_public_16.png"
                :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
              />
              <p class="statistics-profit-cash-text">R$ 19,34</p>
              <p
                class="statistics-profit-text pa-0"
                :class="[mobileWidth < 960 ? 'my-2' : 'my-4']"
              >
                {{ t("affiliate.statistics.tab.today.profit_today_text") }}
              </p>
            </div>
            <div v-else>
              <v-row class="justify-center align-center">
                <v-col cols="6">
                  <p class="statistics-profit-cash-text">R$ 19,34</p>
                  <p
                    class="statistics-profit-text pa-0"
                    :class="[mobileWidth < 960 ? 'my-2' : 'my-8']"
                  >
                    {{ t("affiliate.statistics.tab.today.profit_today_text") }}
                  </p>
                </v-col>
                <v-col cols="6">
                  <img
                    src="@/assets/public/image/img_public_16.png"
                    :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" md="8" lg="8" class="text-center">
            <v-card theme="dark" color="#15161C" class="ma-4">
              <v-row :class="[mobileWidth < 1280 ? 'py-4' : 'py-8']">
                <v-col cols="6">
                  <p class="statistics-profit-cash-text-1">R$ 19,34</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.betting_commision") }}
                  </p>
                </v-col>
                <v-col cols="6">
                  <p class="statistics-profit-cash-text-1">R$ 0</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.invitation_bonus") }}
                  </p>
                </v-col>
              </v-row>
            </v-card>
            <div class="px-10 mb-4">
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5")
                }}<Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item value="week">
      <v-card class="statistics-profit-card-week">
        <v-row class="justify-center">
          <v-col cols="12" md="4" lg="4" class="text-center">
            <div v-if="mobileWidth > 960">
              <img
                src="@/assets/public/image/img_public_16.png"
                :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
              />
              <p class="statistics-profit-cash-text">R$ 19,34</p>
              <p
                class="statistics-profit-text pa-0"
                :class="[mobileWidth < 960 ? 'my-2' : 'my-4']"
              >
                {{ t("affiliate.statistics.tab.week.profit_this_week_text") }}
              </p>
            </div>
            <div v-else>
              <v-row class="justify-center align-center">
                <v-col cols="6">
                  <p class="statistics-profit-cash-text">R$ 19,34</p>
                  <p
                    class="statistics-profit-text pa-0"
                    :class="[mobileWidth < 960 ? 'my-2' : 'my-8']"
                  >
                    {{ t("affiliate.statistics.tab.week.profit_this_week_text") }}
                  </p>
                </v-col>
                <v-col cols="6">
                  <img
                    src="@/assets/public/image/img_public_16.png"
                    :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" md="8" lg="8" class="text-center">
            <v-card theme="dark" color="#15161C" class="ma-4">
              <v-row :class="[mobileWidth < 1280 ? 'py-4' : 'py-8']">
                <v-col cols="6">
                  <p class="statistics-profit-cash-text-1">R$ 19,34</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.betting_commision") }}
                  </p>
                </v-col>
                <v-col cols="6">
                  <p class="statistics-profit-cash-text-1">R$ 0</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.invitation_bonus") }}
                  </p>
                </v-col>
              </v-row>
            </v-card>
            <div class="px-10 mb-4">
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5") }}
                <Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item value="month">
      <v-card class="statistics-profit-card-month">
        <v-row class="justify-center">
          <v-col cols="12" md="4" lg="4" class="text-center">
            <div v-if="mobileWidth > 960">
              <img
                src="@/assets/public/image/img_public_16.png"
                :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
              />
              <p class="statistics-profit-cash-text">R$ 19,34</p>
              <p
                class="statistics-profit-text pa-0"
                :class="[mobileWidth < 960 ? 'my-2' : 'my-4']"
              >
                {{ t("affiliate.statistics.tab.month.profit_this_month_text") }}
              </p>
            </div>
            <div v-else>
              <v-row class="justify-center align-center">
                <v-col cols="6">
                  <p class="statistics-profit-cash-text">R$ 19,34</p>
                  <p
                    class="statistics-profit-text pa-0"
                    :class="[mobileWidth < 960 ? 'my-2' : 'my-8']"
                  >
                    {{ t("affiliate.statistics.tab.month.profit_this_month_text") }}
                  </p>
                </v-col>
                <v-col cols="6">
                  <img
                    src="@/assets/public/image/img_public_16.png"
                    :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" md="8" lg="8" class="text-center">
            <v-card theme="dark" color="#15161C" class="ma-4">
              <v-row :class="[mobileWidth < 1280 ? 'py-4' : 'py-8']">
                <v-col cols="6">
                  <p class="statistics-profit-cash-text-1">R$ 19,34</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.betting_commision") }}
                  </p>
                </v-col>
                <v-col cols="6">
                  <p class="statistics-profit-cash-text-1">R$ 0</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.invitation_bonus") }}
                  </p>
                </v-col>
              </v-row>
            </v-card>
            <div class="px-10 mb-4">
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5")
                }}<Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
  </v-window>
</template>
<style lang="scss">
.statistics-text_1 {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  text-align: justify;
}

.statistics-profit-text {
  padding: 0px 86px;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
}

.statistics-profit-card-body {
  margin: 24px 16px 0px 16px;
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%) !important;
  border-radius: 8px !important;
}

.statistics-profit-cash-text {
  font-weight: 800;
  font-size: 36px;
  color: #f9bc01;
}

.statistics-profit-cash-text-1 {
  font-weight: 800;
  font-size: 26px;
  color: #f9bc01;
}

.statistics-text-700 {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
}

.statistics-tab-active {
  background: #009B3A !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 8px 8px 0px 0px !important;
  font-weight: 700;
  font-size: 18px;
}

.statistics-tab {
  background: #1D2027 !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 8px 8px 0px 0px !important;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
}

.statistics-profit-card-today {
  margin: 0px 16px;
  background: linear-gradient(90deg, #2e68af 0%, #21a68b 100%);
  border-radius: 8px;
}

.statistics-profit-card-week {
  margin: 0px 16px;
  background: linear-gradient(90deg, #3b26a6 0%, #6c2fe6 100%);
  border-radius: 8px;
}

.statistics-profit-card-month {
  margin: 0px 16px;
  background: linear-gradient(90deg, #de8245 0%, #d84594 100%);
  border-radius: 8px;
}
</style>
