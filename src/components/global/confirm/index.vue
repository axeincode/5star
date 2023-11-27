<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";

const { t } = useI18n();
</script>

<template>
  <div class="m-confirm-dialog-container">
    <img src="@/assets/public/image/img_ep_3.png" width="137" />
    <div class="m-confirm-dialog-header">
      <p class="text-800-16">{{ t("confirm.text_1") }}</p>
    </div>
    <p class="text-900-24 white text-center mt-5">R$ 2</p>
    <div class="mt-5 mx-4">
      <v-btn
        class="button-bright m-confirm-btn"
        width="-webkit-fill-available"
        height="48"
      >
        {{ t("confirm.text_2") }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.m-confirm-dialog-container {
  width: 280px;
  height: 180px;
  border-radius: 16px;
  background: #29263c;
  img {
    position: absolute;
    top: -56px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
  .m-confirm-dialog-header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 40px;
    border-radius: 8px;
    background: linear-gradient(0deg, #4522c1 0%, #6c43f7 100%);

    p {
      background: linear-gradient(
        90deg,
        #ffc000 0%,
        rgba(249, 130, 1, 0.72) 51.04%,
        #ffc000 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .m-confirm-btn {
    .v-btn__content {
      color: var(--Text-Dark-Black-000000, #000);
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
}
</style>
