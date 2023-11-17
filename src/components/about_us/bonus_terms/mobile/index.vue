<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();

const mobileWidth: any = computed(() => {
  return width.value;
});
</script>

<template>
  <div class="m-about-main-body mx-3 px-6 py-5">
    <div class="text-700-14 white">
      {{ t("about.bonus_terms.text_1") }}
    </div>
    <div class="text-400-10 gray mt-2">
      {{ t("about.bonus_terms.text_2") }}
    </div>
    <div class="text-500-10 white mt-4">
      {{ t("about.bonus_terms.text_3") }}
    </div>
    <div class="text-500-10 white">
      {{ t("about.bonus_terms.text_4") }}
    </div>
    <div class="text-500-10 white">
      {{ t("about.bonus_terms.text_5") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_6") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_7") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_8") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_9") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_10") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_11") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_12") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_13") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_14") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_15") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_16") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_17") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_18") }}
    </div>
    <div class="text-400-10 gray my-2">
      {{ t("about.bonus_terms.text_19") }}
    </div>
  </div>
</template>

<style lang="scss"></style>
