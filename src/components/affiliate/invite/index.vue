<script lang="ts" setup>
import { onMounted } from 'vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from "vuetify";
import { type GetInvitaionBonusData } from "@/interface/affiliate/invite"
import { type GetBettingCommissionData } from "@/interface/affiliate/invite"
import Notification from "@/components/global/notification/index.vue";
import BonusDialog from "./bonus_dailog/index.vue";
import MBonusDialog from "./bonus_dailog/mobile/index.vue";

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
const revenuCashMenuShow = ref<boolean>(false);
const commissionMenuShow = ref<boolean>(false);
const min = 0;
const max = 100;
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

const inviteUrlCopy = () => {
    notificationText.value = "Successful replication"
    notificationShow.value = !notificationShow.value;
}

window.addEventListener('scroll', function () {
    revenuCashMenuShow.value = false;
    commissionMenuShow.value = false;
});

const closeBonusDialog = () => {
    bonusDialog.value = false;
}

onMounted(() => {
})
</script>
<template>
    <v-row class="mx-2 mt-2 align-center">
        <v-col cols="12" md="5" lg="5" class="ma-0 pa-0" style="height: 100%;">
            <v-card color="#29253C" theme="dark" class="text-center pb-4">
                <p class="ma-5 invite-partner-text">{{ t('affiliate.invite.invite_partner') }}</p>
                <v-list-item class="invite-url-item" v-for="(item, index) in inviteList" :key="index">
                    <v-list-item-title class="ml-4 text-left">
                        <div class="invite-url-title">{{ item.title }}</div>
                        <div>{{ item.content }}</div>
                    </v-list-item-title>
                    <template v-slot:append>
                        <v-btn icon="" @click="inviteUrlCopy">
                            <img src="@/assets/public/svg/icon_public_71.svg" />
                        </v-btn>
                    </template>
                </v-list-item>
            </v-card>
        </v-col>
        <v-col cols="12" md="7" lg="7">
            <v-card color="#1C1929" class="pa-5">
                <v-row>
                    <v-col cols="6" md="3" lg="3" class="invite-border text-center">
                        <div class="invite-url-title">{{ t('affiliate.invite.invited_user') }}</div>
                        <div class="invite-url-right-text mt-2">{{ inviteUserValue }}</div>
                    </v-col>
                    <v-col cols="6" md="3" lg="3" class="text-center" :class="[mobileWidth < 960 ? '' : 'invite-border']">
                        <div class="invite-url-title">{{ t('affiliate.invite.deposit_user') }}</div>
                        <div class="invite-url-right-text mt-2">{{ depositUserValue }}</div>
                    </v-col>
                    <v-col cols="6" md="3" lg="3" class="invite-border text-center">
                        <div class="invite-url-title">{{ t('affiliate.invite.bonus_today') }}</div>
                        <div class="invite-url-right-text mt-2">{{ bonusTodayValue }}</div>
                    </v-col>
                    <v-col cols="6" md="3" lg="3" class="text-center">
                        <div class="invite-url-title">{{ t('affiliate.invite.bonus_yesterday') }}</div>
                        <div class="invite-url-right-text mt-2">{{ bonusYesterdayValue }}</div>
                    </v-col>
                </v-row>
            </v-card>
            <v-card class="mt-5 pa-5 invite-right-card-bg">
                <v-row class="align-center" v-if="mobileWidth > 600">
                    <v-col cols="3" class="text-center pa-0">
                        <div class="invite-revenu-text">{{ t('affiliate.invite.monthly_revenu_goal') }}</div>
                    </v-col>
                    <v-col cols="3" class="text-center pa-0">
                        <img src="@/assets/public/image/img_public_06.png" width="92" height="84" />
                    </v-col>
                    <v-col cols="6" class="pa-0">
                        <div class="d-flex">
                            <div class="invite-revenu-cash-text">{{ revenuCash }}</div>
                            <v-menu v-model="revenuCashMenuShow">
                                <template v-slot:activator="{ props }">
                                    <img src="@/assets/public/svg/icon_public_22.svg" class="ml-4"
                                        style="cursor: pointer;" v-bind="props" />
                                </template>
                                <v-list theme="dark" bg-color="#211F31" width="400">
                                    <p class="pa-4 invite-url-title"> {{ t('affiliate.invite.help_text_1') }}</p>
                                </v-list>
                            </v-menu>
                        </div>
                        <div>
                            <span class="invite-more-people-value-text">{{ morePeople }}</span>
                            <span class="invite-more-people-text">{{ t('affiliate.invite.more_people_text') }}</span>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="align-center" v-else>
                    <v-col cols="8" class="pa-2">
                        <div class="invite-revenu-text">{{ t('affiliate.invite.monthly_revenu_goal') }}</div>
                        <div class="d-flex mt-2">
                            <div class="invite-revenu-cash-text">{{ revenuCash }}</div>
                            <v-menu v-model="revenuCashMenuShow">
                                <template v-slot:activator="{ props }">
                                    <img src="@/assets/public/svg/icon_public_22.svg" class="ml-4"
                                        v-bind="props" />
                                </template>
                                <v-list theme="dark" bg-color="#211F31" class="px-2" width="400">
                                    <p class="pa-4 invite-url-title"> {{ t('affiliate.invite.help_text_1') }}</p>
                                </v-list>
                            </v-menu>
                        </div>
                        <div>
                            <span class="invite-more-people-value-text">{{ morePeople }}</span>
                            <span class="invite-more-people-text">{{ t('affiliate.invite.more_people_text') }}</span>
                        </div>
                    </v-col>
                    <v-col cols="4" class="text-center pa-0">
                        <img src="@/assets/public/image/img_public_06.png" width="92" height="84" />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="justify-center mt-10 premiums-text">
        {{ t('affiliate.invite.premiums_text') }}
    </v-row>
    <v-card class="invite-right-card-bg mt-5 mx-3">
        <v-row>
            <div style = "display: flex; padding: 30px 20px 0px 20px;">
                <v-col cols="12" md="4" lg="4">
                    <v-row class="align-center">
                        <v-col cols="5" class="text-center">
                            <img src="@/assets/public/image/img_public_07.png" width="100" height="70" />
                        </v-col>
                        <v-col cols="7">
                            <div class="invitation-bonus-text">{{ t('affiliate.invite.invitation_bonus') }}</div>
                            <div class="invitation-bonus-text-1">{{ invitationBonusItem.cash }}</div>
                            <div class="invitation-bonus-text-2">{{ invitationBonusItem.content }}</div>
                        </v-col>
                    </v-row>
                    <v-row :class="[mobileWidth < 600 ? 'mx-1' : 'mx-1']">
                        <v-table class="invitation-bonus-table-bg" theme="dark">
                            <tbody class="invite-url-title">
                                <tr v-for="(item, index) in invitationBonusList" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.content }}</td>
                                    <td class="invitation-bonus-cash-text">{{ item.cash }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-row>
                </v-col>
                <v-col cols="12" md="4" lg="4">
                    <v-row class="align-center">
                        <v-col cols="5" class="text-center">
                            <img src="@/assets/public/image/img_public_03.png" width="100" height="70" />
                        </v-col>
                        <v-col cols="7">
                            <div class="invitation-bonus-text">{{ t('affiliate.invite.betting_commision') }}</div>
                            <div class="invitation-bonus-text-1">{{ bettingCommissionItem.cash }}</div>
                            <div class="invitation-bonus-text-2">{{ bettingCommissionItem.content }}</div>
                        </v-col>
                    </v-row>
                    <v-row :class="[mobileWidth < 600 ? 'mx-1' : 'mx-1']">
                        <v-table class="invitation-bonus-table-bg" theme="dark">
                            <tbody class="invite-url-title">
                                <tr v-for="(item, index) in invitationBonusList" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.content }}</td>
                                    <td class="invitation-bonus-cash-text">{{ item.cash }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-row>
                </v-col>
                <div class="text-center" style="margin-top: 16px!important;">
                    <p class="premiums-text">{{ t('affiliate.invite.how_does_work') }}</p>
                    <p class="invite-partner-text mt-4">{{ t('affiliate.invite.invitation_bonus') }}</p>
                    <div class="mt-4">
                        <span class="invite-how-text-1">{{ t('affiliate.invite.how_does_content_1') }}</span>
                        <span class="invite-how-text-2">$12</span>
                        <span class="invite-how-text-1">{{ t('affiliate.invite.how_does_content_2') }}</span>
                    </div>
                    <img src="@/assets/affiliate/invite/image/img_agent_01.png"  style = "margin-top: 60px!important;"/>
                </div>
            </div>
            
        </v-row>
    </v-card>
    <v-card color="#29253C" class="mt-5 mx-3 pa-3 py-5">
        <v-row class="justify-center">
            <div class="premiums-text">{{ t('affiliate.invite.achivement_bonus') }}</div>
            <img src="@/assets/public/svg/icon_public_22.svg" class="ml-4" style="cursor: pointer;"
                @click="bonusDialog = true" />
        </v-row>
        <v-dialog v-model="bonusDialog" :width="mobileWidth < 600 ? 328 : 471">
            <BonusDialog @close="closeBonusDialog" v-if="mobileWidth > 600" />
            <MBonusDialog @close="closeBonusDialog" v-else />
        </v-dialog>
        <v-row class="justify-center">
            <v-col cols="1" md="3" lg="3"></v-col>
            <v-col cols="10" md="6" lg="6" class="text-center">
                <p class="achivement-bonus-text">{{ t('affiliate.invite.achivement_bonus_text_1') }}</p>
            </v-col>
            <v-col cols="1" md="3" lg="3"></v-col>
        </v-row>
        <!-- card carousel -->
        <v-row class="mt-10">
            <v-carousel interval="6000" height="386" hide-delimiter-background :hide-delimiters="slides.length <= 1"
                show-arrows="hover">
                <!-- prev, next button hide when slides array length is less than 2 -->
                <template v-slot:prev="{ props }">
                    <v-btn class="button-carousel text-none prev-btn-position" variant="elevated" icon="mdi-chevron-left"
                        @click="props.onClick" v-if="slides.length > 1">
                    </v-btn>
                </template>
                <template v-slot:next="{ props }">
                    <v-btn class="button-carousel text-none next-btn-position" variant="elevated" icon="mdi-chevron-right"
                        @click="props.onClick" v-if="slides.length > 1">
                    </v-btn>
                </template>
                <v-carousel-item v-for="(slide, slideIndex) in slides" :key="slideIndex">
                    <v-sheet color="#29253C" height="100%" tile>
                        <v-row align="center" justify="center" class="mx-10 justify-center">
                            <v-col v-for="(i, index) in 3" :key="index" cols="4" v-if="mobileWidth > 960">
                                <v-card color="#211F31" class="mt-4 relative invite-carousel-card">
                                    <div class="invite-carousel-card-header"></div>
                                    <img :src="slide[index].headerImg" class="invite-carousel-header-img" />
                                    <div class="invite-carousel-header-text">
                                        {{ t('affiliate.invite.agent_realization_text') }} {{ slide[index].totalGrade }}
                                    </div>
                                    <div class="invite-carousel-header-rate bonus-progress-bg">
                                        <v-progress-linear v-model="slide[index].rate" height="23" class="bonus-progress">
                                            <div class="text-800-16 white">
                                                <Font class="active">{{ slide[index].grade }} / </Font>
                                                {{ slide[index].totalGrade }}
                                            </div>
                                        </v-progress-linear>
                                    </div>
                                    <div class="invite-carousel-body-text">
                                        {{ slide[index].cash }}
                                    </div>
                                    <div class="text-center">
                                        <v-btn class="invite-carousel-btn text-none" width="164px" height="48px"
                                            :class="[slide[index].grade == 3 ? 'button-bright' : 'invite-receive-btn']">
                                            {{ t('affiliate.invite.receive_btn_text') }}
                                        </v-btn>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col v-for="(i, index1) in 2" :key="index1" cols="6"
                                v-else-if="mobileWidth > 600 && mobileWidth <= 960">
                                <v-card color="#211F31" class="mt-4 relative invite-carousel-card">
                                    <div class="invite-carousel-card-header"></div>
                                    <img :src="slide[index1].headerImg" class="invite-carousel-header-img" />
                                    <div class="invite-carousel-header-text">
                                        {{ t('affiliate.invite.agent_realization_text') }} {{ slide[index1].grade }}
                                    </div>
                                    <div class="invite-carousel-header-rate bonus-progress-bg">
                                        <v-progress-linear v-model="slide[index1].rate" height="21" class="bonus-progress">
                                            <div class="text-800-16 white">
                                                <Font class="active">{{ slide[index1].grade }} / </Font>
                                                {{ slide[index1].totalGrade }}
                                            </div>
                                        </v-progress-linear>
                                    </div>
                                    <div class="invite-carousel-body-text">
                                        {{ slide[index1].cash }}
                                    </div>
                                    <div class="text-center">
                                        <v-btn class="invite-carousel-btn text-none" width="164px" height="48px"
                                            :class="[slide[index1].grade == 3 ? 'button-bright' : 'invite-receive-btn']">
                                            {{ t('affiliate.invite.receive_btn_text') }}
                                        </v-btn>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col v-for="(i, index2) in 1" :key="index2" cols="12" v-else>
                                <v-card color="#211F31" class="mt-4 relative invite-carousel-card">
                                    <div class="invite-carousel-card-header"></div>
                                    <img :src="slide[index2].headerImg" class="invite-carousel-header-img" />
                                    <div class="invite-carousel-header-text">
                                        {{ t('affiliate.invite.agent_realization_text') }} {{ slide[index2].grade }}
                                    </div>
                                    <div class="invite-carousel-header-rate bonus-progress-bg">
                                        <v-progress-linear v-model="slide[index2].rate" height="21" class="bonus-progress">
                                            <div class="text-800-16 white">
                                                <Font class="active">{{ slide[index2].grade }} / </Font>
                                                {{ slide[index2].totalGrade }}
                                            </div>
                                        </v-progress-linear>
                                    </div>
                                    <div class="invite-carousel-body-text"
                                        :style="[mobileWidth < 600 ? 'font-size: 26px' : '']">
                                        {{ slide[index2].cash }}
                                    </div>
                                    <div class="text-center">
                                        <v-btn class="invite-carousel-btn text-none" width="164px" height="48px"
                                            :class="[slide[index2].grade == 3 ? 'button-bright' : 'invite-receive-btn']">
                                            {{ t('affiliate.invite.receive_btn_text') }}
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
    <v-row class="mt-6 justify-center">
        <div class="premiums-text">{{ t('affiliate.invite.commission_title_text') }}</div>
        <v-menu v-model="commissionMenuShow">
            <template v-slot:activator="{ props }">
                <img src="@/assets/public/svg/icon_public_22.svg" class="ml-4" v-bind="props"
                    style="cursor: pointer;" />
            </template>
            <v-list theme="dark" bg-color="#211F31" class="px-2" width="400">
                <p class="pa-4 invite-url-title"> {{ t('affiliate.invite.help_text_2') }}</p>
            </v-list>
        </v-menu>
    </v-row>
    <v-row class="mt-4 justify-center px-10">
        <div class="commission-content-text">{{ t('affiliate.invite.commission_content_text') }}</div>
    </v-row>
    <v-card class="invite-right-card-bg mt-5 mx-3 pa-3 py-5">
        <v-row :class="mobileWidth < 600 ? 'mx-0' : 'mx-6'">
            <v-col cols="12" md="6" lg="6">
                <div class="premiums-text">{{ t('affiliate.invite.invite_text_1') }}</div>
                <div class="invitation-bonus-text-2 mt-4">{{ t('affiliate.invite.invite_text_2') }}</div>
                <div class="invitation-bonus-text-2 mt-4">
                    <span>{{ t('affiliate.invite.invite_text_3_1') }}</span>
                    <Font color="#F9BC01">30 %</Font>
                    <span>{{ t('affiliate.invite.invite_text_3_2') }}</span>
                </div>
                <div class="invitation-bonus-text-2 mt-4">
                    <span>{{ t('affiliate.invite.invite_text_4_1') }}</span>
                    <Font color="#F9BC01">30 %</Font>
                    <span>{{ t('affiliate.invite.invite_text_4_2') }}</span>
                </div>
                <div class="invitation-bonus-text-2 mt-4">
                    <span>{{ t('affiliate.invite.invite_text_5_1') }}</span>
                    <Font color="#F9BC01">30 %</Font>
                    <span>{{ t('affiliate.invite.invite_text_5_2') }}</span>
                </div>
                <img src="@/assets/affiliate/invite/image/img_agent_19.png" class="mt-10"
                    style="width: 100%; max-width: 630px;" />
            </v-col>
            <v-col cols="12" md="6" lg="6" class="text-center">
                <img src="@/assets/affiliate/invite/image/img_agent_02.png" class="mt-1"
                    style="width: 60%; max-width: 410px;" />
                <div class="footer-body-bg">
                    <div class="premiums-text" :class="[mobileWidth < 600 ? 'pt-4' : 'pt-10']">{{
                        t('affiliate.invite.invite_text_6') }}</div>
                    <div class="footer-body-cash-text" :class="[mobileWidth < 600 ? 'pt-2' : 'pt-4']"
                        :style="[mobileWidth < 600 ? 'font-size: 26px' : '']">R$ {{ Math.ceil(slider) }}</div>
                    <div class="footer-text-7">
                        <span>{{ t('affiliate.invite.invite_text_7') }}</span>
                        <Font color="#F9BC01">{{ Math.ceil(slider) }}</Font>
                        <span>{{ t('affiliate.invite.invite_text_8') }}</span>
                    </div>
                    <div :class="[mobileWidth < 600 ? 'px-0 py-3' : 'pa-6']">
                        <v-slider v-model="slider" color="#32CFEC" class="align-center" :max="max" :min="min" hide-details>
                        </v-slider>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-card>
    <v-card class="invite-footer-card-bg mt-5 mx-3 pa-3 py-5">
        <v-row class="mx-1 align-center">
            <v-col cols="12" md="6" lg="6" class="d-flex align-center justify-center">
                <img src="@/assets/affiliate/invite/image/img_agent_03.png" class="mt-10 invite-img-3"
                    style="width: 100%; max-width: 400px;" />
            </v-col>
            <v-col cols="12" md="6" lg="6">
                <div class="mt-4 invite-url-right-text">{{ t('affiliate.invite.invite_text_9') }}</div>
                <div class="mt-4 invitation-bonus-text-2">{{ t('affiliate.invite.invite_text_10') }}</div>
                <div class="mt-4 footer-url-text">{{ t('affiliate.invite.invite_text_11') }}</div>
                <div class="mt-4 invitation-bonus-text-2">{{ t('affiliate.invite.invite_text_12') }}</div>
            </v-col>
        </v-row>
    </v-card>
    <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
</template>
<style lang="scss">
.invite-partner-text {
    color: #F9BC01;
    font-weight: 700;
    font-size: 18px;
}

.invite-url-item {
    margin: 16px 12px !important;
    background-color: #1C1929 !important;
    padding: 4px 8px !important;
    border-radius: 12px !important;

    .v-btn--icon {
        border-radius: 10px;
    }
}

.invite-receive-btn {
    background: #353652 !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    border-radius: 16px !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    color: #FFFFFF !important;
}

.invite-url-title {
    font-weight: 400;
    font-size: 14px;
    color: #7782AA;
}

.footer-text-7 {
    font-weight: 700;
    font-size: 14px;
    color: #7782AA;
}

.footer-url-text {
    font-weight: 800;
    font-size: 16px;
    color: #1ACB51;
}

.invite-border {
    border-right: 2px solid #414968;
}

.invite-url-right-text {
    font-weight: 800;
    font-size: 16px;
    color: #FFFFFF;
}

.invite-right-card-bg {
    background: linear-gradient(90deg, #29263F 0%, #4A32AA 100%) !important;
}

.invite-revenu-text {
    font-weight: 700;
    font-size: 18px;
    color: #FFFFFF;
}

.invite-revenu-cash-text {
    font-weight: 700;
    font-size: 20px;
    color: #F9BC01;
}

.invite-more-people-value-text {
    font-weight: 500;
    font-size: 12px;
    color: #F9BC01;
}

.invite-more-people-text {
    font-weight: 500;
    font-size: 12px;
    color: #FFFFFF;
}

.premiums-text {
    font-weight: 700;
    font-size: 16px;
    color: #FFFFFF;
}

.invitation-bonus-text {
    font-weight: 700;
    font-size: 16px;
    color: #FFFFFF;
}

.invitation-bonus-text-1 {
    font-weight: 800;
    font-size: 16px;
    color: #F9BC01
}

.invitation-bonus-text-2 {
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF
}

.invitation-bonus-table-bg {
    background-color: #211F31 !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 12px !important;
    width: 100% !important;
}

.invitation-bonus-cash-text {
    font-weight: 800;
    color: #F9BC01
}

.invite-how-text-1 {
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
}

.invite-how-text-2 {
    font-weight: 400;
    font-size: 14px;
    color: #F9BC01;
}

.achivement-bonus-text {
    font-weight: 400;
    font-size: 16px;
    color: #7782AA;
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

.invite-carousel-card-header {
    height: 200px;
    width: 100%;
    background: #6AA82D;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
}

.invite-carousel-card {
    margin-left: auto !important;
    margin-right: auto !important;
    width: 246px !important;
    height: 337px !important;
    overflow: inherit !important;
}

.invite-carousel-header-img {
    position: absolute;
    top: -19px;
    left: 50%;
    transform: translateX(-50%);
    width: 89px;
    height: 125px;
}

.invite-carousel-header-rate {
    width: 80%;
    position: absolute;
    top: 158px;
    left: 50%;
    transform: translateX(-50%);
}

.invite-carousel-header-text {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 127px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 800;
    font-size: 16px;
    color: #FFFFFF;
}

.invite-carousel-body-text {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 215px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 800;
    font-size: 32px;
    color: #F9BC01;
}

.invite-carousel-btn {
    margin-top: 70px;
}

.commission-content-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #7782AA;
    text-align: center;
}

.footer-body-bg {
    background: #211F31;
    border-radius: 12px;
}

.footer-body-cash-text {
    font-weight: 800;
    font-size: 32px;
    color: #F9BC01;
}

.invite-footer-card-bg {
    background: linear-gradient(90deg, #DE8245 0%, #D84594 100%) !important;
    border-radius: 8px !important;
}

.bonus-progress {
    .v-progress-linear__determinate {
        border-radius: 30px;
        background: linear-gradient(180deg, #6D44F8 0%, #5726FC 100%);
    }
}

.bonus-progress-bg .v-progress-linear {
    background: #211F31 !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 20px !important;
}
.invite-img-3 {
    margin-top: -20px;
    margin-bottom: -20px;
}
</style>