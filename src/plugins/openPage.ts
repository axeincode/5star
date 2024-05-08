
import AdjustClass from '@/utils/adjust';

export const useOpenUrl = () => {
    const appInstance = AdjustClass.getInstance()
    const isApp = appInstance.isMobileWebview
    const openUrl = (url: string, blank: boolean = false) => {
        console.log(url, isApp, 'useOpenUrl');

        if (!url) return;
        if (!isApp) {
            // 浏览器端打开页面
            if (blank) {
                window.open(url, '_blank');
            } else {
                window.location.href = url
            }
        } else {
            // app端打开页面
            androidOpenUrl(url)
        }
    }
    const androidOpenUrl = (url) => {
        if (url) {
            window["AndroidWebView"].openUrl(url)
        }
    }

    return {
        appInstance,
        isApp,
        openUrl,
        androidOpenUrl,
    }
}