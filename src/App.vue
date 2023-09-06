<script lang="ts" setup>
import { io } from "socket.io-client";
import { ref, onMounted } from "vue";

onMounted(() => {
  const wss = new WebSocket(
    import.meta.env.VITE_SOKET_URL +
      "/user/connect/websocket?authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY0OTQzNzgsImlkIjoiMzI5ODg3MDM3Mzk2MzM2NzciLCJvcmlnX2lhdCI6MTY5MzkwMjM3OH0.HtM4ela723m5Inzs5bz-aqGPzcHcLhALlTNl2PQUDxU"
  );
  wss.onopen = function () {
    console.log("connect");
  };
  wss.onerror = function (error) {
    console.error("WebSocket error:", error);
  };
  // const socket = io(import.meta.env.VITE_SOKET_URL + "/user/connect/websocket");
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
