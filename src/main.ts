/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp, ComponentPublicInstance } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// I18n Plugin
import { i18n } from '@/locale/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';

import InlineSvg from 'vue-inline-svg';

import Vue3Lazyload from 'vue3-lazyload'

import loadingIcon from "@/assets/loading.svg";

import "vue-progressive-image/dist/style.css";

import Toast, { POSITION, PluginOptions } from "vue-toastification";

import "vue-toastification/dist/index.css";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { setupGlobDirectives } from '@/directives';

import "@/permission";

// Import the English locale (or any other locale you want to customize)
import 'dayjs/locale/en';

// vue3 google login
import Vue3GoogleLogin from 'vue3-google-login';

import Adjust from '@adjustcom/adjust-web-sdk';

import { getErrorInfoCollector } from '@/utils/errorInfoCollector'

Adjust.initSdk({
  appToken: 'gmx6cdn8x3pc',
  environment: 'sandbox', // or 'production'
});

// Declare the FB object
declare global {
  interface Window {
    FB: any; // Adjust this type according to the actual type of FB object
  }
}

const app = createApp(App)

registerPlugins(app)

app.use(i18n)

app.use(Vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});

// window.FB.init({
//   appId: import.meta.env.VITE_FACEBOOK_APP_ID,
//   cookie: true,
//   xfbml: true,
//   version: 'v8.0'
// });

dayjs.locale('en', {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  }
});

// dayjs.extend(customParseFormat); // Enable custom date format parsing

app.use(Vue3Lazyload, {
  loading: loadingIcon,
  error: '',
  lifecycle: {
    loading: (el) => {
      // console.log('loading', el)
    },
    error: (el) => {
      // console.log('error', el)
    },
    loaded: (el) => {
      // console.log('loaded', el)
    }
  },
  delay: 500
});

// app.use(VueLazyload);

app.component('inline-svg', InlineSvg);

app.use(ElementPlus);

// 注册全局指令
setupGlobDirectives(app);

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  toastClassName: "m-custom-toast-class",
  rtl: false,
};

app.use(Toast, options);

// 设置全局错误处理程序
app.config.errorHandler = (err: unknown, vm: ComponentPublicInstance | null, info: string) => {
  // 将错误转换为 Error 类型
  const error = err as Error;

  // 发送错误信息到服务器
  sendErrorToServer(error, vm, info);
};

// 发送错误信息到服务器
function sendErrorToServer(error: Error, vm: any, info: string) {
  // 构造要发送的错误数据
  const errorData = {
    error: error.toString(),
    component: vm.$.type.name || 'Anonymous',
    info: info
  };

  getErrorInfoCollector(error.toString())
}

app.mount('#app')
