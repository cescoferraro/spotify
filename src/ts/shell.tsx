import * as React from "react";
import * as MUI from "muicss/react";
import Utils from "./utils";
import { Login } from "./login";
import { Dashboard } from "./dashboard";
import * as Rx from "rx-dom";
declare var require: any;
let styles = require("../sass/shell.scss");
require("../sass/main.scss");


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

        let cesco = "hello";
        let test = true;
        let tester;
        if (test) {
            tester = <h2>sdjnfsdf</h2>
        }
        if (Utils.GetCode("code") == null) {
            content = <Login/>
        } else {


            logout = <MUI.Button onClick={() => {
                window.location.href = window.location.origin
            }} className={styles.verticalAlign +" "+ styles.full}>LOG-OUT</MUI.Button>;
            content = <Dashboard/>
        }

        return <div >
            <MUI.Appbar className={styles.color}>


                <MUI.Row >

                    <MUI.Col md="1">
                        <img className={ "mui--appbar-height " + styles.logo}/>

                    </MUI.Col>


                    <MUI.Col className={"mui--appbar-height " + styles.flex} md="8">
                        <p className={styles.verticalAlign}>
                            API CESCO  {this.state.version}</p>
                        {tester}
                        <MUI.Button onClick={()=>{
                            this.state.version= Math.random();
                                this.setState(this.state);


                        }}/>
                    </MUI.Col>
                    <MUI.Col className={"mui--appbar-height " + styles.flex}>
                        {logout}

                    </MUI.Col>
                </MUI.Row>


            </MUI.Appbar>
            {content}
        </div>
    }

}

{/*<table width="100%">*/
}
{/*<tbody>*/
}
{/*<tr className={shellSASS.center}>*/
}
{/*<td className={ "mui--appbar-height " + mainSASS.logo}>*/
}

{/*API TESTER {this.state.version}*/
}
{/*</td>*/
}
{/*<td className={ "mui--appbar-height " + shellSASS.left + mainSASS.logo}>*/
}
{/*API TESTER {this.state.version}*/
}

{/*</td>*/
}
{/*<td className={ "mui--appbar-height " + shellSASS.right}>*/
}
{/*{logout}</td>*/
}
{/*</tr>*/
}
{/*</tbody>*/
}
{/*</table>*/
}