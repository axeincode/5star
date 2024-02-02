<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from "vuetify";
import { type GetRouletteHistory } from '@/interface/vip';
import anime, { AnimeInstance } from "animejs";

const emit = defineEmits<{ (e: 'closeRouletteBonusDialog'): void }>()
const { t } = useI18n();
const { width } = useDisplay()

const roulettePaidBonus = ref<string>("R$ 1.400.000");
const spinNumber = ref<number>(10);
const winnerBodyHeight = ref<number>(0);
const winnerBodyShow = ref<boolean>(false);
const winnerToggleSwitch = ref<boolean>(false);

interface rouletteItem {
    value: string
    color: string
}

const rouletteHistory = ref<Array<GetRouletteHistory>>([
    {
        id: 1,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 1",
    },
    {
        id: 2,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 3,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "IPHONE 14",
    },
    {
        id: 4,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 5000",
    },
])

const rouletteWinnerHistory = ref<Array<GetRouletteHistory>>([
    {
        id: 1,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 2,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 1",
    },
    {
        id: 3,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 4,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 5,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 6,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 7,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 8,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 9,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 0.5",
    },
    {
        id: 10,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 5000",
    },
])

const roulettePrizeHistory = ref<Array<GetRouletteHistory>>([
    {
        id: 1,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 500",
    },
    {
        id: 2,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 500",
    },
    {
        id: 3,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 500",
    },
    {
        id: 4,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 500",
    },
    {
        id: 5,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 500",
    },
    {
        id: 6,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 500",
    },
    {
        id: 7,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 50",
    },
    {
        id: 8,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "IPHONE 14",
    },
    {
        id: 9,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 50",
    },
    {
        id: 10,
        rouletteTime: "2023/06/20 23:19:00",
        user: "User9110245128",
        rouletteResult: "R$ 50",
    },
])

// roulette variables

const wheelMap = ref<Array<rouletteItem>>([
    {
        value: "R$ 5000",
        color: "D07000",
    },
    {
        value: "R$ 5",
        color: "FFBD00",
    },
    {
        value: "1 BTC",
        color: "FF5600",
    },
    {
        value: "R$ 0.5",
        color: "FFBD00",
    },
    {
        value: "R$ 500",
        color: "D07000",
    },
    {
        value: "R$ 50",
        color: "FFBD00",
    },
    {
        value: "IPHONE 14",
        color: "31C2F0",
    },
    {
        value: "R$ 10",
        color: "FFBD00",
    },
])
const isSpinning = ref<boolean>(false);
const currentWheelIndex = ref<number>(0);
const speed = ref<number>(42);
const currentWheelRotation = ref<number>(0);
const roulette = ref<HTMLElement | undefined>(undefined);


const getRouletteWheelValue = (index: number) => {
    if (index < 0 && index % 8 == 0) {
        return wheelMap.value[0];
    } else {
        return wheelMap.value[index >= 0 ? index % 8 : 8 - Math.abs(index % 8)];
    }
}

const startRoulette = () => {
    spinNumber.value--;
    speed.value = Math.floor(Math.random() * 10) * 26;
    isSpinning.value = true;
    const bezier = [0.165, 0.84, 0.44, 1.005];
    const newWheelIndex = currentWheelIndex.value - speed.value;
    const result = getRouletteWheelValue(newWheelIndex);
    if (speed.value == 0) {
        speed.value = 520
    }
    let newRotaion = currentWheelRotation.value + (360 / 8) * speed.value;
    const animation = anime({
        targets: roulette.value,
        rotate: function () {
            return newRotaion;
        },
        duration: function () {
            return 5000;
        },
        loop: 1,
        // easing: "cubicBezier(0.010, 0.990, 0.855, 1.010)",
        easing: `cubicBezier(${bezier.join(",")})`,
        complete: (...args) => {
            currentWheelRotation.value = newRotaion;
            currentWheelIndex.value = newWheelIndex;
            isSpinning.value = false;
            rouletteHistory.value.unshift({
                id: rouletteHistory.value.length + 1,
                rouletteTime: "2023/06/20 23:19:00",
                user: "User9110245128",
                rouletteResult: result.value,
            })
        }
    });
}

// width for mobile
const mobileWidth: any = computed(() => {
    return width.value;
})

// show function for winner body
const showWinnerBody = () => {
    winnerBodyShow.value = !winnerBodyShow.value;
    winnerBodyHeight.value = winnerBodyShow.value ? 347 : 0;
}
</script>

<template>
  <div class="roulette-bonus-dialog-container">
    <div class="roulette-bonus-dialog-header-left">
      <v-btn
        class="roulette-bonus-dialog-sound-bg-1 ml-4"
        icon="true"
        width="34"
        height="34"
      >
        <div class="roulette-bonus-dialog-sound-bg-2">
          <img
            src="@/assets/public/svg/icon_public_46.svg"
            width="18"
            class="roulette-bonus-dialog-sound-position"
          />
        </div>
      </v-btn>
    </div>
    <div class="roulette-bonus-dialog-header-right">
      <v-menu offset="14" content-class="roulette-bonus-help-menu" :scrim="false">
        <template v-slot:activator="{ props }">
          <v-btn
            class="roulette-bonus-dialog-help-bg mr-4"
            v-bind="props"
            icon="true"
            width="34"
            height="34"
          >
            <div class="roulette-bonus-dialog-help-bg-2">
              <img
                src="@/assets/public/svg/icon_public_22.svg"
                width="18"
                class="roulette-bonus-dialog-help-position"
              />
            </div>
          </v-btn>
        </template>
        <v-list theme="dark" bg-color="#1D2027" width="439" height="596">
          <p class="text-900-16 gray mt-6 text-center">
            {{ t("vip.roulette_bonus.help_menu.title_text") }}
          </p>
          <p class="text-400-12 gray mt-4 mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_1") }}
          </p>
          <p class="text-400-12 gray mt-4 mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_2") }}
          </p>
          <p class="text-900-12 gray mt-4 mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_3") }}
          </p>
          <p class="text-400-12 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_4") }}
          </p>
          <p class="text-400-12 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_5") }}
          </p>
          <p class="text-400-12 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_6") }}
          </p>
          <p class="text-900-12 gray mt-4 mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_7") }}
          </p>
          <p class="text-400-12 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_8") }}
          </p>
          <p class="text-400-12 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_9") }}
          </p>
          <p class="text-400-12 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_10") }}
          </p>
        </v-list>
      </v-menu>
      <v-btn
        class="roulette-bonus-dialog-close-bg mr-4"
        icon="true"
        width="34"
        height="34"
        @click="emit('closeRouletteBonusDialog')"
      >
        <div class="roulette-bonus-dialog-close-bg-2">
          <img
            src="@/assets/public/svg/icon_public_52.svg"
            width="18"
            class="roulette-bonus-dialog-close-position"
          />
        </div>
      </v-btn>
    </div>
    <div class="roulette-bonus-dialog-body">
      <img
        src="@/assets/vip/image/img_vip_31.png"
        width="428"
        class="roulette-bonus-dialog-spin-position"
      />

      <!---------------- roulette module ----------------->
      <div class="roulette-bonus-dialog-spin-position-1" ref="roulette">
        <img src="@/assets/vip/image/img_vip_30.png" width="248" />
        <p class="text-900-14 white roulette-bonus-dialog-spin-text-position-1">
          {{ wheelMap[0].value }}
        </p>
        <p class="text-900-14 white roulette-bonus-dialog-spin-text-position-8">
          {{ wheelMap[1].value }}
        </p>
        <p class="text-900-14 white roulette-bonus-dialog-spin-text-position-7">
          {{ wheelMap[2].value }}
        </p>
        <p class="text-900-14 white roulette-bonus-dialog-spin-text-position-6">
          {{ wheelMap[3].value }}
        </p>
        <p class="text-900-14 white roulette-bonus-dialog-spin-text-position-5">
          {{ wheelMap[4].value }}
        </p>
        <p class="text-900-14 white roulette-bonus-dialog-spin-text-position-4">
          {{ wheelMap[5].value }}
        </p>
        <p class="text-900-14 white roulette-bonus-dialog-spin-text-position-3">
          {{ wheelMap[6].value }}
        </p>
        <p class="text-900-14 white roulette-bonus-dialog-spin-text-position-2">
          {{ wheelMap[7].value }}
        </p>
      </div>

      <img
        src="@/assets/vip/image/img_vip_28.png"
        width="52"
        class="roulette-bonus-dialog-spin-position-2"
      />
      <img
        src="@/assets/vip/image/img_vip_29.png"
        width="70"
        class="roulette-bonus-dialog-spin-position-3"
      />
      <div class="roulette-bonus-dialog-body-1">
        <p class="text-900-18 white mt-4 text-center">
          {{ t("vip.roulette_bonus.paid_text") }}
        </p>
        <p class="text-900-28 yellow mt-3 text-center">{{ roulettePaidBonus }}</p>
      </div>
      <v-btn
        class="button-bright text-none roulette-bonus-dialog-body-2"
        width="423"
        height="48"
        @click="startRoulette"
        :disabled="isSpinning || spinNumber <= 0"
      >
        {{ t("vip.roulette_bonus.roulette_btn_text") }}
        <div class="roulette-bonus-dialog-spin-number-bg">
          <p class="text-900-16 white">{{ spinNumber }}</p>
        </div>
      </v-btn>
      <div class="roulette-bonus-dialog-body-3">
        <div class="my-1">
          <v-row
            v-for="(item, index) in rouletteHistory"
            :key="index"
            class="ma-0 mx-4 pa-0"
          >
            <v-col cols="5" class="pa-1 ma-0 text-500-10 gray">{{
              item.rouletteTime
            }}</v-col>
            <v-col cols="4" class="pa-1 ma-0 text-500-10 gray">{{ item.user }}</v-col>
            <v-col
              cols="3"
              class="pa-1 ma-0 text-500-10 yellow"
              v-if="item.rouletteResult == 'IPHONE 14'"
              >{{ item.rouletteResult }}</v-col
            >
            <v-col
              cols="3"
              class="pa-1 ma-0 text-500-10 white"
              v-else-if="
                item.rouletteResult == 'R$ 5000' ||
                item.rouletteResult == 'R$ 500' ||
                item.rouletteResult == 'R$ 50'
              "
              >{{ item.rouletteResult }}</v-col
            >
            <v-col cols="3" class="pa-1 ma-0 text-500-10 gray" v-else>{{
              item.rouletteResult
            }}</v-col>
          </v-row>
        </div>
      </div>
      <v-btn
        class="text-none roulette-bonus-dialog-body-4"
        width="170"
        height="36"
        @click="showWinnerBody"
      >
        {{ t("vip.roulette_bonus.victory_btn_text") }}
        <v-icon style="font-size: 20px" class="mt-1" v-if="winnerBodyShow"
          >mdi-chevron-down</v-icon
        >
        <v-icon style="font-size: 20px" class="mt-1" v-else>mdi-chevron-up</v-icon>
      </v-btn>
    </div>
    <div
      class="roulette-bonus-dialog-winner-body"
      :style="{ height: winnerBodyHeight + 'px' }"
    >
      <div class="victory-toggle">
        <input type="checkbox" id="victory-toggle" v-model="winnerToggleSwitch" />
        <label for="victory-toggle">
          <div class="winner">
            <p>{{ t("vip.roulette_bonus.winner_text") }}</p>
          </div>
          <div class="prize">
            <p>{{ t("vip.roulette_bonus.prize_winner_text") }}</p>
          </div>
        </label>
      </div>
      <div class="roulette-bonus-dialog-winner-content">
        <div class="my-2" v-if="!winnerToggleSwitch">
          <v-row
            v-for="(winnerItem, winnerIndex) in rouletteWinnerHistory"
            :key="winnerIndex"
            class="ma-0 mx-4 pa-0"
          >
            <v-col cols="5" class="pa-1 ma-0 text-500-10 gray">{{
              winnerItem.rouletteTime
            }}</v-col>
            <v-col cols="4" class="pa-1 ma-0 text-500-10 gray">{{
              winnerItem.user
            }}</v-col>
            <v-col
              cols="3"
              class="pa-1 ma-0 text-500-10 yellow"
              v-if="winnerItem.rouletteResult == 'IPHONE 14'"
              >{{ winnerItem.rouletteResult }}</v-col
            >
            <v-col
              cols="3"
              class="pa-1 ma-0 text-500-10 white"
              v-else-if="winnerItem.rouletteResult == 'R$ 5000'"
            >
              {{ winnerItem.rouletteResult }}
            </v-col>
            <v-col cols="3" class="pa-1 ma-0 text-500-10 gray" v-else>{{
              winnerItem.rouletteResult
            }}</v-col>
          </v-row>
        </div>
        <div class="my-2" v-else>
          <v-row
            v-for="(prizeItem, prizeIndex) in roulettePrizeHistory"
            :key="prizeIndex"
            class="ma-0 mx-4 pa-0"
          >
            <v-col cols="5" class="pa-1 ma-0 text-500-10 gray">{{
              prizeItem.rouletteTime
            }}</v-col>
            <v-col cols="4" class="pa-1 ma-0 text-500-10 gray">{{
              prizeItem.user
            }}</v-col>
            <v-col
              cols="3"
              class="pa-1 ma-0 text-500-10 yellow"
              v-if="prizeItem.rouletteResult == 'IPHONE 14'"
              >{{ prizeItem.rouletteResult }}</v-col
            >
            <v-col
              cols="3"
              class="pa-1 ma-0 text-500-10 white"
              v-else-if="
                prizeItem.rouletteResult == 'R$ 5000' ||
                prizeItem.rouletteResult == 'R$ 500' ||
                prizeItem.rouletteResult == 'R$ 50'
              "
              >{{ prizeItem.rouletteResult }}</v-col
            >
            <v-col cols="3" class="pa-1 ma-0 text-500-10 gray" v-else>{{
              prizeItem.rouletteResult
            }}</v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.roulette-bonus-help-menu {
  left: 50% !important;
  transform: translateX(-50%) !important;
}

.roulette-bonus-help-menu::after {
  content: "";
  position: absolute;
  align-self: center;
  float: right;
  top: -36px;
  right: 60px;
  border: 21px solid #1D2027;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-width: 10px;
  border-left-width: 10px;
}

.roulette-bonus-dialog-container {
  height: 619px;
  border-radius: 0px 0px 24px 24px;
  background: linear-gradient(180deg, #2c2744 0%, #693ff6 100%);
  position: relative;

  .roulette-bonus-dialog-header-left {
    display: flex;
    align-items: center;
    width: 180px;
    position: absolute;
    left: 0;
    top: -46px;
    height: 46px;
    border-radius: 16px 16px 0px 0px;
    background: #29263c;

    .roulette-bonus-dialog-sound-bg-1 {
      background: #1D2027;
      border-radius: 34px;
      position: relative;
      z-index: 2000;
    }

    .roulette-bonus-dialog-sound-bg-2 {
      width: 28px;
      height: 28px;
      background: #1D2027;
      border-radius: 28px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .roulette-bonus-dialog-sound-position {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .roulette-bonus-dialog-header-right {
    width: 180px;
    position: absolute;
    right: 0;
    top: -46px;
    height: 46px;
    border-radius: 16px 16px 0px 0px;
    background: #29263c;
    display: flex;
    align-items: center;
    justify-content: end;

    .roulette-bonus-dialog-help-bg {
      background: #1D2027;
      border-radius: 34px;
      position: relative;
      z-index: 2000;
    }

    .roulette-bonus-dialog-help-bg-2 {
      width: 28px;
      height: 28px;
      background: #1D2027;
      border-radius: 28px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .roulette-bonus-dialog-help-position {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .roulette-bonus-dialog-close-bg {
      background: #1D2027;
      border-radius: 34px;
      position: relative;
      z-index: 2000;
    }

    .roulette-bonus-dialog-close-bg-2 {
      width: 28px;
      height: 28px;
      background: #1D2027;
      border-radius: 28px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .roulette-bonus-dialog-close-position {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .roulette-bonus-dialog-body {
    position: relative;

    .roulette-bonus-dialog-spin-position {
      position: absolute;
      top: -62px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
    }

    .roulette-bonus-dialog-spin-position-1 {
      width: 248px;
      height: 248px;
      position: absolute;
      top: -28px;
      left: 114px;
      z-index: 21;
    }

    .roulette-bonus-dialog-spin-text-position-1 {
      position: absolute;
      top: 46px;
      left: 98px;
      transform: rotate(90deg);
    }

    .roulette-bonus-dialog-spin-text-position-2 {
      position: absolute;
      top: 60px;
      left: 50px;
      transform: rotate(45deg);
    }

    .roulette-bonus-dialog-spin-text-position-3 {
      position: absolute;
      top: 116px;
      left: 18px;
    }

    .roulette-bonus-dialog-spin-text-position-4 {
      position: absolute;
      top: 173px;
      left: 47px;
      transform: rotate(-45deg);
    }

    .roulette-bonus-dialog-spin-text-position-5 {
      position: absolute;
      top: 187px;
      left: 103px;
      transform: rotate(-90deg);
    }

    .roulette-bonus-dialog-spin-text-position-6 {
      position: absolute;
      top: 169px;
      left: 160px;
      transform: rotate(-135deg);
    }

    .roulette-bonus-dialog-spin-text-position-7 {
      position: absolute;
      top: 114px;
      left: 185px;
    }

    .roulette-bonus-dialog-spin-text-position-8 {
      position: absolute;
      top: 59px;
      left: 166px;
      transform: rotate(135deg);
    }

    .roulette-bonus-dialog-spin-position-2 {
      position: absolute;
      top: -35px;
      left: 212px;
      z-index: 22;
    }

    .roulette-bonus-dialog-spin-position-3 {
      position: absolute;
      top: 61px;
      left: 203px;
      z-index: 22;
    }

    .roulette-bonus-dialog-body-1 {
      position: absolute;
      top: 280px;
      left: 51%;
      transform: translateX(-50%);
      width: 423px;
      height: 100px;
      border-radius: 10px;
      background: #1D2027;
      /* Text Box */
      box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
    }

    .roulette-bonus-dialog-body-2 {
      position: absolute;
      top: 394px;
      left: 51%;
      transform: translateX(-50%);

      .v-btn__content {
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
      }

      .roulette-bonus-dialog-spin-number-bg {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        flex-shrink: 0;
        background: #1D2027;
        border-radius: 30px;
      }
    }

    .roulette-bonus-dialog-body-3 {
      overflow-y: auto;
      position: absolute;
      top: 456px;
      left: 51%;
      transform: translateX(-50%);
      width: 423px;
      height: 100px;
      border-radius: 10px;
      background: #1D2027;
      /* Text Box */
      box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
    }

    .roulette-bonus-dialog-body-4 {
      border-radius: 8px;
      border: 1px solid #693ff8;
      background: #15161C;
      box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
      position: absolute;
      top: 568px;
      left: 51%;
      transform: translateX(-50%);
      z-index: 2;

      .v-btn__content {
        color: #fff;
        text-align: center;
        font-family: Inter;
        font-size: 10px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }

  .roulette-bonus-dialog-winner-body {
    width: 100%;
    border-radius: 24px;
    background: #1D2027;
    position: absolute;
    bottom: 0;
    z-index: 1;
    transition: height 0.3s ease-out;
    overflow: hidden;

    // winner and prize toggle switch
    .victory-toggle {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);

      label {
        width: 439px;
        height: 48px;
        position: relative;
        display: block;
        border-radius: 50px;
        background: #1D2027;
        box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
        cursor: pointer;
        transition: 0.3s;
        margin: auto;

        div {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 14px;
        }

        .winner {
          left: 80px;
          transition: 0.3s;
          color: black;
        }

        .prize {
          left: 268px;
          transition: 0.3s;
          color: #7782aa;
        }
      }

      label:after {
        content: "";
        width: 214px;
        height: 40px;
        position: absolute;
        top: 4px;
        left: 4px;
        background: #009B3A;
        border-radius: 20px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
      }

      input {
        width: 0;
        height: 0;
        visibility: hidden;
      }

      input:checked + label:after {
        left: 434px;
        transform: translateX(-100%);
      }

      label:active:after {
        width: 214px;
      }

      input:checked + label .winner {
        color: #7782aa;
      }

      input:checked + label .prize {
        color: black;
      }
    }

    .roulette-bonus-dialog-winner-content {
      position: absolute;
      top: 70px;
      left: 50%;
      transform: translateX(-50%);
      width: 439px;
      height: 212px;
      border-radius: 8px;
      background: #1D2027;
      /* Text Box */
      box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
      overflow-y: auto;
    }
  }
}
</style>
