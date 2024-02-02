<script lang="ts" setup>
import { ref, computed, h, shallowRef, watch } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
const { t } = useI18n();
const { width } = useDisplay();

const formsList = ref<Array<any>>([
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 150000000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "win",
    profit: "R$ 300000000.00",
  },
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 150000000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "win",
    profit: "R$ 300000000.00",
  },
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 150000000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "loss",
    profit: "- R$ 300000000.00",
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]);

const gameList = ref<Array<string>>([
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
]);

const selectedGame = ref<string>("Crash");

const gameMenuShow = ref<boolean>(false);

const handleDropdown = (item: string) => {
  selectedGame.value = item;
};

const tootipList = ref<Array<any>>([
  {
    id: "Qsd58844221122 ",
    cash: "BRL100",
  },
  {
    id: "qwe12309700974",
    cash: "BRL100",
  },
  {
    id: "qww54515555566",
    cash: "BRL150",
  },
]);

window.addEventListener("scroll", function () {
  gameMenuShow.value = false;
});

const mobileWidth = computed(() => {
  return width.value;
});

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

const handlePrev = () => {};

const handleNext = () => {};
</script>
<template>
  <v-row class="mx-2 mt-4">
    <v-table class="forms-bonus-table-bg" theme="dark" fixed-header height="700px">
      <thead class="forms-table-header">
        <tr>
          <th class="forms-table-header-text" style="border-radius: 8px 0px 0px 8px">
            {{ t("transaction.game_history.game") }}
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">{{ t("transaction.game_history.date") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div>{{ t("transaction.game_history.amount") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">
              {{ t("transaction.game_history.multilier") }}
            </div>
          </th>
          <th class="forms-table-header-text">
            <div>{{ t("transaction.game_history.betId") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">
              {{ t("transaction.game_history.status") }}
            </div>
          </th>
          <th class="forms-table-header-text" style="border-radius: 0px 8px 8px 0px">
            {{ t("transaction.game_history.profit") }}
          </th>
        </tr>
      </thead>
      <tbody
        :class="mobileWidth < 600 ? 'text-400-12 text-center' : 'text-400-14 text-center'"
      >
        <tr v-for="(item, index) in formsList" :key="index">
          <td>{{ item.game }}</td>
          <td>{{ item.date }}</td>
          <td class="d-flex align-center justify-center">
            <div
              style="
                width: 20px;
                height: 20px;
                background: #23262F;
                border-radius: 20px;
                position: relative;
              "
              v-if="item.amount"
            >
              <el-tooltip placement="top" effect="customized">
                <template #content>
                  <v-list-item
                    v-for="(item, index) in tootipList"
                    :key="index"
                    class="text-400-16 gray"
                  >
                    <v-list-item-title>ID: {{ item.id }}</v-list-item-title>
                    <template v-slot:append>
                      <div class="ml-10">{{ item.cash }}</div>
                    </template>
                  </v-list-item>
                </template>
                <!-- <img src="@/assets/public/svg/icon_public_50.svg" width="20" /> -->
                <v-icon
                  style="
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                  "
                  >mdi-chevron-up</v-icon
                >
              </el-tooltip>
            </div>
            <div class="ml-2">{{ item.amount }}</div>
          </td>
          <td>{{ item.multilier }}</td>
          <td>{{ item.betId }}</td>
          <td>{{ item.status }}</td>
          <td :class="item.status == 'win' ? 'color-01983A' : 'color-D42763'">
            {{ item.profit }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-row>
  <v-row class="ma-4 mx-2">
    <v-col cols="6" md="4" lg="4" class="d-flex" style="margin-left: -10px !important">
      <v-menu offset="12" class="game-menu" v-model="gameMenuShow">
        <template v-slot:activator="{ props }">
          <v-card color="#15161C" theme="dark">
            <v-list-item
              class="game-item"
              v-bind="props"
              append-icon="mdi-chevron-down"
              value="game"
              :class="mobileWidth < 600 ? 'text-600-12' : ''"
            >
              <v-list-item-title :class="mobileWidth < 600 ? 'text-600-12' : ''">{{
                selectedGame
              }}</v-list-item-title>
            </v-list-item>
          </v-card>
        </template>
        <v-list theme="dark" bg-color="#1D2027">
          <v-list-item
            v-for="(item, i) in gameList"
            :key="i"
            :value="item"
            class="game-item"
            @click="handleDropdown(item)"
          >
            <v-list-item-title
              class="text-center"
              :class="mobileWidth < 600 ? 'text-600-12' : ''"
              >{{ item }}</v-list-item-title
            >
          </v-list-item>
          <div class="bonus-game-card-list text-center">
            <v-icon>mdi-chevron-down</v-icon>
          </div>
        </v-list>
      </v-menu>
    </v-col>
    <v-col
      cols="6"
      md="8"
      lg="8"
      class="d-flex"
      style="
        margin-left: 10px !important;
        padding-right: 0px !important;
        padding-left: 0px !important;
      "
    >
      <div style="float: right !important; width: 100%">
        <Pagination
          style="float: right"
          :length="10"
          @handlePrev="handlePrev"
          @handleNext="handleNext"
        />
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.forms-bonus-table-bg {
  height: 700px;
  background: #15161C !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: 1px solid #23262F;
}

.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: #23262F;
}

.forms-table-header {
  border-radius: 8px !important;
}

.forms-table-body {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-align: center;
}

.forms-table-header-text {
  font-weight: 700 !important;
  font-size: 16px !important;
  text-align: center !important;
  color: #000000 !important;
}

.forms-table-border {
  padding: 0px 20px;
  border-left: 1px solid #000000 !important;
  border-right: 1px solid #000000 !important;
}

.game-menu {
  .v-overlay__content::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: #1D2027 transparent transparent transparent;
  }
}

.bonus-game-card-list {
  margin: auto;
  width: 117px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 27px;
  background: var(--bg-51-c-1929, #15161C);
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

.el-popper.is-customized {
  padding: 6px 12px;
  background: #1D2027;
  border-radius: 10px;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: #1D2027;
  right: 0;
}
</style>
