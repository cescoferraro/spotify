import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Bar from "./bar";
import Component = React.Component;
declare const require: any;
declare const document: any;
require("./shell.pcss");

export function Shell(Component) {
    return React.createClass({
        render: function () {
            return (
                <div>
                    <Bar/>
                    <Component {...this.props}/>
                </div>
            );
        }
    });
};

export const Waiting = React.createClass({
    render: function () {
        return (
            <div>
                <Bar/>
                <br/>
            </div>
        );
    }
});
