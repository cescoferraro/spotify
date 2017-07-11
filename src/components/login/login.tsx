declare let require, window: any;
import * as React from "react";
import Utils from "../../shared/utils";
import withStyles from "isomorphic-style-loader/lib/withStyles";
let SpotifyLogo = require("-!babel-loader!svg-react-loader!./images/Spotify_logo_with_text.svg");

let ss = require('./css/login.pcss');


let Login = prop => {
    let signIn = () => {
        window.location.href = Utils.API_URL() + "/login"
    };
    return (
        <div className={ss.login}>
            <SpotifyLogo onClick={signIn} />
        </div>
    );
};

export default withStyles(ss)(Login);
