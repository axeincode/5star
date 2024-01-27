<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
const MVIP = defineAsyncComponent(() => import("@/components/vip/mobile/index1.vue"));
</script>


<template>
    <MVIP />
</template>