<script lang="ts">
import { defineComponent, watch, computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const SignupHeader = defineComponent({
  setup() {
    const { t } = useI18n();
    const { width } = useDisplay();
    const bodyHeight = ref(0);

    const mobileWidth = computed(() => {
      return width.value;
    });

    const handleResize = () => {
      if (window.visualViewport?.height != undefined) {
        bodyHeight.value = window.innerHeight - 230;
      }
    };

    watch(
      mobileWidth,
      (newValue) => {
        bodyHeight.value = window.innerHeight - 230;
      },
      { deep: true }
    );

    onMounted(() => {
      if (window.visualViewport?.height != undefined) {
        bodyHeight.value = window.innerHeight - 230;
      }
      window.addEventListener("resize", handleResize);
    });

    return {
      t,
      bodyHeight
    };
  },
});

export default SignupHeader;
</script>

<template>
  <v-row class="m-signup-header-container" :style="{ bottom: bodyHeight + 'px' }">
    <v-col cols="10" class="pl-10 pt-9">
      <!-- <v-row>
                <span class="logo-text purple">{{t('main.logo_text_1')}}</span>
                <span class="logo-text yellow">{{t('main.logo_text_2')}}</span>
            </v-row> -->
      <v-row>
        <p class="m-logo-text2 white">
          {{ t("signup.formPage.header.titleLine1") }}
          <br />
          {{ t("signup.formPage.header.titleLine2") }}
        </p>
      </v-row>
    </v-col>
    <!-- <img src="@/assets/login/image/bg_su_01.png" class="m-bg-image"> -->
    <img
      src="@/assets/public/image/logo_public_01.png"
      class="m-logo-image"
      width="80"
    />
    <img src="@/assets/login/image/img_su_01.png" class="m-coin-image" />
  </v-row>
</template>

<style lang="scss">
.m-signup-header-container {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 172px;
  border-radius: 8px 8px 0px 0px;
  margin: 0px !important;
  background: linear-gradient(0deg, #0B123A 0%, #66FF63 100%), #5904d9;

  .v-col {
    z-index: 1;
  }

  img.m-bg-image {
    position: absolute;
    width: 100%;
    height: 187px;
    z-index: 0;
    border-radius: 38px 38px 0px 0px;
  }

  img.m-logo-image {
    position: absolute;
    top: 22px;
    left: 18px;
  }

  img.m-coin-image {
    position: absolute;
    top: -14px;
    right: 0px;
    width: 258px;
    height: 169px;
  }

  .signup-logo-title-1-position {
    position: absolute;
    top: 25px;
    left: 70px;
  }

  .signup-logo-title-2-position {
    position: absolute;
    top: 25px;
    left: 130px;
  }
}

.logo-text {
  font-family: "Bauhaus 93";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 41px;
  text-shadow: #522a59 0px 2px 0px;
}

.m-logo-text2 {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: normal;
  margin-top: 70px;
}
</style>
