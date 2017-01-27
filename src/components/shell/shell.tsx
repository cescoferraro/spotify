import * as React from "react";
import Bar from "./bar";
import MDSpinner from "react-md-spinner";
import Component = React.Component;
declare const require: any;
declare const navigator: any;

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
}

export const Waiting = React.createClass({
    render: function () {
        return (
            <div>
                <Bar/>
                <div style={{marginTop: "63px",  height: "calc(100vh - 64px)"}}>
                    <MDSpinner style={{height:'50%', width: '50%'}} size={100} userAgent={'all'}/>
                </div>
            </div>
        );
    }
});
