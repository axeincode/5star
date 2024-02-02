<script lang="ts" setup>
import { ref, computed, watch, onMounted, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';

const { name, width } = useDisplay();
const { t } = useI18n();
const props = defineProps<{title: string}>();
const {title} = toRefs(props);
const emit = defineEmits<{ (e: 'userDialogHide'): void }>()

const mobileWidth = computed(() => {
    return width.value
})

const userDialogHide = () => {
    emit('userDialogHide');
}
</script>
  
<template>
    <div class="account-header">
        <div class="header d-flex align-center justify-center relative">
            <div class="text-700-18 white">{{ title }}</div>
            <v-btn class="close-button" icon="true" @click="userDialogHide">
                <v-icon color="#7782AA">
                    mdi-close
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>

<style lang="scss">
// header container
.account-header {
    background-color: #1D2027;
    border-radius: 16px !important;

    .header {
        text-align: center;
        background: #1D2027;
        border-radius: 16px 16px 0px 0px;
        height: 72px;
    }

    @media (max-width: 600px) {
        .header {
            height: 60px;
        }
    }

    // close modal button
    .close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 5px;
        right: 5px;
    }
}
</style>