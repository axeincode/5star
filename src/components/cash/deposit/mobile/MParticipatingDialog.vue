
<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{ (e: 'promotionDialogHide'): void }>()

const loading = ref<boolean>(false);

const submitPromotion = async () => {
    loading.value = true;
    emit('promotionDialogHide')
}

</script>

<template>
    <div class="m-promotion-dialog-container">
        <v-row class="mx-4 mt-10 text-700-12 text-gray">
            <p class="text-center" style="width: 100%">
                Not participating in promotional activities
            </p>
        </v-row>
        <v-row class="mx-10 mt-12 text-700-14">
            <div class="m-promotion-confirm-btn">
                <v-btn class="button-bright text-none" height="28" width="76" @click="submitPromotion" :loading="loading">
                    Ok
                </v-btn>
            </div>
            <div class="m-promotion-cancel-btn ml-auto">
                <v-btn class="button-bright text-none" height="28" width="76" @click="emit('promotionDialogHide')">
                    Cancel
                </v-btn>
            </div>
        </v-row>
    </div>
</template>

<style lang="scss">
.m-promotion-dialog-container {
    background-color: #29253C;
    border-radius: 16px !important;
    height: 173px;
}

.m-promotion-confirm-btn {

    // button
    button {
        border-radius: 26px !important;

        .v-btn__content {
            font-weight: 700;
            font-size: 10px;
        }
    }
}

.m-promotion-cancel-btn {

    // button
    button {
        background: #414968 !important;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 26px;

        .v-btn__content {
            font-weight: 700;
            font-size: 10px;
            color: #FFFFFF;
        }
    }
}
</style>