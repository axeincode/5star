<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import { type GetUserInfo } from "@/interface/user";
import { authStore } from "@/store/auth";
import UserInformation from "@/components/account/user_information/pc/index.vue";
import MUserInformation from "@/components/account/user_information/mobile/index.vue";
import GameProviders from "@/components/global/game_provider/index.vue";
import SuspendAccount from "@/components/account/suspend_account/index.vue";
import MSuspendAccount from "@/components/account/suspend_account/mobile/index.vue";
import MDialog from "./dialog/index.vue";

const { t } = useI18n();
const { width } = useDisplay()

const accountWidth = ref<string>('account-container');
const activeMenuIndex = ref<number>(0);
const mobileDialogVisible = ref<boolean>(false);
const selectedMenuItem = ref<string>(t('account.menu.user_info_text'));

const menuList = ref<Array<string>>([
    t('account.menu.user_info_text'),
    t('account.menu.personal_info_text'),
    t('account.menu.document_text'),
    t('account.menu.preference_text'),
    t('account.menu.suspend_account_text'),
])

const handleMenu = (index: number) => {
    activeMenuIndex.value = index;
}

const handleDropdown = (item: string, index: number) => {
    selectedMenuItem.value = item;
    activeMenuIndex.value = index;
}

const selectActiveIndex = (index: number) => {
    activeMenuIndex.value = index;
    selectedMenuItem.value = menuList.value[index];
    mobileDialogVisible.value = false;
}

const mobileWidth: any = computed(() => {
    return width.value;
})

const userInfo = computed((): GetUserInfo => {
    const { getUserInfo } = storeToRefs(authStore());
    return getUserInfo.value;
})

const rightBarToggle = computed(() => {
    const { getRightBarToggle } = storeToRefs(appBarStore());
    return getRightBarToggle.value;
})

watch(rightBarToggle, (newValue) => {
    if (mobileWidth.value > 1280) {
        if (newValue) {
            accountWidth.value = "account-container";
        } else {
            accountWidth.value = "account-container-1";
        }
    } else {
        accountWidth.value = "account-container-2";
    }
})

watch(mobileWidth, (newValue: number) => {
    if (newValue > 1280) {
        if (rightBarToggle.value) {
            accountWidth.value = "account-container";
        } else {
            accountWidth.value = "account-container-1";
        }
    } else {
        accountWidth.value = "account-container-2";
    }
})

const mDialogHide = () => {
    mobileDialogVisible.value = false;
}

onMounted(() => {
    if (mobileWidth.value > 1280) {
        if (rightBarToggle.value) {
            accountWidth.value = "account-container";
        } else {
            accountWidth.value = "account-container-1";
        }
    } else {
        accountWidth.value = "account-container-2";
    }
    if (mobileWidth.value < 600) {
        mobileDialogVisible.value = true;
    }
})
</script>

<template>
    <div :class="accountWidth" v-if="mobileWidth > 600">
        <v-row class="ma-0">
            <v-col cols="3" md="3" lg="3" class="account-menu pt-10" style="height: 320px;">
                <v-list theme="dark">
                    <template v-for="(item, index) in menuList" :key="index">
                        <v-list-item :value="item" @click="handleMenu(index)">
                            <v-list-item-title>
                                <div :class="index == activeMenuIndex ? 'text-700-14 white' : 'text-500-14 text-gray'">
                                    {{ item }}
                                </div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider class="account-divider" v-if="index != 4"></v-divider>
                    </template>
                </v-list>
            </v-col>
            <v-col cols="9" md="9" lg="9" class="pa-0 pl-4">
                <UserInformation v-if="activeMenuIndex == 0" />
                <SuspendAccount v-if="activeMenuIndex == 4" />
            </v-col>
        </v-row>
    </div>
    <div v-else>
        <v-dialog v-model="mobileDialogVisible" width="312">
            <MDialog @mDialogHide="mDialogHide" :avatar="userInfo.avatar" :nickName="userInfo.name"
                @selectActiveIndex="selectActiveIndex" />
        </v-dialog>
        <div class="m-account-container pt-8">
            <div class="m-account-tab-body mx-3 d-flex align-center">
                <v-btn class="m-account-back-btn">
                    <img src="@/assets/public/svg/icon_public_11.svg" width="18" />
                    {{ t('account.edit_text') }}
                </v-btn>
                <v-menu offset="20" class="sport-menu">
                    <template v-slot:activator="{ props }">
                        <v-card color="#1C1929" theme="dark" class="ml-auto mr-2" style="width: 200px;">
                            <v-list-item class="sport-item" v-bind="props" append-icon="mdi-chevron-down"
                                value="account menu">
                                <v-list-item-title class="ml-3 text-800-12 white">{{ selectedMenuItem }}</v-list-item-title>
                            </v-list-item>
                        </v-card>
                    </template>
                    <v-list theme="dark" bg-color="#211F31">
                        <v-list-item v-for="(item, i) in menuList" :key="i" :value="item" class="sport-item"
                            @click="handleDropdown(item, i)">
                            <v-list-item-title class="text-center">{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <MUserInformation v-if="activeMenuIndex == 0" />
            <MSuspendAccount v-if="activeMenuIndex == 4" />
        </div>
    </div>
    <div class="mx-2 mt-10">
        <GameProviders />
    </div>
</template>

<style lang="scss">
.account-container {
    margin: -20px 20px;
    padding-bottom: 20px;
}

.account-container-1 {
    margin: -20px 10px;
    padding-bottom: 20px;
}

.account-container-2 {
    // background: #211F31;
    margin: -20px 0px;
    padding-bottom: 20px;
    border-radius: 8px;
}

.m-account-container {
    background: #211F31;
    margin: -20px 0px;
    padding-bottom: 20px;
    border-radius: 8px;
}


.account-menu {
    background-color: #211F31;
    border-radius: 0px 0px 12px 12px !important;
    height: 600px;

    .v-list {
        background: inherit !important;
    }
}

.account-divider {
    margin: auto;
    border-width: thin;
    background: #353652;
}

.m-account-tab-body {
    background: #29253C;
    height: 48px;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    border-radius: 12px;

    .m-account-back-btn {

        background: transparent !important;
        box-shadow: none !important;

        .v-btn__content {
            font-weight: 700;
            font-size: 12px;
            color: #FFFFFF;
        }
    }
}
</style>