<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import SuspendDialog from "./dialog/index.vue";

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
    <div class="suspend-menu py-10 relative suspend-account-body">
        <v-row class="mx-6 mt-5 text-700-20 text-white">
            {{ t('account.menu.suspend_account_text') }}
        </v-row>
        <v-row class="mx-6 mt-5 text-400-14 text-gray">
            {{ t('account.suspend_account.help_text') }}
        </v-row>
        <v-row class="mx-6 mt-10 ">
            <v-col cols="2"></v-col>
            <v-col cols="8">
                <v-text-field :label="t('account.suspend_account.duration_text')" class="form-textfield dark-textfield"
                    variant="solo" density="comfortable" v-model="suspendDate" />
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>
        <v-row class="mx-6 mt-2 text-400-14 text-gray justify-center">
            {{ t('account.suspend_account.minimum_duration_text') }}
        </v-row>
        <v-row class="mx-6 mt-10">
            <v-col cols="2"></v-col>
            <v-col cols="8">
                <v-btn class="mx-10 button-bright text-none" width="-webkit-fill-available" height="60px" @click="confirmDailogShow">
                    {{ t('account.suspend_account.confirm_text') }}
                </v-btn>
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>
        <v-dialog v-model="dialogVisible" width="788" content-class="suspend-dialog-position">
            <SuspendDialog :suspendDate="suspendDate" @suspendDialogHide="suspendDialogHide"/>
        </v-dialog>
    </div>
</template>

<style lang="scss">
.suspend-account-body:before {
    content: "";
    position: absolute;
    left: -10px;
    top: 262px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #1D2027;
}
.suspend-account-body{
    .form-textfield div.v-field__field {
        box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset!important;;

    }
}

.suspend-menu {
    background-color: #1D2027;
    border-radius: 0px 0px 12px 12px !important;
    height: 600px;

    .v-field__field {
        background: #15161C !important;
    }
}
.suspend-dialog-position {
    top: 20px !important;
}
</style>