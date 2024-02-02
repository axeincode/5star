<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import icon_public_83 from "@/assets/public/svg/icon_public_83.svg";
import QrcodeVue from "qrcode.vue";
import * as clipboard from "clipboard-polyfill";
import MStatistics from "./components/mobile/Statistics.vue";
import MInviteFooter from "./components/mobile/InviteFooter.vue";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { authStore } from "@/store/auth";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";

const { dispatchUserInvite } = inviteStore();
const { dispatchInviteAward } = inviteStore();

const emit = defineEmits<{ (e: "goReportTab", index: number): void }>();

const { t } = useI18n();
const svgColor = ref<string>("#ffffff");
const size = ref<number>(64);

const notificationText = ref<string>("");

const loading = ref<boolean>(false);

const svgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", svgColor.value);
    for (let sub_node of node.children) {
      sub_node.setAttribute("fill", svgColor.value);
    }
  }
  return el;
};

const inviteItem = computed(() => {
  const { getInviteItem } = storeToRefs(inviteStore());
  return getInviteItem.value;
});

const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
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

const goReportTab = () => {
  emit("goReportTab", 3);
};

const sendTelegramAppInvite = () => {
  const Telegram_BASE_URL = "https://t.me/share/url?url=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${Telegram_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const sendWhatsAppInvite = () => {
  const inviteMessage = encodeURIComponent("message");
  const WHATSAPP_BASE_URL = "https://api.whatsapp.com/send?text=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${WHATSAPP_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const sendFacebookAppInvite = () => {
  const FACEBOOK_BASE_URL = "https://www.facebook.com/sharer/sharer.php?u=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${FACEBOOK_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const sendTwitterAppInvite = () => {
  const TWITTER_BASE_URL = "https://twitter.com/intent/tweet?url=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${TWITTER_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const sendEmailAppInvite = () => {
  const EMAIL_BASE_URL = "mailto:?body=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${EMAIL_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const inviteAward = async () => {
  loading.value = true;
  await dispatchInviteAward({});
  loading.value = false;
  const toast = useToast();
  toast.success(t("Successful collection!"), {
    timeout: 3000,
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
};

onMounted(async () => {
  await dispatchUserInvite();
});
</script>

<template>
  <div>
    <div class="relative">
      <img src="@/assets/public/svg/img_public_26.svg" style="width: 100%" />
      <div class="m-my-referral-report-card">
        <div class="report-card-text">
          <inline-svg
            :src="icon_public_83"
            width="20"
            height="20"
            :transform-source="svgTransform"
          >
          </inline-svg>
          <span class="text-400-10 text-white ml-1">{{ t("agent.text_6") }}</span>
        </div>
      </div>
      <div class="m-my-referral-report-btn" @click="goReportTab"></div>
      <v-row class="m-referral-reward-card mx-4" style="margin-top: -18px">
        <v-col cols="6">
          <div class="text-400-12 text-white">{{ t("agent.text_7") }}</div>
        </v-col>
        <v-col cols="6" class="text-right">
          <v-btn width="112" height="32" :loading="loading" @click="inviteAward">
            {{ t("agent.text_8") }}
          </v-btn>
        </v-col>
      </v-row>
      <div class="m-referral-reward-card-1 mx-7 text-700-18 text-white">
        R$ {{ inviteItem.available_bonus }}
      </div>
    </div>
    <v-card class="mx-2 m-agent-referral-partner-card">
      <div class="text-700-14 text-white text-center mt-3">{{ t("agent.text_9") }}</div>
      <div class="ma-4 d-flex">
        <div class="m-agent-referral-qr-code">
          <div class="m-agent-referral-qrcode">
            <QrcodeVue
              :value="inviteItem.web_invite_url"
              :size="size"
              style="margin: 6px"
            />
          </div>
          <div
            class="text-700-10 text-black text-center mt-2"
            @click="inviteUrlCopy(inviteItem.web_invite_url)"
          >
            {{ t("agent.text_10") }}
          </div>
        </div>
        <v-card class="m-agent-referral-invitation-code ml-2">
          <div class="ma-2 text-gray text-400-10">{{ t("agent.text_11") }}</div>
          <div class="ma-2 text-400-12 text-white">{{ inviteItem.invite_code }}</div>
          <v-btn
            icon=""
            @click="inviteUrlCopy(inviteItem.invite_code)"
            class="m-invite-url-copy-btn"
            width="24"
            height="24"
          >
            <img src="@/assets/public/svg/icon_public_71.svg" width="16" />
          </v-btn>
        </v-card>
      </div>
      <div class="mt-4 mx-4 d-flex justify-between">
        <div class="text-center" @click="sendFacebookAppInvite">
          <img src="@/assets/agent/svg/img_agent_9.svg" />
          <div class="text-700-10 text-white">{{ t("agent.text_12") }}</div>
        </div>
        <div class="text-center" @click="sendTelegramAppInvite">
          <img src="@/assets/agent/svg/img_vip_15.svg" />
          <div class="text-700-10 text-white">{{ t("agent.text_13") }}</div>
        </div>
        <div class="text-center">
          <img src="@/assets/agent/svg/img_agent_10.svg" @click="sendWhatsAppInvite" />
          <div class="text-700-10 text-white">{{ t("agent.text_14") }}</div>
        </div>
        <div class="text-center">
          <img src="@/assets/agent/svg/img_agent_11.svg" @click="sendTwitterAppInvite" />
          <div class="text-700-10 text-white">{{ t("agent.text_15") }}</div>
        </div>
        <div class="text-center">
          <img src="@/assets/agent/svg/img_agent_12.svg" @click="sendEmailAppInvite" />
          <div class="text-700-10 text-white">{{ t("agent.text_16") }}</div>
        </div>
      </div>
    </v-card>
    <MStatistics :inviteItem="inviteItem" />
    <MInviteFooter />
  </div>
</template>

<style lang="scss">
.m-my-referral-report-card {
  position: absolute;
  width: 300px;
  height: 44px;
  background: $agent_referral_report_card_bg;
  border-radius: 8px;
  bottom: 16.7%;
  right: 3.1%;
  z-index: -1;

  .report-card-text {
    display: flex;
    align-items: center;
    position: absolute;
    top: 17px;
    right: 44px;
  }
}

.m-my-referral-report-btn {
  position: absolute;
  width: 130px;
  height: 30px;
  bottom: 16.7%;
  right: 3.1%;
  z-index: 2;
}

.m-referral-reward-card {
  width: 94%;
  align-items: center;
  position: absolute;
  top: 30px;

  .v-btn {
    border-radius: 8px;
    background: $agent_card_title_color;
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);

    .v-btn__content {
      color: #000;
      text-align: center;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
}

.m-referral-reward-card-1 {
  position: absolute;
  top: 76px;
}

.m-agent-referral-partner-card {
  height: 239px;
  border-radius: 8px;
  background: $agent_card_notmet_bg;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);
}

.m-agent-referral-qr-code {
  width: 76px;
  height: 106px;
  background: $agent_card_price_color;
  border-radius: 8px 8px 0px 0px;
}

.m-agent-referral-invitation-code {
  width: 100%;
  height: 106px;
  background: $agent_card_bg;
  border-radius: 8px;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.35) inset;

  .m-invite-url-copy-btn {
    border-radius: 4px;
    background: $agent_card_notmet_bg;
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
}

.Vue-Toastification__container {
  right: 0 !important;
  left: unset !important;
  width: 290px !important;
  margin-right: 37px;
  height: 60px !important;
  z-index: 10000000000000000;
}

.m-agent-referral-qrcode {
  width: 76px;
  height: 76px;
  background: #ffffff;
  border-radius: 8px;
}
</style>
