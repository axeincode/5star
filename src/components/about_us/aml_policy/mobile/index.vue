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
          <div class="my-1">{{ t("about.aml_policy.text_4") }}</div>
          <div>{{ t("about.aml_policy.text_5") }}</div>
          <div>{{ t("about.aml_policy.text_6") }}</div>
          <div>{{ t("about.aml_policy.text_7") }}</div>
          <div>{{ t("about.aml_policy.text_8") }}</div>
          <div>{{ t("about.aml_policy.text_9") }}</div>
          <div>{{ t("about.aml_policy.text_10") }}</div>
          <div>{{ t("about.aml_policy.text_11") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_12')" name="2">
          <div class="mb-1">{{ t("about.aml_policy.text_13") }}</div>
          <div>{{ t("about.aml_policy.text_14") }}</div>
          <div>{{ t("about.aml_policy.text_15") }}</div>
          <div>{{ t("about.aml_policy.text_16") }}</div>
          <div>{{ t("about.aml_policy.text_17") }}</div>
          <div class="mt-1">{{ t("about.aml_policy.text_18") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_19')" name="3">
          <div>{{ t("about.aml_policy.text_20") }}</div>
          <!-- <div class="mt-1">{{ t("about.aml_policy.text_21") }}</div> -->
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_22')" name="4">
          <div>{{ t("about.aml_policy.text_23") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_24')" name="5">
          <div class="text-700-12 white">{{ t("about.aml_policy.text_25") }}</div>
          <div>{{ t("about.aml_policy.text_25_1") }}</div>
          <div class="text-700-12 white">{{ t("about.aml_policy.text_26") }}</div>
          <div>{{ t("about.aml_policy.text_27") }}</div>
          <!-- <div>{{ t("about.aml_policy.text_28") }}</div> -->
          <div class="text-700-12 white my-1">{{ t("about.aml_policy.text_29") }}</div>
          <div>{{ t("about.aml_policy.text_30") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_31')" name="6">
          <div>{{ t("about.aml_policy.text_32") }}</div>
          <div>{{ t("about.aml_policy.text_33") }}</div>
          <div>{{ t("about.aml_policy.text_34") }}</div>
          <div>{{ t("about.aml_policy.text_35") }}</div>
          <div>{{ t("about.aml_policy.text_36") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_37')" name="7">
          <div>{{ t("about.aml_policy.text_38") }}</div>
          <div>{{ t("about.aml_policy.text_39") }}</div>
          <div>{{ t("about.aml_policy.text_40") }}</div>
          <div>{{ t("about.aml_policy.text_41") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_42')" name="8">
          <div>{{ t("about.aml_policy.text_43") }}</div>
          <div class="mt-1">{{ t("about.aml_policy.text_44") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_45") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_46") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_47") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_48") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_49") }}</div>
          <div>{{ t("about.aml_policy.text_50") }}</div>
          <div>{{ t("about.aml_policy.text_51") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_52')" name="9">
          <div>{{ t("about.aml_policy.text_53") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_54") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_55") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_56") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_57") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_58") }}</div>
          <div>{{ t("about.aml_policy.text_59") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_60')" name="10">
          <div>{{ t("about.aml_policy.text_61") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_62") }}</div>
          <div>{{ t("about.aml_policy.text_63") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_64") }}</div>
          <div>{{ t("about.aml_policy.text_65") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_66") }}</div>
          <div>{{ t("about.aml_policy.text_67") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_68')" name="11">
          <div>{{ t("about.aml_policy.text_69") }}</div>
          <div>{{ t("about.aml_policy.text_70") }}</div>
          <div>{{ t("about.aml_policy.text_71") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_72')" name="12">
          <div>{{ t("about.aml_policy.text_73") }}</div>
          <div>{{ t("about.aml_policy.text_74") }}</div>
          <div>{{ t("about.aml_policy.text_75") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_76')" name="13">
          <div>{{ t("about.aml_policy.text_77") }}</div>
          <div>{{ t("about.aml_policy.text_78") }}</div>
          <div class="my-2 text-700-12 white">{{ t("about.aml_policy.text_79") }}</div>
          <div>{{ t("about.aml_policy.text_80") }}</div>
          <div class="my-2 text-700-12 white">{{ t("about.aml_policy.text_81") }}</div>
          <div>{{ t("about.aml_policy.text_82") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_83") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_84") }}</div>
          <div>{{ t("about.aml_policy.text_85") }}</div>
          <div class="my-2 text-700-12 white">{{ t("about.aml_policy.text_86") }}</div>
          <div>{{ t("about.aml_policy.text_87") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_88')" name="14">
          <div>{{ t("about.aml_policy.text_89") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_90") }}</div>
          <div class="my-2">{{ t("about.aml_policy.text_91") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_92')" name="15">
          <div>{{ t("about.aml_policy.text_93") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_94')" name="16">
          <div>{{ t("about.aml_policy.text_95") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_96')" name="17">
          <div>{{ t("about.aml_policy.text_97") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_98')" name="18">
          <div>{{ t("about.aml_policy.text_99") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.aml_policy.text_100')" name="19">
          <div>{{ t("about.aml_policy.text_101") }}</div>
          <div class="mt-1">{{ t("about.aml_policy.text_102") }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
