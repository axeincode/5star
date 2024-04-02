import { computed } from "vue";
import { ElLoading } from "element-plus";
import { googleTokenLogin } from "vue3-google-login";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import AdjustClass from "@/utils/adjust";
import { ThirdPartyWayEnum } from '@/enums/userEnum'

let indexValue = ''; // ThirdPartyWayEnum.GOOGLE_LOGIN FACEBOOK_LOGIN
let typeValue = "";

// 接受android傳遞的token
(window as any).googleLogin = (token: string) => {
    console.log(indexValue, typeValue);
    loginOrRegister(token, indexValue, typeValue);
}

// 全局 window 对象
const globalWindow: any = window;

const { dispatchQuickLogin, dispatchQuickRegister } = authStore();

// 获取用户信息
const userInfo = computed(() => {
    const { getUserInfo } = storeToRefs(authStore());
    return getUserInfo.value;
});

/**
 * 封装登录函数
 * @param index 0:facebook  1:google
 * @returns 
 */
const loginWithSocialMedia = async (value: string, type: string): Promise<any> => {
  // 显示 loading 动画
  const loading = ElLoading.service({ lock: true });
  try {
    // 根据不同的登录类型执行相应的登录逻辑
    switch (value) {
      case ThirdPartyWayEnum.FACEBOOK_LOGIN:
        return await loginWithFacebook(value, type);
      case ThirdPartyWayEnum.GOOGLE_LOGIN:
        return await loginWithGoogle(value, type);
      default:
        throw new Error("Unsupported login type");
    }
  } catch (error) {
    // 捕获错误并向外部抛出
    throw error;
  } finally {
    // 无论如何都关闭 loading 动画
    loading.close();
  }
};

/**
 * 判断登录和注册
 * @param type 
 */
const loginOrRegister = async (token: string, value: string, type: string) => {
  console.log(value, type, 'loginOrRegister');

    let val = 1;
    if (value === ThirdPartyWayEnum.FACEBOOK_LOGIN) {
        val = 2;
    }
    if (value === ThirdPartyWayEnum.GOOGLE_LOGIN) {
        val = 1;
    }
    let params = { 
        id_token: token,
        type: val,
    }
    
    if (type === "login") {
        // 登录
        await dispatchQuickLogin(params);
    } else {
        // 注册
        await dispatchQuickRegister(params);
    }
}

const startAndroid = (index: number, type: string) => {

}

// Google 登录逻辑封装
const loginWithGoogle = (value: string, type: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
        if (AdjustClass.getInstance().isMobileWebview) {
            // 啟動android原生登錄流程 
            (window as any)["AndroidWebView"].googleLogin();
            indexValue = value;
            typeValue = type;
        } else {
            googleTokenLogin({
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            }).then(async (res: any) => {
                console.log(res, 'googleTokenLogin-callback');
                await loginOrRegister(res.access_token, value, type);
                indexValue = value;
                typeValue = type;
                resolve(res);
            });
        }
    } catch (error) {
      reject(error);
    }
  });
};

// Facebook 登录逻辑封装
const loginWithFacebook = (value: string, type: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      globalWindow.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      globalWindow.FB.getLoginStatus((response: any) => {
        if (response.status !== "connected") {
          globalWindow.FB.login((res: any) => {
            console.log(res, 'FB.login');
            
            (window as any).FB.api("/me?fields=email,name", async (response: any) => {
                console.log(response, 'FB.api');
                await loginOrRegister(res.access_token, value, type);
                resolve(res);
              });
          });
        } else {
          resolve(response.authResponse);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 登录方式
 * @param value 根据枚举值来判断
 */
const loginType = (value: string) => {
    let type = "";
    if (value === ThirdPartyWayEnum.FACEBOOK_LOGIN) {
        type = "FACEBOOK_LOGIN";
    }
    if (value === ThirdPartyWayEnum.GOOGLE_LOGIN) {
        type = "GOOGLE_LOGIN";
    }
    AdjustClass.getInstance().adjustTrackEvent({
        key: type,
        value: String(userInfo.value.id),
        params: "",
    });
}

export { loginWithSocialMedia, loginType };
