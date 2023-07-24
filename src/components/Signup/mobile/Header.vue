
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

const SignupHeader = defineComponent({
    setup() {
        const { t } = useI18n();

        return {
            t,
        }
    }
})

export default SignupHeader
</script>

<template>
    <v-row class="signup-header-container">
        <v-col cols="10" offset="1" class="pl-11 pt-9">
            <!-- <v-row>
                <span class="logo-text purple">{{t('main.logo_text_1')}}</span>
                <span class="logo-text yellow">{{t('main.logo_text_2')}}</span>
            </v-row> -->
            <v-row>
                <p class="logo-text2 white">
                    {{ t('signup.formPage.header.titleLine1') }}
                    <br>
                    {{ t('signup.formPage.header.titleLine2') }}
                </p>
            </v-row>
        </v-col>
        <img src="@/assets/login/image/bg_su_01.png" class="m-bg-image">
        <img src="@/assets/public/image/logo_public_01.png" class="logo-image" width="180">
        <img src="@/assets/login/image/img_su_01.png" class="m-coin-image">
    </v-row>
</template>

<style lang="scss">
.signup-header-container {
    z-index: 1;
    height: 187px;
    margin: 0px !important;

    .v-col {
        z-index: 1;
    }

    img.m-bg-image {
        position: absolute;
        width: 100%;
        height: 187px;
        z-index: 0;
        border-radius: 38px 38px 0px 0px;
    }

    img.logo-image {
        position: absolute;
        top: 22px;
        left: 18px;
    }

    img.m-coin-image {
        position: absolute;
        top: -10px;
        right: 0px;
        width: 280px;
        height: 197px;
    }

    .signup-logo-title-1-position {
        position: absolute;
        top: 25px;
        left: 70px;
    }

    .signup-logo-title-2-position {
        position: absolute;
        top: 25px;
        left: 130px;
    }
}

.logo-text {
    font-family: 'Bauhaus 93';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 41px;
    text-shadow: #522A59 0px 2px 0px;
}

.logo-text2 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    margin-top: 40px;
}
</style>