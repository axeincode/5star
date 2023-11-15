<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import { refferalStore } from "@/store/refferal";

const { t } = useI18n();
const { width } = useDisplay();
const { setActiveAccountIndex } = appBarStore();
const route = useRoute();
const router = useRouter();

const activeMenuIndex = ref<any>(0);
const selectedMenuItem = ref<string>(t("about.page.text_2"));
const aboutMenuShow = ref<boolean>(false);
const activeNames = ref<Array<string>>(["1"]);

const menuList = ref<Array<string>>([
  t("about.page.text_2"),
  t("about.page.text_3"),
  t("about.page.text_4"),
  t("about.page.text_5"),
  t("about.page.text_6"),
  t("about.page.text_7"),
  t("about.page.text_8"),
  t("about.page.text_9"),
]);

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});

const handleMenu = (index: number) => {
  activeMenuIndex.value = index;
};

const handleDropdown = (item: string, index: number) => {
  setActiveAccountIndex(index);
  selectedMenuItem.value = item;
  activeMenuIndex.value = index;
};

const activeAccountIndex = computed(() => {
  const { getActiveAccountIndex } = storeToRefs(appBarStore());
  return getActiveAccountIndex.value;
});

const selectActiveIndex = (index: number) => {
  activeMenuIndex.value = index;
  selectedMenuItem.value = menuList.value[index];
  mobileDialogVisible.value = false;
};

const mobileWidth: any = computed(() => {
  return width.value;
});

const goBeforePage = () => {
  router.go(-1);
  setTimeout(() => {
    activeMenuIndex.value = route.query.index ? route.query.index : 0;
    setActiveAccountIndex(activeMenuIndex.value);
  }, 500);
};

watch(activeAccountIndex, (value) => {
  activeMenuIndex.value = value;
  selectedMenuItem.value = menuList.value[value];
});

onMounted(() => {
  activeMenuIndex.value = route.query.index ? route.query.index : 0;
  setActiveAccountIndex(activeMenuIndex.value);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<template>
  <div v-if="mobileWidth < 600">
    <div class="m-about-container" :class="refferalAppBarShow ? 'pt-8' : 'pt-12'">
      <div class="m-about-tab-body mx-3 d-flex align-center">
        <v-btn class="m-about-back-btn text-none" @click="goBeforePage">
          <v-icon class="header-mdi-icon">mdi-chevron-left</v-icon>
          {{ t("about.page.text_1") }}
        </v-btn>
        <v-menu offset="20" v-model:model-value="aboutMenuShow" class="m-about-menu-list">
          <template v-slot:activator="{ props }">
            <v-card color="#1C1929" theme="dark" class="ml-auto mr-2 m-about-menu-card">
              <v-list-item
                v-bind="props"
                :append-icon="aboutMenuShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                value="about menu"
              >
                <v-list-item-title class="ml-3 text-800-12 white">{{
                  selectedMenuItem
                }}</v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
          <v-list theme="dark" bg-color="#29253C">
            <v-list-item
              v-for="(item, i) in menuList"
              :key="i"
              :value="item"
              @click="handleDropdown(item, i)"
              :class="{ 'm-about-menu-item-border': selectedMenuItem == item }"
              style="min-height: 36px !important"
            >
              <v-list-item-title class="text-center text-400-12 gray">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="m-about-main-body mx-3 px-6 py-5">
        <div class="text-700-14 white">
          {{ t("about.page.text_10") }}
        </div>
        <div class="text-400-10 gray mt-2">
          {{ t("about.page.text_11") }}
        </div>
        <div class="m-about-collapse mt-2">
          <el-collapse v-model="activeNames">
            <el-collapse-item :title="t('about.page.text_12')" name="1">
              <div>{{ t("about.page.text_13") }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-about-container {
  background: #211f31;
  margin: -40px 0px 0px 0px;
  padding-bottom: 20px;
  border-radius: 8px;
}

.m-about-main-body {
  margin-top: 8px;
  border-radius: 12px;
  background: var(--BG-5-1C1929, #1c1929);
}

.m-about-menu-card {
  width: 200px;
  height: 40px;
  border-radius: 12px !important;

  .v-list-item__append > .v-icon {
    font-size: 18px;
    margin-inline-start: 0px !important;
  }
}

.m-about-collapse {
  .el-collapse {
    border-top: unset !important;
  }
  .el-collapse-item__header {
    background-color: #1c1929 !important;
    border-bottom: unset !important;
    color: var(--White-BG, #fff);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .el-collapse-item__wrap {
    background-color: #1c1929 !important;
    border-bottom: 1px solid #29263c;
  }
  .el-collapse-item__content {
    padding-bottom: 16px;
    color: var(--Sec-Text-7782AA, #7782aa);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 19.2px */
  }
  .el-icon {
    color: white !important;
    font-size: 14px;
  }
}

.m-about-menu-item-border {
  margin: 8px;
  border-radius: 12px !important;
  border: 1px solid #00b25c !important;
  height: 36px !important;
}

.m-about-menu-list .v-overlay__content::after {
  content: "";
  position: absolute;
  align-self: center;
  top: -25px;
  left: 50%;
  border: 15px solid #29253c;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-width: 8px;
  border-left-width: 8px;
}

.m-about-tab-body {
  background: #29253c;
  height: 48px;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  border-radius: 12px;

  .m-about-back-btn {
    background: transparent !important;
    box-shadow: none !important;

    .v-btn__content {
      font-weight: 700;
      font-size: 12px;
      color: #ffffff;
    }
  }
}
</style>
