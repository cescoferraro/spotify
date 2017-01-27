import * as React from "react";
import Match from "react-router/Match";
import {Shell, Waiting} from "../components/shell/shell";
import Utils from "../shared/utils";
declare let System: any;
declare let require: any;

import Miss from "react-router/Miss";
declare let NODE_ENV: any;

const AsyncDash = Utils.asyncRoute(() => System.import("../components/dashboard/dashboard.tsx"));
const AsyncLogin = Utils.asyncRoute(() => System.import("../components/login/login"));


const routes = () => {
    if (Utils.isServer()) {
        return (<div>
            <Match exactly pattern="/" component={Waiting}/>
            <Match exactly pattern="/dashboard" component={Waiting}/>
            <Miss component={NoMatch}/>
        </div>);

    } else {
        return (<div>
            <Match exactly pattern="/" component={Shell(AsyncLogin)}/>
            <Match exactly pattern="/dashboard" component={Shell(AsyncDash)}/>
            <Miss component={NoMatch}/>
        </div>);
    }
};

const NoMatch = ({location}) => (
    <div>Nothing matched {location.pathname}.</div>
);

export default routes;
