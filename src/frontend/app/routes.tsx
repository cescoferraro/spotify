import * as React from "react";
import Match from "react-router/Match";
import Shell from "../components/shell/shell";
import {Login} from "../components/login/login";
import Dashboard from "../components/dashboard/dashboard";


const routes = () => {
    return (<div>
            <Match exactly pattern="/"  component={Shell(Login)}/>
            <Match pattern="/dashboard" component={Shell(Dashboard)}/>
        </div>
    );
};

export default routes;
