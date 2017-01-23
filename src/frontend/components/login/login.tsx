import * as React from "react";
import Config from "../../app/config";
import {connect} from "react-redux";
import IconButton from "material-ui/IconButton";
declare let require: any;
declare let window: any;
let Image1 = require("-!babel-loader!svg-react-loader!./images/Spotify_logo_with_text.svg");
export default class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    signIn() {
        window.location.href = Config.API_URL() + "/login";

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
            <div style={{marginTop: "64px",  height: "calc(100vh - 64px)"}}>

                <IconButton
                    iconStyle={{ width: 300,  height: 300}}
                    style={buttoniconStyle}
                    href={Config.API_URL() + "/login"}>
                    <Image1 />
                </IconButton>


            </div>);
    }
}

