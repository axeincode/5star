<script lang="ts" setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
const MSearch = defineAsyncComponent(() => import("@/components/global/search/mobile/index.vue"));


const searchText = ref()

const handleSearchInput = () => {}
onMounted(() => {});
</script>

<template>
  <div class="test-container">
    <!-- <img src="https://pix.kim/res/game/BGAMING/56469862184124429.jpg" alt="Image" /> -->
    <MSearch></MSearch>

    <form action="javascript:return true;" @submit.prevent>
      <v-text-field
        ref="searchRef"
        :placeholder="'search'"
        class="form-textfield1 dark-textfield"
        variant="solo"
        hide-details
        filled
        clearable
        density="compact"
        prepend-inner-icon="mdi-magnify"
        color="#7782AA"
        @input="handleSearchInput"
        @keypress="handleSearchInput"
        v-model="searchText"
      />
    </form>
  </div>
</template>

<style lang="scss">
.test-container {
  // width: 300px;
  /* Set the desired width of the container */
  // height: 200px;
  /* Set the desired height of the container */
  height: 100vh;
  overflow: hidden;

  .form-textfield1 {
    padding-top: 500px;
    height: 600px;


    .v-field__input {
      font-size: 16px;
    }
  }
}

.image-container img {
  object-fit: none;
  object-position: -50px -100px;
  /* Adjust the values to position the specific area */
  width: 100%;
  height: 100%;
}
</style>
