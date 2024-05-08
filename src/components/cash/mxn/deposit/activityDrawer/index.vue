<template>
  <div class="m-activity-detail-body">
    <div class="text-700-14 white text-center title">Event Details</div>
    <v-card class="m-promo-detail-card mt-2 pa-2">
      <template v-if="!detailShow">
        <div class="m-loading-container relative">
          <div class="loading-body">
            <div class="dot-0"></div>
            <div class="dot-1"></div>
            <div class="dot-0"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <img :src="selectedItem.image_path" style="width: 100%" />
        <div v-html="selectedItem.text" class="mx-1"></div>
      </template>
    </v-card>
    <img
      class="arrow-img"
      src="@/assets/public/svg/arrow-bottom.svg"
      style="width: 100%"
      @click="handleClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { promoStore } from "@/store/promo";
import { type PromoListData } from "@/interface/promo";
const props = defineProps({
  id: {
    type: String,
  },
});

const emit = defineEmits(["close"]);

const { dispatchUserActivityList } = promoStore();

const detailShow = ref<boolean>(false);
const promoList = computed(() => {
  const { getUserActivityList } = storeToRefs(promoStore());
  return getUserActivityList.value;
});

const selectedItem = ref<PromoListData>({
  id: 0,
  name: "",
  image_path: "",
  text: "",
  desc: "",
  countdown: false,
  content: "",
  click_feedback: 0,
  button_path: "",
  button_text: "",
});
// 关闭弹窗
const handleClose = () => {
  emit("close", false);
};

onMounted(async () => {
  detailShow.value = false;
  await dispatchUserActivityList();
  promoList.value.group_data[0].list_data.map((item: any) => {
    if (item.id == Number(props.id)) {
      selectedItem.value = item;
    }
  });
  detailShow.value = true;
});
</script>

<style lang="scss">
.m-activity-detail-body {
  height: 450px;
  background: #1d2027;
  .title {
    padding-top: 12px;
  }
  .m-promo-detail-card {
    border-radius: 8px !important;
    background: var(--grade-1-black, #15161c) !important;
    height: 370px;
    overflow-y: auto;
    margin: 12px;
  }
  .arrow-img {
    width: 16px;
    height: 14px;
  }
  .m-loading-container {
    border: none;
    width: 100%;
    height: 100%;
    opacity: 1;
    background: #15161c;

    .loading-body {
      display: flex;
      align-items: center;
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translateX(-50%);

      .dot-0 {
        width: 10px;
        height: 10px;
        background: #12ff76;
        border-radius: 10px;
        margin: 0px 4px;
        animation: expandAnimation 0.6s 0.1s ease-in infinite;
      }

      .dot-1 {
        width: 16px;
        height: 16px;
        background: #12ff76;
        border-radius: 16px;
        margin: 0px 4px;
        animation: expandReverseAnimation 0.6s 0.1s ease-in infinite;
      }
    }
  }
}
</style>