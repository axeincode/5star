<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

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
      {{ t("about.kyc_policy.text_1") }}
    </div>
    <div class="text-400-10 gray mt-2">
      {{ t("about.kyc_policy.text_2") }}
    </div>
    <div class="text-400-10 white mt-6">
      {{ t("about.kyc_policy.text_3") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_4") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_5") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_6") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_7") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_8") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_9") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_10") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_11") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_12") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_13") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_14") }}
    </div>
    <div class="text-400-10 white">
      {{ t("about.kyc_policy.text_15") }}
    </div>
    <div class="m-about-collapse mt-2">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="t('about.kyc_policy.text_16')" name="1">
          <div class="text-700-12 white">{{ t("about.kyc_policy.text_17") }}</div>
          <div>{{ t("about.kyc_policy.text_18") }}</div>
          <div>{{ t("about.kyc_policy.text_19") }}</div>
          <div>{{ t("about.kyc_policy.text_20") }}</div>
          <div>{{ t("about.kyc_policy.text_21") }}</div>
          <div>{{ t("about.kyc_policy.text_22") }}</div>
          <div class="text-700-12 white mt-1">{{ t("about.kyc_policy.text_23") }}</div>
          <div>{{ t("about.kyc_policy.text_24") }}</div>
          <div>{{ t("about.kyc_policy.text_25") }}</div>
          <div>{{ t("about.kyc_policy.text_26") }}</div>
          <div>{{ t("about.kyc_policy.text_27") }}</div>
          <div class="text-700-12 white mt-1">{{ t("about.kyc_policy.text_28") }}</div>
          <div>{{ t("about.kyc_policy.text_29") }}</div>
          <div>{{ t("about.kyc_policy.text_30") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.kyc_policy.text_31')" name="2">
          <div>{{ t("about.kyc_policy.text_32") }}</div>
          <div>{{ t("about.kyc_policy.text_33") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.kyc_policy.text_34')" name="3">
          <div>{{ t("about.kyc_policy.text_35") }}</div>
          <div>{{ t("about.kyc_policy.text_36") }}</div>
          <div>{{ t("about.kyc_policy.text_37") }}</div>
          <div>{{ t("about.kyc_policy.text_38") }}</div>
          <div>{{ t("about.kyc_policy.text_39") }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
