<script lang="ts" setup>
import { ref, onMounted } from "vue";

onMounted(() => {});
</script>

<template>
  <div class="image-container">
    <img src="https://pix.kim/res/game/BGAMING/56469862184124429.jpg" alt="Image" />
  </div>
</template>

<style lang="scss">
.image-container {
  width: 300px; /* Set the desired width of the container */
  height: 200px; /* Set the desired height of the container */
  overflow: hidden;
}

.image-container img {
  object-fit: none;
  object-position: -50px -100px; /* Adjust the values to position the specific area */
  width: 100%;
  height: 100%;
}
</style>
