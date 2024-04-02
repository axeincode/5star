<script lang="ts" name="page" setup>
import { onMounted, toRefs } from "vue";
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps<{ length: number }>();
const emit = defineEmits<{
  (e: "handlePrev", pageNo: number): void;
  (e: "handleNext", pageNo: number): void;
}>();

const { length } = toRefs(props);

const pageNo = ref(1);
const { width } = useDisplay();

const totalVisible = ref<number>(3);

const mobileWidth = computed(() => {
  return width.value;
});

const handlePrev = () => {
  emit("handlePrev", pageNo.value);
};

const handleNext = () => {
  emit("handleNext", pageNo.value);
};

const resetPageNo = ():void => {
  pageNo.value = 1
}

defineExpose({resetPageNo, pageNo})


onMounted(() => {
  if (mobileWidth.value > 600) {
    totalVisible.value = 3;
  } else {
    totalVisible.value = 1;
  }
});
</script>
<template>
  <v-pagination v-model="pageNo" :length="length" @next="handleNext" @prev="handlePrev" :total-visible="totalVisible"
    rounded="circle"></v-pagination>
</template>
<style lang="scss">
.v-pagination__prev,
.v-pagination__next {
  margin: 6px !important;

  .v-btn {
    width: 32px !important;
    height: 32px !important;
    background: $agent_color_3 !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    border-radius: 6px !important;
    color: #ffffff;
  }
}

.v-pagination__item {
  .v-btn {
    width: 32px !important;
    height: 32px !important;
    background: $agent_color_3 !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
    border-radius: 6px !important;
    font-weight: 600;
    font-size: 16px;
    .v-btn__content {      
      color: #FFF;
    }
  }
}

.v-pagination__item--is-active {
  .v-btn {
    width: 32px !important;
    height: 32px !important;
    background: $agent_card_bar_bg !important;
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.30) !important;
    border-radius: 6px !important;
    font-weight: 600;
    font-size: 16px;

    .v-btn__content {
      color: #FFF;
    }
  }
}

@media (max-width: 600px) {

  .v-pagination__prev,
  .v-pagination__next {
    box-shadow: 0px 4px 6px 1px #0000004D;
    background: #23262F;
    border-radius: 4px;

    .v-btn {
      width: 28px !important;
      height: 28px !important;

      .v-btn__content {
        font-weight: bold !important;
        font-size: 14px !important;
        color: #fff !important;
      }
    }

    .v-btn--disabled {
      opacity: 1;

      .v-btn__content {
        font-weight: bold !important;
        font-size: 14px !important;
        color: #15161c !important;
      }
    }
  }
  .v-pagination__prev {
    margin-right: 10px !important;
  }

  .v-pagination__item {
    .v-btn {
      width: 28px !important;
      height: 28px !important;

      .v-btn__content {
        color: #FFF;
        font-weight: 800 !important;
        font-size: 12px !important;
      }
    }
  }

  .v-pagination__item--is-active {
    display: none;

    .v-btn {
      width: 28px !important;
      height: 28px !important;

      .v-btn__content {
        color: #FFF;
        font-weight: 800 !important;
        font-size: 12px !important;
      }
    }
  }
}
</style>
