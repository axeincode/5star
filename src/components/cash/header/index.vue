<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { appBarStore } from '@/store/appBar';
import { type GetPersonalInfo } from '@/interface/deposit';
import Notification from "@/components/global/notification/index.vue";
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';
const { name, width } = useDisplay();
const { t } = useI18n();
const { setDepositDialogToggle } = appBarStore();
const { setWithdrawDialogToggle } = appBarStore();
const { setCashDialogToggle } = appBarStore();

const cashToggleSwitch = ref<boolean>(false);

const personalInfoToggle = ref<boolean>(false);

const confirmValidation = ref<boolean>(false);

const notificationShow = ref<boolean>(false);

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
        notificationText.value = t('deposit_dialog.personal_information.confirm_warning_text');
        checkIcon.value = new URL("@/assets/public/svg/icon_public_17.svg", import.meta.url).href;
        notificationShow.value = !notificationShow.value;
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

const depositDialogToggle = computed(() => {
    const { getDepositDialogToggle } = storeToRefs(appBarStore());
    return getDepositDialogToggle.value
})

const withdrawDialogToggle = computed(() => {
    const { getWithdrawDialogToggle } = storeToRefs(appBarStore());
    return getWithdrawDialogToggle.value
})

const cashDialogShow = () => {
    setCashDialogToggle(false);
    setDepositDialogToggle(false);
    setWithdrawDialogToggle(false);
}

const handlePersonalInfoSubmit = (): void => {
    confirmValidation.value = true;
    notificationText.value = t('deposit_dialog.personal_information.confirm_success_text');
    checkIcon.value = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
    notificationShow.value = !notificationShow.value;
}

watch(cashToggleSwitch, (newValue) => {
    if (newValue) {
        setWithdrawDialogToggle(true);
        setDepositDialogToggle(false);
    } else {
        setWithdrawDialogToggle(false);
        setDepositDialogToggle(true);
    }
})

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
    <div class="cash-header">
        <div class="header d-flex align-center relative">
            <v-menu :close-on-content-click=false content-class="personal-menu" transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                    <v-btn class="deposit-header-btn" v-bind="props" @click="handlePersonalInfoToggle">
                        <div class="deposit-header-account-bg ml-4 relative">
                            <div class="deposit-header-account-bg-1">
                                <img src="@/assets/public/svg/icon_public_59.svg" width="24"
                                    class="deposit-header-account-position" />
                            </div>
                        </div>
                        <v-icon class="header-mdi-icon">mdi-chevron-right</v-icon>
                    </v-btn>
                </template>
                <v-list theme="dark" bg-color="#29253C" class="px-2" width="471">
                    <v-list-item class="pt-4">
                        <div class="text-center deposit-text">
                            {{ t('deposit_dialog.personal_information.header_text') }}
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <div @click="handleConfirmValidation">
                            <v-text-field :label="t('deposit_dialog.personal_information.id_text')"
                                class="form-textfield dark-textfield mx-2" variant="solo" density="comfortable"
                                :disabled="confirmValidation" append-icon="mdi" color="#7782AA"
                                v-model="personalInfoItem.id" @input="handlePersonalInfoID" />
                            <img src="@/assets/public/svg/icon_public_19.svg" class="personal-info-key-position"
                                v-if="confirmValidation" />
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <div class="d-flex" @click="handleConfirmValidation">
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
                                :disabled="confirmValidation" @input="handlePersonalInfoLastName" />
                            <img src="@/assets/public/svg/icon_public_19.svg" class="personal-info-key-position-2"
                                v-if="confirmValidation" />
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <v-btn class="mx-16 mt-2 mb-6 button-bright text-none" width="-webkit-fill-available" height="50px"
                            :disabled="!isPersonalBtnReady || confirmValidation" :onclick="handlePersonalInfoSubmit">
                            {{ t('deposit_dialog.personal_information.confirm_text') }}
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
            <div class="deposit-toggle">
                <input type="checkbox" id="deposit-toggle" v-model="cashToggleSwitch" />
                <label for="deposit-toggle">
                    <div class="deposit">
                        <img src="@/assets/public/svg/icon_public_60.svg" />
                        <P>{{ t('appBar.deposit') }}</P>
                    </div>
                    <div class="withdraw">
                        <img src="@/assets/public/svg/icon_public_65.svg" />
                        <P>{{ t('appBar.withdraw') }}</P>
                    </div>
                </label>
            </div>
            <v-btn class="close-button" icon="true" @click="cashDialogShow">
                <v-icon color="#7782AA">
                    mdi-close
                </v-icon>
            </v-btn>
        </div>
        <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" />
    </div>
</template>

<style lang="scss">
// header container
.cash-header {
    background-color: #211F31;
    border-radius: 16px !important;

    .header {
        text-align: center;
        background: #29253C;
        border-radius: 16px 16px 0px 0px;
        height: 80px;
    }

    .deposit-header-btn {
        width: 100px !important;
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
    .close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 5px;
        right: 5px;
    }

    // deposit and withdraw toggle switch
    .deposit-toggle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        label {
            width: 230px;
            height: 40px;
            position: relative;
            display: block;
            background: #211F31;
            border-radius: 20px !important;
            // box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
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
                left: 132px;
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
            left: 3px;
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
            left: 226px;
            transform: translateX(-100%);
        }

        label:active:after {
            width: 100px;
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

.personal-menu {
    .personal-info-key-position {
        position: absolute;
        top: 28px;
        right: 58px;
    }

    .personal-info-key-position-1 {
        position: absolute;
        top: 28px;
        left: 170px;
    }

    .personal-info-key-position-2 {
        position: absolute;
        top: 28px;
        right: 52px;
    }

    .v-input--horizontal .v-input__append {
        margin-inline-start: 0px !important;
    }
}

.deposit-header-account-bg {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 48px;
    background: #211F31;
}

.deposit-header-account-bg-1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 38px;
    height: 38px;
    flex-shrink: 0;
    border-radius: 38px;
    background: #29253C;
}

.deposit-header-account-position {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>