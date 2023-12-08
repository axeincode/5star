/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'

import initProgress from './progressbar';

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts();
  initProgress(router);
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
