<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const disabled = ref<boolean>(true);
</script>

<template>
  <div class="m-phone-binding-container">
    <div class="m-phone-binding-dailog-header">
      <v-btn class="m-close-button" icon="true" width="24" height="24" @click="">
        <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
      </v-btn>
    </div>
    <div class="m-phone-binding-dialog-body px-6">
      <div class="text-700-14 white text-center">
        {{ t("phone_binding_dialog.text_1") }}
      </div>
      <div class="text-400-10 gray text-center mt-1">
        <p>{{ t("phone_binding_dialog.text_2") }}</p>
        <p>{{ t("phone_binding_dialog.text_3") }}</p>
      </div>
      <div class="mx-4 mt-4 text-400-12 gray">{{ t("phone_binding_dialog.text_4") }}</div>
      <div class="mt-1 d-flex align-center">
        <div class="m-phone-binding-input mr-2 relative">
          <div class="m-phone-binding-code text-700-12 white">+52</div>
          <input
            type="number"
            :placeholder="t('phone_binding_dialog.text_5')"
            class="text-700-12 px-2"
          />
        </div>
        <v-btn class="m-phone-binding-captcha-btn" :disabled="disabled">
          {{ t("phone_binding_dialog.text_6") }}
        </v-btn>
      </div>
      <div class="mx-4 mt-4 text-400-12 gray">{{ t("phone_binding_dialog.text_6") }}</div>
      <div class="mt-1 d-flex align-center">
        <div class="m-phone-binding-input relative">
          <input
            type="number"
            :placeholder="t('phone_binding_dialog.text_7')"
            class="text-700-12 px-4"
            style="width: 100%"
          />
        </div>
      </div>
      <div class="mt-6 text-center">
        <v-btn width="288" height="48" class="m-phone-binding-submit-btn">
          {{ t("phone_binding_dialog.text_8") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-phone-binding-container {
  height: 360px;
  background: $color_1;

  .m-phone-binding-dailog-header {
    height: 36px;
    position: fixed;
    top: 0px;
    width: 100%;

    .m-close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute;
      top: 6px;
      right: 8px;
    }
  }

  .m-phone-binding-dialog-body {
    position: absolute;
    top: 36px;
    width: 100%;
    height: 324px;

    .m-phone-binding-input {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      background: #15161c;
      box-shadow: 0px 0px 6px 1px #00000059 inset;

      .m-phone-binding-code {
        position: absolute;
        top: 12px;
        left: 14px;
      }

      input {
        height: 40px;
        float: right;
        color: white;
      }

      input:focus {
        outline: none;
      }

      input::placeholder {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
      }
    }

    .m-phone-binding-captcha-btn {
      margin-left: auto;
      width: 88px;
      height: 40px;
      background: #009b3a;
      box-shadow: 0px 3px 4px 1px #00000036;
      border-radius: 8px;

      .v-btn__content {
        font-family: Inter;
        font-size: 10px;
        font-weight: 700;
        color: white;
      }
    }

    .m-phone-binding-submit-btn {
      margin-left: auto;
      width: 88px;
      height: 40px;
      background: #009b3a;
      box-shadow: 0px 3px 4px 1px #00000036;
      border-radius: 8px;

      .v-btn__content {
        font-family: Inter;
        font-size: 14px;
        font-weight: 700;
        color: white;
      }
    }
  }
}
</style>
