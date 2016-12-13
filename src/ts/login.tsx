import * as MUI from "muicss/react";
import * as React from "react";
import * as Cookies from "cookies-js";
declare var window: any;


let style = {
    ButtonStyle: {
        height: '150px',
        width: '500px',
        alignSelf: 'center',
        backgroundColor: '#6AE368'

    },
    ContainerStyle: {
        display: 'flex',
        height: '90vh',
        justifyContent: 'center'
    },
    logo: {
        height: '100px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: 'url(images/spotify_logo.png)'
    },
    textStyle: {
        alignSelf: 'center',
        position: 'absolute',
        fontSize: '27px',
        color: 'black'
    },
    flex: {
        display: 'flex',
        height: '100px'
    }
};

export interface LoginProps {
}

export class Login extends React.Component<any,any> {
    signup() {
        window.location.href = '/login';
    };

    render() {
        console.log(style)
        return (<MUI.Container style={style.ContainerStyle}>
            <MUI.Button variant="raised" style={style.ButtonStyle} size="large" color="accent" onClick={this.signup}>
                <MUI.Row>
                    <MUI.Col md="5" style={style.flex}>
                        <p style={style.textStyle} className="mui--pull-right">Log in with </p>
                    </MUI.Col>
                    <MUI.Col md="7" style={style.logo}>

                    </MUI.Col>
                </MUI.Row>

            </MUI.Button>
        </MUI.Container>);
    }
}