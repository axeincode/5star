/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

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

// Import the English locale (or any other locale you want to customize)
import 'dayjs/locale/en';

const app = createApp(App)

registerPlugins(app)

app.use(i18n)

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

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
  closeOnClick: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  rtl: false,
};

app.use(Toast, options);

app.mount('#app')
