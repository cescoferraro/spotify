import * as React from "react"
import {Chooser} from "../home/chooser"
import {Plays} from "./changer"
import {LISTCharger} from "./listCharger"
import {Timer} from "./timer"
import * as CSS from "./tools.css"


export const TOOLS = ({token}: any) => {
    return (
        <div className={CSS.container}>
            <div className={CSS.center}>
                <LISTCharger token={token}/>
                <Plays token={token}/>
                <Timer token={token}/>
                <Chooser/>
            </div>
        </div>
    )

};
