const SYSTEM_NAME: string = "blue-game"

/** Key used when caching data */
class CacheKey {
  static readonly TOKEN: string = `${SYSTEM_NAME}-token-key`
  static readonly SIDEBAR_STATUS: string = `${SYSTEM_NAME}-sidebar-status-key`
  static readonly ACTIVE_THEME_NAME: string = `${SYSTEM_NAME}-active-theme-name-key`
}

export default CacheKey
