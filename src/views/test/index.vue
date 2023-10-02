<script lang="ts" setup>
import { ref, onMounted } from "vue";

const cards = ref<Array<any>>([
  { title: "Card 1", content: "This is the content of card 1" },
  { title: "Card 2", content: "This is the content of card 2" },
  { title: "Card 3", content: "This is the content of card 3" },
]);

const lastScrollTop = ref<number>(0);

const handleScroll = (event: any) => {};

onMounted(() => {
  let lastScrollTop = 0;
  const listContainer = document.querySelector(".list-container");
});
</script>

<template>
  <div
    class="list-container"
    @scroll="handleScroll"
    style="height: 100px; overflow-y: scroll"
  >
    <div v-for="(card, index) in cards" :key="index" class="card">
      <h2>{{ card.title }}</h2>
      <p>{{ card.content }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.list-container {
  background-color: white;
  display: none;
}

.list-container.show-list {
  display: block;
}
</style>
