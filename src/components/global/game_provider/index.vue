<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { useRouter, useRoute } from "vue-router";
import { gameStore } from "@/store/game";
import { storeToRefs } from "pinia";
import img_gp_01 from "@/assets/home/image/img_gp_01.png";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const route = useRoute();
const { dispatchGameCategories } = gameStore();
const page_no = ref(1);
const moreLoading = ref(false);

const mobileWidth = computed(() => {
  return width.value;
});

const gameProviders = computed(() => {
  const { getGameProviders } = storeToRefs(gameStore());
  //
  console.log(getGameProviders.value, "etGameProviders.value");
  return getGameProviders.value;
});
const gameProviderslength = computed(() => {
  return gameProviders.value.length;
});

// const handleGameProviderPage = (slug: string) => {
//   router.push({ name: "Provider", query: { slug: slug } });
// };

const handleThirdParthVendor = () => {
  router.push({ name: "Third_Parth_Vendor" });
};
// 打开某个厂商
const handleGameProviderPage = (slug: string) => {
  router.push({ name: "Provider", query: { slug: slug } });
};

const handleMoreProvider = () => {
  page_no.value = page_no.value + 1;
};

watch(route, async (to, from) => {
  await dispatchGameCategories("?type=providers");
});

onMounted(async () => {
  await dispatchGameCategories("?type=providers");
});
</script>

<template>
  <!-------------------- game providers -------------->
  <div class="game-providers-container">
    <v-row
      :class="[
        mobileWidth < 600 ? 'mt-8 text-800-16' : 'mx-4 mt-6 text-700-22',
      ]"
      class="mb-4 white original_text"
    >
      <span>{{ t("home.game_providers") }}</span>
      <span class="viewall" @click="handleThirdParthVendor">{{
        t("home.viewall")
      }}</span>
    </v-row>
    <v-row class="ml-4 mr-2 mt-2" v-if="mobileWidth > 600">
      <div
        style="flex: 0 0 14.2857%; max-width: 14.2857%; padding-right: 8px"
        v-ripple.center
        v-for="(item, index) in gameProviders"
        :key="index"
        @click="handleGameProviderPage(item)"
      >
        <img :src="item.pictures" class="game-provider-img-width" />
      </div>
    </v-row>
    <v-row class="ma-2" v-else>
      <!-- <div class="m-game-provider-img-container">
        <div
          v-for="(gameProviderItem, gameProviderIndex) in gameProviders"
          :key="gameProviderIndex"
        >
          <img
            :src="gameProviderItem.pictures"
            width="126"
            height="49"
            class="mr-5"
            @click="handleThirdParthVendor"
          />
        </div>
      </div> -->
      <div class="m-game-provider-img-container">
        <template
          v-for="(gameProviderItem, gameProviderIndex) in gameProviders"
        >
          <div
            v-if="gameProviderIndex < 6 * page_no"
            class="img-box"
            :key="gameProviderIndex"
          >
            <img
              :src="gameProviderItem.pictures"
              @click="handleGameProviderPage(gameProviderItem.slug)"
            />
          </div>
        </template>
      </div>
      <v-row
        class="justify-center"
        :class="'pt-4 mx-3 mb-0 mt-0'"
        v-if="
          (Number(gameProviderslength) > 6 &&
            6 * Number(page_no) < Number(gameProviderslength)) ||
          (Number(gameProviderslength) > 7 &&
            7 * Number(page_no) < Number(gameProviderslength))
        "
      >
        <div style="width: 100%" class="text-center">
          <v-btn
            class="text-none more-btn-color text-center"
            variant="outlined"
            :width="'100%'"
            :height="41"
            @click="handleMoreProvider"
          >
            <div>{{ t("home.more") }}</div>
          </v-btn>
        </div>
      </v-row>
    </v-row>
  </div>
</template>

<style lang="scss">
.game-providers-container {
  .original_text {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px !important;
    padding-right: 10px !important;
    margin: 0;

    .viewall {
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
      text-align: left;
      color: #009B3A;
    }
  }
}
.game-provider-img-width {
  max-width: 160px !important;
  width: 100%;
  cursor: pointer;
}
@media (max-width: 600px) {
  .v-slide-group__prev {
    display: none !important;
  }
  .v-slide-group__next {
    display: none !important;
  }

  .m-game-provider-img-container {
    width: 100%;
    // overflow-x: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    .img-box {
      padding: 0px;
      margin: 0px;
      border-radius: 4px;
      overflow: hidden;
      display: flex;

      img {
        width: 100%;
      }
    }
    // .m-game-provider-img-container-row {
    //   width: 100%;
    //   margin: 0px;

    //   .img-box {
    //     padding: 0px;
    //     margin: 0px;
    //     border-radius: 4px;
    //     overflow: hidden;
    //     height: fit-content;
    //     display: flex;

    //     img {
    //       width: 100%;
    //     }
    //   }
    // }

    &::-webkit-scrollbar {
      display: none; /* WebKit */
    }
    ::-moz-scrollbar {
      display: none; /* Firefox */
    }
  }
}
</style>
