<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();

const slider = ref<number>(0);
const min = 0;
const max = 101;

const mobileWidth = computed(() => {
  return width.value;
});

watch(slider, (newValue) => {
  if (slider.value > 97) {
    slider.value = 97;
  }
});
</script>
<template>
  <v-row class="mt-4 justify-center px-10">
    <div class="text-400-12 gray text-center">
      {{ t("affiliate.invite.commission_content_text") }}
    </div>
  </v-row>
  <v-card class="invite-right-card-bg mt-5 mx-3 pa-3 py-5">
    <v-row class="mx-0">
      <v-col cols="12" md="6" lg="6">
        <div class="text-700-14 white">{{ t("affiliate.invite.invite_text_1") }}</div>
        <div class="text-400-12 white mt-4">
          {{ t("affiliate.invite.invite_text_2") }}
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_3_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_3_2") }}</span>
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_4_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_4_2") }}</span>
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_5_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_5_2") }}</span>
        </div>
        <img
          src="@/assets/affiliate/invite/image/img_agent_19.png"
          class="mt-6"
          style="width: 100%; max-width: 630px"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6" class="text-center">
        <img
          src="@/assets/affiliate/invite/image/img_agent_02.png"
          class="mt-1"
          style="width: 80%; max-width: 410px"
        />
        <div class="m-footer-body-bg">
          <div class="text-700-12 white pt-4">
            {{ t("affiliate.invite.invite_text_6") }}
          </div>
          <div class="footer-body-cash-text pt-2" style="font-size: 26px">
            R$ {{ Math.ceil(slider) }}
          </div>
          <div class="text-400-10 gray mx-2">
            <span>{{ t("affiliate.invite.invite_text_7") }}</span>
            <Font color="#F9BC01" class="text-800-10">{{ Math.ceil(slider) }}</Font>
            <span>{{ t("affiliate.invite.invite_text_8") }}</span>
          </div>
          <div class="mx-2 py-3">
            <v-slider
              v-model="slider"
              color="#009B3A"
              class="align-center"
              rounded="rounded-xl"
              :max="max"
              :min="min"
              hide-details
            >
            </v-slider>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss"></style>
