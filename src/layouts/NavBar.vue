<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { type GetGameOriginalData } from "@/interface/navBar";
import { setLang } from "@/locale/index";
import { useDisplay } from 'vuetify'
import { appBarStore } from "@/store/appBar";
import { loginBonusStore } from "@/store/loginBonus";
import { refferalStore } from "@/store/refferal";
import { storeToRefs } from "pinia";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_40 from "@/assets/public/svg/icon_public_40.svg";
import icon_public_46 from "@/assets/public/svg/icon_public_46.svg";
import icon_public_47 from "@/assets/public/svg/icon_public_47.svg";
import { gameStore } from "@/store/game";

const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setRefferalDialogShow } = refferalStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setLanguage } = gameStore();

const { t } = useI18n();
const open = ref<Array<string>>(['']);
const language = ref<string>('English');
const drawer = ref<boolean>(true);
const languageMenu = ref<boolean>(false);
const originalMenu = ref<boolean>(false);
const casinoCheckBox = ref<boolean>(false);
const soundCheckBox = ref<boolean>(false);
const casinoCheckboxColor = ref<string>("#ffffff");
const sportCheckboxColor = ref<string>("#7782AA");
const onCheckboxColor = ref<string>("#ffffff");
const offCheckboxColor = ref<string>("#7782AA");

// mobile version name
const { name, width } = useDisplay()
const router = useRouter();

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

const openLoginBonusDialog = () => {
  setLoginBonusDialogVisible(true);
}

// language array
const langItems = ref<Array<any>>([
  {
    id: 'en',
    value: t('navBar.language.english'),
  },
  {
    id: 'pt',
    value: t('navBar.language.portuguese'),
  },
  {
    id: 'es',
    value: t('navBar.language.espanola')
  }
])

// game original data array
const gameOriginalItems = ref<Array<GetGameOriginalData>>([
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlotsSlotsSlots"
  }
])

watch(drawer, (newValue: boolean) => {
  setNavBarToggle(newValue);
})

watch(navBarToggle, (newValue) => {
  drawer.value = newValue;
  if (mobileWidth.value < 600 && newValue) {
    setRightBarToggle(false);
  }
})

watch(casinoCheckBox, (value: boolean) => {
  if (value) {
    goGameBetBy();
    casinoCheckboxColor.value = "#7782AA";
    sportCheckboxColor.value = "#ffffff";
  } else {
    router.push(`/`);
    casinoCheckboxColor.value = "#ffffff";
    sportCheckboxColor.value = "#7782AA";
  }
}, { deep: true });

const handleLanguageDropdown = (item: any) => {
  language.value = item.value;
  switch (item.id) {
    case 'en':
      setLang("en");
      setLanguage('en');
      break;
    case 'pt':
      setLang("pt");
      setLanguage('pt');
      break;
    case 'es':
      setLang("es");
      setLanguage('es');
      break;
  }
}

const languageText = () => {
  const item = localStorage.getItem('lang');
  switch (item) {
    case 'en':
      language.value = t('navBar.language.english');
      break;
    case 'pt':
      language.value = t('navBar.language.portuguese');
      break;
    case 'es':
      language.value = t('navBar.language.espanola');
      break;
  }
}

const openRouletteBonusDialog = () => {
  setRouletteBonusDialogVisible(true);
}

const casinoTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', casinoCheckboxColor.value)
  }
  return el
}

const sportTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', sportCheckboxColor.value)
  }
  return el
}

watch(soundCheckBox, (value: boolean) => {
  if (value) {
    onCheckboxColor.value = "#7782AA";
    offCheckboxColor.value = "#ffffff";
  } else {
    onCheckboxColor.value = "#ffffff";
    offCheckboxColor.value = "#7782AA";
  }
}, { deep: true });

const onIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', onCheckboxColor.value)
  }
  return el
}

const offIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', offCheckboxColor.value)
  }
  return el
}

const goGameBetBy = () => {
  router.push(`/sports`);
}

const openRefferalDialogShow = () => {
  setOverlayScrimShow(false);
  setRefferalDialogShow(true)
  // setNavBarToggle(false);
}

onMounted(() => {
  drawer.value = mobileWidth.value < 1280 ? false : true;
  languageText();
})
</script>

<template>
  <v-navigation-drawer
    :temporary="mobileWidth < 1280"
    expand-on-hover
    :scrim-opacity="0.6"
    class="nav-background"
    :width="280"
    v-model="drawer"
  >
    <template v-slot:prepend>
      <v-list-item class="casino-toggle" :class="refferalAppBarShow ? 'mt-10' : ''">
        <input type="checkbox" id="casino-toggle" v-model="casinoCheckBox" />
        <label for="casino-toggle">
          <div class="casino">
            <inline-svg
              :src="icon_public_34"
              width="24"
              height="24"
              :transform-source="casinoTransform"
            ></inline-svg>
            <!-- <img src="@/assets/public/svg/icon_public_34.svg" width="24" /> -->
            <p class="text-700-14 ml-1">{{ t("navBar.casino") }}</p>
          </div>
          <div class="sport">
            <inline-svg
              :src="icon_public_40"
              width="24"
              height="24"
              :transform-source="sportTransform"
            ></inline-svg>
            <!-- <img src="@/assets/public/svg/icon_public_40.svg" width="24" /> -->
            <p class="text-700-14 ml-1">{{ t("navBar.sport") }}</p>
          </div>
        </label>
      </v-list-item>
    </template>
    <v-list density="compact" nav class="mt-1">
      <!-- <v-card color="#1D2027" theme="dark" class="mx-1"> -->
      <v-row class="ma-4 align-center p-space-between">
        <div>
          <img src="@/assets/public/svg/icon_public_1001.svg" width="24" />
          <span class="card-title">{{ t("navBar.rewards_center") }}</span>
        </div>

        <!-- <span class="ml-16 more-font">{{ t("navBar.more") }}</span> -->
        <!-- <v-btn class="right-btn" icon="true"> -->
        <div>
          <img src="@/assets/public/svg/icon_public_501.svg" width="24" />
        </div>
        <!-- </v-btn> -->
      </v-row>
      <v-row class="mx-2 ma-1">
        <v-list-item>
          <div class="p-vip-login-bonus mt-6" @click="openLoginBonusDialog">
            <img
              src="@/assets/public/image/img_public_1.png"
              class="p-vip-login-bonus-img"
            />
            <div class="p-vip-login-bonus-text">
              <p class="text-900-14 white">{{ t("navBar.login_bonus_text") }}</p>
              <p class="text-400-12 white" style="line-height: 14px">
                {{ t("navBar.unlock_text") }}
              </p>
            </div>
            <img
              src="@/assets/public/image/img_ci_7.png"
              width="18"
              class="p-vip-login-bonus-img-1"
            />
          </div>
          <div class="p-lucky-wheel mt-4" @click="openRouletteBonusDialog">
            <img src="@/assets/public/image/img_public_2.png" class="p-lucky-wheel-img" />
            <div class="p-vip-login-bonus-text">
              <p class="text-900-14 white">{{ t("navBar.lucky_wheel_text") }}</p>
              <p class="text-400-12 white" style="line-height: 14px">
                {{ t("navBar.unlock_text") }}
              </p>
            </div>
          </div>
        </v-list-item>

        <!-- <v-col cols="6" class="pa-1 relative">
            <v-list-item
              value="casino"
              class="ma-0 pa-0"
              height="48px"
              @click="openLoginBonusDialog"
            >
            <img src="@/assets/public/image/img_public_1.png" style="width: 55px;" />
            <div class="m-vip-login-bonus-text">
              <p class="text-900-10 white">{{ t("navBar.login_bonus_text") }}</p>
              <p class="text-400-8 white" style="line-height: 6px">
                {{ t("navBar.unlock_text") }}
              </p>
            </div>
            <img src="@/assets/public/image/img_ci_7.png" class="m-vip-login-bonus-img-1" />
            </v-list-item>
          </v-col>
          <v-col cols="6" class="pa-1">
            <v-list-item
              value="sport"
              class="ma-0 pa-0"
              height="48px"
              @click="openRouletteBonusDialog"
            >
              <img src="@/assets/public/image/img_public_2.png" class="m-lucky-wheel-img" />
              <div class="m-vip-login-bonus-text">
                <p class="text-900-10 white">{{ t("navBar.lucky_wheel_text") }}</p>
                <p class="text-400-8 white" style="line-height: 6px">
                  {{ t("navBar.unlock_text") }}
                </p>
              </div>
            </v-list-item>
          </v-col> -->
      </v-row>
      <!-- </v-card> -->
    </v-list>
    <v-list density="compact" nav class="p-m-list">
      <v-list-item value="earn free" class="ma-0 pa-0" @click="openRefferalDialogShow">
        <img src="@/assets/public/svg/img_public_20.svg" class="earn-free-img" />
        <img
          src="@/assets/public/image/img_public_6.png"
          class="navbar-free-money-img-position"
        />
        <p class="text-900-14 white navbar-free-money-text-position">
          {{ t("navBar.refer_earn_text") }}
        </p>
      </v-list-item>
    </v-list>
    <v-list v-model:opened="open">
      <v-list-group value="Casino">
        <template v-slot:activator="{ props }">
          <v-list-item
            class="avatar-img"
            v-bind="props"
            prepend-avatar="@/assets/public/svg/icon_public_34.svg"
            :title="t('navBar.casino')"
            link
            value="casino"
          >
          </v-list-item>
        </template>
        <v-card color="#1D2027" theme="dark" class="ma-2">
          <v-list>
            <v-list-item
              class="casino-sub-img"
              prepend-avatar="@/assets/public/svg/icon_public_35.svg"
              :title="t('navBar.casino_sub_menu.recently_played')"
              value="recently played"
            ></v-list-item>
            <v-list-item
              class="casino-sub-img"
              prepend-avatar="@/assets/public/svg/icon_public_36.svg"
              :title="t('navBar.casino_sub_menu.favorites')"
              value="favorites"
            ></v-list-item>
            <v-menu
              location="end"
              offset="20"
              class="original-dropdown"
              v-model:model-value="originalMenu"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  class="casino-sub-img"
                  prepend-avatar="@/assets/public/svg/icon_public_37.svg"
                  :append-icon="originalMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
                  :title="t('navBar.casino_sub_menu.game_originals')"
                  value="game originals"
                ></v-list-item>
              </template>
              <v-list theme="dark" bg-color="#1D2027">
                <v-list-item
                  v-for="(item, i) in gameOriginalItems"
                  :key="i"
                  :value="item.name"
                  class="avatar-img"
                  :prepend-avatar="item.icon"
                  :title="item.name"
                >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-list-item
              class="casino-sub-img"
              prepend-avatar="@/assets/public/svg/icon_public_38.svg"
              :title="t('navBar.casino_sub_menu.slots')"
              value="slots"
            ></v-list-item>
            <v-list-item
              class="casino-sub-img"
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
        class="avatar-img"
        prepend-avatar="@/assets/public/svg/icon_public_40.svg"
        :title="t('navBar.sport')"
        value="sport"
        @click="goGameBetBy"
      ></v-list-item>
    </v-list>
    <v-divider class="divider"></v-divider>
    <v-list>
      <v-list-item
        class="avatar-img"
        prepend-avatar="@/assets/public/svg/icon_public_41.svg"
        :title="t('navBar.menu_item_1.promotions')"
        value="promotions"
      ></v-list-item>
      <v-list-item
        class="vip-club"
        prepend-avatar="@/assets/public/svg/icon_public_42.svg"
        :title="t('navBar.menu_item_1.vip_club')"
        value="vip club"
        router
        :to="{ name: 'VIP' }"
      ></v-list-item>
      <v-list-item
        class="avatar-img"
        prepend-avatar="@/assets/public/svg/icon_public_43.svg"
        :title="t('navBar.menu_item_1.affiliate')"
        value="affiliate"
        router
        :to="{ name: 'Affiliate' }"
      ></v-list-item>
      <v-list-item
        class="avatar-img"
        prepend-avatar="@/assets/public/svg/icon_public_44.svg"
        :title="t('navBar.menu_item_1.blog')"
        value="blog"
      ></v-list-item>
    </v-list>
    <v-divider class="divider"></v-divider>
    <v-list>
      <v-list-item
        class="avatar-img"
        prepend-avatar="@/assets/public/svg/icon_public_45.svg"
        :title="t('navBar.live_support')"
        value="live support"
      ></v-list-item>
    </v-list>
    <v-list>
      <v-menu location="end" offset="16" v-model:model-value="languageMenu">
        <template v-slot:activator="{ props }">
          <v-card color="#1D2027" theme="dark" class="mx-2 language-item">
            <v-list-item
              v-bind="props"
              class="casino-sub-img"
              prepend-avatar="@/assets/public/svg/icon_public_57.svg"
              :title="language"
              value="english"
              :append-icon="languageMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
            >
            </v-list-item>
          </v-card>
        </template>
        <v-list theme="dark" bg-color="#1D2027" width="220" class="text-center">
          <v-list-item
            :title="t('navBar.language.title')"
            class="avatar-img"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="(item, i) in langItems"
            :key="i"
            :value="item"
            class="avatar-img"
            @click="handleLanguageDropdown(item)"
            :class="language == item.value ? 'nav-lang-selected-item' : ''"
          >
            <v-list-item-title>{{ item.value }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list>
    <v-list-item class="theme-toggle">
      <input type="checkbox" id="theme-toggle" v-model="soundCheckBox" />
      <label for="theme-toggle">
        <div class="dark">
          <inline-svg
            :src="icon_public_46"
            width="24"
            :transform-source="onIconTransform"
          ></inline-svg>
          <!-- <img src="@/assets/public/svg/icon_public_46.svg" /> -->
          <p class="text-700-14 ml-1">{{ t("navBar.sound_mode.on") }}</p>
        </div>
        <div class="light">
          <inline-svg
            :src="icon_public_47"
            width="24"
            :transform-source="offIconTransform"
          ></inline-svg>
          <!-- <img src="@/assets/public/svg/icon_public_47.svg" /> -->
          <p class="text-700-14 ml-1">{{ t("navBar.sound_mode.off") }}</p>
        </div>
      </label>
    </v-list-item>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.nav-lang-selected-item {
  border: 1px solid #00b25c;
  margin: 5px;
  border-radius: 14px;
}

.p-space-between {
  justify-content: space-between;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
      font-size: 16px;
      font-weight: 700;
    }
  }
}

::deep(.v-navigation-drawer__content) {
  height: 100vh;
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

// casino and sport toggle switch
.casino-toggle {
  label {
    width: 232px;
    height: 48px;
    position: relative;
    display: block;
    background: #1d2027;
    border-radius: 24px !important;
    cursor: pointer;
    transition: 0.2s;
    margin: auto;

    div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
    }

    .casino {
      left: 17px;
      transition: 0.3s;
      color: black;

      img {
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }
    }

    .sport {
      left: 134px;
      transition: 0.3s;
      color: #7782aa;

      img {
        width: 24px;
        margin-right: 4px;
      }
    }
  }

  label:after {
    content: "";
    width: 112px;
    height: 40px;
    position: absolute;
    top: 4px;
    left: 4px;
    background: #009b3a;
    border-radius: 20px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:checked + label:after {
    left: 228px;
    transform: translateX(-100%);
  }

  label:active:after {
    width: 112px;
  }

  input:checked + label .casino {
    color: #7782aa;
  }

  input:checked + label .sport {
    color: black;
  }
}

.card-title {
  color: #d99504;
  font-weight: 700;
  font-size: 16px;
}

.more-font {
  font-weight: 500;
  font-size: 12px;
  color: #7782aa;
}

.right-btn {
  font-weight: 500;
  font-size: 12px;
  color: #7782aa;
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: 3px;
  right: 5px;
}

.img-width {
  margin-top: 4px;
  width: 100%;
}

.spin-img-width {
  width: 100%;
  margin-top: 4px;
}

.earn-free-img {
  width: 100%;
}

.avatar-img {
  :deep(.v-avatar--density-default) {
    height: 24px;
    width: 22px;
    border-radius: 0px;
  }

  :deep(.v-list-item-title) {
    font-weight: 700;
    font-size: 14px;
    color: #7782aa;
  }
}

.p-m-list {
  padding-left: 0 !important;
}

.p-vip-login-bonus {
  position: relative;
  width: 230px;
  height: 48px;
  background: linear-gradient(266deg, #5421fd 1.95%, #5421fd 53.19%);
  box-shadow: 0px -4px 0px 0px #3a1aa7 inset;
  border-radius: 8px;
  cursor: pointer;
}

.p-vip-login-bonus-text {
  position: absolute;
  left: 84px;
  top: 4px;
}

.p-vip-login-bonus-img {
  width: 90px;
  height: 90px;
  position: absolute;
  left: 0px;
  bottom: -16px;
}

.p-vip-login-bonus-img-1 {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 7px;
  top: -5px;
}

.p-lucky-wheel {
  position: relative;
  width: 230px;
  height: 48px;
  border-radius: 8px;
  background: #6aa82d;
  box-shadow: 0px -4px 0px 0px #384140 inset;
  cursor: pointer;
}

.p-lucky-wheel-img {
  width: 66px;
  height: 66px;
  position: absolute;
  left: 8px;
  bottom: -2px;
}

.vip-club {
  :deep(.v-avatar--density-default) {
    height: 24px;
    width: 20px;
    border-radius: 0px;
  }

  :deep(.v-list-item-title) {
    font-weight: 700;
    font-size: 14px;
    color: #f9bc01;
  }
}

.casino-sub-img {
  :deep(.v-avatar--density-default) {
    height: 22px;
    width: 22px;
    border-radius: 0px;
  }

  :deep(.v-list-item-title) {
    font-weight: 500;
    font-size: 14px;
    color: #7782aa;
  }
}

.divider {
  width: 122px;
  margin: auto;
}

.casino-sub-img {
  :deep(.v-list-item__content) {
    align-self: center;
    grid-area: content;
    overflow: hidden;
    // width: 105px;
  }

  :deep(.v-list-item__append > .v-icon) {
    margin-inline-start: 18px;
  }
}

.language-item {
  border-radius: 8px;
  background: var(--text-box-1211-f-31, #1d2027);

  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;

  :deep(.v-list-item__content) {
    align-self: center;
    grid-area: content;
    overflow: hidden;
    width: 105px;
  }

  :deep(.v-list-item__append > .v-icon) {
    margin-inline-start: 18px;
  }
}

// dark and light toggle switch
.theme-toggle {
  height: 50px;

  label {
    width: 240px;
    height: 44px;
    position: relative;
    display: block;
    background: #1d2027;
    border-radius: 22px !important;
    cursor: pointer;
    transition: 0.3s;
    margin: auto;

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
      left: 34px;
      transition: 0.3s;
      color: white;

      img {
        width: 24px;
        height: 24px;
      }
    }

    .light {
      left: 154px;
      transition: 0.3s;
      color: #7782aa;

      img {
        width: 24px;
      }
    }
  }

  label:after {
    content: "";
    width: 116px;
    height: 36px;
    position: absolute;
    top: 4px;
    left: 4px;
    background: #23262f;
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
    left: 236px;
    transform: translateX(-100%);
  }

  label:active:after {
    width: 116px;
  }

  input:checked + label .dark {
    color: #7782aa;
  }

  input:checked + label .light {
    color: white;
  }
}

.original-dropdown {
  ::deep(.v-overlay__content) {
    display: none !important;
  }
}

.navbar-free-money-img-position {
  position: absolute;
  width: 70px;
  left: 14px;
  top: 0px;
}

.navbar-free-money-text-position {
  position: absolute;
  left: 100px;
  top: 30px;
}

.navbar-task-img-position {
  position: absolute;
  left: 6px;
  top: -6px;
}

.navbar-task-text-position {
  position: absolute;
  left: 48px;
  top: 2px;
}

.navbar-unlock-text-left-position {
  position: absolute;
  left: 48px;
  top: 20px;
  font-size: 12px;
}

.navbar-spin-img-position {
  position: absolute;
  left: 4px;
  top: 2px;
}

.navbar-spin-text-position {
  position: absolute;
  left: 48px;
  top: 2px;
}

.navbar-unlock-text-right-position {
  position: absolute;
  left: 48px;
  top: 20px;
  font-size: 12px;
}
</style>
