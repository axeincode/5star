<script lang="ts" setup>
import { ref, computed, h, shallowRef, watch } from 'vue';
import { Options } from '@popperjs/core';
import Pagination from '@/components/global/pagination/index.vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import moment from "moment-timezone";

const { t } = useI18n()
const { width } = useDisplay();

const customPrefix = shallowRef({
    render() {
        return h('p', '')
    },
})

const customClear = shallowRef({
    render() {
        return h('p', '')
    },
})


const popperOptions = ref<Options>({
    modifiers: [
        {
            name: 'preventOverflow',
            options: {
                boundary: 'viewport',
            },
        },
    ],
    placement: 'top',
    strategy: 'fixed'
})

// const popperOptions = ref({
//     dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
//     dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
// })

const dateFormat = ref('YYYY/MM/DD');

const selectedBonusItem = ref("Invitation Bonus");

const bonusItems = ref<Array<string>>([
    "Invitation Bonus",
    "Betting Commission"
])

const selectedCashItem = ref<number>(10);

const cashItems = ref<Array<number>>([
    10,
    11,
    12,
])

const formsList = ref<Array<any>>([
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
    {
        time: "04/08 12:29:42",
        user: "User6910821714",
        bonus: "R$ 12"
    },
])

const handleDropdown = (item: string) => {
    selectedBonusItem.value = item;
}

const handleCashDropdown = (item: number) => {
    selectedCashItem.value = item;
}

const selectedDate = ref([
    moment().tz("Asia/Hong_Kong").format("YYYY/MM/DD"),
    moment().tz("Asia/Hong_Kong").format("YYYY/MM/DD")
]);

const mobileWidth = computed(() => {
    return width.value
})
</script>
<template>
    <v-row class="mt-4 mx-2">
        <div class="relative m-date-picker">
            <el-date-picker v-model="selectedDate" popper-class="m-date-picker-background" type="daterange"
                value-format="YYYY/MM/DD" :format="dateFormat" :prefix-icon="customPrefix" :clear-icon="customClear"
                start-placeholder="Start date" end-placeholder="End date" :popper-options="popperOptions">
                <template #range-separator>
                    <img src="@/assets/public/svg/icon_public_83.svg" width="18" />
                </template>
            </el-date-picker>
            <img src="@/assets/public/svg/icon_public_23.svg" class="date-icon-position" width="20" />
        </div>
    </v-row>
    <v-row class="mt-6 mx-2">
        <v-menu offset="10" content-class="bonus-menu">
            <template v-slot:activator="{ props }">
                <v-card color="#1C1929" theme="dark">
                    <v-list-item class="bonus-item" v-bind="props" :title="selectedBonusItem" append-icon="mdi-chevron-down"
                        value="sport">
                    </v-list-item>
                </v-card>
            </template>
            <v-list theme="dark" bg-color="#211F31">
                <v-list-item v-for="(item, i) in bonusItems" :key="i" :value="item" class="bonus-item"
                    @click="handleDropdown(item)">
                    <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu offset="10" class="bonus-menu">
            <template v-slot:activator="{ props }">
                <v-card color="#1C1929" theme="dark" class="mr-2 ml-auto">
                    <v-list-item class="bonus-item" v-bind="props" :title="selectedCashItem" append-icon="mdi-chevron-down"
                        value="sport">
                    </v-list-item>
                </v-card>
            </template>
            <v-list theme="dark" bg-color="#211F31">
                <v-list-item v-for="(item, i) in cashItems" :key="i" :value="item" class="bonus-item"
                    @click="handleCashDropdown(item)">
                    <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-row>
    <v-row class="mx-2 mt-6">
        <v-table class="forms-bonus-table-bg" theme="dark" fixed-header height="600px">
            <thead class="forms-table-header">
                <tr>
                    <th class="m-forms-table-header-text" style="border-radius: 8px 0px 0px 8px;">
                        {{ t('affiliate.forms.table.time') }}
                    </th>
                    <th class="m-forms-table-header-text">
                        <div class="forms-table-border">{{ t('affiliate.forms.table.user') }}</div>
                    </th>
                    <th class="m-forms-table-header-text" style="border-radius: 0px 8px 8px 0px;">
                        {{ t('affiliate.forms.table.bonus') }}
                    </th>
                </tr>
            </thead>
            <tbody class="m-forms-table-body">
                <tr v-for="(item, index) in formsList" :key="index">
                    <td class="forms-td-border">{{ item.time }}</td>
                    <td>{{ item.user }}</td>
                    <td>{{ item.bonus }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-row>
    <v-row class="mt-6 justify-center mx-4">
        <Pagination />
    </v-row>
</template>
<style lang="scss">
.bonus-menu {
    
    .v-overlay__content::after {
        content: "";
        position: absolute;
        align-self: center;
        float: right;
        top: -16px;
        border: 9px solid #211f31;
        border-right-color: transparent;
        border-left-color: transparent;
        border-top-color: transparent;
        border-right-width: 7px;
        border-left-width: 7px;
    }
}

.bonus-item {
    height: 100% !important;
    padding: 4px 14px !important;
    text-align: center !important;

    .v-list-item-title {
        font-weight: 700;
        font-size: 14px;
        color: #7782aa;
    }
}

.date-icon-position {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 13px;
}

.forms-bonus-table-bg {
    background: #1C1929 !important;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
    border-radius: 12px !important;
    width: 100% !important;

    .v-table__wrapper {
        // margin: 8px 60px !important;
    }
}

.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td,
.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>th {
    border-bottom: 1px solid #414968;
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
    background: #414968;
}

.forms-table-header {
    border-radius: 8px !important;
}

.m-forms-table-body {
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    color: #FFFFFF;
    text-align: center;
}

.m-forms-table-header-text {
    font-weight: 700 !important;
    font-size: 14px !important;
    text-align: center !important;
    color: #000000 !important;
}

.forms-table-border {
    border-left: 1px solid #000000 !important;
    border-right: 1px solid #000000 !important;
}

.m-date-picker {
    .el-date-editor.el-input__wrapper {
        height: 40px !important;
        background: #1C1929 !important;
        box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
        border-radius: 12px !important;
        justify-content: start;
    }

    .el-date-editor .el-range-input {
        font-weight: 500 !important;
        font-size: 14px !important;
        color: #7782AA !important;
    }
}

.m-date-picker-background {
    z-index: 2002 !important;
    position: absolute !important;
    inset: 194px auto auto 0px !important;

    .el-popper.is-light .el-popper__arrow::before {
        border: 1px solid #181522;
        background: #181522;
        right: 0;
    }

    .el-popper.is-light {
        background-color: #181522 !important;
        border: none !important;
        border-radius: 10px !important;
    }

    .el-picker-panel {
        background-color: #181522;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 19px;
        color: #FFFFFF;
        border-color: #181522;
        border: none;
        box-shadow: none;
        border-radius: 10px !important;
        box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
    }

    .el-date-range-picker__content.is-left {
        border-right: none;
    }

    .el-date-table td.in-range .el-date-table-cell {
        background-color: transparent;
    }

    .el-picker-panel__icon-btn .el-icon {
        cursor: pointer;
        font-weight: 900;
        font-size: 18px;
        color: #7782AA;
    }

    .el-date-table th {
        padding: 5px;
        font-weight: 600;
        font-size: 10px;
        color: #FFFFFF;
        border-bottom: none;
    }


    .el-date-range-picker {
        width: 100% !important;
    }

    .el-date-range-picker .el-picker-panel__body {
        min-width: unset !important;
    }

    .el-date-range-picker__content {
        padding: 16px 8px !important;
    }

    .el-date-table td {
        padding: 0 !important;
        font-weight: 600;
        font-size: 10px;
        color: #FFFFFF;
    }

    .el-picker-panel__icon-btn {
        margin-top: 0px !important;
    }

    .el-date-range-picker__content .el-date-range-picker__header div {
        font-weight: 600;
        font-size: 12px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .el-date-table th {
        padding: 0px !important;
    }
}
</style>