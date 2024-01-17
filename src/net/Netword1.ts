import { EventManager } from "../interface/net/EventManager";
import { Logger } from "../interface/net/Logger";
import { MESSAGE } from "../interface/net/EventCfg";
import { EXITTYPE, Netcfg, SENDTYPE } from "./Netcfg";
import { ProtoCfg } from "./ProtoCfg";
import { WsProto } from "./protobuf/wsp";
import { NETWORK } from "../config/NetworkCfg";
import { BoxData, TipsData, WaitData, WAITTYPE } from "../base/CommonManager";
import { TIPS } from "../config/TipsCfg";
import { TimerManager } from "../base/TimerManager";

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

    private connectCall: Function = null;   //链接成功

    private wsdisconnect: boolean = false;  //是否断开连接

    private removeTime: number = 10;  //10秒无回包强制关闭加载，让玩家可以重新发包

    private removeWsTime: number = 30;

    private sendCount: { [key: number]: number } = {};


    private noWaitView: string[] = [
        NETWORK.LOGIN.ENTER,
        NETWORK.LOGIN.REGISTER,

        NETWORK.HALL.AUTH_VALID,
        NETWORK.HALL.JOIN_HALL
    ];

    constructor() {
        this.netCfg = Netcfg.getInstance();
        this.evenMgr = EventManager.getInstance();
        this.evenMgr.on(MESSAGE.TIMER.RELINK_WS, this.refreshTimer, this);
        this.evenMgr.on(MESSAGE.SYSTEM.RESTARTGAME, this.allClearNetwork, this);
        this.evenMgr.on(MESSAGE.SYSTEM.NETWORK_CLOSE, this.netWorkClose, this);
        this.evenMgr.on(MESSAGE.SYSTEM.EVENT_HIDE, this.hideDisconnect, this);
        this.evenMgr.on(MESSAGE.SYSTEM.EVENT_SHOW, this.showConnect, this);
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
    public sendMsg(route: string, msg: any, next: Function, type: SENDTYPE = SENDTYPE.SOCKET) {
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
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                let respone: Uint8Array = new Uint8Array(xhr.response);
                Network.getInstance().wait(route, false, SENDTYPE.HTTP);
                let resData = ProtoCfg.HTTP[route].receiver.decode(respone);
                if (resData.respCode.code != gl.NETWORK_CODE
                    && resData.respCode.msg != ""
                    && !Netcfg.getInstance().checkNeglectCode(resData.respCode.code)) {
                    EventManager.getInstance().emit(MESSAGE.VIEW.TIPS, <TipsData>{ content: resData.respCode.msg });
                }
                Logger.log("post 回包", route, resData);
                if (next) next(resData);
            } else if (xhr.readyState === 4) {
                Network.getInstance().wait(route, false, SENDTYPE.HTTP);
                EventManager.getInstance().emit(MESSAGE.VIEW.PROMPT_BOX, <BoxData>{
                    content: TIPS.COMMON.NETWORK_ERROR,
                    confirmCall: () => {
                        Network.getInstance().sendMsg(route, msg, next, SENDTYPE.HTTP);
                    },
                    closeCall: () => {
                        gl.restartLoin();
                    }
                })
            }
        };
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = timeout;
        xhr.onerror = (error) => {
            Network.getInstance().wait(route, false, SENDTYPE.HTTP);
            EventManager.getInstance().emit(MESSAGE.VIEW.PROMPT_BOX, <BoxData>{
                content: TIPS.COMMON.NETWORK_ERROR,
                blConfirm: false,
                closeCall: () => {
                    gl.restartLoin();
                }
            })
            Logger.log("error http.POST ...");
        }
        xhr.open("POST", this.netCfg.getWebHost() + route, true);
        xhr.responseType = "arraybuffer";
        //xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.setRequestHeader("Content-Type", "application/protobuf;charset=utf-8");
        xhr.setRequestHeader("X-Version", gl.VERSION);
        xhr.setRequestHeader('X-Device-Type', gl.GetPhoneType())
        xhr.setRequestHeader('X-Imei', gl.platform.getMachineCode());

        Logger.log("http.POST 发送数据", this.netCfg.getWebHost(), route)
        this.wait(route, true, SENDTYPE.HTTP);

        xhr.send(msg);
    }

    /**
     * 发送get命令
     * @param route 
     * @param msg 
     */
    private GET(route: string, msg: any) {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                Logger.log("Status: Got GET response! " + xhr.statusText);
            } else {
                Logger.log("Status: fail GET response! " + xhr.statusText);
            }
        };
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;
        xhr.onerror = (error) => {
            Logger.log("http get")
        }
        xhr.open("POST", this.netCfg.getWebHost(), msg);
        xhr.send();
        Logger.log("发送=", route, msg)
    }



    //pomelo发包请求
    public socketReq(route: string, msg: any, callBack?: Function) {
        this.wait(route, true);
        starx.request(route, msg, (data: Uint8Array) => {
            this.wait(route, false);
            if (!ProtoCfg.WS[route] || !ProtoCfg.WS[route].receiver) Logger.error(`${route} receiver null`);
            let resData = ProtoCfg.WS[route].receiver.decode(data);
            Logger.log("ws 回包", route, resData);
            if (resData.respCode.code != gl.NETWORK_CODE
                && resData.respCode.msg != ""
                && !this.netCfg.checkNeglectCode(resData.respCode.code)) {
                this.evenMgr.emit(MESSAGE.VIEW.TIPS, <TipsData>{ content: resData.respCode.msg });
            }
            if (resData.respCode.newToken != null && resData.respCode.newToken != "") Netcfg.getInstance().setToken(resData.respCode.newToken);
            if (callBack) callBack(resData);
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
        if (this.netCfg.getToken() == "") return;
        let { host, port, path } = this.netCfg.getWebSocker();
        //广播连接事件
        let cfg: starxMsg = {
            host: host,
            port: port,
            path: path,
            connectcb: this.connectConnector.bind(this),
        };
        //属于异常断线重连，清理loading 清理发包记录
        if (!this.wsdisconnect) {
            this.sendCount = {};
            this.evenMgr.emit(MESSAGE.VIEW.WAIT, <WaitData>{ blOpen: false, time: this.removeTime });
        }
        this.wsdisconnect = false;
        starx.init(cfg);
        this.evenMgr.emit(MESSAGE.VIEW.WAIT, <WaitData>{ blOpen: true, type: WAITTYPE.LOGIN });
    }

    /**
     * pomelo connect 服链接回调
     * @param event_type
     * @param event
     */
    private connectConnector(event_type: string, event: MessageEvent | CloseEvent | Event | any) {
        switch (event_type) {
            case 'connect':
                this.evenMgr.emit(MESSAGE.VIEW.WAIT, <WaitData>{ blOpen: false, type: WAITTYPE.LOGIN });
                if (TimerManager.getInstance().getTimerDelay(MESSAGE.TIMER.RELINK_WS) != null) {
                    TimerManager.getInstance().popTimer(MESSAGE.TIMER.RELINK_WS);
                }
                this.sendMsg(NETWORK.HALL.AUTH_VALID, null, (msg: WsProto.IAuthValidResp) => {
                    if (msg.respCode.code == gl.NETWORK_CODE) {
                        if (this.connectCall) this.connectCall();
                    } else {
                        this.allClearNetwork();
                        gl.restartLoin();
                    }
                });
                break;
            case 'disconnect':
                this.evenMgr.emit(MESSAGE.SYSTEM.WS_DISCONNECT);

                if (this.wsdisconnect) return;

                if (TimerManager.getInstance().getTimerDelay(MESSAGE.TIMER.RELINK_WS) == null) {
                    TimerManager.getInstance().addTimer(MESSAGE.TIMER.RELINK_WS, this.removeWsTime);
                }

                let events: CloseEvent = <CloseEvent>event;
                Logger.warn("重新连接", events);

                // 重新捆绑回调
                this.connect();
                break;
            case 'onKick':
                let msg: WsProto.IKickMass = WsProto.KickMass.decode(event);
                Logger.log("ws 断线通知 onKick：", msg);
                this.kicked(msg);
                break;
        }
    };

    /**
     * 服务端主动断开链接
     * @param event 
     */
    private kicked(event: WsProto.IKickMass) {
        // 处理主动断线
        this.wsdisconnect = true;
        switch (event.Type) {
            case EXITTYPE.USER_EXIT:
                this.allClearNetwork();
                this.evenMgr.emit(MESSAGE.VIEW.PROMPT_BOX, <BoxData>{ content: TIPS.COMMON.SYSTEM_ERROR, confirmCall: gl.restartLoin, closeCall: gl.restartLoin })
                break;
            case EXITTYPE.TOKEN_ERROR:
                this.allClearNetwork();
                this.evenMgr.emit(MESSAGE.VIEW.PROMPT_BOX, <BoxData>{ content: TIPS.COMMON.SYSTEM_ERROR, confirmCall: gl.restartLoin, closeCall: gl.restartLoin })
                break;
            case EXITTYPE.MAINTAIN:
                this.allClearNetwork();
                this.evenMgr.emit(MESSAGE.VIEW.PROMPT_BOX, <BoxData>{ content: TIPS.COMMON.MAINTAIN_ERROR, confirmCall: gl.restartLoin, closeCall: gl.restartLoin })
                break;
            case EXITTYPE.ACC_REPEAT:
                this.allClearNetwork();
                this.evenMgr.emit(MESSAGE.VIEW.PROMPT_BOX, <BoxData>{ content: TIPS.COMMON.ACC_ERROR, confirmCall: gl.restartLoin, closeCall: gl.restartLoin })
                break;
            default: break;
        }
    };

    /**
     * 解析服务端主动推送的包
     */
    private onUnsolicited() {
        starx.on("unsolicited", (msgs: any) => {
            let route = msgs.route;
            if (!ProtoCfg.reWs[route] || !ProtoCfg.reWs[route].receiver) Logger.error(`${route} receiver null !`);
            let msg = ProtoCfg.reWs[route].receiver.decode(msgs.body);
            if (this.netCfg.getTempNoLog().findIndex((name: string) => name == route) == -1) {
                Logger.log("ws 主动推送：", route, msg);
            }
            this.evenMgr.emit(route, msg);
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
     * 切换后台调用断开链接
     */
    public hideDisconnect() {
        this.wsdisconnect = true;
        this.disconnect();
    }

    /**
     * 切换前后台主动触发可重连机制(web后台会相应逻辑，真机会停止所用应用的逻辑)
     */
    private showConnect() {
        this.wsdisconnect = false;
        if (!cc.sys.isNative) this.connect();
        else if (cc.sys.os != cc.sys.OS_ANDROID && cc.sys.isNative) this.connect();
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
     * 刷新时间
     */
    private refreshTimer(dt: number) {
        if (dt == 0) {
            this.wsdisconnect = true;
            this.evenMgr.emit(MESSAGE.VIEW.PROMPT_BOX, <BoxData>{
                content: TIPS.COMMON.NETWORK_ERROR,
                confirmCall: () => {
                    this.connect();
                },
                closeCall: () => {
                    gl.restartLoin();
                }
            })
        }
    }

    /**
     * 数据解析
     * @param msg 
     * @param type 
     * @param version 
     */
    private msgParsing(route: string, msg: any, type: SENDTYPE) {
        let buffer = null;
        msg = msg || {};
        switch (type) {
            case SENDTYPE.HTTP:
                let httpreq = ProtoCfg.HTTP[route].send.create(msg);
                buffer = ProtoCfg.HTTP[route].send.encode(httpreq).finish();
                break;
            case SENDTYPE.SOCKET:
                msg.header = <WsProto.IHeader>{
                    token: this.netCfg.getToken(),
                    version: gl.VERSION,
                    deviceType: gl.GetPhoneType(),
                    imei: gl.platform.getMachineCode()
                };
                Logger.log("发包", route, msg);

                let wsreq = ProtoCfg.WS[route].send.create(msg);
                buffer = ProtoCfg.WS[route].send.encode(wsreq).finish();
                break;
            default: break;
        }
        return buffer;
    }

    /**
     * 处理网络延迟
     * @param route 
     * @param blOpen 
     * @param type 
     * @returns 
     */
    public wait(route: string, blOpen: boolean, type: SENDTYPE = SENDTYPE.SOCKET) {
        if (this.noWaitView.findIndex((name: string) => name == route) != -1) return;
        if (this.sendCount[type] == null) this.sendCount[type] = 0;
        blOpen ? this.sendCount[type]++ : this.sendCount[type]--;
        if ((this.sendCount[type] == 0 && !blOpen)
            || (this.sendCount[type] == 1 && blOpen)) {
            this.evenMgr.emit(MESSAGE.VIEW.WAIT, <WaitData>{ blOpen: blOpen, time: this.removeTime });
        }
    }

    /**
     * 清理网络延迟
     */
    private netWorkClose() {
        this.sendCount = {};
    }

    public allClearNetwork() {
        starx.clearListener();
        this.disconnect();
    }
}