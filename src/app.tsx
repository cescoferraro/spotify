import * as React from "react";
import Match from "react-router/Match";
import Miss from "react-router/Miss";
import {Shell} from "./components/shell/shell";
import {createAsyncComponent} from "react-async-component";
import {AsyncDashboard} from "./components/dashboard/index";
import {AsyncLogin} from "./components/login/index";
import {NoMatch} from "./components/404/index";


export default (userAgent) => {
    return (
        <div>
            <Match exactly pattern="/" component={Shell(AsyncLogin(userAgent))}/>
            <Match exactly pattern="/dashboard" component={Shell(AsyncDashboard(userAgent))}/>
            <Miss component={NoMatch}/>
        </div>
    )
}
