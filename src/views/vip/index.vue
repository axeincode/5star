<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import VIP from "@/components/vip/index.vue";
import MVIP from "@/components/vip/mobile/index.vue";
import { useDisplay } from "vuetify";

const { width } = useDisplay()

const mobileWidth: any = computed(() => {
    return width.value;
})

onMounted(() => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})
</script>

<template>
    <div>
        <VIP v-if="mobileWidth > 600" />
        <MVIP v-else />
    </div>
</template>

<style lang="scss"></style>