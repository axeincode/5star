export interface MESSAGE {
    TIMER: TIMER,
    SYSTEM: SYSTEM,
    VIEW: VIEW,
}

interface TIMER {
    RELINK_WS: string | number
}

interface SYSTEM {
    RESTARTGAME: string | number,
    NETWORK_CLOSE: string | boolean,
    EVENT_HIDE: string | boolean,
    EVENT_SHOW: string | boolean,
    WS_DISCONNECT: string
}

interface VIEW {
    TIPS: string,
    PROMPT_BOX: string,
    WAIT: string
}