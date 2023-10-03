<script lang="ts" setup>
import { ref, onMounted, Suspense } from "vue";
import { RouterView } from "vue-router";

onMounted(() => {});
</script>

<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style lang="scss">
@font-face {
  font-family: "Inter";
  src: local("Inter"),
    url(./fonts/Inter/Inter-VariableFont_slntwght.ttf) format("truetype");
}

@font-face {
  font-family: "Bauhaus 93";
  src: local("Bauhaus 93"), url(./fonts/Bauhaus/BauhausRegular.ttf) format("truetype");
}
</style>
