import * as React from "react"
import * as CSS from "./shell.css"
import { SPOTIFYAppBar } from "./bar"
import { SPOTIFYToastr } from "./toastr"
import { SPOTIFYDrawer } from "./drawer"
import { MyHelmet } from "../../../shared/helmet/index"

export const Shell = (props) => {
    return (
        <div id={props.id}>
            <MyHelmet title={props.id} />
            <SPOTIFYAppBar {...props} />
            <div className={CSS.container}>
                {props.children}

            </div>
            <SPOTIFYToastr {...props} />
            <SPOTIFYDrawer {...props} />
        </div>
    )
}
