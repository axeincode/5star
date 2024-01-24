<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="text-400-12 gray">
    {{ t("promo.text_33") }}
    <span class="text-700-12 yellow">R$1500</span>
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_16") }}
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_34") }}
  </div>
  <div class="text-400-12 gray">
    {{ t("promo.text_35") }}
    <span class="text-700-12 yellow">R$1000</span>
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
    <span class="text-700-12 yellow">R$50</span>
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_24") }}
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_36") }}
    <span class="text-700-12 yellow">R$1500</span>
    {{ t("promo.text_26") }}
  </div>
  <div class="text-400-12 gray mt-4">
    {{ t("promo.text_37") }}
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
