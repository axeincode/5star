<script lang="ts" setup>
import { ref, computed, h, shallowRef, watch } from 'vue';
import Pagination from '@/components/global/pagination/index.vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

const { t } = useI18n()
const { width } = useDisplay();

const formsList = ref<Array<any>>([
    {
        game: "Crash",
        date: "2023/1/29 17:50:36",
        amount: "R$ 1500000.00",
        multilier: "2.00x",
        betId: "re54er35sgf",
        status: "win",
        profit: "R$ 300000000.00"
    },
    {
        game: "Crash",
        date: "2023/1/29 17:50:36",
        amount: "R$ 1500000.00",
        multilier: "2.00x",
        betId: "re54er35sgf",
        status: "win",
        profit: "R$ 3000000.00"
    },
    {
        game: "Crash",
        date: "2023/1/29 17:50:36",
        amount: "R$ 1500000.00",
        multilier: "2.00x",
        betId: "re54er35sgf",
        status: "loss",
        profit: "- R$ 300000000.00"
    },
])

const gameList = ref<Array<string>>([
    "Crash",
    "Crash",
    "Crash",
    "Crash",
    "Crash",
    "Crash",
    "Crash",
    "Crash",
    "Crash",
    "Crash",
])

const selectedGame = ref<string>("Crash");

const gameMenuShow = ref<boolean>(false);

const handleDropdown = (item: string) => {
    selectedGame.value = item;
}

const tootipList = ref<Array<any>>([
    {
        id: "Qsd58844221122 ",
        cash: "BRL100"
    },
    {
        id: "qwe12309700974",
        cash: "BRL100"
    },
    {
        id: "qww54515555566",
        cash: "BRL150"
    },
])

const mobileWidth = computed(() => {
    return width.value
})
</script>
<template>
    <v-row class="mx-2 mt-1 m-forms-bonus-table">
        <v-table class="m-forms-bonus-table-bg" theme="dark" fixed-header>
            <thead class="forms-table-header">
                <tr>
                    <th class="text-700-12 black text-center" style="border-radius: 8px 0px 0px 8px;">
                        {{ t('transaction.game_history.game') }}
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border">{{ t('transaction.game_history.date') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div>{{ t('transaction.game_history.amount') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border">{{ t('transaction.game_history.multilier') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div>{{ t('transaction.game_history.betId') }}</div>
                    </th>
                    <th class="text-700-12 black text-center">
                        <div class="forms-table-border">{{ t('transaction.game_history.status') }}</div>
                    </th>
                    <th class="text-700-12 black text-center" style="border-radius: 0px 8px 8px 0px;">
                        {{ t('transaction.game_history.profit') }}
                    </th>
                </tr>
            </thead>
            <tbody class="text-400-10 text-center">
                <tr v-for="(item, index) in formsList" :key="index">
                    <td>{{ item.game }}</td>
                    <td>{{ item.date }}</td>
                    <td class="d-flex align-center justify-center" style="min-width: 130px;">
                        <div style="width: 16px; height: 16px; background: #414968; border-radius: 20px;">
                            <el-tooltip placement="top" effect="customized">
                                <template #content>
                                    <v-list-item v-for="(item, index) in tootipList" :key="index" class="text-400-12 gray"
                                        style="min-height: 26px !important;">
                                        <v-list-item-title class="text-400-12">ID: {{ item.id }}</v-list-item-title>
                                        <template v-slot:append>
                                            <div class="ml-10 text-400-12">{{ item.cash }}</div>
                                        </template>
                                    </v-list-item>
                                </template>
                                <!-- <img src="@/assets/public/svg/icon_public_50.svg" width="20" /> -->
                                <v-icon>mdi-chevron-up</v-icon>
                            </el-tooltip>
                        </div>
                        <div class="ml-1">{{ item.amount }}</div>
                    </td>
                    <td>{{ item.multilier }}</td>
                    <td>{{ item.betId }}</td>
                    <td>{{ item.status }}</td>
                    <td :class="item.status == 'win' ? 'color-01983A' : 'color-D42763'" style="min-width: 130px;">
                        {{ item.profit }}
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-row>
    <v-row class="ma-2">
        <v-col cols="6" md="4" lg="4" class="d-flex justify-start px-0">
            <v-menu offset="12" class="m-game-menu" v-model:model-value="gameMenuShow">
                <template v-slot:activator="{ props }">
                    <v-card color="#1C1929" theme="dark" style="height: 32px;" class="m-bonus-game-card">
                        <v-list-item v-bind="props" append-icon="mdi-chevron-down" value="game" style="min-height: 32px;">
                            <v-list-item-title class="text-600-12">
                                {{ selectedGame }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-card>
                </template>
                <v-list theme="dark" bg-color="#221F32">
                    <v-list-item v-for="(item, i) in gameList" :key="i" :value="item" @click="handleDropdown(item)">
                        <v-list-item-title class="text-center text-600-12">
                            {{ item }}
                        </v-list-item-title>
                    </v-list-item>
                    <div class="m-bonus-game-card-list text-center">
                        <v-icon>mdi-chevron-down</v-icon>
                    </div>
                </v-list>
            </v-menu>
        </v-col>
        <v-col cols="6" md="8" lg="8" class="d-flex justify-end">
            <Pagination />
        </v-col>
    </v-row>
</template>
<style lang="scss">
.m-forms-bonus-table-bg {
    background: #1C1929 !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 12px !important;
    width: 100% !important;
}

.m-forms-bonus-table {

    .v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
        background: #414968;
        height: 46px !important;
    }

    .v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td,
    .v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>th {
        border-bottom: 1px solid #414968;
    }

    .forms-table-header {
        border-radius: 8px !important;
    }

    .forms-table-body {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        text-align: center;
    }

    .forms-table-border {
        padding: 0px 20px;
        border-left: 1px solid #000000 !important;
        border-right: 1px solid #000000 !important;
    }

}

.m-game-menu {
    .v-overlay__content::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -11px;
        border-width: 7px;
        border-style: solid;
        border-color: #211F31 transparent transparent transparent;
    }

    .v-overlay__content {
        max-height: 418px !important;
    }
}

.m-bonus-game-card {
    height: 32px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--bg-51-c-1929, #1C1929);
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;

    .v-list-item__append>.v-icon {
        margin-inline-start: 10px;
        font-size: 20px;
    }
}

.el-popper.is-customized {
    padding: 6px 12px;
    background: #29253C;
    border-radius: 10px;
}

.el-popper.is-customized .el-popper__arrow::before {
    background: #29253C;
    right: 0;
}

.m-bonus-game-card-list {
    margin-left: 3px;
    width: 79px;
    height: 26px;
    flex-shrink: 0;
    border-radius: 27px;
    background: var(--bg-51-c-1929, #1C1929);
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}
</style>