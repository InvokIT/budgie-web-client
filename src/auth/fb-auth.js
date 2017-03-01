import getLogger from '../log';
const log = getLogger("auth/fb-auth");

const FB = new Promise((resolve, reject) => {

    // Init code copied from FB SDK page
    window.fbAsyncInit = () => {
        window.FB.init({
            appId: process.env.REACT_APP_FACEBOOK_APP_ID,
            xfbml: false,
            version: "v2.8"
        });
        window.FB.AppEvents.logPageView();

        resolve(window.FB);
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(window.document, 'script', 'facebook-jssdk'));

});

export const isLoggedIn = () => {
    FB.then(fb => {
        return new Promise((resolve, reject) => {
            fb.getLoginStatus(response => {
                if (response.status === "connected") {
                    log.debug("App authorized. AccessToken: " + response.authResponse.accessToken);
                    resolve(response.authResponse);
                } else if (response.status === 'not_authorized') {
                    log.debug("App not authorized.")
                    resolve(false);
                } else {
                    log.debug("User not logged in.");
                    resolve(false);
                }
            });
        });
    });
};

export const login = () => {
    return FB.then(fb => {
        return new Promise((resolve, reject) => {
            fb.login((response) => {
                if (response.authResponse) {
                    log.debug("Logged in. AccessToken: " + response.authResponse.accessToken);
                    resolve(response.authResponse);
                } else {
                    log.debug("User did not login.");
                    reject();
                }
            }, {
                scope: process.env.REACT_APP_FACEBOOK_SCOPE
            });
        });
    });
};
