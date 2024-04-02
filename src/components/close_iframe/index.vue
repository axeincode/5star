<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
const emit = defineEmits(['close']);

// 拖拽按钮元素引用
const draggableButton = ref<HTMLButtonElement | null>(null);

// 鼠标/触摸事件初始坐标
let startX = 20;
let startY = 20;

// 按钮当前位置
let buttonX = 20;
let buttonY = 20;

// 是否是拖动事件
let isDragging = false;

// 鼠标按下/触摸开始事件处理函数
const handleStart = (event: MouseEvent | TouchEvent) => {
  event.preventDefault();
  // 设置按钮完全不透明
  draggableButton.value.style.opacity = "1"; 

  // 空值检查，确保元素引用不为空
  if (!draggableButton.value) return;

  // 记录鼠标/触摸点的初始坐标
  startX = event.type === 'mousedown' ? (event as MouseEvent).clientX : (event as TouchEvent).touches[0].clientX;
  startY = event.type === 'mousedown' ? (event as MouseEvent).clientY : (event as TouchEvent).touches[0].clientY;

  // 添加鼠标移动/触摸移动和鼠标松开/触摸结束事件监听器
  document.addEventListener(event.type === 'mousedown' ? 'mousemove' : 'touchmove', handleMove);
  document.addEventListener(event.type === 'mousedown' ? 'mouseup' : 'touchend', handleEnd);
};

// 鼠标移动/触摸移动事件处理函数
const handleMove = (event: MouseEvent | TouchEvent) => {
  event.preventDefault();

  // 设置按钮完全不透明
  draggableButton.value.style.opacity = "1"; 

  // 空值检查，确保元素引用不为空
  if (!draggableButton.value) return;

  // 计算鼠标/触摸移动的距离
  const moveX = event.type === 'mousemove' ? (event as MouseEvent).clientX : (event as TouchEvent).touches[0].clientX;
  const moveY = event.type === 'mousemove' ? (event as MouseEvent).clientY : (event as TouchEvent).touches[0].clientY;
  const dx = moveX - startX;
  const dy = moveY - startY;

  // 更新按钮的位置
  buttonX += dx;
  buttonY += dy;

  // 限制按钮位置不超出可视范围
  const maxX = window.innerWidth - draggableButton.value.offsetWidth;
  const maxY = window.innerHeight - draggableButton.value.offsetHeight;
  buttonX = Math.max(0, Math.min(maxX, buttonX));
  buttonY = Math.max(0, Math.min(maxY, buttonY));

  draggableButton.value.style.left = buttonX + 'px';
  draggableButton.value.style.top = buttonY + 'px';

  // 更新鼠标/触摸点的初始坐标
  startX = moveX;
  startY = moveY;

  // 标记为拖动事件
  isDragging = true;
};

// 鼠标松开/触摸结束事件处理函数
const handleEnd = (event: MouseEvent | TouchEvent) => {
  event.preventDefault();

  // 空值检查，确保元素引用不为空
  if (!draggableButton.value) return;

  // 移除鼠标移动/触摸移动和鼠标松开/触摸结束事件监听器
  document.removeEventListener(event.type === 'mouseup' ? 'mousemove' : 'touchmove', handleMove);
  document.removeEventListener(event.type === 'mouseup' ? 'mouseup' : 'touchend', handleEnd);

  // 如果是拖动事件，则阻止触发单击事件
  if (isDragging) {
    event.stopPropagation();
  }

  // 如果不是拖动事件，则执行按钮的单击事件
  if (!isDragging) {
    // 执行按钮的单击事件
    // 触发自定义事件，并传递数据给父组件
    emit('close');
  } else {
    // 设置按钮完全不透明
    draggableButton.value.style.opacity = "0.5"; 
  }

  // 重置拖动状态
  isDragging = false;
  // 重置按钮透明度
  draggableButton.value.style.opacity = "0.5"; 
};

onMounted(() => {
  // 添加鼠标按下/触摸开始事件监听器
  draggableButton.value?.addEventListener('mousedown', handleStart);
  draggableButton.value?.addEventListener('touchstart', handleStart);
});

onUnmounted(() => {
  // 移除事件监听器
  draggableButton.value?.removeEventListener('mousedown', handleStart);
  draggableButton.value?.removeEventListener('touchstart', handleStart);
});

// 监听窗口大小改变事件，重新计算按钮位置限制
window.addEventListener('resize', () => {
  if (!draggableButton.value) return;

  const maxX = window.innerWidth - draggableButton.value.offsetWidth;
  const maxY = window.innerHeight - draggableButton.value.offsetHeight;
  buttonX = Math.max(0, Math.min(maxX, buttonX));
  buttonY = Math.max(0, Math.min(maxY, buttonY));
  draggableButton.value.style.left = buttonX + 'px';
  draggableButton.value.style.top = buttonY + 'px';
});
</script>

<template>
  <!-- 拖拽按钮 -->
  <button ref="draggableButton" class="draggable-button"></button>
</template>

<style scoped lang="scss">
/* 按钮样式 */
.draggable-button {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
  background: url(@/assets/common/close-iframe.svg);
  border: none;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: transparent;
  opacity: 1;
  z-index: 111111111;
  outline: none;
  opacity: 0.5;
  transition: opacity .5s;
}

.draggable-button:hover {
  opacity: 1;
}

</style>