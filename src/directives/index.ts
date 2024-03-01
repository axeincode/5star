/**
 * Configure and register global directives
 */
import type { App } from 'vue';
// import { setupPermissionDirective } from './permission';
// import { setupLoadingDirective } from './loading';
// import { setupEllipsisDirective } from './ellipsis';
import { setupLabelResetDirective } from './resetLable';
import { setupWarpLabelDirective } from './warpLable';
// 
export function setupGlobDirectives(app: App) {
    setupLabelResetDirective(app);
    setupWarpLabelDirective(app);
}