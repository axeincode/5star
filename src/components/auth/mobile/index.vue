<script lang="ts" setup>
import { ref, toRefs, watch, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';
import MSignIn from "@/components/auth/components/mobile/sign_in/index.vue";
import MSignUp from "@/components/auth/components/mobile/sign_up/index.vue";

type dialogType = "login" | "signup" | "signout";

const props = defineProps({
  modelValue: {
    type: Boolean
  }
});

const emit = defineEmits(["update:modelValue"]);

const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});


const { t } = useI18n();
const route = useRoute();

const { setAuthModalType } = authStore();
const { setAuthDialogVisible } = authStore();

const dialogCheckBox = ref<boolean>(false);
const signUpDialogCheck = ref<boolean>(false);
const signInForm = ref({
  emailAddress: "",
  password: "",
});

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

const setSignInForm=(from:any)=>{
  signInForm.value.emailAddress=from.emailAddress
  signInForm.value.password=from.password
}

watch(dialogCheckBox, (value) => {
  let type = value ? "signup" : "signin";
  setAuthModalType(type);
});

const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

onMounted(() => {
  if (!token.value) {
    if(route.query.code){
      // 带有邀请注册码的，直接打开注册弹窗
      setAuthModalType('signup');
      dialogCheckBox.value=true
    }
    dialogCheckBox.value = authModalType.value == "signup" ? true : false;
  }
});
</script>

<template>
<v-dialog
  v-model="modelValueNew"
  :width="''"
  :fullscreen="true"
  :scrim="true"
  :transition="'dialog-bottom-transition'"
  class="mobile-auth-dialog-position"
  persistent
  style="z-index: 2147483646"
>
  <div class="m-auth-dialog-container">
    <div class="m-auth-dialog-header mb-2">
      <div class="m-auth-dialog-toggle" :class="[!dialogCheckBox ? 'bgActive' : '']">
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
        @setSignInForm="setSignInForm"
        :signUpDialogCheck="signUpDialogCheck"
      />
      <MSignIn v-else  :signInForm="signInForm"/>
    </div>
    <v-btn class="m-close-btn" icon="true" width="30" height="30" @click="closeDialog">
      <img src="@/assets/public/svg/icon_public_10.svg" />
    </v-btn>
  </div>
</v-dialog>

</template>
<style lang="scss" scoped>
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
    // box-shadow: 0px 4px 6px 1px #0000004d;

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
          height: 36px;
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
          transition: 0.3s;
          justify-content: center;
          color: #7782aa;
          width: 50%;
        }

        .login {
          // left: 36px;
          left: 0px;
          transition: 0.3s;
          color: #7782aa;

          img {
            width: 20px;
            height: 24px;
            margin-right: 4px;
          }
        }

        .register {
          // left: 125px;
          right: 0px;
          transition: 0.3s;
          color: white;

          img {
            width: 20px;
            margin-right: 4px;
          }
        }
      }
      &.bgActive {
        color: #fff;
        label {
          .login {
            p {
              color: white !important;
            }
          }
          .register {
            color: #7782aa !important;
          }
        }
      }
      label:after {
        content: "";
        width: 50%;
        height: 36px;
        position: absolute;
        top: 2px;
        left: 2px;
        background: #009b3a;
        border-radius: 18px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        z-index: -1px;
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
        width: 100px;
      }

      input:checked + label .login {
        // color: #7782aa;
      }

      input:checked + label .register {
        // color: white;
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
