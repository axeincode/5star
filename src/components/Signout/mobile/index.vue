
<script lang="ts" setup>
import router from '@/router';
import { authStore } from '@/store/auth';
import { useI18n } from 'vue-i18n';
const emit = defineEmits<{
    (e: 'close'): void
}>()
const { t } = useI18n();
const { dispatchSignout } = authStore();
const signOut = (): void => {
    emit("close");
    dispatchSignout();
    router.push({ name: "Dashboard" })
}
</script>
  
<template>
    <div class="m-signout-container">
        <div class="m-header">
            <img src="@/assets/public/image/img_public_03.png" class="m-logout-logo" />
            <p class="text-700-16 white mt-3 mx-10">{{ t('signout.text_1') }}</p>
        </div>
        <p class="m-signout-text">{{ t('signout.text_2') }}</p>
        <p class="m-signout-notice">{{ t('signout.text_3') }} </p>
        <div class="mt-8 text-center">
            <v-btn class="m-signout-btn button-bright" width="-webkit-fill-available" height="48px" @click="signOut">
                {{ t('signout.button') }}
            </v-btn>
        </div>
        <v-btn class="close-button" icon="true" @click="$emit('close')" width="30" height="30">
            <img src="@/assets/public/svg/icon_public_10.svg" />
            <!-- <v-icon color="#FFFFFF">
                mdi-close
            </v-icon> -->
        </v-btn>
    </div>
</template>

<style lang="scss">
// container
.m-signout-container {
    border-radius: 20px 20px 16px 16px;
    background: var(--bg-2-e-274-c, #2E274C);
    width: 328px;
    height: 465px;

    .m-header {
        border-radius: 20px;
        background: linear-gradient(180deg, #8218EA 0%, #2C549C 100%);
        text-align: center;
        height: 201px;

        .m-logout-logo {
            margin-top: -21px;
            width: 195px;
        }

        .logo-text {
            color: white;
            font-size: 20px;
            font-weight: 700;
            padding: 12px 80px 28px 80px;
            margin: 0;
        }
    }

    .m-signout-text {
        margin: 24px 65px 0 65px;
        color: white;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
    }

    .m-signout-notice {
        margin: 30px 28px 0 28px;
        color: white;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
    }

    .m-signout-btn {
        width: 280px !important;

        .v-btn__content {
            text-align: center;
            font-family: "Inter";
            font-size: 14px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
            letter-spacing: normal;
        }
    }

    // close modal button
    .close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 5px;
        right: 5px;
    }

    .v-field--variant-solo {
        background: transparent !important;
    }
}
</style>