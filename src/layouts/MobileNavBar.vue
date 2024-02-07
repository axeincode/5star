<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from 'vue-i18n';
import { type GetGameOriginalData } from "@/interface/navBar";
import { setLang } from "@/locale/index";
import { useDisplay } from 'vuetify'
import { appBarStore } from "@/store/appBar";
import { loginBonusStore } from "@/store/loginBonus";
import { refferalStore } from "@/store/refferal";
import { mailStore } from "@/store/mail";
import { gameStore } from "@/store/game";
import { agentStore } from "@/store/agent";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_35 from "@/assets/public/svg/icon_public_35.svg";
import icon_public_36 from "@/assets/public/svg/icon_public_36.svg";
import icon_public_37 from "@/assets/public/svg/icon_public_37.svg";
import icon_public_38 from "@/assets/public/svg/icon_public_38.svg";
import icon_public_39 from "@/assets/public/svg/icon_public_39.svg";
import icon_public_40 from "@/assets/public/svg/icon_public_40.svg";
import icon_public_41 from "@/assets/public/svg/icon_public_41.svg";
import icon_public_42 from "@/assets/public/svg/icon_public_42.svg";
import icon_public_43 from "@/assets/public/svg/icon_public_43.svg";
import icon_public_44 from "@/assets/public/svg/icon_public_44.svg";
import icon_public_45 from "@/assets/public/svg/icon_public_45.svg";
import icon_public_46 from "@/assets/public/svg/icon_public_46.svg";
import icon_public_47 from "@/assets/public/svg/icon_public_47.svg";
import icon_public_57 from "@/assets/public/svg/icon_public_57.svg";
import icon_public_95 from "@/assets/public/svg/icon_public_95.svg";
import icon_public_96 from "@/assets/public/svg/icon_public_96.svg";
import icon_public_114 from "@/assets/public/svg/icon_public_114.svg";
import icon_public_115 from "@/assets/public/svg/icon_public_115.svg";
import icon_public_116 from "@/assets/public/svg/icon_public_116.svg";
import icon_public_117 from "@/assets/public/svg/icon_public_117.svg";
import icon_public_118 from "@/assets/public/svg/icon_public_118.svg";
import icon_public_119 from "@/assets/public/svg/icon_public_119.svg";
import icon_public_120 from "@/assets/public/svg/icon_public_120.svg";
import icon_public_121 from "@/assets/public/svg/icon_public_121.svg";
import icon_public_122 from "@/assets/public/svg/icon_public_122.svg";
import icon_public_123 from "@/assets/public/svg/icon_public_123.svg";
import icon_public_124 from "@/assets/public/svg/icon_public_124.svg";
import icon_public_125 from "@/assets/public/svg/icon_public_125.svg";
import icon_public_126 from "@/assets/public/svg/icon_public_126.svg";
import icon_public_127 from "@/assets/public/svg/icon_public_127.svg";
import icon_public_128 from "@/assets/public/svg/icon_public_128.svg";
import icon_public_129 from "@/assets/public/svg/icon_public_129.svg";
import icon_public_130 from "@/assets/public/svg/icon_public_130.svg";
import icon_public_131 from "@/assets/public/svg/icon_public_131.svg";
import icon_public_132 from "@/assets/public/svg/icon_public_132.svg";
import icon_public_133 from "@/assets/public/svg/icon_public_133.svg";
import icon_public_134 from "@/assets/public/svg/icon_public_134.svg";
import icon_public_135 from "@/assets/public/svg/icon_public_135.svg";
import icon_public_136 from "@/assets/public/svg/icon_public_136.svg";
import icon_public_137 from "@/assets/public/svg/icon_public_137.svg";
import icon_public_138 from "@/assets/public/svg/icon_public_138.svg";
import icon_public_139 from "@/assets/public/svg/icon_public_139.svg";
import icon_public_140 from "@/assets/public/svg/icon_public_140.svg";
import icon_public_141 from "@/assets/public/svg/icon_public_141.svg";
import icon_public_142 from "@/assets/public/svg/icon_public_142.svg";
import icon_public_143 from "@/assets/public/svg/icon_public_143.svg";

import icon_public_144 from "@/assets/public/svg/icon_public_144.svg";
import icon_public_145 from "@/assets/public/svg/icon_public_145.svg";
import icon_public_146 from "@/assets/public/svg/icon_public_146.svg";
import icon_public_147 from "@/assets/public/svg/icon_public_147.svg";

const router = useRouter();
const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setRefferalDialogShow } = refferalStore();
const { setMailMenuShow } = mailStore();
const { setSearchGameDialogShow } = gameStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setGameFilterText } = gameStore();
const { dispatchGameCategories } = gameStore();
const { setAgentNavBarToggle } = agentStore();
const { setVipNavBarToggle } = vipStore();

const { t } = useI18n();
const casinoOpen = ref<Array<string>>(['']);
const sportOpen = ref<Array<string>>(['']);
const language = ref<string>('English');
const drawer = ref<boolean>(true);
const languageMenu = ref<boolean>(false);
const originalMenu = ref<boolean>(false);
const navDrawer = ref<any>(null);
const casinoIconColor = ref<string>("#7782AA");
const originalIconColor = ref<string>("#7782AA")
const recentlyIconColor = ref<string>("#7782AA")
const favoriteIconColor = ref<string>("#7782AA")
const hotIconColor = ref<string>("#7782AA")
const providerIconColor = ref<string>("#7782AA")
const slotIconColor = ref<string>("#7782AA")
const liveIconColor = ref<string>("#7782AA")
const sportIconColor = ref<string>("#7782AA")
const promotionIconColor = ref<string>("#7782AA")
const vipIconColor = ref<string>("#7782AA")
const affiliateIconColor = ref<string>("#7782AA")
const blogIconColor = ref<string>("#7782AA")
const supportIconColor = ref<string>("#7782AA")
const languageIconColor = ref<string>("#7782AA")
const activeItem = ref<string>("");
const navItem = ref<string>("");
const soundCheckBox = ref<boolean>(false);
const onCheckboxColor = ref<string>("#ffffff");
const offCheckboxColor = ref<string>("#7782AA");
const sportMenuIconColor = ref<string>("#7782AA");
const eSportMenuIconColor = ref<string>("#7782AA");
const sportMenu = ref<boolean>(false);
const eSportMenu = ref<boolean>(false);

const sportGames = ref<Array<any>>([
  {
    name: t("navBar.sport_sub_menu.text_14"),
    icon: icon_public_121,
    query: "%2Famerican-football-16"
  },
  {
    name: t("navBar.sport_sub_menu.text_15"),
    icon: icon_public_122,
    query: "%2Fbadminton-31"
  },
  {
    name: t("navBar.sport_sub_menu.text_16"),
    icon: icon_public_123,
    query: "%2Fbaseball-3"
  },
  {
    name: t("navBar.sport_sub_menu.text_17"),
    icon: icon_public_124,
    query: "%2F%3FliveSport%3Dbasketball-2"
  },
  {
    name: t("navBar.sport_sub_menu.text_18"),
    icon: icon_public_125,
    query: "%2Fcricket-21"
  },
  {
    name: t("navBar.sport_sub_menu.text_19"),
    icon: icon_public_126,
    query: "%2Fcycling-17"
  },
  {
    name: t("navBar.sport_sub_menu.text_20"),
    icon: icon_public_127,
    query: "%2Fdarts-22"
  },
  {
    name: t("navBar.sport_sub_menu.text_21"),
    icon: icon_public_128,
    query: "%2Fformula-1-40"
  },
  {
    name: t("navBar.sport_sub_menu.text_22"),
    icon: icon_public_129,
    query: "%2Ffutsal-29"
  },
  {
    name: t("navBar.sport_sub_menu.text_23"),
    icon: icon_public_130,
    query: "%2Fgolf-9"
  },
  {
    name: t("navBar.sport_sub_menu.text_24"),
    icon: icon_public_131,
    query: "%2Fhandball-6"
  },
  {
    name: t("navBar.sport_sub_menu.text_25"),
    icon: icon_public_132,
    query: "/ice-hockey-4"
  },
  {
    name: t("navBar.sport_sub_menu.text_26"),
    icon: icon_public_133,
    query: "%2Febaseball%2Fmlb-20-2128614497890471950"
  },
  {
    name: t("navBar.sport_sub_menu.text_27"),
    icon: icon_public_134,
    query: "%2Fmma-117"
  },
  {
    name: t("navBar.sport_sub_menu.text_28"),
    icon: icon_public_135,
    query: "%2Famerican-football%2Fusa%2Fnfl-1666080012467572736"
  },
  {
    name: t("navBar.sport_sub_menu.text_29"),
    icon: icon_public_136,
    query: "%2Fmotorcycle-racing-190"
  },
  {
    name: t("navBar.sport_sub_menu.text_30"),
    icon: icon_public_137,
    query: ""
  },
  {
    name: t("navBar.sport_sub_menu.text_31"),
    icon: icon_public_138,
    query: "%2Frugby-12"
  },
  {
    name: t("navBar.sport_sub_menu.text_32"),
    icon: icon_public_139,
    query: "%2Fsnooker-19"
  },
  {
    name: t("navBar.sport_sub_menu.text_33"),
    icon: icon_public_140,
    query: "%2Ftable-tennis-20"
  },
  {
    name: t("navBar.sport_sub_menu.text_34"),
    icon: icon_public_141,
    query: "%2F%3FliveSport%3Dtennis-5"
  },
  {
    name: t("navBar.sport_sub_menu.text_35"),
    icon: icon_public_142,
    query: "%2Fvolleyball-23"
  },
  {
    name: t("navBar.sport_sub_menu.text_36"),
    icon: icon_public_143,
    query: "%2Fwaterpolo-26"
  },
])

const eSportGames = ref<Array<any>>([
  {
    name: t("navBar.sport_sub_menu.text_37"),
    icon: icon_public_144,
    query: "%2Fcounter-strike-109"
  },
  {
    name: t("navBar.sport_sub_menu.text_38"),
    icon: icon_public_145,
    query: "%2Fdota-2-111"
  },
  {
    name: t("navBar.sport_sub_menu.text_39"),
    icon: icon_public_146,
    query: ""
  },
  {
    name: t("navBar.sport_sub_menu.text_40"),
    icon: icon_public_147,
    query: "%2Fleague-of-legends-110"
  },
])

// mobile version name
const { name, width } = useDisplay()
const { setLanguage } = gameStore();

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

const originalGames = computed(() => {
  const { getOriginalGames } = storeToRefs(gameStore());
  return getOriginalGames.value
})

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
  setMailMenuShow(newValue);
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
  if (mobileWidth.value < 600) {
    setSearchGameDialogShow(newValue);
  }
})

watch(casinoOpen, (value) => {
  if (value.length == 1) {
    casinoIconColor.value = "#7782AA";
    recentlyIconColor.value = "#7782AA"
    favoriteIconColor.value = "#7782AA"
    slotIconColor.value = "#7782AA"
    liveIconColor.value = "#7782AA"
    activeItem.value = "";
  } else {
    casinoIconColor.value = "#FFFFFF";
    sportIconColor.value = "#7782AA"
    promotionIconColor.value = "#7782AA"
    navItem.value = "";
    sportOpen.value = [""];
  }
})

watch(sportOpen, (value) => {
  if (value.length == 1) {
    activeItem.value = "";
  } else {
    sportIconColor.value = "#FFFFFF";
    casinoIconColor.value = "#7782AA"
    promotionIconColor.value = "#7782AA"
    navItem.value = "";
    casinoOpen.value = [""];
  }
})

watch(originalMenu, (value) => {
  if (value) {
    originalIconColor.value = "#FFFFFF";
    recentlyIconColor.value = "#7782AA"
    favoriteIconColor.value = "#7782AA"
    slotIconColor.value = "#7782AA"
    liveIconColor.value = "#7782AA"
    activeItem.value = "";
  } else {
    originalIconColor.value = "#7782AA"
  }
})

watch(languageMenu, (value) => {
  if (value) {
    languageIconColor.value = "#FFFFFF";
  } else {
    languageIconColor.value = "#7782AA"
  }
})

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

window.addEventListener('scroll', function () {
  originalMenu.value = false;
  languageMenu.value = false;
});

const navDrawerScroll = () => {
  originalMenu.value = false;
  languageMenu.value = false;
}

const handleEnterGame = async (id: number, name: string) => {
  let replaceName = name.replace(/ /g, "-");
  if (mobileWidth.value < 600) {
    setMailMenuShow(true);
  }
  router.push(`/game/${id}/${replaceName}`);
};

const casinoIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", casinoIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", casinoIconColor.value);
    }
  }
  return el;
};

const originalIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", originalIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", originalIconColor.value);
    }
  }
  return el;
};

const recentlyIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", recentlyIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", recentlyIconColor.value);
    }
  }
  return el;
};

const favoriteIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", favoriteIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", favoriteIconColor.value);
    }
  }
  return el;
};

const slotIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", slotIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", slotIconColor.value);
    }
  }
  return el;
};

const liveIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", liveIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", liveIconColor.value);
    }
  }
  return el;
};

const sportIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", sportIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", sportIconColor.value);
    }
  }
  return el;
};

const vipIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", vipIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", vipIconColor.value);
    }
  }
  return el;
};

const promotionIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", promotionIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", promotionIconColor.value);
    }
  }
  return el;
};

const affiliateIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", affiliateIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", affiliateIconColor.value);
    }
  }
  return el;
};

const blogIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", blogIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", blogIconColor.value);
    }
  }
  return el;
};

const supportIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", supportIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", supportIconColor.value);
    }
  }
  return el;
};

const languageIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", languageIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", languageIconColor.value);
    }
  }
  return el;
};

const hotIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", hotIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", hotIconColor.value);
    }
  }
  return el;
};

const providerIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", providerIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", providerIconColor.value);
    }
  }
  return el;
};

watch(sportMenu, (value) => {
  sportMenuIconColor.value = value ? "#ffffff" : "#7782AA";
})

const sportMenuIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", sportMenuIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", sportMenuIconColor.value);
    }
  }
  return el;
};

watch(eSportMenu, (value) => {
  eSportMenuIconColor.value = value ? "#ffffff" : "#7782AA";
})

const eSportMenuIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", eSportMenuIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", eSportMenuIconColor.value);
    }
  }
  return el;
};

const handleSportGame = (sport_game_query: string) => {
  router.push({ name: "Sports", query: { "bt-path": sport_game_query } })
}

const openLoginBonusDialog = () => {
  setLoginBonusDialogVisible(true);
  setNavBarToggle(false);
  setOverlayScrimShow(true);
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
}

const openRouletteBonusDialog = () => {
  setRouletteBonusDialogVisible(true);
  setNavBarToggle(false);
  setOverlayScrimShow(true);
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
}
const openRefferalDialogShow = () => {
  setOverlayScrimShow(false);
  setRefferalDialogShow(true)
  setNavBarToggle(false);
}

const handleGameFilter = (filterText: string) => {
  // let tempFilterText: string = "";
  // switch (filterText) {
  //   case t('navBar.casino_sub_menu.recently_played'):
  //     setGameFilterText("history");
  //     tempFilterText = "history";
  //     activeItem.value = t('navBar.casino_sub_menu.recently_played');
  //     recentlyIconColor.value = "#FFFFFF"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     liveIconColor.value = "#7782AA"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.hot_text'):
  //     // setGameFilterText("history");
  //     tempFilterText = "history";
  //     activeItem.value = t('navBar.casino_sub_menu.hot_text');
  //     hotIconColor.value = "#FFFFFF"
  //     recentlyIconColor.value = "#7782AA"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     liveIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.favorites'):
  //     setGameFilterText("favorite");
  //     tempFilterText = "favorite";
  //     activeItem.value = t('navBar.casino_sub_menu.favorites');
  //     favoriteIconColor.value = "#FFFFFF"
  //     recentlyIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     liveIconColor.value = "#7782AA"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.slots'):
  //     setGameFilterText("slot");
  //     tempFilterText = "slot";
  //     activeItem.value = t('navBar.casino_sub_menu.slots');
  //     recentlyIconColor.value = "#7782AA"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#FFFFFF"
  //     liveIconColor.value = "#7782AA"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.live_casino'):
  //     setGameFilterText("live");
  //     tempFilterText = "live";
  //     activeItem.value = t('navBar.casino_sub_menu.live_casino');
  //     recentlyIconColor.value = "#7782AA"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     liveIconColor.value = "#FFFFFF"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.provider_text'):
  //     // setGameFilterText("live");
  //     tempFilterText = "live";
  //     activeItem.value = t('navBar.casino_sub_menu.provider_text');
  //     recentlyIconColor.value = "#7782AA"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     liveIconColor.value = "#7782AA"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#FFFFFF"
  //     break;
  // }
  // router.push({ name: "Dashboard", query: { filter: tempFilterText } });
  router.push({ name: "Dashboard", query: { filter: filterText } });
  setNavBarToggle(false);
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
}

const handleNavbarItem = (navbarText: string) => {
  casinoOpen.value = [''];
  navItem.value = navbarText
  switch (navbarText) {
    case t('navBar.sport'):
      goGameBetBy();
      sportIconColor.value = "#FFFFFF"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#7782AA"
      break;
    case t('navBar.menu_item_1.promotions'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#FFFFFF"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#7782AA"
      break;
    case t('navBar.menu_item_1.vip_club'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#FFFFFF"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#7782AA"
      setVipNavBarToggle('1');
      setNavBarToggle(false);
      setMainBlurEffectShow(false);
      setOverlayScrimShow(false);
      break;
    case t('navBar.menu_item_1.affiliate'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#FFFFFF"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#7782AA"
      setAgentNavBarToggle(true);
      setNavBarToggle(false);
      setMainBlurEffectShow(false);
      setOverlayScrimShow(false);
      setTimeout(() => {
        setMailMenuShow(false);
        setMailMenuShow(true);
      }, 200)
      break;
    case t('navBar.menu_item_1.blog'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#FFFFFF"
      supportIconColor.value = "#7782AA"
      break;
    case t('navBar.live_support'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#FFFFFF"
      break;
  }
}

const goGameBetBy = () => {
  router.push({ name: "Sports" });
}

const casinoMenuList = ref<Array<any>>([]);

const gameCategories = computed(() => {
  const { getGameCategories } = storeToRefs(gameStore());
  return getGameCategories.value;
});

onMounted(async () => {
  drawer.value = mobileWidth.value < 1280 ? false : true;
  languageText();
  await dispatchGameCategories('?type=casino');
  casinoMenuList.value = gameCategories.value
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
      <!-- <div class="m-space-between">
        <div>
          <img src="@/assets/public/svg/icon_public_1001.svg" width="18" />
          <span class="card-title">{{ t("navBar.rewards_center") }}</span>
        </div>
        <div>
          <img src="@/assets/public/svg/icon_public_501.svg" width="18" />
        </div>
      </div> -->
      <div class="m-vip-login-bonus mt-6" @click="openLoginBonusDialog">
        <img src="@/assets/public/image/img_public_1.png" class="m-vip-login-bonus-img" />
        <div class="m-vip-login-bonus-text">
          <p class="text-700-10 white">{{ t("navBar.login_bonus_text") }}</p>
          <p class="text-400-8 white" style="line-height: 6px">
            {{ t("navBar.unlock_text") }}
          </p>
        </div>
        <img src="@/assets/public/image/img_ci_7.png" class="m-vip-login-bonus-img-1" />
      </div>
      <div class="m-lucky-wheel mt-4" @click="openRouletteBonusDialog">
        <img src="@/assets/public/image/img_public_2.png" class="m-lucky-wheel-img" />
        <div class="m-vip-login-bonus-text">
          <p class="text-700-10 white">{{ t("navBar.lucky_wheel_text") }}</p>
          <p class="text-400-8 white" style="line-height: 6px">
            {{ t("navBar.unlock_text") }}
          </p>
        </div>
      </div>
      <div class="m-refer-earn mt-4" @click="openRefferalDialogShow">
        <img src="@/assets/public/svg/img_public_20.svg" width="184" />
        <img src="@/assets/public/image/img_public_6.png" width="48" class="m-earn-img" />
        <p class="text-700-12 white m-refer-earn-text">
          {{ t("navBar.refer_earn_text") }}
        </p>
      </div>
      <!-- <v-list density="compact" nav class="mt-1 px-0">
        <v-card color="#15161C" theme="dark" style="border-radius: 0px">
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
        <v-list-item class="ma-0 pa-0" @click="openRefferalDialogShow">
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
      </v-list> -->
      <v-list v-model:opened="casinoOpen">
        <v-list-group value="Casino">
          <template v-slot:activator="{ props }">
            <v-list-item
              class="m-user-item1 m-nav-menu white"
              v-bind="props"
              link
              value="casino"
              :height="40"
              style="
                margin-bottom: -16px !important;
                margin-top: -8px !important;
                padding-left: 10px;
              "
            >
              <template v-slot:prepend>
                <inline-svg
                  :src="icon_public_34"
                  width="16"
                  :transform-source="casinoIconTransform"
                ></inline-svg>
              </template>
              <v-list-item-title
                class="ml-2"
                :class="casinoOpen.length == 1 ? 'gray' : 'white'"
              >
                {{ t("navBar.casino") }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-card color="#15161C" theme="dark" class="mt-6" style="border-radius: 0px">
            <v-list>
              <v-list-item
                v-for="(item, index) in casinoMenuList"
                class="m-casino-sub-img m-nav-sub-menu"
                :value="item.slug"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleGameFilter(item.slug)"
              >
                <template v-slot:prepend>
                  <inline-svg :src="item.image" width="16"></inline-svg>
                </template>
                <v-list-item-title
                  class="ml-2"
                  :class="activeItem == item.name ? 'white' : 'gray'"
                >
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item>
              <!-- <v-list-item
                class="m-casino-sub-img m-nav-sub-menu"
                value="favorites"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleGameFilter(t('navBar.casino_sub_menu.favorites'))"
              >
                <template v-slot:prepend>
                  <inline-svg
                    :src="icon_public_36"
                    width="16"
                    :transform-source="favoriteIconTransform"
                  ></inline-svg>
                </template>
                <v-list-item-title
                  class="ml-2"
                  :class="
                    activeItem == t('navBar.casino_sub_menu.favorites') ? 'white' : 'gray'
                  "
                >
                  {{ t("navBar.casino_sub_menu.favorites") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu"
                value="recently played"
                v-model="activeItem"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleGameFilter(t('navBar.casino_sub_menu.recently_played'))"
              >
                <template v-slot:prepend>
                  <inline-svg
                    :src="icon_public_35"
                    width="16"
                    :transform-source="recentlyIconTransform"
                  ></inline-svg>
                </template>
                <v-list-item-title
                  class="ml-2"
                  :class="
                    activeItem == t('navBar.casino_sub_menu.recently_played')
                      ? 'white'
                      : 'gray'
                  "
                >
                  {{ t("navBar.casino_sub_menu.recently_played") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu"
                value="hot"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleGameFilter(t('navBar.casino_sub_menu.hot_text'))"
              >
                <template v-slot:prepend>
                  <inline-svg
                    :src="icon_public_95"
                    width="16"
                    :transform-source="hotIconTransform"
                  ></inline-svg>
                </template>
                <v-list-item-title
                  class="ml-2"
                  :class="
                    activeItem == t('navBar.casino_sub_menu.hot_text') ? 'white' : 'gray'
                  "
                >
                  {{ t("navBar.casino_sub_menu.hot_text") }}
                </v-list-item-title>
              </v-list-item>
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
                    class="m-casino-sub-img m-nav-sub-menu"
                    :append-icon="originalMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
                    value="game originals"
                    style="margin-bottom: -4px !important; margin-top: -4px !important"
                  >
                    <template v-slot:prepend>
                      <inline-svg
                        :src="icon_public_37"
                        width="16"
                        :transform-source="originalIconTransform"
                      ></inline-svg>
                    </template>
                    <v-list-item-title
                      class="ml-2"
                      :class="originalMenu ? 'white' : 'gray'"
                    >
                      {{ t("navBar.casino_sub_menu.game_originals") }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
                <v-list theme="dark" bg-color="#15161C" width="166" class="ml-6">
                  <v-list-item
                    v-for="(item, i) in originalGames"
                    :key="i"
                    :value="item.name"
                    class="m-avatar-img m-nav-sub-menu"
                    prepend-avatar="@/assets/public/svg/icon_public_21.svg"
                    :title="item.name"
                    style="font-size: 11px !important; font-weight: 500 !important"
                    @click="handleEnterGame(item.id, item.name)"
                  >
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu"
                value="slots"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleGameFilter(t('navBar.casino_sub_menu.slots'))"
              >
                <template v-slot:prepend>
                  <inline-svg
                    :src="icon_public_38"
                    width="16"
                    :transform-source="slotIconTransform"
                  ></inline-svg>
                </template>
                <v-list-item-title
                  class="ml-2"
                  :class="
                    activeItem == t('navBar.casino_sub_menu.slots') ? 'white' : 'gray'
                  "
                >
                  {{ t("navBar.casino_sub_menu.slots") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu"
                value="live casino"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleGameFilter(t('navBar.casino_sub_menu.live_casino'))"
              >
                <template v-slot:prepend>
                  <inline-svg
                    :src="icon_public_39"
                    width="16"
                    :transform-source="liveIconTransform"
                  ></inline-svg>
                </template>
                <v-list-item-title
                  class="ml-2"
                  :class="
                    activeItem == t('navBar.casino_sub_menu.live_casino')
                      ? 'white'
                      : 'gray'
                  "
                >
                  {{ t("navBar.casino_sub_menu.live_casino") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu"
                value="provider"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleGameFilter(t('navBar.casino_sub_menu.provider_text'))"
              >
                <template v-slot:prepend>
                  <inline-svg
                    :src="icon_public_96"
                    width="16"
                    :transform-source="providerIconTransform"
                  ></inline-svg>
                </template>
                <v-list-item-title
                  class="ml-2"
                  :class="
                    activeItem == t('navBar.casino_sub_menu.provider_text')
                      ? 'white'
                      : 'gray'
                  "
                >
                  {{ t("navBar.casino_sub_menu.provider_text") }}
                </v-list-item-title>
              </v-list-item> -->
            </v-list>
          </v-card>
        </v-list-group>
      </v-list>
      <v-list v-model:opened="sportOpen" class="mb-2">
        <v-list-group value="Sport">
          <template v-slot:activator="{ props }">
            <v-list-item
              class="m-user-item1 m-nav-menu white"
              v-bind="props"
              link
              value="sport"
              :height="40"
              style="
                margin-bottom: -16px !important;
                margin-top: -8px !important;
                padding-left: 10px;
              "
            >
              <template v-slot:prepend>
                <inline-svg
                  :src="icon_public_40"
                  width="16"
                  :transform-source="sportIconTransform"
                ></inline-svg>
              </template>
              <v-list-item-title
                class="ml-2"
                :class="sportOpen.length == 1 ? 'gray' : 'white'"
              >
                {{ t("navBar.sport") }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-card color="#15161C" theme="dark" class="mt-6" style="border-radius: 0px">
            <v-list>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu"
                value="my_bet"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_114" width="16"></inline-svg>
                </template>
                <v-list-item-title
                  class="ml-2"
                  :class="
                    activeItem == t('navBar.sport_sub_menu.text_1') ? 'white' : 'gray'
                  "
                >
                  {{ t("navBar.sport_sub_menu.text_1") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu"
                value="popular"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_95" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-2 white">
                  {{ t("navBar.sport_sub_menu.text_2") }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="
                  handleSportGame('/soccer/brazil/brasileiro-serie-a-1666079971237564416')
                "
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_116" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_3") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer/spain/laliga-1666080196081618944')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_117" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_4") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="
                  handleSportGame('/soccer/england/premier-league-1666080041827700736')
                "
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_118" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_5") }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="
                  handleSportGame(
                    '/soccer/international-clubs/uefa-champions-league-1666080270903808000'
                  )
                "
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_6") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer/italy/serie-a-1666080211319525376')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_7") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer/germany/bundesliga-1666080125223047168')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_8") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer/france/ligue-1-1666080025423777792')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_9") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer-1')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_10") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/fifa-300')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_120" width="16"></inline-svg>
                </template>
                <v-list-item-title class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_11") }}
                </v-list-item-title>
              </v-list-item>

              <v-menu
                location="center"
                offset="10"
                content-class="m-original-dropdown"
                v-model:model-value="sportMenu"
                transition="slide-x-transition"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    class="m-casino-sub-img m-nav-sub-menu"
                    :append-icon="sportMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
                    value="sports"
                    style="margin-bottom: -4px !important; margin-top: -4px !important"
                  >
                    <template v-slot:prepend>
                      <inline-svg
                        :src="icon_public_40"
                        width="16"
                        :transform-source="sportMenuIconTransform"
                      ></inline-svg>
                    </template>
                    <v-list-item-title class="ml-2" :class="sportMenu ? 'white' : 'gray'">
                      {{ t("navBar.sport_sub_menu.text_12") }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
                <v-list
                  theme="dark"
                  bg-color="#15161C"
                  width="166"
                  class="ml-6"
                  style="border-radius: 8px; height: 400px; overflow-y: auto"
                >
                  <v-list-item
                    v-for="(item, i) in sportGames"
                    :key="i"
                    :value="item.name"
                    class="m-avatar-img m-nav-sub-menu"
                    :prepend-avatar="item.icon"
                    :title="item.name"
                    style="font-size: 11px !important; font-weight: 500 !important"
                    @click="handleSportGame(item.query)"
                  >
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu
                location="center"
                offset="10"
                content-class="m-original-dropdown"
                v-model:model-value="eSportMenu"
                transition="slide-x-transition"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    class="m-casino-sub-img m-nav-sub-menu"
                    :append-icon="eSportMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
                    value="esports"
                    style="margin-bottom: -4px !important; margin-top: -4px !important"
                  >
                    <template v-slot:prepend>
                      <inline-svg
                        :src="icon_public_115"
                        width="16"
                        :transform-source="eSportMenuIconTransform"
                      ></inline-svg>
                    </template>
                    <v-list-item-title
                      class="ml-2"
                      :class="eSportMenu ? 'white' : 'gray'"
                    >
                      {{ t("navBar.sport_sub_menu.text_13") }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
                <v-list theme="dark" bg-color="#15161C" width="166" class="ml-6">
                  <v-list-item
                    v-for="(item, i) in eSportGames"
                    :key="i"
                    :value="item.name"
                    class="m-avatar-img m-nav-sub-menu"
                    :prepend-avatar="item.icon"
                    :title="item.name"
                    style="font-size: 11px !important; font-weight: 500 !important"
                    @click="handleSportGame(item.query)"
                  >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list>
          </v-card>
        </v-list-group>
      </v-list>
      <v-divider class="divider"></v-divider>
      <v-list>
        <v-list-item
          class="m-avatar-img m-user-item1 m-nav-menu"
          style="
            margin-bottom: -4px !important;
            margin-top: -8px !important;
            padding-left: 10px;
          "
          router
          :to="{ name: 'Promo' }"
          @click="handleNavbarItem(t('navBar.menu_item_1.promotions'))"
        >
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_41"
              width="16"
              :transform-source="promotionIconTransform"
            ></inline-svg>
          </template>
          <v-list-item-title
            class="ml-2"
            :class="navItem == t('navBar.menu_item_1.promotions') ? 'white' : 'gray'"
          >
            {{ t("navBar.menu_item_1.promotions") }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          class="m-vip-club m-nav-menu"
          style="
            margin-bottom: -4px !important;
            margin-top: -4px !important;
            padding-left: 10px;
          "
          @click="handleNavbarItem(t('navBar.menu_item_1.vip_club'))"
        >
          <!-- router
          :to="{ name: 'VIP' }" -->
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_42"
              width="16"
              :transform-source="vipIconTransform"
            ></inline-svg>
          </template>
          <v-list-item-title class="ml-2">
            {{ t("navBar.menu_item_1.vip_club") }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          class="m-avatar-img m-user-item1 m-nav-menu"
          style="
            margin-bottom: -4px !important;
            margin-top: -4px !important;
            padding-left: 10px;
          "
          @click="handleNavbarItem(t('navBar.menu_item_1.affiliate'))"
        >
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_43"
              width="16"
              :transform-source="affiliateIconTransform"
            ></inline-svg>
          </template>
          <v-list-item-title
            class="ml-2"
            :class="navItem == t('navBar.menu_item_1.affiliate') ? 'white' : 'gray'"
          >
            {{ t("navBar.menu_item_1.affiliate") }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          class="m-avatar-img m-user-item1 m-nav-menu"
          style="
            margin-bottom: -8px !important;
            margin-top: -4px !important;
            padding-left: 10px;
          "
          @click="handleNavbarItem(t('navBar.menu_item_1.blog'))"
        >
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_44"
              width="16"
              :transform-source="blogIconTransform"
            ></inline-svg>
          </template>
          <v-list-item-title
            class="ml-2"
            :class="navItem == t('navBar.menu_item_1.blog') ? 'white' : 'gray'"
          >
            {{ t("navBar.menu_item_1.blog") }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider class="divider"></v-divider>
      <v-list>
        <v-list-item
          class="m-avatar-img m-user-item1 m-nav-menu"
          style="
            margin-bottom: -8px !important;
            margin-top: -4px !important;
            padding-left: 10px;
          "
          @click="handleNavbarItem(t('navBar.live_support'))"
        >
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_45"
              width="16"
              :transform-source="supportIconTransform"
            ></inline-svg>
          </template>
          <v-list-item-title
            class="ml-2"
            :class="navItem == t('navBar.live_support') ? 'white' : 'gray'"
          >
            {{ t("navBar.live_support") }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list>
        <v-menu
          location="center"
          offset="16"
          content-class="m-language-dropdown m-user-item1"
          v-model:model-value="languageMenu"
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ props }">
            <v-card color="#15161C" theme="dark" class="mx-2 m-language-item" height="40">
              <v-list-item
                v-bind="props"
                class="m-casino-sub-img m-nav-menu"
                :append-icon="languageMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
              >
                <template v-slot:prepend>
                  <inline-svg
                    :src="icon_public_57"
                    width="16"
                    :transform-source="languageIconTransform"
                  ></inline-svg>
                </template>
                <v-list-item-title class="ml-2" :class="languageMenu ? 'white' : 'gray'">
                  {{ language }}
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#15161C" width="166" class="text-center pt-0">
            <v-list-item
              :title="t('navBar.language.title')"
              class="m-avatar-img m-nav-sub-menu"
            ></v-list-item>
            <v-divider
              style="margin: auto; width: 134px; border: 1px solid black !important"
              class="mb-2"
            ></v-divider>
            <v-list-item
              v-for="(item, i) in langItems"
              :key="i"
              :value="item"
              class="m-avatar-img m-nav-sub-menu"
              @click="handleLanguageDropdown(item)"
              :class="language == item.value ? 'nav-lang-selected-item' : ''"
            >
              <v-list-item-title>{{ item.value }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
      <v-list-item class="m-theme-toggle">
        <input type="checkbox" id="m-theme-toggle" v-model="soundCheckBox" />
        <label for="m-theme-toggle">
          <div class="dark">
            <inline-svg
              :src="icon_public_46"
              width="16"
              :transform-source="onIconTransform"
            ></inline-svg>
            <p class="text-700-10 ml-1">{{ t("navBar.sound_mode.on") }}</p>
          </div>
          <div class="light">
            <inline-svg
              :src="icon_public_47"
              width="16"
              :transform-source="offIconTransform"
            ></inline-svg>
            <p class="text-700-10 ml-1">{{ t("navBar.sound_mode.off") }}</p>
          </div>
        </label>
      </v-list-item>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
::deep(.v-list-item__overlay) {
  opacity: 1 !important;
}

.m-space-between {
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  margin-top: 20px;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
      font-size: 10px;
      font-weight: 700;
    }
  }
}

.m-vip-login-bonus {
  position: relative;
  margin: 0px 14px;
  width: 164px;
  height: 32px;
  background: #009b3a;
  box-shadow: 0px 4px 0px 0px #0e5e50;
  border-radius: 4px;
}

.m-vip-login-bonus-text {
  position: absolute;
  left: 60px;
  top: 2px;
}

.m-refer-earn {
  position: relative;
}

.m-refer-earn-text {
  position: absolute;
  top: 20px;
  left: 72px;
}

.m-earn-img {
  position: absolute;
  top: 0px;
  left: 16px;
}

.m-vip-login-bonus-img {
  width: 38px;
  height: 38px;
  position: absolute;
  left: 17px;
  bottom: 2px;
}

.m-lucky-wheel-img {
  width: 46px;
  height: 46px;
  position: absolute;
  left: 11px;
  bottom: -2px;
}

.m-vip-login-bonus-img-1 {
  width: 12px;
  height: 12px;
  position: absolute;
  right: 7px;
  top: -5px;
}

.m-lucky-wheel {
  position: relative;
  margin: 0px 14px;
  width: 164px;
  height: 32px;
  border-radius: 4px;
  background: #f9bc01;
  box-shadow: 0px -4px 0px 0px #d99504 inset;
}

.nav-lang-selected-item {
  border: 1px solid #00b25c;
  margin: 5px;
  border-radius: 14px;
}

::deep(.v-navigation-drawer__content) {
  height: 100vh !important;
  overflow-y: auto !important;
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
  background: #1d2027;
}

// casino and sport toggle switch
.m-casino-toggle {
  label {
    width: 100%;
    height: 34px;
    position: relative;
    display: block;
    background: #15161c;
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
        width: 16px;
        // height: 24px;
        margin-right: 4px;
      }

      p {
        font-size: 10px;
      }
    }

    .sport {
      left: calc(50% + 10px);
      transition: 0.3s;
      color: #7782aa;

      img {
        width: 16px;
        margin-right: 4px;
      }

      p {
        font-size: 10px;
      }
    }
  }

  label:after {
    content: "";
    width: 50%;
    height: 30px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: #009b3a;
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
    left: 100%;
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
    font-size: 12px !important;
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
    font-size: 12px;
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
    font-size: 12px;
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
  width: 122px;
  margin: auto;
}

.m-language-item {
  border-radius: 8px;
  background: var(--text-box-1211-f-31, #15161c);
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
    background: #15161c;
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
    background: #1d2027;
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
    left: 88px;
    // transform: translateX(-100%);
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
  left: 0px;
  border: 13px solid #15161c;
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
  left: -24px;
  border: 13px solid #15161c;
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

.m-nav-menu {
  :deep(.v-list-item-title) {
    font-size: 12px !important;
    font-weight: 700 !important;
  }

  :deep(.v-avatar) {
    margin-right: 10px !important;
  }
}

.m-nav-sub-menu {
  :deep(.v-list-item-title) {
    font-size: 11px !important;
    font-weight: 500 !important;
  }

  :deep(.v-avatar) {
    margin-right: 6px !important;
  }

  :deep(.mdi-chevron-right::before) {
    font-size: 18px;
  }

  :deep(.mdi-chevron-left::before) {
    font-size: 18px;
  }
}

.m-user-item1 {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
