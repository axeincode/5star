import { EXITTYPE, NetworkData, SENDTYPE } from './NetworkData'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { get } from "lodash-es"
import { createWebSocket } from '@/plugins/socket'

/**
 * Event Object
 */
export interface netdata {
  key: string
  call: Function
  target: any
}
/**
 * Communication Management Class
 */
export class Network {
  private static instance: Network

  private netCfg: NetworkData

  private connectCall: Function = () => { } //Link successful

  private wsdisconnect: boolean = false //Whether to disconnect or not

  private removeTime: number = 10 //10 seconds without packet return force off loading so players can resend packets

  private removeWsTime: number = 30

  private sendCount: { [key: number]: number } = {}

  private socket: any = null;

  private service: any

  private request: any

  private noWaitView: string[] = []

  constructor() {
    this.netCfg = NetworkData.getInstance()
    this.service = this.createService()
    this.onUnsolicited()
  }

  public static getInstance() {
    if (!Network.instance) {
      Network.instance = new Network()
    }

    return Network.instance
  }

  /**
   * Offer Agreement
   * @param route     Routing Interface routing distinction
   * @param msg       Package contents
   * @param next      Callback
   * @param type      send type
   */
  public async sendMsg(route: string, msg: any, next: Function, type: SENDTYPE = SENDTYPE.SOCKET, requestType: SENDTYPE = SENDTYPE.POST) {
    // Build a contract structure
    let msgData = this.msgParsing(route, msg, type)
    switch (type) {
      case SENDTYPE.HTTP:
        switch (requestType) {
          case SENDTYPE.GET:
            await this.GET(route, msgData, next);
            break;
          case SENDTYPE.POST:
            await this.POST(route, msgData, next)
            break
        }
      case SENDTYPE.SOCKET:
        this.socketReq(route, msgData, next)
        break
      default:
        break
    }
  }

  /**
   * Send post
   * @param route
   * @param msg
   * @param next
   * @param timeout
   */
  private async POST(route: string, data: any, next: Function) {
    this.request = this.createRequestFunction(this.service)
    await this.request({
      url: route,
      method: 'POST',
      data
    }).then((response: any) => {
      next(response);
    })
  }

  /**
   * Send get
   * @param route
   * @param msg
   */
  private GET(route: string, data: any, next: Function) {
    this.request = this.createRequestFunction(this.service)
    return this.request({
      url: route,
      method: 'GET',
      params: data
    }).then((response: any) => {
      next(response);
    })
  }

  //send websocket
  public socketReq(route: string, msg: any, callBack?: Function) {
    // this.socket.emit(route, msg)
  }

  /**
   * websocket init
   * @param host
   * @param port
   * @param connectcb
   */
  public connect(route: string) {
    this.socket = createWebSocket(route);
    this.socket.onopen = this.handleOpen;
    this.socket.onmessage = this.handleMessage;
    this.socket.onerror = this.handleError;
    this.socket.onclose = this.handleClose;
  }

  private handleOpen() {
    console.log('WebSocket connection established');
  }

  private handleMessage(event: MessageEvent) {
    console.log('Received message:', event.data);
  }

  private handleError(event: Event) {
    console.error('WebSocket error:', event);
  }

  private handleClose(event: CloseEvent) {
    console.log('WebSocket connection closed:', event);
  }

  /**
   * pomelo connect
   * @param event_type
   * @param event
   */
  private connectConnector(event_type: string, event: MessageEvent | CloseEvent | Event | any) {
    switch (event_type) {
      case 'emit':
        break
      case 'on':
        break
    }
  }

  /**
   * 服务端主动断开链接
   * @param event
   */
  private kicked() {
    this.socket.onclose = this.handleClose;
  }

  /**
   * Parsing server-side initiated pushed packages
   */
  private onUnsolicited() { }

  /**
   * websocket disconnect
   */
  public disconnect() {
    this.socket.onclose = this.handleClose
  }

  /**
   * Get the status of the websocket
   * @returns
   */
  public getState() {
    return ''
  }

  /**
   * Clear all contracting agreements
   *
   */
  public destroy() {
    this.sendCount = {}
  }

  /**
   * Data Collation
   * @param msg
   * @param type
   * @param version
   */
  private msgParsing(route: string, msg: any, type: SENDTYPE) {
    let buffer = null
    msg = msg || {}

    return msg
  }

  /**
   * 处理网络延迟
   * @param route
   * @param blOpen
   * @param type
   * @returns
   */
  public wait(route: string, blOpen: boolean, type: SENDTYPE = SENDTYPE.SOCKET) {
    if (this.noWaitView.findIndex((name: string) => name == route) != -1) return
    if (this.sendCount[type] == null) this.sendCount[type] = 0
    blOpen ? this.sendCount[type]++ : this.sendCount[type]--
    if ((this.sendCount[type] == 0 && !blOpen) || (this.sendCount[type] == 1 && blOpen)) {
      // TODO
    }
  }

  /**
   * 清理网络延迟
   */
  private netWorkClose() {
    this.sendCount = {}
  }

  public allClearNetwork() {
    this.disconnect()
  }

  /**
   * create request instance
   */
  private createService() {
    const service = axios.create()
    // request interception
    service.interceptors.request.use(
      (config: any) => config,
      // Failed to send
      (error: any) => Promise.reject(error)
    )
    // Response interception (can be adjusted according to specific business)
    service.interceptors.response.use(
      (response: any) => {
        // apiData is the data returned by the API
        const apiData = response.data as any
        // This Code is the business Code agreed with the backend
        const code = apiData.code
        // If there is no Code, it means that this is not an API developed by the project backend
        if (code === undefined) {
          return Promise.reject(new Error('non-system interface'))
        } else {
          return apiData;
          switch (code) {
            case 200:
              // code === 0 means no error
              return apiData
            case 0:
              // code === 0 means failed
              return apiData
            case 100000:
              // code === 100000 means Passed data exception
              return apiData
            case 100001:
              // code === 100001 means The password does not meet the requirements
              return apiData
            case 100002:
              // code === 100002 User account is locked
              return apiData
            case 101001:
              // code === 200 means Login data exception
              return apiData
            case 101002:
              // code === 200 means The login account or password is wrong
              return apiData
            case 101003:
              // code === 101003 means Login account does not exist
              return apiData
            case 102001:
              // code === 102001 means Failed to register data
              return apiData
            case 102002:
              // code === 102002 means Registration data exception
              return apiData
            case 102003:
              // code === 102003 means Registering an existing account is abnormal
              return apiData
            case 103001:
              // code === 103001 means Abnormal nickname format (abnormal length or illegal identifier)
              return apiData
            case 103002:
              // code === 103002 means Nickname is the same as email
              return apiData
            case 103003:
              // code === 103003 means Email format exception (abnormal length or illegal identifier)
              return apiData
            case 103004:
              // code === 103004 means Phone format exception (abnormal length or illegal identifier)
              return apiData
            case 103005:
              // code === 103005 means The same password needs to be changed
              return apiData
            case 103006:
              // code === 103006 means The current password is wrong
              return apiData
            case 103007:
              // code === 103007 means The emails that need to be modified are the same
              return apiData
            case 103008:
              // code === 103008 means The message that needs to be modified is already taken
              return apiData
            case 103009:
              // code === 103009 means The avatar index that needs to be modified is wrong
              return apiData
            case 103010:
              // code === 103010 means wrong birthday format
              return apiData
            default:
              // is not the correct Code
              return Promise.reject(new Error('Error'))
          }
        }
      },
      (error: any) => {
        // Status is the HTTP status code
        const status = get(error, 'response.status')
        switch (status) {
          case 400:
            error.message = 'wrong request'
            break
          case 401:
            // When the token expires, directly log out and force refresh the page (redirect to the login page)
            // location.reload()
            break
          case 403:
            error.message = 'access denied'
            break
          case 404:
            error.message = 'Request address error'
            break
          case 408:
            error.message = 'Request timed out'
            break
          case 500:
            error.message = 'internal server error'
            break
          case 501:
            error.message = 'service not implemented'
            break
          case 502:
            error.message = 'gateway error'
            break
          case 503:
            error.message = 'service is not available'
            break
          case 504:
            error.message = 'gateway timeout'
            break
          case 505:
            error.message = 'HTTP version not supported'
            break
          default:
            break
        }
        return Promise.reject(error)
      }
    )
    return service
  }

  /**
   * create request method
   */
  private createRequestFunction(
    service: AxiosInstance,
    timeout: number = this.netCfg.getTimeout(),
    token: string | undefined = this.netCfg.getToken()
  ) {
    return function <T>(config: AxiosRequestConfig): Promise<T> {
      const configDefault = {
        headers: {
          "Authorization": 'Bearer ' + token,
          "X-Language": "en",
        },
        timeout: timeout,
        baseURL: import.meta.env.VITE_BASE_API,
        data: {}
      }
      return service(Object.assign(configDefault, config))
    }
  }
}