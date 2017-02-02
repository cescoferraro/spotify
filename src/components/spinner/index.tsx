import * as React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MDSpinner from "react-md-spinner";
let appCss = require("./app.pcss");

export const Spinner = withStyles(appCss)(({userAgent}) => {
    return <div className={appCss.spinnerContainer}>
        <MDSpinner size={150} userAgent={userAgent}/>
    </div>
});
