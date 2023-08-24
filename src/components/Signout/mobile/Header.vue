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
    <div class="mobile-dialog-width">
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
  height: 40px;
  width: 100%;
}

.mobile-dialog-width {
  width: 240px;
  background: #2e274c;
  margin: auto;
  height: 100%;
  border-radius: 0px 0px 40px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-dialog-toggle {
  label {
    width: 160px;
    height: 32px;
    position: relative;
    display: block;
    background: #211f31;
    border-radius: 20px !important;
    cursor: pointer;
    transition: 0.1s;

    div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 10px;
    }

    .login {
      left: 26px;
      transition: 0.3s;
      color: black;

      img {
        width: 20px;
        height: 24px;
        margin-right: 4px;
      }
    }

    .register {
      left: 104px;
      transition: 0.3s;
      color: #7782aa;

      img {
        width: 20px;
        margin-right: 4px;
      }
    }
  }

  label:after {
    content: "";
    width: 74px;
    height: 28px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: #32cfec;
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
    left: 83px;
  }

  label:active:after {
    width: 74px;
  }

  input:checked + label .login {
    color: #7782aa;
  }

  input:checked + label .register {
    color: black;
  }
}
</style>
