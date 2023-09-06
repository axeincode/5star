<script lang="ts" setup>
import { onMounted } from 'vue';
import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';

const page = ref(2);
const { width } = useDisplay();

const totalVisible = ref<number>(3);

const mobileWidth = computed(() => {
    return width.value;
})

onMounted(() => {
    if (mobileWidth.value > 600) {
        totalVisible.value = 3
    } else {
        totalVisible.value = 1
    }
})
</script>
<template>
    <v-pagination v-model="page" :length="10" :total-visible="totalVisible" rounded="circle"></v-pagination>
</template>
<style lang="scss">
.v-pagination__prev,
.v-pagination__next {

    margin: 6px!important;
    .v-btn {
        width: 32px !important;
        height: 32px !important;
        background: #353652 !important;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
        border-radius: 6px !important;
        color: #FFFFFF;
    }
}

.v-pagination__item {
    .v-btn {
        width: 32px !important;
        height: 32px !important;
        background: #353652 !important;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
        border-radius: 6px !important;
        font-weight: 600;
        font-size: 16px;
    }

}

.v-pagination__item--is-active {
    .v-btn {
        width: 32px !important;
        height: 32px !important;
        background: #32CFEC !important;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
        border-radius: 6px !important;
        font-weight: 600;
        font-size: 16px;
    }

}

@media (max-width: 600px) {

    .v-pagination__prev,
    .v-pagination__next {

        .v-btn {
            width: 28px !important;
            height: 28px !important;

            .v-btn__content {
                font-weight: 800 !important;
                font-size: 12px !important;
            }
        }
    }

    .v-pagination__item {
        .v-btn {
            width: 28px !important;
            height: 28px !important;

            .v-btn__content {
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
                font-weight: 800 !important;
                font-size: 12px !important;
            }
        }

    }
}
</style>