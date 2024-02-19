<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from "vuetify";
import { type GetInvitaionBonusData } from "@/interface/affiliate/invite"
import { type GetBettingCommissionData } from "@/interface/affiliate/invite"
import Notification from "@/components/global/notification/index.vue";
import { appBarStore } from "@/store/appBar";
import { inviteStore } from '@/store/invite';
import { storeToRefs } from 'pinia';
import { ElNotification, getPositionDataWithUnit } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import { useToast } from "vue-toastification";
import * as clipboard from "clipboard-polyfill";
import MStatistics from "../components/mobile/Statistics.vue";
import MInvitePartner from "../components/mobile/InvitePartner.vue";
import MSocialCommunity from "../components/mobile/SocialCommunity.vue";
import MAchievementBonus from "../components/mobile/AchievementBonus.vue";
import MInviteFooter from "../components/mobile/InviteFooter.vue";
import MCommission from "../components/mobile/Commission.vue";

const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { dispatchUserInvite } = inviteStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();


const { t } = useI18n();
const { width } = useDisplay();
const inviteList = ref([
    {
        title: "Invitation URL:",
        content: "https://betfiery.com?referralcode=62737..."
    },
    {
        title: "Copy the invitation code",
        content: "6273728f800a98d4025a3073"
    }
])
const revenuCashMenuShow = ref<boolean>(false);
const commissionMenuShow = ref<boolean>(false);
const morePeople = ref<number>(1025);

const invitationBonusItem = ref({
    cash: "R$ 40.496.845",
    content: "8099369 people received"
})

const bettingCommissionItem = ref({
    cash: "R$ 38.776.550",
    content: "7755310 people received",
})
const bonusDialog = ref<boolean>(false);
const slider = ref<number>(0);
const min = 0;
const max = 101;


const mobileWidth = computed(() => {
    return width.value;
})

const invitationBonusList = ref<GetInvitaionBonusData[]>([
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    },
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    },
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    },
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    },
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    }
])

const inviteItem = computed(() => {
    const { getInviteItem } = storeToRefs(inviteStore());
    return getInviteItem.value
})

watch(slider, (newValue) => {
    if (slider.value > 97) {
      slider.value = 97;
    }
})

const closeBonusDialog = () => {
    setMainBlurEffectShow(false);
    setHeaderBlurEffectShow(false);
    setMenuBlurEffectShow(false);
    bonusDialog.value = false;
}

window.addEventListener('scroll', function () {
    revenuCashMenuShow.value = false;
    commissionMenuShow.value = false;
});

const bonusDialogShow = () => {
    bonusDialog.value = true
    setMainBlurEffectShow(true);
    setHeaderBlurEffectShow(true);
    setMenuBlurEffectShow(true);
    // setOverlayScrimShow(true);
}

onMounted(async () => {
    await dispatchUserInvite();
})
</script>
<template>
  <!-- User Statistics Component -->
  <MStatistics :inviteItem="inviteItem" />

  <!-- Invite Partner Component -->
  <MInvitePartner :inviteItem="inviteItem" />

  <!-- Social Community Component -->
  <MSocialCommunity />

  <v-row class="justify-center mt-6 text-800-14 white">
    {{ t("affiliate.invite.premiums_text") }}
  </v-row>
  <v-card class="invite-right-card-bg mt-5 mx-3 pa-3 py-5">
    <v-row>
      <v-col cols="12" md="4" lg="4">
        <v-row class="align-center">
          <v-col cols="5" class="text-center">
            <img src="@/assets/public/image/img_public_07.png" width="102" height="76" />
          </v-col>
          <v-col cols="7" class="pt-0 text-right">
            <div class="text-700-14 white">
              {{ t("affiliate.invite.invitation_bonus") }}
            </div>
            <div class="text-800-14 yellow">{{ invitationBonusItem.cash }}</div>
            <div class="text-400-14 white">{{ invitationBonusItem.content }}</div>
          </v-col>
        </v-row>
        <v-row class="mx-0">
          <v-table class="invitation-bonus-table-bg" theme="dark">
            <tbody class="m-invite-url-title">
              <tr v-for="(item, index) in invitationBonusList" :key="index">
                <td class="text-400-10 gray">{{ item.id }}</td>
                <td class="text-400-10 gray">{{ item.content }}</td>
                <td class="text-800-10 yellow" style="min-width: 60px">
                  {{ item.cash }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-row class="align-center">
          <v-col cols="5" class="text-center">
            <img src="@/assets/public/image/img_public_03.png" width="92" height="61" />
          </v-col>
          <v-col cols="7" class="text-right pt-0">
            <div class="text-700-14 white">
              {{ t("affiliate.invite.betting_commision") }}
            </div>
            <div class="text-800-14 yellow">{{ bettingCommissionItem.cash }}</div>
            <div class="text-400-14 white">{{ bettingCommissionItem.content }}</div>
          </v-col>
        </v-row>
        <v-row class="mx-0">
          <v-table class="invitation-bonus-table-bg" theme="dark">
            <tbody class="m-invite-url-title">
              <tr v-for="(item, index) in invitationBonusList" :key="index">
                <td class="text-400-10 gray">{{ item.id }}</td>
                <td class="text-400-10 gray">{{ item.content }}</td>
                <td class="text-800-10 yellow" style="min-width: 60px">
                  {{ item.cash }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" lg="4" class="text-center">
        <p class="text-700-14 white">{{ t("affiliate.invite.how_does_work") }}</p>
        <p class="text-700-14 yellow mt-4">
          {{ t("affiliate.invite.invitation_bonus") }}
        </p>
        <div class="mt-4">
          <span class="text-400-12 white">{{
            t("affiliate.invite.how_does_content_1")
          }}</span>
          <span class="text-700-12 yellow">$12</span>
          <span class="text-400-12 white">{{
            t("affiliate.invite.how_does_content_2")
          }}</span>
        </div>
        <img
          src="@/assets/affiliate/invite/image/img_agent_01.png"
          class="mt-4"
          style="margin-bottom: -27px !important"
          width="228"
        />
      </v-col>
    </v-row>
  </v-card>

  <v-row class="mt-6 justify-center mx-16">
    <div class="text-700-14 white text-center relative">
      {{ t("affiliate.invite.commission_title_text") }}
      <v-menu v-model="commissionMenuShow">
        <template v-slot:activator="{ props }">
          <img
            src="@/assets/public/svg/icon_public_22.svg"
            v-bind="props"
            style="cursor: pointer; position: absolute; top: 2px; right: -21px"
            width="16"
          />
        </template>
        <v-list
          theme="dark"
          bg-color="#1D2027"
          class="px-2"
          :width="mobileWidth > 600 ? 471 : mobileWidth - 30"
          style="margin: 0px 8px 0px 3px"
        >
          <v-list-item class="pt-4">
            <div class="text-center text-400-12 gray">
              {{ t("affiliate.invite.help_text_2") }}
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-row>

  <!-- Commission Component -->
  <MCommission />

  <!-- Invite Footer Component -->
  <MInviteFooter />
</template>
<style lang="scss">
.m-prev-btn-position {
  height: 24px !important;
  width: 24px !important;
  background: black !important;
  top: -63px;

  .v-btn__content {
    .v-icon {
      font-size: 16px !important;
    }
  }
}

@media (max-width: 600px) {
  .v-slider-thumb__surface {
    width: 32px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 30px;
    background: var(--primary-button-32-cfec, #009B3A);
    box-shadow: 0px 3px 2px 1px rgba(0, 0, 0, 0.11);
  }

  .v-slider-thumb__ripple {
    width: 38px !important;
    left: -2.7px !important;
    height: 25px !important;
    top: -2px !important;
    border-radius: 32px !important;
    filter: blur(0.3px);
  }

  .v-slider.v-input--horizontal .v-slider-track__background {
    height: 2px !important;
  }

  .v-slider-thumb__surface::before {
    visibility: hidden;
  }
  .v-slider-thumb--pressed > div {
    background-color: #009B3A;
  }
}

.m-next-btn-position {
  height: 24px !important;
  width: 24px !important;
  background: black !important;
  top: -63px;

  .v-btn__content {
    .v-icon {
      font-size: 16px !important;
    }
  }
}

.m-invite-partner-text {
  color: var(--logo-f-9-bc-01, #f9bc01);
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.m-invite-url-item {
  margin: 16px 12px !important;
  background-color: #1D2027 !important;
  padding: 4px 8px !important;
  border-radius: 8px !important;
}

.m-invite-url-copy-btn {
  border-radius: 4px;
  background: var(--secondary-button-353652, #23262F);
}

.invite-receive-btn {
  background: #23262F !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 16px !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  color: #ffffff !important;
}

.m-invite-url-title {
  color: var(--sec-text-7782-aa, #7782aa);
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.footer-text-7 {
  font-weight: 700;
  font-size: 14px;
  color: #7782aa;
}

.footer-url-text {
  font-weight: 800;
  font-size: 16px;
  color: #1acb51;
}

.m-invite-border {
  border-right: 2px solid #23262F;
}

.invite-right-card-bg {
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%) !important;
}

.invite-revenu-text {
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
}

.m-invite-revenu-cash-text {
  font-weight: 700;
  font-size: 18px;
  color: #f9bc01;
}

.invite-more-people-value-text {
  font-weight: 500;
  font-size: 12px;
  color: #f9bc01;
}

.invite-more-people-text {
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
}

.premiums-text {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
}

.invitation-bonus-text {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
}

.invitation-bonus-text-1 {
  font-weight: 800;
  font-size: 16px;
  color: #f9bc01;
}

.invitation-bonus-text-2 {
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
}

.invitation-bonus-table-bg {
  background-color: #1D2027 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.invitation-bonus-cash-text {
  font-weight: 800;
  color: #f9bc01;
}

.invite-how-text-1 {
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
}

.invite-how-text-2 {
  font-weight: 400;
  font-size: 14px;
  color: #f9bc01;
}

.achivement-bonus-text {
  font-weight: 400;
  font-size: 16px;
  color: #7782aa;
}

.v-carousel__controls {
  height: 12px !important;

  .v-btn {
    width: 6px !important;
    height: 6px !important;
    margin-right: 6px !important;
  }

  .v-btn__content {
    font-size: 6px;
    color: #7782aa;
  }

  .v-btn--active {
    .v-btn__content {
      font-size: 6px;
      width: 18px !important;
      color: #ffffff !important;
    }
  }
}

.invite-carousel-card-pd {
  padding: 0px 40px !important;
}

.m-invite-carousel-card-header {
  width: 216px;
  height: 178px;
  flex-shrink: 0;
  border-radius: 30px 30px 8px 8px;
  background: #6aa82d;

  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

.m-invite-carousel-card {
  margin-left: auto !important;
  margin-right: auto !important;
  width: 216px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #1D2027;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  overflow: inherit !important;
}

.m-invite-carousel-header-img {
  position: absolute;
  top: -19px;
  left: 50%;
  transform: translateX(-50%);
  width: 74px;
  height: 104px;
}

.m-invite-carousel-header-rate {
  width: 80%;
  position: absolute;
  top: 138px;
  left: 50%;
  transform: translateX(-50%);
}

.m-invite-carousel-header-text {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 800;
  font-size: 14px;
  color: #ffffff;
}

.m-invite-carousel-body-text {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 187px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 800;
  font-size: 28px;
  color: #f9bc01;
}

.m-invite-carousel-btn {
  margin-top: 60px;

  .v-btn__content {
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    // line-height: 16.94px;
  }
}

.commission-content-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #7782aa;
  text-align: center;
}

.m-footer-body-bg {
  margin-top: -7px;
  background: #1D2027;
  border-radius: 8px;
}

.footer-body-cash-text {
  font-weight: 800;
  font-size: 32px;
  color: #f9bc01;
}

.invite-footer-card-bg {
  background: linear-gradient(90deg, #de8245 0%, #d84594 100%) !important;
  border-radius: 8px !important;
}

.bonus-progress {
  .v-progress-linear__determinate {
    border-radius: 30px;
    background: linear-gradient(180deg, #6d44f8 0%, #5726fc 100%);
  }
}

.bonus-progress-bg .v-progress-linear {
  background: #1D2027 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 20px !important;
}
.m-invite-img-3 {
  margin-bottom: -20px;
}

.Vue-Toastification__container {
  right: 0 !important;
  left: unset !important;
  width: 290px !important;
  margin-right: 37px;
  height: 60px !important;
  //flex-direction: unset!important;
}
.Vue-Toastification__toast {
  align-items: center !important;
  z-index: 1000000000 !important;
  top: 70px;
  right: -20px !important;
  width: 320px !important;
  height: 60px;
  border: none;
  border-radius: 16px 0px 0px 16px;
  background: var(--bg-2, #181522);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.Vue-Toastification__toast-body {
  color: var(--sec-text, #7782aa);
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
}

.Vue-Toastification__close-button {
  top: 22px !important;
  background-image: url("@/assets/public/svg/icon_public_52.svg");
  background-repeat: no-repeat;
  background-size: 18px;
  color: transparent;
  opacity: 1;
}
</style>
