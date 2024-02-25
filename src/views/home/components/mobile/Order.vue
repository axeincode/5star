<script setup lang="ts">
import { ref, computed, watch, onMounted, watchEffect, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { refferalStore } from "@/store/refferal";
import { storeToRefs } from "pinia";
import { depositStore } from "@/store/deposit";
import { useTimer } from "vue-timer-hook";

const { t } = useI18n();
const { setDepositConfirmDialogToggle } = depositStore();
const { setDepositOrderDialog } = depositStore();
const { setTimerValue } = depositStore();

const timer_value = ref<number>(3600);

const time = new Date();
time.setSeconds(time.getSeconds() + timer_value.value); // 1hour timer

const timer = useTimer(Number(time));
timer.start();

const depositOrderDialog = ref<boolean>(false);

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});
const depositOrderDialogToggle = computed(() => {
  const { getDepositOrderDialog } = storeToRefs(depositStore());
  return getDepositOrderDialog.value;
});
const depositOrderTimeRefresh = computed(() => {
  const { getDepositOrderTimeRefresh } = storeToRefs(depositStore());
  return getDepositOrderTimeRefresh.value;
});
const openDepositConfirmDialog = () => {
  setDepositConfirmDialogToggle(true);
  setTimerValue(timer.minutes.value * 60 + timer.seconds.value);
};
const closeDepositOrderDialog = () => {
  setTimerValue(0);
  localStorage.removeItem("spei");
  localStorage.removeItem("timer");
  depositOrderDialog.value = false;
  setDepositOrderDialog(false);
};
watch(depositOrderTimeRefresh, (value) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer_value.value); // 1hour timer
  timer.restart(Number(time));
});
watch(depositOrderDialogToggle, (value) => {
  depositOrderDialog.value = value;
});
watch(
  [timer.minutes, timer.seconds],
  (newMinutes, newSeconds) => {
    if (timer.minutes.value != 0 && timer.seconds.value != 0) {
      localStorage.setItem(
        "timer",
        (Number(timer.minutes.value) * 60 + Number(timer.seconds.value)).toString()
      );
    }
  },
  { immediate: true }
);
onMounted(() => {
  watchEffect(async () => {
    if (timer.isExpired.value) {
      setTimerValue(0);
      localStorage.removeItem("spei");
      localStorage.removeItem("timer");
      depositOrderDialog.value = false;
      setDepositConfirmDialogToggle(false);
    }
  });
  const speiValue = localStorage.getItem("spei");
  if (speiValue !== null) {
    depositOrderDialog.value = true;
  }
  const timerValue = localStorage.getItem("timer");
  if (timerValue !== null) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + Number(timerValue));
    timer.restart(Number(time));
  }
});
// onBeforeUnmount(() => {
//   localStorage.setItem("timer", timer.minutes.value.toString());
// });
</script>

<template>
  <div
    v-if="depositOrderDialog"
    class="m-order-container px-4"
    :style="[refferalAppBarShow ? 'top: 92px' : 'top: 60px']"
  >
    <v-row class="ma-0 pa-0 align-center" style="height: 48px">
      <v-col cols="7" class="pa-0">
        <div class="text-700-14 white">{{ t("order_dialog.text_1") }}</div>
        <div class="text-700-10 color-15161C">
          {{ t("order_dialog.text_2") }}{{ timer.minutes }}:{{ timer.seconds }}
        </div>
      </v-col>
      <v-col cols="4" class="pa-0 text-center">
        <v-btn
          class="m-order-continue-btn"
          width="74"
          height="32"
          @click="openDepositConfirmDialog"
        >
          {{ t("order_dialog.text_3") }}
        </v-btn>
      </v-col>
      <v-col cols="1" class="pa-0 text-right">
        <v-btn
          class="m-order-close-btn"
          :icon="true"
          width="24"
          height="24"
          @click="closeDepositOrderDialog"
        >
          <img src="@/assets/public/svg/icon_public_10.svg" />
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
.m-order-container {
  margin-left: -8px;
  position: fixed;
  width: 100vw;
  height: 48px;
  border-radius: 0px 0px 8px 8px;
  background: linear-gradient(90deg, #1ac37a 0%, #2896e6 100%);
  z-index: 1000;

  .m-order-continue-btn {
    background: #f9bc01;
    box-shadow: 0px 4px 6px 1px #0000004d;

    .v-btn__content {
      font-family: unset;
      font-size: 10px;
      font-weight: 700;
      color: #000000;
    }
  }

  .m-order-close-btn {
    background: none !important;
    box-shadow: none !important;
  }
}
</style>
