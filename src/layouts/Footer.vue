<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from 'vuetify'
const { t } = useI18n();
const { name, width } = useDisplay()

const footerIcons = ref([
    new URL("@/assets/public/svg/icon_public_80.svg", import.meta.url).href,
    new URL("@/assets/public/svg/icon_public_28.svg", import.meta.url).href,
    new URL("@/assets/public/svg/icon_public_29.svg", import.meta.url).href,
    new URL("@/assets/public/svg/icon_public_30.svg", import.meta.url).href,
    new URL("@/assets/public/svg/icon_public_31.svg", import.meta.url).href,
    new URL("@/assets/public/svg/icon_public_32.svg", import.meta.url).href,
    new URL("@/assets/public/svg/icon_public_33.svg", import.meta.url).href,
])

const mobileVersion = computed(() => {
    return name.value
});

const mobileWidth = computed(() => {
    return width.value
});
</script>

<template>
    <div class="my-4 mx-2">

        <!-------------------- footer bar -------------->
        <v-row class="mx-2" :class="mobileWidth > 600 ? 'mt-10' : ''">
            <v-col cols="3" sm="4" md="2" lg="2">
                <div class="footer-title ml-4">{{ t('home.footer.game.title') }}</div>
                <div class="footer-text-1 ml-4">{{ t('home.footer.game.menu_1') }}</div>
                <div class="footer-text-1 ml-4">{{ t('home.footer.game.menu_2') }}</div>
                <div class="footer-text-1 ml-4">{{ t('home.footer.game.menu_3') }}</div>
                <div class="footer-text-1 ml-4">{{ t('home.footer.game.menu_4') }}</div>
            </v-col>
            <v-col cols="3" sm="4" md="2" lg="2">
                <div class="footer-title" :class="mobileWidth < 600 ? 'ml-4' : ''">
                    {{ t('home.footer.helpful_links.title') }}
                </div>
                <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-4' : ''">
                    {{ t('home.footer.helpful_links.menu_1') }}
                </div>
                <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-4' : ''">
                    {{ t('home.footer.helpful_links.menu_2') }}
                </div>
            </v-col>
            <v-col cols="6" sm="4" md="3" lg="3">
                <div class="footer-title" :class="mobileWidth < 600 ? 'ml-8' : ''">
                    {{ t('home.footer.about_us.title') }}
                </div>
                <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-8' : ''">
                    {{ t('home.footer.about_us.menu_1') }}</div>
                <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-8' : ''">
                    {{ t('home.footer.about_us.menu_2') }}
                </div>
                <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-8' : ''">
                    {{ t('home.footer.about_us.menu_3') }}
                </div>
                <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-8' : ''">
                    {{ t('home.footer.about_us.menu_4') }}
                </div>
                <div class="footer-text-1" :class="mobileWidth < 600 ? 'ml-8' : ''">
                    {{ t('home.footer.about_us.menu_5') }}
                </div>
            </v-col>
            <v-col cols="12" sm="12" md="5" lg="5" class="text-center">
                <div class="d-flex align-center justify-center">
                    <img src="@/assets/public/image/logo_public_01.png" />
                    <!-- <p class="logo-title-1 ml-1">{{t('main.logo_text_1')}}</p>
                    <p class="logo-title-2 ml-1">{{t('main.logo_text_2')}}</p> -->
                </div>
                <div class="mt-1">
                    <v-btn color="grey-darken-4"
                        :class="[footerIndex == 0 ? 'footer-icon-button-red' : 'footer-icon-button']" icon=""
                        v-for="(footerIcon, footerIndex) in footerIcons" :key="footerIndex">
                        <img :src="footerIcon" style="width: 100%" />
                    </v-btn>
                </div>
                <p class="text-left footer-4-text mt-4">{{ t('home.footer.footer_4.text') }}</p>
            </v-col>
        </v-row>
        <v-row class="mx-2 mt-6">
            <v-card color="#000000" theme="dark" class="justify-center">
                <v-row class="align-center">
                    <v-col cols="12" sm="6" md="3" lg="3" class="d-flex justify-center mt-3">
                        <img src="@/assets/public/image/logo_public_02.png" width="200" />
                    </v-col>
                    <v-col cols="12" sm="6" md="9" lg="9">
                        <div class="footer-5-text" :class="[mobileVersion == 'sm' ? 'px-4' : 'pa-4']">{{
                            t('home.footer.logo.text_1')
                        }}</div>
                        <div class="footer-5-text pa-4">{{ t('home.footer.logo.text_2') }}</div>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
        <v-row class="mt-8 mb-4 justify-center footer-6-text">
            {{ t('home.footer.footer_6.text') }}
        </v-row>
    </div>
</template>

<style lang="scss">
// footer bar class

.footer-title {
    font-weight: 700;
    font-size: 16px;
    color: #FFFFFF;
    margin-bottom: 10px;
}

.footer-text-1 {
    font-weight: 500;
    font-size: 16px;
    color: #7782AA;
    margin-bottom: 6px;
}

@media (max-width: 600px) {

    .footer-title {
        font-size: 14px;
    }

    .footer-text-1 {
        font-size: 12px;
    }

}

.footer-icon-button {
    background-color: #131828 !important;
    width: 34px !important;
    height: 34px !important;
    margin: 0px 3px;
}

.footer-icon-button-red {
    background-color: #D42763 !important;
    width: 34px !important;
    height: 34px !important;
    margin: 0px 3px;
}

.footer-4-text {
    font-weight: 400;
    font-size: 12px;
    color: #7782AA;
}

.footer-5-text {
    font-weight: 400;
    font-size: 14px;
    color: #7782AA;
}

.footer-6-text {
    font-weight: 400;
    font-size: 16px;
    color: #7782AA;
}
</style>
