// import type { Language } from "@/il8n";

// export type DateFormatType =
//     | 'ymdhms'
//     | 'ymdhm'
//     | 'ymd'
//     | 'mdhm'
//     | 'mdhms'
//     | 'hms'
//     | 'ms'

// export type DateFormatItem = Record<DateFormatType, string>

// export const DateFormatMap: Record<Language, DateFormatType> = {
//     en_US: {
//         ymdhms: 'MM/DD/YYYY HH:mm:ss',
//         ymdhm: 'MM/DD/YYYY HH:mm',
//         ymd: 'MM/DD/YYYY',
//         mdhm: 'mm/dd HH:mm',
//         mdhms: 'MM/DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     vi_VN: {
//         ymdhms: 'MM-DD-YYYY HH:mm:ss',
//         ymdhm: 'MM-DD-YYYY HH:mm',
//         ymd: 'MM-DD-YYYY',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     vi_KR: {
//         ymdhms: 'YYYY-MM-DD HH:mm:ss',
//         ymdhm: 'YYYY-MM-DD HH:mm',
//         ymd: 'YYYY-MM-DD',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     vi_JP: {
//         ymdhms: 'YYYY-MM-DD HH:mm:ss',
//         ymdhm: 'YYYY-MM-DD HH:mm',
//         ymd: 'YYYY-MM-DD',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     pt_PT: {
//         ymdhms: 'DD/MM/YYYY HH:mm:ss',
//         ymdhm: 'DD/MM/YYYY HH:mm',
//         ymd: 'DD/MM/YYYY',
//         mdhm: 'DD/MM HH:mm',
//         mdhms: 'DD/MM HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     es_ES: {
//         ymdhms: 'MM-DD-YYYY HH:mm:ss',
//         ymdhm: 'MM-DD-YYYY HH:mm',
//         ymd: 'MM-DD-YYYY',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     de_DE: {
//         ymdhms: 'YYYY-MM-DD HH:mm:ss',
//         ymdhm: 'YYYY-MM-DD HH:mm',
//         ymd: 'YYYY-MM-DD',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     fr_FR: {
//         ymdhms: 'YYYY-MM-DD HH:mm:ss',
//         ymdhm: 'YYYY-MM-DD HH:mm',
//         ymd: 'YYYY-MM-DD',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     it_IT: {
//         ymdhms: 'YYYY-MM-DD HH:mm:ss',
//         ymdhm: 'YYYY-MM-DD HH:mm',
//         ymd: 'YYYY-MM-DD',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     ru_RU: {
//         ymdhms: 'YYYY-MM-DD HH:mm:ss',
//         ymdhm: 'YYYY-MM-DD HH:mm',
//         ymd: 'YYYY-MM-DD',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     my_MM: {
//         ymdhms: 'YYYY-MM-DD HH:mm:ss',
//         ymdhm: 'YYYY-MM-DD HH:mm',
//         ymd: 'YYYY-MM-DD',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     id_ID: {
//         ymdhms: 'MM-DD-YYYY HH:mm:ss',
//         ymdhm: 'MM-DD-YYYY HH:mm',
//         ymd: 'MM-DD-YYYY',
//         mdhm: 'MM-DD HH:mm',
//         mdhms: 'MM-DD HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     hi_IN: {
//         ymdhms: 'DD/MM/YYYY HH:mm:ss',
//         ymdhm: 'DD/MM/YYYY HH:mm',
//         ymd: 'DD/MM/YYYY',
//         mdhm: 'DD/MM HH:mm',
//         mdhms: 'DD/MM HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     ti_PH: {
//         ymdhms: 'DD/MM/YYYY HH:mm:ss',
//         ymdhm: 'DD/MM/YYYY HH:mm',
//         ymd: 'DD/MM/YYYY',
//         mdhm: 'DD/MM HH:mm',
//         mdhms: 'DD/MM HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
//     km_KH: {
//         ymdhms: 'DD/MM/YYYY HH:mm:ss',
//         ymdhm: 'DD/MM/YYYY HH:mm',
//         ymd: 'DD/MM/YYYY',
//         mdhm: 'DD/MM HH:mm',
//         mdhms: 'DD/MM HH:mm:ss',
//         hs: 'HH:mm:ss',
//         ms: 'mm:ss'
//     },
// }
