
import Adjust from "@adjustcom/adjust-web-sdk";

export function adjustTrackEvent(param: any): void {
    Adjust.trackEvent(param);
}