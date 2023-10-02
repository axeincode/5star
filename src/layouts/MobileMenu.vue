<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { appBarStore } from "@/store/appBar";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";
import { type GetMailData } from '@/interface/mail';
import { useDisplay } from 'vuetify'
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import icon_public_81 from "@/assets/public/svg/icon_public_81.svg";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_40 from "@/assets/public/svg/icon_public_40.svg";
import icon_public_55 from "@/assets/public/svg/icon_public_55.svg";
const { t } = useI18n();
const { name, width } = useDisplay()
const router = useRouter();
const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setUserNavBarToggle } = appBarStore();
const { setBonusDashboardDialogVisible } = appBarStore();
const { setMailMenuShow } = mailStore();

// mail count
const mailCount = ref<number>(10);
// navbar toggle
const navbarToggle = ref<boolean>(false);
const bonusDashboardToggle = ref<boolean>(false);
const sportBtnActive = ref<boolean>(false);
const casinoBtnActive = ref<boolean>(false);
const mailBtnActive = ref<boolean>(false);
const mailNavigation = ref<boolean>(false);
const mailMenuShow = ref<boolean>(false);
const tempMailList = ref<Array<GetMailData>>([]);

const menuIconColor = ref<string>("#7782AA");
const casinoIconColor = ref<string>('#7782AA');
const sportIconColor = ref<string>('#7782AA');
const mailIconColor = ref<string>('#7782AA');
const mailListHeight = ref<number>(0);

const shareIcon = ref<any>(new URL("@/assets/public/image/img_public_19.png", import.meta.url).href)
const shareIconIndex = ref<number>(0);



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
  menuIconColor.value = navbarToggle.value ? "#6742ec" : "#7782AA"
}, { deep: true })

watch(bonusToggle, (newValue) => {
  bonusDashboardToggle.value = newValue;
}, { deep: true })

watch(mailMenuShow, async (newValue) => {
  if (newValue) {
    sportBtnActive.value = false
    casinoBtnActive.value = false;
    navbarToggle.value = false;
    setUserNavBarToggle(false);
    setMainBlurEffectShow(false);
    setNavBarToggle(navbarToggle.value)
    setBonusDashboardDialogVisible(false);
    menuIconColor.value = navbarToggle.value ? "#6742ec" : "#7782AA"
    casinoIconColor.value = casinoBtnActive.value ? "#6742ec" : "#7782AA";
    sportIconColor.value = sportBtnActive.value ? "#6742ec" : "#7782AA";
    mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";
    setTimeout(() => {
      setMainBlurEffectShow(newValue);
      setOverlayScrimShow(newValue);
    }, 10)
  } else {
    setMainBlurEffectShow(newValue);
    setOverlayScrimShow(newValue);
    mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";
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
            }, 100)
          })

          const vListRect = vList.getBoundingClientRect();
          const listItems = Array.from(vList.querySelectorAll('.mail-item')) as Array<HTMLElement>;
          console.log("listItem: ", listItems.length);
          // listItems.forEach((listItem: HTMLElement) => {
          const rect = listItems[tempMailList.value.length - 1].getBoundingClientRect();
          console.log(tempMailList.value.length);
          listItems[tempMailList.value.length - 1].style.zIndex = `${zIndex}`
          if (rect.top > 0 && rect.bottom >= vListRect.bottom) {
            if (listItems.length == 16) {
              console.log("11111111111111", listItems.length);
            }
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
          // });
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
  sportBtnActive.value = false
  setUserNavBarToggle(false);
  setBonusDashboardDialogVisible(false);
  setMainBlurEffectShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 10);
  menuIconColor.value = navbarToggle.value ? "#6742ec" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "#6742ec" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "#6742ec" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";
}

const goHomePage = () => {
  casinoBtnActive.value = !casinoBtnActive.value
  mailMenuShow.value = false;
  sportBtnActive.value = false
  router.push({ name: "Dashboard" });
  navbarToggle.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "#6742ec" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "#6742ec" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "#6742ec" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";
}

const goToSportPage = () => {
  sportBtnActive.value = !sportBtnActive.value
  mailMenuShow.value = false;
  casinoBtnActive.value = false;
  navbarToggle.value = false;
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setTimeout(() => {
    setNavBarToggle(navbarToggle.value)
    setMainBlurEffectShow(navbarToggle.value);
  }, 200);
  menuIconColor.value = navbarToggle.value ? "#6742ec" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "#6742ec" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "#6742ec" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";
}

const goToSharePage = () => {
  bonusDashboardToggle.value = !bonusDashboardToggle.value;
  navbarToggle.value = false;
  mailMenuShow.value = false;
  casinoBtnActive.value = false;
  sportBtnActive.value = false
  setUserNavBarToggle(false);
  setMainBlurEffectShow(false);
  setNavBarToggle(false);
  setTimeout(() => {
    setBonusDashboardDialogVisible(bonusDashboardToggle.value)
    setMainBlurEffectShow(bonusDashboardToggle.value);
  }, 10);
  menuIconColor.value = navbarToggle.value ? "#6742ec" : "#7782AA"
  casinoIconColor.value = casinoBtnActive.value ? "#6742ec" : "#7782AA";
  sportIconColor.value = sportBtnActive.value ? "#6742ec" : "#7782AA";
  mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";

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

  // menuIconColor.value = navbarToggle.value ? "#6742ec" : "#7782AA"
  // casinoIconColor.value = casinoBtnActive.value ? "#6742ec" : "#7782AA";
  // sportIconColor.value = sportBtnActive.value ? "#6742ec" : "#7782AA";
  // mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";
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
    node.setAttribute('fill', casinoIconColor.value)
    for (let subNode of node.children) {
      subNode.setAttribute('fill', casinoIconColor.value)
    }
  }
  return el
}

const sportSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', sportIconColor.value)
    for (let subNode of node.children) {
      subNode.setAttribute('fill', sportIconColor.value)
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

// menu blur effect
const menuBlurEffectShow = computed(() => {
  const { getMenuBlurEffectShow } = storeToRefs(appBarStore());
  return getMenuBlurEffectShow.value
})

const handleResize = () => {
  mailListHeight.value = window.innerHeight - 246;
}

onMounted(() => {
  setInterval(() => {
    shareIconIndex.value = shareIconIndex.value + 1;
  }, 5000);
  mailCount.value = mailList.value.length
  console.log(tempMailList.value.length);
  mailListHeight.value = window.innerHeight - 246;
  window.addEventListener("resize", handleResize);
})
</script>

<template>
  <v-bottom-navigation
    v-if="mobileMenuShow"
    bg-color="#000000"
    grow
    class="mobile-menu-index"
    :class="menuBlurEffectShow ? 'menu-bg-blur' : ''"
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
        :style="{ color: navbarToggle ? '#6742ec' : '#7782AA' }"
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
    <v-btn class="menu-text-color share-ripple-btn" @click="goToSharePage">
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
    </v-btn>
    <v-btn class="menu-text-color" @click="goToSportPage">
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
    <v-menu
      class="m-mail-menu-overlay"
      content-class="mobile-mail-menu"
      :scrim="true"
      v-model:model-value="mailMenuShow"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="menu-text-color" v-bind="props">
          <div class="relative">
            <inline-svg
              :src="icon_public_55"
              width="20"
              height="20"
              :transform-source="mailSvgTransform"
            ></inline-svg>
            <p class="chat-box-text">{{ mailCount }}</p>
          </div>
          <div class="text-600-12" :style="{ color: mailIconColor }">
            {{ t("mobile_menu.mail") }}
          </div>
        </v-btn>
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

.mobile-menu-index {
  z-index: 2009 !important;
  overflow: inherit !important;

  .v-btn--active {
    .v-btn__content {
      color: #6742ec;
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
  position: absolute;
  width: 46px;
  height: 55px;
  -webkit-mask-image: url("@/assets/public/image/ua_public_132.png");
  mask-image: url("@/assets/public/image/ua_public_132.png");
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
  bottom: 82px;
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
    background-color: #1c1929 !important;
    padding: 14px 20px !important;
    border-radius: 12px !important;
    animation-name: mailScaling;
    animation-duration: 0.5s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    // transition: transform 0.2s ease-in-out;
  }

  .animation-mail-item {
    animation-name: animationMailScaling;
    animation-duration: 0.5s;
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

.m-mail-list {
  overflow-x: hidden !important;
}
</style>
