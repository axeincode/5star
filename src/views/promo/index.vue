<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <v-layout class="m-promo-navigation-layout">
    <v-navigation-drawer class="m-promo-navigation-drawer" :width="76">
      <div class="text-center relative" style="margin-top: 96px !important">
        <img src="@/assets/promo/svg/promo_1.svg" />
        <img src="@/assets/public/svg/icon_public_102.svg" class="m-promo-event-icon" />
        <div class="m-promo-event-text text-600-8 white">{{ t("promo.text_1") }}</div>
      </div>
      <div class="mt-8 text-center relative">
        <img src="@/assets/public/svg/icon_public_42.svg" />
        <div class="text-600-8 gray">{{ t("promo.text_2") }}</div>
      </div>
      <div class="mt-8 text-center relative">
        <img src="@/assets/public/svg/icon_public_93.svg" />
        <div class="text-600-8 gray">{{ t("promo.text_3") }}</div>
      </div>
    </v-navigation-drawer>
    <v-main class="m-promo-navigation-body">
      <v-card
        class="m-promo-navigation-card mx-2 relative"
        style="margin-top: 96px !important"
      >
        <v-card class="m-promo-card-1 relative">
          <div class="mt-2 ml-3 m-promo-card-text-1">10%</div>
          <div class="ml-3 text-900-16 yellow" style="text-transform: uppercase">
            {{ t("promo.text_4") }}
          </div>
          <div
            class="text-700-10 white text-center mt-1"
            style="letter-spacing: 13px; text-transform: uppercase"
          >
            {{ t("promo.text_5") }}
          </div>
        </v-card>
        <img src="@/assets/promo/image/img_ep_1.png" class="m-promo-card-img-1" />
        <div class="d-flex mx-2 mt-6">
          <div class="text-800-12 gray d-flex align-center">
            {{ t("promo.text_6") }}
            <v-icon size="large">mdi-chevron-right</v-icon>
          </div>
          <v-btn class="text-none m-promo-deposit-btn" width="122" height="32">
            {{ t("promo.text_7") }}
          </v-btn>
        </div>
      </v-card>
      <v-card class="m-promo-navigation-card mx-2 relative mt-4">
        <v-card class="m-promo-card-2 relative">
          <div class="mt-3 ml-3 text-900-16 white">
            150%
            <span class="text-900-12 white">{{ t("promo.text_8") }}</span>
          </div>
          <div class="ml-3 text-900-14 white">
            {{ t("promo.text_9") }}
          </div>
          <div class="ml-3 m-promo-card-text-2 mt-1">R$1500</div>
        </v-card>
        <img src="@/assets/promo/image/img_ep_4.png" class="m-promo-card-img-1" />
        <div class="d-flex mx-2 mt-6">
          <div class="text-800-12 gray d-flex align-center">
            {{ t("promo.text_6") }}
            <v-icon size="large">mdi-chevron-right</v-icon>
          </div>
          <v-btn class="text-none m-promo-deposit-btn" width="122" height="32">
            {{ t("promo.text_7") }}
          </v-btn>
        </div>
      </v-card>
      <v-card class="m-promo-navigation-card mx-2 relative mt-4">
        <v-card class="m-promo-card-3 relative">
          <div class="mt-2 ml-3 text-900-14 white">
            {{ t("promo.text_10") }}
            <span class="text-900-20 white">{{ t("promo.text_11") }}</span>
          </div>
          <div class="ml-3 text-900-14 white" style="text-transform: uppercase">
            {{ t("promo.text_12") }}
          </div>
          <div class="ml-3 m-promo-card-text-3 mt-1">{{ t("promo.text_13") }}</div>
        </v-card>
        <img src="@/assets/promo/image/img_ep_2.png" class="m-promo-card-img-1" />
        <div class="d-flex mx-2 mt-6">
          <div class="text-800-12 gray d-flex align-center">
            {{ t("promo.text_6") }}
            <v-icon size="large">mdi-chevron-right</v-icon>
          </div>
          <v-btn class="text-none m-promo-deposit-btn" width="122" height="32">
            {{ t("promo.text_7") }}
          </v-btn>
        </div>
      </v-card>
    </v-main>
  </v-layout>
</template>

<style lang="scss">
.m-promo-navigation-layout {
  margin-top: -100px;

  .m-promo-navigation-drawer {
    background: $agent_card_notmet_bg !important;
    box-shadow: 3px 0px 4px 1px rgba(0, 0, 0, 0.21) !important;
  }

  .m-promo-navigation-body {
    height: 100vh;
    background: $agent_card_bg !important;

    .m-promo-navigation-card {
      height: 160px;
      border-radius: 4px;
      background: $agent_card_notmet_bg;
      box-shadow: none !important;

      .m-promo-card-1 {
        height: 95px;
        border-radius: 8px;
        background: linear-gradient(0deg, $agent_card_bg 0%, $agent_card_bar_bg 100%);
        box-shadow: none !important;

        .m-promo-card-text-1 {
          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #fff;
          font-family: Inter;
          font-size: 32px;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
          background: linear-gradient(171deg, #fff 24.55%, rgba(255, 255, 255, 0) 93.77%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .m-promo-card-2 {
        height: 95px;
        border-radius: 8px;
        background: linear-gradient(0deg, #1b3344 0%, #0079d1 100%);
        box-shadow: none !important;

        .m-promo-card-text-2 {
          font-family: Inter;
          font-size: 24px;
          font-style: normal;
          font-weight: 900;
          line-height: 100%;
          background: linear-gradient(161deg, #fff500 22.97%, #ffa800 59.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .m-promo-card-3 {
        height: 95px;
        border-radius: 8px;
        background: linear-gradient(52deg, #0a072f 22.05%, #007963 100%);
        box-shadow: none !important;

        .m-promo-card-text-3 {
          color: var(--Logo-Color, #f9bc01);
          -webkit-text-stroke-width: 1;
          -webkit-text-stroke-color: #ffe500;
          font-family: Inter;
          font-size: 28px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          text-transform: uppercase;
        }
      }

      .m-promo-card-img-1 {
        position: absolute;
        right: 0px;
        top: 0px;
        z-index: 43;
      }

      .m-promo-deposit-btn {
        margin-left: auto;
        border-radius: 8px;
        background: var(--Logo-Color, #f9bc01);
        box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);

        .v-btn__content {
          color: #000;
          font-family: Inter;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        }
      }
    }
  }

  .m-promo-event-icon {
    position: absolute;
    top: 4px;
    left: 24px;
  }

  .m-promo-event-text {
    position: absolute;
    left: 17px;
    top: 28px;
  }
}
</style>
