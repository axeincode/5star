<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from 'vue-i18n';
import { type GetGameOriginalData } from "@/interface/navBar";
import { setLang } from "@/locale/index";
import { useDisplay } from 'vuetify'
import { appBarStore } from "@/store/appBar";
import { loginBonusStore } from "@/store/loginBonus";
import { refferalStore } from "@/store/refferal";
import { storeToRefs } from "pinia";

const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();

const { t } = useI18n();
const open = ref<Array<string>>(['']);
const language = ref<string>('English');
const drawer = ref<boolean>(true);

// mobile version name
const { name, width } = useDisplay()

const mobileVersion = computed(() => {
    return name.value
});

const mobileWidth = computed(() => {
    return width.value
})

const refferalAppBarShow = computed(() => {
    const { getRefferalAppBarShow } = storeToRefs(refferalStore());
    return getRefferalAppBarShow.value
})

const navBarToggle = computed(() => {
    const { getNavBarToggle } = storeToRefs(appBarStore());
    return getNavBarToggle.value
})

// language array
const langItems = ref<Array<string>>([
    t('navBar.language.english'),
    t('navBar.language.portuguese'),
    t('navBar.language.espanola')
])

// game original data array
const gameOriginalItems = ref<Array<GetGameOriginalData>>([
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlotsSlotsSlots"
    },
    {
        icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
        name: "SlotsSlotsSlotsSlotsSlots"
    }
])

watch(drawer, (newValue: boolean) => {
    setNavBarToggle(newValue);
})

watch(navBarToggle, (newValue) => {
    drawer.value = newValue;
    if (mobileWidth.value < 600 && newValue) {
        setRightBarToggle(false);
    }
})

const handleLanguageDropdown = (item: string) => {
    language.value = item;
    switch (item) {
        case t('navBar.language.english'):
            setLang("en");
            break;
        case t('navBar.language.portuguese'):
            setLang("pt");
            break;
        case t('navBar.language.espanola'):
            setLang("es");
            break;
    }
}

const openRouletteBonusDialog = () => {
  setRouletteBonusDialogVisible(true);
}

onMounted(() => {
    drawer.value = mobileWidth.value < 1280 ? false : true;
})
</script>

<template>
    <v-navigation-drawer :temporary="mobileWidth < 1280" expand-on-hover :scrim-opacity="0.6" class="nav-background"
        :width="240" v-model="drawer" :class="[mobileWidth < 600 ? 'pb-16' : '']">
        <template v-slot:prepend>
            <v-list-item class="casino-toggle" :class="refferalAppBarShow ? 'mt-10' : ''">
                <input type="checkbox" id="casino-toggle" />
                <label for="casino-toggle">
                    <div class="casino">
                        <img src="@/assets/public/svg/icon_public_34.svg" />
                        <P>{{ t('navBar.casino') }}</P>
                    </div>
                    <div class="sport">
                        <img src="@/assets/public/svg/icon_public_40.svg" />
                        <P>{{ t('navBar.sport') }}</P>
                    </div>
                </label>
            </v-list-item>
        </template>
        <v-list density="compact" nav class="mt-6">
            <v-card color="#211F31" theme="dark">
                <v-row class="ma-4 align-center" v-ripple.center>
                    <span class="card-title">{{ t('navBar.my_vip_perks') }}</span>
                    <span class="ml-10 more-font">{{ t('navBar.more') }}</span>
                    <v-btn class="right-btn" icon="true">
                        <v-icon icon="mdi-chevron-right" />
                    </v-btn>
                </v-row>
                <v-row class="ma-1">
                    <v-col cols="6" class="pa-1 relative">
                        <v-list-item value="casino" class="ma-0 pa-0" height="48px">
                            <img src="@/assets/public/svg/bg_public_16.svg" class="img-width" />
                            <img src="@/assets/public/image/img_public_01.png" class="navbar-task-img-position"
                                width="46" />
                            <p class="text-700-14 white navbar-task-text-position">{{ t('navBar.task_text') }}</p>
                            <p class="white navbar-unlock-text-left-position">{{ t('navBar.unlock_text') }}</p>
                        </v-list-item>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-list-item value="sport" class="ma-0 pa-0" height="48px" @click="openRouletteBonusDialog">
                            <img src="@/assets/public/svg/bg_public_17.svg" class="spin-img-width" />
                            <img src="@/assets/public/image/img_public_02.png" class="navbar-spin-img-position"
                                width="38" />
                            <p class="text-700-14 white navbar-spin-text-position">{{ t('navBar.task_text') }}</p>
                            <p class="white navbar-unlock-text-right-position">{{ t('navBar.unlock_text') }}</p>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-card>
        </v-list>
        <v-list density="compact" nav>
            <v-list-item value="earn free" class="ma-0 pa-0">
                <img src="@/assets/public/image/img_public_18.png" class="earn-free-img" />
                <img src="@/assets/public/image/img_public_17.png" class="navbar-free-money-img-position" />
                <p class="text-700-16 color-29263C navbar-free-money-text-position">{{ t('navBar.earn_free_text') }}</p>
            </v-list-item>
        </v-list>
        <v-list v-model:opened="open">
            <v-list-group value="Casino">
                <template v-slot:activator="{ props }">
                    <v-list-item class="avatar-img" v-bind="props" prepend-avatar="@/assets/public/svg/icon_public_34.svg"
                        :title="t('navBar.casino')" link value="casino"></v-list-item>
                </template>
                <v-card color="#211F31" theme="dark" class="ma-2">
                    <v-list>
                        <v-list-item class="casino-sub-img" prepend-avatar="@/assets/public/svg/icon_public_35.svg"
                            :title="t('navBar.casino_sub_menu.recently_played')" value="recently played"></v-list-item>
                        <v-list-item class="casino-sub-img" prepend-avatar="@/assets/public/svg/icon_public_36.svg"
                            :title="t('navBar.casino_sub_menu.favorites')" value="favorites"></v-list-item>
                        <v-menu location="end" offset="10" class="original-dropdown">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" class="casino-sub-img"
                                    prepend-avatar="@/assets/public/svg/icon_public_37.svg" append-icon="mdi-chevron-right"
                                    :title="t('navBar.casino_sub_menu.game_originals')"
                                    value="game originals"></v-list-item>
                            </template>
                            <v-list theme="dark" bg-color="#211F31">
                                <v-list-item v-for="(item, i) in gameOriginalItems" :key="i" :value="item.name"
                                    class="avatar-img" :prepend-avatar="item.icon" :title="item.name">
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-list-item class="casino-sub-img" prepend-avatar="@/assets/public/svg/icon_public_38.svg"
                            :title="t('navBar.casino_sub_menu.slots')" value="slots"></v-list-item>
                        <v-list-item class="casino-sub-img" prepend-avatar="@/assets/public/svg/icon_public_39.svg"
                            :title="t('navBar.casino_sub_menu.live_casino')" value="live casino"></v-list-item>
                    </v-list>
                </v-card>
            </v-list-group>
        </v-list>
        <v-list>
            <v-list-item class="avatar-img" prepend-avatar="@/assets/public/svg/icon_public_40.svg"
                :title="t('navBar.sport')" value="sport"></v-list-item>
        </v-list>
        <v-divider class="divider"></v-divider>
        <v-list>
            <v-list-item class="avatar-img" prepend-avatar="@/assets/public/svg/icon_public_41.svg"
                :title="t('navBar.menu_item_1.promotions')" value="promotions"></v-list-item>
            <v-list-item class="vip-club" prepend-avatar="@/assets/public/svg/icon_public_42.svg"
                :title="t('navBar.menu_item_1.vip_club')" value="vip club" router :to="{ name: 'VIP' }"></v-list-item>
            <v-list-item class="avatar-img" prepend-avatar="@/assets/public/svg/icon_public_43.svg"
                :title="t('navBar.menu_item_1.affiliate')" value="affiliate" router
                :to="{ name: 'Affiliate' }"></v-list-item>
            <v-list-item class="avatar-img" prepend-avatar="@/assets/public/svg/icon_public_44.svg"
                :title="t('navBar.menu_item_1.blog')" value="blog"></v-list-item>
        </v-list>
        <v-divider class="divider"></v-divider>
        <v-list>
            <v-list-item class="avatar-img" prepend-avatar="@/assets/public/svg/icon_public_45.svg"
                :title="t('navBar.live_support')" value="live support"></v-list-item>
        </v-list>
        <v-list>
            <v-menu location="end" offset="10">
                <template v-slot:activator="{ props }">
                    <v-card color="#211F31" theme="dark" class="mx-2 language-item">
                        <v-list-item v-bind="props" class="casino-sub-img"
                            prepend-avatar="@/assets/public/svg/icon_public_57.svg" :title="language" value="english"
                            append-icon="mdi-chevron-right"></v-list-item>
                    </v-card>
                </template>
                <v-list theme="dark" bg-color="#211F31">
                    <v-list-item :title="t('navBar.language.title')" class="avatar-img"></v-list-item>
                    <v-divider></v-divider>
                    <v-list-item v-for="(item, i) in langItems" :key="i" :value="item" class="avatar-img"
                        @click="handleLanguageDropdown(item)">
                        <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-list>
        <v-list>
            <v-list-item class="theme-toggle">
                <input type="checkbox" id="theme-toggle" />
                <label for="theme-toggle">
                    <div class="dark">
                        <img src="@/assets/public/svg/icon_public_46.svg" />
                        <p>{{ t('navBar.sound_mode.on') }}</p>
                    </div>
                    <div class="light">
                        <img src="@/assets/public/svg/icon_public_47.svg" />
                        <p>{{ t('navBar.sound_mode.off') }}</p>
                    </div>
                </label>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.nav-background {
    background-color: #29263C !important;
    color: #7782AA !important;
    border: 2px !important;
    box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25) !important;
    will-change: auto !important;
}

::deep(.v-navigation-drawer__content) {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden !important;

    &::-webkit-scrollbar {
        width: 2px
    }

    &::-webkit-scrollbar-thumb {
        background: #5142af;
        border-radius: 20px;
    }
}

// casino and sport toggle switch
.casino-toggle {
    label {
        width: 200px;
        height: 40px;
        position: relative;
        display: block;
        background: #211F31;
        border-radius: 20px !important;
        box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
        cursor: pointer;
        transition: 0.3s;

        div {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 100;
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 14px;
        }

        .casino {
            left: 14px;
            transition: 0.3s;
            color: black;

            img {
                width: 20px;
                height: 24px;
                margin-right: 4px;
            }
        }

        .sport {
            left: 120px;
            transition: 0.3s;
            color: #7782AA;

            img {
                width: 20px;
                margin-right: 4px;
            }
        }
    }

    label:after {
        content: "";
        width: 100px;
        height: 36px;
        position: absolute;
        top: 2px;
        left: 2px;
        background: #32CFEC;
        border-radius: 18px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
    }

    input {
        width: 0;
        height: 0;
        visibility: hidden;
    }

    input:checked+label:after {
        left: 200px;
        transform: translateX(-100%);
    }

    label:active:after {
        width: 100px;
    }

    input:checked+label .casino {
        color: #7782AA
    }

    input:checked+label .sport {
        color: black
    }

}

.card-title {
    color: #D99504;
    font-weight: 700;
    font-size: 16px;
}

.more-font {
    font-weight: 500;
    font-size: 12px;
    color: #7782AA
}

.right-btn {
    font-weight: 500;
    font-size: 12px;
    color: #7782AA;
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 3px;
    right: 5px;
}

.img-width {
    width: 100%;
}

.spin-img-width {
    width: 100%;
    margin-top: 4px;
}

.earn-free-img {
    width: 100%
}

.avatar-img {
    :deep(.v-avatar--density-default) {
        height: 24px;
        width: 20px;
        border-radius: 0px;
    }

    :deep(.v-list-item-title) {
        font-weight: 700;
        font-size: 14px;
        color: #7782AA;
    }
}

.vip-club {
    :deep(.v-avatar--density-default) {
        height: 24px;
        width: 20px;
        border-radius: 0px;
    }

    :deep(.v-list-item-title) {
        font-weight: 700;
        font-size: 14px;
        color: #F9BC01;
    }
}

.casino-sub-img {
    :deep(.v-avatar--density-default) {
        height: 22px;
        width: 22px;
        border-radius: 0px;
    }

    :deep(.v-list-item-title) {
        font-weight: 500;
        font-size: 14px;
        color: #7782AA;
    }
}

.divider {
    width: 180px;
    margin: auto;
    border-width: thin;
}

.casino-sub-img {
    :deep(.v-list-item__content) {
        align-self: center;
        grid-area: content;
        overflow: hidden;
        width: 105px;
    }

    :deep(.v-list-item__append > .v-icon) {
        margin-inline-start: 18px;
    }
}

.language-item {
    :deep(.v-list-item__content) {
        align-self: center;
        grid-area: content;
        overflow: hidden;
        width: 105px;
    }

    :deep(.v-list-item__append > .v-icon) {
        margin-inline-start: 18px;
    }
}


// dark and light toggle switch
.theme-toggle {
    height: 50px;

    label {
        width: 200px;
        height: 40px;
        position: relative;
        display: block;
        background: #211F31;
        border-radius: 20px !important;
        box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
        cursor: pointer;
        transition: 0.3s;

        div {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 100;
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 14px;
        }

        .dark {
            left: 14px;
            transition: 0.3s;
            color: white;

            img {
                width: 20px;
                height: 24px;
                margin-right: 4px;
            }
        }

        .light {
            left: 120px;
            transition: 0.3s;
            color: #7782AA;

            img {
                width: 20px;
                margin-right: 4px;
            }
        }
    }

    label:after {
        content: "";
        width: 100px;
        height: 36px;
        position: absolute;
        top: 2px;
        left: 2px;
        background: #353652;
        border-radius: 18px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
    }

    input {
        width: 0;
        height: 0;
        visibility: hidden;
    }

    input:checked+label:after {
        left: 200px;
        transform: translateX(-100%);
    }

    label:active:after {
        width: 100px;
    }

    input:checked+label .dark {
        color: #7782AA
    }

    input:checked+label .light {
        color: white
    }

}

.original-dropdown {
    ::deep(.v-overlay__content) {
        display: none !important;
    }
}

.navbar-free-money-img-position {
    position: absolute;
    left: 32px;
    top: -10px;
}

.navbar-free-money-text-position {
    position: absolute;
    left: 81px;
    top: 6px;
}

.navbar-task-img-position {
    position: absolute;
    left: 6px;
    top: -8px;
}

.navbar-task-text-position {
    position: absolute;
    left: 47px;
    top: 3px;
}

.navbar-unlock-text-left-position {
    position: absolute;
    left: 43px;
    top: 18px;
    font-size: 12px;
}

.navbar-spin-img-position {
    position: absolute;
    left: 4px;
    top: 2px;
}

.navbar-spin-text-position {
    position: absolute;
    left: 47px;
    top: 5px;
}

.navbar-unlock-text-right-position {
    position: absolute;
    left: 43px;
    top: 20px;
    font-size: 12px;
}</style>
