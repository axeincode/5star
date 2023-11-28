type Item<T> = {
    pause: boolean
    id: number
    handle: () => void
    options: PollingOptions<T>
}

export type PollingOptions<T> = {
    key: T  // pools中的key
    interval: number  // 轮询时间间隔
    callback: () => unknown  // 轮询操作逻辑主体
    leading?: boolean  // 默认为false, 代表首次是否执行callback
    beforeCreateHooks?: () => Promise<unknown>  // 返回Promise, 控制定时器是否被创建，例如有异步场景需要此Promise resolve后才能成功开始轮询
}

export default class PollingManager<T extends string = string> {
    private pools: Record<T, Item<T>> = {} as Record<T, Item<T>>  // 轮询定时器id存储
    private manualkey: Array<T> = []  // 需要手动操作的定时器id
    /**
     * 用于批量操作
     * @param action 
     * @param targetList 
     */
    public batch(
        action: 'pause' | 'recover' | 'destroy' | 'run',
        targetList: Array<T> = Object.keys(this.pools) as Array<T>
    ) {
        const callback = this[action].bind(this)
        targetList.forEach(callback)
    }
    /**
     * 创建轮询
     * @param options 
     */
    public async create(options: PollingOptions<T>) {
        const { key, callback, leading, beforeCreateHooks } = Object.assign(
            {
                leading: false,
                beforeCreateHooks: () => Promise.resolve()
            },
            options
        )
        leading && callback && callback()
        beforeCreateHooks && (await beforeCreateHooks())
        this.destroy(key)
        const handle = () => {
            if (this.pools?.[key]?.pause) return
            callback && callback()
        }
        this.pools[key] = {
            pause: false,
            id: window.setInterval(handle, options.interval),
            handle,
            options
        }
    }
    /**
     * 用于暂停轮询
     * @param key 
     * @returns 
     */
    public pause(key?: T) {
        if (typeof key === 'undefined') {
            return this.batch('pause')
        }
        if (this.pools[key]) {
            this.pools[key].pause = true
        }
    }
    /**
     * 用于暂停轮询（必须手动）
     * @param key 
     */
    public pauseInManual(key?: T) {
        if (typeof key !== 'undefined' && !this.manualkey.includes(key)) {
            this.manualkey.push(key)
        }
        this.pause(key)
    }
    /**
     * 用于恢复轮询
     * @param key 
     * @returns 
     */
    public recover(key?: T) {
        if (typeof key === 'undefined') {
            return this.batch('recover')
        }
        if (this.pools[key] && !this.manualkey.includes(key)) {
            this.pools[key].pause = false
            this.run(key)
        }
    }
    /**
     * 用于恢复轮询
     * @param key 
     * @returns 
     */
    public recoverInManual(key?: T) {
        if (typeof key === 'undefined') {
            return
        }
        const index = this.manualkey.indexOf(key)
        if (index !== -1) {
            this.manualkey.splice(index, 1)
            this.recover(key)
        }
    }
    /**
     * 用于外部主动触发
     * @param key 
     * @returns 
     */
    public run(key?: T) {
        if (typeof key === 'undefined') {
            return this.batch('run')
        }
        if (this.pools[key]) {
            this.pools[key].handle()
        }
    }
    /**
     * 用于外部主动销毁
     * @param key 
     * @returns 
     */
    public destroy(key?: T) {
        if (typeof key === 'undefined') {
            return this.batch('destroy')
        }
        if (this.pools[key]) {
            clearInterval(this.pools[key].id)
            delete this.pools[key]
        }
    }
    /**
     * 更新轮询配置参数
     * @param key 
     * @param options 
     * @returns 
     */
    public update(key: T, options: PollingOptions<T>) {
        if (typeof key === 'undefined' && typeof options === 'undefined') {
            return
        }
        const opt = { ...this.pools[key].options, ...options }
        this.destroy(key)
        this.create(opt)
    }
}