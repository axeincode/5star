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
      {{ t("about.responsible_gambling.text_1") }}
    </div>
    <div class="text-400-10 gray mt-2">
      {{ t("about.responsible_gambling.text_2") }}
    </div>
    <div class="text-500-10 white mt-4" style="line-height: 3">
      {{ t("about.responsible_gambling.text_3") }}
    </div>
    <div class="text-500-10 white" style="line-height: 3">
      {{ t("about.responsible_gambling.text_4") }}
    </div>
    <div class="m-about-collapse mt-2">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="t('about.responsible_gambling.text_5')" name="1">
          <div>{{ t("about.responsible_gambling.text_6") }}</div>
          <div>{{ t("about.responsible_gambling.text_7") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.responsible_gambling.text_8')" name="2">
          <div>{{ t("about.responsible_gambling.text_9") }}</div>
          <li>
            <font class="text-700-12 white">
              {{ t("about.responsible_gambling.text_10") }}
            </font>
            {{ t("about.responsible_gambling.text_11") }}
          </li>
          <li>
            <font class="text-700-12 white">
              {{ t("about.responsible_gambling.text_12") }}
            </font>
            {{ t("about.responsible_gambling.text_13") }}
          </li>
          <li>
            <font class="text-700-12 white">
              {{ t("about.responsible_gambling.text_14") }}
            </font>
            {{ t("about.responsible_gambling.text_15") }}
          </li>
          <li>
            <font class="text-700-12 white">
              {{ t("about.responsible_gambling.text_16") }}
            </font>
            {{ t("about.responsible_gambling.text_17") }}
          </li>
          <li>
            <font class="text-700-12 white">
              {{ t("about.responsible_gambling.text_18") }}
            </font>
            {{ t("about.responsible_gambling.text_19") }}
          </li>
        </el-collapse-item>
        <el-collapse-item :title="t('about.responsible_gambling.text_20')" name="3">
          <div>{{ t("about.responsible_gambling.text_20") }}</div>
          <div>{{ t("about.responsible_gambling.text_21") }}</div>
          <div>{{ t("about.responsible_gambling.text_22") }}</div>
          <div>{{ t("about.responsible_gambling.text_23") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.responsible_gambling.text_24')" name="4">
          <div>{{ t("about.responsible_gambling.text_25") }}</div>
          <li>{{ t("about.responsible_gambling.text_26") }}</li>
          <div>{{ t("about.responsible_gambling.text_27") }}</div>
          <div>
            {{ t("about.responsible_gambling.text_28") }}
            <span>
              <a class="m-about-responsible-link">
                {{ t("about.responsible_gambling.text_29") }}
              </a>
            </span>
          </div>
          <div>
            {{ t("about.responsible_gambling.text_30") }}
            <span>
              <a class="m-about-responsible-link">
                {{ t("about.responsible_gambling.text_31") }}
              </a>
            </span>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.responsible_gambling.text_32')" name="5">
          <div>{{ t("about.responsible_gambling.text_33") }}</div>
          <li>{{ t("about.responsible_gambling.text_34") }}</li>
          <div>{{ t("about.responsible_gambling.text_35") }}</div>
          <li>{{ t("about.responsible_gambling.text_36") }}</li>
          <div>{{ t("about.responsible_gambling.text_37") }}</div>
          <li>{{ t("about.responsible_gambling.text_38") }}</li>
          <div>{{ t("about.responsible_gambling.text_39") }}</div>
          <li>{{ t("about.responsible_gambling.text_40") }}</li>
          <div>{{ t("about.responsible_gambling.text_41") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.responsible_gambling.text_42')" name="6">
          <div>{{ t("about.responsible_gambling.text_43") }}</div>
          <div>{{ t("about.responsible_gambling.text_44") }}</div>
          <div>{{ t("about.responsible_gambling.text_45") }}</div>
          <a class="m-about-responsible-link">
            {{ t("about.responsible_gambling.text_46") }}
          </a>
        </el-collapse-item>
        <el-collapse-item :title="t('about.responsible_gambling.text_47')" name="7">
          <div>{{ t("about.responsible_gambling.text_48") }}</div>
          <div>{{ t("about.responsible_gambling.text_49") }}</div>
          <li class="my-2">{{ t("about.responsible_gambling.text_50") }}</li>
          <div>{{ t("about.responsible_gambling.text_51") }}</div>
          <div>{{ t("about.responsible_gambling.text_52") }}</div>
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
  .m-about-responsible-link {
    color: #009B3A;
    text-decoration-line: underline;
  }
}
</style>
