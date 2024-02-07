<script lang="ts" setup>
import { ref, toRefs, watch, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";

type dialogType = "login" | "signup" | "signout";

const { setDialogCheckbox } = authStore();
const { setAuthDialogVisible } = authStore();

const props = defineProps<{ mobileDialogCheck: boolean }>();
const emit = defineEmits<{
  (e: "switch", value: dialogType): void;
}>();
const { mobileDialogCheck } = toRefs(props);
const { t } = useI18n();
const dialogCheckBox = ref<boolean>(false);
const mobileDialogSwitch = ref<boolean>(false);
const closeBtnShow = ref<boolean>(true);
const dialogVisible = ref<boolean>(false);

const handleCheckBox = (): void => {
  console.log(dialogCheckBox.value);
  emit("switch", dialogCheckBox.value ? "signup" : "login");
};

watch(mobileDialogCheck, (newValue: boolean) => {
  dialogCheckBox.value = newValue;
});

watch(
  dialogCheckBox,
  (newValue) => {
    setDialogCheckbox(newValue);
  },
  { deep: true }
);

const authDialogVisible = computed(() => {
  const { getAuthDialogVisible } = storeToRefs(authStore());
  return getAuthDialogVisible.value;
});

const closeDialog = () => {
  setAuthDialogVisible(!authDialogVisible.value);
};

onMounted(() => {
  dialogCheckBox.value = mobileDialogCheck.value;
  setTimeout(() => {
    mobileDialogSwitch.value = true;
  }, 100);
});

onUnmounted(() => {
  // setAuthDialogVisible(false);
});
</script>

<template>
  <div class="mobile-dialog-container">
    <div class="mobile-dialog-width mb-2">
      <div class="mobile-dialog-toggle" v-if="mobileDialogSwitch">
        <input
          type="checkbox"
          id="mobile-dialog-toggle"
          v-model="dialogCheckBox"
          @input="handleCheckBox"
        />
        <label for="mobile-dialog-toggle">
          <div class="login">
            <P>{{ t("main.loginButton") }}</P>
          </div>
          <div class="register">
            <P>{{ t("main.signupButton") }}</P>
          </div>
        </label>
      </div>
    </div>
    <v-btn
      class="m-close-button"
      icon="true"
      width="30"
      height="30"
      style="top: 1px"
      v-if="closeBtnShow"
      @click="closeDialog"
    >
      <img src="@/assets/public/svg/icon_public_10.svg" />
    </v-btn>
  </div>
</template>
<style lang="scss">
.mobile-dialog-container {
  position: sticky !important;
  top: 0px;
  height: 56px;
  width: 100%;
  background: $color_1;
}

.mobile-dialog-width {
  width: 280px;
  background: #1d2027;
  margin: auto;
  height: 48px;
  border-radius: 0px 0px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px 1px #0000004d;
}

.mobile-dialog-toggle {
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
</style>
