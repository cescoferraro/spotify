import * as React from "react";
import Match from "react-router/Match";
import Miss from "react-router/Miss";
import {Shell} from "./components/shell/shell";
import {createAsyncComponent} from "react-async-component";
declare let System: any;
declare let require: any;
declare let NODE_ENV: any;


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
        }, "dashboard.js")),
});


const NoMatch = ({location}) => (
    <div>Nothing matched {location.pathname}.</div>
);

export let SpotifyApp = () => {
    return (
        <div>
            <Match exactly pattern="/" component={Shell(AsyncProduct)}/>
            <Match exactly pattern="/dashboard" component={Shell(AsyncDashboard)}/>
            <Miss component={NoMatch}/>
        </div>
    )

};
