//import { ChannelCfg } from "../config/ChannelCfg";


/**
 * 发包类型枚举
 */
export enum SENDTYPE {
    NONE,
    HTTP,
    SOCKET,
    UNSOLICITED,        //主动回包
}

//退出类型 1-踢下线， 2-用户禁用, 3-平台维护, 4-同账号重复登陆
export enum EXITTYPE {
    NONE,
    USER_EXIT,
    TOKEN_ERROR,
    MAINTAIN,
    ACC_REPEAT,
}


//TOKEN错误码
export const NETWORK_TOKEN: number = 100011;

/**
 * 网络配置类
 */
export class Netcfg {
    private static instance: Netcfg;

    private token: string = "";

    private webhost: string = "";

    private websocker_ip: string = "";

    private websocker_port: number = 0;

    private websocker_path: string = "";

    private timeout: number = 10000;	//正常发包延迟10000毫秒

    private neglect: number[] = [
        180014         //恢复房间
    ];

    private TempRouteNoLog = [
        "ABManager.onBetSerPush",
        "DTManager.onBetSerPush",
        "DTCManager.onBetSerPush"
    ];

    constructor() {
        this.resetData();
    }

    public static getInstance(): Netcfg {
        if (!Netcfg.instance) {
            Netcfg.instance = new Netcfg();
        }

        return Netcfg.instance;
    }

    /**
     * 重置数据
     */
    public resetData() {

        // TODO 需要引入配置文件
        this.token = "";

        this.webhost = "";

        this.websocker_ip = "";

        this.websocker_port = 0;

        this.websocker_path = "";
    }

    /**
     * 设值token
     * @param token 
     */
    public setToken(token: string): void {
        this.token = token;
    }

    /** 获取当前token */
    public getToken(): string {
        return this.token;
    }


    /**
     * 设值http发包地址
     * @param ip 
     * @param host 
     * @param path
     */
    public setWebHost(ip: string, host?: number, path?: string): void {
        this.webhost = ip;
        if (host != null) this.webhost = `${this.webhost}:${host}`;
        if (path != null && path != "") this.webhost = `${this.webhost}${path}`;
    }

    /**
     * 返回发包地址
     * @returns this.webhost 返回当前地址
     */
    public getWebHost(): string {
        return this.webhost;
    }

    /**
     * 设值websocker发包地址
     * @param host
     * @param port 
     * @param path
     */
    public setWebSocker(host: string, port?: number, path?: string): void {
        this.websocker_ip = host;
        if (port) this.websocker_port = port;
        if (path) this.websocker_path = path;
    }

    /**
     * 返回发包地址
     * @returns this.websocker 返回当前地址
     */
    public getWebSocker() {
        return { host: this.websocker_ip, port: this.websocker_port, path: this.websocker_path };
    }

    public getTimeout(): number {
        return this.timeout;
    }

    /**
     * 部分协议临时去除日志
     * @returns 
     */
    public getTempNoLog() {
        return this.TempRouteNoLog;
    }

    /**
     * 检查可忽略的错误码
     * @param code 
     * @returns 
     */
    public checkNeglectCode(code: number) {
        return this.neglect.findIndex((num) => num == code) != -1;
    }
}