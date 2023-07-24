<script lang="ts" setup>
import { ref } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { refferalStore } from '@/store/refferal';
import { useDisplay } from 'vuetify';

const { t } = useI18n();
const { width } = useDisplay();
const { setRefferalAppBarShow } = refferalStore();
const { setRefferalDialogShow } = refferalStore();

const invertedScroll = ref<boolean>(true);
const elevateOnScroll = ref<boolean>(true);

const mobileWidth = computed((): number => {
    return width.value
})
</script>

<template>
    <v-app-bar app class="refferal-app-bar-background justify-center" density="compact" :inverted-scroll="invertedScroll"
        :elevate-on-scroll="elevateOnScroll">
        <v-toolbar-title class="d-flex align-center justify-center">
            <p class="white" :class="mobileWidth < 600 ? 'text-500-10' : 'text-700-16'">
                {{ t('refferal.app_bar_title') }}
            </p>
            <img src="@/assets/public/image/img_public_09.png" class="ml-2" :width="mobileWidth > 600 ? 50 : 44" />
            <v-btn rounded height="28px" class="text-none ml-4 earn-btn-bg" @click="setRefferalDialogShow(true)">
                {{ t('refferal.earn_btn_text') }}
            </v-btn>
        </v-toolbar-title>
        <v-btn icon density="compact">
            <v-icon color="#FFFFFF" style="font-size: 20px;" @click="setRefferalAppBarShow(false)">mdi-close</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<style lang="scss">
.refferal-app-bar-background {
    background: linear-gradient(90deg, #6940F8 0%, #3FDAA9 47.8%, #6940F8 100%) !important;

    .v-toolbar-title__placeholder {
        display: flex !important;
        align-items: center;
    }

    .earn-btn-bg {
        background: #29253C !important;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;

        .v-btn__content {
            font-weight: 700;
            font-size: 16px;
            color: #FFFFFF;
        }

        @media (max-width: 600px) {

            .v-btn__content {
                font-size: 12px;
            }
        }
    }
}
</style>