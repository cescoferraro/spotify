import * as React from "react";
import Bar from "./bar";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Component = React.Component;
declare let NODE_ENV: any;
declare const require: any;
declare const navigator: any;

declare const document: any;
let ss = require("./shell.pcss");

export function Shell(Component) {
    return withStyles(ss)(React.createClass({
        render: function () {
            return  <div>
                <Bar/>
                <Component {...this.props}/>
            </div>

        }
    }));
}


let shellin = withStyles(ss)(({Component}) => {
    return <div>
        <Bar/>
        <Component {...this.props}/>
    </div>
});
