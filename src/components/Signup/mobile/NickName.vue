<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emit = defineEmits<{ (e: "close"): void }>();

const userName = ref<string>("");
const emailAddress = ref<string>("");
const isShowUsernameValidation = ref<boolean>(false);
const slides = ref<Array<string>>(["First", "Second", "Third", "Fourth", "Fifth"]);
const userNameValidationStrList = ref<Array<string>>([
  t("signup.displayNamePage.validation.username.items[0]"),
  t("signup.displayNamePage.validation.username.items[1]"),
]);

const closeDialog = () => {
  emit("close");
};

const userNameValidationList = computed((): boolean[] => {
  const username = userName.value;
  // 2-20 characters in length
  const condition1 = username.length <= 20 && username.length >= 2;
  // Nickname must not be like your email
  const condition2 = !(
    username.toLowerCase().trim() === emailAddress.value.toLowerCase().trim()
  );

  return [condition1, condition2];
});
const validateUserName = (): boolean => {
  return userNameValidationList.value.reduce((res, item) => res && item, true);
};

const handleOnUserNameInputFocus = (): void => {
  isShowUsernameValidation.value = true;
};

const handleOnUserNameInputBlur = (): void => {
  isShowUsernameValidation.value = false;
};
</script>

<template>
  <div class="m-nickname-container">
    <img src="@/assets/public/image/bg_public_05.png" class="m-header-img" />
    <img src="@/assets/public/image/bg_public_01.png" class="m-body-img" />
    <div class="m-nickname-circle"></div>
    <v-row class="carousel-container ml-0">
      <v-carousel height="400" show-arrows hide-delimiters class="carousel">
        <template v-slot:prev="{ props }">
          <v-btn
            class="button-carousel ma-2"
            variant="text"
            icon="mdi-chevron-left"
            @click="props.onClick"
          ></v-btn>
        </template>
        <template v-slot:next="{ props }">
          <v-btn
            class="button-carousel ma-2"
            variant="text"
            icon="mdi-chevron-right"
            @click="props.onClick"
          ></v-btn>
        </template>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <img
            src="@/assets/public/image/ua_public_01.png"
            width="123"
            style="margin-top: 20px"
          />
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row class="mt-4 mb-2">
      <p class="text-700-16 white full-width center">
        {{ t("signup.displayNamePage.title") }}
      </p>
    </v-row>
    <v-row class="mt-4 relative">
      <v-text-field
        :label="t('signup.displayNamePage.username')"
        class="form-textfield dark-textfield"
        variant="solo"
        density="comfortable"
        v-model="userName"
        :onfocus="handleOnUserNameInputFocus"
        :onblur="handleOnUserNameInputBlur"
      />
      <ValidationBox
        v-if="isShowUsernameValidation"
        :title="t('signup.displayNamePage.validation.username.title')"
        :descriptionList="userNameValidationStrList"
        :validationList="userNameValidationList"
      />
    </v-row>
    <v-row>
      <v-btn
        class="ma-3 mt-8 mb-8 button-bright m-signup-confirm-btn"
        width="-webkit-fill-available"
        height="48px"
        :disabled="!validateUserName()"
        @click="$emit('close')"
      >
        {{ t("signup.displayNamePage.submit") }}
      </v-btn>
    </v-row>
    <v-btn class="m-close-button" icon="true" @click="closeDialog" width="24" height="24">
      <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
    </v-btn>
  </div>
</template>

<style lang="scss">
.m-nickname-container {
  width: 320px;
  height: 471px;

  .m-header-img {
    position: absolute;
    top: 0px;
    left: 20px;
  }

  .m-body-img {
    position: absolute;
    top: 20px;
    left: 0px;
  }

  .m-nickname-circle {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    border-radius: 32px;
    background: #1c1929;
  }
}
</style>
