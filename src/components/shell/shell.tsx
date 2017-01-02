import * as React from "react";
import AppBar from "material-ui/AppBar";
import Message from "../msg/msg";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Login} from "../login/login";
declare let require: any;
let styles = require("./shell.pcss");

export interface ShellProps {
}

export default class Shell extends React.Component <ShellProps, any> {
    constructor(props: ShellProps) {
        super(props);
        this.state = {version: "0.0.0"};
        // Rx.DOM.get("/version")
        //     .subscribe((xhr) => {
        //         this.state.version = JSON.parse(xhr.response);
        //         this.setState(this.state);
        //     });
    }

    render() {
        return (
            <MuiThemeProvider >
                <div>
                    <AppBar title="API CESCO"/>
                    <Login></Login>
                </div>
            </MuiThemeProvider>);
    }

}
