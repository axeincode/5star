<script lang="ts" setup>
import { LiveChatWidget } from "@livechat/widget-vue";
import { ref } from "vue";

const license = ref<string>("16597974");
const LiveChatWidgetVisible = ref<boolean>(true);

console.log(license, "license");

const handleNewEvent = function() {}
const handleonReady = function() {}
const visibilityChanged = function() {}
</script>

<template>
  <!-- <div> -->
    <div class="white">11111</div>
    <!-- <LiveChatWidget
      :license="'16597974'"
      :visibility="'minimized'"
      v-on:new-event="handleNewEvent"
      v-on:ready="handleonReady"
      v-on:visibility-changed="visibilityChanged"
      ref="liveChatWidget"
    /> -->
  <!-- </div> -->
</template>

<style lang="scss" scoped>
.white {
    color: white;
    background: red;
    position: fixed;
    width: 100%;
    height: 100px;
}
</style>
