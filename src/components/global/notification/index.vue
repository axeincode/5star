
<script lang="ts" setup>
import { toRefs } from 'vue';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const snackbar = ref<boolean>(false);
const props = defineProps<{ notificationShow: boolean, notificationText: string, checkIcon: any }>();
const { notificationShow, notificationText, checkIcon } = toRefs(props);
watch(notificationShow, (newValue) => {
    snackbar.value = true;
})
</script>
  
<template>
    <v-snackbar v-model="snackbar" multi-line color="#181522" class="snack-bar">
        <template v-slot:actions>
            <img :src="checkIcon" class="ml-4 mr-4"/>
            <p class="label-text-sm slate-gray notification-text">
                {{ notificationText }}
            </p>
            <v-btn class="snackbar-close-button mt-3 mr-2" variant="text" @click="snackbar = false">
                <v-icon color="#7782AA">
                    mdi-close
                </v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<style lang="scss">
.snackbar-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 5px;
    right: 5px;
}

.snack-bar {
    .v-overlay__content {
        position: absolute;
        bottom: 80% !important;
        right: -190px !important;
        left: unset !important;
    }

    .notification-text {
        width: 230px;
    }
}
</style>