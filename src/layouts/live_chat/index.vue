<script lang="ts" setup>
// import { LiveChatWidget } from "@livechat/widget-vue";
import { ref, onMounted } from "vue";
import icon_public_45 from "@/assets/public/svg/icon_public_45.svg";
import { liveChatStore } from "@/store/liveChat";

const { setLiveChatMaximize, LiveChatWidget, setInitialData, getVisibility, setLiveChatVisibility } = liveChatStore()
const license = ref<string>("16597974");

const supportIconColor = ref<string>("#7782AA");
const supportIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", supportIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", supportIconColor.value);
    }
  }
  return el;
};

onMounted(() => {
  LiveChatWidget?.on?.('ready', onReadyHandler);
  LiveChatWidget?.on?.('visibility_changed', onVisibilityChanged);
});

// LiveChat最大化
const openLiveChat = () => {
  setLiveChatMaximize()
}
const onReadyHandler = (initialData:any):void => {
  console.log(initialData);
  
  // 初始化数据
  setInitialData(initialData)
}
const onVisibilityChanged = (data:any):void => {
  console.log(data);
  setLiveChatVisibility(data.visibility)
  console.log(getVisibility, 'getVisibility');
}
const handleNewEvent = function () {};
const handleonReady = function () {};
const visibilityChanged = function () {};
</script>

<template>
  <div class="live-chat-container">
    <inline-svg
      :src="icon_public_45"
      width="44"
      height="44"
      :transform-source="supportIconTransform"
      @click="openLiveChat"
    ></inline-svg>
  </div>
</template>

<style lang="scss" scoped>
.live-chat-container {
  color: white;
  position: fixed;
  width: 44px;
  height: 44px;
  right: 16px;
  bottom: 120px;
  background: white;
  border-radius: 50%;
}
</style>
