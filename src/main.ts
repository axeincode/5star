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

import VueLazyload from 'vue-lazyload'

import loadingIcon from "@/assets/loading.svg";

import "vue-progressive-image/dist/style.css";

const app = createApp(App)

registerPlugins(app)

app.use(i18n)

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

app.use(ElementPlus)

app.mount('#app')
