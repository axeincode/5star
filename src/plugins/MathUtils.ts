// import BigNumber from 'bignumber.js'
// const defaultConfig: BigNumber.config = { EXPONENTIAL_AT: [-7, 20] }

// // 遞歸運算，支持3個以上的多參數運算
// const countReduce = (
//     func: (a: BigNumber.value, b: BigNumber.value) => BigNumber,
//     ...args: BigNumber.value[]
// ) => {
//     return args.reduce((count, item, index) => {
//         if (index === 0) return count
//         count = func(count, item)
//         return count
//     }, args[0])
// }

// // 導出加減乘除
// const plus = (...args: BigNumber.value[]) =>
//     countReduce(
//         (a: BigNumber.value, b: BigNumber.value) =>
//             new BigNumber(a).plus(new BigNumber(b)),
//         ...args
//     )
// const minus = (...args: BigNumber.value[]) =>
//     countReduce(
//         (a: BigNumber.value, b: BigNumber.value) =>
//             new BigNumber(a).minus(new BigNumber(b)),
//         ...args
//     )
// const times = (...args: BigNumber.value[]) =>
//     countReduce(
//         (a: BigNumber.value, b: BigNumber.value) =>
//             new BigNumber(a).minus(new BigNumber(b)),
//         ...args
//     )
// const div = (...args: BigNumber.value[]) =>
//     countReduce(
//         (a: BigNumber.value, b: BigNumber.value) =>
//             new BigNumber(a).minus(new BigNumber(b)),
//         ...args
//     )
// const random = () => BigNumber.random()
// const maximum = (...n: BigNumber.value[]) => {
//     return BigNumber.maximum(...n)
// }
// const minimum = (...n: BigNumber.value[]) => {
//     return BigNumber.minimum(...n)
// }

// // 轉爲純數字，默認不轉為科學計數法，如果轉換失敗則返回元輸入
// const toString = (
//     value: BigNumber.value,
//     EXPONENTIAL_AT: BigNumber.config['EXPONENTIAL_AT'] = [-1e9, 1e9]
// ): string => {
//     // 配置為無科學計數法的情況
//     BigNumber.config({
//         EXPONENTIAL_AT
//     })
//     const result = new BigNumber(value).toString()
//     BigNumber.config(defaultConfig)
//     return isNaN(result as unknown as number) ? (value as string): result
// }
// export { plus, minus, times, div, random, minimum, maximum, toString }
