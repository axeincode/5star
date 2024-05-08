<template>
  <v-dialog
    v-model="modelValueNew"
    transition="dialog-top-transition"
    class="m-activity-dialog"
    :style="{
      height: 'unset',
      top: '0px',
      zIndex: 90000000,
    }"
  >
    <VipBar v-if="modelValueNew" :id="id" @close="handleClose"></VipBar>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import VipBar from './index2.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  id:{
    type:String,
  }
});

const emit = defineEmits(["update:modelValue"]);

const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

// 关闭弹窗
const handleClose=()=>{
   emit("update:modelValue", false);
}


onMounted(async () => {});

</script>

<style lang="scss" scoped>
.m-activity-dialog {
  width: 100vw !important;
  ::v-deep(.v-overlay__content) {
    top: 0px;
    margin: 0;
    width: 100vw !important;
    max-width: 100vw !important;
  }
}
</style>