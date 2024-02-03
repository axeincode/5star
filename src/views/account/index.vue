<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import { type GetUserInfo } from "@/interface/user";
import { authStore } from "@/store/auth";
import { refferalStore } from '@/store/refferal';
import UserInformation from "@/components/account/user_information/pc/index.vue";
import MUserInformation from "@/components/account/user_information/mobile/index.vue";
import GameProviders from "@/components/global/game_provider/index.vue";
import SuspendAccount from "@/components/account/suspend_account/index.vue";
import MSuspendAccount from "@/components/account/suspend_account/mobile/index.vue";
import MDialog from "./dialog/index.vue";


// const UserInformation = defineAsyncComponent(() => import("@/components/account/user_information/pc/index.vue"));
// const MUserInformation = defineAsyncComponent(() => import("@/components/account/user_information/mobile/index.vue"));
// const GameProviders = defineAsyncComponent(() => import("@/components/global/game_provider/index.vue"));
// const SuspendAccount = defineAsyncComponent(() => import("@/components/account/suspend_account/index.vue"));
// const MSuspendAccount = defineAsyncComponent(() => import("@/components/account/suspend_account/mobile/index.vue"));
// const MDialog = defineAsyncComponent(() => import("./dialog/index.vue"));

const { t } = useI18n();
const { width } = useDisplay()
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setActiveAccountIndex } = appBarStore();
const route = useRoute();
const router = useRouter();

const accountWidth = ref<string>('account-container');
const activeMenuIndex = ref<any>(0);
const mobileDialogVisible = ref<boolean>(false);
const selectedMenuItem = ref<string>(t('account.menu.user_info_text'));
const accountMenuShow = ref<boolean>(false);

const menuList = ref<Array<string>>([
  t('account.menu.user_info_text'),
  t('account.menu.personal_info_text'),
  t('account.menu.document_text'),
  t('account.menu.preference_text'),
  t('account.menu.suspend_account_text'),
])

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
})


const handleMenu = (index: number) => {
  activeMenuIndex.value = index;
}

const handleDropdown = (item: string, index: number) => {
  setActiveAccountIndex(index)
  selectedMenuItem.value = item;
  activeMenuIndex.value = index;
  router.push({ name: "Account", params: { index: activeMenuIndex.value }, query: { index: activeMenuIndex.value } });
}

const activeAccountIndex = computed(() => {
  const { getActiveAccountIndex } = storeToRefs(appBarStore());
  return getActiveAccountIndex.value
})

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

const accountHeight = computed(() => {
  return window.innerHeight;
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

// watch(mobileDialogVisible, (value: boolean) => {
//     setOverlayScrimShow(value);
//     setMainBlurEffectShow(value);
// })

const mDialogHide = () => {
  mobileDialogVisible.value = false;
}

const goBeforePage = () => {
  router.go(-1);
  setTimeout(() => {
    activeMenuIndex.value = route.query.index ? route.query.index : 0
    setActiveAccountIndex(activeMenuIndex.value)
  }, 500)
}

watch(activeAccountIndex, (value) => {
  activeMenuIndex.value = value;
  selectedMenuItem.value = menuList.value[value];
})

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
  activeMenuIndex.value = route.query.index ? route.query.index : 0
  setActiveAccountIndex(activeMenuIndex.value)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})
</script>

<template>
  <div :class="accountWidth" v-if="mobileWidth > 600">
    <v-row class="ma-0">
      <v-col cols="3" md="3" lg="3" class="account-menu pt-10" style="height: 320px">
        <v-list theme="dark">
          <template v-for="(item, index) in menuList" :key="index">
            <v-list-item :value="item" @click="handleMenu(index)">
              <v-list-item-title>
                <div
                  :class="
                    index == activeMenuIndex
                      ? 'text-700-14 white'
                      : 'text-500-14 text-gray'
                  "
                >
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
    <!-- <v-dialog v-model="mobileDialogVisible" width="312">
            <MDialog @mDialogHide="mDialogHide" :avatar="userInfo.avatar" :nickName="userInfo.name"
                @selectActiveIndex="selectActiveIndex" />
        </v-dialog> -->
    <div
      class="m-account-container"
      :class="refferalAppBarShow ? 'pt-8' : 'pt-12'"
      :style="{ height: accountHeight + 'px' }"
    >
      <div class="m-account-tab-body mx-3 d-flex align-center">
        <v-btn class="m-account-back-btn text-none" @click="goBeforePage">
          <v-icon class="header-mdi-icon">mdi-chevron-left</v-icon>
          <!-- <img src="@/assets/public/svg/icon_public_11.svg" width="18" /> -->
          {{ t("account.back_text") }}
        </v-btn>
        <v-menu
          offset="20"
          v-model:model-value="accountMenuShow"
          class="m-account-menu-list"
        >
          <template v-slot:activator="{ props }">
            <v-card color="#15161C" theme="dark" class="ml-auto mr-2 m-account-menu-card">
              <v-list-item
                v-bind="props"
                :append-icon="accountMenuShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                value="account menu"
              >
                <v-list-item-title class="ml-3 text-800-12 white">{{
                  selectedMenuItem
                }}</v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#1D2027" style="border-radius:8px">
            <v-list-item
              v-for="(item, i) in menuList"
              :key="i"
              :value="item"
              :class="{'m-account-menu-item-border':selectedMenuItem == item}"
              @click="handleDropdown(item, i)"
            >
              <v-list-item-title class="text-center text-400-12 gray">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <MUserInformation v-if="activeMenuIndex == 0" />
      <MSuspendAccount v-if="activeMenuIndex == 4" />
    </div>
  </div>
  <div class="mx-2 pt-10">
    <GameProviders />
  </div>
</template>

<style lang="scss">
.account-container {
  margin: -20px 40px;
  padding-bottom: 20px;
}

.account-container-1 {
  margin: -20px 40px;
  padding-bottom: 20px;
}

.account-container-2 {
  // background: #1D2027;
  margin: -20px 0px;
  padding-bottom: 20px;
  border-radius: 8px;
}

.m-account-container {
  background: #1D2027;
  margin: -40px 0px;
  padding-bottom: 20px;
  border-radius: 8px;
}

.m-account-menu-card {
  width: 200px;
  height: 40px;
  border-radius: 8px !important;

  .v-list-item__append > .v-icon {
    font-size: 18px;
    margin-inline-start: 0px !important;
  }
}

.m-account-menu-list .v-overlay__content::after {
  content: "";
  position: absolute;
  align-self: center;
  top: -25px;
  left: 50%;
  border: 15px solid #1D2027;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-width: 8px;
  border-left-width: 8px;
}

.account-menu {
  background-color: #1D2027;
  border-radius: 0px 0px 12px 12px !important;
  height: 600px;

  .v-list {
    background: inherit !important;
  }
}

.account-divider {
  margin: auto;
  border-width: thin;
  background: #23262F;
}

.m-account-tab-body {
  background: #1D2027;
  height: 48px;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  border-radius: 8px;

  .m-account-back-btn {
    background: transparent !important;
    box-shadow: none !important;

    .v-btn__content {
      font-weight: 700;
      font-size: 12px;
      color: #ffffff;
    }
  }
}

.m-account-menu-item-border{
  margin: 8px;
  border-radius: 8px !important;
  border: 1px solid #00b25c !important;
  height: 36px !important;
}
</style>
