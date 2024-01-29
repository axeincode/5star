<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();

const mobileWidth = computed(() => {
  return width.value;
});
</script>
<template>
  <v-card class="m-agent-referral-footer-card-bg ma-2 pa-3 py-5 mb-4">
    <v-row class="mx-1 align-center">
      <v-col cols="12" md="6" lg="6">
        <div class="mt-4 text-800-12 white">
          {{ t("affiliate.invite.invite_text_9") }}
        </div>
        <div class="mt-4 text-500-12 white">
          {{ t("affiliate.invite.invite_text_10") }}
        </div>
        <div class="mt-4 text-800-12 color-1ACB51">
          {{ t("affiliate.invite.invite_text_11") }}
        </div>
        <div class="mt-4 text-500-12 white">
          {{ t("affiliate.invite.invite_text_12") }}
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="6" class="d-flex align-center justify-center">
        <img
          src="@/assets/affiliate/invite/image/img_agent_03.png"
          class="mt-4 m-invite-img-3"
          width="281"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss">
.m-agent-referral-footer-card-bg {
  background: linear-gradient(
    52deg,
    $agent_color_1 22.05%,
    $agent_color_2 100%
  ) !important;
  border-radius: 8px !important;
}
</style>
