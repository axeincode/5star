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

const app = createApp(App)

registerPlugins(app)

app.use(i18n)

app.use(ElementPlus)

app.mount('#app')
