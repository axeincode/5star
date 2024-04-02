<script lang="ts" setup>
import { ref, onMounted, Suspense } from "vue";
import { RouterView } from "vue-router";
// import FP from '@fingerprintjs/fingerprintjs-pro';

// // 自动更新
// function autoUpdate(): void {
//   if (window.plus) {
//     plusReady();
//   } else {
//     document.addEventListener('plusready', function() {
//       // 获取本地应用资源版本号
//       plus.runtime.getProperty(plus.runtime.appid, (inf: { version: string }) => {
//         checkVersion(inf.version);
//       });
//     });
//   }
// }

// function plusReady(): void {
//   // 获取本地应用资源版本号
//   plus.runtime.getProperty(plus.runtime.appid, (inf: { version: string }) => {
//     checkVersion(inf.version);
//   });
// }

// // 检查版本
// function checkVersion(currentV: string): void {
//   // 这里是你获取版本号的方式
//   const xhr: XMLHttpRequest = new XMLHttpRequest();
//   // 获取服务器中的版本文件
//   xhr.open('GET', 'https://xxxxxx/appinfo.json', true);
//   xhr.send(null);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       const data: { version: string } = JSON.parse(xhr.responseText);
//       // 处理获取到的数据
//       if (currentV !== data.version) {
//         // 提示是否需要更新
//         // 修改为框架的弹框
//         // showConfirmDialog({
//         //   title: '更新提示',
//         //   message:
//         //     '检测到有新版本, 是否更新?',
//         // })
//         //   .then(() => {
//         //     downloadWgt();
//         //   })
//         //   .catch(() => {});
//       }
//     }
//   };
// }

// // 下载wgt包
// function downloadWgt(): void {
//   // 服务器中的更新包
//   let wgtUrl: string = `https://xxxxxxx/H518410D4.wgt`;
//   plus.nativeUI.showWaiting("下载更新文件中...");
//   plus.downloader.createDownload(wgtUrl, {filename: "_doc/update/"}, (d, status) => {
//     if (status === 200) {
//       installWgt(d.filename); // 安装wgt包
//     } else {
//       plus.nativeUI.alert("下载更新文件失败！");
//     }
//     plus.nativeUI.closeWaiting();
//   }).start();
// }

// // 安装wgt包
// function installWgt(path: string): void {
//   plus.nativeUI.showWaiting("安装更新文件...");
//   plus.runtime.install(path, {}, function () {
//     plus.nativeUI.closeWaiting();
//     plus.nativeUI.alert("应用资源更新完成！", function () {
//       plus.runtime.restart();
//     });
//   }, function (e: { code: number; message: string }) {
//     plus.nativeUI.closeWaiting();
//     plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
//   });
// }

const fingerprint = ref<string>('');

onMounted(async () => {
  // autoUpdate()
  // 获取fingerprint指纹
  // try {
  //   const fp = await FP.load({
  //     token: 'F2FGYiUPWrRUc2mVnpnR'
  //   });
  //   const result = await fp.get();
  //   fingerprint.value = result.visitorId;
  // } catch (error) {
  //   console.error('Failed to get browser fingerprint:', error);
  // }
});
</script>

<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style lang="scss">
@font-face {
  // font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular, Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
  // src: local("Inter"),
  // url(./fonts/Inter/Inter-VariableFont_slntwght.ttf) format("truetype");
}

@font-face {
  font-family: "Bauhaus 93";
  src: local("Bauhaus 93"), url(./fonts/Bauhaus/BauhausRegular.ttf) format("truetype");
}
</style>
