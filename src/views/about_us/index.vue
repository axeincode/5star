<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { aboutStore } from "@/store/about";
import { storeToRefs } from "pinia";
import { refferalStore } from "@/store/refferal";
import MTermsOfService from "@/components/about_us/terms_of_service/mobile/index.vue";
import MPrivacyPolicy from "@/components/about_us/privacy_policy/mobile/index.vue";
import MResponsibleGambling from "@/components/about_us/responsible_gambling/mobile/index.vue";
import MBonusTerms from "@/components/about_us/bonus_terms/mobile/index.vue";
import MPaymentMethods from "@/components/about_us/payment_methods/mobile/index.vue";
import MReferralSystem from "@/components/about_us/referral_system/mobile/index.vue";
import MAMLPolicy from "@/components/about_us/aml_policy/mobile/index.vue";
import MKYCPolicy from "@/components/about_us/kyc_policy/mobile/index.vue";

const { t } = useI18n();
const { width } = useDisplay();
const { setActiveAboutIndex } = aboutStore();
const route = useRoute();
const router = useRouter();

const activeMenuIndex = ref<any>(0);
const selectedMenuItem = ref<string>(t("about.page.text_2"));
const aboutMenuShow = ref<boolean>(false);

const menuList = ref<Array<string>>([
  t("about.page.text_2"),
  t("about.page.text_3"),
  t("about.page.text_4"),
  t("about.page.text_5"),
  t("about.page.text_6"),
  t("about.page.text_7"),
  t("about.page.text_8"),
  t("about.page.text_9"),
]);

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});

const handleMenu = (index: number) => {
  activeMenuIndex.value = index;
};

const handleDropdown = (item: string, index: number) => {
  setActiveAboutIndex(index);
  selectedMenuItem.value = item;
  activeMenuIndex.value = index;
};

const activeAboutIndex = computed(() => {
  const { getActiveAboutIndex } = storeToRefs(aboutStore());
  return getActiveAboutIndex.value;
});

const selectActiveIndex = (index: number) => {
  activeMenuIndex.value = index;
  selectedMenuItem.value = menuList.value[index];
};

const mobileWidth: any = computed(() => {
  return width.value;
});

const goBeforePage = () => {
  router.go(-1);
};

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    // Handle the route query change here
    if (newQuery.index) {
      activeMenuIndex.value = newQuery.index;
      selectedMenuItem.value = menuList.value[activeMenuIndex.value];
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
);

onMounted(() => {
  if (route.query.index) {
    activeMenuIndex.value = route.query.index;
    selectedMenuItem.value = menuList.value[activeMenuIndex.value];
  }
  setActiveAboutIndex(activeMenuIndex.value);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<template>
  <div v-if="mobileWidth < 600">
    <div class="m-about-container" :class="refferalAppBarShow ? 'pt-8' : 'pt-12'">
      <div class="m-about-tab-body mx-3 d-flex align-center">
        <v-btn class="m-about-back-btn text-none" @click="goBeforePage">
          <v-icon class="header-mdi-icon">mdi-chevron-left</v-icon>
          {{ t("about.page.text_1") }}
        </v-btn>
        <v-menu offset="20" v-model:model-value="aboutMenuShow" class="m-about-menu-list">
          <template v-slot:activator="{ props }">
            <v-card color="#15161C" theme="dark" class="ml-auto mr-2 m-about-menu-card">
              <v-list-item
                v-bind="props"
                :append-icon="aboutMenuShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                value="about menu"
              >
                <v-list-item-title class="ml-3 text-800-12 white">{{
                  selectedMenuItem
                }}</v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#1D2027">
            <v-list-item
              v-for="(item, i) in menuList"
              :key="i"
              :value="item"
              @click="handleDropdown(item, i)"
              :class="{ 'm-about-menu-item-border': selectedMenuItem == item }"
              style="min-height: 36px !important"
            >
              <v-list-item-title class="text-center text-400-12 gray">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <MTermsOfService v-if="activeMenuIndex == 0" />
      <MPrivacyPolicy v-if="activeMenuIndex == 1" />
      <MResponsibleGambling v-if="activeMenuIndex == 2" />
      <MBonusTerms v-if="activeMenuIndex == 3" />
      <MPaymentMethods v-if="activeMenuIndex == 4" />
      <MReferralSystem v-if="activeMenuIndex == 5" />
      <MAMLPolicy v-if="activeMenuIndex == 6" />
      <MKYCPolicy v-if="activeMenuIndex == 7" />
    </div>
  </div>
</template>

<style lang="scss">
.m-about-container {
  background: #1D2027;
  margin: -40px 0px 0px 0px;
  padding-bottom: 20px;
  border-radius: 8px;
}

.m-about-main-body {
  margin-top: 8px;
  border-radius: 8px;
  background: var(--BG-5-1C1929, #15161C);
}

.m-about-menu-card {
  width: 200px;
  height: 40px;
  border-radius: 8px !important;

  .v-list-item__append > .v-icon {
    font-size: 18px;
    margin-inline-start: 0px !important;
  }
}

.m-about-menu-item-border {
  margin: 8px;
  border-radius: 8px !important;
  border: 1px solid #00b25c !important;
  height: 36px !important;
}

.m-about-menu-list .v-overlay__content::after {
  content: "";
  position: absolute;
  align-self: center;
  top: -25px;
  left: 50%;
  border: 15px solid #1D2027;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-width: 8px;
  border-left-width: 8px;
}

.m-about-tab-body {
  background: #1D2027;
  height: 48px;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  border-radius: 8px;

  .m-about-back-btn {
    background: transparent !important;
    box-shadow: none !important;

    .v-btn__content {
      font-weight: 700;
      font-size: 12px;
      color: #ffffff;
    }
  }
}
</style>
