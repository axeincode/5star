<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { appBarStore } from "@/store/appBar";
import { useRoute, useRouter } from "vue-router";
import { promoStore } from "@/store/promo";
import { storeToRefs } from "pinia";
import { type PromoListData } from "@/interface/promo";
// import img_hp_4 from "@/assets/promo/image/img_hp_4.png";
// import img_hp_5 from "@/assets/promo/image/img_hp_5.png";
// import img_hp_6 from "@/assets/promo/image/img_hp_6.png";
// import MDepositBonus from "@/components/promo/deposit_bonus/index.vue";
// import MWelcomeBonus from "@/components/promo/welcome_bonus/index.vue";

const { setDepositWithdrawToggle } = appBarStore();
const { setDepositDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();

const { t } = useI18n();
const route = useRoute();

const selectedItem = ref<PromoListData>({
  id: 0,
  name: "",
  image_path: "",
  text: "",
  desc: "",
  countdown: false,
  content: "",
  click_feedback: 0,
  button_path: ""
});

const depositDialogShow = () => {
  setDepositWithdrawToggle(true);
  setDepositDialogToggle(true);
  setCashDialogToggle(true);
};

const promoList = computed(() => {
  const { getUserActivityList } = storeToRefs(promoStore());
  return getUserActivityList.value;
});

onMounted(() => {
  promoList.value.group_data[0].list_data.map(item => {
    if (item.id == Number(route.query.id)) {
      selectedItem.value = item
    }
  })
});
</script>

<template>
  <div class="mx-4">
    <v-card class="m-promo-detail-back-card">
      <div class="d-flex align-center" style="height: 48px">
        <v-icon size="large" color="#ffffff" @click="$router.push({ name: 'Promo' })">
          mdi-chevron-left
        </v-icon>
        <div class="text-700-12 text-white">{{ t("promo.text_14") }}</div>
      </div>
    </v-card>
    <v-card class="m-promo-detail-card mt-2 pa-2">
      <img :src="selectedItem.image_path" style="width: 100%" />
      <div v-html="selectedItem.text" class="mx-1"></div>
      <!-- <MDepositBonus v-if="activeIndex == 0" />
      <MWelcomeBonus v-if="activeIndex == 1" />
      <v-btn
        class="text-none m-promo-detail-deposit-btn my-5"
        width="-webkit-fill-available"
        height="48"
        @click="depositDialogShow"
      >
        {{ t("promo.text_32") }}
      </v-btn> -->
    </v-card>
  </div>
</template>

<style lang="scss">
.m-promo-detail-back-card {
  height: 48px;
  border-radius: 8px !important;
  background: var(--grade-2-black, #1d2027) !important;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3) !important;
}

.m-promo-detail-card {
  border-radius: 8px !important;
  background: var(--grade-1-black, #15161c) !important;

  .m-promo-detail-deposit-btn {
    border-radius: 8px;
    background: var(--predominant, #009b3a);
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);

    .v-btn__content {
      color: #fff;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
  }
}
</style>
