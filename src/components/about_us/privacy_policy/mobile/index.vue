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
      {{ t("about.privacy_policy.text_1") }}
    </div>
    <div class="text-400-10 gray mt-2">
      {{ t("about.privacy_policy.text_2") }}
    </div>
    <div class="m-about-collapse mt-2">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="t('about.privacy_policy.text_3')" name="1">
          <div>{{ t("about.privacy_policy.text_4") }}</div>
          <div>{{ t("about.privacy_policy.text_5") }}</div>
          <div>{{ t("about.privacy_policy.text_6") }}</div>
          <div>{{ t("about.privacy_policy.text_7") }}</div>
          <div>{{ t("about.privacy_policy.text_8") }}</div>
          <div>{{ t("about.privacy_policy.text_9") }}</div>
          <div>{{ t("about.privacy_policy.text_10") }}</div>
          <div>{{ t("about.privacy_policy.text_11") }}</div>
          <div>{{ t("about.privacy_policy.text_12") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_13')" name="2">
          <div>{{ t("about.privacy_policy.text_14") }}</div>
          <div>{{ t("about.privacy_policy.text_15") }}</div>
          <div>{{ t("about.privacy_policy.text_16") }}</div>
          <div>{{ t("about.privacy_policy.text_17") }}</div>
          <div>{{ t("about.privacy_policy.text_18") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_19')" name="3">
          <div>{{ t("about.privacy_policy.text_20") }}</div>
          <div>{{ t("about.privacy_policy.text_21") }}</div>
          <div>{{ t("about.privacy_policy.text_22") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_23')" name="4">
          <div>{{ t("about.privacy_policy.text_24") }}</div>
          <div>{{ t("about.privacy_policy.text_25") }}</div>
          <div>{{ t("about.privacy_policy.text_26") }}</div>
          <div>{{ t("about.privacy_policy.text_27") }}</div>
          <div>{{ t("about.privacy_policy.text_28") }}</div>
          <div>{{ t("about.privacy_policy.text_29") }}</div>
          <div>{{ t("about.privacy_policy.text_30") }}</div>
          <div>{{ t("about.privacy_policy.text_31") }}</div>
          <div>{{ t("about.privacy_policy.text_33") }}</div>
          <div>{{ t("about.privacy_policy.text_34") }}</div>
          <div>{{ t("about.privacy_policy.text_35") }}</div>
          <div>{{ t("about.privacy_policy.text_36") }}</div>
          <div>{{ t("about.privacy_policy.text_37") }}</div>
          <div>{{ t("about.privacy_policy.text_38") }}</div>
          <div>{{ t("about.privacy_policy.text_39") }}</div>
          <div>{{ t("about.privacy_policy.text_40") }}</div>
          <div>{{ t("about.privacy_policy.text_41") }}</div>
          <div>{{ t("about.privacy_policy.text_42") }}</div>
          <div>{{ t("about.privacy_policy.text_43") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_44')" name="5">
          <div>{{ t("about.privacy_policy.text_45") }}</div>
          <div>{{ t("about.privacy_policy.text_46") }}</div>
          <div>{{ t("about.privacy_policy.text_47") }}</div>
          <div>{{ t("about.privacy_policy.text_48") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_49')" name="6">
          <div>{{ t("about.privacy_policy.text_50") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_51')" name="7">
          <div>{{ t("about.privacy_policy.text_52") }}</div>
          <div>{{ t("about.privacy_policy.text_53") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_54')" name="8">
          <div>{{ t("about.privacy_policy.text_56") }}</div>
          <div>{{ t("about.privacy_policy.text_57") }}</div>
          <div>{{ t("about.privacy_policy.text_58") }}</div>
          <div>{{ t("about.privacy_policy.text_59") }}</div>
          <div>{{ t("about.privacy_policy.text_60") }}</div>
          <div>{{ t("about.privacy_policy.text_61") }}</div>
          <div>{{ t("about.privacy_policy.text_62") }}</div>
          <div>{{ t("about.privacy_policy.text_63") }}</div>
          <div>{{ t("about.privacy_policy.text_64") }}</div>
          <div>{{ t("about.privacy_policy.text_65") }}</div>
          <div>{{ t("about.privacy_policy.text_66") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_67')" name="9">
          <div>{{ t("about.privacy_policy.text_68") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_69')" name="10">
          <div>{{ t("about.privacy_policy.text_70") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_71')" name="11">
          <div>{{ t("about.privacy_policy.text_72") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_73')" name="12">
          <div>{{ t("about.privacy_policy.text_74") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_75')" name="13">
          <div>{{ t("about.privacy_policy.text_76") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_77')" name="14">
          <div>{{ t("about.privacy_policy.text_78") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_79')" name="15">
          <div>{{ t("about.privacy_policy.text_80") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_81')" name="16">
          <div>{{ t("about.privacy_policy.text_82") }}</div>
          <div>{{ t("about.privacy_policy.text_83") }}</div>
          <div>{{ t("about.privacy_policy.text_84") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_85')" name="17">
          <div>{{ t("about.privacy_policy.text_86") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.privacy_policy.text_87')" name="18">
          <div>{{ t("about.privacy_policy.text_88") }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="scss">
.m-about-collapse {
  .el-collapse {
    border-top: unset !important;
    border-bottom: unset !important;
  }
  .el-collapse-item {
    border-bottom: 2px solid #1D2027;
  }
  .el-collapse-item__header {
    background-color: #15161C !important;
    border-bottom: unset !important;
    color: var(--White-BG, #fff);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .el-collapse-item__wrap {
    background-color: #15161C !important;
  }
  .el-collapse-item__content {
    padding-bottom: 16px;
    color: var(--Sec-Text-7782AA, #7782aa);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 19.2px */
  }
  .el-icon {
    color: white !important;
    font-size: 14px;
  }
}
</style>
