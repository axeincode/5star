import env from '/env';
import { accountService } from '@/_services';

const facebookAppId = env.VUE_APP_FACEBOOK_APP_ID;

export function initFacebookSdk(): Promise<void> {
    return new Promise<void>((resolve) => {
        // Wait for the Facebook SDK to initialize before starting the Vue app
        window.fbAsyncInit = function () {
            const FB = window.FB;
            FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });

            // Auto-authenticate with the API if already logged in with Facebook
            FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
                } else {
                    resolve();
                }
            });
        };

        // Load the Facebook SDK script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    });
}
