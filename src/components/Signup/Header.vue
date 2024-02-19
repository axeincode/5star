
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
        <img src="@/assets/login/image/bg_su_01.png" class="bg-image">
        <img src="@/assets/public/image/logo_public_01.png" class="logo-image">
        <img src="@/assets/login/image/img_su_01.png" class="coin-image">
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

    img.bg-image {
        position: absolute;
        width: 100%;
        height: 187px;
        z-index: 0;
    }

    img.logo-image {
        position: absolute;
        top: 24px;
        left: 24px;
    }

    img.coin-image {
        position: absolute;
        top: -10px;
        right: 7px;
        width: 324px;
        height: 197px;
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
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    margin-top: 40px;
}
</style>