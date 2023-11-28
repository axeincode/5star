const keyWithPrefix = (prefix: string, key: string) => {
    if (prefix !== '') {
        // 首字母大写
        return prefix + key.slice(0, 1).toUpperCase() + key.slice(1)
    }
    return key
}

class PageVisibility {
    private __hidden = ''
    private __state = ''
    private __prefixSupport = ''
    private __kernel = ['', 'webkit', 'moz', 'ms', 'o']
    __bindFn = () => {}
    supportHidden = false  // 是否支持document.hidden
    supportState = false  // 是否支持document.visibilityState

    constructor() {
        this.supportHidden = this.__isPageHiddenSupport()
        this.supportState = this.__isPageVisibilitySupport()
    }

    /**
     * 当前浏览器是否支持hidden
     * @returns 
     */
    private __isPageHiddenSupport() {
        let support = false
        if (typeof window?.screenX !== 'number') {
            return support
        }
        this.__kernel.forEach((item) => {
            const s = keyWithPrefix(item, 'hidden')
            if (!support && s in document) {
                this.__hidden = s
                this.__prefixSupport = item
                support = true
            }
        })
        return support
    }

    /**
     * 当前浏览器是否支持visibilityState
     * @returns 
     */
    private __isPageVisibilitySupport() {
        let support = false
        if (typeof window?.screenX !== 'number') {
            return support
        }
        this.__kernel.forEach((item) => {
            const s = keyWithPrefix(item, 'visibilityState')
            if (!support && s in document) {
                this.__state = keyWithPrefix(item, 'visibilityState')
                support = true
            }
        })
        return support
    }

    /**
     * 监听页面的可见性变化
     * @param fn 
     * @param usecapture 
     * @returns 
     */
    visibilityChange(fn: (visibility: boolean) => void, usecapture = false) {
        if ((this.supportHidden || this.supportState) && typeof fn === 'function') {
            this.__bindFn = () => {
                fn.call(null, this.isShow)
            }
            // 先注销上一个事件，然后再注册下一个事件
            this.destory()
            return document.addEventListener(
                this.__prefixSupport + 'visibilitychange',
                this.__bindFn,
                usecapture
            )
        }
    }

    /**
     * 多次执行时，先去掉之前的事件，防止附加多个change事件
     */
    destory() {
        document.removeEventListener(
            this.__prefixSupport + 'visibilitychange',
            this.__bindFn
        )
    }

    // 获取当前页面的可见性
    get isShow(): boolean {
        if (this.supportState) {
            return (document as any)[this.__state] === 'visible'
        }
        if (this.supportHidden) {
            return !(document as any)[this.__hidden]
        }
        // 若不支持，则默认页面一直可见
        return true
    }
}