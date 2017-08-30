import * as React from "react"
import { Plays } from "./changer"
import Subheader from "material-ui/Subheader"
import { Timer } from "./timer"
import { LISTCharger } from "./listCharger"
import { Chooser } from "../home/chooser"
import * as CSS from "./tools.css"
export const TOOLS = ({ token }) => {
    return (
        <div className={CSS.container} >
            <div className={CSS.center} >
                <LISTCharger token={token} />
                <Plays token={token} />
                <Timer token={token} />
                <Chooser />
            </div>
        </div>
    )

}
