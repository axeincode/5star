<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import img_og_03 from "@/assets/home/image/img_og_03.png";
import { ProgressiveImage } from "vue-progressive-image";

const { t } = useI18n();
const { width } = useDisplay();
const route = useRoute();
const router = useRouter();

const mobileWidth: any = computed(() => {
  return width.value;
});

const providerGames = ref<Array<any>>([
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
  img_og_03,
]);

const goToBackPage = () => {
  router.go(-1);
};

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<template>
  <div class="mx-3">
    <div class="d-flex align-center">
      <v-btn
        class="text-none m-provider-back-btn"
        variant="elevated"
        icon="mdi-chevron-left"
        width="20"
        height="20"
        @click="goToBackPage"
      >
      </v-btn>
      <p class="text-800-14 white ml-2">{{ t("provider.text_1") }}</p>
    </div>
    <v-text-field
      :placeholder="t('provider.text_2')"
      class="form-textfield dark-textfield mx-0"
      variant="solo"
      hide-details
      filled
      clearable
      density="compact"
      prepend-inner-icon="mdi-magnify"
      color="#7782AA"
      :class="mobileWidth < 600 ? 'm-provider-game-search-text' : ''"
    />
    <v-row class="ma-0">
      <template v-for="(game, index) in providerGames" :key="index">
        <v-col
          cols="4"
          lg="2"
          md="2"
          sm="3"
          class="px-1 relative py-0 m-provider-game-img"
        >
          <ProgressiveImage :src="game" lazy-placeholder blur="30" />
        </v-col>
      </template>
    </v-row>
    <div class="mt-4 text-center text-700-14 gray">
      {{ t("provider.text_3") }}
      <font class="white">&nbsp;30&nbsp;</font>
      {{ t("provider.text_4") }}
      <font class="white">&nbsp;3133&nbsp;</font>
      {{ t("provider.text_5") }}
    </div>
    <v-btn
      class="text-none more-btn-color mt-5 text-center"
      variant="outlined"
      :width="mobileWidth < 600 ? '100%' : 164"
      :height="mobileWidth < 600 ? 41 : 48"
    >
      <div>{{ t("home.more") }}</div>
    </v-btn>
  </div>
</template>

<style lang="scss">
.m-provider-back-btn {
  background: transparent !important;
  box-shadow: unset !important;
  .v-icon {
    font-size: 20px !important;
    color: white;
  }
}

.m-provider-game-search-text {
  height: 36px !important;

  .v-field__clearable {
    padding-top: 6px !important;
  }

  div.v-field__field {
    box-shadow: none !important;
  }

  .v-field__overlay {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .v-field {
    border-radius: 10px !important;
  }

  .v-field__prepend-inner {
    padding-top: 7px !important;
  }

  .v-field__input {
    height: 36px !important;
    padding: 0px !important;
    min-height: 36px !important;
  }

  .v-field__field {
    height: 36px !important;
    padding-left: 0px !important;
  }

  .v-field__input::placeholder {
    opacity: unset !important;
    color: #7782aa !important;
    font-family: "Inter";
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .v-input__control {
    height: 36px !important;
    .mdi:before {
      font-size: 19px !important;
      color: #7782aa !important;
    }
  }
}

.m-provider-game-img {
  cursor: pointer;
}

.m-provider-game-img:active {
  transform: scale(0.9);
  filter: brightness(80%);
  transition-duration: 0.28s;
}

.v-progressive-image {
  border-radius: 8px 46px;
  background: #211f31;
}

.v-progressive-image-loading {
  height: 160px;
}

.v-progressive-image-loading:before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 46px;
  background-image: url("@/assets/public/image/img_public_42.png");
  background-repeat: no-repeat;
  background-size: contain;
  animation: opacityAnimation 0.6s ease-in infinite;
}

@media (max-width: 600px) {
  .v-progressive-image {
    border-radius: 8px 32px;
  }
}
</style>
