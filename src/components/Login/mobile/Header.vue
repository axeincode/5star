<script lang="ts">
import { defineComponent, computed, watch, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const LoginHeader = defineComponent({
  setup() {
    const { t } = useI18n();
    const { name, width } = useDisplay();
    const bodyHeight = ref(0)

    const currentLanguage = computed((): string => localStorage.getItem("lang") || "en");

    const mobileVersion = computed(() => {
      return name.value;
    });

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
      currentLanguage,
      mobileVersion,
      bodyHeight
    };
  },
});

export default LoginHeader;
</script>

<template>
  <v-row class="m-login-header-container" :style="{ bottom: bodyHeight + 'px' }">
    <img src="@/assets/login/image/img_li_01.png" class="m-logo-image2" width="264" />
    <img src="@/assets/login/image/img_li_02.png" class="m-logo-image3" width="118" />
    <img src="@/assets/login/image/img_li_03.png" class="m-logo-image4" width="177" />
    <img src="@/assets/login/image/img_li_04.png" class="m-logo-image5" width="30" />
    <div class="m-logo-image6-area">
      <img src="@/assets/login/image/img_li_05.png" class="m-logo-image6" width="134" />
      <p class="m-login-logo-text black">
        <span :class="currentLanguage === 'en' ? 'ml-0' : 'ml-8'">
          {{ t("login.formPage.header.titleLine1") }}
        </span>
        <br />
        <span :class="currentLanguage === 'en' ? 'ml-0' : 'ml-6'">
          {{ t("login.formPage.header.titleLine2") }}
        </span>
      </p>
    </div>
  </v-row>
</template>

<style lang="scss" scoped>
.m-login-header-container {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 177px;
  margin: 0px !important;
  background: linear-gradient(0deg, #07500E 0%, #FFC327 100%, #17C648 90%);
  border-radius: 8px 8px 0px 0px;

  .v-col {
    z-index: 1;
  }

  img.m-logo-image2 {
    position: absolute;
    visibility: visible;
    top: 8px;
    left: 13px;
    z-index: 3;
  }

  img.m-logo-image3 {
    position: absolute;
    top: 11px;
    left: 11px;
  }

  img.m-logo-image4 {
    position: absolute;
    left: 7px;
    top: 0px;
  }

  img.m-logo-image5 {
    position: absolute;
    left: 199px;
    top: 3px;
  }

  .m-logo-image6-area {
    position: absolute;
    width: 134px;
    right: 48px;
    top: 29px;
  }

  img.m-logo-image6 {
    // position: absolute;
    // right: 48px;
    // top: 29px;
  }

  img.bg-image {
    position: absolute;
    width: 100%;
    height: 187px;
    z-index: 0;
  }

  img.logo-image {
    position: absolute;
    top: 24px;
    left: 24px;
  }

  img.coin-image {
    position: absolute;
    top: -10px;
    right: 7px;
    width: 324px;
    height: 197px;
  }
}

.m-login-logo-text {
  position: absolute;
  top: 6px;
  right: 22px;
  z-index: 2;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 21px;
}
</style>
