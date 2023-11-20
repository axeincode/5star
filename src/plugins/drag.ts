// import Vue from 'vue'

// interface DefaultPositionType {
//     x?: number
//     y?: number
// }

// type CB = (position: string) => void
// interface Options {
//     autoAdsorbent?: boolean
//     defaultPosition?: DefaultPositionType
//     limit?: number
//     adsorbentCB?: CB
//     unAdsorbentCB?: CB
// }
// const DEFAULT_POSITION = {
//     x: 100,
//     y: 100
// }
// const DEFAULT_WIDTH = 90
// const DEFAULT_HEIGHT = 90
// const DEFAULT_LIMIT = 35
// export default class Drag {
//     // 元素
//     element: HTMLElement
//     // 屏幕尺寸
//     screenWidth: number
//     screenHeight: number
//     // 元素大小
//     elementWidth: number
//     elementHeight: number
//     // 當前元素坐標
//     elementX: number
//     elementY: number
//     // 元素offset
//     elementOffsetX: number
//     elementOffsetY: number
//     // 是否處於拖動狀態
//     moving: boolean
//     // 吸附
//     autoAdsorbent: boolean
//     // 觸發吸附的臨界值
//     limit: number
//     // 吸附回調
//     adsorbentCB?: CB
//     // 吸附位置
//     adsorbentPosition?: string
//     // 是否已經吸附
//     isAdsorbent: boolean
//     // 解除吸附回調
//     unAdsorbentCB?: CB
//     // 區分點擊和移動的計時器
//     timer?: number
//     // 是否可以點擊
//     canClick = true
//     // 避開衝的的兄弟元素
//     broEl?: HTMLElement
//     // 避開重叠的兄弟元素的信息
//     broElInfo?: DOMRect
//     // 形狀
//     shape?: 'rect' | 'circle'
//     constructor(
//         element: HTMLElement,
//         dConfig: Options = {},
//         brotherEl?: HTMLElement
//     ) {
//         this.element = element
//         this.screenWidth = window.innerWidth || window.outerWidth || 0
//         this.screenHeight = window.innerHeight || window.outerHeight || 0
//         this.elementWidth = this.element.offsetWidth || DEFAULT_WIDTH
//         this.elementHeight = this.element.offsetHeight || DEFAULT_HEIGHT
//         this.element.style.position = 'absolute'
//         this.element.style.userSelect = 'none'
//         this.elementX = 0
//         this.elementY = 0
//         this.elementOffsetX = 0
//         this.elementOffsetY = 0
//         this.moving = false
//         this.autoAdsorbent = dConfig.autoAdsorbent ?? false
//         this.limit = dConfig.limit ?? DEFAULT_LIMIT
//         this.adsorbentCB = dConfig.adsorbentCB
//         this.unAdsorbentCB = dConfig.unAdsorbentCB
//         this.isAdsorbent = false
//         // 默認位置
//         this.setElementPosition(
//             dConfig.defaultPosition?.x ?? DEFAULT_POSITION.x,
//             dConfig.defaultPosition?.y ?? DEFAULT_POSITION.y
//         )
//         this.broEl = brotherEl
//         this.shape = 'circle'
//         this.watchDrag()
//         this.watchTouch()
//     }
//     // 更新元素信息
//     private updateElementData(cb?: () => void) {
//         Vue.nextTick(() => {
//             this.elementWidth = this.element.offsetWidth || DEFAULT_WIDTH
//             this.elementHeight = this.element.offsetHeight || DEFAULT_HEIGHT
//             cb?.()
//         })
//     }
//     // 觀測[Mobile]
//     private watchTouch() {
//         const moveFunc = this.move.bind(this)
//         this.element.addEventListener('touchstart', (event) => {
//             const rect = this.element.getBoundingClientRect()
//             if (this.broEl) {
//                 this.broElInfo = this.broEl.getBoundingClientRect()
//             }
//             // 頁面被卷去的高度
//             const docScrollTop = document.documentElement.scrollTop
//             this.elementOffsetX = event.targetTouches?.[0].pageX - rect.left
//             this.elementOffsetY = event.targetTouches?.[0].pageY - rect.top - docScrollTop
//             this.moving = true
//             document.addEventListener('touchmove', moveFunc, {
//                 passive: false
//             })
//         })
//         document.addEventListener('touchend', () => {
//             document.removeEventListener('touchmove', moveFunc)
//             if (this.autoAdsorbent) {
//                 this.adsorbent()
//             }
//         })
//     }
//     // 觀測[PC]
//     private watchDrag(): void {
//         const moveFunc = this.move.bind(this)
//         this.element.addEventListener('mousedown', (event) => {
//             const rect = this.element.getBoundingClientRect()
//             if (this.broEl) {
//                 this.broElInfo = this.broEl.getBoundingClientRect()
//             }
//             // 頁面被卷去的高度
//             const docScrollTop = document.documentElement.scrollTop
//             this.elementOffsetX = event.pageX - rect.left
//             this.elementOffsetY = event.pageY - rect.top - docScrollTop
//             this.moving = true
//             document.addEventListener('mousemove', moveFunc, {
//                 passive: false
//             })
//         })
//         document.addEventListener('moouseup', () => {
//             document.removeEventListener('mousemove', moveFunc)
//             if (this.autoAdsorbent) {
//                 this.adsorbent()
//             }
//         })
//     }
//     // 設置元素位置
//     private setElementPosition(x: number, y: number): void {
//         // 如果有不能重叠的兄弟元素，處理矩形
//         if (this.broElInfo && this.shape === 'rect') {
//             // 兄弟元素位置信息
//             const by = this.broElInfo.top
//             const bx = this.broElInfo.left
//             const bh = this.broElInfo.height
//             const bw = this.broElInfo.width
//             // 在兄弟div左邊，并且橫向有重叠時
//             if (this.elementX < bx && by + bh > this.elementY && this.elementY + this.elementHeight > by) {
//                 const maxX = bx - this.elementWidth
//                 if (x > maxX) {
//                     x = maxX
//                 }
//             } else if (this.elementX > bx && by + bh > this.elementY && this.elementY + this.elementHeight > by) {
//                 // 在兄弟div左邊，并且橫向有重叠時
//                 const minX = by + bh
//                 if (y < minX) {
//                     y = minX
//                 }
//             }
//             if (this.elementY > by && bx + bw > this.elementX && this.elementX + this.elementWidth > bx) {
//                 // 在兄弟div下面，并且竪向有重叠時
//                 const minY = by + bh
//                 if (y < minY) {
//                     y = minY
//                 }
//             } else if (this.elementY < by && bx + bw > this.elementX && this.elementX + this.elementHeight > bx) {
//                 // 在兄弟div上面，并且竪向有重叠時
//                 const maxY = by - this.elementHeight
//                 if (y > maxY) {
//                     y = maxY
//                 }
//             }
//         }
//         // 溢出處理
//         // 溢出範圍
//         // 當頁面超出屏幕範圍，計算當前屏幕範圍
//         // 當前屏幕right最大值
//         const rightScope = this.screenWidth - this.elementWidth
//         const bottomScope = this.screenHeight - this.elementHeight
//         if (x <= 0 && y <= 0) {
//             x = 0
//             y = 0
//         } else if (x >= rightScope && y <= 0) {
//             x = rightScope
//             y = 0
//         } else if (x <= 0 && y >= bottomScope) {
//             x = 0
//             y = bottomScope
//         } else if (x >= rightScope && y >= bottomScope) {
//             x = rightScope
//             y = bottomScope
//         } else if (x > rightScope) {
//             x = rightScope
//         } else if (y > bottomScope) {
//             y = bottomScope
//         } else if (x <= 0) {
//             x = 0
//         } else if (y <= 0) {
//             y = 0
//         }
//         // 處理圓形
//         // 如果有不能重叠的兄弟元素
//         if (this.broElInfo && this.shape === 'circle') {
//             // 兄弟元素位置信息
//             const by = this.broElInfo.top
//             const bx = this.broElInfo.left
//             const bh = this.broElInfo.height
//             const bw = this.broElInfo.width
//             const radius = bw / 2
//             const center = { x: bx + bw - radius, y: by + bh - radius }
//             const selfCenter = {
//                 x: this.elementWidth + x - radius,
//                 y: this.elementHeight + y - radius
//             }
//             const distance = Math.sqrt(
//                 Math.pow(center.x - selfCenter.x, 2) + Math.pow(center.y - selfCenter.y, 2)
//             )
//             if (distance < radius * 2) {
//                 return
//             }
//         }
//         this.elementX = x
//         this.elementY = y
//         this.element.style.top = `${y}px`
//         this.element.style.left = `${x}px`
//     }
//     private move(event: MouseEvent | TouchEvent): void {
//         event.preventDefault()
//         if (!this.moving) {
//             return
//         }
//         const ex = ((event as MouseEvent)?.pageX || (event as TouchEvent).targetTouches?.[0].pageX) - this.elementOffsetX
//         const ey = ((event as MouseEvent)?.pageY || (event as TouchEvent).targetTouches?.[0].pageY) - this.elementOffsetY
//         this.setElementPosition(ex, ey)
//         // 處理吸附
//         this.unAdsorbent()
//         // 處理移動和點擊問題
//         this.canClick = false
//         window.clearTimeout(this.timer)
//         this.timer = window.setTimeout(() => {
//             this.canClick = true
//         }, 300)
//     }
//     // 動畫
//     private animate(targetLeft: number, spd: number): void {
//         const timer = setInterval(() => {
//             let step = (targetLeft - this.elementX) / 10
//             // 對步長進行二次加工（大於0向上取整，小於0向下取整）
//             step = step > 0 ? Math.ceil(step) : Math.floor(step)
//             // 動畫原理：目標位置 = 當前位置 + 步長
//             const x = this.elementX + step
//             this.setElementPosition(x, this.elementY)
//             // 檢測緩動動畫有沒有停止
//             if (Math.abs(targetLeft - this.elementX) <= Math.abs(step)) {
//                 // 處理小數賦值
//                 const xt = targetLeft
//                 this.setElementPosition(xt, this.elementY)
//                 clearInterval(timer)
//             }
//         }, spd)
//     }
//     // 吸附
//     private adsorbent(): void {
//         // 屏幕中心點，判斷吸附方向
//         const screenCenterY = Math.round(this.screenWidth / 2)
//         // left 最大值
//         const rightScope = this.screenWidth - this.elementWidth
//         // 根據中心點來判斷吸附方向
//         if (this.elementX < screenCenterY && this.elementX < this.limit) {
//             this.animate(0, 10)
//             this.adsorbentPosition = 'left'
//             this.adsorbentCB?.call(this, this.adsorbentPosition)
//             this.isAdsorbent = true
//             this.updateElementData()
//         } else if (this.elementX > rightScope - this.limit) {
//             this.adsorbentPosition = 'right'
//             this.adsorbentCB?.call(this, this.adsorbentPosition)
//             this.isAdsorbent = true
//             this.updateElementData(() => {
//                 this.animate(this.screenWidth - this.elementWidth, 10)
//             })
//         }
//     }
//     // 解除吸附
//     private unAdsorbent(): void {
//         if (this.isAdsorbent) {
//             if ((this.adsorbentPosition === 'left' && this.elementX > this.limit) ||
//             (this.adsorbentPosition === 'right') && this.elementX < this.screenWidth - this.elementWidth - this.limit) {
//                 this.unAdsorbentCB?.call(this, this.adsorbentPosition)
//                 this.adsorbentPosition = undefined
//                 this.updateElementData() 
//             }
//         }
//     }
// }