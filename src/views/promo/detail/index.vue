<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { appBarStore } from "@/store/appBar";
import { useRoute, useRouter } from "vue-router";
import { promoStore } from "@/store/promo";
import { storeToRefs } from "pinia";
import { type PromoListData } from "@/interface/promo";
import { authStore } from "@/store/auth";
// import img_hp_4 from "@/assets/promo/image/img_hp_4.png";
// import img_hp_5 from "@/assets/promo/image/img_hp_5.png";
// import img_hp_6 from "@/assets/promo/image/img_hp_6.png";
// import MDepositBonus from "@/components/promo/deposit_bonus/index.vue";
// import MWelcomeBonus from "@/components/promo/welcome_bonus/index.vue";

const { setAuthModalType } = authStore();
const { setAuthDialogVisible } = authStore();
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setUserNavBarToggle } = appBarStore();
const { setDepositWithdrawToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { dispatchUserActivityList } = promoStore();

const { t } = useI18n();
const route = useRoute();

const selectedItem = ref<PromoListData>({
  id: 0,
  name: "",
  image_path: "",
  text: "",
  desc: "",
  countdown: false,
  content: "",
  click_feedback: 0,
  button_path: "",
  button_text: ""
});

const depositDialogShow = () => {
  setDepositWithdrawToggle(true);
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
};

const promoList = computed(() => {
  const { getUserActivityList } = storeToRefs(promoStore());
  return getUserActivityList.value;
});

onMounted(async () => {
  await dispatchUserActivityList();
  promoList.value.group_data[0].list_data.map(item => {
    if (item.id == Number(route.query.id)) {
      selectedItem.value = item
    }
  })
});

const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const handleContent = (item: PromoListData) => {
  if (token.value == undefined) {
    setAuthModalType("login");
    setAuthDialogVisible(true);
    setOverlayScrimShow(false);
  }
  else {
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

const i18nButtonText = (eng: string) => {
  if (eng == "Go to Deposit")
    return t("promo.text_32");
  return "";
}
</script>

<template>
  <div class="mx-4">
    <v-card class="m-promo-detail-back-card">
      <div class="d-flex align-center" style="height: 48px">
        <v-icon size="large" color="#ffffff" @click="$router.push({ name: 'Promo' })">
          mdi-chevron-left
        </v-icon>
        <div class="text-700-12 text-white">{{ t("promo.text_14") }}</div>
      </div>
    </v-card>
    <v-card class="m-promo-detail-card mt-2 pa-2">
      <img :src="selectedItem.image_path" style="width: 100%" />
      <div v-html="selectedItem.text" class="mx-1"></div>
      <!---<v-btn
        class="text-none m-promo-detail-deposit-btn my-5"
        width="-webkit-fill-available"
        height="48"
        @click="depositDialogShow"
      >
        {{ t("promo.text_32") }}
      </v-btn> -->

      <div class="text-center mt-8">
        <v-btn
          class="button-bright m-reffer-btn-font text-none"
          width="-webkit-fill-available"
          height="55px"
          @click="handleContent"
        >
          {{ i18nButtonText(selectedItem.button_text) }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<style lang="scss">
.m-promo-temp-img {
  margin-top: 50px !important;
  width: 100% !important;
}

.m-promo-detail-back-card {
  height: 48px;
  border-radius: 8px !important;
  background: var(--grade-2-black, #1d2027) !important;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3) !important;
}

.m-promo-detail-card {
  border-radius: 8px !important;
  background: var(--grade-1-black, #15161c) !important;

  .m-promo-detail-deposit-btn {
    border-radius: 8px;
    background: var(--predominant, #009b3a);
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);

    .v-btn__content {
      color: #fff;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
  }
}
</style>
