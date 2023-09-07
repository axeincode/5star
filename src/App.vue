<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { createWebSocket } from "@/plugins/socket";

onMounted(() => {
  // const socket = createWebSocket("user");
  // socket.onopen = function () {
  //   console.log("connected");
  // };
  // socket.onmessage = function (event) {
  //   console.log(event);
  // };
  // socket.onerror = function (error) {
  //   console.error("WebSocket Error:", error);
  // };
});
</script>

<template>
  <router-view />
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
