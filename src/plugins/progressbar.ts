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
        let htmlElement: any = document.querySelector('html')
        if (to.name !== 'Sports') {
            // 退出游戏去掉overflow属性
            htmlElement.style.removeProperty('overflow')
            const { closeKill } = gameStore();
            closeKill();
        } else {
            // 进入游戏设置overflow属性
            htmlElement.style.overflow = "visible"
        }
        tryInitProgress();
        return next();
    });
}