import * as React from "react"
import * as CSS from "./shell.css"
import { SPOTIFYAppBar } from "./bar"
import { SPOTIFYToastr } from "./toastr"
import { SPOTIFYDrawer } from "./drawer"
import { MyHelmet } from "../../../shared/helmet/index"
import LinearProgress from 'material-ui/LinearProgress';

export const Shell = (props) => {
    return (
        <div id={props.title}>
            <MyHelmet title={props.title} />
            <SPOTIFYAppBar {...props} />
            <LinearProgress
                color="#Cd5c5c"
                value={!props.app.progress ? 0 : 33}
                mode={!props.app.progress ? "indeterminate" : "determinate"}
            />
            <div className={CSS.container}>
                {props.children}

            </div>
            <SPOTIFYToastr {...props} />
            <SPOTIFYDrawer {...props} />
        </div>
    )
}
