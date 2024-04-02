<script lang="ts" setup>
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { width } = useDisplay();

const mobileWidth = computed(() => {
  return width.value;
});

const downLoadApp = () => {
  console.log("downLoadApp");
};
</script>

<template>
  <div class="screen">
    <template v-if="mobileWidth < 1000">
    <div class="screen-tips">
      <img class="screen-img" src="@/assets/common/screen-phone.jpg" />
      <span class="tips-text">Rotate phone screen</span>
    </div>
    <div class="down-btn" @click="downLoadApp"></div>
  </template>
  <template v-else>
      <div class="pc-down-btn" @click="downLoadApp"></div>
  </template>
  </div>
</template>

<style lang="scss">
.screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000000009;
//   background: url("@/assets/common/screen.jpg");
//   background-size: cover;
  background: #000;
  padding: 50px;
  .screen-tips {
    display: flex;
    flex-direction: column;
    align-items: center;
    .screen-img {
      width: 48px;
      height: 48px;
    }
    .tips-text {
      color: #7782aa;
      font-size: 12px;
      margin-top: 16px;
    }
  }
  .down-btn {
    width: 310px;
    height: 76px;
    background: url("@/assets/common/downLoad.jpg");
    background-size: cover;
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translate(-50%,0);
  }
  .pc-down-btn {
    width: 490px;
    height: 117px;
    background: url("@/assets/common/pc-downLoad.jpg");
    background-size: cover;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
