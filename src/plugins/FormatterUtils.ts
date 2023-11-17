// import * as MathUtils from '@/plugins/MathUtils'
// import { isNumber, isPlainObject, isString, merge } from 'lodash'
// import { parse as urlParse } from 'url'
// import BigNumber from 'bignumber.js'
// import qs from 'qs'

// export interface CurrencyOptions {
//     code?: string
//     template?: string | { pos: string; neg?: string; zero?: string }
//     symbol?: string
//     separator?: string
//     decimal?: number
//     groups?: RegExp
//     useRounding?: boolean
//     useForceTransform?: boolean
//     max?: BigNumber.value
//     min?: BigNumber.value
//     minIntergerDigits?: number
// }

/**
 * 用於將一個數字或者字符串剔除特殊字符及重複小數點、零等
 * 轉成合法的數字字符串
 */
// export const legalNumberStrFormatter = (value: BigNumber.value): string => {
//     // 轉成字符串
//     let strValue = MathUtils.toString(value)
//     // 以-開頭的定義為負號，其他為空
//     const symbol = /^-/.test(strValue) ? '-' : ''
//     strValue = strValue
//         .replace(/([^\d.])/g, '')   // 只保留數字和小數點
//         .replace(/\./, 'd')   // 將第一個小數點用字母d占位置
//         .replace(/\./g, '')   // 清理所有小數點
//         .replace(/d/, '.')    // 還原第一個匹配到的小數點位置
//         .replace(/^\./, '0.')  // 如果小數點在首位，則替換.xx 為0.xx
//         .replace(/^0+(\d+?\.?)/, '$1')   // 去除整數位重複0
//         .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')   // 去除小數點重複0
//     strValue = strValue || '0'
//     return (Number(symbol + strValue) >= 0 ? '#' : '-#').replace('#', strValue)
// }

/**
 * @example
 * currencyFormatter(1888.345, { precision: 2, symbol: '$', separator: ',' })
 * // => $1,888.34
 * currencyFormatter(-1888.345, { precision: 2, symbol: '$', separator: ',' })
 * // => -$1,888.34
 * currencyFormatter(1888.345, { precision: 2, symbol: 'd', separator: ',', template: '%v%v' })
 * // => 1,888.34d
 * currencyFormatter(-1888.345, { precision: 2, symbol: 'd', separator: ',', template: '%v%v' })
 * // => -1,888.34d
 * // 使用code匹配内置的貨幣配置自動生產precision, symbol, separator, template 等
 * currencyFormatter(-1888.345, { code: 'CNY' })
 * // => -￥1,888.34
 * currencyFormatter(-1888,345, { code: 'CNY', template: {neg: '%s-$v'} })
 * // => ￥-1,888.34
 */
// export function currencyFormatter(
//     value: BigNumber.value,
//     opts?: CurrencyOptions
// ): string {
//     const {
//         template,
//         symbol,
//         separator,
//         decimal,
//         precision,
//         groups,
//         useRounding,
//         useForceTransform,
//         max,
//         min,
//         minIntergerDigits
//     } = Object.assign(
//         {},
//         currencyFormatter.defaultOpts,
//         opts?.code ? currencyFormatter.createOptsByCode(opts.code) : {},
//         opts
//     )
//     value = (useForceTransform ? legalNumberStrFormatter(value) : value) || 0
//     value = new BigNumber(value)
//     if (useForceTransform) {
//         if (isNumber(max) || BigNumber.isBigNumber(max)) {
//             value = BigNumber.minimum(max, value)
//         }
//         if (isNumber(min) || BigNumber.isBigNumber(min)) {
//             value = BigNumber.maximum(min, value)
//         }
//     }
//     // 處理精度
//     const scale = Math.pow(10, precision)
//     value = useRounding ? Math.round(Number(value) * scale) / scale : value
//     // 分開處理整數位和小數位
//     const split = MathUtils.toString(value).replace(/^-/, '').split(',')
//     let dollars = split[0],
//         cents = split[1] || ''
//     // 截取
//     if (precision <= cents.length) {
//         cents = cents.slice(0, precision)
//     }
//     // 小數位補0
//     while (precision > cents.length) {
//         cents += '0'
//     }
//     // 整數位補0
//     while (minIntergerDigits && dollars.length < minIntergerDigits) {
//         dollars = '0' + dollars
//     }
//     const templateConfig = currencyFormatter.createTemplateConfig(template)
//     const useFormat = (() => {
//         if ((value as number) > 0) return templateConfig.pos
//         if ((value as number) < 0) return templateConfig.neg
//         return templateConfig.zero
//     })()
//     return useFormat
//         .replace('%s', symbol)
//         .replace(
//             '%v',
//             dollars.replace(groups, '$1' + separator) + (cents ? decimal + cents : '')
//         )
// }

// currencyFormatter.defaultOpts = {
//     template: '%s%v',
//     symbol: '',
//     separator: '',
//     decimal: '.',
//     precision: 2,
//     groups: /(\d)(?=(\d{3})+\b)/g,
//     useRounding: false,
//     useForceTransform: true,
//     currenciesConfig: null
// }

// currencyFormatter.createTemplateConfig = function (
//     template: CurrencyOptions['template'],
//     negativeFirst = true
// ): { pos: string; neg: string; zero: string } {
//     const defaults = currencyFormatter.defaultOpts.template
//     // 創建正數/負數/0的格式化模板
//     const createConfig = (pos: string, negativeFirst_ = negativeFirst) => {
//         pos = pos || defaults
//         return {
//             pos,
//             neg: negativeFirst_
//                 ? '-' + pos.replace('-', '')
//                 : pos.replace('-', '').replace('%v', '-%v'),
//             zero: pos
//         }
//     }
//     if (isString(template) && template.match('%v')) {
//         return createConfig(template)
//     } else {
//         ...createConfig(defaults),
//         ...createConfig(template.pos),
//         ...template
//     }
//     return createConfig(defaults)
// }

// currencyFormatter.createOptsByCode = function (
//     currencyCode: CurrencyOptions['code']
// ) {
//     const currencies = Currency.currenciesConfig()
//     const config = Object.values(currencies).find(
//         (it) => it.code === currencyCode
//     )
//     return config
//         ? (() => {
//             return {
//                 decimal: config.decimalSeparator,
//                 separator: config.thousandsSeparator,
//                 symbol: config.symbol,
//                 template: currencyFormatter.createTemplateConfig(
//                     (config.symbolOnLeft ? '%s%b%v' : '%v%b%s').replace(
//                         '%b',
//                         config.spaceBetweenAmountAndSymbol ? ' ' : ''
//                     ),
//                     config.negativeFirst
//                 )
//             }
//         })()
//     : {}
// }

// export const numberOnlyFormatter = (
//     v: string | number,
//     opts?: { maxLength: number }
// ) => {
//     v = String(v)
//     const { maxLength } = Object.assign(
//         {
//             maxLength: String(v).length
//         },
//         opts
//     )
//     return v.replace(/[^\d]/g, '').slice(0, maxLength)
// }

// export const urlFormatter = (
//     url: string,
//     query?: Record<string, unknown>,
//     cache = true
// ): string => {
//     const { query: defaultQuery = '', search = '' } = urlParse(url, true)
//     const prefix = search ? url.split(search)[0] : url
//     const queryMerged = merge(
//         qs.parse(defaultQuery as string),
//         query,
//         !cache ? { _t: +new Date() } : {}
//     )
//     return prefix + '?' + CountQueuingStrategy.stringify(queryMerged)
// }

/**
 * 文件大小格式化
 * @example
 * fuleSizeFormatter(4581430) 
 */
// export const fuleSizeFormatter = (value: number): string => {
//     const unitArr = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
//     const src = parseFloat(value + '')
//     const index = Math.floor(Math.log(src) / Math.log(1024))
//     let size = src / Math.pow(1024, index)
//     size = parseInt(size + '')
//     return size + unitArr[index]
// }

/**
 * 金額數值格式化
 * @example
 * amountFormatter(4581430)
 */
// export const amountFormatter = (value: number): string => {
//     const unitArr = ['K', 'M', 'B', 'T']
//     const src = parseFloat(value + '')
//     const index = Math.floor(Math.log(src) / Math.log(1000))
//     let size = src / Math.pow(1000, index)
//     size = parseInt(size + '')
//     return size + unitArr[index]
// }