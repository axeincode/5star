<script lang="ts" setup>
import { ref, toRefs, watch, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import MSignIn from "@/components/auth/components/mobile/sign_in/index.vue";
import MSignUp from "@/components/auth/components/mobile/sign_up/index.vue";

type dialogType = "login" | "signup" | "signout";

const { t } = useI18n();

const { setAuthModalType } = authStore();
const { setAuthDialogVisible } = authStore();

const dialogCheckBox = ref<boolean>(false);
const signUpDialogCheck = ref<boolean>(false);

const authModalType = computed(() => {
  const { getAuthModalType } = storeToRefs(authStore());
  return getAuthModalType.value;
});

const closeDialog = () => {
  if (authModalType.value == "signup") {
    signUpDialogCheck.value = !signUpDialogCheck.value;
  } else {
    setAuthDialogVisible(false);
  }
};

const switchAuthDialog = (type: string) => {
  dialogCheckBox.value = type == "signup" ? true : false;
};

watch(dialogCheckBox, (value) => {
  let type = value ? "signup" : "signin";
  setAuthModalType(type);
});

onMounted(() => {
  dialogCheckBox.value = authModalType.value == "signup" ? true : false;
});
</script>

<template>
  <div class="m-auth-dialog-container">
    <div class="m-auth-dialog-header mb-2">
      <div class="m-auth-dialog-toggle">
        <input type="checkbox" id="mobile-dialog-toggle" v-model="dialogCheckBox" />
        <label for="mobile-dialog-toggle">
          <div class="login">
            <p>{{ t("main.loginButton") }}</p>
          </div>
          <div class="register">
            <p>{{ t("main.signupButton") }}</p>
          </div>
        </label>
      </div>
    </div>
    <div clang="m-auth-dialog-body">
      <MSignUp
        v-if="dialogCheckBox"
        @switchAuthDialog="switchAuthDialog"
        :signUpDialogCheck="signUpDialogCheck"
      />
      <MSignIn v-else />
    </div>
    <v-btn class="m-close-btn" icon="true" width="30" height="30" @click="closeDialog">
      <img src="@/assets/public/svg/icon_public_10.svg" />
    </v-btn>
  </div>
</template>
<style lang="scss">
.m-auth-dialog-container {
  height: 100vh;
  width: 100%;
  background: $color_1;

  .m-auth-dialog-header {
    width: 280px;
    background: #1d2027;
    margin: auto;
    height: 48px;
    border-radius: 0px 0px 24px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 6px 1px #0000004d;

    .m-auth-dialog-toggle {
      margin-top: 4px;
      margin-bottom: 4px;

      label {
        width: 200px;
        height: 40px;
        position: relative;
        display: block;
        background: #15161c;
        border-radius: 20px !important;
        cursor: pointer;
        transition: 0.1s;
        box-shadow: 0px 0px 6px 1px #00000059 inset;

        div {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 12px;
        }

        .login {
          left: 36px;
          transition: 0.3s;
          color: white;

          img {
            width: 20px;
            height: 24px;
            margin-right: 4px;
          }
        }

        .register {
          left: 125px;
          transition: 0.3s;
          color: white;

          img {
            width: 20px;
            margin-right: 4px;
          }
        }
      }

      label:after {
        content: "";
        width: 98px;
        height: 36px;
        position: absolute;
        top: 2px;
        left: 2px;
        background: #009b3a;
        border-radius: 18px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
      }

      input {
        width: 0;
        height: 0;
        visibility: hidden;
        position: absolute;
      }

      input:checked + label:after {
        left: 100px;
      }

      label:active:after {
        width: 74px;
      }

      input:checked + label .login {
        color: #7782aa;
      }

      input:checked + label .register {
        color: white;
      }
    }
  }

  .m-close-btn {
    background: none !important;
    box-shadow: none !important;
    position: absolute;
    top: 0px;
    right: 0px;
  }
}
</style>
