<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { storeToRefs } from 'pinia';
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const { t } = useI18n();
const { width } = useDisplay();
const activeNames = ref<Array<string>>(["1"]);

const mobileWidth: any = computed(() => {
  return width.value;
});
</script>

<template>
  <div class="m-about-main-body mx-3 px-6 py-5">
    <div class="text-700-14 white">
      {{ t("about.referral_system.text_1") }}
    </div>
    <div class="text-400-10 gray mt-2">
      {{ t("about.referral_system.text_2") }}
    </div>
    <div class="m-about-collapse mt-2">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="t('about.referral_system.text_3')" name="1">
          <div>{{ t("about.referral_system.text_4") }}</div>
          <div>{{ t("about.referral_system.text_5") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.referral_system.text_6')" name="2">
          <div>{{ t("about.referral_system.text_7", [platformCurrency]) }}</div>
          <div>{{ t("about.referral_system.text_8") }}</div>
          <div>{{ t("about.referral_system.text_9") }}</div>
          <div>{{ t("about.referral_system.text_10") }}</div>
          <div>{{ t("about.referral_system.text_11", [platformCurrency]) }}</div>
          <div>{{ t("about.referral_system.text_12") }}</div>
          <div>{{ t("about.referral_system.text_13") }}</div>
          <div>{{ t("about.referral_system.text_14") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.referral_system.text_15')" name="3">
          <div>{{ t("about.referral_system.text_16") }}</div>
          <div>{{ t("about.referral_system.text_17") }}</div>
          <div>{{ t("about.referral_system.text_18") }}</div>
          <div>{{ t("about.referral_system.text_19") }}</div>
          <div>{{ t("about.referral_system.text_20") }}</div>
          <div>{{ t("about.referral_system.text_21") }}</div>
          <div>{{ t("about.referral_system.text_22") }}</div>
          <div>{{ t("about.referral_system.text_23") }}</div>
          <div>{{ t("about.referral_system.text_24") }}</div>
          <div>{{ t("about.referral_system.text_25") }}</div>
          <div>{{ t("about.referral_system.text_26") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.referral_system.text_27')" name="4">
          <div>{{ t("about.referral_system.text_28") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.referral_system.text_29')" name="5">
          <div>{{ t("about.referral_system.text_30") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.referral_system.text_31')" name="6">
          <div>{{ t("about.referral_system.text_32") }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
