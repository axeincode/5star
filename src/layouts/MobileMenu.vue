<script lang="ts" setup>
import { ref, computed, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { appBarStore } from "@/store/appBar";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";
import { menuStore } from "@/store/menu";
import { type GetMailData } from '@/interface/mail';
import { useDisplay } from 'vuetify'
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import icon_public_81 from "@/assets/public/svg/icon_public_81.svg";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_40 from "@/assets/public/svg/icon_public_40.svg";
import icon_public_55 from "@/assets/public/svg/icon_public_55.svg";
import icon_public_97 from "@/assets/public/svg/icon_public_97.svg";
import icon_public_94 from "@/assets/public/svg/icon_public_94.svg";
import icon_public_100 from "@/assets/public/svg/icon_public_100.svg";
import img_public_17 from "@/assets/public/image/temp/img_public_17.png";
import img_public_18 from "@/assets/public/image/temp/img_public_18.png";
import img_public_19 from "@/assets/public/image/temp/img_public_19.png";

const { t } = useI18n();
const { name, width } = useDisplay()
const router = useRouter();
const route = useRoute();
const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setUserNavBarToggle } = appBarStore();
const { setBonusDashboardDialogVisible } = appBarStore();
const { setMailMenuShow } = mailStore();
const { setSemiCircleShow } = menuStore();
const { setRewardNavShow } = menuStore();
const { setMobileMenuMailToggle } = mailStore();

// mail count
const mailCount = ref<number>(10);
// navbar toggle
const navbarToggle = ref<boolean>(false);
const bonusDashboardToggle = ref<boolean>(false);
const sportBtnActive = ref<boolean>(false);
const casinoBtnActive = ref<boolean>(false);
const promoBtnActive = ref<boolean>(false);
const searchBtnActive = ref<boolean>(false);
const mailBtnActive = ref<boolean>(false);
const mailNavigation = ref<boolean>(false);
const rewardBtnActive = ref<boolean>(false);
const mailMenuShow = ref<boolean>(false);
const tempMailList = ref<Array<GetMailData>>([]);

const menuIconColor = ref<string>("#7782AA");
const casinoIconColor = ref<string>('#7782AA');
const sportIconColor = ref<string>('#7782AA');
const mailIconColor = ref<string>('#7782AA');
const promoIconColor = ref<string>('#7782AA');
const searchIconColor = ref<string>('#7782AA');
const rewardIconColor = ref<string>("#7782AA");
const mailListHeight = ref<number>(0);

const shareIcon = ref<any>(new URL("@/assets/public/image/img_public_19.png", import.meta.url).href)
const shareIconIndex = ref<number>(0);

const rotation = ref<number>(270);

const selectedImg = ref<any>(img_public_17);
const selectedIcon = ref<any>(icon_public_97);
const selectedIconColor = ref<string>("#ffffff");

const casino_1 = ref<HTMLElement | undefined>(undefined);
const casino_2 = ref<HTMLElement | undefined>(undefined);
const casino_3 = ref<HTMLElement | undefined>(undefined);
const casino_4 = ref<HTMLElement | undefined>(undefined);
const casino_5 = ref<HTMLElement | undefined>(undefined);
const casino_6 = ref<HTMLElement | undefined>(undefined);

const sport_1 = ref<HTMLElement | undefined>(undefined);
const sport_2 = ref<HTMLElement | undefined>(undefined);
const sport_3 = ref<HTMLElement | undefined>(undefined);
const sport_4 = ref<HTMLElement | undefined>(undefined);
const sport_5 = ref<HTMLElement | undefined>(undefined);
const sport_6 = ref<HTMLElement | undefined>(undefined);

const reward_1 = ref<HTMLElement | undefined>(undefined);
const reward_2 = ref<HTMLElement | undefined>(undefined);
const reward_3 = ref<HTMLElement | undefined>(undefined);
const reward_4 = ref<HTMLElement | undefined>(undefined);
const reward_5 = ref<HTMLElement | undefined>(undefined);
const reward_6 = ref<HTMLElement | undefined>(undefined);

const casino_1_bottom = ref<number>(0);

const window_height = ref<number>(0);

const selectedItem = computed(() => {
  const { getSelectedItem } = storeToRefs(menuStore());
  return getSelectedItem.value
})

const mobileMenuMailToggle = computed(() => {
  const { getMobileMenuMailToggle } = storeToRefs(mailStore());
  return getMobileMenuMailToggle.value
})

watch(mobileMenuMailToggle, (value) => {
  mailMenuShow.value = value;
})

const calculateBottomDistance = () => {
  if (casino_1.value) {
    const containerRect = casino_1.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    casino_1_bottom.value = windowHeight - containerRect.bottom;
    console.log(casino_1_bottom.value);
  }
};

watchEffect(() => {
  calculateBottomDistance();
});

watch(selectedItem, (new_value, old_value) => {
  switch (old_value) {
    case t("mobile_menu.promo"):
      switch (new_value) {
        case t("mobile_menu.mail"):
          rotation.value = rotation.value + 240;
          break;
        case t("mobile_menu.search"):
          rotation.value = rotation.value + 120;
          break;
      }
      break;
    case t("mobile_menu.mail"):
      switch (new_value) {
        case t("mobile_menu.promo"):
          rotation.value = rotation.value + 120;
          break;
        case t("mobile_menu.search"):
          rotation.value = rotation.value + 240;
          break;
      }
      break;
    case t("mobile_menu.search"):
      switch (new_value) {
        case t("mobile_menu.promo"):
          rotation.value = rotation.value + 240;
          break;
        case t("mobile_menu.mail"):
          rotation.value = rotation.value + 120;
          break;
      }
      break;
  }
  switch (new_value) {
    case t("mobile_menu.promo"):
      selectedImg.value = img_public_17;
      selectedIcon.value = icon_public_97;
      break;
    case t("mobile_menu.search"):
      selectedImg.value = img_public_18;
      selectedIcon.value = icon_public_94;
      break;
    case t("mobile_menu.mail"):
      selectedImg.value = img_public_19;
      selectedIcon.value = icon_public_55;
      break;
  }
})

watch(shareIconIndex, (newValue) => {
  if ((newValue % 3) == 0) {
    shareIcon.value = new URL("@/assets/public/image/img_public_19.png", import.meta.url).href;
  } else if ((newValue % 3) == 1) {
    shareIcon.value = new URL("@/assets/public/image/img_public_10.png", import.meta.url).href;
  } else {
    shareIcon.value = new URL("@/assets/public/image/img_public_46.png", import.meta.url).href;
  }
  const share_image = document.querySelector('.share-img-position');
  if (!share_image) {
    return;
  } else {
    share_image.classList.add('share-animation');
  }
}, { deep: true })

const prevScrollPos = ref<number>(0);

// pc or mobile screen switch

const mobileVersion = computed(() => {
  return name.value
});

const mobileWidth: any = computed(() => {
  return width.value;
})

const mobileMenuShow = computed(() => {
  const { getMobileMenuShow } = storeToRefs(gameStore());
  return getMobileMenuShow.value
})

const navToggle = computed(() => {
  const { getNavBarToggle } = storeToRefs(appBarStore());
  return getNavBarToggle.value
})

const bonusToggle = computed(() => {
  const { getBonusDashboardDialogVisible } = storeToRefs(appBarStore());
  return getBonusDashboardDialogVisible.value
})

const semiCircleShow = computed(() => {
  const { getSemiCircleShow } = storeToRefs(menuStore());
  return getSemiCircleShow.value
})

// get mail data
const mailList = computed((): GetMailData[] => {
  const { getMailList } = storeToRefs(mailStore())
  return getMailList.value
})

watch(mailList, (newValue) => {
  mailCount.value = newValue.length;
}, { deep: true })

watch(navToggle, (newValue) => {
  navbarToggle.value = newValue;
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
}, { deep: true })

watch(bonusToggle, (newValue) => {
  bonusDashboardToggle.value = newValue;
}, { deep: true })

watch(mailMenuShow, async (newValue) => {
  if (newValue) {
    sportBtnActive.value = false
    casinoBtnActive.value = false;
    navbarToggle.value = false;
    promoBtnActive.value = false;
    searchBtnActive.value = false;
    setUserNavBarToggle(false);
    setMainBlurEffectShow(false);
    setNavBarToggle(navbarToggle.value)
    setBonusDashboardDialogVisible(false);
    setRewardNavShow(false);
    setSemiCircleShow(false);
    menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
    casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
    sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
    mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
    promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
    searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
    setTimeout(() => {
      setMainBlurEffectShow(newValue);
      setOverlayScrimShow(newValue);
    }, 10)
  } else {
    setMainBlurEffectShow(newValue);
    setOverlayScrimShow(newValue);
    setMobileMenuMailToggle(newValue);
    mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  }
  setMailMenuShow(newValue);
  var scale = 0.94;
  var translateY = -56;
  var opacity = 0.8;
  var zIndex = 100
  console.log(mailList.value.length);
  if (newValue) {
    for (let item of mailList.value) {
      await new Promise<void>((resolve) => {
        setTimeout(async () => {
          tempMailList.value.push(item);
          const vList = document.querySelector('.mobile-mail-menu');
          if (!vList) {
            return;
          }
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 70)
          })
          const vListRect = vList.getBoundingClientRect();
          const listItems = Array.from(vList.querySelectorAll('.mail-item')) as Array<HTMLElement>;
          console.log("listItem: ", listItems.length);
          const rect = listItems[tempMailList.value.length - 1].getBoundingClientRect();
          console.log(tempMailList.value.length);
          listItems[tempMailList.value.length - 1].style.zIndex = `${zIndex}`
          if (rect.top > 0 && rect.bottom >= vListRect.bottom) {
            listItems[tempMailList.value.length - 1].style.scale = `${scale}`;
            listItems[tempMailList.value.length - 1].style.transform = `translateY(${translateY}px)`
            listItems[tempMailList.value.length - 1].style.zIndex = `${zIndex}`
            listItems[tempMailList.value.length - 1].style.opacity = `${opacity}`
            listItems[tempMailList.value.length - 1].style.animation = '0.8s ease-in-out 0s 1 normal none running fadeIn'
            var keyframes = `@keyframes fadeIn {
                  from {
                    opacity: 0;
                    translateY(0px)
                  }
                  to {
                    opacity: 0.8;
                    translateY(${translateY}px)
                  }
              }`;
            var styleSheet = document.styleSheets[0];
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
            scale -= 0.02;
            translateY = translateY - 70;
          }
          zIndex -= 1;
          console.log("rect, bottom", rect.bottom, vListRect.bottom);
          resolve();
        }, 10);
      });
    }
  } else {
    tempMailList.value = [];
  }
})

const handleNavbarToggle = () => {
  navbarToggle.value = !navbarToggle.value
  mailMenuShow.value = false;
  casinoBtnActive.value = false;
  sportBtnActive.value = false;
  promoBtnActive.value = false;
  searchBtnActive.value = false;
  rewardBtnActive.value = false;
  setUserNavBarToggle(false);
  setBonusDashboardDialogVisible(false);
  setSemiCircleShow(false);
  setRewardNavShow(false);
  setMainBlurEffectShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value);
    if (mobileWidth.value < 600) {
      setMainBlurEffectShow(navbarToggle.value);
    }
  }, 10);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";
}

const goHomePage = () => {
  casinoBtnActive.value = !casinoBtnActive.value
  mailMenuShow.value = false;
  sportBtnActive.value = false
  promoBtnActive.value = false;
  searchBtnActive.value = false;
  rewardBtnActive.value = false;
  router.push({ name: "Dashboard" });
  navbarToggle.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setRewardNavShow(false);
  setSemiCircleShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";
}

const handleCasinoToggle = () => {
  casinoBtnActive.value = !casinoBtnActive.value
  promoBtnActive.value = false;
  mailMenuShow.value = false;
  sportBtnActive.value = false
  searchBtnActive.value = false;
  rewardBtnActive.value = false;
  navbarToggle.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setRewardNavShow(false);
  setSemiCircleShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";
}

const handlePromoToggle = () => {
  promoBtnActive.value = !promoBtnActive.value
  mailMenuShow.value = false;
  sportBtnActive.value = false
  casinoBtnActive.value = false
  searchBtnActive.value = false;
  rewardBtnActive.value = false;
  navbarToggle.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setRewardNavShow(false);
  setSemiCircleShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";
}

const handleRewardToggle = () => {
  rewardBtnActive.value = !rewardBtnActive.value
  promoBtnActive.value = false
  mailMenuShow.value = false;
  sportBtnActive.value = false
  casinoBtnActive.value = false
  searchBtnActive.value = false;
  navbarToggle.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setSemiCircleShow(false);
  setRewardNavShow(true);
  setOverlayScrimShow(true);
  setMainBlurEffectShow(true);
  setMailMenuShow(true);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";
}

const handleSearchToggle = () => {
  searchBtnActive.value = !searchBtnActive.value
  mailMenuShow.value = false;
  casinoBtnActive.value = false;
  navbarToggle.value = false;
  promoBtnActive.value = false;
  rewardBtnActive.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setRewardNavShow(false);
  setSemiCircleShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";
}

const handleSportsToggle = () => {
  sportBtnActive.value = !sportBtnActive.value
  searchBtnActive.value = false;
  mailMenuShow.value = false;
  casinoBtnActive.value = false;
  navbarToggle.value = false;
  promoBtnActive.value = false;
  rewardBtnActive.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setRewardNavShow(false);
  setSemiCircleShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";
  router.push({ name: "Sports" });
}

const goToSportPage = () => {
  sportBtnActive.value = !sportBtnActive.value
  mailMenuShow.value = false;
  casinoBtnActive.value = false;
  navbarToggle.value = false;
  promoBtnActive.value = false;
  searchBtnActive.value = false;
  rewardBtnActive.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";
}

const goToSharePage = () => {
  // bonusDashboardToggle.value = !bonusDashboardToggle.value;
  navbarToggle.value = false;
  mailMenuShow.value = false;
  casinoBtnActive.value = false;
  sportBtnActive.value = false
  promoBtnActive.value = false;
  searchBtnActive.value = false;
  rewardBtnActive.value = false;
  setSemiCircleShow(!semiCircleShow.value);
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setNavBarToggle(false);
  // setTimeout(() => {
  //   setBonusDashboardDialogVisible(bonusDashboardToggle.value)
  //   setMainBlurEffectShow(bonusDashboardToggle.value);
  // }, 10);
  menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
  promoIconColor.value = promoBtnActive.value ? "white" : "#7782AA";
  searchIconColor.value = searchBtnActive.value ? "white" : "#7782AA";
  rewardIconColor.value = rewardBtnActive.value ? "white" : "#7782AA";

  // sportBtnActive.value = false
  // mailMenuShow.value = false;
  // casinoBtnActive.value = false;
  // navbarToggle.value = false;

  // setUserNavBarToggle(false);
  // setNavBarToggle(false);
  // setMainBlurEffectShow(false);
  // setTimeout(() => {
  //   setBonusDashboardDialogVisible(true);

  // },10)

  // menuIconColor.value = navbarToggle.value ? "white" : "#7782AA"
  // casinoIconColor.value = casinoBtnActive.value ? "white" : "#7782AA";
  // sportIconColor.value = sportBtnActive.value ? "white" : "#7782AA";
  // mailIconColor.value = mailMenuShow.value ? "white" : "#7782AA";
}

const listContainer = ref<any>(null);

const handleScroll = (event: any) => {
  const vList = document.querySelector('.mobile-mail-menu');

  if (!vList) {
    return;
  }

  const listItems = Array.from(vList.querySelectorAll('.mail-item')) as Array<HTMLElement>;

  const currentScrollPos = event.target.scrollTop;

  const vListRect = vList.getBoundingClientRect();

  console.log(currentScrollPos - prevScrollPos.value);

  const delta = currentScrollPos - prevScrollPos.value;

  listItems.forEach((listItem: HTMLElement) => {
    const rect = listItem.getBoundingClientRect();

    // If the current scroll position is greater than the previous one, the scrollbar is going down
    if (currentScrollPos > prevScrollPos.value) {
      console.log('Scrollbar is going down');
      console.log(Number(listItem.style.scale));
      if (Number(listItem.style.scale) > 0 && Number(listItem.style.scale) < 1) {
        listItem.style.scale = `${Number(listItem.style.scale) + 0.001}`;
      } else if (Number(listItem.style.scale) > 0 && Number(listItem.style.scale) < 0.8) {
        listItem.style.scale = `${Number(listItem.style.scale) + 0.002}`;
      }
      // console.log(window.getComputedStyle(listItem).getPropertyValue('transform'));
      const matrix = new DOMMatrix(window.getComputedStyle(listItem).getPropertyValue('transform'));
      // console.log(matrix.m42);
      if (matrix.m42 != 0) {
        const translateY = matrix.m42 + delta >= 0 ? 0 : matrix.m42 + delta
        listItem.style.transform = `translateY(${translateY}px)`
      } else {
        listItem.style.scale = "1";
        listItem.style.opacity = "1"
      }
      // listItem.style.zIndex = `100`
      // if (rect.top > 0 && rect.bottom < window.innerHeight - 85 && rect.bottom > window.innerHeight - 115) {
      //   listItem.classList.remove('scale-mail-item');
      //   listItem.classList.add('animation-mail-item');
      // }
    }
    // Otherwise, the scrollbar is going up
    else {
      // console.log('Scrollbar is going up');
      // if (rect.bottom > window.innerHeight - 83) {
      // listItem.classList.add('scale-mail-item');
      // listItem.classList.remove('animation-mail-item');
      // }
      const opacity = 0.8
      if (rect.top > 0 && rect.bottom >= vListRect.bottom) {
        const matrix = new DOMMatrix(window.getComputedStyle(listItem).getPropertyValue('transform'));
        const translateY = matrix.m42 + delta >= 0 ? 0 : matrix.m42 + delta
        listItem.style.transform = `translateY(${translateY}px)`
        listItem.style.scale = `${Number(listItem.style.scale) - 0.01}`;
        listItem.style.opacity = `${opacity}`
        listItem.style.animation = '0.8s ease-in-out 0s 1 normal none running fadeIn'
        // var keyframes = `@keyframes fadeIn {
        //       from {
        //         opacity: 0;
        //         translateY(0px)
        //       }
        //       to {
        //         opacity: 0.8;
        //         translateY(${translateY}px)
        //       }
        // }`;
        // var styleSheet = document.styleSheets[0];
        // styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      }
    }
  });

  if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
    console.log('Scrollbar reached the end');
    listItems[listItems.length - 1].style.transform = `translateY(0px)`
    listItems[listItems.length - 1].style.scale = "1";
    listItems[listItems.length - 1].style.opacity = "1"
  }

  prevScrollPos.value = currentScrollPos;
}

const menuSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', menuIconColor.value)
    for (let subNode of node.children) {
      subNode.setAttribute('fill', menuIconColor.value)
    }
  }
  return el
}

const casinoSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", casinoIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", casinoIconColor.value);
    }
  }
  return el;
};

const promoSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', promoIconColor.value)
    for (let subNode of node.children) {
      subNode.setAttribute('fill', promoIconColor.value)
      for (let moreSubNode of subNode.children) {
        moreSubNode.setAttribute('fill', promoIconColor.value)
      }
    }
  }
  return el
}

const sportSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", sportIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", sportIconColor.value);
    }
  }
  return el;
};

const searchSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', searchIconColor.value)
    for (let subNode of node.children) {
      subNode.setAttribute('fill', searchIconColor.value)
    }
  }
  return el
}

const mailSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', mailIconColor.value)
    for (let subNode of node.children) {
      subNode.setAttribute('fill', mailIconColor.value)
    }
  }
  return el
}

const iconSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', selectedIconColor.value)
    for (let subNode of node.children) {
      subNode.setAttribute('fill', selectedIconColor.value)
      for (let moreSubNode of subNode.children) {
        moreSubNode.setAttribute('fill', selectedIconColor.value)
      }
    }
  }
  return el
}

const rewardSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", rewardIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", rewardIconColor.value);
    }
  }
  return el;
};

// menu blur effect
const menuBlurEffectShow = computed(() => {
  const { getMenuBlurEffectShow } = storeToRefs(appBarStore());
  return getMenuBlurEffectShow.value
})

const handleResize = () => {
  mailListHeight.value = window.innerHeight - 246;
}

onMounted(() => {
  calculateBottomDistance();
  window_height.value = window.innerHeight
  setInterval(() => {
    shareIconIndex.value = shareIconIndex.value + 1;
  }, 5000);
  mailCount.value = mailList.value.length
  console.log(tempMailList.value.length);
  mailListHeight.value = window.innerHeight - 246;
  window.addEventListener("resize", handleResize);
  // console.log("1111111111111111", window.innerHeight - container_c.value.getBoundingClientRect().bottom);
})
</script>

<template>
  <v-bottom-navigation
    v-if="mobileMenuShow && route.name !== 'Sports'"
    bg-color="#010102"
    grow
    class="mobile-menu-index"
    :class="menuBlurEffectShow ? 'menu-bg-blur' : ''"
    style="height: 60px"
  >
    <v-btn class="menu-text-color" @click="handleNavbarToggle" :ripple="false">
      <inline-svg
        :src="icon_public_81"
        width="20"
        height="20"
        :transform-source="menuSvgTransform"
      ></inline-svg>
      <div
        class="pt-1 text-600-12"
        :style="{ color: navbarToggle ? 'white' : '#7782AA' }"
      >
        {{ t("mobile_menu.menu") }}
      </div>
    </v-btn>
    <v-btn class="menu-text-color" @click="goHomePage">
      <inline-svg
        :src="icon_public_34"
        width="20"
        height="20"
        :transform-source="casinoSvgTransform"
      ></inline-svg>
      <div class="pt-1 text-600-12">
        {{ t("mobile_menu.casino") }}
      </div>
    </v-btn>
    <!-- <v-btn class="menu-text-color" @click="goToSharePage">
      <div class="bonus-icon-body">
        <div class="circle-background"></div>
        <img
          src="@/assets/public/image/bg_public_22.png"
          class="share-background-img-position"
        />
        <div class="m-mask">
          <img :src="shareIcon" class="share-img-position" />
        </div>
      </div>

      <div class="pt-6 text-600-12">
        {{ t("mobile_menu.share") }}
      </div>
    </v-btn> -->
    <v-btn class="menu-text-color" @click="goToSharePage">
      <div class="m-menu-casino-bg">
        <img
          src="@/assets/public/image/temp/img_public_16.png"
          width="72"
          class="m-menu-casino-bg-img"
        />
        <img :src="selectedImg" width="46" class="m-menu-casino-body-img" />
        <transition name="fade">
          <inline-svg
            :src="selectedIcon"
            width="22"
            height="22"
            :transform-source="iconSvgTransform"
            class="m-menu-casino-body-icon"
            :key="selectedIcon"
          ></inline-svg>
        </transition>
        <div
          class="m-menu-circle"
          :style="{ transform: `rotate(${rotation}deg) translate(-50%, -50%)` }"
        >
          <div
            class="letter white"
            ref="casino_1"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.promo') }"
          >
            P
          </div>
          <div
            class="letter white"
            ref="casino_2"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.promo') }"
          >
            R
          </div>
          <div
            class="letter white"
            ref="casino_3"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.promo') }"
          >
            O
          </div>
          <div
            class="letter white"
            ref="casino_4"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.promo') }"
          >
            M
          </div>
          <div
            class="letter white"
            ref="casino_5"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.promo') }"
          >
            O
          </div>
          <div class="letter white" ref="casino_6"></div>
          <div
            class="letter white"
            ref="reward_1"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.search') }"
          >
            S
          </div>
          <div
            class="letter white"
            ref="reward_2"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.search') }"
          >
            E
          </div>
          <div
            class="letter white"
            ref="reward_3"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.search') }"
          >
            A
          </div>
          <div
            class="letter white"
            ref="reward_4"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.search') }"
          >
            R
          </div>
          <div
            class="letter white"
            ref="reward_5"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.search') }"
          >
            C
          </div>
          <div
            class="letter white"
            ref="reward_6"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.search') }"
          >
            H
          </div>
          <div class="letter white" ref="mail_1"></div>
          <div
            class="letter white"
            ref="mail_2"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.mail') }"
          >
            M
          </div>
          <div
            class="letter white"
            ref="mail_3"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.mail') }"
          >
            A
          </div>
          <div
            class="letter white"
            ref="mail_4"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.mail') }"
          >
            I
          </div>
          <div
            class="letter white"
            ref="mail_5"
            :class="{ 'opacity-1': selectedItem != t('mobile_menu.mail') }"
          >
            L
          </div>
          <div class="letter white" ref="mail_6"></div>
        </div>
      </div>
    </v-btn>
    <v-btn class="menu-text-color" @click="handleSportsToggle">
      <inline-svg
        :src="icon_public_40"
        width="20"
        height="20"
        :transform-source="sportSvgTransform"
      ></inline-svg>
      <div class="pt-1 text-600-12">
        {{ t("mobile_menu.sport") }}
      </div>
    </v-btn>
    <v-btn class="menu-text-color" @click="handleRewardToggle">
      <inline-svg
        :src="icon_public_100"
        width="20"
        height="20"
        :transform-source="rewardSvgTransform"
      ></inline-svg>
      <div class="pt-1 text-600-12">
        {{ t("mobile_menu.reward") }}
      </div>
    </v-btn>
    <v-menu
      class="m-mail-menu-overlay"
      content-class="mobile-mail-menu"
      :scrim="true"
      v-model:model-value="mailMenuShow"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ props }">
        <!-- <v-btn class="menu-text-color" v-bind="props">
          <div class="relative">
            <inline-svg :src="icon_public_55" width="20" height="20" :transform-source="mailSvgTransform"></inline-svg>
            <p class="chat-box-text">{{ mailCount }}</p>
          </div>
          <div class="text-600-12" :style="{ color: mailIconColor }">
            {{ t("mobile_menu.mail") }}
          </div>
        </v-btn> -->
      </template>
      <v-list
        theme="dark"
        bg-color="transparent"
        class="px-2 m-mail-list"
        :height="tempMailList.length > 8 ? mailListHeight + 'px' : ''"
        :width="mobileWidth"
        @scroll="handleScroll"
        style="box-shadow: none !important"
        :style="{ marginLeft: tempMailList.length > 8 ? '6px' : 'auto' }"
        ref="listContainer"
      >
        <v-list-item
          height="36"
          :class="tempMailList.length > 8 ? 'm-mail-menu-title' : ''"
        >
          <v-list-item-title class="ml-2">
            <div class="mail-header-text text-700-14">
              {{ t("mail_dialog.header_text") }}
            </div>
          </v-list-item-title>
        </v-list-item>
        <template v-for="(mailItem, index) in tempMailList" :key="index">
          <v-list-item
            class="mail-item"
            :value="mailItem.mail_content_1.content"
            height="64"
          >
            <template v-slot:prepend>
              <img :src="mailItem.icon" width="20" />
            </template>
            <v-list-item-title class="ml-4" style="line-height: 18px">
              <div :class="mailItem.mail_content_1.color">
                {{ mailItem.mail_content_1.content }}
              </div>
              <div :class="mailItem.mail_content_2.color">
                {{ mailItem.mail_content_2.content }}
              </div>
            </v-list-item-title>
            <template v-slot:append>
              <div :class="mailItem.mail_rail_1.color">
                {{ mailItem.mail_rail_1.content }}
              </div>
              <div class="completion-area" :class="mailItem.mail_rail_2.color">
                {{ mailItem.mail_rail_2.content }}
              </div>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-bottom-navigation>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes mailScaling {
  0% {
    transform: scale(0.8);
  }

  80% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes animationMailScaling {
  0% {
    transform: scale(0.8);
  }

  // 60% {
  //   transform: scale(1.2);
  // }

  100% {
    transform: scale(1);
  }
}

.m-menu-circle {
  // animation: rotate 9s linear infinite;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  // transform: rotate(30deg) translate(-50%, -50%);
  transform-origin: top left;
  transition: transform 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;

  .letter {
    position: absolute;
    transform-origin: center;
    font-size: 7px;
    font-family: Inter;
    font-weight: 500;
    word-wrap: break-word;
    // transform: rotateY(0deg) rotateZ(0deg);
    text-align: center;
  }

  .opacity-1 {
    opacity: 0.1;
  }

  .letter:nth-child(1) {
    transform: rotateZ(313deg) translateY(-26px) rotateZ(-176deg);
  }

  .letter:nth-child(2) {
    transform: rotateZ(295deg) translateY(-26px) rotateZ(-173deg);
  }

  .letter:nth-child(3) {
    transform: rotateZ(278deg) translateY(-26px) rotateZ(-184deg);
  }

  .letter:nth-child(4) {
    transform: rotateZ(263deg) translateY(-26px) rotateZ(-185deg);
  }

  .letter:nth-child(5) {
    transform: rotateZ(248deg) translateY(-26px) rotateZ(-174deg);
  }

  .letter:nth-child(6) {
    transform: rotateZ(228deg) translateY(-26px) rotateZ(14deg);
  }

  .letter:nth-child(7) {
    transform: rotateZ(196deg) translateY(-26px) rotateZ(-182deg);
  }

  .letter:nth-child(8) {
    transform: rotateZ(178deg) translateY(-26px) rotateZ(-181deg);
  }

  .letter:nth-child(9) {
    transform: rotateZ(158deg) translateY(-26px) rotateZ(-188deg);
  }

  .letter:nth-child(10) {
    transform: rotateZ(138deg) translateY(-26px) rotateZ(-185deg);
  }

  .letter:nth-child(11) {
    transform: rotateZ(120deg) translateY(-26px) rotateZ(-180deg);
  }

  .letter:nth-child(12) {
    transform: rotateZ(103deg) translateY(-26px) rotateZ(-175deg);
  }

  .letter:nth-child(13) {
    transform: rotateZ(73deg) translateY(-26px) rotateZ(-176deg);
  }

  .letter:nth-child(14) {
    transform: rotateZ(54deg) translateY(-26px) rotateZ(-173deg);
  }

  .letter:nth-child(15) {
    transform: rotateZ(36deg) translateY(-26px) rotateZ(-169deg);
  }

  .letter:nth-child(16) {
    transform: rotateZ(17deg) translateY(-26px) rotateZ(-179deg);
  }

  .letter:nth-child(17) {
    transform: rotateZ(-1deg) translateY(-26px) rotateZ(-174deg);
  }

  .letter:nth-child(18) {
    transform: rotateZ(-22deg) translateY(-26px) rotateZ(0deg);
  }
}

.mobile-menu-index {
  z-index: 2009 !important;
  overflow: inherit !important;

  .v-btn--active {
    .v-btn__content {
      color: white;
    }
  }

  button:active:enabled {
    transform: none !important;
  }
}

.m-mail-menu-overlay {
  bottom: 80px !important;
  overflow-x: hidden;

  .v-overlay__scrim {
    bottom: 80px !important;
    opacity: 0 !important;
  }
}

@keyframes shareAnimation {
  0% {
    top: 70px;
  }

  1.5% {
    top: 70px;
  }

  3.3% {
    top: -8px;
  }

  5.7% {
    top: 8px;
    transform: scaleY(0.7);
  }

  8.7% {
    top: -2px;
    transform: scaleY(1.1);
  }

  13.3% {
    top: 3px;
    transform: scaleY(1);
  }

  93.5% {
    top: 3px;
  }

  96.5% {
    top: -2px;
  }

  98.5% {
    top: -2px;
  }

  100% {
    top: 70px;
  }
}

.m-mask {
  position: fixed;
  width: 46px;
  height: 55px;
  // -webkit-mask-image: url("@/assets/public/image/ua_public_132.png");
  // mask-image: url("@/assets/public/image/ua_public_132.png");
  border-radius: 0px 0px 25px 25px;
}

.bonus-icon-body {
  position: absolute;
  top: -16px;
  left: 13px;
}

.share-animation {
  animation-name: shareAnimation;
  position: absolute;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.share-img-position {
  position: absolute;
  left: 3px;
  top: 3px;
  width: 44px;
  // left:2px;
}

.scale-mail-item {
  // scale: 0.8;
  // transform: translateY(-43px);
  // z-index: -1;
  // opacity: 0.8;
  transition: transform 0.5s ease-in-out;
}

.menu-text-color {
  color: #7782aa;

  .v-btn__content {
    font-weight: 700 !important;
    font-size: 12px !important;
  }

  .chat-box-text {
    top: -1px;
    right: -6px;
    position: absolute;
    font-weight: 800;
    font-size: 8px;
    color: #000000;
    background: #12ff76;
    border-radius: 15px;
    padding: 0px 2px;
  }
}

.mobile-mail-menu {
  margin-left: auto !important;
  left: unset !important;
  bottom: 0px !important;
  top: unset !important;

  // background: transparent !important;
  // box-shadow: none !important;
  // border: none !important;
  // height: 340px !important;

  .m-mail-menu-title {
    position: fixed;
    top: -36px;
    z-index: 100000;
  }

  .v-list-item-title {
    color: #7782aa;
  }

  .v-list-item__append {
    display: block !important;
    text-align: center;
  }

  .mail-header-text {
    color: #ffffff;
  }

  .completion-area {
    background-color: #000000;
    border-radius: 20px;
    margin-top: 2px;
  }

  .text-color-gray {
    color: #7782aa;
  }

  .text-color-white {
    color: #ffffff;
  }

  .money-color-white {
    color: #ffffff;
  }

  .text-color-yellow {
    color: #f9bc01;
    padding: 3px 0px;
  }

  .text-color-green {
    color: #01983a;
    padding: 3px 0px;
  }

  .mail-item {
    margin-top: 4px !important;
    background-color: #15161C !important;
    padding: 14px 20px !important;
    border-radius: 8px !important;
    animation-name: mailScaling;
    animation-duration: 0.3s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    // transition: transform 0.2s ease-in-out;
  }

  .animation-mail-item {
    animation-name: animationMailScaling;
    animation-duration: 0.3s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
  }
}

.share-background-img-position {
  position: absolute;
  left: 3px;
  top: 3px;
  width: 45px;
}

.circle-background {
  position: absolute;
  // top: -16px;
  width: 51px;
  height: 51px;
  background-color: #000000;
  border-radius: 50%;
}

.share-ripple-btn {
  .v-ripple__container {
    opacity: 0 !important;
  }
}

.menu-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  // filter: saturate(180%) blur(3px);
  // -webkit-filter: saturate(180%) blur(3px);
}

.m-menu-casino-bg {
  position: absolute;
  width: 72px;
  height: 72px;
  bottom: 3px;
}

.m-menu-casino-bg-img {
  position: absolute;
  top: 0px;
  left: 0px;
}

.m-menu-casino-body-img {
  position: absolute;
  top: 13px;
  left: 13px;
}

.m-menu-casino-body-icon {
  position: absolute;
  top: 25px;
  left: 25px;
}

.m-mail-list {
  margin-left: 0px !important;
  overflow-x: hidden !important;
}
</style>
