<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from "vuetify";
import { type GetInvitaionBonusData } from "@/interface/affiliate/invite"
import { type GetBettingCommissionData } from "@/interface/affiliate/invite"
import Notification from "@/components/global/notification/index.vue";
import BonusDialog from "./../bonus_dailog/index.vue";
import MBonusDialog from "./../bonus_dailog/mobile/index.vue";
import { appBarStore } from "@/store/appBar";
import { inviteStore } from '@/store/invite';
import { storeToRefs } from 'pinia';
import { ElNotification, getPositionDataWithUnit } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import { useToast } from "vue-toastification";

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
const inviteUserValue = ref<number>(44057);
const depositUserValue = ref<number>(3963);
const revenuCashMenuShow = ref<boolean>(false);
const commissionMenuShow = ref<boolean>(false);
const bonusTodayValue = ref<string>("R$ 55.44");
const bonusYesterdayValue = ref<string>("R$ 98.02");
const revenuCash = ref<string>("R$ 415.740");
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
const slides = ref([
    [
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_09.png", import.meta.url).href,
            grade: 3,
            totalGrade: 3,
            rate: 100,
            cash: "R$ 10",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_08.png", import.meta.url).href,
            grade: 3,
            totalGrade: 10,
            rate: 30,
            cash: "R$ 30",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_07.png", import.meta.url).href,
            grade: 3,
            totalGrade: 25,
            rate: 20,
            cash: "R$ 60",
        },
    ],
    [
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_08.png", import.meta.url).href,
            grade: 3,
            totalGrade: 10,
            rate: 30,
            cash: "R$ 30",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_09.png", import.meta.url).href,
            grade: 3,
            totalGrade: 3,
            rate: 100,
            cash: "R$ 10",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_07.png", import.meta.url).href,
            grade: 3,
            totalGrade: 25,
            rate: 20,
            cash: "R$ 60",
        },
    ],
    [
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_07.png", import.meta.url).href,
            grade: 3,
            totalGrade: 25,
            rate: 20,
            cash: "R$ 60",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_08.png", import.meta.url).href,
            grade: 3,
            totalGrade: 10,
            rate: 30,
            cash: "R$ 30",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_09.png", import.meta.url).href,
            grade: 3,
            totalGrade: 3,
            rate: 100,
            cash: "R$ 10",
        },
    ],
]);

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

const notificationShow = ref<boolean>(false);
const notificationText = ref<string>("");
const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const inviteItem = computed(() => {
    const { getInviteItem } = storeToRefs(inviteStore());
    return getInviteItem.value
})

watch(inviteItem, (newValue) => {

})

watch(slider, (newValue) => {
    if (slider.value > 97) {
      slider.value = 97;
    }
})

const inviteUrlCopy = () => {
    notificationText.value = "Successful replication"
    notificationShow.value = !notificationShow.value;
    if(notificationShow.value) {
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 5000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: SuccessIcon,
        rtl: false,
      });
    }
}

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
  <v-row class="mx-4 mt-2 align-center">
    <v-col cols="12" md="5" lg="5" class="ma-0 pa-0" style="height: 100%">
      <v-card color="#29253C" theme="dark" class="text-center pb-4">
        <p class="mt-3 m-invite-partner-text text-center">
          {{ t("affiliate.invite.invite_partner") }}
        </p>
        <v-list-item
          class="m-invite-url-item"
          v-for="(item, index) in inviteList"
          :key="index"
          style="height: 40px"
        >
          <v-list-item-title class="ml-4 text-left" style="line-height: 20px">
            <div class="text-400-10 gray">{{ item.title }}</div>
            <div class="text-600-12">{{ item.content }}</div>
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
              icon=""
              @click="inviteUrlCopy"
              class="m-invite-url-copy-btn"
              bg-color="#353652"
              width="24"
              height="24"
            >
              <img src="@/assets/public/svg/icon_public_71.svg" width="16" />
            </v-btn>
          </template>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="7" lg="7" class="mt-3 pa-0">
      <v-card color="#1C1929" class="pa-3 m-invite-card-1">
        <v-row>
          <v-col cols="6" md="3" lg="3" class="m-invite-border text-center py-0 my-3">
            <div class="m-invite-url-title">{{ t("affiliate.invite.invited_user") }}</div>
            <div class="m-invite-url-right-text mt-2">{{ inviteUserValue }}</div>
          </v-col>
          <v-col
            cols="6"
            md="3"
            lg="3"
            class="text-center py-0 my-3"
            :class="[mobileWidth < 960 ? '' : 'm-invite-border']"
          >
            <div class="m-invite-url-title">{{ t("affiliate.invite.deposit_user") }}</div>
            <div class="m-invite-url-right-text mt-2">{{ depositUserValue }}</div>
          </v-col>
          <v-col cols="6" md="3" lg="3" class="m-invite-border text-center py-0 my-3">
            <div class="m-invite-url-title">{{ t("affiliate.invite.bonus_today") }}</div>
            <div class="m-invite-url-right-text mt-2">{{ bonusTodayValue }}</div>
          </v-col>
          <v-col cols="6" md="3" lg="3" class="text-center py-0 my-3">
            <div class="m-invite-url-title">
              {{ t("affiliate.invite.bonus_yesterday") }}
            </div>
            <div class="m-invite-url-right-text mt-2">{{ bonusYesterdayValue }}</div>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mt-5 pa-5 invite-right-card-bg">
        <v-row class="align-center mx-2">
          <v-col cols="8" class="pa-2">
            <div class="text-700-16 white">
              {{ t("affiliate.invite.monthly_revenu_goal") }}
            </div>
          </v-col>
          <v-col cols="4" class="text-right pa-0 pt-2">
            <img src="@/assets/public/image/img_public_06.png" width="74" height="69" />
          </v-col>
        </v-row>
        <v-row class="mx-2 my-0">
          <v-col cols="12">
            <div class="d-flex mt-2">
              <div class="m-invite-revenu-cash-text">{{ revenuCash }}</div>
              <v-menu v-model="revenuCashMenuShow">
                <template v-slot:activator="{ props }">
                  <img
                    src="@/assets/public/svg/icon_public_22.svg"
                    class="ml-4"
                    v-bind="props"
                    width="16"
                  />
                </template>
                <v-list
                  theme="dark"
                  bg-color="#211F31"
                  class="px-2"
                  :width="mobileWidth > 600 ? 471 : mobileWidth - 30"
                  style="margin: 0px 2px 0px -15px"
                >
                  <v-list-item class="pt-4">
                    <div class="text-center text-400-12 gray">
                      {{ t("affiliate.invite.help_text_1") }}
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div>
              <span class="text-500-10 yellow">{{ morePeople }}</span>
              <span class="text-500-10 white">{{
                t("affiliate.invite.more_people_text")
              }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
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
  <v-card color="#29253C" class="mt-5 mx-3 px-3 pt-4">
    <v-row class="justify-center mt-1">
      <div class="text-700-14 white">{{ t("affiliate.invite.achivement_bonus") }}</div>
      <img
        src="@/assets/public/svg/icon_public_22.svg"
        class="ml-4"
        style="cursor: pointer"
        @click="bonusDialogShow"
        width="16"
      />
    </v-row>
    <v-dialog
      v-model="bonusDialog"
      :width="mobileWidth < 600 ? 328 : 471"
      @click:outside="closeBonusDialog"
    >
      <BonusDialog @close="closeBonusDialog" v-if="mobileWidth > 600" />
      <MBonusDialog @close="closeBonusDialog" v-else />
    </v-dialog>
    <v-row class="justify-center mx-2">
      <v-col cols="12">
        <p class="text-400-12 gray">
          {{ t("affiliate.invite.achivement_bonus_text_1") }}
        </p>
      </v-col>
    </v-row>
    <!-- card carousel -->
    <v-row class="mt-10">
      <v-carousel
        interval="6000"
        height="386"
        hide-delimiter-background
        hide-delimiters
        show-arrows="hover"
      >
        <!-- prev, next button hide when slides array length is less than 2 -->
        <template v-slot:prev="{ props }">
          <v-btn
            class="button-carousel text-none m-prev-btn-position"
            icon="mdi-chevron-left"
            @click="props.onClick"
            v-if="slides.length > 1"
            style="width: 24px !important; height: 24px !important"
          >
          </v-btn>
        </template>
        <template v-slot:next="{ props }">
          <v-btn
            class="button-carousel text-none m-next-btn-position"
            variant="elevated"
            icon="mdi-chevron-right"
            @click="props.onClick"
            v-if="slides.length > 1"
            style="width: 24px !important; height: 24px !important"
          >
          </v-btn>
        </template>
        <v-carousel-item v-for="(slide, slideIndex) in slides" :key="slideIndex">
          <v-sheet color="#29253C" height="100%" tile>
            <v-row align="center" justify="center" class="mx-10 justify-center">
              <v-col
                v-for="(i, index) in 3"
                :key="index"
                cols="4"
                v-if="mobileWidth > 960"
              >
                <v-card color="#211F31" class="mt-4 relative m-invite-carousel-card">
                  <div class="m-invite-carousel-card-header"></div>
                  <img
                    :src="slide[index].headerImg"
                    class="m-invite-carousel-header-img"
                  />
                  <div class="m-invite-carousel-header-text">
                    {{ t("affiliate.invite.agent_realization_text") }}
                    {{ slide[index].totalGrade }}
                  </div>
                  <div class="m-invite-carousel-header-rate bonus-progress-bg">
                    <v-progress-linear
                      v-model="slide[index].rate"
                      height="21"
                      class="bonus-progress"
                    >
                      <div class="text-800-14 white">
                        <Font class="active">{{ slide[index].grade }} / </Font>
                        {{ slide[index].totalGrade }}
                      </div>
                    </v-progress-linear>
                  </div>
                  <div class="m-invite-carousel-body-text" style="font-size: 28px">
                    {{ slide[index].cash }}
                  </div>
                  <div class="text-center">
                    <v-btn
                      class="m-invite-carousel-btn text-none"
                      width="176"
                      height="42"
                      :class="[
                        slide[index].grade == 3 ? 'button-bright' : 'invite-receive-btn',
                      ]"
                    >
                      {{ t("affiliate.invite.receive_btn_text") }}
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
              <v-col
                v-for="(i, index1) in 2"
                :key="index1"
                cols="6"
                v-else-if="mobileWidth > 600 && mobileWidth <= 960"
              >
                <v-card color="#211F31" class="mt-4 relative m-invite-carousel-card">
                  <div class="m-invite-carousel-card-header"></div>
                  <img
                    :src="slide[index1].headerImg"
                    class="m-invite-carousel-header-img"
                  />
                  <div class="m-invite-carousel-header-text">
                    {{ t("affiliate.invite.agent_realization_text") }}
                    {{ slide[index1].grade }}
                  </div>
                  <div class="m-invite-carousel-header-rate bonus-progress-bg">
                    <v-progress-linear
                      v-model="slide[index1].rate"
                      height="21"
                      class="bonus-progress"
                    >
                      <div class="text-800-14 white">
                        <Font class="active">{{ slide[index1].grade }} / </Font>
                        {{ slide[index1].totalGrade }}
                      </div>
                    </v-progress-linear>
                  </div>
                  <div class="m-invite-carousel-body-text" style="font-size: 28px">
                    {{ slide[index1].cash }}
                  </div>
                  <div class="text-center">
                    <v-btn
                      class="m-invite-carousel-btn text-none"
                      width="176"
                      height="42"
                      :class="[
                        slide[index1].grade == 3 ? 'button-bright' : 'invite-receive-btn',
                      ]"
                    >
                      {{ t("affiliate.invite.receive_btn_text") }}
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
              <v-col v-for="(i, index2) in 1" :key="index2" cols="12" v-else>
                <v-card color="#211F31" class="mt-4 relative m-invite-carousel-card">
                  <div class="m-invite-carousel-card-header"></div>
                  <img
                    :src="slide[index2].headerImg"
                    class="m-invite-carousel-header-img"
                  />
                  <div class="m-invite-carousel-header-text">
                    {{ t("affiliate.invite.agent_realization_text") }}
                    {{ slide[index2].grade }}
                  </div>
                  <div class="m-invite-carousel-header-rate bonus-progress-bg">
                    <v-progress-linear
                      v-model="slide[index2].rate"
                      height="21"
                      class="bonus-progress"
                    >
                      <div class="text-800-14 white">
                        <Font class="active">{{ slide[index2].grade }} / </Font>
                        {{ slide[index2].totalGrade }}
                      </div>
                    </v-progress-linear>
                  </div>
                  <div class="m-invite-carousel-body-text" style="font-size: 28px">
                    {{ slide[index2].cash }}
                  </div>
                  <div class="text-center">
                    <v-btn
                      class="m-invite-carousel-btn text-none"
                      width="176"
                      height="42"
                      :class="[
                        slide[index2].grade == 3 ? 'button-bright' : 'invite-receive-btn',
                      ]"
                    >
                      {{ t("affiliate.invite.receive_btn_text") }}
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
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
          bg-color="#211F31"
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
  <v-row class="mt-4 justify-center px-10">
    <div class="text-400-12 gray text-center">
      {{ t("affiliate.invite.commission_content_text") }}
    </div>
  </v-row>
  <v-card class="invite-right-card-bg mt-5 mx-3 pa-3 py-5">
    <v-row class="mx-0">
      <v-col cols="12" md="6" lg="6">
        <div class="text-700-14 white">{{ t("affiliate.invite.invite_text_1") }}</div>
        <div class="text-400-12 white mt-4">
          {{ t("affiliate.invite.invite_text_2") }}
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_3_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_3_2") }}</span>
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_4_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_4_2") }}</span>
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_5_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_5_2") }}</span>
        </div>
        <img
          src="@/assets/affiliate/invite/image/img_agent_19.png"
          class="mt-6"
          style="width: 100%; max-width: 630px"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6" class="text-center">
        <img
          src="@/assets/affiliate/invite/image/img_agent_02.png"
          class="mt-1"
          style="width: 80%; max-width: 410px"
        />
        <div class="m-footer-body-bg">
          <div class="text-700-12 white pt-4">
            {{ t("affiliate.invite.invite_text_6") }}
          </div>
          <div class="footer-body-cash-text pt-2" style="font-size: 26px">
            R$ {{ Math.ceil(slider) }}
          </div>
          <div class="text-400-10 gray mx-2">
            <span>{{ t("affiliate.invite.invite_text_7") }}</span>
            <Font color="#F9BC01" class="text-800-10">{{ Math.ceil(slider) }}</Font>
            <span>{{ t("affiliate.invite.invite_text_8") }}</span>
          </div>
          <div class="mx-2 py-3">
            <v-slider
              v-model="slider"
              color="#32CFEC"
              class="align-center"
              rounded="rounded-xl"
              :max="max"
              :min="min"
              hide-details
            >
            </v-slider>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
  <v-card class="invite-footer-card-bg mt-5 mx-3 pa-3 py-5">
    <v-row class="mx-1 align-center">
      <v-col cols="12" md="6" lg="6">
        <div class="mt-4 text-800-12 white">
          {{ t("affiliate.invite.invite_text_9") }}
        </div>
        <div class="mt-4 text-500-12 white">
          {{ t("affiliate.invite.invite_text_10") }}
        </div>
        <div class="mt-4 text-800-12 color-1ACB51">
          {{ t("affiliate.invite.invite_text_11") }}
        </div>
        <div class="mt-4 text-500-12 white">
          {{ t("affiliate.invite.invite_text_12") }}
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="6" class="d-flex align-center justify-center">
        <img
          src="@/assets/affiliate/invite/image/img_agent_03.png"
          class="mt-4 m-invite-img-3"
          width="281"
        />
      </v-col>
    </v-row>
  </v-card>
  <!-- <Notification
    :notificationShow="notificationShow"
    :notificationText="notificationText"
    :checkIcon="checkIcon"
  /> -->
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
    background: var(--primary-button-32-cfec, #32cfec);
    box-shadow: 0px 3px 2px 1px rgba(0, 0, 0, 0.11);
  }

  .v-slider-thumb__ripple {
    width: 38px !important;
    left: -2.7px !important;
    height: 25px;
    top: -2px;
    border-radius: 32px;
    filter: blur(0.3px);
  }

  .v-slider.v-input--horizontal .v-slider-track__background {
    height: 2px;
  }

  .v-slider-thumb__surface::before {
    visibility: hidden;
  }
  .v-slider-thumb--pressed > div {
    background-color: #32cfec;
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
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.m-invite-url-item {
  margin: 16px 12px !important;
  background-color: #211f31 !important;
  padding: 4px 8px !important;
  border-radius: 12px !important;
}

.m-invite-url-copy-btn {
  border-radius: 4px;
  background: var(--secondary-button-353652, #353652);
}

.m-invite-card-1 {
  border-radius: 8px;
  background: var(--bg-51-c-1929, #1c1929);

  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

.invite-receive-btn {
  background: #353652 !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 16px !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  color: #ffffff !important;
}

.m-invite-url-title {
  color: var(--sec-text-7782-aa, #7782aa);
  font-family: Inter;
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
  border-right: 2px solid #414968;
}

.m-invite-url-right-text {
  font-weight: 800;
  font-size: 12px;
  color: #ffffff;
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
  background-color: #211f31 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 12px !important;
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
  background: #29253c;

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
    font-family: Inter;
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
  background: #211f31;
  border-radius: 12px;
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
  background: #211f31 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 20px !important;
}
.m-invite-img-3 {
  margin-bottom: -20px;
}

.Vue-Toastification__container {
  right: 0!important;
  left: unset!important;;
  width: 290px!important;
  margin-right: 37px;
  height: 60px!important;
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
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
}

.Vue-Toastification__close-button{
  top: 22px !important;
  background-image: url("@/assets/public/svg/icon_public_52.svg");
  background-repeat: no-repeat;
  background-size: 18px;
  color: transparent;
  opacity: 1;
}
</style>
