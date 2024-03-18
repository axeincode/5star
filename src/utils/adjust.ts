
import Adjust from "@adjustcom/adjust-web-sdk";

function isRunningAsMobileWebApp(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
}

export function adjustTrackEvent(key: any, value = null as any): void {
  if (isRunningAsMobileWebApp()) {
    (window as any)["AndroidWebView"].firebaseEvent(key, value)
  } else  {
    Adjust.trackEvent(key);
  }
}
