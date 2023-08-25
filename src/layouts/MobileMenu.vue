<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { appBarStore } from "@/store/appBar";
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
const { setMailMenuShow } = mailStore();

// mail count
const mailCount = ref<number>(10);
// navbar toggle
const navbarToggle = ref<boolean>(false);
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

const shareIcon = ref<any>(new URL("@/assets/public/image/img_public_19.png", import.meta.url).href)

const prevScrollPos = ref<number>(0);

// pc or mobile screen switch

const mobileVersion = computed(() => {
  return name.value
});

const mobileWidth: any = computed(() => {
  return width.value;
})

const navToggle = computed(() => {
  const { getNavBarToggle } = storeToRefs(appBarStore());
  return getNavBarToggle.value
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

watch(mailMenuShow, async (newValue) => {
  if (newValue) {
    sportBtnActive.value = false
    casinoBtnActive.value = false;
    navbarToggle.value = false;
    setUserNavBarToggle(false);
    setMainBlurEffectShow(false);
    setNavBarToggle(navbarToggle.value)
    menuIconColor.value = navbarToggle.value ? "#6742ec" : "#7782AA"
    casinoIconColor.value = casinoBtnActive.value ? "#6742ec" : "#7782AA";
    sportIconColor.value = sportBtnActive.value ? "#6742ec" : "#7782AA";
    mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";
    setTimeout(() => {
      setMainBlurEffectShow(newValue);
      setOverlayScrimShow(newValue);
    }, 200)
  } else {
    setMainBlurEffectShow(newValue);
    setOverlayScrimShow(newValue);
    mailIconColor.value = mailMenuShow.value ? "#6742ec" : "#7782AA";
  }
  setMailMenuShow(newValue);
  if (newValue) {
    for (const item of mailList.value) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          tempMailList.value.push(item);
          resolve();
        }, 100);
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
  sportBtnActive.value = false
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

const handleScroll = (event: any) => {
  const vList = document.querySelector('.mobile-mail-menu');

  if (!vList) {
    return;
  }

  const listItems = Array.from(vList.querySelectorAll('.v-list-item'));

  const currentScrollPos = event.target.scrollTop;

  listItems.forEach((listItem) => {
    const rect = listItem.getBoundingClientRect();

    // If the current scroll position is greater than the previous one, the scrollbar is going down
    if (currentScrollPos > prevScrollPos.value) {
      // console.log('Scrollbar is going down');
      if (rect.top > 0 && rect.bottom < window.innerHeight - 85 && rect.bottom > window.innerHeight - 115) {
        listItem.classList.remove('scale-mail-item');
        // listItem.classList.add('animation-mail-item');
      }
    }
    // Otherwise, the scrollbar is going up
    else {
      // console.log('Scrollbar is going up');
      if (rect.bottom > window.innerHeight - 83) {
        listItem.classList.add('scale-mail-item');
        // listItem.classList.remove('animation-mail-item');
      }
    }
  });

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

onMounted(() => {
  mailCount.value = mailList.value.length
  console.log(tempMailList.value.length);
})
</script>

<template>
  <v-bottom-navigation bg-color="#000000" grow class="mobile-menu-index">
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
      <div class="circle-background"></div>
      <img
        src="@/assets/public/svg/bg_public_22.svg"
        class="share-background-img-position"
      />
      <img :src="shareIcon" class="share-img-position" />
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
        class="px-2"
        :height="tempMailList.length > 8 ? '448px' : ''"
        :width="mobileWidth"
        @scroll="handleScroll"
        style="box-shadow: none !important"
        :style="{ marginLeft: tempMailList.length > 8 ? '6px' : 'auto' }"
      >
        <v-list-item
          height="36"
          :class="tempMailList.length > 8 ? 'm-mail-menu-title' : ''"
        >
          <v-list-item-title class="ml-2">
            <div class="mail-header-text">{{ t("mail_dialog.header_text") }}</div>
          </v-list-item-title>
        </v-list-item>
        <template v-for="(mailItem, index) in tempMailList" :key="index">
          <v-list-item
            class="mail-item"
            :value="mailItem.mail_content_1.content"
            :class="index > 8 ? 'scale-mail-item' : ''"
          >
            <template v-slot:prepend>
              <img :src="mailItem.icon" width="20" />
            </template>
            <v-list-item-title class="ml-2" style="line-height: 18px">
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
    transform: scale(0);
  }

  60% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes animationMailScaling {
  0% {
    transform: scale(0);
  }

  60% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.mobile-menu-index {
  z-index: 1009 !important;
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

  .v-overlay__scrim {
    bottom: 80px !important;
  }
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
    font-weight: 500;
    font-size: 12px;
    color: #7782aa;
  }

  .v-list-item__append {
    display: block !important;
    text-align: center;
  }

  .mail-header-text {
    font-weight: 700;
    font-size: 14px;
    color: #ffffff;
  }

  .completion-area {
    background-color: #000000;
    border-radius: 20px;
    margin-top: 2px;
  }

  .text-color-gray {
    font-weight: 500;
    font-size: 9px;
    color: #7782aa;
  }

  .text-color-white {
    font-weight: 500;
    font-size: 10px;
    color: #ffffff;
  }

  .money-color-white {
    font-weight: 800;
    font-size: 12px;
    color: #ffffff;
  }

  .text-color-yellow {
    font-weight: 600;
    font-size: 8px;
    color: #f9bc01;
    padding: 3px 0px;
  }

  .text-color-green {
    font-weight: 600;
    font-size: 8px;
    color: #01983a;
    padding: 3px 0px;
  }

  .mail-item {
    margin-top: 4px !important;
    background-color: #1c1929 !important;
    padding: 4px 8px !important;
    border-radius: 12px !important;
    animation-name: mailScaling;
    animation-duration: 0.2s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
  }

  .scale-mail-item {
    scale: 0.96;
    transform: translateY(-43px);
    z-index: -1;
    opacity: 0.8;
    transition: scale 0.2s ease;
  }

  .animation-mail-item {
    animation-name: animationMailScaling;
    animation-duration: 0.2s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
  }
}

.share-img-position {
  position: absolute;
  top: -15px;
  width: 40px;
}

.share-background-img-position {
  position: absolute;
  top: -18px;
  width: 46px;
}

.circle-background {
  position: absolute;
  top: -22px;
  width: 54px;
  height: 54px;
  background-color: #000000;
  border-radius: 50%;
}

.share-ripple-btn {
  .v-ripple__container {
    opacity: 0 !important;
  }
}
</style>
