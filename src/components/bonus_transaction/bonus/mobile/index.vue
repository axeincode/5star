<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { userStore } from "@/store/user";
import { authStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { type GetBonusData } from "@/interface/bonus";
import { bonusStore } from "@/store/bonus";
import { appBarStore } from "@/store/appBar";
import moment from "moment-timezone";
import MBonusDialog from "@/components/bonus_transaction/bonus/dialog/mobile/index.vue";

const { t } = useI18n()
const { width } = useDisplay();
const { dispatchUserBonus } = bonusStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { dispatchUserBalance } = userStore();

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
      console.log(item);
      item.rate = Math.ceil(parseInt(item.now) / parseInt(item.max) * 100);
    })
    const resultTree = groupObjects(getBonusList.value.list);
    getBonusList.value.list = resultTree;
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

const dialogVisible = ref<boolean>(false);
const selectedId = ref<number>(0);

const groupObjects = array => {
  const grouped = {};

  array.forEach(obj => {
    const parentId = obj.relation_id;
    if (!grouped[parentId]) {
      grouped[parentId] = [];
    }
    grouped[parentId].push(obj);
  });

  const buildTree = parentId => {
    if (!grouped[parentId]) {
      return [];
    }

    return grouped[parentId].map(obj => {
      const children = buildTree(obj.id);
      if (children.length > 0) {
        obj.children = children;
      }
      return obj;
    });
  };

  return buildTree(0);
};

const bonusDialogHide = () => {
  dialogVisible.value = false;
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
};

const confirmDailogShow = (id: number) => {
  selectedId.value = id;
  dialogVisible.value = true;
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(true);
};
onMounted(async () => {
  await dispatchUserBonus();
  await dispatchUserBalance();
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
          <img src="@/assets/public/svg/icon_public_98.svg" width="30" />
        </template>
        <v-list-item-title class="ml-4" style="line-height: 17px">
          <div class="text-400-10 text-gray">{{ t("bonus.account_balance") }}</div>
          <div class="text-600-12 white">R$ {{ userBalance.real }}</div>
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
          <div class="text-400-10 text-gray">{{ t("bonus.bonus_money") }}</div>
          <div class="text-600-12 white">R$ {{ userBalance.bonus }}</div>
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="m-bg-color-1 mt-4 mx-6">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_26.svg" width="30" />
        </template>
        <v-list-item-title class="ml-4" style="line-height: 17px">
          <div class="text-400-10 text-gray">{{ t("bonus.total_text") }}</div>
          <div class="text-600-12 white">R$ {{ userBalance.amount }}</div>
        </v-list-item-title>
      </v-list-item>
    </v-col>
    <v-col cols="12" class="pa-1">
      <v-card theme="dark" color="#15161C" class="m-bonus-card-body pa-2">
        <div
          v-if="userBonusList.list == null || userBonusList.list.length == 0"
          class="ma-4"
        >
          <p class="text-700-12 gray">{{ t("bonus.text_1") }}</p>
          <p class="text-400-12 gray">{{ t("bonus.text_2") }}</p>
        </div>
        <template v-else v-for="(item, index) in userBonusList.list" :key="index">
          <div class="m-bonus-deposit-group mb-1">
            <v-expansion-panels>
              
              <v-expansion-panel class="bg-color-211F31 m-collapse-body" :ripple="false">
                <v-expansion-panel-title
                  :class="[
                    item.status == 3 ? 'failure-title-bg' : '',
                    item.type == 0 && item.status != 3 ? 'real-title-bg' : '',
                    item.type == 1 && item.status != 3 ? 'bonus-title-bg' : '',
                  ]"
                  :ripple="false"
                >
                  <template v-slot:default="{ expanded }">
                    <v-row no-gutters class="align-center">
                      <v-col
                        cols="3"
                        class="text-700-10 bonus-cash-border pt-1 pl-2"
                        :class="[item.status == 3 ? 'black' : '']"
                      >
                        <div
                          class="text-400-10"
                          :class="item.type == 0 ? 'color-6AA82D' : 'yellow'"
                        >
                          {{ item.type == 0 ? t("bonus.text_3") : t("bonus.text_4") }}
                        </div>
                        <div class="mt-2">
                          {{ userBalance.currency?.toLocaleUpperCase() }}
                          {{ item.receive }}
                        </div>
                      </v-col>
                      <v-col
                        cols="3"
                        class="text-400-10 text-center bonus-cash-border d-flex align-center justify-center"
                        :class="[item.status == 3 ? 'color-FF6200' : '']"
                      >
                        <template v-if="item.status == 0">Not opened</template>
                        <template v-else-if="item.status == 1">Underway</template>
                        <template v-if="item.status == 2">Completion</template>
                        <template v-if="item.status == 3">Suspend</template>
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-center bonus-cash-border"
                        v-if="item.status != 1"
                      >
                        <div
                          class="text-400-10"
                          :class="[item.status == 3 ? 'black' : '']"
                        >
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
                            v-if="(Number(item.receive) * 100) / item.deposit > 50"
                            width="24"
                          />
                          <img src="@/assets/bonus/img/img_so_06.png" v-else width="24" />
                          <p class="m-bonus-rate">
                            {{
                              item.deposit == 0
                                ? 0
                                : Number((item.receive * 100) / item.deposit)
                            }}%
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="12" class="text-center mt-1">
                        <div
                          class="text-400-10 mt-2"
                          v-if="(item.status = 1)"
                          :class="[item.status == 3 ? 'black' : '']"
                        >
                          {{ t("bonus.cashable_progress") }}
                        </div>
                        <div :class="[item.status == 1 ? 'mt-4' : 'mt-2']">
                          <v-progress-linear
                            v-model="item.rate"
                            height="16"
                            :class="[
                              item.status == 3
                                ? 'failure-progress'
                                : 'real-completion-progress',
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
                  <v-table class="m-forms-bonus-table-bg text-400-10 white">
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
                    <v-col cols="12" class="text-left text-500-10">
                      ID: {{ item.id }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            
            
              <v-expansion-panel
                class="bg-color-211F31 m-collapse-body mt-1"
                :ripple="false"
                v-if="item.children != undefined"
              >
                <v-expansion-panel-title
                  :class="[
                    item.children[0].status == 3 ? 'failure-title-bg' : '',
                    item.children[0].type == 0 && item.children[0].status != 3
                      ? 'real-title-bg'
                      : '',
                    item.children[0].type == 1 && item.children[0].status != 3
                      ? 'bonus-title-bg'
                      : '',
                  ]"
                  :ripple="false"
                >
                  <template v-slot:default="{ expanded }">
                    <v-row no-gutters class="align-center">
                      <v-col
                        cols="3"
                        class="text-700-10 bonus-cash-border pt-1 pl-2"
                        :class="[item.children[0].status == 3 ? 'black' : '']"
                      >
                        <div
                          class="text-400-10"
                          :class="item.children[0].type == 0 ? 'color-6AA82D' : 'yellow'"
                        >
                          {{
                            item.children[0].type == 0
                              ? t("bonus.text_3")
                              : t("bonus.text_4")
                          }}
                        </div>
                        <div class="mt-2">
                          {{ userBalance.currency?.toLocaleUpperCase() }}
                          {{ item.children[0].receive }}
                        </div>
                      </v-col>
                      <v-col
                        cols="3"
                        class="text-400-10 text-center bonus-cash-border d-flex align-center justify-center"
                        :class="[item.children[0].status == 3 ? 'color-FF6200' : '']"
                      >
                        <template v-if="item.children[0].status == 0"
                          >Not opened</template
                        >
                        <template v-else-if="item.children[0].status == 1"
                          >Underway</template
                        >
                        <template v-if="item.children[0].status == 2"
                          >Completion</template
                        >
                        <template v-if="item.children[0].status == 3">Suspend</template>
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-center bonus-cash-border"
                        v-if="item.children[0].status != 1"
                      >
                        <div
                          class="text-400-10"
                          :class="[item.children[0].status == 3 ? 'black' : '']"
                        >
                          Expire on
                        </div>
                        <div
                          class="text-600-10 mt-2"
                          :class="[item.children[0].status == 3 ? 'black' : '']"
                        >
                          {{
                            moment(item.children[0].ended_at * 1000).format("YYYY-MM-DD")
                          }}
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
                            v-if="
                              (Number(item.children[0].receive) * 100) /
                                item.children[0].deposit >
                              50
                            "
                            width="24"
                          />
                          <img src="@/assets/bonus/img/img_so_06.png" v-else width="24" />
                          <p class="m-bonus-rate">
                            {{
                              item.children[0].deposit == 0
                                ? 0
                                : Number(
                                    (item.children[0].receive * 100) /
                                      item.children[0].deposit
                                  )
                            }}%
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="12" class="text-center mt-1">
                        <div
                          class="text-400-10 mt-2"
                          v-if="(item.children[0].status = 1)"
                          :class="[item.children[0].status == 3 ? 'black' : '']"
                        >
                          {{ t("bonus.cashable_progress") }}
                        </div>
                        <div :class="[item.children[0].status == 1 ? 'mt-4' : 'mt-2']">
                          <v-progress-linear
                            v-model="item.children[0].rate"
                            height="16"
                            :class="[
                              item.children[0].status == 3
                                ? 'failure-progress'
                                : 'bonus-completion-progress',
                            ]"
                          >
                            <div
                              class="text-400-10"
                              :class="[item.children[0].status == 3 ? 'gray' : '']"
                            >
                              R$ {{ item.children[0].now }} / R$
                              {{ item.children[0].max }}
                            </div>
                          </v-progress-linear>
                        </div>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="mt-3">
                  <v-table class="m-forms-bonus-table-bg text-400-10 white">
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
                        <td>
                          {{
                            moment(item.children[0].created_at * 1000).format(
                              "YYYY/MM/DD"
                            )
                          }}
                        </td>
                        <td>{{ item.children[0].deposit }}</td>
                        <td>{{ item.children[0].receive }}</td>
                        <td>{{ item.children[0].wager }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                  <v-row class="ma-0 align-center">
                    <v-col cols="6" class="text-left text-500-10">
                      ID: {{ item.children[0].id }}
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <v-btn
                        class="m-bonus-forfeit-btn text-none"
                        @click="confirmDailogShow(item.children[0].id)"
                      >
                        {{ t("bonus.text_5") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog
    v-model="dialogVisible"
    width="326"
    content-class="m-suspend-dialog-position"
    @click:outside="bonusDialogHide"
  >
    <MBonusDialog :id="selectedId" @bonusDialogHide="bonusDialogHide" />
  </v-dialog>
</template>

<style lang="scss">
.m-bonus-forfeit-btn {
  width: 64px;
  height: 24px !important;
  border-radius: 4px;
  background: var(--Secondary-Button-353652, #1D2027);
  .v-btn__content {
    color: var(--White-BG, #fff);
    text-align: center;
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
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
  background: #15161C !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.v-expansion-panel-title:active:enabled {
  transform: none !important;
  filter: none !important;
}

.bonus-cash-border {
  height: 30px;
  border-right: 1px solid #1D2027;
}

.m-collapse-body .v-expansion-panel-title {
  border-radius: 8px !important;
  padding: 14px 8px !important;
  height: 100px !important;
}

.real-title-bg {
  border-radius: 8px;
  background: linear-gradient(90deg, #1D2027 0%, #009B3A 100%) !important;
}

.bonus-title-bg {
  border-radius: 8px;
  background: linear-gradient(90deg, #23262F 0%, #1F4EA8 100%) !important;
}

.failure-title-bg {
  background: linear-gradient(90deg, #221f32 0%, #424567 100%) !important;
}

.v-expansion-panel:not(:first-child)::after {
  content: none !important;
}

.v-progress-linear {
  background: #1D2027 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
}

.v-progress-linear__background {
  background: transparent !important;
}

.real-completion-progress {
  .v-progress-linear__determinate {
    background: #009B3A !important;
    border-radius: 8px !important;
    border: 2px solid #15161C;
  }
}
.bonus-completion-progress {
  .v-progress-linear__determinate {
    background: #235AC5 !important;
    border-radius: 8px !important;
    border: 2px solid #15161C;
  }
}

.failure-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(0deg, #15161C 0%, #393a71 100%);
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
.m-bonus-deposit-group {
  border-radius: 8px;
  background: #1D2027;
  padding: 4px;
  .v-expansion-panel {
    background-color: #23262F !important;
  }
}
</style>
