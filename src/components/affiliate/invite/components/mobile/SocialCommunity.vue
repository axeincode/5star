<script setup lang="ts">
import { onMounted, watch, toRefs } from "vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import icon_public_28 from "@/assets/public/svg/icon_public_28.svg";
import icon_public_29 from "@/assets/public/svg/icon_public_29.svg";
import icon_public_30 from "@/assets/public/svg/icon_public_30.svg";
import icon_public_31 from "@/assets/public/svg/icon_public_31.svg";
import icon_public_32 from "@/assets/public/svg/icon_public_32.svg";
import icon_public_33 from "@/assets/public/svg/icon_public_33.svg";

const { t } = useI18n();
const { width } = useDisplay();

const socialIcons = ref<Array<any>>([
  icon_public_28,
  icon_public_32,
  icon_public_33,
  icon_public_29,
  icon_public_30,
  icon_public_31,
]);

const mobileWidth = computed(() => {
  return width.value;
});
</script>

<template>
  <v-card
    color="#1D2027"
    theme="dark"
    class="text-center m-social-community-card mx-4 mt-6 px-8 py-4"
  >
    <div class="d-flex align-center justify-center">
      <img src="@/assets/affiliate/invite/image/img_agent_5.png" width="42" />
      <p class="text-700-12 white">{{ t("affiliate.invite.text_10") }}</p>
    </div>
    <div class="d-flex align-center justify-center mt-2">
      <template v-for="(icon, index) in socialIcons">
        <img :src="icon" width="32" class="mr-2" />
      </template>
    </div>
  </v-card>
</template>

<style lang="scss">
.m-social-community-card {
  border-radius: 8px;
  background: linear-gradient(0deg, #29263f 0%, #4a32aa 100%);
}
</style>
