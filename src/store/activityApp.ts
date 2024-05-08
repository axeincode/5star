import { defineStore } from 'pinia';
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import { getQueryParams, getDeviceType } from "@/utils/getPublicInformation";

export const activityAppStore = defineStore({
  id: 'activityApp',
  state: () => ({
    appConfirmDialogShow: false as boolean, // 控制下载app弹框是否显示
    activityBonus: '0' as string, // 活动奖金
    downloadLink: '' as string, // app下载链接
    downloadID: '' as string, // app活动id
    mobile: true as boolean, // 是否浏览器运行/非app
    automaticAppTimeout: null as NodeJS.Timeout | null,
    appGuidanceTimeout: null as NodeJS.Timeout | null,
    openAppGuidanceTimeout: null as NodeJS.Timeout | null,
    showAppGuidance: false as boolean, // 是否显示下载app引导框
    appGuidanceNum: 0, // 黄色引导弹框最多弹出三次（在首页，30秒弹出一次）
    appConfirmNum: 0, // app下载弹框最多弹出一次（在首页浏览2分钟后弹出）
  }),
  getters: {
    getAppConfirmDialogShow: (state) => state.appConfirmDialogShow,
    getActivityBonus: (state) => state.activityBonus,
    getDownloadLink: (state) => state.downloadLink,
    getDownloadID: (state) => state.downloadID,
    getMobile: (state) => state.mobile,
    getShowAppGuidance: (state) => state.showAppGuidance,
  },
  actions: {
    setAppConfirmDialogShow(param: boolean) {
      this.appConfirmDialogShow = param;
    },
    // 获取未登录时下载app活动的数据
    async downloadAppAcquisition() {
      const route: string = NETWORK.DOWNLOADAPP.DOWAPP_INFO_ACQUISTION;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: any, rej: any) => {
        if (response.code == 200) {
          const data = response.data          
          this.downloadID = String(data.id)
          if (['mac', 'ios'].includes(getDeviceType())) {
            this.downloadLink = data.ios_link
          } else {
            this.downloadLink = data.android_link
          }
          this.activityBonus = data.bonus || 0
        } else {
          
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // 获取登录之后下载app活动的数据
    async userDownloadAppAcquisition() {
      const route: string = NETWORK.DOWNLOADAPP.USER_DOWAPP_INFO_ACQUISTION;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: any, rej: any) => {
        if (response.code == 200) {
          const data = response.data          
          this.downloadID = String(data.id)
          if (['mac', 'ios'].includes(getDeviceType())) {
            this.downloadLink = data.ios_link
          } else {
            this.downloadLink = data.android_link
          }
          
          this.activityBonus = data.bonus || 0
        } else {
          
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // 获取当前运行的是否app/浏览器
    runningSystem() {
      const queryParams = getQueryParams();
      if (queryParams['mobile']) {
        // app应用程序
        this.mobile = false
      } else {
        // PC/H5浏览器
        this.mobile = true
      }
    },
    // 用户通过app登录，领取奖励
    async downloadApprReceive(data: any) {
      const route: string = NETWORK.DOWNLOADAPP.DOWAPP_RECEIVE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = async (response: any) => {
        if (response.code == 200) {
        } else {
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // 判断下载app是否需要自动弹出
    automaticPopUpApp(state: boolean, isPopUp: boolean = false) {
      // 如果已经弹出超过1次，清空定时器，不再执行弹框
      if (this.appConfirmNum === 1) {
        if (this.automaticAppTimeout) {
          clearTimeout(this.automaticAppTimeout); // 删除定时器
          this.automaticAppTimeout = null; // 清空定时器变量
        }
        return
      } else {
        this.appConfirmNum++
      }

      if (state) {
        if (this.automaticAppTimeout) {
          clearTimeout(this.automaticAppTimeout); // 删除定时器
          this.automaticAppTimeout = null; // 清空定时器变量
        }
      } else {
        this.automaticAppTimeout = setTimeout(() => {
          // 判断是否存在打开弹框
          if (!isPopUp) {
            this.appConfirmDialogShow = true
          }
        }, 120000);
      }
    },
    setShowAppGuidance(param: boolean) {
      this.showAppGuidance = param;
    },
    // 定时关闭下载引导弹框
    setAppGuidance(state: boolean) {
      if (state) {
        if (this.appGuidanceTimeout) {
          clearTimeout(this.appGuidanceTimeout); // 删除定时器
          this.automaticAppTimeout = null; // 清空定时器变量
        }
      } else {
        this.appGuidanceTimeout = setTimeout(() => {
          this.showAppGuidance = false
        }, 5000);
      }
    },
    // 定时打开下载引导弹框
    setOpenAppGuidance(state: boolean) {
      // 如果已经弹出超过三次，清空定时器，不再执行弹框
      if (this.appGuidanceNum === 3) {
        if (this.openAppGuidanceTimeout) {
          clearTimeout(this.openAppGuidanceTimeout); // 删除定时器
          this.openAppGuidanceTimeout = null; // 清空定时器变量
        }

        return
      } else {
        this.appGuidanceNum++
      }

      if (state) {
        if (this.openAppGuidanceTimeout) {
          clearTimeout(this.openAppGuidanceTimeout); // 删除定时器
          this.openAppGuidanceTimeout = null; // 清空定时器变量
        }
      } else {
        this.openAppGuidanceTimeout = setTimeout(() => {
          this.showAppGuidance = true
        }, 30000);
      }
    }
  }
})
