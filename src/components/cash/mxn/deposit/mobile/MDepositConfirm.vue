<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { depositStore } from '@/store/deposit'
import icon_public_104 from '@/assets/public/svg/icon_public_104.svg'
import icon_public_105 from '@/assets/public/svg/icon_public_105.svg'
import icon_public_106 from '@/assets/public/svg/icon_public_106.svg'
import icon_public_107 from '@/assets/public/svg/icon_public_107.svg'
import icon_public_110 from '@/assets/public/svg/icon_public_110.svg'
import icon_public_110_png from '@/assets/public/image/icon_public_110.png'
import icon_public_111 from '@/assets/public/svg/icon_public_111.svg'
import icon_public_112 from '@/assets/public/svg/icon_public_112.svg'
import icon_public_113 from '@/assets/public/svg/icon_public_113.svg'
import { storeToRefs } from 'pinia'
import { activityAppStore } from '@/store/activityApp';
import { useTimer } from 'vue-timer-hook'
import * as clipboard from 'clipboard-polyfill'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue'
import WarningIcon from '@/components/global/notification/WarningIcon.vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})

const emit = defineEmits(['update:modelValue'])

const modelValueNew = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const { t } = useI18n()
const { setDepositConfirmDialogToggle } = depositStore()
const { setTimerValue } = depositStore()

const timer_value = ref<number>(3599)

const mxnPaymentChannel = ref<any>({
  spei: icon_public_106,
  oxxo: icon_public_105,
  codi: icon_public_107,
})

const depositConfirmItem = ref<any>({})

const notificationText = ref<string>('')

const time = new Date()
time.setSeconds(time.getSeconds() + timer_value.value) // 1hour timer

const timer = useTimer(Number(time))

const timerValue = computed(() => {
  const { getTimerValue } = storeToRefs(depositStore())
  return getTimerValue.value
})

const channnelName = computed(() => {
  const { getChannelName } = storeToRefs(depositStore())
  return getChannelName.value
})

// 获取模式
const mobile = computed(() => {
  const { getMobile } = storeToRefs(activityAppStore());
  return getMobile.value;
});

// const depositAmount = computed(() => {
//   const { getDepositAmount } = storeToRefs(depositStore());
//   return getDepositAmount.value;
// });

// const depositSubmit = computed(() => {
//   const { getDepositSubmit } = storeToRefs(depositStore());
//   return getDepositSubmit.value;
// });

const closeDepositConfirmDialog = () => {
  setDepositConfirmDialogToggle(false)
}

const depositInfoCopy = (content: string) => {
  clipboard.writeText(content).then(
    () => {
      console.log('Copied to clipboard!')
      notificationText.value = 'Successful replication'
      const toast = useToast()
      toast.success(notificationText.value, {
        timeout: 5000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: SuccessIcon,
        rtl: false,
      })
    },
    (error) => {
      console.error('Could not copy text: ', error)
    }
  )
}
const isClass = ref('android')
const isAndroidOrIOS = () => {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isAndroid) {
    isClass.value = 'android'

    return isClass
  }
  if (isiOS) {
    isClass.value = 'ios'
    return isClass.value
  }

  return false
}

onMounted(() => {
  isAndroidOrIOS()
  if (timerValue.value == 0) {
    const time = new Date()
    time.setSeconds(time.getSeconds() + timer_value.value) // 1hour timer
    timer.start()
  } else {
    const time = new Date()
    time.setSeconds(time.getSeconds() + timerValue.value)
    timer.restart(Number(time))
  }
  watchEffect(async () => {
    if (timer.isExpired.value) {
      setTimerValue(0)
      setDepositConfirmDialogToggle(false)
    }
  })
  const speiValue = localStorage.getItem('spei')
  if (speiValue !== null) {
    depositConfirmItem.value = JSON.parse(speiValue)
  }
})

onUnmounted(() => {
  // setTimerValue(timer.minutes.value * 60 + timer.seconds.value);
  // console.log(timer.minutes.value, timer.seconds.value);
})
</script>

<template>
  <v-dialog v-model="modelValueNew" class="m-deposit-cofirm-dialog" :width="''" :fullscreen="true" :scrim="false" persistent :transition="'dialog-top-transition'">
    <div class="m-deposit-confirm-dialog" >
      <!-- 关闭 -->
      <div class="m-deposit-confirm-dailog-header">
        <v-btn class="m-close-button" icon="true" width="24" height="24" @click="closeDepositConfirmDialog">
          <img src="@/assets/public/svg/icon_public_52.svg" width="18" />
        </v-btn>
      </div>
      <!-- 内容 -->
      <div class="m-deposit-confirm-dailog-body px-8 py-2" :class="isClass== 'ios'&&mobile?'m-deposit-confirm-dailog-ios-body':''">
        <img :src="mxnPaymentChannel[channnelName]" width="63" />
        <div class="m-order-amount text-center mt-2 pa-2">
          <div class="text-700-14 white">{{ t('deposit_confirm.text_1') }}</div>
          <div class="text-900-28 yellow">$ {{ depositConfirmItem.deposit_amount }}</div>
          <div class="text-700-10 orange">
            {{ t('deposit_confirm.text_2') }}&nbsp; {{ timer.minutes.value.toString().padStart(2, '0') }}:
            {{ timer.seconds.value.toString().padStart(2, '0') }}
          </div>
        </div>
        <div class="text-400-12 gray my-2 mx-4">{{ t('deposit_confirm.text_3') }}</div>
        <div class="m-provider-body py-2 px-4">
          <div class="text-700-12 white">{{ depositConfirmItem.bank_name }}</div>
          <v-btn class="m-copy-button" icon="true" width="24" height="24" @click="depositInfoCopy(depositConfirmItem.bank_name)">
            <img src="@/assets/public/svg/icon_public_71.svg" width="28" />
          </v-btn>
        </div>
        <div class="text-400-12 gray my-2 ml-4 d-flex align-center">
          {{ t('deposit_confirm.text_4') }}
          <div class="text_400-10 green" style="margin-left: auto">{{ t('deposit_confirm.text_5') }}</div>
        </div>
        <div class="m-provider-body py-2 px-4">
          <div class="text-700-12 white">{{ depositConfirmItem.account_number }}</div>
          <v-btn class="m-copy-button" icon="true" width="24" height="24" @click="depositInfoCopy(depositConfirmItem.account_number)">
            <img src="@/assets/public/svg/icon_public_71.svg" width="28" />
          </v-btn>
        </div>
        <div class="text-400-12 gray my-2 mx-4">{{ t('deposit_confirm.text_6') }}</div>
        <div class="m-provider-body py-2 px-4">
          <div class="text-700-12 white">{{ depositConfirmItem.account_name }}</div>
          <v-btn class="m-copy-button" icon="true" width="24" height="24" @click="depositInfoCopy(depositConfirmItem.account_name)">
            <img src="@/assets/public/svg/icon_public_71.svg" width="28" />
          </v-btn>
        </div>
        <div class="text-400-12 blue my-2 d-flex align-center">
          <img :src="icon_public_104" />&nbsp;
          <div style="text-decoration: underline">{{ t('deposit_confirm.text_7') }}</div>
        </div>
        <div class="text-400-14 gray my-2">{{ t('deposit_confirm.text_8') }}</div>
        <div class="text-400-12 gray">{{ t('deposit_confirm.text_9') }}</div>
        <div class="text-400-12 gray">
          {{ t('deposit_confirm.text_10') }}
          <span class="text-700-12 yellow">${{ depositConfirmItem.deposit_amount }}</span>
        </div>
        <div class="text-400-12 gray">{{ t('deposit_confirm.text_11') }}</div>
        <v-btn class="m-transfer-complete mt-4 mb-16" width="-webkit-fill-available" height="48" @click="closeDepositConfirmDialog">{{ t('deposit_confirm.text_12') }}</v-btn>
      </div>
      <!-- 底部 icon显示栏 -->
      <div class="m-deposit-confirm-dailog-footer d-flex align-center px-10">
        <div class="text-400-12 gray">{{ t('deposit_confirm.text_13') }}</div>
        <div class="d-flex align-center" style="margin-left: auto">
          <img :src="icon_public_110_png" class="mr-3" />
          <img :src="icon_public_111" class="mr-3" />
          <img :src="icon_public_112" class="mr-3" />
          <img :src="icon_public_113" />
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
.m-deposit-confirm-dialog {
  background: #1d2027;
  height: 100vh;

  .m-deposit-confirm-dailog-header {
    // position: fixed;
    // top: 0px;
    height: 36px;
    width: 100%;

    .m-close-button {
      box-shadow: none !important;
      background-color: transparent !important;
      position: absolute;
      top: 6px;
      right: 8px;
    }
  }

  .m-deposit-confirm-dailog-body {
    // position: absolute;
    // top: 36px;
    box-sizing: border-box;
    height: calc(100vh - 36px - 32px);
    overflow-y: scroll;
    width: 100%;
    padding-bottom: 52px !important;

    .m-order-amount {
      background: #15161c;
      box-shadow: 0px 0px 6px 1px #00000059 inset;
      border-radius: 8px;
    }

    .m-provider-body {
      display: flex;
      align-items: center;
      background: #15161c;
      box-shadow: 0px 0px 6px 1px #00000059 inset;
      border-radius: 8px;
      height: 40px;

      .m-copy-button {
        margin-left: auto;
        background: #1d2027;
        border-radius: 4px !important;
      }
    }

    .m-transfer-complete {
      background: #009b3a;
      box-shadow: 0px 3px 4px 1px #00000036;
      border-radius: 8px;

      ::v-deep(.v-btn__content) {
        font-family: Inter;
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
      }
    }
  }
  .m-deposit-confirm-dailog-ios-body {
    height: calc(100vh - 36px - 32px - 75px);
  }

  .m-deposit-confirm-dailog-footer {
    // position: fixed;
    // bottom: 0px;
    height: 32px;
    background: #23262f;
    width: 100%;
  }
}
</style>
