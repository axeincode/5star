<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { mailStore } from "@/store/mail";
import { menuStore } from "@/store/menu";
import { authStore } from "@/store/auth";
import { appBarStore } from "@/store/appBar";
import img_vip_4 from "@/assets/vip/image/img_vip_4.png";
import img_public_21 from "@/assets/public/image/img_public_21.png";
import img_public_22 from "@/assets/public/image/img_public_22.png";
import img_public_23 from "@/assets/public/image/img_public_23.png";
import img_public_1 from "@/assets/public/image/img_public_1.png";
import img_public_2 from "@/assets/public/image/img_public_2.png";
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg"
import img_vip_1 from "@/assets/vip/image/img_vip_1.png";
import img_vip_3 from "@/assets/vip/image/img_vip_3.png";
import { vipStore } from "@/store/vip";
import { rewardStore } from "@/store/reward";
import { refferalStore } from "@/store/refferal";
import { loginBonusStore } from "@/store/loginBonus";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const { setRewardNavShow } = menuStore();
const { setMailMenuShow } = mailStore();
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setLevelUpDialogVisible } = vipStore();

const { setAuthModalType } = authStore();
const { setRefferalDialogShow } = refferalStore();
const { setLoginBonusDialogVisible } = loginBonusStore();

const { dispatchRewardList } = rewardStore();

const rewardNavShow = ref<boolean>(false);
const claimText = ref<string>("");

const bonus_items = ref<Array<any>>([
  {
    image: img_vip_4,
    content: t("reward.text_8"),
    value: 2,
  },
  {
    image: img_public_21,
    content: t("reward.text_10"),
    value: 2,
  },
  {
    image: img_public_22,
    content: t("reward.text_11"),
    value: 2,
  },
  {
    image: img_public_1,
    content: t("reward.text_12"),
    value: "",
  },
  // {
  //   image: img_public_2,
  //   content: t("reward.text_13"),
  //   value: "",
  // },
]);

const items_2 = ref<Array<any>>([
  {
    image: img_public_23,
    content: t("reward.text_15"),
  },
  {
    image: img_vip_3,
    content: t("reward.text_17"),
  },
]);

// get Token
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const mobileWidth = computed(() => {
  return width.value;
});

const rewardNavigationShow = computed(() => {
  const { getRewardNavShow } = storeToRefs(menuStore());
  return getRewardNavShow.value;
});

watch(rewardNavigationShow, (value) => {
  rewardNavShow.value = value;
});

watch(rewardNavShow, (value) => {
  if (!value) {
    setRewardNavShow(false);
    setOverlayScrimShow(false);
    setMainBlurEffectShow(false);
    setMailMenuShow(false);
  }
});

const openLoginDialog = () => {
  setAuthModalType("login");
  setOverlayScrimShow(false);
};

const openRefferalDialog = () => {
  setOverlayScrimShow(false);
  setRefferalDialogShow(true)
}

const handleMyReward = (index:number) => {
  if(index == 1) {
    openRefferalDialog();
  }
  else {

  }
}

const openLoginBonusDialog = () => {
  setLoginBonusDialogVisible(true);
  setOverlayScrimShow(true);
  setMainBlurEffectShow(true);
}


const handleBonus = (index:number) => {
  if(index == 3) {
    openLoginBonusDialog()
  }

}

const rewardList = computed(() => {
  const { getRewardList } = storeToRefs(rewardStore());
  return getRewardList.value;
});

onMounted(async () => {
  if(token.value){
    await dispatchRewardList();
    bonus_items.value[0].value = rewardList.value.cash_back;
    bonus_items.value[1].value = rewardList.value.week;
  }
});

const claimClicked = async () =>{
  await dispatchRewardList();
}
</script>

<template>
  <v-navigation-drawer v-model="rewardNavShow" location="bottom" temporary :touchless="true"
    class="m-reward-navigation-drawer">

    <v-btn class="m-reward-drawer-close-button" icon="true" width="20" height="20" @click="setRewardNavShow(false)">
      <img :src="icon_public_10" width="18" />
    </v-btn>

    <div class="m-reward-header" v-if="token">
      <p class="text-700-12 white pt-8 mx-4">{{ t("reward.text_3") }}</p>

      <v-row class="mx-4 my-1 align-center ">
        <v-col cols="9" class="text-400-12 py-1 px-0 d-flex align-center">
          <v-text-field class="form-textfield dark-textfield mx-0 my-0" variant="solo" hide-details filled clearable
            :class="mobileWidth < 600 ? 'm-claim-text' : ''" v-model="claimText" :placeholder="t('reward.text_4')" />
        </v-col>
        <v-col cols="3" class="pa-1 text-right">
          <v-btn class="text-none m-reward-claim-btn" width="72" height="32" @click="claimClicked">
            {{ t("reward.text_5") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="mx-4 my-2 m-reward-achievement-bonus">
        <v-col cols="3" class="d-flex align-center justify-center">
          <img src="@/assets/affiliate/statistics/img_agent_8.png" width="54" :class="rewardList.achievement_status == 1 ? '' :  'm-reward-achievement-img'" />
        </v-col>
        <v-col cols="6">
          <p :class="rewardList.achievement_status == 1 ? 'text-400-12 white' :'text-400-12 text-gray'">
            {{ t("reward.text_6") }}
          </p>
          <p :class="rewardList.achievement_status == 1 ? 'text-800-14 active' :'text-800-14 text-gray'">R$ {{ parseFloat(rewardList.achievement).toFixed(2) }}</p>
        </v-col>
        <v-col cols="3" class="d-flex align-center">
          <v-btn :class="rewardList.achievement_status == 1?'button-yellow m-reward-bonus-active-btn':'m-reward-bonus-btn'" width="72" height="32">
            {{ t("reward.text_7") }}
          </v-btn>
        </v-col>
      </v-row>

    </div>

    <div class="m-reward-join-card mx-4 relative mt-8" v-else>
      <img src="@/assets/public/image/img_public_25.png" height="159" />
      <img src="@/assets/public/image/img_public_24.png" class="m-reward-pic-img" />
      <img src="@/assets/public/image/img_public_5.png" class="m-reward-money-img" />
      <div class="m-reward-join-text text-700-14 white">
        <div>{{ t("reward.text_19") }}</div>
        <div>{{ t("reward.text_20") }}</div>
        <div>{{ t("reward.text_21") }}</div>
      </div>
      <v-btn class="text-none m-reward-join-btn" width="96" height="32" @click="openLoginDialog">
        {{ t("reward.text_22") }}
      </v-btn>
    </div>

    <div class="m-reward-body mx-4 mb-4">
      <div class="my-2 text-800-16 white">{{ t("reward.text_18") }}</div>

      <template v-for="(item, index) in bonus_items" :key="index">
        <v-row class="ma-0 m-reward-bonus-card" :class="index != 0 ? 'mt-2' : ''">
          <v-col cols="3" class="d-flex align-center justify-center py-1">
            <img :src="item.image" :width="index == 0 ? 34 : 38" />
          </v-col>
          <v-col cols="6" class="py-1 d-flex align-center">
            <div>
              <p class="text-400-12 white">
                {{ item.content }}
              </p>
              <p class="text-800-14 active" v-if="item.value != ''">
                R$ {{ Number(item.value).toFixed(2) }}
              </p>
            </div>
          </v-col>
          <v-col cols="3" class="d-flex align-center py-1">
            <v-btn :class="item.value == 0 && index != 3 ? 'm-reward-bonus-btn' : 'button-yellow m-reward-bonus-active-btn'" width="72" height="32" @click="handleBonus(index)" :disabled="item.value == 0 && index != 3?true:false">
              {{ t("reward.text_7") }}
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <div class="my-2 text-800-16 white">{{ t("reward.text_14") }}</div>

      <template v-for="(item, index) in items_2" :key="index">
        <v-row class="ma-0 m-reward-bonus-card" :class="index != 0 ? 'mt-2' : ''">
          <v-col cols="3" class="d-flex align-center justify-center py-1">
            <img :src="item.image" width="38" />
          </v-col>
          <v-col cols="6" class="py-1 d-flex align-center">
            <div>
              <p class="text-700-12 color-F9BC01">
                {{ item.content }}
              </p>
              <p class="text-700-12 white" v-if="index == 0">
                {{ rewardList.level_up_num }} <font class="text-400-10 gray">{{ t("reward.text_16") }}</font>
              </p>
            </div>
          </v-col>
          <v-col cols="3" class="d-flex align-center py-1">
            <v-btn :class="rewardList.level_up_num < 0 && index == 0 ? 'm-reward-bonus-btn' : 'button-yellow m-reward-bonus-active-btn'" width="72" height="32" @click="handleMyReward(index)" :disabled="rewardList.level_up_num < 0 && index == 0?true:false">
              {{ t("reward.text_7") }}
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss">
.m-reward-navigation-drawer {
  height: 100vh !important;
  bottom: 0px !important;
  z-index: 10000000000000000 !important;
  background: $agent_card_bg !important;

  .m-reward-drawer-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 6px;
    right: 6px;
    z-index: 100000;
  }

  .m-reward-header {
    .m-reward-achievement-bonus {
      border-radius: 8px;
      background: $agent_card_notmet_bg;
    }
  }

  .m-reward-join-card {
    height: 160px;
    border-radius: 8px;
    border: 1px solid #1D2027;
    background: conic-gradient(from 47deg at 50.17% 49.69%, #07070A 0deg, #1D2027 360deg);

    .m-reward-pic-img {
      position: absolute;
      left: 4px;
      top: 9px;
    }

    .m-reward-money-img {
      position: absolute;
      left: 126px;
      bottom: 13px;
    }

    .m-reward-join-text {
      position: absolute;
      top: 20px;
      right: 16px;
    }

    .m-reward-join-btn {
      border-radius: 8px;
      background: $agent_card_bar_bg;
      box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.30);
      position: absolute;
      right: 16px;
      bottom: 30px;

      .v-btn__content {
        color: #FFF;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        text-transform: uppercase;
      }
    }
  }

  .m-reward-body {
    .m-reward-bonus-card {
      border-radius: 8px;
      background: $agent_card_notmet_bg;
      height: 72px;
    }
  }

  .m-reward-claim-btn {
    border-radius: 8px !important;
    background: $agent_card_title_color;
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.30);

    .v-btn__content {
      color: #000;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
  }

  .m-reward-bonus-btn {
    border-radius: 8px;
    background: $agent_color_3;
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.30);

    .v-btn__content {
      color: var(--light-color, #7782AA);
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .m-reward-achievement-img {
    opacity: 0.3;
    filter: grayscale(100%);
  }

  .m-reward-bonus-active-btn {
    border-radius: 8px;
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.30);

    .v-btn__content {
      color: #000;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .m-claim-text {
    height: 40px !important;

    .v-field {
      background: $agent_card_notmet_bg !important;
      border-radius: 8px !important;
    }

    .v-field__field {
      background: $agent_card_notmet_bg !important;
      border-radius: 8px !important;
    }

    .v-field__input {
      height: 40px !important;
      min-height: 40px !important;
      background: $agent_card_notmet_bg !important;
      padding: 0px;
    }

    .v-field__input::placeholder {
      color: #7782AA;
      text-align: center;
      font-family: Inter;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 0px;
    }

    .v-field__clearable {
      padding-top: 8px !important;
    }

    .v-input__control {
      height: 40px !important;

      .mdi:before {
        font-size: 19px !important;
        color: #7782aa !important;
      }
    }
  }
}
</style>
