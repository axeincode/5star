<script lang="ts" setup>
import { ref } from "vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { appBarStore } from "@/store/appBar";
import { refferalStore } from "@/store/refferal";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const { width } = useDisplay();
const { setRefferalAppBarShow } = refferalStore();
const { setRefferalDialogShow } = refferalStore();
const { setOverlayScrimShow } = appBarStore();

const invertedScroll = ref<boolean>(true);
const elevateOnScroll = ref<boolean>(true);

const mobileWidth = computed((): number => {
  return width.value;
});

const headerBlurEffectShow = computed(() => {
  const { getHeaderBlurEffectShow } = storeToRefs(appBarStore());
  return getHeaderBlurEffectShow.value;
});

const openRefferalDialogShow = () => {
  setOverlayScrimShow(false);
  setRefferalDialogShow(true);
};
</script>

<template>
  <v-app-bar
    app
    class="refferal-app-bar-background justify-center"
    :class="headerBlurEffectShow ? 'header-bg-blur' : ''"
    density="compact"
    :inverted-scroll="invertedScroll"
    :elevate-on-scroll="elevateOnScroll"
  >
    <v-toolbar-title class="d-flex align-center justify-center">
      <p class="white" :class="mobileWidth < 600 ? 'text-500-10' : 'text-700-16'">
        {{ t("refferal.app_bar_title") }}
      </p>
      <img
        src="@/assets/public/image/img_public_09.png"
        class="ml-3"
        :width="mobileWidth > 600 ? 50 : 33"
      />
      <v-btn
        rounded
        :height="mobileWidth < 600 ? '24px' : '28px'"
        class="text-none ml-3 earn-btn-bg"
        @click="openRefferalDialogShow"
      >
        {{ t("refferal.earn_btn_text") }}
      </v-btn>
    </v-toolbar-title>
    <v-btn
      icon
      density="compact"
      :height="mobileWidth < 600 ? '20px' : '28px'"
      :width="mobileWidth < 600 ? '20px' : '28px'"
    >
      <v-icon
        color="#FFFFFF"
        style="font-size: 20px"
        @click="setRefferalAppBarShow(false)"
        >mdi-close</v-icon
      >
    </v-btn>
  </v-app-bar>
</template>

<style lang="scss">
.refferal-app-bar-background {
  background: linear-gradient(90deg, #3F86DA 0%, #33D785 47.8%, #FFEA2F 100%) !important;

  .v-toolbar__content {
    height: 48px;
  }

  @media (max-width: 600px) {
    .v-toolbar__content {
      height: 32px !important;
    }
  }

  .v-toolbar__content > .v-toolbar-title {
    margin-inline-start: 0px !important;
  }

  .v-toolbar-title__placeholder {
    display: flex !important;
    align-items: center;
  }

  .earn-btn-bg {
    background: #1D2027 !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;

    .v-btn__content {
      font-weight: 700;
      font-size: 16px;
      color: #ffffff;
    }

    @media (max-width: 600px) {
      .v-btn__content {
        font-size: 12px;
      }
    }
  }
}

.header-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  // filter: saturate(180%) blur(3px);
  // -webkit-filter: saturate(180%) blur(3px);
}
</style>
