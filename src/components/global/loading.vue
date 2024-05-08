<template>
  <div class="m-loading" :style="`height: ${porps.height}`">
    <div class="loading-body">
      <div class="dot-0"></div>
      <div class="dot-1"></div>
      <div class="dot-0"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const porps = defineProps({
  height: {
    type: String,
    default: "100vh",
  },
});
</script>

<style lang="scss" scoped>
.m-loading {
  position: relative;
  overflow-y: hidden;

  .loading-body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    // position: absolute;
    // top: 40%;
    // left: 50%;
    // transform: translateX(-50%);

    .dot-0 {
      width: 10px;
      height: 10px;
      background: #12ff76;
      border-radius: 10px;
      margin: 0px 4px;
      animation: expandAnimation 0.6s 0.1s ease-in infinite;
    }

    .dot-1 {
      width: 16px;
      height: 16px;
      background: #12ff76;
      border-radius: 16px;
      margin: 0px 4px;
      animation: expandReverseAnimation 0.6s 0.1s ease-in infinite;
    }
  }
}

@keyframes expandAnimation {
  0% {
    scale: 1.3;
  }

  50% {
    scale: 1;
  }

  100% {
    scale: 1.3;
  }
}

@keyframes expandReverseAnimation {
  0% {
    scale: 0.8;
  }

  50% {
    scale: 1.2;
  }

  100% {
    scale: 0.8;
  }
}
</style>