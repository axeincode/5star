<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { depositStore } from "@/store/deposit";
import icon_public_104 from "@/assets/public/svg/icon_public_104.svg";
import icon_public_105 from "@/assets/public/svg/icon_public_105.svg";
import icon_public_106 from "@/assets/public/svg/icon_public_106.svg";
import icon_public_107 from "@/assets/public/svg/icon_public_107.svg";
import icon_public_110 from "@/assets/public/svg/icon_public_110.svg";
import icon_public_111 from "@/assets/public/svg/icon_public_111.svg";
import icon_public_112 from "@/assets/public/svg/icon_public_112.svg";
import icon_public_113 from "@/assets/public/svg/icon_public_113.svg";
import { storeToRefs } from "pinia";
import { useTimer } from "vue-timer-hook";

const { t } = useI18n();
const { setDepositConfirmDialogToggle } = depositStore();

const timer_value = ref<number>(3560);

const mxnPaymentChannel = ref<any>({
  spei: icon_public_106,
  oxxo: icon_public_105,
  codi: icon_public_107,
});

const time = new Date();
time.setSeconds(time.getSeconds() + timer_value.value); // 10 minutes timer

const timer = useTimer(Number(time));
timer.start();

const channnelName = computed(() => {
  const { getChannelName } = storeToRefs(depositStore());
  return getChannelName.value;
});

const closeDepositConfirmDialog = () => {
  setDepositConfirmDialogToggle(false);
};
</script>

<template>
  <div class="m-deposit-confirm-dialog">
    <div class="m-deposit-confirm-dailog-header">
      <v-btn
        class="m-close-button"
        icon="true"
        width="24"
        height="24"
        @click="closeDepositConfirmDialog"
      >
        <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
      </v-btn>
    </div>
    <div class="m-deposit-confirm-dailog-body px-8 pt-2">
      <img :src="mxnPaymentChannel[channnelName]" width="63" />
      <div class="m-order-amount text-center mt-2 pa-2">
        <div class="text-700-14 white">{{ t("deposit_confirm.text_1") }}</div>
        <div class="text-900-28 yellow">$ 100</div>
        <div class="text-700-10 orange">
          {{ t("deposit_confirm.text_2") }}&nbsp;{{ timer.minutes }}:{{ timer.seconds }}
        </div>
      </div>
      <div class="text-400-12 gray my-2 mx-4">{{ t("deposit_confirm.text_3") }}</div>
      <div class="m-provider-body py-2 px-4">
        <div class="text-700-12 white">STP</div>
        <v-btn
          class="m-copy-button"
          icon="true"
          width="24"
          height="24"
          @click="closeDepositConfirmDialog"
        >
          <img src="@/assets/public/svg/icon_public_71.svg" width="18" />
        </v-btn>
      </div>
      <div class="text-400-12 gray my-2 ml-4 d-flex align-center">
        {{ t("deposit_confirm.text_4") }}
        <div class="text_400-10 green" style="margin-left: auto">
          {{ t("deposit_confirm.text_5") }}
        </div>
      </div>
      <div class="m-provider-body py-2 px-4">
        <div class="text-700-12 white">6180260987172188</div>
        <v-btn
          class="m-copy-button"
          icon="true"
          width="24"
          height="24"
          @click="closeDepositConfirmDialog"
        >
          <img src="@/assets/public/svg/icon_public_71.svg" width="18" />
        </v-btn>
      </div>
      <div class="text-400-12 gray my-2 mx-4">{{ t("deposit_confirm.text_6") }}</div>
      <div class="m-provider-body py-2 px-4">
        <div class="text-700-12 white">PACSMILE M EXICO SA DE CV</div>
        <v-btn
          class="m-copy-button"
          icon="true"
          width="24"
          height="24"
          @click="closeDepositConfirmDialog"
        >
          <img src="@/assets/public/svg/icon_public_71.svg" width="18" />
        </v-btn>
      </div>
      <div class="text-400-12 blue my-2 d-flex align-center">
        <img :src="icon_public_104" />&nbsp;
        <div style="text-decoration: underline">{{ t("deposit_confirm.text_7") }}</div>
      </div>
      <div class="text-400-12 gray my-2">{{ t("deposit_confirm.text_8") }}</div>
      <div class="text-400-10 gray">{{ t("deposit_confirm.text_9") }}</div>
      <div class="text-400-10 gray">
        {{ t("deposit_confirm.text_10") }}<span class="text-700-10 yellow">$100</span>
      </div>
      <div class="text-400-10 gray">{{ t("deposit_confirm.text_11") }}</div>
      <v-btn class="m-transfer-complete my-4" width="-webkit-fill-available" height="48">
        {{ t("deposit_confirm.text_12") }}
      </v-btn>
    </div>
    <div class="m-deposit-confirm-dailog-footer d-flex align-center px-10">
      <div class="text-400-12 gray">{{ t("deposit_confirm.text_13") }}</div>
      <div class="d-flex align-center" style="margin-left: auto">
        <img :src="icon_public_110" class="mr-3" />
        <img :src="icon_public_111" class="mr-3" />
        <img :src="icon_public_112" class="mr-3" />
        <img :src="icon_public_113" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-deposit-confirm-dialog {
  background: #1d2027;
  height: 100vh;

  .m-deposit-confirm-dailog-header {
    height: 36px;
    position: fixed;
    top: 0px;
    width: 100%;

    .m-close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute;
      top: 6px;
      right: 8px;
    }
  }

  .m-deposit-confirm-dailog-body {
    position: absolute;
    height: calc(100vh - 36px);
    top: 36px;
    overflow-y: auto;
    width: 100%;

    .m-order-amount {
      background: #15161c;
      box-shadow: 0px 0px 6px 1px #00000059 inset;
      border-radius: 8px;
    }

    .m-provider-body {
      display: flex;
      align-items: center;
      background: #15161c;
      box-shadow: 0px 0px 6px 1px #00000059 inset;
      border-radius: 8px;
      height: 40px;

      .m-copy-button {
        margin-left: auto;
        background: #1d2027;
        border-radius: 4px !important;
      }
    }

    .m-transfer-complete {
      background: #009b3a;
      box-shadow: 0px 3px 4px 1px #00000036;
      border-radius: 8px;

      .v-btn__content {
        font-family: Inter;
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
      }
    }
  }

  .m-deposit-confirm-dailog-footer {
    position: fixed;
    height: 32px;
    background: #23262f;
    bottom: 0px;
    width: 100%;
  }
}
</style>
