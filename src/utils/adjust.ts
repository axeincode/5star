
import Adjust from "@adjustcom/adjust-web-sdk";

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone'.
 *
 * @returns {boolean}
 */
export function getMobileOperatingSystem(): boolean {
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

export function adjustTrackEvent(key: any, value = null as any): void {
  if (getMobileOperatingSystem()) {
    (window as any)["AndroidWebView"].firebaseEvent(key.eventToken, value)
  } else {
    Adjust.trackEvent(key);
  }
}
