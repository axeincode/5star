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
  <!-- <div class="circle-container"> -->
  <div class="circle">
    <div class="letter">C</div>
    <div class="letter">A</div>
    <div class="letter">S</div>
    <div class="letter">I</div>
    <div class="letter">N</div>
    <div class="letter">O</div>
  </div>
  <!-- </div> -->
  <div class="trapezoid"></div>
  <!-- <div class="container">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['item', { show: index <= currentIndex }]"
    >
      {{ item }}
    </div>
  </div> -->
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.item {
  opacity: 0;
  transition: opacity 0.5s;
}

.item.show {
  opacity: 1;
}
.trapezoid {
  width: 200px;
  height: 0;
  border-bottom: 100px solid #ccc;
  // border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  // border-radius: 20px;
}
.list-container {
  background-color: white;
  display: none;
}

.list-container.show-list {
  display: block;
}
.circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Adjust as needed */
}

.circle {
  width: 200px; /* Adjust as needed */
  height: 200px; /* Adjust as needed */
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
}

.letter {
  position: absolute;
  transform-origin: center;
  font-size: 20px; /* Adjust as needed */
  transform: rotateY(0deg) rotateZ(0deg);
  text-align: center;
}
.letter:nth-child(1) {
  transform: rotateZ(261deg) translateY(-80px) rotateZ(-545deg);
}

.letter:nth-child(2) {
  transform: rotateZ(248deg) translateY(-80px) rotateZ(-184deg);
}

.letter:nth-child(3) {
  transform: rotateZ(236deg) translateY(-81px) rotateZ(-189deg);
}

.letter:nth-child(4) {
  transform: rotateZ(0deg) translateY(-80px) rotateZ(0deg);
}

.letter:nth-child(5) {
  transform: rotateZ(0deg) translateY(-80px) rotateZ(0deg);
}

.letter:nth-child(6) {
  transform: rotateZ(0deg) translateY(-80px) rotateZ(0deg);
}
</style>
