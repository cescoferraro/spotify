import * as MUI from "muicss/react";
import * as React from "react";
declare let require: any;
declare let window: any;

let style = require("../sass/login.scss");

export interface LoginProps {
}

export class Login extends React.Component<any,any> {
    signup() {
        window.location.href = '/login';
    };

    render() {
        return (<MUI.Container className={style.ContainerStyle}>
            <MUI.Button variant="raised" className={style.ButtonStyle} size="large"
                        onClick={this.signup}>
                <MUI.Row>
                    <MUI.Col xs="5" className={style.flex}>
                        <p className={"mui--pull-right "+style.textStyle}>Log in with </p>
                    </MUI.Col>
                    <MUI.Col xs="7" className={style.logo}>

                    </MUI.Col>
                </MUI.Row>

            </MUI.Button>
        </MUI.Container>);
    }
}