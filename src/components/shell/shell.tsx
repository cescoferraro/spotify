import * as React from "react";
import * as Rx from "rx-dom";
import Utils from "../../shared/utils";
import { Login } from "../login/login";
import * as cx from "classnames";
import Dashboard from "../dashboard/dashboard";
import AppBar from "material-ui/AppBar";
declare let require: any;
let styles = require("./shell.sass");
let styles2 = require("./shell.pcss");

export interface ShellProps {
}

export default class Shell extends React.Component <ShellProps, any> {
    constructor(props: ShellProps) {
        super(props);
        this.state = {version: "0.0.0"};
        Rx.DOM.get("/version")
            .subscribe((xhr) => {

                this.state.version = JSON.parse(xhr.response);
                this.setState(this.state);
            });
    }

    logout() {
        window.location.href = window.location.origin;
    }

    render() {
        return (<div >
            <AppBar title="API TESTER "
                    className={cx(styles.BarColor, styles.posts, styles2.danger)}>
                {/*<main>*/}
                    {/*<aside className={styles.left}>*/}
                        {/*<img className={cx("mui--appbar-height ",styles.logo,styles.verticalAlign)}/>*/}
                    {/*</aside>*/}
                    {/*<section className={cx(styles.flex)}>*/}
                        {/*<p className={cx(styles.verticalAlign,styles.text)}>API TESTER {this.state.version}</p>*/}
                    {/*</section>*/}
                    {/*<aside className={styles.right}>*/}

                    {/*</aside>*/}
                {/*</main>*/}
            </AppBar>
            {Utils.GetCode("code") == null ? <Login/> : <Dashboard/>}
        </div>);
    }

}

// {/*<MUI.Appbar className={[styles.BarColor, styles.flex].join(' ')}>*/}
