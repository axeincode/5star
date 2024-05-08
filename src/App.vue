<script lang="ts" setup>
import { computed, onMounted, Suspense, defineAsyncComponent, nextTick, ref } from "vue";
import { RouterView } from "vue-router";
import { useToast } from "vue-toastification";
const FirstScreenSkeleton = defineAsyncComponent(() => import("@/components/first_screen_skeleton/index.vue"));
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

// 禁止页面缩放
window.onload = function () {
  var lastTouchEnd = 0;
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener(
    "touchend",
    function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  /* 阻止双指指掐放大*/
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
  /* 阻止双指点击放大*/
  document.addEventListener("dblclick", function (e) {
    e.preventDefault();
  });
};

onMounted(async () => {
  // autoUpdate()

  // 判断是否为IOS系统以添加CSS属性
  let u = navigator.userAgent;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isIOS) {
    // let iosApp = document.getElementById("app");
    // iosApp.style.backfaceVisibility = "hidden";
    // iosApp.style.transform = "translate3d(0,0,0)";

    document.addEventListener(
      "blur",
      (event) => {
        // 当页面没出现滚动条时才执行，因为有滚动条时，不会出现这问题
        // input textarea 标签才执行，因为 a 等标签也会触发 blur 事件
        // document.documentElement.offsetHeight <=
        // document.documentElement.clientHeight &&
        if (["input", "textarea"].includes(event.target.localName)) {
          // document.body.scrollIntoView() // 回顶部
          const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0;
          setTimeout(() => {
            window.scrollTo({
              top: -Math.max(scrollHeight - 1, 0),
              behavior: "smooth",
            });
          }, 200);
        }
      },
      true
    );
    // window.addEventListener("focusin", (event) => {
      // var inputElements = document.querySelectorAll('input, textarea');
      // const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
      // toast.success(`focusin - ${event.target.localName} + ${scrollHeight}`)
      //   if (
      //       ['input', 'textarea'].includes(event.targetlocalName)
      //   ) {
      // document.body.scrollIntoView() // 回顶部
      // }
    // });
    // focusin
  } 
});
</script>

<template>
  <FirstScreenSkeleton></FirstScreenSkeleton>
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
  src: local("Bauhaus 93"),
    url(./fonts/Bauhaus/BauhausRegular.ttf) format("truetype");
}

input:focus,
textarea,
textarea:focus,
select,
select:focus {
  font-size: 16px !important;
}
</style>
