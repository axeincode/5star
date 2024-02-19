<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";
import { appBarStore } from "@/store/appBar";

const { t } = useI18n();
const emit = defineEmits<{ (e: "closeGetBonusDialog"): void }>();
const { setDepositWithdrawToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();

const depositDialogShow = () => {
  emit("closeGetBonusDialog");
  setDepositWithdrawToggle(true);
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
};
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
        <p class="text-center" style="line-height: normal">
          <font class="text-900-12 white">{{ t("vip.login_bonus.footer_text_1") }}</font>
          <font class="text-900-12 purple">R$20 </font>
          <font class="text-900-12 white">{{ t("vip.login_bonus.footer_text_2") }}</font>
          <font class="text-900-12 purple">{{ t("vip.login_bonus.footer_text_3") }}</font>
        </p>
        <p class="text-center" style="line-height: normal">
          <font class="text-900-12 white">{{ t("vip.login_bonus.footer_text_4") }}</font>
        </p>
      </div>
      <div class="mt-4 mx-4">
        <v-btn
          class="button-bright m-get-bonus-dialog-btn"
          width="-webkit-fill-available"
          height="48"
          @click="depositDialogShow"
        >
          {{ t("get_bonus.text_1") }}
        </v-btn>
      </div>
    </div>
    <div class="mt-4 m-get-bonus-dialog-card-2">
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
    </div>
    <div class="mt-1 m-get-bonus-dialog-card-3">
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
    </div>
  </div>
</template>

<style lang="scss">
.m-get-bonus-dialog-container {
  position: relative;
  width: 340px;
  height: 397px;
  border-radius: 16px;
  background: #29263c;
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
    height: 137px;
    border-radius: 14px;
    background: #1D2027;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }
  .m-get-bonus-dialog-btn {
    .v-btn__content {
      color: var(--Text-Dark-Black-000000, #000);
      text-align: center;
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
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
}
</style>
