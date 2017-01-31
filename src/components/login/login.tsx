import * as React from "react";
import {connect} from "react-redux";
import IconButton from "material-ui/IconButton";
import Utils from "../../shared/utils";
declare let require: any;
declare let window: any;
let Image1 = require("-!babel-loader!svg-react-loader!./images/Spotify_logo_with_text.svg");

import withStyles from "isomorphic-style-loader/lib/withStyles";
let ss = require('./login.pcss');


class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    signIn() {
        window.location.href = Utils.API_URL() + "/login";

    };

    render() {
        let buttoniconStyle = {
            width: 300, height: 300, padding: 0, position: "absolute",
            margin: "auto",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };

        return (
            <div >
                <h2>sdkjfndskj</h2>
                <h2>sdkjfndskj</h2>
                <h2>sdkjfndskj</h2>
                <h2>sdkjfndskj</h2>
                <h2>sdkjfndskj</h2>
                <h2>sdkjfndskj</h2>
                <h2>sdkjfndskj</h2>
                <h2>sdkjfndskj</h2>
                <IconButton
                    iconStyle={{ width: 300,  height: 300}}
                    style={buttoniconStyle}
                    href={Utils.API_URL() + "/login"}>
                    <Image1 />
                </IconButton>


            </div>);
    }
}

export default withStyles(ss)(Login);
