
<script lang="ts" setup>
import { ref, computed, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { vipStore } from "@/store/vip";
const GroupDialog = defineAsyncComponent(() =>
  import("@/components/vip/components/group_dialog/index.vue")
);
const InfoPopUp = defineAsyncComponent(() => import("./InfoPopUp.vue"));
import img_vipemblem_1 from "@/assets/vip/image/img_vipemblem_1.png";
import img_vipemblem_1_24 from "@/assets/vip/image/img_vipemblem_1-24.png";
import img_vipemblem_25_49 from "@/assets/vip/image/img_vipemblem_25-49.png";
import img_vipemblem_50_74 from "@/assets/vip/image/img_vipemblem_50-74.png";
import img_vipemblem_75_99 from "@/assets/vip/image/img_vipemblem_75-99.png";
import img_vipemblem_100_149 from "@/assets/vip/image/img_vipemblem_100-149.png";
import img_vipemblem_159_199 from "@/assets/vip/image/img_vipemblem_159-199.png";
import img_vipemblem_200 from "@/assets/vip/image/img_vipemblem_200.png";
import { useRouter } from "vue-router";
import { bonusTransactionStore } from "@/store/bonusTransaction";
import { refferalStore } from "@/store/refferal";
import { appBarStore } from "@/store/appBar";
import { toFormatNum } from "@/utils/numFormat";
// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});
const { t } = useI18n();
const { setVipNavBarToggle } = vipStore();
const { dispatchVipCycleawardReceive } = vipStore();
const { dispatchVipLevelAwardReceive } = vipStore();
const { dispatchVipBetawardReceive } = vipStore();
const { setBonusTabIndex } = bonusTransactionStore();
const { setDepositWithdrawToggle } = appBarStore();
const { setNavBarToggle } = appBarStore();
const { setUserNavBarToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setRefferalDialogShow } = refferalStore();
const vipButtonTipShow = ref(true);
const router = useRouter();
const groupVisible = ref<boolean>(false);

const toFormatNumFun = val => {
  return toFormatNum(val);
};
// member information  会员信息
const vipInfo = computed(() => {
  const { getVipInfo } = storeToRefs(vipStore());
  console.log(getVipInfo.value, 'getVipInfo.value');
  return getVipInfo.value;
});

// periodic rewards  周期性奖励
const vipCycleawardList = computed(() => {
  const { getVipCycleawardList } = storeToRefs(vipStore());
  return getVipCycleawardList.value;
});

// Level related rewards  等级相关奖励
const vipLevelAward = computed(() => {
  const { getVipLevelAward } = storeToRefs(vipStore());
  return getVipLevelAward.value;
});

// Code rebate  打码返利
const vipBetawardList = computed(() => {
  const { getVipBetawardList } = storeToRefs(vipStore());
  return getVipBetawardList.value;
});

// Recharge progress bar  充值进度条
const depositRate = computed(() => {
  if (
    (vipInfo.value.deposit_exp / vipInfo.value.rank_deposit_exp) * 100 >=
    100
  ) {
    return 100;
  } else {
    return (vipInfo.value.deposit_exp / vipInfo.value.rank_deposit_exp) * 100;
  }
});

// Betting progress bar  投注进度条
const betRate = computed(() => {
  if ((vipInfo.value.bet_exp / vipInfo.value.rank_bet_exp) * 100 >= 100) {
    return 100;
  } else {
    return (vipInfo.value.bet_exp / vipInfo.value.rank_bet_exp) * 100;
  }
});

// vip level  vip等级
const vipLevels = computed(() => {
  const { getVipLevels } = storeToRefs(vipStore());
  return getVipLevels.value;
});

// Match VIP level name  匹配vip等级名称
const vipLevelText = (value: number) => {
  for (let i in vipLevels.value) {
    if (vipLevels.value[i].level === value) {
      // 英文西班牙判断
      if (localStorage.getItem("lang") === "en") {
        return vipLevels.value[i].rank_name;
      } else {
        let levelText = "Hierro negro";
        switch (vipLevels.value[i].rank_name) {
          case "Iron":
            levelText = "Hierro negro";
            break;
          case "Bronze":
            levelText = "Bronce";
            break;
          case "Silver":
            levelText = "Plata";
            break;
          case "Gold":
            levelText = "Oro";
            break;
          case "Platinum":
            levelText = "Platino";
            break;
          case "Diamond":
            levelText = "Diamante";
            break;
          case "Yellow Diamond":
            levelText = "Diamante amarillo";
            break;
          case "Blue Diamond":
            levelText = "Diamante azul";
            break;
          default:
            break;
        }
        return levelText;
      }
    }
  }
};

// vip rank picture matching  vip段位图片匹配
const vipLevelImg = (value: number) => {
  if (value === 0) {
    return img_vipemblem_1;
  }
  if (value > 0 && value < 25) {
    return img_vipemblem_1_24;
  }
  if (value > 24 && value < 50) {
    return img_vipemblem_25_49;
  }
  if (value > 49 && value < 76) {
    return img_vipemblem_50_74;
  }
  if (value > 75 && value < 100) {
    return img_vipemblem_75_99;
  }
  if (value > 99 && value < 150) {
    return img_vipemblem_100_149;
  }
  if (value > 149 && value < 200) {
    return img_vipemblem_159_199;
  }
  if (value === 200) {
    return img_vipemblem_200;
  }
};

// All available reward amounts  所有可领取奖励金额
const awardValue = () => {
  let val = 0;
  if (+vipCycleawardList.value.membership_day_gift > 0) {
    val = val + vipCycleawardList.value.membership_day_gift * 1;
  }
  if (+vipCycleawardList.value.week_gift > 0) {
    val = val + vipCycleawardList.value.week_gift * 1;
  }
  if (+vipCycleawardList.value.month_gift > 0) {
    val = val + vipCycleawardList.value.month_gift * 1;
  }
  if (+vipLevelAward.value.upgrade_gift > 0) {
    val = val + vipLevelAward.value.upgrade_gift * 1;
  }
  if (+vipLevelAward.value.uprank_gift > 0) {
    val = val + vipLevelAward.value.uprank_gift * 1;
  }
  if (+vipBetawardList.value.now_cash_back > 0) {
    val = val + vipBetawardList.value.now_cash_back * 1;
  }
  return val;
};

// Receive rewards with one click  一键领取奖励
const submitVipLevelAward = async () => {
  if (+vipCycleawardList.value.membership_day_gift > 0) {
    await dispatchVipCycleawardReceive({ type: 2 });
  }
  if (+vipCycleawardList.value.week_gift > 0) {
    await dispatchVipCycleawardReceive({ type: 3 });
  }
  if (+vipCycleawardList.value.month_gift > 0) {
    await dispatchVipCycleawardReceive({ type: 4 });
  }
  if (+vipLevelAward.value.upgrade_gift > 0) {
    await dispatchVipLevelAwardReceive({ type: 5 });
  }
  if (+vipLevelAward.value.uprank_gift > 0) {
    await dispatchVipLevelAwardReceive({ type: 6 });
  }
  if (+vipBetawardList.value.now_cash_back > 0) {
    await dispatchVipBetawardReceive({ type: 7 });
  }
};

// Route jump  路由跳转
const goPath = () => {
  setVipNavBarToggle("0");
  router.push({ name: "Bonuses And Transactions", query: { tab: "vip" } });
  setBonusTabIndex(1);
};

// Telegram jump  Telegram跳转
const goTelegram = () => {
  // window.location.href = `https://t.me/${vipInfo.value.telegram}`
  groupVisible.value = true;
};

// vip prompt information status  vip提示信息状态
const getVipButtonShow = (show: boolean) => {
  vipButtonTipShow.value = show;
};

// Jump to the recharge pop-up window  跳转到充值弹窗
const depositDialogShow = () => {
  vipButtonTipShow.value = true;
  setVipNavBarToggle("0");
  setDepositWithdrawToggle(true);
  setNavBarToggle(false);
  setUserNavBarToggle(false);
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
};

// Fission pop-up window pops up  弹出裂变弹窗
const refferalDialog = () => {
  vipButtonTipShow.value = true;
  setRefferalDialogShow(true);
};

// 关闭vip说明弹框
const popupShow = ref(false);

const closeVipIllustrate = () => {
  popupShow.value = !popupShow.value;
  console.log(popupShow.value);
};
// protection_days
const protectionDaysName = computed(() => {
  return vipInfo.value.protection_days === 7 ? t('vip.vip_level_info.rule.text4') : t('vip.vip_level_info.rule.text5')
})

</script>
<template>
  <div class="progress-main">
    <!-- part1 -->
    <div class="progress-main-card">
      <div class="progress-main-card-t">
        <div class="progress-main-card-t-icon">
          <img :src="vipLevelImg(vipInfo.level)" />
        </div>
        <div class="progress-main-card-t-info">
          <div class="progress-main-card-t-info-title">
            <span>{{ vipLevelText(vipInfo.level) }}</span>
            <span>Level {{ vipInfo.level }}</span>
          </div>
          <div
            class="progress-main-card-t-info-content"
          >{{ t('vip.vip_level_info.progress.text_1') }}</div>
        </div>
      </div>
      <div class="progress-main-card-m">
        <div class="progress-main-card-m-title">
          <div class="progress-main-card-m-title-price">
            <span>{{ platformCurrency }} {{ toFormatNum(vipInfo.deposit_exp) }}</span>
            <span>/</span>
            <span>{{ platformCurrency }} {{ toFormatNum(vipInfo.rank_deposit_exp) }}</span>
          </div>
        </div>
        <div class="progress-main-card-m-info">
          <span>{{ t('vip.vip_level_info.progress.text_12') }}</span>
          <div class="progress-main-card-m-info-rate">
            <v-progress-linear
              v-model="depositRate"
              height="16"
              class="progress-main-card-m-info-rate-color"
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div class="progress-main-card-b">
        <div class="progress-main-card-b-title">
          <div class="progress-main-card-b-title-price">
            <span>{{ platformCurrency }} {{ toFormatNum(vipInfo.bet_exp) }}</span>
            <span>/</span>
            <span>{{ platformCurrency }} {{ toFormatNum(vipInfo.rank_bet_exp) }}</span>
          </div>
        </div>
        <div class="progress-main-card-b-info">
          <span>{{ t('vip.vip_level_info.progress.text_13') }}</span>
          <div class="progress-main-card-b-info-rate">
            <v-progress-linear
              v-model="betRate"
              height="16"
              class="progress-main-card-b-info-rate-color"
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div class="progress-main-card-division">
        <img src="@/assets/public/image/bg_public_02_01.png" class="full-width" />
      </div>
      <div class="progress-main-card-rule">
        <div class="rule-top">
          <!-- Level protection -->
          <div class="title">{{ t('vip.vip_level_info.rule.text1') }}</div>
        </div>
        <div class="rule-bopttom">
          <!-- Deposit -->
          <div class="rule-item">
            <p class="label">{{ t('vip.vip_level_info.rule.text2') }}：</p>
            <p class="content"><span>{{ platformCurrency }} {{ toFormatNum(vipInfo.protection_deposit_exp) }}</span><span>/{{ protectionDaysName }}</span></p>
          </div>
          <!-- Bettors -->
          <div class="rule-item">
            <p class="label">{{ t('vip.vip_level_info.rule.text3') }}：</p>
            <p class="content"><span>{{ platformCurrency }} {{ toFormatNum(vipInfo.protection_bet_exp) }}</span><span>/{{ protectionDaysName }}</span></p>
          </div>
        </div>
        <div class="m-vip--illustrate">
          <InfoPopUp
            v-if="popupShow"
            :show="popupShow"
            @close="closeVipIllustrate"
            :validationTitleText="t('vip.vip_level_info.progress.text_17')"
            :validationText="t('vip.vip_level_info.progress.text_18')"
          />
          <img
            class="m-vip--illustrate--icon"
            src="@/assets/vip/svg/illustrate.svg"
            @click="popupShow = !popupShow"
          />
        </div>
      </div>

    </div>

    <!-- part2 -->
    <div class="progress-main-reward">
      <!-- <div class="progress-main-reward" v-if="vipButtonTipShow"> -->
      <img src="@/assets/public/svg/img_public_26.svg" style="width: 100%" />
      <div class="progress-main-reward-bg">
        <div class="progress-main-reward-bg-t">
          <span>{{ t('vip.vip_level_info.progress.text_2') }}</span>
          <span
            v-if="awardValue() > 0"
            @click="submitVipLevelAward"
          >{{ t('vip.vip_level_info.progress.text_3') }}</span>
          <span
            class="available-button"
            v-else
            @click="getVipButtonShow(false)"
          >{{ t('vip.vip_level_info.progress.text_3') }}</span>
        </div>
        <div
          class="progress-main-reward-bg-b"
        >{{ platformCurrency }} {{ toFormatNum(awardValue()) }}</div>
      </div>

      <div class="progress-main-reward-svg"></div>

      <div class="progress-main-reward-view">
        <img src="@/assets/public/svg/icon_public_83.svg" />
        <span @click="goPath">{{ t('vip.vip_level_info.progress.text_4') }}</span>
      </div>
    </div>
    <!-- <div class="progress-main-tip" v-else>
            <div class="progress-main-tip-title">No Claims</div>
            <div class="progress-main-tip-content">
                {{ t('vip.vip_level_info.progress.text_5') }}
            </div>
            <div class="progress-main-tip-button">
                <span @click="refferalDialog">{{ t('vip.vip_level_info.progress.text_6') }}</span>
                <span @click="depositDialogShow">{{ t('vip.vip_level_info.progress.text_7') }}</span>
            </div>
    </div>-->
    <div class="progress-main-group">
      <div class="progress-main-group-t">
        <div class="progress-main-group-t-icon">
          <img class="progress-main-group-img" src="@/assets/public/svg/message.svg" />
        </div>
        <div class="progress-main-group-t-info">
          <span>{{ t('vip.vip_level_info.progress.text_8') }}</span>
          <span>{{ t('vip.vip_level_info.progress.text_9') }}</span>
        </div>
      </div>
      <div class="progress-main-group-b">
        <span @click="goTelegram">{{ t('vip.vip_level_info.progress.text_10') }}</span>
      </div>
    </div>
    <div class="progress-main-faq">
      <div class="progress-main-faq-title">FAQ</div>
      <el-collapse class="progress-main-faq-collapse">
        <el-collapse-item :title="t('vip.vip_level_info.progress.text_11')" name="1">
          <template #title>
            <div class="faq-collapse-head">
              <p>{{ t('vip.vip_level_info.progress.text_11') }}</p>
            </div>
          </template>
          <div>{{ t('vip.vip_level_info.progress.text_14') }}</div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse class="progress-main-faq-collapse">
        <el-collapse-item :title="t('vip.vip_level_info.progress.text_15')" name="1">
          <div>{{ t('vip.vip_level_info.progress.text_16') }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <GroupDialog v-if="groupVisible" v-model="groupVisible"></GroupDialog>
  </div>
</template>

<style lang="scss" scoped>
.progress-main {
  margin: 0 16px;
  &-card {
    display: flex;
    flex-direction: column;
    padding: 16px 16px 16px 16px;
    border: 1px solid #23262f;
    background: linear-gradient(0deg, #23262f, #23262f),
      conic-gradient(
        from 45.08deg at 50.17% 49.69%,
        #1d2027 0deg,
        #23262f 360deg
      );
    border-radius: 8px;
    &-t {
      display: flex;
      &-icon {
        img {
          height: 72px;
          margin-right: 8px;
        }
      }
      &-info {
        display: flex;
        flex-direction: column;
        &-title {
          display: flex;
          justify-content: space-between;
          span:nth-child(1) {
            font-size: 16px;
            font-weight: 800;
            color: #f9bc01;
          }
          span:nth-child(2) {
            font-size: 12px;
            font-weight: 400;
            color: #fff;
          }
        }
        &-content {
          font-size: 12px;
          font-weight: 400;
          color: #7782aa;
        }
      }
    }
    &-m {
      display: flex;
      flex-direction: column;
      width: 100%;
      &-title {
        // display: flex;
        // justify-content: flex-end;
        font-size: 12px;
        font-weight: 700;
        width: 100%;
        text-align: right;

        &-price {
          color: #f9bc01;
        }
      }
      &-info {
        display: flex;
        justify-content: space-between;
        span {
          width: 90px;
          font-size: 14px;
          font-weight: 400;
          color: #fff;
        }
        &-rate {
          width: 100%;
          &-color {
            ::v-deep(.v-progress-linear__determinate) {
              background: #f9bc01;
              border-radius: 20px;
            }
            ::v-deep(.v-progress-linear__background) {
              border-radius: 20px;
              background: #15161c;
              box-shadow: 0px 0px 6px 1px #00000059 inset;
              opacity: 1;
            }
          }
        }
      }
    }
    &-b {
      display: flex;
      flex-direction: column;
      &-title {
        // display: flex;
        // justify-content: flex-end;
        font-size: 12px;
        font-weight: 700;
        width: 100%;
        text-align: right;
        &-price {
          span:nth-child(1) {
            color: #7782aa;
          }
          span:nth-child(2) {
            color: #009b3a;
          }
          span:nth-child(3) {
            color: #009b3a;
          }
        }
      }
      &-info {
        display: flex;
        justify-content: space-between;
        span {
          width: 90px;
          font-size: 14px;
          font-weight: 400;
          color: #fff;
        }
        &-rate {
          width: 100%;
          &-color {
            ::v-deep(.v-progress-linear__determinate) {
              background: #009b3a;
              border-radius: 20px;
            }
            ::v-deep(.v-progress-linear__background) {
              border-radius: 20px;
              background: #15161c;
              box-shadow: 0px 0px 6px 1px #00000059 inset;
              opacity: 1;
            }
          }
        }
      }
    }
    .progress-main-card-division {
      margin-bottom: 16px;
    }
    .progress-main-card-rule {
      position: relative;
      .title {
        font-family: Inter;
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #7782AA;
      }
      .rule-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
      }
      .rule-bopttom {
        display: flex;
        justify-content: space-between;
        padding-right: 50px;
        .rule-item {
          .label {
            font-size: 12px;
            font-weight: 700;
            line-height: 15px;
            text-align: left;
            color: #7782AA;
          }
          .content {
            height: 14px;
            line-height: 14px;
            
            span:first-child {
              font-size: 12px;
              font-weight: 700;
              line-height: 14px;
              text-align: left;
              color: #fff;
            }
            span:last-child {
              font-size: 10px;
              font-weight: 400;
              line-height: 12px;
              text-align: left;
              color: #7782AA;
            }
          }
        }
      }

      .m-vip--illustrate {
        position: absolute;
        top: 0px;
        right: 10px;
        width: 100%;
        height: 16px;
        // margin-top: 15px;
        text-align: right;
        // position: relative;
        padding-right: 7px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  &-reward {
    position: relative;
    height: 104px;
    z-index: auto;
    margin: 6px -8px 10px -8px;
    &-bg {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 16px 32px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 104px;
      background-image: url("@/assets/public/svg/img_public_26.svg");
      background-size: 100%;
      z-index: 9;
      &-t {
        display: flex;
        justify-content: space-between;
        .available-button {
          background: #23262f !important;
          box-shadow: 0px 4px 6px 1px #0000004d !important;
          color: #7782aa !important;
        }
        span:nth-child(1) {
          font-size: 12px;
          font-weight: 400;
          color: #fff;
        }
        span:nth-child(2) {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 112px;
          height: 32px;
          border-radius: 8px;
          background: #f9bc01;
          font-size: 12px;
          font-weight: 700;
          color: #000;
          cursor: pointer;
        }
      }
      &-b {
        font-size: 18px;
        font-weight: 700;
        color: #fff;
      }
    }
    &-svg {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      width: 170px;
      height: 44px;
      right: 14px;
      bottom: 0px;
      background-image: url("@/assets/vip/image/Rectangle_2428.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 8;
      padding-top: 14px;
      img {
        width: 12px;
        height: 12px;
        margin-right: 10px;
      }
      span {
        font-size: 10px;
        font-weight: 400;
        color: #fff;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    &-view {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      width: 170px;
      height: 44px;
      right: 14px;
      bottom: 0px;
      z-index: 10;
      padding-top: 14px;
      img {
        width: 12px;
        height: 12px;
        margin-right: 10px;
      }
      span {
        font-size: 10px;
        font-weight: 400;
        color: #fff;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  &-tip {
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 104px;
    border-radius: 8px;
    background: #1d2027;
    &-title {
      display: flex;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
    }
    &-content {
      width: 86%;
      margin: 4px auto;
      font-size: 10px;
      font-weight: 400;
      color: #7782aa;
    }
    &-button {
      display: flex;
      justify-content: center;
      span:nth-child(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 112px;
        height: 32px;
        border-radius: 8px;
        background: #009b3a;
        box-shadow: 0px 4px 6px 1px #0000004d;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
      }
      span:nth-child(2) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 112px;
        height: 32px;
        border-radius: 8px;
        background: #009b3a;
        box-shadow: 0px 4px 6px 1px #0000004d;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        margin-left: 16px;
        cursor: pointer;
      }
    }
  }
  &-group {
    display: flex;
    flex-direction: column;
    // height: 168px;
    background: #1d2027;
    border-radius: 8px;
    margin-top: 12px;
    padding: 24px 16px;
    &-t {
      display: flex;
      align-items: center;
      &-icon {
        margin-right: 24px;
        width: 44px;
        height: 44px;
        background: rgba(22, 130, 241, 1);
        border-radius: 50%;
        filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.4));
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        img {
          width: 28px;
          height: 28px;
        }
      }
      &-info {
        display: flex;
        flex-direction: column;
        span:nth-child(1) {
          font-size: 24px;
          font-weight: 800;
          color: #fff;
        }
        span:nth-child(2) {
          font-size: 12px;
          font-weight: 400;
          color: #fff;
        }
      }
    }
    &-b {
      display: flex;
      justify-content: center;
      margin-top: 12px;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 240px;
        height: 40px;
        border-radius: 8px;
        background: #1682f1;
        font-size: 14px;
        font-weight: 800;
        color: #fff;
      }
    }
  }
  &-faq {
    ::v-deep(.el-collapse) {
      --el-collapse-header-bg-color: #1d2027;
      --el-collapse-content-bg-color: #1d2027;
      --el-collapse-header-text-color: #7782aa;
      --el-collapse-border-color: #1d2027;
      padding: 0 16px;
      background: #1d2027;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 400;
    }
    ::v-deep(.el-collapse-item__content) {
      font-size: 10px;
      font-weight: 400;
      color: #7782aa;
    }
    &-title {
      font-size: 16px;
      font-weight: 800;
      color: #fff;
      margin-top: 10px;
    }
    &-collapse {
      margin-top: 10px;
      ::v-deep(.el-collapse-item__header) {
        // line-height: 24px;
        height: fit-content;
      }
      ::v-deep(.el-collapse-item__arrow) {
        margin-right: 0;
      }
    }
  }
}



.faq-collapse-head {
  height: 49px;
  display: flex;
  align-items: center;
  p {
    line-height: 24px;
  }
}
</style>