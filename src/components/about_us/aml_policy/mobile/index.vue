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
      {{ t("about.aml_policy.text_1") }}
    </div>
    <div class="text-400-10 gray mt-2">
      {{ t("about.aml_policy.text_2") }}
    </div>
    <div class="m-about-collapse mt-2">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="t('about.aml_policy.text_3')" name="1">
          <div>{{ t("about.aml_policy.text_4") }}</div>
          <div>{{ t("about.aml_policy.text_5") }}</div>
          <div>{{ t("about.aml_policy.text_6") }}</div>
          <div>{{ t("about.aml_policy.text_7") }}</div>
          <div>{{ t("about.aml_policy.text_8") }}</div>
          <div>{{ t("about.aml_policy.text_9") }}</div>
          <div>{{ t("about.aml_policy.text_10") }}</div>
          <div>{{ t("about.aml_policy.text_11") }}</div>
          <div>{{ t("about.aml_policy.text_12") }}</div>
          <div>{{ t("about.aml_policy.text_13") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_14')" name="2">
          <div>{{ t("about.aml_policy.text_15") }}</div>
          <li>{{ t("about.aml_policy.text_16") }}</li>
          <li>{{ t("about.aml_policy.text_17") }}</li>
          <li>{{ t("about.aml_policy.text_18") }}</li>
          <li>{{ t("about.aml_policy.text_19") }}</li>
          <div>{{ t("about.aml_policy.text_20") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_21')" name="3">
          <div>{{ t("about.aml_policy.text_22") }}</div>
          <div>{{ t("about.aml_policy.text_23") }}</div>
          <div>{{ t("about.aml_policy.text_24") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_25')" name="4">
          <div>{{ t("about.aml_policy.text_26") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_27')" name="5">
          <div class="text-700-12 white">{{ t("about.aml_policy.text_28") }}</div>
          <div>{{ t("about.aml_policy.text_29") }}</div>
          <div class="text-700-12 white">{{ t("about.aml_policy.text_30") }}</div>
          <div>{{ t("about.aml_policy.text_31") }}</div>
          <div class="text-700-12 white">{{ t("about.aml_policy.text_32") }}</div>
          <div>{{ t("about.aml_policy.text_33") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_34')" name="6">
          <div>{{ t("about.aml_policy.text_35") }}</div>
          <div>{{ t("about.aml_policy.text_36") }}</div>
          <div>{{ t("about.aml_policy.text_37") }}</div>
          <div>{{ t("about.aml_policy.text_38") }}</div>
          <div>{{ t("about.aml_policy.text_39") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_40')" name="7">
          <div>{{ t("about.aml_policy.text_41") }}</div>
          <div>{{ t("about.aml_policy.text_42") }}</div>
          <div>{{ t("about.aml_policy.text_43") }}</div>
          <div>{{ t("about.aml_policy.text_44") }}</div>
          <div>{{ t("about.aml_policy.text_45") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_46')" name="8">
          <div>{{ t("about.aml_policy.text_47") }}</div>
          <div>{{ t("about.aml_policy.text_48") }}</div>
          <li class="my-2">{{ t("about.aml_policy.text_49") }}</li>
          <li class="my-2">{{ t("about.aml_policy.text_50") }}</li>
          <li class="my-2">{{ t("about.aml_policy.text_51") }}</li>
          <li class="my-2">{{ t("about.aml_policy.text_52") }}</li>
          <li class="my-2">{{ t("about.aml_policy.text_53") }}</li>
          <div>{{ t("about.aml_policy.text_54") }}</div>
          <div>{{ t("about.aml_policy.text_55") }}</div>
          <div>{{ t("about.aml_policy.text_56") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_57')" name="9">
          <div>{{ t("about.aml_policy.text_58") }}</div>
          <li class="my-2">{{ t("about.aml_policy.text_59") }}</li>
          <li class="my-2">{{ t("about.aml_policy.text_60") }}</li>
          <li class="my-2">{{ t("about.aml_policy.text_61") }}</li>
          <li class="my-2">{{ t("about.aml_policy.text_62") }}</li>
          <li class="my-2">{{ t("about.aml_policy.text_63") }}</li>
          <div>{{ t("about.aml_policy.text_64") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_65')" name="10">
          <div>{{ t("about.aml_policy.text_66") }}</div>
          <div class="text-700-12 white">{{ t("about.aml_policy.text_67") }}</div>
          <div>{{ t("about.aml_policy.text_68") }}</div>
          <div class="text-700-12 white">{{ t("about.aml_policy.text_69") }}</div>
          <div>{{ t("about.aml_policy.text_70") }}</div>
          <div class="text-700-12 white">{{ t("about.aml_policy.text_71") }}</div>
          <div>{{ t("about.aml_policy.text_72") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_73')" name="11">
          <div>{{ t("about.aml_policy.text_74") }}</div>
          <div>{{ t("about.aml_policy.text_75") }}</div>
          <div>{{ t("about.aml_policy.text_76") }}</div>
          <div>{{ t("about.aml_policy.text_77") }}</div>
          <div>{{ t("about.aml_policy.text_78") }}</div>
          <div class="text-700-12 white mt-2">{{ t("about.aml_policy.text_79") }}</div>
          <div>{{ t("about.aml_policy.text_80") }}</div>
          <div>{{ t("about.aml_policy.text_81") }}</div>
          <div>{{ t("about.aml_policy.text_82") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_83')" name="12">
          <div>{{ t("about.aml_policy.text_84") }}</div>
          <div>{{ t("about.aml_policy.text_85") }}</div>
          <div>{{ t("about.aml_policy.text_86") }}</div>
          <div>{{ t("about.aml_policy.text_87") }}</div>
          <div>{{ t("about.aml_policy.text_88") }}</div>
          <div>{{ t("about.aml_policy.text_89") }}</div>
          <li class="my-1">{{ t("about.aml_policy.text_90") }}</li>
          <li class="my-1">{{ t("about.aml_policy.text_91") }}</li>
          <div>{{ t("about.aml_policy.text_92") }}</div>
          <div>{{ t("about.aml_policy.text_93") }}</div>
          <div>{{ t("about.aml_policy.text_94") }}</div>
          <div>{{ t("about.aml_policy.text_95") }}</div>
          <div>{{ t("about.aml_policy.text_96") }}</div>
          <div>{{ t("about.aml_policy.text_97") }}</div>
          <div>{{ t("about.aml_policy.text_98") }}</div>
          <div>{{ t("about.aml_policy.text_99") }}</div>
          <div>{{ t("about.aml_policy.text_100") }}</div>
          <div>{{ t("about.aml_policy.text_101") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_102')" name="13">
          <div>{{ t("about.aml_policy.text_103") }}</div>
          <div>{{ t("about.aml_policy.text_104") }}</div>
          <div>{{ t("about.aml_policy.text_105") }}</div>
          <li class="my-1">{{ t("about.aml_policy.text_106") }}</li>
          <li class="mt-1">{{ t("about.aml_policy.text_107") }}</li>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_108')" name="14">
          <div>{{ t("about.aml_policy.text_109") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_110')" name="15">
          <div>{{ t("about.aml_policy.text_111") }}</div>
          <div>{{ t("about.aml_policy.text_112") }}</div>
          <div>{{ t("about.aml_policy.text_113") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_114')" name="16">
          <div>{{ t("about.aml_policy.text_115") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_116')" name="17">
          <div>{{ t("about.aml_policy.text_117") }}</div>
          <div>{{ t("about.aml_policy.text_118") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_119')" name="18">
          <div>{{ t("about.aml_policy.text_120") }}</div>
          <li class="mt-1">{{ t("about.aml_policy.text_121") }}</li>
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
