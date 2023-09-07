import CacheKey from "@/constants/cacheKey"
import Cookies from "js-cookie"

/**
 * Issuing Type Enumeration
 */
export enum SENDTYPE {
  NONE,
  HTTP,
  SOCKET,
  UNSOLICITED,
  GET,
  POST
}

//Exit type 1-kick offline, 2-user disabled, 3-platform maintenance, 4-repeat login with the same account
export enum EXITTYPE {
  NONE,
  USER_EXIT,
  TOKEN_ERROR,
  MAINTAIN,
  ACC_REPEAT
}

/**
 * Network configuration class
 */
export class NetworkData {
  private static instance: NetworkData

  private token: string = ''

  private webhost: string = ''

  private websocker_ip: string = ''

  private websocker_port: number = 0

  private websocker_path: string = ''

  private timeout: number = 10000 //Normal packet sending delay of 10000 milliseconds

  // Check for ignorable error codes
  private neglect: number[] = []

  private TempRouteNoLog = []

  constructor() {
    // this.resetData()
  }

  public static getInstance(): NetworkData {
    if (!NetworkData.instance) {
      NetworkData.instance = new NetworkData()
    }

    return NetworkData.instance
  }

  /**
   * Reset data
   */
  public resetData() {
    Cookies.remove(CacheKey.TOKEN)

    this.webhost = ''

    this.websocker_ip = ''

    this.websocker_port = 8080

    this.websocker_path = ''
  }

  /**
   * Set value token
   * @param token
   */
  public setToken(token: string): void {
    Cookies.set(CacheKey.TOKEN, token, { expires: 2 })
  }

  /** Get current token */
  public getToken(): string | undefined {
    return Cookies.get(CacheKey.TOKEN)
  }

  /**
   * Set the value of http outgoing packet address
   * @param ip
   * @param host
   * @param path
   */
  public setWebHost(ip: string, host?: number, path?: string): void {
    this.webhost = ip
    if (host != null) this.webhost = `${this.webhost}:${host}`
    if (path != null && path != '') this.webhost = `${this.webhost}${path}`
  }

  /**
   * Return to the outgoing package address
   * @returns this.webhost
   */
  public getWebHost(): string {
    return this.webhost
  }

  /**
   * Set the websocker outgoing packet address
   * @param host
   * @param port
   * @param path
   */
  public setWebSocker(host: string, port?: number, path?: string): void {
    this.websocker_ip = host
    if (port) this.websocker_port = port
    if (path) this.websocker_path = path
  }

  /**
   * Return to the outgoing package address
   * @returns this.websocker
   */
  public getWebSocker() {
    return { host: this.websocker_ip, port: this.websocker_port, path: this.websocker_path }
  }

  public getTimeout(): number {
    return this.timeout
  }

  /**
   * Partial protocol temporary removal log
   * @returns
   */
  public getTempNoLog() {
    return this.TempRouteNoLog
  }

  /**
   * Check for ignorable error codes
   * @param code
   * @returns
   */
  public checkNeglectCode(code: number) {
    return this.neglect.findIndex((num) => num == code) != -1
  }
}
