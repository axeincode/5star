<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const LoginHeader = defineComponent({
  setup() {
    const { t } = useI18n();
    const { name } = useDisplay();

    const currentLanguage = computed((): string => localStorage.getItem("lang") || "en");

    const mobileVersion = computed(() => {
      return name.value;
    });

    return {
      t,
      currentLanguage,
      mobileVersion,
    };
  },
});

export default LoginHeader;
</script>

<template>
  <v-row class="login-header-container">
    <p class="login-logo-text black">
      <span :class="currentLanguage === 'en' ? 'ml-0' : 'ml-8'">
        {{ t("login.formPage.header.titleLine1") }}
      </span>
      <br />
      <span :class="currentLanguage === 'en' ? 'ml-0' : 'ml-6'">
        {{ t("login.formPage.header.titleLine2") }}
      </span>
    </p>
    <img src="@/assets/login/image/img_li_01.png" class="logo-image2" />
    <img src="@/assets/login/image/img_li_02.png" class="logo-image3" />
    <img src="@/assets/login/image/img_li_03.png" class="logo-image4" />
    <img src="@/assets/login/image/img_li_04.png" class="logo-image5" />
    <img src="@/assets/login/image/img_li_05.png" class="logo-image6" />
  </v-row>
</template>

<style lang="scss" scoped>
.login-header-container {
  z-index: 1;
  height: 187px;
  margin: 0px !important;
  background: linear-gradient(0deg, #275798 0%, #9419f0 100%);
  border-radius: 16px 16px 0px 0px;

  .v-col {
    z-index: 1;
  }

  img.logo-image2 {
    position: absolute;
    visibility: visible;
    top: 22px;
    left: 7px;
    z-index: 3;
  }

  img.logo-image3 {
    position: absolute;
    top: 21px;
    left: 8px;
  }

  img.logo-image4 {
    position: absolute;
    left: 7px;
    top: 21px;
  }

  img.logo-image5 {
    position: absolute;
    left: 244px;
    top: 8px;
  }

  img.logo-image6 {
    position: absolute;
    left: 251px;
    top: 43px;
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

.login-logo-text {
  position: absolute;
  top: 57px;
  left: 263px;
  z-index: 2;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
}
</style>
