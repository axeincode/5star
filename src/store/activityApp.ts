import { defineStore } from 'pinia';
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import { getQueryParams } from "@/utils/getPublicInformation";

export const activityAppStore = defineStore({
  id: 'activityApp',
  state: () => ({
    appConfirmDialogShow: true as boolean, // 控制下载app弹框是否显示
    activityBonus: '0' as string, // 活动奖金
    downloadLink: '' as string, // app下载链接
    downloadID: '' as string, // app活动id
    mobile: true as boolean, // 是否浏览器运行/非app
  }),
  getters: {
    getAppConfirmDialogShow: (state) => state.appConfirmDialogShow,
    getActivityBonus: (state) => state.activityBonus,
    getDownloadLink: (state) => state.downloadLink,
    getDownloadID: (state) => state.downloadID,
    getMobile: (state) => state.mobile,
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
          this.downloadLink = data.link
          this.activityBonus = data.bonus
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
          this.downloadLink = data.link
          this.activityBonus = data.bonus
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
      console.log(data, 'downloadApprReceivedownloadApprReceivedownloadApprReceivedownloadApprReceivedownloadApprReceivedownloadApprReceive');
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
  }
})
