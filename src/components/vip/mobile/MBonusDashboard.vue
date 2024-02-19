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
import { storeToRefs } from "pinia";

const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setBonusDashboardDialogVisible } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setRefferalDialogShow } = refferalStore();
const { setMailMenuShow } = mailStore();
const { setSearchGameDialogShow } = gameStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();


const { t } = useI18n();
const open = ref<Array<string>>(['']);
const language = ref<string>('English');
const drawer = ref<boolean>(true);
const languageMenu = ref<boolean>(false);
const originalMenu = ref<boolean>(false);
const navDrawer = ref<any>(null);

// mobile version name
const { name, width } = useDisplay()
const transactionTabs = ref<Array<string>>([
  "Promotions",
  "VIP Bonus",
  "Special Bonus"
]);

const selectedBtn = ref<string>("Promotions");

const selectedTab = ref(t("transaction.tab.game_history"));

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

const bonusDashboardToggle = computed(() => {
  const { getBonusDashboardDialogVisible } = storeToRefs(appBarStore());
  return getBonusDashboardDialogVisible.value
})

const loginBonusDialog = computed(() => {
  const { getLoginBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getLoginBonusDialogVisible.value;
})

const rouletteBonusDialog = computed(() => {
  const { getRouletteBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getRouletteBonusDialogVisible.value;
})


watch(drawer, (newValue: boolean) => {
  setBonusDashboardDialogVisible(newValue);
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

watch(bonusDashboardToggle, (newValue) => {
  drawer.value = newValue;
  if (mobileWidth.value < 600 && newValue) {
    setRightBarToggle(false);
    setNavBarToggle(false);
  }
})

const handleSelectBonusBtn = (selBtn: string) => {
  console.log('>>>>>>>>>')
  selectedBtn.value = selBtn;
}

const handleClose = () => {
  drawer.value = !drawer.value;
}

onMounted(() => {
  drawer.value = false;
})
</script>

<template>
  <v-navigation-drawer
    temporary
    :scrim-opacity="0.6"
    :touchless="true"
    class="m-bonus-nav"
    :class="mobileWidth < 600 ? 'm-bonus-background' : 'm-bonus-hide'"
    location="bottom"
    v-model="drawer"
    style="
      background-color: transparent !important;
      height: 593px !important;
      box-shadow: none !important;
      border: none !important;
    "
    disable-route-watcher
  >
    <div class="d-flex m-bonus-dashboard-header" @click="handleClose">
      <v-btn>
        <div class="m-bonus-dashboard-title">Bonus Dashboard</div>
        <div class="m-bonus-dashboard-img">
          <img
            src="@/assets/public/image/img_public_43.png"
            width="95"
            height="73"
            style="float: right"
          />
        </div>
      </v-btn>
    </div>

    <div class="m-bonus-btns">
      <div class="m-bonus-btns-body">
        <div
          class="m-bonus-type-btn"
          height="36"
          :class="selectedBtn == 'Promotions' ? 'm-bonus-btn-selected' : ''"
          @click="handleSelectBonusBtn('Promotions')"
        >
          Promotions
        </div>

        <div
          class="m-bonus-type-btn"
          width="112"
          height="36"
          :class="selectedBtn == 'VIP Bonus' ? 'm-bonus-btn-selected' : ''"
          @click="handleSelectBonusBtn('VIP Bonus')"
        >
          VIP Bonus
        </div>

        <div
          class="m-bonus-type-btn"
          width="112"
          height="36"
          :class="selectedBtn == 'Special Bonus' ? 'm-bonus-btn-selected' : ''"
          @click="handleSelectBonusBtn('Special Bonus')"
        >
          Special Bonus
        </div>
      </div>
    </div>

    <div class="m-nav-drawer-content1">
      <div class="m-recharge-bonus-body">
        <v-row class="m-recharge-bonus-description">
          <v-col cols="9" class="m-recharge-col">
            <div class="m-recharge-col-title">
              <p class="text-800-16 white mb-2" style="width: 180px; text-align: center">
                {{ t("bonus.dashboard_recharge_title1") }}
              </p>

              <p class="text-800-16 white" style="margin-bottom: 14px">
                {{ t("bonus.dashboard_recharge_title2") }}
              </p>
            </div>
            <div class="">
              <p class="text-600-8 white" style="margin-bottom: 6px">
                {{ t("bonus.dashboard_recharge_content1") }}
              </p>
              <p class="text-600-8 white">
                {{ t("bonus.dashboard_recharge_content2") }}
              </p>
            </div>
          </v-col>
          <v-col cols="3" class="m-recharge-col m-recharge-col-img">
            <img
              src="@/assets/public/image/img_public_44.png"
              width="81"
              height="91"
              style="float: right"
            />
          </v-col>
        </v-row>
        <v-row style="margin-top: 16px; height: 40px; align-items: center" class="d-flex">
          <v-col cols="6" class="m-recharge-col m-recharge-col-btn1">
            <v-btn class="m-recharge-more-btn">
              <div class="d-flex" style="font-size: 12px; color: rgba(18, 255, 118, 1)">
                <p>View details</p>
                <img
                  src="@/assets/public/image/img-public-50.png"
                  width="16"
                  class="ml-1"
                  color="rgba(18, 255, 118, 1);"
                />
              </div>
            </v-btn>
          </v-col>
          <v-col cols="6" class="m-recharge-col m-recharge-col-btn2">
            <div style="float: right">
              <v-btn class="m-recharge-more-btn">
                <div
                  class="d-flex justify-center"
                  style="
                    width: 122px;
                    height: 32px;
                    font-size: 14px;
                    font-weight: 700;
                    border-radius: 8px;
                    background: rgba(249, 188, 1, 1);
                    color: #000;
                    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
                    align-items: center;
                  "
                >
                  <p>First Deposit</p>
                </div>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="m-recharge-bonus-body">
        <v-row class="m-deposit-bonus-description">
          <v-col cols="6" class="m-recharge-col">
            <div class="m-recharge-col-title d-flex">
              <p
                class="text-400-12 white mb-2"
                style="
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 34px;
                "
              >
                1st
              </p>

              <p
                class="text-400-12 white"
                style="
                  margin-left: 4px;
                  margin-bottom: 8px;
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 97px;
                "
              >
                180% Bonus
              </p>
            </div>
            <div class="m-recharge-col-title d-flex">
              <p
                class="text-400-12 white mb-2"
                style="
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 34px;
                "
              >
                2nd
              </p>

              <p
                class="text-400-12 white"
                style="
                  margin-left: 4px;
                  margin-bottom: 8px;
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 97px;
                "
              >
                180% Bonus
              </p>
            </div>
            <div class="m-recharge-col-title d-flex">
              <p
                class="text-400-12 white mb-2"
                style="
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 34px;
                "
              >
                3rd
              </p>

              <p
                class="text-400-12 white"
                style="
                  margin-left: 4px;
                  margin-bottom: 8px;
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 97px;
                "
              >
                180% Bonus
              </p>
            </div>
            <div class="m-recharge-col-title d-flex">
              <p
                class="text-400-12 white mb-2"
                style="
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 34px;
                "
              >
                4th
              </p>

              <p
                class="text-400-12 white"
                style="
                  margin-left: 4px;
                  margin-bottom: 8px;
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 97px;
                "
              >
                180% Bonus
              </p>
            </div>
          </v-col>
          <v-col cols="6" class="m-recharge-col m-recharge-col-img">
            <div class="m-deposit-bonus-img-text">
              <p>Deposit Bonus</p>
            </div>
            <img
              src="@/assets/public/image/img_public_45.png"
              width="146"
              height="63"
              style="float: right"
            />
          </v-col>
        </v-row>
        <v-row style="margin-top: 16px; height: 40px; align-items: center" class="d-flex">
          <v-col cols="6" class="m-recharge-col m-recharge-col-btn1">
            <v-btn class="m-recharge-more-btn">
              <div class="d-flex" style="font-size: 12px; color: rgba(18, 255, 118, 1)">
                <p>View details</p>
                <img
                  src="@/assets/public/image/img-public-50.png"
                  width="16"
                  class="ml-1"
                  color="rgba(18, 255, 118, 1);"
                />
              </div>
            </v-btn>
          </v-col>
          <v-col cols="6" class="m-recharge-col m-recharge-col-btn2">
            <div style="float: right">
              <v-btn class="m-recharge-more-btn">
                <div
                  class="d-flex justify-center"
                  style="
                    width: 122px;
                    height: 32px;
                    font-size: 14px;
                    font-weight: 700;
                    border-radius: 8px;
                    background: rgba(249, 188, 1, 1);
                    color: #000;
                    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
                    align-items: center;
                  "
                >
                  <p>First Deposit</p>
                </div>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
      <div style="height: 100px; background: rgba(41, 37, 60, 1)"></div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss">
.m-bonus-nav {
  .v-navigation-drawer__content {
    height: 100vh;
    overflow-y: hidden !important;
  }
}

.m-bonus-btns {
  position: relative;

  height: 60px;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  padding: 10px;
  border-radius: 37px;
  background: rgba(41, 37, 60, 1);
  border: none;
  z-index: 1010 !important;

  .m-bonus-btns-body {
    background: rgba(34, 31, 50, 1);
    border-radius: 37px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .m-bonus-type-btn {
    background: rgba(34, 31, 50, 1);
    padding-top: 8px !important;
    border-radius: 37px;
    width: 113px !important;
    height: 38px;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    color: rgba(119, 130, 170, 1) !important;

    margin-top: auto;
    margin-bottom: auto;
    margin-left: 5px;
    margin-right: 5px;
  }
  .m-bonus-btn-selected {
    background: linear-gradient(90deg, #4522c1 0.01%, #6c43f7 100%),
      linear-gradient(180deg, #6d44f8 0%, #5726fc 100%);
    color: white !important;
  }
}

.m-nav-drawer-content1 {
  margin-top: -30px;
  padding-top: 46px !important;
  background: rgba(41, 37, 60, 1);

  .m-recharge-bonus-body {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 16px;
    background: rgba(34, 31, 50, 1);
    height: 176px;
    border-radius: 4px 4px 4px 4px;
    margin-bottom: 26px;

    .m-recharge-bonus-description {
      height: 124px;
      border-radius: 4px;
      background: linear-gradient(90deg, #384140 0%, #7bca1b 100%);
      margin-left: 0px;
      margin-right: 0px;
      padding: 16px;
    }
    .m-deposit-bonus-description {
      height: 124px;
      border-radius: 4px;
      background: linear-gradient(90deg, #3b2a5a 0%, #6a42f4 100%);
      margin-left: 0px;
      margin-right: 0px;
      padding: 16px;

      .m-deposit-bonus-img-text {
        font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
        font-size: 16px;
        font-weight: 800;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: center;
        padding-left: 24px;
        color: white;
        margin-bottom: 14px;
      }
    }
  }
}

.m-recharge-more-btn {
  margin-left: 16px;
  text-transform: initial;
  background-color: transparent;
  box-shadow: none !important;
}
.m-recharge-col {
  padding: 0px !important;
  .v-btn--variant-elevated {
    background: none !important;
  }
}
.m-recharge-col-btn1 {
  // margin-top: auto !important;
  // margin-bottom: auto !important;
  // padding-left: 16px !important;
}

.m-bonus-dashboard-title {
  position: relative;
  top: 24px;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 16px;
  color: rgba(255, 255, 255, 1);
}
.m-bonus-dashboard-img {
  position: relative;
  top: 0px;
  margin-left: 27px;
}
.m-bonus-dashboard-header {
  .v-btn {
    background: transparent;
    height: fit-content;
    box-shadow: none;
  }
  .v-btn.v-btn--density-default {
    height: unset;
  }
}
.m-bonus-hide {
  display: none;
}
</style>
