
import Adjust from "@adjustcom/adjust-web-sdk";

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone'.
 *
 * @returns {boolean}
 */
function getMobileOperatingSystem(): boolean {
  var userAgent = navigator.userAgent;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return true;
  }

  if (/android/i.test(userAgent)) {
    return true;
  }

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return true;
  }

  return false;
}

var isMobileWebview : boolean = false;

(window as any)["isMobile"] = ()=>{
  isMobileWebview = true;
}


export function adjustTrackEvent(key: string, tokenParams: any,  value = null as any): void {
  if (isMobileWebview) {
    (window as any)["AndroidWebView"].firebaseEvent(key, value)
  } else {
    Adjust.trackEvent(tokenParams);
  }
}
