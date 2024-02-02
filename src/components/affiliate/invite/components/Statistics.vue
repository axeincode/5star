<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { type statisticsItem } from "@/interface/affiliate/invite"

const { t } = useI18n();
const { width } = useDisplay();

const revenuCash = ref<number>(415.740);
const statisticsItem = ref<statisticsItem>({
    today_deposited_user: 0,
    yesterday_deposited_user: 3963,
    today_revenue: 55.44,
    yesterday_revenue: 98.02,
    this_month_deposited_user: 0,
    this_month_revenue: 0,
    total_registered_user: 0,
    total_depositing_user: 0,
    total_revenue: 0,
});
</script>

<template>
  <v-row class="mx-4 my-2 align-center">
    <v-col cols="12" md="7" lg="7" class="mt-3 pa-0">
      <v-card color="#1D2027" class="pa-2 m-statistics-card-1">
        <v-card color="#15161C" class="pa-2 m-statistics-card-2">
          <v-row>
            <v-col cols="6" md="3" lg="3" class="m-invite-border text-center py-1 mt-4">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_1") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                {{ statisticsItem.today_deposited_user }}
              </div>
            </v-col>
            <v-col cols="6" md="3" lg="3" class="text-center py-1 mt-4">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_2") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                {{ statisticsItem.yesterday_deposited_user }}
              </div>
            </v-col>
            <v-col cols="6" md="3" lg="3" class="m-invite-border text-center py-2 mb-4">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_3") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                R$ {{ statisticsItem.today_revenue }}
              </div>
            </v-col>
            <v-col cols="6" md="3" lg="3" class="text-center py-2 mb-4">
              <div class="text-400-10 gray">{{ t("affiliate.invite.text_4") }}</div>
              <div class="m-invite-url-right-text mt-2">
                R$ {{ statisticsItem.yesterday_revenue }}
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card color="#15161C" class="pa-2 m-statistics-card-2 mt-2">
          <v-row>
            <v-col cols="6" md="3" lg="3" class="m-invite-border text-center py-1 mt-4">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_5") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                {{ statisticsItem.this_month_deposited_user }}
              </div>
            </v-col>
            <v-col cols="6" md="3" lg="3" class="text-center py-1 mt-4">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_6") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                {{ statisticsItem.total_registered_user }}
              </div>
            </v-col>
            <v-col cols="6" md="3" lg="3" class="m-invite-border text-center py-2 mb-4">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_7") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                R$ {{ statisticsItem.this_month_revenue.toFixed(2) }}
              </div>
            </v-col>
            <v-col cols="6" md="3" lg="3" class="text-center py-2 mb-4">
              <div class="text-400-10 gray">{{ t("affiliate.invite.text_8") }}</div>
              <div class="m-invite-url-right-text mt-2">
                {{ statisticsItem.total_depositing_user }}
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card color="#15161C" class="pa-2 m-statistics-card-2 mt-2">
          <v-row>
            <v-col cols="12" class="m-invite-border text-center py-1 mt-4 mb-2">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_9") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                R$ {{ statisticsItem.total_revenue.toFixed(2) }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
      <!-- <v-card class="mt-5 pa-5 invite-right-card-bg">
          <v-row class="align-center mx-2">
            <v-col cols="8" class="pa-2">
              <div class="text-700-16 white">
                {{ t("affiliate.invite.monthly_revenu_goal") }}
              </div>
            </v-col>
            <v-col cols="4" class="text-right pa-0 pt-2">
              <img src="@/assets/public/image/img_public_06.png" width="74" height="69" />
            </v-col>
          </v-row>
          <v-row class="mx-2 my-0">
            <v-col cols="12">
              <div class="d-flex mt-2">
                <div class="m-invite-revenu-cash-text">R$ {{ revenuCash }}</div>
                <v-menu v-model="revenuCashMenuShow">
                  <template v-slot:activator="{ props }">
                    <img
                      src="@/assets/public/svg/icon_public_22.svg"
                      class="ml-4"
                      v-bind="props"
                      width="16"
                    />
                  </template>
                  <v-list
                    theme="dark"
                    bg-color="#1D2027"
                    class="px-2"
                    :width="mobileWidth > 600 ? 471 : mobileWidth - 30"
                    style="margin: 0px 2px 0px -15px"
                  >
                    <v-list-item class="pt-4">
                      <div class="text-center text-400-12 gray">
                        {{ t("affiliate.invite.help_text_1") }}
                      </div>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div>
                <span class="text-500-10 yellow">{{ morePeople }}</span>
                <span class="text-500-10 white">{{
                  t("affiliate.invite.more_people_text")
                }}</span>
              </div>
            </v-col>
          </v-row>
        </v-card> -->
    </v-col>
  </v-row>
</template>

<style lang="scss">
.m-statistics-card-1 {
  border-radius: 8px;
  box-shadow: none;
}
.m-statistics-card-2 {
  border-radius: 8px;
  background: var(--BG-5-1C1929, #15161C);
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

.m-invite-url-right-text {
  font-weight: 800;
  font-size: 12px;
  color: #ffffff;
}
</style>
