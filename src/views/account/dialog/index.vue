<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

const { t } = useI18n();
const { width } = useDisplay();
const emit = defineEmits<{ (e: 'mDialogHide'): void, (e: 'selectActiveIndex', value: number): void }>()
const props = defineProps<{ avatar: any, nickName: string }>();
const { avatar, nickName } = toRefs(props);

const menuList = ref<Array<any>>([
    {
        title: t('account.menu.user_info_text'),
        content: t('account.sub_menu.user_info_text'),
    },
    {
        title: t('account.menu.personal_info_text'),
        content: t('account.sub_menu.personal_info_text'),
    },
    {
        title: t('account.menu.document_text'),
        content: t('account.sub_menu.document_text'),
    },
    {
        title: t('account.menu.preference_text'),
        content: t('account.sub_menu.preference_text'),
    },
    {
        title: t('account.menu.suspend_account_text'),
        content: t('account.sub_menu.suspend_account_text'),
    },
])

const handleMenu = (index: number) => {
    emit('selectActiveIndex', index)
}

</script>

<template>
    <div class="m-account-dialog-container">
        <img :src="avatar" class="m-account-avatar-position" />
        <v-btn class="m-account-close-button" icon="true" @click="emit('mDialogHide')" width="30" height="30">
            <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
            <!-- <v-icon color="#7782AA">
                mdi-close
            </v-icon> -->
        </v-btn>
        <v-row class="mt-16 mx-2 justify-center text-700-12 text-gray">
            {{ nickName }}
        </v-row>
        <v-row class="mx-1 mt-4">
            <v-col cols="12" class="m-account-menu m-account-dialog-menu-body">
                <v-list theme="dark">
                    <template v-for="(item, index) in menuList" :key="index">
                        <v-divider class="m-account-divider"></v-divider>
                        <v-list-item :value="item" @click="handleMenu(index)">
                            <v-list-item-title>
                                <div class="m-account-dialog-menu-item">
                                    <div class="text-700-12 text-gray" style="line-height: 20px;">
                                        {{ item.title }}
                                    </div>
                                    <div class="text-400-10 text-gray" style="line-height: 20px;">
                                        {{ item.content }}
                                    </div>
                                </div>
                            </v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>
            </v-col>
        </v-row>
    </div>
</template>

<style lang="scss">
// mobile account dialog container
.m-account-dialog-container {
    background-color: #1D2027;
    border-radius: 8px !important;
    height: 384px;

    .m-account-avatar-position {
        width: 116px;
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
    }

    // close modal button
    .m-account-close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 8px;
        right: 8px;
    }
    .m-account-dialog-menu-body {
        max-height: 200px;
        .v-list-item {
            margin-left: -12px;
        }
    }
    .m-account-dialog-menu-item {
        min-height: 43px;
        // margin-top: 1px;
        // margin-bottom: 1px;
    }
}


.m-account-menu {
    background-color: #1D2027;
    border-radius: 0px 0px 12px 12px !important;

    .v-list {
        background: inherit !important;
    }
}

.m-account-divider {
    margin: auto;
    border-width: thin;
    color: black;
}
</style>