import type { Directive, App } from "vue";

const labelResetDirective: Directive = {
  // 指令绑定到元素时调用
  mounted(el, binding, vnode) {
    // console.group("reFontSize");

    const maxWidth = binding.value[0];
    const labelContent = binding.value[1];
    let labelEl = el;
    if (labelContent) {
      labelEl = el.querySelector(`.${labelContent}`);
    }

    // console.log("labelEl - binding", labelEl, binding);
    // console.log("offsetWidth", labelEl.offsetWidth);

    const orginOffsetWidth = labelEl.offsetWidth;
    // 获取计算样式
    const computedStyle: any = window.getComputedStyle(labelEl);
    // 获取字体大小属性
    const orginFontSize = parseInt(computedStyle.getPropertyValue("font-size"));

    console.log("orginFontSize", orginFontSize);

    if (orginOffsetWidth < maxWidth) return;

    const scaleFontSize = Math.floor(
      (orginFontSize * maxWidth) / orginOffsetWidth
    );

    // console.log("scaleFontSize", scaleFontSize);
    labelEl.style.cssText += `font-size: ${scaleFontSize}px !important`;
    // if(labelContent) {
    //   labelEl.style.cssText += `font-size: ${scaleFontSize}px !important`;
    // } else {

    // }
    // console.groupEnd();

    // Do something when the directive is mounted to element
  },
  // 指令与元素解绑时调用
  unmounted(el, binding, vnode) {
    // Do something when the directive is unmounted from element
  },
};

export function setupLabelResetDirective(app: App) {
  app.directive("reset-font", labelResetDirective);
}

export default labelResetDirective;
