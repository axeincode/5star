// import CryptoJS from 'crypto-js'
// export class CryptoManager {
//     public signKey = 'tgjt2ol!^E)E8(%P'
//     private openLog = false
//     private iv = CryptoJS.enc.Utf8.parse('5421698523412578')  // 16位初始向量
    /**
     * 進行md5加密
     */
    // public md5(str: string): string {
    //     return CryptoJS.MD5(str).toString()
    // }
    /**
     * 默認http加密邏輯（登錄前後接口為key的差異）
     */
    // public encrypt(target: string | Record<string, unknown>, key: string) {
    //     const str = typeof target === 'string' ? target : JSON.stringify(target)
    //     const result = CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
    //         iv: this.iv,
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.ZeroPadding
    //     }).toString()
    //     this.openLog &&
    //         console.log(`
    //         encrypt:========================start
    //         key:${key}
    //         target:${str}
    //         result:${result}
    //         encrypt:========================end
    //         `)
    //     return result
    // }
    /**
     * 默認http解密邏輯（登錄前後接口為key的差異）
     */
//     public decrypt(
//         str: string,
//         key: string,
//         options?: Parameters<typeof CryptoJS.AES.decrypt>[2]
//     ) {
//         const result = CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse(key), {
//             iv: this.iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.ZeroPadding,
//             ...options
//         }).toString(CryptoJS.enc.Utf8)
//         this.openLog &&
//             console.log(`
//             encrypt:========================start
//             key:${key}
//             target:${str}
//             result:${result}
//             encrypt:========================end
//             `)
//         return result
//     }
// }
// export default new CryptoManager()