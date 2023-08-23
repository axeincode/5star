<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from 'vue-i18n';
import { type GetGameOriginalData } from "@/interface/navBar";
import { setLang } from "@/locale/index";
import { useDisplay } from 'vuetify'
import { appBarStore } from "@/store/appBar";
import { loginBonusStore } from "@/store/loginBonus";
import { refferalStore } from "@/store/refferal";
import { storeToRefs } from "pinia";

const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();
const { setLoginBonusDialogVisible } = loginBonusStore();

const { t } = useI18n();
const open = ref<Array<string>>(['']);
const language = ref<string>('English');
const drawer = ref<boolean>(true);
const languageMenu = ref<boolean>(false);
const originalMenu = ref<boolean>(false);
const navDrawer = ref<any>(null);

// mobile version name
const { name, width } = useDisplay()

const mobileVersion = computed(() => {
    return name.value
});

const mobileWidth = computed(() => {
    return width.value
})

const refferalAppBarShow = computed(() => {
    const { getRefferalAppBarShow } = storeToRefs(refferalStore());
    return getRefferalAppBarShow.value
})

const navBarToggle = computed(() => {
    const { getNavBarToggle } = storeToRefs(appBarStore());
    return getNavBarToggle.value
})

const loginBonusDialog = computed(() => {
    const { getLoginBonusDialogVisible } = storeToRefs(loginBonusStore());
    return getLoginBonusDialogVisible.value;
})

const rouletteBonusDialog = computed(() => {
    const { getRouletteBonusDialogVisible } = storeToRefs(loginBonusStore());
    return getRouletteBonusDialogVisible.value;
})

// language array
const langItems = ref<Array<string>>([
    t('navBar.language.english'),
    t('navBar.language.portuguese'),
    t('navBar.language.espanola')
])

// game original data array
const gameOriginalItems = ref<Array<GetGameOriginalData>>([
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlots"
    }
])

watch(drawer, (newValue: boolean) => {
    setNavBarToggle(newValue);
    if (!newValue && !rouletteBonusDialog.value) {
        setMainBlurEffectShow(false);
        setOverlayScrimShow(false);
    }
    if (newValue) {
        setMainBlurEffectShow(true);
        setOverlayScrimShow(true);
    }
})

watch(navBarToggle, (newValue) => {
    drawer.value = newValue;
    if (mobileWidth.value < 600 && newValue) {
        setRightBarToggle(false);
    }
})

const handleLanguageDropdown = (item: string) => {
    language.value = item;
    switch (item) {
        case t('navBar.language.english'):
            setLang("en");
            break;
        case t('navBar.language.portuguese'):
            setLang("pt");
            break;
        case t('navBar.language.espanola'):
            setLang("es");
            break;
    }
}

window.addEventListener('scroll', function () {
    originalMenu.value = false;
    languageMenu.value = false;
});

const navDrawerScroll = () => {
    originalMenu.value = false;
    languageMenu.value = false;
}

const openLoginBonusDialog = () => {
    setLoginBonusDialogVisible(true);
    setNavBarToggle(false);
    setOverlayScrimShow(true);
    setMainBlurEffectShow(true);
}

const openRouletteBonusDialog = () => {
    setRouletteBonusDialogVisible(true);
    setNavBarToggle(false);
    setOverlayScrimShow(true);
    setMainBlurEffectShow(true);
}

onMounted(() => {
    drawer.value = mobileWidth.value < 1280 ? false : true;
})
</script>

<template>
  <v-navigation-drawer
    temporary
    expand-on-hover
    :scrim-opacity="0.6"
    :touchless="true"
    class="nav-background pb-100"
    :width="192"
    v-model="drawer"
  >
    <template v-slot:prepend>
      <v-list-item
        class="m-casino-toggle"
        :class="refferalAppBarShow ? 'mt-8' : ''"
        style="height: 56px; visibility: hidden"
      >
        <input type="checkbox" id="m-casino-toggle" />
        <label for="m-casino-toggle">
          <div class="casino">
            <img src="@/assets/public/svg/icon_public_34.svg" />
            <p>{{ t("navBar.casino") }}</p>
          </div>
          <div class="sport">
            <img src="@/assets/public/svg/icon_public_40.svg" />
            <p>{{ t("navBar.sport") }}</p>
          </div>
        </label>
      </v-list-item>
    </template>
    <div class="m-nav-drawer-content" @scroll="navDrawerScroll">
      <v-list density="compact" nav class="mt-1 px-0">
        <v-card color="#211F31" theme="dark" style="border-radius: 0px">
          <v-row class="ma-2 align-center">
            <span class="m-card-title">{{ t("navBar.my_vip_perks") }}</span>
            <span class="ml-15 m-more-font">{{ t("navBar.more") }}</span>
            <v-btn class="m-right-btn" icon="true" height="24" width="24">
              <img src="@/assets/public/svg/icon_public_11.svg" width="16" />
            </v-btn>
          </v-row>
          <v-row class="ma-1">
            <v-col cols="6" class="pa-1 relative">
              <v-list-item class="ma-0 pa-0" height="48px" @click="openLoginBonusDialog">
                <img src="@/assets/public/svg/bg_public_16.svg" class="m-img-width" />
                <img
                  src="@/assets/public/image/img_public_01.png"
                  class="m-navbar-task-img-position"
                  width="34"
                />
                <p class="text-700-10 white m-navbar-task-text-position">
                  {{ t("navBar.task_text") }}
                </p>
                <p class="text-400-8 white m-navbar-unlock-text-left-position">
                  {{ t("navBar.unlock_text") }}
                </p>
              </v-list-item>
            </v-col>
            <v-col cols="6" class="pa-1">
              <v-list-item
                class="ma-0 pa-0"
                height="48px"
                @click="openRouletteBonusDialog"
              >
                <img
                  src="@/assets/public/svg/bg_public_17.svg"
                  class="m-spin-img-width"
                />
                <img
                  src="@/assets/public/image/img_public_02.png"
                  class="m-navbar-spin-img-position"
                  width="28"
                />
                <p class="text-700-10 white m-navbar-spin-text-position">
                  {{ t("navBar.spin_text") }}
                </p>
                <p class="text-400-8 white m-navbar-unlock-text-right-position">
                  {{ t("navBar.unlock_text") }}
                </p>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-list>
      <v-list density="compact" nav class="px-0">
        <v-list-item class="ma-0 pa-0">
          <img src="@/assets/public/image/img_public_18.png" class="m-earn-free-img" />
          <img
            src="@/assets/public/image/img_public_17.png"
            class="m-navbar-free-money-img-position"
            width="23"
          />
          <p class="text-700-12 color-29263C m-navbar-free-money-text-position">
            {{ t("navBar.earn_free_text") }}
          </p>
        </v-list-item>
      </v-list>
      <v-list v-model:opened="open">
        <v-list-group value="Casino">
          <template v-slot:activator="{ props }">
            <v-list-item
              class="m-avatar-img"
              v-bind="props"
              prepend-avatar="@/assets/public/svg/icon_public_34.svg"
              :title="t('navBar.casino')"
              link
              value="casino"
              :height="40"
            ></v-list-item>
          </template>
          <v-card color="#211F31" theme="dark" class="mt-2" style="border-radius: 0px">
            <v-list>
              <v-list-item
                class="m-casino-sub-img"
                prepend-avatar="@/assets/public/svg/icon_public_35.svg"
                :title="t('navBar.casino_sub_menu.recently_played')"
                value="recently played"
              ></v-list-item>
              <v-list-item
                class="m-casino-sub-img"
                prepend-avatar="@/assets/public/svg/icon_public_36.svg"
                :title="t('navBar.casino_sub_menu.favorites')"
                value="favorites"
              ></v-list-item>
              <v-menu
                location="center"
                offset="10"
                content-class="m-original-dropdown"
                v-model:model-value="originalMenu"
                transition="slide-x-transition"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    class="m-casino-sub-img"
                    prepend-avatar="@/assets/public/svg/icon_public_37.svg"
                    :append-icon="originalMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
                    :title="t('navBar.casino_sub_menu.game_originals')"
                    value="game originals"
                  >
                  </v-list-item>
                </template>
                <v-list theme="dark" bg-color="#211F31" width="166" class="ml-6">
                  <v-list-item
                    v-for="(item, i) in gameOriginalItems"
                    :key="i"
                    :value="item.name"
                    class="m-avatar-img"
                    :prepend-avatar="item.icon"
                    :title="item.name"
                  >
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-list-item
                class="m-casino-sub-img"
                prepend-avatar="@/assets/public/svg/icon_public_38.svg"
                :title="t('navBar.casino_sub_menu.slots')"
                value="slots"
              ></v-list-item>
              <v-list-item
                class="m-casino-sub-img"
                prepend-avatar="@/assets/public/svg/icon_public_39.svg"
                :title="t('navBar.casino_sub_menu.live_casino')"
                value="live casino"
              ></v-list-item>
            </v-list>
          </v-card>
        </v-list-group>
      </v-list>
      <v-list>
        <v-list-item
          class="m-avatar-img"
          prepend-avatar="@/assets/public/svg/icon_public_40.svg"
          :title="t('navBar.sport')"
        ></v-list-item>
      </v-list>
      <v-divider class="divider"></v-divider>
      <v-list>
        <v-list-item
          class="m-avatar-img"
          prepend-avatar="@/assets/public/svg/icon_public_41.svg"
          :title="t('navBar.menu_item_1.promotions')"
        ></v-list-item>
        <v-list-item
          class="m-vip-club"
          prepend-avatar="@/assets/public/svg/icon_public_42.svg"
          :title="t('navBar.menu_item_1.vip_club')"
          router
          :to="{ name: 'VIP' }"
        ></v-list-item>
        <v-list-item
          class="m-avatar-img"
          prepend-avatar="@/assets/public/svg/icon_public_43.svg"
          :title="t('navBar.menu_item_1.affiliate')"
          router
          :to="{ name: 'Affiliate' }"
        ></v-list-item>
        <v-list-item
          class="m-avatar-img"
          prepend-avatar="@/assets/public/svg/icon_public_44.svg"
          :title="t('navBar.menu_item_1.blog')"
        ></v-list-item>
      </v-list>
      <v-divider class="divider"></v-divider>
      <v-list>
        <v-list-item
          class="m-avatar-img"
          prepend-avatar="@/assets/public/svg/icon_public_45.svg"
          :title="t('navBar.live_support')"
        ></v-list-item>
      </v-list>
      <v-list>
        <v-menu
          location="center"
          offset="16"
          content-class="m-language-dropdown"
          v-model:model-value="languageMenu"
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ props }">
            <v-card color="#211F31" theme="dark" class="mx-2 m-language-item" height="40">
              <v-list-item
                v-bind="props"
                class="m-casino-sub-img"
                prepend-avatar="@/assets/public/svg/icon_public_57.svg"
                :title="language"
                :append-icon="languageMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
              >
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#211F31" width="166" class="text-center">
            <v-list-item
              :title="t('navBar.language.title')"
              class="m-avatar-img"
            ></v-list-item>
            <v-divider></v-divider>
            <v-list-item
              v-for="(item, i) in langItems"
              :key="i"
              :value="item"
              class="m-avatar-img"
              @click="handleLanguageDropdown(item)"
              :class="language == item ? 'nav-lang-selected-item' : ''"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
      <v-list-item class="m-theme-toggle">
        <input type="checkbox" id="m-theme-toggle" />
        <label for="m-theme-toggle">
          <div class="dark">
            <img src="@/assets/public/svg/icon_public_46.svg" width="16" />
            <p class="text-700-10">{{ t("navBar.sound_mode.on") }}</p>
          </div>
          <div class="light">
            <img src="@/assets/public/svg/icon_public_47.svg" width="16" />
            <p class="text-700-10">{{ t("navBar.sound_mode.off") }}</p>
          </div>
        </label>
      </v-list-item>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.nav-lang-selected-item {
  border: 1px solid #00b25c;
  margin: 5px;
  border-radius: 14px;
}

::deep(.v-navigation-drawer__content) {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden !important;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
  }
}

.m-nav-background {
  background: #29253c;
}

// casino and sport toggle switch
.m-casino-toggle {
  label {
    width: 200px;
    height: 40px;
    position: relative;
    display: block;
    background: #211f31;
    border-radius: 20px !important;
    box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4),
      inset 0px -5px 15px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: 0.3s;

    div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
    }

    .casino {
      left: 14px;
      transition: 0.3s;
      color: black;

      img {
        width: 20px;
        height: 24px;
        margin-right: 4px;
      }
    }

    .sport {
      left: 120px;
      transition: 0.3s;
      color: #7782aa;

      img {
        width: 20px;
        margin-right: 4px;
      }
    }
  }

  label:after {
    content: "";
    width: 100px;
    height: 36px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: #32cfec;
    border-radius: 18px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:checked + label:after {
    left: 198px;
    transform: translateX(-100%);
  }

  label:active:after {
    width: 100px;
  }

  input:checked + label .casino {
    color: #7782aa;
  }

  input:checked + label .sport {
    color: black;
  }
}

.m-card-title {
  color: #d99504;
  font-weight: 700;
  font-size: 12px;
}

.m-more-font {
  font-weight: 500;
  font-size: 10px;
  color: #7782aa;
}

.m-right-btn {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: 6px;
  right: 0px;
}

.m-img-width {
  width: 100%;
  margin-top: 4px;
}

.m-spin-img-width {
  width: 100%;
  margin-top: 4px;
}

.m-earn-free-img {
  width: 100%;
}

.m-avatar-img {
  min-height: 40px !important;

  :deep(.v-avatar--density-default) {
    height: 24px;
    width: 20px;
    border-radius: 0px;
  }

  :deep(.v-list-item-title) {
    font-weight: 700;
    font-size: 10px;
    color: #7782aa;
  }

  :deep(img) {
    width: 16px;
    height: 18px;
    margin-top: 2px;
  }
}

.m-vip-club {
  min-height: 40px !important;

  :deep(.v-avatar--density-default) {
    height: 24px;
    width: 20px;
    border-radius: 0px;
  }

  :deep(.v-list-item-title) {
    font-weight: 700;
    font-size: 10px;
    color: #f9bc01;
  }

  :deep(img) {
    width: 16px;
    height: 16px;
    margin-top: 4px;
  }
}

.m-casino-sub-img {
  min-height: 40px !important;

  :deep(.v-avatar--density-default) {
    height: 22px;
    width: 22px;
    border-radius: 0px;
  }

  :deep(.v-list-item-title) {
    font-weight: 500;
    font-size: 10px;
    color: #7782aa;
  }

  :deep(img) {
    width: 16px;
    height: 16px;
    margin-top: 4px;
  }

  :deep(.v-list-item__content) {
    align-self: center;
    grid-area: content;
    overflow: hidden;
    width: 100px;
  }

  :deep(.v-list-item__append > .v-icon) {
    margin-inline-start: 6px;
  }
}

.divider {
  width: 180px;
  margin: auto;
  border-width: thin;
}

.m-language-item {
  border-radius: 8px;
  background: var(--text-box-1211-f-31, #211f31);
  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;

  :deep(.v-list-item__content) {
    align-self: center;
    grid-area: content;
    overflow: hidden;
    width: 76px;
  }

  :deep(.v-list-item__append > .v-icon) {
    margin-inline-start: 18px;
  }
}

// dark and light toggle switch
.m-theme-toggle {
  height: 30px;

  label {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 164px;
    height: 30px;
    position: absolute;
    display: block;
    background: #211f31;
    border-radius: 20px !important;
    cursor: pointer;
    transition: 0.3s;

    div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
    }

    .dark {
      left: 16px;
      transition: 0.3s;
      color: white;

      img {
        width: 20px;
        height: 24px;
        margin-right: 4px;
      }
    }

    .light {
      left: 108px;
      transition: 0.3s;
      color: #7782aa;

      img {
        width: 20px;
        margin-right: 4px;
      }
    }
  }

  label:after {
    content: "";
    width: 74px;
    height: 28px;
    position: absolute;
    top: 1px;
    left: 1px;
    background: #353652;
    border-radius: 18px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:checked + label:after {
    left: 162px;
    transform: translateX(-100%);
  }

  label:active:after {
    width: 74px;
  }

  input:checked + label .dark {
    color: #7782aa;
  }

  input:checked + label .light {
    color: white;
  }
}

:deep(.m-original-dropdown) {
  // top: 270px !important;
  left: 184px !important;
}

:deep(.m-original-dropdown:after) {
  content: "";
  position: absolute;
  align-self: center;
  top: 50%;
  transform: translateY(-50%);
  left: -2px;
  border: 13px solid #211f31;
  border-left-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-top-width: 6px;
  border-bottom-width: 6px;
}

:deep(.m-language-dropdown) {
  left: 208px !important;
  --v-overlay-anchor-origin: none !important;
  transform-origin: unset !important;
}

:deep(.m-language-dropdown:after) {
  content: "";
  position: absolute;
  align-self: center;
  top: 50%;
  transform: translateY(-50%);
  left: -26px;
  border: 13px solid #211f31;
  border-left-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-top-width: 6px;
  border-bottom-width: 6px;
}

.m-navbar-free-money-img-position {
  position: absolute;
  left: 28px;
  top: 0px;
}

.m-navbar-free-money-text-position {
  position: absolute;
  left: 62px;
  top: 5px;
}

.m-navbar-task-img-position {
  position: absolute;
  left: 4px;
  top: 0px;
}

.m-navbar-task-text-position {
  position: absolute;
  left: 40px;
  top: 8px;
}

.m-navbar-unlock-text-left-position {
  position: absolute;
  left: 37px;
  top: 21px;
}

.m-navbar-spin-img-position {
  position: absolute;
  left: 4px;
  top: 8px;
}

.m-navbar-spin-text-position {
  position: absolute;
  left: 40px;
  top: 8px;
}

.m-navbar-unlock-text-right-position {
  position: absolute;
  left: 37px;
  top: 21px;
}
</style>
