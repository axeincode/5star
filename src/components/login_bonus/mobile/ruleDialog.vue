<template>
  <v-dialog
    v-model="modelValueNew"
    width="100%"
    :scrim="true"
    transition="scale-transition"
    style="z-index: 9147483646"
  >
    <div class="rule-dialog-container">
      <div class="dialog-title">RULES</div>
      <div class="rule-dialog-body">
        <img class="rule-img" src="@/assets/vip/image/rule-dialog.png" alt="" />
        <p class="body-title">{{ t("vip.vip_level_info.rule.text6") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text7") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text8") }}</p>
        <p class="body-title">{{ t("vip.vip_level_info.rule.text9") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text10") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text11") }}</p>
        <p class="body-title">{{ t("vip.vip_level_info.rule.text12") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text13") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text14") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text15") }}</p>
        <p class="body-title">{{ t("vip.vip_level_info.rule.text16") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text17") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text18") }}</p>
        <p class="body-text">{{ t("vip.vip_level_info.rule.text19") }}</p>
      </div>
      <div class="btn-box">
        <v-btn class="mr-3 text-none button-bright reward-btn" height="48" @click="handleClose">{{
          t("vip.vip_level_info.rule.text20")
        }}</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps({
  modelValue: {
    type: Boolean
  }
});

const emit = defineEmits(["update:modelValue"]);
const { t } = useI18n();
const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});

// 关闭弹窗
const handleClose = () => {
  emit("update:modelValue", false);
};

onMounted(async () => {});
</script>

<style lang="scss" scoped>
.rule-dialog-container {
  border-radius: 16px;
  background: #1d2027;
  padding: 24px 16px;
  .dialog-title {
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    text-align: center;
  }
  .rule-dialog-body {
    padding: 8px;
    border-radius: 14px;
    margin: 16px 0 24px 0;
    background: #15161c;
    height: 410px;
    overflow: scroll;
    .rule-img {
      width: 100%;
      height: 150px;
      margin-bottom: 36px;
    }
    .body-title {
      font-size: 12px;
      color: #fff;
      margin-bottom: 24px;
    }
    .body-text {
      font-size: 12px;
      color: rgba(119, 130, 170, 1);
      margin-bottom: 24px;
    }
  }
  .btn-box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
:deep button .v-btn__content {
  font-size: 14px;
}
</style>