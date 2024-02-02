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
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import { useToast } from "vue-toastification";

const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { dispatchUserInvite } = inviteStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();


const { t } = useI18n();
const { width } = useDisplay();

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
  <v-card color="#1D2027" class="mt-5 mx-3 px-3 pt-4">
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
          <v-sheet color="#1D2027" height="100%" tile>
            <v-row align="center" justify="center" class="mx-10 justify-center">
              <v-col
                v-for="(i, index) in 3"
                :key="index"
                cols="4"
                v-if="mobileWidth > 960"
              >
                <v-card color="#1D2027" class="mt-4 relative m-invite-carousel-card">
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
                <v-card color="#1D2027" class="mt-4 relative m-invite-carousel-card">
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
                <v-card color="#1D2027" class="mt-4 relative m-invite-carousel-card">
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
</template>

<style lang="scss"></style>
