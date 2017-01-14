import * as React from "react";
import Button from "material-ui/RaisedButton";
import Config from "../../config";
declare let require: any;
declare let window: any;
let style = require("./login.pcss");
let Image1 = require("-!babel-loader!svg-react-loader!./Spotify_logo_with_text.svg");

export class Login extends React.Component<any, any> {
    static signIn() {
        window.location.href = Config.API_URL() + "/login";
    };


    render() {
        return (<div className={style.ContainerStyle}>
            <Button
                labelPosition="before"
                primary={true}
                icon={  <Image1 style={{maxWidth:"100%",maxHeight:"100%",}} />}
                className={style.ButtonStyle}
                buttonStyle={{height: "150px"}}
                labelStyle={{fontSize: "30px"}}
                onClick={Login.signIn}>

            </Button>
        </div>);
    }
}
