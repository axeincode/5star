<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{ (e: 'closeLoginBonusDialog'): void }>()
const { t } = useI18n();

const vipGrade = ref("VIP1");
const loginBonusItem = ref({
    award: [8, 10, 12, 14, 16, 18, 20, 22], // reward list
    signin_day: 0, // The number of days that have been signed in
    is_signin: true, // You can sign in today
})

const handleLoginBonus = (day: number) => {
    if (day == loginBonusItem.value.signin_day + 1) {
        loginBonusItem.value.signin_day = day;
    }
}
</script>

<template>
    <div class="login-bonus-dialog-container">
        <img src="@/assets/public/image/bg_public_03_01.png" class="header-bar-img-position" />
        <v-btn class="close-login-bonus-button" icon="true" @click="emit('closeLoginBonusDialog')" height="32" width="32">
            <img src="@/assets/public/svg/icon_public_52.svg" width="20" />
        </v-btn>
        <img src="@/assets/affiliate/invite/image/img_agent_02.png" class="login-bonus-agent-img" />
        <div class="login-bonus-body">
            <div class="mt-4 text-center">
                <Font class="color-F9BC01 text-900-20">{{ vipGrade }}</Font>
                <Font class="text-900-20 white">&nbsp;{{ t('vip.login_bonus.title_text') }}</Font>
            </div>
            <v-row class="mt-4 mx-2">
                <v-col cols="4" class="pa-0 d-flex justify-center">
                    <div class="login-bonus-card-checkout-bg relative" v-if="loginBonusItem.signin_day >= 1">
                        <p class="text-900-18 gray login-bonus-text-position">{{ t('vip.login_bonus.day_1_text') }}</p>
                        <img src="@/assets/public/svg/icon_public_18.svg" class="login-bonus-card-cash-position"
                            width="40" />
                        <p class="text-900-18 gray login-bonus-card-money-position">$ {{ loginBonusItem.award[0] }}</p>
                    </div>
                    <div class="login-bonus-card-bg-1 relative" v-ripple.center v-else @click="handleLoginBonus(1)">
                        <img src="@/assets/vip/image/img_vip_32.png" class="login-bonus-sunshine-img"
                            v-if="loginBonusItem.signin_day + 1 == 1" />
                        <p class="text-900-18 white login-bonus-text-position">{{ t('vip.login_bonus.day_1_text') }}</p>
                        <img src="@/assets/vip/image/img_vip_21.png" class="login-bonus-card-cash-position" />
                        <p class="text-900-18 white login-bonus-card-money-position">$ {{ loginBonusItem.award[0] }}</p>
                    </div>
                </v-col>
                <v-col cols="4" class="pa-0 d-flex justify-center">
                    <div class="login-bonus-card-checkout-bg relative" v-if="loginBonusItem.signin_day >= 2">
                        <p class="text-900-18 gray login-bonus-text-position">{{ t('vip.login_bonus.day_2_text') }}aaaa</p>
                        <img src="@/assets/public/svg/icon_public_18.svg" class="login-bonus-card-cash-position"
                            width="40" />
                        <p class="text-900-18 gray login-bonus-card-money-position">$ {{ loginBonusItem.award[1] }}</p>
                    </div>
                    <div class="login-bonus-card-bg-2 relative" v-ripple.center v-else @click="handleLoginBonus(2)">
                        <img src="@/assets/vip/image/img_vip_32.png" class="login-bonus-sunshine-img"
                            v-if="loginBonusItem.signin_day + 1 == 2" />
                        <p class="text-900-18 white login-bonus-text-position">{{ t('vip.login_bonus.day_2_text') }}</p>
                        <img src="@/assets/vip/image/img_vip_22.png" class="login-bonus-card-cash-position" />
                        <p class="text-900-18 white login-bonus-card-money-position">$ {{ loginBonusItem.award[1] }}</p>
                    </div>
                </v-col>
                <v-col cols="4" class="pa-0 d-flex justify-center">
                    <div class="login-bonus-card-checkout-bg relative" v-if="loginBonusItem.signin_day >= 3">
                        <p class="text-900-18 gray login-bonus-text-position">{{ t('vip.login_bonus.day_3_text') }}</p>
                        <img src="@/assets/public/svg/icon_public_18.svg" class="login-bonus-card-cash-position"
                            width="40" />
                        <p class="text-900-18 gray login-bonus-card-money-position">$ {{ loginBonusItem.award[2] }}</p>
                    </div>
                    <div class="login-bonus-card-bg-3 relative" v-ripple.center v-else @click="handleLoginBonus(3)">
                        <img src="@/assets/vip/image/img_vip_32.png" class="login-bonus-sunshine-img"
                            v-if="loginBonusItem.signin_day + 1 == 3" />
                        <p class="text-900-18 white login-bonus-text-position">{{ t('vip.login_bonus.day_3_text') }}</p>
                        <img src="@/assets/vip/image/img_vip_23.png" class="login-bonus-card-cash-position" />
                        <p class="text-900-18 white login-bonus-card-money-position">$ {{ loginBonusItem.award[2] }}</p>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-6 mx-2">
                <v-col cols="4" class="pa-0 d-flex justify-center">
                    <div class="login-bonus-card-checkout-bg relative" v-if="loginBonusItem.signin_day >= 4">
                        <p class="text-900-18 gray login-bonus-text-position">{{ t('vip.login_bonus.day_4_text') }}</p>
                        <img src="@/assets/public/svg/icon_public_18.svg" class="login-bonus-card-cash-position"
                            width="40" />
                        <p class="text-900-18 gray login-bonus-card-money-position">$ {{ loginBonusItem.award[3] }}</p>
                    </div>
                    <div class="login-bonus-card-bg-4 relative" v-ripple.center v-else @click="handleLoginBonus(4)">
                        <img src="@/assets/vip/image/img_vip_32.png" class="login-bonus-sunshine-img"
                            v-if="loginBonusItem.signin_day + 1 == 4" />
                        <p class="text-900-18 white login-bonus-text-position">{{ t('vip.login_bonus.day_4_text') }}</p>
                        <img src="@/assets/vip/image/img_vip_24.png" class="login-bonus-card-cash-position" />
                        <p class="text-900-18 white login-bonus-card-money-position">$ {{ loginBonusItem.award[3] }}</p>
                    </div>
                </v-col>
                <v-col cols="4" class="pa-0 d-flex justify-center">
                    <div class="login-bonus-card-checkout-bg relative" v-if="loginBonusItem.signin_day >= 5">
                        <p class="text-900-18 gray login-bonus-text-position">{{ t('vip.login_bonus.day_5_text') }}</p>
                        <img src="@/assets/public/svg/icon_public_18.svg" class="login-bonus-card-cash-position"
                            width="40" />
                        <p class="text-900-18 gray login-bonus-card-money-position">$ {{ loginBonusItem.award[4] }}</p>
                    </div>
                    <div class="login-bonus-card-bg-4 relative" v-ripple.center v-else @click="handleLoginBonus(5)">
                        <img src="@/assets/vip/image/img_vip_32.png" class="login-bonus-sunshine-img"
                            v-if="loginBonusItem.signin_day + 1 == 5" />
                        <p class="text-900-18 white login-bonus-text-position">{{ t('vip.login_bonus.day_5_text') }}</p>
                        <img src="@/assets/vip/image/img_vip_25.png" class="login-bonus-card-cash-position" />
                        <p class="text-900-18 white login-bonus-card-money-position">$ {{ loginBonusItem.award[4] }}</p>
                    </div>
                </v-col>
                <v-col cols="4" class="pa-0 d-flex justify-center">
                    <div class="login-bonus-card-checkout-bg relative" v-if="loginBonusItem.signin_day >= 6">
                        <p class="text-900-18 gray login-bonus-text-position">{{ t('vip.login_bonus.day_6_text') }}</p>
                        <img src="@/assets/public/svg/icon_public_18.svg" class="login-bonus-card-cash-position"
                            width="40" />
                        <p class="text-900-18 gray login-bonus-card-money-position">$ {{ loginBonusItem.award[5] }}</p>
                    </div>
                    <div class="login-bonus-card-bg-4 relative" v-ripple.center v-else @click="handleLoginBonus(6)">
                        <img src="@/assets/vip/image/img_vip_32.png" class="login-bonus-sunshine-img"
                            v-if="loginBonusItem.signin_day + 1 == 6" />
                        <p class="text-900-18 white login-bonus-text-position">{{ t('vip.login_bonus.day_6_text') }}</p>
                        <img src="@/assets/vip/image/img_vip_26.png" class="login-bonus-card-cash-position" />
                        <p class="text-900-18 white login-bonus-card-money-position">$ {{ loginBonusItem.award[5] }}</p>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-6 mx-2">
                <v-col cols="4" class="pa-0 d-flex justify-center">
                    <div class="login-bonus-card-checkout-bg relative" v-if="loginBonusItem.signin_day >= 7">
                        <p class="text-900-18 gray login-bonus-text-position">{{ t('vip.login_bonus.day_7_text') }}</p>
                        <img src="@/assets/public/svg/icon_public_18.svg" class="login-bonus-card-cash-position"
                            width="40" />
                        <p class="text-900-18 gray login-bonus-card-money-position">$ {{ loginBonusItem.award[6] }}</p>
                    </div>
                    <div class="login-bonus-card-bg-4 relative" v-ripple.center v-else @click="handleLoginBonus(7)">
                        <img src="@/assets/vip/image/img_vip_32.png" class="login-bonus-sunshine-img"
                            v-if="loginBonusItem.signin_day + 1 == 7" />
                        <p class="text-900-18 white login-bonus-text-position">{{ t('vip.login_bonus.day_7_text') }}</p>
                        <img src="@/assets/vip/image/img_vip_26.png" class="login-bonus-card-cash-position" />
                        <p class="text-900-18 white login-bonus-card-money-position">$ {{ loginBonusItem.award[6] }}</p>
                    </div>
                </v-col>
                <v-col cols="8" class="pa-0 d-flex justify-center">
                    <div class="login-bonus-card-checkout-bg-1 relative" v-if="loginBonusItem.signin_day >= 8">
                        <p class="text-900-18 gray login-bonus-text-position-1">
                            {{ t('vip.login_bonus.day_8_text') }}
                        </p>
                        <p class="text-900-18 gray mt-2 login-bonus-card-money-position-1">
                            $ {{ loginBonusItem.award[7] }}
                        </p>
                        <img src="@/assets/public/svg/icon_public_18.svg" class="login-bonus-card-cash-position"
                            width="40" />
                    </div>
                    <div class="login-bonus-card-bg-5 relative" v-ripple.center v-else @click="handleLoginBonus(8)">
                        <img src="@/assets/vip/image/img_vip_32.png" class="login-bonus-sunshine-img"
                            v-if="loginBonusItem.signin_day + 1 == 8" />
                        <p class="text-900-18 white login-bonus-text-position-1">
                            {{ t('vip.login_bonus.day_8_text') }}
                        </p>
                        <p class="text-900-18 white mt-2 login-bonus-card-money-position-1">
                            $ {{ loginBonusItem.award[7] }}
                        </p>
                        <img src="@/assets/vip/image/img_vip_27.png" width="165"
                            class="login-bonus-card-cash-position-1" />
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-8 mx-1 align-center">
                <v-col cols="2" class="pa-0 ma-0">
                    <v-btn class="left-login-bonus-button" icon="true" height="30" width="30">
                        <v-icon color="#FFFFFF">mdi-chevron-left</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="8" class="pa-0 ma-0">
                    <div class="text-center">
                        <Font class="text-900-12 white">{{ t('vip.login_bonus.footer_text_1') }}</Font>
                        <Font class="text-900-12 purple">R$20 </Font>
                        <Font class="text-900-12 white">{{ t('vip.login_bonus.footer_text_2') }}</Font>
                        <Font class="text-900-12 purple">{{ t('vip.login_bonus.footer_text_3') }}</Font>
                    </div>
                    <div class="text-center">
                        <Font class="text-900-12 white">{{ t('vip.login_bonus.footer_text_4') }}</Font>
                    </div>
                </v-col>
                <v-col cols="2" class="pa-0 ma-0 text-right">
                    <v-btn class="left-login-bonus-button" icon="true" height="30" width="30">
                        <v-icon color="#FFFFFF">mdi-chevron-right</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<style lang="scss">
.login-bonus-dialog-container {
    height: 620px;
    border-radius: 16px;
    background: #29263C;
    position: relative;
}

.header-bar-img-position {
    position: absolute;
    top: -28px;
    right: 26px;
}

.close-login-bonus-button {
    position: absolute;
    top: -56px;
    right: 12px;
    background: #29263C;
}

.login-bonus-agent-img {
    position: absolute;
    top: -126px;
    left: 50%;
    transform: translateX(-50%);
    width: 286px;
}

.login-bonus-body {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 447px;
    height: 547px;
    border-radius: 14px;
    background: #1D2027;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
    z-index: 20;
}

.login-bonus-card-checkout-bg {
    width: 133px;
    height: 150px;
    border-radius: 6px;
    background: #29263C;

    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}

.login-bonus-card-checkout-bg-1 {
    width: 278px;
    height: 150px;
    border-radius: 6px;
    background: #29263C;

    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}

.login-bonus-card-bg-1 {
    width: 133px;
    height: 150px;
    border-radius: 6px;
    background: linear-gradient(180deg, #C6428B 0%, #F08734 100%);
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    cursor: pointer;
    overflow: hidden;
}

.login-bonus-card-bg-2 {
    width: 133px;
    height: 150px;
    border-radius: 6px;
    background: linear-gradient(180deg, #2087E8 0%, #0E4987 100%);

    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    cursor: pointer;
    overflow: hidden;
}

.login-bonus-card-bg-3 {
    width: 133px;
    height: 150px;
    border-radius: 6px;
    background: linear-gradient(180deg, #2087E8 0%, #0E4987 100%);

    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    cursor: pointer;
    overflow: hidden;
}

.login-bonus-card-bg-4 {
    width: 133px;
    height: 150px;
    border-radius: 6px;
    background: linear-gradient(180deg, #2087E8 0%, #0E4987 100%);

    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    cursor: pointer;
    overflow: hidden;
}

.login-bonus-sunshine-img {
    width: 450px;
    height: 450px;
    border-radius: 6px;
    animation: rotate 5s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    transform: translate(-50%, -50%) rotate(45deg);
    object-fit: cover;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.login-bonus-card-bg-5 {
    width: 278px;
    height: 150px;
    border-radius: 6px;
    background: linear-gradient(180deg, #9419F0 0%, #275798 100%);
    cursor: pointer;
    overflow: hidden;
}

.login-bonus-text-position {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
}

.login-bonus-text-position-1 {
    position: absolute;
    top: 36px;
    left: 46px;
}

.login-bonus-card-cash-position {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.login-bonus-card-cash-position-1 {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
}

.login-bonus-card-money-position {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
}

.login-bonus-card-money-position-1 {
    position: absolute;
    top: 64px;
    left: 46px;
}

.left-login-bonus-button {
    background: #1D2027;
    /* Text Box */
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

</style>