export class CookieService {
  static setCookie(name: string, value: string = '', expireHours?: number) {
    const expires = new Date();
    if (expireHours !== undefined) {
      // 将当前时间的小时数加上传入的小时数
      expires.setHours(expires.getHours() + expireHours);
    } else {
      // 设置到第二天午夜
      expires.setDate(expires.getDate() + 1);
      expires.setHours(0, 0, 0, 0);
    }
    const cookieValue = encodeURIComponent(value) + `; expires=${expires.toUTCString()}`;
    document.cookie = `${name}=${cookieValue}; path=/`;
  }

  static getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  static deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }
}