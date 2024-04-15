<script lang="ts" setup>
import { onMounted, onBeforeUnmount, computed, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
const { name, width } = useDisplay();
const { t } = useI18n();

const props = defineProps({
  validationText: {
    type: String,
    default: ''
  },
  validationTitleText: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['close']);

const closePopup = (event: any) => {
  // 获取父元素的 DOM 元素
  const parentElement: Element | null = document.querySelector('.m-vip--illustrate--icon');
  // 检查点击事件的目标元素是否是父元素
  if (!parentElement.contains(event.target)) {
    emit('close');
  }
};

const mobileWidth = computed(() => {
  return width.value;
});

const removeClickListener = () => {
  window.removeEventListener('click', closePopup);
};

watchEffect((onInvalidate) => {
  if (props.show) {
    // 添加点击事件监听器
    window.addEventListener('click', closePopup);
  } else {
    // 移除点击事件监听器
    removeClickListener();
  }

  // 在下一个渲染周期之前调用，用于清理副作用
  onInvalidate(() => {
    removeClickListener();
  });
});
// 在组件销毁之前移除点击事件监听器
onBeforeUnmount(() => {
  removeClickListener();
});
</script>

<template>
  <div class="pa-2 animate glow delay-1 fade-in" :class="[
    mobileWidth > 600
      ? 'amount-validation-box-container'
      : 'mobile-amount-validation-box-container',
  ]">
    <div class="label-text-sm ml-2 mt-1 slate-gray receive-validation-box">
      <p class="validation-title">{{ validationTitleText }}</p>
      <p>{{ validationText }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-amount-validation-box-container {
  position: absolute;
  right: -24px;
  bottom: 16px;
  width: 94%;
  background: #15161C;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  margin: 12px;
  padding-bottom: 0px !important;
  z-index: 2;

  .validation-caution-img {
    // position: relative;
    // top: 2px;
    margin: 0 16px 0 10px;
  }

  .validation-title {
    width: 100%;
    margin: 11px 0 15px 0 !important;
    text-align: center;
  }

  .receive-validation-box {
    // display: flex;
    // align-items: center;
    text-align: left;
  }
}

.amount-validation-box-container {
  position: absolute;
  bottom: 64px;
  width: 380px;
  background: #15161C;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  margin: 12px;
  padding-bottom: 0px !important;
  margin-left: 58px;
  z-index: 2;

  .validation-caution-img {
    position: relative;
    top: 2px;
  }

  .validation-title {
    margin-top: 22px !important;
    margin-left: 10px;
  }
}

.mobile-amount-validation-box-container::after {
  display: flex;
  content: "";
  position: relative;
  align-self: center;
  float: right;
  top: 16px;
  bottom: 0px;
  right: 14px;
  width: 0px;
  height: 0px;
  border: 9px solid #15161C;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 2;
  border-right-width: 5px;
  border-left-width: 5px;
}

.amount-validation-box-container::after {
  display: flex;
  content: "";
  position: relative;
  align-self: center;
  float: right;
  top: 16px;
  bottom: 0px;
  right: 14px;
  width: 0px;
  height: 0px;
  border: 9px solid #15161C;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 2;
  border-right-width: 5px;
  border-left-width: 5px;
}

// animation
.animate {
  animation-duration: 0.15s;
  animation-delay: 0.1s;
  animation-name: animate-fade;
  animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
  animation-fill-mode: backwards;
}

.animate.glow {
  animation-name: animate-glow;
  animation-timing-function: ease;
}

@keyframes animate-glow {
  0% {
    opacity: 0;
    filter: brightness(3) saturate(3);
    transform: scale(0.8, 0.8);
  }

  100% {
    opacity: 1;
    filter: brightness(1) saturate(1);
    transform: scale(1, 1);
  }
}

.delay-1 {
  animation-delay: 0.1s;
}
</style>
