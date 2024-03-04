import type { Directive, App } from "vue";

const labelResetDirective: Directive = {
  // 指令绑定到元素时调用
  mounted(el, binding, vnode) {
    // console.group("reFontSize");

    const {maxWidth, textNode, padding} = binding.value;
    let labelEl = el;
    let textEL = el
    if (textNode) {
      textEL = el.querySelector(`.${textNode}`);
    }
    // 左右padding
    let paddingValue = padding ? padding : 2;
    const orginOffsetWidth = labelEl.offsetWidth;
    const textOffsetWidth = textEL.offsetWidth;
    // 最终用于计算盒子是否超过的最大width
    const fianlWidth = maxWidth ? maxWidth - paddingValue : orginOffsetWidth - paddingValue;
    // 获取计算样式
    const computedStyle: any = window.getComputedStyle(textEL);
    // 获取字体大小属性
    const textFontSize = parseInt(computedStyle.getPropertyValue("font-size"));

    // console.log(fianlWidth, textOffsetWidth, 'textOffsetWidth');

    let scaleFontSize:Number = textFontSize;
    if(textOffsetWidth < fianlWidth) return;

    scaleFontSize = Math.floor(
        (textFontSize * fianlWidth) / textOffsetWidth
      );


    // console.log(scaleFontSize, 'scaleFontSize');
    
    textEL.style.cssText += `font-size: ${scaleFontSize}px !important`;
    // console.groupEnd();

    // Do something when the directive is mounted to element
  },
  // 指令与元素解绑时调用
  unmounted(el, binding, vnode) {
    // Do something when the directive is unmounted from element
  },
};

export function setupLabelResetDirective(app: App) {
  app.directive("reset-font-size", labelResetDirective);
}

export default labelResetDirective;
