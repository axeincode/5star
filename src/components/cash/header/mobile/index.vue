<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { appBarStore } from '@/store/appBar';
import { type GetPersonalInfo } from '@/interface/deposit';
import Notification from "@/components/global/notification/index.vue";
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import icon_public_60 from "@/assets/public/svg/icon_public_60.svg";
import icon_public_65 from "@/assets/public/svg/icon_public_65.svg";

const { name, width } = useDisplay();
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();

const cashToggleSwitch = ref<boolean>(false);

const personalInfoToggle = ref<boolean>(false);

const confirmValidation = ref<boolean>(false);

const notificationShow = ref<boolean>(false);

const personalInfoMenuShow = ref<boolean>(false);

const depositCheckboxColor = ref<string>("#ffffff");
const withdrawCheckboxColor = ref<string>("#7782AA");

const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);

const notificationText = ref<string>("");

const personalInfoItem = ref<GetPersonalInfo>({
    id: "",
    first_name: "",
    last_name: ""
})

const isPersonalBtnReady = ref<boolean>(false);

const mobileWidth = computed(() => {
    return width.value
})

const handlePersonalInfoToggle = (): void => {
    personalInfoToggle.value = !personalInfoToggle.value;
}

const handleConfirmValidation = (): void => {
    if (confirmValidation.value) {
        // notificationText.value = t('deposit_dialog.personal_information.confirm_warning_text');
        // checkIcon.value = new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href;
        // notificationShow.value = !notificationShow.value;
        ElNotification({
            icon: WarningIcon,
            title: t('deposit_dialog.personal_information.confirm_warning_text'),
            duration: 3000,
        })
    }
}

const handlePersonalInfoID = (): void => {
    if (personalInfoItem.value.id != "" && personalInfoItem.value.first_name != "" && personalInfoItem.value.last_name != "") {
        isPersonalBtnReady.value = true;
    } else {
        isPersonalBtnReady.value = false;
    }
}

const handlePersonalInfoFirstName = (): void => {
    if (personalInfoItem.value.id != "" && personalInfoItem.value.first_name != "" && personalInfoItem.value.last_name != "") {
        isPersonalBtnReady.value = true;
    } else {
        isPersonalBtnReady.value = false;
    }
}

const handlePersonalInfoLastName = (): void => {
    if (personalInfoItem.value.id != "" && personalInfoItem.value.first_name != "" && personalInfoItem.value.last_name != "") {
        isPersonalBtnReady.value = true;
    } else {
        isPersonalBtnReady.value = false;
    }
}

const cashDialogShow = () => {
    setCashDialogToggle(false);
    setDepositDialogToggle(false);
    setWithdrawDialogToggle(false);
}

const handlePersonalInfoSubmit = (): void => {
    confirmValidation.value = true;
    // notificationText.value = t('deposit_dialog.personal_information.confirm_success_text');
    // checkIcon.value = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
    // notificationShow.value = !notificationShow.value;
    ElNotification({
        icon: SuccessIcon,
        title: t('deposit_dialog.personal_information.confirm_success_text'),
        duration: 3000,
    })
}

const depositDialogToggle = computed(() => {
    const { getDepositDialogToggle } = storeToRefs(appBarStore());
    return getDepositDialogToggle.value
})

const withdrawDialogToggle = computed(() => {
    const { getWithdrawDialogToggle } = storeToRefs(appBarStore());
    return getWithdrawDialogToggle.value
})

watch(cashToggleSwitch, (newValue) => {
    if (newValue) {
        setWithdrawDialogToggle(true);
        setDepositDialogToggle(false);

        depositCheckboxColor.value = "#7782AA";
        withdrawCheckboxColor.value = "#ffffff";
    } else {
        setWithdrawDialogToggle(false);
        setDepositDialogToggle(true);

        depositCheckboxColor.value = "#ffffff";
        withdrawCheckboxColor.value = "#7782AA";
    }
}, { deep: true });

watch(personalInfoMenuShow, (value) => {
    if (personalInfoItem.value.id != "" && personalInfoItem.value.first_name != "" && personalInfoItem.value.last_name != "") {
        isPersonalBtnReady.value = true;
        confirmValidation.value = true;
    } else {
        isPersonalBtnReady.value = false;
        confirmValidation.value = false;
    }
})

const depositTransform = (el: any) => {
    for (let node of el.children) {
        node.setAttribute('fill', depositCheckboxColor.value)
    }
    return el
}

const withdrawTransform = (el: any) => {
    for (let node of el.children) {
        node.setAttribute('fill', withdrawCheckboxColor.value)
    }
    return el
}


onMounted(() => {
    if (depositDialogToggle.value) {
        cashToggleSwitch.value = false;
    }
    if (withdrawDialogToggle.value) {
        cashToggleSwitch.value = true;
    }
})
</script>
  
<template>
    <div class="mobile-cash-header">
        <div class="m-header d-flex align-center relative">
            <v-menu offset="-5" :close-on-content-click=false content-class="m-personal-info-menu"
                transition="slide-y-transition" v-model:model-value="personalInfoMenuShow">
                <template v-slot:activator="{ props }">
                    <v-btn class="m-deposit-header-btn" v-bind="props" @click="handlePersonalInfoToggle">
                        <div class="m-deposit-header-account-bg relative">
                            <div class="m-deposit-header-account-bg-1">
                                <img src="@/assets/public/svg/icon_public_59.svg" width="16"
                                    class="deposit-header-account-position" />
                            </div>
                        </div>
                        <!-- <v-icon class="header-mdi-icon">mdi-chevron-right</v-icon> -->
                        <img src="@/assets/public/svg/icon_public_11.svg" width="16" class="ml-1"
                            v-if="!personalInfoMenuShow" />
                        <img src="@/assets/public/svg/icon_public_50.svg" width="16" class="ml-1" v-else />
                    </v-btn>
                </template>
                <v-list theme="dark" bg-color="#29253C" class="px-2" :width="mobileWidth > 600 ? 471 : mobileWidth">
                    <v-list-item class="pt-4">
                        <div class="text-center text-400-12 gray">
                            {{ t('deposit_dialog.personal_information.header_text') }}
                        </div>
                    </v-list-item>
                    <div @click="handleConfirmValidation" class="m-personal-information-id-text mx-4">
                        <v-text-field :label="t('deposit_dialog.personal_information.id_text')" style="margin: 0px;"
                            class="form-textfield dark-textfield" variant="solo" density="comfortable"
                            :disabled="confirmValidation" append-icon="mdi" color="#7782AA" v-model="personalInfoItem.id"
                            @input="handlePersonalInfoID" />
                        <img src="@/assets/public/svg/icon_public_19.svg" class="personal-info-key-position"
                            v-if="confirmValidation" />
                    </div>
                    <div class="mx-4 d-flex m-personal-information-id-text" @click="handleConfirmValidation">
                        <v-text-field :label="t('deposit_dialog.personal_information.first_name')"
                            class="form-textfield dark-textfield mx-1" variant="solo" density="comfortable"
                            append-icon="mdi" color="#7782AA" v-model="personalInfoItem.first_name"
                            :disabled="confirmValidation" @input="handlePersonalInfoFirstName"
                            @mousedown="handleConfirmValidation" />
                        <img src="@/assets/public/svg/icon_public_19.svg" class="personal-info-key-position-1"
                            v-if="confirmValidation" />
                        <v-text-field :label="t('deposit_dialog.personal_information.last_name')"
                            class="form-textfield dark-textfield mx-1" variant="solo" density="comfortable"
                            append-icon="mdi" color="#7782AA" v-model="personalInfoItem.last_name"
                            :disabled="confirmValidation" @input="handlePersonalInfoLastName">
                        </v-text-field>
                        <img src="@/assets/public/svg/icon_public_19.svg" class="personal-info-key-position-2"
                            v-if="confirmValidation" />
                    </div>
                    <v-list-item class="text-center">
                        <v-btn class="mx-16 mt-2 mb-6 m-personal-confirm-btn" height="48px" :disabled="!isPersonalBtnReady"
                            :onclick="handlePersonalInfoSubmit">
                            {{ t('deposit_dialog.personal_information.confirm_text') }}
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
            <div class="m-deposit-toggle">
                <input type="checkbox" id="m-deposit-toggle" v-model="cashToggleSwitch" />
                <label for="m-deposit-toggle">
                    <div class="deposit">
                        <inline-svg :src="icon_public_60" width="18" height="18"
                            :transform-source="depositTransform">
                        </inline-svg>
                        <!-- <img src="@/assets/public/svg/icon_public_60.svg" width="18" /> -->
                        <P class="text-700-10 ml-1">{{ t('appBar.deposit') }}</P>
                    </div>
                    <div class="withdraw">
                        <inline-svg :src="icon_public_65" width="18" height="18"
                            :transform-source="withdrawTransform">
                        </inline-svg>
                        <!-- <img src="@/assets/public/svg/icon_public_65.svg" width="18" /> -->
                        <P class="text-700-10 ml-1">{{ t('appBar.withdraw') }}</P>
                    </div>
                </label>
            </div>
            <v-btn class="m-deposit-close-button" icon="true" @click="cashDialogShow" width="30" height="30">
                <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
                <!-- <v-icon color="#7782AA">
                    mdi-close
                </v-icon> -->
            </v-btn>
        </div>
        <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
    </div>
</template>

<style lang="scss">
// header container
.mobile-cash-header {
    background-color: #211F31;

    .m-header {
        text-align: center;
        border-radius: 0px 0px 25px 25px;
        background: #29253C;
        /* Button Shadow */
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        height: 60px;
    }

    .m-deposit-header-btn {
        width: 70px !important;
        height: 60px !important;
        background: #29253C !important;
        box-shadow: none !important;
        border: none !important;
    }

    .header-mdi-icon {
        font-weight: 800;
        font-size: 28px;
        color: #FFFFFF;
    }

    // close modal button
    .m-deposit-close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 15px;
        right: 5px;
    }

    // deposit and withdraw toggle switch
    .m-deposit-toggle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        label {
            width: 196px;
            height: 32px;
            position: relative;
            display: block;
            background: #211F31;
            border-radius: 20px !important;
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

            .deposit {
                left: 14px;
                transition: 0.3s;
                color: black;

                img {
                    width: 20px;
                    height: 24px;
                    margin-right: 4px;
                }
            }

            .withdraw {
                left: 111px;
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
            width: 96px;
            height: 28px;
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
            position: absolute;
        }

        input:checked+label:after {
            left: 193px;
            transform: translateX(-100%);
        }

        label:active:after {
            width: 96px;
        }

        input:checked+label .deposit {
            color: #7782AA
        }

        input:checked+label .withdraw {
            color: black
        }

    }

    .v-list-item__prepend {
        padding-left: 20px;
    }

    .dark-textfield .v-field__field {
        background-color: #1C1929 !important;
    }

    .v-field--variant-solo {
        background: transparent !important;
    }
}


.m-deposit-header-account-bg {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 48px;
    background: #211F31;
}

.m-deposit-header-account-bg-1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 38px;
    background: #29253C;
}

.m-personal-confirm-btn {
    text-align: center;
    width: 150px;
    border-radius: 12px;
    background: #353652;

    /* Button Shadow */
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

    .v-btn__content {
        color: #FFF;
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
}

.m-personal-information-id-text {
    .v-input__append {
        width: 0px !important;
    }
}

.m-personal-info-menu {
    left: unset !important;
    top: 50px !important;
    border-radius: 0px 0px 25px 25px !important;

    .personal-info-key-position {
        position: absolute;
        top: 60px;
        right: 40px;
    }

    .personal-info-key-position-1 {
        position: absolute;
        top: 119px;
        left: 40%;
    }

    .personal-info-key-position-2 {
        position: absolute;
        top: 119px;
        right: 39px;
    }

    .v-input--horizontal .v-input__append {
        margin-inline-start: 0px !important;
    }
}

@media (max-width: 600px) {
    .m-personal-info-menu {
        transform-origin: top !important;

        .v-field__field {

            .v-label.v-field-label {
                font-family: "Inter";
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: #4A4567 !important;
            }

            .v-label.v-field-label--floating {
                --v-field-label-scale: 0.75em;
                font-size: var(--v-field-label-scale);
                max-width: 100%;
                color: #4A4567 !important;
            }

        }
    }
}

@media(max-width: 600px) {

    .el-notification {
        align-items: center !important;
        z-index: 1000000000 !important;
        top: 70px !important;
        right: 0px !important;
        height: 60px;
        border: none;
        border-radius: 16px 0px 0px 16px;
        background: var(--bg-2, #181522);
        box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.40);
    }

    .el-notification__title {
        color: var(--sec-text, #7782AA);
        font-family: Inter;
        font-size: 10px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-align: left;
    }

    .el-notification__closeBtn svg {
        display: none;
    }

    .el-notification__closeBtn {
        top: 22px !important;
        background-image: url('@/assets/public/svg/icon_public_52.svg');
        background-repeat: no-repeat;
        background-size: 18px;
    }

}
</style>