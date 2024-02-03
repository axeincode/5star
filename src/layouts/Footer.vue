<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
const { t } = useI18n();
const { name, width } = useDisplay();
const route = useRoute();
const router = useRouter();

const footerIcons = ref([
  new URL("@/assets/public/svg/icon_public_80.svg", import.meta.url).href,
  new URL("@/assets/public/svg/icon_public_28.svg", import.meta.url).href,
  new URL("@/assets/public/svg/icon_public_29.svg", import.meta.url).href,
  new URL("@/assets/public/svg/icon_public_30.svg", import.meta.url).href,
  new URL("@/assets/public/svg/icon_public_31.svg", import.meta.url).href,
  new URL("@/assets/public/svg/icon_public_32.svg", import.meta.url).href,
  new URL("@/assets/public/svg/icon_public_33.svg", import.meta.url).href,
]);

const mobileVersion = computed(() => {
  return name.value;
});

const mobileWidth = computed(() => {
  return width.value;
});

const goToAboutPage = (index: number) => {
  router.push({ name: "About_US", query: { index: index } });
};
</script>

<template>
  <div class="py-4 footer" :class="mobileWidth > 600 ? 'mx-8 pc-max' : 'mx-2'">
    <!-------------------- footer bar -------------->
    <v-row class="mx-2" :class="mobileWidth > 600 ? 'mt-10' : 'mt-7'">
      <v-col cols="3" sm="4" md="2" lg="2" class="px-1">
        <div class="footer-title" :class="mobileWidth > 600 ? 'ml-10' : 'ml-2'">
          {{ t("home.footer.game.title") }}
        </div>
        <div class="footer-text-1" :class="mobileWidth > 600 ? 'ml-10' : 'ml-2'">
          {{ t("home.footer.game.menu_1") }}
        </div>
        <div class="footer-text-1" :class="mobileWidth > 600 ? 'ml-10' : 'ml-2'">
          {{ t("home.footer.game.menu_2") }}
        </div>
        <div class="footer-text-1" :class="mobileWidth > 600 ? 'ml-10' : 'ml-2'">
          {{ t("home.footer.game.menu_3") }}
        </div>
        <div class="footer-text-1" :class="mobileWidth > 600 ? 'ml-10' : 'ml-2'">
          {{ t("home.footer.game.menu_4") }}
        </div>
      </v-col>
      <v-col cols="3" sm="4" md="2" lg="2" class="px-1 pl-2">
        <div class="footer-title" :class="mobileWidth < 600 ? 'ml-2' : ''">
          {{ t("home.footer.helpful_links.title") }}
        </div>
        <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-2' : ''">
          {{ t("home.footer.helpful_links.menu_1") }}
        </div>
        <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-2' : ''">
          {{ t("home.footer.helpful_links.menu_2") }}
        </div>
      </v-col>
      <v-col cols="6" sm="4" md="3" lg="3" class="px-1">
        <div class="footer-title" :class="mobileWidth < 600 ? 'ml-12' : ''">
          {{ t("home.footer.about_us.title") }}
        </div>
        <div
          class="footer-text-1"
          :class="mobileWidth < 600 ? 'ml-12' : ''"
          @click="goToAboutPage(0)"
        >
          {{ t("home.footer.about_us.text_1") }}
        </div>
        <div
          class="footer-text-1"
          :class="mobileWidth < 600 ? 'ml-12' : ''"
          @click="goToAboutPage(1)"
        >
          {{ t("home.footer.about_us.text_2") }}
        </div>
        <div
          class="footer-text-1"
          :class="mobileWidth < 600 ? 'ml-12' : ''"
          @click="goToAboutPage(2)"
        >
          {{ t("home.footer.about_us.text_3") }}
        </div>
        <div
          class="footer-text-1"
          :class="mobileWidth < 600 ? 'ml-12' : ''"
          @click="goToAboutPage(3)"
        >
          {{ t("home.footer.about_us.text_4") }}
        </div>
        <div
          class="footer-text-1"
          :class="mobileWidth < 600 ? 'ml-12' : ''"
          @click="goToAboutPage(4)"
        >
          {{ t("home.footer.about_us.text_5") }}
        </div>
        <div
          class="footer-text-1"
          :class="mobileWidth < 600 ? 'ml-12' : ''"
          @click="goToAboutPage(5)"
        >
          {{ t("home.footer.about_us.text_6") }}
        </div>
        <div
          class="footer-text-1"
          :class="mobileWidth < 600 ? 'ml-12' : ''"
          @click="goToAboutPage(6)"
        >
          {{ t("home.footer.about_us.text_7") }}
        </div>
        <div
          class="footer-text-1"
          :class="mobileWidth < 600 ? 'ml-12' : ''"
          @click="goToAboutPage(7)"
        >
          {{ t("home.footer.about_us.text_8") }}
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="5" lg="5" class="text-center px-0">
        <div class="d-flex align-center justify-center">
          <img
            src="@/assets/public/image/logo_public_01.png"
            :width="mobileWidth < 600 ? 88 : undefined"
          />
          <!-- <p class="logo-title-1 ml-1">{{t('main.logo_text_1')}}</p>
                    <p class="logo-title-2 ml-1">{{t('main.logo_text_2')}}</p> -->
        </div>
        <div class="mt-4" v-if="mobileWidth > 600">
          <v-btn
            color="grey-darken-4"
            style="margin-right: 10px"
            :class="[footerIndex == 0 ? 'footer-icon-button-red' : 'footer-icon-button']"
            icon=""
            v-for="(footerIcon, footerIndex) in footerIcons"
            :key="footerIndex"
          >
            <img :src="footerIcon" width="40" height="40" />
          </v-btn>
        </div>
        <div class="mt-4" style="width: 100%" v-else>
          <div>
            <template v-for="(footerIcon, footerIndex) in footerIcons" :key="footerIndex">
              <v-btn class="m-footer-icon-button" icon="" v-if="footerIndex != 0">
                <img :src="footerIcon" width="44" height="44" />
              </v-btn>
            </template>
          </div>
          <div class="mt-3">
            <v-btn class="m-footer-icon-button-red" icon="">
              <img :src="footerIcons[0]" width="44" height="44" />
            </v-btn>
          </div>
        </div>
        <p
          class="text-left mt-4"
          :class="mobileWidth < 600 ? 'mx-2 text-400-11 gray' : 'footer-4-text mx-8'"
        >
          {{ t("home.footer.footer_4.text") }}
        </p>
      </v-col>
    </v-row>
    <v-row class="mx-2 mt-6">
      <v-card color="#15161C" theme="dark" class="justify-center">
        <v-row class="align-center">
          <v-col
            cols="12"
            sm="6"
            md="3"
            lg="3"
            class="d-flex justify-center"
            :class="mobileWidth > 600 ? 'mt-3' : 'mt-6'"
          >
            <img
              src="@/assets/public/image/logo_public_02.png"
              :width="mobileWidth > 600 ? 200 : 144"
            />
          </v-col>
          <v-col cols="12" sm="6" md="9" lg="9">
            <div
              :class="[
                mobileVersion == 'sm' ? 'px-4 text-400-12 gray' : 'pa-4 footer-5-text',
              ]"
            >
              {{ t("home.footer.logo.text_1") }}
            </div>
            <div
              class="pa-4"
              :class="[mobileVersion == 'sm' ? 'text-400-12 gray' : 'footer-5-text']"
            >
              {{ t("home.footer.logo.text_2") }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row
      class="pt-8 pb-8 justify-center"
      :class="mobileWidth > 600 ? 'footer-6-text' : 'text-400-12 gray'"
    >
      {{ t("home.footer.footer_6.text") }}
    </v-row>
  </div>
</template>

<style lang="scss">
// footer bar class
.footer {
  width: 100%;
  position: relative;
  left: -8px;
  background: #15161C;
}
.footer-title {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 10px;
}

.footer-text-1 {
  font-weight: 500;
  font-size: 16px;
  color: #7782aa;
  margin-bottom: 6px;
}

@media (max-width: 600px) {
  .footer-title {
    margin-bottom: 14px;
    font-size: 12px;
  }

  .footer-text-1 {
    margin-bottom: 16px;
    font-size: 11px;
    font-weight: 500;
  }
}

.pc-max {
  max-width: 1300px;
  margin: 0 auto !important;
}

.footer-icon-button {
  background-color: #131828 !important;
  width: 34px !important;
  height: 34px !important;
  margin: 0px 3px;
}

.footer-icon-button-red {
  background-color: #d42763 !important;
  width: 34px !important;
  height: 34px !important;
  margin: 0px 3px;
}

.m-footer-icon-button {
  background-color: #131828 !important;
  width: 44px !important;
  height: 44px !important;
  margin: 0px 6px;
}

.m-footer-icon-button-red {
  background-color: #d42763 !important;
  width: 44px !important;
  height: 44px !important;
  margin: 0px 3px;
}

.footer-4-text {
  font-weight: 400;
  font-size: 12px;
  color: #7782aa;
}

.footer-5-text {
  font-weight: 400;
  font-size: 14px;
  color: #7782aa;
}

.footer-6-text {
  font-weight: 400;
  font-size: 16px;
  color: #7782aa;
}
</style>
