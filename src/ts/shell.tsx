import * as React from "react";
import * as MUI from "muicss/react";
import Utils from "./utils";
import { Login } from "./login";
import { Dashboard } from "./dashboard";
import * as mainSASS from "../sass/main.scss";
import * as shellSASS from "../sass/shell.scss";
import * as Rx from "rx-dom";

export interface ShellProps {

}
export class Shell extends React.Component <ShellProps, any> {

    constructor(props: ShellProps) {
        super(props);
        this.state = {version: "0.0.0"};
        Rx.DOM.get("/version")
            .subscribe((xhr) => {

                this.state.version = JSON.parse(xhr.response);
                this.setState(this.state);
            });
    }



    render() {
        let content;
        let logout;

        if (Utils.GetCode("code") == null) {
            content = <Login/>
        } else {


            logout = <MUI.Button onClick={() => {
                window.location.href = window.location.origin
            }} className={ "mui--appbar-height " + shellSASS.right}>LOG-OUT</MUI.Button>;
            content = <Dashboard/>
        }

        return <div className={mainSASS.container}>
            <MUI.Appbar className={shellSASS.pip}>
                <table width="100%">
                    <tbody>
                    <tr className={shellSASS.center}>
                        <td className={ "mui--appbar-height " + shellSASS.logo}>
                        </td>
                        <td className={ "mui--appbar-height " + shellSASS.left}>
                            API TESTER {this.state.version}

                        </td>
                        <td className={ "mui--appbar-height " + shellSASS.right}>
                            {logout}</td>
                    </tr>
                    </tbody>
                </table>
            </MUI.Appbar>
            {content}
        </div>
    }

}
