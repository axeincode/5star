
import Adjust from "@adjustcom/adjust-web-sdk";

export interface AdjustData {
  key: string
  value: string
  params: string
}

export default class AdjustClass {

  private static instance: AdjustClass

  private token: string = "gmx6cdn8x3pc"

  private isMobileWebview: boolean = false

  constructor() {

  }

  /**
   * single instance
   * @param isMobile init set movile
   * @returns
   */
  public static getInstance(isMobile: boolean = false) {
    if (!AdjustClass.instance) {
      AdjustClass.instance = new AdjustClass()
      AdjustClass.instance.setMobile(isMobile)
      // if (!isMobile) {
      //   AdjustClass.instance.init()
      // }
    }
    return AdjustClass.instance
  }

  /**
   * init adjust
   */
  private init() {
    Adjust.initSdk({
      appToken: this.token,
      environment: 'sandbox' // sandbox | production
    });
  }

  /**
   * set movile type
   * @param type boolean
   */
  public setMobile(type: boolean): void {
    this.isMobileWebview = type;
    if (this.isMobileWebview) {
      if (!(window as any)["AndroidWebView"]) (window as any)["AndroidWebView"] = {};
    }
  }


  /**
   * send event
   * @param tokenParams
   */
  public adjustTrackEvent(tokenParams: AdjustData): void {
    if (this.isMobileWebview) {
      (window as any)["AndroidWebView"].firebaseEvent(tokenParams.key, tokenParams.value, tokenParams.params);
    } else {
      // web目前不需要上报处理
      // Adjust.addGlobalCallbackParameters([{key:this.getKey(tokenParams.key), value:tokenParams.value}]);
      // Adjust.trackEvent(tokenParams);
    }
    console.log(this.isMobileWebview)
  }

  /**
   * get key content
  脸书登录  FB_LOGIN
  脸书注册  FB_REGISTER
  谷歌登录  GOOGLE_LOGIN
  谷歌注册  GOOGLE_REGISTER
  登录     LOGIN
  页面浏览  PAGE_VIEW
  注册     REGISTER
  H5付费事件上报APK对应的key
  首次付费  FIRST_RECHARGE
  二次付费  SECOND_RECHARGE
  普通付费  PAY_RECHARGE
   * @param value
   */
  public getKey(value: string): string {
    switch (value) {
      case "FB_LOGIN":
        return "9mc4lb"
      case "FB_REGISTER":
        return "4537ut"
      case "GOOGLE_LOGIN":
        return "ifryfc"
      case "GOOGLE_REGISTER":
        return "hcb820"
      case "LOGIN":
        return "yzv017"
      case "PAGE_VIEW":
        return "s2jbxh"
      case "REGISTER":
        return "okjslo"
      case "FIRST_RECHARGE":
        return "r15rr9"
      case "SECOND_RECHARGE":
        return "ld7asn"
      case "PAY_RECHARGE":
        return "gdlh3x"
      default:
        break
    }
    return ""
  }
}
