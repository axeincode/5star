import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { gameStore } from "@/store/game";
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏

/**
 * Initializes NProgress after a specified delay only if the route was not resolved yet.
 */

export function cancelTopProgress() {
    NProgress.done();
}

function tryInitProgress() {
    NProgress.start();
}

export default function initProgress(router: {
    afterEach: (arg0: () => void) => void; beforeEach: (arg0: (to: any, from: any, next: any) => any) => void;
}) {
    router.afterEach(cancelTopProgress);
    router.beforeEach((to, from, next) => {
        if (to.name !== 'Sports') {
            const { closeKill } = gameStore();
            closeKill();
        }
        tryInitProgress();
        return next();
    });
}