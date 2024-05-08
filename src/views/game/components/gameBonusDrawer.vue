<template>
  <v-dialog 
    v-model="modelValueNew"
    width="100%"
    :scrim="true"
    transition="scale-transition"
    style="z-index: 99999999"
  >

    <div class="game-bonus-drawer-body">
      <img class="game-bonus-drawer-close-button-box" src="@/assets/public/svg/icon_public_10.svg"  @click="handleClose" />
      <img class="warn-img" src="@/assets/public/svg/waring.svg" />
      <div class="bonus-title"> {{ t("game.text_1") }}</div>
      <div class="bonus-des"> 
        <span>{{ t("game.text_2") }}</span>
        <span class="num">$999.999.000</span>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
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
:deep.v-dialog .v-overlay__content {
  top: 0;
  margin: 0;
  max-width: 100% !important;
}
.game-bonus-drawer-body {
  height: 190px;
  background: rgba(29, 32, 39, 1) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .game-bonus-drawer-close-button-box {
    position: absolute;
    right: 16px;
    top: 21px;
  }
  .warn-img{
    widows: 38px;
    height: 38px;
    margin-top: 40px;
  }
  .bonus-title {
    width: 196px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    margin: 8px 0 13px 0;
  }
  .bonus-des {
    color: rgba(119, 130, 170, 1);
    font-size: 12px;
    line-height: 14px;
  }
  .num {
    font-size: 12px;
    font-weight: 700;
    color: rgba(249, 188, 1, 1);
  }
}
</style>