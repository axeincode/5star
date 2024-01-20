// import { Logger } from "./Logger";

/**
 * 事件对象
 */
export interface eventobject {
    call: Function;
    target: any;
}

/**
 * 事件管理类
 */
export class EventManager {

    private static instance: EventManager;

    private baseEventList: { [key: string]: eventobject[] } = {};

    constructor() {

    }

    public static getInstance() {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }

        return EventManager.instance;
    }

    /**
     * 
     * @param eventName 发送事件消息
     * 
     */
    public emit(eventName: string, ...args: any[]) {
        if (this.baseEventList[eventName]) {
            this.baseEventList[eventName].forEach(
                element => element.call.apply(element.target, args)
            );
        }
    }

    /**
     * 添加事件
     * @param eventName 事件名称
     * @param callback  事件回调
     * @param target    捆绑类
     */
    public on(eventName: string, callback: Function, target: any) {
        //添加事件列表
        if (!this.baseEventList[eventName]) this.baseEventList[eventName] = [];
        if (this.baseEventList[eventName].findIndex(element => element.target == target) == -1) {
            let eventObj: eventobject = {
                call: callback,
                target: target
            }
            this.baseEventList[eventName].push(eventObj);
        } else console.warn("Repeated addition of events!");
    }

    /**
     * 清理事件
     * @param eventName 
     * @param callback 
     * @param target 
     */
    public off(eventName: string, target: any) {
        if (!this.baseEventList[eventName]) return console.warn("Event not found!");
        let eventIndex = this.baseEventList[eventName].findIndex(element => element.target == target)
        if (eventIndex != -1) {
            this.baseEventList[eventName].splice(eventIndex, 1);
        } else console.warn("Repeated addition of events!");
    }

    /**
     * 
     * @param remove 需要清理的对象或者事件名称，不传入默认全清（慎用）
     */
    public removeAllEvent(remove?: string | any) {
        //全部清理
        if (remove == null) {
            this.baseEventList = {};
        }
        //指定相关事件名称清理
        else if (typeof remove == "string") {
            // this.baseEventList[remove] = null;
            delete this.baseEventList[remove];
        }
        //清理指定对象依赖
        else if (typeof remove == "object") {
            for (let eventName in this.baseEventList) {
                let eventList = this.baseEventList[eventName];
                let eventIndex = eventList.findIndex(element => element.target == remove)
                if (eventIndex != -1) {
                    eventList.splice(eventIndex, 1);
                }
            }
        }
    }
}