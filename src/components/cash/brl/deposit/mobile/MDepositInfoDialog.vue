<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { type GetPaymentItem } from '@/interface/deposit';
import { type GetCurrencyItem } from '@/interface/deposit';
import QrcodeVue from 'qrcode.vue'
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import * as clipboard from "clipboard-polyfill";

const { t } = useI18n();

const emit = defineEmits<{ (e: "depositInfoDialogClose"): void }>();
const props = defineProps<{ selectedPaymentItem: GetPaymentItem, selectedCurrencyItem: GetCurrencyItem, depositAmount: string | number, codeUrl: string, depositAmountWithCurrency: string }>();

const { selectedPaymentItem, selectedCurrencyItem, depositAmount, codeUrl, depositAmountWithCurrency } = toRefs(props);

const closeDepositInfoDialog = async () => {
  emit("depositInfoDialogClose");
};

const size = ref<number>(132)
const notificationText = ref<string>('successful copied');

const handleCopyUrlCode = async () => {
  clipboard.writeText(codeUrl.value).then(
    () => {
      console.log('Copied to clipboard!');
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 3000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: SuccessIcon,
        rtl: false,
      });
    },
    (error) => {
      console.error('Could not copy text: ', error);
    }
  );
}
</script>

<template>
  <div class="m-depositinfo-dialog-container">
    <v-btn
      class="m-close-button"
      icon="true"
      @click="closeDepositInfoDialog"
      width="30"
      height="30"
    >
      <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
    </v-btn>
    <div class="text-center text-700-14 white mt-5">
      {{ t("deposit_dialog.deposit_info.text_1") }}
    </div>
    <div class="m-deposit-channel-info mx-5 mt-5">
      <div class="mx-5 pt-3 d-flex" style="justify-content: space-between">
        <img :src="selectedPaymentItem.icon" />
        <p class="text-900-20 white">
          {{ selectedCurrencyItem.name }}&nbsp;{{ depositAmount }}
        </p>
      </div>
      <div class="m-deposit-info-qr-code">
        <div class="m-deposit-info-qr-code-body text-center">
          <QrcodeVue :value="codeUrl" :size="size" level="H" class="mt-2" />
        </div>
      </div>
      <div class="mt-1">
        <v-list-item class="px-5">
          <v-list-item-title class="text-left text-500-12 white">
            {{ codeUrl }}
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
              icon=""
              class="m-deposit-url-copy-btn ml-2"
              bg-color="#23262F"
              width="24"
              height="24"
              @click="handleCopyUrlCode"
            >
              <img src="@/assets/public/svg/icon_public_71.svg" width="16" />
            </v-btn>
          </template>
        </v-list-item>
      </div>
    </div>
    <div class="mt-4 mx-11">
      <p class="text-400-12 color-524D72">
        {{ t("deposit_dialog.deposit_info.text_2") }}
      </p>
      <p class="text-400-12 color-524D72 mt-1">
        {{ t("deposit_dialog.deposit_info.text_3") }}
      </p>
      <p class="text-400-12 color-524D72 mt-1">
        {{ t("deposit_dialog.deposit_info.text_4") }}
        <font color="white">{{ depositAmountWithCurrency }}</font>
        {{ t("deposit_dialog.deposit_info.text_5") }}
      </p>
    </div>
    <div class="mt-10 mx-6">
      <v-btn
        class="m-deposit-btn m-deposit-btn-ready"
        width="-webkit-fill-available"
        height="48px"
        :onclick="handleCopyUrlCode"
      >
        {{ t("deposit_dialog.deposit_info.text_6") }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.m-depositinfo-dialog-container {
  width: 328px;
  height: 545px;
  border-radius: 20px;
  background: #1D2027;
  overflow-y: auto;
  position: relative;

  .m-close-button {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .m-deposit-channel-info {
    width: 288px;
    height: 252px;
    border-radius: 8px;
    background: var(--BG-5-1C1929, #15161C);

    /* Text Box */
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  }

  .m-deposit-info-qr-code {
    margin-top: 18px;
  }

  .m-deposit-info-qr-code-body {
    width: 148px;
    height: 148px;
    background: #ffffff;
    margin: auto;
  }

  .m-deposit-url-copy-btn {
    border-radius: 4px;
    background: var(--secondary-button-353652, #23262F);
  }
}

.m-depositinfo-dialog-container::-webkit-scrollbar {
  width: 0px;
}
</style>
