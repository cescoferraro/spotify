import * as MUI from "muicss/react";
import { Button, Row, Container, Col } from "muicss/react";
import * as React from "react";
import * as Cookies from "cookies-js";
let Button = MUI.Button;
let Container = MUI.Container;
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
        backgroundImage: 'url(static/images/spotify_logo.png)'
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
        window.location.href = Cookies.get('AuthURL');
    };

    render() {
        console.log(style)
        return (<Container style={style.ContainerStyle}>
            <Button variant="raised" style={style.ButtonStyle} size="large" color="accent" onClick={this.signup}>
                <Row>
                    <Col md="5" style={style.flex}>
                        <p style={style.textStyle} className="mui--pull-right">Log in with </p>
                    </Col>
                    <Col md="7" style={style.logo}>

                    </Col>
                </Row>

            </Button>
        </Container>);
    }
}