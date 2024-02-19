<script lang="ts" setup>
import { ref, computed, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
const { name, width } = useDisplay();
const { t } = useI18n();
const props = defineProps<{ validationText2: string }>();
const { validationText2 } = toRefs(props);

const mobileWidth = computed(() => {
  return width.value;
});
</script>

<template>
  <div
    class="pa-2 animate glow delay-1 fade-in"
    :class="[
      mobileWidth > 600
        ? 'amount-validation-box-container'
        : 'mobile-amount-validation-box-container',
    ]"
  >
    <v-row class="d-flex justify-center ma-2">
      <img
        src="@/assets/public/svg/icon_public_03.svg"
        width="16"
        class="validation-caution-img"
      />
      <span class="label-text-sm ml-2 mt-1 slate-gray">
        {{ t("withdraw_dialog.validation.text_1") }}
      </span>
    </v-row>
    <v-row class="justify-center mt-0 mb-2">
      <span class="label-text-sm ml-2 mt-1 slate-gray">
        {{ validationText2 }}
      </span>
    </v-row>
  </div>
</template>

<style lang="scss">
.mobile-amount-validation-box-container {
  position: absolute;
  bottom: 64px;
  width: 94%;
  background: #15161C;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  margin: 12px;
  padding-bottom: 0px !important;
  z-index: 2;

  .validation-caution-img {
    position: relative;
    top: 2px;
  }

  .validation-title {
    margin-top: 22px !important;
    margin-left: 10px;
  }
}

.amount-validation-box-container {
  position: absolute;
  bottom: 64px;
  width: 380px;
  background: #15161C;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  margin: 12px;
  padding-bottom: 0px !important;
  margin-left: 58px;
  z-index: 2;

  .validation-caution-img {
    position: relative;
    top: 2px;
  }

  .validation-title {
    margin-top: 22px !important;
    margin-left: 10px;
  }
}

.mobile-amount-validation-box-container::after {
  display: flex;
  content: "";
  position: relative;
  align-self: center;
  float: right;
  top: 16px;
  bottom: 0px;
  right: 172px;
  width: 0px;
  height: 0px;
  border: 9px solid #15161C;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 2;
  border-right-width: 5px;
  border-left-width: 5px;
}

.amount-validation-box-container::after {
  display: flex;
  content: "";
  position: relative;
  align-self: center;
  float: right;
  top: 16px;
  bottom: 0px;
  right: 172px;
  width: 0px;
  height: 0px;
  border: 9px solid #15161C;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 2;
  border-right-width: 5px;
  border-left-width: 5px;
}

// animation
.animate {
  animation-duration: 0.15s;
  animation-delay: 0.1s;
  animation-name: animate-fade;
  animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
  animation-fill-mode: backwards;
}

.animate.glow {
  animation-name: animate-glow;
  animation-timing-function: ease;
}

@keyframes animate-glow {
  0% {
    opacity: 0;
    filter: brightness(3) saturate(3);
    transform: scale(0.8, 0.8);
  }

  100% {
    opacity: 1;
    filter: brightness(1) saturate(1);
    transform: scale(1, 1);
  }
}

.delay-1 {
  animation-delay: 0.1s;
}
</style>
