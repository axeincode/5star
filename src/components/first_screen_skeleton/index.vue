<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { appCurrencyStore } from "@/store/app";
import { useRoute } from 'vue-router';
import { computed, onMounted, Suspense, defineAsyncComponent, nextTick, ref } from "vue";
// 设置首屏是否显示
const { setIsShowSkeleton } = appCurrencyStore()
// 获取显示状态
const isShowSkeleton = computed(() => {
  const { getIsShowSkeleton } = storeToRefs(appCurrencyStore());
  return getIsShowSkeleton.value;
});

const route = useRoute();

onMounted(async () => {
  // 判断是否在首页
  const domainUrl = window.location.href
  console.log(domainUrl, 'domainUrldomainUrldomainUrl');
  const url = new URL(domainUrl);
  if (url.pathname !== '/') {
    nextTick(() => {
      // 设置首屏加载动画关闭
      setIsShowSkeleton(false)
    })
  }

})

</script>

<template>
  <div class="first" v-if="isShowSkeleton">
    <img src="@/assets/first-animation.gif" alt="">
  </div>
</template>

<style lang="scss" scoped>
.first {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100VH;
  background: #15161c;
  z-index: 1000000008;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
  }
}

</style>
