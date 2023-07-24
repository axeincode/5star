
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
    router.push({name: "Dashboard"})
}
</script>
  
<template>
    <div class="m-signout-container">
        <div class="m-header">
            <img src="@/assets/public/image/img_public_03.png" class="m-logout-logo" />
            <p class="text-700-20 white">{{ t('signout.text_1') }}</p>
        </div>
        <p class="m-signout-text">{{ t('signout.text_2') }}</p>
        <p class="m-signout-notice">{{ t('signout.text_3') }} </p>
        <div class="my-8 text-center">
            <v-btn class="signout-btn button-bright text-none" width="-webkit-fill-available" height="54px"
                @click="signOut">
                {{ t('signout.button') }}
            </v-btn>
        </div>
        <v-btn class="close-button" icon="true" @click="$emit('close')">
            <v-icon color="#FFFFFF">
                mdi-close
            </v-icon>
        </v-btn>
    </div>
</template>

<style lang="scss">
// container
.m-signout-container {
    background-color: #2E274C;
    border-radius: 38px 38px 0px 0px !important;
    position: absolute;
    bottom: 0;

    .m-header {
        text-align: center;
        background: linear-gradient(180deg, #8218EA 0%, #2C549C 100%);
        border-radius: 38px 38px 0px 0px;
        height: 270px;

        .m-logout-logo {
            margin-top: -10px;
            width: 230px;
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
        margin: 40px 50px 0 50px;
        color: white;
        font-size: 28px;
        font-weight: 700;
        text-align: center;
    }

    .m-signout-notice {
        margin: 40px 46px 0 46px;
        color: white;
        font-size: 16px;
        text-align: center;
    }

    .signout-btn {
        width: 375px !important;
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