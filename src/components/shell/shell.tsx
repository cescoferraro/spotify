import * as React from "react";
import Bar from "./bar";
import MDSpinner from "react-md-spinner";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Component = React.Component;
declare const require: any;
declare const navigator: any;

declare const document: any;
let ss = require("./shell.pcss");

export function Shell(Component) {
    return withStyles(ss)(React.createClass({
        render: function () {
            return (
                <div>
                    <Bar/>
                    <Component {...this.props}/>
                </div>
            );
        }
    }));
}

export const Waiting = withStyles(ss)(React.createClass({
    render: function () {
        return (
            <div>
                <Bar/>
                <div >
                    <MDSpinner size={100} userAgent={'all'}/>
                </div>
            </div>
        );
    }
}));
