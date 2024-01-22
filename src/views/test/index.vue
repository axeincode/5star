<script lang="ts" setup>
import { ref, onMounted } from "vue";

const cards = ref<Array<any>>([
  { title: "Card 1", content: "This is the content of card 1" },
  { title: "Card 2", content: "This is the content of card 2" },
  { title: "Card 3", content: "This is the content of card 3" },
]);

const items = ref<Array<string>>(["Item 1", "Item 2", "Item 3"]);

const currentIndex = ref<number>(-1);

const lastScrollTop = ref<number>(0);

const showNextItem = () => {
  currentIndex.value++;
  if (currentIndex.value < items.value.length) {
    setTimeout(showNextItem, 1000);
  }
};

const handleWindowScroll = (event: any) => {
  console.log("ok");
};

onMounted(() => {
  showNextItem();
  window.addEventListener("scroll", handleWindowScroll);
  let lastScrollTop = 0;
  const listContainer = document.querySelector(".list-container");
});
</script>

<template>
  <div class="circle">
    <div>A</div>
    <div>B</div>
    <div>C</div>
    <div>D</div>
    <div>E</div>
    <div>F</div>
  </div>
</template>

<style lang="scss">
.circle {
  width: 200px;
  height: 200px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle div {
  position: absolute;
  transform: rotate(0deg) translateY(-100px) rotate(-60deg);
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}

.circle div:nth-child(1) {
  transform: rotate(0deg) translateY(85px);
}

.circle div:nth-child(2) {
  transform: rotate(60deg) translateY(-100px) rotate(-60deg);
}

.circle div:nth-child(3) {
  transform: rotate(120deg) translateY(-100px) rotate(-60deg);
}

.circle div:nth-child(4) {
  transform: rotate(180deg) translateY(85px);
}

.circle div:nth-child(5) {
  transform: rotate(240deg) translateY(-100px) rotate(-60deg);
}

.circle div:nth-child(6) {
  transform: rotate(300deg) translateY(-100px) rotate(-60deg);
}
</style>
