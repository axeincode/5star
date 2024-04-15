import router from '@/router';
import { authStore } from "@/store/auth";
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";

export async function getErrorInfoCollector(logMas: string) {
  const { getUserInfo } = authStore() // 获取用户信息
  const currentUrl = window.location.href; // 输出当前页面的完整 URL

  function getIPAddress() {
    return new Promise((request, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.ipify.org?format=json', true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          request(response.ip);
        } else {
          reject(null);
        }
      };
      xhr.send();
    })
  };
  let userIP = await getIPAddress() // 获取当前用户ip

  const data = {
    url: currentUrl,
    ip: userIP,
    page: router.options.history.location,
    uid: getUserInfo.uid || '',
    id: getUserInfo.id || '',
    level: 3,
    log: logMas
  }
  
  const route: string = NETWORK.COLLECTOR_LOG.OPERATE_COLLECTOR_LOG;
  const network: Network = Network.getInstance();
  const next = () => {}
  await network.sendMsg(route, data, next, 1);
}