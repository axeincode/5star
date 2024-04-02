//pomelo 全局化管理
declare interface starxMsg {
    host: string;
    port?: number;
    path?: string;
    connectcb?: Function;
    encrypt?: Function;
    encode?: Function;
    decode?: Function;
    user?: any;
    handshakeCallback?: Function;
    maxReconnectAttempts?: number;
    reconnect?: boolean;
}

type pomeloMsg = any;

declare class starx {
    constructor(parameters: any)
    static init(params: pomeloMsg): void;
    static clearListener(): void;
    static disconnect(): void;
    static request(route: string, msg: any, callback?: Function): void;
    static notify(route: string, msg: any): void;
    static getState(): boolean;
    static on(key: string, call: Function): any;
}

interface Window {
    fbAsyncInit?: () => void;
}