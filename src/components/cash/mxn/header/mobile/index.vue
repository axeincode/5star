<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { appBarStore } from "@/store/appBar";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import icon_public_60 from "@/assets/public/svg/icon_public_60.svg";
import icon_public_65 from "@/assets/public/svg/icon_public_65.svg";

const { name, width } = useDisplay();
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setDepositBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();

const cashToggleSwitch = ref<boolean>(false);

const depositCheckboxColor = ref<string>("#ffffff");
const withdrawCheckboxColor = ref<string>("#7782AA");

const mobileWidth = computed(() => {
  return width.value;
});

const cashDialogShow = () => {
  setCashDialogToggle(false);
  setDepositDialogToggle(false);
  setWithdrawDialogToggle(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
};

const depositDialogToggle = computed(() => {
  const { getDepositDialogToggle } = storeToRefs(appBarStore());
  return getDepositDialogToggle.value;
});

const depositHeaderBlurEffectShow = computed(() => {
  const { getDepositHeaderBlurEffectShow } = storeToRefs(appBarStore());
  return getDepositHeaderBlurEffectShow.value;
});

const withdrawDialogToggle = computed(() => {
  const { getWithdrawDialogToggle } = storeToRefs(appBarStore());
  return getWithdrawDialogToggle.value;
});

watch(
  cashToggleSwitch,
  (newValue) => {
    if (newValue) {
      setWithdrawDialogToggle(true);
      setDepositDialogToggle(false);
      setMainBlurEffectShow(true);
      setHeaderBlurEffectShow(true);
      setMenuBlurEffectShow(true);
      setDepositBlurEffectShow(false);

      depositCheckboxColor.value = "#7782AA";
      withdrawCheckboxColor.value = "#ffffff";
    } else {
      setWithdrawDialogToggle(false);
      setDepositDialogToggle(true);
      setMainBlurEffectShow(true);
      setHeaderBlurEffectShow(true);
      setMenuBlurEffectShow(true);
      setDepositBlurEffectShow(false);

      depositCheckboxColor.value = "#ffffff";
      withdrawCheckboxColor.value = "#7782AA";
    }
  },
  { deep: true }
);

const depositTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", depositCheckboxColor.value);
  }
  return el;
};

const withdrawTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", withdrawCheckboxColor.value);
  }
  return el;
};

onMounted(() => {
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  if (depositDialogToggle.value) {
    cashToggleSwitch.value = false;
  }
  if (withdrawDialogToggle.value) {
    cashToggleSwitch.value = true;
  }
});
</script>

<template>
  <div
    class="mobile-cash-header"
    :class="depositHeaderBlurEffectShow ? 'm-deposit-header-bg-blur' : ''"
  >
    <div class="d-flex align-center relative m-header">
      <div class="m-deposit-toggle">
        <input type="checkbox" id="m-deposit-toggle" v-model="cashToggleSwitch" />
        <label for="m-deposit-toggle">
          <div class="deposit">
            <inline-svg
              :src="icon_public_60"
              width="18"
              height="18"
              :transform-source="depositTransform"
            >
            </inline-svg>
            <p class="text-700-10 ml-1">{{ t("appBar.deposit") }}</p>
          </div>
          <div class="withdraw">
            <inline-svg
              :src="icon_public_65"
              width="18"
              height="18"
              :transform-source="withdrawTransform"
            >
            </inline-svg>
            <p class="text-700-10 ml-1">{{ t("appBar.withdraw") }}</p>
          </div>
        </label>
      </div>
      <v-btn
        class="m-deposit-close-button"
        icon="true"
        @click="cashDialogShow"
        width="40"
        height="40"
      >
        <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
// header container
.mobile-cash-header {
  background-color: #1d2027;

  .m-header {
    text-align: center;
    border-radius: 0px 0px 8px 8px;
    background: #1d2027;
    /* Button Shadow */
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.5);
    height: 60px;
  }

  .m-deposit-header-btn {
    width: 70px !important;
    height: 60px !important;
    background: #1d2027 !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 25px;
  }

  .header-mdi-icon {
    font-weight: 800;
    font-size: 28px;
    color: #ffffff;
  }

  // close modal button
  .m-deposit-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 8px;
    right: 5px;
  }

  // deposit and withdraw toggle switch
  .m-deposit-toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    label {
      width: 196px;
      height: 40px;
      position: relative;
      display: block;
      background: #15161c;
      border-radius: 20px !important;
      cursor: pointer;
      transition: 0.3s;

      div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 14px;
      }

      .deposit {
        left: 14px;
        transition: 0.3s;
        color: white;

        img {
          width: 20px;
          height: 24px;
          margin-right: 4px;
        }
      }

      .withdraw {
        left: 111px;
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
      width: 96px;
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
      left: 97px;
      // transform: translateX(-100%);
    }

    label:active:after {
      width: 96px;
    }

    input:checked + label .deposit {
      color: #7782aa;
    }

    input:checked + label .withdraw {
      color: white;
    }
  }

  .v-list-item__prepend {
    padding-left: 20px;
  }

  .dark-textfield .v-field__field {
    background-color: #15161c !important;
  }

  .v-field--variant-solo {
    background: transparent !important;
  }
}

.m-deposit-header-account-bg {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 48px;
  background: #1d2027;
}

.m-deposit-header-account-bg-1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 38px;
  background: #1d2027;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.5);
}

.m-personal-confirm-btn {
  text-align: center;
  width: 150px;
  border-radius: 8px;
  background: #23262f;

  /* Button Shadow */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

  .v-btn__content {
    color: #fff;
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px !important;
    text-transform: none;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-personal-information-id-text {
  .v-input__append {
    width: 0px !important;
  }

  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .form-textfield div.v-field--variant-solo,
  .v-field--variant-solo-filled {
    background: transparent;
  }
}

.m-personal-info-menu {
  left: unset !important;
  top: 56px !important;
  border-radius: 0px 0px 25px 25px !important;

  .personal-info-key-position {
    position: absolute;
    top: 63px;
    right: 40px;
  }

  .personal-info-key-position-1 {
    position: absolute;
    top: 125px;
    left: 40%;
  }

  .personal-info-key-position-2 {
    position: absolute;
    top: 125px;
    right: 39px;
  }

  .v-input--horizontal .v-input__append {
    margin-inline-start: 0px !important;
  }

  .v-list {
    box-shadow: none !important;
  }
}

@media (max-width: 600px) {
  .m-personal-info-menu {
    transform-origin: top !important;

    .v-field__field {
      .v-label.v-field-label {
        font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
        font-size: 12px !important;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: #7782aa !important;
        opacity: 1 !important;
      }

      .v-label.v-field-label--floating {
        --v-field-label-scale: 0.88em;
        font-size: 10px !important;
        max-width: 100%;
        color: #7782aa !important;
        opacity: 1 !important;
      }
    }
  }
}

@media (max-width: 600px) {
  .Vue-Toastification__container {
    right: 0 !important;
    left: unset !important;
    width: 290px !important;
    margin-right: 37px;
    height: 60px !important;
    //flex-direction: unset!important;
  }

  .Vue-Toastification__toast {
    align-items: center !important;
    z-index: 1000000000 !important;
    top: 70px;
    right: -20px !important;
    width: 320px !important;
    height: 60px;
    border: none;
    border-radius: 16px 0px 0px 16px;
    background: var(--bg-2, #181522);
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
  }

  .Vue-Toastification__toast-body {
    color: var(--sec-text, #7782aa);
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
  }

  .Vue-Toastification__close-button {
    top: 22px !important;
    background-image: url("@/assets/public/svg/icon_public_52.svg");
    background-repeat: no-repeat;
    background-size: 18px;
    color: transparent;
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .my-enter-active-class {
    transform: translateY(0);
  }

  .my-leave-active-class {
    transform: translateY(0);
  }

  .personal-btn-ready {
    background: #009b3a;
    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

    .v-btn__content {
      color: white;
    }
  }
}

.deposit-header-account-position {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.m-deposit-header-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  height: 70px !important;
}
</style>
