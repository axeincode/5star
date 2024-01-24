<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="text-400-12 gray">
    {{ t("promo.text_15") }}
    <span class="text-700-12 yellow">R$1800</span>
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_16") }}
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_17") }}
  </div>
  <div class="text-400-12 gray">
    {{ t("promo.text_18") }}
    <span class="text-700-12 yellow">R$1800</span>
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_19") }}
  </div>
  <div class="text-400-12 gray">
    {{ t("promo.text_20") }}
  </div>
  <div class="text-400-12 gray">
    {{ t("promo.text_21") }}
  </div>
  <div class="text-400-12 gray">
    {{ t("promo.text_22") }}
  </div>
  <div class="text-400-12 gray">
    {{ t("promo.text_23") }}
    <span class="text-700-12 yellow">R$100</span>
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_24") }}
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_25") }}
    <span class="text-700-12 yellow">R$1800</span>
    {{ t("promo.text_26") }}
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_27") }}
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_28") }}
    <span class="text-700-12 yellow">R$1500.</span>
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_29") }}
    <span class="text-700-12 active"> {{ t("promo.text_30") }}</span>
    {{ t("promo.text_31") }}
  </div>
</template>

<style lang="scss"></style>
