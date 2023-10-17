<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { userStore } from "@/store/user";
import { authStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { type GetBonusData } from "@/interface/bonus";
import { bonusStore } from "@/store/bonus";
import moment from "moment-timezone";

const { t } = useI18n()
const { width } = useDisplay();
const { dispatchUserBonus } = bonusStore();

const mobileWidth = computed(() => {
  return width.value
})

const userBalance = computed(() => {
  const { getUserBalance } = storeToRefs(userStore());
  return getUserBalance.value
})

const userInfo = computed(() => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value
})

const userBonusList = computed(() => {
  const { getBonusList } = storeToRefs(bonusStore());
  if (getBonusList.value.list != undefined) {
    getBonusList.value.list.map(item => {
      item.rate = Math.ceil(item.now / item.max);
    })
  }
  return getBonusList.value
})

const totalAmount = ref<string>("R$ 1500.56");
const withdrawAmount = ref<string>("R$ 855.79");

const bonusList = ref<Array<GetBonusData>>([
  {
    type: "Completion",
    rate: 100,
    currentCash: "R$ 90000.00",
    totalCash: "R$ 90000.00",
    restCash: "RRL 3000",
    bonusCash: "R$ 6000",
    expireDate: "2023/2/20"
  },
  {
    type: "Underway",
    rate: 50,
    currentCash: "R$ 90000.00",
    totalCash: "R$ 90000.00",
    restCash: "RRL 3000",
    bonusCash: "R$ 6000",
    expireDate: "2023/2/20"
  },
  {
    type: "Failure",
    rate: 0,
    currentCash: "R$ 0.00",
    totalCash: "R$ 67500.00",
    restCash: "RRL 3000",
    bonusCash: "R$ 0",
    expireDate: "2023/2/20"
  },
  {
    type: "Failure",
    rate: 50,
    currentCash: "R$ 36000.00",
    totalCash: "R$ 67500.00",
    restCash: "RRL 3000",
    bonusCash: "R$ 0",
    expireDate: "2023/2/20"
  },
]);

const formsList = ref<Array<any>>([
  {
    date: "2023/01/20",
    deposit: 3000,
    receive: 6000,
    wager: 90000
  },
])

onMounted(async () => {
  await dispatchUserBonus();
  console.log(userBonusList.value);
})
</script>
<template>
  <v-row class="mt-4 mx-2 text-400-12 text-gray text-center">
    <v-col cols="12" class="pa-0">
      {{ t("bonus.title_text") }}
    </v-col>
  </v-row>
  <v-row class="mx-1 mt-4">
    <v-col cols="12" class="pa-1">
      <v-list-item class="m-bg-color-1 mx-6">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_26.svg" width="30" />
        </template>
        <v-list-item-title class="ml-4" style="line-height: 17px">
          <div class="text-400-10 text-gray">{{ t("bonus.total_text") }}</div>
          <div class="text-600-12 white">{{ userBalance.amount }}</div>
        </v-list-item-title>
        <!-- <template v-slot:append>
          <div v-ripple.center style="width: 24px; height: 24px">
            <img src="@/assets/public/svg/btn_public_02.svg" width="24" />
          </div>
        </template> -->
      </v-list-item>
      <v-list-item class="m-bg-color-1 mt-4 mx-6">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_27.svg" width="30" />
        </template>
        <v-list-item-title class="ml-4" style="line-height: 17px">
          <div class="text-400-10 text-gray">{{ t("bonus.withdraw_text") }}</div>
          <div class="text-600-12 white">{{ userBalance.availabe_balance }}</div>
        </v-list-item-title>
      </v-list-item>
    </v-col>
    <v-col cols="12" class="pa-1">
      <v-card theme="dark" color="#1C1929" class="m-bonus-card-body pa-2">
        <div
          v-if="userBonusList.list == null || userBonusList.list.length == 0"
          class="ma-4"
        >
          <p class="text-700-12 gray">{{ t("bonus.text_1") }}</p>
          <p class="text-400-12 gray">{{ t("bonus.text_2") }}</p>
        </div>
        <v-expansion-panels v-else>
          <v-expansion-panel
            class="bg-color-211F31 mt-2 m-collapse-body"
            v-for="(item, index) in userBonusList.list"
            :key="index"
            :ripple="false"
          >
            <v-expansion-panel-title
              :class="[item.status == 3 ? 'failure-title' : 'completion-title']"
              :ripple="false"
            >
              <template v-slot:default="{ expanded }">
                <v-row no-gutters class="align-center">
                  <v-col
                    cols="3"
                    class="text-700-10 text-center bonus-cash-border d-flex align-center justify-center"
                    :class="[item.status == 3 ? 'black' : '']"
                  >
                    {{ userBalance.currency?.toLocaleUpperCase() }} {{ item.deposit }}
                  </v-col>
                  <v-col
                    cols="3"
                    class="text-400-10 text-center bonus-cash-border d-flex align-center justify-center"
                    :class="[item.status == 3 ? 'color-FF6200' : '']"
                  >
                    <template v-if="item.status == 0">Not opened</template>
                    <template v-else-if="item.status == 1">Opening</template>
                    <template v-if="item.status == 2">Completion</template>
                    <template v-if="item.status == 3">Failure</template>
                  </v-col>
                  <v-col
                    cols="4"
                    class="text-center bonus-cash-border"
                    v-if="item.status != 1"
                  >
                    <div class="text-400-10" :class="[item.status == 3 ? 'black' : '']">
                      Expire on
                    </div>
                    <div
                      class="text-600-10 mt-2"
                      :class="[item.status == 3 ? 'black' : '']"
                    >
                      {{ moment(item.ended_at * 1000).format("YYYY-MM-DD") }}
                    </div>
                  </v-col>
                  <v-col
                    cols="4"
                    class="text-center bonus-cash-border d-flex align-center justify-center"
                    v-else
                  >
                    <div class="text-400-10">No time limit</div>
                  </v-col>
                  <v-col cols="2" class="text-right">
                    <div class="relative" style="margin-left: auto; width: 25px">
                      <img
                        src="@/assets/bonus/img/img_so_01.png"
                        v-if="((item.receive - item.deposit) * 100) / item.deposit >= 100"
                        width="24"
                      />
                      <img src="@/assets/bonus/img/img_so_06.png" v-else width="24" />
                      <p class="m-bonus-rate">
                        {{ ((item.receive - item.deposit) * 100) / item.deposit }}%
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="12" class="text-center mt-1">
                    <div
                      class="text-400-10 mt-2"
                      v-if="(item.status = 1)"
                      :class="[item.status == 3 ? 'black' : '']"
                    >
                      Complete the task and get
                      <Font
                        :class="[
                          item.status == 3 ? 'm-bonus-cash-failure' : 'bonus-cash',
                        ]"
                      >
                        R$ {{ item.receive }}</Font
                      >
                      bonus
                    </div>
                    <div :class="[item.status == 1 ? 'mt-4' : 'mt-2']">
                      <v-progress-linear
                        v-model="item.rate"
                        height="16"
                        :class="[
                          item.status == 3 ? 'failure-progress' : 'completion-progress',
                        ]"
                      >
                        <div
                          class="text-400-10"
                          :class="[item.status == 3 ? 'gray' : '']"
                        >
                          R$ {{ item.now }} / R$ {{ item.max }}
                        </div>
                      </v-progress-linear>
                    </div>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="mt-3">
              <!-- <v-row class="ma-0" v-if="item.status != 1">
                <v-col cols="8" class="text-right text-400-12 pt-0" v-if="item.rate == 0">
                  {{ ((item.receive - item.deposit) * 100) / item.deposit }}
                  {{ t("bonus.super_bonus_text") }}
                </v-col>

                <v-col cols="8" class="text-right text-400-12 pt-0" v-else>
                  {{ item.rate }}{{ t("bonus.super_bonus_text") }}
                </v-col>

                <v-col cols="4" class="text-right pt-0">
                  <img
                    src="@/assets/public/svg/icon_public_53.svg"
                    width="20"
                    class="m-bonus-expansion-help-img"
                  />
                </v-col>
              </v-row> -->
              <v-row class="ma-0">
                <v-col cols="8" class="text-right text-400-12 pt-0">
                  {{ ((item.receive - item.deposit) * 100) / item.deposit }}
                  {{ t("bonus.super_bonus_text") }}
                </v-col>
                <v-col cols="4" class="text-right pt-0">
                  <img
                    src="@/assets/public/svg/icon_public_53.svg"
                    width="20"
                    class="m-bonus-expansion-help-img"
                  />
                </v-col>
              </v-row>
              <v-table class="m-forms-bonus-table-bg text-400-10">
                <thead>
                  <tr>
                    <th>
                      {{ t("bonus.table.date") }}
                    </th>
                    <th>
                      {{ t("bonus.table.deposit") }}
                    </th>
                    <th>
                      {{ t("bonus.table.receive") }}
                    </th>
                    <th>
                      {{ t("bonus.table.wager") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ moment(item.created_at * 1000).format("YYYY/MM/DD") }}</td>
                    <td>{{ item.deposit }}</td>
                    <td>{{ item.receive }}</td>
                    <td>{{ item.wager }}</td>
                  </tr>
                </tbody>
              </v-table>
              <v-row class="ma-0">
                <v-col cols="5" class="text-left text-500-10">
                  ID: {{ userInfo.uid }}
                </v-col>
                <v-col cols="7" class="justify-end d-flex text-500-10">
                  {{ t("bonus.table.deposit") }} ${{ item.deposit }},
                  {{ t("bonus.table.receive") }} ${{ item.receive }}
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.v-expansion-panel-title__overlay {
  opacity: 0 !important;
}

.m-bonus-expansion-help-img:active {
  scale: 0.95;
  filter: brightness(80%);
  transition: scale 0.2s;
}

.m-bonus-card-body {
  min-height: 233px;
  overflow-y: auto;
  margin-bottom: 6px;

  .v-expansion-panel-title__icon {
    display: inline-flex;
    margin-bottom: -4px;
    margin-top: -4px;
    user-select: none;
    margin-inline-start: auto;
    position: absolute;
    top: 40px;
    right: 10px;
  }
}

.m-bonus-rate {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
  font-family: Haettenschweiler;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  // line-height: normal;
  // letter-spacing: 0.16px;
}

.m-forms-bonus-table-bg {
  background: #1c1929 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 12px !important;
  width: 100% !important;
}

.v-expansion-panel-title:active:enabled {
  transform: none !important;
  filter: none !important;
}

.bonus-cash-border {
  height: 30px;
  border-right: 1px solid #211f31;
}

.m-collapse-body .v-expansion-panel-title {
  border-radius: 8px !important;
  padding: 14px 8px !important;
  height: 100px !important;
}

.completion-title {
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%) !important;
}

.failure-title {
  background: linear-gradient(90deg, #221f32 0%, #424567 100%) !important;
}

.v-expansion-panel:not(:first-child)::after {
  content: none !important;
}

.v-progress-linear {
  background: #211f31 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
}

.v-progress-linear__background {
  background: transparent !important;
}

.completion-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(180deg, #6d44f8 0%, #5726fc 100%) !important;
    border-radius: 8px !important;
  }
}

.failure-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(0deg, #1c1929 0%, #393a71 100%);
    border-radius: 8px;
  }
}

.v-expansion-panel {
  border-radius: 8px !important;
}

.bonus-cash {
  color: #f9bc01;
  font-weight: 700;
}

.m-bonus-cash-failure {
  color: #000000;
  font-weight: 700;
}

.v-expansion-panel-text__wrapper {
  padding: 8px 8px 16px !important;
}
</style>
