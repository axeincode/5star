<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Footer from "./components/mobile/Footer.vue";
import Center from "./components/mobile/Center.vue";

const { t } = useI18n();
</script>

<template>
  <v-card class="mx-2 m-agent-faq-card">
    <div class="mt-4 text-center text-700-14 text-gray">{{ t("agent.text_20") }}</div>
    <v-card class="m-agent-faq-card-1 mt-4 mx-2">
      <div class="mx-2">
        <img src="@/assets/agent/image/img_agent_13.png" style="width: 100%" />
      </div>
      <div class="mx-4 mb-2">
        <div class="text-400-10 text-gray">{{ t("agent.text_21") }}</div>
        <div class="text-400-10 text-gray">{{ t("agent.text_22") }}</div>
      </div>
    </v-card>
    <v-card class="m-agent-faq-card-2 mx-2 mt-2">
      <v-row class="align-center">
        <v-col :cols="4" class="text-center">
          <div class="relative">
            <img src="@/assets/public/image/ua_public_06.png" width="60" />
            <div class="m-agent-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">A</div>
              </div>
            </div>
          </div>
          <div class="text-400-12 text-gray">{{ t("agent.text_17") }}</div>
          <div class="text-700-16 text-white">2555</div>
        </v-col>
        <v-col :cols="8" class="my-4">
          <div class="text-400-12 text-gray">
            {{ t("agent.text_18") }}B1{{ t("agent.text_19") }}
            <span class="text-700-12 text-white">360</span>
          </div>
          <div class="text-400-12 text-gray">
            {{ t("agent.text_18") }}B2{{ t("agent.text_19") }}
            <span class="text-700-12 text-white">120</span>
          </div>
          <div class="text-400-12 text-gray">
            {{ t("agent.text_18") }}B3{{ t("agent.text_19") }}
            <span class="text-700-12 text-white">60</span>
          </div>
          <div class="text-400-12 text-gray">
            {{ t("agent.text_18") }}C1{{ t("agent.text_19") }}
            <span class="text-700-12 text-white">150</span>
          </div>
          <div class="text-400-12 text-gray">
            {{ t("agent.text_18") }}C3{{ t("agent.text_19") }}
            <span class="text-700-12 text-white">300</span>
          </div>
          <div class="text-400-12 text-gray">
            {{ t("agent.text_18") }}D1{{ t("agent.text_19") }}
            <span class="text-700-12 text-white">50</span>
          </div>
          <div class="text-400-12 text-gray">
            {{ t("agent.text_18") }}D3{{ t("agent.text_19") }}
            <span class="text-700-12 text-white">15</span>
          </div>
          <div class="text-400-12 text-gray">
            {{ t("agent.text_18") }}D4{{ t("agent.text_19") }}
            <span class="text-700-12 text-white">1500</span>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <Center />
  </v-card>
  <Footer />
</template>

<style lang="scss">
.m-agent-faq-card {
  padding-bottom: 16px;
  border-radius: 8px;
  background: $agent_card_notmet_bg;

  .m-agent-faq-card-1 {
    border-radius: 8px;
    background: $agent_card_bg;
    // height: 307px;
  }

  .m-agent-faq-card-2 {
    border-radius: 8px;
    background: $agent_card_bg;
    height: 176px;
  }

  .m-agent-ua-user {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background: $agent_card_price_color;
    bottom: 18px;
    right: 26px;

    .m-agent-ua-user-circle {
      margin: 1px;
      width: 14px;
      height: 14px;
      border-radius: 8px;
      background: #ffffff;
    }

    .m-agent-ua-user-circle-text {
      color: $agent_card_bonuses_time_color;
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 10px;
      font-style: normal;
      font-weight: 900;
    }
  }
}
</style>
