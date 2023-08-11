
<script lang="ts" setup>
import { toRefs } from 'vue';
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
const { t } = useI18n();
const { width } = useDisplay();
const snackbar = ref<boolean>(false);
const props = defineProps<{ notificationShow: boolean, notificationText: string, checkIcon: any }>();
const { notificationShow, notificationText, checkIcon } = toRefs(props);
watch(notificationShow, (newValue) => {
    snackbar.value = true;
})
const mobileWidth = computed(() => {
    return width.value
})
</script>
  
<template>
    <v-snackbar v-model="snackbar" multi-line color="#181522" class="snack-bar" timeout="3000"
        transition="slide-y-transition" v-if="mobileWidth > 600">
        <template v-slot:actions>
            <img :src="checkIcon" class="mx-4" />
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
    <v-snackbar v-model="snackbar" multi-line color="#181522" class="m-snack-bar" timeout="3000" v-else>
        <template v-slot:actions>
            <img :src="checkIcon" class="mx-2" />
            <p class="label-text-sm slate-gray notification-text text-500-12">
                {{ notificationText }}
            </p>
            <v-btn class="m-snackbar-close-button mt-2 mr-1" variant="text" @click="snackbar = false">
                <img src="@/assets/public/svg/icon_public_52.svg" width="16" />
                <!-- <v-icon color="#7782AA">
                    mdi-close
                </v-icon> -->
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

.m-snackbar-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 5px;
    right: 41px;
}

.snack-bar {
    .v-overlay__content {
        width: 240px;
        position: absolute;
        bottom: 80% !important;
        right: -209px !important;
        left: unset !important;
        // transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s !important;
    }

    .notification-text {
        width: 230px;
    }
}

@media(max-width: 600px) {
    .v-snackbar--multi-line .v-snackbar__wrapper {
        min-height: 60px !important;
    }
}

.m-snack-bar {
    .v-overlay__content {
        width: 240px;
        position: absolute;
        top: 70px !important;
        right: -224px !important;
        left: unset !important;
        // transform: unset !important;
        height: 60px !important;
        transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
    }

    .notification-text {
        width: 230px;
    }
}
</style>