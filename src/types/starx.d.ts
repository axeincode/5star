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

declare class starx {
    constructor(parameters) { }

    declare static init(params: pomeloMsg): viod;
    declare static clearListener(): viod;
    declare static disconnect(): viod;
    declare static request(route: string, msg: any, callback?: Function): viod;
    declare static notify(route: string, msg: any): viod;
    declare static getState(): boolean;
    declare static on(key: string, call: Function);
}