import * as React from "react"
import {MyHelmet} from "../../shared/helmet"
import {SPOTIFYAppBar} from "./bar"
import {SPOTIFYDrawer} from "./drawer"
import * as CSS from "./shell.css"
import {SPOTIFYToastr} from "./toastr"

export const Shell = (props: any) => {
    return (
        <div id={props.id}>
            <MyHelmet title={props.id}/>
            <SPOTIFYAppBar {...props} />
            <div className={CSS.container}>
                {props.children}

            </div>
            <SPOTIFYToastr {...props} />
            <SPOTIFYDrawer {...props} />
        </div>
    )
};
