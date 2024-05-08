<script lang="ts" setup>
import { ref, computed,onMounted,watchEffect,onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { vipStore } from "@/store/vip";
import { promoStore } from "@/store/promo";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { appBarStore } from "@/store/appBar";
import { useTimer } from "vue-timer-hook";
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const { t } = useI18n();
const router = useRouter();
const emit = defineEmits<{ (e: "closeGetBonusDialog"): void }>();
const { setDepositWithdrawToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setTimerValue } = vipStore();
const timer_value = ref<number>(600);
const time = new Date();
time.setSeconds(time.getSeconds() + timer_value.value); // 10分钟
const timer = useTimer(Number(time));
const { dispatchUserActivityList } = promoStore();

const timerValue = computed(() => {
  const { getTimerValue } = storeToRefs(vipStore());
  return getTimerValue.value;
});

const promoList = computed(() => {
  const { getUserActivityList } = storeToRefs(promoStore());
  return getUserActivityList.value;
});

const depositDialogShow = () => {
  emit("closeGetBonusDialog");
  setDepositWithdrawToggle(true);
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
};

// 点击图片调整活动详情页
const jumpActivityDetails=()=>{
  router.push({name: "Promo_Detail",query:{id:promoList.value.group_data[0].list_data[0].id}})
  emit("closeGetBonusDialog");
}

onMounted(async()=>{
  if (timerValue.value == 0) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timer_value.value); // 10分钟
    timer.start();
  } else {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerValue.value);
    timer.restart(Number(time));
  }
  watchEffect(async () => {
    if (timer.isExpired.value) {
      setTimerValue(time.getSeconds() + timer_value.value);
    }
  });
  await dispatchUserActivityList();
})

onUnmounted(() => {
  setTimerValue(timer.minutes.value * 60 + timer.seconds.value);
  // console.log(timer.minutes.value, timer.seconds.value);
});
</script>

<template>
  <div class="m-get-bonus-dialog-container">
    <img
      src="@/assets/vip/image/img_ci_4.png"
      width="112"
      class="m-get-bonus-dialog-header-img"
    />
    <v-btn
      class="m-get-bonus-dialog-close-btn"
      icon="true"
      @click="emit('closeGetBonusDialog')"
      width="30"
      height="30"
    >
      <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
    </v-btn>
    <div class="mt-11 mx-3 m-get-bonus-dialog-card-1">
      <div class="pt-4 text-center">
        <p class="text-left text-container" style="line-height: normal">
          <font class="text-400-12 text-color-green">{{
            t("vip.login_bonus.footer_text_1")
          }}</font>
          <!-- <font class="text-900-12 purple">{{ platformCurrency }}20 </font> -->
          <font class="text-700-12 white">{{
            t("vip.login_bonus.footer_text_2")
          }}</font>
          <font class="text-400-12 text-color-green">{{
            t("vip.login_bonus.footer_text_3")
          }}</font>
          <font class="text-700-12 text-color-yellow">{{
            t("vip.login_bonus.footer_text_4")
          }}</font>
        </p>
        <!-- <p class="text-center" style="line-height: normal">
          <font class="text-700-12 white">{{ t("vip.login_bonus.footer_text_4") }}</font>
        </p> -->
      </div>
      <div class="mt-4 mx-4">
        <v-btn
          class="button-bright m-get-bonus-dialog-btn"
          width="-webkit-fill-available"
          height="48"
          @click="depositDialogShow"
        >
          <span class="white">{{ t("get_bonus.text_1") }}</span>
        </v-btn>
      </div>
    </div>
    <!-- <div class="mt-4 m-get-bonus-dialog-card-2">
      <img
        src="@/assets/vip/image/img_ci_5.png"
        width="168"
        height="90"
        class="m-get-bonus-dialog-img-2"
      />
      <img
        src="@/assets/vip/image/img_ci_1.png"
        width="88"
        height="76"
        class="m-get-bonus-dialog-img-3"
      />
      <p class="text-800-18 color-F9BC01 m-get-bonus-dialog-text-1">
        {{ t("get_bonus.text_2") }}
      </p>
      <p class="text-800-18 color-F9BC01 m-get-bonus-dialog-text-2">
        {{ t("get_bonus.text_3") }}
      </p>
    </div> -->
    <img
      :src="promoList.group_data[0].list_data[0].image_path||''"
      width="320"
      height="123"
      class="m-get-bonus-dialog-img-register mx-3 mt-2"
      @click="jumpActivityDetails"
    />
    <div class="m-get-bonus-dialog-bottom  mx-3">
      <div class="bottom-text-container">
        <span class="text-700-12 white"> {{t("vip.login_bonus.footer_text_5") }}</span>
        <span class="text-700-12 text-color-yellow">{{t("vip.login_bonus.footer_text_6") }}</span>
        <span class="text-700-12 white">{{t("vip.login_bonus.footer_text_7") }}</span>
      </div>
      <div class="time-remind">
      <div class="time-container">
        <span class="time-frame text-700-12">{{ timer.minutes.value.toString().padStart(1, "0").length>1?'1':'0' }}</span>
        <span class="time-frame text-700-12">{{ timer.minutes.value.toString().padStart(1, "0").length>1?"0":timer.minutes.value.toString().padStart(1, "0")[0] }}</span>
        <div class="time-dot-container">
          <span class="time-dot"></span>
          <span class="time-dot"></span>
        </div>
        <span class="time-frame text-700-12 ml-0">{{ timer.seconds.value.toString().padStart(2, "0")[0] }}</span>
        <span class="time-frame text-700-12">{{ timer.seconds.value.toString().padStart(2, "0")[1]}}</span>
      </div>
      <span class="text-400-10 mt-1" style="color:#7782AA">{{t("vip.login_bonus.footer_text_9") }}</span>
      </div>
    </div>
    <!-- <div class="mt-1 m-get-bonus-dialog-card-3">
      <img
        src="@/assets/vip/image/img_ci_2.png"
        width="102"
        height="90"
        class="m-get-bonus-dialog-img-4"
      />
      <p class="text-800-28 white m-get-bonus-dialog-text-3">20%</p>
      <p class="text-800-14 white m-get-bonus-dialog-text-4">
        {{ t("get_bonus.text_4") }}
      </p>
    </div> -->
  </div>
</template>

<style lang="scss">
.m-get-bonus-dialog-container {
  position: relative;
  width: 340px;
  height: 397px;
  border-radius: 16px;
  background: #1d2027;
  .m-get-bonus-dialog-header-img {
    position: absolute;
    left: 50%;
    top: -53px;
    transform: translateX(-50%);
  }
  .m-get-bonus-dialog-close-btn {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 2px;
    right: 5px;
  }
  .m-get-bonus-dialog-card-1 {
    height: 150px;
    border-radius: 14px;
    background: #15161c;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }
  .m-get-bonus-dialog-btn {
    .v-btn__content {
      color: var(--Text-Dark-Black-000000, #000);
      text-align: center;
      font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed,
        DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
        WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
  .m-get-bonus-dialog-card-2 {
    position: relative;
    width: 340px;
    height: 90px;
    background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%), #d9d9d9;
  }
  .m-get-bonus-dialog-card-3 {
    position: relative;
    width: 340px;
    height: 90px;
    background: linear-gradient(90deg, #29263f 0%, #d84693 100%),
      linear-gradient(90deg, #29263f 0%, #4a32aa 100%), #d9d9d9;
  }
  .m-get-bonus-dialog-img-2 {
    position: absolute;
    top: 0px;
    right: 8px;
  }
  .m-get-bonus-dialog-img-3 {
    position: absolute;
    top: 7px;
    right: 48px;
  }
  .m-get-bonus-dialog-text-1 {
    position: absolute;
    top: 21px;
    left: 26px;
  }
  .m-get-bonus-dialog-text-2 {
    position: absolute;
    top: 50px;
    left: 26px;
  }
  .m-get-bonus-dialog-img-4 {
    position: absolute;
    top: 0px;
    left: 33px;
  }
  .m-get-bonus-dialog-text-3 {
    position: absolute;
    top: 7px;
    right: 88px;
  }
  .m-get-bonus-dialog-text-4 {
    position: absolute;
    top: 48px;
    right: 48px;
    width: 108px;
    line-height: normal;
  }
  .m-get-bonus-dialog-bottom {
    display: flex;
    // align-items: center;
    justify-content: space-between;
  }
  .bottom-text-container {
    width: 170px;
    line-height: 17px;
  }
  .time-remind {
    display: flex;
    flex-direction: column;
  }
  .time-container {
    display: flex;
    align-items: center;
  }
  .time-frame {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: #DE3D12;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    &:not(:first-child){
      margin-left: 4px;
    }
  }
  .time-dot-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // margin-right: 4px;
    width: 12px;
  }
  .time-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #fff;
    &:not(:first-child){
      margin-top: 4px;
    }
  }
  .text-container {
    margin:0 17px;
    line-height: 17px;
  }
  .text-color-green {
    color: #7782aa;
  }
  .text-color-yellow {
    color: #f9bc01;
  }
}
</style>
