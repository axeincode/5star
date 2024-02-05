<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { type ChatRequestData } from "@/interface/chat";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
import { useDisplay } from 'vuetify'

const { setRightBarToggle } = appBarStore();
const { setNavBarToggle } = appBarStore();

// mobile version name
const { name, width } = useDisplay()
const { t } = useI18n();
// sport items
const sportItems = ref<Array<string>>([
  t("rightBar.dropdownItem.sport"),
  t("rightBar.dropdownItem.casino"),
]);
// selected sport item
const selectedItem = ref<string>("Sport");
// const drawer = ref<boolean>(true);
  const drawer = ref<boolean>(false);

const rightBarToggle = computed(() => {
  const { getRightBarToggle } = storeToRefs(appBarStore());
  return getRightBarToggle.value;
});

const mobileVersion = computed(() => {
  return name.value
});

const mobileWidth: any = computed(() => {
  return width.value;
})

watch(rightBarToggle, (newValue) => {
  drawer.value = newValue;
  if (mobileWidth.value < 600 && newValue) {
    setNavBarToggle(false);
  }
})

watch(drawer, (newValue: boolean) => {
  setRightBarToggle(newValue);
})

const handleDropdown = (item: string): void => {
  selectedItem.value = item;
};
// chat message array
const messages = ref<Array<ChatRequestData>>([
  {
    type: "receiver",
    avatar: new URL(
      "@/assets/chat/image/user_3.png",
      import.meta.url
    ).href,
    grade: "V18",
    gradeColor: "grade-color-white",
    gradeBackground: new URL(
      "@/assets/chat/svg/ellipse_v18.svg",
      import.meta.url
    ).href,
    sender: "Game",
    receiver: "Jimmy",
    message: "Provider",
    starLevel: [
      new URL("@/assets/chat/svg/heart_v18_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v18_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v18_up.svg", import.meta.url)
        .href,
      new URL(
        "@/assets/chat/svg/heart_v18_down.svg",
        import.meta.url
      ).href,
      new URL(
        "@/assets/chat/svg/heart_v18_down.svg",
        import.meta.url
      ).href,
    ],
  },
  {
    type: "receiver",
    avatar: new URL(
      "@/assets/chat/image/user_1.png",
      import.meta.url
    ).href,
    grade: "V28",
    gradeColor: "grade-color-black",
    gradeBackground: new URL(
      "@/assets/chat/svg/ellipse_v28.svg",
      import.meta.url
    ).href,
    sender: "Jimmy",
    receiver: "Game",
    message: "Suibian dajige ziz ajapospoaap",
    starLevel: [
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL(
        "@/assets/chat/svg/heart_v28_down.svg",
        import.meta.url
      ).href,
      new URL(
        "@/assets/chat/svg/heart_v28_down.svg",
        import.meta.url
      ).href,
    ],
  },
  {
    type: "sender",
    avatar: new URL(
      "@/assets/chat/image/user_2.png",
      import.meta.url
    ).href,
    grade: "V1",
    gradeColor: "grade-color-black",
    gradeBackground: new URL(
      "@/assets/chat/svg/ellipse_v1.svg",
      import.meta.url
    ).href,
    sender: "Leo",
    receiver: "Game",
    message: "Suibian dajige ziz ajapospoaap",
    starLevel: [
      new URL("@/assets/chat/svg/heart_v1_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v1_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v1_up.svg", import.meta.url)
        .href,
      new URL(
        "@/assets/chat/svg/heart_v1_down.svg",
        import.meta.url
      ).href,
      new URL(
        "@/assets/chat/svg/heart_v1_down.svg",
        import.meta.url
      ).href,
    ],
  },
  {
    type: "receiver",
    avatar: new URL(
      "@/assets/chat/image/user_1.png",
      import.meta.url
    ).href,
    grade: "V28",
    gradeColor: "grade-color-black",
    gradeBackground: new URL(
      "@/assets/chat/svg/ellipse_v28.svg",
      import.meta.url
    ).href,
    sender: "Jimmy",
    receiver: "Game",
    message: "Suibian dajige ziz ajapospoaap",
    starLevel: [
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL(
        "@/assets/chat/svg/heart_v28_down.svg",
        import.meta.url
      ).href,
      new URL(
        "@/assets/chat/svg/heart_v28_down.svg",
        import.meta.url
      ).href,
    ],
  },
  {
    type: "sender",
    avatar: new URL(
      "@/assets/chat/image/user_2.png",
      import.meta.url
    ).href,
    grade: "V1",
    gradeColor: "grade-color-black",
    gradeBackground: new URL(
      "@/assets/chat/svg/ellipse_v1.svg",
      import.meta.url
    ).href,
    sender: "Leo",
    receiver: "Game",
    message: "Suibian dajige ziz ajapospoaap",
    starLevel: [
      new URL("@/assets/chat/svg/heart_v1_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v1_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v1_up.svg", import.meta.url)
        .href,
      new URL(
        "@/assets/chat/svg/heart_v1_down.svg",
        import.meta.url
      ).href,
      new URL(
        "@/assets/chat/svg/heart_v1_down.svg",
        import.meta.url
      ).href,
    ],
  },
  {
    type: "receiver",
    avatar: new URL(
      "@/assets/chat/image/user_1.png",
      import.meta.url
    ).href,
    grade: "V28",
    gradeColor: "grade-color-black",
    gradeBackground: new URL(
      "@/assets/chat/svg/ellipse_v28.svg",
      import.meta.url
    ).href,
    sender: "Jimmy",
    receiver: "Game",
    message: "Suibian dajige ziz ajapospoaap",
    starLevel: [
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL("@/assets/chat/svg/heart_v28_up.svg", import.meta.url)
        .href,
      new URL(
        "@/assets/chat/svg/heart_v28_down.svg",
        import.meta.url
      ).href,
      new URL(
        "@/assets/chat/svg/heart_v28_down.svg",
        import.meta.url
      ).href,
    ],
  },
]);
onMounted(() => {
  // drawer.value = mobileWidth.value < 1280 ? false : true;
})
</script>

<template>
  <!-------------        :temporary="mobileWidth < 1280"                   ------------>
  <v-navigation-drawer class="right-nav-background" location="right" width="340"
    v-model="drawer" :fullWidth="mobileVersion == 'sm'" :class="[mobileWidth < 600 ? 'pb-14' : '']">
    <template v-slot:prepend>
      <v-card color="#1D2027" theme="dark" class="right-bar-card-border">
        <v-row class="ma-2 mt-3 align-center">
          <v-btn class="right-btn" icon="true" @click.stop="setRightBarToggle(false)">
            <v-icon icon="mdi-close" class="card-close-icon" />
          </v-btn>
          <img src="@/assets/chat/svg/info.svg" class="ml-auto" width="20" />
          <img src="@/assets/chat/svg/img_nav_87.svg" class="ml-2" width="20" />
          <v-menu offset="20" class="sport-menu">
            <template v-slot:activator="{ props }">
              <v-card color="#29263C" theme="dark" class="ml-auto">
                <v-list-item class="sport-item" v-bind="props" :title="selectedItem" append-icon="mdi-chevron-down"
                  value="sport">
                </v-list-item>
              </v-card>
            </template>
            <v-list theme="dark" bg-color="#1D2027">
              <v-list-item v-for="(item, i) in sportItems" :key="i" :value="item" class="sport-item"
                @click="handleDropdown(item)">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-card>
    </template>
    <v-list density="compact" nav>
      <template v-for="(messageItem, j) in messages" :key="j">
        <v-list-item v-if="messageItem.type == 'receiver'">
          <div class="chat-item">
            <div class="chat-avatar">
              <img src="@/assets/chat/image/ellipse.png" />
              <img :src="messageItem.avatar" class="user-avatar" />
              <p class="grade-position" :class="messageItem.gradeColor">
                {{ messageItem.grade }}
              </p>
              <img :src="messageItem.gradeBackground" class="grade-background" />
              <img :src="messageItem.starLevel[0]" class="star-level-1" />
              <img :src="messageItem.starLevel[1]" class="star-level-2" />
              <img :src="messageItem.starLevel[2]" class="star-level-3" />
              <img :src="messageItem.starLevel[3]" class="star-level-4" />
              <img :src="messageItem.starLevel[4]" class="star-level-5" />
            </div>
            <div class="chat-content">
              <div class="chat-name mt-3">{{ messageItem.sender }}</div>
              <v-card color="#23262F" theme="dark" class="pa-2 chat-content-border">
                <span class="receiver-color">@{{ messageItem.receiver }}</span>
                <span>{{ messageItem.message }}</span>
              </v-card>
            </div>
          </div>
        </v-list-item>
        <v-list-item v-else>
          <div class="chat-item">
            <div class="chat-avatar">
              <img src="@/assets/chat/image/ellipse.png" class="sender-ellipse" />
              <img :src="messageItem.avatar" class="sender-avatar" />
              <p class="sender-grade-position" :class="messageItem.gradeColor">
                {{ messageItem.grade }}
              </p>
              <img :src="messageItem.gradeBackground" class="sender-grade-background" />
              <img :src="messageItem.starLevel[0]" class="sender-star-level-1" />
              <img :src="messageItem.starLevel[1]" class="sender-star-level-2" />
              <img :src="messageItem.starLevel[2]" class="sender-star-level-3" />
              <img :src="messageItem.starLevel[3]" class="sender-star-level-4" />
              <img :src="messageItem.starLevel[4]" class="sender-star-level-5" />
            </div>
            <div class="sender-content">
              <div class="sender-name mt-3">{{ messageItem.sender }}</div>
              <v-card color="#12FF76" theme="dark" class="pa-2 sender-content-border">
                <span class="receiver-color">@{{ messageItem.receiver }}</span>
                <span>{{ messageItem.message }}</span>
              </v-card>
            </div>
          </div>
        </v-list-item>
      </template>
    </v-list>

    <template v-slot:append>
      <div class="pa-1 d-flex align-center">
        <v-text-field :placeholder="t('rightBar.bottom.yourMessage')" class="form-textfield dark-textfield" variant="solo"
          density="comfortable" />
        <img src="@/assets/public/svg/icon_public_51.svg" class="emoticon-icon" />
        <v-btn class="right-btn" icon="true" theme="dark" color="#009B3A">
          <v-icon icon="mdi-arrow-up" color="#000000" />
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss">
.right-nav-background {
  background-color: #1D2027 !important;
  color: #7782AA !important;
  border: 2px !important;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25) !important;
  top: 0px !important;
  height: 100% !important;
}

.v-navigation-drawer__content {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden !important;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
  }
}

.right-bar-card-border {
  border-radius: 0px 0px 32px 32px !important;
  height: 68px !important;
}

.card-close-icon {
  font-size: 20px;
  font-weight: 800;
  color: #7782aa;
}

.sport-item {
  padding: 4px 8px !important;

  .v-list-item-title {
    font-weight: 700;
    font-size: 14px;
    color: #7782aa;
  }
}

.sport-menu {
  margin-left: auto !important;

  .v-overlay__content::after {
    content: "";
    position: absolute;
    align-self: center;
    float: right;
    top: -16px;
    border: 9px solid #1D2027;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-width: 7px;
    border-left-width: 7px;
  }
}

// chat menu receiver class
.chat-item {
  display: flex;
  position: relative;
  height: auto;
  min-height: 86px;
}

.chat-avatar {}

.user-avatar {
  top: 9px;
  position: absolute;
  left: 9px;
  width: 44px;
}

.grade-background {
  top: 39px;
  position: absolute;
  left: 8px;
}

.grade-position {
  top: 43px;
  position: absolute;
  left: 21px;
  z-index: 100;
  font-weight: 700;
  font-size: 12px;
}

.grade-color-white {
  color: #ffffff;
}

.grade-color-black {
  color: #000000;
}

.star-level-1 {
  position: absolute;
  top: 63px;
  left: 0px;
}

.star-level-2 {
  position: absolute;
  top: 63px;
  left: 12px;
}

.star-level-3 {
  position: absolute;
  top: 63px;
  left: 24px;
}

.star-level-4 {
  position: absolute;
  top: 63px;
  left: 36px;
}

.star-level-5 {
  position: absolute;
  top: 63px;
  left: 48px;
}

.chat-content {
  min-width: 166px;
}

.chat-name {
  font-weight: 600;
  font-size: 14px;
}

.chat-content-border {
  box-shadow: 0px 3px 2px 1px rgba(0, 0, 0, 0.11) !important;
  border-radius: 0px 20px 20px 20px !important;
  color: #7782aa;
  font-weight: 600;
  font-size: 12px;
}

.receiver-color {
  color: #01983a;
  margin-right: 4px;
}

// chat menu sender class
.sender-ellipse {
  top: 0px;
  position: absolute;
  right: 0px;
}

.sender-content-border {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px 0px 20px 20px;
  color: #24353c;
  font-weight: 600;
  font-size: 12px;
}

.sender-avatar {
  top: 9px;
  position: absolute;
  right: 9px;
  width: 44px;
}

.sender-grade-background {
  top: 39px;
  position: absolute;
  right: 2px;
}

.sender-grade-position {
  top: 43px;
  position: absolute;
  right: 21px;
  z-index: 100;
  font-weight: 700;
  font-size: 12px;
}

.sender-star-level-1 {
  position: absolute;
  top: 63px;
  right: 48px;
}

.sender-star-level-2 {
  position: absolute;
  top: 63px;
  right: 36px;
}

.sender-star-level-3 {
  position: absolute;
  top: 63px;
  right: 24px;
}

.sender-star-level-4 {
  position: absolute;
  top: 63px;
  right: 12px;
}

.sender-star-level-5 {
  position: absolute;
  top: 63px;
  right: 0px;
}

.sender-content {
  position: absolute;
  right: 62px;
  min-width: 166px;
}

.sender-name {
  text-align: right;
  font-weight: 600;
  font-size: 14px;
}

// emoticon icon position
.emoticon-icon {
  position: absolute;
  left: 244px;
}
</style>
