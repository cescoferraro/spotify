import * as React from "react";
import Button from "material-ui/RaisedButton";
declare let require: any;
declare let window: any;
let style = require("./login.pcss");
let Image1 = require("-!babel-loader!svg-react-loader!./Spotify_logo_with_text.svg");


export class Login extends React.Component<any, any> {
    static signIn() {
        window.location.href = "http://localhost:8080/login";
    };


    render() {
        return (<div className={style.ContainerStyle}>
            <Button
                labelPosition="before"
                primary={true}
                icon={<Image1  className={style.ButtonStyle} />}
                className={style.ButtonStyle}
                buttonStyle={{height: "150px"}}
                labelStyle={{fontSize: "30px"}}
                onClick={Login.signIn}>

                {/*<div className={style.logo}>*/}

                {/*</div>*/}


            </Button>
        </div>);
    }
}
