
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';

const emit = defineEmits<{ (e: 'promotionDialogHide'): void }>()

const loading = ref<boolean>(false);

const submitPromotion = async () => {
    loading.value = true;
    emit('promotionDialogHide')
}

</script>

<template>
  <div class="promotion-dialog-container">
      <v-row class="mx-10 mt-10 text-700-14 text-gray">
          <p class="text-center" style="width: 100%">
              Not participating in promotional activities
          </p>
      </v-row>
      <v-row class="mx-10 mt-16 text-700-14">
          <div class="promotion-confirm-btn">
              <v-btn class="button-bright text-none" width="-webkit-fill-available" height="40px" @click="submitPromotion"
                  :loading="loading">
                  Ok
              </v-btn>
          </div>
          <div class="promotion-cancel-btn ml-2">
              <v-btn class="button-bright text-none" width="-webkit-fill-available" height="40px"
                  @click="emit('promotionDialogHide')">
                  Cancel
              </v-btn>
          </div>
      </v-row>
  </div>
</template>


<style lang="scss">
// container
.promotion-dialog-container {
    background-color: #15161C;
    border-radius: 16px !important;
    height: 220px;
}

.promotion-confirm-btn {
    margin-left: auto;
    margin-right: auto;
    // button
    button {
        border-radius: 26px !important;

        .v-btn__content {
            font-weight: 700;
            font-size: 14px;
        }
    }
}

.promotion-cancel-btn {
    margin-left: auto;
    margin-right: auto;
    // button
    button {
        background: #23262F !important;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 26px;


        .v-btn__content {
            font-weight: 700;
            font-size: 14px;
            color: #FFFFFF;
        }
    }
}
</style>
