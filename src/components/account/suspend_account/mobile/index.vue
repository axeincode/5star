<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import MSuspendDialog from "@/components/account/suspend_account/dialog/mobile/index.vue";

const { t } = useI18n();
const { width } = useDisplay();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();

const mobileWidth: any = computed(() => {
  return width.value;
});

const dialogVisible = ref<boolean>(false);

const suspendDate = ref<number>(1);

const positionX = ref("left");

const suspendDialogHide = () => {
  dialogVisible.value = false;
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
};

const confirmDailogShow = () => {
  dialogVisible.value = true;
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(true);
};
</script>

<template>
  <div class="m-suspend-menu relative">
    <v-row class="mx-4 mt-4 text-700-12 text-white">
      {{ t("account.menu.suspend_account_text") }}
    </v-row>
    <v-row class="mx-4 mt-6 text-400-12 text-gray">
      {{ t("account.suspend_account.help_text") }}
    </v-row>
    <v-row class="mx-4 mt-10">
      <v-text-field
        :label="t('account.suspend_account.duration_text')"
        type="number"
        class="form-textfield dark-textfield m-account-suspend-text"
        variant="solo"
        density="comfortable"
        v-model="suspendDate"
      />
    </v-row>
    <v-row class="mx-6 mt-2 text-400-12 text-gray justify-center">
      {{ t("account.suspend_account.minimum_duration_text") }}
    </v-row>
    <v-row class="mx-4 mt-10">
      <v-col cols="12">
        <v-btn
          class="button-bright m-suspend-confirm-btn"
          width="-webkit-fill-available"
          height="46px"
          @click="confirmDailogShow"
        >
          {{ t("account.suspend_account.confirm_text") }}
        </v-btn>
      </v-col>
    </v-row>
    <v-btn class="m-account-speaker-bg" icon>
      <img
        src="@/assets/public/svg/icon_public_75.svg"
        class="m-account-speaker-img-position"
      />
    </v-btn>
    <v-dialog
      v-model="dialogVisible"
      width="326"
      content-class="m-suspend-dialog-position"
      @click:outside="suspendDialogHide"
    >
      <MSuspendDialog :suspendDate="suspendDate" @suspendDialogHide="suspendDialogHide" />
    </v-dialog>
  </div>
</template>

<style lang="scss">
.m-suspend-menu {
  background-color: #1D2027;
  border-radius: 0px 0px 12px 12px !important;
  height: 400px;

  .v-field__field {
    background: #15161C !important;
  }

  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }

  .form-textfield div.v-field--variant-solo,
  .v-field--variant-solo-filled {
    background: transparent;
  }

  .m-suspend-confirm-btn {
    .v-btn__content {
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
}

.m-suspend-dialog-position {
  // top: -20px !important;
}

.m-account-suspend-text {
  transform-origin: top !important;

  .v-field__field {
    .v-label.v-field-label {
      font-family: "Inter";
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
</style>
