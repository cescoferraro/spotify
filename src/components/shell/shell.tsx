import * as React from "react";
import Bar from "./bar";
import MDSpinner from "react-md-spinner";
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
                <div>wait</div>
            </div>
        );
    }
});
