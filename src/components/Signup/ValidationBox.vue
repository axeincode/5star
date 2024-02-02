<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useDisplay } from "vuetify";

const ValidationBox = defineComponent({
  props: {
    // validation title
    title: {
      type: String,
      default: "",
    },
    withCautionIcon: {
      type: Boolean,
      default: false,
    },
    // validation describe string list
    descriptionList: {
      type: Array as PropType<String[]>,
      default: [],
    },
    // validation result list
    validationList: {
      type: Array as PropType<Boolean[]>,
      default: [],
    },
  },
  setup(props) {
    const { width } = useDisplay();
    const mobileWidth = computed(() => {
      return width.value;
    });
    return {
      mobileWidth,
    };
  },
});

export default ValidationBox;
</script>

<template>
  <div
    class="pa-2 animate glow delay-1 fade-in"
    :class="mobileWidth > 600 ? 'validation-box-container' : 'm-validation-box-container'"
  >
    <v-row
      v-if="title.length"
      class="d-flex justify-center"
      :class="mobileWidth > 600 ? 'ma-2' : 'ma-1'"
    >
      <img
        v-if="withCautionIcon"
        src="@/assets/public/svg/icon_public_03.svg"
        width="16"
        class="validation-caution-img"
      />
      <span class="label-text-sm ml-2 mt-1 slate-gray">
        {{ title }}
      </span>
    </v-row>
    <v-row class="validation-list ma-0 pa-0">
      <v-row
        v-for="n in descriptionList.length"
        :key="n"
        :class="`validation-list-item full-width ${
          validationList[n - 1] ? 'active' : 'inactive'
        }`"
      >
        <v-icon class="mr-2 validation-item-icon">
          {{ validationList[n - 1] ? "mdi-check-circle" : "mdi-close-circle" }}
        </v-icon>
        <p class="m-validation-description-text">{{ descriptionList[n - 1] }}</p>
      </v-row>
    </v-row>
  </div>
</template>

<style lang="scss">
@media (max-width: 600px) {
  .label-text-sm {
    font-size: 10px !important;
  }
  .validation-box-container {
    bottom: 58px !important;
  }

  .validation-item-icon {
    .mdi:before,
    .mdi-set {
      font-size: 14px !important;
    }
  }

  .validation-list-item {
    font-size: 10px !important;
  }

  .m-validation-description-text {
    max-width: 238px;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
}

.m-validation-box-container {
  position: absolute;
  bottom: 65px;
  width: 100%;
  background: #15161C;
  border-radius: 8px;
  padding-bottom: 0px !important;
  z-index: 2;
  //   height: 48px;

  .validation-caution-img {
    position: relative;
    top: 2px;
  }

  .validation-title {
    margin-top: 22px !important;
    margin-left: 10px;
  }

  .validation-list {
    margin: 0px 0px -12px 0px;
    padding: 0px;

    .validation-list-item {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      margin: 6px;
    }

    .validation-item-icon {
      padding-bottom: 2px;
    }
  }
}

.validation-box-container {
  position: absolute;
  bottom: 64px;
  width: 94%;
  background: #1D2027;
  // box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  margin: 12px; // wrapped by v-row
  padding-bottom: 0px !important;
  z-index: 2;

  .validation-caution-img {
    position: relative;
    top: 2px;
  }

  .validation-title {
    margin-top: 22px !important;
    margin-left: 10px;
  }

  .validation-list {
    margin: 0px 0px -12px 0px;
    padding: 0px;

    .validation-list-item {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      margin: 6px;
    }

    .validation-item-icon {
      padding-bottom: 2px;
    }
  }
}

.validation-box-container::after {
  display: flex;
  content: "";
  position: relative;
  align-self: center;
  float: right;
  top: 18px;
  right: 50%;
  border: 9px solid #1D2027;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 2;
  border-right-width: 5px;
  border-left-width: 5px;
}

.m-validation-box-container::after {
  display: flex;
  content: "";
  position: relative;
  align-self: center;
  float: right;
  top: 17px;
  right: 50%;
  border: 9px solid #1D2027;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 2;
  border-right-width: 5px;
  border-left-width: 5px;
}

// animation
.animate {
  animation-duration: 0.15s;
  animation-delay: 0.1s;
  animation-name: animate-fade;
  animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
  animation-fill-mode: backwards;
}

.animate.glow {
  animation-name: animate-glow;
  animation-timing-function: ease;
}

@keyframes animate-glow {
  0% {
    opacity: 0;
    filter: brightness(3) saturate(3);
    transform: scale(0.8, 0.8);
  }

  100% {
    opacity: 1;
    filter: brightness(1) saturate(1);
    transform: scale(1, 1);
  }
}

.delay-1 {
  animation-delay: 0.1s;
}
</style>
