<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { appBarStore } from "@/store/appBar";
import { mailStore } from "@/store/mail";
import { type GetMailData } from '@/interface/mail';
import { useDisplay } from 'vuetify'
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const { t } = useI18n();
const { name, width } = useDisplay()
const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setUserNavBarToggle } = appBarStore();

// mail count
const mailCount = ref<number>(10);
// navbar toggle
const navbarToggle = ref<boolean>(false);
const mailNavigation = ref<boolean>(false);
const mailMenuShow = ref<boolean>(false);

// pc or mobile screen switch

const mobileVersion = computed(() => {
    return name.value
});

const mobileWidth: any = computed(() => {
    return width.value;
})

const navToggle = computed(() => {
    const { getNavBarToggle } = storeToRefs(appBarStore());
    return getNavBarToggle.value
})

// get mail data
const mailList = computed((): GetMailData[] => {
    const { getMailList } = storeToRefs(mailStore())
    return getMailList.value
})

watch(mailList, (newValue) => {
    mailCount.value = newValue.length;
}, { deep: true })

watch(navToggle, (newValue) => {
    navbarToggle.value = newValue;
}, { deep: true })

watch(mailMenuShow, (newValue) => {
    setMainBlurEffectShow(newValue);
    setOverlayScrimShow(newValue);
})

const handleNavbarToggle = () => {
    navbarToggle.value = !navbarToggle.value
    setUserNavBarToggle(false);
    setMainBlurEffectShow(false);
    setTimeout(() => {
        setNavBarToggle(navbarToggle.value)
        setMainBlurEffectShow(navbarToggle.value);
    }, 200);
}

onMounted(() => {
    mailCount.value = mailList.value.length
})
</script>

<template>
    <v-bottom-navigation bg-color="#000000" grow class="mobile-menu-index">
        <v-btn class="menu-text-color" @click="handleNavbarToggle">
            <img src="@/assets/public/svg/icon_public_81.svg" width="20" height="20">
            <div class="pt-1 text-600-12">
                {{ t('mobile_menu.menu') }}
            </div>
        </v-btn>
        <v-btn class="menu-text-color">
            <img src="@/assets/public/svg/icon_public_34.svg" width="20" height="20">
            <div class="pt-1 text-600-12">
                {{ t('mobile_menu.casino') }}
            </div>
        </v-btn>
        <v-btn class="menu-text-color share-ripple-btn">
            <div class="circle-background"></div>
            <img src="@/assets/public/svg/bg_public_22.svg" class="share-background-img-position">
            <img src="@/assets/public/image/img_public_19.png" class="share-img-position">
            <div class="pt-6 text-600-12">
                {{ t('mobile_menu.share') }}
            </div>
        </v-btn>
        <v-btn class="menu-text-color">
            <img src="@/assets/public/svg/icon_public_40.svg" width="20">
            <div class="pt-1 text-600-12">
                {{ t('mobile_menu.sport') }}
            </div>
        </v-btn>

        <!-- <v-btn class="menu-text-color" @click="mailNavigation = !mailNavigation">
            <div class="relative">
                <img src="@/assets/public/svg/icon_public_55.svg" width="20">
                <p class="chat-box-text">{{ mailCount }}</p>
            </div>
            <div class="text-600-12">
                {{ t('mobile_menu.mail') }}
            </div>
        </v-btn> -->

        <v-menu content-class="mobile-mail-menu" :scrim="true" v-model:model-value="mailMenuShow">
            <template v-slot:activator="{ props }">
                <v-btn class="menu-text-color" v-bind="props">
                    <div class="relative">
                        <img src="@/assets/public/svg/icon_public_55.svg" width="20">
                        <p class="chat-box-text">{{ mailCount }}</p>
                    </div>
                    <div class="text-600-12">
                        {{ t('mobile_menu.mail') }}
                    </div>
                </v-btn>
            </template>
            <v-list theme="dark" bg-color="transparent" class="px-2" :width="mobileWidth"
                style="box-shadow: none !important;">
                <v-list-item height="36">
                    <v-list-item-title class="ml-2">
                        <div class="mail-header-text">{{ t('mail_dialog.header_text') }}</div>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="mail-item" :value="mailItem.mail_content_1.content"
                    v-for="(mailItem, mailIndex) in mailList" :key="mailIndex">
                    <template v-slot:prepend>
                        <img :src="mailItem.icon" width="20" />
                    </template>
                    <v-list-item-title class="ml-2" style="line-height: 18px;">
                        <div :class="mailItem.mail_content_1.color">{{ mailItem.mail_content_1.content }}</div>
                        <div :class="mailItem.mail_content_2.color">{{ mailItem.mail_content_2.content }}</div>
                    </v-list-item-title>
                    <template v-slot:append>
                        <div :class="mailItem.mail_rail_1.color">{{ mailItem.mail_rail_1.content }}</div>
                        <div class="completion-area" :class="mailItem.mail_rail_2.color">
                            {{ mailItem.mail_rail_2.content }}
                        </div>
                    </template>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-bottom-navigation>
    <!-- <v-navigation-drawer v-model="mailNavigation" location="bottom" temporary class="mobile-mail-menu" :scrim="true">
        <v-list theme="dark" bg-color="transparent" class="px-2" :width="mobileWidth" style="box-shadow: none !important;">
            <v-list-item>
                <v-list-item-title class="ml-2">
                    <div class="mail-header-text">{{ t('mail_dialog.header_text') }}</div>
                </v-list-item-title>
            </v-list-item>
            <v-list-item class="mail-item" :value="mailItem.mail_content_1.content"
                v-for="(mailItem, mailIndex) in mailList" :key="mailIndex">
                <template v-slot:prepend>
                    <img :src="mailItem.icon" />
                </template>
                <v-list-item-title class="ml-2">
                    <div :class="mailItem.mail_content_1.color">{{ mailItem.mail_content_1.content }}</div>
                    <div :class="mailItem.mail_content_2.color">{{ mailItem.mail_content_2.content }}</div>
                </v-list-item-title>
                <template v-slot:append>
                    <div :class="mailItem.mail_rail_1.color">{{ mailItem.mail_rail_1.content }}</div>
                    <div class="completion-area" :class="mailItem.mail_rail_2.color">{{ mailItem.mail_rail_2.content }}
                    </div>
                </template>
            </v-list-item>
        </v-list>
    </v-navigation-drawer> -->
</template>

<style lang="scss">
.mobile-menu-index {
    z-index: 1009 !important;
    overflow: inherit !important;
}

.menu-text-color {
    color: #7782AA;

    .v-btn__content {
        font-weight: 700 !important;
        font-size: 12px !important;
    }

    .chat-box-text {
        top: -1px;
        right: -6px;
        position: absolute;
        font-weight: 800;
        font-size: 8px;
        color: #000000;
        background: #12ff76;
        border-radius: 15px;
        padding: 0px 2px;
    }
}


.mobile-mail-menu {

    margin-left: auto !important;
    left: unset !important;
    bottom: 90px;
    top: unset !important;

    // background: transparent !important;
    // box-shadow: none !important;
    // border: none !important;
    // height: 340px !important;

    .v-list-item-title {
        font-weight: 500;
        font-size: 12px;
        color: #7782aa;
    }

    .v-list-item__append {
        display: block !important;
        text-align: center;
    }

    .mail-header-text {
        font-weight: 700;
        font-size: 14px;
        color: #ffffff;
    }

    .completion-area {
        background-color: #000000;
        border-radius: 20px;
        margin-top: 2px;
    }

    .text-color-gray {
        font-weight: 500;
        font-size: 9px;
        color: #7782aa;
    }

    .text-color-white {
        font-weight: 500;
        font-size: 10px;
        color: #ffffff;
    }

    .money-color-white {
        font-weight: 800;
        font-size: 12px;
        color: #ffffff;
    }

    .text-color-yellow {
        font-weight: 600;
        font-size: 8px;
        color: #F9BC01;
        padding: 3px 0px;
    }

    .text-color-green {
        font-weight: 600;
        font-size: 8px;
        color: #01983A;
        padding: 3px 0px;
    }

    .mail-item {
        margin-top: 4px !important;
        background-color: #1C1929 !important;
        padding: 4px 8px !important;
        border-radius: 12px !important;
    }
}

.share-img-position {
    position: absolute;
    top: -15px;
    width: 40px;
}

.share-background-img-position {
    position: absolute;
    top: -18px;
    width: 46px;
}

.circle-background {
    position: absolute;
    top: -22px;
    width: 54px;
    height: 54px;
    background-color: #000000;
    border-radius: 50%;
}

.share-ripple-btn {
    .v-ripple__container {
        opacity: 0 !important;
    }
}
</style>