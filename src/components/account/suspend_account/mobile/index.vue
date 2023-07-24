<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import MSuspendDialog from "@/components/account/suspend_account/dialog/mobile/index.vue";

const { t } = useI18n();
const { width } = useDisplay()

const mobileWidth: any = computed(() => {
    return width.value;
})

const dialogVisible = ref<boolean>(false);

const suspendDate = ref<number>(1);

const positionX = ref("left");

const suspendDialogHide = () => {
    dialogVisible.value = false;
}

const confirmDailogShow = () => {
    dialogVisible.value = true;
}
</script>

<template>
    <div class="m-suspend-menu relative">
        <v-row class="mx-4 mt-4 text-700-14 text-white">
            {{ t('account.menu.suspend_account_text') }}
        </v-row>
        <v-row class="mx-4 mt-8 text-400-12 text-gray">
            {{ t('account.suspend_account.help_text') }}
        </v-row>
        <v-row class="mx-4 mt-10">
            <v-text-field :label="t('account.suspend_account.duration_text')" class="form-textfield dark-textfield"
                variant="solo" density="comfortable" v-model="suspendDate" />
        </v-row>
        <v-row class="mx-6 mt-2 text-400-14 text-gray justify-center">
            {{ t('account.suspend_account.minimum_duration_text') }}
        </v-row>
        <v-row class="mx-4 mt-10">
            <v-col cols="12">
                <v-btn class="button-bright text-none" width="-webkit-fill-available" height="46px"
                    @click="confirmDailogShow">
                    {{ t('account.suspend_account.confirm_text') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogVisible" width="340" content-class="suspend-dialog-position">
            <MSuspendDialog :suspendDate="suspendDate" @suspendDialogHide="suspendDialogHide" />
        </v-dialog>
    </div>
</template>

<style lang="scss">
.m-suspend-menu {
    background-color: #211F31;
    border-radius: 0px 0px 12px 12px !important;
    height: 400px;

    .v-field__field {
        background: #1C1929 !important;
    }
}

.suspend-dialog-position {
    top: 20px !important;
}
</style>