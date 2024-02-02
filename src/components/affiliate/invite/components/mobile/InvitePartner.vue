<script lang="ts" setup>
import { onMounted, watch, toRefs } from "vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import Notification from "@/components/global/notification/index.vue";
import { appBarStore } from "@/store/appBar";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import { useToast } from "vue-toastification";
import * as clipboard from "clipboard-polyfill";
import { type InviteData } from "@/interface/invite";
import QrcodeVue from 'qrcode.vue'

const { t } = useI18n();
const { width } = useDisplay();
const props = defineProps<{ inviteItem: InviteData }>();
const { inviteItem } = toRefs(props);
const size = ref<number>(132)

const notificationText = ref<string>("");
const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const inviteList = ref([
  {
    title: "Invitation URL:",
    content: "https://betfiery.com?referralcode=62737...",
  },
  {
    title: "Copy the invitation code",
    content: "6273728f800a98d4025a3073",
  },
]);

const mobileWidth = computed(() => {
  return width.value;
});

const inviteUrlCopy = (content: string) => {
  clipboard.writeText(content).then(
    () => {
      console.log("Copied to clipboard!");
      notificationText.value = "Successful replication";
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 5000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: SuccessIcon,
        rtl: false,
      });
    },
    (error) => {
      console.error("Could not copy text: ", error);
    }
  );
};

watch(inviteItem, (new_value) => {
  if (inviteItem != undefined) {
    inviteList.value[0].content = new_value.web_invite_url;
    inviteList.value[1].content = new_value.invite_code;
  }
}, { deep: true });
</script>

<template>
  <v-row class="mx-4 mt-2 mb-1 align-center">
    <v-col cols="12" md="5" lg="5" class="ma-0 pa-0" style="height: 100%">
      <v-card color="#1D2027" theme="dark" class="text-center">
        <p class="mt-3 m-invite-partner-text text-center">
          {{ t("affiliate.invite.invite_partner") }}
        </p>
        <v-list-item
          class="m-invite-url-item"
          v-for="(item, index) in inviteList"
          :key="index"
          :style="{
            height: index == 0 ? 'unset' : '40px',
          }"
        >
          <v-list-item-title class="ml-4 text-left" style="line-height: 20px">
            <div class="text-400-10 gray">{{ item.title }}</div>
            <div class="text-600-12">{{ item.content }}</div>
            <div class="m-invite-code-body text-center" v-if="index == 0">
              <QrcodeVue :value="inviteList[0].content" :size="size" class="mt-2" />
            </div>
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
              icon=""
              @click="inviteUrlCopy(item.content)"
              class="m-invite-url-copy-btn"
              bg-color="#23262F"
              width="24"
              height="24"
            >
              <img src="@/assets/public/svg/icon_public_71.svg" width="16" />
            </v-btn>
          </template>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.m-invite-code-body {
  width: 156px;
  height: 156px;
  background: #ffffff;
  margin: auto;
  margin-top: 16px;
  margin-bottom: 16px;
}

.v-list-item__append {
  // margin-top: 7px;
  // display: block !important;
  // align-self: baseline;
}
</style>
