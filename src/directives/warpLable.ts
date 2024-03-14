import type { Directive, App } from "vue";

function labelWarp(element: any, binding: any) {
  // console.group("labelWarp1");
  const { nodeName, height, maxWidth, lineHeightOffset } = binding.value;
  let currentNode = element;

  switch(nodeName) {
    case 'menu-btn':
      // 文本节点信息
      const textNode = element.querySelector('.v-btn__content');
      const textNodeOffsetWidth =  textNode.offsetWidth;
      const textNodeOffsetHeight = textNode.offsetHeight;

      // 获取计算样式对象
      const eleComputedStyles = window.getComputedStyle(currentNode);
      const originMinWidth:any = Number(eleComputedStyles.getPropertyValue("min-width").replace(/px$/, ""))
      let originWidth = currentNode.offsetWidth;
      let finalMinWidth = originMinWidth
      
      if(originWidth > originMinWidth) {
        finalMinWidth = originWidth
      }

      // 留出10px的左右距离
      finalMinWidth -= 10

      if (textNodeOffsetWidth <= finalMinWidth) return;

      let CssText = "";
      CssText = Math.floor(textNodeOffsetHeight / 2) - 4 + 'px'

      textNode.style.cssText += `width: ${finalMinWidth}px;word-break: break-all;word-warp: break-word; white-space: pre-line; line-height:${CssText}!important`;
      break;
    default:
      currentNode = element.querySelector(nodeName);
      const eleHeight = currentNode.offsetHeight;
      const orginOffsetWidth = currentNode.offsetWidth;
      const offsetValue = lineHeightOffset || 0

      let lineHeightCssText = "";
    
      if (orginOffsetWidth < maxWidth) return;
    
      if(eleHeight <= height) {
        lineHeightCssText = ( height / 2 - offsetValue ) + 'px';
      } else {
        lineHeightCssText = ( eleHeight / 2 - offsetValue ) + 'px';
      }
      currentNode.style.cssText += `width: ${maxWidth - 4}px;word-break: break-all;word-warp: break-word; white-space: pre-line; line-height:${lineHeightCssText}!important`;
      break;
  }
  // console.groupEnd();
}

const warpLableDirective: Directive = {
  // 指令绑定到元素时调用
  mounted(el, binding, vnode) {
    labelWarp(el, binding);
  },
  // 更新后调用
  updated(el, binding, vnode) {
    labelWarp(el, binding);
  },
  // 指令与元素解绑时调用
  unmounted(el, binding, vnode) {
    // Do something when the directive is unmounted from element
  },
};

export function setupWarpLabelDirective(app: App) {
  app.directive("warp-label", warpLableDirective);
}

export default warpLableDirective;
