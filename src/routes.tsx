import * as React from "react";
import Match from "react-router/Match";
import Miss from "react-router/Miss";
import Utils from "./shared/utils";
import {Shell} from "./components/shell/shell";
declare let System: any;
declare let require: any;
declare let NODE_ENV: any;


import Dashboard from "./components/dashboard/dashboard";

import Login from "./components/login/login";


import {createAsyncComponent} from 'react-async-component';
const AsyncProduct = createAsyncComponent({
    resolve: () => new Promise(resolve =>
        require.ensure([], (require) => {
            resolve(require("./components/login/login"));
        })),
});
const AsyncDashboard = createAsyncComponent({
    resolve: () => new Promise(resolve =>
        require.ensure([], (require) => {
            resolve(require("./components/dashboard/dashboard"));
        },"dashboard.js")),
});


const routes = () => {

    return (
        <div>
            <Match exactly pattern="/" component={Shell(AsyncProduct)}/>
            <Match exactly pattern="/dashboard" component={Shell(AsyncDashboard)}/>
            <Miss component={NoMatch}/>
        </div>
    )

};

const NoMatch = ({location}) => (
    <div>Nothing matched {location.pathname}.</div>
);

export default routes;
