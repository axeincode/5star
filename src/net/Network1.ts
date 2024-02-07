import { EventManager } from "./EventManager";
import { EXITTYPE, Netcfg, SENDTYPE } from "./NetCfg";
import './starx-wsclient.js';
import Cookies from "js-cookie";
import CacheKey from "@/constants/cacheKey";
// import { TimerManager } from "../base/TimerManager";
import { socketStore } from "@/store/socket";
import { authStore } from "@/store/auth";
import router from "@/router";

const NETWORK_CODE:number = 200

/**
 * 事件对象
 */
export interface netdata {
    key: string;
    call: Function;
    target: any;
}

/**
 * 事件管理类
 */
export class Network {

    private static instance: Network;

    private netCfg: Netcfg;

    private evenMgr: EventManager;

    private connectCall: Function = ()=>{};   //链接成功

    private wsdisconnect: boolean = false;  //是否断开连接

    private removeTime: number = 10;  //10秒无回包强制关闭加载，让玩家可以重新发包

    private removeWsTime: number = 30;

    private sendCount: { [key: number]: number } = {};



    constructor() {
        this.netCfg = Netcfg.getInstance();
        this.evenMgr = EventManager.getInstance();
        // TODO 監聽主動推送的消息事件
        // this.evenMgr.on(MESSAGE.SYSTEM.RESTARTGAME, this.allClearNetwork, this);
        this.evenMgr.on('onFundMessage', this.onFundMessage, this);
        this.onUnsolicited();
    }

    public static getInstance() {
        if (!Network.instance) {
            Network.instance = new Network();
        }

        return Network.instance;
    }

    /**
     * 发包协议 http
     * @param route     路由    接口路由区分
     * @param msg       包体内容
     * @param next      回调
     * @param version   版本号
     */
    public sendMsg(route: string, msg: any, next?: Function, type: SENDTYPE = SENDTYPE.SOCKET) {
        //构建发包结构
        let msgData = this.msgParsing(route, msg, type);
        switch (type) {
            case SENDTYPE.HTTP:
                this.POST(route, msgData, next);
                break;
            case SENDTYPE.SOCKET:
                this.socketReq(route, msgData, next);
                break;
            default: break
        }
    }

    /**
     * 发送post的
     * @param route 
     * @param msg 
     * @param next 
     * @param timeout 
     */
    private POST(route: string, msg: any, next?: Function, timeout: number = this.netCfg.getTimeout()) {
       
    }

    /**
     * 发送get命令
     * @param route 
     * @param msg 
     */
    private GET(route: string, msg: any) {
    }



    //pomelo发包请求
    public socketReq(route: string, msg: any, callBack?: Function) {
        starx.request(route, msg, (data: Uint8Array) => {
            console.log("ws 回包", route, data);
            if (callBack) callBack(data);
        });
    }

    /**
     * pomelo建立连接，设定回调捆绑
     * @param host 
     * @param port 
     * @param connectcb 
     */
    public connect(connectFuc?: Function) {
        if (connectFuc) this.connectCall = connectFuc;
        // if (this.netCfg.getToken() == "") return;
        if (Cookies.get(CacheKey.TOKEN) == "") return;
        let { host, port, path } = this.netCfg.getWebSocker();
        //广播连接事件
        // let cfg: starxMsg = {
        //     host: host,
        //     port: port,
        //     path: path,
        //     connectcb: this.connectConnector.bind(this),
        // };
        let cfg: starxMsg = {
            host: "wss://pix.kim",
            port: port,
            path: "/user/connect/ws",
            connectcb: this.connectConnector.bind(this),
        };
        //属于异常断线重连，清理loading 清理发包记录
        if (!this.wsdisconnect) {
            console.log('异常断线重连')
            this.sendCount = {};
        }
        this.wsdisconnect = false;
        starx.init(cfg);
    }

    /**
     * pomelo connect 服链接回调
     * @param event_type
     * @param event
     */
    private connectConnector(event_type: string, event: MessageEvent | CloseEvent | Event | any) {
        switch (event_type) {
            case 'connect':
                // TODO 發送第一個包的位置
                // 例子
                // this.sendMsg(NETWORK.HALL.AUTH_VALID, null, (msg: WsProto.IAuthValidResp) => {
                    
                // });
                this.sendMsg('message.user.login', { token: Cookies.get(CacheKey.TOKEN) }, (msg: '发送消息') => {})
                break;
            case 'disconnect':
                let events: CloseEvent = <CloseEvent>event;
                console.warn("重新连接", events);

                // 重新捆绑回调
                // this.connect();
                break;
            case 'onKick':
                console.log("ws 断线通知 onKick：", event);
                if (event.value === 307) {
                    const { dispatchSignout } = authStore();
                    dispatchSignout();
                    router.push({ name: "Dashboard" });
                }
                this.kicked(event);
                break;
        }
    };

    /**
     * 服务端主动断开链接
     * @param event 
     */
    private kicked(event: any) {
        // 处理主动断线
        this.wsdisconnect = true;
        switch (event.Type) {
            default: break;
        }
    };

    /**
     * 解析服务端主动推送的包
     */
    private onUnsolicited() {
        // TODO 主動消息處理的解釋（可以跟服務端協定）
        starx.on("unsolicited", (msgs: any) => {
            console.log('推送信息', msgs)
            let route = msgs.route;
            this.evenMgr.emit(route, msgs);
        })
    }


    /**
     * 断开链接
     */
    public disconnect() {
        this.sendCount = {};
        starx.disconnect();
    }




    /**
     * 获取pomelo的状态
     * @returns 
     */
    public getState() {
        return starx.getState();
    }

    /**
     * 清理所有发包协议
     * 
     */
    public destroy() {
        this.sendCount = {};
        starx.clearListener();
    }


    /**
     * 数据解析
     * @param msg 
     * @param type 
     * @param version 
     */
    private msgParsing(route: string, msg: any, type: SENDTYPE) {
        // TODO 根據情況重構
        msg = msg || {};
        switch (type) {
            case SENDTYPE.HTTP:
                break;
            case SENDTYPE.SOCKET:
                console.log("发包", route, msg);

                break;
            default: break;
        }
        return msg;
    }

    public onFundMessage(msg: any) {
        const { setSocketBalance } = socketStore();
        setSocketBalance(msg.body);
    }

    public allClearNetwork() {
        starx.clearListener();
        this.disconnect();
    }
}