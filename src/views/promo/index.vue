<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import icon_public_102 from "@/assets/public/svg/icon_public_102.svg";
import icon_public_42 from "@/assets/public/svg/icon_public_42.svg";
import icon_public_93 from "@/assets/public/svg/icon_public_93.svg";
import { useRouter } from "vue-router";
import { promoStore } from "@/store/promo";
import { appBarStore } from "@/store/appBar";
import { authStore } from "@/store/auth";
import { mailStore } from "@/store/mail";
import { vipStore } from "@/store/vip";
import { refferalStore } from '@/store/refferal';
import { menuStore } from "@/store/menu";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { agentStore } from "@/store/agent";
import { storeToRefs } from "pinia";
import { type PromoListData } from "@/interface/promo";

const { setAuthModalType } = authStore();
const { setUserNavBarToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setAccountDialogShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setBonusTabIndex } = bonusTransactionStore();
const { setTransactionTab } = bonusTransactionStore();
const { setRefferalDialogShow } = refferalStore();
const { setMailMenuShow } = mailStore();
const { dispatchVipInfo } = vipStore();
const { dispatchVipLevels } = vipStore();
const { setDepositWithdrawToggle } = appBarStore();
const { setVipNavBarToggle } = vipStore();
const { setNavBarToggle } = appBarStore();
const { dispatchVipLevelAward } = vipStore();
const { setRewardNavShow } = menuStore();
const { setAgentNavBarToggle } = agentStore();

const { t } = useI18n();
const router = useRouter();
const activeIndex = ref<number>(0);
const allSvgIconColor = ref<string>("#ffffff");
const vipSvgIconColor = ref<string>("#7782AA");
const promotionSvgIconColor = ref<string>("#7782AA");

const { dispatchUserActivityList } = promoStore();

const promoList = computed(() => {
  const { getUserActivityList } = storeToRefs(promoStore());
  return getUserActivityList.value;
});

const handleBtnTab = (index: number) => {
  activeIndex.value = index;
  switch (activeIndex.value) {
    case 0:
      allSvgIconColor.value = "#ffffff";
      vipSvgIconColor.value = "#7782AA";
      promotionSvgIconColor.value = "#7782AA";
      break;
    case 1:
      allSvgIconColor.value = "#7782AA";
      vipSvgIconColor.value = "#ffffff";
      promotionSvgIconColor.value = "#7782AA";
      break;
    case 2:
      allSvgIconColor.value = "#7782AA";
      vipSvgIconColor.value = "#7782AA";
      promotionSvgIconColor.value = "#ffffff";
      break;
  }
};

const allSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", allSvgIconColor.value);
    for (let sub_node of node.children) {
      sub_node.setAttribute("fill", allSvgIconColor.value);
    }
  }
  return el;
};

const vipSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", vipSvgIconColor.value);
    for (let sub_node of node.children) {
      sub_node.setAttribute("fill", vipSvgIconColor.value);
    }
  }
  return el;
};

const promotionSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", promotionSvgIconColor.value);
    for (let sub_node of node.children) {
      sub_node.setAttribute("fill", promotionSvgIconColor.value);
    }
  }
  return el;
};
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const handleContent = (item: PromoListData) => {
  if(token.value == undefined){
    setAuthModalType("login");
    setOverlayScrimShow(false);
  }
  else{
    setDepositWithdrawToggle(true);
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    setDepositDialogToggle(true);
    setCashDialogToggle(true);
    setUserNavBarToggle(false);
  }
  /*else{
    switch (item.click_feedback) {
      case 5:
        switch (item.content) {
          case "deposit":
            setDepositWithdrawToggle(true);
            setMainBlurEffectShow(true);
            setHeaderBlurEffectShow(true);
            setMenuBlurEffectShow(true);
            setDepositDialogToggle(true);
            setCashDialogToggle(true);
            setUserNavBarToggle(false);
            break;
          case "withdraw":
            setWithdrawDialogToggle(true);
            setCashDialogToggle(true);
            setUserNavBarToggle(false);
            break;
          case "vip":
            setVipNavBarToggle('1');
            setNavBarToggle(false);
            setMainBlurEffectShow(false);
            setOverlayScrimShow(false);
            break;
          case "invite":
            setAgentNavBarToggle(true);
            setNavBarToggle(false);
            setMainBlurEffectShow(false);
            setOverlayScrimShow(false);
            setTimeout(() => {
              setMailMenuShow(false);
              setMailMenuShow(true);
            }, 200)
            break;
          case "reward":
            setRewardNavShow(true);
            setMainBlurEffectShow(true);
            setOverlayScrimShow(true);
            setUserNavBarToggle(false);
            break;
          case "user":
            setAccountDialogShow(true);
            setMainBlurEffectShow(true);
            setHeaderBlurEffectShow(true);
            setMenuBlurEffectShow(true);
            setOverlayScrimShow(true);
            setUserNavBarToggle(false);
            break;
          case "invite_popup":
            setOverlayScrimShow(false);
            setRefferalDialogShow(true)
            setNavBarToggle(false);
            break;
          case "bet_task":
            router.push({ name: 'Bonuses And Transactions' });
            setBonusTabIndex(0);
            setUserNavBarToggle(false);
            break;
          case "faq":
            // case "/deposit":
            router.push({name: "About_US", query: {index: 0}})
            break;
        }
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        break;
    }
  }*/
}

onMounted(async () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  await dispatchUserActivityList();
});

const i18nButtonText = (eng: string) =>{
  if(eng == "Go to Deposit")
    return t("promo.text_32");
  return "";
}
</script>

<template>
  <v-layout class="m-promo-navigation-layout">
    <v-navigation-drawer class="m-promo-navigation-drawer" :width="76">
      <div
        class="text-center relative ml-2"
        :class="
          activeIndex == 0
            ? 'm-promo-navigation-event-card-active'
            : 'm-promo-navigation-event-card'
        "
        style="margin-top: 96px !important"
        @click="handleBtnTab(0)"
      >
        <inline-svg
          :src="icon_public_102"
          width="24"
          height="24"
          class="mt-1"
          :transform-source="allSvgTransform"
        ></inline-svg>
        <div
          class="text-600-8"
          :class="activeIndex == 0 ? 'white' : 'gray'"
          style="line-height: 0px"
        >
          {{ t("promo.text_1") }}
        </div>
      </div>
      <div
        class="mt-8 text-center relative ml-2"
        :class="
          activeIndex == 1
            ? 'm-promo-navigation-event-card-active'
            : 'm-promo-navigation-event-card'
        "
        @click="handleBtnTab(1)"
      >
        <inline-svg
          :src="icon_public_42"
          width="24"
          height="24"
          class="mt-1"
          :transform-source="vipSvgTransform"
        ></inline-svg>
        <div
          class="text-600-8"
          :class="activeIndex == 1 ? 'white' : 'gray'"
          style="line-height: 0px"
        >
          {{ t("promo.text_2") }}
        </div>
      </div>
      <div
        class="mt-8 text-center relative ml-2"
        :class="
          activeIndex == 2
            ? 'm-promo-navigation-event-card-active'
            : 'm-promo-navigation-event-card'
        "
        @click="handleBtnTab(2)"
      >
        <inline-svg
          :src="icon_public_93"
          width="24"
          height="24"
          class="mt-1"
          :transform-source="promotionSvgTransform"
        ></inline-svg>
        <div
          class="text-600-8"
          :class="activeIndex == 2 ? 'white' : 'gray'"
          style="line-height: 0px"
        >
          {{ t("promo.text_3") }}
        </div>
      </div>
    </v-navigation-drawer>
    <v-main class="m-promo-navigation-body">
      <v-card
        v-for="(item, index) in promoList.group_data[0].list_data"
        class="m-promo-navigation-card mx-2 relative"
        :style="{ marginTop: index == 0 ? '96px !important' : '8px !important' }"
      >
        <img
          :src="item.image_path"
          class="m-promo-card-img"
          @click="$router.push({ name: 'Promo_Detail', query: { id: item.id } })"
        />
        <div class="d-flex mx-2 mt-1 mb-4">
          <div
            class="text-800-12 gray d-flex align-center"
            @click="$router.push({ name: 'Promo_Detail', query: { id: item.id } })"
          >
            {{ t("promo.text_6") }}
            <v-icon size="large">mdi-chevron-right</v-icon>
          </div>
          <v-btn
            class="text-none m-promo-deposit-btn"
            width="122"
            height="32"
            v-if="item.button_path != ''"
            @click="handleContent(item)"
          >
            {{i18nButtonText(item.button_text)}}
          </v-btn>
        </div>
      </v-card>
      <!-- <v-card
        class="m-promo-navigation-card mx-2 relative"
        style="margin-top: 96px !important"
      >
        <img src="@/assets/promo/image/img_hp_4.png" class="m-promo-card-img" />
        <div class="d-flex mx-2 mt-1 mb-4">
          <div
            class="text-800-12 gray d-flex align-center"
            @click="$router.push({ name: 'Promo_Detail', query: { index: 0 } })"
          >
            {{ t("promo.text_6") }}
            <v-icon size="large">mdi-chevron-right</v-icon>
          </div>
          <v-btn class="text-none m-promo-deposit-btn" width="122" height="32">
            {{ t("promo.text_7") }}
          </v-btn>
        </div>
      </v-card>
      <v-card class="m-promo-navigation-card mx-2 relative mt-4">
        <img src="@/assets/promo/image/img_hp_5.png" class="m-promo-card-img" />
        <div class="d-flex mx-2 mt-1 mb-4">
          <div
            class="text-800-12 gray d-flex align-center"
            @click="$router.push({ name: 'Promo_Detail', query: { index: 1 } })"
          >
            {{ t("promo.text_6") }}
            <v-icon size="large">mdi-chevron-right</v-icon>
          </div>
          <v-btn class="text-none m-promo-deposit-btn" width="122" height="32">
            {{ t("promo.text_7") }}
          </v-btn>
        </div>
      </v-card>
      <v-card class="m-promo-navigation-card mx-2 relative mt-4">
        <img src="@/assets/promo/image/img_hp_6.png" class="m-promo-card-img" />
        <div
          class="d-flex mx-2 mt-1 mb-4"
          @click="$router.push({ name: 'Promo_Detail', query: { index: 2 } })"
        >
          <div class="text-800-12 gray d-flex align-center">
            {{ t("promo.text_6") }}
            <v-icon size="large">mdi-chevron-right</v-icon>
          </div>
          <v-btn class="text-none m-promo-deposit-btn" width="122" height="32">
            {{ t("promo.text_7") }}
          </v-btn>
        </div>
      </v-card> -->
    </v-main>
  </v-layout>
</template>

<style lang="scss">
.m-promo-navigation-layout {
  margin-top: -100px;
  z-index: 13 !important;

  .m-promo-navigation-drawer {
    background: $agent_card_notmet_bg !important;
    box-shadow: 3px 0px 4px 1px rgba(0, 0, 0, 0.21) !important;

    .m-promo-navigation-event-card-active {
      width: 56px;
      height: 48px;
      border-radius: 8px;
      background: var(--predominant, #009b3a);
      box-shadow: 0px -4px 0px 0px #0e5e50 inset;
    }

    .m-promo-navigation-event-card-active:after {
      content: "";
      position: absolute;
      align-self: center;
      top: 50%;
      transform: translateY(-50%);
      right: -20px;
      border: 13px solid #009b3a;
      border-right-color: transparent;
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-top-width: 6px;
      border-bottom-width: 6px;
    }

    .m-promo-navigation-event-card {
      width: 56px;
      height: 48px;
    }
  }

  .m-promo-navigation-body {
    height: calc(100vh - 70px);
    background: $agent_card_bg !important;
    overflow-y: auto;

    .m-promo-navigation-card {
      // height: 160px;
      border-radius: 4px;
      background: $agent_card_notmet_bg;
      box-shadow: none !important;

      .m-promo-card-1 {
        height: 95px;
        border-radius: 8px;
        background: linear-gradient(0deg, $agent_card_bg 0%, $agent_card_bar_bg 100%);
        box-shadow: none !important;

        .m-promo-card-text-1 {
          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #fff;
          font-family: Inter;
          font-size: 32px;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
          background: linear-gradient(171deg, #fff 24.55%, rgba(255, 255, 255, 0) 93.77%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .m-promo-card-2 {
        height: 95px;
        border-radius: 8px;
        background: linear-gradient(0deg, #1b3344 0%, #0079d1 100%);
        box-shadow: none !important;

        .m-promo-card-text-2 {
          font-family: Inter;
          font-size: 24px;
          font-style: normal;
          font-weight: 900;
          line-height: 100%;
          background: linear-gradient(161deg, #fff500 22.97%, #ffa800 59.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .m-promo-card-3 {
        height: 95px;
        border-radius: 8px;
        background: linear-gradient(52deg, #0a072f 22.05%, #007963 100%);
        box-shadow: none !important;

        .m-promo-card-text-3 {
          color: var(--Logo-Color, #f9bc01);
          -webkit-text-stroke-width: 1;
          -webkit-text-stroke-color: #ffe500;
          font-family: Inter;
          font-size: 28px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          text-transform: uppercase;
        }
      }

      .m-promo-card-img {
        // height: 106px;
        width: 100%;
      }

      .m-promo-card-img-1 {
        position: absolute;
        right: 0px;
        top: 0px;
        z-index: 43;
      }

      .m-promo-deposit-btn {
        margin-left: auto;
        border-radius: 8px;
        background: #F9BC01 !important;
        box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);

        .v-btn__content {
          color: #000;
          font-family: Inter;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        }
      }
    }
  }

  .m-promo-event-icon {
    position: absolute;
    top: 4px;
    left: 24px;
  }

  .m-promo-event-text {
    position: absolute;
    left: 17px;
    top: 28px;
  }
}
</style>
