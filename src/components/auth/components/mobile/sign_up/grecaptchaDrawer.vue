<template>
  <v-navigation-drawer
    v-model="modelValueNew"
    location="top"
    class="m-grecaptcha-drawer"
    temporary
    :touchless="true"
    :style="{
      height: 'unset',
      top: '0px',
      zIndex: 9147483646,
      background: 'unset !important'
    }"
  >
    <div class="m-grecaptcha-body">
      <div class="text-700-14 text-center title">Tell us you are human</div>
      <div class="m-grecaptcha-detail-card mt-2 pa-1">
        <div class="cf-turnstile" id="example-container"></div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { NETWORK } from "@/net/NetworkCfg";
import { Network } from "@/net/Network";
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  id: {
    type: String
  }
});

const emit = defineEmits(["update:modelValue", "grecaptchaSuccess"]);

const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});

const network: Network = Network.getInstance();
const sitekey = import.meta.env.VITE_CLOUDFLARE_SITEKEY;

// 关闭弹窗
const handleClose = () => {
  emit("update:modelValue", false);
};

onMounted(async () => {
  turnstile.ready(function() {
    turnstile.render("#example-container", {
      sitekey: sitekey,
      callback: function(token: any) {
        console.log(`真人验证成功 ${token}`);
        // 发送token给后端校验
        network
          .request({
            url: NETWORK.LOGIN.CLOUDFLARE_VERIFY,
            method: "POST",
            data: { token }
          })
          .then((res: any) => {
            if (res.code === 200) {
              emit("update:modelValue", false);
              emit("grecaptchaSuccess");
            }
          });
      },
      errorCallback: (err: any) => {
        console.log(`验证失败 ${err}`);
      },
      beforeInteractiveCallback: (value: any) => {
        console.log(`校验进入交互模式之前调用 ${value}`);
      }
    });
  });
});
</script>

<style lang="scss" scoped>
.m-grecaptcha-body {
  height: 160px;
  background: #fff !important;
  border-radius: 8px;
  margin: 8px;
  .title {
    padding-top: 12px;
    color: #000;
  }
  .m-grecaptcha-detail-card {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cf-turnstile {
    width: 300px;
    height: 65px;
  }
}
</style>