import * as React from "react";
import * as MUI from "muicss/react";
import * as Cookies from "cookies-js";
import Utils from "./utils";
import { Login } from "./login";
import { Dashboard } from "./dashboard";
import ShellStyle from "./shell.style";

export interface ShellProps {
}


export class Shell extends React.Component <ShellProps, undefined> {
    version: string;

    constructor(props: ShellProps) {
        super(props);
        this.version = Cookies.get('VERSION');
        console.log(Utils.GetCode("code"))
    }

    render() {
        let content;
        let logout;
        if (Utils.GetCode("code") == null) {
            content = <Login/>
        } else {
            logout = <MUI.Button onClick={() => {
                window.location.href = window.location.origin
            }} className="mui--appbar-height" style={ShellStyle.right}>LOG-OUT</MUI.Button>;
            content = <Dashboard/>
        }
        return <div>
            <MUI.Appbar style={ShellStyle.barColor}>
                <table width="100%">
                    <tbody>
                    <tr style={ShellStyle.center}>
                        <td className="mui--appbar-height" style={ShellStyle.logo}>
                        </td>
                        <td className="mui--appbar-height" style={ShellStyle.left}>
                            API TESTER {this.version}

                        </td>
                        <td className="mui--appbar-height" style={ShellStyle.right}>
                            {logout}</td>
                    </tr>
                    </tbody>
                </table>
            </MUI.Appbar>
            {content}
        </div>
    }

}
