
<script lang="ts" setup>
import { ref, computed } from "vue";
import NavBarLayout from './NavBar.vue';
import MNavBarLayout from './MobileNavBar.vue';
import UserNavBarLayout from './UserNavBar.vue';
import RightBarLayout from './RightBar.vue';
import AppBarLayout from './AppBar.vue'
import MainLayout from './Main.vue'
import MobileMenuLayout from './MobileMenu.vue';
import RefferalLayout from './RefferalBar.vue';
import { useDisplay } from 'vuetify';
import { refferalStore } from '@/store/refferal';
import { storeToRefs } from "pinia";

const { width } = useDisplay();

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value
})

const mobileWidth = computed(() => {
  return width.value
})

const handleScroll = () => {
  console.log("scroll");
}
</script>

<template>
  <v-app>
    <RefferalLayout v-if="refferalAppBarShow" />
    <AppBarLayout />
      <NavBarLayout v-if="mobileWidth > 600" />
      <MNavBarLayout v-else />
    <UserNavBarLayout />
    <MainLayout />
    <RightBarLayout v-if="mobileWidth > 600" />
    <MobileMenuLayout v-if="mobileWidth < 600" />
  </v-app>
</template>

<style lang="scss"></style>