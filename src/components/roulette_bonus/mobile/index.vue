<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from "vuetify";
import { type GetRouletteHistory } from '@/interface/vip';
import anime, { AnimeInstance } from "animejs";
import { gameStore } from '@/store/game';
import { storeToRefs } from 'pinia';
import moment from "moment-timezone";

const emit = defineEmits<{ (e: 'closeRouletteBonusDialog'): void }>()
const { t } = useI18n();
const { width } = useDisplay()
const { dispatchUserSpinPage, dispatchUserSpin } = gameStore();

const roulettePaidBonus = ref<string>("R$ 1.400.000");
const winnerBodyHeight = ref<number>(0);
const winnerBodyShow = ref<boolean>(false);
const winnerToggleSwitch = ref<boolean>(false);
const marginShow = ref<boolean>(false);
const muteValue = ref<boolean>(false);

const rouletteHistory = computed(() => {
  const { getUserSpinPage } = storeToRefs(gameStore());
  return getUserSpinPage.value.award_record?.slice(0, 4);
})

const rouletteWinnerHistory = computed(() => {
  const { getUserSpinPage } = storeToRefs(gameStore());
  return getUserSpinPage.value.award_record || [];
})

const roulettePrizeHistory = computed(() => {
  const { getUserSpinPage } = storeToRefs(gameStore());
  return getUserSpinPage.value.big_award_record || [];
})

const wheelMap = computed(() => {
  const { getUserSpinPage } = storeToRefs(gameStore());
  return getUserSpinPage.value.award || [];
})

// roulette variables
const isSpinning = ref<boolean>(false);
const roulette = ref<HTMLElement | undefined>(undefined);

const startRoulette = async() => {
    await dispatchUserSpin()
    isSpinning.value = true;
    let duration_speed = 10000;
    let newRotaion = 8 * 360  - (comUserSpin.value.index * 45)
    const animation = anime({
        targets: roulette.value,
        rotate: function () {
            return newRotaion;
        },
        duration: function () {
            return duration_speed;
        },
        loop: 1,
        easing: 'easeInOutQuad',
        complete: (...args) => {
            isSpinning.value = false;
            setTimeout(() => {
              roulette.value.style.transform = 'rotate(0)'
            }, 1000);
            dispatchUserSpinPage()
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
    winnerBodyHeight.value = winnerBodyShow.value ? 255 : 0;
}

const handleMuteValue = () => {
    muteValue.value = !muteValue.value;
}

const comUserSpin = computed(() => {
  const { getUserSpin } = storeToRefs(gameStore());
  if (getUserSpin.value) {
    return getUserSpin.value;
  }
  return {}
})
const comUserSpinPage = computed(() => {
  const { getUserSpinPage } = storeToRefs(gameStore());
  if (getUserSpinPage.value) {
    return getUserSpinPage.value;
  }
  return {}
});

const initUserSpinPage = async() => {
  await dispatchUserSpinPage({})
}

onMounted(() => {
    if (window.innerHeight <= 667) {
        marginShow.value = true;
    }
    initUserSpinPage()
})
</script>

<template>
  <div
    class="m-roulette-bonus-dialog-container"
    :class="marginShow ? 'm-roulette-bonus-dialog-margin' : ''"
  >
    <div class="m-roulette-bonus-dialog-header-left">
      <v-btn
        class="m-roulette-bonus-dialog-sound-bg-1 ml-4"
        icon="true"
        width="34"
        height="34"
        @click="handleMuteValue"
      >
        <div class="m-roulette-bonus-dialog-sound-bg-2">
          <img
            src="@/assets/public/svg/icon_public_46.svg"
            width="18"
            class="m-roulette-bonus-dialog-sound-position"
            v-if="muteValue == false"
          />
          <img
            src="@/assets/public/svg/icon_public_47.svg"
            width="18"
            class="m-roulette-bonus-dialog-sound-position"
            v-else
          />
        </div>
      </v-btn>
    </div>
    <div class="m-roulette-bonus-dialog-header-right">
      <v-menu offset="10" content-class="m-roulette-bonus-help-menu" :scrim="false">
        <template v-slot:activator="{ props }">
          <v-btn
            class="m-roulette-bonus-dialog-help-bg mr-4"
            v-bind="props"
            icon="true"
            width="34"
            height="34"
          >
            <div class="m-roulette-bonus-dialog-help-bg-2">
              <img
                src="@/assets/public/svg/icon_public_22.svg"
                width="18"
                class="m-roulette-bonus-dialog-help-position"
              />
            </div>
          </v-btn>
        </template>
        <v-list theme="dark" bg-color="#1D2027" width="324" height="435">
          <p class="text-900-14 gray mt-4 text-center">
            {{ t("vip.roulette_bonus.help_menu.title_text") }}
          </p>
          <p class="text-400-10 gray mt-4 mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_1") }}
          </p>
          <p class="text-400-10 gray mt-3 mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_2") }}
          </p>
          <p class="text-900-10 gray mt-3 mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_3") }}
          </p>
          <p class="text-400-10 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_4") }}
          </p>
          <p class="text-400-10 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_5") }}
          </p>
          <p class="text-400-10 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_6") }}
          </p>
          <p class="text-900-10 gray mt-3 mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_7") }}
          </p>
          <p class="text-400-10 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_8") }}
          </p>
          <p class="text-400-10 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_9") }}
          </p>
          <p class="text-400-10 gray mx-6">
            {{ t("vip.roulette_bonus.help_menu.text_10") }}
          </p>
        </v-list>
      </v-menu>
      <v-btn
        class="m-roulette-bonus-dialog-close-bg mr-4"
        icon="true"
        width="34"
        height="34"
        @click="emit('closeRouletteBonusDialog')"
      >
        <div class="m-roulette-bonus-dialog-close-bg-2">
          <img
            src="@/assets/public/svg/icon_public_52.svg"
            width="18"
            class="m-roulette-bonus-dialog-close-position"
          />
        </div>
      </v-btn>
    </div>
    <div class="m-roulette-bonus-dialog-body">
      <img
        src="@/assets/vip/image/img_vip_31.png"
        width="316"
        class="m-roulette-bonus-dialog-spin-position"
      />

      <!---------------- roulette module ----------------->
      <div class="m-roulette-bonus-dialog-spin-position-1" ref="roulette">
        <img src="@/assets/vip/image/img_vip_30.png" width="184" />
        <p class="text-900-10 white m-roulette-bonus-dialog-spin-text-position-1">
          {{ wheelMap[0]?.name }}
        </p>
        <p class="text-900-10 white m-roulette-bonus-dialog-spin-text-position-8">
          {{ wheelMap[1]?.name }}
        </p>
        <p class="text-900-10 white m-roulette-bonus-dialog-spin-text-position-7">
          {{ wheelMap[2]?.name }}
        </p>
        <p class="text-900-10 white m-roulette-bonus-dialog-spin-text-position-6">
          {{ wheelMap[3]?.name }}
        </p>
        <p class="text-900-10 white m-roulette-bonus-dialog-spin-text-position-5">
          {{ wheelMap[4]?.name }}
        </p>
        <p class="text-900-10 white m-roulette-bonus-dialog-spin-text-position-4">
          {{ wheelMap[5]?.name }}
        </p>
        <p class="text-900-10 white m-roulette-bonus-dialog-spin-text-position-3">
          {{ wheelMap[6]?.name }}
        </p>
        <p class="text-900-10 white m-roulette-bonus-dialog-spin-text-position-2">
          {{ wheelMap[7]?.name }}
        </p>
      </div>

      <img
        src="@/assets/vip/image/img_vip_28.png"
        width="38"
        class="m-roulette-bonus-dialog-spin-position-2"
      />
      <img
        src="@/assets/vip/image/img_vip_29.png"
        width="52"
        class="m-roulette-bonus-dialog-spin-position-3"
      />
      <div class="m-roulette-bonus-dialog-body-1">
        <p class="text-900-14 white mt-2 text-center">
          {{ t("vip.roulette_bonus.paid_text") }}
        </p>
        <p class="text-900-20 yellow text-center">{{ roulettePaidBonus }}</p>
      </div>
      <v-btn
        class="button-bright text-none m-roulette-bonus-dialog-body-2"
        width="311"
        height="40"
        @click="startRoulette"
        :disabled="isSpinning || comUserSpinPage.free_spins <= 0"
      >
        {{ t("vip.roulette_bonus.roulette_btn_text") }}
        <div class="m-roulette-bonus-dialog-spin-number-bg">
          <p class="text-800-14 white">{{ comUserSpinPage.free_spins }}</p>
        </div>
      </v-btn>
      <div class="m-roulette-bonus-dialog-body-3">
        <div class="my-1">
          <v-row
            v-for="(item, index) in rouletteHistory"
            :key="index"
            class="ma-0 mx-2 pa-0"
          >
            <v-col
              cols="5"
              class="px-1 ma-0 text-500-9 gray"
              style="padding-top: 2px; padding-bottom: 2px"
              >{{ moment(item.created_at * 1000).format("YYYY-MM-DD HH:mm:ss") }}</v-col
            >
            <v-col
              cols="4"
              class="px-1 ma-0 text-500-9 gray"
              style="padding-top: 2px; padding-bottom: 2px"
              >{{ item.user_name }}</v-col
            >
            <v-col
              cols="3"
              class="px-1 ma-0 text-900-9 gray"
              style="padding-top: 2px; padding-bottom: 2px"
              >{{ item.name }}</v-col
            >
            <!-- <v-col
              cols="3"
              class="px-1 ma-0 text-500-9 yellow"
              v-if="item.rouletteResult == 'IPHONE 14'"
              style="padding-top: 2px; padding-bottom: 2px"
              >{{ item.rouletteResult }}</v-col
            >
            <v-col
              cols="3"
              class="px-1 ma-0 text-900-9 white"
              style="padding-top: 2px; padding-bottom: 2px"
              v-else-if="
                item.rouletteResult == 'R$ 5000' ||
                item.rouletteResult == 'R$ 500' ||
                item.rouletteResult == 'R$ 50'
              "
              >{{ item.rouletteResult }}</v-col
            >
            <v-col
              cols="3"
              class="px-1 ma-0 text-900-9 gray"
              v-else
              style="padding-top: 2px; padding-bottom: 2px"
              >{{ item.rouletteResult }}</v-col
            > -->
          </v-row>
        </div>
      </div>
      <v-btn
        class="text-none m-roulette-bonus-dialog-body-4"
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
      class="m-roulette-bonus-dialog-winner-body"
      :style="{ height: winnerBodyHeight + 'px' }"
    >
      <div class="m-victory-toggle">
        <input type="checkbox" id="m-victory-toggle" v-model="winnerToggleSwitch" />
        <label for="m-victory-toggle">
          <div class="winner">
            <p class="text-700-10">{{ t("vip.roulette_bonus.winner_text") }}</p>
          </div>
          <div class="prize">
            <p class="text-700-10">{{ t("vip.roulette_bonus.prize_winner_text") }}</p>
          </div>
        </label>
      </div>
      <div class="m-roulette-bonus-dialog-winner-content">
        <div class="my-2" v-if="!winnerToggleSwitch">
          <v-row
            v-for="(winnerItem, winnerIndex) in rouletteWinnerHistory"
            :key="winnerIndex"
            class="ma-0 mx-2 pa-0"
          >
            <v-col cols="5" class="pa-1 ma-0 text-500-10 gray">{{
              moment(winnerItem.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}</v-col>
            <v-col cols="4" class="pa-1 ma-0 text-500-10 gray">{{
              winnerItem.user_name
            }}</v-col>
            <v-col cols="3" class="pa-1 ma-0 text-500-10 gray">{{
              winnerItem.name
            }}</v-col>
            <!-- <v-col
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
            }}</v-col> -->
          </v-row>
        </div>
        <div class="my-2" v-else>
          <v-row
            v-for="(prizeItem, prizeIndex) in roulettePrizeHistory"
            :key="prizeIndex"
            class="ma-0 mx-2 pa-0"
          >
            <v-col cols="5" class="pa-1 ma-0 text-500-10 gray">{{
              moment(prizeItem.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}</v-col>
            <v-col cols="4" class="pa-1 ma-0 text-500-10 gray">{{
              prizeItem.user_name
            }}</v-col>
            <v-col cols="3" class="pa-1 ma-0 text-500-10 gray">{{
              prizeItem.name
            }}</v-col>
            <!-- <v-col
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
            }}</v-col> -->
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-roulette-bonus-help-menu {
  left: 50% !important;
  transform: translateX(-50%) !important;
}

.m-roulette-bonus-help-menu::after {
  content: "";
  position: absolute;
  align-self: center;
  float: right;
  top: -30px;
  right: 70px;
  border: 17px solid #1D2027;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-width: 6px;
  border-left-width: 6px;
}

.m-roulette-bonus-dialog-margin {
  margin-top: 80px;
}

.m-roulette-bonus-dialog-container {
  width: 340px;
  height: 447px;
  border-radius: 0px 0px 24px 24px;
  background: linear-gradient(180deg, #2c2744 0%, #693ff6 100%);
  position: relative;

  .m-roulette-bonus-dialog-header-left {
    display: flex;
    align-items: center;
    width: 138px;
    position: absolute;
    left: 0;
    top: -46px;
    height: 46px;
    border-radius: 16px 16px 0px 0px;
    background: #29263c;

    .m-roulette-bonus-dialog-sound-bg-1 {
      background: #1D2027;
      border-radius: 34px;
      position: relative;
      z-index: 2000;
    }

    .m-roulette-bonus-dialog-sound-bg-2 {
      width: 28px;
      height: 28px;
      background: #1D2027;
      border-radius: 28px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .m-roulette-bonus-dialog-sound-position {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .m-roulette-bonus-dialog-header-right {
    width: 138px;
    position: absolute;
    right: 0;
    top: -46px;
    height: 46px;
    border-radius: 16px 16px 0px 0px;
    background: #29263c;
    display: flex;
    align-items: center;
    justify-content: end;

    .m-roulette-bonus-dialog-help-bg {
      background: #1D2027;
      border-radius: 34px;
      position: relative;
      z-index: 2000;
    }

    .m-roulette-bonus-dialog-help-bg-2 {
      width: 28px;
      height: 28px;
      background: #1D2027;
      border-radius: 28px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .m-roulette-bonus-dialog-help-position {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .m-roulette-bonus-dialog-close-bg {
      background: #1D2027;
      border-radius: 34px;
      position: relative;
      z-index: 2000;
    }

    .m-roulette-bonus-dialog-close-bg-2 {
      width: 28px;
      height: 28px;
      background: #1D2027;
      border-radius: 28px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .m-roulette-bonus-dialog-close-position {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .m-roulette-bonus-dialog-body {
    position: relative;

    .m-roulette-bonus-dialog-spin-position {
      position: absolute;
      top: -56px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
    }

    .m-roulette-bonus-dialog-spin-position-1 {
      width: 184px;
      height: 184px;
      position: absolute;
      top: -32px;
      left: 80px;
      z-index: 21;
    }

    .m-roulette-bonus-dialog-spin-text-position-1 {
      position: absolute;
      top: 34px;
      left: 76px;
      transform: rotate(90deg);
    }

    .m-roulette-bonus-dialog-spin-text-position-2 {
      position: absolute;
      top: 49px;
      left: 40px;
      transform: rotate(45deg);
    }

    .m-roulette-bonus-dialog-spin-text-position-3 {
      position: absolute;
      top: 85px;
      left: 24px;
    }

    .m-roulette-bonus-dialog-spin-text-position-4 {
      position: absolute;
      top: 124px;
      left: 38px;
      transform: rotate(-45deg);
    }

    .m-roulette-bonus-dialog-spin-text-position-5 {
      position: absolute;
      top: 138px;
      left: 78px;
      transform: rotate(-90deg);
    }

    .m-roulette-bonus-dialog-spin-text-position-6 {
      position: absolute;
      top: 122px;
      left: 116px;
      transform: rotate(-135deg);
    }

    .m-roulette-bonus-dialog-spin-text-position-7 {
      position: absolute;
      top: 84px;
      left: 132px;
    }

    .m-roulette-bonus-dialog-spin-text-position-8 {
      position: absolute;
      top: 45px;
      left: 114px;
      transform: rotate(135deg);
    }

    .m-roulette-bonus-dialog-spin-position-2 {
      position: absolute;
      top: -36px;
      left: 153px;
      z-index: 22;
    }

    .m-roulette-bonus-dialog-spin-position-3 {
      position: absolute;
      top: 34px;
      left: 146px;
      z-index: 22;
    }

    .m-roulette-bonus-dialog-body-1 {
      position: absolute;
      top: 198px;
      left: 51%;
      transform: translateX(-50%);
      width: 312px;
      height: 60px;
      border-radius: 10px;
      background: #1D2027;
      /* Text Box */
      box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
    }

    .m-roulette-bonus-dialog-body-2 {
      position: absolute;
      top: 267px;
      left: 51%;
      transform: translateX(-50%);

      .v-btn__content {
        text-align: center;
        font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
      }

      .m-roulette-bonus-dialog-spin-number-bg {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        width: 26px;
        height: 26px;
        flex-shrink: 0;
        background: #1D2027;
        border-radius: 30px;
      }
    }

    .m-roulette-bonus-dialog-body-3 {
      overflow-y: auto;
      position: absolute;
      top: 314px;
      left: 51%;
      transform: translateX(-50%);
      width: 312px;
      height: 82px;
      border-radius: 10px;
      background: #1D2027;
      /* Text Box */
      box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
    }

    .m-roulette-bonus-dialog-body-4 {
      border-radius: 8px;
      border: 1px solid #693ff8;
      background: #15161C;
      box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
      position: absolute;
      top: 402px;
      left: 51%;
      transform: translateX(-50%);
      z-index: 2;

      .v-btn__content {
        color: #fff;
        text-align: center;
        font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
        font-size: 10px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: normal;
      }
    }
  }

  .m-roulette-bonus-dialog-winner-body {
    width: 100%;
    border-radius: 24px;
    background: #1D2027;
    position: absolute;
    bottom: 0;
    z-index: 1;
    transition: height 0.2s ease-out;
    overflow: hidden;

    // winner and prize toggle switch
    .m-victory-toggle {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);

      label {
        width: 312px;
        height: 32px;
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
          left: 52px;
          transition: 0.3s;
          color: black;
        }

        .prize {
          right: 27px;
          transition: 0.3s;
          color: #7782aa;
        }
      }

      label:after {
        content: "";
        width: 140px;
        height: 28px;
        position: absolute;
        top: 2px;
        left: 2px;
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
        left: 169px;
        // transform: translateX(-100%);
      }

      label:active:after {
        width: 140px;
      }

      input:checked + label .winner {
        color: #7782aa;
      }

      input:checked + label .prize {
        color: black;
      }
    }

    .m-roulette-bonus-dialog-winner-content {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      width: 312px;
      height: 153px;
      border-radius: 8px;
      background: #1D2027;
      /* Text Box */
      box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
      overflow-y: auto;
    }
  }
}
</style>
