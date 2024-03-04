<script lang="ts" setup>
import { LiveChatWidget } from "@livechat/widget-vue";
import { ref } from "vue";

const license = ref<string>("16597974");
const LiveChatWidgetVisible = ref<boolean>(true);


const handleNewEvent = function () {};
const handleonReady = function () {};
const visibilityChanged = function () {};
</script>

<template>
    <div class="white">    
      <LiveChatWidget
        :license="'17287626'"
        :visibility="'minimized'"
        v-on:new-event="handleNewEvent"
        v-on:ready="handleonReady"
        v-on:visibility-changed="visibilityChanged"
        ref="liveChatWidget"
      />
    </div>
</template>

<style lang="scss" scoped>
.white {
  // color: white;
  // background: red;
  // position: fixed;
  // width: 100%;
  // height: 100px;
}
</style>
