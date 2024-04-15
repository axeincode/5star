/**
 * 增加千分位分割符 10000 => "10,000"
 * @param {string | number} num
 * @return {string}
 */
export function toThousandFilter(num: string | number): string {
  const numStr: string = typeof num === 'string' ? num : (+num || 0).toString();
  return numStr.replace(/\d+/, function (match) {
    return match.replace(/(\d)(?=(\d{3})+$)/g, m => m + ',');
  });
}

/**
 * 保留 n 位小数，不做四舍五入处理 10000.1234 => "10000.12"
 * @param {string | number} num
 * @param {number} place
 * @return {string}
 */
export function keepNDecimalPlaces(num: string | number, place: number = 2): string {
  const numStr: string = typeof num === 'string' ? num : (+num || 0).toString();
  if (place < 0) {
    return numStr;
  }

  let result = '';
  const decimalIndex = numStr.indexOf('.');
  
  if (decimalIndex === -1) {
    // 如果没有小数点，则直接在末尾添加两个零
    result = numStr + '.00';
  } else {
    const decimalPart = numStr.substring(decimalIndex + 1);
    if (decimalPart.length === 1) {
      // 如果小数点后只有一位，则在末尾添加一个零
      result = numStr + '0';
    } else if (decimalPart.length === 2) {
      // 如果小数点后有两位，则直接返回原始数字
      result = numStr;
    } else {
      // 如果小数点后超过两位，则截取两位小数
      result = numStr.substring(0, decimalIndex + 3);
    }
  }
  
  return result;
}

/**
 * 清除千分位分割符 "10,000" => "10000"
 * @param {string} str
 * @return {string}
 */
export function clearThousandFilter(str: string): string {
  return str.replace(/\,/g, '');
}

/**
 * 保留两位小数
 * @param {string | number} num
 * @return {string}
 */
export function toFormatNum(num: string | number): string {
  // 判断num是否null/undefined非数字，返回0
  if (!(/^\d+(\.\d+)?$/.test(String(num)))) {
    return '0.00'
  }
  
  if (!num || isNaN(Number(num))) return num.toString(); // Falsy || "-"
  return keepNDecimalPlaces(num);
}

/**
 * 保留三位小数
 * @param {string | number} num
 * @return {string}
 */
export function keepThreenNum(num: string | number): string {
  if (!num || isNaN(Number(num))) return num.toString(); // Falsy || "-"
  return keepNDecimalPlaces(num, 3);
}