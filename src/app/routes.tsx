import * as React from "react";
import Match from "react-router/Match";
import Miss from "react-router/Miss";
import Utils from "../shared/utils";
import {Shell} from "../components/shell/shell";
declare let System: any;
declare let require: any;
declare let NODE_ENV: any;

const AsyncDash = Utils.asyncRoute(() => System.import("../components/dashboard/dashboard.tsx"));
const AsyncLogin = Utils.asyncRoute(() => System.import("../components/login/login"));

const NoMatch = ({location}) => (
    <div>Nothing matched {location.pathname}.</div>
);
const routes = () => (
    <div>
        <Match exactly pattern="/" component={Shell(AsyncLogin)}/>
        <Match exactly pattern="/dashboard" component={Shell(AsyncDash)}/>
        <Miss component={NoMatch}/>
    </div>
);


export default routes;
