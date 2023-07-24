
<script lang="ts" setup>
import { ref, computed } from "vue";
import NavBarLayout from './NavBar.vue';
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
  const {getRefferalAppBarShow} = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value
})

const mobileWidth = computed(() => {
  return width.value
})
</script>

<template>
  <v-app>
    <RefferalLayout v-if="refferalAppBarShow"/>
    <AppBarLayout />
    <NavBarLayout />
    <UserNavBarLayout />
    <MainLayout />
    <RightBarLayout v-if="mobileWidth > 600" />
    <MobileMenuLayout v-if="mobileWidth < 600" />
  </v-app>
</template>

<style lang="scss">
.v-navigation-drawer__scrim {
  opacity: 0.8 !important;
}
</style>